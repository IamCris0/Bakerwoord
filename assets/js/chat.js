/* ==========================================================================
   Agencia Detective — Asistente de admisión

   No simula ser un investigador ni responde preguntas abiertas: hace una
   triaje corto y entrega el caso ya redactado al canal que la agencia
   atiende. Todo ocurre en el navegador; nada se envía ni se almacena.
   ========================================================================== */

(function () {
  'use strict';

  var TELEFONO = '593981428621';
  var TELEFONO_VISIBLE = '098 142 8621';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     Guion de la conversación
     ---------------------------------------------------------------------- */

  var FLUJO = {
    inicio: {
      bot: [
        'Buenas. Soy el asistente de admisión de Agencia Detective.',
        'Le hago cinco preguntas cortas y dejo su caso preparado para que un investigador le responda al grano. Sus respuestas no salen de este dispositivo.'
      ],
      chips: [
        { texto: 'Empezar', siguiente: 'caso' },
        { texto: 'Prefiero llamar ahora', accion: 'llamar', clase: 'chat-chip--quiet' }
      ]
    },

    caso: {
      bot: ['¿Qué necesita esclarecer?'],
      campo: 'Caso',
      chips: [
        { texto: 'Infidelidad de pareja', respuesta: 'Entiendo. Es el caso que más atendemos y suele resolverse en menos días de los que la gente imagina.', siguiente: 'material' },
        { texto: 'Seguimiento a una persona', respuesta: 'De acuerdo. Los seguimientos se planifican por franjas horarias, así que cuanto mejor conozca su rutina, más corto sale el operativo.', siguiente: 'material' },
        { texto: 'Redes sociales o perfiles falsos', respuesta: 'Bien. Trabajamos con fuentes abiertas: no entramos en cuentas ajenas, porque eso es delito y anula la prueba.', siguiente: 'material' },
        { texto: 'Localizar a alguien', respuesta: 'Bien. No entregamos direcciones de registro: comprobamos el domicilio en terreno antes de dárselo.', siguiente: 'material' },
        { texto: 'Asunto laboral o de empresa', respuesta: 'Entendido. Ese tipo de casos exige un nivel de prueba alto porque suele terminar en un despido o una denuncia.', siguiente: 'material' },
        { texto: 'Otra cosa', respuesta: 'Sin problema, lo valoramos igual.', siguiente: 'material' }
      ]
    },

    material: {
      bot: ['¿Qué tiene ya sobre la persona implicada?'],
      campo: 'Datos disponibles',
      chips: [
        { texto: 'Nombre y fotografía', siguiente: 'urgencia' },
        { texto: 'Nombre y dirección', siguiente: 'urgencia' },
        { texto: 'Sólo el nombre', siguiente: 'urgencia' },
        { texto: 'Casi nada, sólo sospechas', respuesta: 'No pasa nada. Se puede empezar con muy poco; sólo lleva algo más de trabajo inicial.', siguiente: 'urgencia' }
      ]
    },

    urgencia: {
      bot: ['¿Con qué urgencia lo necesita?'],
      campo: 'Urgencia',
      chips: [
        { texto: 'Es urgente, hoy mismo', respuesta: 'Anotado como urgente. Hay alguien atendiendo el teléfono a cualquier hora.', siguiente: 'ciudad' },
        { texto: 'Esta semana', siguiente: 'ciudad' },
        { texto: 'Sin prisa, quiero informarme', siguiente: 'ciudad' }
      ]
    },

    ciudad: {
      bot: ['¿En qué ciudad ocurriría el trabajo?'],
      campo: 'Ciudad',
      chips: [
        { texto: 'Guayaquil', siguiente: 'detalle' },
        { texto: 'Quito', siguiente: 'detalle' },
        { texto: 'Cuenca', siguiente: 'detalle' },
        { texto: 'Otra ciudad', entrada: 'Escriba la ciudad', siguiente: 'detalle' }
      ]
    },

    detalle: {
      bot: ['Por último, cuénteme en sus palabras lo que ocurre. Un par de frases bastan.'],
      campo: 'En sus palabras',
      entradaLibre: 'Escriba aquí lo esencial',
      omitir: 'Prefiero contarlo por teléfono',
      siguiente: 'cierre'
    }
  };

  /* ------------------------------------------------------------------------
     Construcción del widget
     ---------------------------------------------------------------------- */

  var respuestas = {};
  var panel, log, composer, launcher, teaser, ultimoFoco;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function icono(paths, extra) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = paths;
    if (extra) svg.setAttribute('class', extra);
    return svg;
  }

  function construir() {
    /* ---- Lanzador ---- */
    launcher = el('button', 'chat-launcher');
    launcher.type = 'button';
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-controls', 'chat-panel');
    launcher.setAttribute('aria-label', 'Abrir el asistente de consulta');
    launcher.appendChild(icono('<path d="M20.5 12.4c0 4.2-3.8 7.6-8.5 7.6-1 0-2-.2-2.9-.5L4 21l1.3-3.6A7.2 7.2 0 0 1 3.5 12.4C3.5 8.2 7.3 4.8 12 4.8s8.5 3.4 8.5 7.6Z"/><path d="M8.8 11.6h.01M12 11.6h.01M15.2 11.6h.01"/>'));
    launcher.appendChild(el('span', 'chat-launcher__dot'));

    var stack = document.querySelector('.float-stack');
    if (stack) stack.insertBefore(launcher, stack.firstChild);
    else document.body.appendChild(launcher);

    /* ---- Aviso emergente ---- */
    teaser = el('div', 'chat-teaser');
    var teaserBtn = el('button', 'chat-teaser__text', '¿Le preparo la consulta? Son cinco preguntas y nadie se entera.');
    teaserBtn.type = 'button';
    teaserBtn.style.cssText = 'background:none;border:0;padding:0;text-align:left;font:inherit;color:inherit;cursor:pointer;';
    var teaserClose = el('button', 'chat-teaser__close');
    teaserClose.type = 'button';
    teaserClose.setAttribute('aria-label', 'Descartar el aviso');
    teaserClose.appendChild(icono('<path d="M6 6l12 12M18 6 6 18"/>'));
    teaser.appendChild(teaserBtn);
    teaser.appendChild(teaserClose);
    document.body.appendChild(teaser);

    teaserBtn.addEventListener('click', function () { ocultarTeaser(true); abrir(); });
    teaserClose.addEventListener('click', function () { ocultarTeaser(true); });

    /* ---- Panel ---- */
    panel = el('section', 'chat-panel');
    panel.id = 'chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', 'chat-title');

    var head = el('div', 'chat-head');
    var marca = el('span', 'chat-head__mark');
    marca.appendChild(icono('<g fill="none" stroke="currentColor" stroke-width="24" stroke-linejoin="miter"><path d="M14 114 L66 14 L118 114"/><path d="M150 114 V14 H176 A50 50 0 0 1 176 114 Z"/></g><path d="M66 58 L92 114 L40 114 Z" fill="#F2A93B" stroke="none"/>'));
    marca.firstChild.setAttribute('viewBox', '0 0 240 128');

    var id = el('div', 'chat-head__id');
    var nombre = el('p', 'chat-head__name', 'Asistente de admisión');
    nombre.id = 'chat-title';
    id.appendChild(nombre);
    id.appendChild(el('p', 'chat-head__state', 'Atención 24 h'));

    var directo = el('a', 'chat-head__action');
    directo.href = 'https://wa.me/' + TELEFONO;
    directo.target = '_blank';
    directo.rel = 'noopener';
    directo.setAttribute('aria-label', 'Escribir directamente por WhatsApp');
    directo.title = 'Escribir directamente por WhatsApp';
    directo.appendChild(icono('<path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z"/><path d="M8.6 9.2c0 3 2.2 5.2 5.2 5.2"/>'));

    var cerrar = el('button', 'chat-head__action');
    cerrar.type = 'button';
    cerrar.setAttribute('aria-label', 'Cerrar el asistente');
    cerrar.appendChild(icono('<path d="M6 6l12 12M18 6 6 18"/>'));
    cerrar.addEventListener('click', function () { cerrarPanel(); });

    head.appendChild(marca);
    head.appendChild(id);
    head.appendChild(directo);
    head.appendChild(cerrar);

    log = el('div', 'chat-log');
    log.setAttribute('role', 'log');
    log.setAttribute('aria-live', 'polite');
    log.setAttribute('aria-atomic', 'false');

    composer = el('div', 'chat-composer');

    panel.appendChild(head);
    panel.appendChild(log);
    panel.appendChild(composer);
    document.body.appendChild(panel);

    launcher.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) cerrarPanel();
      else abrir();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) cerrarPanel();
    });
  }

  /* ------------------------------------------------------------------------
     Apertura y cierre
     ---------------------------------------------------------------------- */

  var iniciado = false;

  function abrir() {
    ultimoFoco = document.activeElement;
    panel.classList.add('is-open');
    document.body.classList.add('chat-open');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Cerrar el asistente de consulta');
    ocultarTeaser(false);

    if (!iniciado) {
      iniciado = true;
      paso('inicio');
    } else {
      var primero = composer.querySelector('button, input');
      if (primero) primero.focus();
    }
  }

  function cerrarPanel() {
    panel.classList.remove('is-open');
    document.body.classList.remove('chat-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Abrir el asistente de consulta');
    if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus();
    else launcher.focus();
  }

  function ocultarTeaser(recordar) {
    teaser.classList.remove('is-visible');
    if (recordar) {
      try { sessionStorage.setItem('ad-teaser', '1'); } catch (e) { /* modo privado */ }
    }
  }

  /* ------------------------------------------------------------------------
     Mensajes
     ---------------------------------------------------------------------- */

  function alFinal() { log.scrollTop = log.scrollHeight; }

  function burbuja(texto, quien) {
    var nodo = el('p', 'chat-msg chat-msg--' + quien, texto);
    log.appendChild(nodo);
    alFinal();
    return nodo;
  }

  function escribiendo() {
    var nodo = el('div', 'chat-typing');
    nodo.appendChild(el('span'));
    nodo.appendChild(el('span'));
    nodo.appendChild(el('span'));
    log.appendChild(nodo);
    alFinal();
    return nodo;
  }

  /** Encadena mensajes del asistente con pausa de escritura entre ellos. */
  function decir(textos, alTerminar) {
    var cola = textos.slice();

    function siguiente() {
      if (!cola.length) { if (alTerminar) alTerminar(); return; }

      var texto = cola.shift();
      var espera = reduceMotion ? 0 : Math.min(240 + texto.length * 9, 900);

      if (!espera) { burbuja(texto, 'bot'); siguiente(); return; }

      var puntos = escribiendo();
      window.setTimeout(function () {
        puntos.remove();
        burbuja(texto, 'bot');
        siguiente();
      }, espera);
    }

    siguiente();
  }

  /* ------------------------------------------------------------------------
     Pasos
     ---------------------------------------------------------------------- */

  function limpiarComposer() { composer.textContent = ''; }

  function paso(nombre) {
    var etapa = FLUJO[nombre];
    if (!etapa) { cierre(); return; }

    limpiarComposer();

    decir(etapa.bot, function () {
      if (etapa.entradaLibre) entradaLibre(etapa);
      else opciones(etapa);
    });
  }

  function opciones(etapa) {
    var chips = el('div', 'chat-chips');

    etapa.chips.forEach(function (opcion) {
      var chip = el('button', 'chat-chip' + (opcion.clase ? ' ' + opcion.clase : ''), opcion.texto);
      chip.type = 'button';

      chip.addEventListener('click', function () {
        if (opcion.accion === 'llamar') {
          burbuja(opcion.texto, 'user');
          limpiarComposer();
          decir(['Perfecto. Marque el ' + TELEFONO_VISIBLE + ' cuando quiera; contestamos a cualquier hora.'], function () {
            accionesFinales(false);
          });
          return;
        }

        burbuja(opcion.texto, 'user');

        // «Otra ciudad» y similares piden precisar antes de continuar.
        if (opcion.entrada) {
          limpiarComposer();
          precisar(etapa, opcion);
          return;
        }

        if (etapa.campo) respuestas[etapa.campo] = opcion.texto;
        limpiarComposer();

        var dichos = opcion.respuesta ? [opcion.respuesta] : [];
        if (dichos.length) decir(dichos, function () { paso(opcion.siguiente); });
        else paso(opcion.siguiente);
      });

      chips.appendChild(chip);
    });

    composer.appendChild(chips);
    composer.appendChild(nota());
    var primero = chips.querySelector('button');
    if (primero) primero.focus();
    alFinal();
  }

  /** Entrada corta para precisar una opción elegida (por ejemplo, la ciudad). */
  function precisar(etapa, opcion) {
    var fila = el('div', 'chat-input-row');
    var campo = el('input', 'chat-input');
    campo.type = 'text';
    campo.placeholder = opcion.entrada;
    campo.setAttribute('aria-label', opcion.entrada);

    var enviar = botonEnviar();
    fila.appendChild(campo);
    fila.appendChild(enviar);
    composer.appendChild(fila);
    composer.appendChild(nota());
    campo.focus();

    function confirmar() {
      var valor = campo.value.trim();
      if (!valor) { campo.focus(); return; }
      burbuja(valor, 'user');
      if (etapa.campo) respuestas[etapa.campo] = valor;
      limpiarComposer();
      paso(opcion.siguiente);
    }

    enviar.addEventListener('click', confirmar);
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); confirmar(); }
    });
  }

  /** Último paso abierto: el usuario escribe con sus palabras o lo omite. */
  function entradaLibre(etapa) {
    var fila = el('div', 'chat-input-row');
    var campo = el('input', 'chat-input');
    campo.type = 'text';
    campo.placeholder = etapa.entradaLibre;
    campo.setAttribute('aria-label', etapa.entradaLibre);

    var enviar = botonEnviar();
    fila.appendChild(campo);
    fila.appendChild(enviar);

    var chips = el('div', 'chat-chips');
    chips.style.marginTop = '0.5rem';
    var omitir = el('button', 'chat-chip chat-chip--quiet', etapa.omitir);
    omitir.type = 'button';
    chips.appendChild(omitir);

    composer.appendChild(fila);
    composer.appendChild(chips);
    composer.appendChild(nota());
    campo.focus();

    function confirmar() {
      var valor = campo.value.trim();
      if (!valor) { campo.focus(); return; }
      burbuja(valor, 'user');
      respuestas[etapa.campo] = valor;
      limpiarComposer();
      paso(etapa.siguiente);
    }

    enviar.addEventListener('click', confirmar);
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); confirmar(); }
    });

    omitir.addEventListener('click', function () {
      burbuja(etapa.omitir, 'user');
      limpiarComposer();
      paso(etapa.siguiente);
    });
  }

  function botonEnviar() {
    var boton = el('button', 'chat-send');
    boton.type = 'button';
    boton.setAttribute('aria-label', 'Enviar respuesta');
    boton.appendChild(icono('<path d="M5 12h13M12 5l7 7-7 7"/>'));
    return boton;
  }

  function nota() {
    return el('p', 'chat-note', 'Sus respuestas no se guardan en ningún servidor');
  }

  /* ------------------------------------------------------------------------
     Cierre
     ---------------------------------------------------------------------- */

  function cierre() {
    var claves = Object.keys(respuestas);

    if (claves.length) {
      var resumen = el('div', 'chat-msg chat-summary');
      resumen.appendChild(el('p', 'chat-summary__title', 'Resumen del caso'));
      var lista = document.createElement('dl');
      claves.forEach(function (clave) {
        lista.appendChild(el('dt', null, clave));
        lista.appendChild(el('dd', null, respuestas[clave]));
      });
      resumen.appendChild(lista);
      log.appendChild(resumen);
      alFinal();
    }

    var conFoto = respuestas['Datos disponibles'] === 'Nombre y fotografía';
    var textos = ['Con esto un investigador ya puede orientarle sin hacerle repetir nada.'];

    if (conFoto) {
      textos.push('Como tiene una fotografía, conviene el formulario completo: ahí se sube directamente. Por WhatsApp tendría que adjuntarla usted en el chat.');
    }

    decir(textos, function () { accionesFinales(conFoto); });
  }

  function accionesFinales(conFoto) {
    limpiarComposer();

    var chips = el('div', 'chat-chips');

    var wa = el('a', 'chat-chip chat-chip--primary', 'Enviar por WhatsApp');
    wa.href = 'https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(mensajeWhatsApp());
    wa.target = '_blank';
    wa.rel = 'noopener';

    var llamar = el('a', 'chat-chip', 'Llamar ' + TELEFONO_VISIBLE);
    llamar.href = 'tel:+' + TELEFONO;

    var formulario = el('a', 'chat-chip' + (conFoto ? ' chat-chip--primary' : ' chat-chip--quiet'),
      conFoto ? 'Subir la foto en el formulario' : 'Abrir el formulario completo');
    formulario.href = rutaContacto();

    if (conFoto) {
      chips.appendChild(formulario);
      chips.appendChild(wa);
    } else {
      chips.appendChild(wa);
      chips.appendChild(formulario);
    }
    chips.appendChild(llamar);

    composer.appendChild(chips);
    composer.appendChild(nota());
    var primero = chips.querySelector('a');
    if (primero) primero.focus();
    alFinal();
  }

  /** El widget vive en las cinco páginas, todas en la misma carpeta. */
  function rutaContacto() { return 'contactos.html'; }

  function mensajeWhatsApp() {
    var lineas = ['*CONSULTA — AGENCIA DETECTIVE*', '_Preparada con el asistente del sitio_', ''];

    Object.keys(respuestas).forEach(function (clave) {
      var valor = respuestas[clave];
      if (clave === 'En sus palabras') lineas.push('', '*' + clave + ':*', valor);
      else lineas.push('*' + clave + ':* ' + valor);
    });

    return lineas.join('\n');
  }

  /* ------------------------------------------------------------------------
     Arranque
     ---------------------------------------------------------------------- */

  function init() {
    construir();

    var descartado = false;
    try { descartado = sessionStorage.getItem('ad-teaser') === '1'; } catch (e) { /* modo privado */ }

    if (!descartado) {
      window.setTimeout(function () {
        if (!panel.classList.contains('is-open')) teaser.classList.add('is-visible');
      }, 7000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
