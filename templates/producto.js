'use strict';

const { site } = require('../data/site.js');
const { categoriaPorId, subcategoriaPorId, ocasionPorId } = require('../data/taxonomia.js');
const { productos } = require('../data/productos.js');
const { esc, wa } = require('./partials.js');
const P = require('./piezas.js');

const B = '../';

function campo(f, i) {
  const id = `pz-${i}`;
  if (f.tipo === 'opciones') {
    return `<div class="field">
            <label for="${id}">${esc(f.etiqueta)}</label>
            <select id="${id}" data-pz="${esc(f.etiqueta)}">
              ${f.opciones.map((o) => `<option>${esc(o)}</option>`).join('\n              ')}
            </select>
          </div>`;
  }
  if (f.tipo === 'area') {
    return `<div class="field">
            <label for="${id}">${esc(f.etiqueta)}</label>
            <textarea id="${id}" data-pz="${esc(f.etiqueta)}" placeholder="${esc(f.placeholder || '')}"></textarea>
          </div>`;
  }
  return `<div class="field">
            <label for="${id}">${esc(f.etiqueta)}</label>
            <input type="text" id="${id}" data-pz="${esc(f.etiqueta)}" placeholder="${esc(f.placeholder || '')}">
          </div>`;
}

function producto(p) {
  const cat = categoriaPorId[p.categoria];
  const sub = subcategoriaPorId[p.subcategoria];
  const relacionados = (p.relacionados || []).map((id) => productos.find((x) => x.id === id)).filter(Boolean);

  const mismaOcasion = productos
    .filter((x) => x.id !== p.id && !p.relacionados.includes(x.id) && x.ocasiones.some((o) => p.ocasiones.includes(o)))
    .slice(0, 4);

  const specs = [
    ['Material', p.material],
    ['Medidas', p.medidas],
    ['Producción', p.tiempo],
    p.minimo ? ['Pedido mínimo', p.minimo] : null,
    ['Línea', sub ? sub.nombre : ''],
    ['Envío', 'A todo Ecuador con guía de rastreo'],
  ].filter(Boolean);

  return `<div class="wrap">
    ${P.crumbs(
      [
        { texto: 'Inicio', href: 'index.html' },
        { texto: cat.nombreCorto, href: `${cat.id}.html` },
        { texto: p.nombre },
      ],
      B
    )}
  </div>

  <div class="wrap">
    <div class="pdp" id="pdp" data-product="${p.id}">
      <!-- Galería -->
      <div class="pdp__gallery">
        <div class="pdp__thumbs" id="pdpThumbs">
          ${p.galeria
            .map(
              (img, i) => `<button class="pdp__thumb${i === 0 ? ' on' : ''}" data-go="${i}" aria-label="Imagen ${
                i + 1
              }">
            <img src="${B}${img}" alt="" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async" width="84" height="84">
          </button>`
            )
            .join('\n          ')}
        </div>
        <figure class="pdp__stage" id="pdpStage">
          ${p.etiqueta ? `<span class="pdp__flag">${esc(p.etiqueta)}</span>` : ''}
          <img id="pdpImg" src="${B}${p.imagen}" alt="${esc(p.nombre)}" fetchpriority="high" decoding="async" width="800" height="800">
          <figcaption class="pdp__zoomhint"><i class="fa-solid fa-expand"></i> Clic para ampliar</figcaption>
        </figure>
      </div>

      <!-- Información -->
      <div>
        <span class="pdp__cat">${esc(cat.nombreCorto)}${sub ? ' · ' + esc(sub.nombre) : ''}</span>
        <h1>${esc(p.nombre)}</h1>

        <div class="pdp__meta">
          <span class="spec"><i class="fa-regular fa-clock"></i> ${esc(p.tiempo)}</span>
          <span class="spec"><i class="fa-solid fa-cube"></i> ${esc(p.material)}</span>
          ${p.minimo ? `<span class="spec"><i class="fa-solid fa-layer-group"></i> Mínimo ${esc(p.minimo)}</span>` : ''}
          <button class="mark-link" data-fav="${p.id}" style="border:0;padding:0">
            <i class="fa-regular fa-heart"></i> Guardar en mi lista
          </button>
        </div>

        <p class="pdp__resumen">${esc(p.descripcion)}</p>

        <dl class="pdp__specs">
          ${specs
            .map(([k, v]) => `<div class="pdp__spec"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
            .join('\n          ')}
        </dl>

        <div class="pdp__form">
          <div class="pdp__form-head">
            <i class="fa-solid fa-pen-ruler"></i>
            <h3>Armá tu pedido</h3>
          </div>
          <p>Completá lo que ya tengas decidido. Con eso te devolvemos el boceto y el precio exacto por WhatsApp. Podés dejar campos vacíos.</p>

          ${(p.personalizacion || []).map(campo).join('\n          ')}

          <div class="field field--row">
            <div>
              <label for="pz-cant">Cantidad</label>
              <input type="number" id="pz-cant" min="1" value="1" data-pz="Cantidad">
            </div>
            <div>
              <label for="pz-fecha">¿Para qué fecha?</label>
              <input type="text" id="pz-fecha" placeholder="Ej. 20 de mayo" data-pz="Fecha de entrega">
            </div>
          </div>

          <div class="pdp__cta">
            <button class="btn btn--wa btn--lg btn--block" id="pdpQuote">
              <i class="fa-brands fa-whatsapp"></i> Pedir cotización por WhatsApp
            </button>
            <div class="pdp__cta-row">
              <button class="btn btn--ghost" data-fav="${p.id}"><i class="fa-regular fa-heart"></i> Guardar</button>
              <button class="btn btn--ghost" id="pdpShare" aria-label="Compartir"><i class="fa-solid fa-share-nodes"></i> Compartir</button>
            </div>
            <p class="pdp__hint">Te respondemos dentro del horario de taller: ${esc(site.contacto.horarioCorto)}.</p>
          </div>
        </div>

        <div class="pdp__assur">
          <div><i class="fa-solid fa-pen-ruler"></i><span><strong>Boceto antes de cortar.</strong> Aprobás el diseño digital antes de que la máquina encienda.</span></div>
          <div><i class="fa-solid fa-truck-fast"></i><span><strong>Envíos a todo Ecuador.</strong> Doble empaque para vidrio y acrílico, con guía de rastreo.</span></div>
          <div><i class="fa-solid fa-shield-halved"></i><span><strong>Garantía de taller.</strong> Si el grabado sale con falla, lo rehacemos sin costo.</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Detalle ampliado -->
  <div class="wrap">
    <div class="panels">
      <div class="panels__tabs" role="tablist">
        <button class="panels__tab on" data-panel="desc" role="tab">Descripción</button>
        <button class="panels__tab" data-panel="carac" role="tab">Características</button>
        ${p.incluye ? '<button class="panels__tab" data-panel="incluye" role="tab">Qué incluye</button>' : ''}
        <button class="panels__tab" data-panel="envio" role="tab">Producción y envío</button>
      </div>
      <div class="panels__body">
        <div class="on" data-panel-body="desc">
          <p>${esc(p.descripcion)}</p>
          <p>${esc(p.resumen)} Toda la producción se hace en nuestro taller de ${esc(
    site.contacto.ciudad
  )}: cortamos, grabamos, armamos y probamos cada pieza antes de empacarla.</p>
        </div>
        <div data-panel-body="carac">
          <ul>
            ${(p.caracteristicas || []).map((c) => `<li>${esc(c)}</li>`).join('\n            ')}
          </ul>
        </div>
        ${
          p.incluye
            ? `<div data-panel-body="incluye">
          <ul>
            ${p.incluye.map((c) => `<li>${esc(c)}</li>`).join('\n            ')}
          </ul>
        </div>`
            : ''
        }
        <div data-panel-body="envio">
          <p><strong>Producción:</strong> ${esc(p.tiempo)} desde que aprobás el boceto.${
    p.minimo ? ` El pedido mínimo de este producto es de ${esc(p.minimo)}.` : ''
  }</p>
          <p><strong>Retiro en taller:</strong> ${esc(site.contacto.direccion)}, ${esc(
    site.contacto.referencia
  )}. ${esc(site.contacto.horario)}.</p>
          <p><strong>Envíos:</strong> damos servicio a nivel nacional y también al exterior. Te pasamos el número de guía el día del despacho. Las piezas de vidrio y acrílico viajan con doble empaque anti-golpes.</p>
          <p><strong>Pagos:</strong> transferencia o depósito a Banco Pichincha, Banco Guayaquil y Banco Internacional, o efectivo en el taller. Para pedidos personalizados pedimos el 50% de anticipo.</p>
        </div>
      </div>
    </div>
  </div>

  ${
    relacionados.length
      ? `<section class="section section--tint" style="margin-top:clamp(2.5rem,5vw,4rem)">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Combina bien con',
        titulo: 'Productos relacionados',
        texto: 'Piezas del mismo taller que suelen pedirse junto a esta.',
      })}
      ${P.grilla(relacionados, B)}
    </div>
  </section>`
      : ''
  }

  ${
    mismaOcasion.length
      ? `<section class="section">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Para la misma ocasión',
        titulo: `También sirve para ${p.ocasiones
          .slice(0, 2)
          .map((o) => (ocasionPorId[o] ? ocasionPorId[o].nombre.toLowerCase() : o))
          .join(' y ')}`,
        partido: true,
        enlace: `${B}ocasiones/${p.ocasiones[0]}.html`,
        textoEnlace: 'Ver toda la ocasión',
      })}
      ${P.grilla(mismaOcasion, B)}
    </div>
  </section>`
      : ''
  }

  ${P.cierre(B, {
    titulo: '¿Querés algo distinto a esto?',
    texto:
      'Este modelo es un punto de partida. Cambiamos medidas, materiales, colores y diseño según lo que necesites. Contanos la idea y la cotizamos.',
  })}`;
}

function jsonLdProducto(p) {
  const cat = categoriaPorId[p.categoria];
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    description: p.resumen,
    image: p.galeria.map((g) => `${site.dominio}/${g}`),
    category: cat ? cat.nombre : '',
    material: p.material,
    brand: { '@type': 'Brand', name: site.nombre },
    /* Sin aggregateRating: sólo se declara cuando existan reseñas reales
       publicadas en la ficha. Inventarlo es motivo de penalización en Google. */
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        valueAddedTaxIncluded: true,
      },
      url: `${site.dominio}/${p.url}`,
      seller: { '@type': 'Organization', name: site.nombre },
    },
  };
}

function jsonLdMiga(p) {
  const cat = categoriaPorId[p.categoria];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.dominio + '/index.html' },
      { '@type': 'ListItem', position: 2, name: cat.nombre, item: `${site.dominio}/${cat.id}.html` },
      { '@type': 'ListItem', position: 3, name: p.nombre, item: `${site.dominio}/${p.url}` },
    ],
  };
}

module.exports = { producto, jsonLdProducto, jsonLdMiga };
