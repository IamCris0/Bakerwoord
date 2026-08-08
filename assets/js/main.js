/* ==========================================================================
   Agencia Detective — Comportamiento del sitio
   Sin dependencias. Cada módulo se activa sólo si su marcado existe.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     Cabecera: fondo sólido al separarse del borde superior
     ---------------------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ------------------------------------------------------------------------
     Navegación móvil
     ---------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Al pasar a escritorio, deshacer cualquier estado móvil pendiente.
    window.matchMedia('(min-width: 1001px)').addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------------
     Revelado progresivo al entrar en pantalla
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (item) {
      // Escalonado por posición dentro de su propio grupo, no del documento.
      var position = Array.prototype.indexOf.call(item.parentElement.children, item);
      item.style.setProperty('--reveal-delay', Math.min(position, 5) * 80 + 'ms');
      observer.observe(item);
    });
  }

  /* ------------------------------------------------------------------------
     Pestañas accesibles (patrón tablist del APG)
     ---------------------------------------------------------------------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
      var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
      if (!tabs.length) return;

      function select(index, setFocus) {
        tabs.forEach(function (tab, i) {
          var active = i === index;
          tab.setAttribute('aria-selected', String(active));
          tab.setAttribute('tabindex', active ? '0' : '-1');
          if (panels[i]) panels[i].hidden = !active;
        });
        if (setFocus) tabs[index].focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () { select(index, false); });

        tab.addEventListener('keydown', function (event) {
          var next = null;
          if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
          else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = tabs.length - 1;
          if (next === null) return;
          event.preventDefault();
          select(next, true);
        });
      });

      var initial = tabs.findIndex(function (tab) { return tab.getAttribute('aria-selected') === 'true'; });
      select(initial < 0 ? 0 : initial, false);
    });
  }

  /* ------------------------------------------------------------------------
     Contadores
     ---------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    function render(el, value) {
      el.textContent = (el.dataset.prefix || '') + value + (el.dataset.suffix || '');
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) { render(el, Number(el.dataset.countTo)); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);

        var target = Number(el.dataset.countTo);
        var duration = 1400;
        var start = null;

        function step(timestamp) {
          if (start === null) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          render(el, Math.round(target * eased));
          if (progress < 1) window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      render(el, 0);
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     Volver arriba
     ---------------------------------------------------------------------- */
  function initToTop() {
    var button = document.querySelector('.to-top');
    if (!button) return;

    var ticking = false;

    function update() {
      button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    update();
  }

  /* ------------------------------------------------------------------------
     Formulario de consulta

     No hay servidor detrás del sitio: el formulario valida en el navegador y
     entrega el mensaje ya redactado por WhatsApp, que es el canal que la
     agencia atiende. El correo queda como alternativa visible.
     ---------------------------------------------------------------------- */
  function initForm() {
    var form = document.querySelector('[data-consulta-form]');
    if (!form) return;

    var status = form.querySelector('.form__status');
    var phone = form.dataset.whatsapp || '';

    function fieldOf(control) { return control.closest('.field'); }

    function messageFor(control) {
      if (control.type === 'checkbox') return 'Necesitamos su autorización para poder responderle.';
      if (control.validity.valueMissing) return 'Este dato es necesario para responderle.';
      if (control.validity.typeMismatch && control.type === 'email') return 'Revise el formato del correo.';
      if (control.validity.tooShort) return 'Amplíe un poco más para que podamos orientarle.';
      return 'Revise este campo.';
    }

    function validate(control) {
      var wrapper = fieldOf(control);
      if (!wrapper) return control.checkValidity();

      var slot = wrapper.querySelector('.field__error');
      var valid = control.checkValidity();

      wrapper.classList.toggle('has-error', !valid);
      control.setAttribute('aria-invalid', String(!valid));
      if (slot) slot.textContent = valid ? '' : messageFor(control);

      return valid;
    }

    form.querySelectorAll('input, select, textarea').forEach(function (control) {
      if (control.type === 'file') return;
      control.addEventListener('blur', function () { validate(control); });
      control.addEventListener('input', function () {
        if (fieldOf(control) && fieldOf(control).classList.contains('has-error')) validate(control);
      });
    });

    /* --- Fotografía de la persona a investigar --- */

    var photoInput = form.querySelector('#obj_foto');
    var photoPreview = form.querySelector('[data-photo-preview]');
    var photoThumb = form.querySelector('[data-photo-thumb]');
    var photoName = form.querySelector('[data-photo-name]');
    var photoSize = form.querySelector('[data-photo-size]');
    var photoRemove = form.querySelector('[data-photo-remove]');
    var photoError = form.querySelector('[data-photo-error]');
    var MAX_BYTES = 8 * 1024 * 1024;
    var thumbUrl = null;

    function humanSize(bytes) {
      if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1).replace('.', ',') + ' MB';
    }

    function clearPhoto() {
      if (thumbUrl) { URL.revokeObjectURL(thumbUrl); thumbUrl = null; }
      if (photoInput) photoInput.value = '';
      if (photoPreview) photoPreview.hidden = true;
      if (photoThumb) photoThumb.removeAttribute('src');
    }

    function currentPhoto() {
      return photoInput && photoInput.files && photoInput.files[0] ? photoInput.files[0] : null;
    }

    if (photoInput) {
      photoInput.addEventListener('change', function () {
        var file = currentPhoto();
        if (photoError) photoError.textContent = '';
        if (!file) { clearPhoto(); return; }

        if (!/^image\//.test(file.type)) {
          if (photoError) photoError.textContent = 'El archivo debe ser una imagen.';
          clearPhoto();
          return;
        }

        if (file.size > MAX_BYTES) {
          if (photoError) photoError.textContent = 'La imagen supera los 8 MB. Envíe una más ligera.';
          clearPhoto();
          return;
        }

        if (thumbUrl) URL.revokeObjectURL(thumbUrl);
        thumbUrl = URL.createObjectURL(file);
        if (photoThumb) photoThumb.src = thumbUrl;
        if (photoName) photoName.textContent = file.name;
        if (photoSize) photoSize.textContent = humanSize(file.size);
        if (photoPreview) photoPreview.hidden = false;
      });
    }

    if (photoRemove) {
      photoRemove.addEventListener('click', function () {
        clearPhoto();
        if (photoError) photoError.textContent = '';
        if (photoInput) photoInput.focus();
      });
    }

    /* --- Redacción del mensaje ---
       WhatsApp interpreta *texto* como negrita. Los campos vacíos no se
       imprimen: un mensaje con quince líneas «no indicado» es ilegible para
       quien lo recibe. */

    function buildMessage(data, hasPhoto) {
      var parts = ['*CONSULTA — AGENCIA DETECTIVE*', '_Enviada desde agencia-detective.com_'];

      function section(title, rows) {
        var filled = rows.filter(function (row) { return row[1] && String(row[1]).trim(); });
        if (!filled.length) return;
        parts.push('', '*' + title + '*');
        filled.forEach(function (row) {
          var value = String(row[1]).trim();
          // Los campos largos van en su propia línea para que se lean bien.
          parts.push(value.indexOf('\n') >= 0 ? row[0] + ':\n' + value : row[0] + ': ' + value);
        });
      }

      section('SOLICITANTE', [
        ['Nombre', data.get('nombre')],
        ['Teléfono', data.get('telefono')],
        ['Correo', data.get('email')],
        ['Ciudad', data.get('ciudad')]
      ]);

      section('ENCARGO', [
        ['Tipo de caso', data.get('servicio')],
        ['Detalle', data.get('mensaje')]
      ]);

      section('PERSONA A INVESTIGAR', [
        ['Nombre', data.get('obj_nombre')],
        ['Relación', data.get('obj_relacion')],
        ['Edad', data.get('obj_edad')],
        ['Documento', data.get('obj_documento')],
        ['Teléfono', data.get('obj_telefono')],
        ['Ciudad y sector', data.get('obj_ciudad')],
        ['Domicilio', data.get('obj_direccion')],
        ['Trabajo', data.get('obj_trabajo')],
        ['Vehículo', data.get('obj_vehiculo')],
        ['Redes sociales', data.get('obj_redes')],
        ['Rutina', data.get('obj_rutina')]
      ]);

      if (hasPhoto) {
        parts.push('', '*FOTOGRAFÍA*', 'Se adjunta imagen de la persona a investigar.');
      }

      return parts.join('\n');
    }

    function announce(text) {
      if (!status) return;
      status.hidden = false;
      status.textContent = text;
      status.focus();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var controls = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
      var firstInvalid = null;

      controls.forEach(function (control) {
        if (control.type === 'file') return;
        if (!validate(control) && !firstInvalid) firstInvalid = control;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var photo = currentPhoto();
      var text = buildMessage(new FormData(form), !!photo);

      function openWhatsApp() {
        window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(text), '_blank', 'noopener');

        if (photo) {
          // El enlace de WhatsApp sólo transporta texto. La vista previa se deja
          // en pantalla para que la fotografía siga a mano al adjuntarla.
          announce('Abrimos WhatsApp con su consulta. Falta la fotografía: adjúntela en el chat, la tiene aquí debajo. Si no se abrió, escríbanos a info@agencia-detective.com.');
          return;
        }

        announce('Abrimos WhatsApp con su consulta lista para enviar. Si no se abrió, escríbanos a info@agencia-detective.com.');
        form.reset();
      }

      // La compartición nativa sólo se usa en dispositivos táctiles. En Chrome
      // de escritorio existe la API, pero abre la hoja del sistema operativo,
      // donde WhatsApp casi nunca aparece: ahí el enlace wa.me es más fiable.
      var esTactil = window.matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints > 0;

      var puedeCompartirFoto = !!photo && esTactil &&
        typeof navigator.share === 'function' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [photo] });

      if (!puedeCompartirFoto) {
        openWhatsApp();
        return;
      }

      navigator.share({ text: text, files: [photo] }).then(function () {
        announce('Consulta compartida con la fotografía. Un investigador le responde en breve.');
        clearPhoto();
        form.reset();
      }).catch(function (error) {
        // Cancelar la hoja de compartir no es un error y no merece aviso.
        if (error && error.name === 'AbortError') return;
        openWhatsApp();
      });
    });
  }

  /* ------------------------------------------------------------------------
     Año en curso en el pie
     ---------------------------------------------------------------------- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------------------
     Portada: si el video no puede reproducirse, el velo y el fondo tinta
     mantienen la composición intacta.
     ---------------------------------------------------------------------- */
  function initHeroVideo() {
    var video = document.querySelector('.hero__video');
    if (!video) return;

    if (reduceMotion) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    var attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(function () { /* Reproducción bloqueada: se deja el póster. */ });
    }
  }

  function init() {
    initHeader();
    initNav();
    initReveal();
    initTabs();
    initCounters();
    initToTop();
    initForm();
    initYear();
    initHeroVideo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
