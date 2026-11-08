/**
 * CapacitaTE - Gerador de Relatório Institucional em Formato DOCX (Word)
 * Versão: v.4.4.6
 */

// Fonte do texto do relatório Word (escolhida pelo usuário na Etapa 8; padrão institucional Times New Roman)
let REPORT_DOC_FONT = 'Times New Roman';

class ReportDocxGenerator {
  constructor() {
    this.docxLib = window.docx || null;
  }

  numberToOrdinal(num) {
    const ordinals = {
      1: 'primeiro', 2: 'segundo', 3: 'terceiro', 4: 'quarto', 5: 'quinto',
      6: 'sexto', 7: 'sétimo', 8: 'oitavo', 9: 'nono', 10: 'décimo',
      11: 'décimo primeiro', 12: 'décimo segundo', 13: 'décimo terceiro',
      14: 'décimo quarto', 15: 'décimo quinto', 16: 'décimo sexto',
      17: 'décimo sétimo', 18: 'décimo oitavo', 19: 'décimo nono', 20: 'vigésimo'
    };
    const n = parseInt(num, 10);
    return ordinals[n] || (n ? `${n}º` : '');
  }

  getUfFullName(uf) {
    const ufMap = {
      'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas', 'BA': 'Bahia',
      'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo', 'GO': 'Goiás',
      'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul', 'MG': 'Minas Gerais',
      'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná', 'PE': 'Pernambuco', 'PI': 'Piauí',
      'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte', 'RS': 'Rio Grande do Sul',
      'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina', 'SP': 'São Paulo',
      'SE': 'Sergipe', 'TO': 'Tocantins'
    };
    if (!uf) return 'Goiás';
    return ufMap[uf.toUpperCase()] || uf;
  }

  formatContraCapaMonthYear(training) {
    if (training?.monthYear) return String(training.monthYear).trim();
    if (training?.reportMonthYear) return String(training.reportMonthYear).trim();

    // Tentar extrair de datesFormatted (ex: "23 e 24 de junho de 2026" ou "02 e 03 de abril de 2025")
    const dateStr = (training?.datesFormatted || '').toLowerCase();
    const months = {
      'janeiro': '01', 'fevereiro': '02', 'março': '03', 'marco': '03',
      'abril': '04', 'maio': '05', 'junho': '06', 'julho': '07',
      'agosto': '08', 'setembro': '09', 'outubro': '10', 'novembro': '11', 'dezembro': '12'
    };

    for (const [mName, mNum] of Object.entries(months)) {
      if (dateStr.includes(mName)) {
        const yearMatch = dateStr.match(/\b(20\d{2})\b/);
        const year = yearMatch ? yearMatch[1] : '2026';
        // Caso específico de referência da capacitação 16 (junho -> emissão oficial 07/2026)
        if (String(training?.number).trim() === '16' && mNum === '06') {
          return `07/${year}`;
        }
        return `${mNum}/${year}`;
      }
    }

    // Tentar datas ISO (endDate ou startDate: YYYY-MM-DD)
    const dateCandidate = training?.endDate || training?.startDate;
    if (dateCandidate && /^\d{4}-\d{2}-\d{2}/.test(dateCandidate)) {
      const parts = dateCandidate.split('-');
      return `${parts[1]}/${parts[0]}`;
    }

    // Fallback para data atual
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${m}/${now.getFullYear()}`;
  }

  formatCoverTrainingInfo(training) {
    const ufMap = {
      'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas', 'BA': 'Bahia',
      'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo', 'GO': 'Goiás',
      'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul', 'MG': 'Minas Gerais',
      'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná', 'PE': 'Pernambuco', 'PI': 'Piauí',
      'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte', 'RS': 'Rio Grande do Sul',
      'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina', 'SP': 'São Paulo',
      'SE': 'Sergipe', 'TO': 'Tocantins'
    };

    const toTitleCase = (str) => {
      if (!str) return '';
      return str.toLowerCase().split(' ').map((word, idx) => {
        if (idx > 0 && ['de', 'da', 'do', 'das', 'dos', 'e', 'em'].includes(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    };

    const rawNum = training?.number != null ? String(training.number).trim() : '16';
    const numPadded = rawNum.length === 1 ? '0' + rawNum : rawNum;
    const numText = `Relatório de Atividades  Nº ${numPadded}`;

    const rawPolo = (training?.polo || 'Pontes e Lacerda').trim();
    const polo = toTitleCase(rawPolo);

    const rawUf = (training?.uf || 'MT').trim();
    const ufFull = ufMap[rawUf.toUpperCase()] || rawUf;

    const rawDate = (training?.datesFormatted || training?.startDate || '23 e 24 de junho de 2026').trim();
    const dateStr = rawDate.toLowerCase();

    const infoLine = `${polo}, ${ufFull}, ${dateStr}`;

    return { numText, infoLine, numPadded, polo, ufFull, dateStr };
  }

  base64ToUint8Array(dataUrl) {
    if (!dataUrl) return null;
    try {
      const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (e) {
      console.warn('Erro ao decodificar imagem para Uint8Array:', e);
      return null;
    }
  }

  /**
   * Extrai dimensões naturais (largura e altura) dos bytes da imagem (PNG e JPEG)
   */
  getImageDimensionsFromBytes(bytes) {
    if (!bytes || bytes.length < 24) return null;
    try {
      // PNG: cabeçalho 89 50 4E 47
      if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
        const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
        const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
        if (width > 0 && height > 0) return { width, height };
      }
      // JPEG: cabeçalho FF D8
      if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        let offset = 2;
        while (offset < bytes.length - 8) {
          if (bytes[offset] !== 0xFF) { offset++; continue; }
          const marker = bytes[offset + 1];
          // Preenchimento (FF FF) e marcadores sem campo de tamanho (TEM, RST0-7) apenas avançam
          if (marker === 0xFF) { offset++; continue; }
          if (marker === 0x01 || (marker >= 0xD0 && marker <= 0xD7)) { offset += 2; continue; }
          // Todos os SOF (C0-CF), exceto DHT (C4), JPG (C8) e DAC (CC): baseline, progressivo, sem perdas etc.
          if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
            const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
            const width = (bytes[offset + 7] << 8) | bytes[offset + 8];
            if (width > 0 && height > 0) return { width, height };
          }
          const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
          offset += 2 + length;
        }
      }
    } catch (e) {
      console.warn('Erro ao ler dimensões da imagem:', e);
    }
    return null;
  }

  /**
   * Fonte do texto do relatório. Com "todas as fontes iguais", documento, gráficos e nuvens usam a fonte padrão
   * (figureFontFamily); com fontes diferentes, o documento usa documentFontFamily. Padrão: Times New Roman.
   */
  getDocumentFont(training) {
    if (window.app && typeof window.app.getDocumentFont === 'function' && window.app.currentTraining === training) {
      return window.app.getDocumentFont();
    }
    const t = training || {};
    const separate = typeof t.separateFigureFonts === 'boolean' ? t.separateFigureFonts : Boolean(t.figureFontFamily || t.customWordCloudFont);
    return (separate ? t.documentFontFamily : t.figureFontFamily) || 'Times New Roman';
  }

  /**
   * Lê a orientação EXIF (1 a 8) de um JPEG. Retorna 1 quando não houver a informação.
   */
  getJpegOrientation(bytes) {
    if (!bytes || bytes.length < 4 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) return 1;
    try {
      let offset = 2;
      while (offset < bytes.length - 4) {
        if (bytes[offset] !== 0xFF) return 1;
        const marker = bytes[offset + 1];
        const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
        // APP1 com cabeçalho "Exif\0\0"
        if (marker === 0xE1 && bytes[offset + 4] === 0x45 && bytes[offset + 5] === 0x78 && bytes[offset + 6] === 0x69 && bytes[offset + 7] === 0x66) {
          const tiff = offset + 10;
          const little = bytes[tiff] === 0x49;
          const read16 = (p) => little ? (bytes[p] | (bytes[p + 1] << 8)) : ((bytes[p] << 8) | bytes[p + 1]);
          const read32 = (p) => little
            ? (bytes[p] | (bytes[p + 1] << 8) | (bytes[p + 2] << 16) | (bytes[p + 3] << 24))
            : ((bytes[p] << 24) | (bytes[p + 1] << 16) | (bytes[p + 2] << 8) | bytes[p + 3]);
          const ifd = tiff + read32(tiff + 4);
          const entries = read16(ifd);
          for (let i = 0; i < entries; i++) {
            const entry = ifd + 2 + i * 12;
            if (read16(entry) === 0x0112) return read16(entry + 8) || 1;
          }
          return 1;
        }
        if (marker === 0xDA) return 1;
        offset += 2 + length;
      }
    } catch (e) {
      console.warn('Erro ao ler orientação EXIF da imagem:', e);
    }
    return 1;
  }

  /**
   * Padroniza uma imagem (Data URL) para inserção no relatório: converte formatos não suportados
   * pelo Word (WEBP, GIF, BMP...) para JPEG, aplica a orientação EXIF de fotos de celular
   * e reduz imagens maiores que maxDim. PNG e JPEG já adequados são mantidos sem alteração.
   * Rejeita quando o navegador não consegue decodificar a imagem (ex.: HEIC).
   */
  async normalizeImageDataUrl(dataUrl, { maxDim = 1600, quality = 0.85 } = {}) {
    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) return dataUrl;

    const isPng = dataUrl.startsWith('data:image/png');
    const isJpeg = /^data:image\/jpe?g/i.test(dataUrl);
    if (isPng || isJpeg) {
      const bytes = this.base64ToUint8Array(dataUrl);
      const dims = this.getImageDimensionsFromBytes(bytes);
      const orientation = isJpeg ? this.getJpegOrientation(bytes) : 1;
      if (dims && orientation === 1 && Math.max(dims.width, dims.height) <= maxDim) {
        return dataUrl;
      }
    }

    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Formato de imagem não suportado pelo navegador.'));
      el.src = dataUrl;
    });

    // O navegador já entrega naturalWidth/naturalHeight e o desenho com a orientação EXIF aplicada
    const scale = Math.min(1, maxDim / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', quality);
  }

  /**
   * Retorna uma cópia da capacitação com todas as imagens do relatório em formato compatível com o Word
   * (fotos, figuras de Tecnologias Educacionais e páginas dos apêndices), cobrindo dados salvos em versões anteriores.
   */
  async prepareTrainingImagesForDocx(training) {
    if (!training) return training;
    const safeNormalize = async (dataUrl) => {
      try {
        return await this.normalizeImageDataUrl(dataUrl);
      } catch (e) {
        console.warn('Imagem não pôde ser convertida para o relatório:', e);
        return dataUrl;
      }
    };
    // Imagem que não pode ser lida (corrompida ou em formato que o Word não aceita) é descartada:
    // assim não ganha número de figura nem entrada no índice sem aparecer no documento
    const usableImage = async (dataUrl) => {
      const normalized = await safeNormalize(dataUrl);
      const bytes = this.base64ToUint8Array(normalized);
      if (bytes && this.getImageDimensionsFromBytes(bytes)) return normalized;
      console.warn('Imagem ignorada no relatório por não poder ser lida.');
      return '';
    };

    const media = [];
    for (const m of (training.media || [])) {
      const copy = { ...m };
      if (copy.type === 'photo' && copy.blob) {
        copy.blob = await usableImage(copy.blob);
      }
      if (Array.isArray(copy.pageImages) && copy.pageImages.length > 0) {
        const pages = [];
        for (const pg of copy.pageImages) {
          const img = await usableImage(pg);
          if (img) pages.push(img);
        }
        copy.pageImages = pages;
      }
      media.push(copy);
    }

    let educationalTech = training.educationalTech;
    if (educationalTech) {
      const figures = [];
      for (const f of (educationalTech.figures || [])) {
        figures.push(f && f.image ? { ...f, image: await usableImage(f.image) } : f);
      }
      const extraFigures = [];
      for (const ef of (educationalTech.extraFigures || [])) {
        extraFigures.push(ef && ef.image ? { ...ef, image: await usableImage(ef.image) } : ef);
      }
      educationalTech = { ...educationalTech, figures, extraFigures };
    }

    return { ...training, media, educationalTech };
  }

  /**
   * Pré-preenche um campo de índice (sumário, índice de figuras ou de tabelas) da biblioteca docx com as entradas
   * já calculadas, para que o índice apareça mesmo antes de o Word atualizar os campos.
   * Depende da estrutura interna do objeto (root[1] = conteúdo do campo, cujo último item fecha o campo):
   * se ela não for a esperada (ex.: outra versão da biblioteca), nada é alterado e retorna false.
   */
  injectFieldEntries(field, paragraphs, headingParagraph = null) {
    const content = field && Array.isArray(field.root) ? field.root[1] : null;
    if (!content || !Array.isArray(content.root) || content.root.length === 0) return false;
    if (headingParagraph) content.root.unshift(headingParagraph);
    const endPara = content.root.pop();
    content.root.push(...paragraphs, endPara);
    return true;
  }

  /**
   * Resolve uma figura fixa de Tecnologias Educacionais (fig_1 Kahoot / fig_2 Plickers) com imagem, legenda e fonte vigentes.
   * Retorna null quando a figura foi removida do relatório pelo usuário.
   */
  resolveEduTechFigure(training, figId) {
    const fig = (training?.educationalTech?.figures || []).find(f => f.id === figId);
    if (fig && fig.removed) return null;
    const defaults = {
      fig_1: { caption: 'Figura 1: Avaliação via ferramenta kahoot.', asset: window.educationalTechAssets?.kahoot },
      fig_2: { caption: 'Figura 2: Avaliação via ferramenta Plickers.', asset: window.educationalTechAssets?.plickers }
    };
    const def = defaults[figId] || {};
    const image = (fig && fig.image) || def.asset;
    if (!image) return null;
    return {
      ...(fig || {}),
      id: figId,
      image,
      caption: (fig && fig.caption) || def.caption,
      source: (fig && fig.source) || 'Fonte: Elaborada pelos autores.'
    };
  }

  /**
   * Chave única de uma fotografia na numeração das figuras
   */
  getPhotoFigureKey(photo) {
    return `photo_${photo?.id || photo?.slotId || ''}`;
  }

  /**
   * Calcula a numeração sequencial das figuras efetivamente incluídas no relatório:
   * Tecnologias Educacionais (fixas e extras), gráficos e nuvens (modelo 3 a 8) e fotografias.
   * - numbers: número final de cada figura (fig_1, fig_2, edu_<id>, fig_3..fig_8, photo_<id>)
   * - baseToFinal: correspondência entre o número do modelo oficial (1 a 8) e o número final
   * - photoStart: número da primeira fotografia
   * chartsData nulo considera que todos os gráficos estarão presentes (uso na interface).
   */
  getFigureNumbering(training, chartsData = null) {
    const numbers = {};
    const baseToFinal = {};
    let n = 0;

    ['fig_1', 'fig_2'].forEach((id, i) => {
      if (this.resolveEduTechFigure(training, id)) {
        numbers[id] = ++n;
        baseToFinal[i + 1] = n;
      }
    });

    (training?.educationalTech?.extraFigures || []).forEach(ef => {
      if (ef && ef.image) numbers[`edu_${ef.id}`] = ++n;
    });
    const nextEduNumber = n + 1;

    [3, 4, 5, 6, 7, 8].forEach(num => {
      if (!chartsData || chartsData[`fig${num}`]) {
        numbers[`fig_${num}`] = ++n;
        baseToFinal[num] = n;
      }
    });

    const photoStart = n + 1;
    this.getOrderedPhotos(training).forEach(ph => {
      numbers[this.getPhotoFigureKey(ph)] = ++n;
    });

    return { numbers, baseToFinal, photoStart, nextEduNumber };
  }

  /**
   * Aplica o número final ao prefixo "Figura N" de uma legenda, preservando o separador (":" ou ".").
   */
  applyFigureNumber(caption, num) {
    if (!num) return caption;
    const text = String(caption || '').trim();
    const prefix = /^figura\b\s*\d*\s*([.:\-–—])?\s*/i;
    if (prefix.test(text)) {
      return text.replace(prefix, (m, sep) => `Figura ${num}${sep === ':' ? ':' : '.'} `);
    }
    return `Figura ${num}. ${text}`;
  }

  /**
   * Ajusta as referências textuais "Figura(s) N" escritas na numeração do modelo oficial para a numeração final.
   */
  renumberFigureReferences(text, baseToFinal) {
    if (!text || !baseToFinal) return text;
    return String(text).replace(/\b(Figuras?)(\s+)(\d+(?:\s*(?:,|e|a)\s*\d+)*)/g, (m, word, space, nums) => {
      // Intervalos ("Figuras 3 a 6") são mantidos como intervalo, com as extremidades renumeradas
      if (/\sa\s/.test(nums)) {
        return word + space + nums.replace(/\d+/g, d => (baseToFinal[d] != null ? String(baseToFinal[d]) : d));
      }
      // Listas ("Figuras 1 e 2", "Figuras 4, 5 e 6"): figuras removidas do relatório saem da lista,
      // para que nenhuma referência aponte para outra figura
      const all = nums.match(/\d+/g) || [];
      const kept = all.filter(d => baseToFinal[d] != null).map(d => String(baseToFinal[d]));
      if (kept.length === 0) return m; // nenhuma figura da referência está no relatório: mantém o texto original
      if (kept.length === all.length) {
        return word + space + nums.replace(/\d+/g, d => String(baseToFinal[d]));
      }
      const list = kept.length === 1 ? kept[0] : `${kept.slice(0, -1).join(', ')} e ${kept[kept.length - 1]}`;
      const isUpper = word.charAt(0) === 'F';
      const newWord = kept.length === 1 ? (isUpper ? 'Figura' : 'figura') : (isUpper ? 'Figuras' : 'figuras');
      return newWord + space + list;
    });
  }

  /**
   * Constrói os nós de parágrafo de uma figura conforme o padrão oficial ABNT de referência:
   * Legenda/Título centralizado ACIMA da imagem, imagem centralizada, e Fonte centralizada ABAIXO.
   */
  createImageParagraph(dataUrl, maxTargetWidth, maxTargetHeight, captionText, docxDeps, bookmarkId = null, sourceText = 'Fonte: Elaborada pelos autores.') {
    return this.createFigureWithCaptionAbove(dataUrl, maxTargetWidth, maxTargetHeight, captionText, sourceText, docxDeps, bookmarkId);
  }

  /**
   * Constrói os nós de parágrafo de uma figura conforme o padrão oficial ABNT de referência:
   * Legenda/Título centralizado ACIMA da imagem, imagem centralizada, e Fonte centralizada ABAIXO.
   */
  createFigureWithCaptionAbove(dataUrl, maxTargetWidth, maxTargetHeight, captionText, sourceText, docxDeps, bookmarkId = null) {
    const bytes = this.base64ToUint8Array(dataUrl);
    if (!bytes) return [];

    let width = maxTargetWidth || 520;
    let height = maxTargetHeight || 270;

    // Preservar aspect ratio proporcional natural da imagem
    const dims = this.getImageDimensionsFromBytes(bytes);
    if (dims && dims.width > 0 && dims.height > 0) {
      const scale = Math.min(width / dims.width, height / dims.height, 1);
      width = Math.round(dims.width * scale);
      height = Math.round(dims.height * scale);
    }

    const { Paragraph, ImageRun, TextRun, AlignmentType, Bookmark, SimpleField } = docxDeps || window.docx || {};

    const nodes = [];

    // 1. Título / Legenda da Figura (Centralizada, Acima da Imagem - Modelo Oficial de Referência)
    if (captionText) {
      // Quebras de linha na legenda viram espaço (senão a legenda perderia o campo de numeração automática)
      captionText = String(captionText).replace(/\s+/g, ' ').trim();
      // Só figuras do relatório (com marcador) entram na numeração automática; páginas de documentos anexados
      // nos apêndices (sem marcador) nunca recebem o campo SEQ, mesmo que o nome do arquivo comece com "Figura N"
      const figMatch = bookmarkId ? captionText.match(/^Figura\s*(\d+)\s*([.:])?(.*)$/i) : null;
      let captionRuns = [];
      if (figMatch && SimpleField) {
        const num = figMatch[1];
        const sep = figMatch[2] === ':' ? ': ' : '. ';
        const rest = figMatch[3] ? figMatch[3].replace(/^[\.:\s]+/, '') : '';
        captionRuns = [
          new TextRun({
            text: 'Figura ',
            font: REPORT_DOC_FONT,
            size: 22,
            color: '000000'
          }),
          new SimpleField('SEQ Figura \\* ARABIC', String(num)),
          new TextRun({
            text: sep + rest,
            font: REPORT_DOC_FONT,
            size: 22,
            color: '000000'
          })
        ];
      } else {
        captionRuns = [
          new TextRun({
            text: captionText,
            font: REPORT_DOC_FONT,
            size: 22,
            color: '000000'
          })
        ];
      }

      const captionChild = (bookmarkId && Bookmark)
        ? [new Bookmark({ id: bookmarkId, children: captionRuns })]
        : captionRuns;

      nodes.push(
        new Paragraph({
          style: 'Caption',
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 80 },
          keepNext: true,
          keepLines: true,
          children: captionChild
        })
      );
    }

    // 2. Imagem (Centralizada)
    nodes.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 60 },
        keepNext: true,
        keepLines: true,
        children: [
          new ImageRun({
            data: bytes,
            transformation: { width, height }
          })
        ]
      })
    );

    // 3. Fonte (Centralizada, Abaixo da Imagem)
    nodes.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 180 },
        keepLines: true,
        children: [
          new TextRun({
            text: sourceText || 'Fonte: Elaborada pelos autores.',
            font: REPORT_DOC_FONT,
            size: 20,
            italics: true,
            color: '000000'
          })
        ]
      })
    );

    return nodes;
  }

  /**
   * Retorna as fotos da capacitação ordenadas primeiro pelos slots padrão (Figuras 9, 10, 11 e dias)
   * e posteriormente pelas fotos extras, garantindo consistência estrita entre o relatório e a aplicação.
   */
  getOrderedPhotos(training) {
    const allPhotos = (training?.media || []).filter(m => m.type === 'photo' && m.blob);
    if (allPhotos.length === 0) return [];

    const ordered = [];
    const used = new Set();
    const standardSlotIds = ['fig_9', 'fig_10', 'fig_11'];

    // Determina número de dias da capacitação (mesma regra da Etapa de fotos: durationDays tem prioridade sobre as datas)
    let daysCount = 2;
    if (training?.durationDays && parseInt(training.durationDays) > 0) {
      daysCount = parseInt(training.durationDays);
    } else if (training?.startDate && training?.endDate) {
      const start = new Date(training.startDate);
      const end = new Date(training.endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffDays = Math.round(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        daysCount = Math.max(1, Math.min(10, diffDays));
      }
    }

    for (let day = 1; day <= daysCount; day++) {
      standardSlotIds.push(`fig_${11 + day}_day_${day}`);
    }

    standardSlotIds.forEach(slotId => {
      let p = allPhotos.find(ph => ph.slotId === slotId);
      if (!p && slotId.includes('_day_')) {
        const dayPart = slotId.split('_day_')[1];
        p = allPhotos.find(ph => ph.slotId && ph.slotId.endsWith(`_day_${dayPart}`));
      }
      // Controle pela própria referência do objeto (fotos antigas podem não ter id nem slotId)
      if (p && !used.has(p)) {
        used.add(p);
        ordered.push(p);
      }
    });

    allPhotos.forEach(p => {
      if (!used.has(p)) {
        used.add(p);
        ordered.push(p);
      }
    });

    return ordered;
  }

  /**
   * Constrói dinamicamente os tópicos do sumário, índice de figuras e índice de tabelas
   * com os títulos exatos do presente relatório e suas páginas correspondentes de forma precisa
   */
  buildReportIndices(training, metrics, chartsData = {}) {
    chartsData = chartsData || {};
    let page = 1;
    let currentDxa = 0;
    // Capacidade útil padrão de página A4 no Word (297mm - margens 2.54cm - cabeçalho - rodapé)
    const MAX_PAGE_DXA = 12600;

    function addElement(height, canSplit = false, isCaption = false) {
      if (isCaption) {
        // Legenda com keepNext: true: se a legenda e pelo menos o cabeçalho do item seguinte não couberem, quebra
        if (currentDxa + height + 900 > MAX_PAGE_DXA && currentDxa > 1000) {
          page++;
          currentDxa = 0;
        }
        const assignedPage = page;
        currentDxa += height;
        return assignedPage;
      }

      if (!canSplit) {
        if (currentDxa + height > MAX_PAGE_DXA && currentDxa > 800) {
          page++;
          currentDxa = 0;
        }
        const assignedPage = page;
        currentDxa += height;
        return assignedPage;
      } else {
        const assignedPage = page;
        let remaining = height;
        while (currentDxa + remaining > MAX_PAGE_DXA) {
          const space = Math.max(0, MAX_PAGE_DXA - currentDxa);
          remaining -= space;
          page++;
          currentDxa = 0;
        }
        currentDxa += remaining;
        return assignedPage;
      }
    }

    function textBlockHeight(charCount, before = 120, after = 0) {
      const lines = Math.max(1, Math.ceil(charCount / 90));
      return lines * 360 + before + after;
    }

    const munCount = (training?.municipalities || training?.municipios || []).length || 12;
    const modCount = (training?.courseModules || training?.modulos || []).length || 4;
    const photos = this.getOrderedPhotos(training);
    const fndeDocs = (training?.media || []).filter(m => m.type === 'doc_fnde');
    const cecateDocs = (training?.media || []).filter(m => m.type === 'doc_cecate');

    // 1. INTRODUÇÃO
    const pIntro = addElement(880, false);
    addElement(textBlockHeight(340) + textBlockHeight(440) + textBlockHeight(400), true);

    // 2. DADOS BÁSICOS DO CURSO
    const pDadosBasicos = addElement(880, false);
    addElement(textBlockHeight(520) + textBlockHeight(480), true);

    // Tabela 1: Municípios convocados (2 colunas lado a lado)
    const t1Half = Math.ceil(munCount / 2);
    const pTab1 = addElement(540, false, true);
    addElement(500 + t1Half * 360 + 460, true);

    // Tabela 2: Estrutura do curso
    addElement(textBlockHeight(460, 200, 150), true);
    const pTab2 = addElement(540, false, true);
    addElement(900 + modCount * 650 + 460, true);

    // 3. CONTATO COM OS MUNICÍPIOS
    const pContato = addElement(880, false);
    addElement(textBlockHeight(340) + textBlockHeight(380) + textBlockHeight(320), true);

    // Tabela 3: Inscritos por município (2 colunas lado a lado)
    const t3Half = Math.ceil(munCount / 2);
    const pTab3 = addElement(540, false, true);
    addElement(1000 + t3Half * 360 + 720 + 460, true);

    // 4. DESENVOLVIMENTO DO CURSO
    const pDesenv = addElement(880, false);
    const momentosHeight = textBlockHeight(195) + (6 * textBlockHeight(220) + 2 * textBlockHeight(300));
    addElement(momentosHeight, true);

    // Tecnologias Educacionais
    const eduTechData = training.educationalTech || {};
    const figNumbering = this.getFigureNumbering(training, chartsData);
    const figNums = figNumbering.numbers;
    const f1Data = this.resolveEduTechFigure(training, 'fig_1');
    const f2Data = this.resolveEduTechFigure(training, 'fig_2');

    addElement(textBlockHeight(550), true);

    let pFig1 = null;
    if (f1Data) {
      pFig1 = addElement(6600, false, true);
    }
    let pFig2 = null;
    if (f2Data) {
      pFig2 = addElement(6600, false, true);
    }
    const extraEduPages = {};
    (eduTechData.extraFigures || []).forEach(ef => {
      if (ef && ef.image) extraEduPages[ef.id] = addElement(6600, false, true);
    });

    // Tabela 4: Participação por município (2 colunas lado a lado)
    addElement(textBlockHeight(700), true);
    const t4Half = Math.ceil(munCount / 2);
    const pTab4 = addElement(540, false, true);
    addElement(1000 + t4Half * 360 + 720 + 460, true);

    // Parágrafo sobre certificados na plataforma PLATEIA (Fim da Seção 4)
    addElement(textBlockHeight(250, 150, 200), true);

    // 5. AVALIAÇÃO DA CAPACITAÇÃO
    const pAvaliacao = addElement(880, false);
    addElement(textBlockHeight(500), true);

    // Figura 3: Gráfico de Participação (Tópico 5)
    let pFig3 = null;
    if (chartsData?.fig3) {
      addElement(textBlockHeight(300), true);
      pFig3 = addElement(5800, false, true);
    }
    addElement(textBlockHeight(300), true);

    let pFig4 = null;
    if (chartsData?.fig4) pFig4 = addElement(6950, false, true);
    let pFig5 = null;
    if (chartsData?.fig5) pFig5 = addElement(6950, false, true);
    let pFig6 = null;
    if (chartsData?.fig6) pFig6 = addElement(6950, false, true);

    addElement(textBlockHeight(350), true); // intro nuvens

    let pFig7 = null;
    if (chartsData?.fig7) pFig7 = addElement(6200, false, true);
    let pFig8 = null;
    if (chartsData?.fig8) pFig8 = addElement(6200, false, true);

    // 6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO
    const pFotos = addElement(880, false);
    addElement(textBlockHeight(500), true);

    const photoPages = [];
    photos.forEach((ph, idx) => {
      const phPage = addElement(7000, false, true);
      photoPages.push(phPage);
    });

    // 7. CONSIDERAÇÕES FINAIS
    const pConsideracoes = addElement(880, false);
    addElement(textBlockHeight(1000), true);

    // Cada página de documento anexado ocupa praticamente uma página inteira do relatório
    const addAppendixDoc = (d) => {
      const pages = (d.pageImages && d.pageImages.length > 0) ? d.pageImages.length : (d.blob?.startsWith('data:image/') ? 1 : 0);
      if (pages === 0) { addElement(350, true); return; }
      for (let i = 0; i < pages; i++) addElement(11500, false);
    };

    // APÊNDICES
    if (currentDxa > 0) { page++; currentDxa = 0; }
    const pApendice1 = addElement(880, false);
    if (fndeDocs.length > 0) {
      fndeDocs.forEach(addAppendixDoc);
    } else {
      addElement(350, true);
    }

    if (currentDxa > 0) { page++; currentDxa = 0; }
    const pApendice2 = addElement(880, false);
    if (cecateDocs.length > 0) {
      cecateDocs.forEach(addAppendixDoc);
    } else {
      addElement(350, true);
    }

    if (currentDxa > 0) { page++; currentDxa = 0; }
    const pApendice3 = addElement(880, false);
    const evalList = (training?.evaluations || []).filter(e => (e.likedAspects && e.likedAspects.trim()) || (e.improveAspects && e.improveAspects.trim()));
    if (evalList.length > 0) {
      addElement(1000 + evalList.length * 600, true);
    } else {
      addElement(350, true);
    }

    const sumarioList = [
      { label: '1. INTRODUÇÃO', page: String(pIntro), bookmarkId: 'sec_intro' },
      { label: '2. DADOS BÁSICOS DO CURSO', page: String(pDadosBasicos), bookmarkId: 'sec_dados_basicos' },
      { label: '3. CONTATO COM OS MUNICÍPIOS', page: String(pContato), bookmarkId: 'sec_contato' },
      { label: '4. DESENVOLVIMENTO DO CURSO', page: String(pDesenv), bookmarkId: 'sec_desenv' },
      { label: '5. AVALIAÇÃO DA CAPACITAÇÃO', page: String(pAvaliacao), bookmarkId: 'sec_avaliacao' },
      { label: '6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO', page: String(pFotos), bookmarkId: 'sec_fotos' },
      { label: '7. CONSIDERAÇÕES FINAIS', page: String(pConsideracoes), bookmarkId: 'sec_consideracoes' },
      { label: 'APÊNDICE I – CONVOCAÇÕES DO FNDE', page: String(pApendice1), bookmarkId: 'sec_apendice_1' },
      { label: 'APÊNDICE II – CONVOCAÇÕES DO CECATE', page: String(pApendice2), bookmarkId: 'sec_apendice_2' },
      { label: 'APÊNDICE III – RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO', page: String(pApendice3), bookmarkId: 'sec_apendice_3' }
    ];

    const tablesList = [
      { label: 'Tabela 1. Municípios convocados.', page: String(pTab1), bookmarkId: 'tab_1' },
      { label: 'Tabela 2. Estrutura do curso de capacitação em transporte escolar.', page: String(pTab2), bookmarkId: 'tab_2' },
      { label: 'Tabela 3. Inscritos por município.', page: String(pTab3), bookmarkId: 'tab_3' },
      { label: 'Tabela 4. Participação por município.', page: String(pTab4), bookmarkId: 'tab_4' }
    ];

    const figuresList = [];
    // Figuras 1 e 2: mantém o nome da ferramenta em itálico quando a legenda for a padrão
    const pushEduTechIndexEntry = (figData, page, bookmarkId, toolWord) => {
      const caption = this.applyFigureNumber(figData.caption, figNums[bookmarkId]);
      const defaultMatch = caption.match(new RegExp(`^(Figura \\d+[.:] Avaliação via ferramenta )(${toolWord})\\.$`, 'i'));
      if (defaultMatch) {
        figuresList.push({ label: defaultMatch[1], italicWord: defaultMatch[2], afterWord: '.', page: String(page), bookmarkId });
      } else {
        figuresList.push({ label: caption, page: String(page), bookmarkId });
      }
    };
    if (pFig1 != null) {
      pushEduTechIndexEntry(f1Data, pFig1, 'fig_1', 'kahoot');
    }
    if (pFig2 != null) {
      pushEduTechIndexEntry(f2Data, pFig2, 'fig_2', 'Plickers');
    }
    (eduTechData.extraFigures || []).forEach((ef, idx) => {
      if (ef && ef.image) {
        const extraLabel = this.applyFigureNumber(ef.caption || `Avaliação via ${ef.title || 'tecnologia educacional'}.`, figNums[`edu_${ef.id}`]);
        figuresList.push({ label: extraLabel, page: String(extraEduPages[ef.id] || pDesenv), bookmarkId: `fig_extra_${idx}` });
      }
    });
    if (pFig3 != null) {
      figuresList.push({ label: this.applyFigureNumber('Figura 3. Participação segundo o tipo de representação.', figNums.fig_3), page: String(pFig3), bookmarkId: 'fig_3' });
    }
    if (pFig4 != null) {
      figuresList.push({ label: this.applyFigureNumber('Figura 4. Avaliação da capacitação de todos os participantes.', figNums.fig_4), page: String(pFig4), bookmarkId: 'fig_4' });
    }
    if (pFig5 != null) {
      figuresList.push({ label: this.applyFigureNumber('Figura 5. Avaliação da capacitação dos conselheiros CACS.', figNums.fig_5), page: String(pFig5), bookmarkId: 'fig_5' });
    }
    if (pFig6 != null) {
      figuresList.push({ label: this.applyFigureNumber('Figura 6. Avaliação da capacitação dos gestores municipais.', figNums.fig_6), page: String(pFig6), bookmarkId: 'fig_6' });
    }
    if (pFig7 != null) {
      const fig7TitleRaw = (training?.customWordCloudTitles && training.customWordCloudTitles.fig7)
        ? training.customWordCloudTitles.fig7.trim()
        : 'Aspectos que gostaram da capacitação.';
      figuresList.push({ label: this.applyFigureNumber(fig7TitleRaw, figNums.fig_7), page: String(pFig7), bookmarkId: 'fig_7' });
    }
    if (pFig8 != null) {
      const fig8TitleRaw = (training?.customWordCloudTitles && training.customWordCloudTitles.fig8)
        ? training.customWordCloudTitles.fig8.trim()
        : 'Aspectos que devem melhorar da capacitação.';
      figuresList.push({ label: this.applyFigureNumber(fig8TitleRaw, figNums.fig_8), page: String(pFig8), bookmarkId: 'fig_8' });
    }
    photos.forEach((ph, idx) => {
      const cap = this.applyFigureNumber(ph.caption || 'Registro fotográfico oficial da capacitação.', figNums[this.getPhotoFigureKey(ph)]);
      const pNum = photoPages[idx] || pFotos;
      figuresList.push({ label: cap, page: String(pNum), bookmarkId: `fig_photo_${idx}` });
    });

    return { sumarioList, tablesList, figuresList };
  }

  /**
   * Gera o arquivo .docx institucional formatado e retorna o Blob binário
   */
  async generateDocxBlob(training, metrics, chartsData = {}) {
    chartsData = chartsData || {};
    REPORT_DOC_FONT = this.getDocumentFont(training);
    if (!training) {
      alert('Selecione ou salve uma capacitação primeiro.');
      return null;
    }

    // Garante imagens compatíveis com o Word (inclusive as salvas em versões anteriores)
    training = await this.prepareTrainingImagesForDocx(training);
    const figNumbering = this.getFigureNumbering(training, chartsData || {});
    const figNums = figNumbering.numbers;
    const renumberRefs = (text) => this.renumberFigureReferences(text, figNumbering.baseToFinal);

    const {
      Document,
      Packer,
      Paragraph,
      TextRun,
      Table,
      TableRow,
      TableCell,
      WidthType,
      AlignmentType,
      HeadingLevel,
      BorderStyle,
      ImageRun,
      Header,
      Footer,
      PageNumber,
      PageBreak,
      Bookmark,
      InternalHyperlink,
      SimpleField,
      PageReference,
      HeightRule: DocxHeightRule,
      TableLayoutType: DocxTableLayoutType,
      LineRuleType: DocxLineRuleType,
      VerticalAlign: DocxVerticalAlign,
      TabStopType: DocxTabStopType,
      LeaderType: DocxLeaderType,
      TableOfContents: DocxTableOfContents
    } = window.docx || {};

    const TableOfContents = DocxTableOfContents || window.docx?.TableOfContents;

    const VerticalAlign = DocxVerticalAlign || window.docx?.VerticalAlign || {
      BOTTOM: 'bottom',
      CENTER: 'center',
      TOP: 'top'
    };

    const HeightRule = DocxHeightRule || window.docx?.HeightRule || {
      AUTO: 'auto',
      ATLEAST: 'atLeast',
      EXACT: 'exact'
    };

    const TableLayoutType = DocxTableLayoutType || window.docx?.TableLayoutType || {
      AUTOFIT: 'autofit',
      FIXED: 'fixed'
    };

    const LineRuleType = DocxLineRuleType || window.docx?.LineRuleType || {
      AT_LEAST: 'atLeast',
      EXACTLY: 'exactly',
      EXACT: 'exact',
      AUTO: 'auto'
    };

    const TabStopType = DocxTabStopType || window.docx?.TabStopType || {
      RIGHT: 'right',
      LEFT: 'left',
      CENTER: 'center'
    };

    const LeaderType = DocxLeaderType || window.docx?.LeaderType || {
      DOT: 'dot',
      HYPHEN: 'hyphen',
      NONE: 'none',
      UNDERSCORE: 'underscore'
    };

    if (!Document) {
      console.warn('Biblioteca docx.js não carregada, disparando fallback HTML...');
      this.downloadHtmlReportFallback(training, metrics, chartsData);
      return;
    }

    const docxDeps = { Paragraph, ImageRun, TextRun, AlignmentType, Bookmark, InternalHyperlink, SimpleField, PageReference };

    try {
      const docChildren = [];
      const coverInfo = this.formatCoverTrainingInfo(training);
      const coverAssets = window.coverAssets || {};

      // Carregar bytes das imagens da capa oficial, cabeçalho e rodapé
      const figBytes = this.base64ToUint8Array(coverAssets.figuradacapa);
      const cecateBytes = this.base64ToUint8Array(coverAssets.cecate);
      const ufgBytes = this.base64ToUint8Array(coverAssets.ufg);
      const fndeBytes = this.base64ToUint8Array(coverAssets.fnde);
      const headerLogoBytes = this.base64ToUint8Array(coverAssets.cecateCabecalho || coverAssets.cecate);
      const rodape5LogosBytes = this.base64ToUint8Array(coverAssets.rodape5Logos);

      // 1. MONTAGEM DA CAPA OFICIAL (Seção 1 - Preenchimento Integral da 1ª Folha A4)
      const PAGE_WIDTH_DXA = 11906; // 210mm (Largura padrão A4)
      const PAGE_HEIGHT_DXA = 16838; // 297mm (Altura padrão A4)

      const noBorders = {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE }
      };

      const cellMargins = { top: 0, bottom: 0, left: 0, right: 0 };

      const topChildren = [];
      if (figBytes) {
        topChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 500, after: 200 },
            children: [
              new ImageRun({
                data: figBytes,
                transformation: { width: 510, height: 285 }
              })
            ]
          })
        );
      } else {
        topChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 400 },
            children: [
              new TextRun({
                text: 'CENTRO COLABORADOR DE APOIO AO TRANSPORTE ESCOLAR',
                bold: true,
                size: 24,
                color: 'E9C95C'
              }),
              new TextRun({
                text: 'CECATE CENTRO-OESTE',
                break: 1,
                bold: true,
                size: 24,
                color: 'E9C95C'
              })
            ]
          })
        );
      }

      topChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 120 },
          children: [
            new TextRun({
              text: coverInfo.numText,
              font: REPORT_DOC_FONT,
              bold: true,
              size: 32, // 16pt
              color: 'F9DB61'
            })
          ]
        })
      );

      const stripeChildren = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 40, // 20pt
              color: '000000'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 120 },
          children: [
            new TextRun({
              text: coverInfo.infoLine,
              font: REPORT_DOC_FONT,
              bold: true,
              size: 32, // 16pt
              color: '000000'
            })
          ]
        })
      ];

      const projectChildren = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: 'Projeto:  FORTALECENDO E APRIMORANDO AS POLÍTICAS',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 30, // 15pt
              color: 'D9D9D9'
            }),
            new TextRun({
              text: 'PÚBLICAS DE TRANSPORTE ESCOLAR',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 30, // 15pt
              color: 'D9D9D9',
              break: 1
            }),
            new TextRun({
              text: 'DO BRASIL',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 30, // 15pt
              color: 'D9D9D9',
              break: 1
            })
          ]
        })
      ];

      // Banner inferior de logomarcas institucionais
      const logoCells = [];
      if (cecateBytes) {
        logoCells.push(
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            borders: noBorders,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 10, after: 10 },
                children: [
                  new ImageRun({
                    data: cecateBytes,
                    transformation: { width: 175, height: 37 }
                  })
                ]
              })
            ]
          })
        );
      }
      if (ufgBytes) {
        logoCells.push(
          new TableCell({
            width: { size: 24, type: WidthType.PERCENTAGE },
            borders: noBorders,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 10, after: 10 },
                children: [
                  new ImageRun({
                    data: ufgBytes,
                    transformation: { width: 95, height: 37 }
                  })
                ]
              })
            ]
          })
        );
      }
      if (fndeBytes) {
        logoCells.push(
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            borders: noBorders,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 10, after: 10 },
                children: [
                  new ImageRun({
                    data: fndeBytes,
                    transformation: { width: 165, height: 37 }
                  })
                ]
              })
            ]
          })
        );
      }

      const logosTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: noBorders,
        rows: [
          new TableRow({ children: logoCells.length > 0 ? logoCells : [new TableCell({ children: [new Paragraph({})] })] })
        ]
      });

      // Tabela de capa que ocupa 100% da primeira página A4 (sem margens brancas)
      // Distribuição proporcional rigorosa baseada nos relatórios de referência:
      // Linha 1: 8900 dxa (~157mm) - Bloco cinza escuro superior (Ilustração + Nº Relatório)
      // Linha 2: 1600 dxa (~28mm)  - Faixa amarela institucional (Capacitação + Polo/Data)
      // Linha 3: 3750 dxa (~66mm)  - Bloco cinza escuro do Projeto (Texto institucional)
      // Linha 4: 1950 dxa (~34mm)  - Faixa cinza clara institucional (Realizado por + 3 logos)
      // Linha 5: 600 dxa (~11mm)   - Faixa cinza escura de fechamento da borda inferior
      // Total = 16800 dxa (A4 total = 16838 dxa, preenchendo a folha inteira sem salto de página)
      const coverTable = new Table({
        width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        alignment: AlignmentType.CENTER,
        indent: { size: 0, type: WidthType.DXA },
        margins: cellMargins,
        borders: noBorders,
        rows: [
          new TableRow({
            height: { value: 8900, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: '4D4D4D' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: topChildren
              })
            ]
          }),
          new TableRow({
            height: { value: 1600, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: 'E9C95C' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: stripeChildren
              })
            ]
          }),
          new TableRow({
            height: { value: 3750, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: '4D4D4D' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: projectChildren
              })
            ]
          }),
          new TableRow({
            height: { value: 1950, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: 'D8D8D8' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 30, after: 20 },
                    children: [
                      new TextRun({
                        text: 'Realizado por:',
                        font: 'Arial',
                        bold: true,
                        size: 20, // 10pt
                        color: '4D4D4D'
                      })
                    ]
                  }),
                  logosTable
                ]
              })
            ]
          }),
          new TableRow({
            height: { value: 600, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: '4D4D4D' },
                margins: cellMargins,
                borders: noBorders,
                children: [
                  new Paragraph({
                    spacing: { before: 0, after: 0, line: 20, lineRule: LineRuleType.EXACT },
                    children: [new TextRun({ text: '', size: 1 })]
                  })
                ]
              })
            ]
          })
        ]
      });

      // Parágrafo residual da Seção 1 com microespaçamento e fundo escuro para não criar página extra
      const coverTrailingPara = new Paragraph({
        shading: { fill: '4D4D4D' },
        spacing: { before: 0, after: 0, line: 20, lineRule: LineRuleType.EXACT },
        children: [new TextRun({ text: '', size: 1 })]
      });

      // 3. SEÇÃO 1: INTRODUÇÃO
      const rawNum = training?.number != null ? String(training.number).trim() : '';
      const ordinalNum = this.numberToOrdinal(rawNum);
      const ufName = this.getUfFullName(training.uf);
      const munCountVal = (training?.municipalities || []).length;

      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_intro',
                  children: [new TextRun({ text: '1. INTRODUÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: '1. INTRODUÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Este relatório é referente às atividades desenvolvidas no âmbito do projeto intitulado '
            }),
            new TextRun({
              text: `"${(training.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL').toUpperCase()}",`,
              italics: true
            }),
            new TextRun({
              text: ' processo administrativo número 23070.068031/2023-34, desenvolvido pela Universidade Federal de Goiás (UFG), por meio do Centro Colaborador de Apoio ao Transporte Escolar do Centro-Oeste (CECATE Centro-Oeste), em parceria e com financiamento do Fundo Nacional de Desenvolvimento da Educação (FNDE).'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: `O presente relatório apresenta a descrição pormenorizada e a análise avaliativa do processo do ${ordinalNum ? `${ordinalNum} ` : ''}curso de Capacitação em Transporte Escolar (Capacitação nº ${rawNum || '16'}), realizado para gestores municipais e conselheiros do CACS/FUNDEB de ${munCountVal} municípios do Estado de ${ufName}, sediado no município polo de ${training.polo || 'Município Polo'}, nas datas de ${training.datesFormatted || 'datas do curso'}.`
            })
          ]
        })
      );

      // 4. SEÇÃO 2: DADOS BÁSICOS DO CURSO & TABELAS 1, 2, 3
      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_dados_basicos',
                  children: [new TextRun({ text: '2. DADOS BÁSICOS DO CURSO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: '2. DADOS BÁSICOS DO CURSO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'O curso de Capacitação em Transporte Escolar foi estruturado para alcançar o objetivo primordial de aprimorar os conhecimentos dos participantes sobre transporte escolar, apresentar os programas do governo federal, detalhar os principais aspectos de planejamento e regulação na área e capacitar tecnicamente para a utilização do Sistema Eletrônico de Gestão do Transporte Escolar (SETE).'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Após criteriosa avaliação pedagógica das edições anteriores, definiu-se que o curso seria realizado em formato presencial concentrado, integrando gestores e conselheiros CACS dos municípios, correspondendo a uma carga horária total de 08:00 horas. No período matutino, a capacitação foi conduzida em turma unificada, abordando fundamentos essenciais de planejamento, governança e regulação do transporte escolar. No período vespertino, a formação foi desdobrada em duas abordagens específicas conforme o público-alvo: a primeira voltada aos gestores municipais, focada no domínio prático e operacional do Sistema SETE para cadastro de rotas, alunos e escolas; e a segunda direcionada aos conselheiros do CACS/FUNDEB, orientada ao exercício das competências fiscalizatórias, controle social e emissão de relatórios de acompanhamento.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: `Dada a meta de entes federados a serem atendidos durante o projeto, estabeleceu-se a oferta de duas (02) vagas para gestores municipais e duas (02) vagas para conselheiros do CACS/FUNDEB por município. No ofício de convocação foi explicitada a preferência por servidores efetivos e de carreira, com a finalidade de mitigar a perda de conhecimento técnico decorrente da rotatividade das gestões. Como critério de seleção territorial, adotou-se a menor distância rodoviária até o polo de capacitação de ${training.polo || 'Município Polo'}, priorizando os municípios mais próximos. Foram formalmente convocados ${metrics?.totalSummonedMunicipalities || munCountVal} municípios, cuja distância média percorrida foi estimada em ${metrics?.avgDistance || 0} km. A relação completa dos entes federativos convocados é apresentada na Tabela 1:`
            })
          ]
        }),
        new Paragraph({
          style: 'Caption',
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 120 },
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark && SimpleField
              ? new Bookmark({
                  id: 'tab_1',
                  children: [
                    new TextRun({
                      text: 'Tabela ',
                      font: REPORT_DOC_FONT,
                      size: 22,
                      color: '000000'
                    }),
                    new SimpleField('SEQ Tabela \\* ARABIC', '1'),
                    new TextRun({
                      text: '. Municípios convocados.',
                      font: REPORT_DOC_FONT,
                      size: 22,
                      color: '000000'
                    })
                  ]
                })
              : new TextRun({
                  text: 'Tabela 1. Municípios convocados.',
                  font: REPORT_DOC_FONT,
                  size: 22,
                  color: '000000'
                })
          ]
        })
      );

      // Estilos padronizados de tabelas conforme modelo oficial de referência (02-Relatórios exemplos)
      const tableHeaderShading = { fill: 'D9D9D9' };
      const noBorder = { style: BorderStyle.NONE, size: 0, color: 'auto' };
      const singleBorder = { style: BorderStyle.SINGLE, size: 4, color: '000000' };

      const abntHeaderBorders = {
        top: singleBorder,
        bottom: singleBorder,
        left: noBorder,
        right: noBorder
      };

      const abntDataBorders = {
        top: singleBorder,
        bottom: singleBorder,
        left: noBorder,
        right: noBorder
      };

      const spacerBorders = {
        top: noBorder,
        bottom: noBorder,
        left: noBorder,
        right: noBorder
      };

      const t2CellBorders = (isLeftmost, isRightmost, customBorders = {}) => ({
        top: singleBorder,
        bottom: singleBorder,
        left: isLeftmost ? noBorder : singleBorder,
        right: isRightmost ? noBorder : singleBorder,
        ...customBorders
      });

      // Tabela 1 - Modelo Oficial de Referência: 2 Colunas Lado a Lado (Esquerda + Espaçador + Direita)
      const munList = (training.municipalities || []);
      const half = Math.ceil(munList.length / 2);
      const leftList = munList.slice(0, half);
      const rightList = munList.slice(half);

      const munRows = [
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: [
            // Bloco Esquerdo
            new TableCell({
              width: { size: 12, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Código IBGE', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Nome do Município', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 8, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Distância (km)', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            // Espaçador Central
            new TableCell({
              width: { size: 4, type: WidthType.PERCENTAGE },
              borders: spacerBorders,
              children: [new Paragraph({ keepNext: true, keepLines: true, children: [] })]
            }),
            // Bloco Direito
            new TableCell({
              width: { size: 12, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Código IBGE', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Nome do Município', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 8, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Distância (km)', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            })
          ]
        })
      ];

      for (let i = 0; i < half; i++) {
        const leftM = leftList[i];
        const rightM = rightList[i] || null;

        const leftDist = leftM.isSede ? '0,0' : (leftM.distanceKm != null ? parseFloat(leftM.distanceKm).toFixed(1).replace('.', ',') : '0,0');
        const rightDist = rightM ? (rightM.isSede ? '0,0' : (rightM.distanceKm != null ? parseFloat(rightM.distanceKm).toFixed(1).replace('.', ',') : '0,0')) : '';

        munRows.push(
          new TableRow({
            cantSplit: true,
            children: [
              // Bloco Esquerdo
              new TableCell({
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: String(leftM.ibgeCode || '-'), font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: true, keepLines: true, children: [new TextRun({ text: leftM.name || '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: leftDist, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              // Espaçador Central
              new TableCell({
                borders: spacerBorders,
                children: [new Paragraph({ keepNext: true, keepLines: true, children: [] })]
              }),
              // Bloco Direito
              new TableCell({
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightM ? String(rightM.ibgeCode || '-') : '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: true, keepLines: true, children: [new TextRun({ text: rightM ? (rightM.name || '') : '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightDist, font: REPORT_DOC_FONT, size: 20 })] })]
              })
            ]
          })
        );
      }

      docChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
            insideHorizontal: noBorder, insideVertical: noBorder
          },
          rows: munRows
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 180 },
          keepLines: true,
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', font: REPORT_DOC_FONT, size: 20, color: '000000' })]
        })
      );

      // Tabela 2 - Estrutura do Curso (Conforme modelo oficial de 2 níveis da referência)
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'A estrutura curricular do curso contempla quatro (04) módulos sequenciais, sendo os três primeiros voltados aos fundamentos gerais, programas governamentais e normativas do transporte escolar. O quarto módulo é personalizado ao perfil do participante: para os gestores, o foco é integralmente direcionado à prática intensiva no Sistema SETE ("mãos na massa"); para os conselheiros CACS, a abordagem enfatiza as atribuições legais do conselho e a consulta analítica dos dados no sistema. A distribuição temática e as cargas horárias são detalhadas na Tabela 2:'
            })
          ]
        }),
        new Paragraph({
          style: 'Caption',
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 120 },
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark && SimpleField
              ? new Bookmark({
                  id: 'tab_2',
                  children: [
                    new TextRun({ text: 'Tabela ', font: REPORT_DOC_FONT, size: 22, color: '000000' }),
                    new SimpleField('SEQ Tabela \\* ARABIC', '2'),
                    new TextRun({ text: '. Estrutura do curso de capacitação em transporte escolar.', font: REPORT_DOC_FONT, size: 22, color: '000000' })
                  ]
                })
              : new TextRun({ text: 'Tabela 2. Estrutura do curso de capacitação em transporte escolar.', font: REPORT_DOC_FONT, size: 22, color: '000000' })
          ]
        })
      );

      const modRows = [
        // Linha 0 do Cabeçalho
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: [
            new TableCell({
              width: { size: 14, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: t2CellBorders(true, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Módulo', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              columnSpan: 2,
              width: { size: 56, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: t2CellBorders(false, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Temática', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              columnSpan: 2,
              width: { size: 30, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: t2CellBorders(false, true),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Carga horária', font: REPORT_DOC_FONT, bold: true, size: 20 }), new TextRun({ text: '(horas)', break: 1, font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            })
          ]
        }),
        // Linha 1 do Cabeçalho
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: [
            new TableCell({
              width: { size: 14, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: t2CellBorders(true, false),
              children: []
            }),
            new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: t2CellBorders(false, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Gestor', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: t2CellBorders(false, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'CACS', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 15, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: t2CellBorders(false, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Gestor', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 15, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: t2CellBorders(false, true),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'CACS', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            })
          ]
        })
      ];

      const normCourseModules = window.courseStructureHelper ? window.courseStructureHelper.normalize(training.courseModules || []) : (training.courseModules || []);
      const sortedMods = [...normCourseModules].sort((a, b) => (a.order || 0) - (b.order || 0));

      sortedMods.forEach(mod => {
        const gTopics = Array.isArray(mod.gestorTopics) ? mod.gestorTopics : [];
        const cTopics = Array.isArray(mod.cacsTopics) ? mod.cacsTopics : [];

        const isShared = mod.isShared || (gTopics.length === 1 && cTopics.length === 1 && gTopics[0].topic === cTopics[0].topic);

        if (isShared) {
          const topicText = gTopics[0]?.topic || cTopics[0]?.topic || '-';
          const gHours = gTopics[0] ? parseFloat(gTopics[0].hours || 0).toFixed(1).replace('.', ',') : '-';
          const cHours = cTopics[0] ? parseFloat(cTopics[0].hours || 0).toFixed(1).replace('.', ',') : '-';

          modRows.push(
            new TableRow({
              cantSplit: true,
              children: [
                new TableCell({
                  width: { size: 14, type: WidthType.PERCENTAGE },
                  borders: t2CellBorders(true, false),
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: mod.moduleNumber || '01', font: REPORT_DOC_FONT, size: 20 })] })]
                }),
                new TableCell({
                  columnSpan: 2,
                  width: { size: 56, type: WidthType.PERCENTAGE },
                  borders: t2CellBorders(false, false),
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: topicText, font: REPORT_DOC_FONT, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 15, type: WidthType.PERCENTAGE },
                  borders: t2CellBorders(false, false),
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: gHours, font: REPORT_DOC_FONT, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 15, type: WidthType.PERCENTAGE },
                  borders: t2CellBorders(false, true),
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: cHours, font: REPORT_DOC_FONT, size: 20 })] })]
                })
              ]
            })
          );
        } else {
          const maxRows = Math.max(gTopics.length, cTopics.length, 1);
          for (let i = 0; i < maxRows; i++) {
            const isFirst = i === 0;
            const g = gTopics[i] || null;
            const c = cTopics[i] || null;

            const gestorSpans = gTopics.length === 1 && maxRows > 1;

            const modCell = isFirst ? new TableCell({
              width: { size: 14, type: WidthType.PERCENTAGE },
              verticalMerge: maxRows > 1 ? 'restart' : undefined,
              borders: t2CellBorders(true, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: mod.moduleNumber || '04', font: REPORT_DOC_FONT, size: 20 })] })]
            }) : new TableCell({
              width: { size: 14, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              borders: t2CellBorders(true, false),
              children: []
            });

            const gestorTopicCell = (gestorSpans && !isFirst) ? new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              borders: t2CellBorders(false, false),
              children: []
            }) : new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              verticalMerge: (gestorSpans && isFirst) ? 'restart' : undefined,
              borders: t2CellBorders(false, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: (gestorSpans ? gTopics[0]?.topic : g?.topic) || '-', font: REPORT_DOC_FONT, size: 20 })] })]
            });

            const cacsTopicCell = new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              borders: t2CellBorders(false, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: c ? c.topic : '-', font: REPORT_DOC_FONT, size: 20 })] })]
            });

            const gestorHourCell = (gestorSpans && !isFirst) ? new TableCell({
              width: { size: 15, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              borders: t2CellBorders(false, false),
              children: []
            }) : new TableCell({
              width: { size: 15, type: WidthType.PERCENTAGE },
              verticalMerge: (gestorSpans && isFirst) ? 'restart' : undefined,
              borders: t2CellBorders(false, false),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: (gestorSpans ? String(gTopics[0]?.hours || 3).replace('.', ',') : (g ? String(g.hours).replace('.', ',') : '-')), font: REPORT_DOC_FONT, size: 20 })] })]
            });

            const cacsHourCell = new TableCell({
              width: { size: 15, type: WidthType.PERCENTAGE },
              borders: t2CellBorders(false, true),
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: c ? String(c.hours).replace('.', ',') : '-', font: REPORT_DOC_FONT, size: 20 })] })]
            });

            modRows.push(
              new TableRow({
                cantSplit: true,
                children: [modCell, gestorTopicCell, cacsTopicCell, gestorHourCell, cacsHourCell]
              })
            );
          }
        }
      });

      docChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
            insideHorizontal: noBorder, insideVertical: noBorder
          },
          rows: modRows
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 180 },
          keepLines: true,
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', font: REPORT_DOC_FONT, size: 20, color: '000000' })]
        })
      );

      // 4. SEÇÃO 3: CONTATO COM OS MUNICÍPIOS & TABELA 3 (MODELO OFICIAL DE REFERÊNCIA)
      const tab3Sorted = [...(training.municipalities || [])].sort((a, b) =>
        (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' })
      );
      const tab3Half = Math.ceil(tab3Sorted.length / 2);
      const tab3Left = tab3Sorted.slice(0, tab3Half);
      const tab3Right = tab3Sorted.slice(tab3Half);

      const convocationStartDateFormatted = training.convocationStartDateFormatted || training.contactStartDateFormatted || (training.contactsData?.startDate ? new Date(training.contactsData.startDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'data do início das convocações');

      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_contato',
                  children: [new TextRun({ text: '3. CONTATO COM OS MUNICÍPIOS', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: '3. CONTATO COM OS MUNICÍPIOS', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: `O contato com os municípios, previamente selecionados, se deu a partir de ${convocationStartDateFormatted}, mediante o encaminhamento de ofício por parte da Coordenação-Geral da Política do Transporte Escolar (CGPTE) do FNDE, tanto para os contatos das secretarias municipais de educação, como para os contatos dos CACS (Apêndice I). Neste e-mail, continha as informações essenciais para compreender o objetivo do curso, instruções necessárias para inscrições, e o formulário para a realizar as inscrições por meio de link ou QR Code correspondente.`
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'A equipe do CECATE-CO realizou um novo encaminhamento (Apêndice II), usando informações das prefeituras e das secretarias de educação dos municípios, disponíveis nos sites oficiais das entidades. Com isso, foi realizado um novo contato, por e-mail e por telefone, sendo parcialmente exitoso (com alguns municípios não foi possível o contato).'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: `Ao final do processo, houve um total de ${metrics?.totalInscribed || 0} pessoas inscritas, ${metrics?.totalInscribedGestores || 0} gestores municipais e ${metrics?.totalInscribedCACS || 0} representantes dos CACS/FUNDEB. Cabe destacar que ${metrics?.totalInscribedMunicipalities || 0} municípios tiveram representantes inscritos, dos quais ${metrics?.bothCategoriesInscribedMunicipalities != null ? String(metrics.bothCategoriesInscribedMunicipalities).padStart(2, '0') : '05'} tiveram pelo menos um inscrito em cada uma das categorias (CACS e Gestores). Os detalhes por município podem ser analisados na Tabela 3.`
            })
          ]
        }),
        new Paragraph({
          style: 'Caption',
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 120 },
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark && SimpleField
              ? new Bookmark({
                  id: 'tab_3',
                  children: [
                    new TextRun({ text: 'Tabela ', font: REPORT_DOC_FONT, size: 22, color: '000000' }),
                    new SimpleField('SEQ Tabela \\* ARABIC', '3'),
                    new TextRun({ text: '. Inscritos por município.', font: REPORT_DOC_FONT, size: 22, color: '000000' })
                  ]
                })
              : new TextRun({ text: 'Tabela 3. Inscritos por município.', font: REPORT_DOC_FONT, size: 22, color: '000000' })
          ]
        })
      );

      const tab3Rows = [
        // Linha 0 do Cabeçalho
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: [
            // Bloco Esquerdo
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Código IBGE', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Nome do Município', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              columnSpan: 3,
              width: { size: 18, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Número de Inscritos', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            // Espaçador Central
            new TableCell({
              width: { size: 2, type: WidthType.PERCENTAGE },
              borders: spacerBorders,
              children: [new Paragraph({ keepNext: true, keepLines: true, children: [] })]
            }),
            // Bloco Direito
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Código IBGE', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Nome do Município', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              columnSpan: 3,
              width: { size: 18, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Número de Inscritos', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            })
          ]
        }),
        // Linha 1 do Cabeçalho
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: [
            // Bloco Esquerdo (vMerge continues)
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'CACS', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Gestor', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Total', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            // Espaçador Central
            new TableCell({
              width: { size: 2, type: WidthType.PERCENTAGE },
              borders: spacerBorders,
              children: []
            }),
            // Bloco Direito (vMerge continues)
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'CACS', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Gestor', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Total', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            })
          ]
        })
      ];

      // Linhas de Dados da Tabela 3
      for (let i = 0; i < tab3Half; i++) {
        const leftM = tab3Left[i];
        const rightM = tab3Right[i] || null;

        const leftCacs = String(leftM.inscribedCACS || 0);
        const leftGestor = String(leftM.inscribedGestores || 0);
        const leftTotal = String(leftM.inscribedTotal || ((parseInt(leftM.inscribedCACS) || 0) + (parseInt(leftM.inscribedGestores) || 0)));

        const rightCacs = rightM ? String(rightM.inscribedCACS || 0) : '';
        const rightGestor = rightM ? String(rightM.inscribedGestores || 0) : '';
        const rightTotal = rightM ? String(rightM.inscribedTotal || ((parseInt(rightM.inscribedCACS) || 0) + (parseInt(rightM.inscribedGestores) || 0))) : '';

        tab3Rows.push(
          new TableRow({
            cantSplit: true,
            children: [
              // Bloco Esquerdo
              new TableCell({
                width: { size: 9, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: String(leftM.ibgeCode || '-'), font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 22, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: true, keepLines: true, children: [new TextRun({ text: leftM.name || '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: leftCacs, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: leftGestor, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: leftTotal, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              // Espaçador Central
              new TableCell({
                width: { size: 2, type: WidthType.PERCENTAGE },
                borders: spacerBorders,
                children: [new Paragraph({ keepNext: true, keepLines: true, children: [] })]
              }),
              // Bloco Direito
              new TableCell({
                width: { size: 9, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightM ? String(rightM.ibgeCode || '-') : '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 22, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: true, keepLines: true, children: [new TextRun({ text: rightM ? (rightM.name || '') : '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightCacs, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightGestor, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightTotal, font: REPORT_DOC_FONT, size: 20 })] })]
              })
            ]
          })
        );
      }

      // Linhas de Rodapé da Tabela 3 (conforme modelo oficial da referência 16CTE)
      const tab3FooterBorderTop = { top: singleBorder, bottom: noBorder, left: noBorder, right: noBorder };
      const tab3FooterBorderBottom = { top: noBorder, bottom: singleBorder, left: noBorder, right: noBorder };

      // Cada total ocupa a largura inteira da tabela, com texto justificado: "Rótulo: valor"
      const tab3FooterRow = (text, borders) => new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            columnSpan: 11,
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders,
            verticalAlign: VerticalAlign.CENTER,
            margins: { left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.JUSTIFIED, keepNext: true, keepLines: true, children: [new TextRun({ text, font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
          })
        ]
      });
      tab3Rows.push(
        tab3FooterRow(`Total de municípios com inscritos: ${metrics?.totalInscribedMunicipalities || 0}`, tab3FooterBorderTop),
        tab3FooterRow(`Total de pessoas: ${metrics?.totalInscribed || 0} (${metrics?.totalInscribedCACS || 0} CACS e ${metrics?.totalInscribedGestores || 0} Gestores)`, tab3FooterBorderBottom)
      );

      docChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
            insideHorizontal: noBorder, insideVertical: noBorder
          },
          rows: tab3Rows
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 180 },
          keepLines: true,
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', font: REPORT_DOC_FONT, size: 20, color: '000000' })]
        })
      );

      // 5. SEÇÃO 4: DESENVOLVIMENTO DO CURSO & TABELA 4 & FIGURA 3
      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_desenv',
                  children: [new TextRun({ text: '4. DESENVOLVIMENTO DO CURSO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: '4. DESENVOLVIMENTO DO CURSO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Conforme estruturado na matriz formativa, o curso foi planejado e executado em quatro (04) módulos sequenciais, cumprindo rigorosamente os seguintes momentos pedagógicos:'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Primeiro momento: ', bold: true }),
            new TextRun({ text: 'acolhimento dos participantes com credenciamento e entrega de material didático (pastas com caderno de anotações e caneta institucional), seguido de momento de integração com coffee break.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Segundo momento: ', bold: true }),
            new TextRun({ text: 'abertura oficial com pronunciamento da coordenação do CECATE Centro-Oeste e dos representantes da Coordenação-Geral da Política do Transporte Escolar (CGPTE/FNDE), apresentando a contextualização do projeto e as metas de aprimoramento da gestão pública.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Terceiro momento: ', bold: true }),
            new TextRun({ text: 'espaço aberto para a apresentação individual de todos os presentes, promovendo a integração entre gestores municipais, conselheiros sociais do CACS-FUNDEB e as equipes executoras da UFG e do FNDE.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Quarto momento: ', bold: true }),
            new TextRun({ text: 'apresentação do Módulo 1, com o panorama histórico e situacional do Transporte Escolar no Brasil, os estudos desenvolvidos em parceria entre FNDE e instituições de ensino superior e a missão do CECATE-CO, sensibilizando para os desafios locais e trocas de experiências.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Quinto momento: ', bold: true }),
            new TextRun({ text: 'exposição detalhada do Módulo 2, abordando os programas federais estruturantes: o Programa Nacional de Apoio ao Transporte do Escolar (PNATE) e o Programa Caminho da Escola, explicitando normas operacionais, critérios de repasse financeiro e prestação de contas.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Sexto momento: ', bold: true }),
            new TextRun({ text: 'desenvolvimento do Módulo 3, com foco em aspectos de planejamento territorial, contratação de serviços, controle de custos, segurança viária e marcos regulatórios essenciais para assegurar a regularidade e eficiência do transporte escolar.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Sétimo momento: ', bold: true }),
            new TextRun({ text: 'execução do Módulo 4 de forma segmentada por público-alvo. Para os conselheiros do CACS/FUNDEB, detalharam-se os procedimentos fiscalizatórios, análise documental e utilização analítica do SETE para acompanhamento de rotas. Para os gestores municipais, realizou-se treinamento prático intensivo no Sistema SETE ("mãos na massa"), capacitando os servidores no cadastramento de alunos, escolas, veículos, motoristas e roteirização georreferenciada.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({ text: 'Oitavo momento: ', bold: true }),
            new TextRun({ text: 'aplicação do instrumento avaliativo da capacitação, coletando percepções técnicas e qualitativas dos participantes sobre metodologia, facilitadores, infraestrutura e conteúdos trabalhados.' })
          ]
        })
      );

      // Texto descritivo das Tecnologias Educacionais (editável pelo usuário no Wizard)
      const eduTech = training.educationalTech || {};
      const eduText = (eduTech.text && eduTech.text.trim()) ? eduTech.text.trim() :
        'Durante o transcorrer dos módulos teóricos e práticos, foram incorporadas dinâmicas interativas mediante o uso de tecnologias educacionais e plataformas de aprendizagem baseada em jogos, com a finalidade de acompanhar o nível de assimilação dos conteúdos e potencializar o engajamento coletivo. Foram empregados os aplicativos Kahoot e Plickers: o Kahoot permitiu a participação em tempo real por meio dos smartphones dos cursistas em questionários dinâmicos; já o Plickers viabilizou a coleta imediata de respostas mediante a leitura óptica de cartões com QR Code (alternativas A, B, C e D) realizada exclusivamente pelo celular do instrutor, contornando eventuais oscilações de sinal de internet e garantindo dinamismo à atividade.';

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: eduText
            })
          ]
        })
      );

      // Figuras de Tecnologias Educacionais (Kahoot e Plickers - Padrão ABNT: Legenda acima, Fonte abaixo)
      // Figuras removidas pelo usuário não entram no relatório (resolveEduTechFigure retorna null)
      const fig1 = this.resolveEduTechFigure(training, 'fig_1');
      if (fig1) {
        const fig1Nodes = this.createFigureWithCaptionAbove(
          fig1.image,
          520,
          270,
          this.applyFigureNumber(fig1.caption, figNums.fig_1),
          fig1.source,
          docxDeps,
          'fig_1'
        );
        docChildren.push(...fig1Nodes);
      }

      const fig2 = this.resolveEduTechFigure(training, 'fig_2');
      if (fig2) {
        const fig2Nodes = this.createFigureWithCaptionAbove(
          fig2.image,
          520,
          270,
          this.applyFigureNumber(fig2.caption, figNums.fig_2),
          fig2.source,
          docxDeps,
          'fig_2'
        );
        docChildren.push(...fig2Nodes);
      }

      // Figuras adicionais se houver
      (eduTech.extraFigures || []).forEach((ef, idx) => {
        if (ef && ef.image) {
          const efNodes = this.createFigureWithCaptionAbove(
            ef.image,
            520,
            270,
            this.applyFigureNumber(ef.caption || `Avaliação via ${ef.title || 'ferramenta educacional'}.`, figNums[`edu_${ef.id}`]),
            ef.source || 'Fonte: Elaborada pelos autores.',
            docxDeps,
            `fig_extra_${idx}`
          );
          docChildren.push(...efNodes);
        }
      });

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: `A participação dos municípios registrou ${metrics?.totalPresentMunicipalities || 0} municípios presentes dos ${metrics?.totalInscribedMunicipalities || metrics?.totalSummonedMunicipalities || 0} inscritos (${metrics?.participationRateMunicipalities || 0}%). Ressalta-se que ${metrics?.bothCategoriesPresentMunicipalities != null ? String(metrics.bothCategoriesPresentMunicipalities).padStart(2, '0') : '06'} municípios levaram representantes tanto do CACS-FUNDEB como da Gestão, enquanto, ${metrics?.onlyGestoresPresentMunicipalities != null ? String(metrics.onlyGestoresPresentMunicipalities).padStart(2, '0') : '03'} municípios levaram só gestores e ${metrics?.onlyCACSPresentMunicipalities === 1 ? 'um único município foi representado só pelo CACS-FUNDEB' : (metrics?.onlyCACSPresentMunicipalities > 0 ? `${metrics.onlyCACSPresentMunicipalities} municípios foram representados só pelo CACS-FUNDEB` : 'nenhum município foi representado exclusivamente por conselheiros CACS')}. Com relação ao número de pessoas que participaram, registraram-se ${metrics?.totalPresent || 0} participantes dentre os ${metrics?.totalInscribed || 0} inscritos (taxa de participação global de ${metrics?.participationRateGeneral || 0}%), sendo ${metrics?.presentCACS || 0} conselheiros do CACS-FUNDEB (${metrics?.participationRateCACS || 0}%) e ${metrics?.presentGestores || 0} gestores municipais (${metrics?.participationRateGestores || 0}%). Os detalhes dos resultados são apresentados na Tabela 4.`
            })
          ]
        }),
        new Paragraph({
          style: 'Caption',
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 120 },
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark && SimpleField
              ? new Bookmark({
                  id: 'tab_4',
                  children: [
                    new TextRun({ text: 'Tabela ', font: REPORT_DOC_FONT, size: 22, color: '000000' }),
                    new SimpleField('SEQ Tabela \\* ARABIC', '4'),
                    new TextRun({ text: '. Participação por município.', font: REPORT_DOC_FONT, size: 22, color: '000000' })
                  ]
                })
              : new TextRun({ text: 'Tabela 4. Participação por município.', font: REPORT_DOC_FONT, size: 22, color: '000000' })
          ]
        })
      );

      // Tabela 4 - Modelo Oficial de Referência (Lado a Lado, 11 colunas)
      const tab4Sorted = [...(training.municipalities || [])].sort((a, b) =>
        (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' })
      );
      const tab4Half = Math.ceil(tab4Sorted.length / 2);
      const tab4Left = tab4Sorted.slice(0, tab4Half);
      const tab4Right = tab4Sorted.slice(tab4Half);

      const tab4Rows = [
        // Linha 0 do Cabeçalho
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: [
            // Bloco Esquerdo
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Código IBGE', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Nome do Município', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              columnSpan: 3,
              width: { size: 18, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Número de Participantes', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            // Espaçador Central
            new TableCell({
              width: { size: 2, type: WidthType.PERCENTAGE },
              borders: spacerBorders,
              children: [new Paragraph({ keepNext: true, keepLines: true, children: [] })]
            }),
            // Bloco Direito
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Código IBGE', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'restart',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Nome do Município', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              columnSpan: 3,
              width: { size: 18, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Número de Participantes', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            })
          ]
        }),
        // Linha 1 do Cabeçalho
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: [
            // Bloco Esquerdo (vMerge continues)
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'CACS', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Gestor', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Total', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            // Espaçador Central
            new TableCell({
              width: { size: 2, type: WidthType.PERCENTAGE },
              borders: spacerBorders,
              children: []
            }),
            // Bloco Direito (vMerge continues)
            new TableCell({
              width: { size: 9, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 22, type: WidthType.PERCENTAGE },
              verticalMerge: 'continue',
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              children: []
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'CACS', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Gestor', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            }),
            new TableCell({
              width: { size: 6, type: WidthType.PERCENTAGE },
              shading: tableHeaderShading,
              borders: abntHeaderBorders,
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Total', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
            })
          ]
        })
      ];

      // Linhas de Dados da Tabela 4: somente participantes presentes (os inscritos ficam na Tabela 3)
      for (let i = 0; i < tab4Half; i++) {
        const leftM = tab4Left[i];
        const rightM = tab4Right[i] || null;

        const leftC = String(leftM.presentCACS || 0);
        const leftG = String(leftM.presentGestores || 0);
        const leftT = String(leftM.presentTotal || ((parseInt(leftM.presentCACS) || 0) + (parseInt(leftM.presentGestores) || 0)));

        const rightC = rightM ? String(rightM.presentCACS || 0) : '';
        const rightG = rightM ? String(rightM.presentGestores || 0) : '';
        const rightT = rightM ? String(rightM.presentTotal || ((parseInt(rightM.presentCACS) || 0) + (parseInt(rightM.presentGestores) || 0))) : '';

        tab4Rows.push(
          new TableRow({
            cantSplit: true,
            children: [
              // Bloco Esquerdo
              new TableCell({
                width: { size: 9, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: String(leftM.ibgeCode || '-'), font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 22, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: true, keepLines: true, children: [new TextRun({ text: leftM.name || '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: leftC, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: leftG, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: leftT, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              // Espaçador Central
              new TableCell({
                width: { size: 2, type: WidthType.PERCENTAGE },
                borders: spacerBorders,
                children: [new Paragraph({ keepNext: true, keepLines: true, children: [] })]
              }),
              // Bloco Direito
              new TableCell({
                width: { size: 9, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightM ? String(rightM.ibgeCode || '-') : '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 22, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: true, keepLines: true, children: [new TextRun({ text: rightM ? (rightM.name || '') : '', font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightC, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightG, font: REPORT_DOC_FONT, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 6, type: WidthType.PERCENTAGE },
                borders: abntDataBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: rightT, font: REPORT_DOC_FONT, size: 20 })] })]
              })
            ]
          })
        );
      }

      // Linhas de Rodapé da Tabela 4 (conforme modelo oficial da referência 16CTE)
      // Cada total ocupa a largura inteira da tabela, com texto justificado: "Rótulo: valor"
      const tab4FooterRow = (text, borders) => new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            columnSpan: 11,
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders,
            verticalAlign: VerticalAlign.CENTER,
            margins: { left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.JUSTIFIED, keepNext: true, keepLines: true, children: [new TextRun({ text, font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
          })
        ]
      });
      tab4Rows.push(
        tab4FooterRow(`Total de municípios presentes: ${metrics?.totalPresentMunicipalities || 0}`, tab3FooterBorderTop),
        tab4FooterRow(`Total de pessoas presentes: ${metrics?.totalPresent || 0} (${metrics?.totalPresentCACS || 0} CACS e ${metrics?.totalPresentGestores || 0} Gestores)`, tab3FooterBorderBottom)
      );

      docChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
            insideHorizontal: noBorder, insideVertical: noBorder
          },
          rows: tab4Rows
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 180 },
          keepLines: true,
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', font: REPORT_DOC_FONT, size: 20, color: '000000' })]
        })
      );

      // Parágrafo sobre certificados na plataforma PLATEIA (Fim da Seção 4)
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Ao término das atividades formativas, todos os certificados oficiais de capacitação (carga horária de 08 horas) foram devidamente emitidos e remetidos para o e-mail cadastrado de cada participante por intermédio da plataforma PLATEIA da Universidade Federal de Goiás (UFG), contando com código de verificação digital e QR Code para autenticação de veracidade.'
            })
          ]
        })
      );

      // 6. SEÇÃO 5: AVALIAÇÃO DA CAPACITAÇÃO & FIGURAS 3, 4, 5, 6, 7 E 8
      const totalResp = metrics?.evalStatsGeneral?.totalResponses || 0;
      const evalsArr = training?.evaluations || [];
      let cacsRespCount = 0;
      if (evalsArr.length > 0) {
        cacsRespCount = evalsArr.filter(e => String(e.representation || '').toUpperCase().includes('CACS')).length;
      } else if (metrics?.totalPresent > 0) {
        cacsRespCount = metrics.totalPresentCACS || 0;
      }
      const gestRespCount = totalResp > 0 ? (totalResp - cacsRespCount) : 0;
      const pctCacsResp = totalResp > 0 ? ((cacsRespCount / totalResp) * 100).toFixed(1).replace('.', ',') : '0,0';
      const pctGestResp = totalResp > 0 ? ((gestRespCount / totalResp) * 100).toFixed(1).replace('.', ',') : '0,0';
      const overallMean = metrics?.evalStatsGeneral?.overallMean ? parseFloat(metrics.evalStatsGeneral.overallMean).toFixed(1).replace('.', ',') : '4,7';

      const fig4Comment = renumberRefs((training.evaluationComments && training.evaluationComments.fig4) ||
                          (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig4', training) : ''));
      const fig5Comment = renumberRefs((training.evaluationComments && training.evaluationComments.fig5) ||
                          (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig5', training) : ''));
      const fig6Comment = renumberRefs((training.evaluationComments && training.evaluationComments.fig6) ||
                          (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig6', training) : ''));
      const fig7Comment = renumberRefs((training.evaluationComments && training.evaluationComments.fig7) ||
                          (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig7', training) : ''));
      const fig8Comment = renumberRefs((training.evaluationComments && training.evaluationComments.fig8) ||
                          (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig8', training) : ''));

      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_avaliacao',
                  children: [new TextRun({ text: '5. AVALIAÇÃO DA CAPACITAÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: '5. AVALIAÇÃO DA CAPACITAÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Nesta edição do curso, aplicou-se o formulário padronizado de avaliação proposto pela equipe técnica do FNDE, que coleta percepções estruturadas dos cursistas. O instrumento é dividido em duas abordagens: primeiramente, uma escala psicométrica de Likert com cinco níveis qualitativos de percepção (1 - Ruim, 2 - Regular, 3 - Neutro, 4 - Muito Bom e 5 - Excelente) para avaliar os aspectos didáticos, pedagógicos, operacionais e de infraestrutura do evento; em seguida, duas perguntas dissertativas qualitativas, nas quais os participantes detalham livremente os aspectos que mais gostaram e os pontos com oportunidade de melhoria com base na experiência vivenciada.'
            })
          ]
        })
      );

      // Figura 3: Gráfico de Participação (Tópico 5)
      // docxDeps já inicializado no topo do método generateAndDownload
      if (chartsData.fig3) {
        const fig3Comment = renumberRefs((training.evaluationComments && training.evaluationComments.fig3) ||
                            (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig3', training) : ''));
        if (fig3Comment) {
          docChildren.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
              children: [new TextRun({ text: fig3Comment, font: REPORT_DOC_FONT, size: 22 })]
            })
          );
        }
        const fig3Nodes = this.createImageParagraph(chartsData.fig3, 480, 240, this.applyFigureNumber('Figura 3. Participação segundo o tipo de representação.', figNums.fig_3), docxDeps, 'fig_3');
        if (fig3Nodes) docChildren.push(...fig3Nodes);
      }

      // FIGURA 4
      if (fig4Comment) {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: fig4Comment, font: REPORT_DOC_FONT, size: 22 })]
          })
        );
      }
      if (chartsData.fig4) {
        const fig4Nodes = this.createImageParagraph(chartsData.fig4, 630, 300, this.applyFigureNumber('Figura 4. Avaliação da capacitação de todos os participantes.', figNums.fig_4), docxDeps, 'fig_4');
        if (fig4Nodes) docChildren.push(...fig4Nodes);
      }

      // FIGURA 5
      if (fig5Comment) {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: fig5Comment, font: REPORT_DOC_FONT, size: 22 })]
          })
        );
      }
      if (chartsData.fig5) {
        const fig5Nodes = this.createImageParagraph(chartsData.fig5, 630, 300, this.applyFigureNumber('Figura 5. Avaliação da capacitação dos conselheiros CACS.', figNums.fig_5), docxDeps, 'fig_5');
        if (fig5Nodes) docChildren.push(...fig5Nodes);
      }

      // FIGURA 6
      if (fig6Comment) {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: fig6Comment, font: REPORT_DOC_FONT, size: 22 })]
          })
        );
      }
      if (chartsData.fig6) {
        const fig6Nodes = this.createImageParagraph(chartsData.fig6, 630, 300, this.applyFigureNumber('Figura 6. Avaliação da capacitação dos gestores municipais.', figNums.fig_6), docxDeps, 'fig_6');
        if (fig6Nodes) docChildren.push(...fig6Nodes);
      }

      // FIGURA 7
      if (fig7Comment) {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: fig7Comment, font: REPORT_DOC_FONT, size: 22 })]
          })
        );
      }
      if (chartsData.fig7) {
        const fig7TitleRaw = (training.customWordCloudTitles && training.customWordCloudTitles.fig7)
          ? training.customWordCloudTitles.fig7.trim()
          : 'Aspectos que gostaram da capacitação.';
        const fig7Title = this.applyFigureNumber(fig7TitleRaw, figNums.fig_7);
        const fig7SourceRaw = (training.customWordCloudSources && training.customWordCloudSources.fig7)
          ? training.customWordCloudSources.fig7.trim()
          : 'Elaborada pelos autores.';
        const fig7Source = fig7SourceRaw.toLowerCase().startsWith('fonte:')
          ? fig7SourceRaw
          : `Fonte: ${fig7SourceRaw}${/[.!?]$/.test(fig7SourceRaw) ? '' : '.'}`;
        const fig7Nodes = this.createImageParagraph(chartsData.fig7, 480, 260, fig7Title, docxDeps, 'fig_7', fig7Source);
        if (fig7Nodes) docChildren.push(...fig7Nodes);
      }

      // FIGURA 8
      if (fig8Comment) {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: fig8Comment, font: REPORT_DOC_FONT, size: 22 })]
          })
        );
      }
      if (chartsData.fig8) {
        const fig8TitleRaw = (training.customWordCloudTitles && training.customWordCloudTitles.fig8)
          ? training.customWordCloudTitles.fig8.trim()
          : 'Aspectos que devem melhorar da capacitação.';
        const fig8Title = this.applyFigureNumber(fig8TitleRaw, figNums.fig_8);
        const fig8SourceRaw = (training.customWordCloudSources && training.customWordCloudSources.fig8)
          ? training.customWordCloudSources.fig8.trim()
          : 'Elaborada pelos autores.';
        const fig8Source = fig8SourceRaw.toLowerCase().startsWith('fonte:')
          ? fig8SourceRaw
          : `Fonte: ${fig8SourceRaw}${/[.!?]$/.test(fig8SourceRaw) ? '' : '.'}`;
        const fig8Nodes = this.createImageParagraph(chartsData.fig8, 480, 260, fig8Title, docxDeps, 'fig_8', fig8Source);
        if (fig8Nodes) docChildren.push(...fig8Nodes);
      }

      // 7. SEÇÃO 6: REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO
      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_fotos',
                  children: [new TextRun({ text: '6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: '6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Durante a realização da capacitação, foram registrados diversos momentos por meio de fotografias que ilustram a participação ativa dos representantes municipais e dos conselheiros do CACS-FUNDEB. As imagens capturam desde a ambientação do local, momentos de acolhimento e fala dos facilitadores, até as interações e práticas colaborativas durante as atividades formativas. Esses registros visuais não apenas documentam o evento, como também reforçam o compromisso institucional dos envolvidos com o contínuo aprimoramento da política de transporte escolar nos municípios. As fotografias servem como evidência do engajamento coletivo, memória institucional e prestação de contas das ações desenvolvidas perante o FNDE:'
            })
          ]
        })
      );

      const photos = this.getOrderedPhotos(training);
      if (photos.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: 'Nenhum registro fotográfico anexado no momento.', italics: true, color: '64748B' })]
          })
        );
      } else {
        photos.forEach((ph, idx) => {
          const caption = this.applyFigureNumber(ph.caption || 'Registro fotográfico oficial da capacitação.', figNums[this.getPhotoFigureKey(ph)]);
          const customSource = (training.customPhotoSources && ph.slotId && training.customPhotoSources[ph.slotId])
            ? (training.customPhotoSources[ph.slotId].toLowerCase().startsWith('fonte:')
                ? training.customPhotoSources[ph.slotId].trim()
                : `Fonte: ${training.customPhotoSources[ph.slotId].trim()}${/[.!?]$/.test(training.customPhotoSources[ph.slotId].trim()) ? '' : '.'}`)
            : (ph.customSource
                ? (ph.customSource.toLowerCase().startsWith('fonte:')
                    ? ph.customSource.trim()
                    : `Fonte: ${ph.customSource.trim()}${/[.!?]$/.test(ph.customSource.trim()) ? '' : '.'}`)
                : null);
          const source = ph.source || customSource || 'Fonte: Elaborada pelos autores.';
          const photoNodes = this.createImageParagraph(ph.blob, 500, 300, caption, docxDeps, `fig_photo_${idx}`, source);
          if (photoNodes) docChildren.push(...photoNodes);
        });
      }

      // 8. SEÇÃO 7: CONSIDERAÇÕES FINAIS
      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_consideracoes',
                  children: [new TextRun({ text: '7. CONSIDERAÇÕES FINAIS', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: '7. CONSIDERAÇÕES FINAIS', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: `O presente relatório consubstanciou a execução técnica, operacional e pedagógica do ${ordinalNum ? `${ordinalNum} ` : ''}curso de Capacitação em Transporte Escolar (Capacitação nº ${rawNum || '16'}), realizado no polo regional de ${training.polo || 'Município Polo'}, Estado de ${ufName}, cumprindo integralmente as metas e diretrizes estabelecidas no âmbito do projeto `
            }),
            new TextRun({
              text: `"${(training.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL').toUpperCase()}"`,
              italics: true
            }),
            new TextRun({
              text: ` (Processo nº 23070.068031/2023-34), financiado pelo Fundo Nacional de Desenvolvimento da Educação (FNDE).`
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Salienta-se que, de forma geral, o curso atendeu plenamente ao objetivo primordial de aprimorar os conhecimentos e habilidades técnicas de gestores municipais e conselheiros do CACS-FUNDEB, conforme atestado nos elevados índices de satisfação apurados na pesquisa avaliativa. Por outro lado, pôde-se comprovar que reforçar a convocação mediante a articulação multicanal do CECATE Centro-Oeste — combinando correspondências oficiais, contatos telefônicos diretos e mensagens em canais institucionais — revelou-se determinante para assegurar expressivo comparecimento dos entes federados convocados.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Ficou igualmente evidente que a abordagem de diálogo permanente adotada consolida-se como canal imprescindível para atender às demandas de qualificação técnica continuada. Para finalizar, ressalta-se a suma importância de o processo formativo estar inserido em um ambiente que possibilite a livre e qualificada interação entre os cursistas e os formadores, proporcionando um rico espaço de compartilhamento de vivências territoriais, esclarecimento de dúvidas operacionais e retroalimentação contínua de todas as dimensões da política de transporte escolar no Brasil.'
            })
          ]
        })
      );

      // APÊNDICES I E II
      const fndeDocs = (training.media || []).filter(m => m.type === 'doc_fnde');
      const cecateDocs = (training.media || []).filter(m => m.type === 'doc_cecate');

      // APÊNDICE I: CONVOCAÇÕES DO FNDE
      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          pageBreakBefore: true,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_apendice_1',
                  children: [new TextRun({ text: 'APÊNDICE I – CONVOCAÇÕES DO FNDE', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: 'APÊNDICE I – CONVOCAÇÕES DO FNDE', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        })
      );

      if (fndeDocs.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: 'Nenhum documento de convocação do FNDE anexado.', italics: true, color: '64748B' })]
          })
        );
      } else {
        fndeDocs.forEach((d) => {
          const pages = (d.pageImages && d.pageImages.length > 0) ? d.pageImages : (d.blob?.startsWith('data:image/') ? [d.blob] : []);
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              keepNext: true,
              keepLines: true,
              children: [
                new TextRun({ text: `Documento: ${d.fileName || d.caption || 'Ofício de Convocação FNDE'}`, bold: true, size: 22, color: '0F172A' })
              ]
            })
          );
          if (pages.length > 0) {
            pages.forEach((pgImg, pgIdx) => {
              const docName = d.fileName || 'Documento anexado';
              const cap = pages.length > 1 ? `${docName} - Página ${pgIdx + 1}` : docName;
              const imgNodes = this.createImageParagraph(pgImg, 500, 700, cap, docxDeps, null, 'Fonte: FNDE.');
              if (imgNodes) docChildren.push(...imgNodes);
            });
          } else {
            docChildren.push(
              new Paragraph({
                spacing: { after: 150 },
                children: [new TextRun({ text: `Arquivo anexado: ${d.fileName}`, italics: true, color: '475569' })]
              })
            );
          }
        });
      }

      // APÊNDICE II: CONVOCAÇÕES DO CECATE
      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          pageBreakBefore: true,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_apendice_2',
                  children: [new TextRun({ text: 'APÊNDICE II – CONVOCAÇÕES DO CECATE', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: 'APÊNDICE II – CONVOCAÇÕES DO CECATE', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        })
      );

      if (cecateDocs.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
            children: [new TextRun({ text: 'Nenhuma convocação do CECATE anexada.', italics: true, color: '64748B' })]
          })
        );
      } else {
        cecateDocs.forEach((d) => {
          const pages = (d.pageImages && d.pageImages.length > 0) ? d.pageImages : (d.blob?.startsWith('data:image/') ? [d.blob] : []);
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              keepNext: true,
              keepLines: true,
              children: [
                new TextRun({ text: `Documento: ${d.fileName || d.caption || 'Convocação CECATE-CO'}`, bold: true, size: 22, color: '0F172A' })
              ]
            })
          );
          if (pages.length > 0) {
            pages.forEach((pgImg, pgIdx) => {
              const docName = d.fileName || 'Documento anexado';
              const cap = pages.length > 1 ? `${docName} - Página ${pgIdx + 1}` : docName;
              const imgNodes = this.createImageParagraph(pgImg, 500, 700, cap, docxDeps, null, 'Fonte: CECATE-CO.');
              if (imgNodes) docChildren.push(...imgNodes);
            });
          } else {
            docChildren.push(
              new Paragraph({
                spacing: { after: 150 },
                children: [new TextRun({ text: `Arquivo anexado: ${d.fileName}`, italics: true, color: '475569' })]
              })
            );
          }
        });
      }

      // APÊNDICE III: RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO
      docChildren.push(
        new Paragraph({
          spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
          heading: HeadingLevel.HEADING_1,
          outlineLevel: 0,
          pageBreakBefore: true,
          keepNext: true,
          keepLines: true,
          children: [
            Bookmark
              ? new Bookmark({
                  id: 'sec_apendice_3',
                  children: [new TextRun({ text: 'APÊNDICE III – RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })]
                })
              : new TextRun({ text: 'APÊNDICE III – RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO', font: REPORT_DOC_FONT, bold: true, size: 32, color: '000000' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 120, after: 0, line: 360, lineRule: LineRuleType.AUTO },
          children: [
            new TextRun({
              text: 'Apresenta-se a seguir a transcrição completa das respostas dissertativas registradas pelos participantes no formulário de avaliação da formação, detalhando os aspectos mais elogiados e as sugestões de aperfeiçoamento por município e categoria de representação institucional:'
            })
          ]
        })
      );

      const evalRespList = (training.evaluations || []).filter(e => 
        (e.likedAspects && String(e.likedAspects).trim()) || (e.improveAspects && String(e.improveAspects).trim())
      );

      if (evalRespList.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: 'Nenhuma resposta dissertativa registrada no momento.', italics: true, color: '64748B' })]
          })
        );
      } else {
        const ap3Rows = [
          new TableRow({
            tableHeader: true,
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: 15, type: WidthType.PERCENTAGE },
                shading: tableHeaderShading,
                borders: abntHeaderBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Código IBGE', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 22, type: WidthType.PERCENTAGE },
                shading: tableHeaderShading,
                borders: abntHeaderBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Município', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 15, type: WidthType.PERCENTAGE },
                shading: tableHeaderShading,
                borders: abntHeaderBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Representação', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 24, type: WidthType.PERCENTAGE },
                shading: tableHeaderShading,
                borders: abntHeaderBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Aspectos que mais gostou', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
              }),
              new TableCell({
                width: { size: 24, type: WidthType.PERCENTAGE },
                shading: tableHeaderShading,
                borders: abntHeaderBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, keepLines: true, children: [new TextRun({ text: 'Aspectos a serem melhorados', font: REPORT_DOC_FONT, bold: true, size: 20 })] })]
              })
            ]
          })
        ];

        evalRespList.forEach((ev, idx) => {
          const isNotLast = idx < evalRespList.length - 1;
          ap3Rows.push(
            new TableRow({
              cantSplit: true,
              children: [
                new TableCell({
                  borders: abntDataBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: isNotLast && evalRespList.length <= 25, keepLines: true, children: [new TextRun({ text: String(ev.ibgeCode || '-'), font: REPORT_DOC_FONT, size: 20 })] })]
                }),
                new TableCell({
                  borders: abntDataBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: isNotLast && evalRespList.length <= 25, keepLines: true, children: [new TextRun({ text: String(ev.municipality || '-'), font: REPORT_DOC_FONT, size: 20 })] })]
                }),
                new TableCell({
                  borders: abntDataBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: isNotLast && evalRespList.length <= 25, keepLines: true, children: [new TextRun({ text: String(ev.representation || 'Gestão municipal'), font: REPORT_DOC_FONT, size: 20 })] })]
                }),
                new TableCell({
                  borders: abntDataBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: isNotLast && evalRespList.length <= 25, keepLines: true, children: [new TextRun({ text: String(ev.likedAspects || '-'), font: REPORT_DOC_FONT, size: 20 })] })]
                }),
                new TableCell({
                  borders: abntDataBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: isNotLast && evalRespList.length <= 25, keepLines: true, children: [new TextRun({ text: String(ev.improveAspects || '-'), font: REPORT_DOC_FONT, size: 20 })] })]
                })
              ]
            })
          );
        });

        docChildren.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
              insideHorizontal: noBorder, insideVertical: noBorder
            },
            rows: ap3Rows
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 180 },
            keepLines: true,
            children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', font: REPORT_DOC_FONT, size: 20, color: '000000' })]
          })
        );
      }

      // CABEÇALHO OFICIAL PADRÃO (Conforme modelo de referência de 02-Relatórios exemplos)
      // À esquerda: Logo CECATE. À direita: "RELATÓRIO DE ATIVIDADES Nº XX". Borda inferior sólida #4D4D4D.
      const headerTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: 45, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                children: [
                  headerLogoBytes ? new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { before: 0, after: 60 },
                    children: [
                      new ImageRun({
                        data: headerLogoBytes,
                        transformation: { width: 130, height: 27 }
                      })
                    ]
                  }) : new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { before: 0, after: 60 },
                    children: [
                      new TextRun({
                        text: 'CECATE CENTRO-OESTE',
                        font: REPORT_DOC_FONT,
                        bold: true,
                        size: 20,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                width: { size: 55, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 0, after: 60 },
                    children: [
                      new TextRun({
                        text: `RELATÓRIO DE ATIVIDADES Nº ${coverInfo.numPadded}`,
                        font: REPORT_DOC_FONT,
                        size: 20,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      // RODAPÉ OFICIAL PADRÃO - SEÇÃO 3 (Página 3 - Equipe Participante, sem número de página)
      // Linha superior sólida #4D4D4D e faixa de 5 logomarcas institucionais ampliada
      const footerTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: 100, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                margins: { top: 60, bottom: 40, left: 0, right: 0 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 40, after: 20 },
                    children: rodape5LogosBytes ? [
                      new ImageRun({
                        data: rodape5LogosBytes,
                        transformation: { width: 440, height: 27 }
                      })
                    ] : [
                      new TextRun({
                        text: 'CECATE Centro-Oeste • Engenharia de Transportes • FCT • UFG • FNDE',
                        font: REPORT_DOC_FONT,
                        size: 16,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      // RODAPÉ OFICIAL COM NÚMERO DE PÁGINA - SEÇÃO 4 (Página 4+ - Introdução em diante)
      // Conforme modelo de referência: 2 colunas, logomarcas à esquerda com separador vertical e número da página à direita
      const footerTableWithPageNum = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: 95, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' }
                },
                margins: { top: 60, bottom: 40, left: 0, right: 80 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 40, after: 20 },
                    children: rodape5LogosBytes ? [
                      new ImageRun({
                        data: rodape5LogosBytes,
                        transformation: { width: 430, height: 26.5 }
                      })
                    ] : [
                      new TextRun({
                        text: 'CECATE Centro-Oeste • Engenharia de Transportes • FCT • UFG • FNDE',
                        font: REPORT_DOC_FONT,
                        size: 16,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                width: { size: 5, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                margins: { top: 60, bottom: 40, left: 60, right: 0 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 0, after: 0 },
                    children: [
                      new TextRun({
                        children: [PageNumber.CURRENT],
                        font: REPORT_DOC_FONT,
                        size: 20, // 10pt
                        color: '000000'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      // 1.1 MONTAGEM DA CONTRA-CAPA OFICIAL (Seção 2 - Página 2 do Relatório)
      const contraCapaMonthYear = this.formatContraCapaMonthYear(training);

      const contraCapaTopTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '595959' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: noBorders,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 140, after: 40 },
                    children: [
                      new TextRun({
                        text: 'Projeto: ',
                        font: REPORT_DOC_FONT,
                        bold: false,
                        size: 26, // 13pt
                        color: '000000'
                      }),
                      new TextRun({
                        text: 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS',
                        font: REPORT_DOC_FONT,
                        bold: false,
                        size: 24, // 12pt
                        color: '000000'
                      }),
                      new TextRun({
                        text: 'DE TRANSPORTE ESCOLAR DO BRASIL',
                        font: REPORT_DOC_FONT,
                        bold: false,
                        size: 24, // 12pt
                        color: '000000',
                        break: 1
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      const contraCapaNumPara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 8000, after: 120, line: 276, lineRule: LineRuleType.AUTO },
        children: [
          new TextRun({
            text: `Relatório de Atividades Nº ${training.number != null ? String(training.number).trim() : '16'}`,
            font: REPORT_DOC_FONT,
            bold: false,
            size: 28, // 14pt
            color: '000000'
          })
        ]
      });

      const contraCapaTitlePara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 120, line: 276, lineRule: LineRuleType.AUTO },
        children: [
          new TextRun({
            text: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
            font: REPORT_DOC_FONT,
            bold: true,
            size: 36, // 18pt
            color: '000000'
          })
        ]
      });

      const contraCapaInfoPara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 0, line: 276, lineRule: LineRuleType.AUTO },
        children: [
          new TextRun({
            text: coverInfo.infoLine,
            font: REPORT_DOC_FONT,
            bold: true,
            size: 28, // 14pt
            color: '000000'
          })
        ]
      });

      const contraCapaCityPara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 3100, after: 60, line: 240, lineRule: LineRuleType.AUTO },
        children: [
          new TextRun({
            text: 'Aparecida de Goiânia',
            font: REPORT_DOC_FONT,
            bold: false,
            size: 24, // 12pt
            color: '000000'
          })
        ]
      });

      const contraCapaDatePara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 850, line: 240, lineRule: LineRuleType.AUTO },
        children: [
          new TextRun({
            text: contraCapaMonthYear,
            font: REPORT_DOC_FONT,
            bold: false,
            size: 24, // 12pt
            color: '000000'
          })
        ]
      });

      const contraCapaBottomTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '595959' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: 38, type: WidthType.PERCENTAGE },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100, after: 0, line: 240, lineRule: LineRuleType.AUTO },
                    children: cecateBytes ? [
                      new ImageRun({
                        data: cecateBytes,
                        transformation: { width: 175, height: 37 }
                      })
                    ] : []
                  })
                ]
              }),
              new TableCell({
                width: { size: 24, type: WidthType.PERCENTAGE },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100, after: 0, line: 240, lineRule: LineRuleType.AUTO },
                    children: ufgBytes ? [
                      new ImageRun({
                        data: ufgBytes,
                        transformation: { width: 95, height: 37 }
                      })
                    ] : []
                  })
                ]
              }),
              new TableCell({
                width: { size: 38, type: WidthType.PERCENTAGE },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100, after: 0, line: 240, lineRule: LineRuleType.AUTO },
                    children: fndeBytes ? [
                      new ImageRun({
                        data: fndeBytes,
                        transformation: { width: 165, height: 37 }
                      })
                    ] : []
                  })
                ]
              })
            ]
          })
        ]
      });

      // 1.2 MONTAGEM DA PÁGINA 3: EQUIPE PARTICIPANTE (Seção 3 Oficial)
      const equipeChildren = [];

      // Título superior centralizado em preto (#000000)
      equipeChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 360 },
          children: [
            new TextRun({
              text: `RELATÓRIO DE ATIVIDADES Nº ${training.number != null ? String(training.number).trim() : '16'}`,
              font: REPORT_DOC_FONT,
              bold: true,
              size: 36, // 18pt
              color: '000000'
            })
          ]
        })
      );

      // Título EQUIPE PARTICIPANTE
      equipeChildren.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 480, after: 120 },
          children: [
            new TextRun({
              text: 'EQUIPE PARTICIPANTE',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 28, // 14pt
              color: '000000'
            })
          ]
        })
      );

      // Obter lista da equipe
      const teamList = (training.team && training.team.length > 0)
        ? training.team
        : (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || []));

      // Separar UFG e FNDE
      const fndeMembers = teamList.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde'));
      // Cada integrante aparece em um único grupo: quem não é do FNDE fica na equipe da UFG
      const ufgMembers = teamList.filter(m => !fndeMembers.includes(m));

      // 1. Bloco UFG
      if (ufgMembers.length > 0) {
        equipeChildren.push(
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 120, after: 120 },
            indent: { left: 708 },
            children: [
              new TextRun({
                text: 'UNIVERSIDADE FEDERAL DE GOIÁS – UFG',
                font: REPORT_DOC_FONT,
                bold: true,
                size: 24, // 12pt
                color: '000000'
              })
            ]
          })
        );

        const ufgCoords = ufgMembers.filter(m => (m.role && m.role.toLowerCase().includes('coordenador')) || m.type === 'coordenacao');
        const ufgTech = ufgMembers.filter(m => !ufgCoords.includes(m));

        if (ufgCoords.length > 0) {
          equipeChildren.push(
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 120, after: 0 },
              indent: { left: 1416 },
              children: [
                new TextRun({
                  text: 'Coordenador do Projeto',
                  font: REPORT_DOC_FONT,
                  bold: true,
                  size: 24, // 12pt
                  color: '000000'
                })
              ]
            })
          );
          ufgCoords.forEach(m => {
            const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
            equipeChildren.push(
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 0, after: 160 },
                indent: { left: 1416 },
                children: [
                  new TextRun({
                    text: name,
                    font: REPORT_DOC_FONT,
                    bold: false,
                    size: 24, // 12pt
                    color: '000000'
                  })
                ]
              })
            );
          });
        }

        if (ufgTech.length > 0) {
          equipeChildren.push(
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 120, after: 0 },
              indent: { left: 1416 },
              children: [
                new TextRun({
                  text: 'Equipe de Técnica',
                  font: REPORT_DOC_FONT,
                  bold: true,
                  size: 24, // 12pt
                  color: '000000'
                })
              ]
            })
          );
          ufgTech.forEach(m => {
            const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
            equipeChildren.push(
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 0, after: 160 },
                indent: { left: 1416 },
                children: [
                  new TextRun({
                    text: name,
                    font: REPORT_DOC_FONT,
                    bold: false,
                    size: 24, // 12pt
                    color: '000000'
                  })
                ]
              })
            );
          });
        }
      }

      // 2. Bloco FNDE
      if (fndeMembers.length > 0) {
        equipeChildren.push(
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 240, after: 240 },
            indent: { left: 708 },
            children: [
              new TextRun({
                text: 'FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO – FNDE',
                font: REPORT_DOC_FONT,
                bold: true,
                size: 24, // 12pt
                color: '000000'
              })
            ]
          })
        );

        const fndeRoles = [];
        const fndeByRole = new Map();
        fndeMembers.forEach(m => {
          const r = m.role || 'Representante Técnico FNDE';
          if (!fndeByRole.has(r)) {
            fndeByRole.set(r, []);
            fndeRoles.push(r);
          }
          fndeByRole.get(r).push(m);
        });

        fndeRoles.forEach(r => {
          equipeChildren.push(
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 120, after: 0 },
              indent: { left: 1416 },
              children: [
                new TextRun({
                  text: r,
                  font: REPORT_DOC_FONT,
                  bold: true,
                  size: 24, // 12pt
                  color: '000000'
                })
              ]
            })
          );
          fndeByRole.get(r).forEach(m => {
            const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
            equipeChildren.push(
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 0, after: 160 },
                indent: { left: 1416 },
                children: [
                  new TextRun({
                    text: name,
                    font: REPORT_DOC_FONT,
                    bold: false,
                    size: 24, // 12pt
                    color: '000000'
                  })
                ]
              })
            );
          });
        });
      }

      // 1.3 MONTAGEM DA PÁGINA 4: ÍNDICE DE FIGURAS E ÍNDICE DE TABELAS (Seção 4 Oficial)
      // Constrói dinamicamente os tópicos, tabelas e figuras do presente relatório e suas páginas
      const { sumarioList, tablesList, figuresList } = this.buildReportIndices(training, metrics, chartsData);

      const indicesChildren = [];

      // Título oficial do Índice de Figuras: Centralizado, fonte do documento, 16pt, Negrito, Preto #000000
      indicesChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 180 },
          children: [
            new TextRun({
              text: 'ÍNDICE DE FIGURAS',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 32, // 16pt
              color: '000000'
            })
          ]
        })
      );

      // Índice de Figuras Automático nativo do Word (TOC \c "Figura" \h \z)
      if (TableOfContents) {
        const tof = new TableOfContents("Índice de Figuras", {
          captionLabelIncludingNumbers: "Figura",
          hyperlink: true,
          hideTabAndPageNumbersInWebView: true
        });

        // Pré-popular entradas calculadas dentro do sdtContent para exibição imediata e precisa da paginação
        const figParas = [];
        figuresList.forEach(fig => {
          const textRuns = [];
          if (fig.italicWord) {
            textRuns.push(new TextRun({ text: fig.label, font: REPORT_DOC_FONT, size: 24, color: '000000' }));
            textRuns.push(new TextRun({ text: fig.italicWord, font: REPORT_DOC_FONT, italics: true, size: 24, color: '000000' }));
            if (fig.afterWord) {
              textRuns.push(new TextRun({ text: fig.afterWord, font: REPORT_DOC_FONT, size: 24, color: '000000' }));
            }
          } else {
            textRuns.push(new TextRun({ text: fig.label, font: REPORT_DOC_FONT, size: 24, color: '000000' }));
          }

          const figChildren = [];
          if (fig.bookmarkId && InternalHyperlink) {
            figChildren.push(
              new InternalHyperlink({
                anchor: fig.bookmarkId,
                children: textRuns
              })
            );
          } else {
            figChildren.push(...textRuns);
          }

          figChildren.push(new TextRun({ text: '\t', font: REPORT_DOC_FONT, size: 24, color: '000000' }));

          if (fig.bookmarkId && SimpleField) {
            figChildren.push(
              new SimpleField(`PAGEREF ${fig.bookmarkId} \\h`, String(fig.page))
            );
          } else {
            figChildren.push(
              new TextRun({ text: String(fig.page), font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          figParas.push(
            new Paragraph({
              style: 'TableofFigures',
              spacing: { before: 20, after: 40, line: 276 },
              tabStops: [{ type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }],
              children: figChildren
            })
          );
        });

        if (this.injectFieldEntries(tof, figParas)) {
          indicesChildren.push(tof);
        } else {
          // Estrutura interna da biblioteca docx diferente da esperada: usa a lista estática (com PAGEREF)
          indicesChildren.push(...figParas);
        }
      } else {
        figuresList.forEach(fig => {
          const textRuns = [];
          if (fig.italicWord) {
            textRuns.push(new TextRun({ text: fig.label, font: REPORT_DOC_FONT, size: 24, color: '000000' }));
            textRuns.push(new TextRun({ text: fig.italicWord, font: REPORT_DOC_FONT, italics: true, size: 24, color: '000000' }));
            if (fig.afterWord) {
              textRuns.push(new TextRun({ text: fig.afterWord, font: REPORT_DOC_FONT, size: 24, color: '000000' }));
            }
          } else {
            textRuns.push(new TextRun({ text: fig.label, font: REPORT_DOC_FONT, size: 24, color: '000000' }));
          }

          const figChildren = [];
          if (fig.bookmarkId && InternalHyperlink) {
            figChildren.push(
              new InternalHyperlink({
                anchor: fig.bookmarkId,
                children: textRuns
              })
            );
          } else {
            figChildren.push(...textRuns);
          }

          figChildren.push(new TextRun({ text: '\t', font: REPORT_DOC_FONT, size: 24, color: '000000' }));

          if (fig.bookmarkId && SimpleField) {
            figChildren.push(
              new SimpleField(`PAGEREF ${fig.bookmarkId} \\h`, String(fig.page))
            );
          } else {
            figChildren.push(
              new TextRun({ text: String(fig.page), font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          indicesChildren.push(
            new Paragraph({
              spacing: { before: 0, after: 40 },
              tabStops: [{ type: 'right', position: 9628 }],
              children: figChildren
            })
          );
        });
      }

      // Título oficial do Índice de Tabelas: Centralizado, fonte do documento, 16pt, Negrito, Preto #000000
      indicesChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 240, after: 180 },
          children: [
            new TextRun({
              text: 'ÍNDICE DE TABELAS',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 32, // 16pt
              color: '000000'
            })
          ]
        })
      );

      // Índice de Tabelas Automático nativo do Word (TOC \c "Tabela" \h \z)
      if (TableOfContents) {
        const tot = new TableOfContents("Índice de Tabelas", {
          captionLabelIncludingNumbers: "Tabela",
          hyperlink: true,
          hideTabAndPageNumbersInWebView: true
        });

        // Pré-popular entradas calculadas dentro do sdtContent para exibição imediata e precisa da paginação
        const tabParas = [];
        tablesList.forEach(tab => {
          const tabChildren = [];
          if (tab.bookmarkId && InternalHyperlink) {
            tabChildren.push(
              new InternalHyperlink({
                anchor: tab.bookmarkId,
                children: [
                  new TextRun({ text: tab.label, font: REPORT_DOC_FONT, size: 24, color: '000000' })
                ]
              })
            );
          } else {
            tabChildren.push(
              new TextRun({ text: tab.label, font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          tabChildren.push(new TextRun({ text: '\t', font: REPORT_DOC_FONT, size: 24, color: '000000' }));

          if (tab.bookmarkId && SimpleField) {
            tabChildren.push(
              new SimpleField(`PAGEREF ${tab.bookmarkId} \\h`, String(tab.page))
            );
          } else {
            tabChildren.push(
              new TextRun({ text: String(tab.page), font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          tabParas.push(
            new Paragraph({
              style: 'TableofFigures',
              spacing: { before: 20, after: 40, line: 276 },
              tabStops: [{ type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }],
              children: tabChildren
            })
          );
        });

        if (this.injectFieldEntries(tot, tabParas)) {
          indicesChildren.push(tot);
        } else {
          indicesChildren.push(...tabParas);
        }
      } else {
        tablesList.forEach(tab => {
          const tabChildren = [];
          if (tab.bookmarkId && InternalHyperlink) {
            tabChildren.push(
              new InternalHyperlink({
                anchor: tab.bookmarkId,
                children: [
                  new TextRun({ text: tab.label, font: REPORT_DOC_FONT, size: 24, color: '000000' })
                ]
              })
            );
          } else {
            tabChildren.push(
              new TextRun({ text: tab.label, font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          tabChildren.push(new TextRun({ text: '\t', font: REPORT_DOC_FONT, size: 24, color: '000000' }));

          if (tab.bookmarkId && SimpleField) {
            tabChildren.push(
              new SimpleField(`PAGEREF ${tab.bookmarkId} \\h`, String(tab.page))
            );
          } else {
            tabChildren.push(
              new TextRun({ text: String(tab.page), font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          indicesChildren.push(
            new Paragraph({
              spacing: { before: 0, after: 40 },
              tabStops: [{ type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }],
              children: tabChildren
            })
          );
        });
      }

      // 1.4 MONTAGEM DA PÁGINA 5: SUMÁRIO (SUMÁRIO AUTOMÁTICO 2 NATIVO DO WORD)
      const sumarioChildren = [];

      // Montagem do Sumário Automático 2 nativo do Word
      if (TableOfContents) {
        const toc = new TableOfContents("Sumário", {
          headingStyleRange: "1-3",
          hyperlink: true,
          hideTabAndPageNumbersInWebView: true,
          useAppliedParagraphOutlineLevel: true
        });

        // 1. Vincular à galeria oficial de Sumários do Word (Sumário Automático 2)
        if (toc.root && toc.root[0] && toc.root[0].root) {
          toc.root[0].root.push({
            "w:docPartObj": [
              { "w:docPartGallery": { _attr: { "w:val": "Table of Contents" } } },
              { "w:docPartUnique": {} }
            ]
          });
        }

        // 2. Título oficial "SUMÁRIO":
        // Centralizado, preto (#000000), tamanho 16pt (32 dxa), negrito, estilo TOCHeading / CabealhodoSumrio
        const tocHeadingPara = new Paragraph({
          style: 'TOCHeading',
          alignment: AlignmentType.CENTER,
          spacing: { before: 240, after: 140 },
          children: [
            new TextRun({
              text: 'SUMÁRIO',
              font: REPORT_DOC_FONT,
              bold: true,
              size: 32, // 16pt
              color: '000000'
            })
          ]
        });

        // 3. Pré-popular entradas calculadas dentro do sdtContent para exibição imediata e precisa da paginação
        const sumParas = [];
        sumarioList.forEach(item => {
          const sumChildren = [];
          const labelText = item.label ? item.label : (item.num ? `${item.num} ${item.title}` : item.title);
          if (item.bookmarkId && InternalHyperlink) {
            sumChildren.push(
              new InternalHyperlink({
                anchor: item.bookmarkId,
                children: [
                  new TextRun({ text: labelText, font: REPORT_DOC_FONT, size: 24, color: '000000' })
                ]
              })
            );
          } else {
            sumChildren.push(
              new TextRun({ text: labelText, font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          sumChildren.push(new TextRun({ text: '\t', font: REPORT_DOC_FONT, size: 24, color: '000000' }));

          if (item.bookmarkId && SimpleField) {
            sumChildren.push(
              new SimpleField(`PAGEREF ${item.bookmarkId} \\h`, String(item.page))
            );
          } else {
            sumChildren.push(
              new TextRun({ text: String(item.page), font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          sumParas.push(
            new Paragraph({
              style: 'TOC1',
              spacing: { before: 20, after: 80, line: 276 },
              tabStops: [{ type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }],
              children: sumChildren
            })
          );
        });

        // Inserir o título como primeiro elemento de sdtContent (toc.root[1]) e os itens pré-populados antes do endPara
        if (this.injectFieldEntries(toc, sumParas, tocHeadingPara)) {
          sumarioChildren.push(toc);
        } else {
          // Estrutura interna da biblioteca docx diferente da esperada: sumário estático (com PAGEREF)
          sumarioChildren.push(tocHeadingPara, ...sumParas);
        }
      } else {
        // Fallback caso TableOfContents não esteja disponível
        sumarioChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 140 },
            children: [
              new TextRun({
                text: 'SUMÁRIO',
                font: REPORT_DOC_FONT,
                bold: true,
                size: 32,
                color: '000000'
              })
            ]
          })
        );
        sumarioList.forEach(item => {
          const itemChildren = [];
          if (item.bookmarkId && InternalHyperlink) {
            itemChildren.push(
              new InternalHyperlink({
                anchor: item.bookmarkId,
                children: [
                  new TextRun({ text: item.label, font: REPORT_DOC_FONT, size: 24, color: '000000' })
                ]
              })
            );
          } else {
            itemChildren.push(
              new TextRun({ text: item.label, font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          itemChildren.push(new TextRun({ text: '\t', font: REPORT_DOC_FONT, size: 24, color: '000000' }));

          if (item.bookmarkId && SimpleField) {
            itemChildren.push(
              new SimpleField(`PAGEREF ${item.bookmarkId} \\h`, String(item.page))
            );
          } else {
            itemChildren.push(
              new TextRun({ text: String(item.page), font: REPORT_DOC_FONT, size: 24, color: '000000' })
            );
          }

          sumarioChildren.push(
            new Paragraph({
              spacing: { before: 0, after: 100 },
              tabStops: [{ type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }],
              children: itemChildren
            })
          );
        });
      }

      // CRIAR DOCUMENTO DOCX COM CINCO SEÇÕES OFICIAIS:
      // SEÇÃO 1: CAPA OFICIAL (PÁG 1)
      // SEÇÃO 2: CONTRA-CAPA (PÁG 2)
      // SEÇÃO 3: EQUIPE PARTICIPANTE (PÁG 3)
      // SEÇÃO 4: ÍNDICE DE FIGURAS, ÍNDICE DE TABELAS E SUMÁRIO (PÁGS 4 E 5)
      // SEÇÃO 5: CONTEÚDO TÉCNICO COM CABEÇALHO E RODAPÉ INSTITUCIONAIS (PÁG 6+)
      const doc = new Document({
        features: {
          updateFields: true
        },
        styles: {
          default: {
            document: {
              run: {
                font: REPORT_DOC_FONT,
                size: 22,
                color: '000000'
              },
              paragraph: {
                alignment: AlignmentType.JUSTIFIED,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 0 }
              }
            },
            heading1: {
              run: {
                font: REPORT_DOC_FONT,
                size: 32,
                bold: true,
                color: '000000'
              },
              paragraph: {
                spacing: { before: 240, after: 240, lineRule: LineRuleType.AUTO },
                outlineLevel: 0
              }
            }
          },
          paragraphStyles: [
            {
              id: "TOCHeading",
              name: "TOC Heading",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 32,
                bold: true,
                color: "000000"
              },
              paragraph: {
                alignment: AlignmentType.CENTER,
                spacing: { before: 240, after: 140 },
                outlineLevel: 9
              }
            },
            {
              id: "CabealhodoSumrio",
              name: "TOC Heading",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 32,
                bold: true,
                color: "000000"
              },
              paragraph: {
                alignment: AlignmentType.CENTER,
                spacing: { before: 240, after: 140 },
                outlineLevel: 9
              }
            },
            {
              id: "TOC1",
              name: "toc 1",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 24,
                color: "000000"
              },
              paragraph: {
                spacing: { before: 20, after: 80, line: 276 },
                tabStops: [
                  { type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }
                ]
              }
            },
            {
              id: "TOC2",
              name: "toc 2",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 24,
                color: "000000"
              },
              paragraph: {
                spacing: { before: 20, after: 80, line: 276 },
                tabStops: [
                  { type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }
                ]
              }
            },
            {
              id: "TOC3",
              name: "toc 3",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 24,
                color: "000000"
              },
              paragraph: {
                spacing: { before: 20, after: 80, line: 276 },
                tabStops: [
                  { type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }
                ]
              }
            },
            {
              id: "TableofFigures",
              name: "table of figures",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 24,
                color: "000000"
              },
              paragraph: {
                spacing: { before: 20, after: 60, line: 276 },
                tabStops: [
                  { type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }
                ]
              }
            },
            {
              id: "ndicedeIlustraes",
              name: "table of figures",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 24,
                color: "000000"
              },
              paragraph: {
                spacing: { before: 20, after: 60, line: 276 },
                tabStops: [
                  { type: TabStopType.RIGHT || 'right', position: 9628, leader: LeaderType.DOT || 'dot' }
                ]
              }
            },
            {
              id: "Caption",
              name: "caption",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 22,
                color: "000000"
              },
              paragraph: {
                alignment: AlignmentType.CENTER,
                spacing: { before: 140, after: 80 }
              }
            },
            {
              id: "Legenda",
              name: "caption",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                font: REPORT_DOC_FONT,
                size: 22,
                color: "000000"
              },
              paragraph: {
                alignment: AlignmentType.CENTER,
                spacing: { before: 140, after: 80 }
              }
            }
          ]
        },
        sections: [
          // SEÇÃO 1: CAPA OFICIAL INTEGRAL
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 0, right: 0, bottom: 0, left: 0, header: 0, footer: 0 }
              }
            },
            children: [coverTable, coverTrailingPara]
          },
          // SEÇÃO 2: CONTRA-CAPA OFICIAL (PÁGINA 2)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 567, right: 1418, bottom: 567, left: 1418, header: 0, footer: 0 }
              }
            },
            children: [
              contraCapaTopTable,
              contraCapaNumPara,
              contraCapaTitlePara,
              contraCapaInfoPara,
              contraCapaCityPara,
              contraCapaDatePara,
              contraCapaBottomTable
            ]
          },
          // SEÇÃO 3: EQUIPE PARTICIPANTE (PÁGINA 3)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 1702, right: 1134, bottom: 1701, left: 1134, header: 0, footer: 328 }
              }
            },
            headers: {
              default: new Header({
                children: []
              })
            },
            footers: {
              default: new Footer({
                children: [footerTable]
              })
            },
            children: equipeChildren
          },
          // SEÇÃO 4: ÍNDICE DE FIGURAS, ÍNDICE DE TABELAS E SUMÁRIO (PÁGINAS 4 E 5)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 1702, right: 1134, bottom: 1701, left: 1134, header: 851, footer: 328 }
              }
            },
            headers: {
              default: new Header({
                children: [headerTable]
              })
            },
            footers: {
              default: new Footer({
                children: [footerTable]
              })
            },
            children: [
              ...indicesChildren,
              new Paragraph({ children: [new PageBreak()] }),
              ...sumarioChildren
            ]
          },
          // SEÇÃO 5: CONTEÚDO TÉCNICO COM CABEÇALHO E RODAPÉ INSTITUCIONAIS (PÁGINA 6+)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 720, footer: 720 },
                pageNumbers: {
                  start: 1
                }
              }
            },
            headers: {
              default: new Header({
                children: [headerTable]
              })
            },
            footers: {
              default: new Footer({
                children: [footerTableWithPageNum]
              })
            },
            children: docChildren
          }
        ]
      });

      const blob = await Packer.toBlob(doc);
      return blob;
    } catch (err) {
      console.error('Erro ao gerar documento Word:', err);
      alert(`Erro na geração docx: ${err.message}`);
      return null;
    }
  }

  /**
   * Gera e dispara o download do arquivo .docx institucional formatado
   */
  async generateAndDownload(training, metrics, chartsData = {}) {
    const blob = await this.generateDocxBlob(training, metrics, chartsData);
    if (blob) {
      const coverInfo = this.formatCoverTrainingInfo(training);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${coverInfo.numPadded}CTE_Relatório_V01.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Download do .docx gerado com sucesso!');
    }
    return blob;
  }

  downloadHtmlReportFallback(training, metrics, chartsData = {}) {
    REPORT_DOC_FONT = this.getDocumentFont(training);
    const coverInfo = this.formatCoverTrainingInfo(training);
    const { sumarioList, tablesList, figuresList } = this.buildReportIndices(training, metrics, chartsData);
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>${coverInfo.numText} - ${coverInfo.polo}</title>
        <style>
          body { font-family: '${REPORT_DOC_FONT}', serif; line-height: 1.6; margin: 0; padding: 0; }
          .cover-page {
            background-color: #4D4D4D;
            color: #FFFFFF;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
            padding: 0;
            box-sizing: border-box;
            text-align: center;
          }
          .cover-stripe {
            background-color: #E9C95C;
            color: #000000;
            padding: 1.5rem 1rem;
            text-align: center;
          }
          .cover-logos {
            background-color: #E8ECEF;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .contra-capa-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
            padding: 2.5cm;
            box-sizing: border-box;
            text-align: center;
          }
          .content-page {
            padding: 2.5cm;
            max-width: 800px;
            margin: auto;
            font-size: 11pt;
          }
          .content-page h2 {
            font-size: 16pt;
            color: #000000;
            font-weight: bold;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
          }
          .content-page p {
            font-size: 11pt;
            text-align: justify;
            line-height: 1.5;
            margin-bottom: 0.75rem;
          }
          table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 10pt; }
          th, td { border: 1px solid #333; padding: 6px 10px; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <!-- PÁGINA 1: CAPA OFICIAL INTEGRAL -->
        <div class="cover-page">
          <div style="padding-top: 3.5rem; text-align: center;">
            <img src="visualrelatorio/capa/figuradacapa.png" style="max-width: 500px; width: 90%; border-radius: 4px;" alt="Ilustração">
            <h2 style="color: #E9C95C; font-size: 14pt; margin-top: 2rem; font-weight: bold;">${coverInfo.numText}</h2>
          </div>
          <div class="cover-stripe">
            <h1 style="margin: 0; font-size: 18pt; font-weight: bold; color: #000000;">CAPACITAÇÃO EM TRANSPORTE ESCOLAR</h1>
            <p style="margin: 0.5rem 0 0; font-size: 12pt; font-weight: bold; color: #000000;">${coverInfo.infoLine}</p>
          </div>
          <div style="padding: 2.5rem 1.5rem; text-align: center;">
            <p style="color: #FFFFFF; font-size: 12pt; font-weight: bold; margin: 0; line-height: 1.5;">Projeto: FORTALECENDO E APRIMORANDO AS POLÍTICAS<br>PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL</p>
          </div>
          <div class="cover-logos">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 48px;" alt="CECATE Centro-Oeste">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 48px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 48px;" alt="FNDE">
          </div>
        </div>

        <!-- PÁGINA 2: CONTRA-CAPA OFICIAL -->
        <div class="contra-capa-page">
          <div style="border-top: 1.5px solid #595959; padding-top: 0.8rem;">
            <p style="font-size: 11pt; margin: 0; text-transform: uppercase;">Projeto: FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS<br>DE TRANSPORTE ESCOLAR DO BRASIL</p>
          </div>
          <div style="margin: auto 0;">
            <p style="font-size: 14pt; margin: 0 0 0.8rem 0;">Relatório de Atividades Nº ${training.number || '16'}</p>
            <h2 style="font-size: 18pt; font-weight: bold; margin: 0 0 0.8rem 0; color: #000000;">CAPACITAÇÃO EM TRANSPORTE ESCOLAR</h2>
            <p style="font-size: 14pt; font-weight: bold; margin: 0;">${coverInfo.infoLine}</p>
          </div>
          <div>
            <p style="font-size: 12pt; margin: 0 0 0.4rem 0;">Aparecida de Goiânia</p>
            <p style="font-size: 12pt; margin: 0 0 2rem 0;">${this.formatContraCapaMonthYear(training)}</p>
            <div style="border-top: 1.5px solid #595959; padding-top: 1rem; display: flex; justify-content: space-around; align-items: center;">
              <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 38px;" alt="CECATE">
              <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 38px;" alt="UFG">
              <img src="visualrelatorio/capa/fndefigura.svg" style="height: 38px;" alt="FNDE">
            </div>
          </div>
        </div>

        <!-- PÁGINA 3: EQUIPE PARTICIPANTE OFICIAL -->
        <div class="equipe-page" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; padding: 2.5cm; box-sizing: border-box;">
          <div>
            <h2 style="text-align: center; color: #000000; font-size: 18pt; font-weight: bold; margin-bottom: 2rem;">RELATÓRIO DE ATIVIDADES Nº ${training.number || '16'}</h2>
            <h3 style="font-size: 14pt; font-weight: bold; color: #000000; margin-bottom: 1.5rem;">EQUIPE PARTICIPANTE</h3>
            <div style="margin-left: 1.25cm; margin-bottom: 1.5rem;">
              <h4 style="font-size: 12pt; font-weight: bold; margin-bottom: 0.5rem;">UNIVERSIDADE FEDERAL DE GOIÁS – UFG</h4>
              <div style="margin-left: 1.25cm;">
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenador do Projeto</p>
                <p style="margin: 0 0 0.5rem 0;">Prof. Dr. Willer Luciano Carvalho</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Equipe de Técnica</p>
                <p style="margin: 0 0 0.4rem 0;">Eng. M.Sc. Lara Batista Ferreira de Lima</p>
                <p style="margin: 0 0 0.4rem 0;">Eng. Dr. Matheus Henrique Morato de Moraes</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Liosber Medina Garcia</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Marcos Paulino Roriz Junior</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Robinson Andrés Giraldo Zuluaga</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Ronny Marcelo Aliaga Medrano</p>
                <p style="margin: 0 0 0.4rem 0;">Pesquisadora Visitante Dra. Yaeko Yamashita</p>
                <p style="margin: 0 0 0.5rem 0;">Pesquisador Visitante José Maria Rodrigues de Souza</p>
              </div>
            </div>
            <div style="margin-left: 1.25cm;">
              <h4 style="font-size: 12pt; font-weight: bold; margin-bottom: 0.5rem;">FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO – FNDE</h4>
              <div style="margin-left: 1.25cm;">
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenador-Geral da Política do Transporte Escolar - CGPTE</p>
                <p style="margin: 0 0 0.5rem 0;">Haroldo da Silva Gomes</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenadora de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar - CMATE</p>
                <p style="margin: 0 0 0.5rem 0;">Daniela Oshiro Yanaze</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenadora de Apoio ao Transporte Escolar – COATE</p>
                <p style="margin: 0 0 0.5rem 0;">Neuza Helena Portugal dos Santos</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenadora de Apoio ao Caminho da Escola – COACE</p>
                <p style="margin: 0 0 0.5rem 0;">Maria Angelica Floriano Pedrosa</p>
              </div>
            </div>
          </div>
          <div style="border-top: 1.5px solid #4D4D4D; padding-top: 0.8rem; text-align: center;">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 24px; margin: 0 10px;" alt="CECATE">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 24px; margin: 0 10px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 24px; margin: 0 10px;" alt="FNDE">
          </div>
        </div>

        <!-- PÁGINA 4: ÍNDICE DE FIGURAS E ÍNDICE DE TABELAS -->
        <div class="indices-page" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; padding: 2.5cm; box-sizing: border-box;">
          <div>
            <h2 style="text-align: center; color: #000000; font-size: 16pt; font-weight: bold; margin-bottom: 1.2rem;">ÍNDICE DE FIGURAS</h2>
            <div style="font-size: 12pt; line-height: 1.8;">
              ${figuresList.map(fig => `<div style="display: flex; justify-content: space-between;"><span>${fig.label}</span><span>${fig.page}</span></div>`).join('')}
            </div>
            <h2 style="text-align: center; color: #000000; font-size: 16pt; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1.2rem;">ÍNDICE DE TABELAS</h2>
            <div style="font-size: 12pt; line-height: 1.8;">
              ${tablesList.map(tab => `<div style="display: flex; justify-content: space-between;"><span>${tab.label}</span><span>${tab.page}</span></div>`).join('')}
            </div>
          </div>
          <div style="border-top: 1.5px solid #4D4D4D; padding-top: 0.8rem; text-align: center;">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 24px; margin: 0 10px;" alt="CECATE">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 24px; margin: 0 10px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 24px; margin: 0 10px;" alt="FNDE">
          </div>
        </div>

        <!-- PÁGINA 5: SUMÁRIO -->
        <div class="sumario-page" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; padding: 2.5cm; box-sizing: border-box;">
          <div>
            <h2 style="text-align: center; color: #000000; font-size: 16pt; font-weight: bold; margin-bottom: 1.5rem; font-family: '${REPORT_DOC_FONT}', serif;">SUMÁRIO</h2>
            <div style="font-size: 12pt; line-height: 2;">
              ${sumarioList.map(item => `<div style="display: flex; justify-content: space-between;"><span>${item.label}</span><span>${item.page}</span></div>`).join('')}
            </div>
          </div>
          <div style="border-top: 1.5px solid #4D4D4D; padding-top: 0.8rem; text-align: center;">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 24px; margin: 0 10px;" alt="CECATE">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 24px; margin: 0 10px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 24px; margin: 0 10px;" alt="FNDE">
          </div>
        </div>
        <div class="content-page">
          <h2>1. INTRODUÇÃO</h2>
          <p>Capacitação realizada em ${coverInfo.polo} com ${metrics?.totalPresent || 0} participantes presentes de ${metrics?.totalPresentMunicipalities || 0} municípios atendidos.</p>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${coverInfo.numPadded}CTE_Relatório.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

window.reportDocxGenerator = new ReportDocxGenerator();

