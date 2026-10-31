// Migra o CapacitaTE da nuvem para o Supabase local: estrutura, dados e usuários do login (com as senhas).
// Lê ORIGEM_DB_URL, DESTINO_DB_URL, DESTINO_CONFIRMACAO_URL e PG_IMAGEM do .env. Usa pg_dump/psql por Docker.
// ATENÇÃO: apaga os dados do app e os usuários que já existirem no banco de DESTINO antes de copiar.
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');
const tmpDir = path.join(root, 'output', 'migracao');

function readEnv() {
  if (!fs.existsSync(envPath)) fail('Arquivo .env não encontrado. Copie o .env.example para .env e preencha.');
  const env = {};
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m || line.trim().startsWith('#')) return;
    env[m[1]] = m[2].replace(/^['"]|['"]$/g, '').trim();
  });
  return env;
}

function fail(msg) {
  console.error('\nERRO: ' + msg);
  process.exit(1);
}

// Dentro do container, "localhost" é o próprio container: troca pelo host do Windows
function forDocker(url) {
  return url.replace(/@(localhost|127\.0\.0\.1)([:/])/, '@host.docker.internal$2');
}

// Roda pg_dump/psql no container; a pasta de trabalho fica montada em /work
function pg(image, args, label) {
  console.log('> ' + label);
  const r = spawnSync('docker', ['run', '--rm', '-v', tmpDir + ':/work', '-e', 'PGCONNECT_TIMEOUT=20',
    '-e', 'PGOPTIONS=' + (process.env.PGOPTIONS_EXTRA || ''), image].concat(args), { stdio: 'inherit' });
  if (r.status !== 0) fail('Falhou: ' + label);
}

function ask(q) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(res => rl.question(q, a => { rl.close(); res(a.trim()); }));
}

async function main() {
  const env = readEnv();
  const origem = env.ORIGEM_DB_URL, destino = env.DESTINO_DB_URL, image = env.PG_IMAGEM || 'postgres:17';
  if (!origem || !destino) fail('Preencha ORIGEM_DB_URL e DESTINO_DB_URL no .env.');
  if (origem === destino) fail('ORIGEM_DB_URL e DESTINO_DB_URL são iguais.');
  if (spawnSync('docker', ['info'], { stdio: 'ignore' }).status !== 0) fail('Docker não encontrado ou fechado. Abra o Docker Desktop.');

  const host = u => (u.match(/@([^:/]+)/) || [])[1] || '?';
  console.log('Origem (nuvem):  ' + host(origem));
  console.log('Destino (local): ' + host(destino));
  console.log('O destino terá os dados do app e os usuários do login APAGADOS e substituídos pelos da origem.');
  if ((await ask('Digite MIGRAR para continuar: ')) !== 'MIGRAR') fail('Cancelado.');

  fs.mkdirSync(tmpDir, { recursive: true });
  fs.copyFileSync(path.join(root, 'supabase', 'schema.sql'), path.join(tmpDir, 'schema.sql'));
  fs.copyFileSync(path.join(root, 'supabase', 'migrations', '0005_rls_endurecida.sql'), path.join(tmpDir, '0005.sql'));
  const src = forDocker(origem), dst = forDocker(destino);

  // 1. Cópia da nuvem: usuários do login e dados do app (só dados; a estrutura vem do schema.sql)
  pg(image, ['pg_dump', src, '--data-only', '--no-owner', '--no-privileges',
    '--table=auth.users', '--table=auth.identities', '-f', '/work/auth.sql'], 'Copiando usuários do login da nuvem');
  pg(image, ['pg_dump', src, '--data-only', '--no-owner', '--no-privileges', '--schema=public',
    '--exclude-table=public.public_rate_limit', '-f', '/work/public.sql'], 'Copiando dados do app da nuvem');

  // 2. Estrutura no local (idempotente) + RLS endurecida
  pg(image, ['psql', dst, '-v', 'ON_ERROR_STOP=1', '-q', '-f', '/work/schema.sql'], 'Criando a estrutura no local');
  pg(image, ['psql', dst, '-v', 'ON_ERROR_STOP=1', '-q', '-f', '/work/0005.sql'], 'Aplicando a segurança (0005)');

  // 3. Limpa o destino e restaura sem disparar gatilhos nem conferir chaves (replica), na ordem auth -> public
  fs.writeFileSync(path.join(tmpDir, 'limpar.sql'),
    "do $$ declare t text; begin\n" +
    "  for t in select format('%I.%I', schemaname, tablename) from pg_tables where schemaname = 'public' loop\n" +
    "    execute 'truncate ' || t || ' cascade'; end loop;\n" +
    "  truncate auth.identities, auth.users cascade;\nend $$;\n");
  pg(image, ['psql', dst, '-v', 'ON_ERROR_STOP=1', '-q', '-f', '/work/limpar.sql'], 'Limpando o destino');
  process.env.PGOPTIONS_EXTRA = '-c session_replication_role=replica';
  pg(image, ['psql', dst, '-v', 'ON_ERROR_STOP=1', '-q', '-f', '/work/auth.sql'], 'Restaurando usuários do login');
  pg(image, ['psql', dst, '-v', 'ON_ERROR_STOP=1', '-q', '-f', '/work/public.sql'], 'Restaurando dados do app');
  process.env.PGOPTIONS_EXTRA = '';

  // 4. Ajustes do ambiente local: função de e-mail e limite de tentativas ligado
  const fnUrl = (env.DESTINO_CONFIRMACAO_URL || '').replace(/'/g, "''");
  fs.writeFileSync(path.join(tmpDir, 'ajustes.sql'),
    (fnUrl ? "update public.app_settings set value = '" + fnUrl + "' where key = 'confirmation_function_url';\n" : '') +
    "update public.app_settings set value = 'true' where key = 'rate_limit_enabled';\nnotify pgrst, 'reload schema';\n");
  pg(image, ['psql', dst, '-v', 'ON_ERROR_STOP=1', '-q', '-f', '/work/ajustes.sql'], 'Ajustando configurações do local');

  // 5. Conferência: contagens na origem e no destino
  const q = "select 'usuarios', count(*) from auth.users union all select 'perfis', count(*) from public.profiles " +
    "union all select 'capacitacoes', count(*) from public.trainings union all select 'pessoas', count(*) from public.people " +
    "union all select 'inscricoes', count(*) from public.registrations union all select 'presencas', count(*) from public.attendance " +
    "union all select 'avaliacoes', count(*) from public.evaluations";
  pg(image, ['psql', src, '-A', '-F', ' = ', '-t', '-c', q], 'Contagens na NUVEM');
  pg(image, ['psql', dst, '-A', '-F', ' = ', '-t', '-c', q], 'Contagens no LOCAL (devem ser iguais)');

  // As cópias têm dados pessoais e hashes de senha: não ficam no disco
  ['auth.sql', 'public.sql'].forEach(f => fs.rmSync(path.join(tmpDir, f), { force: true }));
  console.log('\nMigração concluída. Agora rode atualizar-env.bat (com SUPABASE_URL e SUPABASE_ANON_KEY do local) e recarregue o app.');
}

main().catch(e => fail(e.message));
