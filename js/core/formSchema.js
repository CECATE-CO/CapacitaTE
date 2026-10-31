/**
 * CapacitaTE - Esquema dos Formulários Públicos (fonte oficial: .agents/specs/formularios.md)
 * Os 3 formulários descritos como dados: seções, campos, tipos, obrigatoriedade, condições (showIf), opções e o
 * cabeçalho de exportação de cada campo. Um único renderizador (publico/publico.js) lê este esquema.
 * Mantenha as validações iguais às das funções do servidor (supabase/migrations/0004*.sql).
 * Versão: v.4.3.8
 */

(function (root) {
  const CATEGORIES = ['CACS-FUNDEB', 'Gestão municipal'];

  // Textos e opções padrão. Os valores das opções são gravados e exportados exatamente assim (com ";" e "Oficio").
  const DEFAULTS = {
    consentText: 'Autorizo o tratamento dos meus dados pessoais pelo CECATE Centro-Oeste/UFG e pelo FNDE exclusivamente para fins de gestão, certificação e avaliação das capacitações em transporte escolar, nos termos da Lei nº 13.709/2018 (LGPD).',
    truthStatement: 'Declaro que revisei e confirmo a veracidade de todas as informações prestadas neste formulário.',
    contacts: { whatsapp: '(62) 3209-6723', site: 'https://cecate.fct.ufg.br/', instagram: '@cecate.co', email: 'cecate@ufg.br' },
    ratingLabel: 'Avaliar de 1 a 5 (1 significa "ruim" e 5 significa "excelente")',
    ratingItems: [
      { key: 'inscricao', label: 'Inscrição' },
      { key: 'divulgacao', label: 'Divulgação' },
      { key: 'data', label: 'Data da Formação' },
      { key: 'horario', label: 'Horário da Formação' },
      { key: 'local', label: 'Local da Formação' },
      { key: 'duracao', label: 'Duração da Formação' },
      { key: 'geral', label: 'Como você avalia a Formação' }
    ],
    institutionOptions: ['Prefeitura;', 'Secretaria Municipal de Educação;', 'Secretaria Estadual de Educação;', 'Conselheira (o) do CACS/Fundeb', 'Outros'],
    heardFromOptions: ['E-mail encaminhado pelo CECATE/CO', 'Oficio de convocação feito pelo FNDE', 'Grupos de WhatsApp', 'Instagram'],
    heardFromAllowOther: true,
    successCaseText: 'Prezado(a) Gestor(a), se existe algum caso de sucesso da gestão do transporte escolar no seu município, gostaríamos de conhecer mais um pouco a respeito. Por favor, relate de forma sucinta o caso de sucesso no espaço a seguir:',
    attendanceWelcome: 'Seja bem-vindo ao curso de Capacitação em Transporte Escolar (CTE). Este curso tem como objetivo aprimorar os conhecimentos em transporte escolar dos gestores municipais, apresentando os programas do governo federal, mostrando os principais aspectos de planejamento e regulação na área e ensinando o Sistema Eletrônico de Gestão do Transporte Escolar (SETE).',
    notRegisteredNotice: 'Não encontramos sua inscrição. Complete seus dados para registrar a presença.'
  };

  // Cabeçalho de exportação mantém o texto original do Google Forms (inclusive "conhecer mais um pouco ao respeito")
  const SUCCESS_CASE_EXPORT = 'Prezado(a) Gestor(a), \n\nSe existe algum caso de sucesso da gestão do transporte escolar no seu município, gostaríamos conhecer mais um pouco ao respeito.\n\nPor favor, relate de forma sucinta o caso de sucesso no espaço a seguir:';
  const IS_GESTAO = { field: 'category', equals: 'Gestão municipal' };
  const IS_CACS = { field: 'category', equals: 'CACS-FUNDEB' };

  // ---------- campos ----------
  const F = {
    full_name: { id: 'full_name', label: 'Nome Completo:', type: 'texto', required: true, autocomplete: 'name', minWords: 2, exportHeader: 'Nome Completo:' },
    email: { id: 'email', label: 'E-mail', type: 'email', required: true, autocomplete: 'email', exportHeader: 'Endereço de e-mail' },
    email_confirm: { id: 'email_confirm', label: 'Confirme o E-mail', type: 'email', required: true, autocomplete: 'off', sameAs: 'email', sameAsError: 'Os e-mails não conferem.', exportHeader: 'Confirme o E-mail' },
    // Bloco DADOS DO PARTICIPANTE (P1 a P4)
    birth_date: { id: 'birth_date', label: 'Data de Nascimento', type: 'data', required: true, exportHeader: 'Data de Nascimento' },
    phone: { id: 'phone', label: 'Telefone (XX)XXXXX-XXXX', type: 'telefone', required: true, autocomplete: 'tel', exportHeader: 'Telefone (XX)XXXXX-XXXX' },
    municipality: { id: 'municipality', label: 'Município que representa:', type: 'lista', required: true, optionsFrom: 'municipalities', exportHeader: 'Município que representa:' },
    category: { id: 'category', label: 'Você faz parte do:', type: 'escolha_unica', required: true, options: CATEGORIES, exportHeader: 'Você faz parte do:' },
    role_gestao: { id: 'role_gestao', label: 'Que cargo você ocupa na gestão municipal?', type: 'texto', required: true, exportHeader: 'Que cargo você ocupa na gestão municipal?' },
    success_case: { id: 'success_case', labelFrom: 'successCaseText', type: 'texto_longo', required: false, exportHeader: SUCCESS_CASE_EXPORT },
    role_cacs: { id: 'role_cacs', label: 'Que cargo você ocupa no CACS-FUNDEB?', type: 'texto', required: true, exportHeader: 'Que cargo você ocupa no CACS-FUNDEB?' },
    truth_confirmed: { id: 'truth_confirmed', labelFrom: 'truthStatement', type: 'aceite', required: true, exportHeader: 'Confirmação de veracidade dos dados' },
    consent: { id: 'consent', labelFrom: 'consentText', type: 'aceite', required: true }
  };

  const PARTICIPANT = [F.birth_date, F.phone, F.municipality, F.category];
  const ROLE_SECTIONS = [
    { id: 'gestores', title: 'Gestores', showIf: IS_GESTAO, fields: [F.role_gestao, F.success_case] },
    { id: 'cacs', title: 'CACS-FUNDEB', showIf: IS_CACS, fields: [F.role_cacs] }
  ];
  const PRESENCE_PERSON = [
    F.full_name,
    { ...F.phone, label: 'Telefone: (DD)XXXXX-XXXX', exportHeader: 'Telefone: (DD)XXXXX-XXXX' },
    { ...F.email, label: 'E-mail:', exportHeader: 'E-mail: xxxxxxx@xxxmail.com' }
  ];

  // ---------- formulários ----------
  const FORM_SCHEMAS = {
    inscricao: {
      title: 'Capacitação em Transporte Escolar',
      submitLabel: 'Enviar',
      review: true, // resumo antes do envio, com "editar" por seção
      sections: [
        { id: 'dados', title: 'Dados pessoais', intro: true, fields: [F.full_name, F.email, F.email_confirm, ...PARTICIPANT] },
        ...ROLE_SECTIONS,
        { id: 'confirmacao', title: 'Confirmação', fields: [F.truth_confirmed, F.consent] }
      ],
      receiptTitle: 'Inscrição realizada!',
      waitlistTitle: 'Inscrição recebida em lista de espera'
    },
    // Caminho A: CPF já inscrito na capacitação (só confirma os dados)
    presenca_inscrito: {
      title: '{sigla} - Lista de Presença',
      submitLabel: 'Confirmar presença',
      sections: [{ id: 'confirmar', title: 'Confirmar dados', intro: true, fields: [...PRESENCE_PERSON, F.consent] }]
    },
    // Caminho B: CPF sem inscrição (dados + bloco do participante + cargo). Não cria inscrição.
    presenca_nao_inscrito: {
      title: '{sigla} - Lista de Presença',
      submitLabel: 'Confirmar presença',
      sections: [
        { id: 'dados', title: 'Seus dados', intro: true, fields: PRESENCE_PERSON },
        {
          id: 'inscricao', title: 'Inscrição', noticeFrom: 'notRegisteredNotice',
          fields: [F.birth_date, { ...F.phone, id: 'phone2', autocomplete: 'off', exportHeader: 'Telefone (XX)XXXXX-XXXX' }, F.municipality, F.category]
        },
        ...ROLE_SECTIONS,
        { id: 'confirmacao', title: 'Confirmação', fields: [F.consent] }
      ]
    },
    avaliacao: {
      title: 'Avaliação da Capacitação',
      submitLabel: 'Enviar',
      sections: [
        { id: 'identificacao', title: 'Identificação', fields: [F.full_name, { ...F.email, exportHeader: 'e-mail' }, F.phone, F.municipality, F.category] },
        {
          id: 'avaliar', title: 'Avaliar', fields: [
            { id: 'ratings', type: 'nota_1a5', labelFrom: 'ratingLabel', required: true, itemsFrom: 'ratingItems' },
            { id: 'liked', label: 'Indique dois aspectos que você mais gostou na Formação:', type: 'texto_longo', required: true, exportHeader: 'Indique dois aspectos que você mais gostou na Formação:' },
            { id: 'improve', label: 'Indique dois aspectos que poderiam ser melhorados na Formação (com detalhes);', type: 'texto_longo', required: true, exportHeader: 'Indique dois aspectos que poderiam ser melhorados na Formação (com detalhes);' },
            { id: 'institution_type', label: 'Instituição vinculada:', type: 'escolha_unica', required: true, optionsFrom: 'institutionOptions', hideSemicolon: true, exportHeader: 'Instituição vinculada: ' }
          ]
        },
        { id: 'instituicao', title: 'Instituição vinculada', fields: [{ id: 'institution_name', label: 'Mencionar a Instituição vinculada', type: 'texto', required: true, placeholder: 'Ex.: Secretaria Municipal de Educação de {polo}', exportHeader: 'Mencionar a  Instituição vinculada' }] },
        {
          id: 'cecate', title: 'CECATE', fields: [
            { id: 'topics_suggestion', label: 'Sugestão de temas para futuras capacitações (Webinar, vídeos de Youtube, postagens de Instagram, etc.)', type: 'texto_longo', required: false, exportHeader: 'Sugestão de temas para futuras capacitações \n(Webinar, vídeos de Youtube, postagens de Instagram, etc.) ' },
            { id: 'heard_from', label: 'Como ficou sabendo da Capacitação?', type: 'multipla_escolha', required: true, optionsFrom: 'heardFromOptions', otherFrom: 'heardFromAllowOther', otherId: 'heard_other', exportHeader: 'Como ficou sabendo da Capacitação?' },
            { id: 'comments', label: 'Comentários e/ou Sugestões:', type: 'texto_longo', required: false, exportHeader: 'Comentários e/ou Sugestões:' },
            F.consent
          ]
        }
      ],
      receiptTitle: 'Avaliação enviada. Obrigado!'
    }
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function withDefaults(config) {
    return Object.assign({}, DEFAULTS, config || {});
  }

  // Substitui {variavel} pelos dados da capacitação
  function fill(text, vars) {
    return String(text || '').replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] !== undefined && vars[k] !== null && vars[k] !== '' ? vars[k] : m));
  }

  function labelOf(field, config) {
    return field.labelFrom ? config[field.labelFrom] : field.label;
  }

  function optionsOf(field, config) {
    if (field.options) return field.options;
    const raw = config[field.optionsFrom] || [];
    return raw.map(o => (typeof o === 'string' ? o : o.name));
  }

  function isVisible(item, data) {
    if (!item.showIf) return true;
    return data[item.showIf.field] === item.showIf.equals;
  }

  /**
   * Valida um campo; devolve a mensagem de erro ou '' (o servidor valida tudo de novo)
   */
  function validateField(field, data, config) {
    const v = data[field.id];
    const empty = v === undefined || v === null || v === '' || v === false || (Array.isArray(v) && v.length === 0);
    if (field.type === 'multipla_escolha') {
      const other = field.otherId ? String(data[field.otherId] || '').trim() : '';
      if (field.otherId && data[`${field.otherId}_on`] && !other) return 'Descreva a opção "Outro".';
      if (field.required && (!Array.isArray(v) || v.length === 0) && !other) return 'Marque pelo menos uma opção.';
      return '';
    }
    if (field.type === 'nota_1a5') {
      const items = config[field.itemsFrom] || [];
      const missing = items.find(it => !(v && v[it.key] >= 1 && v[it.key] <= 5));
      return field.required && missing ? `Dê uma nota de 1 a 5 para "${missing.label}".` : '';
    }
    if (field.required && empty) return field.type === 'aceite' ? 'É preciso marcar esta opção para continuar.' : 'Campo obrigatório.';
    if (empty) return '';
    const s = String(v).trim();
    if (field.type === 'email' && !EMAIL_RE.test(s)) return 'Informe um e-mail válido.';
    if (field.sameAs && s.toLowerCase() !== String(data[field.sameAs] || '').trim().toLowerCase()) return field.sameAsError || 'Os valores não conferem.';
    if (field.type === 'telefone' && ![10, 11].includes(s.replace(/\D/g, '').length)) return 'Informe o telefone com DDD: (XX)XXXXX-XXXX.';
    if (field.minWords && s.split(/\s+/).filter(Boolean).length < field.minWords) return 'Informe o nome completo (nome e sobrenome).';
    if (field.type === 'texto_longo' && s.length > 2000) return 'Use no máximo 2.000 caracteres.';
    if (field.type === 'data') {
      const d = new Date(`${s}T12:00:00`);
      const limit = new Date();
      limit.setFullYear(limit.getFullYear() - 14);
      if (isNaN(d.getTime()) || d < new Date('1920-01-01T00:00:00') || d > limit) return 'Data inválida.';
    }
    return '';
  }

  const api = { CATEGORIES, DEFAULTS, FORM_SCHEMAS, withDefaults, fill, labelOf, optionsOf, isVisible, validateField };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) {
    root.CapacitaTE = root.CapacitaTE || {};
    root.CapacitaTE.formSchema = api;
  }
})(typeof window !== 'undefined' ? window : null);
