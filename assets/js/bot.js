/* =============================================================================
   Asistente del taller
   -----------------------------------------------------------------------------
   Hace dos cosas: guía para elegir un regalo (ocasión → para quién → plazo) y
   responde las preguntas que más llegan por WhatsApp. Recomienda productos
   reales leyendo window.CATALOGO, y cuando la consulta se sale de lo que sabe,
   pasa la conversación a WhatsApp con el contexto ya escrito.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };

  var panel = $('#bot');
  var fab = $('#botFab');
  var log = $('#botLog');
  var form = $('#botForm');
  var input = $('#botInput');
  if (!panel || !log) return;

  var CAT = window.CATALOGO || [];
  var META = window.CATALOGO_META || { whatsapp: '593989926138' };
  var BASE = document.body.getAttribute('data-base') || '';
  var abierto = false;
  var arrancado = false;
  var contexto = [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function normaliza(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function wa(texto) {
    return 'https://wa.me/' + META.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  function abajo() {
    log.scrollTop = log.scrollHeight;
  }

  /* -------------------------------------------------------- construcción */
  function decir(texto, quien) {
    var b = document.createElement('div');
    b.className = 'msg msg--' + (quien || 'bot');
    b.innerHTML = String(texto)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    log.appendChild(b);
    abajo();
    return b;
  }

  function escribiendo() {
    var t = document.createElement('div');
    t.className = 'typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(t);
    abajo();
    return t;
  }

  /* Encadena mensajes del bot con pausa de tecleo */
  function responder(pasos) {
    var i = 0;
    (function siguiente() {
      if (i >= pasos.length) return;
      var paso = pasos[i++];
      var t = escribiendo();
      setTimeout(function () {
        t.remove();
        paso();
        siguiente();
      }, Math.min(160 + (paso.espera || 460), 900));
    })();
  }

  function opciones(lista) {
    var caja = document.createElement('div');
    caja.className = 'bot__opts';
    lista.forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'bot__opt';
      b.type = 'button';
      b.textContent = o.texto;
      b.addEventListener('click', function () {
        caja.remove();
        decir(o.texto, 'user');
        contexto.push(o.texto);
        o.hacer();
      });
      caja.appendChild(b);
    });
    log.appendChild(caja);
    abajo();
  }

  function fichas(lista) {
    lista.slice(0, 3).forEach(function (p) {
      var a = document.createElement('a');
      a.className = 'bot__card';
      a.href = BASE + p.u;
      a.innerHTML =
        '<img src="' + BASE + p.i + '" alt="" loading="lazy">' +
        '<span class="bot__card-txt"><strong>' + esc(p.n) + '</strong><span>' + esc(p.t) + '</span></span>' +
        '<i class="fa-solid fa-arrow-right"></i>';
      log.appendChild(a);
    });
    abajo();
  }

  function aWhatsApp(resumen) {
    var texto = 'Hola, vengo de la web.\n' + (resumen || contexto.join(' · ')) + '\n\n¿Me pueden ayudar?';
    window.open(wa(texto), '_blank', 'noopener');
  }

  /* ------------------------------------------------------------ catálogo */
  function porOcasion(id, n) {
    return CAT.filter(function (p) { return p.o.indexOf(id) > -1; })
      .sort(function (a, b) { return b.d - a.d; })
      .slice(0, n || 3);
  }

  function porCategoria(id, n) {
    return CAT.filter(function (p) { return p.c === id; })
      .sort(function (a, b) { return b.d - a.d; })
      .slice(0, n || 3);
  }

  function buscar(consulta, n) {
    var q = normaliza(consulta);
    var palabras = q.split(/\s+/).filter(function (w) { return w.length > 3; });
    if (!palabras.length) return [];

    return CAT.map(function (p) {
      var texto = normaliza(p.n + ' ' + p.r + ' ' + p.m + ' ' + p.s + ' ' + p.o.join(' ') + ' ' + p.e);
      var puntos = 0;
      palabras.forEach(function (w) { if (texto.indexOf(w) > -1) puntos++; });
      return { p: p, puntos: puntos };
    })
      .filter(function (x) { return x.puntos > 0; })
      .sort(function (a, b) { return b.puntos - a.puntos || b.p.d - a.p.d; })
      .slice(0, n || 3)
      .map(function (x) { return x.p; });
  }

  /* ---------------------------------------------------------- guiones */
  var MENU = [
    { texto: 'Ayudame a elegir un regalo', hacer: elegirRegalo },
    { texto: 'Ver lámparas LED', hacer: function () { mostrar('lamparas-led', 'Estas son las bases más pedidas:'); } },
    { texto: 'Estoy organizando un evento', hacer: evento },
    { texto: 'Necesito corte láser por encargo', hacer: corte },
    { texto: 'Precios y formas de pago', hacer: precios },
    { texto: 'Tiempos y envíos', hacer: envios },
  ];

  function inicio() {
    responder([
      function () {
        decir(
          '¡Hola! Soy el asistente de **Creatividad Láser**. Te puedo ayudar a elegir una pieza o resolver dudas de precios, plazos y envíos.'
        );
      },
      function () {
        decir('¿Por dónde empezamos?');
        opciones(MENU);
      },
    ]);
  }

  function volver() {
    return { texto: 'Volver al menú', hacer: function () { decir('¿En qué más te ayudo?'); opciones(MENU); } };
  }

  function hablar() {
    return {
      texto: 'Prefiero hablar con alguien',
      hacer: function () {
        decir('Perfecto, te paso con el taller por WhatsApp con lo que ya conversamos.');
        aWhatsApp();
      },
    };
  }

  function mostrar(categoria, intro) {
    var lista = porCategoria(categoria, 3);
    responder([
      function () { decir(intro); },
      function () {
        fichas(lista);
        opciones([
          { texto: 'Ver toda la categoría', hacer: function () { location.href = BASE + categoria + '.html'; } },
          volver(),
          hablar(),
        ]);
      },
    ]);
  }

  /* Guía de regalo: ocasión → destinatario → cierre */
  function elegirRegalo() {
    responder([
      function () { decir('Buenísimo. ¿Para qué ocasión es?'); },
      function () {
        opciones([
          { texto: 'Cumpleaños', hacer: function () { sugerir('cumpleanos'); } },
          { texto: 'Aniversario o San Valentín', hacer: function () { sugerir('aniversario'); } },
          { texto: 'Día de la Madre', hacer: function () { sugerir('madre'); } },
          { texto: 'Día del Padre', hacer: function () { sugerir('padre'); } },
          { texto: 'Graduación', hacer: function () { sugerir('grados'); } },
          { texto: 'Otra ocasión', hacer: otraOcasion },
        ]);
      },
    ]);
  }

  function sugerir(ocasion) {
    var lista = porOcasion(ocasion, 3);
    responder([
      function () { decir('Estas tres son las que más se llevan para esa fecha:'); },
      function () {
        fichas(lista);
        decir('Todas se personalizan con foto, nombre o dedicatoria. ¿Querés afinar la búsqueda?');
        opciones([
          {
            texto: 'Ver todo lo de esta ocasión',
            hacer: function () { location.href = BASE + 'ocasiones/' + ocasion + '.html'; },
          },
          { texto: 'Lo necesito para esta semana', hacer: urgente },
          hablar(),
          volver(),
        ]);
      },
    ]);
  }

  function otraOcasion() {
    responder([
      function () {
        decir('Contame para qué es —bautizo, baby shower, boda, día del maestro, Navidad, empresa— y te muestro opciones.');
      },
    ]);
  }

  function urgente() {
    var rapidos = CAT.filter(function (p) { return p.dias <= 3; }).slice(0, 3);
    responder([
      function () {
        decir(
          'Con poco tiempo lo mejor son los modelos que ya están diseñados: se entregan en **1 a 3 días hábiles**.'
        );
      },
      function () {
        if (rapidos.length) fichas(rapidos);
        decir('Escribinos ahora para reservar el cupo de producción de esta semana.');
        opciones([hablar(), volver()]);
      },
    ]);
  }

  function evento() {
    responder([
      function () { decir('¿Qué tipo de evento estás organizando?'); },
      function () {
        opciones([
          { texto: 'Grado o promoción', hacer: function () { sugerir('grados'); } },
          { texto: 'Boda', hacer: function () { sugerir('matrimonios'); } },
          { texto: 'Bautizo o baby shower', hacer: function () { sugerir('bautizos'); } },
          { texto: 'Evento de empresa', hacer: function () { sugerir('corporativo'); } },
        ]);
      },
    ]);
  }

  function corte() {
    responder([
      function () {
        decir(
          'Cortamos **acrílico, madera, MDF, cuero, papel, cartulina y cartón**, hasta 60 × 90 cm por pieza.\n\nAceptamos archivos AI, SVG, DXF y PDF. Si no tenés vector, lo dibujamos nosotros.'
        );
      },
      function () {
        fichas(porCategoria('corte-materiales', 3));
        opciones([
          { texto: 'Ver el servicio completo', hacer: function () { location.href = BASE + 'corte-materiales.html'; } },
          {
            texto: 'Enviar mi archivo',
            hacer: function () {
              decir('Mandalo por WhatsApp con las medidas y la cantidad y te cotizamos.');
              aWhatsApp('Consulta de corte láser por encargo.');
            },
          },
          volver(),
        ]);
      },
    ]);
  }

  function precios() {
    responder([
      function () {
        decir(
          'No publicamos precios porque cada pieza cambia según **material, tamaño, cantidad y complejidad del grabado**. Cotizamos una por una, sin costo.'
        );
      },
      function () {
        decir(
          'Formas de pago: transferencia o depósito a Pichincha, Guayaquil o Internacional, y efectivo en el taller. Para pedidos personalizados pedimos **50% de anticipo**.'
        );
        opciones([
          { texto: 'Quiero cotizar algo', hacer: hablar().hacer },
          volver(),
        ]);
      },
    ]);
  }

  function envios() {
    responder([
      function () {
        decir(
          '**Producción:** 3 a 5 días hábiles desde que aprobás el boceto. Los modelos ya diseñados salen en 1 a 3 días.'
        );
      },
      function () {
        decir(
          '**Envíos:** a todo el Ecuador por Servientrega con número de guía. El vidrio y el acrílico van con doble empaque.\n\n**Retiro:** en el taller de Nueva Loja, de lunes a sábado de 09:00 a 20:00.'
        );
        opciones([{ texto: 'Consultar por mi ciudad', hacer: hablar().hacer }, volver()]);
      },
    ]);
  }

  /* --------------------------------------------------- texto libre */
  var REGLAS = [
    { claves: ['precio', 'cuesta', 'costo', 'vale', 'cuanto', 'pago', 'tarjeta', 'transferencia'], hacer: precios },
    { claves: ['envio', 'entrega', 'demora', 'tiempo', 'cuando', 'guia', 'servientrega', 'plazo'], hacer: envios },
    { claves: ['urgente', 'rapido', 'manana', 'hoy', 'mismo dia'], hacer: urgente },
    { claves: ['corte', 'cortar', 'archivo', 'vector', 'medida', 'maqueta', 'plancha'], hacer: corte },
    { claves: ['direccion', 'donde', 'ubicacion', 'taller', 'local', 'llegar', 'horario'], hacer: donde },
    { claves: ['regalo', 'obsequio', 'detalle', 'sorpresa'], hacer: elegirRegalo },
    { claves: ['evento', 'grado', 'boda', 'matrimonio', 'bautizo', 'baby', 'promocion'], hacer: evento },
    { claves: ['factura', 'ruc', 'empresa', 'institucion', 'municipio'], hacer: institucional },
  ];

  function donde() {
    responder([
      function () {
        decir(
          'Estamos en **Calle 12 de Febrero 1913**, entre Av. Quito y Jorge Añazco, junto al Banco Pichincha, en Nueva Loja (Lago Agrio).\n\nAtendemos de lunes a sábado, de 09:00 a 20:00.'
        );
        opciones([
          {
            texto: 'Cómo llegar',
            hacer: function () {
              window.open('https://maps.google.com/?q=Creatividad+Laser+Lago+Agrio+Ecuador', '_blank', 'noopener');
            },
          },
          volver(),
        ]);
      },
    ]);
  }

  function institucional() {
    responder([
      function () {
        decir(
          'Sí, trabajamos con empresas e instituciones y **emitimos factura**. Hacemos placas de reconocimiento, medallas, señalética, llaveros publicitarios y regalos corporativos.'
        );
      },
      function () {
        fichas(porCategoria('placas-reconocimientos', 3));
        decir('Pasanos el logo y la cantidad y te armamos la propuesta con precio escalonado.');
        opciones([hablar(), volver()]);
      },
    ]);
  }

  function interpretar(texto) {
    var q = normaliza(texto);

    for (var i = 0; i < REGLAS.length; i++) {
      var regla = REGLAS[i];
      for (var j = 0; j < regla.claves.length; j++) {
        if (q.indexOf(regla.claves[j]) > -1) {
          regla.hacer();
          return;
        }
      }
    }

    var hits = buscar(texto, 3);
    if (hits.length) {
      responder([
        function () { decir('Encontré esto en el catálogo:'); },
        function () {
          fichas(hits);
          opciones([{ texto: 'No es lo que buscaba', hacer: hablar().hacer }, volver()]);
        },
      ]);
      return;
    }

    responder([
      function () {
        decir(
          'No estoy seguro de haber entendido. Puedo ayudarte con productos, precios, plazos y envíos — o te paso directo con el taller.'
        );
      },
      function () {
        opciones([hablar()].concat(MENU.slice(0, 3)));
      },
    ]);
  }

  /* --------------------------------------------------------- interfaz */
  function abrir() {
    panel.classList.add('on');
    if (fab) fab.classList.add('hide');
    abierto = true;
    if (!arrancado) {
      arrancado = true;
      inicio();
    }
    setTimeout(function () { if (input) input.focus(); }, 260);
  }

  function cerrar() {
    panel.classList.remove('on');
    if (fab) fab.classList.remove('hide');
    abierto = false;
  }

  if (fab) fab.addEventListener('click', abrir);
  var cerrarBtn = $('#botClose');
  if (cerrarBtn) cerrarBtn.addEventListener('click', cerrar);

  var reset = $('#botReset');
  if (reset) {
    reset.addEventListener('click', function () {
      log.innerHTML = '';
      contexto = [];
      inicio();
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var texto = (input.value || '').trim();
      if (!texto) return;
      decir(texto, 'user');
      contexto.push(texto);
      input.value = '';
      interpretar(texto);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && abierto) cerrar();
  });

  window.laserBot = { abrir: abrir, cerrar: cerrar };
})();
