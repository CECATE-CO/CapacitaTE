/**
 * CapacitaTE - Módulo Administração (usuários, permissões e auditoria; só para admins)
 * Versão: v.4.4.6
 */

(function () {
  const ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  /**
   * Cria um elemento com atributos e filhos. Texto sempre via textContent (nunca innerHTML com dado de usuário).
   */
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === undefined || v === null || v === false) return;
      if (k === 'text') node.textContent = v;
      else if (k === 'class') node.className = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (k === 'checked' || k === 'disabled') node[k] = !!v;
      else node.setAttribute(k, v === true ? '' : v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  const toast = (msg, type = 'info') => window.app && window.app.showToast(msg, type);
  const client = () => CapacitaTE.supabaseClient.get();
  const fmtDateTime = (v) => (v ? CapacitaTE.formats.formatDateTime(v) : '—');

  /**
   * Módulos e ações que entram na matriz de permissões (vêm do registro; o próprio admin fica de fora)
   */
  function permissionColumns() {
    const cols = [];
    CapacitaTE.modules.forEach(mod => {
      if (mod.key === 'admin' || mod.key === 'capacitacao') return;
      mod.actions.forEach(action => cols.push({ module_key: mod.key, moduleTitle: mod.title, action }));
    });
    return cols;
  }

  const ACTION_LABELS = { view: 'ver', edit: 'editar', export: 'exportar', generate: 'gerar' };

  async function loadUsersAndPerms() {
    const [profiles, perms] = await Promise.all([
      client().from('profiles').select('*').order('full_name'),
      client().from('module_permissions').select('*')
    ]);
    if (profiles.error) throw profiles.error;
    if (perms.error) throw perms.error;
    return { users: profiles.data || [], perms: perms.data || [] };
  }

  /**
   * Mensagem amigável para erros do servidor (inclui a proteção do último admin)
   */
  function errorMessage(err) {
    const m = (err && (err.message || err.error_description)) || String(err || '');
    if (/último admin/i.test(m)) return 'Não é possível rebaixar ou desativar o último admin ativo.';
    if (/admin_delete_user|is_superadmin/i.test(m) && /not find|does not exist|schema cache/i.test(m)) return 'A migração 0002b ainda não foi aplicada no Supabase.';
    if (/PGRST202|schema cache|does not exist|not find/i.test(m)) return 'A migração 0002 ainda não foi aplicada no Supabase.';
    return m || 'Falha inesperada.';
  }

  const TABS = [
    { key: 'usuarios', title: 'Usuários' },
    { key: 'permissoes', title: 'Permissões' },
    { key: 'pessoas', title: 'Pessoas' },
    { key: 'importar', title: 'Importar base' },
    { key: 'auditoria', title: 'Auditoria' }
  ];

  async function mount(container, ctx = {}) {
    const tab = TABS.some(t => t.key === ctx.tab) ? ctx.tab : 'usuarios';
    container.textContent = '';

    const header = el('div', { style: 'margin-bottom:1.25rem;' }, [
      el('h2', { style: 'display:flex; align-items:center; gap:0.5rem; margin:0;', text: 'Administração' }),
      el('p', { style: 'color:var(--text-secondary); font-size:0.95rem; margin:0.25rem 0 0 0;', text: 'Usuários, permissões por módulo e trilha de auditoria.' })
    ]);
    const tabs = el('div', { class: 'admin-tabs', role: 'tablist' }, TABS.map(t =>
      el('a', { href: `#admin/${t.key}`, class: `btn btn-sm ${t.key === tab ? 'btn-primary' : 'btn-secondary'}`, role: 'tab', 'aria-selected': String(t.key === tab), text: t.title })
    ));
    const body = el('div');
    container.append(header, tabs, body);

    if (!CapacitaTE.auth || CapacitaTE.auth.mode !== 'authenticated') {
      body.appendChild(el('div', { class: 'glass-card', style: 'border-left:4px solid var(--accent-amber);' }, [
        el('h3', { style: 'margin:0 0 0.5rem; font-size:1rem;', text: 'Entre com uma conta de admin' }),
        el('p', { class: 'admin-muted', text: 'A administração exige login. Se o login ainda não estiver configurado, aplique supabase/migrations/0002_auth_permissoes.sql no SQL Editor e defina o primeiro admin com: select public.bootstrap_admin(\'seu-email\');' })
      ]));
      return;
    }

    body.appendChild(el('p', { class: 'admin-muted', text: 'Carregando...' }));
    try {
      const views = { usuarios: CapacitaTE.adminViews.usuarios, permissoes: CapacitaTE.adminViews.permissoes, auditoria: CapacitaTE.adminViews.auditoria, pessoas: CapacitaTE.adminViews.pessoas, importar: CapacitaTE.adminViews.importar };
      await views[tab](body);
    } catch (err) {
      body.textContent = '';
      body.appendChild(el('p', { class: 'auth-message-error', text: errorMessage(err) }));
    }
  }

  /**
   * Exibe o módulo na área de conteúdo do painel e marca o item do menu
   */
  function open(tab) {
    if (!CapacitaTE.can('admin', 'view')) {
      toast('Somente admins acessam a Administração.', 'warning');
      window.location.hash = 'dashboard';
      return;
    }
    const container = document.getElementById('module-container');
    if (!container || !window.app) return;
    window.app.navigateTo('module', false);
    const nav = document.getElementById('nav-admin');
    if (nav) nav.classList.add('active');
    return mount(container, { tab, user: CapacitaTE.auth && CapacitaTE.auth.user, can: CapacitaTE.can });
  }

  CapacitaTE.adminUI = { el, toast, client, fmtDateTime, errorMessage, permissionColumns, loadUsersAndPerms, ACTION_LABELS, reload: (tab) => open(tab) };
  CapacitaTE.adminViews = CapacitaTE.adminViews || {};

  CapacitaTE.registerModule({
    key: 'admin',
    title: 'Administração',
    icon: `<svg ${ICON_ATTRS}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`,
    order: 900,
    actions: ['view'],
    perTraining: false,
    mount,
    routes: {
      'admin': () => open('usuarios'),
      'admin/:tab': ({ tab }) => open(tab)
    }
  });
})();
