/* =============================================================================
   Ficha de producto: galería, pestañas, compartir y armado del mensaje de
   WhatsApp con los datos de personalización que cargó la persona.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var META = window.CATALOGO_META || { whatsapp: '593989926138' };

  /* ------------------------------------------------------------- galería */
  (function () {
    var pdp = $('#pdp');
    if (!pdp) return;

    var img = $('#pdpImg');
    var stage = $('#pdpStage');
    var thumbs = $$('.pdp__thumb', pdp);
    var fuentes = thumbs.map(function (t) { return $('img', t).getAttribute('src'); });
    var actual = 0;

    function ir(n) {
      if (n === actual || !fuentes[n]) return;
      actual = n;
      img.style.opacity = '0';
      var previa = new Image();
      previa.onload = function () {
        img.src = fuentes[n];
        img.style.opacity = '1';
      };
      previa.onerror = function () {
        img.src = fuentes[n];
        img.style.opacity = '1';
      };
      previa.src = fuentes[n];
      thumbs.forEach(function (t, i) { t.classList.toggle('on', i === n); });
    }

    thumbs.forEach(function (t, n) {
      t.addEventListener('click', function () { ir(n); });
      t.addEventListener('mouseenter', function () { ir(n); });
    });

    if (stage) {
      stage.addEventListener('click', function () {
        if (window.laserLightbox) window.laserLightbox(fuentes, actual);
      });
    }

    /* Flechas del teclado sobre la galería */
    pdp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') ir((actual + 1) % fuentes.length);
      if (e.key === 'ArrowLeft') ir((actual - 1 + fuentes.length) % fuentes.length);
    });
  })();

  /* ------------------------------------------------------------ pestañas */
  (function () {
    var tabs = $$('.panels__tab');
    if (!tabs.length) return;

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var clave = t.getAttribute('data-panel');
        tabs.forEach(function (x) {
          x.classList.toggle('on', x === t);
          x.setAttribute('aria-selected', x === t ? 'true' : 'false');
        });
        $$('[data-panel-body]').forEach(function (p) {
          p.classList.toggle('on', p.getAttribute('data-panel-body') === clave);
        });
      });
    });
  })();

  /* --------------------------------------------- cotización por WhatsApp */
  (function () {
    var boton = $('#pdpQuote');
    var pdp = $('#pdp');
    if (!boton || !pdp) return;

    boton.addEventListener('click', function () {
      var titulo = ($('h1', pdp) || {}).textContent || 'un producto';
      var lineas = [];

      $$('[data-pz]', pdp).forEach(function (campo) {
        var valor = (campo.value || '').trim();
        if (!valor) return;
        if (campo.id === 'pz-cant' && valor === '1') return;
        lineas.push('• ' + campo.getAttribute('data-pz') + ': ' + valor);
      });

      var texto =
        'Hola, quisiera cotizar este producto:\n*' + titulo.trim() + '*\n' +
        location.href + '\n' +
        (lineas.length ? '\n' + lineas.join('\n') + '\n' : '\n') +
        '\n¿Me pueden pasar precio y tiempo de entrega? Gracias.';

      window.open('https://wa.me/' + META.whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  })();

  /* ------------------------------------------------------------ compartir */
  (function () {
    var boton = $('#pdpShare');
    if (!boton) return;

    boton.addEventListener('click', function () {
      var datos = {
        title: document.title,
        text: (document.querySelector('meta[name="description"]') || {}).content || '',
        url: location.href,
      };

      if (navigator.share) {
        navigator.share(datos).catch(function () { /* cancelado */ });
        return;
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () {
          if (window.laserToast) window.laserToast('Enlace copiado', 'link');
        });
        return;
      }

      window.prompt('Copiá el enlace:', location.href);
    });
  })();
})();
