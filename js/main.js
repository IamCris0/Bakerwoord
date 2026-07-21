(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Sticky header compact-on-scroll ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => header.classList.toggle('is-compact', window.scrollY > 40);
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

  /* ---------- Dropdown / mega menu (click-to-toggle for touch + keyboard) ---------- */
  const navItems = document.querySelectorAll('.main-nav__item[data-has-panel]');
  navItems.forEach((item) => {
    const trigger = item.querySelector(':scope > .main-nav__link');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('is-open');
      navItems.forEach(i => i.classList.remove('is-open'));
      item.classList.toggle('is-open', !isOpen);
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav__item[data-has-panel]')) {
      navItems.forEach(i => i.classList.remove('is-open'));
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') navItems.forEach(i => i.classList.remove('is-open'));
  });

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
    const AUTOPLAY_MS = 6500;

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
    function goTo(i) { current = (i + slides.length) % slides.length; render(); restartAutoplay(); }
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

  /* ---------- Product filter chips ---------- */
  const filterBar = document.getElementById('productFilters');
  if (filterBar) {
    const chips = Array.from(filterBar.querySelectorAll('.filter-chip'));
    const cards = Array.from(document.querySelectorAll('.product-card'));
    function applyFilter(cat, chip) {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      cards.forEach(card => {
        const show = cat === 'todos' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
      });
    }
    chips.forEach(chip => {
      chip.addEventListener('click', () => applyFilter(chip.dataset.filter, chip));
    });
    const hash = window.location.hash.replace('#', '');
    const hashChip = hash && filterBar.querySelector(`[data-filter="${hash}"]`);
    if (hashChip) {
      applyFilter(hash, hashChip);
      setTimeout(() => document.getElementById('productGrid')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' }), 100);
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.accordion__item').forEach((item) => {
    const q = item.querySelector('.accordion__q');
    const a = item.querySelector('.accordion__a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.accordion__a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form (client-side demo, no backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBox = document.getElementById('formSuccess');
      if (successBox) {
        successBox.classList.add('is-visible');
        successBox.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }
})();
