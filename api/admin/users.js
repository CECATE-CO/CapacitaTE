/**
 * CapacitaTE - API da Vercel: POST /api/admin/users
 * Cria a identidade no Supabase Auth da VPS (e-mail e senha) e vincula o UUID ao perfil da aplicação.
 * Versão: v.4.4.5
 *
 * Variáveis de ambiente PRIVADAS na Vercel (nunca no navegador nem no repositório):
 *   SUPABASE_URL               base do gateway, ex.: https://capacitate.transportesufg.eng.br (sem /auth/v1)
 *   SUPABASE_SERVICE_ROLE_KEY  chave service_role (JWT legado) da instalação
 *   SUPABASE_EMAIL_CONFIRM     'true' marca o e-mail como confirmado na criação (política deliberada do backend);
 *                              qualquer outro valor (padrão) deixa sem confirmar.
 *
 * Requisição: Authorization: Bearer <token de sessão do admin>
 *   { email, password, name, permissions?: [{ module_key, action }] }
 * Resposta 201: { id, email, name }
 */

const TIMEOUT_MS = 15000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KEY_RE = /^[a-z][a-z0-9_]*$/;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function config() {
  const url = String(process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '').replace(/\/auth\/v1$/, '');
  const key = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  return { url, key, confirm: String(process.env.SUPABASE_EMAIL_CONFIRM || '').trim().toLowerCase() === 'true' };
}

// Chamada ao gateway da VPS com tempo limite; nunca registra corpo nem cabeçalhos
async function call(cfg, path, { method = 'GET', body, token, prefer } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const headers = { apikey: cfg.key, Authorization: `Bearer ${token || cfg.key}`, 'Content-Type': 'application/json' };
    if (prefer) headers.Prefer = prefer;
    const r = await fetch(cfg.url + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: ctrl.signal });
    const text = await r.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    return { ok: r.ok, status: r.status, data };
  } catch (e) {
    const err = new Error(e && e.name === 'AbortError' ? 'timeout' : 'network');
    err.kind = err.message;
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  if (typeof req.body === 'string') return Promise.resolve(JSON.parse(req.body));
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', c => { raw += c; if (raw.length > 20000) reject(new Error('grande')); });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

const findProfileByEmail = (cfg, email) =>
  call(cfg, `/rest/v1/profiles?select=user_id&email=eq.${encodeURIComponent(email)}&limit=1`);

module.exports = async function handler(req, res) {
  const cid = Math.random().toString(36).slice(2, 10); // id de correlação dos logs
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Método não permitido.' }); }
  const cfg = config();
  if (!cfg.url || !cfg.key) {
    console.error(`[admin/users ${cid}] SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausente`);
    return send(res, 500, { error: 'Servidor sem configuração do Supabase.' });
  }

  try {
    // 1. Identidade do solicitante validada no servidor (token da sessão, não um ID enviado pelo cliente)
    const jwt = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
    if (!jwt) return send(res, 401, { error: 'Sessão ausente. Entre novamente.' });
    const me = await call(cfg, '/auth/v1/user', { token: jwt });
    if (!me.ok || !me.data || !me.data.id) return send(res, 401, { error: 'Sessão inválida. Entre novamente.' });
    const callerId = me.data.id;

    // 2. Autorização a partir do banco (profiles), nunca de user_metadata
    const prof = await call(cfg, `/rest/v1/profiles?select=is_admin,is_active&user_id=eq.${encodeURIComponent(callerId)}&limit=1`);
    const p = prof.ok && Array.isArray(prof.data) ? prof.data[0] : null;
    if (!p || !p.is_admin || !p.is_active) return send(res, 403, { error: 'Somente admins ativos podem criar usuários.' });

    // 3. Validação; só os campos esperados são lidos
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Corpo inválido.' }); }
    const email = String(body.email || '').trim().toLowerCase();
    const password = typeof body.password === 'string' ? body.password : '';
    const name = String(body.name || '').trim().replace(/\s+/g, ' ');
    const fields = {};
    if (!EMAIL_RE.test(email) || email.length > 254) fields.email = 'E-mail inválido.';
    if (password.length < 8 || password.length > 72) fields.password = 'A senha deve ter de 8 a 72 caracteres.';
    if (!name || name.length > 120) fields.name = 'Informe o nome (até 120 caracteres).';
    if (Object.keys(fields).length) return send(res, 400, { error: 'Dados inválidos.', fields });
    const perms = (Array.isArray(body.permissions) ? body.permissions : [])
      .filter(x => x && KEY_RE.test(x.module_key) && KEY_RE.test(x.action))
      .slice(0, 50);

    // 4. Criação da identidade (política de confirmação definida aqui, não pelo cliente)
    let created;
    try {
      created = await call(cfg, '/auth/v1/admin/users', {
        method: 'POST',
        body: { email, password, email_confirm: cfg.confirm, user_metadata: { full_name: name, name } }
      });
    } catch (e) {
      // Timeout não significa que nada foi criado: confere antes de responder
      let exists = false;
      try { const f = await findProfileByEmail(cfg, email); exists = f.ok && Array.isArray(f.data) && f.data.length > 0; } catch { /* sem conexão */ }
      console.error(`[admin/users ${cid}] falha de comunicação (${e.kind}); conta encontrada depois: ${exists}`);
      return send(res, e.kind === 'timeout' ? 504 : 502, {
        error: exists
          ? 'O servidor demorou a responder, mas a conta foi criada. Confira a lista antes de tentar de novo.'
          : 'Não foi possível falar com o servidor do Supabase. Confira a lista antes de tentar de novo.'
      });
    }
    if (!created.ok) {
      const code = created.data && (created.data.error_code || created.data.code);
      const msg = String((created.data && (created.data.msg || created.data.message || created.data.error_description)) || '');
      console.error(`[admin/users ${cid}] Auth recusou: HTTP ${created.status} ${code || ''}`);
      if (code === 'email_exists' || code === 'user_already_exists' || /already (been )?registered|already exists/i.test(msg)) {
        return send(res, 409, { error: 'Já existe uma conta com este e-mail. Revise o cadastro na lista.' });
      }
      if (code === 'weak_password' || /password/i.test(msg)) return send(res, 400, { error: 'Senha recusada pelo servidor: ' + msg, fields: { password: msg } });
      if (created.status >= 400 && created.status < 500) return send(res, 400, { error: 'Dados recusados pelo servidor: ' + (msg || 'erro desconhecido') });
      return send(res, 502, { error: 'O servidor de autenticação falhou. Tente de novo em instantes.' });
    }
    const user = created.data && (created.data.user || created.data);
    if (!user || !user.id) return send(res, 502, { error: 'O Auth não retornou o usuário criado.' });

    // 5. Vínculo: o gatilho on_auth_user_created já cria o perfil; o upsert garante nome e e-mail
    const link = await call(cfg, '/rest/v1/profiles?on_conflict=user_id', {
      method: 'POST', prefer: 'resolution=merge-duplicates,return=minimal',
      body: { user_id: user.id, email, full_name: name }
    });
    if (!link.ok) {
      console.error(`[admin/users ${cid}] perfil não gravado para ${user.id} (HTTP ${link.status}); reconciliar`);
      return send(res, 500, { error: 'A conta foi criada, mas o perfil não foi gravado. Avise o administrador (id ' + user.id + ').', id: user.id });
    }
    if (perms.length) {
      const pr = await call(cfg, '/rest/v1/module_permissions', {
        method: 'POST', prefer: 'return=minimal',
        body: perms.map(x => ({ user_id: user.id, module_key: x.module_key, action: x.action, granted_by: callerId }))
      });
      if (!pr.ok) console.error(`[admin/users ${cid}] permissões não gravadas para ${user.id} (HTTP ${pr.status})`);
    }
    await call(cfg, '/rest/v1/audit_log', {
      method: 'POST', prefer: 'return=minimal',
      body: { user_id: callerId, action: 'user.create', target: user.id, details: { email, permissions: perms.length, email_confirmed: cfg.confirm } }
    }).catch(() => {});

    return send(res, 201, { id: user.id, email, name });
  } catch (e) {
    console.error(`[admin/users ${cid}] erro: ${e && e.kind ? e.kind : 'interno'}`);
    return send(res, e && e.kind === 'timeout' ? 504 : 502, { error: 'Falha de comunicação com o servidor. Confira a lista antes de tentar de novo.' });
  }
};
