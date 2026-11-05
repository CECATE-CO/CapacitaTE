/**
 * CapacitaTE - Permissões no Painel: can(moduleKey, action, trainingId?) e guardas de rota e de botão
 * Isto é só usabilidade: a segurança real fica no servidor (RLS, has_perm e RPCs do Supabase).
 * Versão: v.4.4.3
 */

window.CapacitaTE = window.CapacitaTE || {};

(function () {
  // 'view' é satisfeita por edit/export/generate (mesma regra de has_perm no SQL)
  const IMPLIES_VIEW = ['edit', 'export', 'generate'];

  function can(moduleKey, action = 'view', trainingId = null) {
    const auth = CapacitaTE.auth;
    // Antes do login estar configurado (modo transição ou só local), tudo continua liberado como antes
    if (!auth || auth.mode !== 'authenticated') return true;
    if (auth.profile && auth.profile.is_admin) return true;
    if (moduleKey === 'admin') return false;
    return (auth.permissions || []).some(p =>
      p.module_key === moduleKey &&
      (p.action === action || (action === 'view' && IMPLIES_VIEW.includes(p.action))) &&
      (!p.training_id || p.training_id === trainingId)
    );
  }

  /**
   * Guarda: executa fn só com permissão; sem permissão, avisa e devolve undefined
   */
  function guard(moduleKey, action, fn, trainingId = null) {
    if (can(moduleKey, action, trainingId)) return fn();
    const msg = 'Você não tem permissão para esta ação.';
    if (window.app && typeof window.app.showToast === 'function') window.app.showToast(msg, 'warning');
    return undefined;
  }

  /**
   * Esconde elementos marcados com data-perm="modulo.acao" sem permissão
   */
  function applyToDom(root = document) {
    root.querySelectorAll('[data-perm]').forEach(el => {
      const [moduleKey, action] = el.getAttribute('data-perm').split('.');
      el.style.display = can(moduleKey, action) ? '' : 'none';
    });
  }

  CapacitaTE.can = can;
  CapacitaTE.permissions = { can, guard, applyToDom };
})();
