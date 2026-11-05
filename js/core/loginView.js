/**
 * CapacitaTE - Tela de Login (card central, logos CECATE, e-mail + senha, esqueci minha senha)
 * Versão: v.4.4.3
 */

window.CapacitaTE = window.CapacitaTE || {};

(function () {
  const ICON = 'viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  let overlay = null;

  /**
   * Força da senha (0 a 4) com dicas do que falta. Mínimo aceito: 2 ("Razoável") e 8 caracteres.
   */
  function passwordStrength(p) {
    const tips = [];
    if (p.length < 8) tips.push('Use pelo menos 8 caracteres.');
    if (!(/[a-z]/.test(p) && /[A-Z]/.test(p))) tips.push('Misture letras maiúsculas e minúsculas.');
    if (!/\d/.test(p)) tips.push('Inclua números.');
    if (!/[^A-Za-z0-9]/.test(p)) tips.push('Inclua um símbolo (ex.: # ! @).');
    if (p.length < 12) tips.push('Para uma senha forte, use 12 caracteres ou mais.');
    let score = 0;
    if (p.length >= 8) {
      score = 1 + [/[a-z]/.test(p) && /[A-Z]/.test(p), /\d/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length;
      // "Forte" exige também 12 caracteres ou mais
      if (score === 4 && p.length < 12) score = 3;
      // Repetição de um só caractere ou senhas muito comuns
      if (/^(.)\1+$/.test(p) || /^(12345678|123456789|1234567890|password|senha123|senha1234|abcd1234|qwerty123)$/i.test(p)) score = 1;
    }
    return { score, label: ['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'][score], tips: score === 4 ? [] : tips };
  }

  function build() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.id = 'auth-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'auth-title');
    overlay.innerHTML = `
      <div class="auth-card glass-card">
        <div class="auth-brand">
          <img src="assets/CECATE_Centro-Oeste_Logo_Negativo_Horizontal_Completa-PNG.png" alt="Logo CECATE Centro-Oeste" class="brand-logo-img logo-dark">
          <img src="assets/CECATE_Centro-Oeste_Logo_Colorida_Horizontal_Completa-PNG.png" alt="Logo CECATE Centro-Oeste" class="brand-logo-img logo-light">
        </div>
        <h2 id="auth-title" class="auth-title">CapacitaTE</h2>
        <p class="auth-subtitle">Plataforma de Gestão de Capacitações em Transporte Escolar — CECATE Centro-Oeste</p>

        <form id="auth-login-form" class="auth-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="auth-email">E-mail</label>
            <input type="email" id="auth-email" class="form-control" autocomplete="username" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="auth-password">Senha</label>
            <input type="password" id="auth-password" class="form-control" autocomplete="current-password" required>
          </div>
          <button type="submit" class="btn btn-primary auth-submit" id="auth-submit-btn">
            <svg ${ICON}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            Entrar
          </button>
          <button type="button" class="auth-link" id="auth-forgot-btn">Esqueci minha senha</button>
        </form>

        <form id="auth-recovery-form" class="auth-form" style="display:none;" novalidate>
          <div class="form-group">
            <label class="form-label" for="auth-new-password">Nova senha</label>
            <input type="password" id="auth-new-password" class="form-control" autocomplete="new-password" minlength="8" required aria-describedby="auth-strength-text auth-strength-tips">
            <div class="pwd-strength" aria-hidden="true"><div class="pwd-strength-bar" id="auth-strength-bar"></div></div>
            <div class="pwd-strength-text" id="auth-strength-text" aria-live="polite"></div>
            <ul class="pwd-strength-tips" id="auth-strength-tips"></ul>
          </div>
          <div class="form-group">
            <label class="form-label" for="auth-new-password2">Confirme a nova senha</label>
            <input type="password" id="auth-new-password2" class="form-control" autocomplete="new-password" required aria-describedby="auth-match-text">
            <div class="pwd-strength-text" id="auth-match-text" aria-live="polite"></div>
          </div>
          <button type="submit" class="btn btn-primary auth-submit" id="auth-recovery-btn">Salvar senha</button>
        </form>

        <p class="auth-message" id="auth-message" role="status" aria-live="polite"></p>
      </div>`;
    document.body.appendChild(overlay);

    const msg = (text, type) => api.setMessage(text, type);
    overlay.querySelector('#auth-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = overlay.querySelector('#auth-email').value;
      const password = overlay.querySelector('#auth-password').value;
      if (!email || !password) return msg('Informe e-mail e senha.', 'error');
      const btn = overlay.querySelector('#auth-submit-btn');
      btn.disabled = true;
      msg('Entrando...', 'info');
      try {
        await CapacitaTE.auth.signIn(email, password);
      } catch (err) {
        msg(err.message || 'Não foi possível entrar.', 'error');
      } finally {
        btn.disabled = false;
      }
    });
    overlay.querySelector('#auth-forgot-btn').addEventListener('click', async () => {
      const email = overlay.querySelector('#auth-email').value;
      if (!email) return msg('Digite o seu e-mail acima e clique de novo em "Esqueci minha senha".', 'info');
      try {
        await CapacitaTE.auth.resetPassword(email);
        msg('Se o e-mail estiver cadastrado, você receberá um link para criar uma nova senha.', 'success');
      } catch (err) {
        msg(err.message, 'error');
      }
    });
    const pwd1 = overlay.querySelector('#auth-new-password');
    const pwd2 = overlay.querySelector('#auth-new-password2');
    const updateStrength = () => {
      const r = passwordStrength(pwd1.value);
      const bar = overlay.querySelector('#auth-strength-bar');
      bar.style.width = pwd1.value ? `${Math.max(1, r.score) * 25}%` : '0';
      bar.className = `pwd-strength-bar pwd-level-${r.score}`;
      overlay.querySelector('#auth-strength-text').textContent = pwd1.value ? `Força da senha: ${r.label}` : '';
      const tips = overlay.querySelector('#auth-strength-tips');
      tips.textContent = '';
      if (pwd1.value) r.tips.forEach(t => { const li = document.createElement('li'); li.textContent = t; tips.appendChild(li); });
      const match = overlay.querySelector('#auth-match-text');
      match.textContent = pwd2.value ? (pwd1.value === pwd2.value ? 'As senhas conferem.' : 'As senhas não são iguais.') : '';
      match.className = `pwd-strength-text ${pwd2.value && pwd1.value === pwd2.value ? 'pwd-ok' : 'pwd-bad'}`;
    };
    pwd1.addEventListener('input', updateStrength);
    pwd2.addEventListener('input', updateStrength);
    overlay.querySelector('#auth-recovery-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const r = passwordStrength(pwd1.value);
      if (r.score < 2) return msg('Escolha uma senha mais forte: ' + r.tips.join(' ').toLowerCase(), 'error');
      if (pwd1.value !== pwd2.value) return msg('As duas senhas não são iguais.', 'error');
      const btn = overlay.querySelector('#auth-recovery-btn');
      btn.disabled = true;
      try {
        await CapacitaTE.auth.updatePassword(pwd1.value);
        msg('Senha salva. Entrando...', 'success');
        setTimeout(() => window.location.reload(), 900);
      } catch (err) {
        btn.disabled = false;
        msg(/same|different/i.test(err.message) ? 'A nova senha precisa ser diferente da atual.' : err.message, 'error');
      }
    });
    return overlay;
  }

  const api = {
    show({ message = '' } = {}) {
      build();
      if (CapacitaTE.hideBoot) CapacitaTE.hideBoot();
      document.body.classList.add('auth-locked');
      overlay.classList.add('active');
      if (message) api.setMessage(message, 'info');
      setTimeout(() => overlay.querySelector('#auth-email').focus(), 50);
    },

    showRecovery(type = 'recovery') {
      api.show();
      overlay.querySelector('#auth-login-form').style.display = 'none';
      overlay.querySelector('#auth-recovery-form').style.display = 'block';
      overlay.querySelector('#auth-new-password').value = '';
      overlay.querySelector('#auth-new-password2').value = '';
      api.setMessage(type === 'invite' ? 'Bem-vindo(a) ao CapacitaTE! Crie a sua senha para concluir o cadastro.' : 'Defina a sua nova senha.', 'info');
    },

    hide() {
      document.body.classList.remove('auth-locked');
      if (overlay) overlay.classList.remove('active');
    },

    setMessage(text, type = 'info') {
      build();
      const el = overlay.querySelector('#auth-message');
      el.textContent = text || '';
      el.className = `auth-message auth-message-${type}`;
    }
  };

  api.passwordStrength = passwordStrength;
  CapacitaTE.loginView = api;

  /**
   * Esconde a tela de carregamento (chamado quando o login aparece ou quando o painel termina de montar)
   */
  CapacitaTE.hideBoot = () => {
    const boot = document.getElementById('app-boot');
    if (!boot || boot.classList.contains('hidden')) return;
    boot.classList.add('hidden');
    setTimeout(() => boot.remove(), 450);
  };
  // Segurança: nunca deixa a tela de carregamento presa
  setTimeout(() => CapacitaTE.hideBoot(), 20000);
})();
