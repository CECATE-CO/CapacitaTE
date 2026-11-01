# CapacitaTE — Backlog de migração para um Supabase local (self-hosted)

> Lista de tudo o que a plataforma usa hoje no Supabase em nuvem (projeto `tjvhbkhttxbjajcznfrp`, organização
> CECATE-CO) e o que precisa ser refeito num Supabase próprio (Docker, servidor da UFG etc.).
> **Atualize este arquivo sempre que algo novo passar a depender do Supabase.** Última revisão: 25/10/2026 (v.3.9.7).

---

## 1. Inventário do que existe hoje

| Peça | Onde está | Como recriar |
|---|---|---|
| Tabelas `trainings`, `master_team` | `supabase/migrations/0001_base_existente.sql` | SQL |
| Login, perfis, permissões, auditoria (`profiles`, `module_permissions`, `audit_log`) | `0002_auth_permissoes.sql` | SQL |
| Administrador Chefe (`profiles.is_superadmin`, excluir usuário, renomear) | `0002b_superadmin.sql` | SQL |
| Pessoas, formulários e respostas (`people`, `forms`, `registrations`, `attendance`, `evaluations`) | `0003_pessoas_formularios.sql` | SQL |
| Funções públicas dos formulários (`public_*`), limite de tentativas (`public_rate_limit`), funções da equipe (`staff_*`) | `0004_rpc_publicas.sql` | SQL |
| Meu perfil (nome, foto `profiles.avatar`, e-mail), correção do limite de tentativas, textos "Administrador Chefe" | `0004b_perfil_e_ajustes.sql` | SQL |
| Notas da avaliação com itens padrão | `0004c_avaliacao_notas.sql` | SQL |
| Presença em formulário único (registro por dia do envio) | `0004d_presenca_unica.sql` | SQL |
| Gatilhos do e-mail de confirmação (pg_net) + `app_settings` | `0004e_email_gatilhos.sql` | SQL (**trocar a URL**, ver 3.4) |
| Regras do formulário iguais às da tela (nome com 2 palavras, nascimento ≥ 1920) | `0004f_regras_formularios.sql` | SQL |
| Lixeira de respostas (excluir e restaurar) | `0004g_lixeira.sql` | SQL |
| Excluir definitivamente da lixeira | `0004h_lixeira_excluir_definitivo.sql` | SQL |
| Importar base e histórico de pessoas | `0004i_pessoas_importacao.sql` | SQL |
| Importar respostas históricas | `0004j_importar_respostas.sql` | SQL |
| RLS endurecida (anon sem acesso às tabelas) | `0005_rls_endurecida.sql` | SQL (**só depois do checklist de `publicacao-e-seguranca.md`**) |
| Tudo acima de uma vez (idempotente) | `supabase/schema.sql` | SQL |
| Edge Function `admin-invite-user` (convite de usuário) | `supabase/functions/admin-invite-user/index.ts` | `supabase functions deploy` |
| Edge Function `enviar-confirmacao` (e-mail após inscrição/presença/avaliação) | `supabase/functions/enviar-confirmacao/index.ts` | `supabase functions deploy` |
| Segredos das funções: `GMAIL_USER`, `GMAIL_APP_PASSWORD` (opcional `MAIL_FROM`) | painel: Edge Functions > Secrets | arquivo `.env` das functions (ver 3.3) |
| SMTP do Auth (Gmail `smtp.gmail.com:465`, usuário `morato@ufg.br`, remetente `cecate@ufg.br`) | painel: Authentication > Emails > SMTP | variáveis `SMTP_*` do docker (ver 3.2) |
| Modelos de e-mail do Auth (6) em português | `supabase/templates/*.html` | variáveis `MAILER_TEMPLATES_*` ou pasta montada (ver 3.2) |
| Site URL e Redirect URLs | painel: Authentication > URL Configuration | `SITE_URL` e `ADDITIONAL_REDIRECT_URLS` (ver 3.2) |
| Cadastro aberto desligado | painel: Authentication > Providers > Email | `DISABLE_SIGNUP=true` / `GOTRUE_DISABLE_SIGNUP=true` |
| Confirmação de e-mail obrigatória | padrão do Auth | `ENABLE_EMAIL_AUTOCONFIRM=false` |
| Extensões | `pgcrypto` (0003), `pg_net` (0004e) | vêm na imagem `supabase/postgres`; o SQL as cria |
| Data API (PostgREST) ligada para o schema `public` | padrão | `PGRST_DB_SCHEMAS=public,...` |
| Usuários do Auth (morato, josé, robô...) | `auth.users` | migrar junto com o banco (ver 4) |
| Endereço e chave pública no front-end | `js/core/config.js` (`SUPABASE_CONFIG`) e `.env`/`js/env.local.js` | trocar (ver 3.5) |
| Páginas públicas | GitHub Pages (`https://mathmorato.github.io/CapacitaTE/`) | não depende do Supabase; só da URL/chave em `config.js` |

Não usamos: Storage (fotos e PDFs do relatório ficam no IndexedDB do navegador; a foto do perfil fica em
`profiles.avatar`), Realtime, cron (pg_cron), Vault, buckets nem políticas de Storage.

---

## 2. Pré-requisitos do servidor

1. Docker + Docker Compose; seguir o guia oficial "Self-Hosting with Docker" do Supabase (repositório `supabase/supabase`, pasta `docker`).
2. Domínio com **HTTPS** (obrigatório: o QR Code abre as páginas públicas no celular e o navegador exige HTTPS para a API).
   Ex.: `https://supabase.cecate.ufg.br` atrás de um proxy (Caddy/Nginx) para o Kong (porta 8000).
3. Gerar novos `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY` (o guia tem o gerador). **A chave anon nova vai para o front-end; a service_role nunca.**
4. Liberar saída na porta 465 (SMTP do Gmail) para o container das Edge Functions e do Auth.

---

## 3. Passo a passo da configuração

### 3.1 Banco
1. Subir os containers.
2. No Studio local (SQL Editor) rodar `supabase/schema.sql` inteiro (é idempotente) **ou** as migrações na ordem:
   0001 → 0002 → 0002b → 0003 → 0004 → 0004b → 0004c → 0004d → 0004e → 0004f → 0004g → 0004h → 0004i → 0004j (e, por último, 0005) → 0006.
3. Conferir: `select public.auth_setup_status();` deve responder `{"installed": true, ...}`.

### 3.2 Auth (arquivo `.env` do docker)
| Variável | Valor |
|---|---|
| `SITE_URL` | URL do painel (ex.: GitHub Pages ou o novo domínio) |
| `ADDITIONAL_REDIRECT_URLS` | `<site>/**,http://localhost:*/**,http://127.0.0.1:*/**` |
| `DISABLE_SIGNUP` | `true` |
| `ENABLE_EMAIL_SIGNUP` | `true` (login por e-mail e senha) |
| `ENABLE_EMAIL_AUTOCONFIRM` | `false` |
| `SMTP_HOST` / `SMTP_PORT` | `smtp.gmail.com` / `465` |
| `SMTP_USER` / `SMTP_PASS` | `morato@ufg.br` / senha de app de 16 letras |
| `SMTP_ADMIN_EMAIL` / `SMTP_SENDER_NAME` | `cecate@ufg.br` / `CECATE Centro-Oeste` |
| Modelos | `MAILER_TEMPLATES_INVITE`, `..._RECOVERY`, `..._CONFIRMATION`, `..._EMAIL_CHANGE`, `..._MAGIC_LINK`, `..._REAUTHENTICATION` apontando para URLs onde os arquivos de `supabase/templates/` estejam publicados (o GoTrue lê modelos por URL), e `MAILER_SUBJECTS_*` com os assuntos indicados no topo de cada arquivo |

### 3.3 Edge Functions
1. Copiar `supabase/functions/admin-invite-user` e `supabase/functions/enviar-confirmacao` para `volumes/functions/` do docker.
2. Segredos no `.env` das functions: `GMAIL_USER`, `GMAIL_APP_PASSWORD` (e opcional `MAIL_FROM`).
   `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` já são injetados pelo container.
3. As duas funções validam o chamador por conta própria; manter "verify JWT" **desligado** para `enviar-confirmacao`
   (é chamada pelo banco sem token). `admin-invite-user` confere o JWT do admin dentro do código.

### 3.4 E-mail de confirmação (pg_net)
Trocar a URL usada pelos gatilhos:
```sql
update public.app_settings set value = 'https://<seu-dominio>/functions/v1/enviar-confirmacao'
where key = 'confirmation_function_url';
```
Dentro do docker, o banco pode chamar o Kong pela rede interna (ex.: `http://kong:8000/functions/v1/enviar-confirmacao`).

### 3.5 Front-end
1. `js/core/config.js`: trocar `SUPABASE_CONFIG.url` e `anonKey` pelos do servidor local (ou usar `.env` + `atualizar-env.bat`, que gera `js/env.local.js`).
2. Conferir `DEFAULT_PUBLIC_BASE_URL` (endereço das páginas públicas para o QR Code).
3. Publicar o site (GitHub Pages ou servidor próprio). Os links e QR Codes já impressos apontam para o endereço antigo:
   gere novos QR (botão "Gerar novo link" não é necessário; basta reimprimir com a URL nova se o domínio mudar).

---

## 4. Migração dos dados (nuvem → local)

**Automática (v.4.3.8):** preencher no `.env` (modelo em `.env.example`) `ORIGEM_DB_URL` (nuvem, Session pooler), `DESTINO_DB_URL` (local, usuário `supabase_admin`) e `DESTINO_CONFIRMACAO_URL`; com o Docker aberto, rodar `migrar-para-local.bat` (`scripts/migrar-para-local.js`). Aplica `schema.sql` + 0005 no local, apaga dados do app e usuários do destino, copia `auth.users`/`auth.identities` e todo o `public` (menos `public_rate_limit`) sem disparar gatilhos, ajusta `confirmation_function_url`, religa o limite de tentativas e compara as contagens. Depois trocar `SUPABASE_URL`/`SUPABASE_ANON_KEY` no `.env` e rodar `atualizar-env.bat`.

**Manual:**

1. Na nuvem: Project Settings > Database > connection string. Exportar com `pg_dump`:
   - `pg_dump --schema=public --data-only` (dados das tabelas do app)
   - `pg_dump --schema=auth --data-only --table=auth.users --table=auth.identities` (usuários e senhas criptografadas)
2. No local: rodar primeiro o `schema.sql` (estrutura), depois restaurar `auth` e, por fim, `public` (ordem por causa das chaves estrangeiras).
3. Conferir contagens: `select count(*) from trainings; ... people; registrations; attendance; evaluations; profiles;`.
4. As senhas continuam valendo (o hash é migrado). Se o `JWT_SECRET` mudar, todos precisam entrar de novo (sessões antigas expiram).
5. Os dados do relatório que estão só no navegador (IndexedDB: fotos, apêndices) **não** estão no Supabase; o
   app sincroniza `trainings` com a nuvem, então basta abrir o app apontando para o servidor novo e usar "Sincronizar".

---

## 5. Checklist de validação depois da migração

- [ ] Login de admin e do Administrador Chefe; "Esqueci minha senha" chega por e-mail e volta para o site certo.
- [ ] Convite de usuário (função `admin-invite-user`) chega e abre a criação de senha.
- [ ] Página pública de inscrição abre pelo QR no celular (HTTPS) e grava a resposta.
- [ ] E-mail de confirmação chega após inscrição, presença e avaliação (`audit_log` com `email.sent`).
- [ ] Presença em dois dias diferentes gera duas linhas; repetir no mesmo dia mostra "Presença já registrada".
- [ ] Exportação Excel das três planilhas; `scripts/validar-exportacao.html` com 18/18.
- [ ] Relatório Word da 16ª CTE idêntico ao gerado antes da migração.
- [ ] Com a chave anon, `select * from people` via REST devolve erro/vazio (depois da migração 0005, quando existir).

---

## 6. Pontos que podem mudar até a migração (manter este arquivo em dia)

- Migração 0005 (RLS endurecida, Fase 6) ainda não existe: quando for criada, entra na ordem do item 3.1.
- Se o envio de e-mail sair do Gmail (domínio próprio, Resend etc.), atualizar 3.2 e 3.3.
- Se fotos/documentos passarem a ir para o Storage, incluir buckets e políticas.
