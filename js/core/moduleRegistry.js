/**
 * CapacitaTE - Registro de Módulos e Menu Lateral Gerado pelo Registro
 * Versão: v.4.4.4
 */

window.CapacitaTE = window.CapacitaTE || {};
CapacitaTE.modules = new Map();

/**
 * @typedef {Object} ModuleDef
 * @property {string}   key           'inscricao' (igual a module_key no banco)
 * @property {string}   title         'Formulário de Inscrição'
 * @property {string}   icon          SVG de linha (fill="none", stroke="currentColor")
 * @property {number}   order         posição no menu lateral
 * @property {string[]} actions       ações de permissão do módulo, ex.: ['view','edit','export']
 * @property {boolean}  perTraining   true se o módulo atua dentro de uma capacitação
 * @property {Function} mount         (container, ctx) => void | Promise   ctx = { trainingId, user, can }
 * @property {Function} [unmount]     () => void
 * @property {Function} [trainingTab] devolve o card/aba exibido dentro da página da capacitação
 * @property {MenuItem[]} [menu]      itens do menu lateral (sem a lista, o módulo vira um item com key/title/icon/order)
 * @property {Object<string, Function>} [routes]  rotas por hash, ex.: { 'relatorio/:id': (params) => ... }
 *
 * @typedef {Object} MenuItem
 * @property {string} view   tela do painel (data-view e hash)
 * @property {string[]} [views] outras telas em que o item fica destacado
 * @property {string} title
 * @property {string} icon
 * @property {number} order
 */

const NAV_ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

// Itens fixos do painel: não pertencem a um módulo e não dependem de permissão
CapacitaTE.shellMenu = [
  {
    view: 'dashboard', title: 'Dashboard', order: 0,
    icon: `<svg ${NAV_ICON_ATTRS}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`
  },
  {
    view: 'settings', title: 'Configurações', order: 1000,
    icon: `<svg ${NAV_ICON_ATTRS}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
  }
];

/**
 * Permissão padrão enquanto o login (Fase 2) não existe: tudo liberado.
 * js/core/permissions.js passará a definir CapacitaTE.can.
 */
if (typeof CapacitaTE.can !== 'function') CapacitaTE.can = () => true;

CapacitaTE.registerModule = (def) => {
  const required = ['key', 'title', 'icon', 'order', 'actions', 'perTraining', 'mount'];
  const missing = required.filter(f => def == null || def[f] === undefined);
  if (missing.length) throw new Error(`Módulo inválido: faltam os campos ${missing.join(', ')}`);
  if (!/^[a-z][a-z0-9_]*$/.test(def.key)) throw new Error(`Chave de módulo inválida: "${def.key}"`);
  if (typeof def.mount !== 'function') throw new Error(`Módulo "${def.key}": mount precisa ser uma função`);
  if (!Array.isArray(def.actions)) throw new Error(`Módulo "${def.key}": actions precisa ser uma lista`);
  if (CapacitaTE.modules.has(def.key)) throw new Error(`Módulo "${def.key}" já registrado`);

  // Mantém o Map ordenado por order
  const sorted = [...CapacitaTE.modules.values(), def].sort((a, b) => a.order - b.order);
  CapacitaTE.modules.clear();
  sorted.forEach(m => CapacitaTE.modules.set(m.key, m));

  if (def.routes && CapacitaTE.router) {
    Object.entries(def.routes).forEach(([pattern, handler]) => CapacitaTE.router.register(pattern, handler));
  }
  return def;
};

/**
 * Itens do menu lateral: itens fixos do painel + itens dos módulos que o usuário pode ver, por ordem
 */
CapacitaTE.getMenuItems = () => {
  const items = [...CapacitaTE.shellMenu];
  CapacitaTE.modules.forEach(mod => {
    if (!CapacitaTE.can(mod.key, 'view')) return;
    if (Array.isArray(mod.menu) && mod.menu.length === 0) return;
    const menu = Array.isArray(mod.menu) ? mod.menu
      : [{ view: mod.key, title: mod.title, icon: mod.icon, order: mod.order }];
    menu.forEach(item => items.push({ ...item, moduleKey: mod.key }));
  });
  return items.sort((a, b) => a.order - b.order);
};

/**
 * Gera o menu lateral com o mesmo HTML de antes (classes, ids e data-view),
 * para que a navegação e o destaque deslizante de js/app.js continuem iguais
 */
CapacitaTE.renderNav = (navEl = document.querySelector('.nav-menu')) => {
  if (!navEl) return;
  navEl.textContent = '';
  CapacitaTE.getMenuItems().forEach((item, idx) => {
    const a = document.createElement('a');
    a.href = `#${item.view}`;
    a.className = idx === 0 ? 'nav-item active' : 'nav-item';
    a.dataset.view = item.view;
    a.id = `nav-${item.view}`;
    if (item.moduleKey) a.dataset.module = item.moduleKey;
    if (Array.isArray(item.views)) a.dataset.views = item.views.join(',');
    a.innerHTML = item.icon; // SVG fixo definido no código do módulo, nunca dado de usuário
    const label = document.createElement('span');
    label.textContent = item.title;
    a.appendChild(label);
    navEl.appendChild(a);
  });
};
