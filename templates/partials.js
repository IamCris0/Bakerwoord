'use strict';

/* Piezas compartidas por todas las páginas: cabecera, mega menú, pie y los
   paneles flotantes (buscador, lista de deseos, asistente). */

const { site } = require('../data/site.js');
const { categorias, ocasiones } = require('../data/taxonomia.js');
const { productos } = require('../data/productos.js');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const wa = (texto) => `https://wa.me/${site.contacto.whatsapp}?text=${encodeURIComponent(texto)}`;

const cuenta = (fn) => productos.filter(fn).length;

/* ------------------------------------------------------------ cabecera --- */

function megaProductos(b) {
  const cols = [
    [categorias[0]],
    [categorias[2]],
    [categorias[1], categorias[3]],
    [categorias[4], categorias[5]],
  ];

  const destacado = productos.find((p) => p.id === 'lampara-led-base-madera');

  return `
      <div class="mega" role="region" aria-label="Catálogo de productos">
        <div class="mega__grid">
          ${cols
            .map(
              (grupo) => `<div class="mega__col">
            ${grupo
              .map(
                (c) => `
            <p class="mega__title"><i class="fa-solid fa-${c.icono}"></i><a href="${b}${c.id}.html">${esc(c.nombreCorto)}</a></p>
            <div class="mega__list">
              ${c.subcategorias
                .map(
                  (s) =>
                    `<a class="mega__link" href="${b}${c.id}.html?f=${s.id}">${esc(s.nombre)}</a>`
                )
                .join('\n              ')}
            </div>
            <a class="mega__all" href="${b}${c.id}.html">Ver todo <i class="fa-solid fa-arrow-right"></i></a>`
              )
              .join('\n            <div style="height:1.25rem"></div>\n            ')}
          </div>`
            )
            .join('\n          ')}
          <a class="mega__feature" href="${b}${destacado.url}">
            <img src="${b}${destacado.galeria[1] || destacado.imagen}" alt="" loading="lazy" width="268" height="260">
            <div class="mega__feature-body">
              <span class="spec">Lo más pedido</span>
              <h4>${esc(destacado.nombre)}</h4>
              <p>${esc(destacado.resumen)}</p>
            </div>
          </a>
        </div>
      </div>`;
}

function megaOcasiones(b) {
  const grupos = [ocasiones.slice(0, 5), ocasiones.slice(5, 10), ocasiones.slice(10)];
  const titulos = ['Celebraciones', 'Fechas del año', 'Instituciones y más'];

  return `
      <div class="mega" role="region" aria-label="Regalos por ocasión">
        <div class="mega__grid mega__grid--ocasiones">
          ${grupos
            .map(
              (grupo, i) => `<div class="mega__col">
            <p class="mega__title"><i class="fa-solid fa-calendar-day"></i>${titulos[i]}</p>
            <div class="mega__list">
              ${grupo
                .map(
                  (o) =>
                    `<a class="mega__link" href="${b}ocasiones/${o.id}.html">${esc(o.nombre)}<span>${cuenta((p) =>
                      p.ocasiones.includes(o.id)
                    )}</span></a>`
                )
                .join('\n              ')}
            </div>
          </div>`
            )
            .join('\n          ')}
          <a class="mega__feature" href="${b}ocasiones/grados.html">
            <img src="${b}${ocasiones[0].imagen}" alt="" loading="lazy" width="268" height="260">
            <div class="mega__feature-body">
              <span class="spec">Temporada de grados</span>
              <h4>Recuerdos para toda la promoción</h4>
              <p>Desde 20 piezas con el escudo del plantel y el nombre de cada graduado.</p>
            </div>
          </a>
        </div>
      </div>`;
}

function header({ base: b = '', activo = '' } = {}) {
  const link = (href, texto, id, extra = '') =>
    `<a class="nav__link" href="${b}${href}"${activo === id ? ' aria-current="page"' : ''}${extra}>${texto}</a>`;

  return `<div class="ticker">
    <div class="wrap ticker__inner">
      <div class="ticker__msgs" id="ticker">
        ${site.avisos
          .map(
            (a, i) =>
              `<span class="ticker__msg${i === 0 ? ' on' : ''}"><i class="fa-solid fa-bolt"></i>${esc(a)}</span>`
          )
          .join('\n        ')}
      </div>
      <div class="ticker__side">
        <a href="tel:${site.contacto.telefono1Tel}"><i class="fa-solid fa-phone"></i>${site.contacto.telefono1}</a>
        <a href="${b}contacto.html"><i class="fa-regular fa-clock"></i>${site.contacto.horarioCorto}</a>
        <span class="ticker__social">
          ${site.redes
            .map(
              (r) =>
                `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nombre}"><i class="fa-brands fa-${r.icono}"></i></a>`
            )
            .join('\n          ')}
        </span>
      </div>
    </div>
  </div>

  <header class="hdr" id="hdr">
    <div class="wrap hdr__inner">
      <a class="brand" href="${b}index.html" aria-label="${site.nombre} — inicio">
        <img src="${b}${site.logo}" alt="${site.nombre}" width="150" height="46">
      </a>

      <nav class="nav" aria-label="Principal">
        ${link('index.html', 'Inicio', 'home')}
        <div class="nav__item" data-mega>
          <a class="nav__link" href="${b}catalogo.html" aria-expanded="false" aria-haspopup="true">Productos <i class="fa-solid fa-chevron-down nav__caret"></i></a>
          ${megaProductos(b)}
        </div>
        <div class="nav__item" data-mega>
          <a class="nav__link" href="${b}catalogo.html#ocasiones" aria-expanded="false" aria-haspopup="true">Ocasiones <i class="fa-solid fa-chevron-down nav__caret"></i></a>
          ${megaOcasiones(b)}
        </div>
        ${link('corte-materiales.html', 'Corte láser', 'corte-materiales')}
        ${link('nosotros.html', 'El taller', 'nosotros')}
        ${link('contacto.html', 'Contacto', 'contacto')}
      </nav>

      <div class="hdr__actions">
        <button class="icon-btn" id="openFinder" aria-label="Buscar productos" title="Buscar (Ctrl + K)">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button class="icon-btn" id="openWish" aria-label="Ver mi lista de cotización">
          <i class="fa-regular fa-heart"></i>
          <span class="icon-btn__count" id="wishCount">0</span>
        </button>
        <a class="btn btn--wa btn--sm hdr__cta" href="${wa('Hola, quisiera cotizar un trabajo personalizado.')}" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp"></i> Cotizar
        </a>
        <button class="icon-btn burger" id="openDrawer" aria-label="Abrir menú" aria-expanded="false">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>`;
}

/* ------------------------------------------------------- menú móvil --- */

function drawer(b = '') {
  const acc = (icono, titulo, items) => `
      <div class="acc">
        <button class="acc__head" aria-expanded="false">
          <i class="fa-solid fa-${icono}"></i>${titulo}<i class="fa-solid fa-chevron-down acc__chev"></i>
        </button>
        <div class="acc__panel"><div><ul>
          ${items.map((i) => `<li><a href="${b}${i.href}">${esc(i.texto)}</a></li>`).join('\n          ')}
        </ul></div></div>
      </div>`;

  return `<div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Menú" aria-hidden="true">
    <div class="drawer__head">
      <img src="${b}${site.logo}" alt="${site.nombre}" width="130" height="40">
      <button class="icon-btn" id="closeDrawer" aria-label="Cerrar menú"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="drawer__body">
      <div class="acc">
        <a class="acc__head" href="${b}index.html"><i class="fa-solid fa-house"></i>Inicio</a>
      </div>
      ${categorias
        .map((c) =>
          acc(
            c.icono,
            esc(c.nombreCorto),
            [{ href: `${c.id}.html`, texto: `Ver todo · ${c.nombre}` }].concat(
              c.subcategorias.map((s) => ({ href: `${c.id}.html?f=${s.id}`, texto: s.nombre }))
            )
          )
        )
        .join('\n      ')}
      ${acc(
        'calendar-day',
        'Por ocasión',
        ocasiones.map((o) => ({ href: `ocasiones/${o.id}.html`, texto: o.nombre }))
      )}
      <div class="acc"><a class="acc__head" href="${b}catalogo.html"><i class="fa-solid fa-grip"></i>Catálogo completo</a></div>
      <div class="acc"><a class="acc__head" href="${b}nosotros.html"><i class="fa-solid fa-industry"></i>El taller</a></div>
      <div class="acc"><a class="acc__head" href="${b}contacto.html"><i class="fa-solid fa-location-dot"></i>Contacto</a></div>
    </div>
    <div class="drawer__foot">
      <a class="btn btn--wa btn--block" href="${wa('Hola, quisiera cotizar un trabajo personalizado.')}" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i> Escribir por WhatsApp
      </a>
      <a class="btn btn--ghost btn--block" href="tel:${site.contacto.telefono1Tel}">
        <i class="fa-solid fa-phone"></i> ${site.contacto.telefono1}
      </a>
    </div>
  </aside>`;
}

/* -------------------------------------------------------------- pie --- */

function footer(b = '') {
  return `<footer class="foot">
    <div class="wrap foot__grid">
      <div class="foot__brand">
        <img src="${b}${site.logoClaro}" alt="${site.nombre}" width="184" height="54" loading="lazy">
        <p>${esc(site.descripcion)}</p>
        <div class="foot__social">
          ${site.redes
            .map(
              (r) =>
                `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nombre}"><i class="fa-brands fa-${r.icono}"></i></a>`
            )
            .join('\n          ')}
        </div>
      </div>

      <div>
        <h4>Catálogo</h4>
        <ul>
          ${categorias.map((c) => `<li><a href="${b}${c.id}.html">${esc(c.nombreCorto)}</a></li>`).join('\n          ')}
          <li><a href="${b}catalogo.html">Ver todo</a></li>
        </ul>
      </div>

      <div>
        <h4>Ocasiones</h4>
        <ul>
          ${ocasiones
            .slice(0, 8)
            .map((o) => `<li><a href="${b}ocasiones/${o.id}.html">${esc(o.nombre)}</a></li>`)
            .join('\n          ')}
        </ul>
      </div>

      <div>
        <h4>Dónde estamos</h4>
        <ul class="foot__contact">
          <li><i class="fa-solid fa-location-dot"></i><span>${esc(site.contacto.direccion)}<br>${esc(
    site.contacto.referencia
  )}<br>${esc(site.contacto.ciudad)}, ${esc(site.contacto.provincia)}</span></li>
          <li><i class="fa-solid fa-phone"></i><span><a href="tel:${site.contacto.telefono1Tel}">${
    site.contacto.telefono1
  }</a> · <a href="tel:${site.contacto.telefono2Tel}">${site.contacto.telefono2}</a></span></li>
          <li><i class="fa-solid fa-envelope"></i><span><a href="mailto:${site.contacto.email}">${
    site.contacto.email
  }</a></span></li>
          <li><i class="fa-regular fa-clock"></i><span>${esc(site.contacto.horario)}</span></li>
        </ul>
        <div class="foot__pay">
          ${site.bancos
            .map(
              (x) =>
                `<img src="${b}${x.imagen}" alt="${esc(x.nombre)}" loading="lazy" height="26" title="${esc(x.nombre)}">`
            )
            .join('\n          ')}
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="foot__bar">
        <p>© ${new Date().getFullYear()} ${site.nombre} · Nueva Loja, Ecuador</p>
        <nav>
          <a href="${b}catalogo.html">Catálogo</a>
          <a href="${b}nosotros.html">El taller</a>
          <a href="${b}contacto.html">Contacto</a>
          <a href="${wa('Hola, quisiera hacer una consulta.')}" target="_blank" rel="noopener">WhatsApp</a>
        </nav>
      </div>
    </div>
  </footer>`;
}

/* -------------------------------------------------- paneles flotantes --- */

function overlays(b = '') {
  return `<!-- Vista rápida -->
  <div class="modal" id="quickView" role="dialog" aria-modal="true" aria-label="Vista rápida del producto">
    <div class="modal__box">
      <button class="modal__x" data-close-modal aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>
      <div id="quickViewBody"></div>
    </div>
  </div>

  <!-- Visor de imágenes -->
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Imagen ampliada">
    <button class="lightbox__x" data-lb-close aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>
    <button class="lightbox__nav lightbox__nav--prev" data-lb-prev aria-label="Anterior"><i class="fa-solid fa-chevron-left"></i></button>
    <!-- sin src: uno vacío hace que el navegador vuelva a pedir la página entera -->
    <img id="lightboxImg" alt="">
    <button class="lightbox__nav lightbox__nav--next" data-lb-next aria-label="Siguiente"><i class="fa-solid fa-chevron-right"></i></button>
    <span class="lightbox__count" id="lightboxCount"></span>
  </div>

  <!-- Buscador -->
  <div class="finder" id="finder" role="dialog" aria-modal="true" aria-label="Buscar en el catálogo">
    <div class="finder__box">
      <div class="finder__field">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" id="finderInput" placeholder="Buscar lámpara, cúpula, placa, bautizo, acrílico…" autocomplete="off" aria-label="Buscar">
        <span class="finder__esc">ESC</span>
      </div>
      <div class="finder__out" id="finderOut"></div>
    </div>
  </div>

  <!-- Lista de cotización -->
  <aside class="wish" id="wish" aria-label="Mi lista de cotización" aria-hidden="true">
    <div class="wish__head">
      <div>
        <h3>Mi lista</h3>
        <p id="wishSummary">0 piezas guardadas</p>
      </div>
      <button class="icon-btn" id="closeWish" aria-label="Cerrar lista"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="wish__body" id="wishBody"></div>
    <div class="wish__foot">
      <button class="btn btn--wa btn--block" id="wishSend"><i class="fa-brands fa-whatsapp"></i> Pedir cotización de la lista</button>
      <button class="btn btn--ghost btn--block btn--sm" id="wishClear">Vaciar lista</button>
    </div>
  </aside>

  <div class="toasts" id="toasts" aria-live="polite"></div>

  <!-- Asistente -->
  <a class="wa-fab" href="${wa(
    'Hola, quisiera hacer una consulta.'
  )}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>

  <button class="bot-fab" id="botFab" aria-label="Abrir el asistente">
    <span class="bot-fab__dot"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
    ¿Te ayudo a elegir?
  </button>

  <section class="bot" id="bot" role="dialog" aria-modal="false" aria-label="Asistente de Creatividad Láser">
    <header class="bot__head">
      <div class="bot__avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div class="bot__id">
        <h3>Asistente del taller</h3>
        <span>Responde al instante</span>
      </div>
      <button id="botReset" aria-label="Reiniciar conversación" title="Empezar de nuevo"><i class="fa-solid fa-rotate-left"></i></button>
      <button id="botClose" aria-label="Cerrar asistente"><i class="fa-solid fa-xmark"></i></button>
    </header>
    <div class="bot__log" id="botLog"></div>
    <form class="bot__foot" id="botForm">
      <input id="botInput" type="text" placeholder="Escribí tu consulta…" autocomplete="off" aria-label="Mensaje">
      <button class="bot__send" type="submit" aria-label="Enviar"><i class="fa-solid fa-paper-plane"></i></button>
    </form>
  </section>`;
}

module.exports = { header, drawer, footer, overlays, esc, wa, megaProductos, megaOcasiones };
