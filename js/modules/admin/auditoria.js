/**
 * CapacitaTE - Administração › Auditoria (últimos 200 eventos)
 * Versão: v.4.4.3
 */

(function () {
  CapacitaTE.adminViews = CapacitaTE.adminViews || {};

  CapacitaTE.adminViews.auditoria = async function (body) {
    const { el, client, fmtDateTime, loadUsersAndPerms } = CapacitaTE.adminUI;
    const [{ users }, log] = await Promise.all([
      loadUsersAndPerms(),
      client().from('audit_log').select('*').order('at', { ascending: false }).limit(200)
    ]);
    if (log.error) throw log.error;
    const nameOf = (uid) => {
      const u = users.find(x => x.user_id === uid);
      return u ? (u.full_name || u.email) : (uid ? uid.slice(0, 8) : 'público');
    };
    body.textContent = '';
    const rows = (log.data || []).map(r => el('tr', {}, [
      el('td', { text: fmtDateTime(r.at) }),
      el('td', { text: nameOf(r.user_id) }),
      el('td', { text: r.action }),
      el('td', { text: r.module_key || '—' }),
      el('td', { text: r.target ? nameOf(r.target) : '—' }),
      el('td', { class: 'admin-muted', text: r.details ? JSON.stringify(r.details) : '' })
    ]));
    body.appendChild(el('div', { class: 'glass-card' }, [
      el('h3', { style: 'margin:0 0 0.75rem; font-size:1rem;', text: 'Auditoria (últimos 200 eventos)' }),
      rows.length
        ? el('div', { class: 'data-table-container', style: 'overflow-x:auto;' }, el('table', { class: 'data-table admin-table' }, [
          el('thead', {}, el('tr', {}, ['Quando', 'Quem', 'Ação', 'Módulo', 'Alvo', 'Detalhes'].map(h => el('th', { text: h })))),
          el('tbody', {}, rows)
        ]))
        : el('p', { class: 'admin-muted', text: 'Nenhum evento registrado ainda.' })
    ]));
  };
})();
