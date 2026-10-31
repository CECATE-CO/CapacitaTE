/**
 * CapacitaTE - Processador e Analisador de Planilhas Excel
 * Versão: v.4.3.9
 */

class ExcelParser {
  constructor() {
    this.ibgeLookup = new Map();
    this.initIbgeLookup();
  }

  initIbgeLookup() {
    if (window.IBGE_DATA && Array.isArray(window.IBGE_DATA)) {
      window.IBGE_DATA.forEach(item => {
        // Mapear por código
        this.ibgeLookup.set(String(item.c), item);
        // Mapear por nome normalizado + UF
        const normKey = `${this.normalizeStr(item.n)}_${item.u.toUpperCase()}`;
        this.ibgeLookup.set(normKey, item);
        // Mapear só por nome
        const nameOnlyKey = this.normalizeStr(item.n);
        if (!this.ibgeLookup.has(nameOnlyKey)) {
          this.ibgeLookup.set(nameOnlyKey, item);
        }
      });
    }
  }

  normalizeStr(str) {
    if (!str || typeof str !== 'string') return '';
    return str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .trim();
  }

  formatCpf(cpf) {
    if (!cpf) return '';
    let digits = String(cpf).replace(/\D/g, '');
    if (digits.length > 0 && digits.length < 11) {
      digits = digits.padStart(11, '0');
    }
    if (digits.length === 11) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }
    return String(cpf).trim();
  }

  /**
   * Lê um arquivo Excel (File / Blob / ArrayBuffer) e retorna as planilhas e linhas
   */
  async readWorkbook(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          const sheets = {};
          workbook.SheetNames.forEach(name => {
            const worksheet = workbook.Sheets[name];
            sheets[name] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
          });
          resolve({ workbook, sheets, sheetNames: workbook.SheetNames });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Identifica colunas da Lista de Presença via sinonímia inteligente
   */
  mapAttendanceColumns(headerRow = []) {
    const mapping = {
      timestamp: -1,
      name: -1,
      cpf: -1,
      phone: -1,
      email: -1,
      isEnrolled: -1,
      birthDate: -1,
      municipality: -1,
      representation: -1,
      roleGestao: -1,
      roleCACS: -1,
      successCase: -1
    };

    headerRow.forEach((colName, idx) => {
      if (!colName) return;
      const clean = this.normalizeStr(String(colName));

      if (clean.includes('carimbo') || clean.includes('timestamp') || clean.includes('datahora')) {
        mapping.timestamp = idx;
      } else if ((clean.includes('nomecompleto') || clean === 'nome' || clean.includes('nome')) &&
                 !clean.includes('municipio') && !clean.includes('cidade') && !clean.includes('polo') && !clean.includes('instituicao')) {
        // "Nome do município..." pertence à coluna de município (tratada abaixo), não ao nome do participante
        if (mapping.name === -1) mapping.name = idx;
      } else if (clean.includes('cpf')) {
        mapping.cpf = idx;
      } else if (clean.includes('telefone') || clean.includes('celular') || clean.includes('contato')) {
        if (mapping.phone === -1) mapping.phone = idx;
      } else if (clean.includes('email') || clean.includes('correioeletronico')) {
        if (mapping.email === -1) mapping.email = idx;
      } else if (clean.includes('jainscrito') || clean.includes('estainscrito') || clean.includes('inscricao')) {
        mapping.isEnrolled = idx;
      } else if (clean.includes('datanascimento') || clean.includes('nascimento')) {
        mapping.birthDate = idx;
      } else if (clean.includes('municipioquerepresenta') || clean.includes('municipio') || clean.includes('cidade') || clean.includes('polo')) {
        if (mapping.municipality === -1 || clean.includes('municipioquerepresenta')) mapping.municipality = idx;
      } else if (clean.includes('vocefazpartedo') || clean.includes('fazpartedo') || clean.includes('vocefazparte') || clean.includes('vinculo') || clean.includes('representacao') || clean.includes('segmento') || clean.includes('publicoalvo')) {
        if (mapping.representation === -1 || clean.includes('vocefazpartedo') || clean.includes('fazpartedo') || clean.includes('vocefazparte')) mapping.representation = idx;
      } else if (clean.includes('cargona') && clean.includes('gestao') || clean.includes('gestaomunicipal')) {
        mapping.roleGestao = idx;
      } else if (clean.includes('cargono') && clean.includes('cacs') || clean.includes('cacsfundeb')) {
        mapping.roleCACS = idx;
      } else if (clean.includes('casodesucesso') || clean.includes('relato')) {
        mapping.successCase = idx;
      }
    });

    return mapping;
  }

  /**
   * Processa linhas da Lista de Presença gerando objetos normalizados
   */
  parseAttendanceRows(rows = [], mapping = null, trainingUf = 'MT') {
    if (!rows || rows.length < 2) return [];
    if (!this.ibgeLookup.size) this.initIbgeLookup();

    const headers = rows[0];
    const colMap = mapping || this.mapAttendanceColumns(headers);
    const results = [];
    const seenCpfs = new Set();

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0 || !row.some(c => c !== null && c !== '')) continue;

      const rawName = colMap.name !== -1 ? row[colMap.name] : '';
      const rawCpf = colMap.cpf !== -1 ? row[colMap.cpf] : '';
      if (!rawName && !rawCpf) continue;

      const formattedCpf = this.formatCpf(rawCpf);
      const name = String(rawName || '').trim();
      const email = colMap.email !== -1 && row[colMap.email] ? String(row[colMap.email]).trim() : '';
      const phone = colMap.phone !== -1 && row[colMap.phone] ? String(row[colMap.phone]).trim() : '';
      // Células de data chegam como Date (leitura com cellDates); formata no padrão brasileiro
      const rawBirth = colMap.birthDate !== -1 ? row[colMap.birthDate] : '';
      const birthDate = rawBirth instanceof Date
        ? (isNaN(rawBirth.getTime()) ? '' : rawBirth.toLocaleDateString('pt-BR', { timeZone: 'UTC' }))
        : (rawBirth ? String(rawBirth).trim() : '');

      // Município & Código IBGE
      let rawMun = colMap.municipality !== -1 && row[colMap.municipality] ? String(row[colMap.municipality]).trim() : '';
      let ibgeCode = '';
      let matchedMunName = rawMun;

      if (rawMun) {
        // Remover sufixos como (MT), (GO)
        const munClean = rawMun.replace(/\([A-Z]{2}\)/g, '').trim();
        const lookupKey = `${this.normalizeStr(munClean)}_${trainingUf.toUpperCase()}`;
        let ibgeInfo = this.ibgeLookup.get(lookupKey) || this.ibgeLookup.get(this.normalizeStr(munClean));

        if (ibgeInfo) {
          ibgeCode = ibgeInfo.c;
          matchedMunName = ibgeInfo.n;
        }
      }

      // Validar se é realmente um nome de município (descartar declarações de formulário)
      const munLower = (matchedMunName || '').toLowerCase();
      if (munLower.includes('declaro') || munLower.includes('veracidade') || munLower.includes('confirmo') || munLower.includes('prestadas') || munLower.includes('formulario') || munLower.includes('termo') || matchedMunName.length > 45) {
        matchedMunName = '';
        ibgeCode = '';
      }

      // Representação (Vínculo)
      const rawRep = colMap.representation !== -1 && row[colMap.representation] ? String(row[colMap.representation]).trim() : '';
      let representation = '';
      if (rawRep.toUpperCase().includes('CACS') || rawRep.toUpperCase().includes('FUNDEB') || rawRep.toUpperCase().includes('CONSELHO')) {
        representation = 'CACS-FUNDEB';
      } else if (rawRep.toUpperCase().includes('GESTAO') || rawRep.toUpperCase().includes('GESTÃO') || rawRep.toUpperCase().includes('MUNICIPAL')) {
        representation = 'Gestão municipal';
      }

      const roleGestao = colMap.roleGestao !== -1 && row[colMap.roleGestao] ? String(row[colMap.roleGestao]).trim() : '';
      const roleCACS = colMap.roleCACS !== -1 && row[colMap.roleCACS] ? String(row[colMap.roleCACS]).trim() : '';
      const successCase = colMap.successCase !== -1 && row[colMap.successCase] ? String(row[colMap.successCase]).trim() : '';

      const isEnrolled = colMap.isEnrolled !== -1 && row[colMap.isEnrolled]
        ? !String(row[colMap.isEnrolled]).toLowerCase().includes('não')
        : true;

      const isDuplicate = formattedCpf && seenCpfs.has(formattedCpf);
      if (formattedCpf) seenCpfs.add(formattedCpf);

      results.push({
        id: `att_parsed_${Date.now()}_${r}`,
        name,
        cpf: formattedCpf,
        email,
        phone,
        birthDate,
        municipality: matchedMunName,
        ibgeCode,
        representation,
        roleGestao,
        roleCACS,
        successCase,
        isEnrolled,
        isPresent: true,
        isDuplicate,
        source: 'excel'
      });
    }

    return results;
  }

  /**
   * Processa linhas da Planilha de Inscrição (Google Forms / Excel) gerando objetos normalizados
   */
  parseRegistrationRows(rows = [], mapping = null, trainingUf = 'MT') {
    const list = this.parseAttendanceRows(rows, mapping, trainingUf);
    return list.map(item => ({
      ...item,
      id: item.id.replace('att_parsed_', 'reg_parsed_'),
      isRegistered: true,
      isPresent: false
    }));
  }

  /**
   * Identifica colunas da Planilha de Avaliação
   */
  /**
   * Identifica colunas da Planilha de Avaliação
   */
  mapEvaluationColumns(headerRow = [], sampleRows = []) {
    const mapping = {
      timestamp: -1,
      name: -1,
      cpf: -1,
      email: -1,
      phone: -1,
      municipality: -1,
      representation: -1,
      ratings: [], // 7 perguntas de 1 a 5
      likedAspects: -1,
      improveAspects: -1,
      institution: -1,
      suggestions: -1,
      howFound: -1,
      comments: -1
    };

    if (!headerRow || headerRow.length === 0) return mapping;

    headerRow.forEach((colName, idx) => {
      if (!colName) return;
      const clean = this.normalizeStr(String(colName));

      if (clean.includes('carimbo') || clean.includes('timestamp')) {
        mapping.timestamp = idx;
      } else if (clean.includes('nomecompleto') || clean === 'nome') {
        mapping.name = idx;
      } else if (clean.includes('cpf')) {
        mapping.cpf = idx;
      } else if (clean.includes('email')) {
        mapping.email = idx;
      } else if (clean.includes('telefone') || clean.includes('celular')) {
        mapping.phone = idx;
      } else if (clean.includes('municipio') || clean.includes('cidade')) {
        mapping.municipality = idx;
      } else if (clean.includes('fazpartedo') || clean.includes('representacao') || clean.includes('vocefazpartedo')) {
        mapping.representation = idx;
      } else if (clean.includes('maisgostou') || clean.includes('aspectospositivos')) {
        mapping.likedAspects = idx;
      } else if (clean.includes('melhorados') || clean.includes('melhorar') || clean.includes('aspectosamelhorar')) {
        mapping.improveAspects = idx;
      } else if (clean.includes('instituicaovinculada') || clean.includes('orgao')) {
        mapping.institution = idx;
      } else if (clean.includes('sugestaodetemas') || clean.includes('temasparafuturas')) {
        mapping.suggestions = idx;
      } else if (clean.includes('comoficousabendo') || (clean.includes('divulgacao') && !clean.includes('avaliar'))) {
        mapping.howFound = idx;
      } else if (clean.includes('comentarios') || clean.includes('sugestoes')) {
        mapping.comments = idx;
      }
    });

    // Mapeamento preciso das 7 colunas de perguntas de Avaliação (Escala 1 a 5)
    const criteriaKeywords = [
      ['inscricao'],
      ['divulgacao'],
      ['data'],
      ['horario'],
      ['local'],
      ['duracao'],
      ['comovoceavali', 'avaliacaogeral', 'avaliacao']
    ];

    const mappedOrdered = [null, null, null, null, null, null, null];
    const unmappedRatingCols = [];

    headerRow.forEach((colName, idx) => {
      if (!colName) return;
      const rawStr = String(colName);
      const clean = this.normalizeStr(rawStr);

      const isRatingHeader = clean.includes('avaliarde1a5') ||
                             clean.includes('1significagruim') ||
                             clean.includes('ruim') ||
                             clean.includes('excelente') ||
                             clean.includes('comovoceavali');

      if (isRatingHeader) {
        let placed = false;
        for (let cIdx = 0; cIdx < criteriaKeywords.length; cIdx++) {
          if (mappedOrdered[cIdx] !== null) continue;
          const kws = criteriaKeywords[cIdx];
          if (kws.some(kw => clean.includes(kw) || rawStr.toLowerCase().includes(kw))) {
            mappedOrdered[cIdx] = { index: idx, label: colName };
            placed = true;
            break;
          }
        }
        if (!placed) {
          unmappedRatingCols.push({ index: idx, label: colName });
        }
      }
    });

    // Preencher slots nulos com colunas não mapeadas na ordem que apareceram
    for (let i = 0; i < 7; i++) {
      if (mappedOrdered[i] === null && unmappedRatingCols.length > 0) {
        mappedOrdered[i] = unmappedRatingCols.shift();
      }
    }

    // Se ainda não temos 7, buscar por amostragem de dados
    if (mappedOrdered.some(slot => slot === null) && sampleRows && sampleRows.length > 0) {
      for (let colIdx = 0; colIdx < headerRow.length; colIdx++) {
        if (mappedOrdered.some(slot => slot && slot.index === colIdx)) continue;
        
        let isNumericRating = true;
        let validCount = 0;

        for (let r = 0; r < Math.min(15, sampleRows.length); r++) {
          const valStr = String(sampleRows[r]?.[colIdx] || '').trim();
          if (!valStr) continue;
          const num = parseFloat(valStr.match(/^([1-5])/)?.[1] || valStr);
          if (!isNaN(num) && num >= 1 && num <= 5) validCount++;
          else { isNumericRating = false; break; }
        }

        if (isNumericRating && validCount > 0) {
          const emptySlotIdx = mappedOrdered.findIndex(slot => slot === null);
          if (emptySlotIdx !== -1) {
            mappedOrdered[emptySlotIdx] = { index: colIdx, label: headerRow[colIdx] || `Pergunta ${colIdx + 1}` };
          }
        }
      }
    }

    mapping.ratings = mappedOrdered.filter(Boolean);
    return mapping;
  }

  /**
   * Processa linhas da Planilha de Avaliação gerando registros estruturados
   */
  parseEvaluationRows(rows = [], mapping = null, trainingUf = 'MT') {
    if (!rows || rows.length < 2) return [];
    if (!this.ibgeLookup.size) this.initIbgeLookup();

    const headers = rows[0];
    const sampleRows = rows.slice(1, 20);
    const colMap = mapping || this.mapEvaluationColumns(headers, sampleRows);
    const results = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0 || !row.some(c => c !== null && c !== '')) continue;

      const name = colMap.name !== -1 && row[colMap.name] ? String(row[colMap.name]).trim() : `Participante ${r}`;
      const cpf = colMap.cpf !== -1 ? this.formatCpf(row[colMap.cpf]) : '';
      const email = colMap.email !== -1 && row[colMap.email] ? String(row[colMap.email]).trim() : '';
      const phone = colMap.phone !== -1 && row[colMap.phone] ? String(row[colMap.phone]).trim() : '';

      // Município
      let rawMun = colMap.municipality !== -1 && row[colMap.municipality] ? String(row[colMap.municipality]).trim() : '';
      let ibgeCode = '';
      let matchedMunName = rawMun;

      if (rawMun) {
        const munClean = rawMun.replace(/\([A-Z]{2}\)/g, '').trim();
        const lookupKey = `${this.normalizeStr(munClean)}_${trainingUf.toUpperCase()}`;
        let ibgeInfo = this.ibgeLookup.get(lookupKey) || this.ibgeLookup.get(this.normalizeStr(munClean));
        if (ibgeInfo) {
          ibgeCode = ibgeInfo.c;
          matchedMunName = ibgeInfo.n;
        }
      }

      // Representação
      const rawRep = colMap.representation !== -1 && row[colMap.representation] ? String(row[colMap.representation]).trim() : '';
      let representation = 'Gestão municipal';
      if (rawRep.toUpperCase().includes('CACS') || rawRep.toUpperCase().includes('FUNDEB') || rawRep.toUpperCase().includes('CONSELHO')) {
        representation = 'CACS-FUNDEB';
      }

      // Extrair Notas de 1 a 5 (até 7 perguntas)
      const extractRating = (cellVal) => {
        if (cellVal === null || cellVal === undefined || cellVal === '') return null;
        const str = String(cellVal).trim();
        const match = str.match(/^([1-5])/);
        if (match) return parseInt(match[1], 10);
        const num = parseFloat(str);
        if (!isNaN(num) && num >= 1 && num <= 5) return Math.round(num);
        return null;
      };

      const ratings = [];
      if (colMap.ratings && colMap.ratings.length > 0) {
        colMap.ratings.forEach(ratingItem => {
          const parsed = extractRating(row[ratingItem.index]);
          // Nota em branco ou inválida fica nula e é ignorada nas médias e percentuais
          ratings.push(parsed);
        });
      }

      const likedAspects = colMap.likedAspects !== -1 && row[colMap.likedAspects] ? String(row[colMap.likedAspects]).trim() : '';
      const improveAspects = colMap.improveAspects !== -1 && row[colMap.improveAspects] ? String(row[colMap.improveAspects]).trim() : '';
      const institution = colMap.institution !== -1 && row[colMap.institution] ? String(row[colMap.institution]).trim() : '';
      const suggestions = colMap.suggestions !== -1 && row[colMap.suggestions] ? String(row[colMap.suggestions]).trim() : '';
      const howFound = colMap.howFound !== -1 && row[colMap.howFound] ? String(row[colMap.howFound]).trim() : '';
      const comments = colMap.comments !== -1 && row[colMap.comments] ? String(row[colMap.comments]).trim() : '';

      results.push({
        id: `eval_parsed_${Date.now()}_${r}`,
        name,
        cpf,
        email,
        phone,
        municipality: matchedMunName,
        ibgeCode,
        representation,
        ratings,
        likedAspects,
        improveAspects,
        institution,
        suggestions,
        howFound,
        comments
      });
    }

    return results;
  }

  /**
   * Parser inteligente de planilha em lote de municípios (.xlsx, .xls, .csv)
   * Valida colunas [Código IBGE, Nome do Município, UF], checa duplicidades,
   * identifica municípios novos vs já cadastrados vs atualizações, e calcula distâncias geodésicas.
   */
  async parseMunicipalitiesSpreadsheet(file, currentPoloName = '', currentPoloUf = '', existingMunicipalities = []) {
    const { sheets, sheetNames } = await this.readWorkbook(file);
    if (!sheetNames || sheetNames.length === 0) {
      throw new Error('O arquivo de planilha está vazio ou não possui abas válidas.');
    }

    const firstSheetName = sheetNames[0];
    const rows = sheets[firstSheetName];
    if (!rows || rows.length < 2) {
      throw new Error('A planilha deve conter uma linha de cabeçalho e pelo menos uma linha de dados.');
    }

    // 1. Identificar cabeçalho
    let headerRowIdx = 0;
    let colIbge = -1;
    let colName = -1;
    let colUf = -1;

    for (let i = 0; i < Math.min(rows.length, 10); i++) {
      const row = rows[i] || [];
      row.forEach((cell, idx) => {
        const clean = this.normalizeStr(String(cell || ''));
        if (clean.includes('ibge') || clean.includes('codigo') || clean === 'cod' || clean === 'codibge') {
          colIbge = idx;
        } else if (clean.includes('municipio') || clean.includes('cidade') || clean === 'nome' || clean === 'nomedomunicipio') {
          colName = idx;
        } else if (clean === 'uf' || clean === 'estado' || clean === 'sigla' || clean === 'siglauf') {
          colUf = idx;
        }
      });
      if (colIbge !== -1 || colName !== -1) {
        headerRowIdx = i;
        break;
      }
    }

    if (colIbge === -1) colIbge = 0;
    if (colName === -1) colName = 1;
    if (colUf === -1) colUf = 2;

    const validUfs = new Set(['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']);

    const validRows = [];
    const invalidRows = [];
    const seenIbgesInFile = new Map();

    const existingMap = new Map();
    existingMunicipalities.forEach(m => {
      if (m.ibgeCode) existingMap.set(String(m.ibgeCode).trim(), m);
      if (m.name && m.uf) {
        existingMap.set(`${this.normalizeStr(m.name)}_${m.uf.toUpperCase()}`, m);
      }
    });

    // Mesma normalização usada na comparação com o nome da linha (normalizeStr), senão polos com nome composto não casam
    const normPolo = this.normalizeStr(currentPoloName);
    const uPolo = (currentPoloUf || 'GO').toUpperCase();

    // 2. Processar linhas
    for (let r = headerRowIdx + 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0) continue;

      const rawIbge = row[colIbge] !== undefined && row[colIbge] !== null ? String(row[colIbge]).trim() : '';
      const rawName = row[colName] !== undefined && row[colName] !== null ? String(row[colName]).trim() : '';
      const rawUf = row[colUf] !== undefined && row[colUf] !== null ? String(row[colUf]).trim().toUpperCase() : '';

      // Pula linha totalmente vazia
      if (!rawIbge && !rawName && !rawUf) continue;

      const lineNum = r + 1;
      const cleanIbge = rawIbge.replace(/\D/g, '');

      let matchedIbgeObj = null;
      if (cleanIbge) {
        matchedIbgeObj = this.ibgeLookup.get(cleanIbge);
      }
      if (!matchedIbgeObj && rawName) {
        const searchKey = rawUf ? `${this.normalizeStr(rawName)}_${rawUf}` : this.normalizeStr(rawName);
        matchedIbgeObj = this.ibgeLookup.get(searchKey);
      }

      const finalIbge = cleanIbge || (matchedIbgeObj ? String(matchedIbgeObj.c) : '');
      const finalName = rawName || (matchedIbgeObj ? matchedIbgeObj.n : '');
      const finalUf = rawUf || (matchedIbgeObj ? matchedIbgeObj.u : '');

      // Validação de erros
      const errors = [];
      if (!finalIbge || finalIbge.length < 6 || finalIbge.length > 7) {
        errors.push(`Código IBGE inválido ("${rawIbge || 'vazio'}"). Deve conter 7 dígitos.`);
      }
      if (!finalName) {
        errors.push('Nome do município não preenchido.');
      }
      if (!finalUf || !validUfs.has(finalUf)) {
        errors.push(`UF não reconhecida ("${rawUf || 'vazia'}").`);
      }

      // Checar duplicidade dentro da planilha
      if (finalIbge && seenIbgesInFile.has(finalIbge)) {
        errors.push(`Código IBGE ${finalIbge} duplicado na planilha (linhas ${seenIbgesInFile.get(finalIbge)} e ${lineNum}).`);
      } else if (finalIbge) {
        seenIbgesInFile.set(finalIbge, lineNum);
      }

      if (errors.length > 0) {
        invalidRows.push({
          lineNum,
          rawIbge,
          rawName,
          rawUf,
          errors
        });
        continue;
      }

      // 3. Checar status contra o banco de dados / capacitação atual
      let status = 'new';
      let diffText = '';
      const existing = existingMap.get(finalIbge) || existingMap.get(`${this.normalizeStr(finalName)}_${finalUf}`);

      let calculatedDistance = 0.0;
      const isSede = (this.normalizeStr(finalName) === normPolo && finalUf === uPolo) || (cleanIbge && existing && existing.isSede);

      if (isSede) {
        calculatedDistance = 0.0;
      } else if (existing && existing.distanceKm !== undefined && parseFloat(existing.distanceKm) > 0) {
        calculatedDistance = parseFloat(existing.distanceKm);
      } else if (window.convocacaoParser) {
        calculatedDistance = window.convocacaoParser.calculateDistanceToPolo(finalName, finalUf, currentPoloName, currentPoloUf);
      }

      if (existing) {
        const nameChanged = this.normalizeStr(existing.name) !== this.normalizeStr(finalName);
        const ufChanged = (existing.uf || '').toUpperCase() !== finalUf;

        if (nameChanged || ufChanged) {
          status = 'update';
          const diffs = [];
          if (nameChanged) diffs.push(`Nome: ${existing.name} → ${finalName}`);
          if (ufChanged) diffs.push(`UF: ${existing.uf} → ${finalUf}`);
          diffText = diffs.join('; ');
        } else {
          status = 'already_exists';
        }
      }

      validRows.push({
        lineNum,
        ibgeCode: finalIbge,
        name: finalName,
        uf: finalUf,
        distanceKm: calculatedDistance,
        isSede,
        status,
        diffText,
        selected: status !== 'already_exists',
        existingId: existing ? existing.id : null
      });
    }

    return {
      totalRows: rows.length - (headerRowIdx + 1),
      validRows,
      invalidRows,
      stats: {
        total: validRows.length + invalidRows.length,
        newCount: validRows.filter(r => r.status === 'new').length,
        alreadyExistsCount: validRows.filter(r => r.status === 'already_exists').length,
        updateCount: validRows.filter(r => r.status === 'update').length,
        errorCount: invalidRows.length,
        selectedCount: validRows.filter(r => r.selected).length
      }
    };
  }
}

window.excelParser = new ExcelParser();

