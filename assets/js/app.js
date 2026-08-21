/* =============================================================================
   Creatividad Láser — comportamiento común a todas las páginas
   Sin dependencias. Cada módulo se activa sólo si su marcado existe.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var BASE = document.body.getAttribute('data-base') || '';
  var META = window.CATALOGO_META || { whatsapp: '593989926138' };
  var CAT = window.CATALOGO || [];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- utilidades */
  function wa(texto) {
    return 'https://wa.me/' + META.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function normaliza(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  var toastBox = $('#toasts');
  function toast(mensaje, icono) {
    if (!toastBox) return;
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<i class="fa-solid fa-' + (icono || 'circle-check') + '"></i><span>' + esc(mensaje) + '</span>';
    toastBox.appendChild(t);
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 320);
    }, 2600);
  }
  window.laserToast = toast;

  function bloquear(si) {
    document.body.classList.toggle('no-scroll', !!si);
  }

  /* ------------------------------------------------------ cabecera pegada */
  var hdr = $('#hdr');
  if (hdr) {
    var marcarScroll = function () {
      hdr.classList.toggle('stuck', window.scrollY > 8);
    };
    marcarScroll();
    window.addEventListener('scroll', marcarScroll, { passive: true });
  }

  /* --------------------------------------------------------------- avisos */
  var ticker = $('#ticker');
  if (ticker) {
    var msgs = $$('.ticker__msg', ticker);
    if (msgs.length > 1) {
      var iMsg = 0;
      setInterval(function () {
        msgs[iMsg].classList.remove('on');
        iMsg = (iMsg + 1) % msgs.length;
        msgs[iMsg].classList.add('on');
      }, 5200);
    }
  }

  /* ------------------------------------------------------------ mega menú */
  (function () {
    var items = $$('[data-mega]');
    if (!items.length) return;
    var abierto = null;
    var timer;

    function cerrar(item) {
      item.classList.remove('open');
      var a = $('.nav__link', item);
      if (a) a.setAttribute('aria-expanded', 'false');
      if (abierto === item) abierto = null;
    }

    function abrir(item) {
      if (abierto && abierto !== item) cerrar(abierto);
      item.classList.add('open');
      var a = $('.nav__link', item);
      if (a) a.setAttribute('aria-expanded', 'true');
      abierto = item;
    }

    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        clearTimeout(timer);
        abrir(item);
      });
      item.addEventListener('mouseleave', function () {
        timer = setTimeout(function () { cerrar(item); }, 180);
      });
      /* En pantallas táctiles el primer toque abre el panel en vez de navegar */
      var enlace = $('.nav__link', item);
      if (enlace) {
        enlace.addEventListener('click', function (e) {
          if (window.matchMedia('(hover: none)').matches && !item.classList.contains('open')) {
            e.preventDefault();
            abrir(item);
          }
        });
      }
      item.addEventListener('focusin', function () { abrir(item); });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) cerrar(item);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && abierto) cerrar(abierto);
    });
  })();

  /* ---------------------------------------------------------- menú móvil */
  (function () {
    var drawer = $('#drawer');
    var scrim = $('#scrim');
    var abrirBtn = $('#openDrawer');
    var cerrarBtn = $('#closeDrawer');
    if (!drawer || !scrim) return;

    function abrir() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      scrim.classList.add('on');
      if (abrirBtn) abrirBtn.setAttribute('aria-expanded', 'true');
      bloquear(true);
    }

    function cerrar() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      var wish = $('#wish');
      var filtros = $('#filters');
      var otroAbierto = (wish && wish.classList.contains('open')) || (filtros && filtros.classList.contains('open'));
      if (!otroAbierto) {
        scrim.classList.remove('on');
        bloquear(false);
      }
      if (abrirBtn) abrirBtn.setAttribute('aria-expanded', 'false');
    }

    if (abrirBtn) abrirBtn.addEventListener('click', abrir);
    if (cerrarBtn) cerrarBtn.addEventListener('click', cerrar);
    scrim.addEventListener('click', function () {
      cerrar();
      cerrarWish();
      var filtros = $('#filters');
      if (filtros) filtros.classList.remove('open');
      scrim.classList.remove('on');
      bloquear(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrar();
    });

    $$('.acc > button.acc__head').forEach(function (b) {
      b.addEventListener('click', function () {
        var acc = b.parentElement;
        var abierta = acc.classList.toggle('open');
        b.setAttribute('aria-expanded', abierta ? 'true' : 'false');
      });
    });
  })();

  /* --------------------------------------------------------------- FAQ */
  $$('.faq__q').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.closest('.faq__item');
      var abierta = item.classList.toggle('open');
      b.setAttribute('aria-expanded', abierta ? 'true' : 'false');
    });
  });

  /* ------------------------------------------------------------ revelado */
  (function () {
    var objetivos = $$('[data-reveal]');
    if (!objetivos.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      objetivos.forEach(function (el) { el.classList.add('seen'); });
      return;
    }
    var io = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('seen');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    objetivos.forEach(function (el) { io.observe(el); });
  })();

  /* ----------------------------------------------------- carruseles rail */
  $$('[data-rail]').forEach(function (rail) {
    var track = $('[data-rail-track]', rail);
    var prev = $('[data-rail-prev]', rail);
    var next = $('[data-rail-next]', rail);
    if (!track) return;

    function paso() {
      var primera = track.firstElementChild;
      return primera ? primera.getBoundingClientRect().width + 20 : 300;
    }

    function estado() {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft < 6;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 6;
    }

    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -paso(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: paso(), behavior: 'smooth' }); });
    track.addEventListener('scroll', estado, { passive: true });
    window.addEventListener('resize', estado);
    estado();
  });

  /* ------------------------------------------------------------- hero */
  (function () {
    var hero = $('#hero');
    if (!hero) return;
    var slides = $$('.hero__slide', hero);
    var chips = $$('[data-hero-go]', hero);
    if (slides.length < 2) return;

    var i = 0;
    var DUR = 7000;
    var timer = null;
    hero.style.setProperty('--hero-dur', DUR + 'ms');

    function ir(n) {
      n = (n + slides.length) % slides.length;
      if (n === i) return;
      slides[i].classList.remove('on');
      slides[i].setAttribute('aria-hidden', 'true');
      chips[i].classList.remove('on');
      chips[i].setAttribute('aria-selected', 'false');
      i = n;
      slides[i].classList.add('on');
      slides[i].setAttribute('aria-hidden', 'false');
      chips[i].classList.add('on');
      chips[i].setAttribute('aria-selected', 'true');
      reiniciar();
    }

    function reiniciar() {
      if (reduce) return;
      clearInterval(timer);
      /* Reinicia la animación de la barra de la ficha activa */
      var barra = chips[i];
      barra.classList.remove('on');
      void barra.offsetWidth;
      barra.classList.add('on');
      timer = setInterval(function () { ir(i + 1); }, DUR);
    }

    chips.forEach(function (c, n) { c.addEventListener('click', function () { ir(n); }); });
    var prev = $('[data-hero-prev]', hero);
    var next = $('[data-hero-next]', hero);
    if (prev) prev.addEventListener('click', function () { ir(i - 1); });
    if (next) next.addEventListener('click', function () { ir(i + 1); });

    hero.addEventListener('mouseenter', function () {
      hero.classList.add('paused');
      clearInterval(timer);
    });
    hero.addEventListener('mouseleave', function () {
      hero.classList.remove('paused');
      if (!reduce) timer = setInterval(function () { ir(i + 1); }, DUR);
    });

    /* Deslizar con el dedo */
    var x0 = null;
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) ir(dx < 0 ? i + 1 : i - 1);
      x0 = null;
    }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer);
      else reiniciar();
    });

    if (!reduce) timer = setInterval(function () { ir(i + 1); }, DUR);
  })();

  /* --------------------------------------------------------- visor de fotos */
  var lb = {
    caja: $('#lightbox'),
    img: $('#lightboxImg'),
    cuenta: $('#lightboxCount'),
    lista: [],
    i: 0,
  };

  function abrirLightbox(lista, indice) {
    if (!lb.caja) return;
    lb.lista = lista;
    lb.i = indice || 0;
    pintarLightbox();
    lb.caja.classList.add('on');
    bloquear(true);
  }

  function pintarLightbox() {
    lb.img.src = lb.lista[lb.i];
    lb.img.alt = 'Imagen ' + (lb.i + 1) + ' de ' + lb.lista.length;
    if (lb.cuenta) lb.cuenta.textContent = lb.i + 1 + ' / ' + lb.lista.length;
    var mostrarNav = lb.lista.length > 1;
    $$('.lightbox__nav').forEach(function (b) { b.style.display = mostrarNav ? 'grid' : 'none'; });
  }

  function cerrarLightbox() {
    if (!lb.caja) return;
    lb.caja.classList.remove('on');
    bloquear(false);
  }

  window.laserLightbox = abrirLightbox;

  if (lb.caja) {
    $$('[data-lb-close]').forEach(function (b) { b.addEventListener('click', cerrarLightbox); });
    $('[data-lb-prev]').addEventListener('click', function () {
      lb.i = (lb.i - 1 + lb.lista.length) % lb.lista.length;
      pintarLightbox();
    });
    $('[data-lb-next]').addEventListener('click', function () {
      lb.i = (lb.i + 1) % lb.lista.length;
      pintarLightbox();
    });
    lb.caja.addEventListener('click', function (e) {
      if (e.target === lb.caja) cerrarLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.caja.classList.contains('on')) return;
      if (e.key === 'Escape') cerrarLightbox();
      if (e.key === 'ArrowLeft') $('[data-lb-prev]').click();
      if (e.key === 'ArrowRight') $('[data-lb-next]').click();
    });
  }

  $$('[data-lightbox-group]').forEach(function (grupo) {
    var enlaces = $$('[data-lb]', grupo);
    var srcs = enlaces.map(function (a) { return a.getAttribute('href'); });
    enlaces.forEach(function (a, n) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        abrirLightbox(srcs, n);
      });
    });
  });

  /* ------------------------------------------------------ lista de deseos */
  var LLAVE = 'cl.lista';

  function leerLista() {
    try {
      return JSON.parse(localStorage.getItem(LLAVE)) || [];
    } catch (e) {
      return [];
    }
  }

  function guardarLista(ids) {
    try { localStorage.setItem(LLAVE, JSON.stringify(ids)); } catch (e) { /* modo privado */ }
    pintarContador();
    pintarLista();
    marcarBotones();
  }

  function pintarContador() {
    var n = leerLista().length;
    var c = $('#wishCount');
    if (!c) return;
    c.textContent = n;
    c.classList.toggle('on', n > 0);
  }

  function marcarBotones() {
    var ids = leerLista();
    $$('[data-fav]').forEach(function (b) {
      var dentro = ids.indexOf(b.getAttribute('data-fav')) > -1;
      b.classList.toggle('on', dentro);
      var i = $('i', b);
      if (i) i.className = dentro ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      if (b.classList.contains('btn')) {
        var txt = b.childNodes[b.childNodes.length - 1];
        if (txt && txt.nodeType === 3) txt.nodeValue = dentro ? ' Guardado' : ' Guardar';
      }
    });
  }

  function alternarFavorito(id) {
    var ids = leerLista();
    var n = ids.indexOf(id);
    if (n > -1) {
      ids.splice(n, 1);
      toast('Quitado de tu lista', 'heart-crack');
    } else {
      ids.push(id);
      toast('Guardado en tu lista', 'heart');
    }
    guardarLista(ids);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fav]');
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    alternarFavorito(b.getAttribute('data-fav'));
  });

  function producto(id) {
    for (var i = 0; i < CAT.length; i++) if (CAT[i].id === id) return CAT[i];
    return null;
  }

  function pintarLista() {
    var cuerpo = $('#wishBody');
    var resumen = $('#wishSummary');
    if (!cuerpo) return;
    var ids = leerLista();

    if (resumen) resumen.textContent = ids.length + (ids.length === 1 ? ' pieza guardada' : ' piezas guardadas');

    if (!ids.length) {
      cuerpo.innerHTML =
        '<div class="wish__empty"><i class="fa-regular fa-heart"></i>' +
        '<p>Todavía no guardaste nada.<br>Tocá el corazón de cualquier producto para armar tu lista y pedir una cotización de todo junto.</p></div>';
      return;
    }

    cuerpo.innerHTML = ids
      .map(function (id) {
        var p = producto(id);
        if (!p) return '';
        return (
          '<div class="wish__item">' +
          '<img src="' + BASE + p.i + '" alt="" loading="lazy">' +
          '<div><strong>' + esc(p.n) + '</strong><span>' + esc(p.t) + '</span></div>' +
          '<button class="wish__rm" data-wish-rm="' + p.id + '" aria-label="Quitar"><i class="fa-solid fa-xmark"></i></button>' +
          '</div>'
        );
      })
      .join('');

    $$('[data-wish-rm]', cuerpo).forEach(function (b) {
      b.addEventListener('click', function () {
        var ids2 = leerLista().filter(function (x) { return x !== b.getAttribute('data-wish-rm'); });
        guardarLista(ids2);
      });
    });
  }

  function cerrarWish() {
    var w = $('#wish');
    if (w) {
      w.classList.remove('open');
      w.setAttribute('aria-hidden', 'true');
    }
  }

  (function () {
    var wish = $('#wish');
    var scrim = $('#scrim');
    if (!wish) return;

    var abrir = $('#openWish');
    if (abrir) {
      abrir.addEventListener('click', function () {
        wish.classList.add('open');
        wish.setAttribute('aria-hidden', 'false');
        if (scrim) scrim.classList.add('on');
        bloquear(true);
        pintarLista();
      });
    }

    var cerrar = $('#closeWish');
    if (cerrar) {
      cerrar.addEventListener('click', function () {
        cerrarWish();
        if (scrim) scrim.classList.remove('on');
        bloquear(false);
      });
    }

    var vaciar = $('#wishClear');
    if (vaciar) {
      vaciar.addEventListener('click', function () {
        guardarLista([]);
        toast('Lista vacía', 'trash');
      });
    }

    var enviar = $('#wishSend');
    if (enviar) {
      enviar.addEventListener('click', function () {
        var ids = leerLista();
        if (!ids.length) {
          toast('Guardá al menos una pieza primero', 'circle-info');
          return;
        }
        var lineas = ids
          .map(function (id, n) {
            var p = producto(id);
            return p ? n + 1 + '. ' + p.n : '';
          })
          .filter(Boolean);
        var texto =
          'Hola, quisiera cotizar estas piezas:\n\n' +
          lineas.join('\n') +
          '\n\n¿Me pueden pasar precio y tiempo de entrega? Gracias.';
        window.open(wa(texto), '_blank', 'noopener');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && wish.classList.contains('open')) {
        cerrarWish();
        if (scrim) scrim.classList.remove('on');
        bloquear(false);
      }
    });
  })();

  pintarContador();
  marcarBotones();

  /* El catálogo repinta sus tarjetas al filtrar: hay que volver a marcar
     los corazones de las piezas ya guardadas. */
  document.addEventListener('catalogo:pintado', marcarBotones);

  /* ------------------------------------------------------------- buscador */
  (function () {
    var caja = $('#finder');
    var input = $('#finderInput');
    var salida = $('#finderOut');
    if (!caja || !input) return;

    var sugeridos = CAT.filter(function (p) { return p.d; }).slice(0, 5);

    function abrir() {
      caja.classList.add('on');
      bloquear(true);
      setTimeout(function () { input.focus(); }, 60);
      if (!input.value) pintar('');
    }

    function cerrar() {
      caja.classList.remove('on');
      bloquear(false);
    }

    function resaltar(texto, q) {
      if (!q) return esc(texto);
      var i = normaliza(texto).indexOf(q);
      if (i < 0) return esc(texto);
      return esc(texto.slice(0, i)) + '<mark>' + esc(texto.slice(i, i + q.length)) + '</mark>' + esc(texto.slice(i + q.length));
    }

    function pintar(consulta) {
      var q = normaliza(consulta).trim();

      if (!q) {
        salida.innerHTML =
          '<p class="finder__group">Sugerencias</p>' +
          sugeridos.map(function (p) { return fila(p, ''); }).join('') +
          '<p class="finder__hint">Escribí lo que buscás: «lámpara», «girasol», «bautizo», «cuero»…</p>';
        return;
      }

      var hits = CAT.filter(function (p) {
        return normaliza(p.n + ' ' + p.r + ' ' + p.m + ' ' + p.o.join(' ') + ' ' + p.s).indexOf(q) > -1;
      }).slice(0, 8);

      if (!hits.length) {
        salida.innerHTML =
          '<div class="finder__hint">' +
          '<p>No encontramos nada con «' + esc(consulta) + '».</p>' +
          '<p style="margin-top:.8rem"><a class="btn btn--wa btn--sm" href="' +
          wa('Hola, busco algo que no encontré en la web: ' + consulta) +
          '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Preguntar por WhatsApp</a></p>' +
          '</div>';
        return;
      }

      salida.innerHTML =
        '<p class="finder__group">' + hits.length + (hits.length === 1 ? ' resultado' : ' resultados') + '</p>' +
        hits.map(function (p) { return fila(p, q); }).join('');
    }

    function fila(p, q) {
      return (
        '<a class="finder__hit" href="' + BASE + p.u + '">' +
        '<img src="' + BASE + p.i + '" alt="" loading="lazy">' +
        '<span><strong>' + resaltar(p.n, q) + '</strong><span>' + esc(p.m) + '</span></span>' +
        '</a>'
      );
    }

    var abrirBtn = $('#openFinder');
    if (abrirBtn) abrirBtn.addEventListener('click', abrir);

    input.addEventListener('input', function () { pintar(input.value); });

    caja.addEventListener('click', function (e) { if (e.target === caja) cerrar(); });

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        caja.classList.contains('on') ? cerrar() : abrir();
      }
      if (e.key === 'Escape' && caja.classList.contains('on')) cerrar();
    });
  })();

  /* ---------------------------------------------------------- vista rápida */
  (function () {
    var modal = $('#quickView');
    var cuerpo = $('#quickViewBody');
    if (!modal || !cuerpo) return;

    function abrir(id) {
      var p = producto(id);
      if (!p) return;
      var guardado = leerLista().indexOf(id) > -1;

      cuerpo.innerHTML =
        '<div class="qv">' +
        '<div class="qv__media"><img src="' + BASE + p.i + '" alt="' + esc(p.n) + '"></div>' +
        '<div class="qv__body">' +
        '<span class="card__cat">' + esc(nombreCategoria(p.c)) + '</span>' +
        '<h2>' + esc(p.n) + '</h2>' +
        '<p>' + esc(p.r) + '</p>' +
        '<dl class="qv__quick">' +
        '<div><dt>Material</dt><dd>' + esc(p.m) + '</dd></div>' +
        '<div><dt>Producción</dt><dd>' + esc(p.t) + '</dd></div>' +
        '<div><dt>Envío</dt><dd>A todo Ecuador</dd></div>' +
        '</dl>' +
        '<div class="qv__actions">' +
        '<a class="btn btn--amber btn--block" href="' + BASE + p.u + '">Ver ficha completa <i class="fa-solid fa-arrow-right"></i></a>' +
        '<a class="btn btn--wa btn--block" href="' + wa('Hola, quisiera cotizar: ' + p.n) + '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Cotizar por WhatsApp</a>' +
        '<button class="btn btn--ghost btn--block btn--sm" data-fav="' + p.id + '"><i class="fa-' + (guardado ? 'solid' : 'regular') + ' fa-heart"></i> ' + (guardado ? 'Guardado' : 'Guardar') + '</button>' +
        '</div>' +
        '</div>' +
        '</div>';

      modal.classList.add('on');
      bloquear(true);
      marcarBotones();
    }

    function nombreCategoria(id) {
      var lista = (META.categorias || []).filter(function (c) { return c.id === id; });
      return lista.length ? lista[0].n : '';
    }

    function cerrar() {
      modal.classList.remove('on');
      bloquear(false);
    }

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-quick]');
      if (b) {
        e.preventDefault();
        e.stopPropagation();
        abrir(b.getAttribute('data-quick'));
        return;
      }
      if (e.target.closest('[data-close-modal]') || e.target === modal) cerrar();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('on')) cerrar();
    });
  })();

  /* --------------------------------------------- abrir asistente desde CTA */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-bot]')) {
      e.preventDefault();
      if (window.laserBot) window.laserBot.abrir();
    }
  });

  /* ------------------------------------- imagen rota: no dejar hueco negro */
  document.addEventListener(
    'error',
    function (e) {
      var el = e.target;
      if (el.tagName !== 'IMG' || el.dataset.fallback) return;
      el.dataset.fallback = '1';
      el.src = BASE + 'assets/img/marca/logo.png';
      el.style.objectFit = 'contain';
      el.style.padding = '12%';
      el.style.opacity = '.35';
    },
    true
  );
})();
