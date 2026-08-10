# Agencia Detective — Sitio web

Rediseño completo del sitio de Agencia Detective (investigación privada, Ecuador).
Sustituye la plantilla Bootstrap 3 «Jango» anterior.

> La plantilla original vive en `pagina-antigua/`, **fuera del control de versiones**:
> son 205 MB de plugins e imágenes de stock que no se reutilizan. Se conserva sólo
> en local como referencia del contenido previo.

## Stack

HTML5, CSS moderno (propiedades personalizadas, grid, `clamp()`) y JavaScript sin
dependencias. **No hay paso de compilación ni `node_modules`**: se sube tal cual a
cualquier hosting estático o servidor Apache/Nginx.

Se eliminaron jQuery, Bootstrap 3, Revolution Slider, Owl Carousel, Cube Portfolio,
Fancybox, Font Awesome y el resto de plugins de la plantilla original.

## Estructura

```
index.html                Portada con video de fondo
servicios.html            Catálogo de las 9 líneas de servicio
portafolio.html           Investigación de infidelidad (página especializada)
contactos.html            Formulario de consulta y canales directos
politicaprivacidad.html   Documento legal

assets/
  css/
    tokens.css            Color, tipografía, espaciado, sombras, movimiento
    base.css              Reset, tipografía base, utilidades, revelado al scroll
    layout.css            Cabecera, portada, cabeceras interiores, pie, flotantes
    components.css        Botones, tarjetas, acordeón, pestañas, formulario, etc.
    chat.css              Asistente de admisión flotante
  js/
    main.js               Cabecera, menú, pestañas, contadores, formulario
    chat.js               Asistente de admisión (construye su propio marcado)
  img/                    Fotografía en JPEG y WebP (el WebP es el que se sirve)
  video/
    investigacion.mp4     Video rescatado del slider del sitio anterior
  brand/
    logo.svg              Logotipo completo
    favicon.svg           Isotipo para pestaña del navegador

sitemap.xml, robots.txt
```

Los nombres de archivo se mantuvieron idénticos a los del sitio anterior
(`portafolio.html`, `contactos.html`, `politicaprivacidad.html`) para no perder el
posicionamiento ya ganado ni romper enlaces externos.

## Sistema de diseño

| Rol | Valor |
| --- | --- |
| Tinta (fondos oscuros) | `#0A1424` |
| Azul de marca | `#2C6FD1` |
| Ámbar (acento del isotipo) | `#F2A93B` |
| Papel (fondos claros) | `#F5F6F8` |
| Titulares | Archivo |
| Texto | Public Sans |
| Etiquetas y datos | IBM Plex Mono |

Todos los valores viven en `assets/css/tokens.css`. Para ajustar la identidad basta
con editar ese archivo.

## Formulario de consulta

El sitio no tiene servidor detrás. El formulario de `contactos.html` valida en el
navegador y compone un mensaje de WhatsApp ya redactado que el usuario decide si
envía. Nada sale del dispositivo antes de eso.

Tiene tres bloques: **sus datos** y **el encargo** (obligatorios) y **persona a
investigar** (todo opcional: nombre, relación, edad, documento, teléfono, ciudad,
domicilio, trabajo, vehículo, redes, rutina y fotografía).

El mensaje se redacta con formato de WhatsApp (`*negrita*`) y **omite los campos
vacíos**, para que quien lo recibe no lea una lista de «no indicado».

### La fotografía

`wa.me` sólo transporta texto, así que el envío se bifurca:

| Situación | Qué ocurre |
| --- | --- |
| Móvil con Web Share API | `navigator.share()` manda texto **e imagen** juntos; el usuario elige WhatsApp |
| Escritorio, o sin soporte | Se abre `wa.me` con el texto y se avisa de que adjunte la foto; la vista previa se mantiene en pantalla |

La compartición nativa se limita a dispositivos táctiles a propósito: Chrome de
escritorio expone la API pero abre la hoja de Windows, donde WhatsApp casi nunca
aparece.

Para cambiar el número destinatario, edite el atributo `data-whatsapp` del
formulario en `contactos.html`.

Si en el futuro se quiere recibir las consultas por correo, hace falta añadir un
endpoint (PHP en el propio hosting, o un servicio tipo Formspree) y sustituir el
bloque de envío en `initForm()` dentro de `assets/js/main.js`.

## Asistente de admisión

Burbuja flotante presente en las cinco páginas. Hace una triaje de cinco preguntas
(caso, datos disponibles, urgencia, ciudad y un campo libre), muestra un resumen y
entrega la consulta al canal real: WhatsApp, teléfono o el formulario completo.
Si el usuario indica que tiene una fotografía, prioriza el formulario, que es el
único sitio donde se sube directamente.

No es un modelo de lenguaje ni responde preguntas abiertas: es un guion cerrado.
Todo ocurre en el navegador y nada se almacena, salvo una marca en `sessionStorage`
para no repetir el aviso emergente en cada página.

El guion vive en la constante `FLUJO` al inicio de
[assets/js/chat.js](assets/js/chat.js): añadir, quitar o reordenar preguntas es
editar ese objeto. El widget construye su propio marcado, así que las páginas sólo
necesitan el `<link>` y el `<script>`.

## Datos de contacto publicados

- Teléfono principal / WhatsApp: 098 142 8621
- Línea alterna: 096 822 5701
- Correo: info@agencia-detective.com

Aparecen en la cabecera, el pie, la página de contacto y el JSON-LD de cada página.
Si cambian, hay que actualizarlos en las cinco páginas.

## Imágenes y rendimiento

Cada fotografía existe en dos formatos: **WebP**, que es el que reciben los
navegadores actuales, y **JPEG** como respaldo. En las etiquetas se resuelve con
`<picture>`; en los fondos CSS, declarando primero el JPEG y luego la misma regla
con `image-set()`, que los navegadores antiguos descartan sin perder el fallback.

Los tamaños se fijan según el uso real: 1700 px los fondos a pantalla completa,
900 px las imágenes dentro de una columna y 700 px las piezas del mosaico.
El conjunto en WebP ocupa **980 KB**, y ninguna página carga más de unas pocas.

> **Importante para regenerarlas.** Las rutas de imagen en CSS se declaran en
> clases (`.img-niebla`, `.img-noche`…) y **nunca** dentro de una custom
> property: las `url()` de una variable se resuelven contra la hoja que las
> consume, no contra el documento, y terminan apuntando a `assets/css/assets/img/`.

### El video de portada

Pesa 8 MB, así que no se descarga siempre. El elemento lleva `preload="none"` y
la fuente en `data-src`; `initHeroVideo()` sólo la asigna cuando tiene sentido.
Se queda en el póster (41 KB en WebP, un fotograma del propio video) si:

- la pantalla mide 760 px o menos,
- el navegador pide ahorro de datos (`navigator.connection.saveData`),
- la conexión es 2G,
- o el sistema pide movimiento reducido.

## Accesibilidad y rendimiento

- Enlace de salto al contenido y foco visible en todos los elementos interactivos.
- Pestañas con el patrón `tablist` de la ARIA APG, navegables con flechas.
- Acordeones sobre `<details>` nativo.
- `prefers-reduced-motion` desactiva animaciones, contadores y autoplay del video.
- Sin librerías externas: la única petición a terceros es la de Google Fonts.
- El contenido no depende del JavaScript: el estado oculto de `.reveal` sólo se
  aplica bajo la clase `js`, que añade un script en línea del `<head>`. Sin JS,
  todo se ve de entrada.

> **Cuidado con `backdrop-filter` en la cabecera.** Crea bloque contenedor para
> los descendientes `position: fixed`, y el panel de navegación móvil vive dentro
> de la cabecera. Aplicado sobre `.site-header`, el menú quedaba recortado a la
> altura del header en cuanto se hacía scroll. Por eso el fondo desenfocado está
> en `.site-header::before` y no en el elemento.

## Vista previa local

```bash
python -m http.server 8000
```

Y abrir <http://localhost:8000>. Hace falta servirlo por HTTP: abrir los archivos
con doble clic (`file://`) impide que cargue el video.

## Pendiente

- **Imagen para redes sociales.** Las etiquetas `og:image` apuntan a
  `assets/brand/og-image.png`, que todavía no existe. Hace falta un PNG de
  1200 × 630 px con el logotipo sobre fondo tinta.
- **Fotografía propia.** El sitio no usa fotografías: las de la plantilla anterior
  eran material de archivo de baja calidad y se descartaron. Fotos reales del equipo
  o de material de trabajo reforzarían las páginas de servicios e infidelidades.
- **Recodificar el video.** Pesa 8,3 MB. Una versión WebM o un MP4 re-comprimido
  bajaría bastante el tiempo de carga de la portada.
