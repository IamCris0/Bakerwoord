(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header compact-on-scroll ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-compact', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile hamburger ---------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---------- Category mega menu ---------- */
  const catToggle = document.getElementById('catToggle');
  const catPanel = document.getElementById('catPanel');
  const catBackdrop = document.getElementById('catBackdrop');

  function closeCatPanel() {
    catPanel.classList.remove('is-open');
    catBackdrop.classList.remove('is-open');
    catToggle.setAttribute('aria-expanded', 'false');
  }
  function openCatPanel() {
    catPanel.classList.add('is-open');
    catBackdrop.classList.add('is-open');
    catToggle.setAttribute('aria-expanded', 'true');
  }
  if (catToggle && catPanel && catBackdrop) {
    catToggle.addEventListener('click', () => {
      const isOpen = catPanel.classList.contains('is-open');
      isOpen ? closeCatPanel() : openCatPanel();
    });
    catBackdrop.addEventListener('click', closeCatPanel);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCatPanel();
    });
  }

  /* ---------- Hero carousel ---------- */
  const slider = document.getElementById('heroSlider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.hero__slide'));
    const dotsWrap = document.getElementById('heroDots');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let current = slides.findIndex(s => s.classList.contains('is-active'));
    if (current < 0) current = 0;
    let timer = null;
    const AUTOPLAY_MS = 6000;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero__dot' + (i === current ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }
    function goTo(i) {
      current = (i + slides.length) % slides.length;
      render();
      restartAutoplay();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function restartAutoplay() {
      if (prefersReducedMotion) return;
      clearInterval(timer);
      timer = setInterval(next, AUTOPLAY_MS);
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', restartAutoplay);

    /* touch swipe */
    let touchStartX = null;
    slider.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
      touchStartX = null;
    }, { passive: true });

    restartAutoplay();
  }

  /* ---------- Header action badges (demo interactivity) ---------- */
  function wireBadge(id) {
    const link = document.querySelector(`#${id}`)?.closest('a');
    const badge = document.getElementById(id);
    if (!link || !badge) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      badge.textContent = String(Number(badge.textContent) + 1);
      badge.classList.remove('is-bump');
      void badge.offsetWidth;
      badge.classList.add('is-bump');
    });
  }
  ['compareBadge', 'wishBadge', 'cartBadge'].forEach(wireBadge);
})();
