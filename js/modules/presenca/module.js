/**
 * CapacitaTE - Módulo Lista de Presença (um formulário para todos os dias; frequência por dia de envio)
 * Cada envio é registrado no dia em que foi feito (migração 0004d), então o quadro tem uma coluna por dia.
 * Versão: v.4.3.9
 */

(function () {
  const F = CapacitaTE.formModules;

  // Dias da capacitação (yyyy-mm-dd), do início ao fim
  function trainingDays(t) {
    const ok = (d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d);
    if (!ok(t.startDate)) return [];
    const end = ok(t.endDate) ? t.endDate : t.startDate;
    const days = [];
    for (let d = new Date(`${t.startDate}T12:00:00`), i = 0; d <= new Date(`${end}T12:00:00`) && i < 15; d.setDate(d.getDate() + 1), i++) {
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  }

  const dayLabel = (key) => (/^\d{4}-\d{2}-\d{2}$/.test(key) ? CapacitaTE.formats.formatDate(key) : key);

  F.register({
    key: 'presenca',
    title: 'Lista de Presença',
    stage: 2,
    order: 50,
    iconPaths: '<path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',

    async render(body, c) {
      const { el, training } = c;
      const canEdit = c.can('presenca', 'edit', training.id);
      const form = c.forms.find(f => f.session_key === 'unico');
      const legacy = c.forms.filter(f => f.session_key !== 'unico');

      if (!form) {
        body.append(el('div', { class: 'glass-card' }, [
          el('h3', { style: 'margin:0 0 0.5rem; font-size:1rem;', text: 'Ainda não há formulário de presença para esta capacitação.' }),
          el('p', { class: 'admin-muted', text: 'É um único link e QR Code para todos os dias. Cada registro fica com o dia em que foi feito, e a pessoa pode registrar presença em cada dia da capacitação.' }),
          canEdit ? el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Criar formulário de presença', onclick: async (e) => {
            e.currentTarget.disabled = true;
            try { await c.createForm('presenca', training, 'unico'); c.toast('Formulário criado e aberto: o link e o QR Code já funcionam.', 'success'); c.rerender(); }
            catch (err) { c.toast(c.errMsg(err), 'error'); e.currentTarget.disabled = false; }
          } }) : null
        ]));
      }

      const [att, reg] = await Promise.all([
        c.client().from('attendance').select('*').eq('training_id', training.id).order('submitted_at'),
        c.client().from('registrations').select('cpf, full_name, municipality, category').eq('training_id', training.id).eq('status', 'valida')
      ]);
      if (att.error) throw att.error;
      if (reg.error) throw reg.error;
      const attendance = att.data || [];
      const registrations = reg.data || [];

      // Colunas: dias da capacitação + qualquer outro dia/sessão que tenha registros
      const days = [...new Set([...trainingDays(training), ...attendance.map(a => a.session_key)])]
        .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }));

      if (form) {
        const card = c.formCard(form, c);
        body.append(card);
        if (canEdit) body.append(c.manualBox(form));
      }

      // Formulários por dia criados antes da v.3.9.3 (modelo anterior): só listar e permitir excluir
      if (legacy.length) {
        body.append(el('details', { class: 'glass-card forms-section forms-config' }, [
          el('summary', { text: `Formulários por dia do modelo anterior (${legacy.length})` }),
          el('p', { class: 'admin-muted', text: 'Agora a presença usa um único formulário. Estes formulários por dia continuam funcionando se já foram divulgados; exclua os que não forem usados.' }),
          ...legacy.map(s => el('div', { class: 'forms-toolbar' }, [
            el('span', { class: 'forms-section-title', text: `${(s.config && s.config.label) || s.session_key} · ${{ rascunho: 'Rascunho', aberto: 'Aberto', fechado: 'Encerrado' }[s.status]}` }),
            canEdit ? el('button', { type: 'button', class: 'btn btn-secondary btn-sm admin-danger-btn', text: 'Excluir', onclick: () => window.app.openConfirmModal({
              title: 'Excluir formulário por dia?', msg: `O link e o QR Code de "${(s.config && s.config.label) || s.session_key}" deixam de funcionar e os registros feitos por ele são removidos.`, btnText: 'Sim, excluir',
              successTitle: 'Formulário excluído', successMsg: 'A lista será atualizada.',
              onConfirm: async () => {
                const { error } = await c.client().from('forms').delete().eq('id', s.id);
                if (error) return c.toast(c.errMsg(error), 'error');
                await c.audit('form.delete', 'presenca', training.id, s.id, { session: s.session_key });
                c.rerender();
              }
            }) }) : null
          ]))
        ]));
      }

      if (!days.length && !attendance.length) return;

      // Quadro de frequência: inscritos + presentes não inscritos × dias
      const people = new Map();
      registrations.forEach(r => people.set(r.cpf, { cpf: r.cpf, name: r.full_name, municipality: r.municipality, category: r.category, registered: true }));
      attendance.forEach(a => { if (!people.has(a.cpf)) people.set(a.cpf, { cpf: a.cpf, name: a.full_name, municipality: a.municipality, category: a.category, registered: false }); });
      const presentSet = new Set(attendance.map(a => `${a.cpf}|${a.session_key}`));
      const boardBox = el('div');
      let term = '';
      let filter = 'todos';
      const drawBoard = () => {
        boardBox.textContent = '';
        const rows = [...people.values()]
          .map(p => {
            const marks = days.map(d => presentSet.has(`${p.cpf}|${d}`));
            return { p, marks, cert: marks.some(Boolean) }; // um dia de presença já dá direito ao certificado
          })
          .filter(({ p, cert }) => (filter === 'faltosos' ? !cert && p.registered : filter === 'naoinscritos' ? !p.registered : true))
          .filter(({ p }) => !term || `${p.name} ${p.municipality}`.toLowerCase().includes(term))
          .sort((a, b) => String(a.p.name).localeCompare(String(b.p.name), 'pt-BR'))
          .map(({ p, marks, cert }) => el('tr', {}, [
            el('td', {}, [p.name || '—', !p.registered ? el('span', { class: 'admin-chip', style: 'margin-left:0.4rem;', text: 'não inscrito' }) : null]),
            el('td', { text: p.municipality || '—' }),
            el('td', { text: p.category || '—' }),
            ...marks.map(m => el('td', { class: `perm-col ${m ? 'forms-present' : 'forms-absent'}`, text: m ? '✓' : '—', 'aria-label': m ? 'presente' : 'ausente' })),
            el('td', { class: `perm-col ${cert ? 'forms-present' : 'forms-absent'}`, text: cert ? 'Sim' : '—' })
          ]));
        boardBox.append(c.table(['Nome', 'Município', 'Categoria', ...days.map(dayLabel), 'Certificado'], rows, 'Ninguém neste filtro.'));
      };
      const filterSel = el('select', { class: 'form-control forms-filter', 'aria-label': 'Filtro' }, [
        el('option', { value: 'todos', text: 'Todos' }), el('option', { value: 'faltosos', text: 'Inscritos sem nenhuma presença' }), el('option', { value: 'naoinscritos', text: 'Somente não inscritos' })
      ]);
      filterSel.addEventListener('change', () => { filter = filterSel.value; drawBoard(); });
      body.append(el('div', { class: 'glass-card forms-section' }, [
        el('div', { class: 'forms-toolbar' }, [el('h3', { class: 'forms-section-title', text: `Quadro de frequência (${people.size} pessoas)` }), c.searchBox(v => { term = v; drawBoard(); }), filterSel]),
        boardBox
      ]));
      drawBoard();

      // Registros de presença
      const recRows = attendance.map(a => el('tr', {}, [
        el('td', { text: dayLabel(a.session_key) }),
        el('td', { text: a.full_name || '—' }),
        el('td', { text: c.maskCpf(a.cpf) }),
        el('td', { text: a.municipality || '—' }),
        el('td', { text: a.was_registered ? 'Sim' : 'Não' }),
        el('td', { text: c.fmtDateTime(a.submitted_at) }),
        el('td', { class: 'perm-col' }, canEdit ? c.deleteButton('attendance', a, 'presença') : null),
      ]));
      body.append(el('details', { class: 'glass-card forms-section forms-config' }, [
        el('summary', { text: `Registros de presença (${attendance.length})` }),
        c.table(['Dia', 'Nome', 'CPF', 'Município', 'Inscrito?', 'Registrado em', ''], recRows)
      ]));
      const trash = await c.trashSection('attendance', 'presenças');
      if (trash) body.append(trash);
    }
  });
})();
