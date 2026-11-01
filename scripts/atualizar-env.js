// Converte o .env em js/env.local.js, que o navegador consegue carregar mesmo abrindo o index.html direto (file://)
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');
if (!fs.existsSync(envPath)) {
  console.error('Arquivo .env não encontrado. Copie o .env.example para .env e preencha os dados do Supabase.');
  process.exit(1);
}
const env = {};
fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
  if (!m || line.trim().startsWith('#')) return;
  env[m[1]] = m[2].replace(/^['"]|['"]$/g, '').trim();
});
if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  console.error('Preencha SUPABASE_URL e SUPABASE_ANON_KEY no .env.');
  process.exit(1);
}
if (/service_role|^sb_secret_/i.test(env.SUPABASE_ANON_KEY)) {
  console.error('A chave informada parece ser a service_role (secreta). Use a chave pública (publishable/anon).');
  process.exit(1);
}
const out = '// Gerado automaticamente a partir do .env por scripts/atualizar-env.js. Não versionar.\n' +
  'window.APP_ENV = ' + JSON.stringify(Object.assign({ SUPABASE_URL: env.SUPABASE_URL, SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY }, env.PUBLIC_BASE_URL ? { PUBLIC_BASE_URL: env.PUBLIC_BASE_URL } : {}), null, 2) + ';\n';
fs.writeFileSync(path.join(root, 'js', 'env.local.js'), out);
console.log('js/env.local.js atualizado com o projeto ' + env.SUPABASE_URL + '. Recarregue o app (Ctrl+F5).');
