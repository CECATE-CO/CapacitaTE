/**
 * CapacitaTE - Gerador de Nuvens de Palavras Qualitativas Artísticas
 * Versão: v.4.3.9
 */

class WordCloudEngine {
  constructor() {
    // Dicionário mestre de stopwords em português
    this.defaultStopwords = new Set([
      'a', 'ao', 'aos', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aquilo', 'as', 'até',
      'com', 'como', 'da', 'das', 'de', 'dela', 'delas', 'dele', 'deles', 'depois', 'do',
      'dos', 'e', 'ela', 'elas', 'ele', 'eles', 'em', 'entre', 'era', 'eram', 'éramos',
      'essa', 'essas', 'esse', 'esses', 'esta', 'estamos', 'estão', 'estas', 'estava',
      'estavam', 'estávamos', 'este', 'esteja', 'estejam', 'estejamos', 'estes', 'esteve',
      'estive', 'estivemos', 'estiver', 'estivera', 'estiveram', 'estivéramos', 'estiverem',
      'estivermos', 'estivesse', 'estivessem', 'estivéssemos', 'estou', 'eu', 'foi', 'fomos',
      'for', 'fora', 'foram', 'fôramos', 'forem', 'formos', 'fosse', 'fossem', 'fôssemos',
      'fui', 'há', 'haja', 'hajam', 'hajamos', 'hão', 'havemos', 'hei', 'houve', 'houvemos',
      'houver', 'houvera', 'houverá', 'houveram', 'houvéramos', 'houverão', 'houverei',
      'houverem', 'houveremos', 'houveria', 'houveriam', 'houveríamos', 'houvesse',
      'houvessem', 'houvéssemos', 'isso', 'isto', 'já', 'lhe', 'lhes', 'mais', 'mas', 'me',
      'mesmo', 'meu', 'meus', 'minha', 'minhas', 'muito', 'muitos', 'na', 'não', 'nas',
      'nem', 'no', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos', 'num', 'numa',
      'o', 'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos', 'por', 'qual', 'quando',
      'que', 'quem', 'são', 'se', 'seja', 'sejam', 'sejamos', 'sem', 'ser', 'será',
      'serão', 'serei', 'seremos', 'seria', 'seriam', 'seríamos', 'seu', 'seus', 'só',
      'somos', 'sou', 'sua', 'suas', 'também', 'te', 'tem', 'tém', 'temos', 'tenha',
      'tenham', 'tenhamos', 'tenho', 'ter', 'terá', 'terão', 'terei', 'teremos', 'teria',
      'teriam', 'teríamos', 'teu', 'teus', 'teve', 'tinha', 'tinham', 'tínhamos', 'tive',
      'tivemos', 'tiver', 'tivera', 'tiveram', 'tivéramos', 'tiverem', 'tivermos',
      'tivesse', 'tivessem', 'tivéssemos', 'tu', 'tua', 'tuas', 'um', 'uma', 'você',
      'vocês', 'vos', 'tudo', 'todos', 'todas', 'todo', 'toda', 'nada', 'bem', 'bom',
      'boa', 'outro', 'outra', 'outros', 'outras', 'assim', 'onde', 'sobre', 'pois',
      // Termos contextuais genéricos desnecessários na nuvem
      'curso', 'forma', 'aplica', 'nenhum', 'obrigado', 'parabéns', 'dia', 'dias',
      'parte', 'geral', 'sendo', 'vez', 'vezes'
    ]);

    this.customStopwords = new Set();
    this.synonymMap = {
      'conteudos': 'conteúdo',
      'conteudo': 'conteúdo',
      'didatica': 'didática',
      'explicacao': 'explicação',
      'explicacoes': 'explicação',
      'conhecimentos': 'conhecimento',
      'aprendizado': 'aprendizado',
      'aprendizagem': 'aprendizado',
      'informacoes': 'informação',
      'informacao': 'informação',
      'praticas': 'prática',
      'pratica': 'prática',
      'horarios': 'horário',
      'horario': 'horário',
      'duracao': 'duração',
      'municipios': 'municípios',
      'municipio': 'municípios',
      'tempo': 'tempo',
      'material': 'material didático',
      'materiais': 'material didático',
      'computador': 'computadores',
      'maquina': 'computadores',
      'maquinas': 'computadores',
      'palestrante': 'palestrantes',
      'formador': 'formadores',
      'conselho': 'conselhos',
      'formacao': 'formação',
      'formacoes': 'formação',
      'avaliacao': 'avaliação'
    };

    // Paletas ricas, contrastantes e artísticas inspiradas em infográficos modernos (Wordle / Tagxedo)
    this.colorPalettes = {
      positive: {
        light: [
          '#1d4ed8', // Azul Cobalto Real
          '#ea580c', // Terracota / Âmbar Quente
          '#059669', // Esmeralda / Jade Vibrante
          '#be123c', // Carmim / Rubi Intenso
          '#6d28d9', // Púrpura Ametista
          '#0284c7', // Azul Cerúleo
          '#d97706', // Ocre Dourado
          '#7c3aed', // Violeta Nobre
          '#0d9488', // Verde Azulado Escuro
          '#e11d48', // Coral Rosé Vivo
          '#2563eb', // Azul Safira
          '#10b981'  // Menta Intenso
        ],
        dark: [
          '#38bdf8', // Ciano Celeste Lúmina
          '#fb923c', // Tangerina Dourada
          '#34d399', // Esmeralda Lúmina
          '#f43f5e', // Rosa Coral Vívido
          '#a78bfa', // Lavanda Radiante
          '#60a5fa', // Azul Celeste
          '#facc15', // Ouro Solar
          '#c084fc', // Violeta Claro
          '#2dd4bf', // Turquesa Claro
          '#fb7185', // Rosa Quente
          '#818cf8', // Índigo Suave
          '#4ade80'  // Verde Limão Vibrante
        ]
      },
      improve: {
        light: [
          '#ea580c', // Tangerina Intensa
          '#b45309', // Âmbar Queimado
          '#c2410c', // Terracota Vibrante
          '#be123c', // Rubi Escuro
          '#ca8a04', // Dourado Escuro
          '#6d28d9', // Violeta Profundo
          '#0284c7', // Azul Céu Escuro
          '#dc2626', // Vermelho Escarlate
          '#7c3aed', // Púrpura Real
          '#9a3412', // Bronze Canela
          '#0f766e', // Cerceta Profundo
          '#d97706'  // Ocre Queimado
        ],
        dark: [
          '#fb923c', // Laranja Solar
          '#facc15', // Amarelo Ouro
          '#f472b6', // Rosa Choque Lúmina
          '#38bdf8', // Azul Turquesa
          '#c084fc', // Lilás Vibrante
          '#fbbf24', // Âmbar Suave
          '#f87171', // Coral Claro
          '#a5b4fc', // Índigo Claro
          '#34d399', // Menta Refrescante
          '#67e8f9', // Ciano Claro
          '#fde047'  // Sol Suave
        ]
      }
    };
    this.defaultFontFamily = 'Plus Jakarta Sans';
  }

  /**
   * Normaliza um texto removendo acentos e pontuações para análise
   */
  normalizeWord(word) {
    if (!word) return '';
    let clean = word.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=_`~()?"'’“”…\[\]]/g, '')
      .replace(/^-+|-+$/g, '')
      .trim();
    
    // Mapeamento de sinônimos/lematização
    const unaccented = clean.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (this.synonymMap[unaccented]) {
      return this.synonymMap[unaccented];
    }
    if (this.synonymMap[clean]) {
      return this.synonymMap[clean];
    }
    return clean;
  }

  /**
   * Formata a palavra com Title Case ou preservação de sigla institucional (ex: "SETE", "CACS")
   */
  formatWord(word) {
    if (!word) return '';
    const trimmed = String(word).trim();
    const upper = trimmed.toUpperCase();
    // Preservar siglas em maiúsculo
    if (['SETE', 'CACS', 'FUNDEB', 'FNDE', 'UFG', 'PNATE', 'MEC', 'SIOPE', 'OCR', 'PDF', 'TI'].includes(upper)) {
      return upper;
    }
    // Palavras com espaço interno (ex: "material didático")
    if (trimmed.includes(' ')) {
      return trimmed.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
    // Capitalizar primeira letra (Title Case elegante)
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }

  /**
   * Verifica stopwords ignorando acentos (respostas digitadas sem acento: "nao", "voce", "tambem")
   */
  isStopword(word) {
    const strip = (w) => String(w).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!this._unaccentedStopwords || this._unaccentedStopwordsSize !== this.defaultStopwords.size + this.customStopwords.size) {
      this._unaccentedStopwords = new Set([...this.defaultStopwords, ...this.customStopwords].map(strip));
      this._unaccentedStopwordsSize = this.defaultStopwords.size + this.customStopwords.size;
    }
    return this.defaultStopwords.has(word) || this.customStopwords.has(word) || this._unaccentedStopwords.has(strip(word));
  }

  /**
   * Processa uma lista de respostas textuais e retorna a contagem ponderada de palavras
   */
  processTextList(texts = []) {
    const wordCounts = {};

    texts.forEach(text => {
      if (!text || typeof text !== 'string') return;

      // Dividir por espaços, quebras de linha e separadores comuns
      // O hífen não separa palavras (ex.: "ar-condicionado")
      const tokens = text.split(/[\s,;\n\r\t\/\+]+/);

      tokens.forEach(rawToken => {
        const word = this.normalizeWord(rawToken);
        if (word.length >= 3 && !this.isStopword(word)) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    });

    // Converter para array ordenado por frequência
    return Object.entries(wordCounts)
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Retorna os termos mais frequentes formatados (capitalizados) para uso em textos e análises
   */
  getTopWords(texts = [], limit = 4) {
    const list = this.processTextList(texts);
    // Filtrar quaisquer termos puramente numéricos
    const filtered = list.filter(item => {
      const t = String(item.text || '').trim();
      return t.length >= 3 && !/^\d+$/.test(t);
    });
    return filtered.slice(0, limit).map(item => this.formatWord(item.text));
  }

  /**
   * Agrupa termos qualitativos em macrocategorias temáticas para Análise de Conteúdo (Bardin)
   */
  categorizeTextResponses(texts = [], type = 'positive') {
    const wordList = this.processTextList(texts);
    const topTerms = this.getTopWords(texts, 6);

    const categories = {
      pedagogica: { name: 'Pedagógica e Didática', count: 0, terms: [] },
      tecnica: { name: 'Instrumental e Conteúdo Técnico', count: 0, terms: [] },
      tecnologica: { name: 'Infraestrutura Tecnológica e Conectividade', count: 0, terms: [] },
      temporal: { name: 'Gestão do Tempo e Carga Horária', count: 0, terms: [] },
      logistica: { name: 'Logística, Acomodação e Conforto', count: 0, terms: [] }
    };

    const dict = {
      pedagogica: ['didática', 'didatica', 'explicação', 'explicacao', 'clareza', 'paciência', 'paciencia', 'dinâmica', 'dinamica', 'formadores', 'formador', 'palestrantes', 'palestrante', 'domínio', 'dominio', 'metodologia', 'ensino', 'atendimento', 'acolhimento'],
      tecnica: ['conteúdo', 'conteudo', 'prática', 'pratica', 'informação', 'informacao', 'conhecimento', 'sistema', 'legislação', 'legislacao', 'fundeb', 'siope', 'fiscalização', 'fiscalizacao', 'prestação', 'prestacao', 'contas', 'conselho', 'conselhos', 'cacs', 'atuação'],
      tecnologica: ['internet', 'computador', 'computadores', 'acesso', 'rede', 'conexão', 'conexao', 'sinal', 'máquinas', 'maquinas', 'lento', 'travando', 'login', 'senha', 'equipamento', 'equipamentos', 'sistema'],
      temporal: ['tempo', 'duração', 'duracao', 'horário', 'horario', 'dias', 'horas', 'corrido', 'pressa', 'pouco', 'estender', 'intervalo', 'pausa'],
      logistica: ['café', 'cafe', 'cafezinho', 'lanche', 'alimentação', 'alimentacao', 'almoço', 'almoco', 'local', 'espaço', 'espaco', 'sala', 'ar-condicionado', 'climatização', 'climatizacao', 'frio', 'calor', 'cadeira', 'cadeiras', 'transporte', 'distância', 'distancia', 'som', 'microfone']
    };

    wordList.forEach(item => {
      const w = item.text.toLowerCase();
      Object.entries(dict).forEach(([catKey, keys]) => {
        // Palavra igual ao termo ou derivada dele (ex.: computador -> computadores); trechos soltos ("som" em "consome") não contam
        if (keys.some(k => w === k || (k.length >= 4 && w.startsWith(k)))) {
          categories[catKey].count += item.count;
          if (!categories[catKey].terms.includes(item.text)) {
            categories[catKey].terms.push(item.text);
          }
        }
      });
    });

    return {
      topTerms,
      categories,
      wordList
    };
  }

  /**
   * Renderiza nuvem de palavras diretamente a partir de lista de textos ou palavras ponderadas
   */
  renderCloud(canvasOrId, textsOrWords = [], options = {}) {
    const canvas = typeof canvasOrId === 'string' ? document.getElementById(canvasOrId) : canvasOrId;
    if (!canvas) return null;

    let words = textsOrWords;
    if (Array.isArray(textsOrWords) && textsOrWords.length > 0 && typeof textsOrWords[0] === 'string') {
      words = this.processTextList(textsOrWords);
    } else if (!Array.isArray(textsOrWords)) {
      words = [];
    }

    return this.renderToCanvas(canvas, words, options);
  }

  /**
   * Converte o nome da família tipográfica selecionada para a string CSS correspondente com fallbacks seguros
   */
  resolveFontFamily(fontFamily) {
    const map = {
      'Times New Roman': '"Times New Roman", Times, "Liberation Serif", serif',
      'Arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      'Segoe UI': '"Segoe UI", -apple-system, BlinkMacSystemFont, Tahoma, Geneva, sans-serif',
      'Georgia': 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
      'Trebuchet MS': '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
      'Impact': 'Impact, "Arial Black", "Trebuchet MS", sans-serif',
      'Plus Jakarta Sans': '"Plus Jakarta Sans", Inter, -apple-system, sans-serif'
    };
    return map[fontFamily] || (fontFamily ? `"${fontFamily}", "Plus Jakarta Sans", Inter, sans-serif` : '"Plus Jakarta Sans", Inter, -apple-system, sans-serif');
  }

  /**
   * Renderiza uma nuvem de palavras artística em um elemento HTML Canvas
   * - Suporte a palavras horizontais (0°) e verticais (90° / -90°)
   * - Distribuição orgânica em espiral elíptica de alta densidade
   * - Tipografia artística em Title Case com pesos dinâmicos
   * - Renderização nítida em alta definição (Hi-DPI / Retina)
   */
  renderToCanvas(canvas, words = [], options = {}) {
    if (!canvas) return null;

    // Se a entrada for lista de textos brutos, processar automaticamente
    if (Array.isArray(words) && words.length > 0 && typeof words[0] === 'string') {
      words = this.processTextList(words);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const baseWidth = options.width || canvas.width || 650;
    const baseHeight = options.height || canvas.height || 350;
    const isDark = options.isDark === true;
    const paletteType = options.palette || 'positive';
    const paletteObj = this.colorPalettes[paletteType] || this.colorPalettes.positive;
    const palette = isDark ? paletteObj.dark : paletteObj.light;
    const maxWords = options.maxWords || 45;
    const chosenFont = options.fontFamily || this.defaultFontFamily || 'Plus Jakarta Sans';
    const fontCssFamily = this.resolveFontFamily(chosenFont);

    // Hi-DPI Scaling (Nitidez de texto máxima em retina e exportação)
    // options.pixelRatio permite exportar em alta resolução (prévia do relatório / Word usa 3x)
    const dpr = options.pixelRatio || ((typeof window !== 'undefined' && window.devicePixelRatio && window.devicePixelRatio > 1) ? Math.min(window.devicePixelRatio, 2) : 2);
    canvas.width = Math.round(baseWidth * dpr);
    canvas.height = Math.round(baseHeight * dpr);
    canvas.style.width = baseWidth + 'px';
    canvas.style.height = baseHeight + 'px';

    ctx.save();
    ctx.scale(dpr, dpr);

    const width = baseWidth;
    const height = baseHeight;

    // Fundo
    if (isDark) {
      ctx.fillStyle = options.bgColor || '#1e293b';
    } else {
      ctx.fillStyle = options.bgColor || '#ffffff';
    }
    ctx.fillRect(0, 0, width, height);

    if (!words || words.length === 0) {
      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = `600 13px ${fontCssFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Nenhuma resposta registrada para gerar a nuvem.', width / 2, height / 2);
      ctx.restore();
      return canvas;
    }

    const slicedWords = words.slice(0, maxWords);
    const maxCount = slicedWords[0]?.count || 1;
    const minCount = slicedWords[slicedWords.length - 1]?.count || 1;

    // Escala de fontes dinâmica com destaque para termos centrais
    const maxFontSize = options.maxFontSize || (width > 600 ? 52 : 44);
    const minFontSize = options.minFontSize || 13;

    const placedBoxes = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const margin = 8;
    const aspect = (width - 2 * margin) / (height - 2 * margin);

    // Função de detecção de colisão AABB
    const canPlaceBox = (box) => {
      if (box.x < margin || box.x + box.w > width - margin) return false;
      if (box.y < margin || box.y + box.h > height - margin) return false;
      for (let i = 0; i < placedBoxes.length; i++) {
        const p = placedBoxes[i];
        if (!(box.x + box.w <= p.x || box.x >= p.x + p.w || box.y + box.h <= p.y || box.y >= p.y + p.h)) {
          return false;
        }
      }
      return true;
    };

    // Renderizar cada palavra na espiral elíptica
    slicedWords.forEach((item, index) => {
      const formattedText = this.formatWord(item.text);

      // Curva de dimensionamento não-linear (destaque visual proporcional)
      const countNorm = maxCount > minCount ? (item.count - minCount) / (maxCount - minCount) : 0.5;
      const baseFontSize = Math.round(minFontSize + Math.pow(countNorm, 0.65) * (maxFontSize - minFontSize));

      // Peso da fonte proporcional à importância
      const fontWeight = index < 3 ? '800' : (index < 14 ? '700' : '600');

      // Determinar candidatos a orientação (cerca de 25% a 35% verticais para harmonia artística)
      // A segunda palavra mais forte pode ser vertical para dar equilíbrio geométrico ao centro
      const isVerticalCandidate = (index === 1 || index % 3 === 0 || index % 7 === 2);
      const orientationList = isVerticalCandidate ? [true, false] : [false];

      let placed = false;
      const pad = 2.5;

      // Tentar no tamanho base; se não couber, tentar com redução gradual (0.85x, 0.72x)
      const scaleSteps = [1.0, 0.85, 0.72];

      for (let sIdx = 0; sIdx < scaleSteps.length && !placed; sIdx++) {
        const currentScale = scaleSteps[sIdx];
        const currentFontSize = Math.max(11, Math.round(baseFontSize * currentScale));
        
        ctx.font = `${fontWeight} ${currentFontSize}px ${fontCssFamily}`;
        const textMetrics = ctx.measureText(formattedText);
        const textW = textMetrics.width;
        const textH = currentFontSize * 0.92;

        // Se estiver em escala de fallback, permitir tentar vertical se ainda não foi testado
        const currentOrientations = (sIdx > 0 && !isVerticalCandidate) ? [false, true] : orientationList;

        for (let oIdx = 0; oIdx < currentOrientations.length && !placed; oIdx++) {
          const isVertical = currentOrientations[oIdx];
          const bw = (isVertical ? textH : textW) + 2 * pad;
          const bh = (isVertical ? textW : textH) + 2 * pad;

          // Espiral elíptica de Fermat / Arquimedes
          const stepSize = 0.08;
          const maxSteps = 3800;

          for (let step = 0; step < maxSteps; step++) {
            const theta = step * stepSize;
            const r = 0.72 * theta;
            const cx = centerX + r * Math.cos(theta) * aspect;
            const cy = centerY + r * Math.sin(theta);

            const box = {
              x: cx - bw / 2,
              y: cy - bh / 2,
              w: bw,
              h: bh
            };

            if (canPlaceBox(box)) {
              placedBoxes.push(box);

              // Desenhar o texto posicionado com rotação
              ctx.save();
              ctx.translate(cx, cy);

              if (isVertical) {
                // Alternar orientação vertical para cima ou para baixo
                const isUpward = (index % 2 === 0);
                ctx.rotate(isUpward ? -Math.PI / 2 : Math.PI / 2);
              }

              // Estilo tipográfico e sombra artística sutil
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = `${fontWeight} ${currentFontSize}px ${fontCssFamily}`;

              const color = palette[index % palette.length];
              ctx.fillStyle = color;

              // Sombra suave apenas para palavras de destaque
              if (index < 6) {
                ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.08)';
                ctx.shadowBlur = isDark ? 4 : 2;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1;
              }

              ctx.fillText(formattedText, 0, 0);
              ctx.restore();

              placed = true;
              break;
            }
          }
        }
      }
    });

    ctx.restore();
    return canvas;
  }

  /**
   * Exporta a nuvem como imagem PNG em Base64
   */
  exportAsDataURL(canvas) {
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  }
}

window.wordCloudEngine = new WordCloudEngine();

