'use strict';

/* Página de catálogo. Sirve para tres casos con el mismo cuerpo:
     · catálogo completo          (alcance: 'todo')
     · una categoría              (alcance: 'categoria')
     · una ocasión                (alcance: 'ocasion')
   El filtrado en cliente lo hace assets/js/catalogo.js leyendo data-* del
   contenedor. */

const { categorias, ocasiones } = require('../data/taxonomia.js');
const { productos } = require('../data/productos.js');
const { esc } = require('./partials.js');
const P = require('./piezas.js');

function panelFiltros({ base: b = '', categoria = null, ocasion = null }) {
  const enAlcance = (p) => {
    if (categoria) return p.categoria === categoria.id;
    if (ocasion) return p.ocasiones.includes(ocasion.id);
    return true;
  };

  const universo = productos.filter(enAlcance);

  const grupoSub = categoria
    ? `<div class="filters__group">
          <h3>Línea</h3>
          <div class="filters__list">
            <button class="filters__opt on" data-filter="sub" data-value="">Todo${
              categoria.esServicio ? ' el servicio' : ''
            } <b>${universo.length}</b></button>
            ${categoria.subcategorias
              .map((s) => {
                const n = universo.filter((p) => p.subcategoria === s.id).length;
                return n
                  ? `<button class="filters__opt" data-filter="sub" data-value="${s.id}">${esc(
                      s.nombre
                    )} <b>${n}</b></button>`
                  : '';
              })
              .filter(Boolean)
              .join('\n            ')}
          </div>
        </div>`
    : `<div class="filters__group">
          <h3>Categoría</h3>
          <div class="filters__list">
            <button class="filters__opt on" data-filter="cat" data-value="">Todas <b>${universo.length}</b></button>
            ${categorias
              .map((c) => {
                const n = universo.filter((p) => p.categoria === c.id).length;
                return n
                  ? `<button class="filters__opt" data-filter="cat" data-value="${c.id}">${esc(
                      c.nombreCorto
                    )} <b>${n}</b></button>`
                  : '';
              })
              .filter(Boolean)
              .join('\n            ')}
          </div>
        </div>`;

  const grupoOcasion = ocasion
    ? ''
    : `<div class="filters__group">
          <h3>Ocasión</h3>
          <div class="filters__list">
            <button class="filters__opt on" data-filter="occ" data-value="">Cualquiera</button>
            ${ocasiones
              .map((o) => {
                const n = universo.filter((p) => p.ocasiones.includes(o.id)).length;
                return n
                  ? `<button class="filters__opt" data-filter="occ" data-value="${o.id}">${esc(
                      o.nombre
                    )} <b>${n}</b></button>`
                  : '';
              })
              .filter(Boolean)
              .join('\n            ')}
          </div>
        </div>`;

  return `<aside class="filters" id="filters" aria-label="Filtros">
        <button class="filters__close" id="closeFilters">Filtros <i class="fa-solid fa-xmark"></i></button>
        ${grupoSub}
        ${grupoOcasion}
        <div class="filters__group">
          <h3>Plazo</h3>
          <div class="filters__list">
            <button class="filters__opt on" data-filter="plazo" data-value="">Cualquiera</button>
            <button class="filters__opt" data-filter="plazo" data-value="rapido">Listo en 1 a 3 días</button>
            <button class="filters__opt" data-filter="plazo" data-value="normal">3 a 5 días hábiles</button>
            <button class="filters__opt" data-filter="plazo" data-value="lento">Más de 5 días</button>
          </div>
        </div>
        <div class="filters__group">
          <button class="btn btn--ghost btn--block btn--sm" id="clearFilters">Limpiar filtros</button>
        </div>
      </aside>`;
}

function cuerpoCatalogo({ base: b = '', categoria = null, ocasion = null }) {
  const alcance = categoria ? `cat:${categoria.id}` : ocasion ? `occ:${ocasion.id}` : 'todo';

  return `<section class="section section--tight">
    <div class="wrap">
      <div class="catalog" id="catalog" data-scope="${alcance}" data-base="${b}">
        ${panelFiltros({ base: b, categoria, ocasion })}
        <div>
          <div class="toolbar">
            <button class="btn btn--ghost btn--sm filters-toggle" id="openFilters">
              <i class="fa-solid fa-sliders"></i> Filtros
            </button>
            <div class="searchbox" id="catSearchBox">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" id="catSearch" placeholder="Buscar por nombre, material u ocasión…" aria-label="Buscar en esta lista" autocomplete="off">
              <button type="button" id="catSearchClear" aria-label="Limpiar búsqueda"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="select">
              <select id="catSort" aria-label="Ordenar">
                <option value="destacados">Destacados primero</option>
                <option value="rapido">Entrega más rápida</option>
                <option value="az">Nombre A–Z</option>
              </select>
            </div>
            <span class="result-count" id="catCount"></span>
          </div>

          <div class="chips" id="catChips"></div>
          <div class="grid-products" id="catGrid"></div>
        </div>
      </div>
    </div>
  </section>`;
}

module.exports = { cuerpoCatalogo, panelFiltros };
