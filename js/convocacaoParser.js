/**
 * CapacitaTE - Parser de Ofícios de Convocação
 * Versão: v.4.3.9
 */

class ConvocacaoParser {
  constructor() {
    this.pdfjsLoaded = false;
  }

  /**
   * Normaliza strings para busca e comparação
   */
  /**
   * Verifica se o nome normalizado do município aparece como termo inteiro no texto normalizado,
   * ignorando menções ao estado (ex.: "Estado de Goiás" não indica o município de Goiás)
   */
  containsCityName(normText, normCity) {
    if (!normText || !normCity) return false;
    // normalizeText só deixa letras, dígitos, "_" e espaços: o nome pode entrar direto na expressão regular
    const re = new RegExp(`(?<![a-z0-9])(?<!estado d[eo] )${normCity}(?![a-z0-9])`);
    return re.test(normText);
  }

  normalizeText(text) {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Busca município no catálogo oficial do IBGE
   */
  findIbgeMunicipality(cityName, uf) {
    if (!window.IBGE_DATA || !cityName) return null;
    const norm = this.normalizeText(cityName);
    const ufUpper = (uf || '').toUpperCase();

    // 1. Tentar correspondência exata de nome e UF
    let match = window.IBGE_DATA.find(m => 
      m.u === ufUpper && this.normalizeText(m.n) === norm
    );
    if (match) return match;

    // 2. Tentar correspondência exata apenas de nome
    match = window.IBGE_DATA.find(m => this.normalizeText(m.n) === norm);
    if (match) return match;

    // 3. Tentar busca com prefixo/sufixo na mesma UF
    if (ufUpper) {
      match = window.IBGE_DATA.find(m => 
        m.u === ufUpper && (this.normalizeText(m.n).startsWith(norm) || norm.startsWith(this.normalizeText(m.n)))
      );
      if (match) return match;
    }

    return null;
  }

  /**
   * Calcula a distância geodésica em LINHA RETA entre dois pontos (Fórmula de Haversine)
   */
  calculateStraightLineDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) return 0.0;
    if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) return 0.0;

    const R = 6371.0; // Raio médio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180.0;
    const dLon = (lon2 - lon1) * Math.PI / 180.0;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180.0) * Math.cos(lat2 * Math.PI / 180.0) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // 1 casa decimal
  }

  /**
   * Calcula a distância em LINHA RETA (km) no mapa real entre um município e o Polo Capacitador
   * através da fórmula geodésica de Haversine, SEM consultar base de dados histórica.
   */
  calculateDistanceToPolo(cityName, cityUf, poloName, poloUf) {
    if (!cityName || !poloName) return 0.0;
    
    const normCity = this.normalizeText(cityName);
    const normPolo = this.normalizeText(poloName);
    const uCity = (cityUf || '').toUpperCase();
    const uPolo = (poloUf || cityUf || '').toUpperCase();

    // Se o município for exatamente o próprio polo capacitador (mesmo nome normalizado e mesmo estado)
    if (normCity === normPolo && (uCity === uPolo || !uCity || !uPolo)) {
      return 0.0;
    }

    const cityObj = this.findIbgeMunicipality(cityName, cityUf);
    const poloObj = this.findIbgeMunicipality(poloName, poloUf || cityUf);

    if (cityObj && poloObj) {
      if (cityObj.c === poloObj.c) {
        return 0.0;
      }
      if (cityObj.la !== undefined && poloObj.la !== undefined) {
        return this.calculateStraightLineDistance(cityObj.la, cityObj.lo, poloObj.la, poloObj.lo);
      }
    }

    return 0.0;
  }

  /**
   * Extrai texto completo de um arquivo PDF enviado pelo usuário
   */
  async extractTextFromPdf(file) {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('Biblioteca PDF.js não foi carregada. Verifique a conexão ou os arquivos de vendor.');
    }

    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    let pageTexts = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageLines = [];
      let lastY = null;
      let currentLine = '';

      for (const item of textContent.items) {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          if (currentLine.trim()) pageLines.push(currentLine.trim());
          currentLine = item.str;
        } else {
          currentLine += (currentLine ? ' ' : '') + item.str;
        }
        lastY = item.transform[5];
      }
      if (currentLine.trim()) pageLines.push(currentLine.trim());

      const pageStr = pageLines.join('\n');
      pageTexts.push(pageStr);
      fullText += pageStr + '\n\n';
    }

    return { fullText, pageTexts, numPages: pdf.numPages };
  }

  /**
   * Analisa o texto bruto da Convocação e extrai todos os tópicos estruturados
   */
  parseConvocacaoText(rawText) {
    const text = rawText.replace(/\r\n/g, '\n');
    const result = {
      uf: '',
      polo: '',
      poloIbge: '',
      title: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      startDate: '',
      endDate: '',
      datesFormatted: '',
      workload: '16 horas',
      workloadNum: 16,
      venue: '',
      address: '',
      targetAudience: 'Gestores municipais e conselheiros do CACS-FUNDEB',
      expectedParticipants: 0,
      invitedMunicipalitiesCount: 0,
      municipalitiesByDate: {},
      allMunicipalities: [],
      linkInscricao: '',
      linkLocalizacao: '',
      rawText: rawText
    };

    // 1. Identificar Estado (UF)
    const ufMatches = text.match(/Estado d[eo]\s+([A-Za-zÀ-ÖØ-öø-ÿ\s]+)/i) || 
                      text.match(/-(MT|MS|GO|DF|AC|AL|AP|AM|BA|CE|ES|MA|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)/i);
    
    if (ufMatches) {
      const stateStr = ufMatches[1].trim();
      if (stateStr.length === 2) {
        result.uf = stateStr.toUpperCase();
      } else {
        const stateLower = stateStr.toLowerCase();
        if (stateLower.includes('mato grosso do sul')) result.uf = 'MS';
        else if (stateLower.includes('mato grosso')) result.uf = 'MT';
        else if (stateLower.includes('goiás') || stateLower.includes('goias')) result.uf = 'GO';
        else if (stateLower.includes('distrito federal')) result.uf = 'DF';
      }
    }
    if (!result.uf) result.uf = 'MT'; // Padrão CECATE CO

    // 2. Identificar Polo Regional / Município Polo
    const poloMatch = text.match(/Campus\s+(?:de\s+|do\s+)?([A-Za-zÀ-ÖØ-öø-ÿ\s]+?)\s+(?:do|da|de|\-)/i) ||
                       text.match(/Endereço:.*?,?\s*([A-Za-zÀ-ÖØ-öø-ÿ\s]+?)\s*-\s*(?:MT|MS|GO|DF)/i) ||
                       text.match(/realizada\s+em\s+([A-Za-zÀ-ÖØ-öø-ÿ\s]+?)\s*-\s*(?:MT|MS|GO|DF)/i);

    if (poloMatch) {
      let candidatePolo = poloMatch[1].trim()
        .replace(/^Instituto\s+Federal\s+/i, '')
        .replace(/^IFMT\s+/i, '')
        .replace(/^Campus\s+/i, '')
        .replace(/do\s+Instituto.*/i, '')
        .replace(/\s+-\s+.*$/, '')
        .trim();
      
      const matchedCity = this.findIbgeMunicipality(candidatePolo, result.uf);
      if (matchedCity) {
        result.polo = matchedCity.n;
        result.poloIbge = String(matchedCity.c);
      } else {
        result.polo = candidatePolo;
      }
    }

    if (!result.polo && window.IBGE_DATA) {
      const stateCities = window.IBGE_DATA.filter(m => m.u === result.uf);
      const normText = this.normalizeText(text);
      for (const city of stateCities) {
        if (normText.includes(this.normalizeText(city.n))) {
          result.polo = city.n;
          result.poloIbge = String(city.c);
          break;
        }
      }
    }

    // 3. Identificar Datas da Capacitação
    const dateMatch = text.match(/(?:dias|capacitação:?)\s*(\d{1,2})(?:\s*e\s*|\s*a\s*|\s*,\s*)?(\d{1,2})?\s+de\s+([a-zç]+)\s+de\s+(\d{4})/i);
    
    if (dateMatch) {
      const day1 = parseInt(dateMatch[1]);
      const day2 = dateMatch[2] ? parseInt(dateMatch[2]) : day1;
      const monthName = dateMatch[3].toLowerCase();
      const year = parseInt(dateMatch[4]);

      const MESES = ['janeiro','fevereiro','março','marco','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
      const monthIdx = MESES.findIndex(m => monthName.includes(m));

      if (monthIdx !== -1) {
        const mm = String((monthIdx >= 12 ? monthIdx % 12 : monthIdx) + 1).padStart(2, '0');
        const dd1 = String(day1).padStart(2, '0');
        const dd2 = String(day2).padStart(2, '0');

        result.startDate = `${year}-${mm}-${dd1}`;
        result.endDate = `${year}-${mm}-${dd2}`;

        const numDays = Math.max(1, day2 - day1 + 1);
        result.workloadNum = numDays * 8;
        result.workload = `${result.workloadNum} horas`;

        const monthFull = MESES[monthIdx >= 12 ? monthIdx % 12 : monthIdx];
        if (day1 === day2) {
          result.datesFormatted = `${day1} de ${monthFull} de ${year}`;
        } else if (numDays === 2) {
          result.datesFormatted = `${day1} e ${day2} de ${monthFull} de ${year}`;
        } else {
          result.datesFormatted = `${day1} a ${day2} de ${monthFull} de ${year}`;
        }
      }
    }

    // 4. Identificar Local e Endereço
    const localMatch = text.match(/Local:\s*([^\n]+)/i);
    if (localMatch) {
      result.venue = localMatch[1].trim();
    } else {
      const auditMatch = text.match(/(Auditório[^\n,]+)/i);
      if (auditMatch) result.venue = auditMatch[1].trim();
    }

    const endMatch = text.match(/Endereço:\s*([^\n]+)/i);
    if (endMatch) {
      result.address = endMatch[1].trim();
    }

    // 5. Identificar Quantidade de Municípios Convocados
    const countMatch = text.match(/(\d+)\s+municípios\s+do\s+Estado/i);
    if (countMatch) {
      result.invitedMunicipalitiesCount = parseInt(countMatch[1]);
    }

    // 6. Varredura Completa de Municípios Convocados (divididos por data ou bloco)
    const groupSections = text.split(/(?:Municípios convidados|Convocados)\s*\((.*?)\)/gi);

    if (groupSections.length > 1) {
      for (let i = 1; i < groupSections.length; i += 2) {
        const groupLabel = groupSections[i].trim();
        const groupContent = groupSections[i + 1] || '';
        
        const extractedCities = this.extractCityNamesFromBlock(groupContent, result.uf);
        result.municipalitiesByDate[groupLabel] = extractedCities;
        
        extractedCities.forEach(cityObj => {
          if (!result.allMunicipalities.some(c => c.code === cityObj.code)) {
            const dist = this.calculateDistanceToPolo(cityObj.name, cityObj.uf, result.polo, result.uf);
            result.allMunicipalities.push({ ...cityObj, dateGroup: groupLabel, distanceKm: dist });
          }
        });
      }
    }

    // Se ainda não encontrou todas as cidades pelo split por data, fazer varredura no texto inteiro
    if (result.allMunicipalities.length === 0 || (result.invitedMunicipalitiesCount > 0 && result.allMunicipalities.length < result.invitedMunicipalitiesCount)) {
      const allFound = this.extractCityNamesFromBlock(text, result.uf);
      allFound.forEach(cityObj => {
        if (!result.allMunicipalities.some(c => c.code === cityObj.code)) {
          const dist = this.calculateDistanceToPolo(cityObj.name, cityObj.uf, result.polo, result.uf);
          result.allMunicipalities.push({ ...cityObj, dateGroup: 'Geral', distanceKm: dist });
        }
      });
    }

    // Garantir que a distância de todos esteja calculada em LINHA RETA (Haversine real) em relação ao Polo
    result.allMunicipalities.forEach(m => {
      m.distanceKm = this.calculateDistanceToPolo(m.name, m.uf, result.polo, result.uf);
    });

    if (result.invitedMunicipalitiesCount === 0) {
      result.invitedMunicipalitiesCount = result.allMunicipalities.length;
    }
    result.expectedParticipants = (result.invitedMunicipalitiesCount || result.allMunicipalities.length) * 4;

    return result;
  }

  /**
   * Realiza varredura completa de municípios válidos da base IBGE no texto do PDF
   */
  extractCityNamesFromBlock(blockText, uf) {
    if (!window.IBGE_DATA) return [];
    
    const foundCities = [];
    const stateCities = window.IBGE_DATA.filter(m => m.u === uf);
    const normalizedBlock = this.normalizeText(blockText);

    // 1. Dividir em fragmentos por linhas, marcadores de tópicos e colunas
    const chunks = blockText
      .split(/[\n\r■•\*\|\t;]+/)
      .map(s => s.trim())
      .filter(s => s.length >= 3);

    for (const chunk of chunks) {
      const normChunk = this.normalizeText(chunk);
      for (const city of stateCities) {
        const normCity = this.normalizeText(city.n);
        if (normChunk === normCity || this.containsCityName(normChunk, normCity)) {
          if (!foundCities.some(c => c.code === city.c)) {
            foundCities.push({
              name: city.n,
              code: city.c,
              uf: city.u,
              distanceKm: 0.0
            });
          }
        }
      }
    }

    // 2. Varredura global de segurança insensível a acentos sobre o bloco inteiro
    for (const city of stateCities) {
      const normCity = this.normalizeText(city.n);
      if (normCity.length >= 4 && this.containsCityName(normalizedBlock, normCity)) {
        if (!foundCities.some(c => c.code === city.c)) {
          foundCities.push({
            name: city.n,
            code: city.c,
            uf: city.u,
            distanceKm: 0.0
          });
        }
      }
    }

    return foundCities;
  }
}

window.convocacaoParser = new ConvocacaoParser();

