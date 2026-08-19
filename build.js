'use strict';

/* =============================================================================
   Generador del sitio — `node build.js` (o `npm run build`)
   -----------------------------------------------------------------------------
   Lee data/ + templates/ y escribe HTML estático en la raíz del proyecto.
   No hay dependencias externas: se puede subir el resultado a cualquier hosting.

   Genera:
     index.html                    portada
     catalogo.html                 catálogo completo con filtros
     <categoria>.html              una por categoría (6)
     ocasiones/<ocasion>.html      una por ocasión (14)
     producto/<id>.html            ficha de cada producto
     nosotros.html, contacto.html, 404.html
     assets/css/site.css           hoja concatenada desde styles/
     assets/js/catalogo-data.js    catálogo en JSON para el buscador y filtros
     sitemap.xml, robots.txt
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const { site } = require('./data/site.js');
const { categorias, ocasiones, categoriaPorId } = require('./data/taxonomia.js');
const { productos } = require('./data/productos.js');
const { redirecciones } = require('./data/redirecciones.js');

const { layout } = require('./templates/layout.js');
const { home } = require('./templates/home.js');
const { cuerpoCatalogo } = require('./templates/catalogo.js');
const { producto, jsonLdProducto, jsonLdMiga } = require('./templates/producto.js');
const { nosotros, contacto, noEncontrado, pagehead } = require('./templates/paginas.js');
const P = require('./templates/piezas.js');

const RAIZ = __dirname;
const escritos = [];

function escribir(rel, contenido) {
  const destino = path.join(RAIZ, rel);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, contenido, 'utf8');
  escritos.push(rel);
}

const AVISO = `<!--
  ARCHIVO GENERADO AUTOMÁTICAMENTE — no lo edites a mano.
  El contenido vive en data/ y templates/. Después de cambiar algo, ejecutá:
      npm run build
-->
`;

/* --------------------------------------------------- imágenes optimizadas ---
   `npm run imagenes` deja copias livianas en assets/img/. Si existen, todas
   las referencias apuntan ahí; si no, se sirven los originales sin romper nada.
   Sólo se sustituyen fotografías: los logos siguen siendo PNG con transparencia.
*/
const cacheOptimizadas = new Map();

function rutaOptimizada(original) {
  if (cacheOptimizadas.has(original)) return cacheOptimizadas.get(original);

  let final = original;
  if (/^pagina-antigua\/(assets\/images\/(productos|eventos)|galeria\/img)\//.test(original)) {
    /* Este mapeo tiene que coincidir con destinoDe() de optimizar-imagenes.js */
    const candidata =
      'assets/img/' +
      original
        .replace(/^pagina-antigua\/assets\/images\//, '')
        .replace(/^pagina-antigua\/galeria\/img\//, 'galeria/')
        .replace(/\.(png|jpe?g)$/i, '.jpg');
    if (fs.existsSync(path.join(RAIZ, candidata))) final = candidata;
  }

  cacheOptimizadas.set(original, final);
  return final;
}

function usarOptimizadas(texto) {
  return texto.replace(
    /(?:\.\.\/)*pagina-antigua\/[A-Za-z0-9/_.-]+\.(?:png|jpe?g)/g,
    (coincidencia) => {
      const subida = (coincidencia.match(/^(\.\.\/)*/) || [''])[0];
      const limpia = coincidencia.slice(subida.length);
      const optimizada = rutaOptimizada(limpia);
      return optimizada === limpia ? coincidencia : subida + optimizada;
    }
  );
}

const html = (s) => AVISO + usarOptimizadas(s);

/* ------------------------------------------------------------------ CSS --- */
function construirCss() {
  const dir = path.join(RAIZ, 'styles');
  const partes = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .sort();

  const css = partes
    .map((f) => fs.readFileSync(path.join(dir, f), 'utf8'))
    .join('\n\n')
    /* @charset sólo puede aparecer una vez y al principio */
    .replace(/@charset "UTF-8";\s*/g, '');

  escribir('assets/css/site.css', '@charset "UTF-8";\n' + css);
  return partes.length;
}

/* ------------------------------------------- datos de catálogo (cliente) --- */
function construirDatos() {
  const compacto = productos.map((p, indice) => ({
    id: p.id,
    /* posición en data/productos.js: manda el orden editorial del catálogo */
    ord: indice,
    n: p.nombre,
    c: p.categoria,
    s: p.subcategoria,
    o: p.ocasiones,
    m: p.material,
    r: p.resumen,
    e: p.etiqueta || '',
    i: p.imagen,
    i2: p.galeria[1] && p.galeria[1] !== p.imagen ? p.galeria[1] : '',
    u: p.url,
    d: p.destacado ? 1 : 0,
    t: p.tiempo,
    /* días de producción, para ordenar y filtrar por plazo */
    dias: (() => {
      const m = p.tiempo.match(/(\d+)\s*a\s*(\d+)/);
      return m ? Number(m[2]) : 5;
    })(),
  }));

  const meta = {
    categorias: categorias.map((c) => ({
      id: c.id,
      n: c.nombreCorto,
      subs: c.subcategorias.map((s) => ({ id: s.id, n: s.nombre })),
    })),
    ocasiones: ocasiones.map((o) => ({ id: o.id, n: o.nombre })),
    whatsapp: site.contacto.whatsapp,
  };

  escribir(
    'assets/js/catalogo-data.js',
    usarOptimizadas(
      '/* Generado por build.js — no editar */\n' +
        'window.CATALOGO = ' +
        JSON.stringify(compacto) +
        ';\n' +
        'window.CATALOGO_META = ' +
        JSON.stringify(meta) +
        ';\n'
    )
  );
  return compacto.length;
}

/* --------------------------------------------------------------- páginas --- */
function construirPaginas() {
  /* Portada */
  escribir(
    'index.html',
    html(
      layout({
        titulo: `${site.nombre} · Lámparas LED grabadas, cúpulas florales y recuerdos personalizados en Ecuador`,
        descripcion: site.descripcion,
        contenido: home(),
        activo: 'home',
        canonica: 'index.html',
        imagenSocial: 'pagina-antigua/assets/images/productos/led-madera/2.jpg',
        jsonLd: [P.jsonLdNegocio()],
        scripts: ['pdp.js'],
      })
    )
  );

  /* Catálogo completo */
  escribir(
    'catalogo.html',
    html(
      layout({
        titulo: `Catálogo completo · ${site.nombre}`,
        descripcion:
          'Todos los productos del taller: lámparas LED grabadas, cúpulas con flores preservadas, placas de reconocimiento, recuerdos de evento y servicio de corte láser.',
        contenido: `${pagehead({
          eyebrow: 'Catálogo',
          titulo: 'Todo lo que sale del taller',
          texto: `${productos.length} productos en ${categorias.length} líneas de trabajo. Filtrá por categoría, ocasión o plazo de entrega.`,
          imagen: 'pagina-antigua/assets/images/productos/led-grietas/4.jpg',
          crumbs: P.crumbs([{ texto: 'Inicio', href: 'index.html' }, { texto: 'Catálogo' }]),
        })}
        ${cuerpoCatalogo({ base: '' })}
        <section class="section section--tint" id="ocasiones">
          <div class="wrap">
            ${P.cabecera({
              eyebrow: 'Otra forma de buscar',
              titulo: 'Elegí por la ocasión del regalo',
              texto: 'Cada ocasión reúne piezas de distintas categorías que encajan con ese momento.',
            })}
            ${P.filaOcasiones('', 14)}
          </div>
        </section>
        ${P.cierre('')}`,
        canonica: 'catalogo.html',
        jsonLd: [P.jsonLdNegocio()],
        scripts: ['catalogo.js'],
      })
    )
  );

  /* Una página por categoría */
  categorias.forEach((c) => {
    const lista = productos.filter((p) => p.categoria === c.id);

    escribir(
      `${c.id}.html`,
      html(
        layout({
          titulo: `${c.titulo} · ${site.nombre}`,
          descripcion: c.bajada,
          activo: c.id,
          canonica: `${c.id}.html`,
          imagenSocial: c.portada,
          contenido: `${pagehead({
            eyebrow: c.esServicio ? 'Servicio' : 'Colección',
            titulo: c.titulo,
            texto: c.bajada,
            imagen: c.portada,
            crumbs: P.crumbs([{ texto: 'Inicio', href: 'index.html' }, { texto: c.nombreCorto }]),
          })}
        ${cuerpoCatalogo({ base: '', categoria: c })}
        <section class="section section--tint">
          <div class="wrap wrap-narrow">
            ${P.cabecera({ eyebrow: 'Dudas frecuentes', titulo: 'Antes de encargar' })}
            ${P.preguntas()}
          </div>
        </section>
        ${P.cierre('')}`,
          jsonLd: [
            P.jsonLdNegocio(),
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: c.titulo,
              description: c.bajada,
              url: `${site.dominio}/${c.id}.html`,
              hasPart: lista.map((p) => ({
                '@type': 'Product',
                name: p.nombre,
                url: `${site.dominio}/${p.url}`,
                image: `${site.dominio}/${p.imagen}`,
              })),
            },
          ],
          scripts: ['catalogo.js'],
        })
      )
    );
  });

  /* Una página por ocasión */
  ocasiones.forEach((o) => {
    const lista = productos.filter((p) => p.ocasiones.includes(o.id));

    escribir(
      `ocasiones/${o.id}.html`,
      html(
        layout({
          base: '../',
          titulo: `${o.titulo} · ${site.nombre}`,
          descripcion: o.bajada,
          canonica: `ocasiones/${o.id}.html`,
          imagenSocial: o.imagen,
          contenido: `${pagehead({
            eyebrow: 'Por ocasión',
            titulo: o.titulo,
            texto: o.bajada,
            imagen: o.imagen,
            base: '../',
            crumbs: P.crumbs(
              [{ texto: 'Inicio', href: 'index.html' }, { texto: 'Catálogo', href: 'catalogo.html' }, { texto: o.nombre }],
              '../'
            ),
          })}
        ${cuerpoCatalogo({ base: '../', ocasion: o })}
        ${P.cierre('../', {
          titulo: `¿Necesitás algo distinto para ${o.nombre.toLowerCase()}?`,
          texto:
            'Podemos adaptar cualquier pieza del catálogo o fabricar un diseño desde cero. Contanos la idea y la cantidad, y te cotizamos.',
        })}`,
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: o.titulo,
              description: o.bajada,
              url: `${site.dominio}/ocasiones/${o.id}.html`,
              hasPart: lista.map((p) => ({
                '@type': 'Product',
                name: p.nombre,
                url: `${site.dominio}/${p.url}`,
              })),
            },
          ],
          scripts: ['catalogo.js'],
        })
      )
    );
  });

  /* Fichas de producto */
  productos.forEach((p) => {
    const c = categoriaPorId[p.categoria];
    escribir(
      p.url,
      html(
        layout({
          base: '../',
          titulo: `${p.nombre} · ${site.nombre}`,
          descripcion: `${p.resumen} ${p.material}. Producción en ${p.tiempo}, con envíos a todo Ecuador.`,
          activo: c.id,
          canonica: p.url,
          imagenSocial: p.imagen,
          contenido: producto(p),
          jsonLd: [jsonLdProducto(p), jsonLdMiga(p)],
          scripts: ['pdp.js'],
        })
      )
    );
  });

  /* Institucionales */
  escribir(
    'nosotros.html',
    html(
      layout({
        titulo: `El taller · ${site.nombre}`,
        descripcion: `Taller de corte y grabado láser en ${site.contacto.ciudad}${
          site.fundacion ? ` desde ${site.fundacion}` : ''
        }. Producción propia de lámparas LED, cúpulas florales, placas y recuerdos personalizados.`,
        contenido: nosotros(),
        activo: 'nosotros',
        canonica: 'nosotros.html',
        jsonLd: [P.jsonLdNegocio()],
        scripts: ['pdp.js'],
      })
    )
  );

  escribir(
    'contacto.html',
    html(
      layout({
        titulo: `Contacto · ${site.nombre}`,
        descripcion: `Escribinos por WhatsApp al ${site.contacto.telefono1} o visitanos en ${site.contacto.direccion}, ${site.contacto.ciudad}. ${site.contacto.horario}.`,
        contenido: contacto(),
        activo: 'contacto',
        canonica: 'contacto.html',
        jsonLd: [P.jsonLdNegocio()],
        scripts: ['pdp.js'],
      })
    )
  );

  escribir(
    '404.html',
    html(
      layout({
        titulo: `Página no encontrada · ${site.nombre}`,
        descripcion: 'La página que buscás no existe. Volvé al catálogo de Creatividad Láser.',
        contenido: noEncontrado(),
        canonica: '404.html',
      })
    )
  );
}

/* ------------------------------------------------------- sitemap y robots --- */
function construirSitemap() {
  const hoy = new Date().toISOString().slice(0, 10);

  const urls = [
    { loc: 'index.html', pri: '1.0' },
    { loc: 'catalogo.html', pri: '0.9' },
    ...categorias.map((c) => ({ loc: `${c.id}.html`, pri: '0.9' })),
    ...ocasiones.map((o) => ({ loc: `ocasiones/${o.id}.html`, pri: '0.7' })),
    ...productos.map((p) => ({ loc: p.url, pri: '0.8' })),
    { loc: 'nosotros.html', pri: '0.6' },
    { loc: 'contacto.html', pri: '0.6' },
  ];

  escribir(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${site.dominio}/${u.loc}</loc><lastmod>${hoy}</lastmod><priority>${u.pri}</priority></url>`
  )
  .join('\n')}
</urlset>
`
  );

  escribir(
    'robots.txt',
    `User-agent: *\nAllow: /\nDisallow: /pagina-antigua/*.html\n\nSitemap: ${site.dominio}/sitemap.xml\n`
  );

  return urls.length;
}

/* ------------------------------------------------------------- .htaccess --- */
function construirHtaccess() {
  const reglas = Object.entries(redirecciones)
    .map(([viejo, nuevo]) => `Redirect 301 /${viejo} ${site.dominio}/${nuevo}`)
    .join('\n');

  escribir(
    '.htaccess',
    `# ==========================================================================
# GENERADO POR build.js — no editar a mano.
# Las redirecciones viven en data/redirecciones.js
# ==========================================================================

# --- Forzar HTTPS ---------------------------------------------------------
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
</IfModule>

# --- Página de error ------------------------------------------------------
ErrorDocument 404 /404.html

# --- Compresión -----------------------------------------------------------
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# --- Caché de estáticos ---------------------------------------------------
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# --- Redirecciones del sitio anterior -------------------------------------
# Cada URL que se compartió en Facebook o WhatsApp durante años sigue
# funcionando y traspasa su posicionamiento a la página nueva.
${reglas}
`
  );

  return Object.keys(redirecciones).length;
}

/* ---------------------------------------------------------------- limpieza --- */
/* Borra las páginas que quedaron de una generación anterior (por ejemplo al
   renombrar el id de un producto), para que no queden URLs huérfanas vivas. */
function limpiarHuerfanas() {
  const generadas = new Set(escritos.map((f) => f.replace(/\\/g, '/')));
  let borradas = 0;

  ['producto', 'ocasiones'].forEach((carpeta) => {
    const dir = path.join(RAIZ, carpeta);
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir).forEach((archivo) => {
      if (!archivo.endsWith('.html')) return;
      if (generadas.has(`${carpeta}/${archivo}`)) return;
      fs.unlinkSync(path.join(dir, archivo));
      console.log(`  · borrada página huérfana: ${carpeta}/${archivo}`);
      borradas++;
    });
  });

  return borradas;
}

/* ------------------------------------------------------------------ main --- */
function main() {
  const t0 = Date.now();

  const nCss = construirCss();
  const nDatos = construirDatos();
  construirPaginas();
  const nUrls = construirSitemap();
  const nRedir = construirHtaccess();
  const nBorradas = limpiarHuerfanas();

  const paginas = escritos.filter((f) => f.endsWith('.html')).length;

  console.log('');
  console.log('  Creatividad Láser — sitio generado');
  console.log('  ─────────────────────────────────────');
  console.log(`  ${paginas} páginas HTML`);
  console.log(`  ${productos.length} productos · ${categorias.length} categorías · ${ocasiones.length} ocasiones`);
  console.log(`  ${nCss} archivos CSS concatenados en assets/css/site.css`);
  console.log(`  ${nDatos} productos exportados a assets/js/catalogo-data.js`);
  console.log(`  ${nUrls} URLs en sitemap.xml`);
  console.log(`  ${nRedir} redirecciones 301 en .htaccess`);
  if (nBorradas) console.log(`  ${nBorradas} páginas huérfanas eliminadas`);
  console.log(`  listo en ${Date.now() - t0} ms`);
  console.log('');
}

main();
