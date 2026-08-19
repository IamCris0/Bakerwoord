'use strict';

/* =============================================================================
   Optimizador de imágenes — `npm run imagenes`
   -----------------------------------------------------------------------------
   El archivo del taller guarda muchas fotos como PNG. Un PNG de una fotografía
   pesa entre 5 y 10 veces más que el mismo JPEG sin diferencia visible: la
   portada llegaba a 2,6 MB sólo por eso.

   Este script recorre las imágenes que el sitio realmente usa y escribe una
   copia optimizada en assets/img/, respetando la misma estructura de carpetas.
   `build.js` prefiere esas copias cuando existen, así que:

     · si nunca ejecutás este script, el sitio funciona igual con los originales;
     · si lo ejecutás, todas las páginas pasan a servir las versiones livianas.

   Requiere Windows (usa System.Drawing de .NET vía PowerShell). En Mac o Linux,
   el equivalente es:  cwebp / ImageMagick  →  mismo destino assets/img/.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const { site } = require('./data/site.js');
const { categorias, ocasiones } = require('./data/taxonomia.js');
const { productos } = require('./data/productos.js');

const RAIZ = __dirname;
const ORIGEN = 'pagina-antigua/';
const DESTINO = 'assets/img/';

const ANCHO_MAX = 900; /* ninguna foto del archivo llega a tanto; sólo por si acaso */
const CALIDAD = 82;

/* Dónde va la copia optimizada de cada original. La misma función vive en
   build.js: si cambia una, hay que cambiar la otra. */
function destinoDe(rel) {
  return (
    DESTINO +
    rel
      .replace(/^pagina-antigua\/assets\/images\//, '')
      .replace(/^pagina-antigua\/galeria\/img\//, 'galeria/')
      .replace(/\.(png|jpe?g)$/i, '.jpg')
  );
}

/* ------------------------------------------------ qué imágenes usa el sitio */
function imagenesUsadas() {
  const usadas = new Set();

  productos.forEach((p) => {
    p.galeria.forEach((i) => usadas.add(i));
    usadas.add(p.imagen);
  });
  categorias.forEach((c) => usadas.add(c.portada));
  ocasiones.forEach((o) => usadas.add(o.imagen));
  site.materiales.forEach((m) => usadas.add(m.imagen));
  site.galeriaPortada.forEach((i) => usadas.add(i));
  site.galeriaTaller.forEach((i) => usadas.add(i));

  /* Logos, favicon y marcas de banco quedan fuera a propósito: son PNG con
     transparencia y el JPEG no la tiene, así que saldrían con un recuadro
     blanco sobre el pie oscuro. */

  /* Rutas escritas directamente en las plantillas */
  ['templates/home.js', 'templates/paginas.js', 'templates/partials.js', 'build.js'].forEach((f) => {
    const texto = fs.readFileSync(path.join(RAIZ, f), 'utf8');
    const patron = /pagina-antigua\/[A-Za-z0-9/_.-]+\.(?:jpg|jpeg|png)/g;
    (texto.match(patron) || []).forEach((r) => usadas.add(r));
    const conVariable = /IMG\}([A-Za-z0-9/_.-]+\.(?:jpg|jpeg|png))/g;
    let m;
    while ((m = conVariable.exec(texto))) usadas.add('pagina-antigua/assets/images' + m[1]);
  });

  /* Sólo fotografías: los logotipos y las marcas de banco se quedan en PNG */
  const esFotografia = (f) =>
    /^pagina-antigua\/(assets\/images\/(productos|eventos)|galeria\/img)\//.test(f);

  return [...usadas].filter(
    (f) => f.startsWith(ORIGEN) && esFotografia(f) && fs.existsSync(path.join(RAIZ, f))
  );
}

/* -------------------------------------------------------------- conversión */
function convertir(pares) {
  const manifiesto = path.join(RAIZ, '.imagenes-manifiesto.txt');
  fs.writeFileSync(manifiesto, pares.map((p) => p.origen + '|' + p.destino).join('\n'), 'utf8');

  const guion = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ${CALIDAD}

foreach ($linea in Get-Content -LiteralPath '${manifiesto.replace(/\\/g, '\\\\')}' -Encoding UTF8) {
  if (-not $linea) { continue }
  $partes = $linea.Split('|')
  $origen = $partes[0]
  $destino = $partes[1]

  $carpeta = Split-Path -Parent $destino
  if (-not (Test-Path -LiteralPath $carpeta)) { New-Item -ItemType Directory -Force -Path $carpeta | Out-Null }

  try {
    $img = [System.Drawing.Image]::FromFile($origen)
    $ancho = $img.Width
    $alto = $img.Height

    if ($ancho -gt ${ANCHO_MAX}) {
      $alto = [int]($alto * ${ANCHO_MAX} / $ancho)
      $ancho = ${ANCHO_MAX}
    }

    # Fondo blanco: el JPEG no tiene transparencia y sin esto los PNG salen negros
    $lienzo = New-Object System.Drawing.Bitmap $ancho, $alto
    $g = [System.Drawing.Graphics]::FromImage($lienzo)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $ancho, $alto)
    $g.Dispose()

    $lienzo.Save($destino, $codec, $params)
    $lienzo.Dispose()
    $img.Dispose()
  } catch {
    Write-Output ("ERROR " + $origen + " :: " + $_.Exception.Message)
  }
}
`;

  const archivoGuion = path.join(RAIZ, '.optimizar.ps1');
  fs.writeFileSync(archivoGuion, guion, 'utf8');

  try {
    const salida = execFileSync(
      'powershell',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', archivoGuion],
      { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
    );
    if (salida.trim()) console.log(salida.trim());
  } finally {
    fs.unlinkSync(archivoGuion);
    fs.unlinkSync(manifiesto);
  }
}

/* ------------------------------------------------------------------- main */
function main() {
  const lista = imagenesUsadas();

  const pares = lista.map((rel) => {
    const destinoRel = destinoDe(rel);
    return {
      rel,
      destinoRel,
      origen: path.join(RAIZ, rel),
      destino: path.join(RAIZ, destinoRel),
    };
  });

  /* Sólo se reconvierte lo que cambió o falta */
  const pendientes = pares.filter((p) => {
    if (!fs.existsSync(p.destino)) return true;
    return fs.statSync(p.origen).mtimeMs > fs.statSync(p.destino).mtimeMs;
  });

  console.log(`\n  Optimizando imágenes`);
  console.log('  ─────────────────────────────────────');
  console.log(`  ${lista.length} imágenes en uso · ${pendientes.length} por procesar`);

  if (pendientes.length) convertir(pendientes);

  let antes = 0;
  let despues = 0;
  pares.forEach((p) => {
    antes += fs.statSync(p.origen).size;
    if (fs.existsSync(p.destino)) despues += fs.statSync(p.destino).size;
  });

  const mb = (b) => (b / 1048576).toFixed(1) + ' MB';
  console.log(`  originales: ${mb(antes)}  →  optimizadas: ${mb(despues)}`);
  console.log(`  ahorro: ${mb(antes - despues)} (${Math.round((1 - despues / antes) * 100)} %)`);
  console.log('\n  Ejecutá `npm run build` para que las páginas apunten a las nuevas.\n');
}

main();
