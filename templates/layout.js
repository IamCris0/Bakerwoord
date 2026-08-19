'use strict';

/* Esqueleto HTML común. Cada página aporta título, descripción y contenido. */

const { site } = require('../data/site.js');
const { header, drawer, footer, overlays, esc } = require('./partials.js');

const FUENTES =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Instrument+Sans:ital,wght@0,400..700;1,400..600&family=DM+Mono:wght@300;400;500&display=swap';

const ICONOS = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';

function layout({
  titulo,
  descripcion,
  contenido,
  base = '',
  activo = '',
  canonica = '',
  imagenSocial = '',
  jsonLd = [],
  scripts = [],
  bodyClass = '',
}) {
  const url = site.dominio + '/' + canonica.replace(/^\//, '');
  const og = imagenSocial || site.logo;

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#14121c">
<meta name="robots" content="index, follow, max-image-preview:large">

<meta property="og:type" content="website">
<meta property="og:locale" content="es_EC">
<meta property="og:site_name" content="${esc(site.nombre)}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.dominio}/${og}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${base}${site.favicon}" type="image/png">
<link rel="apple-touch-icon" href="${base}${site.favicon}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="stylesheet" href="${FUENTES}">
<link rel="stylesheet" href="${ICONOS}" referrerpolicy="no-referrer">
<link rel="stylesheet" href="${base}assets/css/site.css">
${jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''} data-base="${base}">
<a class="skip" href="#main">Saltar al contenido</a>

${header({ base, activo })}

<main id="main">
${contenido}
</main>

${footer(base)}
${drawer(base)}
${overlays(base)}

<script src="${base}assets/js/catalogo-data.js"></script>
<script src="${base}assets/js/app.js" defer></script>
<script src="${base}assets/js/bot.js" defer></script>
${scripts.map((s) => `<script src="${base}assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>
`;
}

module.exports = { layout };
