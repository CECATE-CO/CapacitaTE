#!/usr/bin/env bash
# CapacitaTE - instala do zero o Supabase próprio (docker) já configurado para o CapacitaTE:
# chaves novas, e-mail pelo Gmail, modelos de e-mail em português, Edge Functions, banco (schema.sql + 0005)
# e o primeiro administrador. Rodar NO SERVIDOR, com Docker instalado:
#   curl -fsSL https://raw.githubusercontent.com/CECATE-CO/CapacitaTE/main/scripts/servidor/instalar-supabase.sh -o instalar.sh
#   bash instalar.sh
# ATENÇÃO: apaga a instalação antiga do Supabase indicada (containers e dados).
set -euo pipefail

REPO_RAW="https://raw.githubusercontent.com/CECATE-CO/CapacitaTE/main"
DIR="${SUPA_DIR:-$HOME/supabase-capacitate}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

say() { printf '\n\033[1;33m> %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31mERRO: %s\033[0m\n' "$*" >&2; exit 1; }
ask() { local v; read -r -p "$1${2:+ [$2]}: " v; printf '%s' "${v:-$2}"; }
ask_secret() { local v; read -r -s -p "$1: " v; echo >&2; printf '%s' "$v"; }
rand_hex() { openssl rand -hex "$1"; }
b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }

# Altera KEY=valor no .env (acrescenta no fim se não existir)
set_env() {
  local key="$1" val="$2" file="$DIR/.env"
  if grep -q "^${key}=" "$file"; then
    awk -v k="$key" -v v="$val" 'BEGIN{FS=OFS="="} $1==k {print k "=" v; next} {print}' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  else
    printf '%s=%s\n' "$key" "$val" >> "$file"
  fi
}

# JWT HS256 com papel anon ou service_role, válido por 10 anos
make_jwt() {
  local role="$1" now exp header payload sig
  now=$(date +%s); exp=$((now + 315360000))
  header=$(printf '{"alg":"HS256","typ":"JWT"}' | b64url)
  payload=$(printf '{"role":"%s","iss":"supabase","iat":%s,"exp":%s}' "$role" "$now" "$exp" | b64url)
  sig=$(printf '%s.%s' "$header" "$payload" | openssl dgst -sha256 -hmac "$JWT_SECRET" -binary | b64url)
  printf '%s.%s.%s' "$header" "$payload" "$sig"
}

command -v docker >/dev/null || fail "Docker não encontrado neste servidor."
docker compose version >/dev/null 2>&1 || fail "Falta o 'docker compose' (plugin v2)."
for c in git openssl curl awk; do command -v "$c" >/dev/null || fail "Falta o programa '$c' (instale com: sudo apt-get install -y $c)."; done
docker info >/dev/null 2>&1 || fail "Sem permissão no Docker. Rode com sudo ou adicione o seu usuário ao grupo docker."

echo "=== Instalação do Supabase do CapacitaTE ==="
API_URL=$(ask "Endereço público da API (o domínio do servidor)" "https://capacitate.transportesufg.eng.br")
SITE_URL=$(ask "Endereço do site do CapacitaTE (Vercel)" "https://capacitate.vercel.app")
GMAIL_USER=$(ask "Conta do Gmail que envia os e-mails" "morato@ufg.br")
GMAIL_PASS=$(ask_secret "Senha de app do Gmail (16 letras)")
GMAIL_PASS=${GMAIL_PASS// /}
SENDER=$(ask "E-mail remetente" "cecate@ufg.br")
SENDER_NAME=$(ask "Nome do remetente" "CECATE Centro-Oeste")
ADMIN_EMAIL=$(ask "E-mail do primeiro administrador" "morato@ufg.br")
ADMIN_PASS=$(ask_secret "Senha do administrador (mín. 8 caracteres)")
[ ${#GMAIL_PASS} -eq 16 ] || fail "A senha de app do Gmail precisa ter 16 letras."
[ ${#ADMIN_PASS} -ge 8 ] || fail "A senha do administrador precisa ter pelo menos 8 caracteres."
API_URL=${API_URL%/}; SITE_URL=${SITE_URL%/}

# 1. Instalação antiga: para e apaga (containers, volumes e pasta de dados)
OLD=$(docker inspect supabase-auth --format '{{ index .Config.Labels "com.docker.compose.project.working_dir" }}' 2>/dev/null || true)
if [ -n "$OLD" ] || [ -d "$DIR" ]; then
  echo
  echo "Instalação existente encontrada: ${OLD:-$DIR}"
  echo "Ela será APAGADA (containers e todos os dados do banco)."
  [ "$(ask 'Digite APAGAR para continuar')" = "APAGAR" ] || fail "Cancelado."
  for d in "$OLD" "$DIR"; do
    [ -n "$d" ] && [ -f "$d/docker-compose.yml" ] && (cd "$d" && docker compose down -v --remove-orphans) || true
  done
  [ -n "$OLD" ] && [ "$OLD" != "$DIR" ] && mv "$OLD" "$OLD.antigo-$(date +%Y%m%d%H%M)" || true
  [ -d "$DIR" ] && sudo rm -rf "$DIR"
fi

# 2. Arquivos oficiais do Supabase (pasta docker) e do CapacitaTE
say "Baixando o Supabase oficial e o CapacitaTE"
git clone -q --depth 1 https://github.com/supabase/supabase "$WORK/supabase"
git clone -q --depth 1 https://github.com/CECATE-CO/CapacitaTE "$WORK/capacitate"
mkdir -p "$DIR"
cp -r "$WORK/supabase/docker/." "$DIR/"
cp "$DIR/.env.example" "$DIR/.env"
cp -r "$WORK/capacitate/supabase/functions/enviar-confirmacao" "$WORK/capacitate/supabase/functions/admin-invite-user" "$DIR/volumes/functions/"

# 3. Segredos novos e configuração
say "Gerando chaves e configurando"
JWT_SECRET=$(rand_hex 32)
ANON_KEY=$(make_jwt anon)
SERVICE_KEY=$(make_jwt service_role)
POSTGRES_PASSWORD=$(rand_hex 20)
DASH_PASS=$(rand_hex 12)
set_env POSTGRES_PASSWORD "$POSTGRES_PASSWORD"
set_env JWT_SECRET "$JWT_SECRET"
set_env ANON_KEY "$ANON_KEY"
set_env SERVICE_ROLE_KEY "$SERVICE_KEY"
set_env DASHBOARD_USERNAME "capacitate"
set_env DASHBOARD_PASSWORD "$DASH_PASS"
for k in SECRET_KEY_BASE VAULT_ENC_KEY PG_META_CRYPTO_KEY LOGFLARE_PUBLIC_ACCESS_TOKEN LOGFLARE_PRIVATE_ACCESS_TOKEN; do
  grep -q "^${k}=" "$DIR/.env" && set_env "$k" "$(rand_hex 32)"
done
grep -q "^VAULT_ENC_KEY=" "$DIR/.env" && set_env VAULT_ENC_KEY "$(rand_hex 16)"
set_env SITE_URL "$SITE_URL"
set_env ADDITIONAL_REDIRECT_URLS "$SITE_URL/**,http://localhost:*/**,http://127.0.0.1:*/**"
set_env API_EXTERNAL_URL "$API_URL"
set_env SUPABASE_PUBLIC_URL "$API_URL"
set_env DISABLE_SIGNUP "true"
set_env ENABLE_EMAIL_SIGNUP "true"
set_env ENABLE_EMAIL_AUTOCONFIRM "false"
set_env ENABLE_ANONYMOUS_USERS "false"
set_env SMTP_HOST "smtp.gmail.com"
set_env SMTP_PORT "465"
set_env SMTP_USER "$GMAIL_USER"
set_env SMTP_PASS "$GMAIL_PASS"
set_env SMTP_ADMIN_EMAIL "$SENDER"
set_env SMTP_SENDER_NAME "\"$SENDER_NAME\""
set_env FUNCTIONS_VERIFY_JWT "false"

# Modelos de e-mail em português (lidos do GitHub) e segredos das Edge Functions
T="$REPO_RAW/supabase/templates"
cat > "$DIR/docker-compose.override.yml" <<EOF
services:
  auth:
    environment:
      GOTRUE_MAILER_TEMPLATES_INVITE: $T/convite.html
      GOTRUE_MAILER_TEMPLATES_RECOVERY: $T/redefinir-senha.html
      GOTRUE_MAILER_TEMPLATES_CONFIRMATION: $T/confirmar-email.html
      GOTRUE_MAILER_TEMPLATES_EMAIL_CHANGE: $T/alterar-email.html
      GOTRUE_MAILER_TEMPLATES_MAGIC_LINK: $T/link-de-acesso.html
      GOTRUE_MAILER_TEMPLATES_REAUTHENTICATION: $T/reautenticacao.html
      GOTRUE_MAILER_SUBJECTS_INVITE: "Convite para o CapacitaTE - CECATE Centro-Oeste"
      GOTRUE_MAILER_SUBJECTS_RECOVERY: "Redefinição de senha do CapacitaTE"
      GOTRUE_MAILER_SUBJECTS_CONFIRMATION: "Confirme o seu e-mail no CapacitaTE"
      GOTRUE_MAILER_SUBJECTS_EMAIL_CHANGE: "Confirme o seu novo e-mail no CapacitaTE"
      GOTRUE_MAILER_SUBJECTS_MAGIC_LINK: "Seu link de acesso ao CapacitaTE"
      GOTRUE_MAILER_SUBJECTS_REAUTHENTICATION: "Código de confirmação do CapacitaTE"
  functions:
    environment:
      GMAIL_USER: "$GMAIL_USER"
      GMAIL_APP_PASSWORD: "$GMAIL_PASS"
      MAIL_FROM: "$SENDER_NAME <$SENDER>"
EOF
chmod 600 "$DIR/.env" "$DIR/docker-compose.override.yml"

# 4. Sobe tudo
say "Baixando as imagens e iniciando (pode levar alguns minutos)"
cd "$DIR"
docker compose pull -q
docker compose up -d
say "Aguardando o banco ficar pronto"
for i in $(seq 1 60); do
  docker compose exec -T db pg_isready -U postgres >/dev/null 2>&1 && break
  sleep 5
  [ "$i" -eq 60 ] && fail "O banco não ficou pronto. Veja: docker compose logs db"
done
sleep 10

# 5. Banco do CapacitaTE
say "Criando a estrutura do CapacitaTE no banco"
PSQL=(docker compose exec -T -e PGPASSWORD="$POSTGRES_PASSWORD" db psql -h localhost -U supabase_admin -d postgres -v ON_ERROR_STOP=1 -q)
"${PSQL[@]}" < "$WORK/capacitate/supabase/schema.sql"
"${PSQL[@]}" < "$WORK/capacitate/supabase/migrations/0005_rls_endurecida.sql"
"${PSQL[@]}" <<'SQL'
update public.app_settings set value = 'http://kong:8000/functions/v1/enviar-confirmacao' where key = 'confirmation_function_url';
insert into public.app_settings(key, value) values ('rate_limit_enabled', 'true') on conflict (key) do update set value = 'true';
notify pgrst, 'reload schema';
SQL

# 6. Primeiro administrador (criado já confirmado, sem e-mail)
say "Criando o administrador $ADMIN_EMAIL"
for i in $(seq 1 30); do
  curl -fsS -o /dev/null "http://localhost:8000/auth/v1/health" -H "apikey: $ANON_KEY" && break
  sleep 5
done
BODY=$(printf '{"email":"%s","password":"%s","email_confirm":true}' "$ADMIN_EMAIL" "${ADMIN_PASS//\"/\\\"}")
curl -fsS -o /dev/null -X POST "http://localhost:8000/auth/v1/admin/users" \
  -H "apikey: $SERVICE_KEY" -H "Authorization: Bearer $SERVICE_KEY" -H "Content-Type: application/json" -d "$BODY" \
  || fail "Não foi possível criar o administrador. Veja: docker compose logs auth"
"${PSQL[@]}" -c "select public.bootstrap_admin('$ADMIN_EMAIL');" \
  -c "update public.profiles set is_superadmin = true where lower(email) = lower('$ADMIN_EMAIL');"

# 7. Resumo (credenciais ficam só neste servidor)
cat > "$DIR/CREDENCIAIS.txt" <<EOF
CapacitaTE - Supabase próprio (gerado em $(date '+%d/%m/%Y %H:%M'))
Painel (Studio): $API_URL   usuário: capacitate   senha: $DASH_PASS
Chave pública (vai no app, config.js / .env SUPABASE_ANON_KEY):
$ANON_KEY
Senha do Postgres (usuário supabase_admin): $POSTGRES_PASSWORD
Chave service_role (SECRETA, nunca no app): $SERVICE_KEY
EOF
chmod 600 "$DIR/CREDENCIAIS.txt"

say "Pronto!"
echo "Pasta da instalação: $DIR"
echo "Credenciais salvas em: $DIR/CREDENCIAIS.txt (só o seu usuário lê)"
echo
echo "Painel do Supabase: $API_URL  (usuário: capacitate  senha: $DASH_PASS)"
echo
echo "Chave PÚBLICA para o app (copie e mande para atualizar o config.js):"
echo "$ANON_KEY"
echo
echo "Teste: entre no CapacitaTE com $ADMIN_EMAIL e use 'Esqueci minha senha' para conferir o e-mail."
