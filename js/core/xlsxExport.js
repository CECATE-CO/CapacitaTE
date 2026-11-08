/**
 * CapacitaTE - Exportação das respostas em .xlsx no formato das planilhas do Google Forms
 * Cabeçalhos copiados caractere por caractere das planilhas originais (input/ da 16ª CTE), para o
 * js/excelParser.js ler os arquivos exportados exatamente como lê os do Google. Usa o SheetJS local (window.XLSX).
 * Versão: v.4.4.6
 */

(function (root) {
  const SHEET = 'Respostas ao formulário 1';
  const SUCCESS_CASE = 'Prezado(a) Gestor(a), \n\nSe existe algum caso de sucesso da gestão do transporte escolar no seu município, gostaríamos conhecer mais um pouco ao respeito.\n\nPor favor, relate de forma sucinta o caso de sucesso no espaço a seguir:';
  const RATING_PREFIX = 'Avaliar de 1 a 5 (1 significa "ruim" e 5 significa "excelente")';

  const HEADERS = {
    inscricao: ['Carimbo de data/hora', 'Endereço de e-mail', 'Nome Completo:', 'Confirme o E-mail', 'CPF', 'Data de Nascimento',
      'Telefone (XX)XXXXX-XXXX', 'Município que representa:', 'Você faz parte do:', 'Que cargo você ocupa na gestão municipal?',
      SUCCESS_CASE, 'Que cargo você ocupa no CACS-FUNDEB?', 'Confirmação de veracidade dos dados'],
    presenca: ['Carimbo de data/hora', 'Nome Completo:', 'CPF:  XXX.XXX.XXX-XX', 'Telefone: (DD)XXXXX-XXXX', 'E-mail: xxxxxxx@xxxmail.com',
      'Você já está inscrito no Curso de Capacitação em Transporte Escolar?', 'Data de Nascimento', 'Telefone (XX)XXXXX-XXXX',
      'Município que representa:', 'Você faz parte do:', 'Que cargo você ocupa na gestão municipal?',
      SUCCESS_CASE.replace(/\n/g, '\r\n'), 'Que cargo você ocupa no CACS-FUNDEB?'],
    avaliacaoInicio: ['Carimbo de data/hora', 'Nome Completo:', 'CPF', 'e-mail', 'Telefone (XX)XXXXX-XXXX', 'Município que representa:', 'Você faz parte do:'],
    avaliacaoFim: ['Indique dois aspectos que você mais gostou na Formação:', 'Indique dois aspectos que poderiam ser melhorados na Formação (com detalhes);',
      'Instituição vinculada: ', 'Mencionar a  Instituição vinculada',
      'Sugestão de temas para futuras capacitações \n(Webinar, vídeos de Youtube, postagens de Instagram, etc.) ',
      'Como ficou sabendo da Capacitação?', 'Comentários e/ou Sugestões:']
  };

  const DEFAULT_RATING_ITEMS = [
    { key: 'inscricao', label: 'Inscrição' }, { key: 'divulgacao', label: 'Divulgação' }, { key: 'data', label: 'Data da Formação' },
    { key: 'horario', label: 'Horário da Formação' }, { key: 'local', label: 'Local da Formação' },
    { key: 'duracao', label: 'Duração da Formação' }, { key: 'geral', label: 'Como você avalia a Formação' }
  ];
  const TRUTH_DEFAULT = 'Declaro que revisei e confirmo a veracidade de todas as informações prestadas neste formulário.';

  const blank = (v) => (v === null || v === undefined ? '' : v);

  /**
   * Data/hora do envio como Date com o "horário de parede" de Brasília (é o que a planilha do Google mostra)
   */
  function stamp(iso) {
    if (!iso) return '';
    const p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date(iso)).forEach(x => { p[x.type] = x.value; });
    return new Date(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute), Number(p.second));
  }

  // Data pura (yyyy-mm-dd) → Date local à meia-noite
  function dateOnly(v) {
    const m = String(v || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : '';
  }

  const cpf = (v) => (v ? root.CapacitaTE.cpf.format(v) : '');
  const phone = (v) => (v ? root.CapacitaTE.formats.formatPhone(v) : '');
  const bySubmitted = (a, b) => String(a.submitted_at).localeCompare(String(b.submitted_at));

  // ---------- linhas de cada planilha ----------
  function registrationRows(regs, { includeCancelled = false, truthStatement = TRUTH_DEFAULT } = {}) {
    const header = HEADERS.inscricao.concat(includeCancelled ? ['Status'] : []);
    const rows = regs.filter(r => includeCancelled || r.status !== 'cancelada').slice().sort(bySubmitted).map(r => [
      stamp(r.submitted_at), blank(r.email), blank(r.full_name), blank(r.email), cpf(r.cpf), dateOnly(r.birth_date), phone(r.phone),
      blank(r.municipality), blank(r.category), blank(r.role_gestao), blank(r.success_case), blank(r.role_cacs),
      r.truth_confirmed ? truthStatement : ''
    ].concat(includeCancelled ? [r.status === 'cancelada' ? 'Cancelada' : 'Válida'] : []));
    return [header, ...rows];
  }

  /**
   * Presença: as colunas G–M ficam vazias para quem já era inscrito (como no formulário original).
   * fillFromRegistration preenche essas colunas com os dados da inscrição (desligado por padrão).
   */
  function attendanceRows(atts, { extraColumns = false, fillFromRegistration = false, registrations = [] } = {}) {
    const regByCpf = new Map(registrations.map(r => [r.cpf, r]));
    const header = HEADERS.presenca.concat(extraColumns ? ['Dia', 'Registro manual'] : []);
    const rows = atts.slice().sort(bySubmitted).map(a => {
      const src = !a.was_registered ? a : (fillFromRegistration ? (regByCpf.get(a.cpf) || null) : null);
      const block = src ? [
        dateOnly(src.birth_date), phone(src === a ? (a.phone2 || a.phone) : src.phone), blank(src.municipality), blank(src.category),
        blank(src.role_gestao), blank(src.success_case), blank(src.role_cacs)
      ] : ['', '', '', '', '', '', ''];
      return [stamp(a.submitted_at), blank(a.full_name), cpf(a.cpf), phone(a.phone), blank(a.email), a.was_registered ? 'Sim' : 'Não', ...block]
        .concat(extraColumns ? [/^\d{4}-\d{2}-\d{2}$/.test(a.session_key) ? dateOnly(a.session_key) : a.session_key, a.answers && a.answers.manual ? 'Sim' : 'Não'] : []);
    });
    return [header, ...rows];
  }

  function evaluationRows(evals, { ratingItems = DEFAULT_RATING_ITEMS } = {}) {
    const items = ratingItems && ratingItems.length ? ratingItems : DEFAULT_RATING_ITEMS;
    const header = HEADERS.avaliacaoInicio.concat(items.map(it => `${RATING_PREFIX} [${it.label}]`), HEADERS.avaliacaoFim);
    const rows = evals.slice().sort(bySubmitted).map(e => [
      stamp(e.submitted_at), blank(e.full_name), cpf(e.cpf), blank(e.email), phone(e.phone), blank(e.municipality), blank(e.category),
      ...items.map(it => { const v = Number(e.ratings && e.ratings[it.key]); return v >= 1 && v <= 5 ? v : ''; }),
      blank(e.liked), blank(e.improve), blank(e.institution_type), blank(e.institution_name), blank(e.topics_suggestion),
      Array.isArray(e.heard_from) ? e.heard_from.join(', ') : blank(e.heard_from), blank(e.comments)
    ]);
    return [header, ...rows];
  }

  // ---------- planilha ----------
  /**
   * Número de série do Excel a partir do dia/hora "de parede" (sem conversão de fuso). O SheetJS converte Date usando
   * o fuso de uma data de referência, o que desloca em 1 h datas de épocas com horário de verão (ex.: 19/02/2006 viraria
   * 18/02/2006 22:59). As planilhas do Google guardam o valor de parede; aqui fazemos o mesmo.
   */
  function excelSerial(d) {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
    return (utc - Date.UTC(1899, 11, 30)) / 86400000;
  }

  function sheetFromRows(aoa, { dateTimeCols = [0], dateCols = [] } = {}) {
    const XLSX = root.XLSX;
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let r = 1; r <= range.e.r; r++) {
      for (let c = 0; c <= range.e.c; c++) {
        const value = aoa[r] && aoa[r][c];
        if (!(value instanceof Date)) continue;
        const fmt = dateCols.includes(c) ? 'dd/mm/yyyy' : 'dd/mm/yyyy hh:mm:ss';
        ws[XLSX.utils.encode_cell({ r, c })] = { t: 'n', v: excelSerial(value), z: fmt };
      }
    }
    ws['!cols'] = aoa[0].map((h, i) => ({ wch: Math.min(48, Math.max(12, ...aoa.slice(0, 200).map(row => String(row[i] instanceof Date ? '00/00/0000 00:00:00' : (row[i] ?? '')).split('\n')[0].length + 2))) }));
    ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: range.e.r, c: range.e.c } }) };
    ws['!freeze'] = { xSplit: 0, ySplit: 1 };
    ws['!views'] = [{ state: 'frozen', ySplit: 1, topLeftCell: 'A2' }];
    return ws;
  }

  /**
   * Aba "Inscritos" igual à original: Município | Inscritos | CACS-FUNDEB | Gestão municipal | (vazio) | Registro,
   * com as mesmas fórmulas COUNTIF/COUNTIFS e o valor já calculado (o arquivo mostra os números sem recalcular).
   */
  function inscritosSheet(regRows, municipalities) {
    const XLSX = root.XLSX;
    const last = Math.max(2, regRows.length);
    const ref = `'${SHEET}'!$H$2:$H$${last}`;
    const refCat = `'${SHEET}'!$I$2:$I$${last}`;
    const data = regRows.slice(1);
    const count = (m, cat) => data.filter(r => r[7] === m && (!cat || r[8] === cat)).length;
    const ws = XLSX.utils.aoa_to_sheet([['Município', 'Inscritos', 'CACS-FUNDEB', 'Gestão municipal', '', 'Registro']]);
    municipalities.forEach((m, i) => {
      const row = i + 2;
      ws[`A${row}`] = { t: 's', v: m };
      ws[`B${row}`] = { t: 'n', v: count(m), f: `COUNTIF(${ref},A${row})` };
      ws[`C${row}`] = { t: 'n', v: count(m, 'CACS-FUNDEB'), f: `COUNTIFS(${ref},$A${row},${refCat},C$1)` };
      ws[`D${row}`] = { t: 'n', v: count(m, 'Gestão municipal'), f: `COUNTIFS(${ref},$A${row},${refCat},D$1)` };
    });
    const totalRow = municipalities.length + 2;
    const sum = (col) => ({ t: 'n', v: municipalities.reduce((acc, m, i) => acc + (ws[`${col}${i + 2}`] ? ws[`${col}${i + 2}`].v : 0), 0), f: `SUM(${col}2:${col}${totalRow - 1})` });
    ws[`A${totalRow}`] = { t: 's', v: 'Total' };
    ws[`B${totalRow}`] = sum('B');
    ws[`C${totalRow}`] = sum('C');
    ws[`D${totalRow}`] = sum('D');
    ws['!ref'] = `A1:F${totalRow}`;
    ws['!cols'] = [{ wch: 34 }, { wch: 11 }, { wch: 14 }, { wch: 18 }, { wch: 4 }, { wch: 12 }];
    return ws;
  }

  function workbook(module, aoa, { municipalities = [] } = {}) {
    const XLSX = root.XLSX;
    const wb = XLSX.utils.book_new();
    const opts = module === 'inscricao' ? { dateTimeCols: [0], dateCols: [5] }
      : module === 'presenca' ? { dateTimeCols: [0], dateCols: [6, 13] } : { dateTimeCols: [0] };
    XLSX.utils.book_append_sheet(wb, sheetFromRows(aoa, opts), SHEET);
    if (module === 'inscricao') XLSX.utils.book_append_sheet(wb, inscritosSheet(aoa, municipalities), 'Inscritos');
    return wb;
  }

  // Nome igual ao da pasta input/: "16CTE - Formulario de inscrição (respostas).xlsx"
  function fileName(module, trainingNumber) {
    const prefix = trainingNumber ? `${trainingNumber}CTE - ` : '';
    return prefix + { inscricao: 'Formulario de inscrição (respostas).xlsx', presenca: 'Lista de presença (respostas).xlsx', avaliacao: 'Avaliação (respostas).xlsx' }[module];
  }

  function download(wb, name) {
    root.XLSX.writeFile(wb, name, { compression: true });
  }

  // Presença: completa nascimento, telefone, município, categoria e cargos de quem já era inscrito (ou está no cadastro de pessoas)
  async function attendanceRowsComplete(client, atts, trainingId) {
    const [regs, people] = await Promise.all([
      client.from('registrations').select('*').eq('training_id', trainingId).eq('status', 'valida'),
      client.from('people').select('*').in('cpf', [...new Set(atts.map(a => a.cpf))].slice(0, 1000))
    ]);
    if (regs.error) throw regs.error;
    const byCpf = new Map(((people && people.data) || []).map(p => [p.cpf, p]));
    (regs.data || []).forEach(r => byCpf.set(r.cpf, Object.assign({}, byCpf.get(r.cpf) || {}, Object.fromEntries(Object.entries(r).filter(([, v]) => v !== null && v !== '')))));
    return attendanceRows(atts, { fillFromRegistration: true, registrations: [...byCpf.values()] });
  }

  // Busca as respostas de um módulo no Supabase e monta as linhas no formato da exportação (seção 12).
  // É o que o Relatório usa em "Usar dados do CapacitaTE": as linhas vão para o mesmo parser do upload de arquivo.
  async function fetchRows(client, mod, trainingId) {
    const { data: forms, error: fErr } = await client.from('forms').select('*').eq('training_id', trainingId).eq('module_key', mod);
    if (fErr) throw fErr;
    const form = (forms || []).find(f => f.session_key === 'unico') || (forms || [])[0];
    const table = { inscricao: 'registrations', presenca: 'attendance', avaliacao: 'evaluations' }[mod];
    const { data, error } = await client.from(table).select('*').eq('training_id', trainingId);
    if (error) throw error;
    if (mod === 'inscricao') return registrationRows(data || [], { truthStatement: (form && form.config && form.config.truthStatement) || undefined });
    if (mod === 'presenca') return attendanceRowsComplete(client, data || [], trainingId);
    return evaluationRows(data || [], { ratingItems: form && form.config && form.config.ratingItems });
  }

  const api = { SHEET, HEADERS, registrationRows, attendanceRows, attendanceRowsComplete, evaluationRows, fetchRows, workbook, fileName, download, stamp };
  root.CapacitaTE = root.CapacitaTE || {};
  root.CapacitaTE.xlsxExport = api;
})(window);
