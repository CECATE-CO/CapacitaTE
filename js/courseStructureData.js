/**
 * CapacitaTE - Catálogo Oficial de Estrutura de Cursos
 * Versão: v.4.4.4
 */

window.DEFAULT_COURSE_STRUCTURE = [
  {
    id: "mod_default_01",
    moduleNumber: "01",
    order: 1,
    isShared: true,
    gestorTopics: [
      { id: "top_g_01", topic: "Transporte Escolar no Brasil, CECATE-CO", hours: 1.5 }
    ],
    cacsTopics: [
      { id: "top_c_01", topic: "Transporte Escolar no Brasil, CECATE-CO", hours: 1.5 }
    ]
  },
  {
    id: "mod_default_02",
    moduleNumber: "02",
    order: 2,
    isShared: true,
    gestorTopics: [
      { id: "top_g_02", topic: "Conhecendo os programas PNATE e Caminho da Escola", hours: 1.5 }
    ],
    cacsTopics: [
      { id: "top_c_02", topic: "Conhecendo os programas PNATE e Caminho da Escola", hours: 1.5 }
    ]
  },
  {
    id: "mod_default_03",
    moduleNumber: "03",
    order: 3,
    isShared: true,
    gestorTopics: [
      { id: "top_g_03", topic: "Planejamento e Regulação do Transporte Escolar", hours: 2.0 }
    ],
    cacsTopics: [
      { id: "top_c_03", topic: "Planejamento e Regulação do Transporte Escolar", hours: 2.0 }
    ]
  },
  {
    id: "mod_default_04",
    moduleNumber: "04",
    order: 4,
    isShared: false,
    gestorTopics: [
      { id: "top_g_04_1", topic: "Software Eletrônico de Gestão do Transporte Escolar, SETE", hours: 3.0 }
    ],
    cacsTopics: [
      { id: "top_c_04_1", topic: "Competências do Conselho de Acompanhamento e Controle Social", hours: 2.0 },
      { id: "top_c_04_2", topic: "Software Eletrônico de Gestão do Transporte Escolar, SETE", hours: 1.0 }
    ]
  }
];

window.courseStructureHelper = {
  /**
   * Obtém a lista completa de templates/modelos de estrutura de curso
   */
  getTemplatesList() {
    try {
      const stored = localStorage.getItem('cecate_course_templates_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar templates do localStorage:', e);
    }
    const defaultTemplate = {
      id: 'template_default_official',
      name: 'Modelo Padrão',
      description: 'Estrutura oficial protegida utilizada como padrão institucional do CECATE-CO.',
      isDefault: true,
      isProtected: true,
      modules: this.getDefaultCopy()
    };
    this.saveTemplatesList([defaultTemplate]);
    return [defaultTemplate];
  },

  /**
   * Salva a lista de templates no localStorage
   */
  saveTemplatesList(templates) {
    try {
      localStorage.setItem('cecate_course_templates_v2', JSON.stringify(templates));
    } catch (e) {
      console.warn('Erro ao salvar templates:', e);
    }
  },

  /**
   * Obtém o modelo padrão atualmente ativo
   */
  getDefaultTemplate() {
    const list = this.getTemplatesList();
    return list.find(t => t.isDefault) || list[0];
  },

  /**
   * Obtém um template pelo ID
   */
  getTemplateById(id) {
    const list = this.getTemplatesList();
    return list.find(t => t.id === id) || this.getDefaultTemplate();
  },

  /**
   * Cria uma nova estrutura de curso personalizada a partir de um modelo ou limpa
   */
  createTemplate(name, description, originTemplateId = 'template_default_official') {
    const list = this.getTemplatesList();
    let sourceModules = [];
    if (originTemplateId === 'clean') {
      sourceModules = [];
    } else {
      const sourceTpl = this.getTemplateById(originTemplateId);
      sourceModules = sourceTpl ? sourceTpl.modules : this.getDefaultCopy();
    }

    const newTpl = {
      id: `tpl_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: (name || '').trim() || 'Nova Estrutura Personalizada',
      description: (description || '').trim() || 'Estrutura de curso personalizada',
      isDefault: false,
      isProtected: false,
      modules: this.makeDeepCopy(sourceModules)
    };

    list.push(newTpl);
    this.saveTemplatesList(list);
    return newTpl;
  },

  /**
   * Atualiza o nome e a descrição de uma estrutura
   */
  updateTemplateDetails(templateId, name, description) {
    const list = this.getTemplatesList();
    const tpl = list.find(t => t.id === templateId);
    if (!tpl) return null;
    if (name !== undefined && name !== null) {
      tpl.name = name.trim() || 'Estrutura sem nome';
    }
    if (description !== undefined && description !== null) {
      tpl.description = description.trim();
    }
    this.saveTemplatesList(list);
    return tpl;
  },

  /**
   * Atualiza os módulos de um template existente
   */
  updateTemplateModules(templateId, modules) {
    const list = this.getTemplatesList();
    const tpl = list.find(t => t.id === templateId);
    if (!tpl) return;
    tpl.modules = this.normalize(modules);
    this.saveTemplatesList(list);
    return tpl;
  },

  /**
   * Duplica um template existente
   */
  duplicateTemplate(templateId, newName) {
    const target = this.getTemplateById(templateId);
    if (!target) return null;
    return this.createTemplate(
      newName || `${target.name} (Cópia)`,
      `Cópia criada a partir de ${target.name}`,
      target.id
    );
  },

  /**
   * Define uma estrutura como o Modelo Padrão Ativo
   */
  setDefaultTemplate(templateId) {
    const list = this.getTemplatesList();
    list.forEach(t => {
      t.isDefault = (t.id === templateId);
    });
    this.saveTemplatesList(list);
  },

  /**
   * Exclui uma estrutura personalizada (Modelo Padrão protegido não pode ser excluído)
   */
  deleteTemplate(templateId) {
    let list = this.getTemplatesList();
    const target = list.find(t => t.id === templateId);
    if (!target || target.isProtected || target.isDefault) {
      return false;
    }
    list = list.filter(t => t.id !== templateId);
    this.saveTemplatesList(list);
    return true;
  },

  /**
   * Gera uma cópia profunda (deep copy) independente a partir de módulos
   */
  makeDeepCopy(modules = []) {
    const norm = this.normalize(modules);
    return JSON.parse(JSON.stringify(norm)).map((mod, idx) => ({
      ...mod,
      id: `mod_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`,
      gestorTopics: (mod.gestorTopics || []).map((t, ti) => ({
        ...t,
        id: `top_g_${Date.now()}_${idx}_${ti}_${Math.random().toString(36).substr(2, 4)}`
      })),
      cacsTopics: (mod.cacsTopics || []).map((t, ti) => ({
        ...t,
        id: `top_c_${Date.now()}_${idx}_${ti}_${Math.random().toString(36).substr(2, 4)}`
      }))
    }));
  },

  /**
   * Obtém a Estrutura Mestre do Modelo Padrão ativo
   */
  getMasterStructure() {
    const defaultTpl = this.getDefaultTemplate();
    return this.normalize(defaultTpl.modules || []);
  },

  /**
   * Salva a Estrutura Mestre no Modelo Padrão ativo
   */
  saveMasterStructure(modules) {
    const defaultTpl = this.getDefaultTemplate();
    return this.updateTemplateModules(defaultTpl.id, modules);
  },

  /**
   * Retorna uma cópia profunda (deep copy) independente do Modelo Padrão ativo
   */
  getMasterCopy() {
    return this.makeDeepCopy(this.getMasterStructure());
  },

  /**
   * Retorna uma cópia profunda (deep copy) independente do modelo oficial de fábrica
   */
  getDefaultCopy() {
    return JSON.parse(JSON.stringify(window.DEFAULT_COURSE_STRUCTURE)).map((mod, idx) => ({
      ...mod,
      id: `mod_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`,
      gestorTopics: (mod.gestorTopics || []).map((t, ti) => ({
        ...t,
        id: `top_g_${Date.now()}_${idx}_${ti}_${Math.random().toString(36).substr(2, 4)}`
      })),
      cacsTopics: (mod.cacsTopics || []).map((t, ti) => ({
        ...t,
        id: `top_c_${Date.now()}_${idx}_${ti}_${Math.random().toString(36).substr(2, 4)}`
      }))
    }));
  },

  /**
   * Duplica um módulo dentro de uma estrutura (deep copy)
   */
  duplicateModule(modules = [], modIdx = 0) {
    const norm = this.normalize(modules);
    if (modIdx < 0 || modIdx >= norm.length) return norm;

    const target = norm[modIdx];
    const copy = JSON.parse(JSON.stringify(target));
    copy.id = `mod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    copy.gestorTopics = (copy.gestorTopics || []).map((t, ti) => ({
      ...t,
      id: `top_g_${Date.now()}_${ti}_${Math.random().toString(36).substr(2, 4)}`
    }));
    copy.cacsTopics = (copy.cacsTopics || []).map((t, ti) => ({
      ...t,
      id: `top_c_${Date.now()}_${ti}_${Math.random().toString(36).substr(2, 4)}`
    }));

    norm.splice(modIdx + 1, 0, copy);
    return this.autoRenumber(norm);
  },

  /**
   * Renumera e reordena os módulos automaticamente (01, 02, 03...)
   */
  autoRenumber(modules = []) {
    return modules.map((m, idx) => ({
      ...m,
      order: idx + 1,
      moduleNumber: idx < 9 ? `0${idx + 1}` : `${idx + 1}`
    }));
  },

  /**
   * Normaliza a lista de módulos garantindo compatibilidade com formatos legados e o novo padrão hierárquico
   */
  normalize(modules = []) {
    if (!Array.isArray(modules)) {
      return this.getDefaultCopy();
    }
    if (modules.length === 0) {
      return [];
    }

    return modules.map((m, idx) => {
      let gTopics = [];
      let cTopics = [];

      if (Array.isArray(m.gestorTopics) && m.gestorTopics.length > 0) {
        gTopics = m.gestorTopics.map((gt, gti) => ({
          id: gt.id || `top_g_${Date.now()}_${idx}_${gti}`,
          topic: gt.topic || '',
          hours: parseFloat(gt.hours) || 0
        }));
      } else if (m.topicGestor) {
        gTopics = [{
          id: `top_g_${Date.now()}_${idx}_0`,
          topic: m.topicGestor,
          hours: parseFloat(m.hoursGestor) || 0
        }];
      } else {
        gTopics = [{
          id: `top_g_${Date.now()}_${idx}_0`,
          topic: '',
          hours: 0
        }];
      }

      if (Array.isArray(m.cacsTopics) && m.cacsTopics.length > 0) {
        cTopics = m.cacsTopics.map((ct, cti) => ({
          id: ct.id || `top_c_${Date.now()}_${idx}_${cti}`,
          topic: ct.topic || '',
          hours: parseFloat(ct.hours) || 0
        }));
      } else if (m.topicCACS) {
        cTopics = [{
          id: `top_c_${Date.now()}_${idx}_0`,
          topic: m.topicCACS,
          hours: parseFloat(m.hoursCACS) || 0
        }];
      } else {
        cTopics = [{
          id: `top_c_${Date.now()}_${idx}_0`,
          topic: '',
          hours: 0
        }];
      }

      let isShared = m.isShared;
      if (isShared === undefined) {
        isShared = (gTopics.length === cTopics.length) && gTopics.every((gt, i) => gt.topic === cTopics[i]?.topic && gt.hours === cTopics[i]?.hours);
      }

      if (isShared) {
        // Garantir sincronia completa em módulos compartilhados
        cTopics = gTopics.map((gt, gti) => ({
          id: cTopics[gti]?.id || `top_c_${Date.now()}_${idx}_${gti}`,
          topic: gt.topic,
          hours: gt.hours
        }));
      }

      return {
        id: m.id || `mod_${Date.now()}_${idx}`,
        moduleNumber: m.moduleNumber || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
        order: m.order !== undefined ? m.order : idx + 1,
        isShared: !!isShared,
        gestorTopics: gTopics,
        cacsTopics: cTopics
      };
    });
  },

  /**
   * Calcula os totais de carga horária para Gestores e CACS
   */
  calculateTotals(modules = []) {
    const norm = this.normalize(modules);
    let totalGestor = 0;
    let totalCACS = 0;

    norm.forEach(m => {
      (m.gestorTopics || []).forEach(t => {
        totalGestor += parseFloat(t.hours) || 0;
      });
      (m.cacsTopics || []).forEach(t => {
        totalCACS += parseFloat(t.hours) || 0;
      });
    });

    return { totalGestor, totalCACS };
  }
};


