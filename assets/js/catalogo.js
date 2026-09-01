/* ==========================================================================
   Mawëwë — Catálogo, ficha de producto y vitrinas de la portada
   --------------------------------------------------------------------------
   Una sola ruta (catalogo.html) sirve las 22 categorías mediante parámetros:
     catalogo.html?cat=peluches      → una categoría
     catalogo.html?dep=mujer         → un departamento del menú
     catalogo.html?q=perfume         → búsqueda libre
     catalogo.html?marca=Chevignon   → una marca
   Los filtros se reflejan en la URL, así que cualquier vista es enlazable.
   ========================================================================== */
(function () {
  'use strict';

  var M = window.MAWEWE;
  if (!M) return;

  var POR_PAGINA = 24;

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function texto(p) {
    return M.normalizar([p.nombre, p.marca, p.detalle, p.cat].join(' '));
  }

  /* ===================================================================== */
  /* VITRINAS DE LA PORTADA                                                */
  /* ===================================================================== */
  function montarVitrinas() {
    M.$$('[data-vitrina]').forEach(function (nodo) {
      var cats = (nodo.getAttribute('data-vitrina') || '').split(',').filter(Boolean);
      var limite = parseInt(nodo.getAttribute('data-limite'), 10) || 8;
      var mezclar = nodo.hasAttribute('data-mezclar');

      var lista = M.productos.filter(function (p) {
        return cats.length === 0 || cats.indexOf(p.cat) !== -1;
      });

      if (mezclar) {
        /* Un producto por categoría primero, para que la fila se vea variada. */
        var porCat = {};
        var mezcla = [];
        lista.forEach(function (p) {
          porCat[p.cat] = porCat[p.cat] || [];
          porCat[p.cat].push(p);
        });
        var vuelta = 0;
        var quedan = true;
        while (quedan && mezcla.length < limite) {
          quedan = false;
          cats.forEach(function (c) {
            if (porCat[c] && porCat[c][vuelta] && mezcla.length < limite) {
              mezcla.push(porCat[c][vuelta]);
              quedan = true;
            }
          });
          vuelta++;
        }
        lista = mezcla;
      }

      nodo.innerHTML = lista.slice(0, limite).map(M.tarjetaProducto).join('');
    });

    /* Rejilla de categorías destacadas */
    M.$$('[data-categorias]').forEach(function (nodo) {
      var slugs = (nodo.getAttribute('data-categorias') || '').split(',').filter(Boolean);
      nodo.innerHTML = slugs.map(function (slug, i) {
        var c = M.categoria(slug);
        if (!c) return '';
        var ancha = nodo.hasAttribute('data-primera-ancha') && i === 0 ? ' tarjeta-cat--ancha' : '';
        return '<a class="tarjeta-cat' + ancha + '" href="' + M.urlCategoria(slug) + '">' +
          '<img src="' + M.escapar(c.img) + '" alt="" loading="lazy" decoding="async">' +
          '<div class="tarjeta-cat__cuerpo">' +
            '<span class="tarjeta-cat__conteo">' + M.conteo(slug) + ' productos</span>' +
            '<h3 class="tarjeta-cat__nombre">' + M.escapar(c.nombre) + '</h3>' +
          '</div></a>';
      }).join('');
    });

    /* Mosaico del héroe */
    var mosaico = M.$('[data-mosaico]');
    if (mosaico) {
      var ids = (mosaico.getAttribute('data-mosaico') || '').split(',').filter(Boolean);
      mosaico.innerHTML = ids.map(function (id) {
        var p = M.productos.filter(function (x) { return x.id === id; })[0];
        if (!p) return '';
        return '<a class="mosaico__pieza" href="' + M.urlProducto(p.id) + '" title="' + M.escapar(p.nombre) + '">' +
          '<span class="mosaico__etiqueta pastilla pastilla--marca pastilla--sm">' + M.escapar(p.marca) + '</span>' +
          '<img src="' + M.escapar(p.img) + '" alt="' + M.escapar(p.nombre) + '" decoding="async">' +
        '</a>';
      }).join('');
    }

    /* Marquesina de marcas */
    var marquesina = M.$('[data-marquesina]');
    if (marquesina) {
      var cuenta = {};
      M.productos.forEach(function (p) {
        if (p.marca && p.marca !== 'Mawëwë') cuenta[p.marca] = (cuenta[p.marca] || 0) + 1;
      });
      var marcas = Object.keys(cuenta).sort(function (a, b) { return cuenta[b] - cuenta[a]; }).slice(0, 14);
      var fila = marcas.map(function (m) {
        return '<a class="marquesina__item" href="catalogo.html?marca=' + encodeURIComponent(m) + '">' + M.escapar(m) + '</a>';
      }).join('');
      marquesina.innerHTML = fila + fila; /* duplicado: el bucle es continuo */
    }
  }

  /* ===================================================================== */
  /* CATÁLOGO                                                              */
  /* ===================================================================== */
  function montarCatalogo() {
    var raiz = M.$('[data-catalogo]');
    if (!raiz) return;

    var salida = M.$('[data-resultados]');
    var conteoNodo = M.$('[data-conteo]');
    var chipsNodo = M.$('[data-chips]');
    var ordenNodo = M.$('[data-orden]');
    var masNodo = M.$('[data-ver-mas]');
    var tituloNodo = M.$('[data-titulo]');
    var bajadaNodo = M.$('[data-bajada]');
    var migaNodo = M.$('[data-miga-actual]');

    var estado = {
      dep: '',
      cats: [],
      marcas: [],
      q: '',
      orden: 'destacados',
      pagina: 1
    };

    /* --- estado <-> URL ------------------------------------------------ */
    function leerURL() {
      var p = params();
      estado.dep = p.get('dep') || '';
      estado.cats = (p.get('cat') || '').split(',').filter(Boolean);
      estado.marcas = (p.get('marca') || '').split(',').filter(Boolean);
      estado.q = p.get('q') || '';
      estado.orden = p.get('orden') || 'destacados';
      estado.pagina = 1;
    }

    function escribirURL() {
      var p = new URLSearchParams();
      if (estado.dep) p.set('dep', estado.dep);
      if (estado.cats.length) p.set('cat', estado.cats.join(','));
      if (estado.marcas.length) p.set('marca', estado.marcas.join(','));
      if (estado.q) p.set('q', estado.q);
      if (estado.orden !== 'destacados') p.set('orden', estado.orden);
      var qs = p.toString();
      history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
    }

    /* --- filtrado ------------------------------------------------------ */
    function catsPermitidas() {
      if (estado.dep) {
        var dep = M.departamentos.filter(function (d) { return d.slug === estado.dep; })[0];
        if (dep) return M.catsDeDepartamento(dep);
      }
      return null;
    }

    function filtrar() {
      var permitidas = catsPermitidas();
      var q = M.normalizar(estado.q);
      var palabras = q ? q.split(/\s+/).filter(Boolean) : [];

      var lista = M.productos.filter(function (p) {
        if (permitidas && permitidas.indexOf(p.cat) === -1) return false;
        if (estado.cats.length && estado.cats.indexOf(p.cat) === -1) return false;
        if (estado.marcas.length && estado.marcas.indexOf(p.marca) === -1) return false;
        if (palabras.length) {
          var t = texto(p);
          for (var i = 0; i < palabras.length; i++) {
            if (t.indexOf(palabras[i]) === -1) return false;
          }
        }
        return true;
      });

      if (estado.orden === 'nombre') {
        lista.sort(function (a, b) { return a.nombre.localeCompare(b.nombre, 'es'); });
      } else if (estado.orden === 'nombre-desc') {
        lista.sort(function (a, b) { return b.nombre.localeCompare(a.nombre, 'es'); });
      } else if (estado.orden === 'categoria') {
        lista.sort(function (a, b) {
          var ca = M.categoria(a.cat), cb = M.categoria(b.cat);
          return (ca ? ca.nombre : a.cat).localeCompare(cb ? cb.nombre : b.cat, 'es');
        });
      } else if (estado.orden === 'marca') {
        lista.sort(function (a, b) { return a.marca.localeCompare(b.marca, 'es'); });
      }
      return lista;
    }

    /* --- textos de encabezado ------------------------------------------ */
    function titulo() {
      if (estado.q) return 'Resultados para «' + estado.q + '»';
      if (estado.cats.length === 1) {
        var c = M.categoria(estado.cats[0]);
        if (c) return c.nombre;
      }
      if (estado.marcas.length === 1) return estado.marcas[0];
      if (estado.dep) {
        var d = M.departamentos.filter(function (x) { return x.slug === estado.dep; })[0];
        if (d) return d.nombre;
      }
      return 'Catálogo completo';
    }

    function bajada() {
      if (estado.q) return 'Buscamos en nombres, marcas y categorías de todo el catálogo.';
      if (estado.cats.length === 1) {
        var c = M.categoria(estado.cats[0]);
        if (c) return c.resumen;
      }
      if (estado.dep) {
        var d = M.departamentos.filter(function (x) { return x.slug === estado.dep; })[0];
        if (d) return d.titular + '. Consultá disponibilidad y precio por WhatsApp.';
      }
      return 'Todo lo que tenemos publicado. Usá los filtros para llegar más rápido a lo que buscás.';
    }

    /* --- panel de filtros ---------------------------------------------- */
    function pintarFiltros() {
      var permitidas = catsPermitidas();

      /* Departamentos */
      var contDeps = M.$('[data-filtro-departamentos]');
      if (contDeps) {
        contDeps.innerHTML = M.departamentos.map(function (d) {
          var n = M.productosDeDepartamento(d.slug).length;
          return '<button class="filtros__opcion" type="button" data-dep-filtro="' + d.slug + '" ' +
            'aria-pressed="' + (estado.dep === d.slug) + '">' +
            '<span>' + M.escapar(d.nombre) + '</span><span>' + n + '</span></button>';
        }).join('');
      }

      /* Categorías (limitadas al departamento activo, si lo hay) */
      var contCats = M.$('[data-filtro-categorias]');
      if (contCats) {
        var visibles = M.categorias.filter(function (c) {
          return !permitidas || permitidas.indexOf(c.slug) !== -1;
        });
        contCats.innerHTML = visibles.map(function (c) {
          return '<button class="filtros__opcion" type="button" data-cat-filtro="' + c.slug + '" ' +
            'aria-pressed="' + (estado.cats.indexOf(c.slug) !== -1) + '">' +
            '<span>' + M.escapar(c.corto) + '</span><span>' + M.conteo(c.slug) + '</span></button>';
        }).join('');
      }

      /* Marcas presentes en el resultado actual */
      var contMarcas = M.$('[data-filtro-marcas]');
      if (contMarcas) {
        var base = M.productos.filter(function (p) {
          if (permitidas && permitidas.indexOf(p.cat) === -1) return false;
          if (estado.cats.length && estado.cats.indexOf(p.cat) === -1) return false;
          return true;
        });
        var cuenta = {};
        base.forEach(function (p) { cuenta[p.marca] = (cuenta[p.marca] || 0) + 1; });
        var marcas = Object.keys(cuenta).sort(function (a, b) {
          return cuenta[b] - cuenta[a] || a.localeCompare(b, 'es');
        });
        contMarcas.innerHTML = marcas.map(function (m) {
          return '<button class="filtros__opcion" type="button" data-marca-filtro="' + M.escapar(m) + '" ' +
            'aria-pressed="' + (estado.marcas.indexOf(m) !== -1) + '">' +
            '<span>' + M.escapar(m) + '</span><span>' + cuenta[m] + '</span></button>';
        }).join('');
      }

      /* Chips de filtros activos */
      if (chipsNodo) {
        var chips = [];
        if (estado.q) chips.push({ tipo: 'q', valor: estado.q, texto: '«' + estado.q + '»' });
        if (estado.dep) {
          var d = M.departamentos.filter(function (x) { return x.slug === estado.dep; })[0];
          chips.push({ tipo: 'dep', valor: estado.dep, texto: d ? d.nombre : estado.dep });
        }
        estado.cats.forEach(function (s) {
          var c = M.categoria(s);
          chips.push({ tipo: 'cat', valor: s, texto: c ? c.corto : s });
        });
        estado.marcas.forEach(function (m) {
          chips.push({ tipo: 'marca', valor: m, texto: m });
        });

        chipsNodo.innerHTML = chips.length
          ? chips.map(function (c) {
              return '<button class="chip chip--quitar" data-activo type="button" ' +
                'data-quitar="' + c.tipo + '" data-valor="' + M.escapar(c.valor) + '">' +
                M.escapar(c.texto) + '</button>';
            }).join('') + '<button class="chip" type="button" data-limpiar>Limpiar todo</button>'
          : '';
      }
    }

    /* --- pintado -------------------------------------------------------- */
    var listaActual = [];

    function pintar() {
      listaActual = filtrar();

      if (tituloNodo) tituloNodo.textContent = titulo();
      if (bajadaNodo) bajadaNodo.textContent = bajada();
      if (migaNodo) migaNodo.textContent = titulo();
      document.title = titulo() + ' · Mawëwë';

      if (conteoNodo) {
        conteoNodo.innerHTML = listaActual.length
          ? '<strong>' + listaActual.length + '</strong> producto' + (listaActual.length === 1 ? '' : 's')
          : 'Sin resultados';
      }

      var hasta = Math.min(estado.pagina * POR_PAGINA, listaActual.length);

      if (salida) {
        if (!listaActual.length) {
          salida.className = '';
          salida.innerHTML = '<div class="vacio">' +
            '<h3>No encontramos nada con esos filtros</h3>' +
            '<p>Probá con menos filtros, o escribinos y lo buscamos por vos.</p>' +
            '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
              '<button class="boton boton--contorno" type="button" data-limpiar>Limpiar filtros</button>' +
              '<a class="boton boton--wsp" data-wsp="Hola Mawëwë, estoy buscando un producto que no encuentro en la web.">' +
                M.icono('whatsapp') + 'Preguntar por WhatsApp</a>' +
            '</div></div>';
          var wsp = salida.querySelector('[data-wsp]');
          if (wsp) {
            wsp.href = M.urlWhatsapp(wsp.getAttribute('data-wsp'));
            wsp.target = '_blank';
            wsp.rel = 'noopener';
          }
        } else {
          salida.className = 'rejilla-productos';
          salida.innerHTML = listaActual.slice(0, hasta).map(M.tarjetaProducto).join('');
        }
      }

      if (masNodo) {
        var faltan = listaActual.length - hasta;
        masNodo.hidden = faltan <= 0;
        if (faltan > 0) masNodo.textContent = 'Ver ' + Math.min(faltan, POR_PAGINA) + ' productos más';
      }

      pintarFiltros();
      escribirURL();
    }

    /* --- eventos -------------------------------------------------------- */
    raiz.addEventListener('click', function (ev) {
      var b;

      if ((b = ev.target.closest('[data-dep-filtro]'))) {
        var slug = b.getAttribute('data-dep-filtro');
        estado.dep = estado.dep === slug ? '' : slug;
        estado.cats = [];
        estado.pagina = 1;
        pintar();
        return;
      }

      if ((b = ev.target.closest('[data-cat-filtro]'))) {
        var c = b.getAttribute('data-cat-filtro');
        var i = estado.cats.indexOf(c);
        if (i === -1) estado.cats.push(c); else estado.cats.splice(i, 1);
        estado.pagina = 1;
        pintar();
        return;
      }

      if ((b = ev.target.closest('[data-marca-filtro]'))) {
        var m = b.getAttribute('data-marca-filtro');
        var j = estado.marcas.indexOf(m);
        if (j === -1) estado.marcas.push(m); else estado.marcas.splice(j, 1);
        estado.pagina = 1;
        pintar();
        return;
      }

      if ((b = ev.target.closest('[data-quitar]'))) {
        var tipo = b.getAttribute('data-quitar');
        var valor = b.getAttribute('data-valor');
        if (tipo === 'q') estado.q = '';
        if (tipo === 'dep') estado.dep = '';
        if (tipo === 'cat') estado.cats = estado.cats.filter(function (x) { return x !== valor; });
        if (tipo === 'marca') estado.marcas = estado.marcas.filter(function (x) { return x !== valor; });
        estado.pagina = 1;
        pintar();
        return;
      }

      if (ev.target.closest('[data-limpiar]')) {
        estado.dep = ''; estado.cats = []; estado.marcas = []; estado.q = ''; estado.pagina = 1;
        pintar();
        return;
      }

      if (ev.target.closest('[data-ver-mas]')) {
        estado.pagina++;
        pintar();
        var tarjetas = salida ? salida.children : [];
        var foco = tarjetas[(estado.pagina - 1) * POR_PAGINA];
        if (foco) foco.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    if (ordenNodo) {
      ordenNodo.addEventListener('change', function () {
        estado.orden = ordenNodo.value;
        estado.pagina = 1;
        pintar();
      });
    }

    var toggleFiltros = M.$('[data-toggle-filtros]');
    var panelFiltros = M.$('.filtros');
    if (toggleFiltros && panelFiltros) {
      toggleFiltros.addEventListener('click', function () {
        var abierto = panelFiltros.toggleAttribute('data-abierto');
        toggleFiltros.setAttribute('aria-expanded', String(abierto));
      });
    }

    leerURL();
    if (ordenNodo) ordenNodo.value = estado.orden;
    pintar();
  }

  /* ===================================================================== */
  /* FICHA DE PRODUCTO                                                     */
  /* ===================================================================== */
  function montarProducto() {
    var raiz = M.$('[data-producto]');
    if (!raiz) return;

    var id = params().get('id');
    var p = M.productos.filter(function (x) { return x.id === id; })[0];

    if (!p) {
      raiz.innerHTML = '<div class="vacio">' +
        '<h3>No encontramos ese producto</h3>' +
        '<p>Puede que lo hayamos retirado del catálogo o que el enlace esté incompleto.</p>' +
        '<a class="boton boton--primario" href="catalogo.html">Ir al catálogo</a></div>';
      return;
    }

    var cat = M.categoria(p.cat) || { nombre: p.cat, corto: p.cat, slug: p.cat, resumen: '' };
    var mensaje = 'Hola Mawëwë, me interesa este producto: ' + p.nombre +
      ' (referencia ' + p.id + '). ¿Precio y disponibilidad?';

    document.title = p.nombre + ' · ' + cat.nombre + ' · Mawëwë';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', p.nombre + ' — ' + cat.resumen);

    var miga = M.$('[data-miga-producto]');
    if (miga) {
      miga.innerHTML =
        '<li><a href="index.html">Inicio</a></li>' +
        '<li><a href="catalogo.html">Catálogo</a></li>' +
        '<li><a href="' + M.urlCategoria(cat.slug) + '">' + M.escapar(cat.nombre) + '</a></li>' +
        '<li aria-current="page">' + M.escapar(p.nombre) + '</li>';
    }

    raiz.innerHTML =
      '<div class="ficha">' +
        '<figure class="ficha__figura" style="margin:0">' +
          '<img src="' + M.escapar(p.img) + '" alt="' + M.escapar(p.nombre) + '" decoding="async">' +
        '</figure>' +
        '<div class="ficha__panel">' +
          '<span class="antetitulo">' + M.escapar(cat.nombre) + '</span>' +
          '<h1 class="ficha__titulo">' + M.escapar(p.nombre) + '</h1>' +
          '<div class="ficha__pastillas">' +
            (p.marca ? '<span class="pastilla pastilla--marca">' + M.escapar(p.marca) + '</span>' : '') +
            (p.detalle ? '<span class="pastilla">' + M.escapar(p.detalle) + '</span>' : '') +
            '<span class="pastilla pastilla--exito"><span class="pastilla__punto"></span>Disponible en tienda</span>' +
          '</div>' +
          '<div class="ficha__precio">' +
            '<strong>Precio a consultar</strong>' +
            '<p>Trabajamos con precios de mostrador y promociones que cambian por temporada. ' +
            'Escribinos y te confirmamos el precio del día, tallas y colores disponibles.</p>' +
          '</div>' +
          '<div class="ficha__acciones">' +
            '<a class="boton boton--wsp boton--bloque" target="_blank" rel="noopener" href="' + M.urlWhatsapp(mensaje) + '">' +
              M.icono('whatsapp') + 'Consultar por WhatsApp</a>' +
            (p.tienda
              ? '<a class="boton boton--oscuro boton--bloque" target="_blank" rel="noopener" href="' + M.escapar(p.tienda) + '">' +
                  M.icono('tienda') + 'Comprar en la tienda en línea</a>'
              : '<a class="boton boton--contorno boton--bloque" target="_blank" rel="noopener" href="' +
                  M.escapar(M.negocio.tienda || '#') + '">' + M.icono('tienda') + 'Ver la tienda en línea</a>') +
          '</div>' +
          '<dl class="ficha__datos">' +
            '<div class="ficha__dato"><dt>Categoría</dt><dd><a href="' + M.urlCategoria(cat.slug) + '">' + M.escapar(cat.nombre) + '</a></dd></div>' +
            '<div class="ficha__dato"><dt>Marca</dt><dd>' + M.escapar(p.marca || 'Mawëwë') + '</dd></div>' +
            (p.detalle ? '<div class="ficha__dato"><dt>Presentación</dt><dd>' + M.escapar(p.detalle) + '</dd></div>' : '') +
            '<div class="ficha__dato"><dt>Referencia</dt><dd>' + M.escapar(p.id.toUpperCase()) + '</dd></div>' +
            '<div class="ficha__dato"><dt>Entrega</dt><dd>Retiro en Lago Agrio o envío a todo el Ecuador (Servientrega / Laar).</dd></div>' +
            '<div class="ficha__dato"><dt>Garantía</dt><dd>Producto original. Cambios dentro de los 8 días con factura.</dd></div>' +
          '</dl>' +
        '</div>' +
      '</div>';

    /* Relacionados: misma categoría, y si faltan, misma marca */
    var relacionados = M.productos.filter(function (x) {
      return x.cat === p.cat && x.id !== p.id;
    });
    if (relacionados.length < 6) {
      M.productos.forEach(function (x) {
        if (x.marca === p.marca && x.id !== p.id && relacionados.indexOf(x) === -1) relacionados.push(x);
      });
    }
    var contRel = M.$('[data-relacionados]');
    if (contRel) {
      contRel.innerHTML = relacionados.slice(0, 8).map(M.tarjetaProducto).join('');
    }
    var tituloRel = M.$('[data-relacionados-titulo]');
    if (tituloRel) tituloRel.textContent = 'Más de ' + cat.nombre;

    /* Datos estructurados para buscadores */
    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.nombre,
      image: [new URL(p.img, window.location.href).href],
      brand: { '@type': 'Brand', name: p.marca || 'Mawëwë' },
      category: cat.nombre,
      sku: p.id,
      description: p.nombre + ' — ' + cat.resumen
    });
    document.head.appendChild(ld);
  }

  /* --- arranque -------------------------------------------------------- */
  function iniciar() {
    montarVitrinas();
    montarCatalogo();
    montarProducto();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
