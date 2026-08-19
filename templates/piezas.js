'use strict';

/* Componentes reutilizables de contenido: tarjeta de producto, cabeceras de
   sección, fila de ocasiones y bloques de confianza. */

const { site } = require('../data/site.js');
const { categorias, ocasiones, categoriaPorId, subcategoriaPorId } = require('../data/taxonomia.js');
const { productos } = require('../data/productos.js');
const { esc, wa } = require('./partials.js');

/* Tarjeta de producto. `b` es el prefijo relativo (''+ o '../'). */
function tarjeta(p, b = '', opciones = {}) {
  const cat = categoriaPorId[p.categoria];
  const alt = p.galeria[1] && p.galeria[1] !== p.imagen ? p.galeria[1] : null;

  return `<article class="card lit" data-id="${p.id}">
        ${p.etiqueta ? `<span class="card__flag">${esc(p.etiqueta)}</span>` : ''}
        <button class="card__fav" data-fav="${p.id}" aria-label="Guardar ${esc(p.nombre)} en mi lista">
          <i class="fa-regular fa-heart"></i>
        </button>
        <a class="card__media" href="${b}${p.url}" tabindex="-1" aria-hidden="true">
          <img src="${b}${p.imagen}" alt="" loading="${opciones.eager ? 'eager' : 'lazy'}" decoding="async" width="400" height="400">
          ${alt ? `<img src="${b}${alt}" alt="" loading="lazy" decoding="async" width="400" height="400">` : ''}
          <span class="card__peek" data-quick="${p.id}"><i class="fa-regular fa-eye"></i> Vista rápida</span>
        </a>
        <div class="card__body">
          <span class="card__cat">${esc(cat ? cat.nombreCorto : '')}</span>
          <h3 class="card__title"><a href="${b}${p.url}">${esc(p.nombre)}</a></h3>
          <p class="card__desc">${esc(p.resumen)}</p>
          <div class="card__foot">
            <span class="card__time"><i class="fa-regular fa-clock"></i>${esc(p.tiempo.replace(' hábiles', ''))}</span>
            <span class="card__go">Ver ficha <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </article>`;
}

function grilla(lista, b = '', opciones = {}) {
  return `<div class="grid-products">
        ${lista.map((p, i) => tarjeta(p, b, { eager: opciones.eager && i < 4 })).join('\n        ')}
      </div>`;
}

function cabecera({ eyebrow, titulo, texto, enlace, textoEnlace, partido = false }) {
  const izq = `<div>
          ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
          <h2 class="${partido ? 't-xl' : 't-xl'}">${titulo}</h2>
          ${texto ? `<p class="lede">${esc(texto)}</p>` : ''}
        </div>`;

  if (!partido) return `<div class="sec-head" data-reveal>${izq}</div>`;

  return `<div class="sec-head sec-head--split" data-reveal>
        ${izq}
        ${enlace ? `<a class="mark-link" href="${enlace}">${esc(textoEnlace)} <i class="fa-solid fa-arrow-right"></i></a>` : ''}
      </div>`;
}

function filaOcasiones(b = '', limite = 14) {
  return `<div class="occasions">
        ${ocasiones
          .slice(0, limite)
          .map((o) => {
            const n = productos.filter((p) => p.ocasiones.includes(o.id)).length;
            return `<a class="occ" href="${b}ocasiones/${o.id}.html">
          <div class="occ__ring">
            <img src="${b}${o.imagen}" alt="" loading="lazy" decoding="async" width="180" height="180">
            <i class="fa-solid fa-${o.icono}"></i>
          </div>
          <span class="occ__name">${esc(o.nombre)}</span>
          <span class="occ__n">${n} opciones</span>
        </a>`;
          })
          .join('\n        ')}
      </div>`;
}

function mosaicoCategorias(b = '') {
  return `<div class="nest">
        ${categorias
          .map((c) => {
            const n = productos.filter((p) => p.categoria === c.id).length;
            return `<article class="tile lit">
          <span class="tile__wash" style="background-image:url('${b}${c.portada}')" aria-hidden="true"></span>
          <div class="tile__body">
            <span class="tile__count">${n} ${n === 1 ? 'producto' : 'productos'}</span>
            <h3>${esc(c.nombre)}</h3>
            <p>${esc(c.bajada)}</p>
            <span class="tile__go">Ver la colección <i class="fa-solid fa-arrow-right"></i></span>
          </div>
          <div class="tile__thumb"><img src="${b}${c.portada}" alt="" loading="lazy" decoding="async"></div>
          <a class="tile__link" href="${b}${c.id}.html" aria-label="${esc(c.nombre)}"></a>
        </article>`;
          })
          .join('\n        ')}
      </div>`;
}

function garantias() {
  return `<section class="guarantees">
      <div class="wrap">
        <div class="guarantees__grid">
          ${site.garantias
            .map(
              (g) => `<div class="guarantee">
            <span class="guarantee__ico"><i class="fa-solid fa-${g.icono}"></i></span>
            <div>
              <h4>${esc(g.titulo)}</h4>
              <p>${esc(g.texto)}</p>
            </div>
          </div>`
            )
            .join('\n          ')}
        </div>
      </div>
    </section>`;
}

function proceso() {
  return `<section class="section section--ink">
      <div class="wrap">
        ${cabecera({
          eyebrow: 'Cómo trabajamos',
          titulo: 'De la idea a la pieza terminada, en cuatro pasos',
          texto: 'No necesitás saber de diseño ni tener archivos listos. Nosotros nos encargamos de la parte técnica.',
        })}
        <div class="steps">
          ${site.proceso
            .map(
              (p, i) => `<article class="step" data-reveal style="--d:${i * 0.07}s">
            <span class="step__ico"><i class="fa-solid fa-${p.icono}"></i></span>
            <h3>${esc(p.titulo)}</h3>
            <p>${esc(p.texto)}</p>
          </article>`
            )
            .join('\n          ')}
        </div>
      </div>
    </section>`;
}

function preguntas(lista = site.faq) {
  return `<div class="faq">
        ${lista
          .map(
            (f) => `<div class="faq__item">
          <button class="faq__q" aria-expanded="false">${esc(f.p)}<i class="fa-solid fa-plus"></i></button>
          <div class="faq__a"><div><p>${esc(f.r)}</p></div></div>
        </div>`
          )
          .join('\n        ')}
      </div>`;
}

/* Devuelve cadena vacía si todavía no hay opiniones reales cargadas:
   la sección entera desaparece en vez de mostrar relleno inventado. */
function testimonios() {
  if (!site.testimonios.length) return '';

  return `<div class="quotes">
        ${site.testimonios
          .map(
            (t, i) => `<blockquote class="quote lit" data-reveal style="--d:${i * 0.06}s">
          <div class="quote__stars" aria-label="5 de 5">★★★★★</div>
          <p>«${esc(t.texto)}»</p>
          <footer>
            <strong>${esc(t.autor)}</strong>
            <span>${esc(t.lugar)} · ${esc(t.motivo)}</span>
          </footer>
        </blockquote>`
          )
          .join('\n        ')}
      </div>`;
}

/* Sección completa de opiniones: se omite del HTML si no hay ninguna cargada */
function seccionTestimonios({ eyebrow = 'Clientes', titulo, clase = 'section' } = {}) {
  if (!site.testimonios.length) return '';

  return `<section class="${clase}">
    <div class="wrap">
      ${cabecera({ eyebrow, titulo: titulo || 'Lo que nos escriben' })}
      ${testimonios()}
    </div>
  </section>`;
}

function cierre(b = '', { titulo, texto } = {}) {
  return `<section class="closer section">
      <div class="wrap closer__grid">
        <div data-reveal>
          <p class="eyebrow">Empecemos</p>
          <h2 class="t-xl">${titulo || 'Contanos qué querés grabar'}</h2>
          <p class="lede">${esc(
            texto ||
              'Mandanos una foto, un texto o una referencia por WhatsApp. Te devolvemos el boceto y el precio exacto, sin compromiso.'
          )}</p>
          <div class="closer__actions">
            <a class="btn btn--wa btn--lg" href="${wa(
              'Hola, quisiera cotizar un trabajo personalizado.'
            )}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Escribir por WhatsApp</a>
            <button class="btn btn--glass btn--lg" data-open-bot><i class="fa-solid fa-wand-magic-sparkles"></i> Ayudame a elegir</button>
          </div>
        </div>
        <div class="closer__card" data-reveal style="--d:.1s">
          <h4>Taller y atención</h4>
          <div class="closer__row"><i class="fa-solid fa-location-dot"></i><span><strong>${esc(
            site.contacto.direccion
          )}</strong>${esc(site.contacto.referencia)} · ${esc(site.contacto.ciudad)}</span></div>
          <div class="closer__row"><i class="fa-solid fa-phone"></i><span><strong>${
            site.contacto.telefono1
          }</strong>${site.contacto.telefono2}</span></div>
          <div class="closer__row"><i class="fa-regular fa-clock"></i><span><strong>${esc(
            site.contacto.horario
          )}</strong>Domingos cerrado</span></div>
          <div class="closer__row"><i class="fa-solid fa-truck-fast"></i><span><strong>Envíos a todo Ecuador</strong>Servientrega con guía de rastreo</span></div>
        </div>
      </div>
    </section>`;
}

function crumbs(items, b = '') {
  return `<nav class="crumbs" aria-label="Ruta">
        ${items
          .map((i, idx) =>
            i.href
              ? `<a href="${b}${i.href}">${esc(i.texto)}</a><i class="fa-solid fa-chevron-right"></i>`
              : `<span aria-current="page">${esc(i.texto)}</span>`
          )
          .join('\n        ')}
      </nav>`;
}

function jsonLdNegocio() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.nombre,
    description: site.descripcion,
    url: site.dominio,
    telephone: site.contacto.telefono1Tel,
    email: site.contacto.email,
    image: site.dominio + '/' + site.logo,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contacto.direccion,
      addressLocality: site.contacto.ciudad,
      addressRegion: site.contacto.provincia,
      addressCountry: 'EC',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    sameAs: site.redes.map((r) => r.url),
  };
}

module.exports = {
  tarjeta,
  grilla,
  cabecera,
  filaOcasiones,
  mosaicoCategorias,
  garantias,
  proceso,
  preguntas,
  testimonios,
  seccionTestimonios,
  cierre,
  crumbs,
  jsonLdNegocio,
};
