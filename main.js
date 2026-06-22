/**
 * Apex Fitness — main.js
 * ─────────────────────────────────────────────────────────────────
 * Modules
 *  1. Menu burger / drawer latéral mobile
 *  2. Effet navbar au scroll
 *  3. Formulaire de contact (confirmation visuelle)
 * ─────────────────────────────────────────────────────────────────
 */

'use strict';


/* ════════════════════════════════════════════════════════════
   1. ★ MENU BURGER / DRAWER LATÉRAL
   Stratégie :
   - Les éléments #navToggle, #navDrawer, #navOverlay,
     #drawerClose sont déjà présents dans le HTML.
   - Ce module gère uniquement les classes CSS :
       .is-open    (drawer + bouton burger)
       .is-visible (overlay)
   - Toutes les animations sont définies dans style.css.
════════════════════════════════════════════════════════════ */
function initMobileNav() {
  const toggle   = document.getElementById('navToggle');
  const drawer   = document.getElementById('navDrawer');
  const overlay  = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('drawerClose');

  if (!toggle || !drawer || !overlay) return;

  let isOpen = false;

  function openDrawer() {
    isOpen = true;
    drawer.classList.add('is-open');
    overlay.classList.add('is-visible');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';   /* bloque le scroll de fond */
  }

  function closeDrawer() {
    isOpen = false;
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* Ouverture / fermeture au clic sur le burger */
  toggle.addEventListener('click', () => isOpen ? closeDrawer() : openDrawer());

  /* Fermeture : bouton X, overlay, lien cliqué, touche Échap */
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeDrawer();
  });

  /* Fermeture automatique si on repasse en desktop */
  window.matchMedia('(min-width: 900px)').addEventListener('change', e => {
    if (e.matches && isOpen) closeDrawer();
  });
}


/* ════════════════════════════════════════════════════════════
   2. EFFET NAVBAR AU SCROLL
   Ajoute un fond plus opaque une fois la page défilée.
════════════════════════════════════════════════════════════ */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
}


/* ════════════════════════════════════════════════════════════
   3. FORMULAIRE DE CONTACT — confirmation visuelle (démo)
════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.contact__submit');
    const original = btn.textContent;

    btn.textContent = '✔ Demande envoyée !';
    btn.disabled = true;
    btn.style.opacity = '0.75';

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.opacity = '';
      this.reset();
    }, 3500);
  });
}


/* ════════════════════════════════════════════════════════════
   INIT — DOMContentLoaded
════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initNavbarScroll();
  initContactForm();
});
