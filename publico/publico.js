/**
 * CapacitaTE - Motor dos Formulários Públicos (inscrição, presença e avaliação; sem login)
 * Lê o esquema de js/core/formSchema.js (fonte: .agents/specs/formularios.md) e desenha as telas.
 * Versão: v.4.4.2
 */

(function () {
  const VERSION = 'v.4.3.7';
  const MODULE = document.body.dataset.module; // inscricao | presenca | avaliacao
  const RPC_SUBMIT = { inscricao: 'public_submit_registration', presenca: 'public_submit_attendance', avaliacao: 'public_submit_evaluation' };
  const MODULE_TITLES = { inscricao: 'Formulário de Inscrição', presenca: 'Lista de Presença', avaliacao: 'Avaliação da Capacitação' };
  const NETWORK_ERROR = 'Não foi possível enviar. Verifique sua conexão e tente novamente.';
  const schemaLib = CapacitaTE.formSchema;
  const cpfLib = CapacitaTE.cpf;
  const fmt = CapacitaTE.formats;

  const token = new URLSearchParams(window.location.search).get('t') || '';
  const app = document.getElementById('pub-app');
  const state = { form: null, config: null, training: {}, vars: {}, lookup: null, data: {}, schema: null, step: 0, sending: false, cpf: '' };

  // ---------- utilidades ----------
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === undefined || v === null || v === false) return;
      if (k === 'text') node.textContent = v;
      else if (k === 'class') node.className = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (k === 'checked' || k === 'disabled' || k === 'readOnly') node[k] = !!v;
      else node.setAttribute(k, v === true ? '' : v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  /**
   * Bloqueio por excesso de tentativas ("Aguarde N segundos"): mostra o contador e libera o botão no fim.
   * Devolve true quando a mensagem era de bloqueio.
   */
  function startCooldown(message, btn, msgEl, label) {
    const m = /Aguarde (d+) segundos/.exec(message || '');
    if (!m) return false;
    let left = parseInt(m[1], 10);
    btn.disabled = true;
    const tick = () => {
      if (left <= 0) {
        clearInterval(timer);
        btn.disabled = false;
        btn.textContent = label;
        msgEl.textContent = 'Pode tentar novamente.';
        return;
      }
      msgEl.textContent = `Muitas tentativas. Aguarde ${left} segundo${left === 1 ? '' : 's'} para tentar novamente.`;
      btn.textContent = `Aguarde ${left}s`;
      left--;
    };
    const timer = setInterval(tick, 1000);
    tick();
    return true;
  }

  const draftKey = () => `capacitate_draft_${token}`;
  function saveDraft() {
    try { sessionStorage.setItem(draftKey(), JSON.stringify({ cpf: state.cpf, data: state.data, step: state.step })); } catch (e) { /* sem sessionStorage */ }
  }
  function loadDraft() {
    try { return JSON.parse(sessionStorage.getItem(draftKey()) || 'null'); } catch (e) { return null; }
  }
  function clearDraft() {
    try { sessionStorage.removeItem(draftKey()); } catch (e) { /* sem sessionStorage */ }
  }

  /**
   * Chama uma função pública. Erro de rede mantém os dados na tela; erro do servidor traz a mensagem dele.
   */
  async function rpc(name, params) {
    let res;
    try {
      res = await CapacitaTE.supabaseClient.get().rpc(name, params);
    } catch (e) {
      throw Object.assign(new Error(NETWORK_ERROR), { network: true });
    }
    if (res.error) {
      const msg = res.error.message || '';
      if (/fetch|network|Failed to/i.test(msg)) throw Object.assign(new Error(NETWORK_ERROR), { network: true });
      throw new Error(msg || 'Não foi possível concluir. Tente novamente.');
    }
    return res.data;
  }

  // Variáveis {numero}, {sigla}, {polo}... usadas nos textos do esquema
  function buildVars() {
    const t = state.training || {};
    state.vars = {
      numero: t.number || '',
      sigla: t.number ? `${t.number}CTE` : 'CTE',
      polo: t.polo || '',
      uf: t.uf || '',
      datas_extenso: t.datesFormatted || '',
      local: t.locationVenue || '',
      // Formulário de presença único: a sessão é o dia do envio
      sessao_label: (state.config && state.config.label) || fmt.formatDate(new Date())
    };
  }

  function trainingLabel() {
    const t = state.training || {};
    return [t.number ? `${t.number}ª CTE` : null, t.polo ? `${t.polo}${t.uf ? ` (${t.uf})` : ''}` : null].filter(Boolean).join(' – ');
  }

  function render(...nodes) {
    app.textContent = '';
    nodes.forEach(n => n && app.appendChild(n));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const card = (children) => el('section', { class: 'pub-card' }, children);
  const alertBox = (text, type = 'error') => el('div', { class: `pub-alert pub-alert-${type}`, role: type === 'error' ? 'alert' : 'status', text });

  function header() {
    const v = state.vars;
    const base = schemaLib.FORM_SCHEMAS[MODULE === 'presenca' ? 'presenca_inscrito' : MODULE];
    const title = el('h1', { class: 'pub-title', text: state.config.title || schemaLib.fill(base.title, v) || MODULE_TITLES[MODULE] });
    if (MODULE === 'presenca') {
      return [title, el('p', { class: 'pub-subtitle pub-subtitle-strong', text: [[v.polo, v.uf].filter(Boolean).join(' - '), v.datas_extenso, `Sessão: ${v.sessao_label}`].filter(Boolean).join(' · ') })];
    }
    if (MODULE === 'avaliacao') {
      const sub = state.config.subtitle || `${[v.numero ? `${v.numero} CTE` : '', v.polo ? `${v.polo}${v.uf ? ` (${v.uf})` : ''}` : ''].filter(Boolean).join(' - ')} ${v.datas_extenso}`.trim();
      return [title, el('p', { class: 'pub-subtitle pub-subtitle-strong', text: sub })];
    }
    return [title, el('p', { class: 'pub-subtitle', text: [trainingLabel(), v.datas_extenso].filter(Boolean).join(' · ') })];
  }

  function introText() {
    if (state.config.intro) return schemaLib.fill(state.config.intro, state.vars);
    return MODULE === 'presenca' ? state.config.attendanceWelcome : '';
  }

  // "CPF: ***.794.758-** — trocar" no topo das telas depois do CPF
  function cpfBanner() {
    return el('div', { class: 'pub-cpf-banner' }, [
      el('span', { text: `CPF: ${cpfLib.mask(state.cpf)}` }),
      el('button', { type: 'button', class: 'pub-link-btn', text: 'trocar', onclick: () => { clearDraft(); state.cpf = ''; state.data = {}; state.lookup = null; showCpf(); } })
    ]);
  }

  function contactsLine() {
    const c = (state.config && state.config.contacts) || schemaLib.DEFAULTS.contacts;
    return el('p', { class: 'pub-help', text: `Dúvidas: WhatsApp ${c.whatsapp} · Instagram ${c.instagram} · ${c.site}` });
  }

  // ---------- telas ----------
  function showLoading() {
    render(card(el('p', { class: 'pub-loading', text: 'Carregando formulário...' })));
  }

  function showFatal(message) {
    render(card([el('h1', { class: 'pub-title', text: MODULE_TITLES[MODULE] || 'Formulário' }), alertBox(message), contactsLine()]));
  }

  function showClosed() {
    const f = state.form;
    const when = (iso) => fmt.formatDateTime(iso).slice(0, 16).replace(' ', ' às ');
    const hours = f.opens_at || f.closes_at ? `Horário: ${f.opens_at ? `de ${when(f.opens_at)}` : ''}${f.closes_at ? ` até ${when(f.closes_at)}` : ''}.` : '';
    let msg;
    if (f.state === 'rascunho') msg = 'Este formulário ainda não está disponível.';
    else if (MODULE === 'presenca') msg = `A lista de presença desta sessão não está aberta agora. ${hours}`.trim();
    else if (f.state === 'agendado') msg = `Este formulário abre em ${when(f.opens_at)}.`;
    else msg = 'Este formulário está encerrado e não recebe mais respostas.';
    const t = state.training || {};
    render(card([
      ...header(),
      alertBox(msg, 'info'),
      t.datesFormatted ? el('p', { class: 'pub-help', text: `Capacitação: ${t.datesFormatted}${t.locationVenue ? ` – ${t.locationVenue}` : ''}` }) : null,
      contactsLine()
    ]));
  }

  function showCpf(errorText = '') {
    const input = el('input', {
      class: 'pub-input', id: 'f-cpf', type: 'text', inputmode: 'numeric', autocomplete: 'off',
      placeholder: '000.000.000-00', maxlength: '14', 'aria-describedby': 'f-cpf-error', value: state.cpf ? cpfLib.format(state.cpf) : ''
    });
    input.addEventListener('input', () => { input.value = cpfLib.inputMask(input.value); });
    const err = el('span', { class: 'pub-error', id: 'f-cpf-error', role: 'alert', text: errorText });
    const btn = el('button', { type: 'submit', class: 'pub-btn pub-btn-primary', text: 'Continuar' });
    const form = el('form', { novalidate: true }, [
      el('div', { class: `pub-field${errorText ? ' has-error' : ''}` }, [
        el('label', { class: 'pub-label', for: 'f-cpf' }, ['CPF', el('span', { class: 'pub-req', 'aria-hidden': 'true', text: '*' })]),
        input, err
      ]),
      el('div', { class: 'pub-actions' }, btn)
    ]);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const digits = cpfLib.normalize(input.value);
      if (!cpfLib.isValid(digits)) {
        err.textContent = 'CPF inválido. Confira os números.';
        input.closest('.pub-field').classList.add('has-error');
        input.focus();
        return;
      }
      btn.disabled = true;
      btn.textContent = 'Consultando...';
      try {
        if (digits !== state.cpf) state.data = {};
        state.cpf = digits;
        state.lookup = await rpc('public_lookup_cpf', { p_token: token, p_cpf: digits });
        afterLookup();
      } catch (ex) {
        btn.disabled = false;
        btn.textContent = 'Continuar';
        input.closest('.pub-field').classList.add('has-error');
        if (!startCooldown(ex.message, btn, err, 'Continuar')) err.textContent = ex.message;
      }
    });
    render(card([
      ...header(),
      introText() ? el('p', { class: 'pub-intro', text: introText() }) : null,
      el('p', { class: 'pub-help', text: 'Comece pelo seu CPF. Se você já participou de outra capacitação, poderemos preencher seus dados automaticamente.' }),
      form
    ]));
    setTimeout(() => input.focus(), 50);
  }

  function afterLookup() {
    const lk = state.lookup;
    if (lk.already_submitted) {
      if (MODULE === 'presenca') return showAttendanceOk({ already: true, submitted_at: lk.submitted_at });
      const actions = lk.allow_edit
        ? el('div', { class: 'pub-actions' }, el('button', { type: 'button', class: 'pub-btn pub-btn-primary', text: 'Atualizar minha resposta', onclick: () => (lk.exists ? showSecondFactor() : startSteps()) }))
        : el('p', { class: 'pub-help', text: 'Se precisar corrigir algum dado, fale com a equipe do CECATE.' });
      return render(card([...header(), cpfBanner(), alertBox(`Você já respondeu este formulário em ${lk.submitted_when}.`, 'info'), actions, contactsLine()]));
    }
    if (lk.exists) return showSecondFactor();
    startSteps();
  }

  function showSecondFactor(errorText = '') {
    const lk = state.lookup;
    const byBirth = lk.needs_birth_date;
    const input = byBirth
      ? el('input', { class: 'pub-input', id: 'f-factor', type: 'date', 'aria-describedby': 'f-factor-error' })
      : el('input', { class: 'pub-input', id: 'f-factor', type: 'email', autocomplete: 'email', 'aria-describedby': 'f-factor-error' });
    const err = el('span', { class: 'pub-error', id: 'f-factor-error', role: 'alert', text: errorText });
    const btn = el('button', { type: 'submit', class: 'pub-btn pub-btn-primary', text: 'Confirmar' });
    const what = byBirth ? 'sua data de nascimento' : `o seu e-mail completo (${lk.masked_email})`;
    const form = el('form', { novalidate: true }, [
      el('p', { class: 'pub-intro' }, ['Encontramos um cadastro em nome de ', el('strong', { text: lk.masked_name }), `. Para carregar seus dados, confirme ${what}.`]),
      el('div', { class: `pub-field${errorText ? ' has-error' : ''}` }, [
        el('label', { class: 'pub-label', for: 'f-factor', text: byBirth ? 'Data de nascimento' : 'E-mail' }), input, err
      ]),
      el('div', { class: 'pub-actions' }, btn),
      el('button', { type: 'button', class: 'pub-link-btn', text: 'Não sou eu, preencher manualmente', onclick: () => startSteps() })
    ]);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!input.value) { err.textContent = 'Preencha para continuar.'; return; }
      btn.disabled = true;
      try {
        const res = await rpc('public_unlock_profile', {
          p_token: token, p_cpf: state.cpf,
          p_birth_date: byBirth ? input.value : null, p_email: byBirth ? null : input.value.trim()
        });
        if (!res || res.ok === false) {
          btn.disabled = false;
          err.textContent = 'Os dados não conferem. Confira ou preencha manualmente.';
          input.closest('.pub-field').classList.add('has-error');
          return;
        }
        prefill(res);
        startSteps();
      } catch (ex) {
        btn.disabled = false;
        input.closest('.pub-field').classList.add('has-error');
        if (!startCooldown(ex.message, btn, err, 'Confirmar')) err.textContent = ex.message;
      }
    });
    render(card([...header(), cpfBanner(), form]));
    setTimeout(() => input.focus(), 50);
  }

  function prefill(p) {
    const d = state.data;
    const put = (k, v) => { if (v !== null && v !== undefined && v !== '' && !d[k]) d[k] = v; };
    put('full_name', p.full_name);
    put('email', p.email);
    if (MODULE === 'inscricao') put('email_confirm', p.email);
    put('birth_date', p.birth_date);
    put('phone', p.phone ? fmt.formatPhone(p.phone) : '');
    const muns = schemaLib.optionsOf({ optionsFrom: 'municipalities' }, state.config);
    const mun = p.municipality && muns.find(m => m.toLowerCase() === String(p.municipality).toLowerCase());
    if (mun) put('municipality', mun);
    put('category', p.category);
    put('role_gestao', p.role_gestao);
    put('role_cacs', p.role_cacs);
    put('institution_name', p.institution);
    saveDraft();
  }

  function schemaForModule() {
    if (MODULE === 'presenca') return schemaLib.FORM_SCHEMAS[state.lookup && state.lookup.has_registration ? 'presenca_inscrito' : 'presenca_nao_inscrito'];
    return schemaLib.FORM_SCHEMAS[MODULE];
  }

  // Seções visíveis: condição atendida e ao menos um campo
  function visibleSections() {
    return state.schema.sections.filter(s => schemaLib.isVisible(s, state.data) && s.fields.length);
  }

  // Campos das seções que deixaram de valer (ex.: trocou a categoria) são limpos
  function clearHiddenSections() {
    state.schema.sections.forEach(s => {
      if (!schemaLib.isVisible(s, state.data)) s.fields.forEach(f => { delete state.data[f.id]; });
    });
  }

  function startSteps() {
    state.schema = schemaForModule();
    const draft = loadDraft();
    if (draft && draft.cpf === state.cpf) {
      state.data = Object.assign({}, draft.data, state.data);
      state.step = Math.min(draft.step || 0, visibleSections().length - 1);
    } else {
      state.step = 0;
    }
    showStep();
  }

  // ---------- campos ----------
  function fieldNode(field) {
    const cfg = state.config;
    const id = `f-${field.id}`;
    const errId = `${id}-error`;
    const value = state.data[field.id];
    const label = schemaLib.fill(schemaLib.labelOf(field, cfg), state.vars);
    const set = (v) => { state.data[field.id] = v; saveDraft(); };
    const req = field.required ? el('span', { class: 'pub-req', 'aria-hidden': 'true', text: '*' }) : null;
    const wrap = el('div', { class: 'pub-field', 'data-field': field.id });
    const err = el('span', { class: 'pub-error', id: errId, role: 'alert' });
    const htmlType = { texto: 'text', email: 'email', telefone: 'tel', data: 'date' }[field.type];

    if (htmlType) {
      const input = el('input', {
        class: 'pub-input', id, type: htmlType, value: value || '', autocomplete: field.autocomplete || null,
        inputmode: field.type === 'telefone' ? 'tel' : null, 'aria-describedby': errId,
        maxlength: field.type === 'telefone' ? '14' : null,
        placeholder: field.type === 'telefone' ? '(65)99999-1234' : (field.placeholder ? schemaLib.fill(field.placeholder, state.vars) : null)
      });
      input.addEventListener('input', () => {
        if (field.type === 'telefone') {
          const d = input.value.replace(/\D/g, '').slice(0, 11);
          input.value = d.length > 2 ? `(${d.slice(0, 2)})${d.length > 7 ? `${d.slice(2, d.length - 4)}-${d.slice(-4)}` : d.slice(2)}` : d;
        }
        set(input.value);
      });
      wrap.append(el('label', { class: 'pub-label', for: id }, [label, req]), input, err);
    } else if (field.type === 'texto_longo') {
      const ta = el('textarea', { class: 'pub-textarea', id, maxlength: '2000', 'aria-describedby': errId });
      ta.value = value || '';
      ta.addEventListener('input', () => set(ta.value));
      wrap.append(el('label', { class: 'pub-label', for: id }, [label, req]), ta, err);
    } else if (field.type === 'lista') {
      const opts = schemaLib.optionsOf(field, cfg).slice().sort((a, b) => a.localeCompare(b, 'pt-BR'));
      const sel = el('select', { class: 'pub-select', id, 'aria-describedby': errId }, [
        el('option', { value: '', text: 'Selecione...' }),
        ...opts.map((o, i) => el('option', { value: o, text: `${i + 1}. ${o}` }))
      ]);
      sel.value = value || '';
      sel.addEventListener('change', () => set(sel.value));
      wrap.append(el('label', { class: 'pub-label', for: id }, [label, req]), sel, err);
    } else if (field.type === 'escolha_unica') {
      const opts = schemaLib.optionsOf(field, cfg);
      const group = el('div', { class: 'pub-options', role: 'radiogroup', 'aria-labelledby': `${id}-label`, 'aria-describedby': errId },
        opts.map((o, i) => {
          const input = el('input', { type: 'radio', name: id, id: `${id}-${i}`, value: o, checked: value === o });
          input.addEventListener('change', () => {
            set(o);
            if (field.id === 'category') { clearHiddenSections(); saveDraft(); showStep(true); }
          });
          return el('label', { class: 'pub-option', for: `${id}-${i}` }, [input, el('span', { text: field.hideSemicolon ? o.replace(/;\s*$/, '') : o })]);
        }));
      wrap.append(el('span', { class: 'pub-label', id: `${id}-label` }, [label, req]), group, err);
    } else if (field.type === 'aceite') {
      const input = el('input', { type: 'checkbox', id, checked: !!value, 'aria-describedby': errId });
      input.addEventListener('change', () => set(input.checked));
      wrap.append(el('label', { class: 'pub-option', for: id }, [input, el('span', {}, [label, req])]), err);
    } else if (field.type === 'multipla_escolha') {
      const opts = schemaLib.optionsOf(field, cfg);
      const selected = Array.isArray(value) ? value : [];
      const group = el('div', { class: 'pub-options', role: 'group', 'aria-labelledby': `${id}-label`, 'aria-describedby': errId },
        opts.map((o, i) => {
          const input = el('input', { type: 'checkbox', id: `${id}-${i}`, value: o, checked: selected.includes(o) });
          input.addEventListener('change', () => {
            const cur = new Set(Array.isArray(state.data[field.id]) ? state.data[field.id] : []);
            if (input.checked) cur.add(o); else cur.delete(o);
            set(opts.filter(x => cur.has(x)));
          });
          return el('label', { class: 'pub-option', for: `${id}-${i}` }, [input, el('span', { text: o })]);
        }));
      wrap.append(el('span', { class: 'pub-label', id: `${id}-label` }, [label, req]), group);
      if (cfg[field.otherFrom] && field.otherId) {
        const onKey = `${field.otherId}_on`;
        const otherText = el('input', { class: 'pub-input', id: `${id}-other`, type: 'text', value: state.data[field.otherId] || '', placeholder: 'Descreva', 'aria-label': 'Outro (descreva)' });
        otherText.style.display = state.data[onKey] ? '' : 'none';
        otherText.addEventListener('input', () => { state.data[field.otherId] = otherText.value; saveDraft(); });
        const otherBox = el('input', { type: 'checkbox', id: `${id}-otherbox`, checked: !!state.data[onKey] });
        otherBox.addEventListener('change', () => {
          state.data[onKey] = otherBox.checked;
          if (!otherBox.checked) state.data[field.otherId] = '';
          otherText.style.display = otherBox.checked ? '' : 'none';
          if (otherBox.checked) otherText.focus();
          saveDraft();
        });
        group.append(el('label', { class: 'pub-option', for: `${id}-otherbox` }, [otherBox, el('span', { text: 'Outro:' })]), otherText);
      }
      wrap.append(err);
    } else if (field.type === 'nota_1a5') {
      const items = cfg[field.itemsFrom] || [];
      const cur = Object.assign({}, value || {});
      wrap.append(el('p', { class: 'pub-rating-help', id: `${id}-label` }, [label, req]));
      items.forEach(it => {
        const name = `${id}-${it.key}`;
        wrap.append(el('div', { class: 'pub-rating-item' }, el('fieldset', {}, [
          el('legend', { text: it.label }),
          el('div', { class: 'pub-rating-row' }, [1, 2, 3, 4, 5].map(n => {
            const input = el('input', { type: 'radio', name, value: String(n), checked: cur[it.key] === n, 'aria-label': `${it.label}: nota ${n}` });
            input.addEventListener('change', () => { cur[it.key] = n; set(Object.assign({}, cur)); });
            return el('label', {}, [input, el('span', { text: String(n), 'aria-hidden': 'true' })]);
          })),
          el('div', { class: 'pub-rating-scale', 'aria-hidden': 'true' }, [el('span', { text: '1 = ruim' }), el('span', { text: '5 = excelente' })])
        ])));
      });
      wrap.append(err);
    }
    return wrap;
  }

  // Resumo antes do envio (inscrição): rótulo e valor de cada campo preenchido, com "editar" por seção
  function reviewNode(sections) {
    const cfg = state.config;
    const show = (f) => {
      const v = state.data[f.id];
      if (f.type === 'aceite' || v === undefined || v === null || v === '') return null;
      if (f.type === 'data') return fmt.formatDate(v);
      return String(v);
    };
    return el('div', { class: 'pub-review' }, [
      el('h2', { class: 'pub-review-title', text: 'Confira seus dados antes de enviar' }),
      ...sections.map((s, idx) => el('div', { class: 'pub-review-section' }, [
        el('div', { class: 'pub-review-head' }, [
          el('strong', { text: s.title }),
          el('button', { type: 'button', class: 'pub-link-btn', text: 'editar', onclick: () => { state.step = idx; saveDraft(); showStep(); } })
        ]),
        el('dl', {}, s.fields.filter(f => f.id !== 'email_confirm' && show(f) !== null).flatMap(f => [
          el('dt', { text: schemaLib.labelOf(f, cfg) }), el('dd', { text: show(f) })
        ]))
      ]))
    ]);
  }

  // ---------- etapas ----------
  function showStep(keepScroll = false) {
    const sections = visibleSections();
    state.step = Math.max(0, Math.min(state.step, sections.length - 1));
    const section = sections[state.step];
    const isLast = state.step === sections.length - 1;
    const pct = Math.round(((state.step + 1) / sections.length) * 100);
    const errorBox = el('div', { id: 'pub-step-error' });

    const back = el('button', { type: 'button', class: 'pub-btn', text: 'Voltar' });
    back.addEventListener('click', () => {
      if (state.step === 0) { showCpf(); return; }
      state.step -= 1; saveDraft(); showStep();
    });
    const next = el('button', { type: 'submit', class: 'pub-btn pub-btn-primary', text: isLast ? state.schema.submitLabel : 'Continuar' });

    const form = el('form', { novalidate: true }, [
      el('div', { class: 'pub-progress' }, [
        el('div', { class: 'pub-progress-label' }, [el('span', { text: section.title }), el('span', { text: `Etapa ${state.step + 1} de ${sections.length}` })]),
        el('div', { class: 'pub-progress-track', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(pct) },
          el('div', { class: 'pub-progress-bar', style: `width:${pct}%` }))
      ]),
      section.noticeFrom ? alertBox(state.config[section.noticeFrom], 'info') : null,
      isLast && state.schema.review ? reviewNode(sections.slice(0, -1)) : null,
      errorBox,
      ...section.fields.map(fieldNode),
      el('div', { class: 'pub-actions' }, [back, next])
    ]);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateStep(form, section.fields)) return;
      if (!isLast) { state.step += 1; saveDraft(); showStep(); return; }
      await submit(next, errorBox);
    });
    render(card([...header(), cpfBanner(), form]));
    if (!keepScroll) setTimeout(() => { const first = form.querySelector('input:not([type=radio]):not([type=checkbox]), select, textarea'); if (first) first.focus(); }, 50);
  }

  function showFieldError(form, fieldId, msg) {
    const wrap = form && form.querySelector(`[data-field="${fieldId}"]`);
    if (!wrap) return null;
    wrap.classList.add('has-error');
    const err = wrap.querySelector('.pub-error');
    if (err) err.textContent = msg;
    return wrap;
  }

  function validateStep(form, fields) {
    let firstBad = null;
    fields.forEach(f => {
      const wrap = form.querySelector(`[data-field="${f.id}"]`);
      if (!wrap) return;
      const msg = schemaLib.validateField(f, state.data, state.config);
      wrap.classList.toggle('has-error', !!msg);
      const err = wrap.querySelector('.pub-error');
      if (err) err.textContent = msg;
      if (msg && !firstBad) firstBad = wrap;
    });
    if (firstBad) {
      const target = firstBad.querySelector('input, select, textarea');
      if (target) target.focus();
      firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }

  function payload() {
    const d = Object.assign({}, state.data, { cpf: state.cpf });
    ['phone', 'phone2'].forEach(k => { if (d[k]) d[k] = String(d[k]).replace(/\D/g, ''); });
    if (!d.heard_other_on) delete d.heard_other;
    Object.keys(d).forEach(k => { if (k.endsWith('_on')) delete d[k]; });
    return d;
  }

  // Erro de validação do servidor: leva à seção do campo com problema
  const SERVER_FIELD_HINTS = [
    [/nome completo/i, 'full_name'], [/e-mails informados|e-mail válido/i, 'email'], [/telefone/i, 'phone'],
    [/nascimento/i, 'birth_date'], [/município/i, 'municipality'], [/CACS-FUNDEB ou da Gestão/i, 'category'],
    [/gestão municipal\.$/i, 'role_gestao'], [/no CACS-FUNDEB\.$/i, 'role_cacs'], [/nota de 1 a 5/i, 'ratings'],
    [/mais gostou/i, 'liked'], [/melhorados/i, 'improve'], [/instituição vinculada/i, 'institution_name'],
    [/ficou sabendo/i, 'heard_from'], [/LGPD/i, 'consent'], [/veracidade/i, 'truth_confirmed']
  ];
  function goToServerError(message) {
    const hit = SERVER_FIELD_HINTS.find(([re]) => re.test(message));
    if (!hit) return false;
    const idx = visibleSections().findIndex(s => s.fields.some(f => f.id === hit[1]));
    if (idx < 0) return false;
    state.step = idx;
    showStep();
    const wrap = showFieldError(app.querySelector('form'), hit[1], message);
    if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return true;
  }

  async function submit(btn, errorBox) {
    if (state.sending) return;
    state.sending = true;
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    errorBox.textContent = '';
    try {
      const res = await rpc(RPC_SUBMIT[MODULE], { p_token: token, p_payload: payload() });
      clearDraft();
      if (MODULE === 'presenca') showAttendanceOk(res); else showReceipt(res);
    } catch (ex) {
      if (!ex.network && goToServerError(ex.message)) return;
      const box = alertBox(ex.message);
      errorBox.appendChild(box);
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      btn.textContent = 'Tentar novamente';
      if (startCooldown(ex.message, btn, box, 'Tentar novamente')) { state.sending = false; return; }
    } finally {
      state.sending = false;
      if (!btn.textContent.startsWith('Aguarde')) btn.disabled = false;
    }
  }

  // ---------- comprovantes ----------
  function receiptLines(res) {
    const t = state.training || {};
    return [
      ['Nome', res.full_name],
      ['Capacitação', trainingLabel()],
      ['Data', t.datesFormatted || ''],
      ['Local', [t.locationVenue, t.locationAddress].filter(Boolean).join(' – ')],
      ['Enviado em', fmt.formatDateTime(res.submitted_at)],
      ['Protocolo', res.protocolo]
    ].filter(([, v]) => v);
  }

  /**
   * PDF de uma página gerado no próprio navegador (sem biblioteca): Helvetica com acentos (WinAnsiEncoding)
   */
  function buildPdf(title, lines, footer) {
    const latin = (s) => String(s || '').replace(/[–—]/g, '-').replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/·/g, '-').replace(/[^\x20-\xFF]/g, '?');
    const esc = (s) => latin(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    const wrap = (s, max) => {
      const words = latin(s).split(/\s+/); const out = []; let cur = '';
      words.forEach(w => { if ((cur + ' ' + w).trim().length > max) { if (cur) out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
      if (cur) out.push(cur);
      return out.length ? out : [''];
    };
    const ops = ['0.965 0.659 0 rg 40 790 515 6 re f', '0.13 0.13 0.13 rg'];
    let y = 760;
    const text = (font, size, x, str) => { ops.push(`BT /${font} ${size} Tf ${x} ${y} Td (${esc(str)}) Tj ET`); };
    text('F1', 10, 40, 'CECATE Centro-Oeste - Comprovante');
    y -= 26; text('F2', 18, 40, title);
    y -= 30;
    lines.forEach(([k, v]) => {
      const rows = wrap(v, 62);
      text('F1', 11, 40, k);
      rows.forEach((r, i) => { if (i) y -= 15; text('F2', 11, 150, r); });
      y -= 22;
    });
    y -= 6;
    wrap(footer, 90).forEach(r => { text('F1', 10, 40, r); y -= 14; });
    y = 60; text('F1', 8, 40, 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste - UFG / FNDE');
    const content = ops.join('\n');
    const objs = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
      `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [];
    objs.forEach((o, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
    const xref = pdf.length;
    pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map(o => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
    pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    const bytes = new Uint8Array(pdf.length);
    for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xFF;
    return new Blob([bytes], { type: 'application/pdf' });
  }

  function savePdf(title, res) {
    const blob = buildPdf(title, receiptLines(res), 'Guarde este comprovante. Em caso de dúvida, fale com a equipe do CECATE pelo WhatsApp (62) 3209-6723 ou pelo Instagram @cecate.co.');
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: `comprovante-${res.protocolo || 'capacitate'}.pdf` });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function showReceipt(res) {
    const sch = state.schema;
    const title = res.waitlist && sch.waitlistTitle ? sch.waitlistTitle : (res.updated ? 'Resposta atualizada!' : sch.receiptTitle);
    render(card(el('div', { class: 'pub-receipt' }, [
      el('div', { class: 'pub-receipt-icon', 'aria-hidden': 'true' }, svgCheck(36)),
      el('h2', { text: title }),
      res.waitlist ? alertBox('As vagas do seu município nesta categoria já foram preenchidas. Sua inscrição ficou em lista de espera e a equipe do CECATE entrará em contato.', 'info') : null,
      el('dl', {}, receiptLines(res).flatMap(([k, v]) => [el('dt', { text: k }), el('dd', { text: v })])),
      el('p', { class: 'pub-help', text: 'Guarde este comprovante.' }),
      el('div', { class: 'pub-actions' }, el('button', { type: 'button', class: 'pub-btn pub-btn-primary', text: 'Salvar comprovante (PDF)', onclick: () => savePdf(title, res) }))
    ])));
  }

  function showAttendanceOk(res) {
    const when = res.submitted_at ? new Date(res.submitted_at) : new Date();
    const time = fmt.formatDateTime(when).slice(11, 16);
    render(el('section', { class: 'pub-attendance-ok', role: 'status' }, [
      svgCheck(64),
      el('h2', { text: res.already ? 'Presença já registrada' : 'Presença registrada' }),
      res.full_name ? el('p', { class: 'pub-attendance-name', text: res.full_name }) : null,
      el('div', { class: 'pub-attendance-time', text: `${fmt.formatDate(when)} · ${time}` }),
      el('p', { text: [trainingLabel(), `Sessão: ${state.vars.sessao_label}`].filter(Boolean).join(' · ') }),
      res.already ? el('p', { text: `Presença já registrada em ${state.vars.sessao_label} às ${time}. Não é preciso registrar de novo.` }) : null
    ]));
  }

  function svgCheck(size) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('width', size); svg.setAttribute('height', size);
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    const p = document.createElementNS(ns, 'polyline'); p.setAttribute('points', '20 6 9 17 4 12');
    svg.appendChild(p);
    return svg;
  }

  // ---------- início ----------
  async function start() {
    const v = document.getElementById('pub-version');
    if (v) v.textContent = VERSION;
    if (!token) return showFatal('Link incompleto. Use o QR Code ou o link enviado pela equipe do CECATE.');
    showLoading();
    try {
      const form = await rpc('public_get_form', { p_token: token });
      if (form.module_key !== MODULE) return showFatal('Este link pertence a outro formulário. Confira o QR Code.');
      state.form = form;
      state.config = schemaLib.withDefaults(form.config);
      state.training = form.training || {};
      buildVars();
      document.title = `${state.config.title || MODULE_TITLES[MODULE]} – CapacitaTE`;
      if (form.state !== 'aberto') return showClosed();
      const draft = loadDraft();
      if (draft && draft.cpf) state.cpf = draft.cpf;
      showCpf();
    } catch (ex) {
      showFatal(ex.message);
    }
  }

  // Exposto para os testes automáticos
  window.CapacitaTEPublic = { buildPdf, state };

  document.addEventListener('DOMContentLoaded', start);
})();
