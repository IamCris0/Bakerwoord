# Joyería El Palacio del Amor — Sitio web

Rediseño completo del sitio de **Joyería El Palacio del Amor** (Lago Agrio y El
Coca, Ecuador) en HTML/CSS/JS puro, sin frameworks ni build tools. Web clara
con el dorado corporativo como acento, **fotos e información 100% reales del
negocio** (tomadas de `assets/` y de la página anterior), y un catálogo de
53 categorías navegable por URL.

## Estructura de carpetas

```
palacio-del-amor/
├── index.html              Inicio (slider, categorías, destacados — fotos reales)
├── productos.html          Hub del catálogo: 8 grupos, 52 categorías (se genera de js/catalog.js)
├── categoria.html          Plantilla dinámica: categoria.html?cat=<slug> muestra las fotos reales
├── quienes-somos.html      Historia (con galería de fotos reales), Misión/Visión, Política, FAQ
├── servicio-tecnico.html   Grabado láser, reparación, proceso (con banner real del taller)
├── contacto.html           Formulario + 3 sucursales reales + WhatsApp real
├── noticias.html           Eventos reales (Plan Acumulativo, premios) + registro de marca SENADI
├── css/styles.css          Sistema de diseño (paleta clara oro/crema, componentes, responsive)
├── js/catalog.js           ★ Datos del catálogo: 53 categorías → carpetas de assets con conteos
├── js/main.js              Menús, carrusel, catálogo dinámico, acordeón, formulario
├── assets/                 Fotos reales del cliente organizadas por categoría
├── pagina-antigua/         Sitio anterior (solo referencia, no se sirve enlazado)
├── sitemap.xml             59 URLs reales (6 páginas + 53 categorías) para buscadores
├── robots.txt              Permite indexar todo y apunta al sitemap
├── server.js               Servidor local sin dependencias (Node.js)
├── package.json
└── README.md
```

## Cómo verlo y compartirlo

```bash
cd palacio-del-amor
node server.js          # o: npm start   |  otro puerto: node server.js 3000
```

- **Local**: http://localhost:8080
- **En tu red**: el servidor imprime la URL con tu IP (ej. `http://192.168.1.23:8080`)
  para compartir con cualquiera en el mismo Wi-Fi.

## Control de versiones

El proyecto tiene `git` inicializado (jul 2026) — cada ronda de cambios
importante queda como un commit, así que siempre se puede volver atrás:

```bash
git log --oneline           # ver el historial
git diff                    # ver qué cambió desde el último commit
git checkout -- .           # descartar cambios sin confirmar
git reset --hard <commit>   # volver por completo a un punto anterior
```

## Cómo funciona el catálogo (lo importante para mantenerlo)

Todo el catálogo vive en **`js/catalog.js`**. Cada categoría es una entrada:

```js
'anillos-matrimonio': { title:'Anillos de Matrimonio', group:'joyas',
                        dir:'assets/joyas/matrimonio', count:24, desc:'...' },
```

- `dir` es la carpeta real dentro de `assets/` y `count` la foto numerada más
  alta (`1.jpg` … `count.jpg`). Si falta un número, la foto se descarta sola.
- **Para agregar fotos**: copia `N+1.jpg` a la carpeta y sube `count`.
- **Para una categoría nueva**: crea la carpeta en `assets/`, agrega la entrada
  en `catalog.js`, y aparece automáticamente en `productos.html`; opcionalmente
  agrégala al mega menú (en el `<nav>` de cada página).
- Cada categoría tiene URL propia y compartible: `categoria.html?cat=anillos-matrimonio`.
- `ofertas` es especial: lista archivos con nombre propio (carpeta `assets/ofertas`).
- El botón de "Ofertas Especiales" del menú apunta a `categoria.html?cat=ofertas`.

## Datos reales incluidos (verificados contra la página antigua y la web en vivo)

- **Matriz Lago Agrio**: Calle 12 de Febrero 1913, entre Av. Quito y Jorge
  Añazco, junto al Banco Pichincha — (06) 2 830 669 · móvil 0993 681 748.
- **Sucursal 2 Lago Agrio**: C.C. 17 de Octubre, locales 24-25-26 —
  (06) 2 831 915 · móvil/WhatsApp 098 269 3332.
- **Sucursal 3 El Coca**: Calle Amazonas 03-15, entre Cuenca y Rocafuerte —
  (06) 2 300 039 / 041 · móviles 0993 681 747 / 0988 556 074.
- **WhatsApp del sitio** (botón flotante, topbar y CTAs, formulario de
  contacto): `593982693332` — número corregido en jul 2026, tenía un `0` de
  más (`5930982693332`) que rompía todos los enlaces de WhatsApp del sitio;
  verificado contra el enlace real `wa.link/zodtz8` de la web en vivo.
- **Correos**: info@ / sucursa@ (El Coca) / talentohumano@ elpalaciodelamorjoyeria.com.
- **Redes**: instagram.com/joyeriaelpalaciodelamor · x.com/PalaciodelAmor ·
  youtube.com/user/elpalaciodelamor ·
  facebook.com/palaciodelamor.joyeria (confirmado contra el footer de la web
  en vivo; el topbar de la web en vivo enlaza por error a una página de
  Facebook ajena, "visiondelosandes" — no se replicó ese error aquí).
- **Horario**: L–V 08:00–18:00 · Sáb 09:00–14:00 · Dom cerrado.
- **Logos**: `assets/logo-1.png` (header), `assets/logo-10.png` (footer),
  `assets/favicon.png` (pestaña). Tarjetas de pago: `assets/bancos/`.

## Pendientes menores antes de publicar

| Qué | Dónde |
|---|---|
| Fotos faltantes: `assets/joyas/plata/` y `assets/perfumes/damas/` tienen 1 hueco cada una | se ocultan solas; puedes reponerlas |
| Backend real de correo para el formulario | hoy el formulario arma el mensaje y abre WhatsApp (sin backend); si prefieres además recibir correos, hay que conectar un servicio (Formspree, EmailJS, etc.) |

## Mejoras respecto a la página anterior

- Las ~55 páginas HTML duplicadas del sitio viejo (una por subcategoría, cada
  una con su propio header/footer desactualizado) se reemplazan por **una sola
  plantilla** (`categoria.html`) + un archivo de datos, manteniendo URLs
  únicas por categoría.
- Header, mega menú y footer **idénticos en todas las páginas** (antes variaban).
- **Mega menú de "Productos" reestructurado** (jul 2026): 5 columnas —
  Joyas, Relojería, Trofeos & Placas, Perfumes, Imple. Deportivos — con foto
  real y subcategorías por columna, replicando la distribución exacta de la
  página antigua (misma agrupación y mismos textos que su menú original) pero
  con fotos y enlaces reales al catálogo actual. El título de cada columna es
  un enlace que lleva directo a esa sección de `productos.html`. Ya no se
  corta en el borde de la pantalla (bug del panel desplazado a la izquierda,
  corregido en una ronda anterior).
- Fotos de producto (categorías y destacados del Inicio) usan `contain` en vez
  de `cover`: se ven completas, sin recortes ni zoom forzado sobre las fotos
  reales del cliente.
- Logo del header más grande y visible.
- Mapas reales de Google Maps embebidos por sucursal (sin API key) en
  `contacto.html`, con enlace directo a "Abrir en Google Maps".
- El formulario de contacto arma un mensaje de WhatsApp real con los datos
  ingresados (nombre, teléfono, correo, sucursal, consulta) y lo abre listo
  para enviar — ya no es un formulario de muestra que no hacía nada.
- Web clara con el producto como protagonista (pedido del cliente), diseño
  responsive hasta móvil, sin errores de consola y sin enlaces rotos
  (80+ enlaces internos verificados).
- **SEO técnico** (jul 2026): `sitemap.xml` con las 59 URLs reales del sitio,
  `robots.txt`, `<link rel="canonical">` + Open Graph + Twitter Card en las 7
  páginas (con foto real de cada sección) y datos estructurados JSON-LD
  (`Organization` + una `JewelryStore` por cada una de las 3 sucursales) en
  Inicio. En `categoria.html` el título, la descripción y las etiquetas Open
  Graph se actualizan por JavaScript según la categoría (`js/main.js`), así
  que las 53 páginas de categoría comparten bien en WhatsApp/redes con su
  propia foto y texto — no un genérico.

## Plan de mejora continua (próximas rondas sugeridas)

1. ~~**SEO técnico**~~ — hecho (ver arriba). Pendiente solo si cambia el
   dominio final: `sitemap.xml`, `robots.txt` y los `canonical`/`og:url` usan
   `https://www.elpalaciodelamorjoyeria.com` — actualízalos si el sitio se
   publica en otro dominio.
2. ~~**Rendimiento de imágenes**~~ — hecho (jul 2026): las 1277 fotos JPG en
   `assets/` se recomprimieron a calidad 82 (mismas dimensiones y nombres,
   sin cambios de markup) — de 80 MB a 30 MB, -65%, verificado sin pérdida de
   calidad visible. Los PNG (logos, tarjetas de banco) no se tocaron. El
   proyecto ya tiene `git` inicializado, así que este y cualquier cambio
   futuro se puede revertir con `git log` / `git checkout`. Si más adelante
   se agregan fotos nuevas, no vienen optimizadas automáticamente — hay que
   repetir el proceso (o pedir que se automatice como paso de publicación).
3. ~~**Accesibilidad**~~ — hecho (jul 2026): se midió el contraste real
   (WCAG) de la paleta — `--color-muted` y `--color-gold-dark` estaban justo
   por debajo de 4.5:1 sobre fondo crema oscuro (topbar) y el botón flotante
   de WhatsApp estaba en 1.98:1 (blanco sobre verde brillante); los tres se
   ajustaron a tonos ligeramente más oscuros que pasan AA sin cambiar el
   aspecto general. Las fotos de categoría ya no repiten el mismo `alt` en
   cada una (ahora incluyen "foto N de M"). El mega menú y el submenú
   "Quiénes Somos" ya se pueden abrir/cerrar por teclado (Tab + Enter/Escape,
   con `aria-expanded`/`aria-haspopup`), verificado con Playwright simulando
   teclado real.
4. **Analítica**: agregar Google Analytics o Meta Pixel para saber qué
   categorías generan más tráfico/consultas por WhatsApp y priorizar fotos
   nuevas donde más se necesiten.
5. **Facebook e Instagram**: la URL de Facebook ya se corrigió (ver arriba);
   si se quiere, mostrar un feed reciente de Instagram en Inicio o Noticias.
6. **Backend de correo opcional**: si además de WhatsApp quieren recibir las
   consultas por email, conectar el formulario a un servicio como Formspree
   o EmailJS (no requiere servidor propio).
7. ~~**Vista rápida de producto (lightbox)**~~ — hecho (jul 2026): en
   `categoria.html`, cada foto decía "Ver foto" y abría la imagen sola en una
   pestaña nueva del navegador, sin contexto ni forma de contactar — un
   callejón sin salida. Ahora "Vista rápida" abre un panel dentro de la
   misma página con la foto en grande, la descripción de la categoría,
   flechas para pasar a la foto anterior/siguiente (también con ← →) y un
   botón "Más información por WhatsApp" que arma el mensaje con el número de
   foto exacto que el cliente vio. Funciona con mouse, teclado (Tab/Enter,
   foco atrapado dentro del panel mientras está abierto, Escape cierra y
   devuelve el foco a la foto) y en móvil.
8. ~~**Buscador del header**~~ — hecho (jul 2026): el buscador visible en
   todas las páginas ("Buscar anillos, relojes, perfumes...") era
   decorativo — el formulario tenía `onsubmit="return false"` y no hacía
   nada. Ahora busca en vivo entre las 53 categorías reales (con foto,
   nombre y línea de producto), filtra por el selector de categoría, se
   navega con flechas + Enter, y si no hay coincidencia exacta ofrece "Ver
   catálogo completo". De paso se eliminó del código un bloque de filtros de
   `productos.html` que ya no tenía HTML correspondiente (quedó huérfano de
   una versión anterior de la página).
