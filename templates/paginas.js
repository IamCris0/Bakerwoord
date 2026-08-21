'use strict';

const { site, IMG } = require('../data/site.js');
const { categorias, ocasiones } = require('../data/taxonomia.js');
const { productos } = require('../data/productos.js');
const { esc, wa } = require('./partials.js');
const P = require('./piezas.js');

/* Cabecera de página con fondo de ambiente y una pieza a resolución real */
function pagehead({ eyebrow, titulo, texto, imagen, crumbs, base = '' }) {
  return `<section class="pagehead">
    ${imagen ? `<span class="pagehead__wash" style="background-image:url('${base}${imagen}')" aria-hidden="true"></span>` : ''}
    <div class="wrap">
      ${crumbs || ''}
      <div class="pagehead__body">
        ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
        <h1 class="t-xl">${esc(titulo)}</h1>
        ${texto ? `<p>${esc(texto)}</p>` : ''}
      </div>
    </div>
    ${
      imagen
        ? `<div class="pagehead__art"><img src="${base}${imagen}" alt="" loading="lazy" decoding="async"></div>`
        : ''
    }
  </section>`;
}

/* --------------------------------------------------------------- taller --- */
function nosotros() {
  /* Sólo se menciona el año si está confirmado en data/site.js */
  const desde = site.fundacion ? ` desde ${site.fundacion}` : '';
  const anios = site.fundacion ? new Date().getFullYear() - site.fundacion : null;

  return `${pagehead({
    eyebrow: 'El taller',
    titulo: `Cortamos y grabamos en Nueva Loja${desde}`,
    texto:
      'Somos un taller de producción propia. La máquina, el diseño y el armado están en el mismo lugar, y eso es lo que nos deja responder rápido y corregir a mitad de camino.',
    imagen: IMG + '/productos/acrilico/5.png',
    crumbs: P.crumbs([{ texto: 'Inicio', href: 'index.html' }, { texto: 'El taller' }]),
  })}

  <section class="section">
    <div class="wrap split">
      <div data-reveal>
        <p class="eyebrow">Cómo trabajamos</p>
        <h2 class="t-lg">Todo pasa por la misma mesa</h2>
        <p class="lede">
          El diseño, el corte, el armado y el empaque ocurren en un solo lugar, en la
          Calle 12 de Febrero. No tercerizamos el grabado ni importamos piezas
          armadas: por eso podemos parar una producción a mitad de camino si el
          cliente quiere cambiar una foto o corregir un nombre.
        </p>
        <p class="lede" style="margin-top:1rem">
          Atendemos lo mismo un pedido de una sola pieza —una lámpara con la foto de la
          familia— que una producción de varios cientos de recuerdos para un colegio o un
          municipio, con factura.
        </p>
        <div class="figures">
          ${
            anios
              ? `<div class="figure"><p class="figure__n">${anios}<em>+</em></p><p>años cortando en Sucumbíos</p></div>`
              : `<div class="figure"><p class="figure__n">100<em>%</em></p><p>producción propia en Lago Agrio</p></div>`
          }
          <div class="figure"><p class="figure__n">${productos.length}</p><p>productos en catálogo</p></div>
          <div class="figure"><p class="figure__n">${site.materiales.length}</p><p>materiales que procesamos</p></div>
          <div class="figure"><p class="figure__n">${categorias.length}</p><p>líneas de trabajo</p></div>
        </div>
      </div>
      <div class="split__media lit" data-reveal style="--d:.08s">
        <img src="${IMG}/productos/madera-mdf/6.png" alt="Caja de madera calada a láser en el taller" loading="lazy" decoding="async">
        <div class="split__note">
          <strong>${esc(site.contacto.direccion)}</strong>
          <span>${esc(site.contacto.referencia)} · ${esc(site.contacto.ciudad)}</span>
        </div>
      </div>
    </div>
  </section>

  ${P.proceso()}

  <section class="section">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Qué entra en la máquina',
        titulo: 'Materiales y espesores que trabajamos',
        texto: 'Si tenés un material que no está en la lista, traé una muestra: hacemos una prueba en un retazo antes de aceptar el trabajo.',
      })}
      <div class="materials">
        ${site.materiales
          .map(
            (m, i) => `<article class="material lit" data-reveal style="--d:${i * 0.05}s">
          <div class="material__img"><img src="${m.imagen}" alt="${esc(m.nombre)}" loading="lazy" decoding="async" width="320" height="240"></div>
          <div class="material__body">
            <h4>${esc(m.nombre)}</h4>
            <span class="spec">${esc(m.espesor)}</span>
            <p>${esc(m.nota)}</p>
          </div>
        </article>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Lo que hacemos',
        titulo: 'Seis líneas de trabajo',
        partido: true,
        enlace: 'catalogo.html',
        textoEnlace: 'Ver catálogo completo',
      })}
      ${P.mosaicoCategorias('')}
    </div>
  </section>

  <section class="section section--ink">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Trabajos entregados',
        titulo: 'Piezas que salieron de acá',
      })}
      ${P.mosaicoTrabajos(site.galeriaTaller)}
    </div>
  </section>

  ${P.seccionTestimonios()}

  ${P.cierre('')}`;
}

/* ------------------------------------------------------------- contacto --- */
function contacto() {
  return `${pagehead({
    eyebrow: 'Contacto',
    titulo: 'Hablemos de lo que necesitás grabar',
    texto: 'La vía más rápida es WhatsApp: mandás la foto o la idea y te respondemos con el boceto y el precio dentro del horario de taller.',
    imagen: IMG + '/productos/placas-personalizadas/17.jpg',
    crumbs: P.crumbs([{ texto: 'Inicio', href: 'index.html' }, { texto: 'Contacto' }]),
  })}

  <section class="section">
    <div class="wrap split">
      <div data-reveal>
        <p class="eyebrow">Escribinos</p>
        <h2 class="t-lg">Tres formas de empezar el pedido</h2>
        <p class="lede" style="margin-top:1rem">
          Contanos qué pieza querés, para cuándo la necesitás y cuántas unidades.
          Con esos tres datos te podemos cotizar en el momento.
        </p>

        <div class="checks">
          <div class="check">
            <i class="fa-brands fa-whatsapp"></i>
            <div>
              <strong>WhatsApp — la vía más rápida</strong>
              <span><a class="mark-link" href="tel:${site.contacto.telefono1Tel}">${
    site.contacto.telefono1
  }</a> · <a class="mark-link" href="tel:${site.contacto.telefono2Tel}">${site.contacto.telefono2}</a></span>
            </div>
          </div>
          <div class="check">
            <i class="fa-solid fa-envelope"></i>
            <div>
              <strong>Correo — para pedidos institucionales</strong>
              <span><a class="mark-link" href="mailto:${site.contacto.email}">${site.contacto.email}</a> · adjuntá logo y cantidad requerida</span>
            </div>
          </div>
          <div class="check">
            <i class="fa-solid fa-location-dot"></i>
            <div>
              <strong>En el taller — para ver muestras</strong>
              <span>${esc(site.contacto.direccion)}, ${esc(site.contacto.referencia)}. ${esc(site.contacto.horario)}.</span>
            </div>
          </div>
        </div>

        <div class="closer__actions" style="margin-top:1.6rem">
          <a class="btn btn--wa btn--lg" href="${wa(
            'Hola, quisiera cotizar un trabajo personalizado.'
          )}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp</a>
          <a class="btn btn--ghost btn--lg" href="${site.contacto.mapa}" target="_blank" rel="noopener"><i class="fa-solid fa-map-location-dot"></i> Cómo llegar</a>
        </div>
      </div>

      <div data-reveal style="--d:.08s">
        <div class="closer__card" style="background:var(--tint);border-color:var(--line);color:var(--txt)">
          <h4 style="color:var(--txt)">Datos del taller</h4>
          <div class="closer__row" style="color:var(--txt-2);border-color:var(--line)">
            <i class="fa-solid fa-location-dot"></i>
            <span><strong style="color:var(--txt)">${esc(site.contacto.direccion)}</strong>${esc(
    site.contacto.referencia
  )} · ${esc(site.contacto.ciudad)}, ${esc(site.contacto.provincia)}</span>
          </div>
          <div class="closer__row" style="color:var(--txt-2);border-color:var(--line)">
            <i class="fa-regular fa-clock"></i>
            <span><strong style="color:var(--txt)">${esc(site.contacto.horario)}</strong>Domingos cerrado</span>
          </div>
          <div class="closer__row" style="color:var(--txt-2);border-color:var(--line)">
            <i class="fa-solid fa-truck-fast"></i>
            <span><strong style="color:var(--txt)">Envíos a todo Ecuador</strong>Y también al exterior, con número de guía</span>
          </div>
          <div class="closer__row" style="color:var(--txt-2);border-color:var(--line)">
            <i class="fa-solid fa-building-columns"></i>
            <span><strong style="color:var(--txt)">Pagos</strong>Pichincha, Guayaquil, Internacional o efectivo</span>
          </div>
          <div class="closer__row" style="color:var(--txt-2);border-color:var(--line)">
            <i class="fa-solid fa-percent"></i>
            <span><strong style="color:var(--txt)">Anticipo del 50%</strong>Para iniciar producción de pedidos personalizados</span>
          </div>
        </div>

        <div class="split__media lit" style="margin-top:1.2rem;aspect-ratio:5/4">
          <img src="assets/img/contacto.jpg" alt="Atención personalizada por WhatsApp" loading="lazy" decoding="async">
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="wrap wrap-narrow">
      ${P.cabecera({ eyebrow: 'Antes de escribir', titulo: 'Preguntas frecuentes' })}
      ${P.preguntas()}
    </div>
  </section>

  ${P.cierre('')}`;
}

/* ------------------------------------------------------------------ 404 --- */
function noEncontrado() {
  return `<section class="section" style="text-align:center">
    <div class="wrap wrap-narrow">
      <p class="eyebrow" style="justify-content:center">Error 404</p>
      <h1 class="t-xl">Esta página no está en el taller</h1>
      <p class="lede" style="margin:1rem auto 2rem">
        El enlace que seguiste no existe o cambió de dirección. Probá desde el catálogo
        o buscá la pieza por nombre.
      </p>
      <div class="closer__actions" style="justify-content:center">
        <a class="btn btn--amber btn--lg" href="catalogo.html">Ver el catálogo <i class="fa-solid fa-arrow-right"></i></a>
        <a class="btn btn--ghost btn--lg" href="index.html">Volver al inicio</a>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="wrap">
      ${P.cabecera({ eyebrow: 'Quizá buscabas', titulo: 'Las categorías del catálogo' })}
      ${P.mosaicoCategorias('')}
    </div>
  </section>`;
}

module.exports = { nosotros, contacto, noEncontrado, pagehead };
