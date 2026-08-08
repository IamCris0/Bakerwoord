# Agencia Detective — Sitio web

Rediseño completo del sitio de Agencia Detective (investigación privada, Ecuador).
Sustituye la plantilla Bootstrap 3 «Jango» anterior, conservada en
[pagina-antigua/](pagina-antigua/) sólo como referencia.

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
  js/
    main.js               Cabecera, menú, pestañas, contadores, formulario
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

Para cambiar el número destinatario, edite el atributo `data-whatsapp` del
formulario en `contactos.html`.

Si en el futuro se quiere recibir las consultas por correo, hace falta añadir un
endpoint (PHP en el propio hosting, o un servicio tipo Formspree) y sustituir el
bloque de envío en `initForm()` dentro de `assets/js/main.js`.

## Datos de contacto publicados

- Teléfono principal / WhatsApp: 098 142 8621
- Línea alterna: 096 822 5701
- Correo: info@agencia-detective.com

Aparecen en la cabecera, el pie, la página de contacto y el JSON-LD de cada página.
Si cambian, hay que actualizarlos en las cinco páginas.

## Accesibilidad y rendimiento

- Enlace de salto al contenido y foco visible en todos los elementos interactivos.
- Pestañas con el patrón `tablist` de la ARIA APG, navegables con flechas.
- Acordeones sobre `<details>` nativo.
- `prefers-reduced-motion` desactiva animaciones, contadores y autoplay del video.
- Sin librerías externas: la única petición a terceros es la de Google Fonts.

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
