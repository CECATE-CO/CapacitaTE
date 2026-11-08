/**
 * CapacitaTE - Página da Capacitação: as três etapas do trabalho em um só lugar
 *   1. Cadastro e inscrição (dados da capacitação + formulário de inscrição com QR Code)
 *   2. Presença e avaliação (sessões de presença e avaliação com QR Code; exportação em Excel)
 *   3. Avaliação (o Relatório final fica em Relatórios › Relatório final)
 * Rota: #capacitacao/<id>[/<etapa>]
 * Versão: v.4.4.6
 */

(function () {
  const F = CapacitaTE.formModules;
  const el = F.el;

  const STAGES = [
    { n: 1, title: 'Cadastro e inscrição', hint: 'Dados da capacitação e formulário de inscrição' },
    { n: 2, title: 'Presença', hint: 'Link e QR Code de presença, frequência e exportação' },
    { n: 3, title: 'Avaliação', hint: 'Link e QR Code da avaliação, resultados e exportação' }
  ];

  function summaryCard(training) {
    const muns = F.trainingMunicipalities(training);
    const canEdit = CapacitaTE.can('relatorio', 'edit', training.id);
    const item = (label, value) => el('div', { class: 'cap-summary-item' }, [el('span', { text: label }), el('strong', { text: value || '—' })]);
    return el('div', { class: 'glass-card forms-section' }, [
      el('div', { class: 'forms-toolbar' }, [
        el('h3', { class: 'forms-section-title', text: 'Dados da capacitação' }),
        canEdit ? el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Editar dados', onclick: () => window.app.openWizard(training.id, 1, { mode: 'cadastro' }) }) : null,
        canEdit ? el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Cidades convidadas', onclick: () => window.app.openWizard(training.id, 3, { mode: 'cadastro' }) }) : null
      ]),
      el('div', { class: 'cap-summary' }, [
        item('Polo', `${training.polo || ''}${training.uf ? ` (${training.uf})` : ''}`),
        item('Datas', training.datesFormatted),
        item('Local', [training.locationVenue, training.locationAddress].filter(Boolean).join(' – ')),
        item('Carga horária', training.workload ? (/hora/i.test(String(training.workload)) ? String(training.workload) : `${training.workload} horas`) : ''),
        item('Cidades convidadas', muns.length ? String(muns.length) : 'nenhuma ainda')
      ]),
      !muns.length ? el('p', { class: 'forms-warn', text: 'Cadastre as cidades convidadas antes de criar o formulário de inscrição: elas formam a lista "Município que representa".' }) : null,
      el('p', { class: 'admin-muted', style: 'margin:0.75rem 0 0;', text: 'O cadastro da capacitação tem só a identificação e as cidades convidadas; as demais informações são preenchidas no Relatório final. As cidades podem ser alteradas mesmo depois de gerar o link: o formulário avisa e atualiza a lista sem trocar o link nem o QR Code.' })
    ]);
  }

  /**
   * Exportação em Excel no formato das planilhas do Google Forms (js/core/xlsxExport.js)
   */
  async function exportModule(mod, training) {
    const client = F.client();
    const X = CapacitaTE.xlsxExport;
    const { data: forms, error: fErr } = await client.from('forms').select('*').eq('training_id', training.id).eq('module_key', mod);
    if (fErr) throw fErr;
    const form = (forms || []).find(f => f.session_key === 'unico') || (forms || [])[0];
    let aoa;
    let municipalities = [];
    if (mod === 'inscricao') {
      const { data, error } = await client.from('registrations').select('*').eq('training_id', training.id);
      if (error) throw error;
      aoa = X.registrationRows(data || [], { truthStatement: (form && form.config && form.config.truthStatement) || undefined });
      municipalities = ((form && form.config && form.config.municipalities) || F.trainingMunicipalities(training)).map(m => m.name);
    } else if (mod === 'presenca') {
      const { data, error } = await client.from('attendance').select('*').eq('training_id', training.id);
      if (error) throw error;
      aoa = await X.attendanceRowsComplete(client, data || [], training.id);
    } else {
      const { data, error } = await client.from('evaluations').select('*').eq('training_id', training.id);
      if (error) throw error;
      aoa = X.evaluationRows(data || [], { ratingItems: form && form.config && form.config.ratingItems });
    }
    if (aoa.length <= 1) {
      F.toast('Ainda não há respostas para exportar.', 'warning');
      return;
    }
    X.download(X.workbook(mod, aoa, { municipalities }), X.fileName(mod, training.number));
    if (CapacitaTE.audit) await CapacitaTE.audit.log('export', { module: mod, trainingId: training.id, details: { linhas: aoa.length - 1 } });
    F.toast(`Planilha exportada (${aoa.length - 1} respostas).`, 'success');
  }

  function exportCard(training, only) {
    const items = [['inscricao', 'Inscrições'], ['presenca', 'Lista de presença'], ['avaliacao', 'Avaliação']].filter(([m]) => !only || only.includes(m));
    return el('div', { class: 'glass-card forms-section' }, [
      el('h3', { class: 'forms-section-title', text: 'Exportar em Excel' }),
      el('p', { class: 'admin-muted', text: 'Planilhas no mesmo formato do Google Forms (mesmas abas, colunas e textos), prontas para o Relatório final ou para enviar ao FNDE.' }),
      el('div', { class: 'admin-actions' }, items.map(([mod, label]) => {
        const allowed = CapacitaTE.can(mod, 'export', training.id);
        return el('button', {
          type: 'button', class: 'btn btn-secondary btn-sm', disabled: !allowed,
          title: allowed ? `Baixar ${label} (.xlsx)` : 'Você não tem permissão para exportar este módulo',
          text: `${label} (.xlsx)`,
          onclick: async (e) => {
            const btn = e.currentTarget;
            btn.disabled = true;
            try { await exportModule(mod, training); } catch (err) { F.toast(F.errMsg(err), 'error'); } finally { btn.disabled = false; }
          }
        });
      }))
    ]);
  }

  async function open(trainingId, stage) {
    const container = document.getElementById('module-container');
    if (!container || !window.app) return;
    window.app.navigateTo('module', false);
    const nav = document.getElementById('nav-trainings');
    if (nav) nav.classList.add('active');
    container.textContent = '';
    container.append(el('p', { class: 'admin-muted', text: 'Carregando...' }));

    const id = decodeURIComponent(trainingId);
    const training = await F.loadTraining(id);
    container.textContent = '';
    if (!training) {
      container.append(el('div', { class: 'glass-card' }, el('p', { class: 'auth-message-error', text: 'Capacitação não encontrada neste navegador. Use "Sincronizar" e tente de novo.' })));
      return;
    }
    const current = [1, 2, 3].includes(Number(stage)) ? Number(stage) : 1;
    const loggedIn = !CapacitaTE.auth || CapacitaTE.auth.mode === 'authenticated';

    container.append(
      el('div', { class: 'forms-header' }, [
        el('div', {}, [
          el('a', { href: '#trainings', class: 'cap-back', text: '← Capacitações' }),
          el('h2', { style: 'margin:0.25rem 0 0;', text: F.trainingTitle(training) }),
          el('p', { style: 'color:var(--text-secondary); margin:0.25rem 0 0;', text: [training.datesFormatted, training.locationVenue].filter(Boolean).join(' · ') })
        ])
      ]),
      el('nav', { class: 'cap-stages', 'aria-label': 'Etapas da capacitação' }, STAGES.map(s => el('a', {
        href: `#capacitacao/${encodeURIComponent(id)}/${s.n}`,
        class: `cap-stage${s.n === current ? ' active' : ''}`,
        'aria-current': s.n === current ? 'step' : null
      }, [el('span', { class: 'cap-stage-n', text: String(s.n) }), el('span', { class: 'cap-stage-text' }, [el('strong', { text: s.title }), el('small', { text: s.hint })])])))
    );

    const body = el('div', { class: 'cap-body' });
    container.append(body);
    const needLogin = () => body.append(el('div', { class: 'glass-card' }, el('p', { class: 'admin-muted', text: 'Entre com a sua conta para usar os formulários: eles ficam no banco de dados na nuvem.' })));

    if (current === 1) {
      body.append(summaryCard(training));
      const box = el('div');
      body.append(el('h3', { class: 'cap-subtitle', text: 'Formulário de inscrição' }), box, exportCard(training, ['inscricao']));
      if (loggedIn) await F.renderEmbedded('inscricao', box, id); else needLogin();
    } else if (current === 2) {
      const pres = el('div');
      body.append(el('h3', { class: 'cap-subtitle', text: 'Formulário de presença' }), pres, exportCard(training, ['presenca']));
      if (loggedIn) await F.renderEmbedded('presenca', pres, id); else needLogin();
    } else {
      const aval = el('div');
      body.append(el('h3', { class: 'cap-subtitle', text: 'Formulário de avaliação' }), aval, exportCard(training, ['avaliacao']));
      if (loggedIn) await F.renderEmbedded('avaliacao', aval, id); else needLogin();
    }
  }

  CapacitaTE.registerModule({
    key: 'capacitacao',
    title: 'Capacitação',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path></svg>',
    order: 15,
    actions: ['view'],
    perTraining: true,
    menu: [],
    mount: (container, ctx = {}) => open(ctx.trainingId, ctx.stage),
    routes: {
      'capacitacao/:id': ({ id }) => open(id, 1),
      'capacitacao/:id/:stage': ({ id, stage }) => open(id, stage)
    }
  });
})();
