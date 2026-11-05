/**
 * CapacitaTE - Módulo Avaliação (formulário, taxa de resposta, médias por item e respostas)
 * Versão: v.4.4.3
 */

(function () {
  const F = CapacitaTE.formModules;

  F.register({
    key: 'avaliacao',
    title: 'Avaliação',
    stage: 2,
    order: 60,
    iconPaths: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',

    async render(body, c) {
      const { el, training } = c;
      const form = c.forms.find(f => f.session_key === 'unico') || c.forms[0];
      const canEdit = c.can('avaliacao', 'edit', training.id);

      if (!form) {
        body.append(el('div', { class: 'glass-card' }, [
          el('h3', { style: 'margin:0 0 0.5rem; font-size:1rem;', text: 'Ainda não há formulário de avaliação para esta capacitação.' }),
          el('p', { class: 'admin-muted', text: 'Ele já é criado aberto (o link e o QR Code funcionam na hora), com os 7 itens de nota e as opções do formulário do Google usados hoje.' }),
          canEdit ? el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Criar formulário de avaliação', onclick: async (e) => {
            e.currentTarget.disabled = true;
            try { await c.createForm('avaliacao', training, 'unico'); c.toast('Formulário criado e aberto: o link e o QR Code já funcionam.', 'success'); c.rerender(); }
            catch (err) { c.toast(c.errMsg(err), 'error'); e.currentTarget.disabled = false; }
          } }) : null
        ]));
        return;
      }

      body.append(c.formCard(form, c));

      const [ev, att] = await Promise.all([
        c.client().from('evaluations').select('*').eq('training_id', training.id).order('submitted_at'),
        c.client().from('attendance').select('cpf').eq('training_id', training.id)
      ]);
      if (ev.error) throw ev.error;
      if (att.error) throw att.error;
      const evals = ev.data || [];
      const presentes = new Set((att.data || []).map(a => a.cpf)).size;
      const items = (form.config && form.config.ratingItems && form.config.ratingItems.length) ? form.config.ratingItems : CapacitaTE.formSchema.DEFAULTS.ratingItems;

      // Prévia dos resultados: médias por item, geral e separação CACS × Gestão
      const avg = (list, key) => {
        const vals = list.map(e => Number(e.ratings && e.ratings[key])).filter(v => v >= 1 && v <= 5);
        return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) : null;
      };
      const fmtAvg = (v) => (v === null ? '—' : v.toFixed(2).replace('.', ','));
      const cacs = evals.filter(e => e.category === 'CACS-FUNDEB');
      const gest = evals.filter(e => e.category === 'Gestão municipal');
      const rows = items.map(it => el('tr', {}, [
        el('td', { text: it.label }),
        el('td', { class: 'perm-col', text: fmtAvg(avg(evals, it.key)) }),
        el('td', { class: 'perm-col', text: fmtAvg(avg(cacs, it.key)) }),
        el('td', { class: 'perm-col', text: fmtAvg(avg(gest, it.key)) }),
        el('td', {}, el('div', { class: 'eval-bar', role: 'img', 'aria-label': `Média geral ${fmtAvg(avg(evals, it.key))} de 5` }, el('span', { style: `width:${((avg(evals, it.key) || 0) / 5) * 100}%` })))
      ]));
      const rate = presentes ? Math.round((evals.length / presentes) * 100) : null;
      body.append(el('div', { class: 'glass-card forms-section' }, [
        el('h3', { class: 'forms-section-title', text: 'Prévia dos resultados' }),
        el('div', { class: 'forms-stats' }, [
          el('div', {}, [el('strong', { text: String(evals.length) }), el('span', { text: 'avaliações' })]),
          el('div', {}, [el('strong', { text: String(presentes) }), el('span', { text: 'presentes (CPFs distintos)' })]),
          el('div', {}, [el('strong', { text: rate === null ? '—' : `${rate}%` }), el('span', { text: 'taxa de resposta' })])
        ]),
        c.table(['Item', 'Média geral', 'CACS-FUNDEB', 'Gestão municipal', 'Gráfico (0 a 5)'], rows),
        el('p', { class: 'admin-muted', style: 'margin-top:0.6rem;', text: 'Os gráficos e nuvens de palavras completos continuam no Relatório (etapas 8 e 12).' })
      ]));


      // Distribuição das notas (1 a 5) por item e palavras mais citadas nos comentários
      const STOP = new Set('a o as os um uma de da do das dos e em no na nos nas para por com sem que se foi ser sao mais muito muita muitos tambem como mas ao aos ou ja nao sim isso essa esse este esta ela ele foram tem ter ate sobre entre quando bem pouco poderia poderiam seria curso formacao capacitacao aspectos'.split(' '));
      const plain = (v) => String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      const freq = new Map();
      evals.forEach(e => [e.liked, e.improve, e.comments].forEach(txt => plain(txt).split(/[^a-z]+/).filter(w => w.length > 3 && !STOP.has(w)).forEach(w => freq.set(w, (freq.get(w) || 0) + 1))));
      const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24);
      const maxF = top.length ? top[0][1] : 1;
      const dist = [1, 2, 3, 4, 5].map(n => ({ n, c: evals.filter(e => Number(e.ratings && e.ratings.geral) === n).length }));
      const maxD = Math.max(1, ...dist.map(d => d.c));
      body.append(el('div', { class: 'glass-card forms-section' }, [
        el('h3', { class: 'forms-section-title', text: 'Nota geral e palavras mais citadas' }),
        el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.2rem;' }, [
          el('div', {}, [el('strong', { text: 'Distribuição da nota geral' }),
            ...dist.map(d => el('div', { class: 'eval-dist-row' }, [el('span', { text: `Nota ${d.n}` }), el('div', { class: 'eval-bar' }, el('span', { style: `width:${(d.c / maxD) * 100}%` })), el('span', { text: String(d.c) })]))]),
          el('div', {}, [el('strong', { text: 'Palavras mais citadas (gostou, melhorar e comentários)' }),
            top.length ? el('div', { class: 'eval-words' }, top.map(([w, n]) => el('span', { class: 'eval-word', style: `font-size:${(0.8 + (n / maxF) * 1.1).toFixed(2)}rem;`, title: `${n} citação(ões)`, text: w })))
              : el('p', { class: 'admin-muted', text: 'Ainda não há comentários.' })])
        ])
      ]));

      // Respostas
      const listBox = el('div');
      let term = '';
      const draw = () => {
        listBox.textContent = '';
        const rs = evals
          .filter(e => !term || `${e.full_name} ${e.municipality} ${e.institution_name}`.toLowerCase().includes(term))
          .map(e => el('tr', {}, [
            el('td', { text: e.full_name || '—' }),
            el('td', { text: c.maskCpf(e.cpf) }),
            el('td', { text: e.municipality || '—' }),
            el('td', { text: e.category || '—' }),
            el('td', { class: 'perm-col', text: String((e.ratings && e.ratings.geral) || '—') }),
            el('td', { text: e.institution_name || '—' }),
            el('td', { text: c.fmtDateTime(e.submitted_at) }),
            el('td', { class: 'perm-col' }, canEdit ? c.deleteButton('evaluations', e, 'avaliação') : null)
          ]));
        listBox.append(c.table(['Nome', 'CPF', 'Município', 'Categoria', 'Nota geral', 'Instituição', 'Enviada em', ''], rs, term ? 'Nada encontrado.' : 'Nenhuma avaliação ainda.'));
      };
      body.append(el('div', { class: 'glass-card forms-section' }, [
        el('div', { class: 'forms-toolbar' }, [el('h3', { class: 'forms-section-title', text: `Respostas (${evals.length})` }), c.searchBox(v => { term = v; draw(); })]),
        listBox
      ]));
      draw();
      const trash = await c.trashSection('evaluations', 'avaliações');
      if (trash) body.append(trash);
    }
  });
})();
