/**
 * CapacitaTE - Auditoria: grava eventos em audit_log pela função log_event (servidor define o usuário)
 * Versão: v.4.4.5
 */

window.CapacitaTE = window.CapacitaTE || {};

CapacitaTE.audit = {
  /**
   * Registra um evento. Nunca interrompe a ação do usuário: falhas só aparecem no console.
   */
  async log(action, { module = null, trainingId = null, target = null, details = null } = {}) {
    const auth = CapacitaTE.auth;
    const client = CapacitaTE.supabaseClient && CapacitaTE.supabaseClient.get();
    if (!client || !auth || !auth.user) return;
    try {
      const { error } = await client.rpc('log_event', {
        p_action: action, p_module: module, p_training: trainingId, p_target: target, p_details: details
      });
      if (error) console.warn('Auditoria não registrada:', error.message);
    } catch (e) {
      console.warn('Auditoria não registrada:', e);
    }
  }
};
