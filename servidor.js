'use strict';

/* Servidor local para ver el sitio antes de subirlo.
   Uso:  npm run dev      (genera el sitio y lo levanta)
         npm run serve    (sólo lo levanta)
   Luego abrí http://localhost:4321 en el navegador. */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PUERTO = process.env.PORT || 4321;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

http
  .createServer((req, res) => {
    let ruta = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (ruta.endsWith('/')) ruta += 'index.html';

    const archivo = path.join(__dirname, ruta);

    /* No servir nada fuera de la carpeta del proyecto */
    if (!archivo.startsWith(__dirname)) {
      res.writeHead(403).end('403');
      return;
    }

    fs.readFile(archivo, (err, datos) => {
      if (err) {
        fs.readFile(path.join(__dirname, '404.html'), (e2, pagina404) => {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(e2 ? 'No encontrado: ' + ruta : pagina404);
        });
        return;
      }

      res.writeHead(200, {
        'Content-Type': TIPOS[path.extname(archivo).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(datos);
    });
  })
  .listen(PUERTO, () => {
    console.log(`\n  Creatividad Láser — vista previa en http://localhost:${PUERTO}\n`);
  });
