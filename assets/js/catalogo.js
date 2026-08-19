/* =============================================================================
   Filtrado del catálogo — páginas de categoría, ocasión y catálogo completo.
   El alcance viene en data-scope: 'todo' | 'cat:<id>' | 'occ:<id>'.
   Los filtros activos se reflejan en la URL (?f=…&o=…&q=…) para poder
   compartir o volver con el botón atrás.
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.getElementById('catalog');
  if (!raiz || !window.CATALOGO) return;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var BASE = raiz.getAttribute('data-base') || '';
  var SCOPE = raiz.getAttribute('data-scope') || 'todo';
  var META = window.CATALOGO_META || {};

  var grid = $('#catGrid');
  var chips = $('#catChips');
  var cuenta = $('#catCount');
  var buscar = $('#catSearch');
  var cajaBuscar = $('#catSearchBox');
  var orden = $('#catSort');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function normaliza(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* Universo: sólo los productos que corresponden al alcance de la página */
  var universo = window.CATALOGO.filter(function (p) {
    if (SCOPE.indexOf('cat:') === 0) return p.c === SCOPE.slice(4);
    if (SCOPE.indexOf('occ:') === 0) return p.o.indexOf(SCOPE.slice(4)) > -1;
    return true;
  });

  var estado = { cat: '', sub: '', occ: '', plazo: '', q: '', orden: 'destacados' };

  /* ------------------------------------------------------ URL <-> estado */
  function leerUrl() {
    var u = new URLSearchParams(location.search);
    estado.sub = u.get('f') || '';
    estado.cat = u.get('c') || '';
    estado.occ = u.get('o') || '';
    estado.plazo = u.get('p') || '';
    estado.q = u.get('q') || '';
    estado.orden = u.get('s') || 'destacados';
    if (buscar) buscar.value = estado.q;
    if (orden) orden.value = estado.orden;
  }

  function escribirUrl(reemplazar) {
    var u = new URLSearchParams();
    if (estado.sub) u.set('f', estado.sub);
    if (estado.cat) u.set('c', estado.cat);
    if (estado.occ) u.set('o', estado.occ);
    if (estado.plazo) u.set('p', estado.plazo);
    if (estado.q) u.set('q', estado.q);
    if (estado.orden !== 'destacados') u.set('s', estado.orden);
    var url = location.pathname + (u.toString() ? '?' + u.toString() : '') + location.hash;
    history[reemplazar ? 'replaceState' : 'pushState'](null, '', url);
  }

  /* --------------------------------------------------------- filtrado */
  function filtrar() {
    var q = normaliza(estado.q).trim();

    var lista = universo.filter(function (p) {
      if (estado.cat && p.c !== estado.cat) return false;
      if (estado.sub && p.s !== estado.sub) return false;
      if (estado.occ && p.o.indexOf(estado.occ) < 0) return false;
      if (estado.plazo === 'rapido' && p.dias > 3) return false;
      if (estado.plazo === 'normal' && (p.dias < 4 || p.dias > 5)) return false;
      if (estado.plazo === 'lento' && p.dias <= 5) return false;
      if (q && normaliza(p.n + ' ' + p.r + ' ' + p.m + ' ' + p.o.join(' ') + ' ' + p.s + ' ' + p.e).indexOf(q) < 0)
        return false;
      return true;
    });

    if (estado.orden === 'rapido') lista.sort(function (a, b) { return a.dias - b.dias; });
    else if (estado.orden === 'az') lista.sort(function (a, b) { return a.n.localeCompare(b.n, 'es'); });
    else lista.sort(function (a, b) { return b.d - a.d || a.ord - b.ord; });

    return lista;
  }

  /* --------------------------------------------------------- pintado */
  function tarjeta(p) {
    return (
      '<article class="card lit" data-id="' + p.id + '">' +
      (p.e ? '<span class="card__flag">' + esc(p.e) + '</span>' : '') +
      '<button class="card__fav" data-fav="' + p.id + '" aria-label="Guardar ' + esc(p.n) + ' en mi lista"><i class="fa-regular fa-heart"></i></button>' +
      '<a class="card__media" href="' + BASE + p.u + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + BASE + p.i + '" alt="" loading="lazy" decoding="async" width="400" height="400">' +
      (p.i2 ? '<img src="' + BASE + p.i2 + '" alt="" loading="lazy" decoding="async" width="400" height="400">' : '') +
      '<span class="card__peek" data-quick="' + p.id + '"><i class="fa-regular fa-eye"></i> Vista rápida</span>' +
      '</a>' +
      '<div class="card__body">' +
      '<span class="card__cat">' + esc(nombreCategoria(p.c)) + '</span>' +
      '<h3 class="card__title"><a href="' + BASE + p.u + '">' + esc(p.n) + '</a></h3>' +
      '<p class="card__desc">' + esc(p.r) + '</p>' +
      '<div class="card__foot">' +
      '<span class="card__time"><i class="fa-regular fa-clock"></i>' + esc(p.t.replace(' hábiles', '')) + '</span>' +
      '<span class="card__go">Ver ficha <i class="fa-solid fa-arrow-right"></i></span>' +
      '</div></div></article>'
    );
  }

  function nombreCategoria(id) {
    var c = (META.categorias || []).filter(function (x) { return x.id === id; });
    return c.length ? c[0].n : '';
  }

  function nombreSub(id) {
    var out = '';
    (META.categorias || []).forEach(function (c) {
      c.subs.forEach(function (s) { if (s.id === id) out = s.n; });
    });
    return out;
  }

  function nombreOcasion(id) {
    var o = (META.ocasiones || []).filter(function (x) { return x.id === id; });
    return o.length ? o[0].n : '';
  }

  var ETIQUETA_PLAZO = { rapido: 'Listo en 1 a 3 días', normal: '3 a 5 días hábiles', lento: 'Más de 5 días' };

  function pintarChips() {
    if (!chips) return;
    var activos = [];
    if (estado.cat) activos.push({ k: 'cat', t: nombreCategoria(estado.cat) });
    if (estado.sub) activos.push({ k: 'sub', t: nombreSub(estado.sub) });
    if (estado.occ) activos.push({ k: 'occ', t: nombreOcasion(estado.occ) });
    if (estado.plazo) activos.push({ k: 'plazo', t: ETIQUETA_PLAZO[estado.plazo] });
    if (estado.q) activos.push({ k: 'q', t: '«' + estado.q + '»' });

    chips.innerHTML = activos
      .map(function (a) {
        return (
          '<span class="chip">' + esc(a.t) +
          '<button data-quitar="' + a.k + '" aria-label="Quitar filtro"><i class="fa-solid fa-xmark"></i></button></span>'
        );
      })
      .join('');

    $$('[data-quitar]', chips).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-quitar');
        estado[k] = '';
        if (k === 'q' && buscar) {
          buscar.value = '';
          if (cajaBuscar) cajaBuscar.classList.remove('filled');
        }
        aplicar();
      });
    });
  }

  function pintarOpciones() {
    $$('.filters__opt', raiz).forEach(function (b) {
      var k = b.getAttribute('data-filter');
      var v = b.getAttribute('data-value');
      b.classList.toggle('on', (estado[k] || '') === v);
    });
  }

  function aplicar(sinUrl) {
    var lista = filtrar();

    if (grid) {
      grid.innerHTML = lista.length
        ? lista.map(tarjeta).join('')
        : '<div class="empty">' +
          '<i class="fa-solid fa-magnifying-glass"></i>' +
          '<h3>Ninguna pieza coincide</h3>' +
          '<p>Probá quitando algún filtro. Si buscás algo que no está en el catálogo, lo podemos fabricar a medida.</p>' +
          '<div class="closer__actions" style="justify-content:center">' +
          '<button class="btn btn--ghost" id="emptyClear">Limpiar filtros</button>' +
          '<a class="btn btn--wa" href="https://wa.me/' + (META.whatsapp || '') + '?text=' +
          encodeURIComponent('Hola, busco algo que no encontré en la web: ' + (estado.q || '')) +
          '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Preguntar por WhatsApp</a>' +
          '</div></div>';

      var vaciar = document.getElementById('emptyClear');
      if (vaciar) vaciar.addEventListener('click', limpiar);
    }

    if (cuenta) {
      cuenta.textContent = lista.length + (lista.length === 1 ? ' pieza' : ' piezas');
    }

    pintarChips();
    pintarOpciones();
    if (!sinUrl) escribirUrl(true);

    /* Vuelve a marcar los corazones ya guardados */
    document.dispatchEvent(new CustomEvent('catalogo:pintado'));
  }

  function limpiar() {
    estado.cat = estado.sub = estado.occ = estado.plazo = estado.q = '';
    estado.orden = 'destacados';
    if (buscar) buscar.value = '';
    if (orden) orden.value = 'destacados';
    if (cajaBuscar) cajaBuscar.classList.remove('filled');
    aplicar();
  }

  /* --------------------------------------------------------- eventos */
  $$('.filters__opt', raiz).forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-filter');
      var v = b.getAttribute('data-value');
      estado[k] = estado[k] === v ? '' : v;
      aplicar();
      if (window.innerWidth < 900) cerrarFiltros();
    });
  });

  if (buscar) {
    var espera;
    buscar.addEventListener('input', function () {
      if (cajaBuscar) cajaBuscar.classList.toggle('filled', !!buscar.value);
      clearTimeout(espera);
      espera = setTimeout(function () {
        estado.q = buscar.value;
        aplicar();
      }, 160);
    });
  }

  var limpiarBuscar = $('#catSearchClear');
  if (limpiarBuscar) {
    limpiarBuscar.addEventListener('click', function () {
      buscar.value = '';
      estado.q = '';
      if (cajaBuscar) cajaBuscar.classList.remove('filled');
      aplicar();
      buscar.focus();
    });
  }

  if (orden) {
    orden.addEventListener('change', function () {
      estado.orden = orden.value;
      aplicar();
    });
  }

  var botonLimpiar = $('#clearFilters');
  if (botonLimpiar) botonLimpiar.addEventListener('click', limpiar);

  /* Panel de filtros en móvil */
  var panel = $('#filters');
  var scrim = document.getElementById('scrim');

  function abrirFiltros() {
    if (!panel) return;
    panel.classList.add('open');
    if (scrim) scrim.classList.add('on');
    document.body.classList.add('no-scroll');
  }

  function cerrarFiltros() {
    if (!panel) return;
    panel.classList.remove('open');
    if (scrim) scrim.classList.remove('on');
    document.body.classList.remove('no-scroll');
  }

  var abrirBtn = $('#openFilters');
  if (abrirBtn) abrirBtn.addEventListener('click', abrirFiltros);
  var cerrarBtn = $('#closeFilters');
  if (cerrarBtn) cerrarBtn.addEventListener('click', cerrarFiltros);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarFiltros();
  });

  window.addEventListener('popstate', function () {
    leerUrl();
    aplicar(true);
  });

  leerUrl();
  if (cajaBuscar && buscar && buscar.value) cajaBuscar.classList.add('filled');
  aplicar(true);
})();
