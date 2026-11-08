/**
 * CapacitaTE - Client Único do Supabase (compartilhado pelo painel e pelos módulos)
 * Versão: v.4.4.4
 */

window.CapacitaTE = window.CapacitaTE || {};

(function () {
  let client = null;

  CapacitaTE.supabaseClient = {
    /**
     * Devolve o client do Supabase, criando-o na primeira chamada com a configuração vigente (js/core/config.js).
     * Retorna null se a biblioteca local (js/vendor/supabase.umd.js) não estiver carregada.
     */
    get() {
      if (client) return client;
      if (!window.supabase || typeof window.supabase.createClient !== 'function') return null;
      client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      return client;
    },

    /**
     * Descarta o client atual (após mudar endereço ou chave na tela Configurações); o próximo get() cria outro
     */
    reset() {
      client = null;
    }
  };
})();
