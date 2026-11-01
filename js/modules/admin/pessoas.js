/**
 * CapacitaTE - Administração › Pessoas e Importar base
 * Versão: v.4.4.2
 */

(function () {
  CapacitaTE.adminViews = CapacitaTE.adminViews || {};

  // Cabeçalhos aceitos (sem acento, minúsculos) para cada campo de people. Reconhece as 3 planilhas do Google Forms.
  const SYNONYMS = {
    cpf: ['cpf'],
    full_name: ['nome completo', 'nome'],
    email: ['e-mail', 'email', 'endereco de e-mail'],
    birth_date: ['data de nascimento', 'nascimento'],
    phone: ['telefone', 'celular', 'whatsapp'],
    municipality: ['municipio', 'cidade'],
    category: ['categoria', 'voce representa', 'representacao'],
    role_gestao: ['cargo na gestao municipal', 'cargo gestao', 'cargo'],
    role_cacs: ['cargo no cacs-fundeb', 'cargo cacs']
  };
  const FIELD_LABELS = { cpf: 'CPF', full_name: 'Nome', email: 'E-mail', birth_date: 'Nascimento', phone: 'Telefone', municipality: 'Município', category: 'Categoria', role_gestao: 'Cargo (gestão)', role_cacs: 'Cargo (CACS)' };

  const plain = (v) => String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[:*]/g, '').replace(/\s+/g, ' ').trim();

  function suggestMapping(header) {
    const map = {};
    const norm = header.map(plain);
    Object.entries(SYNONYMS).forEach(([field, syns]) => {
      let idx = norm.findIndex(h => syns.includes(h));
      if (idx === -1) idx = norm.findIndex(h => syns.some(s => h.startsWith(s + ' ') || (s.length > 3 && h.includes(s))));
      map[field] = idx;
    });
    return map;
  }

  const toIso = (v) => {
    if (v instanceof Date && !isNaN(v)) return `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(2, '0')}-${String(v.getDate()).padStart(2, '0')}`;
    const m = String(v || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
    return /^\d{4}-\d{2}-\d{2}/.test(String(v || '')) ? String(v).slice(0, 10) : '';
  };
  const normCategory = (v) => {
    const t = plain(v);
    if (/cacs|fundeb/.test(t)) return 'CACS-FUNDEB';
    return t ? 'Gestão municipal' : '';
  };


  // Colunas extras das respostas (carimbo, caso de sucesso e campos da avaliação), reconhecidas pelo início do cabeçalho
  const RESPONSE_HEADERS = {
    submitted_at: ['carimbo de data/hora', 'carimbo de data hora'],
    success_case: ['caso de sucesso', 'case de sucesso'],
    liked: ['indique dois aspectos que voce mais gostou'],
    improve: ['indique dois aspectos que poderiam ser melhorados'],
    institution_type: ['instituicao vinculada'],
    institution_name: ['mencionar a instituicao'],
    topics_suggestion: ['sugestao de temas'],
    heard_from: ['como ficou sabendo'],
    comments: ['comentarios']
  };
  const findCol = (header, starts) => header.map(plain).findIndex(h => starts.some(x => h.startsWith(x)));

  // Carimbo do Google Forms (Date, serial do Excel ou "dd/mm/aaaa hh:mm:ss") -> ISO com fuso de Brasília (-03:00)
  function stampToIso(v) {
    if (v instanceof Date && !isNaN(v)) {
      const p = (n) => String(n).padStart(2, '0');
      return `${v.getFullYear()}-${p(v.getMonth() + 1)}-${p(v.getDate())}T${p(v.getHours())}:${p(v.getMinutes())}:${p(v.getSeconds())}-03:00`;
    }
    const m = String(v || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
    if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}T${(m[4] || '12').padStart(2, '0')}:${m[5] || '00'}:${m[6] || '00'}-03:00`;
    return '';
  }

  // ---------- Pessoas ----------
  CapacitaTE.adminViews.pessoas = async function (body) {
    const { el, client, toast, errorMessage, fmtDateTime } = CapacitaTE.adminUI;
    const maskCpf = (c) => CapacitaTE.cpf.mask(c) || '—';
    body.textContent = '';
    const listBox = el('div');
    const detailBox = el('div');
    let term = '';
    const search = el('input', { class: 'form-control forms-search', type: 'search', placeholder: 'Buscar por CPF, nome ou município', 'aria-label': 'Buscar pessoas' });
    let timer = null;

    const load = async () => {
      listBox.textContent = '';
      listBox.append(el('p', { class: 'admin-muted', text: 'Buscando...' }));
      let q = client().from('people').select('cpf, full_name, email, municipality, category, source, updated_at').order('full_name').limit(100);
      const digits = term.replace(/\D/g, '');
      const safe = term.replace(/[%,()]/g, ' ');
      if (digits.length >= 3 && digits.length === term.replace(/[.\-\s]/g, '').length) q = q.like('cpf', `${digits}%`);
      else if (term) q = q.or(`full_name.ilike.%${safe}%,municipality.ilike.%${safe}%`);
      const { data, error } = await q;
      listBox.textContent = '';
      if (error) { listBox.append(el('p', { class: 'auth-message-error', text: errorMessage(error) })); return; }
      const rows = (data || []).map(p => el('tr', {}, [
        el('td', { text: p.full_name }), el('td', { text: maskCpf(p.cpf) }), el('td', { text: p.municipality || '—' }), el('td', { text: p.category || '—' }),
        el('td', { text: p.source }), el('td', { class: 'perm-col' }, el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Abrir', onclick: () => showDetail(p.cpf) }))
      ]));
      listBox.append(rows.length
        ? el('div', { class: 'data-table-container', style: 'overflow-x:auto;' }, el('table', { class: 'data-table admin-table' }, [
          el('thead', {}, el('tr', {}, ['Nome', 'CPF', 'Município', 'Categoria', 'Origem', ''].map(h => el('th', { text: h })))), el('tbody', {}, rows)
        ]))
        : el('p', { class: 'admin-muted', text: 'Nenhuma pessoa encontrada.' }));
      if ((data || []).length === 100) listBox.append(el('p', { class: 'admin-muted', text: 'Mostrando as 100 primeiras. Refine a busca.' }));
    };
    search.addEventListener('input', () => { term = search.value.trim(); clearTimeout(timer); timer = setTimeout(load, 300); });

    async function showDetail(cpf) {
      detailBox.textContent = '';
      detailBox.append(el('p', { class: 'admin-muted', text: 'Carregando...' }));
      const [person, hist] = await Promise.all([
        client().from('people').select('*').eq('cpf', cpf).single(),
        client().rpc('staff_person_history', { p_cpf: cpf })
      ]);
      detailBox.textContent = '';
      if (person.error || hist.error) { detailBox.append(el('p', { class: 'auth-message-error', text: errorMessage(person.error || hist.error) })); return; }
      const p = person.data;
      const h = hist.data || {};
      const inputs = {};
      const field = (key, label, type = 'text') => {
        inputs[key] = el('input', { class: 'form-control', type, value: p[key] || '', 'aria-label': label });
        return el('div', { class: 'form-group', style: 'margin:0;' }, [el('label', { class: 'form-label', text: label }), inputs[key]]);
      };
      const mini = (title, items, fmt) => el('div', {}, [
        el('strong', { text: `${title} (${items.length})` }),
        items.length ? el('ul', { style: 'margin:0.3rem 0 0 1rem;' }, items.map(i => el('li', { text: fmt(i) }))) : el('p', { class: 'admin-muted', style: 'margin:0.2rem 0 0;', text: 'Nenhuma.' })
      ]);
      detailBox.append(el('div', { class: 'glass-card', style: 'margin-top:1rem;' }, [
        el('h3', { style: 'margin:0 0 0.2rem; font-size:1rem;', text: p.full_name }),
        el('p', { class: 'admin-muted', style: 'margin:0 0 0.8rem;', text: `CPF ${CapacitaTE.cpf.format(p.cpf)} · origem ${p.source} · atualizado em ${fmtDateTime(p.updated_at)}` }),
        el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.8rem;' }, [
          field('full_name', 'Nome'), field('email', 'E-mail', 'email'), field('phone', 'Telefone (só dígitos)'), field('municipality', 'Município'), field('birth_date', 'Nascimento', 'date')
        ]),
        el('div', { class: 'admin-actions', style: 'margin-top:0.8rem;' }, el('button', {
          type: 'button', class: 'btn btn-primary btn-sm', text: 'Salvar alterações', onclick: async (e) => {
            const btn = e.currentTarget;
            btn.disabled = true;
            const patch = {
              full_name: inputs.full_name.value.trim(), email: inputs.email.value.trim() || null, phone: inputs.phone.value.replace(/\D/g, '') || null,
              municipality: inputs.municipality.value.trim() || null, birth_date: inputs.birth_date.value || null, updated_at: new Date().toISOString()
            };
            if (!patch.full_name) { toast('O nome não pode ficar vazio.', 'warning'); btn.disabled = false; return; }
            const { error } = await client().from('people').update(patch).eq('cpf', cpf);
            if (error) toast(errorMessage(error), 'error');
            else {
              toast('Pessoa atualizada.', 'success');
              if (CapacitaTE.audit) await CapacitaTE.audit.log('person.edit', { module: 'admin', target: maskCpf(cpf) });
              load();
            }
            btn.disabled = false;
          }
        })),
        el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-top:1rem;' }, [
          mini('Inscrições', h.inscricoes || [], i => `${i.training_id} · ${fmtDateTime(i.em)}${i.status === 'cancelada' ? ' · cancelada' : ''}`),
          mini('Presenças', h.presencas || [], i => `${i.training_id} · ${i.dia}`),
          mini('Avaliações', h.avaliacoes || [], i => `${i.training_id} · ${fmtDateTime(i.em)}`)
        ])
      ]));
    }

    body.append(el('div', { class: 'glass-card' }, [
      el('div', { class: 'forms-toolbar' }, [el('h3', { class: 'forms-section-title', text: 'Pessoas (cadastro único por CPF)' }), search]),
      listBox
    ]), detailBox);
    load();
  };

  // ---------- Importar base ----------
  CapacitaTE.adminViews.importar = async function (body) {
    const { el, client, toast, errorMessage } = CapacitaTE.adminUI;
    body.textContent = '';
    const state = { rows: [], header: [], mapping: {}, policy: 'vazios' };
    const out = el('div');
    const fileInput = el('input', { type: 'file', accept: '.xlsx,.xls,.csv', 'aria-label': 'Arquivo da base' });

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      try {
        const { sheets, sheetNames } = await window.excelParser.readWorkbook(file);
        const sheet = sheets[sheetNames[0]] || [];
        state.header = (sheet[0] || []).map(h => String(h || ''));
        state.rows = sheet.slice(1).filter(r => r.some(c => c !== null && String(c).trim() !== ''));
        state.mapping = suggestMapping(state.header);
        await preview();
      } catch (err) { toast(`Não foi possível ler o arquivo: ${err.message}`, 'error'); }
    });

    function build() {
      const g = (r, f) => (state.mapping[f] >= 0 ? r[state.mapping[f]] : '');
      const good = new Map();
      const rejected = [];
      let dupInFile = 0;
      state.rows.forEach((r, i) => {
        const raw = String(g(r, 'cpf') || '').trim();
        const cpf = raw.replace(/\D/g, '').padStart(11, '0').slice(-11);
        const name = String(g(r, 'full_name') || '').trim();
        const reason = !raw ? 'CPF vazio' : !CapacitaTE.cpf.isValid(cpf) ? 'CPF inválido' : !name ? 'Nome vazio' : '';
        if (reason) { rejected.push({ linha: i + 2, cpf: raw, nome: name, motivo: reason }); return; }
        if (good.has(cpf)) dupInFile++; // vale a última linha do arquivo (as planilhas do Forms vêm em ordem de carimbo)
        good.set(cpf, {
          cpf, full_name: name, email: String(g(r, 'email') || '').trim(), birth_date: toIso(g(r, 'birth_date')), phone: String(g(r, 'phone') || ''),
          municipality: String(g(r, 'municipality') || '').trim(), category: normCategory(g(r, 'category')),
          role_gestao: String(g(r, 'role_gestao') || '').trim(), role_cacs: String(g(r, 'role_cacs') || '').trim()
        });
      });
      return { good: [...good.values()], rejected, dupInFile };
    }

    function downloadRejected(list) {
      const aoa = [['Linha', 'CPF', 'Nome', 'Motivo'], ...list.map(r => [r.linha, r.cpf, r.nome, r.motivo])];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Rejeitadas');
      XLSX.writeFile(wb, 'importacao-linhas-rejeitadas.xlsx');
    }

    async function preview() {
      out.textContent = '';
      const mapSel = Object.keys(FIELD_LABELS).map(f => {
        const sel = el('select', { class: 'form-control', 'aria-label': FIELD_LABELS[f] }, [
          el('option', { value: '-1', text: '— ignorar —' }),
          ...state.header.map((h, i) => el('option', { value: String(i), text: h || `(coluna ${i + 1})` }))
        ]);
        sel.value = String(state.mapping[f]);
        sel.addEventListener('change', () => { state.mapping[f] = Number(sel.value); preview(); });
        return el('div', { class: 'form-group', style: 'margin:0;' }, [el('label', { class: 'form-label', text: FIELD_LABELS[f] }), sel]);
      });
      const { good, rejected, dupInFile } = build();
      const existing = new Set();
      for (let i = 0; i < good.length; i += 200) {
        const { data } = await client().from('people').select('cpf').in('cpf', good.slice(i, i + 200).map(x => x.cpf));
        (data || []).forEach(p => existing.add(p.cpf));
      }
      const novos = good.filter(x => !existing.has(x.cpf)).length;
      const policy = el('select', { class: 'form-control', 'aria-label': 'Política de conflito' }, [
        el('option', { value: 'vazios', text: 'Preencher só campos vazios (padrão)' }), el('option', { value: 'sobrescrever', text: 'Sobrescrever com o arquivo' })
      ]);
      policy.value = state.policy;
      policy.addEventListener('change', () => { state.policy = policy.value; });
      const go = el('button', {
        type: 'button', class: 'btn btn-primary btn-sm', text: `Importar ${good.length} pessoa(s)`, disabled: !good.length, onclick: async (e) => {
          const btn = e.currentTarget;
          btn.disabled = true;
          const total = { novos: 0, atualizados: 0, iguais: 0, invalidos: 0 };
          try {
            for (let i = 0; i < good.length; i += 500) {
              const { data, error } = await client().rpc('admin_import_people', { p_rows: good.slice(i, i + 500), p_policy: state.policy });
              if (error) throw error;
              Object.keys(total).forEach(k => { total[k] += data[k] || 0; });
            }
            toast(`Importação concluída: ${total.novos} novas, ${total.atualizados} atualizadas, ${total.iguais} iguais.`, 'success', 7000);
            if (rejected.length) downloadRejected(rejected);
          } catch (err) { toast(errorMessage(err), 'error'); }
          btn.disabled = false;
        }
      });
      out.append(el('div', { class: 'glass-card forms-section', style: 'margin-top:1rem;' }, [
        el('h3', { class: 'forms-section-title', text: 'Colunas encontradas' }),
        el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.7rem;' }, mapSel),
        el('h3', { class: 'forms-section-title', style: 'margin-top:1rem;', text: 'Pré-visualização' }),
        el('div', { class: 'forms-stats' }, [['novos', novos], ['já existem', good.length - novos], ['rejeitados', rejected.length], ['repetidos no arquivo', dupInFile]]
          .map(([l, n]) => el('div', {}, [el('strong', { text: String(n) }), el('span', { text: l })]))),
        el('div', { class: 'forms-toolbar', style: 'margin-top:1rem;' }, [policy, go]),
        rejected.length ? el('p', { class: 'admin-muted', text: 'As linhas rejeitadas (CPF vazio ou inválido, nome vazio) saem numa planilha ao fim da importação.' }) : null
      ]));
      out.append(responsesCard(good.length));
    }

    // Importar também como respostas de uma capacitação (traz as capacitações antigas para o banco)
    function responsesCard(validCount) {
      const trainings = [...((window.app && window.app.trainingList) || [])].sort((a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0));
      const trSel = el('select', { class: 'form-control', 'aria-label': 'Capacitação' }, [el('option', { value: '', text: 'Escolha a capacitação...' }),
        ...trainings.map(t => el('option', { value: t.id, text: `${t.number ? `${t.number}ª` : ''} ${t.polo || ''}${t.uf ? ` (${t.uf})` : ''}`.trim() }))]);
      const typeSel = el('select', { class: 'form-control', 'aria-label': 'Tipo de planilha' }, [
        el('option', { value: 'inscricao', text: 'Inscrições' }), el('option', { value: 'presenca', text: 'Lista de presença' }), el('option', { value: 'avaliacao', text: 'Avaliações' })]);
      const msg = el('p', { class: 'admin-muted', style: 'margin:0.6rem 0 0;' });
      const go = el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Importar como respostas', disabled: !validCount, onclick: async (e) => {
        const btn = e.currentTarget;
        if (!trSel.value) return toast('Escolha a capacitação.', 'warning');
        btn.disabled = true;
        msg.textContent = 'Importando...';
        try {
          const mod = typeSel.value;
          const { data: forms, error: fe } = await client().from('forms').select('*').eq('training_id', trSel.value).eq('module_key', mod);
          if (fe) throw fe;
          const form = (forms || []).find(f => f.session_key === 'unico') || (forms || [])[0];
          if (!form) throw new Error('Essa capacitação ainda não tem o formulário deste tipo. Crie-o na página da capacitação e tente de novo.');
          const items = (form.config && form.config.ratingItems && form.config.ratingItems.length) ? form.config.ratingItems : CapacitaTE.formSchema.DEFAULTS.ratingItems;
          const ratingCols = state.header.map((h, i) => ({ i, label: (String(h).match(/\[(.+)\]\s*$/) || [])[1] })).filter(c => c.label)
            .map(c => ({ i: c.i, key: (items.find(it => plain(it.label) === plain(c.label)) || {}).key })).filter(c => c.key);
          const col = {};
          Object.entries(RESPONSE_HEADERS).forEach(([k, starts]) => { col[k] = findCol(state.header, starts); });
          const g = (r, f) => (state.mapping[f] >= 0 ? r[state.mapping[f]] : '');
          const rows = [];
          state.rows.forEach(r => {
            const cpf = String(g(r, 'cpf') || '').replace(/\D/g, '').padStart(11, '0').slice(-11);
            const name = String(g(r, 'full_name') || '').trim();
            if (!CapacitaTE.cpf.isValid(cpf) || !name) return;
            const val = (k) => (col[k] >= 0 && r[col[k]] !== null && r[col[k]] !== undefined ? String(r[col[k]]).trim() : '');
            const ratings = {};
            ratingCols.forEach(c => { const n = Number(r[c.i]); if (n >= 1 && n <= 5) ratings[c.key] = n; });
            const iso = col.submitted_at >= 0 ? stampToIso(r[col.submitted_at]) : '';
            rows.push({
              cpf, full_name: name, email: String(g(r, 'email') || '').trim(), birth_date: toIso(g(r, 'birth_date')), phone: String(g(r, 'phone') || ''),
              municipality: String(g(r, 'municipality') || '').trim(), category: normCategory(g(r, 'category')),
              role_gestao: String(g(r, 'role_gestao') || '').trim(), role_cacs: String(g(r, 'role_cacs') || '').trim(), success_case: val('success_case'),
              submitted_at: iso, ratings, liked: val('liked'), improve: val('improve'), institution_type: val('institution_type'),
              institution_name: val('institution_name'), topics_suggestion: val('topics_suggestion'), heard_from: val('heard_from'), comments: val('comments')
            });
          });
          const total = { gravadas: 0, repetidas: 0, invalidas: 0 };
          for (let i = 0; i < rows.length; i += 500) {
            const { data, error } = await client().rpc('admin_import_responses', { p_form: form.id, p_rows: rows.slice(i, i + 500) });
            if (error) throw error;
            Object.keys(total).forEach(k => { total[k] += data[k] || 0; });
          }
          msg.textContent = `Concluído: ${total.gravadas} gravadas, ${total.repetidas} repetidas (já existiam), ${total.invalidas} inválidas.`;
          toast(msg.textContent, 'success', 8000);
        } catch (err) { msg.textContent = errorMessage(err); toast(errorMessage(err), 'error', 8000); }
        btn.disabled = false;
      } });
      return el('div', { class: 'glass-card forms-section', style: 'margin-top:1rem;' }, [
        el('h3', { class: 'forms-section-title', text: 'Importar também como respostas de uma capacitação (opcional)' }),
        el('p', { class: 'admin-muted', text: 'Para trazer capacitações antigas para o banco. Use a planilha original do Google Forms: o carimbo de data/hora é mantido. Quem já tem resposta é contado como repetida e não muda. Não envia e-mail. A capacitação precisa ter o formulário do tipo escolhido (crie-o na página da capacitação, mesmo em rascunho).' }),
        el('div', { class: 'forms-toolbar' }, [trSel, typeSel, go]), msg
      ]);
    }

    body.append(el('div', { class: 'glass-card' }, [
      el('h3', { class: 'forms-section-title', text: 'Importar base de pessoas' }),
      el('p', { class: 'admin-muted', text: 'Envie uma planilha (.xlsx, .xls ou .csv) com CPF e nome. Reconhecemos os cabeçalhos das planilhas de inscrição, presença e avaliação do Google Forms. Nada é gravado antes de você clicar em Importar.' }),
      fileInput
    ]), out);
  };
})();
