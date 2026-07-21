# Joyería El Palacio del Amor — Sitio de demostración

Rediseño completo del sitio de **Joyería El Palacio del Amor** (Lago Agrio y El
Coca, Ecuador), en HTML/CSS/JS puro, sin frameworks ni build tools. Reemplaza
el diseño anterior por una identidad propia en oro, vino y crema, inspirada en
tu historia real de 37 años, y queda lista para presentar localmente o
compartir por red mientras se conectan los datos reales.

## Estructura de carpetas

```
palacio-del-amor/
├── index.html              Inicio
├── quienes-somos.html      Historia, Misión/Visión, Política, Preguntas Frecuentes
├── productos.html          Catálogo con filtros por categoría
├── servicio-tecnico.html   Grabado láser, reparación, proceso de trabajo
├── contacto.html           Formulario, sucursales, WhatsApp, mapa
├── noticias.html           Noticias y premios (contenido de ejemplo)
├── css/styles.css          Sistema de diseño (colores, tipografía, componentes)
├── js/main.js              Menús, carrusel, filtros, acordeón, formulario
├── server.js               Servidor local sin dependencias (Node.js)
├── package.json
└── README.md
```

## Cómo verlo localmente

```bash
cd palacio-del-amor
node server.js
```

Verás algo como:

```
Local:     http://localhost:8080
En tu red: http://192.168.1.23:8080
```

- Abre la URL **Local** en tu propia PC.
- Comparte la URL **"En tu red"** con alguien en el mismo Wi-Fi (oficina, casa).
- Para otro puerto: `node server.js 3000`. También puedes usar `npm start`.

Alternativa sin Node.js: `python -m http.server 8080` desde la carpeta del proyecto.

## Qué se rediseñó y por qué

- **Identidad visual nueva — versión clara**: el sitio es predominantemente
  blanco/crema (`#FBF6EC`, `#F3ECDD`), con el oro corporativo (`#B8872E`) como
  único acento fuerte y el vino (`#6E1F2B`) reservado a detalles pequeños
  (etiquetas, enlaces). No queda ningún bloque negro/oscuro en la barra
  superior, el menú, la franja de cifras, el banner de subpáginas, la cita ni
  el pie de página — todos son claros con texto oscuro, siguiendo el pedido
  de "web clara, no oscura, que resalten los productos". Tipografía Playfair
  Display (encabezados, cursiva para el nombre de marca) + Inter (texto/UI).
  Paleta ajustada tras revisar como referencia guillermovazquezjoyeria.com
  (fondo claro, producto protagonista, acento cálido único).
- **Navegación reorganizada**: se unificó "Nuestra Historia" y "Misión y
  Visión" (antes duplicadas en `mision-vision.html` e `historia.html`) en una
  sola página `quienes-somos.html` con anclas, evitando contenido repetido.
- **Pie de página consistente**: antes las categorías del footer cambiaban de
  una página a otra; ahora es el mismo bloque en las 6 páginas.
- **Contenido real conservado**: historia, fundación (14 feb. 1989), misión,
  visión, política de 4 pilares y horarios de atención se tomaron de tu sitio
  actual y se re-redactaron para el nuevo diseño.
- **Sin funcionalidades inventadas**: no se agregó carrito de compras ni pagos
  en línea porque el sitio actual funciona como catálogo + contacto directo,
  no como tienda con checkout.

## ⚠️ Datos que debes reemplazar antes de publicar

Este sitio usa **imágenes de stock** y **datos de contacto marcados como
plantilla** a propósito, para no inventar información real de tu negocio.
Busca y reemplaza en los 6 archivos `.html`:

| Dato | Marcador usado | Dónde |
|---|---|---|
| Teléfono / WhatsApp | `+593 6 XXX-XXXX` | Header, footer, página de Contacto |
| Botón "Abrir WhatsApp" | `href="#"` | `contacto.html` — cámbialo por tu enlace `https://wa.me/593XXXXXXXXX` |
| Correo | `info@elpalaciodelamorjoyeria.com` | Footer y Contacto — confirma que sea el correo que realmente monitoreas |
| Direcciones exactas | `[agrega tu dirección exacta]` | `contacto.html`, tarjetas de sucursales |
| Mapa | Placeholder con instrucciones | `contacto.html` — pega el iframe de Google Maps de cada sucursal |
| Fotos de productos | Fotos de stock (Unsplash) | `index.html`, `productos.html` — reemplaza por fotos reales de tus joyas |
| Redes sociales | `href="#"` | Todas las páginas — agrega tus enlaces reales de Facebook/Instagram/YouTube |
| Noticias | Artículos "[Título de ejemplo]" | `noticias.html` — reemplaza por tus noticias/premios reales |
| Preguntas frecuentes | Redactadas de forma genérica | `quienes-somos.html` — confirma que las políticas (garantía, pagos, grabado) sean exactamente las tuyas |
| Formulario de contacto | No envía correos todavía | `contacto.html` / `js/main.js` — conéctalo a un servicio de formularios (Formspree, EmailJS, etc.) o a tu backend |

## Notas de diseño

- **Motivo de marca**: un divisor dorado con un pequeño "diamante" (rombo) se
  repite como separador entre secciones — un guiño discreto a la joyería,
  reutilizado en vez de líneas genéricas.
- **Franja de cifras** (1989 · 37 años · 2 sucursales · Oro 18k) en el
  Inicio: son datos reales tomados de tu historia, no decoración.
- **Categorías** con menú desplegable (Quiénes Somos) y mega-menú (Productos),
  con versión colapsable en móvil.
- **Accesibilidad**: foco visible en todos los controles, `prefers-reduced-motion`
  respetado en carrusel y animaciones, formularios con `<label>` asociados.
