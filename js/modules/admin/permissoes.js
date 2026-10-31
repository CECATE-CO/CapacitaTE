/**
 * CapacitaTE - Administração › Permissões (matriz usuários × módulos/ações, salva na hora)
 * Versão: v.4.3.8
 */

(function () {
  CapacitaTE.adminViews = CapacitaTE.adminViews || {};

  CapacitaTE.adminViews.permissoes = async function (body) {
    const { el, toast, client, errorMessage, permissionColumns, loadUsersAndPerms, ACTION_LABELS } = CapacitaTE.adminUI;
    const { users, perms } = await loadUsersAndPerms();
    const cols = permissionColumns();
    body.textContent = '';

    const has = (uid, c) => perms.some(p => p.user_id === uid && p.module_key === c.module_key && p.action === c.action && !p.training_id);

    const head = el('tr', {}, [
      el('th', { text: 'Usuário' }),
      ...cols.map(c => el('th', { class: 'perm-col', text: `${c.moduleTitle}\n${ACTION_LABELS[c.action] || c.action}`, style: 'white-space:pre-line;' }))
    ]);
    const rows = users.map(u => el('tr', {}, [
      el('td', {}, [
        el('div', { text: u.full_name || u.email }),
        el('div', { class: 'admin-muted', text: u.is_admin ? `${u.email} · admin (acesso total)` : (u.is_active ? u.email : `${u.email} · desativado`) })
      ]),
      ...cols.map(c => {
        const box = el('input', {
          type: 'checkbox', checked: u.is_admin || has(u.user_id, c), disabled: u.is_admin,
          'aria-label': `${u.email}: ${c.moduleTitle} ${ACTION_LABELS[c.action] || c.action}`
        });
        box.addEventListener('change', async () => {
          box.disabled = true;
          const { error } = await client().rpc('admin_set_permission', {
            p_user: u.user_id, p_module: c.module_key, p_action: c.action, p_grant: box.checked, p_training: null
          });
          box.disabled = false;
          if (error) {
            box.checked = !box.checked;
            return toast(errorMessage(error), 'error');
          }
          toast(`${box.checked ? 'Permissão concedida' : 'Permissão removida'}: ${c.moduleTitle} (${ACTION_LABELS[c.action] || c.action}).`, 'success');
        });
        return el('td', { class: 'perm-col' }, box);
      })
    ]));

    body.appendChild(el('div', { class: 'glass-card' }, [
      el('h3', { style: 'margin:0 0 0.35rem; font-size:1rem;', text: 'Permissões por módulo' }),
      el('p', { class: 'admin-muted', style: 'margin:0 0 1rem;', text: 'Cada alteração é salva na hora e registrada na auditoria. Editar, exportar e gerar já incluem ver. Novos módulos aparecem aqui automaticamente.' }),
      el('div', { class: 'data-table-container', style: 'overflow-x:auto;' }, el('table', { class: 'data-table admin-table' }, [el('thead', {}, head), el('tbody', {}, rows)]))
    ]));
  };
})();
