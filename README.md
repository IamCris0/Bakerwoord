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

## Datos reales incluidos (verificados contra la página antigua)

- **Matriz Lago Agrio**: Calle 12 de Febrero 1913, entre Av. Quito y Jorge
  Añazco, junto al Banco Pichincha — (06) 2 830 669 · móvil 0993 681 748.
- **Sucursal 2 Lago Agrio**: C.C. 17 de Octubre, locales 24-25-26 —
  (06) 2 831 915 · móvil/WhatsApp 098 269 3332.
- **Sucursal 3 El Coca**: Calle Amazonas 03-15, entre Cuenca y Rocafuerte —
  (06) 2 300 039 / 041 · móviles 0993 681 747 / 0988 556 074.
- **WhatsApp del sitio** (botón flotante, topbar y CTAs): 098 269 3332.
- **Correos**: info@ / sucursa@ (El Coca) / talentohumano@ elpalaciodelamorjoyeria.com.
- **Redes**: instagram.com/joyeriaelpalaciodelamor · x.com/PalaciodelAmor ·
  youtube.com/user/elpalaciodelamor (el enlace de Facebook quedó genérico,
  igual que en la página anterior — reemplázalo por la URL exacta de la página).
- **Horario**: L–V 08:00–18:00 · Sáb 09:00–14:00 · Dom cerrado.
- **Logos**: `assets/logo-1.png` (header), `assets/logo-10.png` (footer),
  `assets/favicon.png` (pestaña). Tarjetas de pago: `assets/bancos/`.

## Pendientes menores antes de publicar

| Qué | Dónde |
|---|---|
| Iframe de Google Maps por sucursal | `contacto.html` (placeholder marcado) |
| URL exacta de la página de Facebook | topbar y footer de todas las páginas |
| Conectar el formulario a correo/servicio | `contacto.html` + `js/main.js` (hoy es demo) |
| Fotos faltantes: `assets/joyas/plata/` y `assets/perfumes/damas/` tienen 1 hueco cada una | se ocultan solas; puedes reponerlas |

## Mejoras respecto a la página anterior

- Las ~55 páginas HTML duplicadas del sitio viejo (una por subcategoría, cada
  una con su propio header/footer desactualizado) se reemplazan por **una sola
  plantilla** (`categoria.html`) + un archivo de datos, manteniendo URLs
  únicas por categoría.
- Header, mega menú y footer **idénticos en todas las páginas** (antes variaban).
- Mega menú del catálogo ya no se corta en el borde de la pantalla (bug del
  panel desplazado a la izquierda, corregido).
- Web clara con el producto como protagonista (pedido del cliente), diseño
  responsive hasta móvil, sin errores de consola y sin enlaces rotos
  (80 enlaces internos verificados).
