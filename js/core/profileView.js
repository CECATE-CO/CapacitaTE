/**
 * CapacitaTE - Meu Perfil (o próprio usuário altera nome, e-mail e foto) e menu do usuário no menu lateral
 * Versão: v.4.4.0
 */

window.CapacitaTE = window.CapacitaTE || {};

(function () {
  const $ = (id) => document.getElementById(id);

  function setMessage(text, type = 'info') {
    const el = $('my-profile-msg');
    if (!el) return;
    el.textContent = text || '';
    el.className = `auth-message auth-message-${type}`;
    el.style.textAlign = 'left';
  }

  // Foto escolhida no modal: undefined = sem mudança, null = remover, string = nova foto (data URL)
  let pendingAvatar;

  const initialsOf = () => (document.getElementById('auth-user-initials') || {}).dataset?.initials || '';

  function showAvatarPreview() {
    const current = pendingAvatar === undefined ? (CapacitaTE.auth.profile && CapacitaTE.auth.profile.avatar) : pendingAvatar;
    CapacitaTE.renderAvatar($('my-profile-avatar'), current, initialsOf());
  }

  /**
   * Recorta a imagem no centro (quadrado) e reduz para 160x160 JPEG
   */
  function resizePhoto(file) {
    return new Promise((resolve, reject) => {
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return reject(new Error('Escolha uma imagem JPG, PNG ou WebP.'));
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 160;
        canvas.getContext('2d').drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, 160, 160);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Não foi possível ler a imagem.')); };
      img.src = url;
    });
  }

  const api = {
    open() {
      const auth = CapacitaTE.auth;
      if (!auth || auth.mode !== 'authenticated' || !auth.user) return;
      $('my-profile-name').value = (auth.profile && auth.profile.full_name) || '';
      $('my-profile-email').value = auth.user.email || '';
      setMessage('');
      pendingAvatar = undefined;
      showAvatarPreview();
      $('modal-my-profile').style.display = 'block';
      setTimeout(() => $('my-profile-name').focus(), 50);
    },

    close() {
      const modal = $('modal-my-profile');
      if (modal) modal.style.display = 'none';
    },

    async save() {
      const auth = CapacitaTE.auth;
      const client = CapacitaTE.supabaseClient.get();
      const name = $('my-profile-name').value.trim().replace(/\s+/g, ' ');
      const email = $('my-profile-email').value.trim().toLowerCase();
      const nameChanged = name !== ((auth.profile && auth.profile.full_name) || '');
      const avatarChanged = pendingAvatar !== undefined;
      const emailChanged = email !== (auth.user.email || '').toLowerCase();

      if (name.length < 3) return setMessage('Informe o nome completo.', 'error');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMessage('Informe um e-mail válido.', 'error');
      if (!nameChanged && !emailChanged && !avatarChanged) return api.close();

      const btn = $('my-profile-save');
      btn.disabled = true;
      setMessage('Salvando...');
      const done = [];
      try {
        if (nameChanged) {
          const { data, error } = await client.rpc('update_my_name', { p_full_name: name });
          if (error) throw new Error(/update_my_name/.test(error.message) ? 'A migração 0004b ainda não foi aplicada no Supabase.' : error.message);
          auth.profile.full_name = data || name;
          auth.renderUserChip();
          done.push('Nome atualizado.');
        }
        if (avatarChanged) {
          const { error } = await client.rpc('update_my_avatar', { p_avatar: pendingAvatar });
          if (error) throw new Error(/update_my_avatar/.test(error.message) ? 'A migração 0004b ainda não foi aplicada no Supabase.' : error.message);
          auth.profile.avatar = pendingAvatar;
          pendingAvatar = undefined;
          auth.renderUserChip();
          done.push('Foto atualizada.');
        }
        if (emailChanged) {
          const { error } = await client.auth.updateUser({ email }, { emailRedirectTo: window.location.href.split('#')[0] });
          if (error) throw new Error(/already/i.test(error.message) ? 'Este e-mail já está em uso por outra conta.' : error.message);
          done.push(`Enviamos um link de confirmação para ${email}. O e-mail só muda depois do clique no link (o Supabase também pode pedir a confirmação no e-mail atual).`);
        }
        setMessage(done.join(' '), 'success');
        if (!emailChanged) setTimeout(api.close, 900);
      } catch (err) {
        setMessage((done.length ? done.join(' ') + ' ' : '') + (err.message || 'Não foi possível salvar.'), 'error');
      } finally {
        btn.disabled = false;
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const form = $('form-my-profile');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); api.save(); });
    const photoInput = $('my-profile-photo-input');
    if (photoInput) photoInput.addEventListener('change', async () => {
      const file = photoInput.files && photoInput.files[0];
      photoInput.value = '';
      if (!file) return;
      try {
        pendingAvatar = await resizePhoto(file);
        showAvatarPreview();
        setMessage('Foto pronta. Clique em Salvar para confirmar.');
      } catch (err) {
        setMessage(err.message, 'error');
      }
    });
    const removeBtn = $('my-profile-photo-remove');
    if (removeBtn) removeBtn.addEventListener('click', () => {
      pendingAvatar = null;
      showAvatarPreview();
      setMessage('A foto será removida ao salvar.');
    });

    // Menu do usuário: abre ao clicar no cartão; fecha ao clicar fora ou com Esc
    const toggle = $('auth-user-toggle');
    if (toggle) toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if ($('auth-user-menu').hidden) userMenu.open(); else userMenu.close();
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#auth-user-chip')) userMenu.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if ($('modal-my-profile') && $('modal-my-profile').style.display === 'block') api.close();
      if ($('auth-user-menu') && !$('auth-user-menu').hidden) { userMenu.close(); $('auth-user-toggle').focus(); }
    });
  });

  const userMenu = {
    open() {
      $('auth-user-menu').hidden = false;
      $('auth-user-toggle').setAttribute('aria-expanded', 'true');
      const first = $('auth-user-menu').querySelector('[role="menuitem"]');
      if (first) first.focus();
    },
    close() {
      const menu = $('auth-user-menu');
      if (!menu || menu.hidden) return;
      menu.hidden = true;
      $('auth-user-toggle').setAttribute('aria-expanded', 'false');
    }
  };

  CapacitaTE.profileView = api;
  CapacitaTE.userMenu = userMenu;
})();
