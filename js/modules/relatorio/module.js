/**
 * CapacitaTE - Módulo Relatório (adaptador fino do assistente de 12 etapas existente em js/app.js)
 * Versão: v.4.4.2
 */

(function () {
  const ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  const openReport = (trainingId, step = 1) => {
    if (!window.app || !trainingId) return;
    return window.app.openWizard(trainingId, parseInt(step) || 1);
  };

  /**
   * Abas de Relatórios no topo das telas Equipe Técnica e Estrutura do Curso
   */
  function addReportTabs() {
    const tabs = [{ view: 'report-final', label: 'Relatório final' }, { view: 'team', label: 'Equipe Técnica' }, { view: 'course-structure', label: 'Estrutura do Curso' }];
    tabs.forEach(({ view }) => {
      const section = document.getElementById(`view-${view}`);
      if (!section || section.querySelector(':scope > .reports-tabs')) return;
      const nav = document.createElement('nav');
      nav.className = 'reports-tabs';
      nav.setAttribute('aria-label', 'Relatórios');
      tabs.forEach(t => {
        const a = document.createElement('a');
        a.href = `#${t.view}`;
        a.textContent = t.label;
        a.className = `reports-tab${t.view === view ? ' active' : ''}`;
        if (t.view === view) a.setAttribute('aria-current', 'page');
        nav.appendChild(a);
      });
      section.insertBefore(nav, section.firstChild);
    });
  }
  document.addEventListener('DOMContentLoaded', addReportTabs);

  CapacitaTE.registerModule({
    key: 'relatorio',
    title: 'Relatório automático',
    icon: `<svg ${ICON_ATTRS}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
    order: 10,
    actions: ['view', 'edit', 'generate'],
    perTraining: true,

    // As telas do relatório continuam em index.html; montar o módulo é abrir o assistente da capacitação
    mount: (container, ctx = {}) => openReport(ctx.trainingId, ctx.step),

    // Capacitações (cada uma com as 3 etapas) e Relatórios (Equipe Técnica e Estrutura do Curso)
    menu: [
      {
        view: 'trainings', title: 'Capacitações', order: 10,
        icon: `<svg ${ICON_ATTRS}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`
      },
      {
        // Equipe Técnica e Estrutura do Curso ficam como abas dentro de Relatórios
        view: 'report-final', views: ['report-final', 'team', 'course-structure'], title: 'Relatórios', order: 30,
        icon: `<svg ${ICON_ATTRS}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`
      }
    ],

    // #/relatorio/<id> e #/relatorio/<id>/<etapa> abrem o assistente atual (o hash legado #wizard/... continua válido)
    routes: {
      'relatorio/:id': ({ id }) => openReport(id, 1),
      'relatorio/:id/:step': ({ id, step }) => openReport(id, step)
    }
  });
})();
