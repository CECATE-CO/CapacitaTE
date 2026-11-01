/**
 * CapacitaTE - Roteador por Hash do Painel
 * Versão: v.4.4.2
 */

window.CapacitaTE = window.CapacitaTE || {};

(function () {
  const routes = [];
  let fallback = null;

  /**
   * Normaliza o hash: aceita "#/inscricao/abc" e o formato legado "#wizard/abc/3" e devolve os segmentos
   */
  function parseHash(hash) {
    const clean = String(hash || '').replace(/^#\/?/, '').replace(/\/+$/, '');
    return clean ? clean.split('/').map(decodeURIComponent) : [];
  }

  /**
   * Compara um padrão ("relatorio/:id") com os segmentos do hash e devolve os parâmetros, ou null
   */
  function match(pattern, segments) {
    const parts = pattern.split('/');
    if (parts.length !== segments.length) return null;
    const params = {};
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) params[parts[i].slice(1)] = segments[i];
      else if (parts[i] !== segments[i]) return null;
    }
    return params;
  }

  CapacitaTE.router = {
    parseHash,
    match,

    /**
     * Registra uma rota. handler(params, segments) é chamado quando o hash corresponde ao padrão.
     */
    register(pattern, handler) {
      routes.push({ pattern: pattern.replace(/^#?\/?/, ''), handler });
    },

    /**
     * Define quem trata os hashes sem rota registrada (as telas atuais do painel em js/app.js)
     */
    setFallback(handler) {
      fallback = handler;
    },

    /**
     * Resolve o hash atual: primeiro as rotas registradas pelos módulos, depois o tratamento padrão do painel
     */
    resolve(hash = window.location.hash) {
      const segments = parseHash(hash);
      for (const route of routes) {
        const params = match(route.pattern, segments);
        if (params) return route.handler(params, segments);
      }
      if (fallback) return fallback(segments);
    },

    navigate(path) {
      window.location.hash = '/' + String(path || '').replace(/^#?\/?/, '');
    },

    start() {
      window.addEventListener('hashchange', () => this.resolve());
    }
  };
})();
