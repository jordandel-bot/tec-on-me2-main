/**
 * install.js — Gestion de l'installation PWA

*/ 
console.log('install.js chargé');
var deferredPrompt = null;
  const installBox     = document.querySelector('.box-install');
  const installBtn     = document.querySelector('.install-btn');
  const closeBtn       = document.querySelector('.box-install .close');

  // Masqué par défaut — affiché uniquement si le navigateur
  // signale que l'app est installable
  //if (installBox) installBox.classList.add('hidden');

  // ─── L'app est installable ──────────────────────────────────
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    show();
  });

  // ─── L'app vient d'être installée ──────────────────────────
  window.addEventListener('appinstalled', function () {
    hide();
    deferredPrompt = null;
  });

  // ─── Bouton Installer ───────────────────────────────────────
  if (installBtn) {
    installBtn.addEventListener('click', function () {
     
      if (!deferredPrompt) return;

      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(function (result) {
        if (result.outcome === 'accepted') hide();
        deferredPrompt = null;
      });
    });
  }

  // ─── Bouton Fermer (×) ──────────────────────────────────────
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      hide();
    });
  }

  // ─── Helpers ────────────────────────────────────────────────
  function show() {
    if (installBox) installBox.classList.remove('hidden');
  }

  function hide() {
    if (installBox) installBox.classList.add('hidden');
  }

