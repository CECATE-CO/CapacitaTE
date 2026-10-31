/**
 * CapacitaTE - Gerenciador de Banco de Dados Local (IndexedDB) & Sincronização em Nuvem (Supabase)
 * Versão: v.4.3.9
 */

// A configuração da nuvem (SUPABASE_CONFIG, getSavedCloudConfig, loadSupabaseEnv) fica em js/core/config.js
// e o client único em js/core/supabaseClient.js.

class TrainingDB {
  constructor() {
    this.dbName = 'AutoReportCECATE_DB'; // chave legada mantida para compatibilidade
    this.dbVersion = 1;
    this.db = null;
    this.isReady = false;
    this.autoSaveTimers = {};
    this.supabase = null;
    this.isCloudConnected = false;
  }

  /**
   * Inicializa a conexão com o IndexedDB e cria os Object Stores
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // 1. Capacitações (Mestre)
        if (!db.objectStoreNames.contains('trainings')) {
          const store = db.createObjectStore('trainings', { keyPath: 'id' });
          store.createIndex('number', 'number', { unique: false });
          store.createIndex('updatedAt', 'updatedAt', { unique: false });
          store.createIndex('status', 'status', { unique: false });
        }

        // 2. Integrantes da Equipe por Capacitação
        if (!db.objectStoreNames.contains('team')) {
          const store = db.createObjectStore('team', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 3. Municípios por Capacitação
        if (!db.objectStoreNames.contains('municipalities')) {
          const store = db.createObjectStore('municipalities', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('ibgeCode', 'ibgeCode', { unique: false });
        }

        // 4. Módulos e Estrutura do Curso
        if (!db.objectStoreNames.contains('courseModules')) {
          const store = db.createObjectStore('courseModules', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 5. Momentos / Desenvolvimento do Curso
        if (!db.objectStoreNames.contains('courseMoments')) {
          const store = db.createObjectStore('courseMoments', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 6. Lista de Presença & Participantes
        if (!db.objectStoreNames.contains('attendance')) {
          const store = db.createObjectStore('attendance', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('cpf', 'cpf', { unique: false });
          store.createIndex('municipality', 'municipality', { unique: false });
        }

        // 7. Avaliações (Respostas de Pesquisa)
        if (!db.objectStoreNames.contains('evaluations')) {
          const store = db.createObjectStore('evaluations', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('cpf', 'cpf', { unique: false });
        }

        // 8. Registros Fotográficos e Documentos de Apêndice
        if (!db.objectStoreNames.contains('media')) {
          const store = db.createObjectStore('media', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('type', 'type', { unique: false });
        }

        // 9. Histórico de Alterações / Auditoria
        if (!db.objectStoreNames.contains('auditLog')) {
          const store = db.createObjectStore('auditLog', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 10. Catálogo Global de Equipe (Reutilizável)
        if (!db.objectStoreNames.contains('globalTeamCatalog')) {
          db.createObjectStore('globalTeamCatalog', { keyPath: 'id' });
        }

        // 11. Modelos e Templates de Texto
        if (!db.objectStoreNames.contains('templates')) {
          db.createObjectStore('templates', { keyPath: 'id' });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        this.isReady = true;

        // Inicializar conexão com Supabase e dados locais
        await loadSupabaseEnv();
        this.initSupabase();
        await this.seedInitialData();

        // Sincronização em segundo plano não-bloqueante (permite abrir localmente de imediato sem travar)
        this.syncFromCloud().catch(err => {
          console.warn('Operando em modo local offline:', err);
          this.updateCloudIndicator(false);
        });

        resolve(this);
      };

      request.onerror = (event) => {
        console.error('Erro ao abrir IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  /**
   * Inicializa a conexão com o Supabase Cloud
   */
  initSupabase() {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this.supabase = CapacitaTE.supabaseClient.get();
        this.isCloudConnected = true;
        this.updateCloudIndicator(true);
        console.log('Supabase Cloud conectado com sucesso!');
      } catch (err) {
        console.warn('Falha ao inicializar Supabase:', err);
        this.supabase = null;
        this.isCloudConnected = false;
        this.updateCloudIndicator(false);
      }
    } else {
      this.isCloudConnected = false;
      this.updateCloudIndicator(false);
    }
  }

  /**
   * Recarrega a configuração da nuvem (após salvar ou remover na tela Configurações) e reconecta
   */
  async reconnectSupabase() {
    await loadSupabaseEnv();
    CapacitaTE.supabaseClient.reset();
    this.supabase = null;
    this.initSupabase();
    return this.supabase ? this.syncNow() : null;
  }

  /**
   * Atualiza o indicador visual de nuvem na barra superior
   */
  updateCloudIndicator(isConnected, state = '') {
    const el = document.getElementById('cloud-sync-status');
    if (!el) return;
    if (isConnected && state === 'syncing') {
      el.style.background = 'rgba(246, 168, 0, 0.12)';
      el.style.color = 'var(--accent-gold-text, #F6A800)';
      el.style.borderColor = 'rgba(246, 168, 0, 0.35)';
      el.innerHTML = `
        <svg class="sync-spin" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
        <span>Sincronizando...</span>
      `;
      el.title = 'Sincronizando a versão local com a online';
      return;
    }
    if (isConnected) {
      el.style.background = 'rgba(16, 185, 129, 0.12)';
      el.style.color = '#10b981';
      el.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      el.innerHTML = `
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
        <span>Nuvem Ativa</span>
      `;
      el.title = this.lastSyncAt
        ? `Conectado ao Supabase. Última sincronização: ${this.lastSyncAt.toLocaleString('pt-BR')}`
        : 'Conectado ao Supabase: Dados sincronizados em nuvem para todos os usuários';
    } else {
      el.style.background = 'rgba(245, 158, 11, 0.12)';
      el.style.color = '#f59e0b';
      el.style.borderColor = 'rgba(245, 158, 11, 0.3)';
      el.innerHTML = `
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
        <span>Modo Local (Offline)</span>
      `;
      el.title = 'Operando localmente no navegador';
    }
  }

  /**
   * Sincronização automática em segundo plano (abertura do app e painel). Falhas não interrompem o uso local.
   */
  async syncFromCloud() {
    if (!this.supabase) return;
    // Com a segurança final (0005) a nuvem só responde a quem entrou: antes do login não tenta (evita o falso "offline")
    const auth = window.CapacitaTE && CapacitaTE.auth;
    if (auth && auth.mode !== 'authenticated' && auth.mode !== 'transition') return;
    try {
      await this.syncNow({ timeoutMs: 3500 });
    } catch (e) {
      console.warn('Operando com dados locais (modo offline/local):', e.message || e);
    }
  }

  /**
   * Sincroniza a versão local com a online, nos dois sentidos, comparando a data de atualização de cada capacitação:
   * - mais nova na nuvem (ou só na nuvem): baixa para o navegador;
   * - mais nova no navegador (ou só no navegador): envia para a nuvem;
   * - registros históricos vêm do banco de dados e nunca são enviados; nada é apagado automaticamente.
   * Retorna um resumo { downloaded, uploaded, unchanged, failed, downloadedIds }. Lança erro se a nuvem não responder.
   * Chamadas simultâneas aguardam a sincronização em andamento e reutilizam o resultado dela.
   */
  syncNow({ timeoutMs = 20000 } = {}) {
    if (!this.supabase) {
      return Promise.reject(new Error('Conexão com a nuvem (Supabase) indisponível. Verifique a internet e recarregue a página.'));
    }
    if (this._syncPromise) return this._syncPromise;
    this.isSyncing = true;
    this.updateCloudIndicator(true, 'syncing');
    this._syncPromise = this._runSync(timeoutMs)
      .then(summary => {
        this.lastSyncAt = new Date();
        this.updateCloudIndicator(true);
        return summary;
      })
      .catch(err => {
        this.updateCloudIndicator(false);
        throw err;
      })
      .finally(() => {
        this.isSyncing = false;
        this._syncPromise = null;
      });
    return this._syncPromise;
  }

  async _runSync(timeoutMs) {
    const summary = { downloaded: 0, uploaded: 0, unchanged: 0, failed: 0, downloadedIds: [] };

    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('A nuvem não respondeu a tempo.')), timeoutMs));
    let cloudTrainings, error;
    try {
      ({ data: cloudTrainings, error } = await Promise.race([this.supabase.from('trainings').select('*'), timeout]));
    } catch (e) {
      throw new Error(this.describeCloudError(e));
    }
    if (error) throw new Error(this.describeCloudError(error));

    const cloudById = new Map((cloudTrainings || []).filter(r => r && r.id).map(r => [r.id, r]));
    const timeOf = (v) => { const t = new Date(v || 0).getTime(); return isNaN(t) ? 0 : t; };

    // 1. Registros da nuvem: baixa os mais novos que a cópia local
    for (const row of cloudById.values()) {
      if (!row.data) continue;
      const local = await this.get('trainings', row.id);
      const cloudTime = timeOf(row.data.updatedAt || row.updated_at || row.created_at);
      const localTime = timeOf(local?.updatedAt || local?.createdAt);
      if (!local || cloudTime > localTime) {
        try {
          const cloudData = { ...row.data, id: row.id, updatedAt: row.data.updatedAt || row.updated_at };
          await this.saveTrainingFull(cloudData, 'Sincronização da Nuvem (Supabase)', false, true);
          summary.downloaded++;
          summary.downloadedIds.push(row.id);
        } catch (e) {
          console.warn('Falha ao baixar capacitação da nuvem:', row.id, e);
          summary.failed++;
        }
      } else if (localTime === cloudTime) {
        summary.unchanged++;
      }
    }

    // 2. Registros locais: envia os que não estão na nuvem ou que são mais novos que a versão online
    const allLocal = await this.getAll('trainings');
    for (const loc of allLocal) {
      if (loc.isHistorical || loc.status === 'historico') continue; // históricos vêm do banco, não são enviados
      const row = cloudById.get(loc.id);
      const cloudTime = row ? timeOf(row.data?.updatedAt || row.updated_at || row.created_at) : -1;
      if (!row || timeOf(loc.updatedAt || loc.createdAt) > cloudTime) {
        const full = await this.getTrainingFull(loc.id);
        if (full && await this.uploadTrainingToCloud(full)) summary.uploaded++;
        else summary.failed++;
      }
    }

    // 3. Catálogo de Equipe Mestre (somente leitura a partir da nuvem)
    try {
      const { data: cloudTeam } = await this.supabase.from('master_team').select('*');
      for (const row of (cloudTeam || [])) {
        if (row.data && row.id) await this.put('globalTeamCatalog', row.data);
      }
    } catch (e) {
      console.warn('Falha ao sincronizar a equipe mestra:', e);
    }

    return summary;
  }

  /**
   * Traduz falhas de conexão com o Supabase em mensagens compreensíveis para o usuário
   */
  describeCloudError(err) {
    const msg = String((err && (err.message || err.details)) || err || '');
    if (/failed to fetch|networkerror|load failed|fetch failed/i.test(msg)) {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        return 'Sem conexão com a internet';
      }
      return `o servidor da nuvem (${SUPABASE_CONFIG.url}) não respondeu. Informe o endereço e a chave do projeto Supabase em Configurações > Conexão com a Nuvem (ou verifique se o projeto está ativo)`;
    }
    if (/JWT|apikey|Invalid API key|401/i.test(msg)) return 'a chave de acesso da nuvem (Supabase) foi recusada';
    if (/row-level security|permission denied|42501/i.test(msg)) return 'a nuvem recusou o acesso (regras de segurança RLS do Supabase)';
    return msg || 'falha desconhecida na nuvem';
  }

  /**
   * Envia uma capacitação para o Supabase
   */
  async uploadTrainingToCloud(fullData) {
    if (!this.supabase || !fullData || !fullData.id) return;
    try {
      const { error } = await this.supabase.from('trainings').upsert({
        id: fullData.id,
        number: (fullData.number !== undefined && fullData.number !== null && fullData.number !== '') ? parseInt(fullData.number) : null,
        polo: fullData.polo || '',
        uf: fullData.uf || '',
        status: fullData.status || 'in_progress',
        is_historical: !!fullData.isHistorical,
        data: fullData,
        // Mesma data do registro local, para que a sincronização não considere a nuvem mais nova sem motivo
        updated_at: fullData.updatedAt || new Date().toISOString()
      });
      if (error) throw error;
      if (!this.isSyncing) this.updateCloudIndicator(true);
      console.log(`Capacitação sincronizada na nuvem: ${fullData.polo || fullData.id}`);
      return true;
    } catch (err) {
      console.warn('Erro ao subir dados para a nuvem:', err);
      this.updateCloudIndicator(false);
      return false;
    }
  }

  /**
   * Remove uma capacitação do Supabase
   */
  async deleteTrainingFromCloud(trainingId) {
    if (!this.supabase || !trainingId) return;
    try {
      const { error } = await this.supabase.from('trainings').delete().eq('id', trainingId);
      if (error) throw error;
      console.log(`Capacitação excluída da nuvem: ${trainingId}`);
      if (window.CapacitaTE && CapacitaTE.audit) await CapacitaTE.audit.log('training.delete', { module: 'relatorio', trainingId });
      return true;
    } catch (err) {
      console.warn('Erro ao deletar na nuvem:', err);
      return false; // a cópia da nuvem continua e voltaria na próxima sincronização: quem chamou avisa
    }
  }

  /* ==========================================================================
     CRUD Genérico
     ========================================================================== */
  async put(storeName, item) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async clearStoreByIndex(storeName, indexName, value) {
    const items = await this.getByIndex(storeName, indexName, value);
    for (const item of items) {
      await this.delete(storeName, item.id);
    }
  }

  /* ==========================================================================
     MÉTODOS ESPECÍFICOS: CAPACITAÇÕES
     ========================================================================== */
  /**
   * Exclui uma capacitação criada pelo usuário (com trava estrita de proteção para registros históricos)
   */
  async deleteTraining(trainingId, syncCloud = true) {
    const training = await this.get('trainings', trainingId);
    if (!training) {
      throw new Error('Capacitação não encontrada no banco de dados.');
    }

    // Regra estrita de segurança: registros marcados como históricos (inseridos no banco de dados) não são excluídos
    if (training.isHistorical || training.status === 'historico') {
      throw new Error('Capacitações do Histórico Protegido não podem ser excluídas.');
    }

    // Exclusão em cascata de todos os registros filhos e mestre no IndexedDB
    await Promise.all([
      this.clearStoreByIndex('team', 'trainingId', trainingId),
      this.clearStoreByIndex('municipalities', 'trainingId', trainingId),
      this.clearStoreByIndex('courseModules', 'trainingId', trainingId),
      this.clearStoreByIndex('courseMoments', 'trainingId', trainingId),
      this.clearStoreByIndex('attendance', 'trainingId', trainingId),
      this.clearStoreByIndex('evaluations', 'trainingId', trainingId),
      this.clearStoreByIndex('media', 'trainingId', trainingId),
      this.clearStoreByIndex('auditLog', 'trainingId', trainingId),
      this.delete('trainings', trainingId)
    ]);

    // Exclusão na nuvem (Supabase)
    if (syncCloud && this.supabase) {
      const ok = await this.deleteTrainingFromCloud(trainingId);
      if (!ok) return 'cloud-failed';
    }

    return true;
  }

  async getAllTrainings() {
    const trainings = await this.getAll('trainings');
    return trainings.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }

  async getTrainingFull(trainingId) {
    const training = await this.get('trainings', trainingId);
    if (!training) return null;

    const [team, municipalities, courseModules, courseMoments, attendance, evaluations, media, auditLog] = await Promise.all([
      this.getByIndex('team', 'trainingId', trainingId),
      this.getByIndex('municipalities', 'trainingId', trainingId),
      this.getByIndex('courseModules', 'trainingId', trainingId),
      this.getByIndex('courseMoments', 'trainingId', trainingId),
      this.getByIndex('attendance', 'trainingId', trainingId),
      this.getByIndex('evaluations', 'trainingId', trainingId),
      this.getByIndex('media', 'trainingId', trainingId),
      this.getByIndex('auditLog', 'trainingId', trainingId)
    ]);

    return {
      ...training,
      registrations: Array.isArray(training.registrations) ? training.registrations : [],
      baseTemplateId: training.baseTemplateId || null,
      baseTemplateName: training.baseTemplateName || '',
      isCustomized: training.isCustomized === true,
      customPhotoTitles: training.customPhotoTitles || {},
      customPhotoSources: training.customPhotoSources || {},
      customWordCloudTitles: training.customWordCloudTitles || {},
      customWordCloudSources: training.customWordCloudSources || {},
      wordCloudFontFamily: training.wordCloudFontFamily || 'Plus Jakarta Sans',
      team: team.sort((a, b) => (a.order || 0) - (b.order || 0)),
      municipalities: municipalities.sort((a, b) => (a.name || '').localeCompare(b.name || '')),
      courseModules: courseModules.sort((a, b) => (a.order || 0) - (b.order || 0)),
      courseMoments: courseMoments.sort((a, b) => (a.order || 0) - (b.order || 0)),
      attendance: attendance.sort((a, b) => (a.name || '').localeCompare(b.name || '')),
      evaluations,
      media: media.sort((a, b) => (a.order || 0) - (b.order || 0)),
      auditLog: auditLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    };
  }

  /**
   * Salva a capacitação completa. Salvamentos da mesma capacitação são enfileirados: o salvamento apaga e
   * regrava os registros filhos (equipe, participantes, avaliações, mídias), e duas execuções simultâneas
   * (autosave + salvamento manual ou sincronização) poderiam duplicar ou perder registros.
   */
  saveTrainingFull(data, changeSummary = 'Atualização geral dos dados', syncCloud = true, preserveUpdatedAt = false) {
    if (!data.id) data.id = `cap_${Date.now()}`;
    if (!this._saveQueues) this._saveQueues = new Map();
    const previous = this._saveQueues.get(data.id) || Promise.resolve();
    const run = previous.catch(() => {}).then(() => this._saveTrainingFullNow(data, changeSummary, syncCloud, preserveUpdatedAt));
    this._saveQueues.set(data.id, run);
    run.finally(() => {
      if (this._saveQueues.get(data.id) === run) this._saveQueues.delete(data.id);
    }).catch(() => {});
    return run;
  }

  async _saveTrainingFullNow(data, changeSummary, syncCloud, preserveUpdatedAt = false) {
    const trainingId = data.id;
    const now = new Date().toISOString();

    // Campos adicionais (ex.: evaluationComments, customWordCloudFont) são preservados; os filhos ficam em stores próprios
    const { team: _t, municipalities: _m, courseModules: _cm, courseMoments: _cmo, attendance: _a, evaluations: _e, media: _me, auditLog: _al, ...extraFields } = data;
    const trainingRecord = {
      ...extraFields,
      id: trainingId,
      number: (data.number !== undefined && data.number !== null) ? data.number : '',
      title: data.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      polo: data.polo || '',
      uf: data.uf || '',
      poloIbge: data.poloIbge || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      datesFormatted: data.datesFormatted || '',
      workload: data.workload || '',
      targetAudience: data.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB',
      expectedParticipants: data.expectedParticipants || '',
      responsibleOrg: data.responsibleOrg || localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)', // chave legada mantida para compatibilidade
      relatedProject: data.relatedProject || localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL', // chave legada mantida para compatibilidade
      processNumber: data.processNumber || localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00', // chave legada mantida para compatibilidade
      fundingOrg: data.fundingOrg || localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE', // chave legada mantida para compatibilidade
      partnerOrgs: data.partnerOrgs || '',
      locationVenue: data.locationVenue || '',
      locationAddress: data.locationAddress || '',
      attachedFileName: data.attachedFileName || '',
      baseTemplateId: data.baseTemplateId || null,
      baseTemplateName: data.baseTemplateName || '',
      isCustomized: data.isCustomized === true,
      durationDays: data.durationDays || null,
      isHistorical: data.isHistorical === true,
      registrations: Array.isArray(data.registrations) ? data.registrations : [],
      contactsData: data.contactsData || {
        startDate: '',
        methods: '',
        responsible: 'Equipe de Articulação Institucional CECATE-CO',
        notes: ''
      },
      educationalTech: data.educationalTech || null,
      texts: data.texts || {
        intro: '',
        development: '',
        finalConsiderations: ''
      },
      customPhotoTitles: data.customPhotoTitles || {},
      customPhotoSources: data.customPhotoSources || {},
      customWordCloudTitles: data.customWordCloudTitles || {},
      customWordCloudSources: data.customWordCloudSources || {},
      wordCloudFontFamily: data.wordCloudFontFamily || 'Plus Jakarta Sans',
      status: data.status || 'in_progress',
      progressPercent: data.progressPercent || 0,
      createdAt: data.createdAt || now,
      updatedAt: (preserveUpdatedAt && data.updatedAt) ? data.updatedAt : now
    };

    // Salvar registro mestre
    await this.put('trainings', trainingRecord);

    // Salvar registros filhos se fornecidos
    if (Array.isArray(data.team)) {
      await this.clearStoreByIndex('team', 'trainingId', trainingId);
      for (const [idx, member] of data.team.entries()) {
        await this.put('team', {
          ...member,
          id: member.id || `team_${trainingId}_${idx}_${Date.now()}`,
          trainingId,
          name: member.name,
          institution: member.institution || 'UFG',
          role: member.role || 'Instrutor',
          type: member.type || 'tecnica',
          order: member.order !== undefined ? member.order : idx
        });
      }
    }

    if (Array.isArray(data.municipalities)) {
      await this.clearStoreByIndex('municipalities', 'trainingId', trainingId);
      for (const [idx, m] of data.municipalities.entries()) {
        await this.put('municipalities', {
          id: m.id || `mun_${trainingId}_${m.ibgeCode || idx}`,
          trainingId,
          ibgeCode: m.ibgeCode,
          name: m.name,
          uf: m.uf || data.uf,
          distanceKm: parseFloat(m.distanceKm) || 0,
          isSummoned: m.isSummoned !== false,
          isSede: m.isSede === true,
          inscribedCACS: parseInt(m.inscribedCACS) || 0,
          inscribedGestores: parseInt(m.inscribedGestores) || 0,
          inscribedTotal: parseInt(m.inscribedTotal) || ((parseInt(m.inscribedCACS) || 0) + (parseInt(m.inscribedGestores) || 0)),
          presentCACS: parseInt(m.presentCACS) || 0,
          presentGestores: parseInt(m.presentGestores) || 0,
          presentTotal: parseInt(m.presentTotal) || ((parseInt(m.presentCACS) || 0) + (parseInt(m.presentGestores) || 0))
        });
      }
    }

    if (Array.isArray(data.courseModules)) {
      await this.clearStoreByIndex('courseModules', 'trainingId', trainingId);
      for (const [idx, mod] of data.courseModules.entries()) {
        await this.put('courseModules', {
          id: mod.id || `mod_${trainingId}_${idx}`,
          trainingId,
          moduleNumber: mod.moduleNumber || `0${idx + 1}`,
          isShared: mod.isShared !== undefined ? mod.isShared : true,
          topicGestor: mod.topicGestor || (Array.isArray(mod.gestorTopics) && mod.gestorTopics[0] ? mod.gestorTopics[0].topic : ''),
          topicCACS: mod.topicCACS || (Array.isArray(mod.cacsTopics) && mod.cacsTopics[0] ? mod.cacsTopics[0].topic : ''),
          hoursGestor: parseFloat(mod.hoursGestor) || (Array.isArray(mod.gestorTopics) ? mod.gestorTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0) : 0),
          hoursCACS: parseFloat(mod.hoursCACS) || (Array.isArray(mod.cacsTopics) ? mod.cacsTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0) : 0),
          gestorTopics: Array.isArray(mod.gestorTopics) && mod.gestorTopics.length > 0 ? mod.gestorTopics : (mod.topicGestor ? [{ id: `top_g_${Date.now()}_${idx}_0`, topic: mod.topicGestor, hours: parseFloat(mod.hoursGestor) || 0 }] : []),
          cacsTopics: Array.isArray(mod.cacsTopics) && mod.cacsTopics.length > 0 ? mod.cacsTopics : (mod.topicCACS ? [{ id: `top_c_${Date.now()}_${idx}_0`, topic: mod.topicCACS, hours: parseFloat(mod.hoursCACS) || 0 }] : []),
          description: mod.description || '',
          order: mod.order !== undefined ? mod.order : idx
        });
      }
    }

    if (Array.isArray(data.courseMoments)) {
      await this.clearStoreByIndex('courseMoments', 'trainingId', trainingId);
      for (const [idx, mom] of data.courseMoments.entries()) {
        await this.put('courseMoments', {
          id: mom.id || `mom_${trainingId}_${idx}`,
          trainingId,
          title: mom.title || `Momento ${idx + 1}`,
          description: mom.description || '',
          scheduleTime: mom.scheduleTime || '',
          instructor: mom.instructor || '',
          notes: mom.notes || '',
          photoIds: mom.photoIds || [],
          order: mom.order !== undefined ? mom.order : idx
        });
      }
    }

    if (Array.isArray(data.attendance)) {
      await this.clearStoreByIndex('attendance', 'trainingId', trainingId);
      for (const [idx, att] of data.attendance.entries()) {
        await this.put('attendance', {
          id: att.id || `att_${trainingId}_${idx}`,
          trainingId,
          name: att.name || '',
          cpf: att.cpf || '',
          email: att.email || '',
          phone: att.phone || '',
          birthDate: att.birthDate || '',
          municipality: att.municipality || '',
          ibgeCode: att.ibgeCode || '',
          representation: att.representation || 'Gestão municipal',
          roleGestao: att.roleGestao || '',
          roleCACS: att.roleCACS || '',
          successCase: att.successCase || '',
          isEnrolled: att.isEnrolled !== false,
          isPresent: att.isPresent !== false,
          isManualMunicipality: att.isManualMunicipality === true,
          isManualRepresentation: att.isManualRepresentation === true,
          matchedByCpf: att.matchedByCpf === true,
          isCpfValidated: att.isCpfValidated === true,
          source: att.source || 'excel'
        });
      }
    }

    if (Array.isArray(data.evaluations)) {
      await this.clearStoreByIndex('evaluations', 'trainingId', trainingId);
      for (const [idx, ev] of data.evaluations.entries()) {
        await this.put('evaluations', {
          id: ev.id || `eval_${trainingId}_${idx}`,
          trainingId,
          timestamp: ev.timestamp || now,
          name: ev.name || '',
          cpf: ev.cpf || '',
          email: ev.email || '',
          phone: ev.phone || '',
          municipality: ev.municipality || '',
          ibgeCode: ev.ibgeCode || '',
          representation: ev.representation || 'Gestão municipal',
          ratings: Array.isArray(ev.ratings) ? ev.ratings : [],
          likedAspects: ev.likedAspects || '',
          improveAspects: ev.improveAspects || '',
          institution: ev.institution || '',
          suggestions: ev.suggestions || '',
          howFound: ev.howFound || '',
          comments: ev.comments || ''
        });
      }
    }

    if (Array.isArray(data.media)) {
      await this.clearStoreByIndex('media', 'trainingId', trainingId);
      for (const [idx, med] of data.media.entries()) {
        await this.put('media', {
          ...med, // preserva pageImages (apêndices), customSource, movedByUser etc.
          id: med.id || `med_${trainingId}_${idx}`,
          trainingId,
          slotId: med.slotId || '',
          type: med.type || 'photo',
          blob: med.blob || med.dataUrl || '',
          caption: med.caption || `Figura ${idx + 1}`,
          title: med.title || '',
          order: idx, // a ordem do array é a ordem vigente (fotos complementares podem ser reordenadas)
          section: med.section || '6. REGISTROS FOTOGRÁFICOS',
          description: med.description || '',
          source: med.source || (data.customPhotoSources && med.slotId && data.customPhotoSources[med.slotId] ? (data.customPhotoSources[med.slotId].toLowerCase().startsWith('fonte:') ? data.customPhotoSources[med.slotId].trim() : `Fonte: ${data.customPhotoSources[med.slotId].trim()}`) : 'Fonte: Elaborada pelos autores.'),
          fileName: med.fileName || `foto_${idx + 1}.jpg`,
          fileSize: med.fileSize || 0,
          fileType: med.fileType || ''
        });
      }
    }

    // Registrar log de auditoria
    await this.put('auditLog', {
      id: `log_${trainingId}_${Date.now()}`,
      trainingId,
      timestamp: now,
      summary: changeSummary
    });

    // Sincronização em segundo plano na nuvem (Supabase)
    if (syncCloud && this.supabase) {
      this.getTrainingFull(trainingId).then(fullData => {
        if (fullData) this.uploadTrainingToCloud(fullData);
      }).catch(err => console.warn('Aviso de sincronização em nuvem:', err));
    }

    return trainingId;
  }

  /**
   * Autosave com debounce
   */
  triggerAutoSave(trainingId, getDataCallback, onSavedCallback) {
    if (this.autoSaveTimers[trainingId]) {
      clearTimeout(this.autoSaveTimers[trainingId]);
    }

    const saveStatusBadge = document.getElementById('autosave-status-badge');
    if (saveStatusBadge) {
      saveStatusBadge.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Salvando alterações...';
      saveStatusBadge.style.color = 'var(--accent-warning)';
    }

    this.autoSaveTimers[trainingId] = setTimeout(async () => {
      try {
        const data = await getDataCallback();
        if (data) {
          await this.saveTrainingFull(data, 'Autosave automático');
          const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          if (saveStatusBadge) {
            saveStatusBadge.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Salvo às ${timeStr}`;
            saveStatusBadge.style.color = 'var(--accent-success)';
          }
          if (typeof onSavedCallback === 'function') onSavedCallback(data);
        }
      } catch (err) {
        console.error('Erro no autosave:', err);
        if (saveStatusBadge) {
          saveStatusBadge.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Erro ao salvar';
          saveStatusBadge.style.color = 'var(--accent-danger)';
        }
      }
    }, 400);
  }

  /**
   * Duplica uma capacitação para servir de modelo para uma nova edição (Regras 63, 64 e 65)
   */
  async duplicateTraining(sourceTrainingId, options = {}) {
    const source = await this.getTrainingFull(sourceTrainingId);
    if (!source) throw new Error('Capacitação de origem não encontrada');

    const opts = {
      copyInstitutional: options.copyInstitutional !== false,
      copyModules: options.copyModules !== false,
      copyMunicipalities: options.copyMunicipalities === true, // Padrão: false para forçar municípios do polo novo
      copyTexts: options.copyTexts !== false,
      copyTeam: options.copyTeam !== false,
      copyEvaluationConfig: options.copyEvaluationConfig !== false,
      copyParticipants: false, // Regra 65: NUNCA copiar participantes individuais de capacitações anteriores
      copyEvaluations: false,  // Regra 65: NUNCA copiar avaliações individuais
      copyPhotos: false,       // Regra 65: NUNCA copiar fotos do evento anterior
      ...options
    };

    const allTrainings = await this.getAll('trainings');
    const maxNum = allTrainings.length > 0 ? Math.max(...allTrainings.map(t => parseInt(t.number) || 0)) : 16;
    const nextNumber = maxNum + 1;
    const newId = `cap_${Date.now()}`;

    const duplicatedData = {
      id: newId,
      number: nextNumber,
      title: source.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      polo: `${source.polo || 'Novo Polo'} (Baseado na Cap. ${source.number})`,
      uf: source.uf || 'MT',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      datesFormatted: 'A definir',
      workload: source.workload || '16 horas',
      targetAudience: source.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB',
      expectedParticipants: source.expectedParticipants || 40,
      responsibleOrg: opts.copyInstitutional ? source.responsibleOrg : 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
      relatedProject: opts.copyInstitutional ? source.relatedProject : 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
      processNumber: opts.copyInstitutional ? source.processNumber : '23070.012345/2026-00',
      fundingOrg: opts.copyInstitutional ? source.fundingOrg : 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
      partnerOrgs: opts.copyInstitutional ? source.partnerOrgs : '',
      locationVenue: 'Auditório Municipal',
      contactsData: {
        startDate: '',
        methods: '',
        responsible: source.contactsData?.responsible || 'Equipe de Articulação Institucional CECATE-CO',
        notes: ''
      },
      educationalTech: source.educationalTech ? JSON.parse(JSON.stringify(source.educationalTech)) : null,
      texts: opts.copyTexts ? { ...source.texts } : {},
      status: 'in_progress',
      isHistorical: false, // Novo registro em andamento, nunca histórico
      progressPercent: 15,
      team: opts.copyTeam && source.team ? source.team.map((t, idx) => ({ ...t, id: `team_${newId}_${idx}` })) : [],
      courseModules: opts.copyModules && source.courseModules ? source.courseModules.map((m, idx) => ({ ...m, id: `mod_${newId}_${idx}` })) : [],
      municipalities: opts.copyMunicipalities && source.municipalities ? source.municipalities.map((m, idx) => ({
        ...m,
        id: `mun_${newId}_${idx}`,
        inscribedCACS: 0, inscribedGestores: 0, inscribedTotal: 0,
        presentCACS: 0, presentGestores: 0, presentTotal: 0
      })) : [],
      attendance: [],  // Limpo
      evaluations: [], // Limpo
      media: []        // Limpo
    };

    await this.saveTrainingFull(duplicatedData, `Nova capacitação criada com base no modelo da Capacitação Nº ${source.number}`);
    return newId;
  }

  /**
   * Ajustes iniciais do banco local. As capacitações históricas não são mais embutidas no app:
   * são inseridas diretamente no banco de dados (Supabase) e chegam pela sincronização.
   */
  async seedInitialData() {
    // 1. Remoção (uma única vez) das cópias das Capacitações Nº 6 a 14 que eram embutidas no app (ids cap_historico_N).
    // Executa só uma vez para não apagar registros com esses ids inseridos depois no banco de dados.
    if (!localStorage.getItem('autoreport_embedded_history_removed')) { // chave legada mantida para compatibilidade
      for (let n = 6; n <= 14; n++) {
        await this.purgeTrainingLocal(`cap_historico_${n}`);
      }
      localStorage.setItem('autoreport_embedded_history_removed', '1'); // chave legada mantida para compatibilidade
    }

    // 2. Limpeza de registros de teste pré-semeados antigos se existirem
    const oldSample16 = await this.get('trainings', 'cap_16cte_pontes_lacerda');
    if (oldSample16 && !oldSample16.userModified) {
      console.log('Removendo registro de teste antigo da Capacitação Nº 16 para inserção limpa do usuário...');
      await this.deleteTraining('cap_16cte_pontes_lacerda', false).catch(() => {}); // só local: nunca apaga na nuvem
    }

    // 3. Limpeza/remoção da Capacitação 15 (Posse) da base protegida no IndexedDB
    const allTrainings = await this.getAll('trainings');
    for (const t of allTrainings) {
      if (t.id === 'cap_historico_15' || (parseInt(t.number) === 15 && (t.isHistorical || t.status === 'historico' || t.polo === 'Posse'))) {
        console.log('Removendo Capacitação 15 (Posse) do IndexedDB...');
        await this.purgeTrainingLocal(t.id);
      }
    }
  }

  /**
   * Remove uma capacitação e todos os registros filhos apenas do banco local, sem a trava de histórico
   * (uso interno de limpeza; não altera a nuvem)
   */
  async purgeTrainingLocal(trainingId) {
    const existing = await this.get('trainings', trainingId);
    if (!existing) return;
    console.log(`Removendo do banco local a capacitação ${trainingId}...`);
    await Promise.all([
      this.clearStoreByIndex('team', 'trainingId', trainingId),
      this.clearStoreByIndex('municipalities', 'trainingId', trainingId),
      this.clearStoreByIndex('courseModules', 'trainingId', trainingId),
      this.clearStoreByIndex('courseMoments', 'trainingId', trainingId),
      this.clearStoreByIndex('attendance', 'trainingId', trainingId),
      this.clearStoreByIndex('evaluations', 'trainingId', trainingId),
      this.clearStoreByIndex('media', 'trainingId', trainingId),
      this.clearStoreByIndex('auditLog', 'trainingId', trainingId),
      this.delete('trainings', trainingId)
    ]);
  }
}

// Singleton global
window.db = new TrainingDB();

