/* ==========================================================================
   Mawëwë — Comportamiento común a todas las páginas
   --------------------------------------------------------------------------
   · Construye los paneles del mega menú a partir de assets/data/catalogo.js
   · Menú móvil (cajón + acordeón)
   · Buscador desplegable
   · Barra de anuncios rotativa
   · Cabecera fija y utilidades compartidas (window.MAWEWE)
   ========================================================================== */
(function () {
  'use strict';

  var PRODUCTOS = window.MAWEWE_PRODUCTOS || [];
  var CATEGORIAS = window.MAWEWE_CATEGORIAS || [];
  var DEPARTAMENTOS = window.MAWEWE_DEPARTAMENTOS || [];
  var NEGOCIO = window.MAWEWE_NEGOCIO || {};

  /* --- utilidades ------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function escapar(txt) {
    return String(txt == null ? '' : txt)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Quita tildes y pasa a minúsculas: permite buscar "peluche" y que
     encuentre "PELUCHÉ", o "nino" y que encuentre "niño". */
  function normalizar(txt) {
    return String(txt || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n');
  }

  var indiceCat = {};
  CATEGORIAS.forEach(function (c) { indiceCat[c.slug] = c; });

  var conteoCat = {};
  PRODUCTOS.forEach(function (p) { conteoCat[p.cat] = (conteoCat[p.cat] || 0) + 1; });

  function categoria(slug) { return indiceCat[slug] || null; }
  function conteo(slug) { return conteoCat[slug] || 0; }

  function catsDeDepartamento(dep) {
    var vistos = {};
    var salida = [];
    (dep.grupos || []).forEach(function (g) {
      (g.cats || []).forEach(function (s) {
        if (!vistos[s] && indiceCat[s]) { vistos[s] = 1; salida.push(s); }
      });
    });
    return salida;
  }

  function productosDeDepartamento(slug) {
    var dep = DEPARTAMENTOS.filter(function (d) { return d.slug === slug; })[0];
    if (!dep) return [];
    var cats = catsDeDepartamento(dep);
    return PRODUCTOS.filter(function (p) { return cats.indexOf(p.cat) !== -1; });
  }

  function urlCategoria(slug) { return 'catalogo.html?cat=' + encodeURIComponent(slug); }
  function urlDepartamento(slug) { return 'catalogo.html?dep=' + encodeURIComponent(slug); }
  function urlProducto(id) { return 'producto.html?id=' + encodeURIComponent(id); }

  function urlWhatsapp(mensaje) {
    return 'https://wa.me/' + (NEGOCIO.whatsapp || '') +
      '?text=' + encodeURIComponent(mensaje || 'Hola Mawëwë, quisiera información sobre sus productos.');
  }

  /* --- tarjeta de producto reutilizable -------------------------------- */
  function tarjetaProducto(p) {
    var cat = categoria(p.cat);
    var marca = p.marca && p.marca !== 'Mawëwë'
      ? '<span class="pastilla pastilla--marca pastilla--sm">' + escapar(p.marca) + '</span>'
      : '';
    return '' +
      '<article class="producto">' +
        '<div class="producto__figura">' +
          '<div class="producto__pastillas">' + marca + '</div>' +
          '<img src="' + escapar(p.img) + '" alt="' + escapar(p.nombre) + '" loading="lazy" decoding="async">' +
          '<div class="producto__acciones">' +
            '<a class="boton boton--sm boton--oscuro" href="' + urlProducto(p.id) + '">Ver detalle</a>' +
            '<a class="boton boton--sm boton--wsp" target="_blank" rel="noopener" ' +
              'href="' + urlWhatsapp('Hola Mawëwë, me interesa: ' + p.nombre) + '" ' +
              'aria-label="Consultar por WhatsApp">' + icono('whatsapp') + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="producto__cuerpo">' +
          '<span class="producto__marca">' + escapar(cat ? cat.corto : p.cat) + '</span>' +
          '<h3 class="producto__nombre"><a href="' + urlProducto(p.id) + '">' + escapar(p.nombre) + '</a></h3>' +
          (p.detalle ? '<span class="producto__detalle">' + escapar(p.detalle) + '</span>' : '') +
        '</div>' +
      '</article>';
  }

  /* --- iconos SVG en línea (sin dependencias externas) ------------------ */
  var ICONOS = {
    whatsapp: '<path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    cerrar: '<path d="M18 6 6 18M6 6l12 12"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    izquierda: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    derecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    envio: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    escudo: '<path d="M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z"/><path d="m9 12 2 2 4-4"/>',
    tarjeta: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    regalo: '<path d="M4 11h16v10H4zM2 7h20v4H2z"/><path d="M12 7v14M12 7S9 3 7 4.5 9 7 12 7Zm0 0s3-4 5-2.5S15 7 12 7Z"/>',
    telefono: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    correo: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z"/>',
    enviar: '<path d="M4 12 20 4l-6 16-2.5-6.5z"/>',
    facebook: '<path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2a1 1 0 0 1 1-1Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1"/>',
    tiktok: '<path d="M15 4v8.5a3.5 3.5 0 1 1-3-3.46"/><path d="M15 4c.6 2.2 2 3.4 4 3.6"/>',
    tienda: '<path d="M4 8h16l-1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
  };

  /* width/height en em son imprescindibles: un <svg> sin medidas cae al tamaño
     por defecto de los reemplazados (300x150) y aparece enorme allí donde el
     CSS del componente no lo dimensiona. Con 1em queda a la altura del texto y
     cualquier regla posterior lo puede ajustar. */
  function icono(nombre, extra) {
    var d = ICONOS[nombre];
    if (!d) return '';
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (extra ? ' class="' + extra + '"' : '') + '>' + d + '</svg>';
  }
  /* WhatsApp e Instagram se ven mejor rellenos que trazados */
  function iconoLleno(nombre) {
    var d = ICONOS[nombre];
    return d ? '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">' + d + '</svg>' : '';
  }

  /* --- API pública ----------------------------------------------------- */
  window.MAWEWE = {
    $: $, $$: $$,
    escapar: escapar,
    normalizar: normalizar,
    productos: PRODUCTOS,
    categorias: CATEGORIAS,
    departamentos: DEPARTAMENTOS,
    negocio: NEGOCIO,
    categoria: categoria,
    conteo: conteo,
    catsDeDepartamento: catsDeDepartamento,
    productosDeDepartamento: productosDeDepartamento,
    urlCategoria: urlCategoria,
    urlDepartamento: urlDepartamento,
    urlProducto: urlProducto,
    urlWhatsapp: urlWhatsapp,
    tarjetaProducto: tarjetaProducto,
    icono: icono,
    iconoLleno: iconoLleno
  };

  /* ===================================================================== */
  /* MEGA MENÚ                                                             */
  /* ===================================================================== */
  function panelMega(dep) {
    var columnas = (dep.grupos || []).map(function (g) {
      var enlaces = (g.cats || []).map(function (slug) {
        var c = categoria(slug);
        if (!c) return '';
        return '<li><a class="mega__enlace" href="' + urlCategoria(slug) + '">' +
          '<span>' + escapar(c.corto) + '</span>' +
          '<span>' + conteo(slug) + '</span></a></li>';
      }).join('');
      return '<div><h4 class="mega__grupo-nombre">' + escapar(g.nombre) + '</h4>' +
        '<ul class="mega__enlaces">' + enlaces + '</ul></div>';
    }).join('');

    var d = dep.destacado || {};
    var catDest = categoria(d.cat);
    var destacado = catDest
      ? '<a class="mega__destacado" href="' + urlCategoria(d.cat) + '">' +
          '<img src="' + escapar(catDest.img) + '" alt="" loading="lazy" decoding="async">' +
          '<div class="mega__destacado-cuerpo">' +
            '<h4>' + escapar(d.titulo || catDest.nombre) + '</h4>' +
            '<p>' + escapar(d.bajada || catDest.resumen) + '</p>' +
            '<span class="mega__destacado-cta">Ver la selección ' + icono('flecha') + '</span>' +
          '</div>' +
        '</a>'
      : '';

    var total = productosDeDepartamento(dep.slug).length;

    return '<div class="mega" role="region" aria-label="Menú ' + escapar(dep.nombre) + '">' +
      '<div class="contenedor mega__interior">' +
        '<div>' +
          '<p class="mega__titular">' + escapar(dep.titular) + '</p>' +
          '<div class="mega__grupos">' + columnas + '</div>' +
          '<div class="mega__pie">' +
            '<a class="enlace-flecha" href="' + urlDepartamento(dep.slug) + '">Ver todo ' + escapar(dep.nombre) + ' ' + icono('flecha') + '</a>' +
            '<span class="pastilla">' + total + ' productos publicados</span>' +
            '<span class="pastilla pastilla--rosa">Envíos a todo el Ecuador</span>' +
          '</div>' +
        '</div>' +
        destacado +
      '</div>' +
    '</div>';
  }

  function montarMegaMenu() {
    var lista = $('[data-nav-lista]');
    if (!lista) return;

    DEPARTAMENTOS.forEach(function (dep) {
      var item = lista.querySelector('[data-dep="' + dep.slug + '"]');
      if (!item) return;
      item.insertAdjacentHTML('beforeend', panelMega(dep));
      var enlace = item.querySelector('.nav__enlace');
      if (enlace) {
        enlace.setAttribute('aria-expanded', 'false');
        enlace.setAttribute('aria-haspopup', 'true');
      }
    });

    var abierto = null;
    var temporizador = null;

    function abrir(item) {
      if (abierto === item) return;
      if (abierto) cerrar(abierto);
      item.setAttribute('data-abierto', '');
      var e = item.querySelector('.nav__enlace');
      if (e) e.setAttribute('aria-expanded', 'true');
      abierto = item;
    }

    function cerrar(item) {
      if (!item) return;
      item.removeAttribute('data-abierto');
      var e = item.querySelector('.nav__enlace');
      if (e) e.setAttribute('aria-expanded', 'false');
      if (abierto === item) abierto = null;
    }

    $$('.nav__item[data-dep]', lista).forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        clearTimeout(temporizador);
        abrir(item);
      });
      item.addEventListener('mouseleave', function () {
        clearTimeout(temporizador);
        temporizador = setTimeout(function () { cerrar(item); }, 140);
      });
      // Teclado: Enter/Espacio sobre el enlace abre el panel en vez de navegar.
      var enlace = item.querySelector('.nav__enlace');
      if (enlace) {
        enlace.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ') {
            if (!item.hasAttribute('data-abierto')) {
              ev.preventDefault();
              abrir(item);
              var primero = item.querySelector('.mega__enlace');
              if (primero) primero.focus();
            }
          }
        });
      }
      item.addEventListener('focusout', function (ev) {
        if (!item.contains(ev.relatedTarget)) cerrar(item);
      });
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && abierto) {
        var e = abierto.querySelector('.nav__enlace');
        cerrar(abierto);
        if (e) e.focus();
      }
    });
  }

  /* ===================================================================== */
  /* MENÚ MÓVIL                                                            */
  /* ===================================================================== */
  function montarCajon() {
    var cajon = $('[data-cajon]');
    var velo = $('[data-velo]');
    var cuerpo = $('[data-cajon-cuerpo]');
    if (!cajon || !cuerpo) return;

    cuerpo.innerHTML = DEPARTAMENTOS.map(function (dep, i) {
      var grupos = (dep.grupos || []).map(function (g) {
        var enlaces = (g.cats || []).map(function (slug) {
          var c = categoria(slug);
          if (!c) return '';
          return '<li><a class="mega__enlace" href="' + urlCategoria(slug) + '">' +
            '<span>' + escapar(c.corto) + '</span><span>' + conteo(slug) + '</span></a></li>';
        }).join('');
        return '<h4 class="mega__grupo-nombre">' + escapar(g.nombre) + '</h4>' +
          '<ul class="mega__enlaces">' + enlaces + '</ul>';
      }).join('');

      return '<div class="acordeon">' +
        '<button class="acordeon__disparador" type="button" aria-expanded="false" aria-controls="panel-' + dep.slug + '">' +
          escapar(dep.nombre) + '<span class="acordeon__icono"></span>' +
        '</button>' +
        '<div class="acordeon__panel" id="panel-' + dep.slug + '">' +
          grupos +
          '<a class="enlace-flecha" style="margin-top:14px" href="' + urlDepartamento(dep.slug) + '">Ver todo ' + icono('flecha') + '</a>' +
        '</div>' +
      '</div>';
    }).join('') +
    '<div class="acordeon">' +
      '<a class="acordeon__disparador" href="catalogo.html">Catálogo completo</a>' +
      '<a class="acordeon__disparador" href="nosotros.html">Nosotros</a>' +
      '<a class="acordeon__disparador" href="pagos.html">Cómo comprar</a>' +
      '<a class="acordeon__disparador" href="contacto.html">Contacto</a>' +
    '</div>';

    $$('.acordeon__disparador[aria-controls]', cuerpo).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var abierto = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!abierto));
        if (panel) panel.toggleAttribute('data-abierto', !abierto);
      });
    });

    function abrirCajon() {
      cajon.setAttribute('data-abierto', '');
      if (velo) velo.setAttribute('data-abierto', '');
      document.body.classList.add('sin-scroll');
      var cerrarBtn = $('[data-cajon-cerrar]', cajon);
      if (cerrarBtn) cerrarBtn.focus();
    }
    function cerrarCajon() {
      cajon.removeAttribute('data-abierto');
      if (velo) velo.removeAttribute('data-abierto');
      document.body.classList.remove('sin-scroll');
    }

    $$('[data-abrir-cajon]').forEach(function (b) { b.addEventListener('click', abrirCajon); });
    $$('[data-cajon-cerrar]').forEach(function (b) { b.addEventListener('click', cerrarCajon); });
    if (velo) velo.addEventListener('click', cerrarCajon);
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && cajon.hasAttribute('data-abierto')) cerrarCajon();
    });
  }

  /* ===================================================================== */
  /* BUSCADOR                                                              */
  /* ===================================================================== */
  function montarBuscador() {
    var panel = $('[data-buscador]');
    if (!panel) return;
    var campo = $('input', panel);
    var sugerencias = $('[data-sugerencias]', panel);

    if (sugerencias) {
      /* Las sugerencias son las categorías con más productos. */
      var top = CATEGORIAS.slice().sort(function (a, b) {
        return conteo(b.slug) - conteo(a.slug);
      }).slice(0, 6);
      sugerencias.innerHTML = '<span>Buscado con frecuencia</span>' + top.map(function (c) {
        return '<a class="chip" href="' + urlCategoria(c.slug) + '">' + escapar(c.corto) + '</a>';
      }).join('');
    }

    function alternar(forzar) {
      var abrir = forzar === undefined ? !panel.hasAttribute('data-abierto') : forzar;
      panel.toggleAttribute('data-abierto', abrir);
      $$('[data-abrir-buscador]').forEach(function (b) {
        b.setAttribute('aria-expanded', String(abrir));
      });
      if (abrir && campo) campo.focus();
    }

    $$('[data-abrir-buscador]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
      b.addEventListener('click', function () { alternar(); });
    });

    var form = panel.querySelector('form');
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var q = (campo && campo.value || '').trim();
        window.location.href = q ? 'catalogo.html?q=' + encodeURIComponent(q) : 'catalogo.html';
      });
    }

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && panel.hasAttribute('data-abierto')) alternar(false);
    });
    document.addEventListener('click', function (ev) {
      if (!panel.hasAttribute('data-abierto')) return;
      if (panel.contains(ev.target) || ev.target.closest('[data-abrir-buscador]')) return;
      alternar(false);
    });
  }

  /* ===================================================================== */
  /* BARRA DE ANUNCIOS + CABECERA FIJA                                     */
  /* ===================================================================== */
  function montarAnuncios() {
    var items = $$('.barra-anuncios__item');
    if (items.length < 2) return;
    var i = 0;
    setInterval(function () {
      items[i].removeAttribute('data-activo');
      i = (i + 1) % items.length;
      items[i].setAttribute('data-activo', '');
    }, 4200);
  }

  function montarCabecera() {
    var cabecera = $('.cabecera');
    if (!cabecera) return;
    var ultimo = -1;
    function alScroll() {
      var fijo = window.scrollY > 12;
      if (fijo !== ultimo) {
        cabecera.toggleAttribute('data-fijo', fijo);
        ultimo = fijo;
      }
    }
    window.addEventListener('scroll', alScroll, { passive: true });
    alScroll();
  }

  /* ===================================================================== */
  /* CARRUSELES HORIZONTALES                                               */
  /* ===================================================================== */
  function montarCarruseles() {
    $$('[data-carrusel-controles]').forEach(function (controles) {
      var destino = document.getElementById(controles.getAttribute('data-carrusel-controles'));
      if (!destino) return;
      $$('button', controles).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var dir = btn.getAttribute('data-dir') === 'prev' ? -1 : 1;
          destino.scrollBy({ left: dir * Math.round(destino.clientWidth * 0.8), behavior: 'smooth' });
        });
      });
    });
  }

  /* ===================================================================== */
  /* PIE DE PÁGINA DINÁMICO                                                */
  /* ===================================================================== */
  function montarPie() {
    var anio = $('[data-anio]');
    if (anio) anio.textContent = String(new Date().getFullYear());

    var lista = $('[data-pie-categorias]');
    if (lista) {
      var top = CATEGORIAS.slice().sort(function (a, b) {
        return conteo(b.slug) - conteo(a.slug);
      }).slice(0, 7);
      lista.innerHTML = top.map(function (c) {
        return '<li><a href="' + urlCategoria(c.slug) + '">' + escapar(c.corto) + '</a></li>';
      }).join('');
    }

    var deps = $('[data-pie-departamentos]');
    if (deps) {
      deps.innerHTML = DEPARTAMENTOS.map(function (d) {
        return '<li><a href="' + urlDepartamento(d.slug) + '">' + escapar(d.nombre) + '</a></li>';
      }).join('');
    }

    /* Enlaces de WhatsApp que sólo llevan data-wsp */
    $$('[data-wsp]').forEach(function (a) {
      a.setAttribute('href', urlWhatsapp(a.getAttribute('data-wsp') || ''));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  /* Buscador fijo de la cabecera (visible en pantallas grandes). */
  function montarBuscadorInline() {
    $$('[data-buscador-inline]').forEach(function (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var campo = $('input', form);
        var q = (campo && campo.value || '').trim();
        window.location.href = q ? 'catalogo.html?q=' + encodeURIComponent(q) : 'catalogo.html';
      });
    });
  }

  /* --- arranque -------------------------------------------------------- */
  function iniciar() {
    montarMegaMenu();
    montarBuscadorInline();
    montarCajon();
    montarBuscador();
    montarAnuncios();
    montarCabecera();
    montarCarruseles();
    montarPie();
    document.dispatchEvent(new CustomEvent('mawewe:listo'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
