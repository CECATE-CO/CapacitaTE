/**
 * CapacitaTE - Administração › Usuários (convidar, admin, ativo; renomear e excluir só pelo Administrador Chefe)
 * Versão: v.4.3.8
 */

(function () {
  CapacitaTE.adminViews = CapacitaTE.adminViews || {};

  CapacitaTE.adminViews.usuarios = async function (body) {
    const { el, toast, client, fmtDateTime, errorMessage, permissionColumns, loadUsersAndPerms, ACTION_LABELS, reload } = CapacitaTE.adminUI;
    const { users, perms } = await loadUsersAndPerms();
    const isSuper = CapacitaTE.auth.isSuperadmin();
    const me = CapacitaTE.auth.user && CapacitaTE.auth.user.id;
    body.textContent = '';

    // Lista
    const modulesOf = (uid) => [...new Set(perms.filter(p => p.user_id === uid).map(p => p.module_key))];
    const rows = users.map(u => {
      const adminBox = el('input', { type: 'checkbox', checked: u.is_admin, 'aria-label': `Admin: ${u.email}` });
      const activeBox = el('input', { type: 'checkbox', checked: u.is_active, 'aria-label': `Ativo: ${u.email}` });
      const update = async (patch, box) => {
        box.disabled = true;
        const { error } = await client().rpc('admin_update_profile', { p_user: u.user_id, ...patch });
        box.disabled = false;
        if (error) {
          box.checked = !box.checked;
          return toast(errorMessage(error), 'error');
        }
        toast('Usuário atualizado.', 'success');
      };
      adminBox.addEventListener('change', () => update({ p_is_admin: adminBox.checked }, adminBox));
      activeBox.addEventListener('change', () => update({ p_is_active: activeBox.checked }, activeBox));
      const chips = u.is_admin
        ? [el('span', { class: 'admin-chip', text: 'todos (admin)' })]
        : modulesOf(u.user_id).map(m => el('span', { class: 'admin-chip', text: m }));
      if (u.is_superadmin) chips.unshift(el('span', { class: 'admin-chip', text: 'admin chefe' }));

      // Nome: editável só pelo Administrador Chefe (Enter ou sair do campo salva)
      let nameCell;
      if (isSuper) {
        const nameInput = el('input', { type: 'text', class: 'form-control admin-name-input', value: u.full_name || '', 'aria-label': `Nome de ${u.email}` });
        const saveName = async () => {
          const value = nameInput.value.trim().replace(/\s+/g, ' ');
          if (value === (u.full_name || '')) return;
          if (!value) { nameInput.value = u.full_name || ''; return toast('O nome não pode ficar vazio.', 'warning'); }
          nameInput.disabled = true;
          const { error } = await client().rpc('admin_update_profile', { p_user: u.user_id, p_full_name: value });
          nameInput.disabled = false;
          if (error) { nameInput.value = u.full_name || ''; return toast(errorMessage(error), 'error'); }
          u.full_name = value;
          nameInput.value = value;
          toast('Nome atualizado.', 'success');
        };
        nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); nameInput.blur(); } });
        nameInput.addEventListener('blur', saveName);
        nameCell = el('td', {}, nameInput);
      } else {
        nameCell = el('td', { text: u.full_name || '—' });
      }

      // Excluir: só o Administrador Chefe, nunca a própria conta nem outro Administrador Chefe
      const actions = [];
      if (isSuper && u.user_id !== me && !u.is_superadmin) {
        actions.push(el('button', {
          type: 'button', class: 'btn btn-secondary btn-sm admin-danger-btn', text: 'Excluir', 'aria-label': `Excluir ${u.email}`,
          onclick: () => window.app.openConfirmModal({
            title: 'Excluir usuário?',
            msg: `A conta de ${u.full_name || u.email} (${u.email}) será excluída de vez, com as permissões. A auditoria guarda o registro. Esta ação não pode ser desfeita.`,
            btnText: 'Sim, excluir',
            successTitle: 'Exclusão enviada',
            successMsg: 'A lista de usuários será atualizada.',
            onConfirm: async () => {
              const { error } = await client().rpc('admin_delete_user', { p_user: u.user_id });
              if (error) return toast(errorMessage(error), 'error');
              toast('Usuário excluído.', 'success');
              reload('usuarios');
            }
          })
        }));
      }

      return el('tr', {}, [
        nameCell,
        el('td', { text: u.email }),
        el('td', { class: 'perm-col' }, adminBox),
        el('td', { class: 'perm-col' }, activeBox),
        el('td', { text: fmtDateTime(u.last_seen) }),
        el('td', {}, chips.length ? chips : el('span', { class: 'admin-muted', text: 'nenhum' })),
        ...(isSuper ? [el('td', { class: 'perm-col' }, actions.length ? actions : el('span', { class: 'admin-muted', text: '—' }))] : [])
      ]);
    });
    body.appendChild(el('div', { class: 'glass-card', style: 'margin-bottom:1.5rem;' }, [
      el('h3', { style: 'margin:0 0 0.75rem; font-size:1rem;', text: `Usuários (${users.length})` }),
      el('div', { class: 'data-table-container' }, el('table', { class: 'data-table admin-table' }, [
        el('thead', {}, el('tr', {}, ['Nome', 'E-mail', 'Admin', 'Ativo', 'Último acesso', 'Módulos', ...(isSuper ? ['Ações'] : [])].map((h, i) => el('th', { class: i === 2 || i === 3 || i === 6 ? 'perm-col' : null, text: h })))),
        el('tbody', {}, rows)
      ])),
      el('p', { class: 'admin-muted', style: 'margin:0.75rem 0 0;', text: isSuper ? 'Como Administrador Chefe, você altera nomes (clique no nome, edite e tecle Enter) e exclui contas. Desativar bloqueia o acesso sem apagar nada. O último admin ativo e o Administrador Chefe não podem ser rebaixados nem desativados.' : 'Desativar bloqueia o acesso sem apagar nada. Somente o Administrador Chefe altera nomes e exclui contas. O último admin ativo não pode ser rebaixado nem desativado.' })
    ]));

    // Convidar
    const name = el('input', { type: 'text', class: 'form-control', id: 'admin-invite-name', autocomplete: 'off' });
    const email = el('input', { type: 'email', class: 'form-control', id: 'admin-invite-email', autocomplete: 'off' });
    // Permissões iniciais: uma lista suspensa por módulo, com níveis de acesso em vez de caixinhas soltas
    const MODULE_HINTS = {
      relatorio: 'Capacitações e o assistente do relatório em Word',
      inscricao: 'Formulário de inscrição, QR Code e inscritos',
      presenca: 'Sessões de presença, QR Code e frequência',
      avaliacao: 'Formulário de avaliação, QR Code e resultados'
    };
    const modulesForInvite = [];
    permissionColumns().forEach(c => {
      let m = modulesForInvite.find(x => x.key === c.module_key);
      if (!m) { m = { key: c.module_key, title: c.moduleTitle, actions: [] }; modulesForInvite.push(m); }
      m.actions.push(c.action);
    });
    // Níveis: cada um inclui os anteriores (editar e exportar/gerar já incluem ver)
    const levelsFor = (actions) => {
      const levels = [{ value: '', label: 'Sem acesso', actions: [] }, { value: 'view', label: 'Ver', actions: ['view'] }];
      if (actions.includes('edit')) levels.push({ value: 'edit', label: 'Ver e editar', actions: ['view', 'edit'] });
      const extra = actions.filter(a => !['view', 'edit'].includes(a));
      if (extra.length) levels.push({ value: 'all', label: `Acesso completo (${['editar', ...extra.map(a => ACTION_LABELS[a] || a)].join(', ')})`, actions: actions.slice() });
      return levels;
    };
    const permSelects = modulesForInvite.map(m => {
      const levels = levelsFor(m.actions);
      const id = `admin-invite-perm-${m.key}`;
      const select = el('select', { class: 'form-control', id }, levels.map(l => el('option', { value: l.value, text: l.label })));
      return {
        m, levels, select,
        row: el('div', { class: 'invite-perm-row' }, [
          el('label', { class: 'invite-perm-name', for: id }, [el('strong', { text: m.title }), el('span', { text: MODULE_HINTS[m.key] || '' })]),
          select
        ])
      };
    });
    const presetSel = el('select', { class: 'form-control', id: 'admin-invite-preset' }, [
      el('option', { value: '', text: 'Personalizado' }),
      el('option', { value: 'equipe', text: 'Equipe de campo (formulários)' }),
      el('option', { value: 'relatorio', text: 'Relatório (acesso completo)' }),
      el('option', { value: 'leitura', text: 'Somente leitura' }),
      el('option', { value: 'nenhum', text: 'Sem acesso por enquanto' })
    ]);
    presetSel.addEventListener('change', () => {
      const p = presetSel.value;
      permSelects.forEach(({ m, levels, select }) => {
        const has = (v) => levels.some(l => l.value === v);
        if (p === 'equipe') select.value = m.key === 'relatorio' ? '' : (has('edit') ? 'edit' : 'view');
        else if (p === 'relatorio') select.value = m.key === 'relatorio' ? (has('all') ? 'all' : 'edit') : '';
        else if (p === 'leitura') select.value = 'view';
        else if (p === 'nenhum') select.value = '';
      });
    });
    permSelects.forEach(({ select }) => select.addEventListener('change', () => { presetSel.value = ''; }));
    const permissionsBlock = el('fieldset', { class: 'invite-perms' }, [
      el('legend', { class: 'form-label', text: 'Permissões iniciais' }),
      el('div', { class: 'invite-perm-row invite-perm-preset' }, [
        el('label', { class: 'invite-perm-name', for: 'admin-invite-preset' }, [el('strong', { text: 'Perfil pronto' }), el('span', { text: 'Preenche os módulos abaixo de uma vez' })]),
        presetSel
      ]),
      ...permSelects.map(p => p.row),
      el('p', { class: 'admin-muted', style: 'margin:0.5rem 0 0;', text: 'Dá para ajustar depois na aba Permissões. Administradores têm acesso a tudo.' })
    ]);
    const inviteMsg = el('p', { class: 'auth-message', style: 'text-align:left;' });
    const inviteBtn = el('button', { type: 'submit', class: 'btn btn-primary btn-sm', text: 'Enviar convite' });
    const inviteForm = el('form', { novalidate: true }, [
      el('div', { class: 'admin-form-grid' }, [
        el('div', { class: 'form-group', style: 'margin:0;' }, [el('label', { class: 'form-label', for: 'admin-invite-name', text: 'Nome' }), name]),
        el('div', { class: 'form-group', style: 'margin:0;' }, [el('label', { class: 'form-label', for: 'admin-invite-email', text: 'E-mail' }), email])
      ]),
      permissionsBlock,
      el('div', { style: 'margin-top:1rem;' }, inviteBtn),
      inviteMsg
    ]);
    inviteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        inviteMsg.className = 'auth-message auth-message-error';
        inviteMsg.textContent = 'Informe um e-mail válido.';
        return;
      }
      inviteBtn.disabled = true;
      inviteMsg.className = 'auth-message';
      inviteMsg.textContent = 'Enviando convite...';
      const { data, error } = await client().functions.invoke('admin-invite-user', {
        body: {
          action: 'invite', email: email.value.trim(), full_name: name.value.trim(),
          redirect_to: window.location.href.split('#')[0],
          permissions: permSelects.flatMap(({ m, levels, select }) => (levels.find(l => l.value === select.value) || { actions: [] }).actions.map(action => ({ module_key: m.key, action })))
        }
      });
      inviteBtn.disabled = false;
      if (error || (data && data.error)) {
        inviteMsg.className = 'auth-message auth-message-error';
        inviteMsg.textContent = (data && data.error) || 'Não foi possível enviar o convite. Se a Edge Function admin-invite-user ainda não foi publicada, crie a conta em Supabase > Authentication > Users e depois atribua as permissões na aba Permissões.';
        return;
      }
      toast('Convite enviado.', 'success');
      reload('usuarios');
    });
    body.appendChild(el('div', { class: 'glass-card', style: 'margin-bottom:1.5rem;' }, [
      el('h3', { style: 'margin:0 0 0.35rem; font-size:1rem;', text: 'Convidar usuário' }),
      el('p', { class: 'admin-muted', style: 'margin:0 0 1rem;', text: 'O convidado recebe um e-mail e define a própria senha.' }),
      inviteForm
    ]));

  };
})();
