/**
 * CapacitaTE - Base das telas internas dos formulários (Inscrição, Presença e Avaliação)
 * Escolha da capacitação, criação e configuração do formulário, abrir/encerrar/agendar, link público e QR Code,
 * troca de link e listas de respostas. Cada módulo registra-se com CapacitaTE.formModules.register(...).
 * Versão: v.4.3.8
 */

(function () {
  const ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const MODULE_NAMES = { inscricao: 'Inscrição', presenca: 'Lista de Presença', avaliacao: 'Avaliação' };
  const PUBLIC_PAGES = { inscricao: 'inscricao.html', presenca: 'presenca.html', avaliacao: 'avaliacao.html' };
  const STATUS_LABELS = { rascunho: 'Rascunho', aberto: 'Aberto', fechado: 'Encerrado' };
  let refreshTimer = null;
  const registry = {};

  // ---------- utilidades ----------
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === undefined || v === null || v === false) return;
      if (k === 'text') node.textContent = v;
      else if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v; // somente SVG gerado pelo próprio código (ícones e QR)
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
  const toast = (msg, type = 'info') => window.app && window.app.showToast(msg, type);
  const client = () => CapacitaTE.supabaseClient.get();
  const can = (key, action, trainingId) => CapacitaTE.can(key, action, trainingId);
  const fmtDateTime = (v) => (v ? CapacitaTE.formats.formatDateTime(v) : '—');
  const maskCpf = (c) => CapacitaTE.cpf.mask(c) || '—';
  const fmtPhone = (p) => (p ? CapacitaTE.formats.formatPhone(p) : '');
  const errMsg = (err) => {
    const m = (err && err.message) || String(err || '');
    if (/relation .* does not exist|schema cache|PGRST20/i.test(m)) return 'As migrações 0003 e 0004 ainda não foram aplicadas no Supabase.';
    if (/row-level security|permission denied/i.test(m)) return 'Você não tem permissão para esta ação.';
    return m || 'Falha inesperada.';
  };

  // datetime-local <-> ISO
  const toLocalInput = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  const fromLocalInput = (v) => (v ? new Date(v).toISOString() : null);

  function publicUrl(form) {
    const base = CapacitaTE.config.getPublicBaseUrl();
    if (!base) return '';
    return `${base}/publico/${PUBLIC_PAGES[form.module_key]}?t=${form.public_token}`;
  }

  async function audit(action, mod, trainingId, target, details) {
    if (CapacitaTE.audit) await CapacitaTE.audit.log(action, { module: mod, trainingId, target, details });
  }

  // ---------- capacitações ----------
  async function loadTraining(trainingId) {
    const full = window.db && typeof window.db.getTrainingFull === 'function' ? await window.db.getTrainingFull(trainingId) : null;
    return full;
  }

  function trainingTitle(t) {
    if (!t) return 'Capacitação';
    return [t.number ? `${t.number}ª CTE` : null, t.polo ? `${t.polo}${t.uf ? ` (${t.uf})` : ''}` : null].filter(Boolean).join(' – ') || 'Capacitação';
  }

  function trainingMunicipalities(t) {
    return (t && Array.isArray(t.municipalities) ? t.municipalities : [])
      .filter(m => m && m.name)
      .map(m => ({ name: String(m.name).trim(), ibge: String(m.ibgeCode || m.ibge || '').trim(), uf: m.uf || t.uf || '' }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }

  // Texto de apresentação gerado a partir dos dados da capacitação (editável depois)
  // Trecho do convite com a quantidade de municípios e os estados (ex.: " de 23 municípios dos Estados de Goiás e Mato Grosso")
  function citiesPhrase(muns, fallbackUf) {
    const full = (uf) => (window.reportDocxGenerator && typeof window.reportDocxGenerator.getUfFullName === 'function' ? window.reportDocxGenerator.getUfFullName(uf) : uf);
    const ufs = [...new Set((muns || []).map(m => m.uf).filter(Boolean))];
    if (!ufs.length && fallbackUf) ufs.push(fallbackUf);
    const names = ufs.map(full).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    const n = (muns || []).length;
    const states = names.length > 1 ? ` dos Estados de ${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}` : (names.length ? ` do Estado de ${names[0]}` : '');
    return `${n ? ` de ${n} município${n === 1 ? '' : 's'}` : ''}${states}`;
  }

  function buildIntro(t) {
    const c = CapacitaTE.formSchema.DEFAULTS.contacts;
    return `O Fundo Nacional de Desenvolvimento da Educação (FNDE), em parceria com o Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO), convida gestores municipais e conselheiros do CACS-FUNDEB${citiesPhrase(trainingMunicipalities(t), t.uf)} para a Capacitação em Transporte Escolar${t.locationVenue ? `, que será realizada no ${t.locationVenue}` : ''}${t.datesFormatted ? `, nos dias ${t.datesFormatted}` : ''}.

A formação visa aprimorar a gestão do Programa Caminho da Escola e do Programa Nacional de Apoio ao Transporte do Escolar (PNATE) nos municípios. Em um ambiente de troca e diálogo, os participantes inscritos terão acesso às informações sobre os normativos dos programas federais de transporte escolar e orientações sobre execução dos recursos e prestação de contas.

Caso surja alguma nova dúvida, entre em contato através dos seguintes canais de comunicação:
WhatsApp: ${c.whatsapp} · Site: ${c.site} · Instagram: ${c.instagram}`;
  }

  // ---------- formulários (Supabase) ----------
  async function loadForms(mod, trainingId) {
    const { data, error } = await client().from('forms').select('*').eq('training_id', trainingId).eq('module_key', mod).order('session_key');
    if (error) throw error;
    return data || [];
  }

  async function createForm(mod, training, sessionKey, extraConfig = {}) {
    const defaults = CapacitaTE.formSchema.DEFAULTS;
    const config = Object.assign({
      title: { inscricao: 'Capacitação em Transporte Escolar', presenca: `${training.number ? `${training.number}CTE - ` : ''}Lista de Presença`, avaliacao: 'Avaliação da Capacitação' }[mod],
      contacts: defaults.contacts,
      municipalities: trainingMunicipalities(training),
      allowEdit: mod === 'inscricao'
    }, mod === 'inscricao' ? { intro: buildIntro(training), truthStatement: defaults.truthStatement, maxPerMunicipalityPerCategory: null } : {},
    mod === 'presenca' ? { intro: CapacitaTE.formSchema.DEFAULTS.attendanceWelcome } : {},
    mod === 'avaliacao' ? {
      subtitle: `${training.number ? `${training.number} CTE - ` : ''}${training.polo || ''}${training.uf ? ` (${training.uf})` : ''} ${training.datesFormatted || ''}`.trim(),
      ratingLabel: defaults.ratingLabel, ratingItems: defaults.ratingItems, institutionOptions: defaults.institutionOptions,
      heardFromOptions: defaults.heardFromOptions, heardFromAllowOther: true, onlyForAttendees: false
    } : {}, extraConfig);
    const user = CapacitaTE.auth && CapacitaTE.auth.user;
    const { data, error } = await client().from('forms').insert({
      training_id: training.id, module_key: mod, session_key: sessionKey, status: 'aberto', config, // já nasce aberto: o link e o QR Code funcionam na hora
      created_by: user ? user.id : null
    }).select().single();
    if (error) {
      if (/foreign key|trainings/i.test(error.message)) throw new Error('Esta capacitação ainda não está na nuvem. Use "Sincronizar" no topo e tente de novo.');
      throw error;
    }
    await audit('form.create', mod, training.id, data.id, { session: sessionKey });
    return data;
  }

  const AUTO_MUN_TRIED = new Set();

  async function updateForm(form, patch, auditAction) {
    // Lista de cidades mudou: o convite da inscrição acompanha a quantidade de municípios e os estados
    if (patch.config && patch.config.municipalities && typeof patch.config.intro === 'string') {
      patch = Object.assign({}, patch, { config: Object.assign({}, patch.config, {
        intro: patch.config.intro.replace(/ de \d+ municípios?( d[oa]s? Estados? de [^.]+?)?(?= para a Capacitação)/, citiesPhrase(patch.config.municipalities))
      }) });
    }
    const { data, error } = await client().from('forms').update(patch).eq('id', form.id).select().single();
    if (error) throw error;
    if (auditAction) await audit(auditAction, form.module_key, form.training_id, form.id, patch.status ? { status: patch.status } : null);
    Object.assign(form, data);
    return form;
  }

  // ---------- cartão do formulário ----------
  function formStateBadge(form) {
    const now = Date.now();
    let label = STATUS_LABELS[form.status];
    let cls = form.status === 'aberto' ? 'forms-badge-open' : (form.status === 'fechado' ? 'forms-badge-closed' : 'forms-badge-draft');
    if (form.status === 'aberto' && form.opens_at && now < new Date(form.opens_at).getTime()) { label = 'Agendado'; cls = 'forms-badge-draft'; }
    if (form.status === 'aberto' && form.closes_at && now >= new Date(form.closes_at).getTime()) { label = 'Encerrado (horário)'; cls = 'forms-badge-closed'; }
    return el('span', { class: `forms-badge ${cls}`, text: label });
  }

  /**
   * Cartão com status, agendamento, configuração, link e QR Code do formulário
   */
  function formCard(form, ctx) {
    const { mod, training, rerender } = ctx;
    const canEdit = can(mod, 'edit', form.training_id);
    const url = publicUrl(form);
    const title = (form.config && form.config.label) || (form.session_key === 'unico' ? MODULE_NAMES[mod] : form.session_key);
    const run = (fn) => async (e) => {
      const btn = e && e.currentTarget;
      if (btn) btn.disabled = true;
      try { await fn(); } catch (err) { toast(errMsg(err), 'error'); } finally { if (btn) btn.disabled = false; }
    };

    // Status
    const statusRow = el('div', { class: 'forms-status-row' }, [
      el('h3', { class: 'forms-card-title', text: title }),
      formStateBadge(form),
      el('span', { class: 'admin-muted', text: form.opens_at || form.closes_at ? `Janela: ${fmtDateTime(form.opens_at)} até ${fmtDateTime(form.closes_at)}` : '' })
    ]);
    const actions = el('div', { class: 'admin-actions' });
    if (canEdit) {
      if (form.status !== 'aberto') actions.append(el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Abrir', onclick: run(async () => { await updateForm(form, { status: 'aberto' }, 'form.open'); toast('Formulário aberto.', 'success'); rerender(); }) }));
    }

    // Link e QR Code
    const qrBox = el('div', { class: 'forms-qr' });
    const linkBox = el('div', { class: 'forms-link' });
    if (!url) {
      linkBox.append(el('p', { class: 'admin-muted', text: 'Configure o endereço público (ex.: https://<usuario>.github.io/<repo>) em Configurações para gerar o link e o QR Code.' }));
    } else {
      const posterTitle = { inscricao: 'Inscrição', presenca: `Lista de Presença${form.config && form.config.label ? ` — ${form.config.label}` : ''}`, avaliacao: 'Avaliação da Capacitação' }[mod];
      const qrImg = el('div', { class: 'forms-qr-img forms-qr-click', role: 'button', tabindex: '0', title: 'Clique para abrir o modo recepção (QR Code em tela cheia)', 'aria-label': 'Abrir o modo recepção', html: CapacitaTE.qr.svg(url, { title: `QR Code: ${title}` }) });
      qrImg.addEventListener('click', () => receptionMode(url, posterTitle, training));
      qrImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); receptionMode(url, posterTitle, training); } });
      qrBox.append(qrImg, el('small', { class: 'admin-muted', style: 'display:block; margin-top:0.3rem; text-align:center;', text: 'Clique no QR para o modo recepção' }));
      const linkInput = el('input', { class: 'form-control', type: 'text', value: url, readOnly: true, 'aria-label': 'Link público' });
      linkBox.append(
        el('label', { class: 'form-label', text: 'Link público' }), linkInput,
        el('div', { class: 'admin-actions', style: 'margin-top:0.6rem;' }, [
          el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Copiar link', onclick: async () => {
            try { await navigator.clipboard.writeText(url); toast('Link copiado.', 'success'); } catch (e) { linkInput.select(); document.execCommand('copy'); toast('Link copiado.', 'success'); }
          } }),
          el('a', { class: 'btn btn-secondary btn-sm', href: url, target: '_blank', rel: 'noopener', text: 'Abrir' }),
          el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Baixar PNG', onclick: () => CapacitaTE.qr.downloadPng(url, `qr-${mod}-${form.session_key}.png`) }),
          el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Baixar SVG', onclick: () => CapacitaTE.qr.downloadSvg(url, `qr-${mod}-${form.session_key}.svg`) }),
          el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Imprimir cartaz A4', onclick: () => {
            try { CapacitaTE.qr.printPoster(url, { title: posterTitle, subtitle: `${trainingTitle(training)} · ${training.datesFormatted || ''}` }); } catch (err) { toast(err.message, 'error'); }
          } }),
        ])
      );
    }

    // Configuração
    const cfg = form.config || {};
    const cfgBox = el('details', { class: 'forms-config' });
    cfgBox.append(el('summary', { text: 'Configurar formulário' }));
    const fTitle = el('input', { class: 'form-control', type: 'text', value: cfg.title || '', id: `cfg-title-${form.id}` });
    const fOpens = el('input', { class: 'form-control', type: 'datetime-local', value: toLocalInput(form.opens_at), id: `cfg-open-${form.id}` });
    const fCloses = el('input', { class: 'form-control', type: 'datetime-local', value: toLocalInput(form.closes_at), id: `cfg-close-${form.id}` });
    const fields = [
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label', for: `cfg-title-${form.id}`, text: 'Título' }), fTitle]),
      el('div', { class: 'admin-form-grid' }, [
        el('div', { class: 'form-group', style: 'margin:0;' }, [el('label', { class: 'form-label', for: `cfg-open-${form.id}`, text: 'Abre em (opcional)' }), fOpens]),
        el('div', { class: 'form-group', style: 'margin:0;' }, [el('label', { class: 'form-label', for: `cfg-close-${form.id}`, text: 'Fecha em (opcional)' }), fCloses])
      ])
    ];
    const extraInputs = {};
    if (mod === 'inscricao') {
      extraInputs.intro = el('textarea', { class: 'form-control', rows: '6', id: `cfg-intro-${form.id}` });
      extraInputs.intro.value = cfg.intro || '';
      extraInputs.max = el('input', { class: 'form-control', type: 'number', min: '1', value: cfg.maxPerMunicipalityPerCategory || '', id: `cfg-max-${form.id}`, placeholder: 'sem limite' });
      fields.push(
        el('div', { class: 'form-group', style: 'margin-top:1rem;' }, [el('label', { class: 'form-label', for: `cfg-intro-${form.id}`, text: 'Texto de apresentação' }), extraInputs.intro,
          el('button', { type: 'button', class: 'btn btn-secondary btn-sm', style: 'margin-top:0.4rem;', text: 'Gerar texto a partir da capacitação', onclick: () => { extraInputs.intro.value = buildIntro(training); } })]),
        el('div', { class: 'form-group' }, [el('label', { class: 'form-label', for: `cfg-max-${form.id}`, text: 'Vagas por município e categoria (acima disso, lista de espera)' }), extraInputs.max])
      );
    }
    if (mod === 'presenca' && form.session_key !== 'unico') {
      extraInputs.label = el('input', { class: 'form-control', type: 'text', value: cfg.label || '', id: `cfg-label-${form.id}`, placeholder: '23/06/2026 — Manhã' });
      fields.push(el('div', { class: 'form-group', style: 'margin-top:1rem;' }, [el('label', { class: 'form-label', for: `cfg-label-${form.id}`, text: 'Nome da sessão' }), extraInputs.label]));
    }
    if (mod === 'avaliacao') {
      extraInputs.only = el('input', { type: 'checkbox', checked: !!cfg.onlyForAttendees, id: `cfg-only-${form.id}` });
      fields.push(el('label', { class: 'forms-check', for: `cfg-only-${form.id}` }, [extraInputs.only, 'Aceitar somente quem registrou presença']));
    }
    extraInputs.allowEdit = el('input', { type: 'checkbox', checked: !!cfg.allowEdit, id: `cfg-edit-${form.id}` });
    extraInputs.sendEmail = el('input', { type: 'checkbox', checked: cfg.sendEmail !== false, id: `cfg-mail-${form.id}` });
    fields.push(el('label', { class: 'forms-check', for: `cfg-mail-${form.id}` }, [extraInputs.sendEmail, 'Enviar e-mail de confirmação para quem responder']));
    if (mod !== 'presenca') fields.push(el('label', { class: 'forms-check', for: `cfg-edit-${form.id}` }, [extraInputs.allowEdit, 'Permitir que a pessoa atualize a própria resposta enquanto o formulário estiver aberto']));

    const munCount = (cfg.municipalities || []).length;
    const trainingMuns = trainingMunicipalities(training);
    const munChanged = JSON.stringify((cfg.municipalities || []).map(m => m.name)) !== JSON.stringify(trainingMuns.map(m => m.name));
    // Atualização automática: se a lista da capacitação mudou, o formulário recebe a lista nova sozinho (link e QR Code não mudam).
    // Tenta uma vez para cada lista nova de cidades; se falhar, o aviso com o botão continua na tela.
    const autoKey = `${form.id}|${trainingMuns.map(m => m.name).join(',')}`;
    // Convite com a quantidade de municípios desatualizada (formulários criados antes da v.4.3.7) também é corrigido
    const introStale = typeof cfg.intro === 'string' && cfg.intro.replace(/ de \d+ municípios?( d[oa]s? Estados? de [^.]+?)?(?= para a Capacitação)/, citiesPhrase(trainingMuns)) !== cfg.intro;
    if ((munChanged || introStale) && canEdit && !AUTO_MUN_TRIED.has(autoKey)) {
      AUTO_MUN_TRIED.add(autoKey);
      updateForm(form, { config: Object.assign({}, form.config, { municipalities: trainingMuns }) }, 'form.config')
        .then(() => { toast('Cidades do formulário atualizadas automaticamente.', 'success'); rerender(); })
        .catch(() => { /* mantém o aviso manual */ });
    }
    fields.push(el('div', { class: 'forms-muns' }, [
      el('span', { text: `${munCount} municípios no formulário.` }),
      munChanged ? el('span', { class: 'forms-warn', text: ` A lista de municípios convocados mudou (${trainingMuns.length} na Etapa 3 do Relatório).` }) : null,
      el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Atualizar a partir dos municípios convocados', onclick: run(async () => {
        await updateForm(form, { config: Object.assign({}, form.config, { municipalities: trainingMuns }) }, 'form.config');
        toast('Municípios atualizados.', 'success'); rerender();
      }) })
    ]));

    if (canEdit) {
      fields.push(el('div', { class: 'admin-actions', style: 'margin-top:1rem;' }, el('button', {
        type: 'button', class: 'btn btn-primary btn-sm', text: 'Salvar configuração', onclick: run(async () => {
          const opens = fromLocalInput(fOpens.value);
          const closes = fromLocalInput(fCloses.value);
          if (opens && closes && new Date(closes) <= new Date(opens)) throw new Error('O fechamento precisa ser depois da abertura.');
          const newCfg = Object.assign({}, form.config, { title: fTitle.value.trim() || form.config.title, allowEdit: extraInputs.allowEdit.checked, sendEmail: extraInputs.sendEmail.checked });
          if (extraInputs.intro) newCfg.intro = extraInputs.intro.value.trim();
          if (extraInputs.max) newCfg.maxPerMunicipalityPerCategory = extraInputs.max.value ? parseInt(extraInputs.max.value, 10) : null;
          if (extraInputs.label) newCfg.label = extraInputs.label.value.trim();
          if (extraInputs.only) newCfg.onlyForAttendees = extraInputs.only.checked;
          await updateForm(form, { config: newCfg, opens_at: opens, closes_at: closes }, 'form.config');
          toast('Configuração salva.', 'success'); rerender();
        })
      })));
    } else {
      cfgBox.append(el('p', { class: 'admin-muted', text: 'Somente leitura: você não tem permissão para editar este módulo.' }));
    }
    cfgBox.append(...fields);

    // Lista de cidades diferente da Etapa 3 do Relatório: aviso em destaque (o link e o QR continuam os mesmos)
    const munAlert = munChanged && mod !== 'avaliacao' ? el('div', { class: 'forms-alert' }, [
      el('span', { text: `As cidades convidadas mudaram: o formulário tem ${munCount} e a capacitação tem ${trainingMuns.length}. Atualize para o público ver a lista nova (o link e o QR Code continuam os mesmos).` }),
      canEdit ? el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Atualizar cidades no formulário', onclick: run(async () => {
        await updateForm(form, { config: Object.assign({}, form.config, { municipalities: trainingMuns }) }, 'form.config');
        toast('Cidades atualizadas no formulário.', 'success'); rerender();
      }) }) : null
    ]) : null;

    // Rascunho: o link ainda responde "não está disponível" para o público
    const draftAlert = form.status === 'rascunho' ? el('div', { class: 'forms-alert forms-alert-draft' }, [
      el('span', { text: 'Em rascunho: o público ainda não consegue responder (o link mostra "Este formulário ainda não está disponível"). Confira a configuração e clique em Abrir para liberar.' }),
      canEdit ? el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Abrir agora', onclick: run(async () => { await updateForm(form, { status: 'aberto' }, 'form.open'); toast('Formulário aberto: o link já está funcionando.', 'success'); rerender(); }) }) : null
    ]) : null;

    return el('div', { class: 'glass-card forms-card' }, [
      munAlert, draftAlert, statusRow, actions,
      el('div', { class: 'forms-share' }, [qrBox, linkBox]),
      cfgBox
    ]);
  }

  // ---------- tabelas ----------
  function table(headers, rows, emptyText, extraClass) {
    if (!rows.length) return el('p', { class: 'admin-muted', text: emptyText || 'Nenhuma resposta ainda.' });
    return el('div', { class: 'data-table-container', style: 'overflow-x:auto;' }, el('table', { class: `data-table admin-table${extraClass ? ` ${extraClass}` : ''}` }, [
      el('thead', {}, el('tr', {}, headers.map(h => el('th', { text: h })))),
      el('tbody', {}, rows)
    ]));
  }

  function searchBox(onInput, placeholder = 'Buscar por nome ou município') {
    const input = el('input', { class: 'form-control forms-search', type: 'search', placeholder, 'aria-label': placeholder });
    input.addEventListener('input', () => onInput(input.value.trim().toLowerCase()));
    return input;
  }

  // Carregamento em tela com barra de 0 a 100% e duração mínima de 1,5 s. A barra sobe até 90% com o tempo e só chega a
  // 100% quando o trabalho termina. Devolve done(mensagem?): sem mensagem só fecha; com mensagem mostra "Concluído" e
  // espera o clique em Continuar.
  const BUSY_MIN_MS = 1500;
  function showBusy(text) {
    const title = el('strong', { text });
    const fill = el('span', { style: 'width:0%;' });
    const pctText = el('small', { class: 'busy-pct', text: '0%' });
    const card = el('div', { class: 'busy-card glass-card' }, [
      title, el('div', { class: 'busy-bar', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': '0' }, fill), pctText,
      el('small', { class: 'admin-muted', text: 'Aguarde, não feche esta janela.' })
    ]);
    const node = el('div', { class: 'busy-overlay', role: 'status', 'aria-live': 'polite' }, card);
    document.body.appendChild(node);
    const since = Date.now();
    const setPct = (v) => {
      const n = Math.round(v);
      fill.style.width = `${n}%`;
      pctText.textContent = `${n}%`;
      fill.parentNode.setAttribute('aria-valuenow', String(n));
    };
    const timer = setInterval(() => setPct(Math.min(90, ((Date.now() - since) / BUSY_MIN_MS) * 90)), 40);
    return async (successMessage) => {
      const wait = Math.max(0, BUSY_MIN_MS - (Date.now() - since));
      if (wait) await new Promise(r => setTimeout(r, wait));
      clearInterval(timer);
      setPct(100);
      await new Promise(r => setTimeout(r, 350)); // deixa ver o 100%
      if (successMessage) {
        await new Promise(resolve => {
          const ok = el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Continuar', onclick: resolve });
          card.textContent = '';
          card.append(el('div', { class: 'busy-check', 'aria-hidden': 'true', text: '✓' }), el('strong', { text: 'Concluído' }), el('p', { class: 'admin-muted', style: 'margin:0;', text: successMessage }), ok);
          node.setAttribute('role', 'alertdialog');
          ok.focus();
        });
      }
      node.remove();
    };
  }

  // Janela com lista de cidades marcáveis (confirmação antes de importar e exclusão de cidades)
  function pickModal({ title, intro, items, confirmText, danger = false, notes = [], busyText, afterClose, onConfirm }) {
    const boxes = items.map(it => el('input', { type: 'checkbox', checked: !it.disabled && it.checked !== false, disabled: !!it.disabled, id: `pk-${it.id}`, 'aria-label': it.label }));
    const all = el('input', { type: 'checkbox', checked: items.every(i => i.disabled || i.checked !== false), id: 'pk-all', 'aria-label': 'Marcar todas' });
    all.addEventListener('change', () => { const on = all.checked; boxes.forEach(b => { if (!b.disabled) b.checked = on; }); update(); });
    const confirm = el('button', { type: 'button', class: `btn ${danger ? 'btn-secondary admin-danger-btn' : 'btn-primary'} btn-sm`, text: confirmText });
    const update = () => {
      const n = boxes.filter(b => b.checked).length;
      confirm.disabled = n === 0;
      confirm.textContent = `${confirmText} (${n})`;
      all.checked = n > 0 && n === boxes.filter(b => !b.disabled).length;
    };
    boxes.forEach(b => b.addEventListener('change', update));
    const overlay = el('div', { class: 'pick-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    const close = () => { document.removeEventListener('keydown', onKey); overlay.remove(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    confirm.addEventListener('click', async () => {
      const ids = items.filter((_, i) => boxes[i].checked && !boxes[i].disabled).map(i => i.id);
      confirm.disabled = true;
      const done = showBusy(busyText || 'Salvando...');
      try {
        const msg = await onConfirm(ids);
        await done(typeof msg === 'string' ? msg : undefined);
        close();
        if (afterClose) afterClose();
      } catch (err) { await done(); toast(errMsg(err), 'error'); confirm.disabled = false; }
    });
    overlay.append(el('div', { class: 'pick-card glass-card' }, [
      el('h3', { style: 'margin:0 0 0.3rem;', text: title }),
      el('p', { class: 'admin-muted', style: 'margin:0 0 0.8rem;', text: intro }),
      el('label', { class: 'forms-check', for: 'pk-all', style: 'font-weight:600;' }, [all, 'Marcar todas']),
      el('div', { class: 'pick-list' }, items.map((it, i) => el('label', { class: 'forms-check', for: `pk-${it.id}` }, [boxes[i], it.label, it.note ? el('small', { class: 'admin-muted', text: ` · ${it.note}` }) : null]))),
      ...notes.map(n => el('p', { class: 'admin-muted', style: 'margin:0.5rem 0 0; font-size:0.82rem;', text: n })),
      el('div', { class: 'admin-actions', style: 'margin-top:1rem; justify-content:flex-end;' }, [el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Cancelar', onclick: close }), confirm])
    ]));
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    update();
  }

  // Distância em linha reta (km) de uma cidade até o município sede (polo) da capacitação
  function distanceFromSede(training, name, uf) {
    const P = window.convocacaoParser;
    if (!P || !P.calculateDistanceToPolo || !training || !training.polo) return 0;
    return Number(P.calculateDistanceToPolo(name, uf, training.polo, training.uf)) || 0;
  }

  // Adicionar cidade convidada direto no painel de vagas: grava na capacitação (Etapa 2 do cadastro) e no formulário
  function addMunicipalityBox(ctx, form) {
    const t = ctx.training;
    const ufs = [...new Set((window.IBGE_DATA || []).map(m => m.u))].sort();
    const uf = el('select', { class: 'form-control', id: 'mun-uf', style: 'max-width:150px;', 'aria-label': 'UF' }, [el('option', { value: '', text: 'Selecionar UF' }), ...ufs.map(u => el('option', { value: u, text: u }))]);
    uf.value = ''; // começa sem UF escolhida
    const city = el('select', { class: 'form-control', style: 'max-width:320px;', 'aria-label': 'Cidade' });
    const fill = () => {
      const have = new Set((t.municipalities || []).map(m => String(m.ibgeCode || m.ibge || '')));
      city.textContent = '';
      city.disabled = !uf.value;
      city.append(el('option', { value: '', text: uf.value ? 'Escolha a cidade...' : 'Selecione a UF primeiro' }));
      if (uf.value) (window.IBGE_DATA || []).filter(m => m.u === uf.value && !have.has(String(m.c))).sort((a, b) => a.n.localeCompare(b.n, 'pt-BR'))
        .forEach(m => city.append(el('option', { value: String(m.c), text: m.n })));
    };
    uf.addEventListener('change', fill); fill();
    const btn = el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Adicionar cidade', onclick: async () => {
      const m = (window.IBGE_DATA || []).find(x => String(x.c) === city.value);
      if (!uf.value) return toast('Selecione a UF.', 'warning');
      if (!m) return toast('Escolha a cidade.', 'error');
      btn.disabled = true;
      try {
        if (!t.municipalities) t.municipalities = [];
        t.municipalities.push({ id: `mun_add_${Date.now()}`, ibgeCode: String(m.c), name: m.n, uf: m.u, distanceKm: distanceFromSede(t, m.n, m.u), isSummoned: true, isSede: false,
          inscribedCACS: 2, inscribedGestores: 2, inscribedTotal: 4, presentCACS: 0, presentGestores: 0, presentTotal: 0 });
        await window.db.saveTrainingFull(t, `Cidade adicionada pelo painel de vagas: ${m.n}/${m.u}`);
        await updateForm(form, { config: Object.assign({}, form.config, { municipalities: trainingMunicipalities(t) }) }, 'form.config');
        toast(`${m.n} adicionada. O formulário já mostra a cidade.`, 'success'); ctx.rerender();
      } catch (err) { toast(errMsg(err), 'error'); btn.disabled = false; }
    } });
    // Importar por planilha: mesma janela do assistente (conferência, distâncias, marcar municípios, carregamento e confirmação)
    const openSheetImport = () => window.app.openImportMunicipalitiesModal('painel', t, async () => {
      await updateForm(form, { config: Object.assign({}, form.config, { municipalities: trainingMunicipalities(t) }) }, 'form.config');
    });
    const downloadModel = () => window.app.downloadMunicipalitiesTemplate();
    // Excluir cidades convidadas (escolhe na lista e confirma). Inscrições já feitas não são apagadas.
    const removeCities = async () => {
      const list = trainingMunicipalities(t);
      if (!list.length) return toast('Não há cidades para excluir.', 'warning');
      const { data } = await client().from('registrations').select('municipality').eq('training_id', t.id).eq('status', 'valida');
      const counts = {};
      (data || []).forEach(r => { counts[r.municipality] = (counts[r.municipality] || 0) + 1; });
      // O município sede (polo) não pode ser excluído: o relatório e o formulário dependem dele
      const norm = (v) => String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
      const sedeIds = new Set((t.municipalities || []).filter(m => m.isSede || (norm(m.name) === norm(t.polo) && String(m.uf || t.uf || '').toUpperCase() === String(t.uf || '').toUpperCase()))
        .map(m => String(m.ibgeCode || m.ibge || m.name)));
      pickModal({
        title: 'Excluir cidades convidadas',
        intro: 'Marque as cidades que saem da lista de convidadas. Elas deixam de aparecer no formulário de inscrição.',
        items: list.map(m => { const id = String(m.ibge || m.name); const sede = sedeIds.has(id); return { id, label: `${m.name} (${m.uf})`, note: sede ? 'município sede: não pode ser excluído' : (counts[m.name] ? `${counts[m.name]} inscrito(s)` : 'sem inscritos'), checked: false, disabled: sede }; }),
        confirmText: 'Excluir cidades selecionadas',
        busyText: 'Excluindo cidades e atualizando o formulário...',
        afterClose: () => ctx.rerender(),
        danger: true,
        notes: ['As inscrições já recebidas continuam salvas; só a cidade sai da lista de convidadas. Para voltar, adicione a cidade de novo.'],
        onConfirm: async (ids) => {
          const drop = new Set(ids.filter(id => !sedeIds.has(String(id)))); // proteção extra: a sede nunca sai
          if (!drop.size) return;
          t.municipalities = (t.municipalities || []).filter(m => !drop.has(String(m.ibgeCode || m.ibge || m.name)));
          await window.db.saveTrainingFull(t, `Cidades excluídas pelo painel de vagas: ${drop.size}`);
          await updateForm(form, { config: Object.assign({}, form.config, { municipalities: trainingMunicipalities(t) }) }, 'form.config');
          return `${drop.size} cidade(s) excluída(s) da lista de convidadas e do formulário de inscrição.`;
        }
      });
    };
    return el('div', { class: 'forms-toolbar', style: 'margin-bottom:0.8rem; flex-wrap:wrap;' }, [
      el('strong', { text: 'Adicionar cidade convidada' }), uf, city, btn,
      el('span', { class: 'admin-muted', text: 'ou' }),
      el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Importar por planilha', onclick: () => { window.app.munImportTraining = t; openSheetImport(); } }),
      el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: 'Baixar planilha modelo', onclick: downloadModel }),
      el('button', { type: 'button', class: 'btn btn-secondary btn-sm admin-danger-btn', text: 'Excluir cidades...', onclick: removeCities })
    ]);
  }

  // Modo recepção: QR Code grande em tela cheia, para projetar no telão da entrada
  function receptionMode(url, title, training) {
    const overlay = el('div', { class: 'reception-overlay', role: 'dialog', 'aria-label': `Modo recepção: ${title}` }, [
      el('button', { type: 'button', class: 'btn btn-secondary btn-sm reception-close', text: 'Fechar (Esc)', onclick: () => close() }),
      el('h1', { class: 'reception-title', text: title }),
      el('p', { class: 'reception-sub', text: `${trainingTitle(training)} · ${training.datesFormatted || ''}` }),
      el('div', { class: 'reception-qr', html: CapacitaTE.qr.svg(url, { title: `QR Code: ${title}` }) }),
      el('p', { class: 'reception-hint', text: 'Aponte a câmera do celular para o QR Code' }),
      el('p', { class: 'reception-url', text: url })
    ]);
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    function close() {
      document.removeEventListener('keydown', onKey);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      overlay.remove();
    }
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    if (overlay.requestFullscreen) overlay.requestFullscreen().catch(() => {});
  }

  // Inclusão manual de resposta por quem tem permissão de edição (RPC staff_submit; fica marcada como "manual")
  function manualBox(ctx, form) {
    const mod = form.module_key;
    const muns = ((form.config && form.config.municipalities) || []).map(m => m.name);
    const inputs = {};
    const field = (key, label, attrs = {}) => {
      inputs[key] = attrs.options
        ? el('select', { class: 'form-control', 'aria-label': label }, [el('option', { value: '', text: 'Escolha...' }), ...attrs.options.map(o => el('option', { value: o, text: o }))])
        : el('input', Object.assign({ class: 'form-control', type: 'text', 'aria-label': label }, attrs));
      return el('div', { class: 'form-group', style: 'margin:0;' }, [el('label', { class: 'form-label', text: label }), inputs[key]]);
    };
    const msg = el('p', { class: 'admin-muted', style: 'margin:0.6rem 0 0;' });
    const save = el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Incluir resposta', onclick: async () => {
      const v = (k) => inputs[k].value.trim();
      if (!CapacitaTE.cpf.isValid(v('cpf'))) return toast('CPF inválido.', 'warning');
      if (v('full_name').split(/\s+/).filter(Boolean).length < 2) return toast('Informe o nome completo.', 'warning');
      save.disabled = true;
      const payload = {
        cpf: v('cpf').replace(/\D/g, ''), full_name: v('full_name'), email: v('email'), email_confirm: v('email'), phone: v('phone').replace(/\D/g, ''),
        birth_date: v('birth_date'), municipality: v('municipality'), category: v('category'), role_gestao: v('role'), role_cacs: v('role'),
        truth_confirmed: true, consent: true
      };
      const { data, error } = await client().rpc('staff_submit', { p_form: form.id, p_payload: payload });
      save.disabled = false;
      if (error) { msg.textContent = errMsg(error); return toast(errMsg(error), 'error'); }
      toast(`Resposta incluída${data && data.protocolo ? ` (protocolo ${data.protocolo})` : ''}.`, 'success');
      ctx.rerender();
    } });
    return el('details', { class: 'glass-card forms-section forms-config' }, [
      el('summary', { text: 'Incluir resposta manualmente' }),
      el('p', { class: 'admin-muted', text: 'Para quem não conseguiu responder pelo celular. A resposta entra marcada como "manual" e vale como as demais.' }),
      el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:0.7rem;' }, [
        field('cpf', 'CPF'), field('full_name', 'Nome completo'), field('email', 'E-mail', { type: 'email' }), field('phone', 'Telefone com DDD'),
        field('birth_date', 'Nascimento', { type: 'date' }), field('municipality', 'Município', { options: muns }),
        field('category', 'Categoria', { options: ['CACS-FUNDEB', 'Gestão municipal'] }), field('role', 'Cargo')
      ]),
      el('div', { class: 'admin-actions', style: 'margin-top:0.8rem;' }, save), msg
    ]);
  }

  // ---------- excluir e lixeira ----------
  // Excluir copia a resposta para public.deleted_responses (0004g) e remove da tabela; restaurar faz o caminho inverso.
  function deleteButton(ctx, tableName, row, what) {
    return el('button', { type: 'button', class: 'btn btn-secondary btn-sm admin-danger-btn', text: 'Excluir', onclick: () => window.app.openConfirmModal({
      title: `Excluir ${what}?`, msg: `${what[0].toUpperCase() + what.slice(1)} de ${row.full_name || 'esta pessoa'} sai da lista e vai para a Lixeira, de onde pode ser restaurada.`, btnText: 'Sim, excluir',
      successTitle: 'Movida para a Lixeira', successMsg: 'Você pode restaurar pela seção Lixeira.',
      onConfirm: async () => {
        const { error } = await client().rpc('staff_delete_response', { p_table: tableName, p_id: row.id });
        if (error) return toast(errMsg(error), 'error');
        ctx.rerender();
      }
    }) });
  }

  async function trashSection(ctx, tableName, whatPlural) {
    const { data, error } = await client().from('deleted_responses').select('*').eq('training_id', ctx.training.id).eq('table_name', tableName).order('deleted_at', { ascending: false });
    if (error) return null; // migração 0004g ainda não aplicada: não mostra a lixeira
    const items = data || [];
    const canEdit = can(ctx.mod, 'edit', ctx.training.id);
    const rows = items.map(d => {
      const r = d.record || {};
      return el('tr', {}, [
        el('td', { text: r.full_name || '—' }),
        el('td', { text: maskCpf(r.cpf) }),
        el('td', { text: r.session_key && tableName === 'attendance' ? r.session_key : (r.municipality || '—') }),
        el('td', { text: fmtDateTime(d.deleted_at) }),
        el('td', { class: 'perm-col' }, canEdit ? [el('button', { type: 'button', class: 'btn btn-primary btn-sm', text: 'Restaurar', onclick: async (e) => {
          e.currentTarget.disabled = true;
          const { error: err } = await client().rpc('staff_restore_response', { p_deleted: d.id });
          if (err) { toast(errMsg(err), 'error'); e.currentTarget.disabled = false; return; }
          toast('Restaurada.', 'success'); ctx.rerender();
        } }), el('button', { type: 'button', class: 'btn btn-secondary btn-sm admin-danger-btn', style: 'margin-left:0.4rem;', text: 'Excluir permanentemente', onclick: () => window.app.openConfirmModal({
          title: 'Excluir permanentemente?', msg: `Os dados de ${r.full_name || 'esta pessoa'} serão apagados de vez. Esta ação NÃO pode ser desfeita.`, btnText: 'Sim, excluir para sempre',
          successTitle: 'Excluída permanentemente', successMsg: 'O item saiu da Lixeira.',
          onConfirm: async () => {
            const { error: err } = await client().rpc('staff_purge_response', { p_deleted: d.id });
            if (err) return toast(errMsg(err), 'error');
            ctx.rerender();
          }
        }) })] : null)
      ]);
    });
    return el('details', { class: 'glass-card forms-section forms-config' }, [
      el('summary', { text: `Lixeira (${items.length})` }),
      el('p', { class: 'admin-muted', text: `${whatPlural[0].toUpperCase() + whatPlural.slice(1)} excluídas ficam aqui e podem ser restauradas.` }),
      table(['Nome', 'CPF', tableName === 'attendance' ? 'Dia' : 'Município', 'Excluída em', ''], rows, 'A lixeira está vazia.')
    ]);
  }

  // ---------- páginas ----------
  function header(def, training) {
    return el('div', { class: 'forms-header' }, [
      el('div', {}, [
        el('h2', { style: 'margin:0; display:flex; align-items:center; gap:0.5rem;' }, [el('span', { html: def.icon, class: 'forms-header-icon' }), def.title]),
        el('p', { style: 'color:var(--text-secondary); margin:0.25rem 0 0;', text: training ? `${trainingTitle(training)} · ${training.datesFormatted || ''}` : 'Escolha a capacitação.' })
      ]),
      training ? el('a', { class: 'btn btn-secondary btn-sm', href: `#${def.key}`, text: 'Trocar capacitação' }) : null
    ]);
  }

  async function renderTraining(def, container, trainingId, { embedded = false } = {}) {
    const hashAtStart = window.location.hash;
    const training = await loadTraining(trainingId);
    if (!training) {
      container.textContent = '';
      if (!embedded) container.append(header(def, null));
      container.append(el('div', { class: 'glass-card' }, el('p', { class: 'auth-message-error', text: 'Capacitação não encontrada neste navegador. Sincronize e tente de novo.' })));
      return;
    }
    const body = el('div');
    container.textContent = '';
    if (!embedded) container.append(header(def, training));
    container.append(body);
    const rerender = () => renderTraining(def, container, trainingId, { embedded });
    body.append(el('p', { class: 'admin-muted', text: 'Carregando...' }));
    try {
      const forms = await loadForms(def.key, training.id);
      body.textContent = '';
      const ctxRef = {};
      const ctx = { mod: def.key, training, forms, rerender, el, toast, client, can, errMsg, audit, table, searchBox, formCard, createForm, deleteButton: (tbl, row, what) => deleteButton(ctxRef, tbl, row, what), trashSection: (tbl, plural) => trashSection(ctxRef, tbl, plural), distanceFromSede, addMunicipalityBox: (f) => addMunicipalityBox(ctxRef, f), manualBox: (f) => manualBox(ctxRef, f), maskCpf, fmtPhone, fmtDateTime, trainingTitle };
      Object.assign(ctxRef, ctx);
      await def.render(body, ctx);
    } catch (err) {
      body.textContent = '';
      body.append(el('p', { class: 'auth-message-error', text: errMsg(err) }));
    }
    // Atualiza a cada 30 s enquanto a tela estiver aberta
    clearInterval(refreshTimer);
    refreshTimer = setInterval(() => {
      if (window.location.hash !== hashAtStart || !document.body.contains(container) || document.hidden) return;
      if (container.querySelector('details[open], input:focus, textarea:focus')) return;
      rerender();
    }, 30000);
  }

  CapacitaTE.formModules = {
    el, toast, client, errMsg, publicUrl, trainingMunicipalities, loadTraining, distanceFromSede, showBusy,
    /**
     * Registra um módulo de formulário: def = { key, title, icon, order, render(body, ctx) }
     */
    /**
     * Registra um módulo de formulário: def = { key, title, iconPaths, order, stage, render(body, ctx) }.
     * O módulo não tem item próprio no menu: ele aparece dentro da página da capacitação (etapas 1 e 2).
     */
    register(def) {
      const full = Object.assign({}, def, { icon: `<svg ${ICON_ATTRS}>${def.iconPaths}</svg>` });
      registry[def.key] = full;
      CapacitaTE.registerModule({
        key: def.key,
        title: def.title,
        icon: full.icon,
        order: def.order,
        actions: ['view', 'edit', 'export'],
        perTraining: true,
        menu: [],
        mount: (container, ctx = {}) => renderTraining(full, container, ctx.trainingId, { embedded: true }),
        routes: {
          [def.key]: () => { window.location.hash = 'trainings'; },
          [`${def.key}/:id`]: ({ id }) => { window.location.hash = `capacitacao/${id}/${def.stage || 1}`; }
        }
      });
    },

    /**
     * Desenha o módulo dentro de outra tela (página da capacitação)
     */
    renderEmbedded(key, container, trainingId) {
      const def = registry[key];
      if (!def) return;
      if (!can(key, 'view', trainingId)) {
        container.textContent = '';
        container.append(el('p', { class: 'admin-muted', text: `Você não tem permissão para ver ${def.title}.` }));
        return;
      }
      clearInterval(refreshTimer);
      return renderTraining(def, container, trainingId, { embedded: true });
    },

    trainingTitle, buildIntro
  };
})();
