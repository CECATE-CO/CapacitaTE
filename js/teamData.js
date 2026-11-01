/**
 * CapacitaTE - Dados Oficiais da Equipe do Projeto (UFG & FNDE)
 * Versão: v.4.4.1
 */

window.OFFICIAL_PRONOUNS = [
  { value: 'NENHUM', label: '(Nenhum pronome)' },
  { value: 'Prof.', label: 'Prof. (Professor)' },
  { value: 'Prof.ª', label: 'Prof.ª (Professora)' },
  { value: 'Eng.', label: 'Eng. (Engenheiro/a)' },
  { value: 'Eng.ª', label: 'Eng.ª (Engenheira)' },
  { value: 'Pesquisador Visitante', label: 'Pesquisador Visitante' },
  { value: 'Pesquisadora Visitante', label: 'Pesquisadora Visitante' }
];

window.OFFICIAL_TITLES = [
  { value: 'NENHUM', label: '(Nenhuma titulação)' },
  { value: 'Dr.', label: 'Dr. (Doutor)' },
  { value: 'Dra.', label: 'Dra. (Doutora)' },
  { value: 'M.Sc.', label: 'M.Sc. (Mestre)' }
];

window.OFFICIAL_ROLES = [
  // UFG
  { value: 'Coordenador do Projeto', group: 'UFG' },
  { value: 'Coordenador Geral do Projeto', group: 'UFG' },
  { value: 'Equipe Técnica', group: 'UFG' },
  { value: 'Pesquisador e Equipe Técnica', group: 'UFG' },
  { value: 'Pesquisadora e Equipe Técnica', group: 'UFG' },
  { value: 'Pesquisador(a) Visitante', group: 'UFG' },
  { value: 'Instrutor Técnico', group: 'UFG' },
  { value: 'Instrutora Técnica', group: 'UFG' },
  { value: 'Apoio Administrativo', group: 'UFG' },
  // FNDE
  { value: 'Coordenador-Geral da Política do Transporte Escolar – CGPTE', group: 'FNDE' },
  { value: 'Coordenadora de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar – CMATE', group: 'FNDE' },
  { value: 'Coordenador de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar – CMATE', group: 'FNDE' },
  { value: 'Coordenadora de Apoio ao Transporte Escolar – COATE', group: 'FNDE' },
  { value: 'Coordenador de Apoio ao Transporte Escolar – COATE', group: 'FNDE' },
  { value: 'Coordenadora de Apoio ao Caminho da Escola – COACE', group: 'FNDE' },
  { value: 'Coordenador de Apoio ao Caminho da Escola – COACE', group: 'FNDE' },
  { value: 'Representante Técnico FNDE', group: 'FNDE' },
  { value: 'Técnico(a) FNDE', group: 'FNDE' },
  { value: 'Outro Cargo', group: 'Geral' }
];

window.formatTeamMemberFullName = function(m) {
  if (!m) return '';
  const parts = [];
  if (m.pronoun && m.pronoun.trim() && m.pronoun !== 'NENHUM' && m.pronoun !== '__unselected__') {
    parts.push(m.pronoun.trim());
  }
  if (m.title && m.title.trim() && m.title !== 'NENHUM' && m.title !== '__unselected__') {
    parts.push(m.title.trim());
  }
  if (m.name && m.name.trim()) {
    parts.push(m.name.trim());
  }
  return parts.join(' ') || m.fullName || m.name || '';
};

window.DEFAULT_OFFICIAL_TEAM = [
  // 1. UNIVERSIDADE FEDERAL DE GOIÁS - UFG: Coordenador do Projeto
  {
    id: 'team_ufg_coord',
    institutionGroup: 'UFG',
    pronoun: 'Prof.',
    title: 'Dr.',
    name: 'Willer Luciano Carvalho',
    fullName: 'Prof. Dr. Willer Luciano Carvalho',
    role: 'Coordenador do Projeto',
    institution: 'UFG',
    type: 'coordenacao',
    order: 0
  },
  // 2. UNIVERSIDADE FEDERAL DE GOIÁS - UFG: Equipe Técnica
  {
    id: 'team_ufg_1',
    institutionGroup: 'UFG',
    pronoun: 'Eng.',
    title: 'M.Sc.',
    name: 'Lara Batista Ferreira de Lima',
    fullName: 'Eng. M.Sc. Lara Batista Ferreira de Lima',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 1
  },
  {
    id: 'team_ufg_2',
    institutionGroup: 'UFG',
    pronoun: 'Eng.',
    title: 'Dr.',
    name: 'Matheus Henrique Morato de Moraes',
    fullName: 'Eng. Dr. Matheus Henrique Morato de Moraes',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 2
  },
  {
    id: 'team_ufg_3',
    institutionGroup: 'UFG',
    pronoun: 'Prof.',
    title: 'Dr.',
    name: 'Liosber Medina Garcia',
    fullName: 'Prof. Dr. Liosber Medina Garcia',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 3
  },
  {
    id: 'team_ufg_4',
    institutionGroup: 'UFG',
    pronoun: 'Prof.',
    title: 'Dr.',
    name: 'Marcos Paulino Roriz Junior',
    fullName: 'Prof. Dr. Marcos Paulino Roriz Junior',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 4
  },
  {
    id: 'team_ufg_5',
    institutionGroup: 'UFG',
    pronoun: 'Prof.',
    title: 'Dr.',
    name: 'Robinson Andrés Giraldo Zuluaga',
    fullName: 'Prof. Dr. Robinson Andrés Giraldo Zuluaga',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 5
  },
  {
    id: 'team_ufg_6',
    institutionGroup: 'UFG',
    pronoun: 'Prof.',
    title: 'Dr.',
    name: 'Ronny Marcelo Aliaga Medrano',
    fullName: 'Prof. Dr. Ronny Marcelo Aliaga Medrano',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 6
  },
  {
    id: 'team_ufg_7',
    institutionGroup: 'UFG',
    pronoun: 'Pesquisadora Visitante',
    title: 'Dra.',
    name: 'Yaeko Yamashita',
    fullName: 'Pesquisadora Visitante Dra. Yaeko Yamashita',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 7
  },
  {
    id: 'team_ufg_8',
    institutionGroup: 'UFG',
    pronoun: 'Pesquisador Visitante',
    title: '',
    name: 'José Maria Rodrigues de Souza',
    fullName: 'Pesquisador Visitante José Maria Rodrigues de Souza',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 8
  },
  // 3. FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO – FNDE
  {
    id: 'team_fnde_1',
    institutionGroup: 'FNDE',
    pronoun: '',
    title: '',
    name: 'Haroldo da Silva Gomes',
    fullName: 'Haroldo da Silva Gomes',
    role: 'Coordenador-Geral da Política do Transporte Escolar – CGPTE',
    institution: 'FNDE',
    type: 'fnde',
    order: 9
  },
  {
    id: 'team_fnde_2',
    institutionGroup: 'FNDE',
    pronoun: '',
    title: '',
    name: 'Daniela Oshiro Yanaze',
    fullName: 'Daniela Oshiro Yanaze',
    role: 'Coordenadora de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar – CMATE',
    institution: 'FNDE',
    type: 'fnde',
    order: 10
  },
  {
    id: 'team_fnde_3',
    institutionGroup: 'FNDE',
    pronoun: '',
    title: '',
    name: 'Neuza Helena Portugal dos Santos',
    fullName: 'Neuza Helena Portugal dos Santos',
    role: 'Coordenadora de Apoio ao Transporte Escolar – COATE',
    institution: 'FNDE',
    type: 'fnde',
    order: 11
  },
  {
    id: 'team_fnde_4',
    institutionGroup: 'FNDE',
    pronoun: '',
    title: '',
    name: 'Maria Angelica Floriano Pedrosa',
    fullName: 'Maria Angelica Floriano Pedrosa',
    role: 'Coordenadora de Apoio ao Caminho da Escola – COACE',
    institution: 'FNDE',
    type: 'fnde',
    order: 12
  }
];

// Carregar equipe mestra personalizada salva em localStorage ou usar padrão
window.getMasterTeam = function() {
  try {
    const saved = localStorage.getItem('autoreport_master_team'); // chave legada mantida para compatibilidade
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Atualização do título padrão (M.Sc. -> Dr.) na equipe mestra já salva no navegador; só altera o valor antigo
        const matheus = parsed.find(m => m.name === 'Matheus Henrique Morato de Moraes' && m.title === 'M.Sc.');
        if (matheus) {
          matheus.title = 'Dr.';
          matheus.fullName = 'Eng. Dr. Matheus Henrique Morato de Moraes';
          localStorage.setItem('autoreport_master_team', JSON.stringify(parsed)); // chave legada mantida para compatibilidade
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar equipe mestra:', e);
  }
  return window.DEFAULT_OFFICIAL_TEAM.map(m => ({ ...m }));
};

window.saveMasterTeam = function(team) {
  try {
    localStorage.setItem('autoreport_master_team', JSON.stringify(team)); // chave legada mantida para compatibilidade
  } catch (e) {
    console.warn('Erro ao salvar equipe mestra:', e);
  }
};

