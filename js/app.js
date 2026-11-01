/**
 * CapacitaTE - Controlador Geral da Aplicação (Wizard, UI e Integração de Módulos)
 * Versão: v.4.4.1
 */

window.icons = {
  edit: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  delete: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
  search: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  lock: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  plus: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  close: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  save: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`,
  user: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  building: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="6" x2="9" y2="6.01"></line><line x1="15" y1="6" x2="15" y2="6.01"></line><line x1="9" y1="10" x2="9" y2="10.01"></line><line x1="15" y1="10" x2="15" y2="10.01"></line><line x1="9" y1="14" x2="9" y2="14.01"></line><line x1="15" y1="14" x2="15" y2="14.01"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>`,
  check: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  logout: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 5 12 10 7"></polyline><line x1="15" y1="12" x2="5" y2="12"></line></svg>`,
  filter: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  stepForward: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-left:5px;"><line x1="5" y1="12" x2="15" y2="12"></line><polyline points="10 7 15 12 10 17"></polyline><line x1="19" y1="5" x2="19" y2="19"></line></svg>`,
  stepBackward: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:5px;"><line x1="5" y1="5" x2="5" y2="19"></line><line x1="19" y1="12" x2="9" y2="12"></line><polyline points="14 7 9 12 14 17"></polyline></svg>`,
  sede: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10v2"></path><path d="M15 10v2"></path><path d="M9 14v2"></path><path d="M15 14v2"></path></svg>`,
  rename: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="2" y="5.5" width="16" height="12" rx="2.5"></rect><circle cx="6.5" cy="13" r="1.8"></circle><path d="M8.3 11.2v3.6"></path><path d="M10.3 9.2v5.6"></path><circle cx="12.3" cy="13" r="1.8"></circle><line x1="18" y1="2.5" x2="18" y2="21.5"></line><path d="M16 2.5h4"></path><path d="M16 21.5h4"></path></svg>`,
  pin: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  calendar: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  file: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
  camera: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
  folder: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`
};

class CapacitaTEApp {
  constructor() {
    this.currentTraining = null;
    this.currentStep = 1;
    this.totalSteps = 12;
    this.activeView = 'dashboard';
    this.trainingList = [];
    this.dashboardFilter = 'all';
    this.trainingToDeleteId = null;
    this.theme = localStorage.getItem('autoreport_theme') || 'dark'; // chave legada mantida para compatibilidade
    this.metrics = null;
    this.currentTeamFilter = 'all';
    this.currentMasterTeamFilter = 'all';
    this.memberToDelete = null;
    this.version = 'v.4.4.1';
  }

  /**
   * Inicialização da aplicação
   */
  async init() {
    console.log(`Inicializando CapacitaTE ${this.version}...`);

    // Configurar PDF.js Worker localmente para extração offline de apêndices
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/vendor/pdf.worker.min.js';
    }

    // Sincronizar versão em todos os rodapés (principal e lateral)
    const footerVerEl = document.getElementById('app-footer-version');
    if (footerVerEl) footerVerEl.textContent = this.version;
    const sidebarVerEl = document.querySelector('.sidebar-footer div:last-child');
    if (sidebarVerEl) sidebarVerEl.textContent = `CapacitaTE · ${this.version}`;

    // 1. Inicializar Banco IndexedDB
    try {
      if (window.db) {
        await window.db.init();
      }
    } catch (err) {
      console.warn('Erro ao inicializar IndexedDB:', err);
    }

    // 2. Aplicar Tema
    this.applyTheme(this.theme);

    // 2.1 Login (js/core/auth.js): aguarda o acesso ser liberado antes de montar o menu pelas permissões
    if (window.CapacitaTE && CapacitaTE.auth) {
      await CapacitaTE.auth.init();
    }

    // 3. Inicializar Configurações Globais
    this.initGlobalSettings();

    // 4. Gerar o menu lateral a partir do registro de módulos e vincular eventos globais
    if (window.CapacitaTE && typeof CapacitaTE.renderNav === 'function') CapacitaTE.renderNav();
    this.bindEvents();
    this.initDragAndDropHandlers();

    // 4. Carregar lista de capacitações e atualizar Dashboard
    await this.refreshTrainingsList();

    // 5. Na inicialização ou recarregamento, sempre abrir no Dashboard limpo
    history.replaceState(null, '', window.location.pathname);
    this.navigateTo('dashboard', false);

    // Painel montado: tira a tela de carregamento
    if (window.CapacitaTE && CapacitaTE.hideBoot) CapacitaTE.hideBoot();

    this.startAutoSync();
    console.log('CapacitaTE pronto!');
  }

  /* ==========================================================================
     Navegação & SPA Router
     ========================================================================== */
  handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === 'dashboard') {
      this.navigateTo('dashboard', false);
    } else if (hash.startsWith('wizard/')) {
      const parts = hash.split('/');
      const trainingId = parts[1];
      const step = parseInt(parts[2]) || 1;
      if (this.currentTraining && this.currentTraining.id === trainingId) {
        // Hash alterado pelo próprio setWizardStep: a etapa já está exibida, não renderiza de novo
        if (this.activeView === 'wizard' && step === this.currentStep) return;
        this.navigateTo('wizard', false);
        this.setWizardStep(step);
      } else {
        this.openWizard(trainingId, step);
      }
    } else if (hash === 'wizard') {
      if (this.currentTraining) {
        this.navigateTo('wizard', false);
      } else {
        this.navigateTo('dashboard', false);
      }
    } else if (['trainings', 'municipalities', 'team', 'course-structure', 'report-final', 'settings'].includes(hash)) {
      this.navigateTo(hash, false);
    } else {
      this.navigateTo('dashboard', false);
    }
  }

  navigateTo(viewId, updateHash = true) {
    this.activeView = viewId;
    if (updateHash && viewId !== 'wizard') {
      window.location.hash = viewId;
    }

    // Atualizar itens do menu lateral
    document.querySelectorAll('.nav-item').forEach(item => {
      const targetView = item.getAttribute('data-view');
      const extraViews = (item.getAttribute('data-views') || '').split(',');
      if (targetView === viewId || extraViews.includes(viewId) || (viewId === 'wizard' && targetView === 'trainings')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Fechar gaveta móvel ao navegar
    const sidebar = document.querySelector('.sidebar');
    const mobileBackdrop = document.getElementById('sidebar-mobile-backdrop');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    }

    // Alternar visibilidade das seções
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.remove('active');
    });

    const activeSection = document.getElementById(`view-${viewId}`);
    if (activeSection) {
      activeSection.classList.add('active');
    }

    // Assistente ficou visível: posiciona o destaque do seletor de etapas sem animar
    if (viewId === 'wizard') requestAnimationFrame(() => this.moveStepperIndicator(true));
    // Abas da tela que acabou de aparecer: posiciona o destaque sem animar
    requestAnimationFrame(() => (this._slideGroups || []).forEach(g => { if (!g.placed) this.moveSlideHighlight(g, true); }));

    // Ações específicas de cada view
    if (viewId === 'settings') { this.renderCloudSettings(); this.renderSecurityChecklist(); }
    if (viewId === 'dashboard') {
      this.renderDashboard();
    } else if (viewId === 'trainings') {
      this.renderTrainingsList();
    } else if (viewId === 'municipalities') {
      this.renderMunicipalitiesBank();
    } else if (viewId === 'report-final') {
      this.renderReportFinal();
    } else if (viewId === 'team') {
      this.renderMasterTeamManagement();
    } else if (viewId === 'course-structure') {
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
    }
  }

  /* ==========================================================================
     Tema Claro / Escuro
     ========================================================================== */
  applyTheme(theme) {
    // Transição suave só durante a troca (evita animar cores em toda renderização)
    if (this.theme && this.theme !== theme && document.body) {
      document.body.classList.add('theme-transition');
      clearTimeout(this._themeTransitionTimer);
      this._themeTransitionTimer = setTimeout(() => document.body.classList.remove('theme-transition'), 400);
    }
    this.theme = theme;
    localStorage.setItem('autoreport_theme', theme); // chave legada mantida para compatibilidade
    const themeBtn = document.getElementById('theme-toggle-btn');

    const sunIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeBtn) themeBtn.innerHTML = `${sunIcon} Modo Claro`;
    } else {
      document.body.classList.remove('light-theme');
      if (themeBtn) themeBtn.innerHTML = `${moonIcon} Modo Escuro`;
    }

    // Atualizar gráficos se estiver na etapa de avaliação ou relatório final
    if (this.currentStep === 8 || this.currentStep === 11 || this.currentStep === 12) {
      this.renderEvaluationCharts();
      this.renderWordClouds();
    }
  }

  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.showToast(`Tema alternado para ${newTheme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}`);
  }

  /* ==========================================================================
     Dashboard & Estatísticas Globais
     ========================================================================== */
  /**
   * Sincronização automática: ao abrir/entrar, de 2 em 2 minutos com a aba visível, ao voltar para a aba e ao
   * recuperar a internet. Usa o mesmo caminho do botão Sincronizar, em modo silencioso (só avisa se algo mudou).
   */
  startAutoSync() {
    if (this._autoSyncStarted) return;
    this._autoSyncStarted = true;
    const MIN_GAP = 20 * 1000; // evita rajadas
    const run = () => {
      if (document.hidden || !navigator.onLine || !window.db || !window.db.supabase) return;
      if (this._lastAutoSync && Date.now() - this._lastAutoSync < MIN_GAP) return;
      const a = window.CapacitaTE && CapacitaTE.auth;
      if (a && a.mode !== 'authenticated') return;
      this.syncWithCloud({ silent: true });
    };
    setTimeout(run, 4000);
    setInterval(run, 2 * 60 * 1000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) run(); });
    window.addEventListener('online', run);
  }

  /**
   * Botão "Sincronizar": grava a capacitação aberta, sincroniza nos dois sentidos com a nuvem e atualiza a tela.
   */
  async syncWithCloud({ silent = false } = {}) {
    if (!window.db) return;
    if (this._syncing) return; // já há uma sincronização em andamento
    this._syncing = true;
    const btn = document.getElementById('cloud-sync-btn');
    const originalHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<svg class="sync-spin" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg><span>Sincronizando...</span>';
    }

    try {
      // 1. Grava o que está aberto, para que as últimas alterações entrem na sincronização
      const t = this.currentTraining;
      if (t && this.activeView === 'wizard' && !t.isHistorical) {
        this.saveCurrentStepData();
        await window.db.saveTrainingFull(t, 'Salvamento antes da sincronização com a nuvem', false);
      }

      // 2. Sincroniza nos dois sentidos
      const summary = await window.db.syncNow();

      // 3. Se a capacitação aberta foi atualizada pela nuvem, recarrega-a para não sobrescrever a versão online
      if (t && this.activeView === 'wizard' && summary.downloadedIds.includes(t.id)) {
        // Na sincronização automática não recarrega a tela enquanto a pessoa digita
        const typing = silent && document.activeElement && /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
        if (!typing) {
          await this.openWizard(t.id, this.currentStep || 1);
          this.showToast('A capacitação aberta tinha uma versão mais nova na nuvem e foi atualizada.', 'info', 6000);
        } else {
          this.showToast('Há uma versão mais nova desta capacitação na nuvem. Clique em Sincronizar quando terminar de digitar.', 'info', 8000);
        }
      }

      await this.refreshTrainingsList();
      if (this.activeView === 'dashboard') this.renderDashboard();
      else if (this.activeView === 'trainings' && typeof this.renderTrainingsList === 'function') this.renderTrainingsList();

      this._lastAutoSync = Date.now();
      const parts = [];
      if (summary.uploaded) parts.push(`${summary.uploaded} enviada(s) para a nuvem`);
      if (summary.downloaded) parts.push(`${summary.downloaded} baixada(s) da nuvem`);
      if (silent) {
        if (summary.failed) console.warn(`Sincronização automática com ${summary.failed} falha(s).`);
        else if (parts.length) this.showToast(`Sincronizado automaticamente: ${parts.join(', ')}.`, 'success', 3500);
      } else if (summary.failed) {
        this.showToast(`Sincronização concluída com ${summary.failed} falha(s)${parts.length ? ': ' + parts.join(', ') : ''}. Tente novamente.`, 'warning', 7000);
      } else {
        this.showToast(parts.length ? `Sincronização concluída: ${parts.join(', ')}.` : 'Tudo sincronizado: a versão local já é igual à online.', 'success', 5000);
      }
    } catch (err) {
      console.error('Erro na sincronização com a nuvem:', err);
      if (!silent) this.showToast(`Não foi possível sincronizar: ${err.message || 'falha de conexão'}. Os dados continuam salvos neste navegador.`, 'error', 7000);
    } finally {
      this._syncing = false;
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
      }
    }
  }

  async refreshTrainingsList() {
    if (window.db) {
      this.trainingList = await window.db.getAllTrainings();
    }
  }

  async renderDashboard() {
    if (window.db && window.db.supabase) {
      window.db.syncFromCloud().catch(() => {});
    }
    await this.refreshTrainingsList();

    const totalTrainings = this.trainingList.length;
    const completedTrainings = this.trainingList.filter(t => t.status === 'completed' || t.progressPercent === 100).length;
    const inProgressTrainings = totalTrainings - completedTrainings;

    // Totais de participantes e municípios
    let totalParticipants = 0;
    let totalMuns = 0;

    for (const t of this.trainingList) {
      const full = await window.db.getTrainingFull(t.id);
      if (full) {
        totalParticipants += (full.attendance?.length || (full.municipalities?.reduce((acc, m) => acc + (m.presentTotal || 0), 0)) || 0);
        totalMuns += (full.municipalities?.filter(m => (m.presentTotal || 0) > 0).length || 0);
      }
    }

    // Atualizar contadores no DOM
    const elTotal = document.getElementById('dash-total-reports');
    if (elTotal) elTotal.textContent = totalTrainings;

    const elCompleted = document.getElementById('dash-completed-reports');
    if (elCompleted) elCompleted.textContent = completedTrainings;

    const elParticipants = document.getElementById('dash-total-participants');
    if (elParticipants) elParticipants.textContent = totalParticipants;

    const elMunicipalities = document.getElementById('dash-total-municipalities');
    if (elMunicipalities) elMunicipalities.textContent = totalMuns;

    // Atualizar badged counters das sub-abas de filtro
    const cntAll = totalTrainings;
    const cntHist = this.trainingList.filter(t => t.status === 'historico' || t.isHistorical).length;
    const cntProg = this.trainingList.filter(t => t.status === 'in_progress' && !t.isHistorical).length;
    const cntComp = this.trainingList.filter(t => (t.status === 'completed' || t.progressPercent === 100) && !t.isHistorical).length;

    const elCntAll = document.getElementById('dash-count-all');
    if (elCntAll) elCntAll.textContent = cntAll;
    const elCntHist = document.getElementById('dash-count-hist');
    if (elCntHist) elCntHist.textContent = cntHist;
    const elCntProg = document.getElementById('dash-count-prog');
    if (elCntProg) elCntProg.textContent = cntProg;
    const elCntComp = document.getElementById('dash-count-comp');
    if (elCntComp) elCntComp.textContent = cntComp;

    // Renderizar tabela de capacitações no dashboard respeitando filtro
    const container = document.getElementById('dashboard-trainings-list');
    if (container) {
      let filtered = [...this.trainingList];
      if (this.dashboardFilter === 'historico') {
        filtered = filtered.filter(t => t.status === 'historico' || t.isHistorical);
      } else if (this.dashboardFilter === 'in_progress') {
        filtered = filtered.filter(t => t.status === 'in_progress' && !t.isHistorical);
      } else if (this.dashboardFilter === 'completed') {
        filtered = filtered.filter(t => (t.status === 'completed' || t.progressPercent === 100) && !t.isHistorical);
      }

      // Ordenar por número decrescente
      filtered.sort((a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0));

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:2.5rem; color:var(--text-muted);">
            <div style="display:flex; justify-content:center; margin-bottom:0.75rem; color:var(--text-muted);">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <p>Nenhuma capacitação encontrada para este filtro.</p>
          </div>
        `;
      } else {
        container.innerHTML = filtered.map(t => {
          const isHist = t.status === 'historico' || t.isHistorical;
          const statusBadge = isHist
            ? `<span class="nav-badge badge-amber">Histórico Protegido</span>`
            : (t.progressPercent === 100
                ? `<span class="nav-badge badge-emerald" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluída</span>`
                : `<span class="nav-badge badge-cyan" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Em Andamento</span>`);

          return `
            <div class="glass-card" style="margin-bottom:1rem; padding:1.25rem 1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-left: 4px solid ${isHist ? '#F6A800' : 'var(--accent-secondary)'};">
              <div style="display:flex; align-items:center; gap:1rem;">
                <div style="width:48px; height:48px; border-radius:var(--radius-md); background:${isHist ? 'linear-gradient(135deg, #C98A00, #b45309)' : 'var(--gradient-brand)'}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem; color:white;">
                  ${t.number}
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.2rem;">
                    <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin:0;">
                      Capacitação Nº ${t.number} - ${this.escapeHtml(t.polo || 'Polo Regional')} (${t.uf || 'MT'})
                    </h4>
                    ${statusBadge}
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-muted); display:flex; gap:1rem; flex-wrap:wrap;">
                    <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${t.datesFormatted || t.startDate || 'Data a definir'}</span>
                    <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${t.locationVenue || 'Auditório Local'}</span>
                    <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${t.workload || '16h'}</span>
                    ${t.dataSourceMap?.documentOrigin ? `<span title="${this.escapeHtml(t.dataSourceMap.documentOrigin)}"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg> Fonte: ${this.escapeHtml(t.dataSourceMap.documentOrigin.split('/').pop())}</span>` : ''}
                  </div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:1.25rem;">
                <div style="text-align:right;">
                  <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">Situação</div>
                  <div style="font-size:0.9rem; font-weight:700; color:${isHist ? '#F6A800' : (t.progressPercent === 100 ? 'var(--accent-success)' : 'var(--accent-secondary)')};">
                    ${isHist ? 'Preservada' : `${t.progressPercent || 0}% Concluído`}
                  </div>
                </div>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
                  ${isHist
                    ? `<button class="btn btn-secondary btn-sm" onclick="app.openWizard('${t.id}', 1)" title="Visualizar dados">${window.icons.search} Consultar</button>`
                    : `<a class="btn btn-secondary btn-sm" href="#capacitacao/${encodeURIComponent(t.id)}/1" title="Abrir as etapas: inscrição, presença e avaliação, relatório">${window.icons.folder} Abrir</a>`}
                  ${isHist
                    ? `<span class="nav-badge badge-amber" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center; gap:0.25rem;" title="Registro do Histórico Protegido - Exclusão desabilitada">${window.icons.lock} Protegido</span>`
                    : !this.canDeleteTraining() ? ''
                    : `<button class="btn btn-secondary btn-sm btn-action-delete" onclick="app.openConfirmDeleteModal('${t.id}')" style="display:inline-flex; align-items:center;" title="Excluir este relatório permanentemente">
                        ${window.icons.delete} Excluir
                      </button>`
                  }
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  setDashboardFilter(filterType) {
    this.dashboardFilter = filterType;
    document.querySelectorAll('.filter-tab-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(`filter-dash-${filterType === 'all' ? 'all' : (filterType === 'historico' ? 'hist' : (filterType === 'in_progress' ? 'prog' : 'comp'))}`);
    if (btn) btn.classList.add('active');
    this.renderDashboard();
  }

  /* ==========================================================================
     MODAL DE CLONAGEM & REUTILIZAÇÃO HISTÓRICA (REGRAS 63, 64 E 65)
     ========================================================================== */
  openCloneModal(defaultSourceId = null) {
    const modal = document.getElementById('modal-clone-training');
    const select = document.getElementById('clone-source-select');
    if (!modal || !select) return;

    // Popula select com as capacitações ordenadas por número
    const sorted = [...this.trainingList].sort((a, b) => (parseInt(a.number) || 0) - (parseInt(b.number) || 0));
    select.innerHTML = sorted.map(t => {
      const isHist = t.status === 'historico' || t.isHistorical;
      return `<option value="${t.id}" ${t.id === defaultSourceId ? 'selected' : ''}>Capacitação Nº ${t.number} - ${this.escapeHtml(t.polo || 'Polo Regional')} (${t.uf || 'MT'}) ${isHist ? ' [HISTÓRICO]' : ''}</option>`;
    }).join('');

    modal.style.display = 'block';
  }

  closeCloneModal() {
    const modal = document.getElementById('modal-clone-training');
    if (modal) modal.style.display = 'none';
  }

  async executeCloneTraining() {
    const select = document.getElementById('clone-source-select');
    if (!select || !select.value) return;

    const sourceId = select.value;
    const copyInst = document.getElementById('clone-opt-inst')?.checked;
    const copyModules = document.getElementById('clone-opt-modules')?.checked;
    const copyTexts = document.getElementById('clone-opt-texts')?.checked;
    const copyEval = document.getElementById('clone-opt-eval')?.checked;
    const copyMuns = document.getElementById('clone-opt-muns')?.checked;

    try {
      this.showToast('Criando nova capacitação a partir do modelo...');
      const newId = await window.db.duplicateTraining(sourceId, {
        copyInstitutional: copyInst,
        copyModules: copyModules,
        copyTexts: copyTexts,
        copyEvaluationConfig: copyEval,
        copyMunicipalities: copyMuns,
        copyTeam: true
      });

      this.closeCloneModal();
      await this.refreshTrainingsList();
      this.showToast('Nova capacitação criada com sucesso! Dados anteriores preservados.', 'success');
      this.openWizard(newId, 1);
    } catch (err) {
      console.error('Erro ao duplicar capacitação:', err);
      this.showToast(`Erro: ${err.message}`, 'error');
    }
  }

  /* ==========================================================================
     ASSISTENTE DE 11 ETAPAS (WIZARD ENGINE)
     ========================================================================== */
  createNewTraining() {
    this.createNewTrainingBlank();
  }

  openNewTrainingOptionsModal() {
    const modal = document.getElementById('modal-new-training-options');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeNewTrainingOptionsModal() {
    const modal = document.getElementById('modal-new-training-options');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async createNewTrainingBlank() {
    if (window.CapacitaTE && !CapacitaTE.can('relatorio', 'edit')) {
      this.showToast('Você não tem permissão para criar capacitações.', 'warning');
      return;
    }
    const newId = `cap_${Date.now()}`;

    const defaultOrg = localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)'; // chave legada mantida para compatibilidade
    const defaultFunding = localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE'; // chave legada mantida para compatibilidade
    const defaultProject = localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL'; // chave legada mantida para compatibilidade
    const defaultProcess = localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00'; // chave legada mantida para compatibilidade

    const newTraining = {
      id: newId,
      number: '',
      title: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      polo: '',
      uf: '',
      poloIbge: '',
      startDate: '',
      endDate: '',
      datesFormatted: '',
      workload: '',
      targetAudience: 'Gestores Municipais e Conselheiros CACS-FUNDEB',
      expectedParticipants: '',
      responsibleOrg: defaultOrg,
      relatedProject: defaultProject,
      processNumber: defaultProcess,
      fundingOrg: defaultFunding,
      partnerOrgs: '',
      locationVenue: '',
      locationAddress: '',
      status: 'in_progress',
      progressPercent: 0,
      team: (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || [])).map(m => ({ ...m })),
      municipalities: [],
      courseModules: window.courseStructureHelper ? window.courseStructureHelper.getMasterCopy() : JSON.parse(JSON.stringify(window.DEFAULT_COURSE_STRUCTURE || [])), // cópia: editar não altera o modelo global
      courseMoments: [],
      attendance: [],
      evaluations: [],
      media: []
    };

    await window.db.saveTrainingFull(newTraining, 'Criação de nova capacitação em branco');
    this.openWizard(newId, 1, { mode: 'cadastro' });
  }

  /* ==========================================================================
     IMPORTAÇÃO EM MASSA DE MUNICÍPIOS POR PLANILHA (.XLSX, .CSV)
     ========================================================================== */
  openImportMunicipalitiesModal(targetContext = 'wizard', training = null, onDone = null) {
    this.munImportContext = targetContext;
    this.munImportTraining = training; // contexto 'painel' (Painel de vagas): capacitação aberta fora do assistente
    this.munImportOnDone = onDone;
    this.munImportParsedData = null;
    this.munImportSearchFilter = '';

    const uploadStep = document.getElementById('mun-import-step-upload');
    const procStep = document.getElementById('mun-import-step-processing');
    const confStep = document.getElementById('mun-import-step-conference');
    const backBtn = document.getElementById('mun-import-back-btn');
    const confBtn = document.getElementById('mun-import-confirm-btn');
    const fileInput = document.getElementById('mun-excel-file-input');

    if (fileInput) fileInput.value = '';
    if (uploadStep) uploadStep.style.display = 'block';
    if (procStep) procStep.style.display = 'none';
    if (confStep) confStep.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    if (confBtn) confBtn.style.display = 'none';

    const modal = document.getElementById('modal-import-municipalities');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  /**
   * Capacitação que recebe os municípios importados: a do assistente ('wizard'), a do Painel de vagas ('painel') ou nenhuma (catálogo geral)
   */
  munImportTarget() {
    if (this.munImportContext === 'wizard') return this.currentTraining || null;
    if (this.munImportContext === 'painel') return this.munImportTraining || null;
    return null;
  }

  /**
   * Planilha modelo para importar municípios (colunas Município e UF; Código IBGE opcional) com instruções
   */
  downloadMunicipalitiesTemplate() {
    const t = this.munImportTarget() || this.currentTraining || this.munImportTraining || {};
    const uf0 = t.uf || 'GO';
    const sample = (window.IBGE_DATA || []).filter(m => m.u === uf0).sort((a, b) => a.n.localeCompare(b.n, 'pt-BR')).slice(0, 3);
    const aoa = [['Município', 'UF'], ...(sample.length ? sample.map(m => [m.n, m.u]) : [['Goiânia', 'GO'], ['Aparecida de Goiânia', 'GO']])];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!cols'] = [{ wch: 34 }, { wch: 6 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Cidades');
    const help = XLSX.utils.aoa_to_sheet([
      ['Como preencher'],
      ['1. Escreva um município por linha na aba "Cidades" (apague as linhas de exemplo).'],
      ['2. A coluna UF é opcional; se ficar vazia, vale a UF da capacitação.'],
      ['3. Opcional: coluna "Código IBGE" no lugar ou além do nome.'],
      ['4. Na tela seguinte você confere e marca os municípios antes de salvar.']
    ]);
    help['!cols'] = [{ wch: 90 }];
    XLSX.utils.book_append_sheet(wb, help, 'Instruções');
    XLSX.writeFile(wb, 'modelo-cidades-convidadas.xlsx');
  }

  closeImportMunicipalitiesModal() {
    const modal = document.getElementById('modal-import-municipalities');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
    this.munImportParsedData = null;
  }

  backToSpreadsheetUploadStep() {
    const uploadStep = document.getElementById('mun-import-step-upload');
    const procStep = document.getElementById('mun-import-step-processing');
    const confStep = document.getElementById('mun-import-step-conference');
    const backBtn = document.getElementById('mun-import-back-btn');
    const confBtn = document.getElementById('mun-import-confirm-btn');

    if (uploadStep) uploadStep.style.display = 'block';
    if (procStep) procStep.style.display = 'none';
    if (confStep) confStep.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    if (confBtn) confBtn.style.display = 'none';
  }

  async onMunicipalitiesSpreadsheetSelected(file) {
    if (!file || !window.excelParser) return;

    const uploadStep = document.getElementById('mun-import-step-upload');
    const procStep = document.getElementById('mun-import-step-processing');
    const confStep = document.getElementById('mun-import-step-conference');
    const backBtn = document.getElementById('mun-import-back-btn');
    const confBtn = document.getElementById('mun-import-confirm-btn');
    const statusText = document.getElementById('mun-import-processing-status');

    if (uploadStep) uploadStep.style.display = 'none';
    if (procStep) procStep.style.display = 'block';
    if (statusText) statusText.textContent = `Lendo "${file.name}" e validando dados municipais...`;

    try {
      let poloName = 'Polo Regional';
      let poloUf = 'GO';
      let existingMuns = [];

      const target = this.munImportTarget();
      if (target) {
        poloName = target.polo || 'Polo Regional';
        poloUf = target.uf || 'GO';
        existingMuns = target.municipalities || [];
      } else if (window.db) {
        existingMuns = (await window.db.getAll('municipalities')) || [];
      }

      const poloLabel = document.getElementById('mun-import-polo-name');
      if (poloLabel) poloLabel.textContent = `${poloName} (${poloUf})`;

      // Executar parsing e cálculo em lote
      const parsed = await window.excelParser.parseMunicipalitiesSpreadsheet(file, poloName, poloUf, existingMuns);
      this.munImportParsedData = parsed;

      setTimeout(() => {
        if (procStep) procStep.style.display = 'none';
        if (confStep) confStep.style.display = 'block';
        if (backBtn) backBtn.style.display = 'inline-flex';
        if (confBtn) confBtn.style.display = 'inline-flex';

        this.renderMunicipalitiesImportConference();
      }, 400);

    } catch (err) {
      console.error('Erro ao processar planilha de municípios:', err);
      this.showToast(`Erro ao ler planilha: ${err.message}`, 'error');
      this.backToSpreadsheetUploadStep();
    }
  }

  renderMunicipalitiesImportConference(searchTerm = this.munImportSearchFilter || '') {
    if (!this.munImportParsedData) return;
    const { validRows, invalidRows, stats } = this.munImportParsedData;

    // Atualizar Contadores do Topo
    const elTotal = document.getElementById('mun-stat-total');
    const elNew = document.getElementById('mun-stat-new');
    const elExist = document.getElementById('mun-stat-existing');
    const elUpdate = document.getElementById('mun-stat-update');
    const elError = document.getElementById('mun-stat-error');
    const elSelected = document.getElementById('mun-stat-selected');
    const elConfirmBtnText = document.getElementById('mun-import-confirm-btn-text');

    const selectedCount = validRows.filter(r => r.selected).length;

    if (elTotal) elTotal.textContent = stats.total;
    if (elNew) elNew.textContent = stats.newCount;
    if (elExist) elExist.textContent = stats.alreadyExistsCount;
    if (elUpdate) elUpdate.textContent = stats.updateCount;
    if (elError) elError.textContent = stats.errorCount;
    if (elSelected) elSelected.textContent = selectedCount;
    if (elConfirmBtnText) elConfirmBtnText.textContent = `Importar Selecionados (${selectedCount})`;

    // Banner de Avisos / Erros
    const warnBox = document.getElementById('mun-import-warnings-box');
    const warnList = document.getElementById('mun-import-warnings-list');
    const warnTitle = document.getElementById('mun-import-warnings-title');

    if (invalidRows && invalidRows.length > 0) {
      if (warnBox) warnBox.style.display = 'block';
      if (warnTitle) warnTitle.textContent = `${invalidRows.length} registro(s) precisam de atenção (não serão importados):`;
      if (warnList) {
        warnList.innerHTML = invalidRows.map(inv => `
          <li><strong>Linha ${inv.lineNum}:</strong> ${inv.errors.join(' • ')} (${inv.rawName || 'Sem nome'}, ${inv.rawUf || 'Sem UF'})</li>
        `).join('');
      }
    } else {
      if (warnBox) warnBox.style.display = 'none';
    }

    // Filtragem de busca
    const term = searchTerm.toLowerCase().trim();
    const filteredRows = validRows.filter(r => {
      if (!term) return true;
      return (
        r.name.toLowerCase().includes(term) ||
        r.ibgeCode.includes(term) ||
        r.uf.toLowerCase().includes(term) ||
        r.status.toLowerCase().includes(term)
      );
    });

    const tbody = document.getElementById('mun-import-table-tbody');
    if (!tbody) return;

    if (filteredRows.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">
            Nenhum município corresponde aos critérios de busca.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filteredRows.map(r => {
      let statusBadge = '';
      if (r.status === 'new') {
        statusBadge = '<span class="nav-badge badge-emerald font-bold">Novo</span>';
      } else if (r.status === 'already_exists') {
        statusBadge = '<span class="nav-badge badge-blue">Já cadastrado</span>';
      } else if (r.status === 'update') {
        statusBadge = `<span class="nav-badge badge-amber font-bold" title="${r.diffText}">Atualizar</span>`;
      }

      return `
        <tr style="background:${r.selected ? 'rgba(246, 168, 0, 0.04)' : 'transparent'};">
          <td style="text-align:center;">
            <input type="checkbox" ${r.selected ? 'checked' : ''} onchange="app.toggleImportMunicipalityRow(${r.lineNum}, this.checked)">
          </td>
          <td style="text-align:center;">
            <span class="font-mono" style="font-weight:700; color:var(--accent-blue-text); font-size:0.92rem;">${r.ibgeCode}</span>
          </td>
          <td>
            <strong style="color:var(--text-primary); font-size:0.92rem;">${this.escapeHtml(r.name)}</strong>
            ${r.isSede ? '<span class="nav-badge badge-amber" style="font-size:0.7rem; padding:0.1rem 0.4rem; margin-left:0.4rem; font-weight:700;">Sede</span>' : ''}
            ${r.diffText ? `<div style="font-size:0.75rem; color:var(--accent-amber-text); margin-top:2px;">↳ ${r.diffText}</div>` : ''}
          </td>
          <td style="text-align:center;">
            <span class="nav-badge badge-blue font-bold">${r.uf}</span>
          </td>
          <td style="text-align:right;">
            <span class="font-mono" style="font-weight:700; color:${r.isSede ? 'var(--accent-amber-text)' : 'var(--accent-emerald-text)'}; font-size:0.95rem;">
              ${r.isSede ? '0,0 km' : `${parseFloat(r.distanceKm || 0).toFixed(1).replace('.', ',')} km`}
            </span>
          </td>
          <td style="text-align:center;">
            ${statusBadge}
          </td>
        </tr>
      `;
    }).join('');

    // Atualizar estado do master checkbox
    const masterCheck = document.getElementById('mun-import-master-check');
    if (masterCheck) {
      masterCheck.checked = validRows.length > 0 && validRows.every(r => r.selected);
      masterCheck.indeterminate = validRows.some(r => r.selected) && !validRows.every(r => r.selected);
    }
  }

  toggleAllImportMunicipalities(checked) {
    if (!this.munImportParsedData) return;
    this.munImportParsedData.validRows.forEach(r => {
      r.selected = checked;
    });
    this.renderMunicipalitiesImportConference();
  }

  toggleImportMunicipalityRow(lineNum, checked) {
    if (!this.munImportParsedData) return;
    const row = this.munImportParsedData.validRows.find(r => r.lineNum === lineNum);
    if (row) {
      row.selected = checked;
    }
    this.renderMunicipalitiesImportConference();
  }

  filterImportMunicipalitiesTable(term) {
    this.munImportSearchFilter = term;
    this.renderMunicipalitiesImportConference(term);
  }

  async confirmImportMunicipalities() {
    if (!this.munImportParsedData) return;
    const selectedRows = this.munImportParsedData.validRows.filter(r => r.selected);

    if (selectedRows.length === 0) {
      this.showToast('Nenhum município foi selecionado para importação.', 'warning');
      return;
    }

    // Barra de carregamento de 0 a 100% (mínimo de 1,5 s) e confirmação com botão Continuar
    const F = window.CapacitaTE && CapacitaTE.formModules;
    const done = F && F.showBusy ? F.showBusy('Importando municípios...') : async () => {};

    try {
      let insertedCount = 0;
      let updatedCount = 0;
      const target = this.munImportTarget();

      if (target) {
        if (!target.municipalities) target.municipalities = [];
        const muns = target.municipalities;

        selectedRows.forEach(r => {
          const existingIdx = muns.findIndex(m => String(m.ibgeCode).trim() === String(r.ibgeCode).trim());
          if (existingIdx !== -1) {
            // Atualização
            muns[existingIdx].name = r.name;
            muns[existingIdx].uf = r.uf;
            muns[existingIdx].distanceKm = r.distanceKm;
            muns[existingIdx].isSede = r.isSede;
            updatedCount++;
          } else {
            // Novo
            muns.push({
              id: `mun_imp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
              ibgeCode: String(r.ibgeCode).trim(),
              name: r.name,
              uf: r.uf,
              distanceKm: r.distanceKm,
              isSummoned: true,
              isSede: r.isSede,
              inscribedCACS: 2,
              inscribedGestores: 2,
              inscribedTotal: 4,
              presentCACS: 0,
              presentGestores: 0,
              presentTotal: 0
            });
            insertedCount++;
          }
        });

        if (this.munImportContext === 'wizard') this.ensurePoloInMunicipalities();
        await window.db.saveTrainingFull(target, `Importação em massa de ${selectedRows.length} municípios via planilha Excel`);
        if (this.munImportContext === 'wizard') this.renderMunicipalitiesStep();
        if (this.munImportOnDone) await this.munImportOnDone(selectedRows); // Painel de vagas: atualiza o formulário
      } else if (window.db) {
        // Salvar no Catálogo Geral de Municípios
        for (const r of selectedRows) {
          await window.db.put('municipalities', {
            id: `mun_cat_${r.ibgeCode}`,
            ibgeCode: String(r.ibgeCode).trim(),
            name: r.name,
            uf: r.uf,
            distanceKm: r.distanceKm,
            updatedAt: new Date().toISOString()
          });
          insertedCount++;
        }
        this.renderMunicipalitiesBank();
      }

      await done(`${insertedCount} município(s) cadastrado(s) e ${updatedCount} atualizado(s).`);
      this.closeImportMunicipalitiesModal();
      if (this.munImportContext === 'painel' && window.CapacitaTE && CapacitaTE.router && window.location.hash) {
        window.dispatchEvent(new HashChangeEvent('hashchange')); // recarrega o Painel de vagas
      }
    } catch (err) {
      await done();
      console.error('Erro ao salvar municípios importados:', err);
      this.showToast(`Erro ao salvar no banco de dados: ${err.message}`, 'error');
    }
  }

  /* ==========================================================================
     LEITURA INTELIGENTE OCR DE CONVOCAÇÃO CECATE (PDF)
     ========================================================================== */
  openImportConvocacaoModal() {
    this.extractedConvocacaoData = null;
    
    // Resetar visões do modal
    const uploadStep = document.getElementById('convocacao-upload-step');
    const procStep = document.getElementById('convocacao-processing-step');
    const resStep = document.getElementById('convocacao-results-step');
    const applyBtn = document.getElementById('convocacao-apply-btn');

    if (uploadStep) uploadStep.style.display = 'block';
    if (procStep) procStep.style.display = 'none';
    if (resStep) resStep.style.display = 'none';
    if (applyBtn) applyBtn.style.display = 'none';

    const modal = document.getElementById('modal-import-convocacao');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeImportConvocacaoModal() {
    const modal = document.getElementById('modal-import-convocacao');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async handleConvocacaoFileSelected(file) {
    if (!file || !window.convocacaoParser) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      this.showToast('Por favor, selecione um arquivo PDF de Convocação.', 'warning');
      return;
    }

    this.currentConvocacaoFile = file;

    const uploadStep = document.getElementById('convocacao-upload-step');
    const procStep = document.getElementById('convocacao-processing-step');
    const resStep = document.getElementById('convocacao-results-step');
    const loadedCard = document.getElementById('convocacao-file-loaded-card');
    const loadedFileName = document.getElementById('convocacao-loaded-file-name');
    const statusText = document.getElementById('convocacao-status-text');
    const progressFill = document.getElementById('convocacao-progress-fill');

    // Ocultar área de upload/botão de enviar e exibir card do arquivo selecionado
    if (uploadStep) uploadStep.style.display = 'none';
    if (loadedCard) loadedCard.style.display = 'flex';
    if (loadedFileName) loadedFileName.textContent = file.name;

    if (procStep) procStep.style.display = 'block';
    if (resStep) resStep.style.display = 'none';

    try {
      if (statusText) statusText.textContent = 'Carregando arquivo PDF e inicializando leitor OCR...';
      if (progressFill) progressFill.style.width = '30%';

      const { fullText, pageTexts } = await window.convocacaoParser.extractTextFromPdf(file);

      if (statusText) statusText.textContent = 'Executando OCR e varredura completa de tópicos e municípios...';
      if (progressFill) progressFill.style.width = '70%';

      await new Promise(r => setTimeout(r, 300));

      const parsed = window.convocacaoParser.parseConvocacaoText(fullText);
      this.extractedConvocacaoData = parsed;

      if (progressFill) progressFill.style.width = '100%';
      await new Promise(r => setTimeout(r, 200));

      // Atualizar interface dos resultados com controles editáveis
      if (procStep) procStep.style.display = 'none';
      if (resStep) resStep.style.display = 'block';

      this.setVal('res-conv-polo-input', parsed.polo || '');
      this.setVal('res-conv-uf-select', parsed.uf || 'MT');
      this.setVal('res-conv-ibge-input', parsed.poloIbge || '');
      this.setVal('res-conv-dates-input', parsed.datesFormatted || '');
      this.setVal('res-conv-workload-input', parsed.workload || '16 horas');
      this.setVal('res-conv-venue-input', parsed.venue || '');
      this.setVal('res-conv-address-input', parsed.address || '');

      this.renderConvocacaoExtractedMunicipalities();

      const applyBtn = document.getElementById('convocacao-apply-btn');
      if (applyBtn) applyBtn.style.display = 'inline-flex';

      this.showToast('Convocação analisada com sucesso!');

    } catch (err) {
      console.error('Erro na leitura da convocação:', err);
      this.showToast(`Erro ao ler PDF: ${err.message}`, 'error');
      if (procStep) procStep.style.display = 'none';
      if (loadedCard) loadedCard.style.display = 'none';
      if (uploadStep) uploadStep.style.display = 'block';
    }
  }

  removeLoadedConvocacaoFile() {
    const fileInput = document.getElementById('convocacao-file-input');
    const loadedCard = document.getElementById('convocacao-file-loaded-card');
    const uploadStep = document.getElementById('convocacao-upload-step');
    const procStep = document.getElementById('convocacao-processing-step');
    const resStep = document.getElementById('convocacao-results-step');
    const applyBtn = document.getElementById('convocacao-apply-btn');

    if (fileInput) fileInput.value = '';
    if (loadedCard) loadedCard.style.display = 'none';
    if (procStep) procStep.style.display = 'none';
    if (resStep) resStep.style.display = 'none';
    if (applyBtn) applyBtn.style.display = 'none';
    if (uploadStep) uploadStep.style.display = 'block';

    this.extractedConvocacaoData = null;
    this.showToast('Arquivo de convocação removido. Você pode enviar outro PDF.');
  }

  updateConvocacaoExtractedField(field, value) {
    if (!this.extractedConvocacaoData) return;
    this.extractedConvocacaoData[field] = value;

    // Se alterou a UF, tentar re-sincronizar IBGE do polo se não houver um customizado
    if (field === 'uf' || field === 'polo') {
      const poloName = this.getVal('res-conv-polo-input') || this.extractedConvocacaoData.polo;
      const ufVal = this.getVal('res-conv-uf-select') || this.extractedConvocacaoData.uf;
      if (window.IBGE_DATA) {
        const match = window.IBGE_DATA.find(m => m.u === ufVal && m.n.toLowerCase() === poloName.toLowerCase());
        if (match) {
          this.extractedConvocacaoData.poloIbge = String(match.c);
          this.setVal('res-conv-ibge-input', match.c);
        }
      }
    }
  }

  renderConvocacaoExtractedMunicipalities() {
    if (!this.extractedConvocacaoData) return;
    const muns = this.extractedConvocacaoData.allMunicipalities || [];
    const poloName = this.extractedConvocacaoData.polo || 'Polo';
    const poloUf = this.extractedConvocacaoData.uf || 'MT';

    const badgeEl = document.getElementById('res-conv-muns-badge');
    const listEl = document.getElementById('res-conv-muns-list');

    const expPartCount = muns.length * 4;
    if (badgeEl) badgeEl.textContent = `${muns.length} Municípios (${expPartCount} Participantes Previstos)`;
    if (listEl) {
      if (muns.length === 0) {
        listEl.innerHTML = `<span style="color:var(--text-muted); font-size:0.8rem;">Nenhum município listado. Clique acima para adicionar.</span>`;
      } else {
        listEl.innerHTML = muns.map((m, idx) => {
          const distVal = m.distanceKm !== undefined ? m.distanceKm : window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
          m.distanceKm = distVal;

          return `
            <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:0.4rem 0.6rem; font-size:0.78rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.25rem;">
              <span style="font-weight:700; color:var(--text-primary); display:inline-flex; align-items:center;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${this.escapeHtml(m.name)} (${m.uf || poloUf})
              </span>
              <span style="font-family:monospace; color:var(--accent-gold-text); font-size:0.72rem;">IBGE: ${m.code || 'N/A'}</span>
              <div style="display:flex; align-items:center; gap:0.2rem;">
                <span style="font-size:0.72rem; color:var(--text-muted);">Distância:</span>
                <input type="number" step="0.1" min="0" value="${parseFloat(distVal).toFixed(1)}" style="width:65px; font-size:0.75rem; padding:0.1rem 0.3rem; text-align:right; font-family:monospace;" class="form-control form-control-sm" onchange="app.updateConvocacaoMunicipalityDistance(${idx}, this.value)">
                <span style="font-size:0.72rem; color:var(--text-muted);">km</span>
              </div>
              <button type="button" onclick="app.removeConvocacaoMunicipality(${idx})" style="background:none; border:none; color:#ef4444; font-weight:bold; cursor:pointer; font-size:0.85rem; padding:0 0.2rem; display:inline-flex; align-items:center; justify-content:center;" title="Remover município">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          `;
        }).join('');
      }
    }
  }

  updateConvocacaoMunicipalityDistance(index, value) {
    if (!this.extractedConvocacaoData?.allMunicipalities?.[index]) return;
    this.extractedConvocacaoData.allMunicipalities[index].distanceKm = parseFloat(value) || 0.0;
  }

  removeConvocacaoMunicipality(index) {
    if (!this.extractedConvocacaoData?.allMunicipalities) return;
    this.extractedConvocacaoData.allMunicipalities.splice(index, 1);
    this.renderConvocacaoExtractedMunicipalities();
  }

  addConvocacaoMunicipalityPrompt() {
    this.openAddMunicipalityModal('convocacao');
  }

  async applyExtractedConvocacaoData() {
    if (!this.extractedConvocacaoData) return;

    const data = this.extractedConvocacaoData;
    this.closeImportConvocacaoModal();

    try {
      // Se não houver relatório aberto ou se for histórico, criar um novo
      let training = this.currentTraining;
      if (!training || training.isHistorical) {
        const nextNumber = this.trainingList.length > 0 ? Math.max(...this.trainingList.map(t => parseInt(t.number) || 0)) + 1 : 15;
        const newId = `cap_${Date.now()}`;

        training = {
          id: newId,
          number: nextNumber,
          title: data.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
          polo: data.polo || '',
          uf: data.uf || 'MT',
          startDate: data.startDate || new Date().toISOString().split('T')[0],
          endDate: data.endDate || new Date().toISOString().split('T')[0],
          datesFormatted: data.datesFormatted || 'A definir',
          workload: data.workload || '16 horas',
          targetAudience: data.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB',
          expectedParticipants: data.expectedParticipants || 40,
          responsibleOrg: 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
          relatedProject: 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
          processNumber: '23070.012345/2026-00',
          fundingOrg: 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
          partnerOrgs: 'Ministério da Educação / Prefeituras Municipais',
          locationVenue: data.venue || 'Auditório Municipal',
          status: 'in_progress',
          progressPercent: 15,
          team: (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || [])).map(m => ({ ...m })),
          municipalities: [],
          courseModules: [
            { moduleNumber: '01', topicGestor: 'Transporte Escolar no Brasil – CECATE-CO', topicCACS: 'Transporte Escolar no Brasil – CECATE-CO', hoursGestor: 1.5, hoursCACS: 1.5, order: 0 },
            { moduleNumber: '02', topicGestor: 'Conhecendo os programas PNATE e Caminho da Escola', topicCACS: 'Conhecendo os programas PNATE e Caminho da Escola', hoursGestor: 1.5, hoursCACS: 1.5, order: 1 },
            { moduleNumber: '03', topicGestor: 'Gestão do Transporte Escolar e Software SETE', topicCACS: 'Fiscalização e Controle Social do Transporte Escolar', hoursGestor: 2.0, hoursCACS: 2.0, order: 2 },
            { moduleNumber: '04', topicGestor: 'Prestação de Contas no SiGPC e Desafios Locais', topicCACS: 'Atuação do CACS-FUNDEB e Análise de Contas', hoursGestor: 3.0, hoursCACS: 3.0, order: 3 }
          ],
          courseMoments: [],
          attendance: [],
          evaluations: [],
          media: []
        };
      } else {
        // Atualizar dados no relatório existente
        const munCount = data.allMunicipalities?.length || data.invitedMunicipalitiesCount || 0;
        const expParticipants = munCount * 4;

        training.title = data.title || training.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR';
        training.polo = data.polo || training.polo;
        training.uf = data.uf || training.uf;
        training.poloIbge = data.poloIbge || training.poloIbge;
        training.startDate = data.startDate || training.startDate;
        training.endDate = data.endDate || training.endDate;
        training.datesFormatted = data.datesFormatted || training.datesFormatted;
        training.workload = data.workload || training.workload || '16 horas';
        training.locationVenue = data.venue || training.locationVenue;
        training.locationAddress = data.address || training.locationAddress;
        training.targetAudience = data.targetAudience || training.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB';
        training.expectedParticipants = expParticipants || training.expectedParticipants;
        training.responsibleOrg = training.responsibleOrg || 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste';
        training.relatedProject = training.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
        training.processNumber = training.processNumber || '23070.012345/2026-00';
        training.fundingOrg = training.fundingOrg || 'Fundo Nacional de Desenvolvimento da Educação - FNDE';
        training.partnerOrgs = training.partnerOrgs || 'Ministério da Educação / Prefeituras Municipais';
      }

      // Sincronizar Municípios Convocados com distâncias calculadas pelo polo
      if (data.allMunicipalities?.length > 0) {
        const poloName = data.polo || training.polo || '';
        const poloUf = data.uf || training.uf || 'MT';

        // Salvar nome do arquivo anexado para exibir o card em Etapa 1
        const filename = this.currentConvocacaoFile?.name || 'Convocacao_CECATE.pdf';
        training.attachedFileName = filename;

        training.municipalities = data.allMunicipalities.map((m, idx) => ({
          id: `mun_${Date.now()}_${idx}`,
          ibgeCode: String(m.code || '0000000'),
          name: m.name,
          uf: m.uf || poloUf,
          distanceKm: m.distanceKm !== undefined ? m.distanceKm : window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf),
          isSummoned: true,
          inscribedCACS: 2,
          inscribedGestores: 2,
          inscribedTotal: 4,
          presentCACS: 0,
          presentGestores: 0,
          presentTotal: 0
        }));
      }

      await window.db.saveTrainingFull(training, 'Preenchimento automático via Convocação PDF');
      this.currentTraining = training;
      await this.refreshTrainingsList();

      this.showToast('Relatório preenchido automaticamente com sucesso!', 'success');
      this.openWizard(training.id, 1);

    } catch (err) {
      console.error('Erro ao aplicar convocação:', err);
      this.showToast(`Erro ao aplicar dados: ${err.message}`, 'error');
    }
  }

  /**
   * Abre o assistente. mode 'cadastro': só a identificação (etapa 1) e as cidades convidadas (etapa 3), usado no
   * cadastro inicial da capacitação; as demais etapas ficam para o Relatório final.
   */
  async openWizard(trainingId, step = 1, { mode = 'relatorio' } = {}) {
    this.wizardMode = mode === 'cadastro' ? 'cadastro' : 'relatorio';
    if (window.CapacitaTE && !CapacitaTE.can('relatorio', 'view', trainingId)) {
      this.showToast('Você não tem permissão para abrir o Relatório.', 'warning');
      this.navigateTo('dashboard');
      return;
    }
    if (!window.db) return;

    // Buscar dados completos. Zera a etapa atual para que setWizardStep não grave na nova capacitação
    // os campos do formulário ainda preenchidos com a capacitação anterior
    this.currentStep = 0;
    this.currentTraining = await window.db.getTrainingFull(trainingId);
    if (!this.currentTraining) {
      this.showToast('Capacitação não encontrada.', 'error');
      this.navigateTo('dashboard', false);
      return;
    }

    this.activeView = 'wizard';
    this.navigateTo('wizard', false);
    this.applyWizardMode();
    this.setWizardStep(this.wizardMode === 'cadastro' && ![1, 3].includes(step) ? 1 : step);
    this.populateAllWizardForms();
  }

  /**
   * Modo cadastro: esconde as etapas do relatório no seletor e ajusta os botões de avançar das etapas 1 e 3
   */
  applyWizardMode() {
    const cadastro = this.wizardMode === 'cadastro';
    document.body.classList.toggle('wizard-cadastro', cadastro);
    document.querySelectorAll('.step-tab-btn').forEach((tab, idx) => {
      tab.style.display = cadastro && ![1, 3].includes(idx + 1) ? 'none' : '';
      // No cadastro, as cidades convidadas aparecem como Etapa 2 (no relatório continuam na etapa 3)
      const text = tab.querySelector('.step-tab-text');
      if (idx + 1 === 3 && text) {
        if (!text.dataset.original) text.dataset.original = text.textContent;
        text.textContent = cadastro ? 'Cidades Convidadas' : text.dataset.original;
        tab.dataset.displayNum = cadastro ? '2' : '';
      }
    });
    const title3 = document.querySelector('#wizard-step-3 .wizard-card-title span');
    if (title3) {
      if (!title3.dataset.original) title3.dataset.original = title3.textContent;
      title3.textContent = cadastro ? 'Etapa 2 do cadastro: Cidades Convidadas' : title3.dataset.original;
    }
    const title1 = document.querySelector('#wizard-step-1 .wizard-card-title span');
    if (title1) {
      if (!title1.dataset.original) title1.dataset.original = title1.textContent;
      title1.textContent = cadastro ? 'Etapa 1 do cadastro: Identificação da Capacitação' : title1.dataset.original;
    }
    [1, 3].forEach(n => {
      const section = document.getElementById(`wizard-step-${n}`);
      const btn = section && [...section.querySelectorAll('button[onclick="app.wizardNext()"]')].pop();
      if (!btn) return;
      if (!btn.dataset.originalHtml) btn.dataset.originalHtml = btn.innerHTML;
      btn.innerHTML = !cadastro ? btn.dataset.originalHtml
        : (n === 1 ? 'Salvar e continuar (Cidades convidadas)' : 'Concluir cadastro');
    });
    const prev3 = document.querySelector('#wizard-step-3 button[onclick="app.wizardPrev()"]');
    if (prev3) {
      if (!prev3.dataset.originalHtml) prev3.dataset.originalHtml = prev3.innerHTML;
      prev3.innerHTML = cadastro ? 'Voltar (Identificação)' : prev3.dataset.originalHtml;
    }
    if (typeof this.moveStepperIndicator === 'function') requestAnimationFrame(() => this.moveStepperIndicator(true));
  }

  /**
   * Seletor de etapas: marca ativa/concluídas (o número fica verde e surge com animação em sequência)
   * e desliza o destaque até a etapa ativa
   */
  updateStepperTabs() {
    let popOrder = 0;
    document.querySelectorAll('.step-tab-btn').forEach((tab, idx) => {
      const s = idx + 1;
      const wasCompleted = tab.classList.contains('completed');
      const isCompleted = s < this.currentStep;
      tab.classList.toggle('active', s === this.currentStep);
      tab.classList.toggle('completed', isCompleted);
      const num = tab.querySelector('.step-tab-num');
      if (!num) return;
      num.classList.remove('check-pop', 'num-return');
      tab.classList.remove('just-completed');
      // A etapa mantém sempre o número (concluída: círculo verde)
      const shown = tab.dataset.displayNum || String(s);
      if (num.textContent.trim() !== shown || num.querySelector('svg')) num.textContent = shown;
      if (isCompleted) {
        if (!wasCompleted) {
          // Etapas recém-concluídas surgem uma após a outra
          const delay = `${(popOrder++) * 0.07}s`;
          num.style.setProperty('--pop-delay', delay);
          tab.style.setProperty('--pop-delay', delay);
          void num.offsetWidth; // reinicia a animação
          num.classList.add('check-pop');
          tab.classList.add('just-completed');
        }
      } else if (wasCompleted) {
        void num.offsetWidth;
        num.classList.add('num-return');
      }
    });
    this.moveStepperIndicator();
  }

  /**
   * Destaque deslizante reutilizável: em cada grupo, um único destaque desliza até o item que recebe .active.
   * Grupos: menu lateral e abas de filtro (painel, equipe, equipe mestra e estruturas do curso).
   * Um MutationObserver acompanha a troca da classe .active, então funciona sem alterar as rotinas de cada tela.
   */
  initSlidingHighlights() {
    const groups = [
      { item: '.nav-menu > .nav-item', variant: 'nav' },
      { item: '.filter-tab-btn', variant: 'tab' },
      { item: '.team-tab-btn', variant: 'tab' },
      { item: '.master-team-tab-btn', variant: 'tab' },
      { item: '.course-tpl-tab-btn', variant: 'tab' }
    ];
    this._slideGroups = [];
    groups.forEach(g => {
      const first = document.querySelector(g.item);
      if (!first || !first.parentElement) return;
      const container = first.parentElement;
      if (container.querySelector(':scope > .slide-indicator')) return;
      container.classList.add('has-slide-indicator');
      if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
      const indicator = document.createElement('div');
      indicator.className = `slide-indicator slide-indicator-${g.variant}`;
      indicator.setAttribute('aria-hidden', 'true');
      container.insertBefore(indicator, container.firstChild);
      const group = { container, indicator, itemSelector: g.item, placed: false };
      this._slideGroups.push(group);
      new MutationObserver(mutations => {
        if (mutations.some(m => m.target !== indicator && m.target.matches && m.target.matches(g.item))) {
          this.scheduleSlideHighlight(group);
        }
      }).observe(container, { subtree: true, attributes: true, attributeFilter: ['class'] });
      this.moveSlideHighlight(group, true);
    });
  }

  scheduleSlideHighlight(group) {
    cancelAnimationFrame(group.raf);
    group.raf = requestAnimationFrame(() => this.moveSlideHighlight(group));
  }

  refreshSlideHighlights(instant = true) {
    (this._slideGroups || []).forEach(group => this.moveSlideHighlight(group, instant));
  }

  moveSlideHighlight(group, instant = false) {
    const { container, indicator } = group;
    const active = Array.from(container.querySelectorAll(':scope > .active')).find(el => el.matches(group.itemSelector));
    // Sem item ativo ou grupo oculto (outra tela aberta): esconde e reposiciona sem animar quando voltar
    if (!active || !active.offsetWidth) {
      indicator.classList.remove('visible');
      group.placed = false;
      return;
    }
    const place = () => {
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.height = `${active.offsetHeight}px`;
      indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
    };
    if (instant || !group.placed) {
      indicator.classList.add('no-transition');
      place();
      void indicator.offsetWidth;
      indicator.classList.remove('no-transition');
    } else {
      indicator.classList.remove('moving');
      void indicator.offsetWidth;
      indicator.classList.add('moving');
      place();
    }
    indicator.classList.add('visible');
    group.placed = true;
  }

  moveStepperIndicator(instant = false) {
    const nav = document.querySelector('.stepper-nav');
    const active = nav && nav.querySelector('.step-tab-btn.active');
    if (!nav || !active) return;
    let indicator = nav.querySelector('.stepper-indicator');
    const firstPlacement = !indicator;
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'stepper-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      nav.insertBefore(indicator, nav.firstChild);
      nav.classList.add('has-indicator');
    }
    // Painel oculto (outra tela aberta): reposiciona quando ficar visível
    if (!active.offsetWidth) return;
    const place = () => {
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.height = `${active.offsetHeight}px`;
      indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
    };
    if (firstPlacement || instant) {
      indicator.classList.add('no-transition');
      place();
      void indicator.offsetWidth;
      indicator.classList.remove('no-transition');
    } else {
      indicator.classList.remove('moving');
      void indicator.offsetWidth;
      indicator.classList.add('moving');
      place();
    }
    // No layout horizontal (celular), mantém a etapa ativa visível
    if (nav.scrollWidth > nav.clientWidth && typeof active.scrollIntoView === 'function') {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  validateCurrentStep(stepNumber = this.currentStep) {
    if (!this.currentTraining) return true;
    const t = this.currentTraining;

    // Registros históricos são livres de validação pois são apenas para consulta
    if (t.isHistorical || t.status === 'historico') return true;

    if (stepNumber === 1) {
      const missing = [];
      const num = this.getVal('wiz-train-number');
      const title = this.getVal('wiz-train-title');
      const uf = this.getVal('wiz-train-uf');
      const polo = this.getVal('wiz-train-polo');
      const venue = this.getVal('wiz-train-venue');
      const address = this.getVal('wiz-train-address');
      const startDate = this.getVal('wiz-train-start-date');
      const workload = this.getVal('wiz-train-workload-num') || this.getVal('wiz-train-workload');

      if (!num) missing.push('Número do Relatório');
      if (!title) missing.push('Título da Capacitação');
      if (!uf) missing.push('Estado (UF)');
      if (!polo) missing.push('Município Polo');
      if (!venue) missing.push('Local');
      if (!address) missing.push('Endereço Completo');
      if (!startDate) missing.push('Data Inicial');
      if (!workload) missing.push('Carga Horária');

      if (missing.length > 0) {
        this.showToast(`Por favor, preencha os campos obrigatórios (*) para avançar: ${missing.join(', ')}.`, 'warning');
        
        if (!num) { const el = document.getElementById('wiz-train-number'); if (el) el.focus(); }
        else if (!title) { const el = document.getElementById('wiz-train-title'); if (el) el.focus(); }
        else if (!uf) { const el = document.getElementById('wiz-train-uf'); if (el) el.focus(); }
        else if (!polo) { const el = document.getElementById('wiz-train-polo-select'); if (el) el.focus(); }
        else if (!venue) { const el = document.getElementById('wiz-train-venue'); if (el) el.focus(); }
        else if (!address) { const el = document.getElementById('wiz-train-address'); if (el) el.focus(); }
        else if (!startDate) { const el = document.getElementById('wiz-train-start-date'); if (el) el.focus(); }
        else if (!workload) { const el = document.getElementById('wiz-train-workload-num'); if (el) el.focus(); }

        return false;
      }

      // Validação estrita das Datas (DD/MM/AAAA e Data Final >= Data Inicial)
      const sVal = this.getVal('wiz-train-start-date');
      const eVal = this.getVal('wiz-train-end-date');

      const sDate = this.parseDateValue(sVal);
      if (!sDate) {
        this.showToast('Data Inicial inválida. Informe uma data válida no formato DD/MM/AAAA.', 'warning');
        const startInput = document.getElementById('wiz-train-start-date');
        if (startInput) startInput.focus();
        return false;
      }

      if (eVal && eVal.trim().length === 10) {
        const eDate = this.parseDateValue(eVal);
        if (!eDate) {
          this.showToast('Data Final inválida. Informe uma data válida no formato DD/MM/AAAA.', 'warning');
          const endInput = document.getElementById('wiz-train-end-date');
          if (endInput) endInput.focus();
          return false;
        }

        if (eDate.getTime() < sDate.getTime()) {
          this.showToast('A Data Final deve ser maior ou igual à Data Inicial.', 'warning');
          const endInput = document.getElementById('wiz-train-end-date');
          if (endInput) {
            endInput.focus();
            endInput.style.borderColor = 'var(--accent-rose, #ef4444)';
          }
          const errEl = document.getElementById('wiz-date-final-error');
          if (errEl) {
            errEl.style.display = 'block';
            errEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>A Data Final não pode ser anterior à Data Inicial.`;
          }
          return false;
        }
      }

      const datesFmt = this.getVal('wiz-train-dates-fmt');
      if (datesFmt && (datesFmt.includes('NaN') || datesFmt.includes('undefined'))) {
        this.showToast('Texto de datas inconsistente. Por favor, revise as datas informadas.', 'warning');
        const startInput = document.getElementById('wiz-train-start-date');
        if (startInput) startInput.focus();
        return false;
      }
    }

    if (stepNumber === 2) {
      if (!t.team || t.team.length === 0) {
        this.showToast('Adicione pelo menos um integrante à Equipe Participante na Etapa 2 antes de avançar.', 'warning');
        return false;
      }
    }

    if (stepNumber === 3) {
      if (!t.municipalities || t.municipalities.length === 0) {
        this.showToast('Cadastre pelo menos um Município Convocado na Etapa 3 antes de avançar.', 'warning');
        return false;
      }
    }

    if (stepNumber === 4) {
      const mods = t.courseModules || [];
      let totalHours = 0;
      let hasValidTopics = false;

      mods.forEach(m => {
        (m.gestorTopics || []).forEach(top => {
          if (top.topic && top.topic.trim() && top.topic !== '-') hasValidTopics = true;
          totalHours += parseFloat(top.hours) || 0;
        });
        (m.cacsTopics || []).forEach(top => {
          if (top.topic && top.topic.trim() && top.topic !== '-') hasValidTopics = true;
          totalHours += parseFloat(top.hours) || 0;
        });
      });

      if (!mods || mods.length === 0 || !hasValidTopics || totalHours <= 0) {
        this.showToast('Por favor, selecione ou configure uma Estrutura do Curso válida antes de avançar.', 'warning');
        this.openSelectCourseTemplateModal();
        return false;
      }
    }

    if (stepNumber === 6) {
      const contactDateVal = this.getVal('wiz-contact-start-date');
      if (contactDateVal && !this.validateContactStartDate(contactDateVal, true)) {
        const cInput = document.getElementById('wiz-contact-start-date');
        if (cInput) cInput.focus();
        return false;
      }
    }

    return true;
  }

  setWizardStep(stepNumber, { onlyCurrent = false } = {}) {
    let targetStep = Math.max(1, Math.min(this.totalSteps, stepNumber));
    if (this.wizardMode === 'cadastro') {
      if (![1, 3].includes(targetStep)) return;
      onlyCurrent = true;
    }

    // Se estiver tentando avançar para uma etapa posterior, salvar e validar a etapa atual e as intermediárias
    if (this.currentStep < 1) {
      // Capacitação recém-aberta: o formulário ainda não foi preenchido com os dados dela, nada a salvar/validar
    } else if (targetStep > this.currentStep) {
      this.saveCurrentStepData();
      for (let s = this.currentStep; s < (onlyCurrent ? this.currentStep + 1 : targetStep); s++) {
        if (!this.validateCurrentStep(s)) {
          if (s === this.currentStep) return; // Impede avançar se não preencheu todos os itens!
          // Etapa intermediária pendente (ex.: clique direto numa aba adiante): leva o usuário até ela
          targetStep = s;
          break;
        }
      }
    } else if (targetStep < this.currentStep) {
      // Salvar progresso ao retornar para etapas anteriores
      this.saveCurrentStepData();
    }

    this._stepDirection = targetStep < this.currentStep ? 'back' : 'forward';
    this.currentStep = targetStep;
    window.location.hash = `wizard/${this.currentTraining?.id || ''}/${this.currentStep}`;

    // Atualizar abas do Stepper (destaque deslizante e ✓ das etapas concluídas)
    this.updateStepperTabs();

    // Alternar painéis
    document.querySelectorAll('.wizard-step-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`wizard-step-${this.currentStep}`);
    if (activePanel) {
      // Animação no sentido da navegação (avançar desliza da direita, voltar da esquerda)
      activePanel.classList.remove('step-enter-forward', 'step-enter-back');
      void activePanel.offsetWidth; // reinicia a animação
      activePanel.classList.add('active', this._stepDirection === 'back' ? 'step-enter-back' : 'step-enter-forward');
    }

    // Atualizar título e barra de progresso no topo
    this.updateWizardHeader();

    // Ações ao entrar em etapas específicas
    if (this.currentStep === 3) this.renderMunicipalitiesStep();
    if (this.currentStep === 4) this.renderCourseStructureStep();
    if (this.currentStep === 5) this.renderEducationalTechStep();
    if (this.currentStep === 6) this.renderContactsStep();
    if (this.currentStep === 7) this.renderAttendanceStep();
    if (this.currentStep === 8) {
      this.renderEvaluationStep();
      setTimeout(() => {
        this.renderEvaluationCharts();
        this.renderWordClouds();
      }, 100);
    }
    if (this.currentStep === 9) this.renderPhotosStep();
    if (this.currentStep === 10) this.renderAppendicesStep();
    if (this.currentStep === 11) this.renderConferenceStep();
    if (this.currentStep === 12) this.renderReportPreviewStep();

    // Sempre rolar para o topo absoluto da página ao alternar etapas
    this.scrollToTop();
    setTimeout(() => this.scrollToTop(), 60);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    const scrollContainers = [
      '.content-area',
      '.main-content',
      '.app-container',
      '.app-layout',
      '.wizard-container',
      '.wizard-body-layout',
      '.wizard-main-content',
      '.wizard-step-panel',
      '#view-wizard',
      'main'
    ];

    scrollContainers.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el && el.scrollTop > 0) {
          el.scrollTop = 0;
        }
      });
    });

    const topTarget = document.getElementById('wizard-header-title') || document.querySelector('.wizard-header') || document.querySelector('.content-area');
    if (topTarget && typeof topTarget.scrollIntoView === 'function') {
      try {
        topTarget.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' });
      } catch (e) {
        topTarget.scrollIntoView(true);
      }
    }
  }

  wizardNext() {
    this.saveCurrentStepData();
    if (!this.validateCurrentStep()) {
      return; // Bloqueado se não preencheu todos os itens!
    }
    if (this.wizardMode === 'cadastro') {
      if (this.currentStep === 1) {
        this.setWizardStep(3, { onlyCurrent: true });
        this.scrollToTop();
      } else {
        // Cadastro concluído: volta para a capacitação (etapa 1: formulário de inscrição)
        const id = this.currentTraining && this.currentTraining.id;
        this.wizardMode = 'relatorio';
        this.applyWizardMode();
        this.showToast('Cadastro da capacitação salvo.', 'success');
        if (id) window.location.hash = `capacitacao/${encodeURIComponent(id)}/1`;
      }
      return;
    }
    if (this.currentStep < this.totalSteps) {
      this.setWizardStep(this.currentStep + 1);
      this.scrollToTop();
    }
  }

  wizardPrev() {
    this.saveCurrentStepData();
    if (this.wizardMode === 'cadastro') {
      if (this.currentStep === 3) { this.setWizardStep(1); this.scrollToTop(); }
      return;
    }
    if (this.currentStep > 1) {
      this.setWizardStep(this.currentStep - 1);
      this.scrollToTop();
    }
  }

  updateWizardHeader() {
    if (!this.currentTraining) return;

    const t = this.currentTraining;
    const titleEl = document.getElementById('wizard-header-title');
    if (titleEl) {
      if (t.isHistorical) {
        titleEl.innerHTML = `Capacitação Nº ${t.number} • <span style="color:var(--accent-gold-text);">${this.escapeHtml(t.polo || 'Polo')} (${t.uf || 'MT'}) [HISTÓRICO PRESERVADO]</span>`;
      } else {
        const poloText = t.polo ? `${this.escapeHtml(t.polo)} (${t.uf || 'UF'})` : 'Nova Capacitação em Branco';
        titleEl.innerHTML = `Capacitação Nº ${t.number || 16} • <span style="color:var(--accent-gold-text);">${poloText}</span>`;
      }
    }

    // Calcular percentual de preenchimento
    let completedSteps = 0;
    if (t.polo && t.startDate) completedSteps++;
    if (t.team && t.team.length > 0) completedSteps++;
    if (t.municipalities && t.municipalities.length > 0) completedSteps++;
    if (t.courseModules && t.courseModules.length > 0) completedSteps++;
    if (t.educationalTech && (t.educationalTech.figures?.length > 0 || t.educationalTech.text)) completedSteps++;
    if (t.contactsData?.startDate || t.contactsData?.methods) completedSteps++;
    if (t.attendance && t.attendance.length > 0) completedSteps++;
    if (t.evaluations && t.evaluations.length > 0) completedSteps++;
    if (t.media && t.media.filter(m => m.type === 'photo').length > 0) completedSteps++;
    if (t.media && t.media.filter(m => m.type !== 'photo').length > 0) completedSteps++;
    if (completedSteps >= 9) completedSteps += 2; // Conferência e Geração

    const percent = Math.min(100, Math.round((completedSteps / 12) * 100));
    t.progressPercent = percent;

    const barEl = document.getElementById('wizard-header-progressbar');
    if (barEl) barEl.style.width = `${percent}%`;

    const statusTextEl = document.getElementById('wizard-header-progress-text');
    if (statusTextEl) {
      statusTextEl.textContent = `${percent}% Concluído (${completedSteps} de 12 Etapas)`;
    }
  }

  /* ==========================================================================
     POPULAÇÃO & SALVAMENTO DE DADOS DAS ETAPAS
     ========================================================================== */
  populateAllWizardForms() {
    if (!this.currentTraining) return;
    const t = this.currentTraining;

    // Etapa 1: Identificação
    this.setVal('wiz-train-number', t.number || '');
    this.setVal('wiz-train-title', t.title || '');

    // Carga Horária com botão de rotação (spinner)
    const workloadNum = t.workload ? parseInt(t.workload) : '';
    this.setVal('wiz-train-workload-num', workloadNum);
    this.setVal('wiz-train-workload', t.workload || '');
    const hintEl = document.getElementById('wiz-workload-auto-hint');
    if (hintEl) hintEl.textContent = t.workload ? `Carga horária configurada: ${t.workload}` : '';

    // Estado (UF) PRIMEIRO e Município Polo Suspenso com Código IBGE/INEP
    const uf = t.uf || '';
    this.setVal('wiz-train-uf', uf);
    this.populateCitiesDropdown(uf, t.polo || '', t.poloIbge || '');

    this.setVal('wiz-train-start-date', this.isoToDmy(t.startDate) || t.startDate || '');
    this.setVal('wiz-train-end-date', this.isoToDmy(t.endDate) || t.endDate || '');
    this.setVal('wiz-train-dates-fmt', t.datesFormatted || '');

    const endInput = document.getElementById('wiz-train-end-date');
    if (endInput) {
      endInput.style.borderColor = '';
    }
    const errEl = document.getElementById('wiz-date-final-error');
    if (errEl) {
      errEl.style.display = 'none';
      errEl.textContent = '';
    }
    this.setVal('wiz-train-target', t.targetAudience || '');
    this.setVal('wiz-train-expected', t.expectedParticipants || '');
    this.setVal('wiz-train-venue', t.locationVenue || '');
    this.setVal('wiz-train-address', t.locationAddress || '');
    this.setVal('wiz-train-org', t.responsibleOrg || localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)'); // chave legada mantida para compatibilidade

    const defaultProj = localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL'; // chave legada mantida para compatibilidade
    const defaultProc = localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00'; // chave legada mantida para compatibilidade
    this.setVal('wiz-train-project', t.relatedProject || defaultProj);
    this.setVal('wiz-train-process', t.processNumber || defaultProc);
    this.setVal('wiz-train-funding', t.fundingOrg || localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE'); // chave legada mantida para compatibilidade
    this.setVal('wiz-train-partners', t.partnerOrgs || '');

    // Exibir card do arquivo de convocação anexado em Etapa 1 (se existir)
    const attachedCard = document.getElementById('etapa1-convocacao-attached-card');
    const attachedFilename = document.getElementById('etapa1-attached-filename');
    if (attachedCard && attachedFilename) {
      if (t.attachedFileName) {
        attachedCard.style.display = 'flex';
        attachedFilename.textContent = t.attachedFileName;
      } else {
        attachedCard.style.display = 'none';
      }
    }

    // Etapa 2: Equipe
    this.renderTeamList();

    // Etapa 5: Tecnologias Educacionais
    this.renderEducationalTechStep();

    // Etapa 6: Contatos
    this.renderContactsStep();

    // Etapa 7: Inscrições & Presença
    this.renderAttendanceStep();
  }

  /* ==========================================================================
     ETAPA 5: TECNOLOGIAS EDUCACIONAIS (KAHOOT & PLICKERS)
     ========================================================================== */
  getDefaultEducationalTechData() {
    return {
      text: 'Durante o transcorrer dos módulos teóricos e práticos, foram incorporadas dinâmicas interativas mediante o uso de tecnologias educacionais e plataformas de aprendizagem baseada em jogos, com a finalidade de acompanhar o nível de assimilação dos conteúdos e potencializar o engajamento coletivo. Foram empregados os aplicativos Kahoot e Plickers: o Kahoot permitiu a participação em tempo real por meio dos smartphones dos cursistas em questionários dinâmicos; já o Plickers viabilizou a coleta imediata de respostas mediante a leitura óptica de cartões com QR Code (alternativas A, B, C e D) realizada exclusivamente pelo celular do instrutor, contornando eventuais oscilações de sinal de internet e garantindo dinamismo à atividade.',
      figures: [
        {
          id: 'fig_1',
          tool: 'kahoot',
          title: 'Kahoot (Questionário Interativo em Tempo Real)',
          caption: 'Figura 1: Avaliação via ferramenta kahoot.',
          source: 'Fonte: Elaborada pelos autores.',
          image: window.educationalTechAssets?.kahoot || ''
        },
        {
          id: 'fig_2',
          tool: 'plickers',
          title: 'Plickers (Cartões de Leitura Óptica QR Code)',
          caption: 'Figura 2: Avaliação via ferramenta Plickers.',
          source: 'Fonte: Elaborada pelos autores.',
          image: window.educationalTechAssets?.plickers || ''
        }
      ],
      extraFigures: []
    };
  }

  ensureEducationalTechInitialized() {
    if (!this.currentTraining) return;
    if (!this.currentTraining.educationalTech) {
      this.currentTraining.educationalTech = this.getDefaultEducationalTechData();
    }
    const et = this.currentTraining.educationalTech;
    if (!Array.isArray(et.figures) || et.figures.length === 0) {
      const def = this.getDefaultEducationalTechData();
      et.figures = def.figures;
    }
    const f1 = et.figures.find(f => f.id === 'fig_1');
    if (!f1) {
      et.figures.unshift({
        id: 'fig_1',
        tool: 'kahoot',
        title: 'Kahoot (Questionário Interativo em Tempo Real)',
        caption: 'Figura 1: Avaliação via ferramenta kahoot.',
        source: 'Fonte: Elaborada pelos autores.',
        image: window.educationalTechAssets?.kahoot || ''
      });
    } else if (!f1.image && !f1.removed && window.educationalTechAssets?.kahoot) {
      f1.image = window.educationalTechAssets.kahoot;
    }

    const f2 = et.figures.find(f => f.id === 'fig_2');
    if (!f2) {
      et.figures.push({
        id: 'fig_2',
        tool: 'plickers',
        title: 'Plickers (Cartões de Leitura Óptica QR Code)',
        caption: 'Figura 2: Avaliação via ferramenta Plickers.',
        source: 'Fonte: Elaborada pelos autores.',
        image: window.educationalTechAssets?.plickers || ''
      });
    } else if (!f2.image && !f2.removed && window.educationalTechAssets?.plickers) {
      f2.image = window.educationalTechAssets.plickers;
    }

    if (!Array.isArray(et.extraFigures)) {
      et.extraFigures = [];
    }
  }

  /**
   * Atualiza o número das legendas das figuras de Tecnologias Educacionais conforme a numeração vigente do relatório
   * (as figuras são renumeradas quando alguma é removida ou adicionada)
   */
  syncEduTechCaptionNumbers() {
    const gen = window.reportDocxGenerator;
    const et = this.currentTraining?.educationalTech;
    if (!gen || typeof gen.getFigureNumbering !== 'function' || !et) return;

    const { numbers } = gen.getFigureNumbering(this.currentTraining);
    (et.figures || []).forEach(fig => {
      if (numbers[fig.id] && fig.caption) fig.caption = gen.applyFigureNumber(fig.caption, numbers[fig.id]);
    });
    (et.extraFigures || []).forEach(ef => {
      const num = numbers[`edu_${ef.id}`];
      if (num && ef.caption) ef.caption = gen.applyFigureNumber(ef.caption, num);
    });
  }

  renderEducationalTechStep() {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    this.syncEduTechCaptionNumbers();

    const et = this.currentTraining.educationalTech;

    // 1. Preencher textarea do texto de contextualização
    const textEl = document.getElementById('wiz-edutech-text');
    if (textEl) {
      textEl.value = et.text || this.getDefaultEducationalTechData().text;
    }

    // 2. Renderizar os cards de Figura 1 e 2 no grid
    const gridEl = document.getElementById('wizard-edutech-figures-grid');
    if (gridEl) {
      gridEl.innerHTML = et.figures.map(fig => this.renderEduTechFigureCardHtml(fig)).join('');
    }

    // 3. Renderizar cards de figuras extras
    const extraGridEl = document.getElementById('wizard-edutech-extra-grid');
    if (extraGridEl) {
      extraGridEl.innerHTML = (et.extraFigures || []).map((fig, idx) => this.renderExtraEduTechFigureCardHtml(fig, idx)).join('');
    }

    // 4. Renderizar a pré-visualização ao vivo
    this.renderEduTechLivePreview();
  }

  renderEduTechFigureCardHtml(fig) {
    const hasImage = !!fig.image;
    const isKahoot = fig.id === 'fig_1';
    const toolBadge = isKahoot ? 'badge-blue' : 'badge-green';
    const toolName = isKahoot ? 'Kahoot' : 'Plickers';

    return `
      <div class="glass-card" style="padding:1.25rem; display:flex; flex-direction:column; gap:0.9rem; border:1px solid var(--border-color); background:var(--bg-card); position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.25rem;">
              <span class="nav-badge ${toolBadge}" style="font-weight:700; font-size:0.75rem;">${toolName}</span>
              <strong style="font-size:0.92rem; color:var(--text-primary);">${this.escapeHtml(fig.title)}</strong>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted);">
              ${isKahoot ? 'Questionários dinâmicos com smartphones dos participantes.' : 'Leitura óptica de cartões com QR Code.'}
            </div>
          </div>
        </div>

        <div style="position:relative; min-height:180px; background:var(--bg-input); border:2px dashed ${hasImage ? 'var(--border-color)' : 'rgba(59,130,246,0.4)'}; border-radius:var(--radius-sm); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0.75rem; overflow:hidden;">
          ${hasImage ? `
            <div style="width:100%; text-align:center;">
              <img src="${fig.image}" alt="${this.escapeHtml(fig.caption)}" style="max-width:100%; max-height:160px; object-fit:contain; border-radius:var(--radius-sm); border:1px solid var(--border-color); box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            </div>
            <div style="display:flex; gap:0.4rem; margin-top:0.6rem; flex-wrap:wrap; justify-content:center;">
              <label class="btn btn-secondary btn-sm" style="cursor:pointer; font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center; gap:0.3rem;">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Trocar Imagem
                <input type="file" accept="image/*" style="display:none;" onchange="app.handleEduTechSingleUpload('${fig.id}', this)">
              </label>
              <button type="button" class="btn btn-secondary btn-sm" onclick="app.useDefaultEduTechImage('${fig.id}')" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center; gap:0.3rem;" title="Usar imagem oficial de referência">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                Restaurar Imagem Padrão
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeEduTechImage('${fig.id}')" style="font-size:0.75rem; padding:0.25rem 0.55rem; color:var(--accent-rose, #ef4444); display:inline-flex; align-items:center; gap:0.3rem;" title="Remover esta figura do relatório (as demais figuras são renumeradas)">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Remover
              </button>
            </div>
          ` : `
            <div style="text-align:center; padding:1rem;">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted); margin-bottom:0.5rem;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              <div style="font-size:0.85rem; font-weight:600; color:var(--text-primary); margin-bottom:0.25rem;">${fig.removed ? 'Figura removida do relatório' : 'Nenhuma imagem anexada'}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.75rem;">${fig.removed ? 'As demais figuras foram renumeradas. Anexe uma imagem para incluí-la novamente.' : 'Clique para selecionar ou use a imagem oficial de exemplo'}</div>
              <div style="display:flex; gap:0.4rem; justify-content:center; flex-wrap:wrap;">
                <label class="btn btn-primary btn-sm" style="cursor:pointer; font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Selecionar Imagem
                  <input type="file" accept="image/*" style="display:none;" onchange="app.handleEduTechSingleUpload('${fig.id}', this)">
                </label>
                <button type="button" class="btn btn-secondary btn-sm" onclick="app.useDefaultEduTechImage('${fig.id}')" style="font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Usar Imagem Oficial de Exemplo
                </button>
              </div>
            </div>
          `}
        </div>

        <div style="display:flex; flex-direction:column; gap:0.6rem;">
          <div class="form-group" style="margin:0;">
            <label class="form-label" style="font-size:0.78rem; font-weight:700;">
              Nome / Título da Legenda (Exibido ACIMA da figura):
            </label>
            <input type="text" class="form-control form-control-sm" value="${this.escapeHtml(fig.caption || '')}" placeholder="Ex: Figura 1: Avaliação via ferramenta kahoot." oninput="app.updateEduTechCaption('${fig.id}', this.value)">
          </div>

          <div class="form-group" style="margin:0;">
            <label class="form-label" style="font-size:0.78rem; font-weight:700;">
              Fonte da Imagem (Exibido ABAIXO da figura):
            </label>
            <input type="text" class="form-control form-control-sm" value="${this.escapeHtml(fig.source || 'Fonte: Elaborada pelos autores.')}" placeholder="Ex: Fonte: Elaborada pelos autores." oninput="app.updateEduTechSource('${fig.id}', this.value)">
          </div>
        </div>
      </div>
    `;
  }

  renderExtraEduTechFigureCardHtml(fig, idx) {
    const hasImage = !!fig.image;
    return `
      <div class="glass-card" style="padding:1.25rem; display:flex; flex-direction:column; gap:0.9rem; border:1px solid var(--border-color); background:var(--bg-card); position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:0.92rem; color:var(--text-primary); display:flex; align-items:center; gap:0.4rem;">
            <span class="nav-badge badge-blue">Figura Extra ${idx + 1}</span>
            <span>${this.escapeHtml(fig.title || 'Ferramenta Adicional')}</span>
          </strong>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeExtraEduTechFigure('${fig.id}')" style="color:var(--accent-rose, #ef4444); padding:0.2rem 0.5rem; font-size:0.75rem;" title="Excluir esta figura">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            Excluir
          </button>
        </div>

        <div style="position:relative; min-height:160px; background:var(--bg-input); border:2px dashed var(--border-color); border-radius:var(--radius-sm); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0.75rem; overflow:hidden;">
          ${hasImage ? `
            <img src="${fig.image}" alt="${this.escapeHtml(fig.caption)}" style="max-width:100%; max-height:150px; object-fit:contain; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
            <label class="btn btn-secondary btn-sm" style="cursor:pointer; font-size:0.75rem; margin-top:0.5rem; display:inline-flex; align-items:center; gap:0.3rem;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Trocar Imagem
              <input type="file" accept="image/*" style="display:none;" onchange="app.handleExtraEduTechUpload('${fig.id}', this)">
            </label>
          ` : `
            <label class="btn btn-primary btn-sm" style="cursor:pointer; font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Anexar Imagem
              <input type="file" accept="image/*" style="display:none;" onchange="app.handleExtraEduTechUpload('${fig.id}', this)">
            </label>
          `}
        </div>

        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <div class="form-group" style="margin:0;">
            <label class="form-label" style="font-size:0.78rem;">Nome da Ferramenta:</label>
            <input type="text" class="form-control form-control-sm" value="${this.escapeHtml(fig.title || '')}" placeholder="Ex: Mentimeter, Padlet..." oninput="app.updateExtraEduTechTitle('${fig.id}', this.value)">
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label" style="font-size:0.78rem;">Legenda (Acima da Imagem):</label>
            <input type="text" class="form-control form-control-sm" value="${this.escapeHtml(fig.caption || '')}" placeholder="Ex: Figura: Avaliação via ferramenta..." oninput="app.updateExtraEduTechCaption('${fig.id}', this.value)">
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label" style="font-size:0.78rem;">Fonte (Abaixo da Imagem):</label>
            <input type="text" class="form-control form-control-sm" value="${this.escapeHtml(fig.source || 'Fonte: Elaborada pelos autores.')}" oninput="app.updateExtraEduTechSource('${fig.id}', this.value)">
          </div>
        </div>
      </div>
    `;
  }

  renderEduTechLivePreview() {
    const previewEl = document.getElementById('edutech-report-live-preview');
    if (!previewEl || !this.currentTraining) return;

    this.ensureEducationalTechInitialized();
    const et = this.currentTraining.educationalTech;
    const text = et.text || this.getDefaultEducationalTechData().text;

    let figuresHtml = '';
    (et.figures || []).forEach(fig => {
      if (fig.image) {
        figuresHtml += `
          <div style="margin: 1.5rem 0; text-align: center; page-break-inside: avoid;">
            <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; font-weight:bold; color:var(--text-primary); margin-bottom:6px; text-align:center;">
              ${this.escapeHtml(fig.caption || 'Figura. Avaliação via ferramenta pedagógica.')}
            </p>
            <div style="text-align:center;">
              <img src="${fig.image}" alt="${this.escapeHtml(fig.caption)}" style="max-width:92%; max-height:260px; object-fit:contain; border-radius:2px; border:1px solid var(--border-color); box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            </div>
            <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:10pt; color:var(--text-muted); margin-top:4px; margin-bottom:1.5rem; text-align:center;">
              ${this.escapeHtml(fig.source || 'Fonte: Elaborada pelos autores.')}
            </p>
          </div>
        `;
      }
    });

    (et.extraFigures || []).forEach(fig => {
      if (fig.image) {
        figuresHtml += `
          <div style="margin: 1.5rem 0; text-align: center; page-break-inside: avoid;">
            <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; font-weight:bold; color:var(--text-primary); margin-bottom:6px; text-align:center;">
              ${this.escapeHtml(fig.caption || 'Figura. Atividade com tecnologia educacional.')}
            </p>
            <div style="text-align:center;">
              <img src="${fig.image}" alt="${this.escapeHtml(fig.caption)}" style="max-width:92%; max-height:260px; object-fit:contain; border-radius:2px; border:1px solid var(--border-color); box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            </div>
            <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:10pt; color:var(--text-muted); margin-top:4px; margin-bottom:1.5rem; text-align:center;">
              ${this.escapeHtml(fig.source || 'Fonte: Elaborada pelos autores.')}
            </p>
          </div>
        `;
      }
    });

    if (!figuresHtml) {
      figuresHtml = `
        <div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-style:italic; border:1px dashed var(--border-color); border-radius:var(--radius-sm); margin:1rem 0;">
          Nenhuma imagem vinculada no momento. Anexe uma imagem ou clique em "Preencher com Imagens de Exemplo".
        </div>
      `;
    }

    previewEl.innerHTML = `
      <div style="font-family:var(--report-font, 'Times New Roman'), serif; color:var(--text-primary); font-size:12pt; line-height:1.5;">
        <p style="text-align:justify; margin-bottom:1rem; text-indent:1.25cm;">
          ${text}
        </p>
        ${figuresHtml}
      </div>
    `;
  }

  onEduTechTextInput() {
    const textEl = document.getElementById('wiz-edutech-text');
    if (!textEl || !this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    this.currentTraining.educationalTech.text = textEl.value;
    this.renderEduTechLivePreview();
    this.saveCurrentStepData();
  }

  restoreDefaultEduTechText() {
    const textEl = document.getElementById('wiz-edutech-text');
    const def = this.getDefaultEducationalTechData().text;
    if (textEl) textEl.value = def;
    if (this.currentTraining) {
      this.ensureEducationalTechInitialized();
      this.currentTraining.educationalTech.text = def;
    }
    this.renderEduTechLivePreview();
    this.saveCurrentStepData();
    this.showToast('Texto padrão das tecnologias educacionais restaurado com sucesso!', 'success');
  }

  async handleEduTechSingleUpload(figId, inputEl) {
    if (!inputEl || !inputEl.files || !inputEl.files[0]) return;
    const file = inputEl.files[0];

    let dataUrl;
    try {
      dataUrl = await this.fileToReportImageDataUrl(file);
    } catch (err) {
      this.notifyImageReadError(file, err);
      return;
    } finally {
      inputEl.value = '';
    }

    this.ensureEducationalTechInitialized();
    const fig = this.currentTraining.educationalTech.figures.find(f => f.id === figId);
    if (fig) {
      fig.image = dataUrl;
      fig.removed = false;
      this.renderEducationalTechStep();
      this.saveCurrentStepData();
      this.showToast(`Imagem da ${fig.caption ? fig.caption.split(':')[0] : 'figura'} atualizada com sucesso!`, 'success');
    }
  }

  useDefaultEduTechImage(figId) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const fig = this.currentTraining.educationalTech.figures.find(f => f.id === figId);
    if (!fig) return;

    if (figId === 'fig_1' && window.educationalTechAssets?.kahoot) {
      fig.image = window.educationalTechAssets.kahoot;
    } else if (figId === 'fig_2' && window.educationalTechAssets?.plickers) {
      fig.image = window.educationalTechAssets.plickers;
    }
    fig.removed = false;
    this.renderEducationalTechStep();
    this.saveCurrentStepData();
    this.showToast(`Imagem oficial de exemplo carregada para ${fig.caption ? fig.caption.split(':')[0] : 'a figura'}!`, 'success');
  }

  preloadAllDefaultEduTechExamples() {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const et = this.currentTraining.educationalTech;
    const f1 = et.figures.find(f => f.id === 'fig_1');
    const f2 = et.figures.find(f => f.id === 'fig_2');

    if (f1 && window.educationalTechAssets?.kahoot) {
      f1.image = window.educationalTechAssets.kahoot;
      f1.removed = false;
    }
    if (f2 && window.educationalTechAssets?.plickers) {
      f2.image = window.educationalTechAssets.plickers;
      f2.removed = false;
    }
    this.renderEducationalTechStep();
    this.saveCurrentStepData();
    this.showToast('Imagens oficiais de referência carregadas com sucesso para Kahoot e Plickers!', 'success');
  }

  removeEduTechImage(figId) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const fig = this.currentTraining.educationalTech.figures.find(f => f.id === figId);
    if (fig) {
      fig.image = '';
      fig.removed = true;
      this.renderEducationalTechStep();
      this.saveCurrentStepData();
      this.showToast('Figura removida do relatório. As demais figuras foram renumeradas.', 'info');
    }
  }

  updateEduTechCaption(figId, val) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const fig = this.currentTraining.educationalTech.figures.find(f => f.id === figId);
    if (fig) {
      fig.caption = val;
      this.renderEduTechLivePreview();
      this.saveCurrentStepData();
    }
  }

  updateEduTechSource(figId, val) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const fig = this.currentTraining.educationalTech.figures.find(f => f.id === figId);
    if (fig) {
      fig.source = val;
      this.renderEduTechLivePreview();
      this.saveCurrentStepData();
    }
  }

  addExtraEduTechFigure() {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const et = this.currentTraining.educationalTech;
    const count = (et.extraFigures || []).length;
    // Número provisório: a legenda é renumerada automaticamente quando a imagem for anexada
    const nextNum = window.reportDocxGenerator?.getFigureNumbering
      ? window.reportDocxGenerator.getFigureNumbering(this.currentTraining).nextEduNumber
      : count + 3;
    const newFig = {
      id: `extra_edutech_${Date.now()}`,
      title: `Ferramenta Educacional ${count + 1}`,
      caption: `Figura ${nextNum}: Atividade pedagógica via tecnologia educacional.`,
      source: 'Fonte: Elaborada pelos autores.',
      image: ''
    };
    et.extraFigures.push(newFig);
    this.renderEducationalTechStep();
    this.saveCurrentStepData();
    this.showToast('Novo espaço para figura/ferramenta adicionado!', 'success');
  }

  removeExtraEduTechFigure(extraId) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const et = this.currentTraining.educationalTech;
    et.extraFigures = (et.extraFigures || []).filter(f => f.id !== extraId);
    this.renderEducationalTechStep();
    this.saveCurrentStepData();
    this.showToast('Figura extra removida.', 'info');
  }

  updateExtraEduTechTitle(extraId, val) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const fig = (this.currentTraining.educationalTech.extraFigures || []).find(f => f.id === extraId);
    if (fig) {
      fig.title = val;
      this.saveCurrentStepData();
    }
  }

  updateExtraEduTechCaption(extraId, val) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const fig = (this.currentTraining.educationalTech.extraFigures || []).find(f => f.id === extraId);
    if (fig) {
      fig.caption = val;
      this.renderEduTechLivePreview();
      this.saveCurrentStepData();
    }
  }

  updateExtraEduTechSource(extraId, val) {
    if (!this.currentTraining) return;
    this.ensureEducationalTechInitialized();
    const fig = (this.currentTraining.educationalTech.extraFigures || []).find(f => f.id === extraId);
    if (fig) {
      fig.source = val;
      this.renderEduTechLivePreview();
      this.saveCurrentStepData();
    }
  }

  async handleExtraEduTechUpload(extraId, inputEl) {
    if (!inputEl || !inputEl.files || !inputEl.files[0]) return;
    const file = inputEl.files[0];

    let dataUrl;
    try {
      dataUrl = await this.fileToReportImageDataUrl(file);
    } catch (err) {
      this.notifyImageReadError(file, err);
      return;
    } finally {
      inputEl.value = '';
    }

    this.ensureEducationalTechInitialized();
    const fig = (this.currentTraining.educationalTech.extraFigures || []).find(f => f.id === extraId);
    if (fig) {
      fig.image = dataUrl;
      this.renderEducationalTechStep();
      this.saveCurrentStepData();
      this.showToast('Imagem anexada com sucesso!', 'success');
    }
  }

  renderContactsStep() {
    if (!this.currentTraining) return;
    const t = this.currentTraining;
    const cd = t.contactsData || {};

    const sDate = this.isoToDmy(cd.startDate) || cd.startDate || '';
    const sMethods = cd.methods || '';

    this.setVal('wiz-contact-start-date', sDate);
    this.setVal('wiz-contact-methods', sMethods);
    this.syncContactCheckboxesFromSavedMethods(sMethods);
    this.setVal('wiz-contact-responsible', cd.responsible || 'Equipe de Articulação Institucional CECATE-CO');
    this.setVal('wiz-contact-notes', cd.notes || '');
    this.updateContactDateHint();
    if (sDate) {
      this.validateContactStartDate(sDate, false);
    }
  }

  updateContactMethodsFromCheckboxes() {
    const checkboxes = document.querySelectorAll('.contact-method-checkbox:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);

    let formattedString = '';
    if (selected.length === 1) {
      formattedString = selected[0];
    } else if (selected.length === 2) {
      formattedString = `${selected[0]} e ${selected[1]}`;
    } else if (selected.length > 2) {
      const last = selected[selected.length - 1];
      const initial = selected.slice(0, selected.length - 1);
      formattedString = `${initial.join(', ')} e ${last}`;
    }

    const hiddenInput = document.getElementById('wiz-contact-methods');
    if (hiddenInput) {
      hiddenInput.value = formattedString;
    }

    if (this.currentTraining) {
      if (!this.currentTraining.contactsData) this.currentTraining.contactsData = {};
      this.currentTraining.contactsData.methods = formattedString;
      this.currentTraining.contactsData.selectedChannels = selected;
      this.saveCurrentStepData();
    }
  }

  syncContactCheckboxesFromSavedMethods(methodsString) {
    const hiddenInput = document.getElementById('wiz-contact-methods');
    if (hiddenInput && methodsString !== undefined) {
      hiddenInput.value = methodsString || '';
    }

    const t = this.currentTraining;
    const savedChannels = t?.contactsData?.selectedChannels;
    const str = (methodsString || '').toLowerCase().trim();
    const checkboxes = document.querySelectorAll('.contact-method-checkbox');

    checkboxes.forEach(cb => {
      if (Array.isArray(savedChannels) && savedChannels.length > 0) {
        cb.checked = savedChannels.includes(cb.value);
        return;
      }
      if (!str) {
        cb.checked = false;
        return;
      }
      const val = cb.value.toLowerCase();
      if (val === 'ofícios') {
        cb.checked = str.includes('ofício') || str.includes('oficio');
      } else if (val === 'e-mails') {
        cb.checked = str.includes('e-mail') || str.includes('email');
      } else if (val === 'telefones') {
        cb.checked = str.includes('telefone') || str.includes('ligaç');
      } else if (val === 'whatsapp') {
        cb.checked = str.includes('whatsapp') || str.includes('zap') || str.includes('wpp');
      } else if (val === 'reuniões virtuais') {
        cb.checked = str.includes('reuniã') || str.includes('virtual') || str.includes('videoconfer');
      } else {
        cb.checked = str.includes(val);
      }
    });
  }

  removeEtapa1ConvocacaoFile() {
    if (!this.currentTraining) return;
    this.currentTraining.attachedFileName = null;
    this.currentTraining.polo = '';
    this.currentTraining.poloIbge = '';
    this.currentTraining.datesFormatted = '';
    this.currentTraining.locationVenue = '';
    this.currentTraining.locationAddress = '';
    this.currentTraining.expectedParticipants = '';
    this.currentTraining.municipalities = [];

    const attachedCard = document.getElementById('etapa1-convocacao-attached-card');
    if (attachedCard) attachedCard.style.display = 'none';

    this.populateAllWizardForms();
    if (this.currentStep === 3) this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    this.showToast('Convocação desanexada e dados redefinidos.');
  }

  saveCurrentStepData() {
    if (!this.currentTraining || !window.db) return;
    const t = this.currentTraining;

    // Regra 67: Proteção estrita de registros históricos
    if (t.isHistorical) {
      return;
    }

    // Sincronizar dados da Etapa 1
    t.number = parseInt(this.getVal('wiz-train-number')) || t.number;
    t.title = this.getVal('wiz-train-title');
    t.uf = this.getVal('wiz-train-uf');
    t.polo = this.getVal('wiz-train-polo');
    t.poloIbge = this.getVal('wiz-train-inep');
    t.workload = this.getVal('wiz-train-workload') || (this.getVal('wiz-train-workload-num') ? `${this.getVal('wiz-train-workload-num')} horas` : '');
    t.startDate = this.dmyToIso(this.getVal('wiz-train-start-date')) || this.getVal('wiz-train-start-date');
    t.endDate = this.dmyToIso(this.getVal('wiz-train-end-date')) || this.getVal('wiz-train-end-date');
    t.datesFormatted = this.getVal('wiz-train-dates-fmt');
    t.targetAudience = this.getVal('wiz-train-target');
    t.expectedParticipants = parseInt(this.getVal('wiz-train-expected')) || '';
    t.locationVenue = this.getVal('wiz-train-venue');
    t.locationAddress = this.getVal('wiz-train-address');
    t.responsibleOrg = this.getVal('wiz-train-org') || localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)'; // chave legada mantida para compatibilidade
    t.relatedProject = this.getVal('wiz-train-project') || localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL'; // chave legada mantida para compatibilidade
    t.processNumber = this.getVal('wiz-train-process') || localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00'; // chave legada mantida para compatibilidade
    t.fundingOrg = this.getVal('wiz-train-funding') || localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE'; // chave legada mantida para compatibilidade
    t.partnerOrgs = this.getVal('wiz-train-partners');

    // Sincronizar dados da Etapa 5 (Tecnologias Educacionais)
    if (!t.educationalTech) {
      t.educationalTech = this.getDefaultEducationalTechData();
    }
    const eduTextEl = document.getElementById('wiz-edutech-text');
    if (eduTextEl) {
      t.educationalTech.text = eduTextEl.value;
    }

    // Sincronizar dados da Etapa 6 (Contatos)
    const checkedBoxes = document.querySelectorAll('.contact-method-checkbox:checked');
    const selectedChannels = Array.from(checkedBoxes).map(cb => cb.value);
    t.contactsData = {
      startDate: this.dmyToIso(this.getVal('wiz-contact-start-date')) || this.getVal('wiz-contact-start-date') || '',
      methods: this.getVal('wiz-contact-methods') || '',
      selectedChannels: selectedChannels.length > 0 ? selectedChannels : (t.contactsData?.selectedChannels || []),
      responsible: this.getVal('wiz-contact-responsible') || '',
      notes: this.getVal('wiz-contact-notes') || ''
    };

    // Disparar Autosave no IndexedDB
    window.db.triggerAutoSave(t.id, () => this.currentTraining, () => {
      this.updateWizardHeader();
    });
  }

  async manualSaveTraining() {
    if (!this.currentTraining || !window.db) return;

    // Proteção de históricos
    if (this.currentTraining.isHistorical) {
      this.showToast('Registros históricos protegidos não podem ser editados.', 'warning');
      return;
    }

    const saveBtn = document.getElementById('wizard-btn-save');
    const originalText = saveBtn ? saveBtn.innerHTML : '';

    // Feedback visual no botão
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Salvando...';
    }

    try {
      this.saveCurrentStepData();
      await window.db.saveTrainingFull(this.currentTraining, 'Salvamento manual do usuário');
      await new Promise(r => setTimeout(r, 300));

      if (saveBtn) {
        saveBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Salvo!';
        saveBtn.style.color = 'var(--accent-success)';
        saveBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      }

      this.showToast('Relatório salvo com sucesso!', 'success');

      setTimeout(() => {
        if (saveBtn) {
          saveBtn.innerHTML = originalText;
          saveBtn.style.color = '';
          saveBtn.style.borderColor = '';
          saveBtn.disabled = false;
        }
      }, 1500);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      this.showToast(`Erro ao salvar: ${err.message}`, 'error');
      if (saveBtn) {
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
      }
    }
  }

  /* ==========================================================================
     ETAPA 1: ESTADO, CIDADE, CÓDIGO IBGE/INEP & BOTÃO DE ROTAÇÃO DE CARGA
     ========================================================================== */
  onStateChange(uf) {
    if (!uf) return;
    this.populateCitiesDropdown(uf);
    if (this.currentTraining) {
      this.currentTraining.uf = uf;
      this.updateWizardHeader();
      this.saveCurrentStepData();
    }
  }

  onCityChange(city) {
    const citySelect = document.getElementById('wiz-train-polo-select');
    const inepInput = document.getElementById('wiz-train-inep');
    const activeOption = citySelect?.selectedOptions[0];
    const ibgeCode = activeOption?.getAttribute('data-ibge') || '';

    if (inepInput) inepInput.value = ibgeCode;
    this.setVal('wiz-train-polo', city);

    if (this.currentTraining) {
      this.currentTraining.polo = city;
      this.currentTraining.poloIbge = ibgeCode;

      // Recalcular automaticamente a distância em linha reta para todos os municípios cadastrados na Tabela 1 em relação ao novo polo
      if (this.currentTraining.municipalities && this.currentTraining.municipalities.length > 0) {
        const ufVal = this.currentTraining.uf || 'MT';
        this.currentTraining.municipalities.forEach(m => {
          m.distanceKm = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || ufVal, city, ufVal);
        });
        if (this.currentStep === 3) this.renderMunicipalitiesStep();
        this.showToast(`Polo alterado para ${city}! Distâncias da Tabela 1 recalculadas em linha reta.`);
      }

      this.updateWizardHeader();
      this.saveCurrentStepData();
    }
  }

  populateCitiesDropdown(uf, selectedCity = null, selectedIbge = null) {
    const citySelect = document.getElementById('wiz-train-polo-select');
    const inepInput = document.getElementById('wiz-train-inep');
    if (!citySelect || !window.IBGE_DATA) return;

    if (!uf) {
      citySelect.innerHTML = `<option value="" disabled selected>Selecionar Município...</option>`;
      if (inepInput) inepInput.value = '';
      return;
    }

    const filtered = window.IBGE_DATA.filter(m => m.u === uf).sort((a, b) => a.n.localeCompare(b.n));

    if (filtered.length === 0) {
      citySelect.innerHTML = `<option value="" disabled selected>Nenhuma cidade para ${uf}</option>`;
      if (inepInput) inepInput.value = '';
      return;
    }

    const hasSelection = selectedCity || selectedIbge;
    let options = hasSelection ? '' : `<option value="" disabled selected>Selecionar Município...</option>`;
    options += filtered.map(m => {
      const isSel = (selectedCity && m.n.toLowerCase() === selectedCity.toLowerCase()) ||
                    (selectedIbge && String(m.c) === String(selectedIbge));
      return `<option value="${m.n}" data-ibge="${m.c}" ${isSel ? 'selected' : ''}>${m.n}</option>`;
    }).join('');
    citySelect.innerHTML = options;

    // Sincronizar seleção ativa
    const activeOption = citySelect.selectedOptions[0];
    if (activeOption && activeOption.value) {
      const cityName = activeOption.value;
      const ibgeCode = activeOption.getAttribute('data-ibge') || '';
      if (inepInput) inepInput.value = ibgeCode;
      this.setVal('wiz-train-polo', cityName);
      if (this.currentTraining) {
        this.currentTraining.polo = cityName;
        this.currentTraining.poloIbge = ibgeCode;
      }
    } else {
      if (inepInput) inepInput.value = '';
    }
  }

  spinWorkload(delta) {
    const numInput = document.getElementById('wiz-train-workload-num');
    if (!numInput) return;
    let val = (parseInt(numInput.value) || 16) + delta;
    if (val < 1) val = 1;
    if (val > 200) val = 200;
    numInput.value = val;
    this.updateWorkloadFromSpinner();
  }

  updateWorkloadFromSpinner() {
    const numInput = document.getElementById('wiz-train-workload-num');
    const hiddenInput = document.getElementById('wiz-train-workload');
    if (!numInput) return;
    const val = parseInt(numInput.value) || 16;
    const fmt = `${val} horas`;
    if (hiddenInput) hiddenInput.value = fmt;
    if (this.currentTraining) {
      this.currentTraining.workload = fmt;
      this.saveCurrentStepData();
    }
  }

  dmyToIso(dmy) {
    if (!dmy) return '';
    const m = dmy.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dmy.trim())) return dmy.trim();
    return '';
  }

  isoToDmy(iso) {
    if (!iso) return '';
    const m = iso.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(iso.trim())) return iso.trim();
    return '';
  }

  parseDateValue(str) {
    if (!str) return null;
    const s = str.trim();
    // Suporte ao formato brasileiro DD/MM/AAAA
    const mDmy = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (mDmy) {
      const d = parseInt(mDmy[1], 10);
      const m = parseInt(mDmy[2], 10) - 1;
      const y = parseInt(mDmy[3], 10);
      const dt = new Date(y, m, d, 12, 0, 0);
      if (!isNaN(dt.getTime()) && dt.getDate() === d && dt.getMonth() === m && dt.getFullYear() === y) {
        return dt;
      }
      return null;
    }
    // Suporte ao formato ISO YYYY-MM-DD
    const mIso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (mIso) {
      const y = parseInt(mIso[1], 10);
      const m = parseInt(mIso[2], 10) - 1;
      const d = parseInt(mIso[3], 10);
      const dt = new Date(y, m, d, 12, 0, 0);
      if (!isNaN(dt.getTime()) && dt.getDate() === d && dt.getMonth() === m && dt.getFullYear() === y) {
        return dt;
      }
      return null;
    }
    return null;
  }

  onDateMaskInput(input) {
    if (!input) return;
    let v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) {
      input.value = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      input.value = `${v.slice(0, 2)}/${v.slice(2)}`;
    } else {
      input.value = v;
    }
    // Se completou os 10 caracteres (DD/MM/AAAA), dispara cálculo automático imediatamente
    if (input.value.length === 10) {
      if (input.id === 'wiz-contact-start-date') {
        this.validateContactStartDate(input.value, true);
        this.saveCurrentStepData();
      } else {
        this.onDatesChanged();
      }
    } else if (input.id === 'wiz-contact-start-date') {
      const errEl = document.getElementById('wiz-contact-date-error');
      if (errEl) errEl.style.display = 'none';
      input.style.borderColor = '';
    }
  }

  openNativeDatePicker(field) {
    const picker = document.getElementById(`wiz-train-${field}-date-picker`) || document.getElementById('wiz-contact-start-date-picker');
    const textInput = document.getElementById(`wiz-train-${field}-date`) || document.getElementById('wiz-contact-start-date');
    if (picker) {
      if (textInput && textInput.value) {
        const iso = this.dmyToIso(textInput.value);
        if (iso) picker.value = iso;
      }
      if (field === 'end') {
        const startInput = document.getElementById('wiz-train-start-date');
        if (startInput && startInput.value) {
          const isoStart = this.dmyToIso(startInput.value);
          if (isoStart) picker.min = isoStart;
        }
      }
      if (field === 'contact') {
        const startTrainingDate = this.currentTraining?.startDate || this.dmyToIso(this.getVal('wiz-train-start-date'));
        if (startTrainingDate) {
          const tDate = this.parseDateValue(startTrainingDate);
          if (tDate) {
            const maxAllowedDate = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate() - 7, 12, 0, 0);
            const y = maxAllowedDate.getFullYear();
            const m = String(maxAllowedDate.getMonth() + 1).padStart(2, '0');
            const d = String(maxAllowedDate.getDate()).padStart(2, '0');
            picker.max = `${y}-${m}-${d}`;
          }
        }
      }
      try {
        if (typeof picker.showPicker === 'function') {
          picker.showPicker();
        } else {
          picker.click();
        }
      } catch (e) {
        picker.click();
      }
    }
  }

  onNativeDatePicked(field, isoValue) {
    if (!isoValue) return;
    const textInput = field === 'contact' 
      ? document.getElementById('wiz-contact-start-date')
      : document.getElementById(`wiz-train-${field}-date`);
    if (textInput) {
      textInput.value = this.isoToDmy(isoValue);
      if (field !== 'contact') {
        this.onDatesChanged();
      } else {
        this.validateContactStartDate(textInput.value, true);
        this.saveCurrentStepData();
      }
    }
  }

  validateContactStartDate(contactDateStr, showToastIfInvalid = true) {
    const input = document.getElementById('wiz-contact-start-date');
    const errEl = document.getElementById('wiz-contact-date-error');

    if (!contactDateStr || !contactDateStr.trim()) {
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return true;
    }

    const cDate = this.parseDateValue(contactDateStr);
    if (!cDate) {
      if (errEl) {
        errEl.textContent = 'Data de início inválida. Use o formato DD/MM/AAAA.';
        errEl.style.display = 'block';
      }
      if (input) input.style.borderColor = 'var(--accent-rose-border, #f43f5e)';
      if (showToastIfInvalid) {
        this.showToast('Data de Início dos Contatos inválida. Utilize o formato DD/MM/AAAA.', 'warning');
      }
      return false;
    }

    const tStartRaw = this.currentTraining?.startDate || this.dmyToIso(this.getVal('wiz-train-start-date'));
    if (!tStartRaw) {
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return true;
    }

    const tDate = this.parseDateValue(tStartRaw);
    if (!tDate) {
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return true;
    }

    // Regra institucional: a data de início dos contatos não pode ser maior que 1 semana antes do 1º dia da capacitação
    const maxAllowedDate = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate() - 7, 12, 0, 0);
    const maxAllowedDmy = `${String(maxAllowedDate.getDate()).padStart(2, '0')}/${String(maxAllowedDate.getMonth() + 1).padStart(2, '0')}/${maxAllowedDate.getFullYear()}`;
    const tStartDmy = `${String(tDate.getDate()).padStart(2, '0')}/${String(tDate.getMonth() + 1).padStart(2, '0')}/${tDate.getFullYear()}`;

    if (cDate.getTime() > maxAllowedDate.getTime()) {
      const msg = `A data de início dos contatos (${this.isoToDmy(this.dmyToIso(contactDateStr))}) não pode ser maior que uma semana antes do primeiro dia da capacitação (${tStartDmy}). Limite máximo permitido: ${maxAllowedDmy}.`;
      if (errEl) {
        errEl.textContent = `A data não pode ser posterior a ${maxAllowedDmy} (pelo menos 1 semana antes da capacitação em ${tStartDmy}).`;
        errEl.style.display = 'block';
      }
      if (input) input.style.borderColor = 'var(--accent-rose-border, #f43f5e)';
      if (showToastIfInvalid) {
        this.showToast(msg, 'warning');
      }
      return false;
    }

    if (errEl) errEl.style.display = 'none';
    if (input) input.style.borderColor = '';
    return true;
  }

  updateContactDateHint() {
    const hintEl = document.getElementById('wiz-contact-date-hint');
    if (!hintEl) return;

    const startTrainingDate = this.currentTraining?.startDate || this.dmyToIso(this.getVal('wiz-train-start-date'));
    if (!startTrainingDate) {
      hintEl.innerHTML = '<span style="color:var(--text-muted); font-size:0.75rem;">Defina a Data Inicial na Etapa 1 para calcular o prazo limite de contato.</span>';
      return;
    }

    const tDate = this.parseDateValue(startTrainingDate);
    if (!tDate) return;

    const maxAllowedDate = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate() - 7, 12, 0, 0);
    const maxAllowedDmy = `${String(maxAllowedDate.getDate()).padStart(2, '0')}/${String(maxAllowedDate.getMonth() + 1).padStart(2, '0')}/${maxAllowedDate.getFullYear()}`;
    const tStartDmy = `${String(tDate.getDate()).padStart(2, '0')}/${String(tDate.getMonth() + 1).padStart(2, '0')}/${tDate.getFullYear()}`;

    hintEl.innerHTML = `<span style="color:var(--text-muted); font-size:0.75rem;">Início da Capacitação: <strong>${tStartDmy}</strong> | Limite máximo para contato: <strong style="color:var(--accent-blue-text);">${maxAllowedDmy}</strong> (pelo menos 7 dias antes)</span>`;
  }

  onContactDateBlur(input) {
    if (!input || !input.value) {
      const errEl = document.getElementById('wiz-contact-date-error');
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return;
    }
    this.validateContactStartDate(input.value, true);
  }

  onDatesBlur(field) {
    const startInput = document.getElementById('wiz-train-start-date');
    const endInput = document.getElementById('wiz-train-end-date');
    const startVal = startInput ? (startInput.value || '').trim() : '';
    const endVal = endInput ? (endInput.value || '').trim() : '';

    if (startVal.length === 10 && endVal.length === 10) {
      const sDate = this.parseDateValue(startVal);
      const eDate = this.parseDateValue(endVal);
      if (sDate && eDate) {
        if (eDate.getTime() < sDate.getTime()) {
          this.showToast('A Data Final deve ser maior ou igual à Data Inicial.', 'warning');
          const errEl = document.getElementById('wiz-date-final-error');
          if (errEl) {
            errEl.style.display = 'block';
            errEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>A Data Final não pode ser anterior à Data Inicial.`;
          }
          if (endInput) {
            endInput.style.borderColor = 'var(--accent-rose, #ef4444)';
          }
        } else {
          const errEl = document.getElementById('wiz-date-final-error');
          if (errEl) {
            errEl.style.display = 'none';
            errEl.textContent = '';
          }
          if (endInput) {
            endInput.style.borderColor = '';
          }
        }
      }
    }
  }

  onDatesChanged() {
    const startInput = document.getElementById('wiz-train-start-date');
    const endInput = document.getElementById('wiz-train-end-date');
    const fmtInput = document.getElementById('wiz-train-dates-fmt');
    const errorEl = document.getElementById('wiz-date-final-error');
    if (!startInput) return;

    const startVal = (startInput.value || '').trim();
    const endVal = endInput ? (endInput.value || '').trim() : '';

    const startDate = this.parseDateValue(startVal);

    if (!startDate) {
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
      }
      if (endInput) endInput.style.borderColor = '';
      return;
    }

    let endDate = startDate;
    let isEndInvalid = false;

    if (endVal && endVal.length === 10) {
      const parsedEnd = this.parseDateValue(endVal);
      if (parsedEnd) {
        if (parsedEnd.getTime() < startDate.getTime()) {
          isEndInvalid = true;
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>A Data Final não pode ser anterior à Data Inicial.`;
          }
          if (endInput) endInput.style.borderColor = 'var(--accent-rose, #ef4444)';
          this.showToast('A Data Final deve ser maior ou igual à Data Inicial.', 'warning');
          endDate = startDate;
        } else {
          endDate = parsedEnd;
          if (errorEl) {
            errorEl.style.display = 'none';
            errorEl.textContent = '';
          }
          if (endInput) endInput.style.borderColor = '';
        }
      }
    } else {
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
      }
      if (endInput) endInput.style.borderColor = '';
    }

    const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

    const dayStart = startDate.getDate();
    const dayEnd = endDate.getDate();
    const monthStart = startDate.getMonth();
    const monthEnd = endDate.getMonth();
    const yearStart = startDate.getFullYear();
    const yearEnd = endDate.getFullYear();

    // Verificação estrita contra NaN
    if (isNaN(dayStart) || isNaN(dayEnd) || isNaN(monthStart) || isNaN(monthEnd) || isNaN(yearStart) || isNaN(yearEnd)) {
      return;
    }

    // Número de dias
    const diffMs = endDate.getTime() - startDate.getTime();
    const numDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);

    // Construir texto formatado para o relatório técnico
    let formatted = '';
    if (numDays === 1 || !endVal || isEndInvalid || startVal === endVal) {
      // Dia único
      formatted = `${dayStart} de ${MESES[monthStart]} de ${yearStart}`;
    } else if (monthStart === monthEnd && yearStart === yearEnd) {
      // Mesmo mês
      if (numDays === 2 && dayEnd === dayStart + 1) {
        formatted = `${dayStart} e ${dayEnd} de ${MESES[monthStart]} de ${yearStart}`;
      } else {
        formatted = `${dayStart} a ${dayEnd} de ${MESES[monthStart]} de ${yearStart}`;
      }
    } else if (yearStart === yearEnd) {
      // Meses diferentes, mesmo ano
      formatted = `${dayStart} de ${MESES[monthStart]} a ${dayEnd} de ${MESES[monthEnd]} de ${yearStart}`;
    } else {
      // Anos diferentes
      formatted = `${dayStart} de ${MESES[monthStart]} de ${yearStart} a ${dayEnd} de ${MESES[monthEnd]} de ${yearEnd}`;
    }

    this.setVal('wiz-train-dates-fmt', formatted);

    // Calcular carga horária automática: 8 horas por dia
    const autoWorkload = numDays * 8;
    const numInput = document.getElementById('wiz-train-workload-num');
    const hiddenInput = document.getElementById('wiz-train-workload');
    const hintEl = document.getElementById('wiz-workload-auto-hint');

    if (numInput) numInput.value = autoWorkload;
    if (hiddenInput) hiddenInput.value = `${autoWorkload} horas`;
    if (hintEl) hintEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Calculado automaticamente: ${numDays} dia${numDays > 1 ? 's' : ''} × 8h = ${autoWorkload}h (editável)`;

    if (this.currentTraining) {
      this.currentTraining.startDate = this.dmyToIso(startVal) || startVal;
      this.currentTraining.endDate = isEndInvalid ? '' : (this.dmyToIso(endVal) || endVal || this.currentTraining.startDate);
      this.currentTraining.datesFormatted = formatted;
      this.currentTraining.workload = `${autoWorkload} horas`;
      this.updateContactDateHint();
      const contactDateVal = this.getVal('wiz-contact-start-date');
      if (contactDateVal) {
        this.validateContactStartDate(contactDateVal, false);
      }
      this.saveCurrentStepData();
    }
  }

  /* ==========================================================================
     ETAPA 2: EQUIPE PARTICIPANTE (UFG & FNDE)
     ========================================================================== */
  setTeamFilter(filter) {
    this.currentTeamFilter = filter;
    document.querySelectorAll('.team-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`team-tab-${filter.toLowerCase()}`);
    if (activeBtn) activeBtn.classList.add('active');
    this.renderTeamList();
  }

  restoreDefaultTeam() {
    if (!this.currentTraining) return;
    if (confirm('Deseja restaurar a Equipe Padrão Oficial do CECATE/UFG e FNDE? Todas as alterações manuais nesta capacitação serão redefinidas para o padrão.')) {
      this.currentTraining.team = (window.getMasterTeam ? window.getMasterTeam() : window.DEFAULT_OFFICIAL_TEAM).map(m => ({ ...m }));
      this.renderTeamList();
      this.saveCurrentStepData();
      this.showToast('Equipe padrão oficial CECATE (UFG) e FNDE restaurada com sucesso!', 'success');
    }
  }

  /* --------------------------------------------------------------------------
     ALERTA DE SEGURANÇA E SALVAMENTO AO SAIR PARA EQUIPE TÉCNICA
     -------------------------------------------------------------------------- */
  promptNavigateToTeam() {
    const modal = document.getElementById('modal-confirm-navigate-team');
    if (!modal) {
      this.navigateTo('team');
      return;
    }
    // Redefinir estados dos botões e alertas do modal
    const statusEl = document.getElementById('modal-nav-team-status');
    const saveBtn = document.getElementById('modal-nav-team-btn-save');
    const continueBtn = document.getElementById('modal-nav-team-btn-continue');
    const cancelBtn = document.getElementById('modal-nav-team-btn-cancel');

    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.innerHTML = '';
    }
    if (saveBtn) {
      saveBtn.style.display = 'inline-flex';
      saveBtn.disabled = false;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span id="modal-nav-team-btn-save-text">Salvar Alterações</span>
      `;
    }
    if (continueBtn) {
      continueBtn.style.display = 'none';
    }
    if (cancelBtn) {
      cancelBtn.style.display = 'inline-flex';
    }

    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  closeNavigateTeamModal() {
    const modal = document.getElementById('modal-confirm-navigate-team');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  async saveAndPrepareNavigateToTeam() {
    const statusEl = document.getElementById('modal-nav-team-status');
    const saveBtn = document.getElementById('modal-nav-team-btn-save');
    const continueBtn = document.getElementById('modal-nav-team-btn-continue');

    // 1. Ativar rodela de carregamento no botão e status
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite; vertical-align:-2px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Salvando dados...</span>
      `;
    }

    if (statusEl) {
      statusEl.style.display = 'flex';
      statusEl.style.alignItems = 'center';
      statusEl.style.justifyContent = 'center';
      statusEl.style.gap = '0.5rem';
      statusEl.style.background = 'rgba(246, 168, 0, 0.15)';
      statusEl.style.border = '1px solid rgba(246, 168, 0, 0.35)';
      statusEl.style.color = 'var(--accent-gold-text)'; statusEl.style.flexWrap = 'wrap'; statusEl.setAttribute('role', 'status');
      statusEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span class="save-status-text">Salvando os dados da capacitação... aguarde</span>
        <span class="save-progress" aria-hidden="true"><span></span></span>
      `;
    }

    try {
      // 2. Salvar dados atuais do formulário e persistir no IndexedDB
      this.saveCurrentStepData();

      if (this.currentTraining && window.db) {
        await window.db.saveTrainingFull(this.currentTraining, 'Salvamento prévio antes de navegar para Equipe Técnica');
      }

      // Pequena pausa para percepção visual do processo concluído
      await new Promise(res => setTimeout(res, 1200)); // tempo mínimo para o carregamento ficar visível

      // 3. Sucesso: esconde botão de salvar e somente agora exibe o botão de continuar
      if (statusEl) {
        statusEl.style.background = 'rgba(16, 185, 129, 0.18)';
        statusEl.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        statusEl.style.color = 'var(--accent-emerald-text)';
        statusEl.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Dados salvos com sucesso! Você pode prosseguir com segurança.</span>
        `;
      }

      if (saveBtn) {
        saveBtn.style.display = 'none';
      }

      // SOMENTE DEPOIS APARECER O BOTÃO DE CONTINUAR
      if (continueBtn) {
        continueBtn.style.display = 'inline-flex';
      }

      this.showToast('Dados salvos com segurança!', 'success');
    } catch (err) {
      console.error('Erro ao salvar dados antes de navegar:', err);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          <span>Tentar Salvar Novamente</span>
        `;
      }
      if (statusEl) {
        statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
        statusEl.style.border = '1px solid rgba(239, 68, 68, 0.35)';
        statusEl.style.color = '#f87171';
        statusEl.innerHTML = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
      }
      this.showToast('Erro ao salvar alterações.', 'error');
    }
  }

  proceedNavigateToTeam() {
    this.closeNavigateTeamModal();
    this.navigateTo('team');
  }

  /* --------------------------------------------------------------------------
     ALERTA DE SEGURANÇA E SALVAMENTO AO SAIR PARA DASHBOARD
     -------------------------------------------------------------------------- */
  promptExitWizardToDashboard() {
    const modal = document.getElementById('modal-confirm-exit-wizard');
    if (!modal) {
      this.navigateTo('dashboard');
      return;
    }
    const statusEl = document.getElementById('modal-exit-wiz-status');
    const saveBtn = document.getElementById('modal-exit-wiz-btn-save');
    const continueBtn = document.getElementById('modal-exit-wiz-btn-continue');
    const cancelBtn = document.getElementById('modal-exit-wiz-btn-cancel');

    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.innerHTML = '';
    }
    if (saveBtn) {
      saveBtn.style.display = 'inline-flex';
      saveBtn.disabled = false;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span id="modal-exit-wiz-btn-save-text">Salvar Alterações</span>
      `;
    }
    if (continueBtn) {
      continueBtn.style.display = 'none';
    }
    if (cancelBtn) {
      cancelBtn.style.display = 'inline-flex';
    }

    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  closeExitWizardModal() {
    const modal = document.getElementById('modal-confirm-exit-wizard');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  async saveAndPrepareExitToDashboard() {
    const statusEl = document.getElementById('modal-exit-wiz-status');
    const saveBtn = document.getElementById('modal-exit-wiz-btn-save');
    const continueBtn = document.getElementById('modal-exit-wiz-btn-continue');

    // 1. Rodela de carregamento giratória
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite; vertical-align:-2px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Salvando dados...</span>
      `;
    }

    if (statusEl) {
      statusEl.style.display = 'flex';
      statusEl.style.alignItems = 'center';
      statusEl.style.justifyContent = 'center';
      statusEl.style.gap = '0.5rem';
      statusEl.style.background = 'rgba(246, 168, 0, 0.15)';
      statusEl.style.border = '1px solid rgba(246, 168, 0, 0.35)';
      statusEl.style.color = 'var(--accent-gold-text)'; statusEl.style.flexWrap = 'wrap'; statusEl.setAttribute('role', 'status');
      statusEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span class="save-status-text">Salvando os dados da capacitação... aguarde</span>
        <span class="save-progress" aria-hidden="true"><span></span></span>
      `;
    }

    try {
      // 2. Persistir no IndexedDB
      this.saveCurrentStepData();

      if (this.currentTraining && window.db) {
        await window.db.saveTrainingFull(this.currentTraining, 'Salvamento prévio antes de sair para o Dashboard');
      }

      await new Promise(res => setTimeout(res, 1200)); // tempo mínimo para o carregamento ficar visível

      // 3. Exibir confirmação e liberar botão de continuar
      if (statusEl) {
        statusEl.style.background = 'rgba(16, 185, 129, 0.18)';
        statusEl.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        statusEl.style.color = 'var(--accent-emerald-text)';
        statusEl.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Dados salvos com sucesso! Você pode prosseguir com segurança.</span>
        `;
      }

      if (saveBtn) {
        saveBtn.style.display = 'none';
      }

      // SOMENTE DEPOIS APARECER O BOTÃO DE CONTINUAR
      if (continueBtn) {
        continueBtn.style.display = 'inline-flex';
      }

      this.showToast('Dados salvos com segurança!', 'success');
    } catch (err) {
      console.error('Erro ao salvar dados antes de sair:', err);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          <span>Tentar Salvar Novamente</span>
        `;
      }
      if (statusEl) {
        statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
        statusEl.style.border = '1px solid rgba(239, 68, 68, 0.35)';
        statusEl.style.color = '#f87171';
        statusEl.innerHTML = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
      }
      this.showToast('Erro ao salvar alterações.', 'error');
    }
  }

  proceedExitToDashboard() {
    this.closeExitWizardModal();
    this.navigateTo('dashboard');
  }

  /* --------------------------------------------------------------------------
     ALERTA DE SEGURANÇA E SALVAMENTO AO NAVEGAR PARA ESTRUTURA DO CURSO
     -------------------------------------------------------------------------- */
  promptNavigateToCourseStructure() {
    if (!this.currentTraining || !Array.isArray(this.currentTraining.courseModules) || this.currentTraining.courseModules.length === 0) {
      this.showToast('Nenhuma estrutura de curso selecionada no momento. Por favor, clique em "Selecionar Estrutura" para escolher uma.', 'warning');
      this.openSelectCourseTemplateModal();
      return;
    }

    // Identificar a estrutura de curso atualmente selecionada para esta capacitação
    let selectedTpl = null;
    if (window.courseStructureHelper) {
      const list = window.courseStructureHelper.getTemplatesList();
      if (this.currentTraining.baseTemplateId) {
        selectedTpl = list.find(t => t.id === this.currentTraining.baseTemplateId);
      }
      if (!selectedTpl && this.currentTraining.baseTemplateName && this.currentTraining.baseTemplateName !== 'Nenhuma selecionada') {
        selectedTpl = list.find(t => t.name.toLowerCase() === this.currentTraining.baseTemplateName.toLowerCase());
      }
      if (!selectedTpl) {
        selectedTpl = window.courseStructureHelper.getDefaultTemplate();
      }
    }

    const tplName = selectedTpl ? selectedTpl.name : (this.currentTraining.baseTemplateName || 'Modelo Padrão');
    this.targetTemplateIdForEdit = selectedTpl ? selectedTpl.id : 'template_default_official';

    const modal = document.getElementById('modal-confirm-navigate-structure');
    if (!modal) {
      this.proceedNavigateToCourseStructure();
      return;
    }

    const descEl = document.getElementById('modal-nav-structure-desc');
    if (descEl) {
      descEl.innerHTML = `Você está prestes a sair do preenchimento desta capacitação para editar a estrutura <strong style="color:var(--accent-blue-text);">${tplName}</strong> na seção de Estrutura do Curso. Para evitar perda de dados, as informações desta capacitação serão salvas com segurança antes de prosseguir.`;
    }

    const statusEl = document.getElementById('modal-nav-structure-status');
    const saveBtn = document.getElementById('modal-nav-structure-btn-save');
    const continueBtn = document.getElementById('modal-nav-structure-btn-continue');
    const cancelBtn = document.getElementById('modal-nav-structure-btn-cancel');

    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.innerHTML = '';
    }
    if (saveBtn) {
      saveBtn.style.display = 'inline-flex';
      saveBtn.disabled = false;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span id="modal-nav-structure-btn-save-text">Salvar e Prosseguir para Edição</span>
      `;
    }
    if (continueBtn) {
      continueBtn.style.display = 'none';
    }
    if (cancelBtn) {
      cancelBtn.style.display = 'inline-block';
    }

    modal.style.display = 'flex';
  }

  closeNavigateStructureModal() {
    const modal = document.getElementById('modal-confirm-navigate-structure');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  async saveAndPrepareNavigateToStructure() {
    const statusEl = document.getElementById('modal-nav-structure-status');
    const saveBtn = document.getElementById('modal-nav-structure-btn-save');
    const continueBtn = document.getElementById('modal-nav-structure-btn-continue');

    // 1. Ativar spinner
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Salvando Dados...</span>
      `;
    }

    if (statusEl) {
      statusEl.style.display = 'flex';
      statusEl.style.alignItems = 'center';
      statusEl.style.justifyContent = 'center';
      statusEl.style.gap = '0.5rem';
      statusEl.style.background = 'rgba(246, 168, 0, 0.15)';
      statusEl.style.border = '1px solid rgba(246, 168, 0, 0.35)';
      statusEl.style.color = 'var(--accent-gold-text)'; statusEl.style.flexWrap = 'wrap'; statusEl.setAttribute('role', 'status');
      statusEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span class="save-status-text">Salvando os dados da capacitação... aguarde</span>
        <span class="save-progress" aria-hidden="true"><span></span></span>
      `;
    }

    try {
      // 2. Salvar dados atuais do formulário e persistir no IndexedDB
      this.saveCurrentStepData();

      if (this.currentTraining && window.db) {
        await window.db.saveTrainingFull(this.currentTraining, 'Salvamento prévio antes de navegar para Estrutura do Curso');
      }

      await new Promise(res => setTimeout(res, 1200)); // tempo mínimo para o carregamento ficar visível

      // 3. Exibir confirmação e redirecionar
      if (statusEl) {
        statusEl.style.background = 'rgba(16, 185, 129, 0.18)';
        statusEl.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        statusEl.style.color = 'var(--accent-emerald-text)';
        statusEl.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Dados salvos! Redirecionando para a edição da estrutura selecionada...</span>
        `;
      }

      if (saveBtn) {
        saveBtn.style.display = 'none';
      }

      if (continueBtn) {
        continueBtn.style.display = 'inline-flex';
      }

      this.showToast('Dados salvos com segurança! Abrindo edição...', 'success');

      // Redirecionamento suave automático para a estrutura selecionada
      setTimeout(() => {
        this.proceedNavigateToCourseStructure();
      }, 650);
    } catch (err) {
      console.error('Erro ao salvar dados antes de navegar para estrutura:', err);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          <span>Tentar Salvar Novamente</span>
        `;
      }
      if (statusEl) {
        statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
        statusEl.style.border = '1px solid rgba(239, 68, 68, 0.35)';
        statusEl.style.color = '#f87171';
        statusEl.innerHTML = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
      }
      this.showToast('Erro ao salvar alterações.', 'error');
    }
  }

  proceedNavigateToCourseStructure() {
    this.closeNavigateStructureModal();
    const targetId = this.targetTemplateIdForEdit || this.currentTraining?.baseTemplateId || 'template_default_official';
    this.activeTemplateId = targetId;
    this.navigateTo('course-structure');
    if (this.selectCourseTemplateForEdit) {
      this.selectCourseTemplateForEdit(targetId);
    }
    setTimeout(() => {
      const editorWrapper = document.getElementById('course-template-editor-wrapper') || document.getElementById('active-template-editor-title');
      if (editorWrapper) {
        editorWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }

  confirmClearCourseStructure() {
    this.openConfirmModal({
      title: 'Remover Estrutura',
      msg: 'Deseja realmente remover a estrutura de curso escolhida para esta capacitação? A Tabela 2 ficará sem estrutura até que você selecione um novo modelo.',
      btnText: 'Sim, Remover Estrutura',
      successTitle: 'Estrutura Removida!',
      successMsg: 'A seleção da estrutura de curso foi removida com sucesso.',
      onConfirm: async () => {
        if (!this.currentTraining) return;
        this.currentTraining.courseModules = [];
        this.currentTraining.baseTemplateId = null;
        this.currentTraining.baseTemplateName = 'Nenhuma selecionada';
        this.currentTraining.isCustomized = false;
        if (window.db) {
          await window.db.saveTrainingFull(this.currentTraining, 'Limpeza da estrutura de curso selecionada');
        }
        this.renderCourseStructureStep();
        this.showToast('Estrutura removida com sucesso. Selecione um novo modelo quando desejar.', 'info');
      }
    });
  }

  renderTeamList() {
    const container = document.getElementById('wizard-team-list-container');
    if (!container || !this.currentTraining) return;

    // Sincronizar sempre todas as informações da Equipe Técnica central (UFG & FNDE)
    this.currentTraining.team = (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || [])).map(m => ({ ...m }));

    const team = this.currentTraining.team;

    // Atualizar contadores das sub-abas
    const ufgCount = team.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica')).length;
    const fndeCount = team.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde')).length;

    const countAllEl = document.getElementById('team-count-all');
    const countUfgEl = document.getElementById('team-count-ufg');
    const countFndeEl = document.getElementById('team-count-fnde');

    if (countAllEl) countAllEl.textContent = team.length;
    if (countUfgEl) countUfgEl.textContent = ufgCount;
    if (countFndeEl) countFndeEl.textContent = fndeCount;

    // Filtrar membros conforme a aba ativa
    let displayList = team.map((m, originalIndex) => ({ ...m, originalIndex }));
    if (this.currentTeamFilter === 'UFG') {
      displayList = displayList.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica'));
    } else if (this.currentTeamFilter === 'FNDE') {
      displayList = displayList.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde'));
    }

    if (displayList.length === 0) {
      container.innerHTML = `
        <div style="padding:2rem; text-align:center; color:var(--text-muted); background:var(--bg-input); border-radius:var(--radius-md);">
          Nenhum integrante cadastrado nesta categoria na Equipe Técnica.
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width:140px;">Pronome</th>
              <th style="width:120px;">Titulação</th>
              <th style="min-width:240px;">Nome do Integrante</th>
              <th style="width:120px; text-align:center;">Instituição</th>
              <th style="min-width:320px;">Cargo / Função Oficial</th>
            </tr>
          </thead>
          <tbody>
            ${displayList.map(item => {
              const isUfg = item.institutionGroup === 'UFG' || item.institution === 'UFG';

              return `
                <tr>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${this.escapeHtml(item.pronoun || '-')}</span></td>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${this.escapeHtml(item.title || '-')}</span></td>
                  <td><strong style="color:var(--text-primary); font-size:0.9rem;">${this.escapeHtml(item.name || '')}</strong></td>
                  <td style="text-align:center;">
                    <span class="nav-badge ${isUfg ? 'badge-amber' : 'badge-blue'}">
                      ${item.institution || 'UFG'}
                    </span>
                  </td>
                  <td><span style="color:var(--text-secondary); font-size:0.85rem;">${this.escapeHtml(item.role || 'Equipe Técnica')}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  updateTeamMemberField(index, field, value) {
    if (!this.currentTraining?.team?.[index]) return;
    const member = this.currentTraining.team[index];
    member[field] = value;

    if (field === 'pronoun' || field === 'title' || field === 'name') {
      member.fullName = window.formatTeamMemberFullName(member);
    }

    if (field === 'institution') {
      member.institutionGroup = value;
      if (value === 'FNDE') member.type = 'fnde';
      else if (member.role?.includes('Coordenador do Projeto')) member.type = 'coordenacao';
      else member.type = 'tecnica';
    }

    if (field === 'role') {
      if (value.includes('CGPTE') || value.includes('CMATE') || value.includes('COATE') || value.includes('COACE') || value.includes('FNDE')) {
        member.institution = 'FNDE';
        member.institutionGroup = 'FNDE';
        member.type = 'fnde';
      }
    }

    this.saveCurrentStepData();
  }

  addTeamMemberPrompt() {
    this.openTeamMemberEditor('wizard', -1);
  }

  removeTeamMember(index) {
    this.openConfirmDeleteMemberModal('wizard', index);
  }

  /* ==========================================================================
     VIEW GLOBAL: GERENCIAMENTO DA EQUIPE TÉCNICA (MASTER)
     ========================================================================== */
  setMasterTeamFilter(filter) {
    this.currentMasterTeamFilter = filter;
    document.querySelectorAll('.master-team-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`master-team-tab-${filter.toLowerCase()}`);
    if (activeBtn) activeBtn.classList.add('active');
    this.renderMasterTeamManagement();
  }

  renderMasterTeamManagement() {
    const container = document.getElementById('master-team-list-container');
    if (!container) return;

    const masterTeam = window.getMasterTeam();

    const ufgCount = masterTeam.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica')).length;
    const fndeCount = masterTeam.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde')).length;

    const countAllEl = document.getElementById('master-team-count-all');
    const countUfgEl = document.getElementById('master-team-count-ufg');
    const countFndeEl = document.getElementById('master-team-count-fnde');

    if (countAllEl) countAllEl.textContent = masterTeam.length;
    if (countUfgEl) countUfgEl.textContent = ufgCount;
    if (countFndeEl) countFndeEl.textContent = fndeCount;

    let displayList = masterTeam.map((m, originalIndex) => ({ ...m, originalIndex }));
    if (this.currentMasterTeamFilter === 'UFG') {
      displayList = displayList.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica'));
    } else if (this.currentMasterTeamFilter === 'FNDE') {
      displayList = displayList.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde'));
    }

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width:140px;">Pronome</th>
              <th style="width:120px;">Titulação</th>
              <th style="min-width:240px;">Nome do Integrante</th>
              <th style="width:110px; text-align:center;">Instituição</th>
              <th style="min-width:320px;">Cargo / Função Oficial</th>
              <th style="width:160px; text-align:center;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${displayList.map(item => {
              const idx = item.originalIndex;
              const isUfg = item.institutionGroup === 'UFG' || item.institution === 'UFG';

              return `
                <tr>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${this.escapeHtml(item.pronoun || '-')}</span></td>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${this.escapeHtml(item.title || '-')}</span></td>
                  <td><strong style="color:var(--text-primary); font-size:0.9rem;">${this.escapeHtml(item.name || '')}</strong></td>
                  <td style="text-align:center;">
                    <span class="nav-badge ${isUfg ? 'badge-amber' : 'badge-blue'}">
                      ${item.institution || 'UFG'}
                    </span>
                  </td>
                  <td><span style="color:var(--text-secondary); font-size:0.85rem;">${this.escapeHtml(item.role || 'Equipe Técnica')}</span></td>
                  <td style="text-align:center; white-space:nowrap;">
                    <div style="display:inline-flex; gap:0.4rem; justify-content:center; align-items:center;">
                      <button type="button" class="btn btn-secondary btn-sm btn-action-edit" onclick="app.openTeamMemberEditor('master', ${idx})" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center;" title="Editar este integrante">${window.icons.edit} Editar</button>
                      <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.removeMasterTeamMember(${idx})" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center;" title="Excluir do catálogo geral">${window.icons.delete} Excluir</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  updateMasterTeamMemberField(index, field, value) {
    const masterTeam = window.getMasterTeam();
    if (!masterTeam[index]) return;

    masterTeam[index][field] = value;
    if (field === 'pronoun' || field === 'title' || field === 'name') {
      masterTeam[index].fullName = window.formatTeamMemberFullName(masterTeam[index]);
    }

    if (field === 'institution') {
      masterTeam[index].institutionGroup = value;
      if (value === 'FNDE') masterTeam[index].type = 'fnde';
      else if (masterTeam[index].role?.includes('Coordenador do Projeto')) masterTeam[index].type = 'coordenacao';
      else masterTeam[index].type = 'tecnica';
    }

    if (field === 'role') {
      if (value.includes('CGPTE') || value.includes('CMATE') || value.includes('COATE') || value.includes('COACE') || value.includes('FNDE')) {
        masterTeam[index].institution = 'FNDE';
        masterTeam[index].institutionGroup = 'FNDE';
        masterTeam[index].type = 'fnde';
      }
    }

    window.saveMasterTeam(masterTeam);
    this.showToast('Cadastro da Equipe Técnica atualizado com sucesso!', 'success');
  }

  addMasterTeamMemberPrompt() {
    this.openTeamMemberEditor('master', -1);
  }

  removeMasterTeamMember(index) {
    this.openConfirmDeleteMemberModal('master', index);
  }

  /* ==========================================================================
     GERENCIAMENTO DE INTEGRANTES IN-PAGE (DIRETO NO SISTEMA, SEM POPUP)
     ========================================================================== */
  openTeamMemberInPageEditor(context = 'wizard', index = -1) {
    const card = document.getElementById(`${context}-team-editor-card`);
    if (!card) return;

    const editIndexEl = document.getElementById(`${context}-team-edit-index`);
    if (editIndexEl) editIndexEl.value = index;

    // Popular opções de Pronome
    const pronounSelect = document.getElementById(`${context}-team-pronoun-select`);
    if (pronounSelect) {
      pronounSelect.innerHTML = `
        <option value="__unselected__" disabled selected>Selecionar Pronome...</option>
        ${(window.OFFICIAL_PRONOUNS || []).map(p => `<option value="${p.value}">${p.label}</option>`).join('')}
      `;
    }

    // Popular opções de Titulação
    const titleSelect = document.getElementById(`${context}-team-title-select`);
    if (titleSelect) {
      titleSelect.innerHTML = `
        <option value="__unselected__" disabled selected>Selecionar Titulação...</option>
        ${(window.OFFICIAL_TITLES || []).map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
      `;
    }

    // Popular opções de Cargo
    const roleSelect = document.getElementById(`${context}-team-role-select`);
    const roleOptionsUFG = (window.OFFICIAL_ROLES || []).filter(r => r.group === 'UFG');
    const roleOptionsFNDE = (window.OFFICIAL_ROLES || []).filter(r => r.group === 'FNDE');
    if (roleSelect) {
      roleSelect.innerHTML = `
        <option value="__unselected__" disabled selected>Selecionar Cargo / Função...</option>
        <optgroup label="Universidade Federal de Goiás - UFG">
          ${roleOptionsUFG.map(r => `<option value="${r.value}">${r.value}</option>`).join('')}
        </optgroup>
        <optgroup label="Fundo Nacional de Desenvolvimento da Educação - FNDE">
          ${roleOptionsFNDE.map(r => `<option value="${r.value}">${r.value}</option>`).join('')}
        </optgroup>
        <option value="Outro Cargo">Outro Cargo / Função Personalizada...</option>
      `;
    }

    const titleTextEl = document.getElementById(`${context}-team-editor-title-text`);
    const nameInput = document.getElementById(`${context}-team-name-input`);
    const instSelect = document.getElementById(`${context}-team-institution-select`);
    const customRoleGroup = document.getElementById(`${context}-team-custom-role-group`);
    const customRoleInput = document.getElementById(`${context}-team-custom-role-input`);

    if (index >= 0) {
      // Modo Edição
      let member = null;
      if (context === 'wizard') {
        member = this.currentTraining?.team?.[index];
      } else {
        const masterTeam = window.getMasterTeam();
        member = masterTeam[index];
      }

      if (member) {
        if (titleTextEl) titleTextEl.textContent = `Editando Integrante: ${member.name || ''}`;
        if (pronounSelect) pronounSelect.value = (member.pronoun !== undefined && member.pronoun !== null) ? member.pronoun : '__unselected__';
        if (titleSelect) titleSelect.value = (member.title !== undefined && member.title !== null) ? member.title : '__unselected__';
        if (nameInput) nameInput.value = member.name || '';
        if (instSelect) instSelect.value = member.institution || 'UFG';

        const roleMatch = (window.OFFICIAL_ROLES || []).some(r => r.value === member.role);
        if (roleSelect) {
          if (roleMatch) {
            roleSelect.value = member.role;
            if (customRoleGroup) customRoleGroup.style.display = 'none';
          } else {
            roleSelect.value = 'Outro Cargo';
            if (customRoleGroup) customRoleGroup.style.display = 'block';
            if (customRoleInput) customRoleInput.value = member.role || '';
          }
        }
      }
    } else {
      // Modo Adição - Tudo vem no estado __unselected__ para exigir escolha ativa do usuário
      if (titleTextEl) titleTextEl.textContent = `Cadastrar Novo Integrante da Equipe`;
      if (pronounSelect) pronounSelect.value = '__unselected__';
      if (titleSelect) titleSelect.value = '__unselected__';
      if (nameInput) nameInput.value = '';
      if (instSelect) instSelect.value = '';
      if (roleSelect) roleSelect.value = '__unselected__';
      if (customRoleGroup) customRoleGroup.style.display = 'none';
      if (customRoleInput) customRoleInput.value = '';
    }

    this.updateInPagePreview(context);
    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (nameInput) nameInput.focus();
  }

  openTeamMemberEditor(context = 'wizard', index = -1) {
    this.openTeamMemberInPageEditor(context, index);
  }

  closeTeamMemberInPageEditor(context = 'wizard') {
    const card = document.getElementById(`${context}-team-editor-card`);
    if (card) card.style.display = 'none';
  }

  updateInPagePreview(context = 'wizard') {
    const pronoun = document.getElementById(`${context}-team-pronoun-select`)?.value || '';
    const title = document.getElementById(`${context}-team-title-select`)?.value || '';
    const name = document.getElementById(`${context}-team-name-input`)?.value || '';

    const previewEl = document.getElementById(`${context}-team-preview-text`);
    if (previewEl) {
      const full = window.formatTeamMemberFullName({ pronoun, title, name });
      previewEl.textContent = full || '(Informe o nome do integrante)';
    }
  }

  onInPageInstitutionChange(context, val) {
    const roleSelect = document.getElementById(`${context}-team-role-select`);
    if (!roleSelect) return;

    if (val === 'FNDE' && !roleSelect.value.includes('FNDE') && !roleSelect.value.includes('CGPTE') && !roleSelect.value.includes('CMATE') && !roleSelect.value.includes('COATE') && !roleSelect.value.includes('COACE')) {
      roleSelect.value = 'Coordenador-Geral da Política do Transporte Escolar – CGPTE';
    } else if (val === 'UFG' && (roleSelect.value.includes('CGPTE') || roleSelect.value.includes('CMATE') || roleSelect.value.includes('COATE') || roleSelect.value.includes('COACE'))) {
      roleSelect.value = 'Pesquisador e Equipe Técnica';
    }
  }

  onInPageRoleChange(context, val) {
    const customRoleGroup = document.getElementById(`${context}-team-custom-role-group`);
    const instSelect = document.getElementById(`${context}-team-institution-select`);

    if (val === 'Outro Cargo') {
      if (customRoleGroup) customRoleGroup.style.display = 'block';
    } else {
      if (customRoleGroup) customRoleGroup.style.display = 'none';
      if (val.includes('CGPTE') || val.includes('CMATE') || val.includes('COATE') || val.includes('COACE') || val.includes('FNDE')) {
        if (instSelect) instSelect.value = 'FNDE';
      }
    }
  }

  saveTeamMemberInPage(context = 'wizard') {
    const editIndexEl = document.getElementById(`${context}-team-edit-index`);
    const index = editIndexEl ? parseInt(editIndexEl.value) : -1;

    const pronoun = (document.getElementById(`${context}-team-pronoun-select`)?.value || '').trim();
    const title = (document.getElementById(`${context}-team-title-select`)?.value || '').trim();
    const name = (document.getElementById(`${context}-team-name-input`)?.value || '').trim();
    const institution = (document.getElementById(`${context}-team-institution-select`)?.value || '').trim();
    let role = (document.getElementById(`${context}-team-role-select`)?.value || '').trim();

    if (role === 'Outro Cargo') {
      const custom = (document.getElementById(`${context}-team-custom-role-input`)?.value || '').trim();
      role = custom || 'Colaborador Técnico';
    }

    if (!pronoun || pronoun === '__unselected__') {
      this.showToast('Por favor, selecione o Pronome de Tratamento (ou "(Nenhum pronome)").', 'warning');
      document.getElementById(`${context}-team-pronoun-select`)?.focus();
      return;
    }

    if (!title || title === '__unselected__') {
      this.showToast('Por favor, selecione a Titulação Acadêmica (ou "(Nenhuma titulação)").', 'warning');
      document.getElementById(`${context}-team-title-select`)?.focus();
      return;
    }

    if (!name) {
      this.showToast('Por favor, informe o Nome do integrante.', 'warning');
      document.getElementById(`${context}-team-name-input`)?.focus();
      return;
    }

    if (!institution || institution === '__unselected__') {
      this.showToast('Por favor, selecione a Instituição do integrante.', 'warning');
      document.getElementById(`${context}-team-institution-select`)?.focus();
      return;
    }

    if (!role || role === '__unselected__') {
      this.showToast('Por favor, selecione o Cargo / Função do integrante.', 'warning');
      document.getElementById(`${context}-team-role-select`)?.focus();
      return;
    }

    const isFnde = institution === 'FNDE' || role.includes('FNDE') || role.includes('CGPTE') || role.includes('CMATE') || role.includes('COATE') || role.includes('COACE');
    const isCoord = role.includes('Coordenador do Projeto');

    const memberData = {
      institutionGroup: isFnde ? 'FNDE' : 'UFG',
      pronoun,
      title,
      name,
      role,
      institution,
      type: isFnde ? 'fnde' : (isCoord ? 'coordenacao' : 'tecnica')
    };
    memberData.fullName = window.formatTeamMemberFullName(memberData);

    if (context === 'wizard') {
      if (!this.currentTraining) return;
      if (!this.currentTraining.team) this.currentTraining.team = [];

      if (index >= 0 && this.currentTraining.team[index]) {
        this.currentTraining.team[index] = {
          ...this.currentTraining.team[index],
          ...memberData
        };
        this.showToast(`Integrante ${memberData.fullName} atualizado com sucesso!`, 'success');
      } else {
        memberData.id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
        memberData.order = this.currentTraining.team.length;
        this.currentTraining.team.push(memberData);
        this.showToast(`${memberData.fullName} adicionado à equipe da capacitação!`, 'success');
      }

      this.renderTeamList();
      this.saveCurrentStepData();
    } else {
      // Context: master
      const masterTeam = window.getMasterTeam();
      if (index >= 0 && masterTeam[index]) {
        masterTeam[index] = {
          ...masterTeam[index],
          ...memberData
        };
        this.showToast(`Integrante ${memberData.fullName} atualizado no catálogo geral!`, 'success');
      } else {
        memberData.id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
        memberData.order = masterTeam.length;
        masterTeam.push(memberData);
        this.showToast(`${memberData.fullName} adicionado ao catálogo geral de equipe!`, 'success');
      }

      window.saveMasterTeam(masterTeam);
      this.renderMasterTeamManagement();
    }

    this.closeTeamMemberInPageEditor(context);
  }

  /* ==========================================================================
     ETAPA 3: MUNICÍPIOS & TABELA 1
     ========================================================================== */
  ensurePoloInMunicipalities() {
    if (!this.currentTraining || !this.currentTraining.polo) return;
    const poloName = (this.currentTraining.polo || '').trim();
    if (!poloName) return;
    const poloUf = this.currentTraining.uf || 'GO';
    const poloIbge = this.currentTraining.poloIbge || '';

    if (!this.currentTraining.municipalities) {
      this.currentTraining.municipalities = [];
    }

    const muns = this.currentTraining.municipalities;

    // Normalização estrita para identificar exclusivamente o polo sede
    const normPolo = window.convocacaoParser ? window.convocacaoParser.normalizeText(poloName) : poloName.toLowerCase();

    // 1. Identificar se o município polo já existe
    let poloMun = muns.find(m => {
      const normM = window.convocacaoParser ? window.convocacaoParser.normalizeText(m.name) : (m.name || '').toLowerCase();
      const matchName = normM === normPolo && (m.uf || poloUf).toUpperCase() === poloUf.toUpperCase();
      const matchIbge = poloIbge && String(m.ibgeCode) === String(poloIbge);
      return matchName || matchIbge;
    });

    if (!poloMun) {
      let finalIbge = poloIbge;
      if (!finalIbge && window.IBGE_DATA) {
        const found = window.IBGE_DATA.find(m => m.u === poloUf && (window.convocacaoParser ? window.convocacaoParser.normalizeText(m.n) === normPolo : m.n.toLowerCase() === poloName.toLowerCase()));
        if (found) finalIbge = found.c;
      }

      poloMun = {
        id: `mun_sede_${Date.now()}`,
        ibgeCode: String(finalIbge || ''),
        name: poloName,
        uf: poloUf,
        distanceKm: 0.0,
        isSummoned: true,
        isSede: true,
        inscribedCACS: 2,
        inscribedGestores: 2,
        inscribedTotal: 4,
        presentCACS: 0,
        presentGestores: 0,
        presentTotal: 0
      };
      muns.unshift(poloMun);
    } else {
      poloMun.isSede = true;
      poloMun.distanceKm = 0.0;
      if (poloIbge && !poloMun.ibgeCode) poloMun.ibgeCode = String(poloIbge);
    }

    // 2. Corrigir e recalcular qualquer outro município que não seja o polo
    muns.forEach(m => {
      const normM = window.convocacaoParser ? window.convocacaoParser.normalizeText(m.name) : (m.name || '').toLowerCase();
      const isActuallyPolo = (normM === normPolo && (m.uf || poloUf).toUpperCase() === poloUf.toUpperCase()) || (poloIbge && String(m.ibgeCode) === String(poloIbge));
      
      if (!isActuallyPolo) {
        m.isSede = false;
        if (m.distanceKm === 0.0 || m.distanceKm === 0 || m.distanceKm === undefined) {
          m.distanceKm = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
        }
      }
    });
  }

  renderMunicipalitiesStep() {
    const container = document.getElementById('wizard-municipalities-table-preview');
    if (!container || !this.currentTraining) return;

    // Sempre incluir automaticamente o município sede/polo na lista e na contagem
    this.ensurePoloInMunicipalities();

    const muns = this.currentTraining.municipalities || [];
    const poloName = this.currentTraining.polo || 'Polo';
    const poloUf = this.currentTraining.uf || 'GO';

    // Recalcular Previsão de Participantes (4 × quantidade total de municípios, incluindo a sede)
    const autoExpected = muns.length * 4;
    this.currentTraining.expectedParticipants = autoExpected;

    const countEl = document.getElementById('wiz-muns-total-count');
    if (countEl) countEl.textContent = `${muns.length} Municípios Cadastrados`;

    const expectedInput = document.getElementById('wiz-train-expected');
    if (expectedInput) {
      expectedInput.value = autoExpected || '';
    }

    const calcDesc = document.getElementById('wiz-participants-calc-desc');
    if (calcDesc) {
      calcDesc.innerHTML = `Calculado automaticamente: <strong>4 participantes × ${muns.length} municípios</strong> (incluindo o município sede/polo <em>${this.escapeHtml(poloName)}</em>) = <strong>${autoExpected} participantes previstos</strong>.`;
    }

    const bulkContainer = document.getElementById('mun-bulk-actions-container');
    if (bulkContainer) bulkContainer.style.display = 'none';

    if (muns.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 1.5rem; background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-muted);">
          <div style="display:flex; justify-content:center; margin-bottom:0.75rem; color:var(--accent-gold-text);">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10v2"></path><path d="M15 10v2"></path><path d="M9 14v2"></path><path d="M15 14v2"></path></svg>
          </div>
          <h4 style="margin:0 0 0.5rem 0; color:var(--text-primary); font-weight:700;">Nenhum município cadastrado na lista da Tabela 1</h4>
          <p style="margin-bottom:1.25rem; font-size:0.88rem; color:var(--text-secondary);">Cadastre os municípios convocados da região polo para calcular distâncias e participantes automaticamente.</p>
          <button class="btn btn-primary" onclick="app.openMunicipalityInPageEditor(-1)" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem;">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Cadastrar Primeiro Município
          </button>
        </div>
      `;
      return;
    }

    // Ordenar municípios: Município Polo/Sede SEMPRE primeiro e fixo no topo
    this.munSortField = this.munSortField || 'name';
    this.munSortOrder = this.munSortOrder || 'asc';
    const sortField = this.munSortField;
    const sortOrder = this.munSortOrder;

    const sorted = [...muns].sort((a, b) => {
      if (a.isSede && !b.isSede) return -1;
      if (!a.isSede && b.isSede) return 1;
      if (a.isSede && b.isSede) return 0;

      if (sortField === 'distance') {
        const distA = parseFloat(a.distanceKm || 0);
        const distB = parseFloat(b.distanceKm || 0);
        return sortOrder === 'asc' ? distA - distB : distB - distA;
      } else {
        const comp = (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' });
        return sortOrder === 'asc' ? comp : -comp;
      }
    });

    let rowsHtml = sorted.map((m, idx) => {
      const realIndex = muns.findIndex(item => item.id === m.id || (item.ibgeCode === m.ibgeCode && item.name === m.name));
      const targetIdx = realIndex !== -1 ? realIndex : idx;

      return `
        <tr>
          <td style="text-align:center;">
            ${m.isSede 
              ? `<input type="checkbox" disabled title="A sede do polo não pode ser excluída" style="opacity:0.25; cursor:not-allowed; width:15px; height:15px;">` 
              : `<input type="checkbox" class="mun-row-checkbox" data-target-index="${targetIdx}" onchange="app.onMunicipalityCheckboxChange()" style="cursor:pointer; width:15px; height:15px;">`
            }
          </td>
          <td style="text-align:center;">
            <span class="font-mono" style="font-weight:700; color:var(--accent-blue-text); font-size:0.92rem;">${m.ibgeCode || '-'}</span>
          </td>
          <td style="text-align:left;">
            <strong style="color:var(--text-primary); font-size:0.92rem;">${this.escapeHtml(m.name || '')}</strong>
          </td>
          <td style="text-align:center;">
            <span class="nav-badge badge-blue font-bold" style="font-size:0.75rem; padding:0.15rem 0.5rem;">${m.uf || poloUf}</span>
          </td>
          <td style="text-align:right;">
            <span class="font-mono" style="font-weight:700; color:${m.isSede ? 'var(--accent-amber-text)' : 'var(--accent-emerald-text)'}; font-size:0.95rem;">
              ${m.isSede ? '0,0 km' : `${parseFloat(m.distanceKm || 0).toFixed(1).replace('.', ',')} km`}
            </span>
          </td>
          <td style="text-align:center; white-space:nowrap;">
            <div style="display:inline-flex; gap:0.4rem; justify-content:center; align-items:center;">
              ${m.isSede 
                ? `<span class="btn btn-secondary btn-sm" style="opacity:0.75; cursor:default; font-size:0.75rem; padding:0.25rem 0.65rem; display:inline-flex; align-items:center; font-weight:600;" title="Município Sede / Polo Oficial">${window.icons.sede} Sede</span>`
                : `<button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.removeMunicipality(${targetIdx})" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center;" title="Excluir município">${window.icons.delete} Excluir</button>`
              }
            </div>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width: 44px; text-align:center;">
                <input type="checkbox" id="mun-table-select-all" onchange="app.toggleSelectAllTableMunicipalities(this.checked)" title="Selecionar todos os municípios convocados" style="cursor:pointer; width:16px; height:16px;">
              </th>
              <th style="width: 130px; text-align:center;">Código IBGE</th>
              <th class="th-sortable" onclick="app.sortMunicipalities('name')" style="text-align:left; cursor:pointer;" title="Clique para classificar por Nome (${sortField === 'name' && sortOrder === 'asc' ? 'Decrescente Z-A' : 'Crescente A-Z'})">
                <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                  <span>Nome do Município</span>
                  <span class="sort-icon-badge">${this.getMunSortIcon('name')}</span>
                </div>
              </th>
              <th style="width: 70px; text-align:center;">UF</th>
              <th class="th-sortable" onclick="app.sortMunicipalities('distance')" style="width: 155px; text-align:right; cursor:pointer;" title="Clique para classificar por Distância (${sortField === 'distance' && sortOrder === 'asc' ? 'Decrescente' : 'Crescente'})">
                <div style="display:inline-flex; align-items:center; justify-content:flex-end; gap:0.45rem; width:100%;">
                  <span>Distância (km)</span>
                  <span class="sort-icon-badge">${this.getMunSortIcon('distance')}</span>
                </div>
              </th>
              <th style="width: 140px; text-align:center;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.85rem; flex-wrap:wrap; gap:0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="app.recalculateAllDistancesToPolo()" title="Recalcular distância de todos os municípios em relação ao Polo Capacitador (${this.escapeHtml(poloName)})" style="display:inline-flex; align-items:center; gap:0.35rem;">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg> Recalcular Distâncias pelo Polo (${this.escapeHtml(poloName)})
        </button>
        <div style="font-size:0.82rem; color:var(--text-secondary);">
          Total de <strong>${muns.length}</strong> município(s) cadastrado(s) na Tabela 1 (incluindo o Polo <em>${this.escapeHtml(poloName)}</em>).
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     IN-PAGE EDITOR DE MUNICÍPIOS (ETAPA 3)
     ========================================================================== */
  openMunicipalityInPageEditor(editIndex = -1) {
    const card = document.getElementById('wizard-mun-editor-card');
    if (!card) {
      this.openAddMunicipalityModal('wizard');
      return;
    }

    const titleText = document.getElementById('wizard-mun-editor-title-text');
    const editIndexEl = document.getElementById('wizard-mun-edit-index');
    const ufSelect = document.getElementById('wizard-mun-uf-select');
    const distInput = document.getElementById('wizard-mun-dist-input');
    const ibgeInput = document.getElementById('wizard-mun-ibge-input');

    if (editIndexEl) editIndexEl.value = editIndex;

    const defaultUf = this.currentTraining?.uf || 'GO';

    if (editIndex === -1) {
      if (titleText) titleText.textContent = 'Cadastrar Município Convocado';
      if (ufSelect) ufSelect.value = defaultUf;
      this.onWizardMunUfChange(defaultUf);
    } else {
      if (titleText) titleText.textContent = 'Editar Município Convocado';
      const m = this.currentTraining?.municipalities?.[editIndex];
      if (m) {
        const munUf = m.uf || defaultUf;
        if (ufSelect) ufSelect.value = munUf;
        this.onWizardMunUfChange(munUf, m.name, m.ibgeCode);
        if (distInput) distInput.value = parseFloat(m.distanceKm || 0).toFixed(1);
        if (ibgeInput) ibgeInput.value = m.ibgeCode || '';
      }
    }

    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  closeMunicipalityInPageEditor() {
    const card = document.getElementById('wizard-mun-editor-card');
    if (card) card.style.display = 'none';
  }

  onWizardMunUfChange(uf, selectedCity = null, selectedIbge = null) {
    const citySelect = document.getElementById('wizard-mun-city-select');
    if (!citySelect || !window.IBGE_DATA) return;

    const filtered = window.IBGE_DATA.filter(m => m.u === uf).sort((a, b) => a.n.localeCompare(b.n));

    citySelect.innerHTML = `<option value="" disabled ${!selectedCity ? 'selected' : ''}>Selecionar Município...</option>` +
      filtered.map(m => {
        const isSel = (selectedCity && m.n.toLowerCase() === selectedCity.toLowerCase()) ||
                      (selectedIbge && String(m.c) === String(selectedIbge));
        return `<option value="${m.n}" data-ibge="${m.c}" ${isSel ? 'selected' : ''}>${m.n}</option>`;
      }).join('');

    this.onWizardMunCityChange();
  }

  onWizardMunCityChange() {
    const ufSelect = document.getElementById('wizard-mun-uf-select');
    const citySelect = document.getElementById('wizard-mun-city-select');
    const ibgeInput = document.getElementById('wizard-mun-ibge-input');
    const distInput = document.getElementById('wizard-mun-dist-input');
    const previewPolo = document.getElementById('wizard-mun-preview-polo');
    const previewDist = document.getElementById('wizard-mun-preview-dist');

    if (!citySelect || !citySelect.selectedOptions[0]) return;

    const activeOption = citySelect.selectedOptions[0];
    const cityName = activeOption.value;
    const ibgeCode = activeOption.getAttribute('data-ibge') || '';
    const uf = ufSelect?.value || this.currentTraining?.uf || 'GO';

    if (ibgeInput) ibgeInput.value = ibgeCode;

    const poloName = this.currentTraining?.polo || 'Polo';
    const poloUf = this.currentTraining?.uf || uf;

    const calcDist = (cityName && poloName)
      ? window.convocacaoParser.calculateDistanceToPolo(cityName, uf, poloName, poloUf)
      : 0.0;

    if (distInput) {
      distInput.value = parseFloat(calcDist).toFixed(1);
    }

    if (previewPolo) previewPolo.textContent = `${poloName} (${poloUf})`;
    if (previewDist) previewDist.textContent = `${parseFloat(calcDist).toFixed(1).replace('.', ',')} km`;
  }

  saveMunicipalityInPage() {
    const editIndexEl = document.getElementById('wizard-mun-edit-index');
    const ufSelect = document.getElementById('wizard-mun-uf-select');
    const citySelect = document.getElementById('wizard-mun-city-select');
    const ibgeInput = document.getElementById('wizard-mun-ibge-input');
    const distInput = document.getElementById('wizard-mun-dist-input');

    const editIndex = editIndexEl ? parseInt(editIndexEl.value) : -1;
    const uf = ufSelect?.value || 'GO';
    const cityName = citySelect?.value;
    const ibgeCode = ibgeInput?.value || citySelect?.selectedOptions[0]?.getAttribute('data-ibge') || '';
    const distanceKm = parseFloat(distInput?.value) || 0.0;

    if (!cityName) {
      this.showToast('Por favor, selecione um município na lista.', 'warning');
      return;
    }

    if (!this.currentTraining) return;
    if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];

    const muns = this.currentTraining.municipalities;

    // Verificar se já existe (na edição, desconsidera o próprio município editado). O código IBGE só é
    // comparado quando é válido; vazio ou "0000000" não identifica o município
    const validIbge = (code) => Boolean(code) && String(code).trim() !== '' && !/^0+$/.test(String(code).trim());
    const alreadyExists = muns.some((m, idx) => idx !== editIndex && (
      (validIbge(ibgeCode) && validIbge(m.ibgeCode) && String(m.ibgeCode) === String(ibgeCode)) ||
      ((m.name || '').toLowerCase() === cityName.toLowerCase() && m.uf === uf)
    ));
    if (alreadyExists) {
      this.showToast(`O município ${cityName} (${uf}) já está cadastrado na Tabela 1.`, 'warning');
      return;
    }

    if (editIndex === -1) {

      muns.push({
        id: `mun_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        ibgeCode: String(ibgeCode),
        name: cityName,
        uf: uf,
        distanceKm: distanceKm,
        isSummoned: true,
        inscribedCACS: 2,
        inscribedGestores: 2,
        inscribedTotal: 4,
        presentCACS: 0,
        presentGestores: 0,
        presentTotal: 0
      });

      this.showToast(`${cityName} (${uf}) adicionado à Tabela 1! Distância: ${distanceKm.toFixed(1).replace('.', ',')} km`, 'success');
    } else {
      if (muns[editIndex]) {
        muns[editIndex].uf = uf;
        muns[editIndex].name = cityName;
        muns[editIndex].ibgeCode = String(ibgeCode);
        muns[editIndex].distanceKm = distanceKm;
        this.showToast(`Município ${cityName} (${uf}) atualizado com sucesso!`, 'success');
      }
    }

    this.closeMunicipalityInPageEditor();
    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
  }

  updateMunicipalityField(index, field, value) {
    if (!this.currentTraining?.municipalities?.[index]) return;
    this.currentTraining.municipalities[index][field] = value;

    if (field === 'name' || field === 'uf') {
      const m = this.currentTraining.municipalities[index];
      const poloName = this.currentTraining.polo;
      const poloUf = this.currentTraining.uf || 'MT';
      if (poloName) {
        m.distanceKm = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
        this.renderMunicipalitiesStep();
      }
    }

    this.saveCurrentStepData();
  }

  removeMunicipality(index) {
    if (!this.currentTraining?.municipalities) return;
    this.currentTraining.municipalities.splice(index, 1);
    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    this.showToast('Município removido da lista.');
  }

  /* --------------------------------------------------------------------------
     AÇÕES EM MASSA: SELEÇÃO E EXCLUSÃO DE MUNICÍPIOS
     -------------------------------------------------------------------------- */
  toggleSelectAllTableMunicipalities(isChecked) {
    const checkboxes = document.querySelectorAll('.mun-row-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = isChecked;
    });
    this.onMunicipalityCheckboxChange();
  }

  onMunicipalityCheckboxChange() {
    const checkboxes = document.querySelectorAll('.mun-row-checkbox');
    const checked = Array.from(checkboxes).filter(cb => cb.checked);
    const container = document.getElementById('mun-bulk-actions-container');
    const btnText = document.getElementById('btn-delete-selected-muns-text');
    const selectAllCb = document.getElementById('mun-table-select-all');

    if (selectAllCb) {
      selectAllCb.checked = checkboxes.length > 0 && checked.length === checkboxes.length;
      selectAllCb.indeterminate = checked.length > 0 && checked.length < checkboxes.length;
    }

    if (container) {
      if (checked.length > 0) {
        container.style.display = 'flex';
        if (btnText) {
          btnText.textContent = `Excluir Selecionados (${checked.length})`;
        }
      } else {
        container.style.display = 'none';
      }
    }
  }

  confirmDeleteSelectedMunicipalities() {
    const checkboxes = document.querySelectorAll('.mun-row-checkbox:checked');
    const count = checkboxes.length;
    if (count === 0) return;

    this.openConfirmModal({
      title: 'Excluir Municípios Selecionados',
      msg: `Tem certeza que deseja excluir os ${count} municípios selecionados da lista de convocados? O município sede/polo será preservado.`,
      btnText: 'Sim, Excluir Selecionados',
      onConfirm: () => {
        this.executeDeleteSelectedMunicipalities();
      }
    });
  }

  async executeDeleteSelectedMunicipalities() {
    if (!this.currentTraining || !Array.isArray(this.currentTraining.municipalities)) return;

    const checkboxes = document.querySelectorAll('.mun-row-checkbox:checked');
    const indicesToDelete = new Set();
    checkboxes.forEach(cb => {
      const idx = parseInt(cb.getAttribute('data-target-index'), 10);
      if (!isNaN(idx)) indicesToDelete.add(idx);
    });

    if (indicesToDelete.size === 0) return;

    const deletedCount = indicesToDelete.size;
    this.currentTraining.municipalities = this.currentTraining.municipalities.filter((m, idx) => {
      if (m.isSede) return true; // Sempre preserva o município sede
      return !indicesToDelete.has(idx);
    });

    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    if (window.db) {
      await window.db.saveTrainingFull(this.currentTraining, `Exclusão em massa de ${deletedCount} municípios convocados`);
    }
    this.showToast(`${deletedCount} município(s) excluído(s) com sucesso!`, 'success');
  }

  /* --------------------------------------------------------------------------
     ORDENAÇÃO DA TABELA DE MUNICÍPIOS (SEDE SEMPRE FIXA NO TOPO)
     -------------------------------------------------------------------------- */
  getMunSortIcon(field) {
    if (this.munSortField !== field) {
      // Ícone neutro de ordenação (linhas de classificação sutis)
      return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;"><path d="M7 15l5 5 5-5"></path><path d="M7 9l5-5 5 5"></path></svg>`;
    }
    if (this.munSortOrder === 'asc') {
      // Crescente: linhas ordenadas com seta para cima
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-gold-text);"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 9 18 6 21 9"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    } else {
      // Decrescente: linhas ordenadas com seta para baixo
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-gold-text);"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 15 18 18 21 15"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    }
  }

  sortMunicipalities(field) {
    if (!this.currentTraining?.municipalities) return;
    if (this.munSortField === field) {
      this.munSortOrder = this.munSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.munSortField = field;
      this.munSortOrder = 'asc';
    }

    // Ordenar a lista na memória garantindo que a sede NUNCA saia do topo (índice 0)
    const sortField = this.munSortField;
    const sortOrder = this.munSortOrder;

    this.currentTraining.municipalities.sort((a, b) => {
      if (a.isSede && !b.isSede) return -1;
      if (!a.isSede && b.isSede) return 1;
      if (a.isSede && b.isSede) return 0;

      if (sortField === 'distance') {
        const distA = parseFloat(a.distanceKm || 0);
        const distB = parseFloat(b.distanceKm || 0);
        return sortOrder === 'asc' ? distA - distB : distB - distA;
      } else {
        const comp = (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' });
        return sortOrder === 'asc' ? comp : -comp;
      }
    });

    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();

    const label = field === 'name' ? 'Nome do Município' : 'Distância (km)';
    const dir = this.munSortOrder === 'asc' ? 'crescente' : 'decrescente';
    this.showToast(`Municípios ordenados por ${label} (${dir}). A sede permanece fixa no topo.`);
  }

  recalculateAllDistancesToPolo() {
    if (!this.currentTraining || !this.currentTraining.municipalities) return;
    const poloName = this.currentTraining.polo;
    const poloUf = this.currentTraining.uf || 'MT';
    if (!poloName) {
      this.showToast('Por favor, informe o Município Polo na Etapa 1 primeiro.', 'warning');
      return;
    }

    let count = 0;
    this.currentTraining.municipalities.forEach(m => {
      const dist = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
      m.distanceKm = dist;
      count++;
    });

    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    this.showToast(`Distâncias de ${count} municípios recalculadas em relação ao polo ${poloName}!`, 'success');
  }

  addMunicipalityPrompt() {
    this.openMunicipalityInPageEditor(-1);
  }

  /* ==========================================================================
     MODAL SELETOR WEB DE MUNICÍPIOS (UF + IBGE)
     ========================================================================== */
  openAddMunicipalityModal(context = 'wizard') {
    this.addMunContext = context; // 'convocacao' ou 'wizard'

    let defaultUf = 'MT';
    if (context === 'convocacao' && this.extractedConvocacaoData) {
      defaultUf = this.extractedConvocacaoData.uf || 'MT';
    } else if (this.currentTraining) {
      defaultUf = this.currentTraining.uf || 'MT';
    }

    const ufSelect = document.getElementById('add-mun-uf-select');
    if (ufSelect) ufSelect.value = defaultUf;

    this.onAddMunUfChange(defaultUf);

    const modal = document.getElementById('modal-add-municipality');
    if (modal) modal.style.display = 'flex';
  }

  closeAddMunicipalityModal() {
    const modal = document.getElementById('modal-add-municipality');
    if (modal) modal.style.display = 'none';
  }

  onAddMunUfChange(uf) {
    const citySelect = document.getElementById('add-mun-city-select');
    if (!citySelect || !window.IBGE_DATA) return;

    const filtered = window.IBGE_DATA
      .filter(m => m.u === uf)
      .sort((a, b) => a.n.localeCompare(b.n));

    citySelect.innerHTML = filtered.map(m => `
      <option value="${m.n}" data-ibge="${m.c}">${m.n} (IBGE: ${m.c})</option>
    `).join('');

    this.onAddMunCityChange();
  }

  onAddMunCityChange() {
    const ufSelect = document.getElementById('add-mun-uf-select');
    const citySelect = document.getElementById('add-mun-city-select');
    const ibgePreview = document.getElementById('add-mun-preview-ibge');
    const distPreview = document.getElementById('add-mun-preview-dist');

    if (!citySelect || !citySelect.selectedOptions[0]) return;

    const activeOption = citySelect.selectedOptions[0];
    const cityName = activeOption.value;
    const ibgeCode = activeOption.getAttribute('data-ibge') || '';
    const uf = ufSelect?.value || 'MT';

    let poloName = 'Polo';
    let poloUf = uf;

    if (this.addMunContext === 'convocacao' && this.extractedConvocacaoData) {
      poloName = this.extractedConvocacaoData.polo || 'Polo';
      poloUf = this.extractedConvocacaoData.uf || uf;
    } else if (this.currentTraining) {
      poloName = this.currentTraining.polo || 'Polo';
      poloUf = this.currentTraining.uf || uf;
    }

    const dist = window.convocacaoParser.calculateDistanceToPolo(cityName, uf, poloName, poloUf);

    if (ibgePreview) ibgePreview.textContent = ibgeCode;
    if (distPreview) distPreview.textContent = `${parseFloat(dist).toFixed(1)} km`;
  }

  confirmAddMunicipalityFromModal() {
    const ufSelect = document.getElementById('add-mun-uf-select');
    const citySelect = document.getElementById('add-mun-city-select');
    if (!citySelect || !citySelect.selectedOptions[0]) return;

    const activeOption = citySelect.selectedOptions[0];
    const cityName = activeOption.value;
    const ibgeCode = activeOption.getAttribute('data-ibge') || '';
    const uf = ufSelect?.value || 'MT';

    let poloName = 'Polo';
    let poloUf = uf;

    if (this.addMunContext === 'convocacao' && this.extractedConvocacaoData) {
      poloName = this.extractedConvocacaoData.polo || 'Polo';
      poloUf = this.extractedConvocacaoData.uf || uf;
    } else if (this.currentTraining) {
      poloName = this.currentTraining.polo || 'Polo';
      poloUf = this.currentTraining.uf || uf;
    }

    const calcDist = window.convocacaoParser.calculateDistanceToPolo(cityName, uf, poloName, poloUf);

    if (this.addMunContext === 'convocacao') {
      if (!this.extractedConvocacaoData) return;
      if (!this.extractedConvocacaoData.allMunicipalities) this.extractedConvocacaoData.allMunicipalities = [];

      if (!this.extractedConvocacaoData.allMunicipalities.some(m => String(m.code) === String(ibgeCode))) {
        this.extractedConvocacaoData.allMunicipalities.push({
          name: cityName,
          code: parseInt(ibgeCode) || ibgeCode,
          uf: uf,
          dateGroup: 'Geral',
          distanceKm: calcDist
        });
        this.renderConvocacaoExtractedMunicipalities();
        this.showToast(`${cityName} (${uf}) adicionado à Convocação! Distância: ${calcDist} km`, 'success');
      } else {
        this.showToast(`O município ${cityName} (${uf}) já está na lista.`, 'warning');
      }
    } else {
      if (!this.currentTraining) return;
      if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];

      this.currentTraining.municipalities.push({
        id: `mun_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        ibgeCode: String(ibgeCode),
        name: cityName,
        uf,
        distanceKm: calcDist,
        isSummoned: true,
        inscribedCACS: 2,
        inscribedGestores: 2,
        inscribedTotal: 4,
        presentCACS: 0,
        presentGestores: 0,
        presentTotal: 0
      });

      this.renderMunicipalitiesStep();
      this.saveCurrentStepData();
      this.showToast(`${cityName} (${uf}) adicionado à Tabela 1! Distância: ${calcDist} km`, 'success');
    }

    this.closeAddMunicipalityModal();
  }

  /* ==========================================================================
     ETAPA 4: ESTRUTURA DO CURSO & TABELA 2 (MODELO PADRÃO & CÓPIA INDEPENDENTE)
     ========================================================================== */
  renderCourseStructureStep() {
    if (!this.currentTraining) return;

    // Normaliza módulos se existirem, sem reinjetar modelo automaticamente se tiver sido limpo
    if (Array.isArray(this.currentTraining.courseModules) && this.currentTraining.courseModules.length > 0) {
      if (window.courseStructureHelper) {
        this.currentTraining.courseModules = window.courseStructureHelper.normalize(this.currentTraining.courseModules);
      }

      // Autocorreção preventiva: se os módulos foram carregados com tópicos e horas zerados devido à falha anterior de persistência
      const isCorruptedEmpty = this.currentTraining.courseModules.every(m => {
        const gEmpty = !m.topicGestor && (!m.gestorTopics || m.gestorTopics.every(t => !t.topic || (parseFloat(t.hours) || 0) === 0));
        const cEmpty = !m.topicCACS && (!m.cacsTopics || m.cacsTopics.every(t => !t.topic || (parseFloat(t.hours) || 0) === 0));
        return gEmpty && cEmpty;
      });

      if (isCorruptedEmpty && window.courseStructureHelper) {
        const tpl = (this.currentTraining.baseTemplateId ? window.courseStructureHelper.getTemplateById(this.currentTraining.baseTemplateId) : null) || window.courseStructureHelper.getDefaultTemplate();
        if (tpl && tpl.modules && tpl.modules.length > 0) {
          this.currentTraining.courseModules = window.courseStructureHelper.makeDeepCopy(tpl.modules);
          this.currentTraining.baseTemplateName = tpl.name;
        }
      }
    } else {
      this.currentTraining.courseModules = [];
    }

    // Atualizar banner de status da estrutura
    const nameEl = document.getElementById('step4-base-template-name');
    const statusEl = document.getElementById('step4-structure-status-tag');
    const hasMods = this.currentTraining.courseModules.length > 0;
    if (nameEl) {
      nameEl.textContent = hasMods ? (this.currentTraining.baseTemplateName || 'Modelo Padrão') : 'Nenhuma selecionada';
    }
    if (statusEl) {
      if (!hasMods) {
        statusEl.style.display = 'none';
      } else if (this.currentTraining.isCustomized) {
        statusEl.style.display = 'inline-flex';
        statusEl.className = 'nav-badge badge-blue';
        statusEl.textContent = 'Personalizada para esta capacitação';
      } else {
        statusEl.style.display = 'inline-flex';
        statusEl.className = 'nav-badge badge-emerald';
        statusEl.textContent = 'Cópia independente da capacitação';
      }
    }

    const mods = this.currentTraining.courseModules || [];
    const editorContainer = document.getElementById('wizard-course-modules-editor');
    const tableContainer = document.getElementById('wizard-course-table-preview');

    // Sincronizar estado visual do editor e do botão de edição
    if (editorContainer) {
      editorContainer.style.display = this.isCourseEditorOpen ? 'block' : 'none';
    }
    const btnTextEl = document.getElementById('btn-toggle-course-editor-text');
    if (btnTextEl) {
      btnTextEl.textContent = this.isCourseEditorOpen ? 'Concluir Edição' : 'Editar Estrutura';
    }

    // 1. Renderizar Formuário de Edição de Módulos e Temáticas
    if (editorContainer) {
      if (mods.length === 0) {
        editorContainer.innerHTML = `
          <div style="text-align:center; padding:2.5rem; background:var(--bg-input); border:1px dashed var(--border-color); border-radius:var(--radius-md);">
            <p style="color:var(--text-secondary); margin-bottom:1rem;">Nenhum módulo configurado para esta capacitação.</p>
            <button class="btn btn-primary btn-sm" onclick="app.confirmRestoreDefaultCourseStructure()" style="display:inline-flex; align-items:center; gap:0.35rem;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Carregar Modelo Padrão Oficial (4 Módulos)
            </button>
          </div>
        `;
      } else {
        const headerBar = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding:0.75rem 1rem; background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.25); border-radius:var(--radius-md); flex-wrap:wrap; gap:0.5rem;">
            <span style="font-weight:700; font-size:0.88rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.4rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <span>Formulário de Edição de Módulos e Temáticas da Capacitação</span>
            </span>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="app.addNewCourseModule()" style="font-weight:600; display:inline-flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Módulo
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="app.toggleCourseEditor(false)" style="font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluir Edição
              </button>
            </div>
          </div>
        `;

        const cardsHtml = mods.map((mod, modIdx) => {
          const gTopics = mod.gestorTopics || [];
          const cTopics = mod.cacsTopics || [];

          const gTotalHours = gTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);
          const cTotalHours = cTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);

          return `
            <div class="course-mod-card" data-mod-id="${mod.id}">
              <!-- Cabeçalho do Card do Módulo -->
              <div class="course-mod-header">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span class="nav-badge badge-blue font-bold" style="font-size:0.9rem; padding:0.25rem 0.65rem;">
                    Módulo ${mod.moduleNumber || `0${modIdx + 1}`}
                  </span>
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    <label style="font-size:0.78rem; color:var(--text-muted); margin:0;">Identificador:</label>
                    <input type="text" class="form-control form-control-sm" style="width:70px; text-align:center; font-weight:700;" value="${mod.moduleNumber || `0${modIdx + 1}`}" onchange="app.updateCourseModuleNumber(${modIdx}, this.value)">
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveCourseModule(${modIdx}, -1)" ${modIdx === 0 ? 'disabled' : ''} title="Mover para cima" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveCourseModule(${modIdx}, 1)" ${modIdx === mods.length - 1 ? 'disabled' : ''} title="Mover para baixo" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.duplicateCourseModule(${modIdx})" title="Duplicar Módulo com todas as temáticas" style="padding:0.2rem 0.55rem; font-weight:600; display:inline-flex; align-items:center; gap:0.25rem;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.deleteCourseModule(${modIdx})" title="Excluir Módulo" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    ${window.icons.delete}
                  </button>
                </div>
              </div>

              <!-- Checkbox de Módulo Compartilhado -->
              <div style="margin:0.75rem 0 1rem 0; padding:0.5rem 0.75rem; background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.2); border-radius:var(--radius-md);">
                <label style="display:flex; align-items:center; gap:0.55rem; font-weight:700; font-size:0.86rem; color:var(--text-primary); cursor:pointer; margin:0;">
                  <input type="checkbox" ${mod.isShared ? 'checked' : ''} onchange="app.toggleCourseModuleShared(${modIdx}, this.checked)">
                  <span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:0.25rem;"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>Módulo compartilhado entre Gestores e CACS (mesmo conteúdo e carga horária)</span>
                </label>
              </div>

              ${mod.isShared ? `
                <!-- Bloco Único: Módulo Compartilhado -->
                <div style="background:var(--bg-input); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem; margin-bottom:0.75rem;">
                    <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg> Temática do Módulo Compartilhado
                    </strong>
                    <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                      Carga Horária: ${gTotalHours.toFixed(1).replace('.', ',')} h
                    </span>
                  </div>

                  <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${gTopics.map((t, tIdx) => `
                      <div class="course-topic-item">
                        <input type="text" class="form-control form-control-sm" placeholder="Temática do Módulo" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateCourseTopic(${modIdx}, 'shared', ${tIdx}, 'topic', this.value)">
                        <div style="display:flex; align-items:center; gap:0.25rem;">
                          <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateCourseTopic(${modIdx}, 'shared', ${tIdx}, 'hours', this.value)">
                          <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeCourseTopic(${modIdx}, 'shared', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center;" title="Remover Temática">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    `).join('')}
                  </div>

                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.addCourseTopic(${modIdx}, 'shared')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Temática
                  </button>
                </div>
              ` : `
                <!-- Grade Dupla: Módulo Específico por Público (Gestor vs CACS) -->
                <div class="course-mod-grid">
                  <!-- Coluna Gestores Municipais -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="7" r="4"></circle><path d="M15.5 14H5a4 4 0 0 0-4 4v3h10"></path><circle cx="18" cy="18" r="2"></circle><path d="M18 14.5v1M18 20.5v1M14.5 18h1M20.5 18h1M15.5 15.5l.7.7M19.8 19.8l.7.7M15.5 20.5l.7-.7M19.8 16.2l.7-.7"></path></svg> Gestão Municipal (Gestores)
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                        Total: ${gTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${gTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para Gestores" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeCourseTopic(${modIdx}, 'gestor', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addCourseTopic(${modIdx}, 'gestor')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem; display:inline-flex; align-items:center; gap:0.25rem;">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Temática Gestor
                    </button>
                  </div>

                  <!-- Coluna Conselheiros CACS-FUNDEB -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-emerald-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Conselheiros CACS-FUNDEB
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(16,185,129,0.15); color:var(--accent-emerald-text);">
                        Total: ${cTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${cTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para CACS" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeCourseTopic(${modIdx}, 'cacs', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addCourseTopic(${modIdx}, 'cacs')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem; display:inline-flex; align-items:center; gap:0.25rem;">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Temática CACS
                    </button>
                  </div>
                </div>
              `}
            </div>
          `;
        }).join('');

        editorContainer.innerHTML = headerBar + cardsHtml;
      }
    }

    // 2. Renderizar Visualização Oficial da Tabela 2
    if (tableContainer && window.statsEngine) {
      tableContainer.innerHTML = window.statsEngine.generateTable2Html(mods);
    }
  }

  renderCourseEditorRedirectCard(state = 'warning', errorMsg = '') {
    const cardEl = document.getElementById('wizard-course-redirect-warning-card');
    const contentEl = document.getElementById('wizard-course-redirect-warning-content');
    if (!cardEl || !contentEl) return;

    if (state === 'warning') {
      cardEl.style.background = 'rgba(246, 168, 0, 0.08)';
      cardEl.style.border = '1px solid rgba(246, 168, 0, 0.3)';
      contentEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <h4 style="margin:0; color:var(--accent-gold-text); display:flex; align-items:center; gap:0.5rem; font-size:1rem; font-weight:700;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>Atenção: Redirecionamento para Gerenciador Geral de Estruturas</span>
          </h4>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.hideCourseEditorRedirectWarning()" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Fechar
          </button>
        </div>
        <p style="font-size:0.88rem; color:var(--text-primary); line-height:1.5; margin:0 0 1.25rem 0;">
          Você será redirecionado para a página de <strong>Configurações do Catálogo Geral de Estruturas do Curso</strong>.<br>
          <span style="color:var(--accent-gold-text); font-weight:600; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Recomendação Importante:</span> Qualquer alteração realizada neste relatório poderá ser perdida se não for salva. Recomendamos <strong>salvar os dados atuais</strong> antes de continuar.
        </p>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-primary" onclick="app.saveAndRedirectToCourseSettings()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Salvar e Continuar
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.redirectWithoutSavingToCourseSettings()" style="font-weight:600;">
            Ir sem Salvar
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.hideCourseEditorRedirectWarning()" style="font-weight:600;">
            Cancelar
          </button>
        </div>
      `;
    } else if (state === 'success') {
      cardEl.style.background = 'rgba(16, 185, 129, 0.1)';
      cardEl.style.border = '1px solid rgba(16, 185, 129, 0.35)';
      contentEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <h4 style="margin:0; color:var(--accent-emerald-text); display:flex; align-items:center; gap:0.5rem; font-size:1rem; font-weight:700;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Salvamento Realizado com Sucesso!</span>
          </h4>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.hideCourseEditorRedirectWarning()" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Fechar
          </button>
        </div>
        <p style="font-size:0.88rem; color:var(--text-primary); line-height:1.5; margin:0 0 1.25rem 0;">
          Os dados deste relatório foram salvos no sistema. Clique no botão <strong>Continuar</strong> abaixo para prosseguir para o Catálogo Geral de Estruturas do Curso.
        </p>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-primary" onclick="app.redirectWithoutSavingToCourseSettings()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem; background:var(--accent-emerald); border-color:var(--accent-emerald);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            Continuar para Configurações
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.hideCourseEditorRedirectWarning()" style="font-weight:600;">
            Permanecer no Relatório
          </button>
        </div>
      `;
    } else if (state === 'error') {
      cardEl.style.background = 'rgba(244, 63, 94, 0.1)';
      cardEl.style.border = '1px solid rgba(244, 63, 94, 0.35)';
      contentEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <h4 style="margin:0; color:var(--accent-rose-text); display:flex; align-items:center; gap:0.5rem; font-size:1rem; font-weight:700;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <span>Erro ao Salvar Dados</span>
          </h4>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.hideCourseEditorRedirectWarning()" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Retornar
          </button>
        </div>
        <p style="font-size:0.88rem; color:var(--text-primary); line-height:1.5; margin:0 0 1.25rem 0;">
          Não foi possível salvar os dados do relatório neste momento${errorMsg ? ': ' + errorMsg : '.'}<br>
          Você pode tentar novamente ou retornar para continuar editando sem sair.
        </p>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-primary" onclick="app.saveAndRedirectToCourseSettings()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"></path><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
            Tentar Salvar Novamente
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.hideCourseEditorRedirectWarning()" style="font-weight:600;">
            Retornar ao Relatório
          </button>
        </div>
      `;
    }
  }

  showCourseEditorRedirectWarning() {
    this.renderCourseEditorRedirectCard('warning');
    const cardEl = document.getElementById('wizard-course-redirect-warning-card');
    if (cardEl) {
      cardEl.style.display = 'block';
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  hideCourseEditorRedirectWarning() {
    const cardEl = document.getElementById('wizard-course-redirect-warning-card');
    if (cardEl) {
      cardEl.style.display = 'none';
    }
  }

  saveAndRedirectToCourseSettings() {
    try {
      this.saveCurrentStepData();
      this.showToast('Dados salvos com sucesso!', 'success');
      this.renderCourseEditorRedirectCard('success');
    } catch (err) {
      console.error('Erro ao salvar dados no alerta de redirecionamento:', err);
      this.showToast('Ocorreu um erro ao salvar os dados.', 'error');
      this.renderCourseEditorRedirectCard('error', err ? err.message : '');
    }
  }

  redirectWithoutSavingToCourseSettings() {
    this.hideCourseEditorRedirectWarning();
    this.navigateTo('master-course-structure');
  }

  toggleCourseEditor(forceState) {
    if (forceState !== undefined) {
      this.isCourseEditorOpen = !!forceState;
    } else {
      this.isCourseEditorOpen = !this.isCourseEditorOpen;
    }

    const editorContainer = document.getElementById('wizard-course-modules-editor');
    const btnTextEl = document.getElementById('btn-toggle-course-editor-text');

    if (editorContainer) {
      editorContainer.style.display = this.isCourseEditorOpen ? 'block' : 'none';
      if (this.isCourseEditorOpen) {
        this.renderCourseStructureStep();
        editorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (btnTextEl) {
      btnTextEl.textContent = this.isCourseEditorOpen ? 'Concluir Edição' : 'Editar Estrutura';
    }
  }

  addNewCourseModule() {
    if (!this.currentTraining) return;
    this.isCourseEditorOpen = true;
    if (!this.currentTraining.courseModules) this.currentTraining.courseModules = [];
    const nextNum = this.currentTraining.courseModules.length + 1;
    const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

    this.currentTraining.courseModules.push({
      id: `mod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      moduleNumber: numStr,
      order: nextNum,
      gestorTopics: [
        { id: `top_g_${Date.now()}_1`, topic: 'Nova Temática Gestão Municipal', hours: 2.0 }
      ],
      cacsTopics: [
        { id: `top_c_${Date.now()}_1`, topic: 'Nova Temática Conselheiros CACS', hours: 2.0 }
      ]
    });

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.showToast(`Módulo ${numStr} adicionado com sucesso!`, 'success');
  }

  duplicateCourseModule(modIdx) {
    if (!this.currentTraining || !window.courseStructureHelper) return;
    this.isCourseEditorOpen = true;
    this.currentTraining.courseModules = window.courseStructureHelper.duplicateModule(this.currentTraining.courseModules, modIdx);
    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.showToast('Módulo duplicado com sucesso nesta capacitação!', 'success');
  }

  deleteCourseModule(modIdx) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const mod = this.currentTraining.courseModules[modIdx];
    const modName = mod ? `Módulo ${mod.moduleNumber || mod.number || modIdx + 1}` : 'este módulo';

    this.openConfirmModal({
      title: 'Remover Módulo',
      msg: `Deseja realmente remover ${modName} da capacitação?`,
      btnText: 'Sim, Remover Módulo',
      successTitle: 'Módulo Removido!',
      successMsg: 'O módulo foi removido da estrutura do curso com sucesso.',
      onConfirm: () => {
        this.currentTraining.courseModules.splice(modIdx, 1);
        if (window.courseStructureHelper) {
          this.currentTraining.courseModules = window.courseStructureHelper.autoRenumber(this.currentTraining.courseModules);
        }
        this.renderCourseStructureStep();
        this.saveCurrentStepData();
        this.showToast('Módulo removido da capacitação.', 'info');
      }
    });
  }

  moveCourseModule(modIdx, direction) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const targetIdx = modIdx + direction;
    const mods = this.currentTraining.courseModules;
    if (targetIdx < 0 || targetIdx >= mods.length) return;

    const temp = mods[modIdx];
    mods[modIdx] = mods[targetIdx];
    mods[targetIdx] = temp;

    if (window.courseStructureHelper) {
      this.currentTraining.courseModules = window.courseStructureHelper.autoRenumber(mods);
    } else {
      mods.forEach((m, idx) => { m.order = idx + 1; });
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  updateCourseModuleNumber(modIdx, newNumber) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    if (this.currentTraining.courseModules[modIdx]) {
      this.currentTraining.courseModules[modIdx].moduleNumber = (newNumber || '').trim();
      this.renderCourseStructureStep();
      this.saveCurrentStepData();
    }
  }

  toggleCourseModuleShared(modIdx, isChecked) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    if (isChecked) {
      const gStr = JSON.stringify((mod.gestorTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      const cStr = JSON.stringify((mod.cacsTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      if (gStr !== cStr) {
        if (!confirm('Este módulo possui temáticas diferentes para Gestores e CACS.\n\nAo torná-lo compartilhado, as temáticas da Gestão Municipal serão aplicadas aos dois públicos. Deseja continuar?')) {
          this.renderCourseStructureStep();
          return;
        }
      }
      mod.isShared = true;
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
    } else {
      mod.isShared = false;
      if (!mod.cacsTopics || mod.cacsTopics.length === 0) {
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
      }
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  addCourseTopic(modIdx, type) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    const newTopic = {
      id: `top_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      topic: '',
      hours: 1.0
    };

    if (type === 'shared' || mod.isShared) {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else if (type === 'gestor') {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
    } else {
      if (!mod.cacsTopics) mod.cacsTopics = [];
      mod.cacsTopics.push(newTopic);
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  removeCourseTopic(modIdx, type, topicIdx) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics) {
        mod.gestorTopics.splice(topicIdx, 1);
        if (mod.gestorTopics.length === 0) {
          mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
        }
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
      }
    } else if (type === 'gestor' && mod.gestorTopics) {
      mod.gestorTopics.splice(topicIdx, 1);
      if (mod.gestorTopics.length === 0) {
        mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
      }
    } else if (type === 'cacs' && mod.cacsTopics) {
      mod.cacsTopics.splice(topicIdx, 1);
      if (mod.cacsTopics.length === 0) {
        mod.cacsTopics.push({ id: `top_c_${Date.now()}`, topic: '', hours: 0 });
      }
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  updateCourseTopic(modIdx, type, topicIdx, field, value) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics && mod.gestorTopics[topicIdx]) {
        if (field === 'hours') mod.gestorTopics[topicIdx].hours = parseFloat(value) || 0;
        else mod.gestorTopics[topicIdx].topic = value;
      }
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else {
      const list = type === 'gestor' ? mod.gestorTopics : mod.cacsTopics;
      if (list && list[topicIdx]) {
        if (field === 'hours') {
          list[topicIdx].hours = parseFloat(value) || 0;
        } else {
          list[topicIdx].topic = value;
        }
      }
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  /* Modais de Restauração de Template & Cópia de Outra Capacitação */
  openRestoreDefaultCourseModal() {
    const modal = document.getElementById('modal-restore-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeRestoreDefaultCourseModal() {
    const modal = document.getElementById('modal-restore-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  confirmRestoreDefaultCourseStructure() {
    if (!this.currentTraining || !window.courseStructureHelper) return;

    // Deep copy do modelo padrão
    this.currentTraining.courseModules = window.courseStructureHelper.getDefaultCopy();
    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.closeRestoreDefaultCourseModal();
    this.showToast('Modelo padrão oficial restaurado nesta capacitação!', 'success');
  }

  async openCopyCourseStructureModal() {
    if (!this.currentTraining || !window.db) return;

    const allTrainings = (await window.db.getAll('trainings')) || [];
    const otherTrainings = allTrainings.filter(t => t.id !== this.currentTraining.id);

    const select = document.getElementById('copy-course-source-select');
    const previewContainer = document.getElementById('copy-course-preview-container');

    if (!select || !previewContainer) return;

    if (otherTrainings.length === 0) {
      select.innerHTML = '<option value="">Nenhuma outra capacitação encontrada no banco</option>';
      select.disabled = true;
      previewContainer.innerHTML = '<em style="color:var(--text-muted);">Não há outras capacitações cadastradas para copiar a estrutura. Você pode utilizar o modelo padrão oficial.</em>';
    } else {
      select.disabled = false;
      select.innerHTML = otherTrainings.map(t => `
        <option value="${t.id}">${this.escapeHtml(t.title || 'Capacitação sem título')} (${this.escapeHtml(t.polo || 'Sem polo')}, ${t.year || '2026'})</option>
      `).join('');

      this.onCopyCourseSourceChange(otherTrainings[0].id);
    }

    const modal = document.getElementById('modal-copy-course-structure');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeCopyCourseStructureModal() {
    const modal = document.getElementById('modal-copy-course-structure');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async onCopyCourseSourceChange(sourceTrainingId) {
    const previewContainer = document.getElementById('copy-course-preview-container');
    if (!previewContainer || !sourceTrainingId || !window.db) return;

    const sourceTraining = await window.db.get('trainings', sourceTrainingId);
    if (!sourceTraining || !sourceTraining.courseModules || sourceTraining.courseModules.length === 0) {
      previewContainer.innerHTML = '<em style="color:var(--text-muted);">Esta capacitação não possui módulos de curso cadastrados.</em>';
      return;
    }

    const normMods = window.courseStructureHelper ? window.courseStructureHelper.normalize(sourceTraining.courseModules) : sourceTraining.courseModules;
    previewContainer.innerHTML = `
      <div style="font-weight:700; color:var(--accent-blue-text); margin-bottom:0.4rem;">
        Estrutura encontrada (${normMods.length} módulos):
      </div>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text-secondary);">
        ${normMods.map(m => `
          <li><strong>Módulo ${m.moduleNumber}:</strong> Gestor: ${(m.gestorTopics || []).map(t => `${t.topic} (${t.hours}h)`).join('; ')} | CACS: ${(m.cacsTopics || []).map(t => `${t.topic} (${t.hours}h)`).join('; ')}</li>
        `).join('')}
      </ul>
    `;
  }

  async confirmCopyCourseStructure() {
    const select = document.getElementById('copy-course-source-select');
    if (!select || !select.value || !window.db || !this.currentTraining) return;

    const sourceTraining = await window.db.get('trainings', select.value);
    if (!sourceTraining || !sourceTraining.courseModules || sourceTraining.courseModules.length === 0) {
      this.showToast('Capacitação de origem não possui módulos cadastrados.', 'warning');
      return;
    }

    // Deep copy independente
    const rawCopy = JSON.parse(JSON.stringify(sourceTraining.courseModules));
    this.currentTraining.courseModules = window.courseStructureHelper ? window.courseStructureHelper.normalize(rawCopy) : rawCopy;

    this.renderCourseStructureStep();
    await window.db.saveTrainingFull(this.currentTraining, `Cópia independente da estrutura do curso de "${sourceTraining.title || sourceTraining.id}"`);
    this.closeCopyCourseStructureModal();
    this.showToast(`Estrutura copiada com sucesso de "${sourceTraining.title || 'outra capacitação'}"!`, 'success');
  }

  pullFromGlobalMasterCourseStructure() {
    if (!this.currentTraining || !window.courseStructureHelper) return;
    this.currentTraining.courseModules = window.courseStructureHelper.getMasterCopy();
    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.showToast('Estrutura do curso atualizada a partir do Catálogo Geral Mestre!', 'success');
  }

  /* ==========================================================================
     ESTRUTURAS DO CURSO (GERENCIAMENTO DE MODELOS & CATALOGO)
     ========================================================================== */
  setCourseTemplateFilter(filterType = 'all') {
    this.courseTemplateFilter = filterType;
    document.querySelectorAll('.course-tpl-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeTabBtn = document.getElementById(`course-tpl-tab-${filterType}`);
    if (activeTabBtn) activeTabBtn.classList.add('active');
    this.renderCourseTemplatesCatalog();
  }

  renderCourseTemplatesCatalog() {
    if (!window.courseStructureHelper) return;
    const catalogContainer = document.getElementById('course-templates-catalog-list');
    if (!catalogContainer) return;

    const allTemplates = window.courseStructureHelper.getTemplatesList();
    if (!this.activeTemplateId) {
      const defaultTpl = window.courseStructureHelper.getDefaultTemplate();
      this.activeTemplateId = defaultTpl ? defaultTpl.id : 'template_default_official';
    }

    const filter = this.courseTemplateFilter || 'all';
    let filtered = allTemplates;
    if (filter === 'protected') {
      filtered = allTemplates.filter(t => t.isProtected || t.isDefault);
    } else if (filter === 'custom') {
      filtered = allTemplates.filter(t => !t.isProtected && !t.isDefault);
    }

    // Atualizar badges dos botões de filtro
    const countAll = document.getElementById('course-tpl-count-all');
    const countProtected = document.getElementById('course-tpl-count-protected');
    const countCustom = document.getElementById('course-tpl-count-custom');

    if (countAll) countAll.textContent = allTemplates.length;
    if (countProtected) countProtected.textContent = allTemplates.filter(t => t.isProtected || t.isDefault).length;
    if (countCustom) countCustom.textContent = allTemplates.filter(t => !t.isProtected && !t.isDefault).length;

    if (filtered.length === 0) {
      catalogContainer.innerHTML = `
        <div style="padding:2.5rem; text-align:center; color:var(--text-secondary);">
          Nenhuma estrutura de curso encontrada nesta categoria.
        </div>
      `;
      return;
    }

    let rowsHtml = filtered.map(t => {
      const isSelected = t.id === this.activeTemplateId;
      const isDefault = t.isDefault;
      const isProtected = t.isProtected;
      const modsCount = (t.modules || []).length;

      // Calcular carga horária total
      let totalH = 0;
      (t.modules || []).forEach(m => {
        (m.gestorTopics || []).forEach(gt => { totalH += parseFloat(gt.hours) || 0; });
      });

      const rowStyle = isSelected ? 
        'background: rgba(246, 168, 0, 0.12); border-left: 4px solid #F6A800; font-weight:600;' : 
        'cursor:pointer;';

      return `
        <tr onclick="app.selectCourseTemplateForEdit('${t.id}')" style="${rowStyle}">
          <!-- Status: modelo padrão ativo para novas capacitações -->
          <td style="text-align:center; vertical-align:middle;">
            ${isDefault ? '<span class="nav-badge badge-emerald font-bold" style="font-size:0.75rem; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Ativo</span>' : '<span class="nav-badge font-bold" style="font-size:0.75rem; background:rgba(166,166,166,0.15); color:var(--text-muted); display:inline-flex; align-items:center; gap:0.25rem;" title="Estrutura disponível; não é o modelo padrão para novas capacitações">Disponível</span>'}
          </td>
          <!-- Proteção: estrutura oficial protegida ou personalizada editável -->
          <td style="text-align:center; vertical-align:middle;">
            ${isProtected ? '<span class="nav-badge badge-blue font-bold" style="font-size:0.75rem; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Protegido</span>' : '<span class="nav-badge font-bold" style="font-size:0.75rem; background:rgba(255,255,255,0.08); display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 1-2 2v14a2 2 0 0 1 2 2h14a2 2 0 0 1 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editável</span>'}
          </td>
          <td style="text-align:left; vertical-align:middle;">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span style="font-weight:700; color:var(--text-primary); font-size:0.92rem;">${this.escapeHtml(t.name || 'Sem nome')}</span>
              ${!isProtected ? `
                <button type="button" class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); app.openRenameCourseTemplateModal('${t.id}')" style="padding:0.18rem 0.45rem; font-weight:600; font-size:0.75rem; display:inline-flex; align-items:center; gap:0.2rem;" title="Renomear nome e descrição desta estrutura">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5.5" width="16" height="12" rx="2.5"></rect><circle cx="6.5" cy="13" r="1.8"></circle><path d="M8.3 11.2v3.6"></path><path d="M10.3 9.2v5.6"></path><circle cx="12.3" cy="13" r="1.8"></circle><line x1="18" y1="2.5" x2="18" y2="21.5"></line><path d="M16 2.5h4"></path><path d="M16 21.5h4"></path></svg> Renomear
                </button>
              ` : ''}
              ${!isDefault ? `
                <button type="button" class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); app.confirmSetDefaultCourseTemplate('${t.id}')" style="padding:0.18rem 0.45rem; font-weight:600; font-size:0.75rem; color:var(--accent-emerald-text); display:inline-flex; align-items:center; gap:0.2rem;" title="Definir como o Modelo Padrão Ativo para novas capacitações">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Definir como Padrão
                </button>
              ` : ''}
            </div>
          </td>
          <td style="text-align:center; vertical-align:middle; font-weight:700;">
            ${modsCount} Módulos
          </td>
          <td style="text-align:center; vertical-align:middle; font-weight:700; color:var(--accent-blue-text);">
            ${totalH.toFixed(1).replace('.', ',')} h Total
          </td>
          <td style="text-align:center; vertical-align:middle; white-space:nowrap;" onclick="event.stopPropagation();">
            <div style="display:inline-grid; grid-template-columns: repeat(3, 1fr); gap:0.35rem; align-items:center; justify-content:center; white-space:nowrap; max-width: 260px; margin: 0 auto;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="app.duplicateCourseTemplate('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.78rem; display:inline-flex; align-items:center; justify-content:center; gap:0.25rem;" title="Duplicar esta estrutura para criar um modelo editável">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar
              </button>
              ${!isProtected ? `
                <button type="button" class="btn btn-secondary btn-sm" onclick="app.selectCourseTemplateForEdit('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.78rem; display:inline-flex; align-items:center; justify-content:center; gap:0.25rem;" title="Editar módulos desta estrutura">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar
                </button>
              ` : `
                <button type="button" class="btn btn-secondary btn-sm" onclick="app.selectCourseTemplateForEdit('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.78rem; display:inline-flex; align-items:center; justify-content:center; gap:0.25rem;" title="Visualizar estrutura e preview da tabela">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Visualizar
                </button>
              `}
              ${(!isProtected && !isDefault) ? `
                <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmDeleteCourseTemplate('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.75rem; display:inline-flex; align-items:center; justify-content:center;" title="Excluir estrutura personalizada">
                  ${window.icons.delete} Excluir
                </button>
              ` : '<div></div>'}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    catalogContainer.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width: 120px; text-align:center; vertical-align:middle;">Status</th>
              <th style="width: 120px; text-align:center; vertical-align:middle;">Proteção</th>
              <th style="text-align:left; vertical-align:middle;">Nome da Estrutura</th>
              <th style="width: 110px; text-align:center; vertical-align:middle;">Módulos</th>
              <th style="width: 130px; text-align:center; vertical-align:middle;">Carga Horária</th>
              <th style="width: 270px; text-align:center; vertical-align:middle; white-space:nowrap;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  selectCourseTemplateForEdit(templateId) {
    this.activeTemplateId = templateId;
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  openCreateCourseTemplateModal() {
    const modal = document.getElementById('modal-create-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeCreateCourseTemplateModal() {
    const modal = document.getElementById('modal-create-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  confirmCreateCourseTemplate() {
    const nameInput = document.getElementById('create-template-name');
    const descInput = document.getElementById('create-template-desc');
    const originRadios = document.getElementsByName('create-template-origin');
    if (!nameInput || !window.courseStructureHelper) return;

    const name = nameInput.value.trim();
    const desc = descInput ? descInput.value.trim() : '';
    let origin = 'template_default_official';
    for (const r of originRadios) {
      if (r.checked) origin = r.value;
    }

    if (!name) {
      this.showToast('Informe um nome para a estrutura.', 'warning');
      return;
    }

    const newTpl = window.courseStructureHelper.createTemplate(name, desc, origin);
    this.activeTemplateId = newTpl.id;
    this.closeCreateCourseTemplateModal();
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast(`Estrutura "${newTpl.name}" criada com sucesso!`, 'success');
  }

  openRenameCourseTemplateModal(templateId) {
    if (!window.courseStructureHelper) return;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);
    if (!tpl) return;

    if (tpl.isProtected) {
      this.showToast('O Modelo Padrão Protegido não pode ser renomeado. Duplique-o para editar.', 'warning');
      return;
    }

    this.setVal('rename-course-tpl-id', tpl.id);
    this.setVal('rename-course-tpl-name', tpl.name || '');
    this.setVal('rename-course-tpl-desc', tpl.description || '');

    const modal = document.getElementById('modal-rename-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
      const input = document.getElementById('rename-course-tpl-name');
      if (input) setTimeout(() => input.focus(), 100);
    }
  }

  closeRenameCourseTemplateModal() {
    const modal = document.getElementById('modal-rename-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (!modal.classList.contains('active')) {
          modal.style.display = 'none';
        }
      }, 200);
    }
  }

  saveRenameCourseTemplate() {
    if (!window.courseStructureHelper) return;
    const templateId = this.getVal('rename-course-tpl-id');
    const name = this.getVal('rename-course-tpl-name');
    const desc = this.getVal('rename-course-tpl-desc');

    if (!templateId || !name.trim()) {
      this.showToast('Por favor, informe o nome da estrutura.', 'warning');
      return;
    }

    const updated = window.courseStructureHelper.updateTemplateDetails(templateId, name, desc);
    if (updated) {
      this.closeRenameCourseTemplateModal();
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
      this.showToast(`Estrutura renomeada para "${updated.name}" com sucesso!`, 'success');
    }
  }

  duplicateCourseTemplate(templateId) {
    if (!window.courseStructureHelper) return;
    const newTpl = window.courseStructureHelper.duplicateTemplate(templateId);
    if (newTpl) {
      this.activeTemplateId = newTpl.id;
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
      this.showToast(`Estrutura duplicada como "${newTpl.name}"!`, 'success');
    }
  }

  confirmSetDefaultCourseTemplate(templateId) {
    if (!window.courseStructureHelper) return;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);
    if (!tpl) return;

    this.templateToSetDefaultId = templateId;

    const nameEl = document.getElementById('modal-set-default-tpl-name');
    const infoEl = document.getElementById('modal-set-default-tpl-info');

    if (nameEl) nameEl.textContent = tpl.name || 'Estrutura do Curso';
    if (infoEl) {
      let totalH = 0;
      (tpl.modules || []).forEach(m => {
        (m.gestorTopics || []).forEach(gt => { totalH += parseFloat(gt.hours) || 0; });
      });
      infoEl.textContent = `${tpl.modules ? tpl.modules.length : 0} Módulos • ${totalH.toFixed(1).replace('.', ',')} h Total`;
    }

    const modal = document.getElementById('modal-confirm-set-default-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeConfirmSetDefaultCourseTemplateModal() {
    this.templateToSetDefaultId = null;
    const modal = document.getElementById('modal-confirm-set-default-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (!modal.classList.contains('active')) {
          modal.style.display = 'none';
        }
      }, 200);
    }
  }

  executeSetDefaultCourseTemplateConfirmed() {
    if (!this.templateToSetDefaultId || !window.courseStructureHelper) return;
    const templateId = this.templateToSetDefaultId;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);

    window.courseStructureHelper.setDefaultTemplate(templateId);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast(`"${tpl ? tpl.name : 'Estrutura'}" definido como Modelo Padrão Ativo!`, 'success');
    this.closeConfirmSetDefaultCourseTemplateModal();
  }

  setDefaultCourseTemplate(templateId) {
    this.confirmSetDefaultCourseTemplate(templateId);
  }

  confirmDeleteCourseTemplate(templateId) {
    if (!window.courseStructureHelper) return;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);
    if (!tpl) return;
    if (tpl.isProtected) {
      this.showToast('Não é possível excluir o Modelo Padrão protegido.', 'error');
      return;
    }

    const tplName = tpl.name || 'Estrutura do Curso';

    this.openConfirmModal({
      title: 'Excluir Estrutura do Curso',
      msg: `Tem certeza que deseja excluir permanentemente a estrutura "${tplName}"?`,
      btnText: 'Sim, Excluir Estrutura',
      successTitle: 'Estrutura Excluída!',
      successMsg: `A estrutura "${tplName}" foi excluída com sucesso.`,
      onConfirm: () => {
        const ok = window.courseStructureHelper.deleteTemplate(templateId);
        if (ok) {
          this.activeTemplateId = 'template_default_official';
          this.renderCourseTemplatesCatalog();
          this.renderGlobalMasterCourseStructure();
          this.showToast(`Estrutura "${tplName}" excluída.`, 'info');
        } else {
          this.showToast('Não é possível excluir a estrutura.', 'error');
        }
      }
    });
  }

  closeConfirmDeleteCourseTemplateModal() {
    this.closeConfirmModal();
  }

  executeDeleteCourseTemplateConfirmed() {
    this.executeConfirmModalAction();
  }

  deleteCourseTemplate(templateId) {
    this.confirmDeleteCourseTemplate(templateId);
  }

  openSelectCourseTemplateModal() {
    if (!window.courseStructureHelper) return;
    const listContainer = document.getElementById('select-course-template-options-list');
    if (!listContainer) return;

    const templates = window.courseStructureHelper.getTemplatesList();
    listContainer.innerHTML = templates.map((t, idx) => `
      <label style="display:flex; align-items:flex-start; gap:0.75rem; padding:0.85rem; background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-md); cursor:pointer;">
        <input type="radio" name="select-training-template-radio" value="${t.id}" ${t.isDefault || idx === 0 ? 'checked' : ''} style="margin-top:0.25rem;">
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
            <strong style="color:var(--text-primary); font-size:0.92rem; display:inline-flex; align-items:center;">${t.isProtected ? window.icons.lock : ''}${this.escapeHtml(t.name)}</strong>
            ${t.isDefault ? '<span class="nav-badge badge-emerald font-bold" style="font-size:0.72rem;">Modelo Padrão Ativo</span>' : ''}
          </div>
          <div style="font-size:0.82rem; color:var(--text-secondary); line-height:1.35;">${this.escapeHtml(t.description || 'Estrutura com ' + (t.modules || []).length + ' módulos')}</div>
        </div>
      </label>
    `).join('');

    const modal = document.getElementById('modal-select-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeSelectCourseTemplateModal() {
    const modal = document.getElementById('modal-select-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async confirmSelectCourseTemplateForTraining() {
    if (!this.currentTraining || !window.courseStructureHelper) return;
    const radios = document.getElementsByName('select-training-template-radio');
    let selectedId = null;
    for (const r of radios) {
      if (r.checked) selectedId = r.value;
    }

    if (!selectedId) return;

    const tpl = window.courseStructureHelper.getTemplateById(selectedId);
    if (!tpl) return;

    // Gerar cópia profunda independente da estrutura selecionada
    this.currentTraining.courseModules = window.courseStructureHelper.makeDeepCopy(tpl.modules);
    this.currentTraining.baseTemplateId = tpl.id;
    this.currentTraining.baseTemplateName = tpl.name;
    this.currentTraining.isCustomized = false;

    this.renderCourseStructureStep();
    if (window.db) {
      await window.db.saveTrainingFull(this.currentTraining, `Cópia independente da estrutura "${tpl.name}"`);
    }
    this.closeSelectCourseTemplateModal();
    this.showToast(`Cópia da estrutura "${tpl.name}" aplicada a esta capacitação!`, 'success');
  }

  renderGlobalMasterCourseStructure() {
    if (!window.courseStructureHelper) return;

    if (!this.activeTemplateId) {
      const defaultTpl = window.courseStructureHelper.getDefaultTemplate();
      this.activeTemplateId = defaultTpl ? defaultTpl.id : 'template_default_official';
    }

    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    const masterMods = activeTpl ? window.courseStructureHelper.normalize(activeTpl.modules || []) : [];

    const titleEl = document.getElementById('active-template-editor-title');
    const descEl = document.getElementById('active-template-editor-desc');
    const actionsEl = document.getElementById('active-template-editor-actions');
    const bannerEl = document.getElementById('active-template-protection-banner');

    if (titleEl && activeTpl) {
      titleEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> <span>Estrutura Selecionada: ${this.escapeHtml(activeTpl.name)}</span> ${activeTpl.isProtected ? '<span class="nav-badge badge-blue font-bold" style="font-size:0.75rem; margin-left:0.5rem; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Modelo Padrão Protegido</span>' : ''}`;
    }
    if (descEl && activeTpl) {
      descEl.textContent = activeTpl.description || 'Estrutura de curso cadastrada no sistema';
    }

    if (bannerEl) {
      bannerEl.style.display = 'none';
      bannerEl.innerHTML = '';
    }

    if (actionsEl && activeTpl) {
      if (!activeTpl.isProtected) {
        actionsEl.innerHTML = `
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.openRenameCourseTemplateModal('${activeTpl.id}')" style="font-weight:600; display:inline-flex; align-items:center; gap:0.35rem;" title="Renomear nome e descrição da estrutura">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5.5" width="16" height="12" rx="2.5"></rect><circle cx="6.5" cy="13" r="1.8"></circle><path d="M8.3 11.2v3.6"></path><path d="M10.3 9.2v5.6"></path><circle cx="12.3" cy="13" r="1.8"></circle><line x1="18" y1="2.5" x2="18" y2="21.5"></line><path d="M16 2.5h4"></path><path d="M16 21.5h4"></path></svg> Renomear
          </button>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.toggleMasterCourseEditor()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;">
            ${this.isMasterCourseEditorOpen ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluir Edição' : '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar Estrutura'}
          </button>
        `;
      } else {
        actionsEl.innerHTML = `
          <button type="button" class="btn btn-primary btn-sm" onclick="app.duplicateCourseTemplate('${activeTpl.id}')" style="font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar Estrutura
          </button>
        `;
      }
    }

    const editorContainer = document.getElementById('global-master-course-editor');
    const tableContainer = document.getElementById('global-master-course-table-preview');

    if (editorContainer) {
      editorContainer.style.display = (this.isMasterCourseEditorOpen && activeTpl && !activeTpl.isProtected) ? 'block' : 'none';
    }

    if (editorContainer) {
      if (masterMods.length === 0) {
        editorContainer.innerHTML = `
          <div style="text-align:center; padding:2.5rem; background:var(--bg-input); border:1px dashed var(--border-color); border-radius:var(--radius-md);">
            <p style="color:var(--text-secondary); margin-bottom:1rem;">Esta estrutura está vazia.</p>
            <button class="btn btn-primary btn-sm" onclick="app.addGlobalMasterCourseModule()">+ Adicionar Primeiro Módulo</button>
          </div>
        `;
      } else {
        editorContainer.innerHTML = masterMods.map((mod, modIdx) => {
          const gTopics = mod.gestorTopics || [];
          const cTopics = mod.cacsTopics || [];

          const gTotalHours = gTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);
          const cTotalHours = cTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);

          return `
            <div class="course-mod-card" data-mod-id="${mod.id}">
              <!-- Cabeçalho do Card do Módulo Mestre -->
              <div class="course-mod-header">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span class="nav-badge badge-blue font-bold" style="font-size:0.9rem; padding:0.25rem 0.65rem;">
                    Módulo ${mod.moduleNumber || `0${modIdx + 1}`}
                  </span>
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    <label style="font-size:0.78rem; color:var(--text-muted); margin:0;">Identificador:</label>
                    <input type="text" class="form-control form-control-sm" style="width:70px; text-align:center; font-weight:700;" value="${mod.moduleNumber || `0${modIdx + 1}`}" onchange="app.updateGlobalMasterCourseModuleNumber(${modIdx}, this.value)">
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveGlobalMasterCourseModule(${modIdx}, -1)" ${modIdx === 0 ? 'disabled' : ''} title="Mover para cima" style="padding:0.2rem 0.5rem;">↑</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveGlobalMasterCourseModule(${modIdx}, 1)" ${modIdx === masterMods.length - 1 ? 'disabled' : ''} title="Mover para baixo" style="padding:0.2rem 0.5rem;">↓</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.duplicateGlobalMasterCourseModule(${modIdx})" title="Duplicar Módulo com todas as temáticas" style="padding:0.2rem 0.55rem; font-weight:600; display:inline-flex; align-items:center; gap:0.25rem;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.deleteGlobalMasterCourseModule(${modIdx})" title="Excluir Módulo" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    ${window.icons.delete}
                  </button>
                </div>
              </div>

              <!-- Checkbox de Módulo Compartilhado -->
              <div style="margin:0.75rem 0 1rem 0; padding:0.5rem 0.75rem; background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.2); border-radius:var(--radius-md);">
                <label style="display:flex; align-items:center; gap:0.55rem; font-weight:700; font-size:0.86rem; color:var(--text-primary); cursor:pointer; margin:0;">
                  <input type="checkbox" ${mod.isShared ? 'checked' : ''} onchange="app.toggleGlobalMasterCourseModuleShared(${modIdx}, this.checked)">
                  <span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:0.25rem;"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>Módulo compartilhado entre Gestores e CACS (mesmo conteúdo e carga horária)</span>
                </label>
              </div>

              ${mod.isShared ? `
                <!-- Bloco Único: Módulo Compartilhado -->
                <div style="background:var(--bg-input); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem; margin-bottom:0.75rem;">
                    <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg> Temática do Módulo Compartilhado
                    </strong>
                    <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                      Carga Horária: ${gTotalHours.toFixed(1).replace('.', ',')} h
                    </span>
                  </div>

                  <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${gTopics.map((t, tIdx) => `
                      <div class="course-topic-item">
                        <input type="text" class="form-control form-control-sm" placeholder="Temática do Módulo" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'shared', ${tIdx}, 'topic', this.value)">
                        <div style="display:flex; align-items:center; gap:0.25rem;">
                          <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'shared', ${tIdx}, 'hours', this.value)">
                          <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeGlobalMasterCourseTopic(${modIdx}, 'shared', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center; justify-content:center;" title="Remover Temática">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    `).join('')}
                  </div>

                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.addGlobalMasterCourseTopic(${modIdx}, 'shared')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.5rem;">
                    + Adicionar Temática
                  </button>
                </div>
              ` : `
                <!-- Grade Dupla: Módulo Específico por Público (Gestor vs CACS) -->
                <div class="course-mod-grid">
                  <!-- Coluna Gestores Municipais -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="7" r="4"></circle><path d="M15.5 14H5a4 4 0 0 0-4 4v3h10"></path><circle cx="18" cy="18" r="2"></circle><path d="M18 14.5v1M18 20.5v1M14.5 18h1M20.5 18h1M15.5 15.5l.7.7M19.8 19.8l.7.7M15.5 20.5l.7-.7M19.8 16.2l.7-.7"></path></svg> Gestão Municipal (Gestores)
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                        Total: ${gTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${gTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para Gestores" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeGlobalMasterCourseTopic(${modIdx}, 'gestor', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center; justify-content:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addGlobalMasterCourseTopic(${modIdx}, 'gestor')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem;">
                      + Adicionar Temática Gestor
                    </button>
                  </div>

                  <!-- Coluna Conselheiros CACS-FUNDEB -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-emerald-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Conselheiros CACS-FUNDEB
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(16,185,129,0.15); color:var(--accent-emerald-text);">
                        Total: ${cTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${cTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para CACS" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeGlobalMasterCourseTopic(${modIdx}, 'cacs', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center; justify-content:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addGlobalMasterCourseTopic(${modIdx}, 'cacs')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem;">
                      + Adicionar Temática CACS
                    </button>
                  </div>
                </div>
              `}
            </div>
          `;
        }).join('');
      }
    }

    if (tableContainer && window.statsEngine) {
      tableContainer.innerHTML = window.statsEngine.generateTable2Html(masterMods);
    }
  }

  toggleMasterCourseEditor(forceState) {
    if (forceState !== undefined) {
      this.isMasterCourseEditorOpen = !!forceState;
    } else {
      this.isMasterCourseEditorOpen = !this.isMasterCourseEditorOpen;
    }
    this.renderGlobalMasterCourseStructure();
  }

  addGlobalMasterCourseModule() {
    if (!window.courseStructureHelper) return;
    this.isMasterCourseEditorOpen = true;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    const masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const nextNum = masterMods.length + 1;
    const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

    masterMods.push({
      id: `mod_tpl_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      moduleNumber: numStr,
      order: nextNum,
      isShared: true,
      gestorTopics: [
        { id: `top_g_${Date.now()}_1`, topic: 'Nova Temática Módulo', hours: 2.0 }
      ],
      cacsTopics: [
        { id: `top_c_${Date.now()}_1`, topic: 'Nova Temática Módulo', hours: 2.0 }
      ]
    });

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast(`Módulo ${numStr} adicionado à estrutura "${activeTpl.name}"!`, 'success');
  }

  duplicateGlobalMasterCourseModule(modIdx) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    masterMods = window.courseStructureHelper.duplicateModule(masterMods, modIdx);

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast('Módulo duplicado com sucesso!', 'success');
  }

  deleteGlobalMasterCourseModule(modIdx) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    const modName = mod ? `Módulo ${mod.moduleNumber || mod.number || modIdx + 1}` : 'este módulo';

    this.openConfirmModal({
      title: 'Remover Módulo da Matriz',
      msg: `Deseja realmente remover ${modName} da estrutura "${activeTpl.name}"?`,
      btnText: 'Sim, Remover Módulo',
      successTitle: 'Módulo Removido!',
      successMsg: 'O módulo foi removido da matriz com sucesso.',
      onConfirm: () => {
        masterMods.splice(modIdx, 1);
        masterMods = window.courseStructureHelper.autoRenumber(masterMods);
        window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
        this.renderCourseTemplatesCatalog();
        this.renderGlobalMasterCourseStructure();
        this.showToast('Módulo removido da estrutura.', 'info');
      }
    });
  }

  moveGlobalMasterCourseModule(modIdx, direction) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const targetIdx = modIdx + direction;
    if (targetIdx < 0 || targetIdx >= masterMods.length) return;

    const temp = masterMods[modIdx];
    masterMods[modIdx] = masterMods[targetIdx];
    masterMods[targetIdx] = temp;
    masterMods = window.courseStructureHelper.autoRenumber(masterMods);

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  updateGlobalMasterCourseModuleNumber(modIdx, newNumber) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    const masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    if (masterMods[modIdx]) {
      masterMods[modIdx].moduleNumber = (newNumber || '').trim();
      window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
    }
  }

  toggleGlobalMasterCourseModuleShared(modIdx, isChecked) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    if (isChecked) {
      const gStr = JSON.stringify((mod.gestorTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      const cStr = JSON.stringify((mod.cacsTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      if (gStr !== cStr) {
        if (!confirm('Este módulo possui temáticas diferentes para Gestores e CACS.\n\nAo torná-lo compartilhado, as temáticas da Gestão Municipal serão aplicadas aos dois públicos. Deseja continuar?')) {
          this.renderGlobalMasterCourseStructure();
          return;
        }
      }
      mod.isShared = true;
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
    } else {
      mod.isShared = false;
      if (!mod.cacsTopics || mod.cacsTopics.length === 0) {
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
      }
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  addGlobalMasterCourseTopic(modIdx, type) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    const newTopic = { id: `top_${Date.now()}`, topic: '', hours: 1.0 };

    if (type === 'shared' || mod.isShared) {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else if (type === 'gestor') {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
    } else {
      if (!mod.cacsTopics) mod.cacsTopics = [];
      mod.cacsTopics.push(newTopic);
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  removeGlobalMasterCourseTopic(modIdx, type, topicIdx) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics) {
        mod.gestorTopics.splice(topicIdx, 1);
        if (mod.gestorTopics.length === 0) mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
      }
    } else if (type === 'gestor' && mod.gestorTopics) {
      mod.gestorTopics.splice(topicIdx, 1);
      if (mod.gestorTopics.length === 0) mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
    } else if (type === 'cacs' && mod.cacsTopics) {
      mod.cacsTopics.splice(topicIdx, 1);
      if (mod.cacsTopics.length === 0) mod.cacsTopics.push({ id: `top_c_${Date.now()}`, topic: '', hours: 0 });
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  updateGlobalMasterCourseTopic(modIdx, type, topicIdx, field, value) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics && mod.gestorTopics[topicIdx]) {
        if (field === 'hours') mod.gestorTopics[topicIdx].hours = parseFloat(value) || 0;
        else mod.gestorTopics[topicIdx].topic = value;
      }
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else {
      const list = type === 'gestor' ? mod.gestorTopics : mod.cacsTopics;
      if (list && list[topicIdx]) {
        if (field === 'hours') list[topicIdx].hours = parseFloat(value) || 0;
        else list[topicIdx].topic = value;
      }
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  resetGlobalMasterCourseStructure() {
    if (!window.courseStructureHelper) return;
    if (confirm('Deseja restaurar o Modelo Padrão Global para a matriz oficial original do CECATE-CO (4 módulos)?')) {
      const defaultCopy = window.courseStructureHelper.getDefaultCopy();
      window.courseStructureHelper.saveMasterStructure(defaultCopy);
      this.renderGlobalMasterCourseStructure();
      this.showToast('Modelo Padrão Global restaurado com sucesso!', 'success');
    }
  }

  /* ==========================================================================
     ETAPA 6: INSCRIÇÃO & LISTA DE PRESENÇA (UPLOAD & TABELA 4)
     ========================================================================== */
  reprocessDataStep6() {
    if (!this.currentTraining) return;

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    if (regList.length === 0 && attList.length === 0) {
      this.showToast('Nenhuma planilha de inscrição ou presença carregada para reprocessar.', 'warning');
      return;
    }

    this.showToast('Reprocessando e recalculando totais de inscritos e presentes...');

    // Recalcular a reconciliação entre inscritos e presentes
    this.reconcileMunicipalitiesFromRegistrationAndAttendance();

    // Re-renderizar Etapa 6
    this.renderAttendanceStep();
    this.saveCurrentStepData();

    this.showToast(`Reprocessamento concluído! (${regList.length} inscritos | ${attList.length} presentes recalculados)`, 'success');
  }

  initDragAndDropHandlers() {
    // Configurar manipuladores de arrastar e soltar (Drag & Drop) para todas as zonas de upload
    const dropzones = document.querySelectorAll('.upload-dropzone');
    dropzones.forEach(dropzone => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
          dropzone.classList.add('dragover');
          dropzone.style.borderColor = 'var(--accent-blue)';
          dropzone.style.background = 'rgba(246, 168, 0, 0.15)';
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
          dropzone.classList.remove('dragover');
          dropzone.style.borderColor = '';
          dropzone.style.background = '';
        }, false);
      });

      dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const input = dropzone.querySelector('input[type="file"]');

        if (input) {
          try {
            const container = new DataTransfer();
            container.items.add(file);
            input.files = container.files;

            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
          } catch (err) {
            console.warn('Fallback manual para leitura de arquivo via drag & drop:', err);
            // Fallback caso DataTransfer não seja suportado em browsers legados
            if (input.id === 'file-input-registration') {
              this.handleRegistrationFileUpload({ target: { files: [file] } });
            } else if (input.id === 'file-input-attendance') {
              this.handleAttendanceFileUpload({ target: { files: [file] } });
            } else if (input.id === 'file-input-evaluation') {
              this.handleEvaluationFileUpload({ target: { files: [file] } });
            }
          }
        }
      }, false);
    });
  }

  /**
   * Checklist de segurança (Configurações): verificações ao vivo antes de aplicar a migração 0005
   */
  async renderSecurityChecklist() {
    const ul = document.getElementById('security-checklist');
    if (!ul) return;
    const C = window.CapacitaTE;
    const items = [];
    const add = (ok, text) => items.push({ ok, text });
    const logged = !!(C && C.auth && C.auth.mode === 'authenticated');
    add(logged, logged ? 'Você está logado.' : 'Você não está logado (entre com e-mail e senha).');
    add(logged && C.auth.isAdmin && C.auth.isAdmin(), logged && C.auth.isAdmin && C.auth.isAdmin() ? 'Você está logado como administrador.' : 'Você precisa estar logado como administrador.');
    try {
      const client = C && C.supabaseClient ? C.supabaseClient.get() : null;
      if (client && logged) {
        const { data, error } = await client.from('profiles').select('user_id').eq('is_admin', true).eq('is_active', true);
        add(!error && (data || []).length >= 1, error ? 'Não foi possível consultar os administradores.' : `Administradores ativos: ${(data || []).length}.`);
        const t = await client.from('trainings').select('id').limit(1);
        add(!t.error, t.error ? 'Sincronização autenticada falhou.' : 'Sincronização autenticada funcionando.');
      }
      if (typeof SUPABASE_CONFIG !== 'undefined') {
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/people?select=cpf&limit=1`, { headers: { apikey: SUPABASE_CONFIG.anonKey, Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}` } });
        const body = res.ok ? await res.json().catch(() => []) : [];
        const blocked = !res.ok || (Array.isArray(body) && body.length === 0);
        add(blocked, blocked ? 'Sem login, a tabela de pessoas não devolve dados (correto).' : 'ATENÇÃO: sem login, a tabela de pessoas devolve dados.');
        const tr = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/trainings?select=id&limit=1`, { headers: { apikey: SUPABASE_CONFIG.anonKey, Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}` } });
        const trBody = tr.ok ? await tr.json().catch(() => []) : [];
        const trBlocked = !tr.ok || (Array.isArray(trBody) && trBody.length === 0);
        add(trBlocked, trBlocked ? 'Segurança final (0005) aplicada: capacitações protegidas.' : 'Segurança final (0005) ainda não aplicada: capacitações legíveis sem login.');
      }
    } catch (err) {
      add(false, `Não foi possível concluir a verificação: ${err.message}`);
    }
    ul.textContent = '';
    items.forEach(i => {
      const li = document.createElement('li');
      li.style.cssText = 'font-size:0.88rem; display:flex; gap:0.5rem;';
      const mark = document.createElement('strong');
      mark.textContent = i.ok ? 'OK' : 'ATENÇÃO';
      mark.style.color = i.ok ? 'var(--accent-emerald-text)' : 'var(--accent-amber-text)';
      const t = document.createElement('span');
      t.textContent = i.text;
      li.append(mark, t);
      ul.appendChild(li);
    });
  }

  /**
   * Fase 5: "Usar dados do CapacitaTE". Busca as respostas no Supabase, monta as linhas no mesmo formato da exportação
   * em Excel e entrega ao MESMO parser do upload, então o cálculo do relatório não muda.
   */
  async importFromCapacitaTE(kind) {
    const mod = { inscricao: 'inscricao', presenca: 'presenca', avaliacao: 'avaliacao' }[kind];
    const handler = { inscricao: 'handleRegistrationFileUpload', presenca: 'handleAttendanceFileUpload', avaliacao: 'handleEvaluationFileUpload' }[kind];
    if (!mod || !this.currentTraining) return;
    const C = window.CapacitaTE;
    try {
      const client = C && C.supabaseClient ? C.supabaseClient.get() : null;
      if (!client || !C.auth || C.auth.mode !== 'authenticated') {
        this.showToast('Entre com a sua conta para usar os dados do CapacitaTE.', 'warning');
        return;
      }
      if (!C.can(mod, 'view', this.currentTraining.id)) {
        this.showToast('Você não tem permissão para ver essas respostas.', 'warning');
        return;
      }
      this.showToast('Buscando as respostas no CapacitaTE...');
      const rows = await C.xlsxExport.fetchRows(client, mod, this.currentTraining.id);
      if (rows.length <= 1) {
        this.showToast('O CapacitaTE ainda não tem respostas deste formulário para esta capacitação.', 'warning');
        return;
      }
      await this[handler]({ rows, source: 'capacitate' });
    } catch (err) {
      console.error('Erro ao usar dados do CapacitaTE:', err);
      this.showToast(`Não foi possível buscar os dados: ${err.message || err}`, 'error');
    }
  }

  async handleRegistrationFileUpload(event) {
    const file = event.target && event.target.files ? event.target.files[0] : null;
    const fromRows = event.rows || null; // linhas montadas a partir dos dados do CapacitaTE (Supabase)
    if ((!file && !fromRows) || !window.excelParser) return;

    try {
      this.showToast('Lendo planilha de inscrições...');
      let firstSheet = fromRows;
      if (!firstSheet) {
        const { sheets, sheetNames } = await window.excelParser.readWorkbook(file);
        firstSheet = sheets[sheetNames[0]];
      }

      const parsed = window.excelParser.parseRegistrationRows(firstSheet, null, this.currentTraining.uf || 'MT');
      if (parsed.length === 0) {
        this.showToast('Nenhum registro de inscrição identificado na planilha.', 'warning');
        return;
      }

      this.currentTraining.registrations = parsed;
      this.currentTraining.sources = Object.assign({}, this.currentTraining.sources, { inscricao: fromRows ? 'capacitate' : 'arquivo' });

      // Reconciliar inscritos e presentes na lista de municípios
      this.reconcileMunicipalitiesFromRegistrationAndAttendance();

      this.renderAttendanceStep();
      this.saveCurrentStepData();

      const regCacs = parsed.filter(r => (r.representation || '').toUpperCase().includes('CACS') || (r.representation || '').toUpperCase().includes('FUNDEB')).length;
      const regGestores = parsed.length - regCacs;
      this.showToast(`${parsed.length} inscrições importadas (${regCacs} CACS, ${regGestores} Gestão). Tabela 4 atualizada!`, 'success');
    } catch (err) {
      console.error('Erro ao importar planilha de inscrições:', err);
      this.showToast(`Erro na importação de inscrições: ${err.message}`, 'error');
    }
  }

  async handleAttendanceFileUpload(event) {
    const file = event.target && event.target.files ? event.target.files[0] : null;
    const fromRows = event.rows || null; // linhas montadas a partir dos dados do CapacitaTE (Supabase)
    if ((!file && !fromRows) || !window.excelParser) return;

    try {
      this.showToast('Lendo planilha de presença...');
      let firstSheet = fromRows;
      if (!firstSheet) {
        const { sheets, sheetNames } = await window.excelParser.readWorkbook(file);
        firstSheet = sheets[sheetNames[0]];
      }

      const parsed = window.excelParser.parseAttendanceRows(firstSheet, null, this.currentTraining.uf || 'MT');
      if (parsed.length === 0) {
        this.showToast('Nenhum registro de participante identificado na planilha.', 'warning');
        return;
      }

      this.currentTraining.attendance = parsed;
      this.currentTraining.sources = Object.assign({}, this.currentTraining.sources, { presenca: fromRows ? 'capacitate' : 'arquivo' });

      // Reconciliar presença com a lista de municípios
      this.reconcileMunicipalitiesFromRegistrationAndAttendance();

      this.renderAttendanceStep();
      this.saveCurrentStepData();

      const attCacs = parsed.filter(a => (a.representation || '').toUpperCase().includes('CACS') || (a.representation || '').toUpperCase().includes('FUNDEB')).length;
      const attGestores = parsed.length - attCacs;
      this.showToast(`${parsed.length} participantes presentes importados (${attCacs} CACS, ${attGestores} Gestão). Tabela 4 reconciliada!`, 'success');
    } catch (err) {
      console.error('Erro ao importar lista de presença:', err);
      this.showToast(`Erro na importação: ${err.message}`, 'error');
    }
  }

  openConfirmModal({ title, msg, btnText = 'Sim, Remover', successTitle = 'Exclusão Concluída!', successMsg = 'O item foi removido com sucesso.', onConfirm }) {
    const overlay = document.getElementById('app-confirm-modal-overlay');
    const card = document.getElementById('app-confirm-modal-card');
    const titleEl = document.getElementById('app-confirm-modal-title');
    const msgEl = document.getElementById('app-confirm-modal-msg');
    const btnAction = document.getElementById('app-confirm-modal-btn-action');

    const iconContainer = document.getElementById('app-confirm-modal-icon-container');
    const iconAlert = document.getElementById('app-confirm-modal-icon-alert');
    const iconLoading = document.getElementById('app-confirm-modal-icon-loading');
    const iconSuccess = document.getElementById('app-confirm-modal-icon-success');

    const progressContainer = document.getElementById('app-confirm-modal-progress-container');
    const progressBar = document.getElementById('app-confirm-modal-progress-bar');
    const progressText = document.getElementById('app-confirm-modal-progress-text');

    const actionsInitial = document.getElementById('app-confirm-modal-actions-initial');
    const actionsSuccess = document.getElementById('app-confirm-modal-actions-success');

    // Resetar para Fase 1 (Pergunta inicial de confirmação)
    if (card) card.style.borderColor = 'rgba(244, 63, 94, 0.35)';
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = msg;
    if (btnAction) {
      btnAction.textContent = btnText;
      btnAction.style.setProperty('color', '#ffffff', 'important');
    }

    if (iconContainer) {
      iconContainer.style.background = 'rgba(244, 63, 94, 0.15)';
      iconContainer.style.color = '#f43f5e';
    }
    if (iconAlert) iconAlert.style.display = 'flex';
    if (iconLoading) iconLoading.style.display = 'none';
    if (iconSuccess) iconSuccess.style.display = 'none';

    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
    if (progressText) progressText.textContent = 'Removendo...';

    if (actionsInitial) actionsInitial.style.display = 'flex';
    if (actionsSuccess) actionsSuccess.style.display = 'none';

    this.onConfirmCallback = onConfirm;
    this.confirmSuccessTitle = successTitle;
    this.confirmSuccessMsg = successMsg;
    this.isConfirmModalProcessing = false;

    if (overlay) overlay.style.display = 'flex';
  }

  closeConfirmModal() {
    if (this.isConfirmModalProcessing) return; // Não fechar enquanto a barra de carregamento roda
    const overlay = document.getElementById('app-confirm-modal-overlay');
    if (overlay) overlay.style.display = 'none';
    this.onConfirmCallback = null;
    this.isConfirmModalProcessing = false;
  }

  executeConfirmModalAction() {
    if (this.isConfirmModalProcessing) return;
    this.isConfirmModalProcessing = true;

    const card = document.getElementById('app-confirm-modal-card');
    const titleEl = document.getElementById('app-confirm-modal-title');
    const msgEl = document.getElementById('app-confirm-modal-msg');
    const iconContainer = document.getElementById('app-confirm-modal-icon-container');
    const iconAlert = document.getElementById('app-confirm-modal-icon-alert');
    const iconLoading = document.getElementById('app-confirm-modal-icon-loading');
    const iconSuccess = document.getElementById('app-confirm-modal-icon-success');

    const progressContainer = document.getElementById('app-confirm-modal-progress-container');
    const progressBar = document.getElementById('app-confirm-modal-progress-bar');
    const progressText = document.getElementById('app-confirm-modal-progress-text');

    const actionsInitial = document.getElementById('app-confirm-modal-actions-initial');
    const actionsSuccess = document.getElementById('app-confirm-modal-actions-success');

    // FASE 2: BARRA DE CARREGAMENTO
    if (actionsInitial) actionsInitial.style.display = 'none';
    if (titleEl) titleEl.textContent = 'Removendo...';
    if (msgEl) msgEl.textContent = 'Aguarde enquanto a exclusão é processada com segurança.';

    if (card) card.style.borderColor = 'rgba(246, 168, 0, 0.35)';
    if (iconContainer) {
      iconContainer.style.background = 'rgba(246, 168, 0, 0.15)';
      iconContainer.style.color = '#F6A800';
    }
    if (iconAlert) iconAlert.style.display = 'none';
    if (iconLoading) iconLoading.style.display = 'flex';

    if (progressContainer) progressContainer.style.display = 'block';
    if (progressBar) {
      progressBar.style.width = '0%';
      setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
      }, 50);
    }

    // Executar a exclusão efetiva dos dados
    if (typeof this.onConfirmCallback === 'function') {
      try {
        this.onConfirmCallback();
      } catch (err) {
        console.error('Erro ao executar exclusão:', err);
      }
    }

    // FASE 3: CONFIRMAÇÃO DE SUCESSO COM BOTÃO OK
    setTimeout(() => {
      this.isConfirmModalProcessing = false;

      if (progressContainer) progressContainer.style.display = 'none';

      if (card) card.style.borderColor = 'rgba(16, 185, 129, 0.35)';
      if (iconContainer) {
        iconContainer.style.background = 'rgba(16, 185, 129, 0.15)';
        iconContainer.style.color = '#10b981';
      }
      if (iconLoading) iconLoading.style.display = 'none';
      if (iconSuccess) iconSuccess.style.display = 'flex';

      if (titleEl) titleEl.textContent = this.confirmSuccessTitle || 'Exclusão Concluída!';
      if (msgEl) msgEl.textContent = this.confirmSuccessMsg || 'O item foi removido com sucesso.';

      if (actionsSuccess) {
        actionsSuccess.style.display = 'flex';
        const okBtn = document.getElementById('app-confirm-modal-btn-ok');
        if (okBtn) okBtn.focus();
      }
    }, 750);
  }

  clearStep6Data(type = 'all') {
    if (!this.currentTraining) return;

    let title = 'Remover Arquivos e Listas';
    let msg = 'Tem certeza que deseja remover todas as planilhas importadas (Inscrição e Presença) e limpar as listas de participantes e estatísticas?';
    let successTitle = 'Planilhas Removidas!';
    let successMsg = 'As planilhas e a lista de participantes foram excluídas com sucesso.';

    if (type === 'registration') {
      title = 'Remover Planilha de Inscrições';
      msg = 'Tem certeza que deseja remover a Planilha de Inscrições e limpar a lista de inscritos?';
      successTitle = 'Inscrições Removidas!';
      successMsg = 'A planilha de inscrições foi excluída com sucesso.';
    } else if (type === 'attendance') {
      title = 'Remover Planilha de Presença';
      msg = 'Tem certeza que deseja remover a Planilha de Presença e limpar a lista de presentes?';
      successTitle = 'Presença Removida!';
      successMsg = 'A planilha de presença foi excluída com sucesso.';
    }

    this.openConfirmModal({
      title,
      msg,
      btnText: 'Sim, Remover',
      successTitle,
      successMsg,
      onConfirm: () => this.executeClearStep6Data(type)
    });
  }

  executeClearStep6Data(type = 'all') {
    if (!this.currentTraining) return;

    if (type === 'all' || type === 'registration') {
      this.currentTraining.registrations = [];
      const inputReg = document.getElementById('file-input-registration');
      if (inputReg) inputReg.value = '';
    }

    if (type === 'all' || type === 'attendance') {
      this.currentTraining.attendance = [];
      const inputAtt = document.getElementById('file-input-attendance');
      if (inputAtt) inputAtt.value = '';
    }

    // Reconciliar e purgar municípios inválidos
    this.reconcileMunicipalitiesFromRegistrationAndAttendance();

    this.renderAttendanceStep();
    this.saveCurrentStepData();
    this.showToast('Arquivos e listas limpos com sucesso!', 'success');
  }

  reconcileMunicipalitiesFromRegistrationAndAttendance() {
    if (!this.currentTraining) return;
    if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];

    // Helper interno de normalização de nome de município (remove sufixos UF, acentuação e caracteres especiais)
    const normalizeMunName = (name) => {
      if (!name) return '';
      return String(name)
        .replace(/\s*\([A-Z]{2}\)\s*/gi, '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();
    };

    // Helper interno de normalização de nome de pessoa
    const normalizePersonName = (name) => {
      if (!name) return '';
      return String(name)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();
    };

    // Helper de busca de município existente na lista
    const findMatchingMunicipality = (list, name, ibgeCode) => {
      if (!Array.isArray(list)) return null;
      const cleanIbge = ibgeCode ? String(ibgeCode).replace(/\D/g, '') : '';
      const normTarget = normalizeMunName(name);

      return list.find(m => {
        if (cleanIbge && m.ibgeCode) {
          const mIbge = String(m.ibgeCode).replace(/\D/g, '');
          if (mIbge && mIbge === cleanIbge) return true;
        }
        if (normTarget && m.name) {
          if (normalizeMunName(m.name) === normTarget) return true;
        }
        return false;
      });
    };

    // Purga proativa de entradas de municípios inválidos/declarações
    this.currentTraining.municipalities = this.currentTraining.municipalities.filter(m => {
      const n = (m.name || '').toLowerCase();
      return !n.includes('declaro') && !n.includes('veracidade') && !n.includes('confirmo') && !n.includes('prestadas') && !n.includes('formulario') && !n.includes('termo') && n.length <= 45;
    });

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    // Mapas de inscritos por CPF e por Nome Normalizado
    const regMapByCpf = new Map();
    const regMapByName = new Map();

    regList.forEach(reg => {
      if (reg.cpf) {
        const cleanCpf = reg.cpf.replace(/\D/g, '').padStart(11, '0');
        if (cleanCpf && cleanCpf.length === 11) {
          regMapByCpf.set(cleanCpf, reg);
        }
      }
      if (reg.name) {
        const normName = normalizePersonName(reg.name);
        if (normName.length > 5) {
          regMapByName.set(normName, reg);
        }
      }
    });

    // Cruzar dados da lista de presença com a inscrição por CPF (e fallback por nome completo)
    attList.forEach(att => {
      const cleanCpf = att.cpf ? att.cpf.replace(/\D/g, '').padStart(11, '0') : '';
      const normName = att.name ? normalizePersonName(att.name) : '';

      let matchedReg = null;
      if (cleanCpf && cleanCpf.length === 11 && regMapByCpf.has(cleanCpf)) {
        matchedReg = regMapByCpf.get(cleanCpf);
      } else if (normName && normName.length > 5 && regMapByName.has(normName)) {
        matchedReg = regMapByName.get(normName);
      }

      if (matchedReg) {
        // Priorizar dados cadastrais canônicos da inscrição
        if (matchedReg.name) att.name = matchedReg.name;
        if (matchedReg.municipality) {
          att.municipality = matchedReg.municipality;
          if (matchedReg.ibgeCode) att.ibgeCode = matchedReg.ibgeCode;
        }
        if (matchedReg.representation) att.representation = matchedReg.representation;
        if (matchedReg.roleGestao) att.roleGestao = matchedReg.roleGestao;
        if (matchedReg.roleCACS) att.roleCACS = matchedReg.roleCACS;
        if (window.excelParser) att.cpf = window.excelParser.formatCpf(att.cpf || matchedReg.cpf);
        att.matchedByCpf = true;
        att.isCpfValidated = true;
      } else if (window.excelParser && att.cpf) {
        att.cpf = window.excelParser.formatCpf(att.cpf);
      }
    });

    // Agrupar inscritos por município (chave normalizada para casar variações de escrita e sufixos de UF)
    const regMap = new Map();
    regList.forEach(reg => {
      const munName = (reg.municipality || '').trim();
      if (!munName) return;
      const normK = normalizeMunName(munName);
      if (!normK || normK.includes('declaro') || normK.includes('veracidade') || munName.length > 45) return;

      if (!regMap.has(normK)) {
        regMap.set(normK, { name: munName, cacs: 0, gestores: 0, ibgeCode: reg.ibgeCode || '' });
      }
      const data = regMap.get(normK);
      if (!data.ibgeCode && reg.ibgeCode) data.ibgeCode = reg.ibgeCode;

      const rep = (reg.representation || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (rep.includes('cacs') || rep.includes('fundeb')) {
        data.cacs++;
      } else {
        data.gestores++;
      }
    });

    // Agrupar presentes por município (chave normalizada)
    const attMap = new Map();
    attList.forEach(att => {
      const munName = (att.municipality || '').trim();
      if (!munName) return;
      const normK = normalizeMunName(munName);
      if (!normK || normK.includes('declaro') || normK.includes('veracidade') || munName.length > 45) return;

      if (!attMap.has(normK)) {
        attMap.set(normK, { name: munName, cacs: 0, gestores: 0, ibgeCode: att.ibgeCode || '' });
      }
      const data = attMap.get(normK);
      if (!data.ibgeCode && att.ibgeCode) data.ibgeCode = att.ibgeCode;

      const rep = (att.representation || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (rep.includes('cacs') || rep.includes('fundeb')) {
        data.cacs++;
      } else if (rep.includes('gest') || rep.includes('municip') || rep) {
        data.gestores++;
      }
    });

    // Unir lista de TODOS os municípios (convocados pré-existentes + mencionados nas planilhas)
    const allNormKeys = new Set();
    this.currentTraining.municipalities.forEach(m => {
      const k = normalizeMunName(m.name);
      if (k) allNormKeys.add(k);
    });
    regMap.forEach((_, k) => allNormKeys.add(k));
    attMap.forEach((_, k) => allNormKeys.add(k));

    const hasRegistrationSheet = regList.length > 0;
    const trainingUf = this.currentTraining.uf || 'MT';
    const poloName = (this.currentTraining.polo || '').trim();

    allNormKeys.forEach(normK => {
      const regData = regMap.get(normK) || { cacs: 0, gestores: 0, ibgeCode: '', name: '' };
      const attData = attMap.get(normK) || { cacs: 0, gestores: 0, ibgeCode: '', name: '' };
      const rawName = regData.name || attData.name || '';
      const candidateIbge = regData.ibgeCode || attData.ibgeCode || '';

      let existing = findMatchingMunicipality(this.currentTraining.municipalities, rawName || normK, candidateIbge);

      const inscribedCACS = hasRegistrationSheet ? regData.cacs : attData.cacs;
      const inscribedGestores = hasRegistrationSheet ? regData.gestores : attData.gestores;
      const inscribedTotal = inscribedCACS + inscribedGestores;

      const presentCACS = attData.cacs;
      const presentGestores = attData.gestores;
      const presentTotal = presentCACS + presentGestores;

      if (existing) {
        existing.inscribedCACS = inscribedCACS;
        existing.inscribedGestores = inscribedGestores;
        existing.inscribedTotal = inscribedTotal;

        existing.presentCACS = presentCACS;
        existing.presentGestores = presentGestores;
        existing.presentTotal = presentTotal;

        if (!existing.ibgeCode && candidateIbge) {
          existing.ibgeCode = candidateIbge;
        }
      } else {
        // Resolver nome canônico e código IBGE oficial a partir de window.IBGE_DATA
        let finalName = rawName;
        let finalIbge = candidateIbge;

        if (window.IBGE_DATA && Array.isArray(window.IBGE_DATA)) {
          const found = window.IBGE_DATA.find(item => {
            if (finalIbge && String(item.c) === String(finalIbge)) return true;
            return normalizeMunName(item.n) === normK && (item.u === trainingUf || item.uf === trainingUf);
          });
          if (found) {
            finalName = found.n;
            finalIbge = String(found.c);
          }
        }

        let distanceKm = 0;
        if (window.convocacaoParser && typeof window.convocacaoParser.calculateDistanceToPolo === 'function') {
          distanceKm = window.convocacaoParser.calculateDistanceToPolo(finalName, trainingUf, poloName, trainingUf);
        }

        this.currentTraining.municipalities.push({
          id: `mun_${Date.now()}_${normK}`,
          ibgeCode: finalIbge || '',
          name: finalName,
          uf: trainingUf,
          distanceKm: distanceKm || 0,
          isSummoned: true,
          inscribedCACS,
          inscribedGestores,
          inscribedTotal,
          presentCACS,
          presentGestores,
          presentTotal
        });
      }
    });

    // Filtro final garantido de purga de municípios com rótulo inválido
    this.currentTraining.municipalities = this.currentTraining.municipalities.filter(m => {
      const n = (m.name || '').toLowerCase();
      return !n.includes('declaro') && !n.includes('veracidade') && !n.includes('confirmo') && !n.includes('prestadas') && !n.includes('formulario') && !n.includes('termo') && n.length <= 45;
    });
  }

  switchAttendanceSubTab(tabName) {
    const regContainer = document.getElementById('wizard-registration-table-container');
    const attContainer = document.getElementById('wizard-attendance-table-container');
    const btnReg = document.getElementById('btn-subtab-registration');
    const btnAtt = document.getElementById('btn-subtab-attendance');

    if (tabName === 'registration') {
      if (regContainer) regContainer.style.display = 'block';
      if (attContainer) attContainer.style.display = 'none';
      if (btnReg) { btnReg.classList.add('btn-primary'); btnReg.classList.remove('btn-secondary'); }
      if (btnAtt) { btnAtt.classList.add('btn-secondary'); btnAtt.classList.remove('btn-primary'); }
    } else {
      if (regContainer) regContainer.style.display = 'none';
      if (attContainer) attContainer.style.display = 'block';
      if (btnAtt) { btnAtt.classList.add('btn-primary'); btnAtt.classList.remove('btn-secondary'); }
      if (btnReg) { btnReg.classList.add('btn-secondary'); btnReg.classList.remove('btn-primary'); }
    }
  }

  getConsolidatedParticipantsList() {
    if (!this.currentTraining) return [];

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    const normalizePersonName = (name) => {
      if (!name) return '';
      return String(name)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();
    };

    const regMapByCpf = new Map();
    const regMapByName = new Map();
    regList.forEach(reg => {
      if (reg.cpf) {
        const clean = reg.cpf.replace(/\D/g, '').padStart(11, '0');
        if (clean && clean.length === 11) regMapByCpf.set(clean, reg);
      }
      if (reg.name) {
        const normName = normalizePersonName(reg.name);
        if (normName.length > 5) regMapByName.set(normName, reg);
      }
    });

    const consolidated = [];
    const processedRegIds = new Set();

    // 1. Processar presentes e cruzar com inscritos pelo CPF (ou fallback por nome completo)
    attList.forEach(att => {
      const cleanCpf = att.cpf ? att.cpf.replace(/\D/g, '').padStart(11, '0') : '';
      const normName = att.name ? normalizePersonName(att.name) : '';

      let matchedReg = cleanCpf && cleanCpf.length === 11 ? regMapByCpf.get(cleanCpf) : null;
      if (!matchedReg && normName && normName.length > 5 && regMapByName.has(normName)) {
        matchedReg = regMapByName.get(normName);
      }

      const formattedCpf = window.excelParser ? window.excelParser.formatCpf(att.cpf || (matchedReg ? matchedReg.cpf : '')) : (att.cpf || '');

      if (matchedReg) {
        processedRegIds.add(matchedReg.id);
        consolidated.push({
          id: att.id,
          regId: matchedReg.id,
          name: matchedReg.name || att.name,
          cpf: formattedCpf,
          municipality: matchedReg.municipality || att.municipality || '',
          ibgeCode: matchedReg.ibgeCode || att.ibgeCode || '',
          representation: matchedReg.representation || att.representation || '',
          roleGestao: matchedReg.roleGestao || att.roleGestao || '',
          roleCACS: matchedReg.roleCACS || att.roleCACS || '',
          status: 'Inscrito e Presente',
          matchedByCpf: true,
          isCpfValidated: true,
          isManualMunicipality: !!att.isManualMunicipality,
          isManualRepresentation: !!att.isManualRepresentation
        });
      } else {
        // Se não foi encontrado na inscrição, preserva o município e vínculo da própria lista de presença (ou manual se editado)
        const mun = att.municipality || '';
        const rep = att.representation || '';
        const isApValidated = !!(mun && rep && formattedCpf && formattedCpf !== '-');
        consolidated.push({
          id: att.id,
          name: att.name,
          cpf: formattedCpf,
          municipality: mun,
          ibgeCode: att.ibgeCode || '',
          representation: rep,
          roleGestao: att.roleGestao,
          roleCACS: att.roleCACS,
          status: 'Apenas Presente',
          matchedByCpf: false,
          isCpfValidated: isApValidated,
          isManualMunicipality: !!att.isManualMunicipality,
          isManualRepresentation: !!att.isManualRepresentation
        });
      }
    });

    // 2. Adicionar inscritos que não foram conciliados na lista de presença
    regList.forEach(reg => {
      if (!processedRegIds.has(reg.id)) {
        consolidated.push({
          id: reg.id,
          name: reg.name,
          cpf: reg.cpf,
          municipality: reg.municipality,
          ibgeCode: reg.ibgeCode,
          representation: reg.representation,
          roleGestao: reg.roleGestao,
          roleCACS: reg.roleCACS,
          status: 'Apenas Inscrito',
          matchedByCpf: false,
          isCpfValidated: false,
          isManualMunicipality: false,
          isManualRepresentation: false
        });
      }
    });

    return consolidated;
  }

  getInvitedMunicipalityOptions() {
    const list = this.currentTraining?.municipalities || [];
    const names = new Set();

    list.forEach(m => {
      if (m.name) {
        const n = m.name.trim();
        if (n && n.length <= 45 && !n.toLowerCase().includes('declaro') && !n.toLowerCase().includes('não informado')) {
          names.add(n);
        }
      }
    });

    // Também incluir municípios identificados nas planilhas de inscrição e presença
    (this.currentTraining?.registrations || []).forEach(r => {
      if (r.municipality && r.municipality.length <= 45 && !r.municipality.toLowerCase().includes('declaro')) {
        names.add(r.municipality.trim());
      }
    });
    (this.currentTraining?.attendance || []).forEach(a => {
      if (a.municipality && a.municipality.length <= 45 && !a.municipality.toLowerCase().includes('declaro')) {
        names.add(a.municipality.trim());
      }
    });

    // Se porventura a lista estiver vazia, recuar para os municípios do estado da formação
    if (names.size === 0 && window.IBGE_DATA && Array.isArray(window.IBGE_DATA)) {
      const uf = this.currentTraining?.uf || 'MT';
      window.IBGE_DATA.filter(item => item.u === uf || item.uf === uf).forEach(item => {
        if (item.n) names.add(item.n);
      });
    }

    return Array.from(names).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }

  getAttendanceSortIcon(field) {
    if (this.attendanceSortCol !== field) {
      // Ícone neutro de ordenação (linhas de classificação sutis)
      return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;"><path d="M7 15l5 5 5-5"></path><path d="M7 9l5-5 5 5"></path></svg>`;
    }
    if (this.attendanceSortDir === 'asc') {
      // Crescente: linhas ordenadas com seta para cima
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-gold-text);"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 9 18 6 21 9"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    } else {
      // Decrescente: linhas ordenadas com seta para baixo
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-gold-text);"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 15 18 18 21 15"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    }
  }

  sortAttendanceTable(colName) {
    if (this.attendanceSortCol === colName) {
      this.attendanceSortDir = this.attendanceSortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.attendanceSortCol = colName;
      this.attendanceSortDir = 'asc';
    }
    this.renderAttendanceStep();
  }

  sortParticipantsList(list = [], col = 'name', dir = 'asc') {
    const sorted = [...list].sort((a, b) => {
      // 1. Prioridade máxima: qualquer participante 'Apenas Presente' fica no topo da lista
      const isApenasPresenteA = a.status === 'Apenas Presente' ? 1 : 0;
      const isApenasPresenteB = b.status === 'Apenas Presente' ? 1 : 0;

      if (isApenasPresenteA !== isApenasPresenteB) {
        return isApenasPresenteB - isApenasPresenteA; // 'Apenas Presente' fica no topo
      }

      // 2. Se ambos forem 'Apenas Presente', priorizar no topo os que estão sem validação (sem município ou sem vínculo)
      if (isApenasPresenteA && isApenasPresenteB) {
        const isIncompleteA = (!a.municipality || !a.representation) ? 1 : 0;
        const isIncompleteB = (!b.municipality || !b.representation) ? 1 : 0;
        if (isIncompleteA !== isIncompleteB) {
          return isIncompleteB - isIncompleteA; // Sem validação fica ainda mais acima
        }
      }

      let valA = '';
      let valB = '';

      if (col === 'name') {
        valA = a.name || '';
        valB = b.name || '';
      } else if (col === 'cpf') {
        valA = a.cpf || '';
        valB = b.cpf || '';
      } else if (col === 'status') {
        valA = a.status || '';
        valB = b.status || '';
      } else if (col === 'municipality') {
        valA = a.municipality || 'zzzz';
        valB = b.municipality || 'zzzz';
      } else if (col === 'representation' || col === 'vinculo' || col === 'role') {
        valA = a.representation || '';
        valB = b.representation || '';
      }

      const cmp = valA.localeCompare(valB, 'pt-BR', { sensitivity: 'base' });
      return dir === 'desc' ? -cmp : cmp;
    });

    return sorted;
  }

  updateParticipantField(participantId, field, value) {
    if (!this.currentTraining) return;

    const val = (value || '').trim();
    let participant = (this.currentTraining.attendance || []).find(p => p.id === participantId);
    if (!participant) {
      participant = (this.currentTraining.registrations || []).find(p => p.id === participantId);
    }
    if (!participant) return;
    
    // RESTRIÇÃO: participante conciliado (na presença E na inscrição) não é editável; "Apenas Presente" e
    // "Apenas Inscrito" podem ser completados manualmente
    const cleanCpf = participant.cpf ? participant.cpf.replace(/\D/g, '') : '';
    // A busca é sempre na OUTRA planilha: procurar na própria lista encontraria o próprio participante e
    // bloquearia sempre os "Apenas Inscrito"
    const isFromAttendance = (this.currentTraining.attendance || []).includes(participant);
    const otherList = isFromAttendance ? (this.currentTraining.registrations || []) : (this.currentTraining.attendance || []);
    const isReconciled = cleanCpf && cleanCpf.length === 11 && otherList.some(r => r.cpf && r.cpf.replace(/\D/g, '') === cleanCpf);
    if (isReconciled) return;

    if (field === 'municipality') {
      participant.municipality = val;
      participant.isManualMunicipality = !!val;
      if (val && window.excelParser) {
        const normKey = window.excelParser.normalizeStr(val);
        const ibgeInfo = window.excelParser.ibgeLookup.get(normKey);
        if (ibgeInfo) participant.ibgeCode = ibgeInfo.c;
      }
    } else if (field === 'representation') {
      participant.representation = val;
      participant.isManualRepresentation = !!val;
    }

    // Se possui CPF, sincronizar no registro da outra planilha caso exista
    if (participant.cpf) {
      const cleanCpf = participant.cpf.replace(/\D/g, '');
      if (cleanCpf && cleanCpf.length === 11) {
        const regMatch = (this.currentTraining.registrations || []).find(r => r.cpf && r.cpf.replace(/\D/g, '') === cleanCpf);
        const attMatch = (this.currentTraining.attendance || []).find(a => a.cpf && a.cpf.replace(/\D/g, '') === cleanCpf);

        [regMatch, attMatch].forEach(item => {
          if (item && item !== participant) {
            if (field === 'municipality') item.municipality = val;
            if (field === 'representation') item.representation = val;
          }
        });
      }
    }

    // Recalcular totais e atualizar visualização
    this.reconcileMunicipalitiesFromRegistrationAndAttendance();
    this.renderAttendanceStep();
    this.saveCurrentStepData();
    this.showToast(`Participante "${participant.name}" atualizado com sucesso!`, 'success');
  }

  clearManualParticipantField(participantId, field) {
    if (!this.currentTraining) return;
    let participant = (this.currentTraining.attendance || []).find(p => p.id === participantId);
    if (!participant) {
      participant = (this.currentTraining.registrations || []).find(p => p.id === participantId);
    }
    if (!participant) return;

    if (field === 'municipality') {
      participant.municipality = '';
      participant.isManualMunicipality = false;
      participant.ibgeCode = null;
    } else if (field === 'representation') {
      participant.representation = '';
      participant.isManualRepresentation = false;
    }

    this.reconcileMunicipalitiesFromRegistrationAndAttendance();
    this.renderAttendanceStep();
    this.saveCurrentStepData();
  }

  renderAttendanceStep() {
    const statusBanner = document.getElementById('wizard-attendance-status-banner');
    const attContainer = document.getElementById('wizard-attendance-table-container');
    const table3Container = document.getElementById('wizard-table3-preview');
    const table4Container = document.getElementById('wizard-table4-preview');
    if (!this.currentTraining) return;

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    const hasReg = regList.length > 0;
    const hasAtt = attList.length > 0;

    // Controlar visibilidade das dropzones de upload (desaparecem ao fazer upload e só voltam se limpar)
    const dropzoneContainer = document.getElementById('wizard-step6-dropzones-container');
    const dropzoneReg = document.getElementById('dropzone-registration');
    const dropzoneAtt = document.getElementById('dropzone-attendance');

    if (dropzoneReg) {
      if (hasReg) {
        dropzoneReg.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneReg.style.removeProperty('display');
        dropzoneReg.style.display = 'flex';
      }
    }

    if (dropzoneAtt) {
      if (hasAtt) {
        dropzoneAtt.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneAtt.style.removeProperty('display');
        dropzoneAtt.style.display = 'flex';
      }
    }

    if (dropzoneContainer) {
      if (hasReg && hasAtt) {
        dropzoneContainer.style.setProperty('display', 'none', 'important');
      } else if (hasReg || hasAtt) {
        dropzoneContainer.style.removeProperty('display');
        dropzoneContainer.style.display = 'grid';
        dropzoneContainer.style.gridTemplateColumns = '1fr';
      } else {
        dropzoneContainer.style.removeProperty('display');
        dropzoneContainer.style.display = 'grid';
        dropzoneContainer.style.gridTemplateColumns = '1fr 1fr';
      }
    }

    const regCacs = regList.filter(r => (r.representation || '').toUpperCase().includes('CACS') || (r.representation || '').toUpperCase().includes('FUNDEB')).length;
    const regGestores = regList.length - regCacs;

    const attCacs = attList.filter(a => (a.representation || '').toUpperCase().includes('CACS') || (a.representation || '').toUpperCase().includes('FUNDEB')).length;
    const attGestores = attList.length - attCacs;

    const consolidatedList = this.getConsolidatedParticipantsList();
    const ipCount = consolidatedList.filter(p => p.status === 'Inscrito e Presente').length;
    const apCount = consolidatedList.filter(p => p.status === 'Apenas Presente').length;
    const aiCount = consolidatedList.filter(p => p.status === 'Apenas Inscrito').length;
    const ipPercent = attList.length > 0 ? Math.round((ipCount / attList.length) * 100) : 0;

    const unmappedAp = consolidatedList.filter(p => p.status === 'Apenas Presente' && (!p.municipality || !p.representation));
    const hasUnmapped = unmappedAp.length > 0;

    const muns = this.currentTraining.municipalities || [];
    const munsWithPresence = muns.filter(m => (parseInt(m.presentTotal) || 0) > 0).length;
    const totalPresInMuns = muns.reduce((acc, m) => acc + (parseInt(m.presentTotal) || 0), 0);
    const totalInscInMuns = muns.reduce((acc, m) => acc + (parseInt(m.inscribedTotal) || 0), 0);

    // Renderizar Banner de Status das Planilhas e Painel de Diagnóstico
    if (statusBanner) {
      if (!hasReg && !hasAtt) {
        statusBanner.innerHTML = '';
      } else {
        statusBanner.innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          <div style="background:rgba(246, 168, 0, 0.08); border:1px solid rgba(246, 168, 0, 0.25); padding:0.85rem 1.1rem; border-radius:var(--radius-md);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
              <strong style="color:var(--accent-blue-text); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg> Planilha 1: Inscrições
              </strong>
              <div style="display:flex; align-items:center; gap:0.35rem;">
                <span class="nav-badge badge-blue font-bold" style="font-size:0.8rem;">${regList.length} Inscritos</span>
                ${regList.length > 0 ? `<button type="button" class="btn btn-secondary btn-sm text-accent-rose" onclick="app.clearStep6Data('registration')" style="padding:0.15rem 0.45rem; font-size:0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:0.25rem;" title="Remover planilha de inscrições">${window.icons.delete} Remover</button>` : ''}
              </div>
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary); display:flex; gap:0.75rem;">
              <span>CACS-FUNDEB: <strong>${regCacs}</strong></span>
              <span>Gestão Municipal: <strong>${regGestores}</strong></span>
            </div>
          </div>

          <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.25); padding:0.85rem 1.1rem; border-radius:var(--radius-md);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
              <strong style="color:var(--accent-emerald-text); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Planilha 2: Presença
              </strong>
              <div style="display:flex; align-items:center; gap:0.35rem;">
                <span class="nav-badge badge-emerald font-bold" style="font-size:0.8rem;">${attList.length} Presentes</span>
                ${attList.length > 0 ? `<button type="button" class="btn btn-secondary btn-sm text-accent-rose" onclick="app.clearStep6Data('attendance')" style="padding:0.15rem 0.45rem; font-size:0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:0.25rem;" title="Remover planilha de presença">${window.icons.delete} Remover</button>` : ''}
              </div>
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary); display:flex; gap:0.75rem;">
              <span>CACS-FUNDEB: <strong>${attCacs}</strong></span>
              <span>Gestão Municipal: <strong>${attGestores}</strong></span>
            </div>
          </div>
        </div>

        <div class="wizard-attendance-diagnostic-banner" style="margin-top:1rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem 1.25rem; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.85rem; flex-wrap:wrap; gap:0.5rem;">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:6px; background:var(--accent-amber-bg); color:var(--accent-amber-text);">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </span>
              <strong style="color:var(--text-primary); font-size:0.92rem;">Diagnóstico da Leitura e Reconciliação de Dados</strong>
            </div>
            <div>
              ${hasUnmapped ? `
                <span class="nav-badge" style="background:var(--accent-amber-bg); color:var(--accent-amber-text); border:1px solid var(--accent-amber-border); font-size:0.75rem; font-weight:700; padding:0.2rem 0.55rem; display:inline-flex; align-items:center; gap:0.3rem;">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  ${unmappedAp.length} Pendência${unmappedAp.length > 1 ? 's' : ''}
                </span>
              ` : `
                <span class="nav-badge badge-emerald" style="font-size:0.75rem; font-weight:700; padding:0.2rem 0.55rem; display:inline-flex; align-items:center; gap:0.3rem;">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  100% Reconciliado
                </span>
              `}
            </div>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap:0.75rem; margin-bottom:0.85rem;">
            <div style="background:rgba(246, 168, 0, 0.05); border:1px solid var(--accent-blue-border); border-radius:var(--radius-sm); padding:0.6rem 0.85rem;">
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.15rem;">Inscrições Válidas</div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--accent-blue-text);">${regList.length}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${regCacs} CACS | ${regGestores} Gestão</div>
            </div>

            <div style="background:rgba(16, 185, 129, 0.05); border:1px solid var(--accent-emerald-border); border-radius:var(--radius-sm); padding:0.6rem 0.85rem;">
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.15rem;">Presentes Computados</div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--accent-emerald-text);">${attList.length}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${attCacs} CACS | ${attGestores} Gestão</div>
            </div>

            <div style="background:rgba(246, 168, 0, 0.05); border:1px solid var(--accent-amber-border); border-radius:var(--radius-sm); padding:0.6rem 0.85rem;">
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.15rem;">Cruzamento Presença</div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${ipCount} <span style="font-size:0.75rem; font-weight:600; color:var(--accent-emerald-text);">(${ipPercent}%)</span></div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${apCount} presentes sem inscrição</div>
            </div>

            <div style="background:rgba(246, 168, 0, 0.05); border:1px solid rgba(246, 168, 0, 0.25); border-radius:var(--radius-sm); padding:0.6rem 0.85rem;">
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.15rem;">Tabela 4 Sincronizada</div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--accent-amber-text);">${totalPresInMuns} / ${totalInscInMuns}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${munsWithPresence} de ${muns.length} municípios com presença</div>
            </div>
          </div>

          ${hasUnmapped ? `
            <div style="background:var(--accent-amber-bg); border:1px solid var(--accent-amber-border); color:var(--accent-amber-text); padding:0.6rem 0.85rem; border-radius:var(--radius-sm); font-size:0.8rem; display:flex; align-items:center; gap:0.5rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span><strong>Atenção:</strong> Existem <strong>${unmappedAp.length}</strong> participante(s) presente(s) com município ou vínculo não identificados na planilha. Selecione-os na tabela unificada abaixo para incluí-los na Tabela 4.</span>
            </div>
          ` : `
            <div style="background:var(--accent-emerald-bg); border:1px solid var(--accent-emerald-border); color:var(--accent-emerald-text); padding:0.6rem 0.85rem; border-radius:var(--radius-sm); font-size:0.8rem; display:flex; align-items:center; gap:0.5rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span><strong>Diagnóstico Concluído:</strong> Dados 100% validados e reconciliados. A <strong>Tabela 4</strong> reflete perfeitamente <strong>${totalPresInMuns} presentes</strong> e <strong>${totalInscInMuns} inscritos</strong> em <strong>${munsWithPresence} municípios atendidos</strong>, com consistência integral para a auditoria e o Relatório Oficial.</span>
            </div>
          `}
        </div>
        `;
      }
    }

    const sortCol = this.attendanceSortCol || 'name';
    const sortDir = this.attendanceSortDir || 'asc';

    const invitedMunOptions = this.getInvitedMunicipalityOptions();
    const sortedList = this.sortParticipantsList(consolidatedList, sortCol, sortDir);

    // Helper de renderização de linha de participante
    const renderParticipantRow = (p) => {
      const isUnmappedMun = !p.municipality;
      const isUnmappedVinculo = !p.representation;
      const isRowIncomplete = isUnmappedMun || isUnmappedVinculo;

      // Status unificado e descritivo com cores e ícones de linha
      let statusBadge = `<span class="nav-badge badge-emerald" style="font-size:0.76rem; font-weight:700; padding:0.2rem 0.6rem; display:inline-flex; align-items:center; gap:0.35rem; white-space:nowrap;" title="Inscrito e Presente: realizou inscrição e compareceu ao evento (presença confirmada)"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Inscrito e Presente</span>`;
      if (p.status === 'Apenas Inscrito') {
        statusBadge = `<span class="nav-badge badge-blue" style="font-size:0.76rem; font-weight:700; padding:0.2rem 0.6rem; display:inline-flex; align-items:center; gap:0.35rem; white-space:nowrap;" title="Apenas inscrito: realizou inscrição, porém não compareceu ao evento (ausente)"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Apenas inscrito</span>`;
      } else if (p.status === 'Apenas Presente') {
        statusBadge = `<span class="nav-badge badge-amber" style="font-size:0.76rem; font-weight:700; padding:0.2rem 0.6rem; display:inline-flex; align-items:center; gap:0.35rem; white-space:nowrap;" title="Presente sem estar inscrito: compareceu ao evento, mas não realizou inscrição prévia"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>Presente sem estar inscrito</span>`;
      }

      // Município: só pede para selecionar se não foi localizado na planilha
      const munTd = isUnmappedMun ? `
        <select class="participant-table-select unmapped" style="min-width:150px;" onchange="app.updateParticipantField('${p.id}', 'municipality', this.value)">
          <option value="">-- Selecionar Município --</option>
          ${invitedMunOptions.map(m => `<option value="${this.escapeHtml(m)}">${this.escapeHtml(m)}</option>`).join('')}
        </select>
      ` : `
        <div style="display:inline-flex; align-items:center; gap:0.35rem;">
          <span style="font-weight:600; color:var(--text-primary);">${this.escapeHtml(p.municipality)}</span>
          ${p.isManualMunicipality ? `<button type="button" class="btn btn-sm btn-ghost text-muted" onclick="app.clearManualParticipantField('${p.id}', 'municipality')" title="Alterar município selecionado manualmente" style="padding:0 0.2rem; font-size:0.7rem; line-height:1;">${window.icons.edit}</button>` : ''}
        </div>
      `;

      // Vínculo: só pede para selecionar se não foi localizado na planilha
      const repTd = isUnmappedVinculo ? `
        <select class="participant-table-select unmapped" style="min-width:160px;" onchange="app.updateParticipantField('${p.id}', 'representation', this.value)">
          <option value="">-- Selecionar Vínculo --</option>
          <option value="Gestão municipal">Gestão municipal</option>
          <option value="CACS-FUNDEB">CACS-FUNDEB</option>
        </select>
      ` : `
        <div style="display:inline-flex; align-items:center; gap:0.35rem;">
          <span class="nav-badge ${p.representation === 'CACS-FUNDEB' ? 'badge-emerald' : 'badge-blue'}" style="font-size:0.78rem; font-weight:600; white-space:nowrap;">
            ${this.escapeHtml(p.representation)}
          </span>
          ${p.isManualRepresentation ? `<button type="button" class="btn btn-sm btn-ghost text-muted" onclick="app.clearManualParticipantField('${p.id}', 'representation')" title="Alterar vínculo selecionado manualmente" style="padding:0 0.2rem; font-size:0.7rem; line-height:1;">${window.icons.edit}</button>` : ''}
        </div>
      `;

      const isApWithMunAndVinculo = (p.status === 'Apenas Presente' && !!p.municipality && !!p.representation);
      const showCpfCheck = (!!p.cpf && p.cpf !== '-') && (p.isCpfValidated || isApWithMunAndVinculo);

      return `
        <tr style="${isRowIncomplete ? 'background: rgba(246, 168, 0, 0.05);' : ''}">
          <td style="vertical-align:middle;"><strong>${this.escapeHtml(p.name || 'Não informado')}</strong></td>
          <td style="font-family:monospace; vertical-align:middle; white-space:nowrap;">
            ${this.escapeHtml(p.cpf || '-')}
            ${showCpfCheck ? '<span class="nav-badge badge-emerald" style="font-size:0.7rem; margin-left:0.35rem; padding:0.15rem 0.3rem; display:inline-flex; align-items:center;" title="CPF validado com município e vínculo confirmados"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>' : ''}
          </td>
          <td style="vertical-align:middle; text-align:center;">${statusBadge}</td>
          <td style="vertical-align:middle;">${munTd}</td>
          <td style="vertical-align:middle;">${repTd}</td>
        </tr>
      `;
    };

    // Renderizar Tabela Única Consolidada
    if (attContainer) {
      if (consolidatedList.length === 0) {
        attContainer.innerHTML = `<p style="color:var(--text-muted); padding:1rem 0;">Nenhuma planilha importada ainda. Arraste ou selecione as planilhas acima.</p>`;
      } else {
        attContainer.innerHTML = `
          <div style="margin-bottom:0.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
            <span style="font-size:0.85rem; color:var(--text-secondary);">
              Exibindo <strong>${consolidatedList.length}</strong> participantes (Inscritos: <strong>${regList.length}</strong> | Presentes: <strong>${attList.length}</strong>):
            </span>
            <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; font-size:0.8rem; background:rgba(166, 166, 166, 0.08); padding:0.4rem 0.85rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <span style="font-weight:700; color:var(--text-primary); display:inline-flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                Legenda:
              </span>
              <span style="display:inline-flex; align-items:center; gap:0.35rem; color:var(--text-secondary);" title="Inscrito e Presente: participante realizou a inscrição e compareceu ao evento (presença confirmada)">
                <span class="nav-badge badge-emerald" style="font-size:0.74rem; font-weight:700; padding:0.15rem 0.5rem; display:inline-flex; align-items:center; gap:0.3rem;">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Inscrito e Presente
                </span>
                <span style="font-size:0.76rem; color:var(--text-muted);">(${ipCount})</span>
              </span>
              <span style="display:inline-flex; align-items:center; gap:0.35rem; color:var(--text-secondary);" title="Presente sem estar inscrito: compareceu presencialmente ao evento sem inscrição prévia">
                <span class="nav-badge badge-amber" style="font-size:0.74rem; font-weight:700; padding:0.15rem 0.5rem; display:inline-flex; align-items:center; gap:0.3rem;">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  Presente sem estar inscrito
                </span>
                <span style="font-size:0.76rem; color:var(--text-muted);">(${apCount})</span>
              </span>
              <span style="display:inline-flex; align-items:center; gap:0.35rem; color:var(--text-secondary);" title="Apenas inscrito: realizou inscrição, porém não compareceu ao evento (ausente)">
                <span class="nav-badge badge-blue" style="font-size:0.74rem; font-weight:700; padding:0.15rem 0.5rem; display:inline-flex; align-items:center; gap:0.3rem;">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Apenas inscrito
                </span>
                <span style="font-size:0.76rem; color:var(--text-muted);">(${aiCount})</span>
              </span>
            </div>
          </div>
          <div class="table-responsive-wrapper" style="max-height:480px; overflow-y:auto;">
            <table class="report-data-table">
              <thead>
                <tr>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('name')" style="cursor:pointer; user-select:none;" title="Clique para classificar por Nome">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>Nome Completo</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('name')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('cpf')" style="cursor:pointer; user-select:none; width:150px;" title="Clique para classificar por CPF">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>CPF</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('cpf')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('status')" style="cursor:pointer; user-select:none; min-width:190px; text-align:center;" title="Clique para classificar por Status">
                    <div style="display:inline-flex; align-items:center; justify-content:center; gap:0.45rem;">
                      <span>Status</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('status')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('municipality')" style="cursor:pointer; user-select:none;" title="Clique para classificar por Município">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>Município</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('municipality')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('representation')" style="cursor:pointer; user-select:none; width:180px;" title="Clique para classificar por Vínculo">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>Vínculo</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('representation')}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                ${sortedList.map(p => renderParticipantRow(p)).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }

    // Renderizar Tabela 3 (Inscritos por Município)
    if (table3Container && window.statsEngine) {
      table3Container.innerHTML = window.statsEngine.generateTable3Html(this.currentTraining.municipalities || []);
    }

    // Renderizar Tabela 4 (Participação por Município - Presentes / Convocados)
    if (table4Container && window.statsEngine) {
      table4Container.innerHTML = window.statsEngine.generateTable4Html(this.currentTraining.municipalities || []);
    }
  }

  /* ==========================================================================
     ETAPA 7: AVALIAÇÃO (UPLOAD, MÉDIAS, GRÁFICOS & NUVEM)
     ========================================================================== */
  async handleEvaluationFileUpload(event) {
    const file = event.target && event.target.files ? event.target.files[0] : null;
    const fromRows = event.rows || null; // linhas montadas a partir dos dados do CapacitaTE (Supabase)
    if ((!file && !fromRows) || !window.excelParser) return;

    try {
      this.showToast('Processando planilha de avaliações...');
      let firstSheet = fromRows;
      if (!firstSheet) {
        const { sheets, sheetNames } = await window.excelParser.readWorkbook(file);
        firstSheet = sheets[sheetNames[0]];
      }

      const parsed = window.excelParser.parseEvaluationRows(firstSheet, null, this.currentTraining.uf || 'MT');
      if (parsed.length === 0) {
        this.showToast('Nenhum registro de avaliação identificado.', 'warning');
        return;
      }

      // Comentários padrão das figuras foram gerados com os dados antigos: descarta para regenerar
      this.resetDefaultFigureComments();
      this.currentTraining.evaluations = parsed;
      this.currentTraining.sources = Object.assign({}, this.currentTraining.sources, { avaliacao: fromRows ? 'capacitate' : 'arquivo' });
      this.renderEvaluationStep();
      this.renderEvaluationCharts();
      this.renderWordClouds();
      this.renderFigureComments();
      this.saveCurrentStepData();
      this.showToast(`${parsed.length} avaliações processadas com sucesso!`, 'success');
    } catch (err) {
      console.error('Erro ao processar avaliações:', err);
      this.showToast(`Erro na avaliação: ${err.message}`, 'error');
    }
  }

  clearEvaluationData() {
    if (!this.currentTraining) return;

    this.openConfirmModal({
      title: 'Remover Planilha de Avaliação',
      msg: 'Tem certeza que deseja remover a Planilha de Avaliação e limpar todos os dados de gráficos, distribuições de respostas e nuvens de palavras?',
      btnText: 'Sim, Remover',
      successTitle: 'Avaliações Removidas!',
      successMsg: 'A planilha de avaliações e todos os gráficos e nuvens de palavras foram excluídos com sucesso.',
      onConfirm: () => this.executeClearEvaluationData()
    });
  }

  executeClearEvaluationData() {
    if (!this.currentTraining) return;

    this.resetDefaultFigureComments();
    this.currentTraining.evaluations = [];
    const inputEval = document.getElementById('file-input-evaluation');
    if (inputEval) inputEval.value = '';

    const dropzoneEval = document.getElementById('dropzone-evaluation');
    if (dropzoneEval) {
      dropzoneEval.style.removeProperty('display');
      dropzoneEval.style.display = 'flex';
    }

    this.renderEvaluationStep();
    this.renderEvaluationCharts();
    this.renderWordClouds();
    this.renderFigureComments();
    this.saveCurrentStepData();
    this.showToast('Planilha de avaliações limpa com sucesso!', 'success');
  }

  renderEvaluationStep() {
    if (!this.currentTraining || !window.statsEngine) return;
    const evals = this.currentTraining.evaluations || [];
    const hasEvals = evals.length > 0;
    const stats = window.statsEngine.calculateEvaluationStats(evals);

    // Ocultar janela de inserção se houver planilha importada
    const dropzoneEval = document.getElementById('dropzone-evaluation');
    if (dropzoneEval) {
      if (hasEvals) {
        dropzoneEval.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneEval.style.removeProperty('display');
        dropzoneEval.style.display = 'flex';
      }
    }

    const countEl = document.getElementById('wiz-eval-total-count');
    if (countEl) countEl.textContent = `${evals.length} Avaliações Registradas`;

    const meanEl = document.getElementById('wiz-eval-overall-mean');
    if (meanEl) {
      const highPct = stats.highRatingPercent ? `${stats.highRatingPercent}%`.replace('.', ',') : (evals.length > 0 ? 'Predomínio 4 e 5' : '0,0% Conceitos 4 e 5');
      meanEl.textContent = highPct.includes('Conceitos') ? highPct : `${highPct} Conceitos 4 e 5`;
    }

    const statusBanner = document.getElementById('wizard-evaluation-status-banner');
    if (statusBanner) {
      if (!hasEvals) {
        statusBanner.innerHTML = '';
      } else {
        const cacsCount = evals.filter(e => e.representation === 'CACS-FUNDEB').length;
        const gestCount = evals.length - cacsCount;
        statusBanner.innerHTML = `
          <div style="background:rgba(246, 168, 0, 0.08); border:1px solid rgba(246, 168, 0, 0.25); padding:0.85rem 1.1rem; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
            <div>
              <strong style="color:var(--accent-blue-text); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Planilha de Avaliação Importada
              </strong>
              <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.2rem;">
                Total: <strong>${evals.length}</strong> respostas (CACS-FUNDEB: <strong>${cacsCount}</strong> | Gestão Municipal: <strong>${gestCount}</strong>)
              </div>
            </div>
            <button type="button" class="btn btn-secondary btn-sm text-accent-rose" onclick="app.clearEvaluationData()" style="padding:0.25rem 0.6rem; font-size:0.78rem; font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;" title="Remover planilha de avaliação">
              ${window.icons.delete} Remover Planilha
            </button>
          </div>
        `;
      }
    }

    this.renderFigureComments();
    this.renderWordCloudControls();
  }

  /**
   * Renderiza os campos de comentários e sugestões padrão da Etapa 8 para as Figuras 3 a 8,
   * integrando modelos analíticos de conteúdo (Bardin), síntese oficial FNDE e indicadores descritivos.
   */
  renderFigureComments() {
    if (!this.currentTraining) return;
    if (!this.currentTraining.evaluationComments) {
      this.currentTraining.evaluationComments = {};
    }
    if (!this.currentTraining.evaluationCommentTemplates) {
      this.currentTraining.evaluationCommentTemplates = {};
    }

    const figKeys = ['fig3', 'fig4', 'fig5', 'fig6', 'fig7', 'fig8'];
    figKeys.forEach(key => {
      const textarea = document.getElementById(`eval-comment-${key}`);
      const badge = document.getElementById(`eval-comment-${key}-badge`);
      const templateSelect = document.getElementById(`eval-comment-${key}-template`);
      if (!textarea) return;

      const activeTemplateId = this.currentTraining.evaluationCommentTemplates[key] || 'categorial';
      if (templateSelect) {
        templateSelect.value = activeTemplateId;
      }

      const allTemplates = window.statsEngine ? window.statsEngine.getEvaluationCommentTemplates(key, this.currentTraining) : {};
      const currentTemplateObj = allTemplates[activeTemplateId] || allTemplates.categorial || { name: 'Análise de Conteúdo', badge: 'Análise de Conteúdo', text: '' };
      const expectedDefaultText = currentTemplateObj.text || '';

      const savedComment = this.currentTraining.evaluationComments[key];

      if (this.isFigureCommentCustom(key, allTemplates)) {
        // Usuário digitou um texto manual customizado
        textarea.value = savedComment;
        if (badge) {
          badge.textContent = 'Comentário Personalizado';
          badge.style.background = 'rgba(246, 168, 0, 0.15)';
          badge.style.color = 'var(--accent-amber-text)';
        }
      } else {
        // Preencher com a sugestão analítica padrão do modelo ativo
        textarea.value = expectedDefaultText;
        this.currentTraining.evaluationComments[key] = expectedDefaultText;
        if (badge) {
          badge.textContent = `Sugestão Padrão: ${currentTemplateObj.badge || currentTemplateObj.name}`;
          badge.style.background = 'rgba(246, 168, 0, 0.15)';
          badge.style.color = 'var(--accent-blue-text)';
        }
      }
    });
  }

  /**
   * Indica se o comentário da figura foi escrito pelo usuário (true) ou é uma sugestão padrão gerada
   * a partir dos dados (false), que deve ser regenerada quando as avaliações mudam.
   */
  isFigureCommentCustom(key, allTemplates = null) {
    const t = this.currentTraining;
    if (!t) return false;
    const saved = t.evaluationComments ? t.evaluationComments[key] : undefined;
    if (saved === undefined || saved === null || String(saved).trim() === '') return false;
    if (t.evaluationCommentCustom && typeof t.evaluationCommentCustom[key] === 'boolean') {
      return t.evaluationCommentCustom[key];
    }
    // Dados de versões anteriores (sem a marcação): texto do bug antigo de notas "0" ou igual a um modelo = padrão
    if (saved.includes('"0", "1"')) return false;
    const templates = allTemplates || (window.statsEngine ? window.statsEngine.getEvaluationCommentTemplates(key, t) : {});
    return !Object.values(templates).some(tp => tp && tp.text && tp.text.trim() === String(saved).trim());
  }

  setFigureCommentCustom(key, isCustom) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.evaluationCommentCustom) this.currentTraining.evaluationCommentCustom = {};
    this.currentTraining.evaluationCommentCustom[key] = isCustom;
  }

  /**
   * Descarta os comentários padrão (não personalizados) das Figuras 3 a 8 para que sejam regenerados com os dados atuais
   */
  resetDefaultFigureComments() {
    const t = this.currentTraining;
    if (!t || !t.evaluationComments) return;
    ['fig3', 'fig4', 'fig5', 'fig6', 'fig7', 'fig8'].forEach(key => {
      if (!this.isFigureCommentCustom(key)) delete t.evaluationComments[key];
    });
  }

  /**
   * Altera o modelo de análise padrão de uma figura da Etapa 8 (Análise de Conteúdo, Síntese Oficial ou Descritiva)
   */
  changeFigureCommentTemplate(figKey, templateId) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.evaluationCommentTemplates) {
      this.currentTraining.evaluationCommentTemplates = {};
    }
    if (!this.currentTraining.evaluationComments) {
      this.currentTraining.evaluationComments = {};
    }

    this.currentTraining.evaluationCommentTemplates[figKey] = templateId;
    this.setFigureCommentCustom(figKey, false);

    const allTemplates = window.statsEngine ? window.statsEngine.getEvaluationCommentTemplates(figKey, this.currentTraining) : {};
    const selectedTemplate = allTemplates[templateId] || allTemplates.categorial;
    const newText = selectedTemplate ? selectedTemplate.text : '';

    this.currentTraining.evaluationComments[figKey] = newText;

    const textarea = document.getElementById(`eval-comment-${figKey}`);
    if (textarea) {
      textarea.value = newText;
    }

    const badge = document.getElementById(`eval-comment-${figKey}-badge`);
    if (badge && selectedTemplate) {
      badge.textContent = `Sugestão Padrão: ${selectedTemplate.badge || selectedTemplate.name}`;
      badge.style.background = 'rgba(246, 168, 0, 0.15)';
      badge.style.color = 'var(--accent-blue-text)';
    }

    this.saveCurrentStepData();
    if (selectedTemplate) {
      this.showToast(`Modelo analítico aplicado: ${selectedTemplate.name}`, 'info');
    }
  }

  /**
   * Atualiza o comentário de uma figura da Etapa 8 quando editado livremente pelo usuário
   */
  handleFigureCommentChange(figKey, value) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.evaluationComments) {
      this.currentTraining.evaluationComments = {};
    }
    this.currentTraining.evaluationComments[figKey] = value;

    const activeTemplateId = (this.currentTraining.evaluationCommentTemplates && this.currentTraining.evaluationCommentTemplates[figKey]) || 'categorial';
    const allTemplates = window.statsEngine ? window.statsEngine.getEvaluationCommentTemplates(figKey, this.currentTraining) : {};
    const currentTemplateObj = allTemplates[activeTemplateId] || allTemplates.categorial;
    const defaultComment = currentTemplateObj ? currentTemplateObj.text : '';

    const badge = document.getElementById(`eval-comment-${figKey}-badge`);
    this.setFigureCommentCustom(figKey, value.trim() !== '' && value.trim() !== defaultComment.trim());

    if (badge) {
      if (value.trim() === defaultComment.trim()) {
        badge.textContent = `Sugestão Padrão: ${currentTemplateObj?.badge || 'Análise de Conteúdo'}`;
        badge.style.background = 'rgba(246, 168, 0, 0.15)';
        badge.style.color = 'var(--accent-blue-text)';
      } else {
        badge.textContent = 'Comentário Personalizado';
        badge.style.background = 'rgba(246, 168, 0, 0.15)';
        badge.style.color = 'var(--accent-amber-text)';
      }
    }

    if (this._commentDebounceTimer) {
      clearTimeout(this._commentDebounceTimer);
    }
    this._commentDebounceTimer = setTimeout(() => {
      this.saveCurrentStepData();
    }, 400);
  }

  /**
   * Restaura o comentário de uma figura para o modelo analítico atualmente selecionado
   */
  restoreFigureComment(figKey) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.evaluationComments) {
      this.currentTraining.evaluationComments = {};
    }

    const templateSelect = document.getElementById(`eval-comment-${figKey}-template`);
    const activeTemplateId = templateSelect ? templateSelect.value : ((this.currentTraining.evaluationCommentTemplates && this.currentTraining.evaluationCommentTemplates[figKey]) || 'categorial');

    const allTemplates = window.statsEngine ? window.statsEngine.getEvaluationCommentTemplates(figKey, this.currentTraining) : {};
    const selectedTemplate = allTemplates[activeTemplateId] || allTemplates.categorial;
    const defaultComment = selectedTemplate ? selectedTemplate.text : '';

    this.currentTraining.evaluationComments[figKey] = defaultComment;
    this.setFigureCommentCustom(figKey, false);

    const textarea = document.getElementById(`eval-comment-${figKey}`);
    if (textarea) {
      textarea.value = defaultComment;
    }

    const badge = document.getElementById(`eval-comment-${figKey}-badge`);
    if (badge && selectedTemplate) {
      badge.textContent = `Sugestão Padrão: ${selectedTemplate.badge || selectedTemplate.name}`;
      badge.style.background = 'rgba(246, 168, 0, 0.15)';
      badge.style.color = 'var(--accent-blue-text)';
    }

    this.saveCurrentStepData();
    this.showToast(`Comentário restaurado para o padrão (${selectedTemplate ? selectedTemplate.name : 'Análise de Conteúdo'})!`, 'info');
  }

  renderEvaluationCharts() {
    if (!window.chartEngine || !this.currentTraining) return;
    const isDark = this.theme === 'dark';
    this.applyChartFont();
    const evals = this.currentTraining.evaluations || [];

    // Figura 3: Participação CACS vs Gestor (calculado estritamente a partir das avaliações importadas)
    let cacsPresent = 0;
    let gestPresent = 0;

    if (evals.length > 0) {
      cacsPresent = evals.filter(e => e.representation === 'CACS-FUNDEB').length;
      gestPresent = evals.length - cacsPresent;
    }

    window.chartEngine.renderFig3Participation('chart-fig3-canvas', cacsPresent, gestPresent, isDark);

    // Figura 4: Avaliação da capacitação de todos os participantes
    const statsGen = window.statsEngine.calculateEvaluationStats(evals);
    window.chartEngine.renderEvaluationStackedBarChart('chart-fig4-canvas', statsGen.criterionDistributionPercent, '', isDark);

    // Figura 5: Avaliação dos conselheiros CACS
    const statsCACS = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation === 'CACS-FUNDEB'));
    window.chartEngine.renderEvaluationStackedBarChart('chart-fig5-canvas', statsCACS.criterionDistributionPercent, '', isDark);

    // Figura 6: Avaliação dos gestores municipais
    const statsGest = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation !== 'CACS-FUNDEB'));
    window.chartEngine.renderEvaluationStackedBarChart('chart-fig6-canvas', statsGest.criterionDistributionPercent, '', isDark);
  }

  renderWordClouds() {
    if (!window.wordCloudEngine || !this.currentTraining) return;
    const evals = this.currentTraining.evaluations || [];
    const isDark = this.theme === 'dark';

    if (evals.length === 0) {
      const canvas7 = document.getElementById('wordcloud-fig7-canvas');
      if (canvas7) {
        const ctx7 = canvas7.getContext('2d');
        if (ctx7) {
          ctx7.clearRect(0, 0, canvas7.width, canvas7.height);
          ctx7.save();
          ctx7.textAlign = 'center';
          ctx7.textBaseline = 'middle';
          ctx7.font = '600 13px "Plus Jakarta Sans", sans-serif';
          ctx7.fillStyle = isDark ? '#757575' : '#A6A6A6';
          ctx7.fillText('Nenhuma avaliação importada no momento', canvas7.width / 2, canvas7.height / 2);
          ctx7.restore();
        }
      }
      const canvas8 = document.getElementById('wordcloud-fig8-canvas');
      if (canvas8) {
        const ctx8 = canvas8.getContext('2d');
        if (ctx8) {
          ctx8.clearRect(0, 0, canvas8.width, canvas8.height);
          ctx8.save();
          ctx8.textAlign = 'center';
          ctx8.textBaseline = 'middle';
          ctx8.font = '600 13px "Plus Jakarta Sans", sans-serif';
          ctx8.fillStyle = isDark ? '#757575' : '#A6A6A6';
          ctx8.fillText('Nenhuma avaliação importada no momento', canvas8.width / 2, canvas8.height / 2);
          ctx8.restore();
        }
      }
      this.renderWordCloudControls();
      return;
    }

    const likedTexts = evals.map(e => e.likedAspects).filter(Boolean);
    const improveTexts = evals.map(e => e.improveAspects).filter(Boolean);

    const cloudFont = this.getWordCloudFont();

    // Nuvem de Aspectos Positivos (Figura 7)
    const likedWords = window.wordCloudEngine.processTextList(likedTexts);
    const canvas7 = document.getElementById('wordcloud-fig7-canvas');
    if (canvas7) {
      window.wordCloudEngine.renderToCanvas(canvas7, likedWords, { palette: 'positive', isDark, width: 650, height: 340, maxWords: 45, fontFamily: cloudFont });
    }

    // Nuvem de Aspectos a Melhorar (Figura 8)
    const improveWords = window.wordCloudEngine.processTextList(improveTexts);
    const canvas8 = document.getElementById('wordcloud-fig8-canvas');
    if (canvas8) {
      window.wordCloudEngine.renderToCanvas(canvas8, improveWords, { palette: 'improve', isDark, width: 650, height: 340, maxWords: 45, fontFamily: cloudFont });
    }

    this.renderWordCloudControls();
  }

  /**
   * Renderiza os controles de tipografia, títulos e fontes das Figuras 7 e 8 (Nuvens de Palavras)
   * mantendo a integridade do padrão institucional ABNT e suporte a personalização com restauração rápida.
   */
  renderWordCloudControls() {
    if (!this.currentTraining) return;
    const t = this.currentTraining;

    // 1. Tipografia selecionada
    const fontSelect = document.getElementById('wordcloud-font-select');
    if (fontSelect) {
      fontSelect.value = this.getWordCloudFont();
    }

    // 2. Figura 7 - Título
    const fig7DefaultTitle = 'Aspectos que gostaram da capacitação.';
    const fig7SavedTitle = (t.customWordCloudTitles && t.customWordCloudTitles.fig7) ? t.customWordCloudTitles.fig7.trim() : '';
    const fig7CleanTitle = this.cleanFigureTitle(7, fig7SavedTitle || fig7DefaultTitle, fig7DefaultTitle);
    const fig7IsCustomTitle = Boolean(fig7SavedTitle && fig7CleanTitle !== fig7DefaultTitle);
    const fig7InputTitle = document.getElementById('wordcloud-title-fig7');
    if (fig7InputTitle) fig7InputTitle.value = fig7CleanTitle;
    const fig7TitleBadge = document.getElementById('wordcloud-fig7-title-badge');
    if (fig7TitleBadge) {
      fig7TitleBadge.textContent = fig7IsCustomTitle ? 'Personalizado' : 'Padrão Oficial';
      fig7TitleBadge.className = fig7IsCustomTitle ? 'badge-title-status custom' : 'badge-title-status';
    }
    const fig7TitleRestoreBtn = document.getElementById('wordcloud-fig7-title-restore-btn');
    if (fig7TitleRestoreBtn) {
      fig7TitleRestoreBtn.style.display = fig7IsCustomTitle ? 'inline-flex' : 'none';
    }
    const fig7TitlePreview = document.getElementById('wordcloud-fig7-title-preview');
    if (fig7TitlePreview) {
      fig7TitlePreview.innerHTML = `Legenda no relatório: <strong>${this.escapeHtml(this.formatFigureCaption(7, fig7CleanTitle))}</strong>`;
    }

    // 3. Figura 7 - Fonte
    const fig7DefaultSource = 'Elaborada pelos autores.';
    const fig7SavedSource = (t.customWordCloudSources && t.customWordCloudSources.fig7) ? t.customWordCloudSources.fig7.trim() : '';
    const fig7CleanSource = this.cleanFigureSource(fig7SavedSource || fig7DefaultSource, fig7DefaultSource);
    const fig7IsCustomSource = Boolean(fig7SavedSource && fig7CleanSource !== fig7DefaultSource);
    const fig7InputSource = document.getElementById('wordcloud-source-fig7');
    if (fig7InputSource) fig7InputSource.value = fig7CleanSource;
    const fig7SourceBadge = document.getElementById('wordcloud-fig7-source-badge');
    if (fig7SourceBadge) {
      fig7SourceBadge.textContent = fig7IsCustomSource ? 'Personalizada' : 'Padrão Oficial';
      fig7SourceBadge.className = fig7IsCustomSource ? 'badge-title-status custom' : 'badge-title-status';
    }
    const fig7SourceRestoreBtn = document.getElementById('wordcloud-fig7-source-restore-btn');
    if (fig7SourceRestoreBtn) {
      fig7SourceRestoreBtn.style.display = fig7IsCustomSource ? 'inline-flex' : 'none';
    }
    const fig7SourcePreview = document.getElementById('wordcloud-fig7-source-preview');
    if (fig7SourcePreview) {
      fig7SourcePreview.innerHTML = `Fonte no relatório: <em>${this.escapeHtml(this.formatFigureSource(fig7CleanSource))}</em>`;
    }

    // 4. Figura 8 - Título
    const fig8DefaultTitle = 'Aspectos que devem melhorar da capacitação.';
    const fig8SavedTitle = (t.customWordCloudTitles && t.customWordCloudTitles.fig8) ? t.customWordCloudTitles.fig8.trim() : '';
    const fig8CleanTitle = this.cleanFigureTitle(8, fig8SavedTitle || fig8DefaultTitle, fig8DefaultTitle);
    const fig8IsCustomTitle = Boolean(fig8SavedTitle && fig8CleanTitle !== fig8DefaultTitle);
    const fig8InputTitle = document.getElementById('wordcloud-title-fig8');
    if (fig8InputTitle) fig8InputTitle.value = fig8CleanTitle;
    const fig8TitleBadge = document.getElementById('wordcloud-fig8-title-badge');
    if (fig8TitleBadge) {
      fig8TitleBadge.textContent = fig8IsCustomTitle ? 'Personalizado' : 'Padrão Oficial';
      fig8TitleBadge.className = fig8IsCustomTitle ? 'badge-title-status custom' : 'badge-title-status';
    }
    const fig8TitleRestoreBtn = document.getElementById('wordcloud-fig8-title-restore-btn');
    if (fig8TitleRestoreBtn) {
      fig8TitleRestoreBtn.style.display = fig8IsCustomTitle ? 'inline-flex' : 'none';
    }
    const fig8TitlePreview = document.getElementById('wordcloud-fig8-title-preview');
    if (fig8TitlePreview) {
      fig8TitlePreview.innerHTML = `Legenda no relatório: <strong>${this.escapeHtml(this.formatFigureCaption(8, fig8CleanTitle))}</strong>`;
    }

    // 5. Figura 8 - Fonte
    const fig8DefaultSource = 'Elaborada pelos autores.';
    const fig8SavedSource = (t.customWordCloudSources && t.customWordCloudSources.fig8) ? t.customWordCloudSources.fig8.trim() : '';
    const fig8CleanSource = this.cleanFigureSource(fig8SavedSource || fig8DefaultSource, fig8DefaultSource);
    const fig8IsCustomSource = Boolean(fig8SavedSource && fig8CleanSource !== fig8DefaultSource);
    const fig8InputSource = document.getElementById('wordcloud-source-fig8');
    if (fig8InputSource) fig8InputSource.value = fig8CleanSource;
    const fig8SourceBadge = document.getElementById('wordcloud-fig8-source-badge');
    if (fig8SourceBadge) {
      fig8SourceBadge.textContent = fig8IsCustomSource ? 'Personalizada' : 'Padrão Oficial';
      fig8SourceBadge.className = fig8IsCustomSource ? 'badge-title-status custom' : 'badge-title-status';
    }
    const fig8SourceRestoreBtn = document.getElementById('wordcloud-fig8-source-restore-btn');
    if (fig8SourceRestoreBtn) {
      fig8SourceRestoreBtn.style.display = fig8IsCustomSource ? 'inline-flex' : 'none';
    }
    const fig8SourcePreview = document.getElementById('wordcloud-fig8-source-preview');
    if (fig8SourcePreview) {
      fig8SourcePreview.innerHTML = `Fonte no relatório: <em>${this.escapeHtml(this.formatFigureSource(fig8CleanSource))}</em>`;
    }
  }

  handleWordCloudFontChange(fontName) {
    if (!this.currentTraining) return;
    const selected = fontName || 'Plus Jakarta Sans';
    this.currentTraining.customWordCloudFont = selected;
    this.currentTraining.wordCloudFontFamily = selected;
    this.renderWordClouds();
    this.saveCurrentStepData();
  }

  /**
   * Tipografia do relatório: com "todas as fontes iguais" (padrão), o texto do documento Word, os gráficos
   * (Figuras 3 a 6) e as nuvens de palavras (Figuras 7 e 8) usam a fonte padrão (figureFontFamily, padrão Times New Roman).
   * Com separateFigureFonts, cada um usa a sua fonte: documentFontFamily, chartFontFamily e customWordCloudFont.
   * Capacitações em que o usuário já tinha escolhido a fonte das figuras ficam com fontes diferentes, mantendo
   * o documento em Times New Roman e as figuras como estavam.
   */
  isSeparateFonts() {
    const t = this.currentTraining || {};
    if (typeof t.separateFigureFonts === 'boolean') return t.separateFigureFonts;
    return Boolean(t.figureFontFamily || t.customWordCloudFont);
  }

  getFigureFont() {
    const t = this.currentTraining || {};
    return t.figureFontFamily || 'Times New Roman';
  }

  getDocumentFont() {
    const t = this.currentTraining || {};
    return this.isSeparateFonts() ? (t.documentFontFamily || 'Times New Roman') : this.getFigureFont();
  }

  getChartFont() {
    const t = this.currentTraining || {};
    return this.isSeparateFonts() ? (t.chartFontFamily || t.figureFontFamily || 'Plus Jakarta Sans') : this.getFigureFont();
  }

  getWordCloudFont() {
    const t = this.currentTraining || {};
    return this.isSeparateFonts() ? (t.customWordCloudFont || t.figureFontFamily || 'Plus Jakarta Sans') : this.getFigureFont();
  }

  /**
   * Aplica a fonte do documento à prévia do relatório e às legendas exibidas na tela (variável CSS --report-font)
   */
  applyDocumentFont() {
    document.documentElement.style.setProperty('--report-font', `'${this.getDocumentFont()}'`);
  }

  /**
   * Sincroniza os seletores de fonte da Etapa 8 com a capacitação (valores e visibilidade dos seletores separados)
   */
  syncFigureFontControls() {
    const t = this.currentTraining;
    if (!t) return;
    // Fixa a decisão (iguais ou diferentes) na capacitação: a regra de compatibilidade só vale até a primeira exibição
    if (typeof t.separateFigureFonts !== 'boolean') t.separateFigureFonts = this.isSeparateFonts();
    const separate = t.separateFigureFonts;
    const set = (id, value) => { const el = document.getElementById(id); if (el && el.value !== value) el.value = value; };
    set('figure-font-select', this.getFigureFont());
    set('document-font-select', this.getDocumentFont());
    set('chart-font-select', this.getChartFont());
    set('wordcloud-font-select', this.getWordCloudFont());
    const check = document.getElementById('figure-font-separate');
    if (check) check.checked = separate;
    const separateRow = document.getElementById('chart-font-separate-row');
    if (separateRow) separateRow.style.display = separate ? 'grid' : 'none';
    const defaultRow = document.getElementById('figure-font-default-row');
    if (defaultRow) defaultRow.style.opacity = separate ? '0.5' : '1';
    const defaultSelect = document.getElementById('figure-font-select');
    if (defaultSelect) defaultSelect.disabled = separate;
    this.applyDocumentFont();
  }

  /**
   * Aplica a fonte vigente dos gráficos (Figuras 3 a 6) antes de renderizá-los
   */
  applyChartFont() {
    if (window.chartEngine && typeof window.chartEngine.setFontFamily === 'function') {
      window.chartEngine.setFontFamily(this.getChartFont());
    }
    this.syncFigureFontControls();
  }

  rerenderFigureFonts() {
    this.renderEvaluationCharts();
    this.renderWordClouds();
    this.syncFigureFontControls();
    this.saveCurrentStepData();
  }

  handleFigureFontChange(fontName) {
    if (!this.currentTraining) return;
    this.currentTraining.figureFontFamily = fontName || 'Times New Roman';
    this.rerenderFigureFonts();
  }

  restoreFigureFont() {
    this.handleFigureFontChange('Times New Roman');
  }

  toggleSeparateFigureFonts(separate) {
    if (!this.currentTraining) return;
    const t = this.currentTraining;
    if (separate) {
      // Ao separar, documento, gráficos e nuvens começam com a fonte padrão vigente
      const base = this.getFigureFont();
      t.documentFontFamily = base;
      t.chartFontFamily = base;
      t.customWordCloudFont = base;
      t.wordCloudFontFamily = base;
    } else {
      // Ao unificar, todas passam a usar a fonte que o documento estava usando
      t.figureFontFamily = this.getDocumentFont();
    }
    t.separateFigureFonts = Boolean(separate);
    this.rerenderFigureFonts();
  }

  handleDocumentFontChange(fontName) {
    if (!this.currentTraining) return;
    this.currentTraining.documentFontFamily = fontName || 'Times New Roman';
    this.syncFigureFontControls();
    this.saveCurrentStepData();
  }

  handleChartFontChange(fontName) {
    if (!this.currentTraining) return;
    this.currentTraining.chartFontFamily = fontName || 'Plus Jakarta Sans';
    this.renderEvaluationCharts();
    this.saveCurrentStepData();
  }

  restoreWordCloudFont() {
    if (!this.currentTraining) return;
    this.currentTraining.customWordCloudFont = 'Plus Jakarta Sans';
    this.currentTraining.wordCloudFontFamily = 'Plus Jakarta Sans';
    const fontSelect = document.getElementById('wordcloud-font-select');
    if (fontSelect) fontSelect.value = 'Plus Jakarta Sans';
    this.renderWordClouds();
    this.saveCurrentStepData();
  }

  handleWordCloudTitleInput(figKey, value) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.customWordCloudTitles) {
      this.currentTraining.customWordCloudTitles = {};
    }
    const figNum = figKey === 'fig7' ? 7 : 8;
    const defaultTitle = figKey === 'fig7' ? 'Aspectos que gostaram da capacitação.' : 'Aspectos que devem melhorar da capacitação.';
    const clean = this.cleanFigureTitle(figNum, value, defaultTitle);
    this.currentTraining.customWordCloudTitles[figKey] = clean;

    const isCustom = clean !== defaultTitle;
    const badge = document.getElementById(`wordcloud-${figKey}-title-badge`);
    if (badge) {
      badge.textContent = isCustom ? 'Personalizado' : 'Padrão Oficial';
      badge.className = isCustom ? 'badge-title-status custom' : 'badge-title-status';
    }
    const restoreBtn = document.getElementById(`wordcloud-${figKey}-title-restore-btn`);
    if (restoreBtn) {
      restoreBtn.style.display = isCustom ? 'inline-flex' : 'none';
    }
    const preview = document.getElementById(`wordcloud-${figKey}-title-preview`);
    if (preview) {
      preview.innerHTML = `Legenda no relatório: <strong>${this.escapeHtml(this.formatFigureCaption(figNum, clean))}</strong>`;
    }
    this.saveCurrentStepData();
  }

  restoreWordCloudTitle(figKey) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.customWordCloudTitles) {
      this.currentTraining.customWordCloudTitles = {};
    }
    const figNum = figKey === 'fig7' ? 7 : 8;
    const defaultTitle = figKey === 'fig7' ? 'Aspectos que gostaram da capacitação.' : 'Aspectos que devem melhorar da capacitação.';
    this.currentTraining.customWordCloudTitles[figKey] = defaultTitle;

    const input = document.getElementById(`wordcloud-title-${figKey}`);
    if (input) input.value = defaultTitle;
    const badge = document.getElementById(`wordcloud-${figKey}-title-badge`);
    if (badge) {
      badge.textContent = 'Padrão Oficial';
      badge.className = 'badge-title-status';
    }
    const restoreBtn = document.getElementById(`wordcloud-${figKey}-title-restore-btn`);
    if (restoreBtn) {
      restoreBtn.style.display = 'none';
    }
    const preview = document.getElementById(`wordcloud-${figKey}-title-preview`);
    if (preview) {
      preview.innerHTML = `Legenda no relatório: <strong>${this.escapeHtml(this.formatFigureCaption(figNum, defaultTitle))}</strong>`;
    }
    this.saveCurrentStepData();
  }

  handleWordCloudSourceInput(figKey, value) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.customWordCloudSources) {
      this.currentTraining.customWordCloudSources = {};
    }
    const defaultSource = 'Elaborada pelos autores.';
    const clean = this.cleanFigureSource(value, defaultSource);
    this.currentTraining.customWordCloudSources[figKey] = clean;

    const isCustom = clean !== defaultSource;
    const badge = document.getElementById(`wordcloud-${figKey}-source-badge`);
    if (badge) {
      badge.textContent = isCustom ? 'Personalizada' : 'Padrão Oficial';
      badge.className = isCustom ? 'badge-title-status custom' : 'badge-title-status';
    }
    const restoreBtn = document.getElementById(`wordcloud-${figKey}-source-restore-btn`);
    if (restoreBtn) {
      restoreBtn.style.display = isCustom ? 'inline-flex' : 'none';
    }
    const preview = document.getElementById(`wordcloud-${figKey}-source-preview`);
    if (preview) {
      preview.innerHTML = `Fonte no relatório: <em>${this.escapeHtml(this.formatFigureSource(clean))}</em>`;
    }
    this.saveCurrentStepData();
  }

  restoreWordCloudSource(figKey) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.customWordCloudSources) {
      this.currentTraining.customWordCloudSources = {};
    }
    const defaultSource = 'Elaborada pelos autores.';
    this.currentTraining.customWordCloudSources[figKey] = defaultSource;

    const input = document.getElementById(`wordcloud-source-${figKey}`);
    if (input) input.value = defaultSource;
    const badge = document.getElementById(`wordcloud-${figKey}-source-badge`);
    if (badge) {
      badge.textContent = 'Padrão Oficial';
      badge.className = 'badge-title-status';
    }
    const restoreBtn = document.getElementById(`wordcloud-${figKey}-source-restore-btn`);
    if (restoreBtn) {
      restoreBtn.style.display = 'none';
    }
    const preview = document.getElementById(`wordcloud-${figKey}-source-preview`);
    if (preview) {
      preview.innerHTML = `Fonte no relatório: <em>${this.escapeHtml(this.formatFigureSource(defaultSource))}</em>`;
    }
    this.saveCurrentStepData();
  }

  /* ==========================================================================
     ETAPA 8: REGISTROS FOTOGRÁFICOS & DRAG AND DROP
     ========================================================================== */
  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.add('dragover');
    }
  }

  handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.remove('dragover');
    }
  }

  async handlePhotoDrop(slotId, defaultCaption, event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.remove('dragover');
    }

    // Foto arrastada de outro cartão para este slot vazio: move a foto (não é envio de arquivo)
    if (slotId && this.draggedPhotoSlotId) {
      this.handlePhotoDropCard(slotId, event);
      return;
    }

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0 || !this.currentTraining) return;

    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    if (slotId) {
      // Slot específico
      const file = imageFiles[0];
      let dataUrl;
      try {
        dataUrl = await this.fileToReportImageDataUrl(file);
      } catch (err) {
        this.notifyImageReadError(file, err);
        return;
      }
      const slots = this.getStandardPhotoSlots();
      const slot = slots.find(s => s.slotId === slotId);
      let captionToUse = defaultCaption;
      let titleToUse = defaultCaption;
      let sourceToUse = 'Fonte: Elaborada pelos autores.';
      let customSourceToKeep;

      if (slot) {
        const slotInfo = this.getPhotoSlotInfo(slot);
        captionToUse = slotInfo.caption;
        titleToUse = slotInfo.title;
        sourceToUse = slotInfo.sourceFormatted;
      } else {
        // Foto complementar (fora dos slots padrão) substituída: mantém título, legenda e fonte já definidos
        const previous = this.currentTraining.media.find(m => m.type === 'photo' && (m.slotId === slotId || m.id === slotId));
        if (previous) {
          captionToUse = previous.caption || captionToUse;
          titleToUse = previous.title || titleToUse;
          sourceToUse = previous.source || sourceToUse;
          if (previous.customSource) customSourceToKeep = previous.customSource;
        }
      }

      // Substitui na mesma posição para não alterar a ordem (e a numeração) das fotos complementares
      const media = this.currentTraining.media;
      const replaceIdx = media.findIndex(m => m.slotId === slotId || m.id === slotId);
      this.currentTraining.media = media.filter(m => m.slotId !== slotId && m.id !== slotId);
      this.currentTraining.media.splice(replaceIdx >= 0 ? replaceIdx : this.currentTraining.media.length, 0, {
        id: `photo_${Date.now()}_${slotId}`,
        slotId: slotId,
        type: 'photo',
        blob: dataUrl,
        caption: captionToUse,
        title: titleToUse,
        source: sourceToUse,
        ...(customSourceToKeep ? { customSource: customSourceToKeep } : {}),
        fileName: file.name
      });
      this.renderPhotosStep();
      this.saveCurrentStepData();
      this.showToast(`Imagem enviada com sucesso!`, 'success');
    } else {
      // Drop em lote no grid
      const mockEvent = { target: { files: imageFiles } };
      await this.handlePhotoUpload(mockEvent);
    }
  }

  handlePhotoDragStart(slotId, event) {
    this.draggedPhotoSlotId = slotId;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', slotId);
  }

  handlePhotoDragOverCard(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (event.currentTarget && event.currentTarget.style) {
      event.currentTarget.style.transition = 'transform 0.15s ease, border-color 0.15s ease';
      event.currentTarget.style.transform = 'scale(1.02)';
      event.currentTarget.style.borderColor = 'var(--accent-blue-text, #F6A800)';
    }
  }

  handlePhotoDragLeaveCard(event) {
    if (event.currentTarget && event.currentTarget.style) {
      event.currentTarget.style.transform = '';
      event.currentTarget.style.borderColor = '';
    }
  }

  handlePhotoDropCard(targetSlotId, event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.style) {
      event.currentTarget.style.transform = '';
      event.currentTarget.style.borderColor = '';
    }

    // Arquivo arrastado do computador sobre um cartão já preenchido: substitui a foto desse cartão
    const droppedFiles = event.dataTransfer?.files;
    if (!this.draggedPhotoSlotId && droppedFiles && droppedFiles.length > 0) {
      this.handlePhotoDrop(targetSlotId, '', event);
      return;
    }

    const sourceSlotId = this.draggedPhotoSlotId || event.dataTransfer.getData('text/plain');
    this.draggedPhotoSlotId = null;
    if (!sourceSlotId || sourceSlotId === targetSlotId) return;

    if (!this.currentTraining || !this.currentTraining.media) return;

    const sourcePhoto = this.currentTraining.media.find(m => m.type === 'photo' && (m.slotId === sourceSlotId || m.id === sourceSlotId));
    const targetPhoto = this.currentTraining.media.find(m => m.type === 'photo' && (m.slotId === targetSlotId || m.id === targetSlotId));

    const standardSlots = this.getStandardPhotoSlots();
    const isStandardSlot = (id) => standardSlots.some(s => s.slotId === id);

    // Duas fotos complementares: a ordem vem da posição no array de mídia, então troca as posições
    // (gravar o id de uma foto no slotId da outra faria "Remover" apagar as duas)
    if (sourcePhoto && targetPhoto && !isStandardSlot(sourcePhoto.slotId) && !isStandardSlot(targetPhoto.slotId)) {
      const media = this.currentTraining.media;
      const i = media.indexOf(sourcePhoto);
      const j = media.indexOf(targetPhoto);
      [media[i], media[j]] = [media[j], media[i]];
      this.renderPhotosStep();
      this.saveCurrentStepData();
      this.showToast('Posição das figuras reordenada!', 'success');
      return;
    }

    if (sourcePhoto) {
      sourcePhoto.slotId = targetSlotId;
      sourcePhoto.movedByUser = true;
    }
    if (targetPhoto) {
      targetPhoto.slotId = sourceSlotId;
      targetPhoto.movedByUser = true;
    }

    // O título padrão pertence ao slot (momento do relatório), não à foto: ao mover uma foto para um slot
    // padrão, ela assume o título do slot (ou o título personalizado salvo para esse slot)
    [sourcePhoto, targetPhoto].forEach(photo => {
      const slot = photo && standardSlots.find(s => s.slotId === photo.slotId);
      if (slot) {
        photo.caption = slot.defaultCaption;
        photo.title = slot.defaultTitle;
        // Com a legenda padrão aplicada, getPhotoSlotInfo considera apenas o título personalizado do slot
        const slotInfo = this.getPhotoSlotInfo(slot);
        photo.caption = slotInfo.caption;
        photo.title = slotInfo.title;
      }
    });
    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast('Posição das figuras reordenada!', 'success');
  }

  getTrainingDaysCount() {
    if (!this.currentTraining) return 2;
    if (this.currentTraining.durationDays && parseInt(this.currentTraining.durationDays) > 0) {
      return parseInt(this.currentTraining.durationDays);
    }
    const start = this.currentTraining.startDate ? new Date(this.currentTraining.startDate) : null;
    const end = this.currentTraining.endDate ? new Date(this.currentTraining.endDate) : null;
    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffMs = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, Math.min(10, diffDays));
    }
    return 2;
  }

  /**
   * Número da primeira fotografia no relatório (Figura 9 no modelo oficial; muda quando
   * figuras de Tecnologias Educacionais são removidas ou adicionadas)
   */
  getPhotoFigureStart() {
    const gen = window.reportDocxGenerator;
    if (gen && typeof gen.getFigureNumbering === 'function' && this.currentTraining) {
      return gen.getFigureNumbering(this.currentTraining).photoStart;
    }
    return 9;
  }

  getStandardPhotoSlots() {
    const daysCount = this.getTrainingDaysCount();

    // slotId é o identificador fixo do slot; figNum é o número exibido, calculado pela numeração vigente
    const baseSlots = [
      { slotId: 'fig_9', defaultTitle: 'Acomodação dos participantes.' },
      { slotId: 'fig_10', defaultTitle: 'Apresentação inicial do curso.' },
      { slotId: 'fig_11', defaultTitle: 'Apresentação dos módulos teóricos.' }
    ];

    for (let day = 1; day <= daysCount; day++) {
      baseSlots.push({
        slotId: `fig_${11 + day}_day_${day}`,
        defaultTitle: `Final da capacitação do ${day}º dia.`
      });
    }

    // Mesma regra do relatório Word: só slots com foto consomem número; um slot vazio exibe o número
    // que a foto receberá ao ser anexada
    const photos = (this.currentTraining?.media || []).filter(m => m.type === 'photo' && m.blob);
    const used = new Set();
    let next = this.getPhotoFigureStart();
    const slots = baseSlots.map(slot => {
      let photo = photos.find(p => p.slotId === slot.slotId);
      if (!photo && slot.slotId.includes('_day_')) {
        const dayPart = slot.slotId.split('_day_')[1];
        photo = photos.find(p => p.slotId && p.slotId.endsWith(`_day_${dayPart}`));
      }
      const filled = Boolean(photo && !used.has(photo));
      if (filled) used.add(photo);
      const figNum = filled ? next++ : next;
      return { ...slot, figNum, defaultCaption: `Figura ${figNum}. ${slot.defaultTitle}` };
    });
    this.extraPhotoFigureStart = next;
    return slots;
  }

  /**
   * Número da primeira foto complementar (logo após as fotos dos slots padrão efetivamente preenchidos)
   */
  getExtraPhotoFigureStart() {
    this.getStandardPhotoSlots();
    return this.extraPhotoFigureStart;
  }

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Remove prefixos redundantes de figuras digitados pelo usuário (ex: 'Figura 9. ', 'Figura 9: ')
   * mantendo apenas o texto descritivo puro do título.
   */
  cleanFigureTitle(figNum, rawTitle, defaultTitle = '') {
    if (!rawTitle || typeof rawTitle !== 'string') {
      rawTitle = defaultTitle || '';
    }
    let clean = rawTitle.trim();
    if (figNum) {
      const regex = new RegExp(`^figura\\s*${figNum}\\s*[\\.:\\-–—]?\\s*`, 'i');
      clean = clean.replace(regex, '').trim();
    }
    clean = clean.replace(/^figura\s*\d+\s*[\.:\-–—]?\s*/i, '').trim();
    if (!clean && defaultTitle) {
      if (figNum) {
        clean = defaultTitle.replace(new RegExp(`^figura\\s*${figNum}\\s*[\\.:\\-–—]?\\s*`, 'i'), '').trim();
      } else {
        clean = defaultTitle.trim();
      }
    }
    return clean;
  }

  /**
   * Formata a legenda oficial completa da figura com base no número e no título informado,
   * assegurando a norma institucional: 'Figura {figNum}. {Título}.'
   */
  formatFigureCaption(figNum, rawTitle, defaultTitle = '') {
    const clean = this.cleanFigureTitle(figNum, rawTitle, defaultTitle);
    let titleWithDot = clean.trim();
    if (titleWithDot && !/[.!?]$/.test(titleWithDot)) {
      titleWithDot += '.';
    }
    return `Figura ${figNum}. ${titleWithDot}`;
  }

  /**
   * Remove prefixos redundantes de fonte digitados pelo usuário (ex: 'Fonte: ', 'Fonte. ')
   * mantendo apenas o texto descritivo da fonte (padrão oficial: 'Elaborada pelos autores.').
   */
  cleanFigureSource(rawSource, defaultSource = 'Elaborada pelos autores.') {
    if (!rawSource || typeof rawSource !== 'string') {
      rawSource = defaultSource || 'Elaborada pelos autores.';
    }
    let clean = rawSource.trim();
    clean = clean.replace(/^fonte\s*[\.:\-–—]?\s*/i, '').trim();
    if (!clean && defaultSource) {
      clean = defaultSource.replace(/^fonte\s*[\.:\-–—]?\s*/i, '').trim();
    }
    return clean;
  }

  /**
   * Formata a citação oficial de fonte da figura segundo a norma ABNT/institucional: 'Fonte: {Texto}.'
   */
  formatFigureSource(cleanSource, defaultSource = 'Elaborada pelos autores.') {
    const clean = this.cleanFigureSource(cleanSource, defaultSource);
    let sourceWithDot = clean.trim();
    if (sourceWithDot && !/[.!?]$/.test(sourceWithDot)) {
      sourceWithDot += '.';
    }
    return `Fonte: ${sourceWithDot}`;
  }

  /**
   * Retorna os dados vigentes (título, legenda e fonte) de um slot de foto, considerando se há personalização
   */
  getPhotoSlotInfo(slot) {
    if (!this.currentTraining) {
      return { 
        title: slot.defaultTitle, 
        caption: slot.defaultCaption, 
        isCustom: false, 
        photo: null,
        sourceClean: 'Elaborada pelos autores.',
        sourceFormatted: 'Fonte: Elaborada pelos autores.',
        isCustomSource: false
      };
    }
    const customTitles = this.currentTraining.customPhotoTitles || {};
    const customSources = this.currentTraining.customPhotoSources || {};
    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    let photo = photos.find(p => p.slotId === slot.slotId);
    if (!photo && slot.slotId.includes('_day_')) {
      const dayPart = slot.slotId.split('_day_')[1];
      photo = photos.find(p => p.slotId && p.slotId.endsWith(`_day_${dayPart}`));
    }
    if (!photo) {
      // Compatibilidade com fotos antigas sem slot: nunca reaproveitar uma foto que já pertence a outro slot
      photo = photos.find(p => !p.slotId && p.caption && p.caption.toLowerCase().includes(slot.defaultTitle.toLowerCase().slice(0, 15)));
    }

    const defaultPureTitle = this.cleanFigureTitle(slot.figNum, slot.defaultTitle);
    let savedCustom = customTitles[slot.slotId];
    if (!savedCustom && photo && photo.caption && photo.caption !== slot.defaultCaption) {
      savedCustom = this.cleanFigureTitle(slot.figNum, photo.caption, defaultPureTitle);
      // Título padrão de dia herdado de outro slot (não digitado pelo usuário) acompanha o slot, não a foto
      if (/^final da capacitação do \d+º dia\.?$/i.test(savedCustom)) {
        savedCustom = null;
      }
    }

    const isCustom = Boolean(savedCustom && savedCustom.trim() !== defaultPureTitle);
    const title = isCustom ? savedCustom.trim() : defaultPureTitle;
    const caption = this.formatFigureCaption(slot.figNum, title, defaultPureTitle);

    // Fonte da figura (mantém padrão oficial institucional)
    const defaultPureSource = 'Elaborada pelos autores.';
    let savedCustomSource = customSources[slot.slotId];
    if (!savedCustomSource && photo && photo.source && photo.source !== 'Fonte: Elaborada pelos autores.') {
      savedCustomSource = this.cleanFigureSource(photo.source, defaultPureSource);
    }

    const isCustomSource = Boolean(savedCustomSource && savedCustomSource.trim() !== defaultPureSource);
    const sourceClean = isCustomSource ? savedCustomSource.trim() : defaultPureSource;
    const sourceFormatted = this.formatFigureSource(sourceClean, defaultPureSource);

    return { title, caption, isCustom, photo, sourceClean, sourceFormatted, isCustomSource };
  }

  handlePhotoTitleInput(slotId, figNum, newTitle) {
    const cleanTitle = this.cleanFigureTitle(figNum, newTitle);
    const fullCaption = this.formatFigureCaption(figNum, cleanTitle);

    // Atualiza cabeçalho do card
    const headerTitleEl = document.getElementById(`photo-header-title-${slotId}`);
    if (headerTitleEl) {
      headerTitleEl.textContent = fullCaption;
    }

    // Atualiza preview de legenda
    const previewEl = document.getElementById(`photo-caption-preview-${slotId}`);
    if (previewEl) {
      previewEl.textContent = fullCaption;
    }
  }

  updatePhotoTitle(slotId, figNum, newTitle) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.customPhotoTitles) this.currentTraining.customPhotoTitles = {};

    const slots = this.getStandardPhotoSlots();
    const slot = slots.find(s => s.slotId === slotId);
    const defaultTitle = slot ? slot.defaultTitle : '';

    const cleanTitle = this.cleanFigureTitle(figNum, newTitle, defaultTitle);
    const fullCaption = this.formatFigureCaption(figNum, cleanTitle, defaultTitle);

    this.currentTraining.customPhotoTitles[slotId] = cleanTitle;

    // Se já houver foto anexada neste slot, sincroniza nela
    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    let photo = photos.find(p => p.slotId === slotId || p.id === slotId);
    if (!photo && slotId && slotId.includes('_day_')) {
      const dayPart = slotId.split('_day_')[1];
      photo = photos.find(p => p.slotId && p.slotId.endsWith(`_day_${dayPart}`));
    }
    if (photo) {
      photo.caption = fullCaption;
      photo.title = cleanTitle;
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`Título da Figura ${figNum} atualizado no padrão oficial!`, 'success');
  }

  restorePhotoTitle(slotId) {
    if (!this.currentTraining) return;
    const slots = this.getStandardPhotoSlots();
    const slot = slots.find(s => s.slotId === slotId);

    if (this.currentTraining.customPhotoTitles) {
      delete this.currentTraining.customPhotoTitles[slotId];
    }

    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    let photo = photos.find(p => p.slotId === slotId || p.id === slotId);
    if (!photo && slotId && slotId.includes('_day_')) {
      const dayPart = slotId.split('_day_')[1];
      photo = photos.find(p => p.slotId && p.slotId.endsWith(`_day_${dayPart}`));
    }

    if (photo && slot) {
      photo.caption = slot.defaultCaption;
      photo.title = slot.defaultTitle;
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast('Título restaurado para o padrão oficial!', 'info');
  }

  handlePhotoSourceInput(slotId, newSource) {
    const cleanSource = this.cleanFigureSource(newSource);
    const fullSource = this.formatFigureSource(cleanSource);

    // Atualiza preview de fonte
    const previewEl = document.getElementById(`photo-source-preview-${slotId}`);
    if (previewEl) {
      previewEl.textContent = fullSource;
    }
  }

  updatePhotoSource(slotId, figNum, newSource) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.customPhotoSources) this.currentTraining.customPhotoSources = {};

    const cleanSource = this.cleanFigureSource(newSource);
    const fullSource = this.formatFigureSource(cleanSource);

    this.currentTraining.customPhotoSources[slotId] = cleanSource;

    // Se já houver foto anexada neste slot, sincroniza nela
    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    let photo = photos.find(p => p.slotId === slotId || p.id === slotId);
    if (!photo && slotId && slotId.includes('_day_')) {
      const dayPart = slotId.split('_day_')[1];
      photo = photos.find(p => p.slotId && p.slotId.endsWith(`_day_${dayPart}`));
    }
    if (photo) {
      photo.source = fullSource;
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`Fonte da Figura ${figNum} atualizada no padrão oficial!`, 'success');
  }

  restorePhotoSource(slotId) {
    if (!this.currentTraining) return;
    if (this.currentTraining.customPhotoSources) {
      delete this.currentTraining.customPhotoSources[slotId];
    }

    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    let photo = photos.find(p => p.slotId === slotId || p.id === slotId);
    if (!photo && slotId && slotId.includes('_day_')) {
      const dayPart = slotId.split('_day_')[1];
      photo = photos.find(p => p.slotId && p.slotId.endsWith(`_day_${dayPart}`));
    }

    if (photo) {
      photo.source = 'Fonte: Elaborada pelos autores.';
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast('Fonte restaurada para o padrão oficial!', 'info');
  }

  handleExtraPhotoSourceInput(photoId, newSource) {
    const cleanSource = this.cleanFigureSource(newSource);
    const fullSource = this.formatFigureSource(cleanSource);

    const previewEl = document.getElementById(`photo-source-preview-${photoId}`);
    if (previewEl) {
      previewEl.textContent = fullSource;
    }
  }

  updateExtraPhotoSource(photoId, extraFigNum, newSource) {
    if (!this.currentTraining) return;
    const cleanSource = this.cleanFigureSource(newSource);
    const fullSource = this.formatFigureSource(cleanSource);

    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    const photo = photos.find(p => p.id === photoId);
    if (photo) {
      photo.source = fullSource;
      photo.customSource = cleanSource;
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`Fonte da Figura ${extraFigNum} atualizada no padrão oficial!`, 'success');
  }

  restoreExtraPhotoSource(photoId) {
    if (!this.currentTraining) return;
    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    const photo = photos.find(p => p.id === photoId);
    if (photo) {
      photo.source = 'Fonte: Elaborada pelos autores.';
      delete photo.customSource;
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast('Fonte restaurada para o padrão oficial!', 'info');
  }

  openBatchSourceModal() {
    const overlay = document.getElementById('app-batch-source-modal-overlay');
    const input = document.getElementById('batch-source-modal-input');
    if (input) {
      input.value = 'Elaborada pelos autores.';
    }
    if (overlay) {
      overlay.style.display = 'flex';
      setTimeout(() => { if (input) input.focus(); }, 100);
    }
  }

  closeBatchSourceModal() {
    const overlay = document.getElementById('app-batch-source-modal-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  applyBatchSourceModalAction() {
    const input = document.getElementById('batch-source-modal-input');
    const val = input ? input.value : 'Elaborada pelos autores.';
    this.applySourceToAllPhotos(val);
    this.closeBatchSourceModal();
  }

  applySourceToAllPhotos(rawSource) {
    if (!this.currentTraining) return;
    const cleanSource = this.cleanFigureSource(rawSource);
    const fullSource = this.formatFigureSource(cleanSource);

    if (!this.currentTraining.customPhotoSources) this.currentTraining.customPhotoSources = {};

    const slots = this.getStandardPhotoSlots();
    slots.forEach(slot => {
      this.currentTraining.customPhotoSources[slot.slotId] = cleanSource;
    });

    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    photos.forEach(photo => {
      photo.source = fullSource;
      if (photo.slotId && !slots.some(s => s.slotId === photo.slotId)) {
        photo.customSource = cleanSource;
      }
    });

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`Fonte aplicada a todas as fotografias (${fullSource})!`, 'success');
  }

  async handleSinglePhotoUpload(slotId, defaultCaption, event) {
    const file = event.target.files?.[0];
    if (!file || !this.currentTraining) return;

    if (!this.currentTraining.media) this.currentTraining.media = [];

    let dataUrl;
    try {
      dataUrl = await this.fileToReportImageDataUrl(file);
    } catch (err) {
      this.notifyImageReadError(file, err);
      return;
    } finally {
      if (event.target && 'value' in event.target) event.target.value = '';
    }

    // Recupera título, legenda e fonte vigentes (considerando personalização prévia do usuário)
    const slots = this.getStandardPhotoSlots();
    const slot = slots.find(s => s.slotId === slotId);
    let captionToUse = defaultCaption;
    let titleToUse = defaultCaption;
    let sourceToUse = 'Fonte: Elaborada pelos autores.';

    if (slot) {
      const slotInfo = this.getPhotoSlotInfo(slot);
      captionToUse = slotInfo.caption;
      titleToUse = slotInfo.title;
      sourceToUse = slotInfo.sourceFormatted;
    }

    // Remover se já existia foto neste slot
    this.currentTraining.media = this.currentTraining.media.filter(m => m.slotId !== slotId && m.id !== slotId);

    this.currentTraining.media.push({
      id: `photo_${Date.now()}_${slotId}`,
      slotId: slotId,
      type: 'photo',
      blob: dataUrl,
      caption: captionToUse,
      title: titleToUse,
      source: sourceToUse,
      fileName: file.name
    });

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`Imagem enviada com sucesso!`, 'success');
  }

  async handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0 || !this.currentTraining) return;

    if (!this.currentTraining.media) this.currentTraining.media = [];

    const slots = this.getStandardPhotoSlots();
    const isPhotoInSlots = (m) => m.type === 'photo' && slots.some(s => s.slotId === m.slotId);
    let addedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let dataUrl;
      try {
        dataUrl = await this.fileToReportImageDataUrl(file);
      } catch (err) {
        this.notifyImageReadError(file, err);
        continue;
      }

      // Encontrar slot sem foto
      const emptySlot = slots.find(s => !this.currentTraining.media.some(m => m.slotId === s.slotId));
      let targetSlotId;
      let targetCaption;
      let targetTitle;
      let targetSource;

      if (emptySlot) {
        targetSlotId = emptySlot.slotId;
        const slotInfo = this.getPhotoSlotInfo(emptySlot);
        targetCaption = slotInfo.caption;
        targetTitle = slotInfo.title;
        targetSource = slotInfo.sourceFormatted;
      } else {
        // Próximo número após os slots padrão e as fotos extras já existentes
        const existingExtras = this.currentTraining.media.filter(m => m.type === 'photo' && !isPhotoInSlots(m)).length;
        const extraFigNum = this.getExtraPhotoFigureStart() + existingExtras;
        targetSlotId = `fig_extra_${Date.now()}_${i}`;
        targetCaption = `Figura ${extraFigNum}. Registro complementar da capacitação.`;
        targetTitle = `Registro complementar da capacitação.`;
        targetSource = `Fonte: Elaborada pelos autores.`;
      }

      this.currentTraining.media.push({
        id: `photo_${Date.now()}_${i}`,
        slotId: targetSlotId,
        type: 'photo',
        blob: dataUrl,
        caption: targetCaption,
        title: targetTitle,
        source: targetSource,
        fileName: file.name
      });
      addedCount++;
    }

    if (event.target && 'value' in event.target) event.target.value = '';

    this.renderPhotosStep();
    this.saveCurrentStepData();
    if (addedCount > 0) {
      this.showToast(`${addedCount} ${addedCount === 1 ? 'foto adicionada' : 'fotos adicionadas'} à galeria!`, 'success');
    }
  }

  confirmRemovePhoto(slotId) {
    if (!this.currentTraining) return;
    const photo = (this.currentTraining.media || []).find(m => m.slotId === slotId || m.id === slotId);
    const slots = this.getStandardPhotoSlots();
    const slot = slots.find(s => s.slotId === slotId);
    const slotInfo = slot ? this.getPhotoSlotInfo(slot) : null;
    const captionText = photo?.caption || slotInfo?.caption || slot?.defaultCaption || 'Fotografia';

    this.openConfirmModal({
      title: 'Remover Fotografia',
      msg: `Tem certeza que deseja remover a imagem de "${captionText}"?`,
      btnText: 'Sim, Remover Foto',
      successTitle: 'Fotografia Removida!',
      successMsg: 'A imagem foi removida da galeria com sucesso.',
      onConfirm: () => this.executeRemovePhoto(slotId)
    });
  }

  executeRemovePhoto(slotId) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.media) this.currentTraining.media = [];

    this.currentTraining.media = this.currentTraining.media.filter(m => m.slotId !== slotId && m.id !== slotId);
    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast('Fotografia removida com sucesso!', 'success');
  }

  updatePhotoCaption(slotId, newCaption) {
    if (!this.currentTraining) return;
    const slots = this.getStandardPhotoSlots();
    const slot = slots.find(s => s.slotId === slotId);
    const figNum = slot ? slot.figNum : 9;
    this.updatePhotoTitle(slotId, figNum, newCaption);
  }

  renderPhotosStep() {
    const container = document.getElementById('wizard-photos-grid');
    if (!container || !this.currentTraining) return;

    const slots = this.getStandardPhotoSlots();
    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');

    // Correção de dados de versões anteriores: foto enviada para um dia (id termina com o slot de origem)
    // que foi deslocada para o slot de outro dia volta ao slot de origem, se ele estiver vazio
    const daySlotIds = slots.map(s => s.slotId).filter(id => id.includes('_day_'));
    photos.forEach(p => {
      const originSlot = daySlotIds.find(id => p.id && p.id.endsWith(`_${id}`));
      if (originSlot && !p.movedByUser && p.slotId && p.slotId !== originSlot && daySlotIds.includes(p.slotId) &&
          !photos.some(o => o.slotId === originSlot)) {
        p.slotId = originSlot;
      }
    });

    let html = '';

    slots.forEach(slot => {
      const slotInfo = this.getPhotoSlotInfo(slot);
      let photo = slotInfo.photo;

      if (photo) {
        photo.slotId = slot.slotId;
        photo.caption = slotInfo.caption;
        photo.title = slotInfo.title;
        photo.source = slotInfo.sourceFormatted;
      }

      if (photo) {
        // Card com foto anexada (Draggable para reordenar)
        html += `
          <div class="glass-card" 
               draggable="true"
               ondragstart="app.handlePhotoDragStart('${slot.slotId}', event)"
               ondragend="app.draggedPhotoSlotId = null"
               ondragover="app.handlePhotoDragOverCard(event)"
               ondragleave="app.handlePhotoDragLeaveCard(event)"
               ondrop="app.handlePhotoDropCard('${slot.slotId}', event)"
               style="padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem; border:1px solid rgba(16, 185, 129, 0.35); cursor:grab;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:var(--accent-emerald-text, #10b981); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span id="photo-header-title-${slot.slotId}">${this.escapeHtml(slotInfo.caption)}</span>
              </strong>
              <div style="display:flex; align-items:center; gap:0.35rem;">
                ${(slotInfo.isCustom || slotInfo.isCustomSource) ? `<span class="nav-badge" style="background:rgba(246, 168, 0, 0.15); color:var(--accent-blue-text, #F6A800); font-size:0.68rem; padding:0.15rem 0.45rem;">Personalizado</span>` : ''}
                <span class="nav-badge badge-emerald" style="font-size:0.72rem;">Anexada</span>
              </div>
            </div>

            <div style="position:relative; width:100%; height:180px; border-radius:var(--radius-sm); overflow:hidden; background:var(--bg-input); border:1px solid var(--border-color);">
              <img src="${photo.blob}" alt="${this.escapeHtml(slotInfo.caption)}" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div style="display:flex; flex-direction:column; gap:0.35rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Título da Figura (mantém padrão):</label>
                ${slotInfo.isCustom ? `
                  <button type="button" class="btn-restore-title" onclick="app.restorePhotoTitle('${slot.slotId}')" title="Restaurar título padrão oficial">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                    Restaurar Padrão
                  </button>
                ` : `
                  <span style="font-size:0.72rem; color:var(--text-muted); font-style:italic;">Padrão Oficial</span>
                `}
              </div>
              <div class="photo-title-input-group">
                <span class="photo-title-addon">Figura ${slot.figNum}.</span>
                <input type="text" class="photo-title-input" id="photo-input-${slot.slotId}" 
                       value="${this.escapeHtml(slotInfo.title)}"
                       placeholder="Título descritivo da figura..."
                       oninput="app.handlePhotoTitleInput('${slot.slotId}', ${slot.figNum}, this.value)"
                       onchange="app.updatePhotoTitle('${slot.slotId}', ${slot.figNum}, this.value)">
              </div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.15rem; display:flex; justify-content:space-between; gap:0.5rem; flex-wrap:wrap;">
                <span>Legenda no relatório: <strong id="photo-caption-preview-${slot.slotId}" style="color:var(--text-primary); font-family:var(--report-font, 'Times New Roman'), serif;">${this.escapeHtml(slotInfo.caption)}</strong></span>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.35rem; margin-top:0.25rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Fonte da Figura (mantém padrão):</label>
                ${slotInfo.isCustomSource ? `
                  <button type="button" class="btn-restore-title" onclick="app.restorePhotoSource('${slot.slotId}')" title="Restaurar fonte padrão oficial">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                    Restaurar Padrão
                  </button>
                ` : `
                  <span style="font-size:0.72rem; color:var(--text-muted); font-style:italic;">Padrão Oficial</span>
                `}
              </div>
              <div class="photo-title-input-group">
                <span class="photo-source-addon">Fonte:</span>
                <input type="text" class="photo-title-input" id="photo-source-input-${slot.slotId}" 
                       value="${this.escapeHtml(slotInfo.sourceClean)}"
                       placeholder="Ex: Elaborada pelos autores."
                       oninput="app.handlePhotoSourceInput('${slot.slotId}', this.value)"
                       onchange="app.updatePhotoSource('${slot.slotId}', ${slot.figNum}, this.value)">
              </div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.15rem; display:flex; justify-content:space-between; gap:0.5rem; flex-wrap:wrap;">
                <span>Fonte no relatório: <strong id="photo-source-preview-${slot.slotId}" style="color:var(--text-primary); font-family:var(--report-font, 'Times New Roman'), serif; font-style:italic;">${this.escapeHtml(slotInfo.sourceFormatted)}</strong></span>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.25rem;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('file-slot-${slot.slotId}').click()" style="padding:0.3rem 0.6rem; font-size:0.78rem;">
                Trocar Foto
              </button>
              <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmRemovePhoto('${slot.slotId}')" style="padding:0.3rem 0.6rem; font-size:0.78rem;">
                ${window.icons.delete} Remover Foto
              </button>
            </div>
            <input type="file" id="file-slot-${slot.slotId}" accept="image/*" style="display:none;" onchange="app.handleSinglePhotoUpload('${slot.slotId}', '${slot.defaultCaption}', event)">
          </div>
        `;
      } else {
        // Card vazio (Dropzone padronizada com suporte a edição de título e fonte mantendo padrão)
        html += `
          <div class="glass-card" 
               ondragover="app.handleDragOver(event)"
               ondragleave="app.handleDragLeave(event)"
               ondrop="app.handlePhotoDrop('${slot.slotId}', '', event)"
               style="padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:var(--text-primary); font-size:0.88rem;">
                <span id="photo-header-title-${slot.slotId}">${this.escapeHtml(slotInfo.caption)}</span>
              </strong>
              <div style="display:flex; align-items:center; gap:0.35rem;">
                ${(slotInfo.isCustom || slotInfo.isCustomSource) ? `<span class="nav-badge" style="background:rgba(246, 168, 0, 0.15); color:var(--accent-blue-text, #F6A800); font-size:0.68rem; padding:0.15rem 0.45rem;">Personalizado</span>` : ''}
                <span class="nav-badge" style="background:rgba(246, 168, 0, 0.15); color:var(--accent-gold-text); font-size:0.72rem;">Pendente</span>
              </div>
            </div>

            <div class="upload-dropzone" 
                 onclick="const inp = document.getElementById('file-slot-${slot.slotId}'); if(inp) inp.click();" 
                 style="padding:1.75rem 1rem; border-radius:var(--radius-sm); border:2px dashed #F6A800; cursor:pointer; background:rgba(246, 168, 0, 0.03); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; min-height:140px;">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-gold-text); margin-bottom:0.6rem;">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <div style="font-size:0.85rem; font-weight:600; color:var(--text-primary); margin-bottom:0.25rem;">
                Clique ou arraste a foto para ${this.escapeHtml(slotInfo.caption)}
              </div>
              <div class="upload-dropzone-hint" style="font-size:0.74rem;">Formatos aceitos: JPG, PNG, WEBP</div>
              <input type="file" id="file-slot-${slot.slotId}" accept="image/*" style="display:none;" onclick="event.stopPropagation()" onchange="app.handleSinglePhotoUpload('${slot.slotId}', '${slot.defaultCaption}', event)">
            </div>

            <div style="display:flex; flex-direction:column; gap:0.35rem; margin-top:0.25rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Título da Figura (mantém padrão):</label>
                ${slotInfo.isCustom ? `
                  <button type="button" class="btn-restore-title" onclick="app.restorePhotoTitle('${slot.slotId}')" title="Restaurar título padrão oficial">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                    Restaurar Padrão
                  </button>
                ` : `
                  <span style="font-size:0.72rem; color:var(--text-muted); font-style:italic;">Padrão Oficial</span>
                `}
              </div>
              <div class="photo-title-input-group">
                <span class="photo-title-addon pending">Figura ${slot.figNum}.</span>
                <input type="text" class="photo-title-input" id="photo-input-${slot.slotId}" 
                       value="${this.escapeHtml(slotInfo.title)}"
                       placeholder="Título descritivo da figura..."
                       oninput="app.handlePhotoTitleInput('${slot.slotId}', ${slot.figNum}, this.value)"
                       onchange="app.updatePhotoTitle('${slot.slotId}', ${slot.figNum}, this.value)">
              </div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.15rem; display:flex; justify-content:space-between; gap:0.5rem; flex-wrap:wrap;">
                <span>Legenda no relatório: <strong id="photo-caption-preview-${slot.slotId}" style="color:var(--text-primary); font-family:var(--report-font, 'Times New Roman'), serif;">${this.escapeHtml(slotInfo.caption)}</strong></span>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.35rem; margin-top:0.25rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Fonte da Figura (mantém padrão):</label>
                ${slotInfo.isCustomSource ? `
                  <button type="button" class="btn-restore-title" onclick="app.restorePhotoSource('${slot.slotId}')" title="Restaurar fonte padrão oficial">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                    Restaurar Padrão
                  </button>
                ` : `
                  <span style="font-size:0.72rem; color:var(--text-muted); font-style:italic;">Padrão Oficial</span>
                `}
              </div>
              <div class="photo-title-input-group">
                <span class="photo-source-addon pending">Fonte:</span>
                <input type="text" class="photo-title-input" id="photo-source-input-${slot.slotId}" 
                       value="${this.escapeHtml(slotInfo.sourceClean)}"
                       placeholder="Ex: Elaborada pelos autores."
                       oninput="app.handlePhotoSourceInput('${slot.slotId}', this.value)"
                       onchange="app.updatePhotoSource('${slot.slotId}', ${slot.figNum}, this.value)">
              </div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.15rem; display:flex; justify-content:space-between; gap:0.5rem; flex-wrap:wrap;">
                <span>Fonte no relatório: <strong id="photo-source-preview-${slot.slotId}" style="color:var(--text-primary); font-family:var(--report-font, 'Times New Roman'), serif; font-style:italic;">${this.escapeHtml(slotInfo.sourceFormatted)}</strong></span>
              </div>
            </div>
          </div>
        `;
      }
    });

    // Exibir fotos extras não pertencentes aos slots padronizados
    const extraPhotos = photos.filter(p => !slots.some(s => s.slotId === p.slotId));
    const extraStart = this.getExtraPhotoFigureStart();
    extraPhotos.forEach((photo, idx) => {
      const extraFigNum = extraStart + idx;
      const cleanTitle = this.cleanFigureTitle(extraFigNum, photo.title || photo.caption || `Registro complementar #${idx + 1}.`, `Registro complementar #${idx + 1}.`);
      const fullCaption = photo.caption && photo.caption.startsWith(`Figura ${extraFigNum}.`) ? photo.caption : this.formatFigureCaption(extraFigNum, cleanTitle);
      // Mantém a legenda salva sincronizada com a numeração exibida (usada no relatório)
      photo.caption = fullCaption;
      photo.title = cleanTitle;
      const extraCleanSource = this.cleanFigureSource(photo.customSource || photo.source || 'Elaborada pelos autores.');
      const extraFullSource = this.formatFigureSource(extraCleanSource);
      const isCustomExtraSource = Boolean(photo.customSource && photo.customSource !== 'Elaborada pelos autores.');

      html += `
        <div class="glass-card" 
             draggable="true"
             ondragstart="app.handlePhotoDragStart('${photo.id}', event)"
             ondragend="app.draggedPhotoSlotId = null"
             ondragover="app.handlePhotoDragOverCard(event)"
             ondragleave="app.handlePhotoDragLeaveCard(event)"
             ondrop="app.handlePhotoDropCard('${photo.id}', event)"
             style="padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem; border:1px solid rgba(246, 168, 0, 0.3); cursor:grab;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--accent-blue-text); font-size:0.88rem;">
              <span id="photo-header-title-${photo.id}">${this.escapeHtml(fullCaption)}</span>
            </strong>
            <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmRemovePhoto('${photo.id}')" style="padding:0.2rem 0.55rem; font-size:0.75rem; font-weight:600; display:inline-flex; align-items:center;">
              ${window.icons.delete} Remover
            </button>
          </div>

          <div style="background:var(--bg-input); border-radius:var(--radius-md); overflow:hidden; max-height:220px; display:flex; align-items:center; justify-content:center;">
            <img src="${photo.blob}" style="width:100%; max-height:220px; object-fit:cover;" alt="${this.escapeHtml(fullCaption)}">
          </div>

          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <label style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Título da Figura Extra (mantém padrão):</label>
            <div class="photo-title-input-group">
              <span class="photo-title-addon extra">Figura ${extraFigNum}.</span>
              <input type="text" class="photo-title-input" 
                     value="${this.escapeHtml(cleanTitle)}" 
                     placeholder="Título descritivo da figura..."
                     oninput="app.handlePhotoTitleInput('${photo.id}', ${extraFigNum}, this.value)"
                     onchange="app.updatePhotoTitle('${photo.id}', ${extraFigNum}, this.value)">
            </div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.15rem;">
              <span>Legenda: <strong id="photo-caption-preview-${photo.id}" style="color:var(--text-primary); font-family:var(--report-font, 'Times New Roman'), serif;">${this.escapeHtml(fullCaption)}</strong></span>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.35rem; margin-top:0.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <label style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Fonte da Figura Extra (mantém padrão):</label>
              ${isCustomExtraSource ? `
                <button type="button" class="btn-restore-title" onclick="app.restoreExtraPhotoSource('${photo.id}')" title="Restaurar fonte padrão oficial">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                  Restaurar Padrão
                </button>
              ` : `
                <span style="font-size:0.72rem; color:var(--text-muted); font-style:italic;">Padrão Oficial</span>
              `}
            </div>
            <div class="photo-title-input-group">
              <span class="photo-source-addon extra">Fonte:</span>
              <input type="text" class="photo-title-input" id="photo-source-input-${photo.id}" 
                     value="${this.escapeHtml(extraCleanSource)}" 
                     placeholder="Ex: Elaborada pelos autores."
                     oninput="app.handleExtraPhotoSourceInput('${photo.id}', this.value)"
                     onchange="app.updateExtraPhotoSource('${photo.id}', ${extraFigNum}, this.value)">
            </div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.15rem;">
              <span>Fonte: <strong id="photo-source-preview-${photo.id}" style="color:var(--text-primary); font-family:var(--report-font, 'Times New Roman'), serif; font-style:italic;">${this.escapeHtml(extraFullSource)}</strong></span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  removeMedia(mediaId) {
    this.executeRemovePhoto(mediaId);
  }

  /* ==========================================================================
     ETAPA 9: APÊNDICES I & II & DRAG AND DROP
     ========================================================================== */
  async handleAppendixDrop(type, event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.remove('dragover');
    }

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0 || !this.currentTraining) return;

    const mockEvent = { target: { files: files } };
    await this.handleAppendixUpload(type, mockEvent);
  }

  /**
   * Extrai páginas de documentos (PDFs ou imagens) em formato Data URL PNG para exibição visual no relatório
   */
  async extractDocPageImages(dataUrl, fileType, fileName) {
    if (!dataUrl) return [];
    if (fileType?.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(fileName || '')) {
      return [dataUrl];
    }
    if ((fileType === 'application/pdf' || /\.pdf$/i.test(fileName || '')) && window.pdfjsLib) {
      try {
        if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/vendor/pdf.worker.min.js';
        }
        const base64Data = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let j = 0; j < len; j++) {
          bytes[j] = binaryString.charCodeAt(j);
        }
        const pdf = await window.pdfjsLib.getDocument({ data: bytes }).promise;
        const pageImages = [];
        // Limite de páginas por documento para não esgotar a memória do navegador com PDFs longos
        const MAX_APPENDIX_PAGES = 30;
        const totalPages = Math.min(pdf.numPages, MAX_APPENDIX_PAGES);
        if (pdf.numPages > MAX_APPENDIX_PAGES) {
          this.showToast(`"${fileName}" tem ${pdf.numPages} páginas; apenas as ${MAX_APPENDIX_PAGES} primeiras serão incluídas no relatório.`, 'warning', 7000);
        }
        for (let num = 1; num <= totalPages; num++) {
          const page = await pdf.getPage(num);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          pageImages.push(canvas.toDataURL('image/jpeg', 0.88));
        }
        return pageImages;
      } catch (err) {
        console.warn('Erro ao converter páginas do PDF para imagens:', err);
      }
    }
    return [];
  }

  async handleAppendixUpload(type, event) {
    const files = event.target.files;
    if (!files || files.length === 0 || !this.currentTraining) return;

    if (!this.currentTraining.media) this.currentTraining.media = [];

    let addedCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let dataUrl;
      let pageImages;
      try {
        const isImage = file.type?.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(file.name || '');
        dataUrl = isImage ? await this.fileToReportImageDataUrl(file) : await this.fileToDataUrl(file);
        pageImages = await this.extractDocPageImages(dataUrl, isImage ? 'image/jpeg' : file.type, file.name);
        if (!pageImages || pageImages.length === 0) {
          // Arquivos Word (ou PDFs que não puderam ser lidos) entram no relatório apenas com o nome
          const isWord = /\.docx?$/i.test(file.name || '');
          this.showToast(
            isWord
              ? `"${file.name}" foi anexado, mas o conteúdo de arquivos Word não aparece no relatório. Para exibir as páginas, salve o documento como PDF e anexe o PDF.`
              : `"${file.name}" foi anexado, mas suas páginas não puderam ser convertidas; no relatório aparecerá apenas o nome do arquivo.`,
            'warning',
            8000
          );
        }
      } catch (err) {
        console.warn('Falha ao anexar documento de apêndice:', file?.name, err);
        this.showToast(`Não foi possível anexar "${file?.name || 'arquivo'}". Verifique se o arquivo não está corrompido.`, 'error', 6000);
        continue;
      }
      addedCount++;

      this.currentTraining.media.push({
        id: `doc_${type}_${Date.now()}_${i}`,
        type: type, // 'doc_fnde' ou 'doc_cecate'
        blob: dataUrl,
        pageImages: pageImages,
        caption: file.name,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        order: this.currentTraining.media.length
      });
    }

    if (event && event.target && event.target.value !== undefined) {
      try {
        event.target.value = '';
      } catch (e) {
        // Ignorar em caso de mock event
      }
    }

    this.renderAppendicesStep();
    this.saveCurrentStepData();
    if (addedCount > 0) {
      this.showToast(addedCount === 1 ? 'Documento anexado com sucesso!' : `${addedCount} documentos anexados com sucesso!`, 'success');
    }
  }

  formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  renderAppendixItem(d) {
    return `
      <div class="appendix-file-item" style="display:flex; flex-direction:column; gap:0.6rem; background:var(--bg-surface); border:1px solid var(--border-color); padding:0.75rem 0.9rem; border-radius:var(--radius-sm); margin-top:0.4rem;">
        <div style="display:inline-flex; align-items:center; gap:0.5rem; min-width:0; width:100%;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-secondary); flex-shrink:0;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span style="font-weight:600; font-size:0.86rem; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${this.escapeHtml(d.fileName)}">
            ${this.escapeHtml(d.fileName)}
          </span>
        </div>
        <div style="display:flex; justify-content:flex-end; width:100%; border-top:1px solid var(--border-color); padding-top:0.45rem;">
          <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmRemoveAppendix('${d.id}')" style="padding:0.25rem 0.65rem; font-size:0.75rem; font-weight:600; display:inline-flex; align-items:center; gap:0.3rem;" title="Remover documento">
            ${window.icons.delete} Remover
          </button>
        </div>
      </div>
    `;
  }

  confirmRemoveAppendix(docId) {
    if (!this.currentTraining) return;
    const doc = (this.currentTraining.media || []).find(m => m.id === docId);
    const fileName = doc?.fileName || 'documento';

    this.openConfirmModal({
      title: 'Remover Documento de Apêndice',
      msg: `Tem certeza que deseja remover o documento "${fileName}"?`,
      btnText: 'Sim, Remover',
      successTitle: 'Documento Removido!',
      successMsg: `O documento "${fileName}" foi removido com sucesso.`,
      onConfirm: () => this.executeRemoveAppendix(docId)
    });
  }

  executeRemoveAppendix(docId) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.media) this.currentTraining.media = [];

    this.currentTraining.media = this.currentTraining.media.filter(m => m.id !== docId);
    this.renderAppendicesStep();
    this.saveCurrentStepData();
    this.showToast('Documento removido com sucesso!', 'success');
  }

  renderAppendicesStep() {
    const fndeContainer = document.getElementById('wizard-appendix-fnde-list');
    const cecateContainer = document.getElementById('wizard-appendix-cecate-list');
    if (!this.currentTraining) return;

    const fndeDocs = (this.currentTraining.media || []).filter(m => m.type === 'doc_fnde');
    const cecateDocs = (this.currentTraining.media || []).filter(m => m.type === 'doc_cecate');

    // Ocultar janelas de inserção principais quando já houver documentos anexados
    const dropzoneFnde = document.getElementById('dropzone-appendix-fnde');
    if (dropzoneFnde) {
      if (fndeDocs.length > 0) {
        dropzoneFnde.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneFnde.style.removeProperty('display');
        dropzoneFnde.style.display = 'flex';
      }
    }

    const dropzoneCecate = document.getElementById('dropzone-appendix-cecate');
    if (dropzoneCecate) {
      if (cecateDocs.length > 0) {
        dropzoneCecate.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneCecate.style.removeProperty('display');
        dropzoneCecate.style.display = 'flex';
      }
    }

    if (fndeContainer) {
      if (fndeDocs.length === 0) {
        fndeContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">Nenhuma convocação do FNDE anexada.</p>`;
      } else {
        const itemsHtml = fndeDocs.map(d => this.renderAppendixItem(d)).join('');
        const addMoreHtml = `
          <div class="appendix-add-more-zone"
               onclick="document.getElementById('file-input-appendix-fnde').click()"
               ondragover="app.handleDragOver(event)"
               ondragleave="app.handleDragLeave(event)"
               ondrop="app.handleAppendixDrop('doc_fnde', event)"
               title="Clique ou arraste para adicionar mais arquivos de convocação do FNDE">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>+ Adicionar mais arquivos de convocação (FNDE)</span>
          </div>
        `;
        fndeContainer.innerHTML = itemsHtml + addMoreHtml;
      }
    }

    if (cecateContainer) {
      if (cecateDocs.length === 0) {
        cecateContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">Nenhuma convocação do CECATE anexada.</p>`;
      } else {
        const itemsHtml = cecateDocs.map(d => this.renderAppendixItem(d)).join('');
        const addMoreHtml = `
          <div class="appendix-add-more-zone"
               onclick="document.getElementById('file-input-appendix-cecate').click()"
               ondragover="app.handleDragOver(event)"
               ondragleave="app.handleDragLeave(event)"
               ondrop="app.handleAppendixDrop('doc_cecate', event)"
               title="Clique ou arraste para adicionar mais arquivos de convocação do CECATE">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>+ Adicionar mais convocações / e-mails (CECATE)</span>
          </div>
        `;
        cecateContainer.innerHTML = itemsHtml + addMoreHtml;
      }
    }
  }

  /* ==========================================================================
     ETAPA 10: PAINEL DE CONFERÊNCIA GERAL & AUDITORIA
     ========================================================================== */
  /**
   * Conferências cruzadas entre inscrições, presença e avaliações (seção 13 da especificação).
   * Devolve itens no mesmo formato de metrics.auditIssues ({ type, message }).
   */
  crossCheckIssues(t) {
    const norm = (v) => String(v || '').replace(/\D/g, '');
    const key = (v) => String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
    const regs = t.registrations || [];
    const atts = t.attendance || [];
    const evs = t.evaluations || [];
    const issues = [];
    const list = (arr) => arr.slice(0, 5).join(', ') + (arr.length > 5 ? ` e mais ${arr.length - 5}` : '');

    if (regs.length && atts.length) {
      const regCpf = new Set(regs.map(r => norm(r.cpf)).filter(Boolean));
      const out = atts.filter(a => norm(a.cpf) && !regCpf.has(norm(a.cpf))).map(a => a.name || a.cpf);
      if (out.length) issues.push({ type: 'warning', message: `${out.length} presente(s) não inscrito(s): ${list([...new Set(out)])}.` });
    }
    const summoned = new Set((t.municipalities || []).filter(m => m.isSummoned !== false).map(m => key(m.name)));
    if (regs.length && summoned.size) {
      const out = regs.filter(r => r.municipality && !summoned.has(key(r.municipality))).map(r => `${r.name || r.cpf} (${r.municipality})`);
      if (out.length) issues.push({ type: 'warning', message: `${out.length} inscrito(s) de município não convocado: ${list(out)}.` });
    }
    if (atts.length && evs.length) {
      const attCpf = new Set(atts.map(a => norm(a.cpf)).filter(Boolean));
      const out = evs.filter(e => norm(e.cpf) && !attCpf.has(norm(e.cpf))).map(e => e.name || e.cpf);
      if (out.length) issues.push({ type: 'warning', message: `${out.length} avaliação(ões) de quem não esteve presente: ${list([...new Set(out)])}.` });
    }
    const names = new Map();
    [...regs, ...atts, ...evs].forEach(p => {
      const c = norm(p.cpf);
      if (!c || !p.name) return;
      if (!names.has(c)) names.set(c, new Set());
      names.get(c).add(key(p.name));
    });
    const dup = [...names.entries()].filter(([, set]) => set.size > 1).map(([c]) => c);
    if (dup.length) issues.push({ type: 'warning', message: `${dup.length} CPF(s) aparecem com nomes diferentes: ${list(dup)}.` });
    return issues;
  }

  renderConferenceStep() {
    const container = document.getElementById('wizard-conference-content');
    if (!container || !this.currentTraining || !window.statsEngine) return;

    const metrics = window.statsEngine.calculateAllMetrics(this.currentTraining);
    this.metrics = metrics;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div class="metric-card">
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="metric-info">
            <h4>Taxa de Participação</h4>
            <div class="metric-value" style="color:var(--accent-gold-text);">${metrics.participationRateGeneral}%</div>
            <div class="metric-trend">${metrics.totalPresent} presentes / ${metrics.totalInscribed} inscritos</div>
          </div>
        </div>

        <div class="metric-card cyan">
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="6" x2="9" y2="6.01"></line><line x1="15" y1="6" x2="15" y2="6.01"></line><line x1="9" y1="10" x2="9" y2="10.01"></line><line x1="15" y1="10" x2="15" y2="10.01"></line><line x1="9" y1="14" x2="9" y2="14.01"></line><line x1="15" y1="14" x2="15" y2="14.01"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>
          </div>
          <div class="metric-info">
            <h4>Municípios Atendidos</h4>
            <div class="metric-value">${metrics.totalPresentMunicipalities}</div>
            <div class="metric-trend">de ${metrics.totalSummonedMunicipalities} convocados</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div class="metric-info">
            <h4>Conceitos 4 e 5 (Likert)</h4>
            <div class="metric-value" style="color:var(--accent-success);">${metrics.evalStatsGeneral?.highRatingPercent ? `${String(metrics.evalStatsGeneral.highRatingPercent).replace('.', ',')}%` : (metrics.evalStatsGeneral?.totalResponses > 0 ? 'Predominante' : '0,0%')}</div>
            <div class="metric-trend">${metrics.evalStatsGeneral?.totalResponses || 0} questionários avaliados</div>
          </div>
        </div>
      </div>

      <div class="wizard-card">
        <h4 class="wizard-card-title" style="display:flex; align-items:center; gap:0.4rem;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-gold-text);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Checklist de Auditoria & Validação Cruzada</span>
        </h4>
        <div style="margin-top:1rem;">
          <div class="audit-item valid">
            <div><strong>Identificação e Metadados:</strong> Polo, UF e datas devidamente informados.</div>
            <span class="nav-badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; display:inline-flex; align-items:center; gap:0.25rem;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Validado</span>
            </span>
          </div>

          <div class="audit-item ${metrics.totalPresent > 0 ? 'valid' : 'critical'}">
            <div><strong>Lista de Presença:</strong> ${metrics.totalPresent} participantes identificados e categorizados.</div>
            <span class="nav-badge" style="${metrics.totalPresent > 0 ? 'background:rgba(16, 185, 129, 0.15); color:#10b981;' : 'background:rgba(239, 68, 68, 0.15); color:#ef4444;'} display:inline-flex; align-items:center; gap:0.25rem;">
              ${metrics.totalPresent > 0 ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Validado</span>' : '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg><span>Pendência Crítica</span>'}
            </span>
          </div>

          <div class="audit-item ${metrics.evalStatsGeneral.totalResponses > 0 ? 'valid' : 'warning'}">
            <div><strong>Pesquisa Avaliativa:</strong> ${metrics.evalStatsGeneral.totalResponses} avaliações processadas na escala Likert.</div>
            <span class="nav-badge" style="${metrics.evalStatsGeneral.totalResponses > 0 ? 'background:rgba(16, 185, 129, 0.15); color:#10b981;' : 'background:rgba(246, 168, 0, 0.15); color:var(--accent-gold-text);'} display:inline-flex; align-items:center; gap:0.25rem;">
              ${metrics.evalStatsGeneral.totalResponses > 0 ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Validado</span>' : '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg><span>Pendência</span>'}
            </span>
          </div>

          <div class="audit-item valid">
            <div><strong>Tecnologias Educacionais:</strong> Figuras pedagógicas configuradas (Kahoot e Plickers).</div>
            <span class="nav-badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; display:inline-flex; align-items:center; gap:0.25rem;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Validado</span>
            </span>
          </div>

          ${(this.currentTraining.sources ? `<div class="audit-item valid"><div><strong>Fonte dos dados:</strong> ${['inscricao:Inscrições', 'presenca:Presença', 'avaliacao:Avaliações'].map(x => { const [k, n] = x.split(':'); const v = this.currentTraining.sources[k]; return v ? `${n}: ${v === 'capacitate' ? 'CapacitaTE' : 'arquivo'}` : ''; }).filter(Boolean).join(' · ')}.</div></div>` : '')}

          ${[...metrics.auditIssues, ...this.crossCheckIssues(this.currentTraining)].map(issue => `
            <div class="audit-item ${issue.type}">
              <div><strong>Alerta do Sistema:</strong> ${issue.message}</div>
              <span class="nav-badge" style="background:rgba(246, 168, 0, 0.15); color:var(--accent-gold-text);">Atenção</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  formatCoverTrainingInfo(training) {
    if (window.reportDocxGenerator && window.reportDocxGenerator.formatCoverTrainingInfo) {
      return window.reportDocxGenerator.formatCoverTrainingInfo(training);
    }
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

  formatContraCapaMonthYear(training) {
    if (window.reportDocxGenerator && typeof window.reportDocxGenerator.formatContraCapaMonthYear === 'function') {
      return window.reportDocxGenerator.formatContraCapaMonthYear(training);
    }
    if (training?.monthYear) return String(training.monthYear).trim();
    if (training?.reportMonthYear) return String(training.reportMonthYear).trim();

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
        if (String(training?.number).trim() === '16' && mNum === '06') {
          return `07/${year}`;
        }
        return `${mNum}/${year}`;
      }
    }

    const dateCandidate = training?.endDate || training?.startDate;
    if (dateCandidate && /^\d{4}-\d{2}-\d{2}/.test(dateCandidate)) {
      const parts = dateCandidate.split('-');
      return `${parts[1]}/${parts[0]}`;
    }

    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${m}/${now.getFullYear()}`;
  }

  /* ==========================================================================
     ETAPA 12: PRÉ-VISUALIZAÇÃO & GERAÇÃO FINAL DO RELATÓRIO
     ========================================================================== */
  async renderReportPreviewStep() {
    const container = document.getElementById('wizard-report-preview-document');
    if (!container || !this.currentTraining || !window.statsEngine) return;
    this.applyDocumentFont();

    const t = this.currentTraining;

    // Assegurar extração de páginas para documentos que ainda não tenham pageImages
    const appendixDocs = (t.media || []).filter(m => (m.type === 'doc_fnde' || m.type === 'doc_cecate') && (!m.pageImages || m.pageImages.length === 0));
    for (const doc of appendixDocs) {
      if (doc.blob) {
        doc.pageImages = await this.extractDocPageImages(doc.blob, doc.fileType, doc.fileName);
      }
    }

    const metrics = window.statsEngine.calculateAllMetrics(t);
    this.metrics = metrics;

    // 1. CAPA OFICIAL INTEGRAL DO RELATÓRIO (PÁGINA 1)
    const coverInfo = this.formatCoverTrainingInfo(t);
    const coverHtml = `
      <!-- PÁGINA 1: CAPA OFICIAL INTEGRAL -->
      <div class="report-cover-page">
        <!-- 1. PARTE SUPERIOR: IMAGEM TEMÁTICA E IDENTIFICAÇÃO -->
        <div class="cover-top-section">
          <div class="cover-image-container">
            <img src="visualrelatorio/capa/figuradacapa.png" alt="Capacitação em Transporte Escolar" class="cover-main-illustration" onerror="if(window.coverAssets?.figuradacapa) this.src=window.coverAssets.figuradacapa">
          </div>
          
          <div class="cover-report-id">
            <h2>${coverInfo.numText}</h2>
          </div>
        </div>

        <!-- 3 & 4. FAIXA CENTRAL (#E9C95C) -->
        <div class="cover-central-stripe">
          <h1 class="cover-main-title">CAPACITAÇÃO EM TRANSPORTE ESCOLAR</h1>
          <p class="cover-training-details">${coverInfo.infoLine}</p>
        </div>

        <!-- 5. IDENTIFICAÇÃO DO PROJETO -->
        <div class="cover-project-section">
          <p class="cover-project-title">
            Projeto:  FORTALECENDO E APRIMORANDO AS POLÍTICAS<br>PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL
          </p>
        </div>

        <!-- 6. LOGOMARCAS INSTITUCIONAIS NA PARTE INFERIOR -->
        <div class="cover-logos-banner">
          <div class="cover-realizado-por">Realizado por:</div>
          <div class="cover-logos-row">
            <img src="visualrelatorio/capa/cecatefigura.svg" alt="CECATE Centro-Oeste" class="cover-logo-cecate" onerror="if(window.coverAssets?.cecate) this.src=window.coverAssets.cecate">
            <img src="visualrelatorio/capa/ufgfigura.svg" alt="Universidade Federal de Goiás - UFG" class="cover-logo-ufg" onerror="if(window.coverAssets?.ufg) this.src=window.coverAssets.ufg">
            <img src="visualrelatorio/capa/fndefigura.svg" alt="Fundo Nacional de Desenvolvimento da Educação - FNDE" class="cover-logo-fnde" onerror="if(window.coverAssets?.fnde) this.src=window.coverAssets.fnde">
          </div>
        </div>
        <div style="height:12px; background-color:#4D4D4D; width:100%;"></div>
      </div>
    `;

    // 2. CONTRA-CAPA OFICIAL DO RELATÓRIO (PÁGINA 2)
    const contraCapaMonthYear = this.formatContraCapaMonthYear(t);
    const contraCapaHtml = `
      <!-- PÁGINA 2: CONTRA-CAPA OFICIAL -->
      <div class="report-doc-page report-contra-capa-page" style="padding-bottom: 0.5rem !important;">
        <!-- TOPO: IDENTIFICAÇÃO DO PROJETO COM BORDA SUPERIOR -->
        <div style="border-top: 1.5px solid #595959; padding-top: 0.8rem; text-align: center;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; color: #000000; margin: 0; line-height: 1.4; text-transform: uppercase;">
            Projeto: FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS<br>DE TRANSPORTE ESCOLAR DO BRASIL
          </p>
        </div>

        <!-- CENTRO: IDENTIFICAÇÃO DO RELATÓRIO E TÍTULO -->
        <div style="margin-top: 14rem; margin-bottom: auto; text-align: center; padding: 1rem 0;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 14pt; color: #000000; margin: 0 0 1rem 0;">
            Relatório de Atividades Nº ${coverInfo.numPadded}
          </p>
          <h2 style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 18pt; font-weight: bold; color: #000000; margin: 0 0 1rem 0; letter-spacing: 0.5px;">
            CAPACITAÇÃO EM TRANSPORTE ESCOLAR
          </h2>
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 14pt; font-weight: bold; color: #000000; margin: 0;">
            ${coverInfo.infoLine}
          </p>
        </div>

        <!-- BASE: LOCALIZAÇÃO, DATA E LOGOMARCAS COM BORDA SUPERIOR -->
        <div style="text-align: center; margin-top: auto; padding-bottom: 0;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 12pt; color: #000000; margin: 0 0 0.35rem 0;">
            Aparecida de Goiânia
          </p>
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 12pt; color: #000000; margin: 0 0 1.25rem 0;">
            ${contraCapaMonthYear}
          </p>
          <div style="border-top: 1.5px solid #595959; padding-top: 0.85rem; display: flex; justify-content: space-around; align-items: center;">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 38px; max-width: 140px; object-fit: contain;" alt="CECATE" class="cover-logo-cecate" onerror="if(window.coverAssets?.cecate) this.src=window.coverAssets.cecate">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 38px; max-width: 140px; object-fit: contain;" alt="UFG" class="cover-logo-ufg" onerror="if(window.coverAssets?.ufg) this.src=window.coverAssets.ufg">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 38px; max-width: 140px; object-fit: contain;" alt="FNDE" class="cover-logo-fnde" onerror="if(window.coverAssets?.fnde) this.src=window.coverAssets.fnde">
          </div>
        </div>
      </div>
    `;

    // 3. EQUIPE PARTICIPANTE (PÁGINA 3)
    const teamList = (t.team && t.team.length > 0)
      ? t.team
      : (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || []));

    const fndeMembers = teamList.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde'));
    // Cada integrante aparece em um único grupo: quem não é do FNDE fica na equipe da UFG
    const ufgMembers = teamList.filter(m => !fndeMembers.includes(m));

    let equipeMembersHtml = '';

    if (ufgMembers.length > 0) {
      equipeMembersHtml += `
        <div style="margin-left: 1.25cm; margin-bottom: 1.5rem;">
          <h4 style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 12pt; font-weight: bold; color: #000000; margin: 0.5rem 0;">UNIVERSIDADE FEDERAL DE GOIÁS – UFG</h4>
          <div style="margin-left: 1.25cm;">
      `;
      const ufgCoords = ufgMembers.filter(m => (m.role && m.role.toLowerCase().includes('coordenador')) || m.type === 'coordenacao');
      const ufgTech = ufgMembers.filter(m => !ufgCoords.includes(m));

      if (ufgCoords.length > 0) {
        equipeMembersHtml += `<p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; font-weight: bold; margin: 0.5rem 0 0.15rem 0; color: #000000;">Coordenador do Projeto</p>`;
        ufgCoords.forEach(m => {
          const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
          equipeMembersHtml += `<p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; margin: 0 0 0.35rem 0; color: #000000;">${this.escapeHtml(name)}</p>`;
        });
      }

      if (ufgTech.length > 0) {
        equipeMembersHtml += `<p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; font-weight: bold; margin: 0.6rem 0 0.15rem 0; color: #000000;">Equipe de Técnica</p>`;
        ufgTech.forEach(m => {
          const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
          equipeMembersHtml += `<p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; margin: 0 0 0.25rem 0; color: #000000;">${this.escapeHtml(name)}</p>`;
        });
      }

      equipeMembersHtml += `
          </div>
        </div>
      `;
    }

    if (fndeMembers.length > 0) {
      equipeMembersHtml += `
        <div style="margin-left: 1.25cm;">
          <h4 style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 12pt; font-weight: bold; color: #000000; margin: 0.5rem 0;">FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO – FNDE</h4>
          <div style="margin-left: 1.25cm;">
      `;

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
        equipeMembersHtml += `<p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; font-weight: bold; margin: 0.5rem 0 0.15rem 0; color: #000000;">${r}</p>`;
        fndeByRole.get(r).forEach(m => {
          const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
          equipeMembersHtml += `<p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; margin: 0 0 0.25rem 0; color: #000000;">${this.escapeHtml(name)}</p>`;
        });
      });

      equipeMembersHtml += `
          </div>
        </div>
      `;
    }

    const equipeHtml = `
      <!-- PÁGINA 3: EQUIPE PARTICIPANTE OFICIAL -->
      <div class="report-doc-page report-equipe-page">
        <div>
          <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="font-family:var(--report-font, 'Times New Roman'), serif; color: #000000; font-size: 18pt; font-weight: bold; margin: 0;">
              RELATÓRIO DE ATIVIDADES Nº ${coverInfo.numPadded}
            </h2>
          </div>
          <div style="margin-bottom: auto;">
            <h3 style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 14pt; font-weight: bold; color: #000000; margin-bottom: 1.5rem; text-align: left;">
              EQUIPE PARTICIPANTE
            </h3>
            ${equipeMembersHtml}
          </div>
        </div>

        <!-- RODAPÉ INSTITUCIONAL PADRONIZADO -->
        <div class="report-standard-footer" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #4D4D4D; padding-top: 6px; margin-top: 2rem;">
          <div style="flex: 1; text-align: center; border-right: 1px solid #4D4D4D; padding-right: 12px;">
            <img src="visualrelatorio/rodape/rodape_5logos.png" alt="Logomarcas Institucionais" class="report-footer-banner" onerror="if(window.coverAssets?.rodape5Logos) this.src=window.coverAssets.rodape5Logos">
          </div>
          <div style="width: 36px; text-align: center; font-family:var(--report-font, 'Times New Roman'), serif; font-size: 10pt; color: #000; padding-left: 8px;">
            1
          </div>
        </div>
      </div>
    `;

    // 4. ÍNDICE DE FIGURAS, TABELAS E SUMÁRIO (PÁGINAS 4 E 5)
    let indicesData = { sumarioList: [], tablesList: [], figuresList: [] };
    if (window.reportDocxGenerator && typeof window.reportDocxGenerator.buildReportIndices === 'function') {
      indicesData = window.reportDocxGenerator.buildReportIndices(t, metrics, {
        fig3: true,
        fig4: true,
        fig5: true,
        fig6: true,
        fig7: true,
        fig8: true
      });
    }
    const { sumarioList, tablesList, figuresList } = indicesData;

    const indicesHtml = `
      <!-- PÁGINA 4: ÍNDICE DE FIGURAS E ÍNDICE DE TABELAS -->
      <div class="report-doc-page report-indices-page">
        <!-- CABEÇALHO OFICIAL PADRONIZADO -->
        <div class="report-standard-header">
          <div class="report-header-left">
            <img src="visualrelatorio/cabecalho/cecate_cabecalho.png" alt="CECATE Centro-Oeste" class="report-header-logo" onerror="if(window.coverAssets?.cecateCabecalho) this.src=window.coverAssets.cecateCabecalho">
          </div>
          <div class="report-header-right">
            <span class="report-header-title">RELATÓRIO DE ATIVIDADES Nº ${coverInfo.numPadded}</span>
          </div>
        </div>

        <div style="margin-bottom: auto; margin-top: 1rem;">
          <h2 style="text-align: center; color: #000000; font-size: 16pt; font-weight: bold; margin-bottom: 1.2rem; font-family:var(--report-font, 'Times New Roman'), serif;">ÍNDICE DE FIGURAS</h2>
          <div style="margin-bottom: 2rem;">
            ${figuresList.map(fig => `
              <div class="report-index-row">
                <span class="report-index-label">${fig.label}</span>
                <span class="report-index-dots"></span>
                <span class="report-index-page">${fig.page}</span>
              </div>
            `).join('')}
          </div>

          <h2 style="text-align: center; color: #000000; font-size: 16pt; font-weight: bold; margin-top: 2rem; margin-bottom: 1.2rem; font-family:var(--report-font, 'Times New Roman'), serif;">ÍNDICE DE TABELAS</h2>
          <div>
            ${tablesList.map(tab => `
              <div class="report-index-row">
                <span class="report-index-label">${tab.label}</span>
                <span class="report-index-dots"></span>
                <span class="report-index-page">${tab.page}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RODAPÉ INSTITUCIONAL PADRONIZADO -->
        <div class="report-standard-footer" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #4D4D4D; padding-top: 6px; margin-top: 2rem;">
          <div style="flex: 1; text-align: center; border-right: 1px solid #4D4D4D; padding-right: 12px;">
            <img src="visualrelatorio/rodape/rodape_5logos.png" alt="Logomarcas Institucionais" class="report-footer-banner" onerror="if(window.coverAssets?.rodape5Logos) this.src=window.coverAssets.rodape5Logos">
          </div>
          <div style="width: 36px; text-align: center; font-family:var(--report-font, 'Times New Roman'), serif; font-size: 10pt; color: #000; padding-left: 8px;">
            2
          </div>
        </div>
      </div>
    `;

    const sumarioHtml = `
      <!-- PÁGINA 5: SUMÁRIO OFICIAL -->
      <div class="report-doc-page report-sumario-page">
        <!-- CABEÇALHO OFICIAL PADRONIZADO -->
        <div class="report-standard-header">
          <div class="report-header-left">
            <img src="visualrelatorio/cabecalho/cecate_cabecalho.png" alt="CECATE Centro-Oeste" class="report-header-logo" onerror="if(window.coverAssets?.cecateCabecalho) this.src=window.coverAssets.cecateCabecalho">
          </div>
          <div class="report-header-right">
            <span class="report-header-title">RELATÓRIO DE ATIVIDADES Nº ${coverInfo.numPadded}</span>
          </div>
        </div>

        <div style="margin-bottom: auto; margin-top: 1rem;">
          <h2 style="text-align: left; color: #000000; font-size: 16pt; font-weight: bold; margin-bottom: 1.5rem; font-family:var(--report-font, 'Times New Roman'), serif;">Sumário</h2>
          <div style="line-height: 1.8;">
            ${sumarioList.map(item => `
              <div class="report-index-row" style="margin: 0.45rem 0;">
                <span class="report-index-label" style="${item.label.startsWith('Apêndice') || item.label.startsWith('APÊNDICE') ? 'font-weight: 500;' : 'font-weight: bold;'}">${item.label}</span>
                <span class="report-index-dots"></span>
                <span class="report-index-page">${item.page}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RODAPÉ INSTITUCIONAL PADRONIZADO -->
        <div class="report-standard-footer" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #4D4D4D; padding-top: 6px; margin-top: 2rem;">
          <div style="flex: 1; text-align: center; border-right: 1px solid #4D4D4D; padding-right: 12px;">
            <img src="visualrelatorio/rodape/rodape_5logos.png" alt="Logomarcas Institucionais" class="report-footer-banner" onerror="if(window.coverAssets?.rodape5Logos) this.src=window.coverAssets.rodape5Logos">
          </div>
          <div style="width: 36px; text-align: center; font-family:var(--report-font, 'Times New Roman'), serif; font-size: 10pt; color: #000; padding-left: 8px;">
            3
          </div>
        </div>
      </div>
    `;

    // Numeração das figuras idêntica à do documento Word (renumera quando figuras são removidas/adicionadas)
    const figGen = window.reportDocxGenerator;
    const previewNumbering = (figGen && typeof figGen.getFigureNumbering === 'function') ? figGen.getFigureNumbering(t) : null;
    const numberedCaption = (key, caption) => (previewNumbering && previewNumbering.numbers[key])
      ? figGen.applyFigureNumber(caption, previewNumbering.numbers[key])
      : caption;
    const renumberRefs = (text) => previewNumbering ? figGen.renumberFigureReferences(text, previewNumbering.baseToFinal) : text;
    const photoKey = (ph) => (figGen && typeof figGen.getPhotoFigureKey === 'function') ? figGen.getPhotoFigureKey(ph) : '';

    // 5. Figuras fotográficas em ordem oficial
    const photos = (t.media || []).filter(m => m.type === 'photo');
    const slots = this.getStandardPhotoSlots();

    let photosHtml = '';
    slots.forEach(slot => {
      let p = photos.find(ph => ph.slotId === slot.slotId);
      if (!p && slot.slotId.includes('_day_')) {
        const dayPart = slot.slotId.split('_day_')[1];
        p = photos.find(ph => ph.slotId && ph.slotId.endsWith(`_day_${dayPart}`));
      }
      if (!p) {
        p = photos.find(ph => !ph.slotId && ph.caption && ph.caption.toLowerCase().includes(slot.defaultTitle.toLowerCase().slice(0, 15)));
      }

      if (p && p.blob) {
        const slotInfo = this.getPhotoSlotInfo(slot);
        const captionToDisplay = numberedCaption(photoKey(p), p.caption || slotInfo.caption || slot.defaultCaption);
        const sourceToDisplay = p.source || slotInfo.sourceFormatted || 'Fonte: Elaborada pelos autores.';
        photosHtml += `
          <div style="margin: 2rem 0; text-align: center; page-break-inside: avoid;">
            <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; color: var(--text-primary); margin-bottom: 0.5rem; text-align: center;">
              ${this.escapeHtml(captionToDisplay)}
            </p>
            <div style="text-align: center;">
              <img src="${p.blob}" alt="${this.escapeHtml(captionToDisplay)}" style="max-width: 100%; max-height: 420px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); object-fit: contain; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            </div>
            <p style="font-size: 0.82rem; font-style: italic; color: var(--text-muted); margin-top: 0.4rem; text-align: center;">
              ${this.escapeHtml(sourceToDisplay)}
            </p>
          </div>
        `;
      }
    });

    const extraPhotos = photos.filter(ph => !slots.some(s => s.slotId === ph.slotId));
    extraPhotos.forEach((ph, idx) => {
      if (ph.blob) {
        const extraFigNum = this.getExtraPhotoFigureStart() + idx;
        const captionToDisplay = numberedCaption(photoKey(ph), ph.caption && ph.caption.startsWith('Figura') ? ph.caption : this.formatFigureCaption(extraFigNum, ph.title || ph.caption || 'Registro fotográfico complementar.'));
        const cleanExtraSource = this.cleanFigureSource(ph.customSource || ph.source || 'Elaborada pelos autores.');
        const sourceToDisplay = this.formatFigureSource(cleanExtraSource);
        photosHtml += `
          <div style="margin: 2rem 0; text-align: center; page-break-inside: avoid;">
            <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size: 11pt; color: var(--text-primary); margin-bottom: 0.5rem; text-align: center;">
              ${this.escapeHtml(captionToDisplay)}
            </p>
            <div style="text-align: center;">
              <img src="${ph.blob}" alt="${this.escapeHtml(captionToDisplay)}" style="max-width: 100%; max-height: 420px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); object-fit: contain; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            </div>
            <p style="font-size: 0.82rem; font-style: italic; color: var(--text-muted); margin-top: 0.4rem; text-align: center;">
              ${this.escapeHtml(sourceToDisplay)}
            </p>
          </div>
        `;
      }
    });

    if (!photosHtml) {
      photosHtml = `<p style="color:var(--text-muted); font-style:italic;">Nenhum registro fotográfico anexado no momento.</p>`;
    }

    // 6. Apêndices (FNDE e CECATE) com visualização das páginas dos documentos
    const fndeDocs = (t.media || []).filter(m => m.type === 'doc_fnde');
    const cecateDocs = (t.media || []).filter(m => m.type === 'doc_cecate');

    const renderAppendixDocHtml = (d) => {
      const pages = (d.pageImages && d.pageImages.length > 0) ? d.pageImages : (d.blob?.startsWith('data:image/') ? [d.blob] : []);
      let visualHtml = '';
      if (pages.length > 0) {
        visualHtml = pages.map((pg, idx) => `
          <div style="margin: 1.25rem 0; text-align: center; page-break-inside: avoid;">
            <img src="${pg}" alt="${this.escapeHtml(d.fileName)} - Pág ${idx + 1}" style="max-width: 100%; height: auto; max-height: 850px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); box-shadow: 0 4px 14px rgba(0,0,0,0.08); display: inline-block;">
            ${pages.length > 1 ? `<p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem; font-style: italic;">Página ${idx + 1} de ${pages.length}</p>` : ''}
          </div>
        `).join('');
      }
      return `
        <div class="appendix-document-block" style="margin-bottom: 2rem; page-break-inside: avoid;">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.9rem; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-sm); margin-bottom:0.75rem;">
            <div style="display:inline-flex; align-items:center; gap:0.5rem; min-width:0;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-secondary); flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              <span style="font-weight:700; font-size:0.9rem; color:var(--text-primary);">${this.escapeHtml(d.fileName)}</span>
            </div>
            ${d.blob ? `<a href="${d.blob}" download="${this.escapeHtml(d.fileName)}" class="btn btn-secondary btn-sm" style="padding:0.2rem 0.55rem; font-size:0.75rem; text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem;">Baixar Arquivo</a>` : ''}
          </div>
          ${visualHtml}
        </div>
      `;
    };

    const fndeHtml = fndeDocs.length === 0
      ? `<p style="color:var(--text-muted); font-style:italic;">Nenhum documento de convocação do FNDE anexado.</p>`
      : fndeDocs.map(d => renderAppendixDocHtml(d)).join('');

    const cecateHtml = cecateDocs.length === 0
      ? `<p style="color:var(--text-muted); font-style:italic;">Nenhuma convocação ou comunicado do CECATE anexado.</p>`
      : cecateDocs.map(d => renderAppendixDocHtml(d)).join('');

    const evalList = (t.evaluations || []).filter(e => 
      (e.likedAspects && String(e.likedAspects).trim()) || (e.improveAspects && String(e.improveAspects).trim())
    );

    const evalsHtml = evalList.length === 0
      ? `<p style="color:var(--text-muted); font-style:italic;">Nenhuma resposta dissertativa registrada no momento.</p>`
      : `
        <div style="overflow-x:auto; margin-top:1rem; margin-bottom:0.75rem;">
          <table class="data-table" style="width:100%; border-collapse:collapse; font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface);">
                <th style="padding:0.6rem; border:1px solid var(--border-color); text-align:left;">Código IBGE</th>
                <th style="padding:0.6rem; border:1px solid var(--border-color); text-align:left;">Município</th>
                <th style="padding:0.6rem; border:1px solid var(--border-color); text-align:left;">Representação</th>
                <th style="padding:0.6rem; border:1px solid var(--border-color); text-align:left;">Aspectos que mais gostou</th>
                <th style="padding:0.6rem; border:1px solid var(--border-color); text-align:left;">Aspectos a serem melhorados</th>
              </tr>
            </thead>
            <tbody>
              ${evalList.map(ev => `
                <tr>
                  <td style="padding:0.5rem; border:1px solid var(--border-color);">${ev.ibgeCode || '-'}</td>
                  <td style="padding:0.5rem; border:1px solid var(--border-color); font-weight:600;">${this.escapeHtml(ev.municipality || '-')}</td>
                  <td style="padding:0.5rem; border:1px solid var(--border-color);">${this.escapeHtml(ev.representation || 'Gestão municipal')}</td>
                  <td style="padding:0.5rem; border:1px solid var(--border-color);">${this.escapeHtml(ev.likedAspects || '-')}</td>
                  <td style="padding:0.5rem; border:1px solid var(--border-color);">${this.escapeHtml(ev.improveAspects || '-')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-bottom:1.5rem;">Fonte: Elaborada pelos autores.</p>
      `;

    const munCount = (t.municipalities || []).length;
    const totalResp = metrics?.evalStatsGeneral?.totalResponses || 0;
    const evalsArr = t.evaluations || [];
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

    // Comentários das Figuras da Etapa 8 (Fidelidade aos relatórios de exemplo e editáveis pelo usuário)
    const fig3Comment = renumberRefs((t.evaluationComments && t.evaluationComments.fig3) || (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig3', t) : ''));
    const fig4Comment = renumberRefs((t.evaluationComments && t.evaluationComments.fig4) || (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig4', t) : ''));
    const fig5Comment = renumberRefs((t.evaluationComments && t.evaluationComments.fig5) || (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig5', t) : ''));
    const fig6Comment = renumberRefs((t.evaluationComments && t.evaluationComments.fig6) || (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig6', t) : ''));
    const fig7Comment = renumberRefs((t.evaluationComments && t.evaluationComments.fig7) || (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig7', t) : ''));
    const fig8Comment = renumberRefs((t.evaluationComments && t.evaluationComments.fig8) || (window.statsEngine ? window.statsEngine.getDefaultEvaluationComment('fig8', t) : ''));

    // Títulos e Fontes personalizáveis das Nuvens de Palavras (Figuras 7 e 8)
    const fig7TitleRaw = (t.customWordCloudTitles && t.customWordCloudTitles.fig7)
      ? t.customWordCloudTitles.fig7.trim()
      : 'Aspectos que gostaram da capacitação.';
    const fig7Title = numberedCaption('fig_7', fig7TitleRaw);
    const fig7SourceRaw = (t.customWordCloudSources && t.customWordCloudSources.fig7)
      ? t.customWordCloudSources.fig7.trim()
      : 'Elaborada pelos autores.';
    const fig7Source = fig7SourceRaw.toLowerCase().startsWith('fonte:')
      ? fig7SourceRaw
      : `Fonte: ${fig7SourceRaw}${/[.!?]$/.test(fig7SourceRaw) ? '' : '.'}`;

    const fig8TitleRaw = (t.customWordCloudTitles && t.customWordCloudTitles.fig8)
      ? t.customWordCloudTitles.fig8.trim()
      : 'Aspectos que devem melhorar da capacitação.';
    const fig8Title = numberedCaption('fig_8', fig8TitleRaw);
    const fig8SourceRaw = (t.customWordCloudSources && t.customWordCloudSources.fig8)
      ? t.customWordCloudSources.fig8.trim()
      : 'Elaborada pelos autores.';
    const fig8Source = fig8SourceRaw.toLowerCase().startsWith('fonte:')
      ? fig8SourceRaw
      : `Fonte: ${fig8SourceRaw}${/[.!?]$/.test(fig8SourceRaw) ? '' : '.'}`;

    // Tecnologias Educacionais (Figuras 1 e 2 e extras para o preview)
    const eduTech = t.educationalTech || {};
    const eduText = (eduTech.text && eduTech.text.trim()) ? eduTech.text.trim() :
      'Durante o transcorrer dos módulos teóricos e práticos, foram incorporadas dinâmicas interativas mediante o uso de tecnologias educacionais e plataformas de aprendizagem baseada em jogos, com a finalidade de acompanhar o nível de assimilação dos conteúdos e potencializar o engajamento coletivo. Foram empregados os aplicativos Kahoot e Plickers: o Kahoot permitiu a participação em tempo real por meio dos smartphones dos cursistas em questionários dinâmicos; já o Plickers viabilizou a coleta imediata de respostas mediante a leitura óptica de cartões com QR Code (alternativas A, B, C e D) realizada exclusivamente pelo celular do instrutor, contornando eventuais oscilações de sinal de internet e garantindo dinamismo à atividade.';

    // Figuras removidas pelo usuário não entram no relatório; numeração idêntica à do documento Word
    const eduFigureHtml = (image, caption, source) => `
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; margin-bottom:0.4rem; color:var(--text-primary); text-align:center;">${this.escapeHtml(caption)}</p>
          <div style="text-align:center;">
            <img src="${image}" alt="${this.escapeHtml(caption)}" style="max-width:100%; max-height:280px; border-radius:var(--radius-sm); border:1px solid var(--border-color); object-fit:contain; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          </div>
          <p style="font-size:10pt; font-family:var(--report-font, 'Times New Roman'), serif; color:var(--text-muted); margin-top:0.4rem; text-align:center;">${this.escapeHtml(source || 'Fonte: Elaborada pelos autores.')}</p>
        </div>
      `;

    let eduTechFiguresHtml = '';
    ['fig_1', 'fig_2'].forEach(figId => {
      const fig = (figGen && typeof figGen.resolveEduTechFigure === 'function') ? figGen.resolveEduTechFigure(t, figId) : null;
      if (fig) {
        eduTechFiguresHtml += eduFigureHtml(fig.image, numberedCaption(figId, fig.caption), fig.source);
      }
    });
    (eduTech.extraFigures || []).forEach(ef => {
      if (ef.image) {
        eduTechFiguresHtml += eduFigureHtml(ef.image, numberedCaption(`edu_${ef.id}`, ef.caption || `Avaliação via ${ef.title || 'ferramenta educacional'}.`), ef.source);
      }
    });

    // 7. CORPO TÉCNICO OFICIAL DO RELATÓRIO (PÁGINA 6 EM DIANTE)
    const conteudoHtml = `
      <div class="report-doc-page report-content-page">
        <table class="report-paged-body-table" style="width:100%; border-collapse:collapse; border:none; margin:0; padding:0;">
          <thead class="report-paged-thead" style="display:table-header-group;">
            <tr>
              <td style="border:none; padding:0;">
                <!-- CABEÇALHO OFICIAL PADRONIZADO REPETIDO EM TODAS AS PÁGINAS -->
                <div class="report-standard-header" style="margin-bottom:14px;">
                  <div class="report-header-left">
                    <img src="visualrelatorio/cabecalho/cecate_cabecalho.png" alt="CECATE Centro-Oeste" class="report-header-logo" onerror="if(window.coverAssets?.cecateCabecalho) this.src=window.coverAssets.cecateCabecalho">
                  </div>
                  <div class="report-header-right">
                    <span class="report-header-title">RELATÓRIO DE ATIVIDADES Nº ${coverInfo.numPadded}</span>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tfoot class="report-paged-tfoot" style="display:table-footer-group;">
            <tr>
              <td style="border:none; padding:0;">
                <!-- RODAPÉ INSTITUCIONAL PADRONIZADO REPETIDO EM TODAS AS PÁGINAS -->
                <div class="report-standard-footer" style="display:flex; align-items:center; justify-content:center; border-top:1px solid #4D4D4D; padding-top:6px; margin-top:1.25rem;">
                  <div style="flex:1; text-align:center;">
                    <img src="visualrelatorio/rodape/rodape_5logos.png" alt="Logomarcas Institucionais" class="report-footer-banner" onerror="if(window.coverAssets?.rodape5Logos) this.src=window.coverAssets.rodape5Logos">
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <td style="border:none; padding:0;">
                <!-- 1. INTRODUÇÃO -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:1.5rem;">1. INTRODUÇÃO</h3>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">Este relatório é referente às atividades desenvolvidas no âmbito do projeto intitulado <em>"${(t.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL').toUpperCase()}",</em> processo administrativo número 23070.068031/2023-34, desenvolvido pela Universidade Federal de Goiás (UFG), por meio do Centro Colaborador de Apoio ao Transporte Escolar do Centro-Oeste (CECATE Centro-Oeste), em parceria e com financiamento do Fundo Nacional de Desenvolvimento da Educação (FNDE).</p>
        <p style="text-align:justify; line-height:1.5; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">O presente relatório apresenta a descrição pormenorizada e a análise avaliativa do processo do curso de Capacitação em Transporte Escolar (Capacitação nº ${t.number || ''}), realizado para gestores municipais e conselheiros do CACS/FUNDEB de ${munCount} municípios do Estado de ${t.uf || 'GO'}, sediado no município polo de ${this.escapeHtml(t.polo || 'Município Polo')}, nas datas de ${t.datesFormatted || 'datas do curso'}.</p>

        <!-- 2. DADOS BÁSICOS DO CURSO & TABELAS 1 E 2 -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">2. DADOS BÁSICOS DO CURSO</h3>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">O curso de Capacitação em Transporte Escolar foi estruturado para alcançar o objetivo primordial de aprimorar os conhecimentos dos participantes sobre transporte escolar, apresentar os programas do governo federal, detalhar os principais aspectos de planejamento e regulação na área e capacitar tecnicamente para a utilização do Sistema Eletrônico de Gestão do Transporte Escolar (SETE).</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">Após criteriosa avaliação pedagógica das edições anteriores, definiu-se que o curso seria realizado em formato presencial concentrado, integrando gestores e conselheiros CACS dos municípios, correspondendo a uma carga horária total de 08:00 horas. No período matutino, a capacitação foi conduzida em turma unificada, abordando fundamentos essenciais de planejamento, governança e regulação do transporte escolar. No período vespertino, a formação foi desdobrada em duas abordagens específicas conforme o público-alvo: a primeira voltada aos gestores municipais, focada no domínio prático e operacional do Sistema SETE para cadastro de rotas, alunos e escolas; e a segunda direcionada aos conselheiros do CACS/FUNDEB, orientada ao exercício das competências fiscalizatórias, controle social e emissão de relatórios de acompanhamento.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">Dada a meta de entes federados a serem atendidos durante o projeto, estabeleceu-se a oferta de duas (02) vagas para gestores municipais e duas (02) vagas para conselheiros do CACS/FUNDEB por município. No ofício de convocação foi explicitada a preferência por servidores efetivos e de carreira, com a finalidade de mitigar a perda de conhecimento técnico decorrente da rotatividade das gestões. Como critério de seleção territorial, adotou-se a menor distância rodoviária até o polo de capacitação de ${this.escapeHtml(t.polo || 'Município Polo')}, priorizando os municípios mais próximos. Foram formalmente convocados ${metrics.totalSummonedMunicipalities} municípios, cuja distância média percorrida foi estimada em ${metrics.avgDistance} km. A relação completa dos entes federativos convocados é apresentada na Tabela 1:</p>
        
        <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-top:1.25rem; margin-bottom:0.5rem;">Tabela 1. Municípios convocados.</p>
        ${window.statsEngine.generateTable1Html(t.municipalities || [])}
        <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.35rem; margin-bottom:1.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>

        <p style="text-align:justify; line-height:1.5; margin-top:1.5rem; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">A estrutura curricular do curso contempla quatro (04) módulos sequenciais, sendo os três primeiros voltados aos fundamentos gerais, programas governamentais e normativas do transporte escolar. O quarto módulo é personalizado ao perfil do participante: para os gestores, o foco é integralmente direcionado à prática intensiva no Sistema SETE ("mãos na massa"); para os conselheiros CACS, a abordagem enfatiza as atribuições legais do conselho e a consulta analítica dos dados no sistema. A distribuição temática e as cargas horárias são detalhadas na Tabela 2:</p>
        <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-top:1.25rem; margin-bottom:0.5rem;">Tabela 2. Estrutura do curso de capacitação em transporte escolar.</p>
        ${window.statsEngine.generateTable2Html(t.courseModules || [])}
        <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.35rem; margin-bottom:1.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>

        <!-- 3. CONTATO COM OS MUNICÍPIOS & TABELA 3 -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">3. CONTATO COM OS MUNICÍPIOS</h3>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">O contato oficial com os municípios selecionados teve início mediante o encaminhamento de ofícios expedidos pela Coordenação-Geral da Política do Transporte Escolar (CGPTE) do FNDE, endereçados aos dirigentes das secretarias municipais de educação e aos representantes dos conselhos CACS/FUNDEB (Apêndice I). O expediente formal continha as diretrizes gerais da capacitação, orientações de participação e o formulário eletrônico de inscrições disponibilizado por link direto e QR Code institucional.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">De modo suplementar, a equipe técnica do CECATE Centro-Oeste realizou ampla mobilização institucional (Apêndice II), utilizando canais oficiais das administrações municipais. Foram estabelecidos contatos complementares via correio eletrônico, chamadas telefônicas e mensagens institucionais para certificar o recebimento das convocações, esclarecer dúvidas e incentivar a homologação das inscrições.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem; font-size:11pt; font-family:var(--report-font, 'Times New Roman'), serif;">Ao todo, foram convocados ${metrics.totalSummonedMunicipalities} municípios com vistas a atingir a meta de ${metrics.targetParticipants || (metrics.totalSummonedMunicipalities * 4)} participantes, sendo ${metrics.targetGestores || (metrics.totalSummonedMunicipalities * 2)} gestores municipais e ${metrics.targetCACS || (metrics.totalSummonedMunicipalities * 2)} representantes do CACS. Destes, ${metrics.totalInscribedMunicipalities} municípios tiveram participantes inscritos no curso, dos quais ${metrics.bothCategoriesInscribedMunicipalities || 0} municípios inscreveram representantes de ambas as categorias, ${metrics.onlyCACSInscribedMunicipalities || 0} município(s) apenas CACS e ${metrics.onlyGestoresInscribedMunicipalities || 0} apenas gestores. No que se refere ao quantitativo de pessoas, foram inscritas ${metrics.totalInscribed} pessoas, sendo ${metrics.totalInscribedGestores} gestores e ${metrics.totalInscribedCACS} representantes do CACS. A relação dos municípios com o respectivo número de inscritos por categoria é apresentada na Tabela 3.</p>

        <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-top:1.25rem; margin-bottom:0.5rem;">Tabela 3. Inscritos por município.</p>
        ${window.statsEngine.generateTable3Html(t.municipalities || [], metrics)}
        <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.35rem; margin-bottom:1.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>

        <!-- 4. DESENVOLVIMENTO DO CURSO E PARTICIPAÇÃO & TABELA 4 & FIGURA 3 -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">4. DESENVOLVIMENTO DO CURSO</h3>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;">Conforme estruturado na matriz formativa, o curso foi planejado e executado em quatro (04) módulos sequenciais, cumprindo rigorosamente os seguintes momentos pedagógicos:</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.5rem;"><strong>Primeiro momento:</strong> acolhimento dos participantes com credenciamento e entrega de material didático (pastas com caderno de anotações e caneta institucional), seguido de momento de integração com coffee break.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.5rem;"><strong>Segundo momento:</strong> abertura oficial com pronunciamento da coordenação do CECATE Centro-Oeste e dos representantes da Coordenação-Geral da Política do Transporte Escolar (CGPTE/FNDE), apresentando a contextualização do projeto e as metas de aprimoramento da gestão pública.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.5rem;"><strong>Terceiro momento:</strong> espaço aberto para a apresentação individual de todos os presentes, promovendo a integração entre gestores municipais, conselheiros sociais do CACS-FUNDEB e as equipes executoras da UFG e do FNDE.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.5rem;"><strong>Quarto momento:</strong> apresentação do Módulo 1, com o panorama histórico e situacional do Transporte Escolar no Brasil, os estudos desenvolvidos em parceria entre FNDE e instituições de ensino superior e a missão do CECATE-CO, sensibilizando para os desafios locais e trocas de experiências.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.5rem;"><strong>Quinto momento:</strong> exposição detalhada do Módulo 2, abordando os programas federais estruturantes: o Programa Nacional de Apoio ao Transporte do Escolar (PNATE) e o Programa Caminho da Escola, explicitando normas operacionais, critérios de repasse financeiro e prestação de contas.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.5rem;"><strong>Sexto momento:</strong> desenvolvimento do Módulo 3, com foco em aspectos de planejamento territorial, contratação de serviços, controle de custos, segurança viária e marcos regulatórios essenciais para assegurar a regularidade e eficiência do transporte escolar.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.5rem;"><strong>Sétimo momento:</strong> execução do Módulo 4 de forma segmentada por público-alvo. Para os conselheiros do CACS/FUNDEB, detalharam-se os procedimentos fiscalizatórios, análise documental e utilização analítica do SETE para acompanhamento de rotas. Para os gestores municipais, realizou-se treinamento prático intensivo no Sistema SETE ("mãos na massa"), capacitando os servidores no cadastramento de alunos, escolas, veículos, motoristas e roteirização georreferenciada.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;"><strong>Oitavo momento:</strong> aplicação do instrumento avaliativo da capacitação, coletando percepções técnicas e qualitativas dos participantes sobre metodologia, facilitadores, infraestrutura e conteúdos trabalhados.</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;">${eduText}</p>
        ${eduTechFiguresHtml}
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;">A participação final dos entes federados registrou ${metrics.totalPresentMunicipalities} municípios presentes dos ${metrics.totalInscribedMunicipalities} formalmente inscritos (${metrics.participationRateMunicipalities}%). No que tange ao público participante, compareceram ${metrics.totalPresent} pessoas dentre as ${metrics.totalInscribed} inscritas, representando uma taxa de participação global de ${metrics.participationRateGeneral}%. No segmento do CACS-FUNDEB, compareceram ${metrics.presentCACS} conselheiros (${metrics.participationRateCACS}%), ao passo que na Gestão Municipal participaram ${metrics.presentGestores} técnicos (${metrics.participationRateGestores}%). A distribuição da presença por município e segmento institucional é detalhada na Tabela 4 a seguir:</p>

        <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-top:1.25rem; margin-bottom:0.5rem;">Tabela 4. Participação por município.</p>
        ${window.statsEngine.generateTable4Html(t.municipalities || [], metrics)}
        <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.35rem; margin-bottom:1.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>

        <p style="text-align:justify; line-height:1.5; margin-top:1.5rem; margin-bottom:1.5rem;">Ao término das atividades formativas, todos os certificados oficiais de capacitação (carga horária de 08 horas) foram devidamente emitidos e remetidos para o e-mail cadastrado de cada participante por intermédio da plataforma PLATEIA da Universidade Federal de Goiás (UFG), contando com código de verificação digital e QR Code para autenticação de veracidade.</p>

        <!-- 5. AVALIAÇÃO DA CAPACITAÇÃO & FIGURAS 3, 4, 5, 6, 7 E 8 -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">5. AVALIAÇÃO DA CAPACITAÇÃO</h3>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;">Nesta edição do curso, aplicou-se o formulário padronizado de avaliação proposto pela equipe técnica do FNDE, que coleta percepções estruturadas dos cursistas. O instrumento é dividido em duas abordagens: primeiramente, uma escala psicométrica de Likert com cinco níveis qualitativos de percepção (1 - Ruim, 2 - Regular, 3 - Neutro, 4 - Muito Bom e 5 - Excelente) para avaliar os aspectos didáticos, pedagógicos, operacionais e de infraestrutura do evento; em seguida, duas perguntas dissertativas qualitativas, nas quais os participantes detalham livremente os aspectos que mais gostaram e os pontos com oportunidade de melhoria com base na experiência vivenciada.</p>

        <!-- FIGURA 3 (TÓPICO 5) -->
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;">${fig3Comment}</p>
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-bottom:0.75rem;">${this.escapeHtml(numberedCaption('fig_3', 'Figura 3. Participação segundo o tipo de representação.'))}</p>
          <div style="max-width:520px; height:280px; position:relative; margin:auto;">
            <canvas id="report-preview-fig3-canvas"></canvas>
          </div>
          <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>
        </div>

        <!-- FIGURA 4 -->
        <p style="text-align:justify; line-height:1.6; margin-bottom:0.75rem;">${fig4Comment}</p>
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-bottom:0.75rem;">${this.escapeHtml(numberedCaption('fig_4', 'Figura 4. Avaliação da capacitação de todos os participantes.'))}</p>
          <div style="max-width:900px; height:430px; position:relative; margin:auto;">
            <canvas id="report-preview-fig4-canvas"></canvas>
          </div>
          <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>
        </div>

        <!-- FIGURA 5 -->
        <p style="text-align:justify; line-height:1.6; margin-top:1.5rem; margin-bottom:0.75rem;">${fig5Comment}</p>
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-bottom:0.75rem;">${this.escapeHtml(numberedCaption('fig_5', 'Figura 5. Avaliação da capacitação dos conselheiros CACS.'))}</p>
          <div style="max-width:900px; height:430px; position:relative; margin:auto;">
            <canvas id="report-preview-fig5-canvas"></canvas>
          </div>
          <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>
        </div>

        <!-- FIGURA 6 -->
        <p style="text-align:justify; line-height:1.6; margin-top:1.5rem; margin-bottom:0.75rem;">${fig6Comment}</p>
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-bottom:0.75rem;">${this.escapeHtml(numberedCaption('fig_6', 'Figura 6. Avaliação da capacitação dos gestores municipais.'))}</p>
          <div style="max-width:900px; height:430px; position:relative; margin:auto;">
            <canvas id="report-preview-fig6-canvas"></canvas>
          </div>
          <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.5rem; text-align:center;">Fonte: Elaborada pelos autores.</p>
        </div>

        <!-- FIGURAS 7 E 8 (NUVENS DE PALAVRAS) -->
        <p style="text-align:justify; line-height:1.6; margin-top:1.5rem; margin-bottom:0.75rem;">${fig7Comment}</p>
        <!-- Figuras 7 e 8 uma abaixo da outra, na mesma ordem do documento Word (comentário 7, Figura 7, comentário 8, Figura 8) -->
        <div style="max-width:600px; margin:2rem auto; text-align:center; page-break-inside:avoid;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-bottom:0.5rem;">${this.escapeHtml(fig7Title)}</p>
          <div style="background:var(--bg-input); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <canvas id="report-preview-fig7-canvas" width="550" height="320" style="max-width:100%; height:auto;"></canvas>
          </div>
          <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.4rem; text-align:center;">${this.escapeHtml(fig7Source)}</p>
        </div>
        <p style="text-align:justify; line-height:1.6; margin-top:1.5rem; margin-bottom:0.75rem;">${fig8Comment}</p>
        <div style="max-width:600px; margin:2rem auto; text-align:center; page-break-inside:avoid;">
          <p style="font-family:var(--report-font, 'Times New Roman'), serif; font-size:11pt; text-align:center; margin-bottom:0.5rem;">${this.escapeHtml(fig8Title)}</p>
          <div style="background:var(--bg-input); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <canvas id="report-preview-fig8-canvas" width="550" height="320" style="max-width:100%; height:auto;"></canvas>
          </div>
          <p style="font-size:0.82rem; font-style:italic; color:var(--text-muted); margin-top:0.4rem; text-align:center;">${this.escapeHtml(fig8Source)}</p>
        </div>

        <!-- 6. REGISTROS FOTOGRÁFICOS -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2.5rem;">6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO</h3>
        <p style="text-align:justify; line-height:1.6;">Durante a realização da capacitação, foram registrados diversos momentos por meio de fotografias que ilustram a participação ativa dos representantes municipais e dos conselheiros do CACS-FUNDEB. As imagens capturam desde a ambientação do local, momentos de acolhimento e fala dos facilitadores, até as interações e práticas colaborativas durante as atividades formativas. Esses registros visuais não apenas documentam o evento, como também reforçam o compromisso institucional dos envolvidos com o contínuo aprimoramento da política de transporte escolar nos municípios. As fotografias servem como evidência do engajamento coletivo, memória institucional e prestação de contas das ações desenvolvidas perante o FNDE:</p>
        ${photosHtml}

        <!-- 7. CONSIDERAÇÕES FINAIS -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2.5rem; page-break-before:always;">7. CONSIDERAÇÕES FINAIS</h3>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;">O presente relatório consubstanciou a execução técnica, operacional e pedagógica do curso de Capacitação em Transporte Escolar (Capacitação nº ${t.number || ''}), realizado no polo regional de ${this.escapeHtml(t.polo || 'Município Polo')}, Estado de ${t.uf || 'GO'}, cumprindo integralmente as metas e diretrizes estabelecidas no âmbito do projeto <em>"${(t.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL').toUpperCase()}",</em> (Processo nº 23070.068031/2023-34), financiado pelo Fundo Nacional de Desenvolvimento da Educação (FNDE).</p>
        <p style="text-align:justify; line-height:1.5; margin-bottom:0.75rem;">Salienta-se que, de forma geral, o curso atendeu plenamente ao objetivo primordial de aprimorar os conhecimentos e habilidades técnicas de gestores municipais e conselheiros do CACS-FUNDEB, conforme atestado nos elevados índices de satisfação apurados na pesquisa avaliativa. Por outro lado, pôde-se comprovar que reforçar a convocação mediante a articulação multicanal do CECATE Centro-Oeste — combinando correspondências oficiais, contatos telefônicos diretos e mensagens em canais institucionais — revelou-se determinante para assegurar expressivo comparecimento dos entes federados convocados.</p>
        <p style="text-align:justify; line-height:1.5;">Ficou igualmente evidente que a abordagem de diálogo permanente adotada consolida-se como canal imprescindível para atender às demandas de qualificação técnica continuada. Para finalizar, ressalta-se a suma importância de o processo formativo estar inserido em um ambiente que possibilite a livre e qualificada interação entre os cursistas e os formadores, proporcionando um rico espaço de compartilhamento de vivências territoriais, esclarecimento de dúvidas operacionais e retroalimentação contínua de todas as dimensões da política de transporte escolar no Brasil.</p>

        <!-- APÊNDICE I: CONVOCAÇÕES DO FNDE -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:2px solid #000000; padding-bottom:0.35rem; margin-top:3rem; page-break-before:always;">APÊNDICE I: CONVOCAÇÕES DO FNDE</h3>
        <p style="text-align:justify; line-height:1.6;">Relação dos ofícios e convocações oficiais emitidos pelo FNDE referentes a esta capacitação:</p>
        ${fndeHtml}

        <!-- APÊNDICE II: CONVOCAÇÕES DO CECATE -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:2px solid #000000; padding-bottom:0.35rem; margin-top:2.5rem; page-break-before:always;">APÊNDICE II: CONVOCAÇÕES DO CECATE</h3>
        <p style="text-align:justify; line-height:1.6;">Relação dos comunicados e e-mails de convocação emitidos pela equipe técnica do CECATE-CO referentes a esta capacitação:</p>
        ${cecateHtml}

        <!-- APÊNDICE III: RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO -->
        <h3 style="color:#000000; font-size:16pt; font-family:var(--report-font, 'Times New Roman'), serif; font-weight:700; border-bottom:2px solid #000000; padding-bottom:0.35rem; margin-top:2.5rem; page-break-before:always;">APÊNDICE III: RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO</h3>
        <p style="text-align:justify; line-height:1.6;">Relação completa das respostas dissertativas registradas pelos participantes no formulário de avaliação da formação, detalhando aspectos positivos e sugestões de aperfeiçoamento por município e representação institucional:</p>
        ${evalsHtml}

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // 8. COMBINAÇÃO DE TODAS AS PÁGINAS OFICIAIS NA ORDEM EXATA DO WORD
    container.innerHTML = coverHtml + contraCapaHtml + equipeHtml + indicesHtml + sumarioHtml + conteudoHtml;

    setTimeout(() => {
      this.renderReportPreviewCharts();
    }, 100);
  }

  renderReportPreviewCharts() {
    if (!window.chartEngine || !this.currentTraining) return;
    this.applyChartFont(); // os gráficos da prévia são as imagens inseridas no Word
    // Alta resolução para as imagens exportadas (Word e PDF); os gráficos da tela continuam na densidade normal
    const EXPORT_PIXEL_RATIO = 3;
    if (typeof window.chartEngine.setPixelRatio === 'function') window.chartEngine.setPixelRatio(EXPORT_PIXEL_RATIO);
    try {
      this.renderReportPreviewChartsAtCurrentRatio(EXPORT_PIXEL_RATIO);
    } finally {
      if (typeof window.chartEngine.setPixelRatio === 'function') window.chartEngine.setPixelRatio(null);
    }
  }

  renderReportPreviewChartsAtCurrentRatio(exportPixelRatio) {
    // O relatório é um documento impresso formal A4 de fundo branco; tema dos gráficos deve ser sempre claro
    const isDark = false;
    const evals = this.currentTraining.evaluations || [];

    // Figura 3: Participação CACS vs Gestor
    let cacsPresent = 0;
    let gestPresent = 0;
    if (evals.length > 0) {
      cacsPresent = evals.filter(e => e.representation === 'CACS-FUNDEB').length;
      gestPresent = evals.length - cacsPresent;
    } else if (this.currentTraining.municipalities) {
      this.currentTraining.municipalities.forEach(m => {
        cacsPresent += (parseInt(m.presentCACS) || 0);
        gestPresent += (parseInt(m.presentGestores) || 0);
      });
    }

    if (document.getElementById('report-preview-fig3-canvas')) {
      window.chartEngine.renderFig3Participation('report-preview-fig3-canvas', cacsPresent, gestPresent, isDark);
    }

    // Figura 4, 5, 6: Avaliação
    const statsGen = window.statsEngine.calculateEvaluationStats(evals);
    if (document.getElementById('report-preview-fig4-canvas')) {
      window.chartEngine.renderEvaluationStackedBarChart('report-preview-fig4-canvas', statsGen.criterionDistributionPercent, '', isDark);
    }

    const statsCACS = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation === 'CACS-FUNDEB'));
    if (document.getElementById('report-preview-fig5-canvas')) {
      window.chartEngine.renderEvaluationStackedBarChart('report-preview-fig5-canvas', statsCACS.criterionDistributionPercent, '', isDark);
    }

    const statsGest = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation !== 'CACS-FUNDEB'));
    if (document.getElementById('report-preview-fig6-canvas')) {
      window.chartEngine.renderEvaluationStackedBarChart('report-preview-fig6-canvas', statsGest.criterionDistributionPercent, '', isDark);
    }

    // Figura 7 e 8: Nuvem de palavras
    if (window.wordCloudEngine) {
      const positiveTexts = evals.map(e => e.likedAspects || e.liked || '').filter(Boolean);
      const improveTexts = evals.map(e => e.improveAspects || e.improve || '').filter(Boolean);
      const cloudFont = this.getWordCloudFont();

      const canvas7 = document.getElementById('report-preview-fig7-canvas');
      if (canvas7) {
        window.wordCloudEngine.renderCloud(canvas7, positiveTexts, { 
          palette: 'positive', 
          isDark, 
          width: 550, 
          height: 320, 
          maxWords: 35,
          fontFamily: cloudFont,
          pixelRatio: exportPixelRatio
        });
      }

      const canvas8 = document.getElementById('report-preview-fig8-canvas');
      if (canvas8) {
        window.wordCloudEngine.renderCloud(canvas8, improveTexts, { 
          palette: 'improve', 
          isDark, 
          width: 550, 
          height: 320, 
          maxWords: 35,
          fontFamily: cloudFont,
          pixelRatio: exportPixelRatio
        });
      }
    }
  }

  async downloadDocxReport() {
    if (window.CapacitaTE && !CapacitaTE.can('relatorio', 'generate', this.currentTraining?.id)) {
      this.showToast('Você não tem permissão para gerar o relatório.', 'warning');
      return;
    }
    if (!this.currentTraining) {
      this.showToast('Nenhuma capacitação selecionada para gerar o relatório.', 'warning');
      return;
    }
    if (!window.reportDocxGenerator) {
      this.showToast('O gerador de relatório Word (.docx) não está disponível.', 'error');
      return;
    }

    try {
      this.showToast('Preparando dados e gráficos para o documento Word (.docx)...', 'info');
      if (!this.metrics) {
        this.metrics = window.statsEngine.calculateAllMetrics(this.currentTraining);
      }

      // A prévia ainda não foi montada (ou está sendo montada): monta antes de capturar os gráficos,
      // senão o Word sairia sem as Figuras 3 a 8
      if (!document.getElementById('report-preview-fig3-canvas')) {
        await this.renderReportPreviewStep();
      }

      // Renderizar gráficos prévios para garantir canvases populados
      this.renderReportPreviewCharts();
      // Aguarda o navegador desenhar os canvases
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      // Capturar imagens dos gráficos e nuvens a partir dos canvases
      const imagesData = {};
      const canvasMap = [
        { key: 'fig3', id: 'report-preview-fig3-canvas' },
        { key: 'fig4', id: 'report-preview-fig4-canvas' },
        { key: 'fig5', id: 'report-preview-fig5-canvas' },
        { key: 'fig6', id: 'report-preview-fig6-canvas' },
        { key: 'fig7', id: 'report-preview-fig7-canvas' },
        { key: 'fig8', id: 'report-preview-fig8-canvas' }
      ];

      canvasMap.forEach(item => {
        const cv = document.getElementById(item.id);
        if (cv) {
          try {
            imagesData[item.key] = cv.toDataURL('image/png');
          } catch (e) {
            console.warn('Erro ao extrair imagem do canvas:', item.id, e);
          }
        }
      });

      // Garantir conversão de PDFs de apêndices para imagens antes de gerar o Word
      const appendixDocs = (this.currentTraining.media || []).filter(m => (m.type === 'doc_fnde' || m.type === 'doc_cecate') && (!m.pageImages || m.pageImages.length === 0));
      for (const doc of appendixDocs) {
        if (doc.blob) {
          doc.pageImages = await this.extractDocPageImages(doc.blob, doc.fileType, doc.fileName);
        }
      }

      await window.reportDocxGenerator.generateAndDownload(this.currentTraining, this.metrics, imagesData);
      this.showToast('Documento Word (.docx) baixado com sucesso!', 'success');
    } catch (err) {
      console.error('Erro ao gerar documento Word (.docx):', err);
      this.showToast('Erro ao gerar documento Word: ' + (err.message || 'Falha inesperada'), 'error');
    }
  }

  async printReportPDF() {
    if (!this.currentTraining) {
      this.showToast('Nenhuma capacitação selecionada.', 'warning');
      return;
    }

    const t = this.currentTraining;

    // Notificar e preparar a visualização em PDF oficial idêntica ao Word
    this.showToast('Preparando PDF oficial de alta fidelidade idêntico ao modelo Word... Na janela de impressão, selecione "Salvar como PDF".', 'info', 5000);

    // Garantir renderização dos gráficos e nuvens de palavras
    this.renderReportPreviewCharts();

    const previewEl = document.getElementById('wizard-report-preview-document');
    if (!previewEl) {
      this.showToast('Documento do relatório não encontrado.', 'error');
      return;
    }

    // Clonar para isolamento estrito da página
    const clone = previewEl.cloneNode(true);

    // Converter todos os <canvas> no clone para elementos <img> contendo PNG em alta resolução
    const origCanvases = previewEl.querySelectorAll('canvas');
    const cloneCanvases = clone.querySelectorAll('canvas');
    origCanvases.forEach((origCanvas, idx) => {
      const cloneCanvas = cloneCanvases[idx];
      if (origCanvas && cloneCanvas) {
        try {
          const imgData = origCanvas.toDataURL('image/png');
          const imgEl = document.createElement('img');
          imgEl.src = imgData;
          imgEl.style.maxWidth = '100%';
          imgEl.style.height = 'auto';
          imgEl.style.display = 'block';
          imgEl.style.margin = '0 auto';
          imgEl.style.borderRadius = '4px';
          const parent = cloneCanvas.parentNode;
          if (parent) {
            parent.replaceChild(imgEl, cloneCanvas);
            parent.style.height = 'auto';
            parent.style.maxHeight = 'none';
          }
        } catch (e) {
          console.warn('Erro ao converter canvas para img:', e);
        }
      }
    });

    // Remover fundos ou bordas escuras de formulário
    clone.querySelectorAll('[style*="var(--bg-input)"]').forEach(el => {
      el.style.background = '#ffffff';
      el.style.border = 'none';
      el.style.padding = '0';
      el.style.boxShadow = 'none';
    });

    // Garantir imagens da capa e cabeçalho/rodapé com Data URLs para impressão isolada no iframe
    if (window.coverAssets) {
      const coverFig = clone.querySelector('.cover-main-illustration');
      if (coverFig && window.coverAssets.figuradacapa) coverFig.src = window.coverAssets.figuradacapa;
      clone.querySelectorAll('.cover-logo-cecate').forEach(img => { if (window.coverAssets.cecate) img.src = window.coverAssets.cecate; });
      clone.querySelectorAll('.cover-logo-ufg').forEach(img => { if (window.coverAssets.ufg) img.src = window.coverAssets.ufg; });
      clone.querySelectorAll('.cover-logo-fnde').forEach(img => { if (window.coverAssets.fnde) img.src = window.coverAssets.fnde; });
      clone.querySelectorAll('.report-header-logo').forEach(img => { if (window.coverAssets.cecateCabecalho) img.src = window.coverAssets.cecateCabecalho; });
      clone.querySelectorAll('.report-footer-banner').forEach(img => { if (window.coverAssets.rodape5Logos) img.src = window.coverAssets.rodape5Logos; });
    }

    // Iframe isolado para impressão exclusiva do relatório
    let printIframe = document.getElementById('report-pdf-print-iframe');
    if (printIframe) printIframe.remove();

    printIframe = document.createElement('iframe');
    printIframe.id = 'report-pdf-print-iframe';
    printIframe.style.position = 'fixed';
    printIframe.style.right = '0';
    printIframe.style.bottom = '0';
    printIframe.style.width = '0';
    printIframe.style.height = '0';
    printIframe.style.border = '0';
    document.body.appendChild(printIframe);

    const cleanPolo = (t.polo || 'Polo').replace(/[^a-zA-Z0-9_-]/g, '_');
    const docTitle = `Relatorio_Capacitacao_${t.number || 'Final'}_${cleanPolo}`;

    // Remover botões de download e elementos interativos do clone para impressão pura
    clone.querySelectorAll('.btn, .no-print, a.btn').forEach(el => el.remove());

    const iframeDoc = printIframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <style>
    :root { --report-font: '${this.getDocumentFont()}'; }
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff !important;
      color: #0f172a !important;
      font-family:var(--report-font, 'Times New Roman'), serif;
      font-size: 11pt;
      line-height: 1.5;
      width: 210mm;
    }

    /* PÁGINA 1: CAPA OFICIAL INTEGRAL */
    .report-cover-page {
      background-color: #4D4D4D !important;
      color: #FFFFFF !important;
      width: 210mm !important;
      height: 297mm !important;
      min-height: 297mm !important;
      max-height: 297mm !important;
      padding: 0 !important;
      margin: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      box-sizing: border-box !important;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      overflow: hidden !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .cover-top-section {
      padding-top: 3.5rem;
      padding-left: 2rem;
      padding-right: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .cover-image-container {
      max-width: 650px;
      width: 86%;
      margin: 0 auto;
      text-align: center;
    }
    .cover-main-illustration {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      display: inline-block;
    }
    .cover-report-id {
      margin-top: 2.8rem;
      margin-bottom: 0.8rem;
      text-align: center;
    }
    .cover-report-id h2 {
      color: #E9C95C !important;
      font-size: 14.5pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin: 0;
    }
    .cover-central-stripe {
      background-color: #E9C95C !important;
      width: 100%;
      padding: 1.4rem 1.5rem;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.25);
    }
    .cover-main-title {
      color: #000000 !important;
      font-size: 19pt;
      font-weight: 800;
      margin: 0 0 0.4rem 0;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .cover-training-details {
      color: #000000 !important;
      font-size: 12.5pt;
      font-weight: 600;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .cover-project-section {
      padding: 2.5rem 1.5rem;
      text-align: center;
    }
    .cover-project-title {
      color: #FFFFFF !important;
      font-size: 12.5pt;
      font-weight: 600;
      line-height: 1.5;
      margin: 0 auto;
      max-width: 650px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .cover-logos-banner {
      background-color: #D8D8D8 !important;
      width: 100%;
      padding: 1rem 2.5rem 1.25rem 2.5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
    }
    .cover-realizado-por {
      font-family: Arial, sans-serif;
      font-size: 10pt;
      font-weight: 700;
      color: #4D4D4D !important;
      margin: 0;
      text-align: center;
    }
    .cover-logos-row {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      gap: 1.5rem;
    }
    .cover-logo-cecate { height: 40px; max-width: 170px; object-fit: contain; }
    .cover-logo-ufg { height: 40px; max-width: 130px; object-fit: contain; }
    .cover-logo-fnde { height: 40px; max-width: 170px; object-fit: contain; }

    /* ESTILOS DAS PÁGINAS A4 OFICIAIS */
    .report-doc-page {
      background: #ffffff !important;
      color: #0f172a !important;
      width: 210mm !important;
      min-height: 297mm !important;
      box-sizing: border-box !important;
      position: relative !important;
      font-family:var(--report-font, 'Times New Roman'), serif;
      line-height: 1.5;
      font-size: 11pt;
      box-shadow: none !important;
      border: none !important;
    }

    /* PÁGINA 2: CONTRA-CAPA */
    .report-contra-capa-page {
      height: 297mm !important;
      max-height: 297mm !important;
      padding: 16mm 25mm 5mm 25mm !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* PÁGINA 3: EQUIPE PARTICIPANTE */
    .report-equipe-page {
      height: 297mm !important;
      max-height: 297mm !important;
      padding: 22mm 20mm 15mm 20mm !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* PÁGINA 4: ÍNDICES E PÁGINA 5: SUMÁRIO */
    .report-indices-page,
    .report-sumario-page {
      height: 297mm !important;
      max-height: 297mm !important;
      padding: 18mm 20mm 15mm 20mm !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* LINHAS PONTILHADAS DE ÍNDICES E SUMÁRIO */
    .report-index-row {
      display: flex !important;
      align-items: baseline !important;
      margin: 0.35rem 0 !important;
      font-family:var(--report-font, 'Times New Roman'), serif !important;
      font-size: 11pt !important;
      color: #000000 !important;
      line-height: 1.35 !important;
    }
    .report-index-label {
      flex-shrink: 0 !important;
      max-width: 82% !important;
      color: #000000 !important;
    }
    .report-index-dots {
      flex-grow: 1 !important;
      border-bottom: 1.5px dotted #000000 !important;
      margin: 0 0.5rem 4px 0.5rem !important;
    }
    .report-index-page {
      flex-shrink: 0 !important;
      font-weight: 600 !important;
      text-align: right !important;
      min-width: 24px !important;
      color: #000000 !important;
    }

    /* PÁGINA 6+: CONTEÚDO TÉCNICO */
    .report-content-page {
      padding: 18mm 20mm 18mm 20mm !important;
    }

    /* CABEÇALHO OFICIAL PADRONIZADO */
    .report-standard-header {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      border-bottom: 1px solid #4D4D4D !important;
      padding-bottom: 6px !important;
      margin-bottom: 1.5rem !important;
    }
    .report-header-left {
      display: flex !important;
      align-items: center !important;
    }
    .report-header-logo {
      height: 28px !important;
      max-width: 140px !important;
      object-fit: contain !important;
    }
    .report-header-right {
      text-align: right !important;
    }
    .report-header-title {
      font-family:var(--report-font, 'Times New Roman'), serif !important;
      font-size: 10pt !important;
      font-weight: 700 !important;
      color: #000000 !important;
    }

    /* CABEÇALHO E RODAPÉ REPETIDOS EM TODAS AS PÁGINAS DO CORPO */
    table.report-paged-body-table {
      width: 100% !important;
      border-collapse: collapse !important;
      border: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    thead.report-paged-thead {
      display: table-header-group !important;
    }
    tfoot.report-paged-tfoot {
      display: table-footer-group !important;
    }
    .report-paged-body-table td {
      border: none !important;
      padding: 0 !important;
    }

    /* RODAPÉ OFICIAL PADRONIZADO */
    .report-standard-footer {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-top: 1px solid #4D4D4D !important;
      padding-top: 6px !important;
      margin-top: 1.5rem !important;
    }
    .report-footer-banner {
      height: 24px !important;
      max-width: 100% !important;
      object-fit: contain !important;
      display: inline-block !important;
    }

    /* TIPOGRAFIA E ELEMENTOS */
    h1, h2, h3, h4 {
      font-family:var(--report-font, 'Times New Roman'), serif;
      page-break-after: avoid;
      break-after: avoid;
    }
    h3 {
      font-size: 16pt;
      font-weight: 700;
      color: #000000 !important;
    }
    p {
      margin: 0.65rem 0;
      text-align: justify;
      line-height: 1.5;
      font-size: 11pt;
      font-family:var(--report-font, 'Times New Roman'), serif;
      color: #000000;
    }
    .report-content-page p {
      text-indent: 1.25cm;
    }
    .report-content-page p[style*="font-weight:700"],
    .report-content-page p[style*="font-weight: 700"],
    .report-content-page p[style*="font-style:italic"],
    .report-content-page p[style*="font-style: italic"],
    .report-content-page p[style*="text-align:center"],
    .report-content-page p[style*="text-align: center"],
    .report-content-page .no-indent,
    .cover-top-section p,
    .cover-central-stripe p,
    .cover-project-section p,
    .cover-logos-banner p,
    .report-contra-capa-page p,
    .report-equipe-page p,
    .report-indices-page p,
    .report-sumario-page p {
      text-indent: 0 !important;
    }
    .report-contra-capa-page p {
      line-height: 1.35 !important;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.25rem 0;
      font-size: 10pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Tabelas bilaterais ABNT */
    .report-data-table {
      width: 100% !important;
      border-collapse: collapse !important;
      font-family:var(--report-font, 'Times New Roman'), serif !important;
      font-size: 10pt !important;
      color: #000000 !important;
    }
    .report-data-table th {
      background-color: #D9D9D9 !important;
      color: #000000 !important;
      font-weight: bold !important;
      border-top: 1px solid #000 !important;
      border-bottom: 1px solid #000 !important;
      border-left: none !important;
      border-right: none !important;
      padding: 5px 6px !important;
    }
    .report-data-table td {
      color: #000000 !important;
      padding: 4px 6px !important;
      border-top: 1px solid #000 !important;
      border-bottom: 1px solid #000 !important;
      border-left: none !important;
      border-right: none !important;
    }
    .data-table {
      width: 100% !important;
      border-collapse: collapse !important;
      font-family:var(--report-font, 'Times New Roman'), serif !important;
      font-size: 10pt !important;
    }
    .data-table th {
      background-color: #f1f5f9 !important;
      color: #000000 !important;
      font-weight: bold !important;
      border: 1px solid #cbd5e1 !important;
      padding: 6px !important;
    }
    .data-table td {
      border: 1px solid #cbd5e1 !important;
      padding: 5px !important;
      color: #000000 !important;
    }
    img {
      max-width: 100% !important;
      height: auto !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    div[style*="page-break-inside: avoid"],
    div[style*="page-break-inside:avoid"],
    .appendix-document-block {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    a {
      color: #1e3a8a;
      text-decoration: none;
    }
    .btn, .no-print {
      display: none !important;
    }
  </style>
</head>
<body>
  ${clone.innerHTML}
</body>
</html>`);
    iframeDoc.close();

    setTimeout(() => {
      try {
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
      } catch (err) {
        console.error('Falha ao acionar impressão via iframe:', err);
        window.print();
      }
    }, 500);
  }

  async directDownloadDocx(trainingId) {
    const full = await window.db.getTrainingFull(trainingId);
    if (full && window.reportDocxGenerator && window.statsEngine) {
      const appendixDocs = (full.media || []).filter(m => (m.type === 'doc_fnde' || m.type === 'doc_cecate') && (!m.pageImages || m.pageImages.length === 0));
      for (const doc of appendixDocs) {
        if (doc.blob) {
          doc.pageImages = await this.extractDocPageImages(doc.blob, doc.fileType, doc.fileName);
        }
      }
      const metrics = window.statsEngine.calculateAllMetrics(full);
      this.showToast('Gerando arquivo Word (.docx)...');
      await window.reportDocxGenerator.generateAndDownload(full, metrics);
    }
  }

  /* ==========================================================================
     EXCLUSÃO DE CAPACITAÇÕES (MODAL WEB MODERNO COM BARRA DE CARREGAMENTO)
     ========================================================================== */
  /**
   * Só administrador exclui capacitação (a regra também vale no banco, na migração 0005).
   */
  canDeleteTraining() {
    const a = window.CapacitaTE && CapacitaTE.auth;
    return !!(a && a.mode === 'authenticated' && a.isAdmin && a.isAdmin());
  }

  async openConfirmDeleteModal(trainingId) {
    if (!window.db) return;
    if (!this.canDeleteTraining()) {
      this.showToast('Somente administradores podem excluir capacitações.', 'warning');
      return;
    }
    const training = await window.db.get('trainings', trainingId);
    if (!training) {
      this.showToast('Capacitação não encontrada.', 'error');
      return;
    }

    // Regra estrita: impedir exclusão de registros do Histórico Protegido
    if (training.isHistorical || training.status === 'historico') {
      this.showToast('Registros do Histórico Protegido são permanentes e não podem ser excluídos.', 'warning');
      return;
    }

    this.trainingToDeleteId = trainingId;

    // Atualizar dados no modal web
    const titleEl = document.getElementById('modal-delete-target-title');
    const detailsEl = document.getElementById('modal-delete-target-details');
    if (titleEl) {
      titleEl.textContent = `Capacitação Nº ${training.number} - ${training.polo || 'Polo Regional'} (${training.uf || 'MT'})`;
    }
    if (detailsEl) {
      detailsEl.innerHTML = `
        <span style="display:inline-flex; align-items:center;">${window.icons.pin} Local:&nbsp;<strong>${training.locationVenue || 'Auditório Municipal'}</strong></span>
        <span style="display:inline-flex; align-items:center;">${window.icons.calendar} Datas:&nbsp;<strong>${training.datesFormatted || training.startDate || 'Data a definir'}</strong></span>
        <span style="display:inline-flex; align-items:center;">${window.icons.clock} Carga:&nbsp;<strong>${training.workload || '16h'}</strong></span>
      `;
    }

    const progressContainer = document.getElementById('modal-delete-progress-container');
    const progressBar = document.getElementById('modal-delete-progress-bar');
    const progressPercent = document.getElementById('modal-delete-progress-percent');
    const progressStatus = document.getElementById('modal-delete-progress-status');
    const confirmBtn = document.getElementById('modal-delete-confirm-btn');
    const cancelBtn = document.getElementById('modal-delete-cancel-btn');
    const closeBtn = document.getElementById('modal-delete-close-btn');

    const footerInit = document.getElementById('modal-delete-footer-initial');
    const footerSucc = document.getElementById('modal-delete-footer-success');
    if (footerInit) footerInit.style.display = 'flex';
    if (footerSucc) footerSucc.style.display = 'none';

    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) {
      progressBar.style.width = '0%';
      progressBar.style.background = '';
    }
    if (progressPercent) {
      progressPercent.textContent = '0%';
      progressPercent.style.color = '#ef4444';
    }
    if (progressStatus) progressStatus.innerHTML = '<span class="status-dot" style="background:#ef4444;"></span> Limpando registros...';
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = 'Sim, Excluir Relatório';
    }
    if (cancelBtn) cancelBtn.disabled = false;
    if (closeBtn) closeBtn.disabled = false;

    const modal = document.getElementById('modal-confirm-delete');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeConfirmDeleteModal() {
    this.trainingToDeleteId = null;
    const modal = document.getElementById('modal-confirm-delete');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (!modal.classList.contains('active')) {
          modal.style.display = 'none';
        }
      }, 200);
    }
    if (this.activeView === 'dashboard') {
      this.renderDashboard();
    } else if (this.activeView === 'trainings') {
      this.renderTrainingsList();
    }
  }

  /* ==========================================================================
     MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE INTEGRANTE
     ========================================================================== */
  openConfirmDeleteMemberModal(type, index) {
    let member = null;
    if (type === 'master') {
      const masterTeam = window.getMasterTeam();
      member = masterTeam[index];
    } else if (type === 'wizard') {
      member = this.currentTraining?.team?.[index];
    }

    if (!member) return;

    const name = window.formatTeamMemberFullName ? window.formatTeamMemberFullName(member) : (member.name || 'Integrante');
    const role = member.role || 'Equipe Técnica';

    this.openConfirmModal({
      title: 'Remover Integrante',
      msg: `Tem certeza que deseja remover "${name}" (${role}) da equipe?`,
      btnText: 'Sim, Remover',
      successTitle: 'Integrante Removido!',
      successMsg: `O integrante "${name}" foi removido com sucesso.`,
      onConfirm: () => {
        if (type === 'master') {
          const masterTeam = window.getMasterTeam();
          if (masterTeam[index]) {
            const removedName = masterTeam[index].name;
            masterTeam.splice(index, 1);
            window.saveMasterTeam(masterTeam);
            this.renderMasterTeamManagement();
            this.showToast(`Integrante ${removedName} removido do catálogo geral.`);
          }
        } else if (type === 'wizard') {
          if (this.currentTraining?.team?.[index]) {
            const removedName = this.currentTraining.team[index].name;
            this.currentTraining.team.splice(index, 1);
            this.renderTeamList();
            this.saveCurrentStepData();
            this.showToast(`Integrante ${removedName} removido da equipe.`);
          }
        }
      }
    });
  }

  closeConfirmDeleteMemberModal() {
    this.closeConfirmModal();
  }

  executeDeleteMemberConfirmed() {
    this.executeConfirmModalAction();
  }

  async executeDeleteTrainingConfirmed() {
    if (window.CapacitaTE && CapacitaTE.auth && !CapacitaTE.auth.isAdmin()) {
      this.showToast('Somente admins podem excluir capacitações.', 'warning');
      return;
    }
    if (!this.trainingToDeleteId || !window.db) return;

    const idToDelete = this.trainingToDeleteId;
    const training = await window.db.get('trainings', idToDelete);
    const num = training ? training.number : '';

    const progressContainer = document.getElementById('modal-delete-progress-container');
    const progressBar = document.getElementById('modal-delete-progress-bar');
    const progressPercent = document.getElementById('modal-delete-progress-percent');
    const progressStatus = document.getElementById('modal-delete-progress-status');
    const confirmBtn = document.getElementById('modal-delete-confirm-btn');
    const cancelBtn = document.getElementById('modal-delete-cancel-btn');
    const closeBtn = document.getElementById('modal-delete-close-btn');

    // Desabilitar botões e exibir barra
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Excluindo...';
    }
    if (cancelBtn) cancelBtn.disabled = true;
    if (closeBtn) closeBtn.disabled = true;
    if (progressContainer) progressContainer.style.display = 'block';

    const setProgress = (pct, text) => {
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressPercent) progressPercent.textContent = `${pct}%`;
      if (progressStatus) progressStatus.innerHTML = `<span class="status-dot" style="background:#ef4444;"></span> ${text}`;
    };

    try {
      // Fase 1: Limpeza de participantes e presenças
      setProgress(25, 'Removendo participantes e listas de presença...');
      await new Promise(r => setTimeout(r, 200));

      // Fase 2: Limpeza de avaliações
      setProgress(55, 'Excluindo respostas avaliativas e notas...');
      await new Promise(r => setTimeout(r, 200));

      // Fase 3: Limpeza de mídias e anexos
      setProgress(80, 'Apagando fotografias e apêndices...');
      await new Promise(r => setTimeout(r, 200));

      // Fase 4: Exclusão completa no banco IndexedDB e na nuvem (Supabase)
      setProgress(95, 'Finalizando exclusão no banco e na nuvem...');
      const delResult = await window.db.deleteTraining(idToDelete, true);
      if (delResult === 'cloud-failed') {
        this.showToast('Excluída neste navegador, mas a nuvem recusou a exclusão (sem conexão ou sem permissão). Ela pode voltar na próxima sincronização.', 'warning', 9000);
      }

      // Atualizar lista em memória e re-renderizar a visualização imediatamente
      this.trainingList = (this.trainingList || []).filter(t => t.id !== idToDelete);
      if (this.currentTraining && this.currentTraining.id === idToDelete) {
        this.currentTraining = null;
      }
      if (this.activeView === 'dashboard') {
        await this.renderDashboard();
      } else if (this.activeView === 'trainings') {
        await this.renderTrainingsList();
      }

      setProgress(100, 'Capacitação excluída com sucesso!');
      if (progressBar) progressBar.style.background = 'linear-gradient(90deg, #10b981, #059669)';
      if (progressPercent) progressPercent.style.color = '#10b981';
      if (progressStatus) progressStatus.innerHTML = '<span class="status-dot" style="background:#10b981;"></span> Capacitação excluída com sucesso!';

      const footerInit = document.getElementById('modal-delete-footer-initial');
      const footerSucc = document.getElementById('modal-delete-footer-success');
      if (footerInit) footerInit.style.display = 'none';
      if (footerSucc) {
        footerSucc.style.display = 'flex';
        const okBtn = document.getElementById('modal-delete-ok-btn');
        if (okBtn) okBtn.focus();
      }
      if (closeBtn) closeBtn.disabled = false;
      this.showToast(`Capacitação Nº ${num} excluída com sucesso.`);
    } catch (err) {
      console.error('Erro ao excluir capacitação:', err);
      this.showToast(`Erro ao excluir: ${err.message}`, 'error');
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Sim, Excluir Relatório';
      }
      if (cancelBtn) cancelBtn.disabled = false;
      if (closeBtn) closeBtn.disabled = false;
    }
  }

  deleteCurrentWizardTraining() {
    if (this.currentTraining) {
      this.openConfirmDeleteModal(this.currentTraining.id);
    }
  }

  /* ==========================================================================
     TELA COMPLETA: BANCO DE CAPACITAÇÕES
     ========================================================================== */
  /**
   * Relatórios › Relatório final: lista as capacitações com o progresso e abre o assistente em Word
   */
  async renderReportFinal() {
    await this.refreshTrainingsList();
    const box = document.getElementById('report-final-container');
    if (!box) return;
    box.textContent = '';
    const list = [...this.trainingList].sort((a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0));
    if (!list.length) {
      const p = document.createElement('p');
      p.className = 'admin-muted';
      p.textContent = 'Nenhuma capacitação cadastrada.';
      box.appendChild(p);
      return;
    }
    const canView = (t) => !window.CapacitaTE || !CapacitaTE.can || CapacitaTE.can('relatorio', 'view', t.id);
    const table = document.createElement('table');
    table.className = 'data-table admin-table';
    const head = document.createElement('tr');
    ['Capacitação', 'Datas', 'Progresso', ''].forEach(h => { const th = document.createElement('th'); th.textContent = h; head.appendChild(th); });
    const thead = document.createElement('thead');
    thead.appendChild(head);
    const tbody = document.createElement('tbody');
    list.forEach(t => {
      const tr = document.createElement('tr');
      const title = `${t.number ? `${t.number}ª CTE` : 'CTE'} – ${t.polo || ''}${t.uf ? ` (${t.uf})` : ''}`;
      [title, t.datesFormatted || '—', `${Number(t.progressPercent) || 0}%`].forEach(v => { const td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
      const act = document.createElement('td');
      if (canView(t)) {
        [['Abrir assistente', 1, 'btn-primary'], ['Gerar (etapa 12)', 12, 'btn-secondary']].forEach(([label, step, cls]) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = `btn ${cls} btn-sm`;
          b.style.marginRight = '0.4rem';
          b.textContent = label;
          b.addEventListener('click', () => this.openWizard(t.id, step));
          act.appendChild(b);
        });
      } else act.textContent = 'Sem permissão';
      tr.appendChild(act);
      tbody.appendChild(tr);
    });
    table.append(thead, tbody);
    const wrap = document.createElement('div');
    wrap.className = 'data-table-container';
    wrap.style.overflowX = 'auto';
    wrap.appendChild(table);
    box.appendChild(wrap);
  }

  async renderTrainingsList() {
    await this.refreshTrainingsList();
    const container = document.getElementById('all-trainings-list-container');
    if (!container) return;

    if (this.trainingList.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem; color:var(--text-muted);">
          <div style="display:flex; justify-content:center; margin-bottom:1rem; color:var(--text-muted);">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <p>Nenhuma capacitação cadastrada.</p>
        </div>
      `;
      return;
    }

    const sorted = [...this.trainingList].sort((a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0));

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width:70px; text-align:center;">Nº</th>
              <th>Polo Regional</th>
              <th>UF</th>
              <th>Datas</th>
              <th>Carga Horária</th>
              <th>Situação</th>
              <th style="text-align:center; width:280px;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${sorted.map(t => {
              const isHist = t.status === 'historico' || t.isHistorical;
              const statusBadge = isHist
                ? `<span class="nav-badge badge-amber">Histórico Protegido</span>`
                : (t.progressPercent === 100
                    ? `<span class="nav-badge badge-emerald" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluída</span>`
                    : `<span class="nav-badge badge-cyan" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Em Andamento</span>`);

              return `
                <tr>
                  <td style="text-align:center; font-weight:800; font-size:1.05rem; color:var(--accent-gold-text);">${t.number}</td>
                  <td><strong>${this.escapeHtml(t.polo || 'Polo Regional')}</strong></td>
                  <td><span class="nav-badge">${t.uf || 'MT'}</span></td>
                  <td style="font-size:0.85rem;">${t.datesFormatted || t.startDate || '-'}</td>
                  <td style="font-size:0.85rem;">${t.workload || '16h'}</td>
                  <td>${statusBadge}</td>
                  <td style="text-align:center; white-space:nowrap;">
                    <div style="display:inline-flex; gap:0.4rem; justify-content:center; align-items:center;">
                      ${isHist
                        ? `<button class="btn btn-secondary btn-sm" onclick="app.openWizard('${t.id}', 1)" style="display:inline-flex; align-items:center;" title="Consultar">${window.icons.search} Consultar</button>`
                        : `<a class="btn btn-primary btn-sm" href="#capacitacao/${encodeURIComponent(t.id)}/1" style="display:inline-flex; align-items:center;" title="Abrir as etapas: inscrição, presença e avaliação, relatório">${window.icons.folder} Abrir</a>`}
                      ${isHist
                        ? `<span class="nav-badge badge-amber" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center; gap:0.25rem;" title="Histórico protegido - exclusão desabilitada">${window.icons.lock} Protegido</span>`
                        : `<button class="btn btn-secondary btn-sm btn-action-delete" onclick="app.openConfirmDeleteModal('${t.id}')" style="display:inline-flex; align-items:center;" title="Excluir este relatório">
                            ${window.icons.delete} Excluir
                          </button>`
                      }
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  async duplicateTrainingAction(trainingId) {
    this.openCloneModal(trainingId);
  }

  /* ==========================================================================
     MUNICIPALITIES CATALOG BANK
     ========================================================================== */
  renderMunicipalitiesBank() {
    const container = document.getElementById('municipalities-bank-list');
    if (!container || !window.IBGE_DATA) return;

    const data = window.IBGE_DATA.slice(0, 100);
    container.innerHTML = `
      <div class="table-responsive-wrapper" style="max-height:500px;">
        <table class="report-data-table">
          <thead>
            <tr>
              <th>Código IBGE</th>
              <th>Nome do Município</th>
              <th>UF</th>
              <th>Região</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(m => `
              <tr>
                <td style="font-family:monospace;">${m.c}</td>
                <td><strong>${m.n}</strong></td>
                <td>${m.u}</td>
                <td>${m.r}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /* ==========================================================================
     UTILITÁRIOS & HELPERS
     ========================================================================== */
  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = (val !== undefined && val !== null) ? val : '';
  }

  getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  /**
   * Quadro "Conexão com a Nuvem" (tela Configurações): mostra a origem da configuração em uso
   */
  renderCloudSettings() {
    const urlEl = document.getElementById('cloud-config-url');
    const keyEl = document.getElementById('cloud-config-key');
    const statusEl = document.getElementById('cloud-config-status');
    if (!urlEl || typeof SUPABASE_CONFIG === 'undefined') return;
    const saved = typeof getSavedCloudConfig === 'function' ? getSavedCloudConfig() : null;
    urlEl.value = saved ? saved.SUPABASE_URL : (SUPABASE_CONFIG.source ? SUPABASE_CONFIG.url : '');
    if (keyEl) {
      keyEl.value = '';
      keyEl.placeholder = saved ? 'Chave salva neste navegador (digite para trocar)' : 'sb_publishable_...';
    }
    if (statusEl) {
      const origem = SUPABASE_CONFIG.source === 'navegador' ? 'Nuvem configurada neste navegador'
        : SUPABASE_CONFIG.source === '.env' ? 'Nuvem configurada pelo arquivo .env' : 'Conectado automaticamente';
      statusEl.textContent = origem;
      statusEl.style.background = 'var(--accent-emerald-bg)';
      statusEl.style.color = 'var(--accent-emerald-text)';
    }
  }

  readCloudSettingsForm() {
    const url = (document.getElementById('cloud-config-url')?.value || '').trim().replace(/\/+$/, '');
    const typedKey = (document.getElementById('cloud-config-key')?.value || '').trim();
    const saved = typeof getSavedCloudConfig === 'function' ? getSavedCloudConfig() : null;
    const key = typedKey || (saved && saved.SUPABASE_URL === url ? saved.SUPABASE_ANON_KEY : '');
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(url)) {
      throw new Error('Informe o Project URL no formato https://seu-projeto.supabase.co');
    }
    if (!key) throw new Error('Informe a chave pública do projeto.');
    if (/service_role|^sb_secret_/i.test(key)) throw new Error('Essa parece ser a chave service_role (secreta). Use a chave pública (publishable/anon).');
    return { url, key };
  }

  async testCloudConnection(config = null) {
    try {
      const { url, key } = config || this.readCloudSettingsForm();
      const res = await fetch(`${url}/rest/v1/trainings?select=id&limit=1`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      if (res.ok) {
        if (!config) this.showToast('Conexão com a nuvem funcionando.', 'success');
        return true;
      }
      const body = await res.json().catch(() => ({}));
      const msg = res.status === 401 || res.status === 403 ? 'chave recusada pelo Supabase'
        : body.code === 'PGRST205' ? 'o projeto não tem as tabelas do app (execute supabase/schema.sql no SQL Editor)'
        : (body.message || `HTTP ${res.status}`);
      this.showToast(`Falha na conexão: ${msg}.`, 'error', 7000);
    } catch (err) {
      const msg = /fetch/i.test(err.message) ? 'endereço não encontrado ou sem internet' : err.message;
      this.showToast(`Falha na conexão: ${msg}.`, 'error', 7000);
    }
    return false;
  }

  async saveCloudSettings() {
    let config;
    try {
      config = this.readCloudSettingsForm();
    } catch (err) {
      this.showToast(err.message, 'warning', 6000);
      return;
    }
    if (!(await this.testCloudConnection(config))) return;
    localStorage.setItem('autoreport_supabase_url', config.url); // chave legada mantida para compatibilidade
    localStorage.setItem('autoreport_supabase_key', config.key); // chave legada mantida para compatibilidade
    try {
      await window.db.reconnectSupabase();
      await this.refreshTrainingsList();
      this.showToast('Nuvem conectada e sincronizada neste navegador.', 'success');
    } catch (err) {
      this.showToast(`Configuração salva, mas a sincronização falhou: ${err.message}`, 'warning', 7000);
    }
    this.renderCloudSettings();
  }

  async clearCloudSettings() {
    localStorage.removeItem('autoreport_supabase_url'); // chave legada mantida para compatibilidade
    localStorage.removeItem('autoreport_supabase_key'); // chave legada mantida para compatibilidade
    try { await window.db.reconnectSupabase(); } catch (e) { /* sem configuração alternativa: modo local */ }
    this.renderCloudSettings();
    this.showToast('Configuração da nuvem removida deste navegador.', 'info');
  }

  initGlobalSettings() {
    const org = localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)'; // chave legada mantida para compatibilidade
    const funding = localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE'; // chave legada mantida para compatibilidade
    const proj = localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL'; // chave legada mantida para compatibilidade
    const process = localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00'; // chave legada mantida para compatibilidade

    this.setVal('setting-org-name', org);
    this.setVal('setting-funding-name', funding);
    this.setVal('setting-proj-name', proj);
    this.setVal('setting-process-name', process);

    this.lockGlobalSettingsInputs(true);
  }

  lockGlobalSettingsInputs(isLocked) {
    const fields = ['setting-org-name', 'setting-funding-name', 'setting-proj-name', 'setting-process-name'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = isLocked;
        el.style.background = isLocked ? 'var(--bg-input)' : 'rgba(32, 32, 32, 0.95)';
        el.style.cursor = isLocked ? 'not-allowed' : 'text';
      }
    });

    const viewActions = document.getElementById('settings-view-mode-actions');
    const editActions = document.getElementById('settings-edit-mode-actions');
    if (viewActions) viewActions.style.display = isLocked ? 'block' : 'none';
    if (editActions) editActions.style.display = isLocked ? 'none' : 'flex';
  }

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }
  }

  requestEditGlobalSettings() {
    this.openModal('modal-confirm-edit-settings');
  }

  confirmEnableEditGlobalSettings() {
    this.closeModal('modal-confirm-edit-settings');
    this.lockGlobalSettingsInputs(false);
    const firstInput = document.getElementById('setting-org-name');
    if (firstInput) firstInput.focus();
    this.showToast('Edição das Configurações Globais habilitada.', 'info');
  }

  cancelEditGlobalSettings() {
    this.initGlobalSettings();
    this.showToast('Edição cancelada.', 'info');
  }

  saveGlobalSettings() {
    const org = this.getVal('setting-org-name') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)';
    const funding = this.getVal('setting-funding-name') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE';
    const proj = this.getVal('setting-proj-name') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
    const process = this.getVal('setting-process-name') || '23070.012345/2026-00';

    localStorage.setItem('autoreport_setting_org', org); // chave legada mantida para compatibilidade
    localStorage.setItem('autoreport_setting_funding', funding); // chave legada mantida para compatibilidade
    localStorage.setItem('autoreport_setting_proj', proj); // chave legada mantida para compatibilidade
    localStorage.setItem('autoreport_setting_process', process); // chave legada mantida para compatibilidade

    if (this.currentTraining) {
      this.currentTraining.responsibleOrg = org;
      this.currentTraining.fundingOrg = funding;
      this.currentTraining.relatedProject = proj;
      this.currentTraining.processNumber = process;
      this.populateAllWizardForms();
    }

    this.lockGlobalSettingsInputs(true);
    this.showToast('Configurações Globais salvas com sucesso!', 'success');
  }

  fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Lê um arquivo de imagem já padronizado para o relatório: formato compatível com o Word,
   * orientação EXIF de fotos de celular aplicada e dimensão máxima de 1600 px.
   */
  async fileToReportImageDataUrl(file) {
    const dataUrl = await this.fileToDataUrl(file);
    if (window.reportDocxGenerator && typeof window.reportDocxGenerator.normalizeImageDataUrl === 'function') {
      return window.reportDocxGenerator.normalizeImageDataUrl(dataUrl);
    }
    return dataUrl;
  }

  notifyImageReadError(file, err) {
    console.warn('Falha ao ler imagem:', file?.name, err);
    const isHeic = /\.(heic|heif)$/i.test(file?.name || '') || /image\/hei[cf]/i.test(file?.type || '');
    this.showToast(
      isHeic
        ? `A imagem "${file.name}" está em HEIC (iPhone), formato não suportado. Converta para JPG ou PNG e envie novamente.`
        : `Não foi possível ler a imagem "${file?.name || ''}". Use arquivos JPG, PNG ou WEBP.`,
      'error',
      6000
    );
  }

  showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Sanitizar mensagem removendo emojis legados do início
    let cleanMessage = String(message || '')
      .replace(/^[\s\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2612}\u{2713}\u{2714}\u{26A0}\u{FE0F}✓⚠️⚡✨💾🔄🛡️👤📍🗑️]+/gu, '')
      .trim();
    if (!cleanMessage) cleanMessage = message;

    // Detectar automaticamente o tipo de notificação se não especificado
    if (type === 'info') {
      const msgLower = message.toLowerCase();
      if (message.includes('🗑️') || msgLower.includes('removid') || msgLower.includes('excluíd') || msgLower.includes('excluid') || msgLower.includes('deletad') || msgLower.includes('desanexad')) {
        type = 'delete';
      } else if (message.includes('⚠️') || msgLower.includes('por favor') || msgLower.includes('atenção') || msgLower.includes('preencha') || msgLower.includes('obrigatório')) {
        type = 'warning';
      } else if (message.includes('✓') || message.includes('✨') || message.includes('💾') || msgLower.includes('sucesso')) {
        type = 'success';
      } else if (msgLower.includes('erro') || msgLower.includes('falha')) {
        type = 'error';
      }
    }

    const toastIcons = {
      delete: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#ef4444; flex-shrink:0;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
      warning: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:var(--accent-gold-text); flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      success: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#10b981; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      error: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#ef4444; flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
      info: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:var(--accent-gold-text); flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';

    if (type === 'delete') toast.style.borderLeft = '4px solid var(--accent-danger)';
    else if (type === 'success') toast.style.borderLeft = '4px solid var(--accent-success)';
    else if (type === 'error') toast.style.borderLeft = '4px solid var(--accent-danger)';
    else if (type === 'warning') toast.style.borderLeft = '4px solid var(--accent-warning)';
    else toast.style.borderLeft = '4px solid var(--accent-secondary)';

    const iconSvg = toastIcons[type] || toastIcons.info;
    toast.innerHTML = `${iconSvg}<span style="line-height:1.4;">${cleanMessage}</span>`;
    container.appendChild(toast);

    const toastDuration = typeof duration === 'number' && duration > 0 ? duration : 3500;
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, toastDuration);
  }

  bindEvents() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Toggle do Menu Lateral Mobile (Drawer)
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle-btn');
    const mobileBackdrop = document.getElementById('sidebar-mobile-backdrop');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        if (mobileBackdrop) mobileBackdrop.classList.toggle('active');
      });
    }

    if (mobileBackdrop && sidebar) {
      mobileBackdrop.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        mobileBackdrop.classList.remove('active');
      });
    }

    // Fechar gaveta móvel ao clicar em qualquer item do menu lateral
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          sidebar.classList.remove('mobile-open');
          if (mobileBackdrop) mobileBackdrop.classList.remove('active');
        }
      });
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
      });
    });

    // Inputs autosave on change
    document.addEventListener('input', (e) => {
      if (e.target.closest('#view-wizard') && this.currentTraining) {
        this.saveCurrentStepData();
      }
    });

    // Destaques deslizantes do menu lateral e das abas
    this.initSlidingHighlights();

    // Destaques acompanham mudanças de tamanho da janela
    window.addEventListener('resize', () => {
      clearTimeout(this._stepperResizeTimer);
      this._stepperResizeTimer = setTimeout(() => {
        this.moveStepperIndicator(true);
        this.refreshSlideHighlights(true);
      }, 120);
    });

    // Microinteração: onda a partir do ponto clicado em botões, menu e abas
    document.addEventListener('pointerdown', (e) => {
      const target = e.target.closest('.btn, .nav-item, .step-tab-btn, .filter-tab-btn, .team-tab-btn, .master-team-tab-btn');
      if (!target || target.disabled || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');
      ripple.className = 'ui-ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      target.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }, { passive: true });

    // Window popstate / hashchange: rotas dos módulos primeiro (js/core/router.js), depois as telas do painel
    if (window.CapacitaTE && CapacitaTE.router) {
      CapacitaTE.router.setFallback(() => this.handleRoute());
      CapacitaTE.router.start();
    } else {
      window.addEventListener('hashchange', () => this.handleRoute());
    }
  }
}

// Inicializar Singleton da Aplicação
window.app = new CapacitaTEApp();
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});

