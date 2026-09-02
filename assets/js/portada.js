/* ==========================================================================
   Mawëwë — Portada: slider, franja de promociones, pestañas y marcas
   --------------------------------------------------------------------------
   El slider se arma con window.MAWEWE_SLIDER (assets/data/catalogo.js).
   Reproduce solo, se pausa al pasar el mouse o al enfocar con el teclado,
   admite flechas, puntos, teclado y gesto de arrastre en móvil, y se detiene
   por completo si el sistema pide menos animación.
   ========================================================================== */
(function () {
  'use strict';

  var M = window.MAWEWE;
  if (!M) return;

  var DURACION = 6500;
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Todas las diapositivas están dentro del viewport desde el principio: si se
     marcan como lazy, el navegador no las descarga hasta que se muestran y al
     avanzar se ve un salto en blanco. Se cargan todas, pero sólo la primera
     con prioridad alta (es la que mide el LCP). */
  function carga(i) {
    return i === 0
      ? ' fetchpriority="high" decoding="async"'
      : ' loading="eager" fetchpriority="low" decoding="async"';
  }

  /* ===================================================================== */
  /* SLIDER                                                                */
  /* ===================================================================== */
  function montarSlider() {
    var raiz = M.$('[data-slider]');
    var slides = window.MAWEWE_SLIDER || [];
    if (!raiz || !slides.length) return;

    var pista = document.createElement('div');
    pista.className = 'hs__pista';

    pista.innerHTML = slides.map(function (s, i) {
      var tono = s.tono || 'claro';
      var attrs = ' data-tono="' + tono + '"' + (s.fondo ? ' data-fondo="' + s.fondo + '"' : '') +
        (i === 0 ? ' data-activo' : '') + ' aria-hidden="' + (i === 0 ? 'false' : 'true') + '"';

      var acciones = [];
      if (s.cta && s.cta.href) {
        acciones.push('<a class="boton ' + (tono === 'oscuro' ? 'boton--primario' : 'boton--claro') +
          '" href="' + M.escapar(s.cta.href) + '">' + M.escapar(s.cta.texto) + '</a>');
      }
      if (s.cta2) {
        var clase = tono === 'oscuro' ? 'boton boton--contorno' : 'boton boton--contorno-claro';
        if (s.cta2.chat) {
          acciones.push('<button class="' + clase + '" type="button" data-abrir-chat>' + M.escapar(s.cta2.texto) + '</button>');
        } else if (s.cta2.wsp) {
          acciones.push('<a class="' + clase + '" target="_blank" rel="noopener" href="' + M.urlWhatsapp(s.cta2.wsp) + '">' + M.escapar(s.cta2.texto) + '</a>');
        } else if (s.cta2.href) {
          acciones.push('<a class="' + clase + '" href="' + M.escapar(s.cta2.href) + '">' + M.escapar(s.cta2.texto) + '</a>');
        }
      }
      var botones = acciones.length ? '<div class="hs__acciones">' + acciones.join('') + '</div>' : '';

      if (s.modo === 'banner') {
        return '<div class="hs__slide hs__slide--banner" role="group" aria-roledescription="diapositiva" ' +
          'aria-label="' + (i + 1) + ' de ' + slides.length + '"' + attrs + '>' +
          '<img src="' + M.escapar(s.img) + '" alt="' + M.escapar(s.alt || '') + '"' + carga(i) + '>' +
          '<div class="hs__cuerpo contenedor">' + botones + '</div>' +
        '</div>';
      }

      var pastillas = (s.pastillas || []).map(function (p) {
        return '<span class="pastilla ' + (tono === 'oscuro' ? 'pastilla--marca' : 'pastilla--clara') + '">' + M.escapar(p) + '</span>';
      }).join('');

      return '<div class="hs__slide hs__slide--editorial" role="group" aria-roledescription="diapositiva" ' +
        'aria-label="' + (i + 1) + ' de ' + slides.length + '"' + attrs + '>' +
        '<div class="contenedor hs__editorial">' +
          '<div class="hs__cuerpo">' +
            (s.antetitulo ? '<span class="hs__antetitulo">' + M.escapar(s.antetitulo) + '</span>' : '') +
            '<h2 class="hs__titulo">' + s.titulo + '</h2>' +
            (s.bajada ? '<p class="hs__bajada">' + M.escapar(s.bajada) + '</p>' : '') +
            botones +
            (pastillas ? '<div class="hs__pastillas">' + pastillas + '</div>' : '') +
          '</div>' +
          '<div class="hs__figura">' +
            '<img src="' + M.escapar(s.img) + '" alt=""' + carga(i) + '>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    var puntos = document.createElement('div');
    puntos.className = 'hs__puntos';
    puntos.setAttribute('role', 'tablist');
    puntos.setAttribute('aria-label', 'Diapositivas');
    puntos.innerHTML = slides.map(function (s, i) {
      return '<button class="hs__punto" type="button" role="tab" data-ir="' + i + '" ' +
        'aria-current="' + (i === 0) + '" aria-label="Ir a la diapositiva ' + (i + 1) + '"></button>';
    }).join('');

    var progreso = document.createElement('div');
    progreso.className = 'hs__progreso';

    raiz.appendChild(pista);
    raiz.insertAdjacentHTML('beforeend',
      '<button class="hs__flecha hs__flecha--prev" type="button" data-paso="-1" aria-label="Diapositiva anterior">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>' +
      '<button class="hs__flecha hs__flecha--next" type="button" data-paso="1" aria-label="Diapositiva siguiente">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>');
    raiz.appendChild(puntos);
    raiz.appendChild(progreso);
    raiz.style.setProperty('--hs-duracion', (DURACION / 1000) + 's');

    var nodos = M.$$('.hs__slide', pista);
    var bolitas = M.$$('.hs__punto', puntos);
    var actual = 0;
    var reloj = null;

    function mostrar(i) {
      i = (i + nodos.length) % nodos.length;
      if (i === actual && nodos[i].hasAttribute('data-activo')) return;
      nodos[actual].removeAttribute('data-activo');
      nodos[actual].setAttribute('aria-hidden', 'true');
      bolitas[actual].setAttribute('aria-current', 'false');
      actual = i;
      nodos[actual].setAttribute('data-activo', '');
      nodos[actual].setAttribute('aria-hidden', 'false');
      bolitas[actual].setAttribute('aria-current', 'true');
      /* Si el usuario navega a mano, la cuenta atrás vuelve a empezar entera
         y no sólo la barra: si no, la siguiente diapositiva llegaría antes de
         lo que la barra deja ver. */
      if (reloj) { parar(); arrancar(); } else { reiniciarBarra(); }
    }

    function reiniciarBarra() {
      progreso.removeAttribute('data-corriendo');
      /* Forzar el reinicio de la animación CSS. */
      void progreso.offsetWidth;
      if (reloj) progreso.setAttribute('data-corriendo', '');
    }

    function arrancar() {
      if (menosMovimiento || nodos.length < 2 || reloj) return;
      reloj = setInterval(function () { mostrar(actual + 1); }, DURACION);
      reiniciarBarra();
    }

    function parar() {
      if (!reloj) return;
      clearInterval(reloj);
      reloj = null;
      progreso.removeAttribute('data-corriendo');
    }

    raiz.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-paso]');
      if (b) { mostrar(actual + parseInt(b.getAttribute('data-paso'), 10)); return; }
      var p = ev.target.closest('[data-ir]');
      if (p) mostrar(parseInt(p.getAttribute('data-ir'), 10));
    });

    raiz.addEventListener('mouseenter', parar);
    raiz.addEventListener('mouseleave', arrancar);
    raiz.addEventListener('focusin', parar);
    raiz.addEventListener('focusout', function (ev) {
      if (!raiz.contains(ev.relatedTarget)) arrancar();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) parar(); else arrancar();
    });

    raiz.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); mostrar(actual - 1); }
      if (ev.key === 'ArrowRight') { ev.preventDefault(); mostrar(actual + 1); }
    });

    /* Arrastre en pantallas táctiles */
    var x0 = null;
    raiz.addEventListener('touchstart', function (ev) {
      x0 = ev.touches[0].clientX;
      parar();
    }, { passive: true });
    raiz.addEventListener('touchend', function (ev) {
      if (x0 === null) return;
      var dx = ev.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) mostrar(actual + (dx < 0 ? 1 : -1));
      x0 = null;
      arrancar();
    });

    arrancar();
  }

  /* ===================================================================== */
  /* FRANJA DE PROMOCIONES                                                 */
  /* ===================================================================== */
  function montarPromos() {
    var nodo = M.$('[data-promos]');
    var promos = window.MAWEWE_PROMOS || [];
    if (!nodo || !promos.length) return;
    nodo.innerHTML = promos.map(function (p) {
      var interior = '<strong>' + M.escapar(p.fuerte) + '</strong><span>' + M.escapar(p.resto) + '</span>';
      return p.href
        ? '<a class="franja-promos__item" href="' + M.escapar(p.href) + '" target="_blank" rel="noopener">' + interior + '</a>'
        : '<div class="franja-promos__item">' + interior + '</div>';
    }).join('');
  }

  /* ===================================================================== */
  /* PESTAÑAS DE LA VITRINA                                                */
  /* ===================================================================== */
  function montarPestanas() {
    M.$$('[data-pestanas]').forEach(function (barra) {
      var destino = document.getElementById(barra.getAttribute('data-pestanas'));
      if (!destino) return;
      var botones = M.$$('[data-cats]', barra);

      function pintar(btn) {
        botones.forEach(function (b) { b.setAttribute('aria-selected', String(b === btn)); });
        var cats = (btn.getAttribute('data-cats') || '').split(',').filter(Boolean);
        var limite = parseInt(btn.getAttribute('data-limite'), 10) || 12;

        /* Se intercala una categoría tras otra para que la fila se vea variada. */
        var porCat = {};
        M.productos.forEach(function (p) {
          if (cats.indexOf(p.cat) === -1) return;
          (porCat[p.cat] = porCat[p.cat] || []).push(p);
        });
        var lista = [];
        var vuelta = 0;
        var quedan = true;
        while (quedan && lista.length < limite) {
          quedan = false;
          cats.forEach(function (c) {
            if (porCat[c] && porCat[c][vuelta] && lista.length < limite) {
              lista.push(porCat[c][vuelta]);
              quedan = true;
            }
          });
          vuelta++;
        }
        destino.innerHTML = lista.map(M.tarjetaProducto).join('');
        destino.scrollLeft = 0;
      }

      botones.forEach(function (b) {
        b.addEventListener('click', function () { pintar(b); });
      });

      var inicial = botones.filter(function (b) { return b.getAttribute('aria-selected') === 'true'; })[0] || botones[0];
      if (inicial) pintar(inicial);
    });
  }

  /* ===================================================================== */
  /* MARCAS                                                                */
  /* ===================================================================== */
  function montarMarcas() {
    var nodo = M.$('[data-marcas-grid]');
    if (!nodo) return;
    var limite = parseInt(nodo.getAttribute('data-marcas-grid'), 10) || 10;
    var cuenta = {};
    M.productos.forEach(function (p) {
      if (p.marca && p.marca !== 'Mawëwë') cuenta[p.marca] = (cuenta[p.marca] || 0) + 1;
    });
    var marcas = Object.keys(cuenta).sort(function (a, b) {
      return cuenta[b] - cuenta[a] || a.localeCompare(b, 'es');
    }).slice(0, limite);

    nodo.innerHTML = marcas.map(function (m) {
      return '<a class="marca-tarjeta" href="catalogo.html?marca=' + encodeURIComponent(m) + '">' +
        '<strong>' + M.escapar(m) + '</strong>' +
        '<span>' + cuenta[m] + ' producto' + (cuenta[m] === 1 ? '' : 's') + '</span></a>';
    }).join('');
  }

  /* ===================================================================== */
  /* TIRA SOCIAL                                                           */
  /* ===================================================================== */
  function montarSocial() {
    var nodo = M.$('[data-social]');
    if (!nodo) return;
    var ids = (nodo.getAttribute('data-social') || '').split(',').filter(Boolean);
    var enlace = (M.negocio.redes && M.negocio.redes.instagram) || '#';
    nodo.innerHTML = ids.map(function (id) {
      var p = M.productos.filter(function (x) { return x.id === id; })[0];
      if (!p) return '';
      return '<a href="' + enlace + '" target="_blank" rel="noopener" aria-label="Ver en Instagram: ' + M.escapar(p.nombre) + '">' +
        '<img src="' + M.escapar(p.img) + '" alt="" loading="lazy" decoding="async"></a>';
    }).join('');
  }

  function iniciar() {
    montarSlider();
    montarPromos();
    montarPestanas();
    montarMarcas();
    montarSocial();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
