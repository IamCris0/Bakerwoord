/* ==========================================================================
   Mawëwë — Asistente "Wë"
   --------------------------------------------------------------------------
   Chatbot 100 % del lado del cliente: no necesita servidor ni API.
   · Menú guiado (categorías, envíos, pagos, horarios, buscador de regalos)
   · Búsqueda real sobre los 400+ productos de assets/data/catalogo.js
   · Cuando no sabe algo, deriva a WhatsApp con el contexto ya escrito
   ========================================================================== */
(function () {
  'use strict';

  var M = window.MAWEWE;
  if (!M) return;

  var N = M.negocio;
  var CLAVE_VISTO = 'mawewe_chat_visto';

  /* --- estructura del widget ------------------------------------------- */
  var lanzador = document.createElement('button');
  lanzador.type = 'button';
  lanzador.className = 'chat-lanzador';
  lanzador.setAttribute('aria-label', 'Abrir el asistente de Mawëwë');
  lanzador.innerHTML = M.icono('chat') + '<span>¿Te ayudo?</span><span class="chat-lanzador__punto"></span>';

  var panel = document.createElement('aside');
  panel.className = 'chat';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Asistente de Mawëwë');
  panel.setAttribute('aria-modal', 'false');
  panel.innerHTML =
    '<header class="chat__cabecera">' +
      '<span class="chat__avatar" aria-hidden="true">W</span>' +
      '<div class="chat__identidad">' +
        '<strong>Wë · Asistente Mawëwë</strong>' +
        '<span class="chat__estado">Respondemos al instante</span>' +
      '</div>' +
      '<button class="chat__cerrar" type="button" aria-label="Cerrar el asistente">' + M.icono('cerrar') + '</button>' +
    '</header>' +
    '<div class="chat__cuerpo" data-chat-cuerpo role="log" aria-live="polite"></div>' +
    '<div class="chat__opciones" data-chat-opciones></div>' +
    '<form class="chat__pie" data-chat-form>' +
      '<label class="solo-lectores" for="chat-entrada">Escribí tu consulta</label>' +
      '<input id="chat-entrada" type="text" autocomplete="off" placeholder="Escribí tu consulta…">' +
      '<button class="chat__enviar" type="submit" aria-label="Enviar">' + M.icono('enviar') + '</button>' +
    '</form>';

  document.body.appendChild(lanzador);
  document.body.appendChild(panel);

  var cuerpo = panel.querySelector('[data-chat-cuerpo]');
  var opciones = panel.querySelector('[data-chat-opciones]');
  var form = panel.querySelector('[data-chat-form]');
  var entrada = form.querySelector('input');

  /* --- helpers de conversación ----------------------------------------- */
  function bajar() { cuerpo.scrollTop = cuerpo.scrollHeight; }

  function burbuja(html, quien) {
    var div = document.createElement('div');
    div.className = 'chat__msj chat__msj--' + (quien || 'bot');
    div.innerHTML = html;
    cuerpo.appendChild(div);
    bajar();
    return div;
  }

  function escribiendo() {
    var div = burbuja('<span class="chat__escribiendo"><span></span><span></span><span></span></span>');
    return div;
  }

  /* Encadena mensajes del bot con una pausa natural entre uno y otro. */
  function decir(mensajes, luego) {
    var lista = [].concat(mensajes);
    opciones.innerHTML = '';
    (function siguiente(i) {
      if (i >= lista.length) { if (luego) luego(); return; }
      var puntos = escribiendo();
      setTimeout(function () {
        puntos.remove();
        burbuja(lista[i]);
        siguiente(i + 1);
      }, Math.min(140 + lista[i].length * 7, 900));
    })(0);
  }

  function proponer(items) {
    opciones.innerHTML = '';
    items.forEach(function (it) {
      if (it.href) {
        var a = document.createElement('a');
        a.className = 'chat__opcion';
        a.href = it.href;
        if (it.externo) { a.target = '_blank'; a.rel = 'noopener'; }
        a.textContent = it.texto;
        opciones.appendChild(a);
        return;
      }
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chat__opcion';
      b.textContent = it.texto;
      b.addEventListener('click', function () {
        burbuja(M.escapar(it.texto), 'yo');
        opciones.innerHTML = '';
        it.accion();
      });
      opciones.appendChild(b);
    });
  }

  function fichas(lista, encabezado) {
    if (!lista.length) return;
    var cont = document.createElement('div');
    cont.className = 'chat__productos';
    cont.innerHTML = lista.map(function (p) {
      return '<a class="chat-producto" href="' + M.urlProducto(p.id) + '">' +
        '<img src="' + M.escapar(p.img) + '" alt="" loading="lazy">' +
        '<span class="chat-producto__texto">' +
          '<strong>' + M.escapar(p.nombre) + '</strong>' +
          '<span>' + M.escapar(p.marca) + '</span>' +
        '</span></a>';
    }).join('');
    if (encabezado) burbuja(encabezado);
    cuerpo.appendChild(cont);
    bajar();
  }

  /* --- menús ------------------------------------------------------------ */
  function menuPrincipal() {
    proponer([
      { texto: '🛍️ Ver categorías', accion: menuDepartamentos },
      { texto: '🎁 Ayudame a elegir un regalo', accion: regaloPaso1 },
      { texto: '🚚 Envíos', accion: respuestaEnvios },
      { texto: '💳 Formas de pago', accion: respuestaPagos },
      { texto: '📍 Dónde estamos', accion: respuestaUbicacion },
      { texto: '🕘 Horarios', accion: respuestaHorario },
      { texto: '💬 Hablar con un asesor', accion: derivar }
    ]);
  }

  function menuDepartamentos() {
    decir('Tenemos ' + M.productos.length + ' productos publicados. ¿Por dónde querés empezar?', function () {
      var items = M.departamentos.map(function (d) {
        return {
          texto: d.nombre,
          accion: function () { menuCategorias(d); }
        };
      });
      items.push({ texto: '← Volver al menú', accion: menuPrincipal });
      proponer(items);
    });
  }

  function menuCategorias(dep) {
    var cats = M.catsDeDepartamento(dep);
    decir(dep.titular + '. Elegí una categoría:', function () {
      var items = cats.map(function (slug) {
        var c = M.categoria(slug);
        return {
          texto: c.corto + ' (' + M.conteo(slug) + ')',
          accion: function () { mostrarCategoria(slug); }
        };
      });
      items.push({ texto: 'Ver todo ' + dep.nombre, href: M.urlDepartamento(dep.slug) });
      items.push({ texto: '← Volver', accion: menuDepartamentos });
      proponer(items);
    });
  }

  function mostrarCategoria(slug) {
    var c = M.categoria(slug);
    var lista = M.productos.filter(function (p) { return p.cat === slug; });
    decir(c.resumen, function () {
      fichas(lista.slice(0, 4), 'Te muestro algunos de los ' + lista.length + ':');
      proponer([
        { texto: 'Ver los ' + lista.length + ' productos', href: M.urlCategoria(slug) },
        { texto: '💬 Consultar precio', accion: function () { derivar('Hola Mawëwë, quisiera precios de la línea ' + c.nombre + '.'); } },
        { texto: '← Otra categoría', accion: menuDepartamentos }
      ]);
    });
  }

  /* --- buscador de regalos --------------------------------------------- */
  var regalo = {};

  function regaloPaso1() {
    regalo = {};
    decir('Con gusto. ¿Para quién es el regalo?', function () {
      proponer([
        { texto: 'Para ella', accion: function () { regalo.para = 'mujer'; regaloPaso2(); } },
        { texto: 'Para él', accion: function () { regalo.para = 'hombre'; regaloPaso2(); } },
        { texto: 'Para una niña', accion: function () { regalo.para = 'nina'; regaloPaso2(); } },
        { texto: 'Para un niño', accion: function () { regalo.para = 'nino'; regaloPaso2(); } },
        { texto: 'Para un bebé', accion: function () { regalo.para = 'bebe'; regaloPaso2(); } },
        { texto: '← Volver', accion: menuPrincipal }
      ]);
    });
  }

  function regaloPaso2() {
    decir('¿Cuál es la ocasión?', function () {
      proponer([
        { texto: 'Cumpleaños', accion: function () { regalo.ocasion = 'cumple'; regaloResultado(); } },
        { texto: 'Aniversario o San Valentín', accion: function () { regalo.ocasion = 'amor'; regaloResultado(); } },
        { texto: 'Grado o logro', accion: function () { regalo.ocasion = 'grado'; regaloResultado(); } },
        { texto: 'Un detalle sin motivo', accion: function () { regalo.ocasion = 'detalle'; regaloResultado(); } }
      ]);
    });
  }

  /* Recetas simples: combinación destinatario + ocasión → categorías. */
  var RECETAS = {
    'mujer:cumple': ['perfumes-mujer', 'joyas-lannel', 'peluches'],
    'mujer:amor': ['detalles', 'perfumes-mujer', 'victoria-secret'],
    'mujer:grado': ['joyas-plata', 'relojes', 'detalles'],
    'mujer:detalle': ['detalles', 'victoria-secret', 'accesorios'],
    'hombre:cumple': ['perfumes-boss-bottled', 'relojes', 'implementos-deportivos'],
    'hombre:amor': ['perfumes-boss-bottled', 'accesorios', 'detalles'],
    'hombre:grado': ['relojes', 'accesorios', 'camisas-camisetas-polo'],
    'hombre:detalle': ['accesorios', 'implementos-deportivos', 'camisas-camisetas-polo'],
    'nina:cumple': ['juguetes-ninas', 'peluches', 'offcorss-nenas'],
    'nina:amor': ['peluches', 'detalles', 'juguetes-ninas'],
    'nina:grado': ['joyas-lannel', 'offcorss-nenas', 'detalles'],
    'nina:detalle': ['peluches', 'juguetes-ninas', 'legos'],
    'nino:cumple': ['juguetes-ninos-avengers', 'legos', 'autos-motos'],
    'nino:amor': ['peluches', 'juguetes-ninos-avengers', 'detalles'],
    'nino:grado': ['legos', 'implementos-deportivos', 'offcorss'],
    'nino:detalle': ['autos-motos', 'legos', 'juguetes-ninos-avengers'],
    'bebe:cumple': ['bebes-fisher-price', 'peluches', 'offcorss-nenas'],
    'bebe:amor': ['peluches', 'bebes-fisher-price', 'detalles'],
    'bebe:grado': ['bebes-fisher-price', 'peluches', 'offcorss'],
    'bebe:detalle': ['bebes-fisher-price', 'peluches', 'offcorss']
  };

  function regaloResultado() {
    var cats = RECETAS[regalo.para + ':' + regalo.ocasion] || ['detalles', 'peluches', 'perfumes-mujer'];
    var seleccion = [];
    cats.forEach(function (slug) {
      var deCat = M.productos.filter(function (p) { return p.cat === slug; });
      if (deCat.length) seleccion.push(deCat[Math.floor(Math.random() * Math.min(deCat.length, 8))]);
    });

    var nombres = cats.map(function (s) {
      var c = M.categoria(s);
      return c ? c.corto : s;
    });

    decir([
      'Perfecto. Para eso lo que más sale es <strong>' + nombres.join('</strong>, <strong>') + '</strong>.',
      'Te dejo tres ideas concretas:'
    ], function () {
      fichas(seleccion);
      proponer([
        { texto: 'Ver ' + nombres[0], href: M.urlCategoria(cats[0]) },
        { texto: '💬 Que me armen el detalle', accion: function () {
            derivar('Hola Mawëwë, quiero un regalo (' + nombres.join(', ') + '). ¿Me ayudan a armarlo?');
          } },
        { texto: '🎁 Probar otra combinación', accion: regaloPaso1 },
        { texto: '← Menú', accion: menuPrincipal }
      ]);
    });
  }

  /* --- respuestas informativas ----------------------------------------- */
  function volver() {
    proponer([
      { texto: '← Volver al menú', accion: menuPrincipal },
      { texto: '💬 Hablar con un asesor', accion: derivar }
    ]);
  }

  function respuestaEnvios() {
    decir([
      'Hacemos <strong>envíos a todo el Ecuador</strong> con Servientrega y Laar Courier.',
      'Los pedidos confirmados y pagados antes de las 15h00 salen el mismo día. ' +
      'Lago Agrio y alrededores: entrega en 24 horas. Resto del país: 2 a 4 días laborables.' +
      '<ul><li>El costo del envío depende del peso y del destino.</li>' +
      '<li>También podés retirar sin costo en la matriz de Lago Agrio.</li></ul>'
    ], volver);
  }

  function respuestaPagos() {
    decir([
      'Podés pagar así:' +
      '<ul>' +
      '<li>Efectivo en el local.</li>' +
      '<li>Transferencia o depósito a Banco Pichincha, Guayaquil o Internacional.</li>' +
      '<li>Tarjeta de crédito y débito (corriente y diferido).</li>' +
      '<li>Pago en línea desde <a href="' + M.escapar(N.tienda) + '" target="_blank" rel="noopener">nuestra tienda</a>.</li>' +
      '</ul>',
      'Para transferencias te enviamos los números de cuenta por WhatsApp y despachamos apenas confirmás el comprobante.'
    ], function () {
      proponer([
        { texto: 'Ver cómo comprar', href: 'pagos.html' },
        { texto: '💬 Pedir números de cuenta', accion: function () { derivar('Hola Mawëwë, ¿me pasan los números de cuenta para transferencia?'); } },
        { texto: '← Menú', accion: menuPrincipal }
      ]);
    });
  }

  function respuestaUbicacion() {
    decir([
      'Nuestra matriz está en <strong>' + M.escapar(N.direccion) + '</strong>, ' + M.escapar(N.ciudad) + '.',
      'Teléfonos: ' + N.telefonos.join(' / ') + '<br>WhatsApp: ' + M.escapar(N.whatsappVisible)
    ], function () {
      proponer([
        { texto: 'Ver el mapa', href: 'contacto.html#mapa' },
        { texto: '🕘 Horarios', accion: respuestaHorario },
        { texto: '← Menú', accion: menuPrincipal }
      ]);
    });
  }

  function respuestaHorario() {
    var filas = N.horario.map(function (h) {
      return '<li><strong>' + M.escapar(h.dias) + ':</strong> ' + M.escapar(h.horas) + '</li>';
    }).join('');
    decir('Atendemos en estos horarios:<ul>' + filas + '</ul>', volver);
  }

  function derivar(mensaje) {
    var texto = typeof mensaje === 'string' ? mensaje : 'Hola Mawëwë, vengo desde la web y necesito ayuda.';
    decir('Te paso con una asesora. Al tocar el botón se abre WhatsApp con el mensaje ya escrito.', function () {
      proponer([
        { texto: '💬 Abrir WhatsApp', href: M.urlWhatsapp(texto), externo: true },
        { texto: '← Volver al menú', accion: menuPrincipal }
      ]);
    });
  }

  /* --- texto libre ------------------------------------------------------ */
  var INTENCIONES = [
    { claves: ['envio', 'enviar', 'delivery', 'domicilio', 'servientrega', 'courier', 'despacho'], accion: respuestaEnvios },
    { claves: ['pago', 'pagar', 'tarjeta', 'transferencia', 'deposito', 'cuenta', 'efectivo', 'diferido'], accion: respuestaPagos },
    { claves: ['horario', 'hora', 'abren', 'cierran', 'abierto', 'domingo', 'sabado'], accion: respuestaHorario },
    { claves: ['donde', 'direccion', 'ubicacion', 'local', 'tienda fisica', 'llegar', 'mapa'], accion: respuestaUbicacion },
    { claves: ['asesor', 'humano', 'persona', 'whatsapp', 'llamar', 'telefono', 'hablar'], accion: derivar },
    { claves: ['regalo', 'sorpresa', 'detalle para', 'no se que', 'idea'], accion: regaloPaso1 },
    { claves: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'saludos'], accion: function () {
        decir('¡Hola! ¿En qué te ayudo?', menuPrincipal);
      } },
    { claves: ['gracias', 'listo', 'chao', 'adios'], accion: function () {
        decir('¡Gracias a vos! Cualquier cosa quedo por acá. 🌟', menuPrincipal);
      } },
    { claves: ['precio', 'cuesta', 'vale', 'cuanto'], accion: function () {
        decir('Los precios cambian por temporada, así que los confirmamos por WhatsApp. ' +
          'Si me decís qué producto te interesa, te lo busco en el catálogo.', function () {
          proponer([
            { texto: '💬 Consultar precio', accion: function () { derivar('Hola Mawëwë, quisiera consultar precios.'); } },
            { texto: '🛍️ Ver categorías', accion: menuDepartamentos },
            { texto: '← Menú', accion: menuPrincipal }
          ]);
        });
      } }
  ];

  function buscar(consulta) {
    var q = M.normalizar(consulta);
    var palabras = q.split(/\s+/).filter(function (w) { return w.length > 2; });
    if (!palabras.length) return [];

    return M.productos.map(function (p) {
      var t = M.normalizar([p.nombre, p.marca, p.detalle, p.cat].join(' '));
      var puntos = 0;
      palabras.forEach(function (w) {
        if (t.indexOf(w) !== -1) puntos += M.normalizar(p.nombre).indexOf(w) !== -1 ? 2 : 1;
      });
      return { p: p, puntos: puntos };
    }).filter(function (r) { return r.puntos > 0; })
      .sort(function (a, b) { return b.puntos - a.puntos; })
      .slice(0, 4)
      .map(function (r) { return r.p; });
  }

  function responder(consulta) {
    var q = M.normalizar(consulta);

    for (var i = 0; i < INTENCIONES.length; i++) {
      var hit = INTENCIONES[i].claves.some(function (k) { return q.indexOf(k) !== -1; });
      if (hit) { INTENCIONES[i].accion(); return; }
    }

    var encontrados = buscar(consulta);
    if (encontrados.length) {
      decir('Encontré esto en el catálogo:', function () {
        fichas(encontrados);
        proponer([
          { texto: 'Ver todos los resultados', href: 'catalogo.html?q=' + encodeURIComponent(consulta) },
          { texto: '💬 Consultar disponibilidad', accion: function () { derivar('Hola Mawëwë, busco: ' + consulta); } },
          { texto: '← Menú', accion: menuPrincipal }
        ]);
      });
      return;
    }

    decir([
      'No encontré nada con «' + M.escapar(consulta) + '» en el catálogo publicado.',
      'Tené en cuenta que en el local manejamos bastante más de lo que está en la web. ' +
      'Preguntale a una asesora y te confirma en el momento.'
    ], function () {
      proponer([
        { texto: '💬 Preguntar por WhatsApp', accion: function () { derivar('Hola Mawëwë, busco: ' + consulta + '. ¿Tienen disponible?'); } },
        { texto: '🛍️ Ver categorías', accion: menuDepartamentos },
        { texto: '← Menú', accion: menuPrincipal }
      ]);
    });
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = entrada.value.trim();
    if (!v) return;
    burbuja(M.escapar(v), 'yo');
    entrada.value = '';
    responder(v);
  });

  /* --- apertura y cierre ------------------------------------------------ */
  var iniciado = false;

  function abrir() {
    panel.setAttribute('data-abierto', '');
    lanzador.setAttribute('data-oculto', '');
    try { localStorage.setItem(CLAVE_VISTO, '1'); } catch (e) { /* modo privado */ }
    if (!iniciado) {
      iniciado = true;
      decir([
        '¡Hola! Soy <strong>Wë</strong>, el asistente de Mawëwë. 👋',
        'Te ayudo a encontrar productos, a elegir un regalo o a resolver dudas de envíos y pagos.'
      ], menuPrincipal);
    }
    setTimeout(function () { entrada.focus(); }, 260);
  }

  function cerrar() {
    panel.removeAttribute('data-abierto');
    lanzador.removeAttribute('data-oculto');
    lanzador.focus();
  }

  lanzador.addEventListener('click', abrir);
  panel.querySelector('.chat__cerrar').addEventListener('click', cerrar);
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && panel.hasAttribute('data-abierto')) cerrar();
  });

  /* Cualquier elemento con data-abrir-chat lanza el asistente. Se escucha en
     el documento para que también funcione en lo que se pinta después
     (el slider, las fichas del catálogo, etc.). */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-abrir-chat]');
    if (b) { ev.preventDefault(); abrir(); }
  });

  /* Primera visita: llamamos la atención sin abrir el panel de golpe. */
  var visto = false;
  try { visto = localStorage.getItem(CLAVE_VISTO) === '1'; } catch (e) { visto = false; }
  if (!visto) {
    setTimeout(function () {
      if (!panel.hasAttribute('data-abierto')) {
        lanzador.style.transform = 'translateY(-4px)';
        setTimeout(function () { lanzador.style.transform = ''; }, 700);
      }
    }, 9000);
  }
})();
