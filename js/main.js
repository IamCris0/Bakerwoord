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

  /* ---------- Header search (sugerencias en vivo + envío real) ---------- */
  const searchForm = document.getElementById('searchForm');
  if (searchForm && window.CATALOG) {
    const CATALOG = window.CATALOG;
    const searchInput = document.getElementById('searchInput');
    const groupSelect = document.getElementById('searchGroup');
    const results = document.createElement('div');
    results.className = 'search__results';
    searchForm.appendChild(results);

    const ACCENTS = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u', 'ñ': 'n' };
    const normalize = (s) => s.toLowerCase().replace(/[áéíóúüñ]/g, (ch) => ACCENTS[ch]);

    function matchCategories(query, groupId) {
      const q = normalize(query.trim());
      if (!q) return [];
      return Object.entries(CATALOG.categories)
        .filter(([, c]) => (!groupId || c.group === groupId) && normalize(c.title).includes(q))
        .slice(0, 6)
        .map(([slug, c]) => ({ slug, ...c }));
    }

    let activeIndex = -1;

    function renderResults() {
      const query = searchInput.value;
      activeIndex = -1;
      if (!query.trim()) { results.classList.remove('is-open'); results.innerHTML = ''; return; }
      const matches = matchCategories(query, groupSelect.value);
      const moreLink = '<a href="productos.html" class="search__more">Ver catálogo completo →</a>';
      results.innerHTML = matches.length
        ? matches.map((c) => `
          <a href="categoria.html?cat=${c.slug}" class="search__result">
            <img src="${c.dir}/1.jpg" alt="" loading="lazy">
            <div><strong>${c.title}</strong><span>${(CATALOG.groups.find(g => g.id === c.group) || {}).title || ''}</span></div>
          </a>`).join('') + moreLink
        : `<div class="search__empty">Sin resultados para "${query.replace(/[<>]/g, '')}".</div>` + moreLink;
      results.classList.add('is-open');
    }

    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(renderResults, 120);
    });
    searchInput.addEventListener('focus', () => { if (searchInput.value.trim()) renderResults(); });
    groupSelect.addEventListener('change', () => { if (searchInput.value.trim()) renderResults(); });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search')) results.classList.remove('is-open');
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { results.classList.remove('is-open'); return; }
      const items = Array.from(results.querySelectorAll('.search__result'));
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle('is-active', i === activeIndex));
        items[activeIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        items.forEach((el, i) => el.classList.toggle('is-active', i === activeIndex));
        items[activeIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        window.location.href = items[activeIndex].href;
      }
    });

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const groupId = groupSelect.value;
      const matches = matchCategories(searchInput.value, groupId);
      if (matches.length) window.location.href = 'categoria.html?cat=' + matches[0].slug;
      else if (groupId) window.location.href = 'productos.html#grupo-' + groupId;
      else window.location.href = 'productos.html';
    });
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
  const setNavExpanded = (item, isOpen) => {
    item.classList.toggle('is-open', isOpen);
    const trigger = item.querySelector(':scope > .main-nav__link');
    if (trigger) trigger.setAttribute('aria-expanded', String(isOpen));
  };
  navItems.forEach((item) => {
    const trigger = item.querySelector(':scope > .main-nav__link');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('is-open');
      navItems.forEach(i => setNavExpanded(i, false));
      setNavExpanded(item, !isOpen);
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav__item[data-has-panel]')) {
      navItems.forEach(i => setNavExpanded(i, false));
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') navItems.forEach(i => setNavExpanded(i, false));
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

  /* ---------- Catalog: hub page (productos.html) ---------- */
  const CAT = window.CATALOG;
  const hubRoot = document.getElementById('hubRoot');
  if (hubRoot && CAT) {
    const filters = document.getElementById('hubFilters');
    CAT.groups.forEach((group, gi) => {
      const cats = Object.entries(CAT.categories).filter(([, c]) => c.group === group.id);
      if (!cats.length) return;

      const chip = document.createElement('a');
      chip.className = 'filter-chip' + (gi === 0 ? '' : '');
      chip.href = '#grupo-' + group.id;
      chip.textContent = group.title;
      filters.appendChild(chip);

      const section = document.createElement('div');
      section.className = 'hub-group';
      section.id = 'grupo-' + group.id;
      const totalFotos = cats.reduce((sum, [, c]) => sum + (c.count || (c.files || []).length), 0);
      section.innerHTML = `
        <div class="divider divider--left"><span class="divider__gem"></span><span class="divider__line divider__line--r"></span></div>
        <div class="hub-group__head"><h2>${group.title}</h2><span>${cats.length} categorías · ${totalFotos} fotos</span></div>`;
      const grid = document.createElement('div');
      grid.className = 'product-grid';
      cats.forEach(([slug, c]) => {
        const card = document.createElement('a');
        card.className = 'product-card';
        card.href = 'categoria.html?cat=' + slug;
        card.innerHTML = `
          <div class="product-card__img" style="background-image:url('${c.dir}/1.jpg')"></div>
          <div class="product-card__body">
            <span class="product-card__cat">${group.title}</span>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <span class="product-card__cta">Ver ${c.count || (c.files || []).length} modelos <svg class="icon icon--xs"><use href="#icon-arrow-right"/></svg></span>
          </div>`;
        grid.appendChild(card);
      });
      section.appendChild(grid);
      hubRoot.appendChild(section);
    });
  }

  /* ---------- Catalog: category page (categoria.html) ---------- */
  const catGrid = document.getElementById('catGrid');
  if (catGrid && CAT) {
    const slug = new URLSearchParams(window.location.search).get('cat');
    const cat = slug && CAT.categories[slug];
    const titleEl = document.getElementById('catTitle');
    if (!cat) {
      titleEl.textContent = 'Categoría no encontrada';
      document.getElementById('catDesc').innerHTML =
        'La categoría solicitada no existe. <a href="productos.html" style="color:var(--color-wine);font-weight:700">Ver el catálogo completo →</a>';
    } else {
      document.title = cat.title + ' — El Palacio del Amor';
      titleEl.textContent = cat.title;
      document.getElementById('catCrumb').textContent = cat.title;
      document.getElementById('catDesc').textContent = cat.desc + ' Toca una foto para verla en grande; precios y disponibilidad por WhatsApp o en nuestras sucursales.';

      /* SEO: canonical + Open Graph / Twitter reflect the specific category */
      const pageUrl = 'https://www.elpalaciodelamorjoyeria.com/categoria.html?cat=' + slug;
      const pageImg = 'https://www.elpalaciodelamorjoyeria.com/' + cat.dir + '/1.jpg';
      const setMeta = (selector, attr, value) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      };
      setMeta('link[rel="canonical"]', 'href', pageUrl);
      setMeta('meta[name="description"]', 'content', cat.desc);
      setMeta('meta[property="og:title"]', 'content', document.title);
      setMeta('meta[property="og:description"]', 'content', cat.desc);
      setMeta('meta[property="og:url"]', 'content', pageUrl);
      setMeta('meta[property="og:image"]', 'content', pageImg);
      setMeta('meta[name="twitter:title"]', 'content', document.title);
      setMeta('meta[name="twitter:description"]', 'content', cat.desc);
      setMeta('meta[name="twitter:image"]', 'content', pageImg);

      const waText = encodeURIComponent('Hola, vi la sección "' + cat.title + '" en su página web y quiero más información.');
      document.getElementById('catWhatsBtn').href = CAT.whatsapp + '&text=' + waText;

      const files = cat.files || Array.from({ length: cat.count }, (_, i) => (i + 1) + '.jpg');
      const total = files.length;
      const photos = [];
      files.forEach((file, i) => {
        const src = cat.dir + '/' + file;
        const alt = total > 1 ? `${cat.title} — foto ${i + 1} de ${total}` : cat.title;
        photos.push({ src, alt });

        const card = document.createElement('a');
        card.className = 'photo-card';
        card.href = src;
        card.rel = 'noopener';
        card.innerHTML = `
          <img src="${src}" alt="${alt}" loading="lazy">
          <span class="photo-card__foot">Vista rápida <svg class="icon icon--xs"><use href="#icon-arrow-right"/></svg></span>`;
        const imgEl = card.querySelector('img');
        imgEl.addEventListener('error', () => card.remove());
        card.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(i);
        });
        catGrid.appendChild(card);
      });

      /* ---------- Lightbox: vista rápida con descripción y WhatsApp ---------- */
      const lightbox = document.getElementById('photoLightbox');
      let lightboxIndex = 0;
      let lightboxTrigger = null;

      const renderLightbox = () => {
        const photo = photos[lightboxIndex];
        if (!photo) return;
        document.getElementById('lightboxImg').src = photo.src;
        document.getElementById('lightboxImg').alt = photo.alt;
        document.getElementById('lightboxTitle').textContent = cat.title;
        document.getElementById('lightboxDesc').textContent = cat.desc;
        document.getElementById('lightboxCount').textContent = total > 1 ? `Foto ${lightboxIndex + 1} de ${total}` : cat.title;
        const waText = encodeURIComponent(`Hola, vi la foto ${lightboxIndex + 1} de "${cat.title}" en su página web y quiero más información.`);
        document.getElementById('lightboxWhatsApp').href = CAT.whatsapp + '&text=' + waText;
        document.getElementById('lightboxPrev').disabled = lightboxIndex === 0;
        document.getElementById('lightboxNext').disabled = lightboxIndex === total - 1;
      };

      function openLightbox(index) {
        lightboxIndex = index;
        lightboxTrigger = document.activeElement;
        renderLightbox();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.getElementById('lightboxClose').focus();
      }
      function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lightboxTrigger) lightboxTrigger.focus();
      }
      const showPrev = () => { if (lightboxIndex > 0) { lightboxIndex--; renderLightbox(); } };
      const showNext = () => { if (lightboxIndex < total - 1) { lightboxIndex++; renderLightbox(); } };

      lightbox.querySelectorAll('[data-lightbox-close]').forEach(el => el.addEventListener('click', closeLightbox));
      document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
      document.getElementById('lightboxPrev').addEventListener('click', showPrev);
      document.getElementById('lightboxNext').addEventListener('click', showNext);
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') { closeLightbox(); return; }
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Tab') {
          const focusables = Array.from(lightbox.querySelectorAll('button:not(:disabled), a[href]'));
          if (!focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });

      /* Sidebar: other categories in the same group */
      const sideList = document.getElementById('catSideList');
      const group = CAT.groups.find(g => g.id === cat.group);
      if (group) {
        document.getElementById('catSideTitle').textContent = group.title;
        Object.entries(CAT.categories)
          .filter(([, c]) => c.group === cat.group)
          .forEach(([s, c]) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="categoria.html?cat=${s}"${s === slug ? ' style="color:var(--color-gold-dark)"' : ''}>${c.title} <svg class="icon icon--xs"><use href="#icon-chevron-right"/></svg></a>`;
            sideList.appendChild(li);
          });
      } else {
        document.getElementById('catSideTitle').textContent = 'Explora el catálogo';
        CAT.groups.forEach((g) => {
          const first = Object.entries(CAT.categories).find(([, c]) => c.group === g.id);
          if (!first) return;
          const li = document.createElement('li');
          li.innerHTML = `<a href="productos.html#grupo-${g.id}">${g.title} <svg class="icon icon--xs"><use href="#icon-chevron-right"/></svg></a>`;
          sideList.appendChild(li);
        });
      }
    }
  }

  /* ---------- Contact form: builds a WhatsApp message from the fields (no backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = contactForm.nombre.value.trim();
      const telefono = contactForm.telefono.value.trim();
      const correo = contactForm.correo.value.trim();
      const sucursal = contactForm.sucursal.value;
      const mensaje = contactForm.mensaje.value.trim();
      const texto = `Hola, soy ${nombre}. Quisiera hacer una consulta:\n\n${mensaje}\n\nTeléfono: ${telefono}\nCorreo: ${correo}\nSucursal de preferencia: ${sucursal}`;
      const waUrl = `${CAT.whatsapp}&text=${encodeURIComponent(texto)}`;
      window.open(waUrl, '_blank', 'noopener');

      const successBox = document.getElementById('formSuccess');
      if (successBox) {
        successBox.classList.add('is-visible');
        successBox.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }
})();
