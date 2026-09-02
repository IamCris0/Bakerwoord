# Mawëwë — sitio web

Rediseño del sitio de **Mawëwë** (Lago Agrio, Ecuador). Sitio estático: HTML, CSS y
JavaScript sin dependencias ni proceso de compilación. Se sube por FTP tal cual está
la carpeta y funciona.

El sitio anterior queda intacto en [`pagina-antigua/`](pagina-antigua/) como referencia.

---

## Estructura

```
index.html          Portada
catalogo.html       Catálogo (una sola ruta para las 22 categorías)
producto.html       Ficha de producto
nosotros.html       La empresa
contacto.html       Contacto, horarios y mapa
pagos.html          Cómo comprar, formas de pago, envíos y garantía
404.html            Página de error

assets/
  css/mawewe.css    Sistema de diseño completo (tokens, componentes, responsive)
  js/sitio.js       Cabecera, mega menú, buscador, cajón móvil, pie
  js/portada.js     Slider, franja de promos, pestañas, marcas y tira social
  js/catalogo.js    Catálogo, filtros, ficha de producto, vitrinas
  js/chatbot.js     Asistente "Wë"
  data/catalogo.js  ← LOS DATOS. Slider, productos, categorías, departamentos y contacto
  img/              Fotos de producto y de marca

plantillas/         Piezas para regenerar los HTML (ver más abajo)
pagina-antigua/     Sitio anterior, sin tocar
```

---

## Cómo funcionan las rutas

En lugar de mantener 22 archivos HTML casi idénticos (como hacía el sitio anterior),
**una sola página sirve todo el catálogo** mediante parámetros en la URL:

| URL | Qué muestra |
|---|---|
| `catalogo.html` | Los 414 productos, con todos los filtros |
| `catalogo.html?dep=mujer` | Un departamento del menú superior |
| `catalogo.html?cat=peluches` | Una categoría |
| `catalogo.html?marca=Chevignon` | Una marca |
| `catalogo.html?q=perfume` | Una búsqueda |
| `producto.html?id=peluches-19` | Una ficha de producto |

Los filtros que el visitante toca se reflejan en la URL, así que **cualquier vista se
puede copiar y compartir por WhatsApp** y abre exactamente igual del otro lado.

Las URLs viejas (`peluches.html`, `relojes.html`, `empresa.html`…) redirigen con 301 a
su equivalente nuevo desde el [`.htaccess`](.htaccess), para no perder posicionamiento.

---

## Editar el contenido

### Añadir o cambiar un producto

Todo vive en **`assets/data/catalogo.js`**. Copiá una línea y cambiá los valores:

```js
{"id":"relojes-16","cat":"relojes","nombre":"Reloj Q&Q dorado",
 "marca":"Q&Q","detalle":"Línea Reloj Damas",
 "img":"assets/img/categorias/relojes/16.jpg",
 "tienda":"https://tienda.mawewe.com.ec/?product=123"}
```

- `id` — único, sin espacios. Es lo que aparece en la URL de la ficha.
- `cat` — tiene que existir en `MAWEWE_CATEGORIAS` (más abajo en el mismo archivo).
- `detalle` — texto corto: tallas, línea, presentación. Puede ir vacío.
- `tienda` — enlace de compra directa. Si va vacío, el botón lleva a la tienda general.

La foto va en `assets/img/`. No hace falta tocar ningún HTML: el menú, el pie, los
contadores por categoría, el buscador y el chatbot se actualizan solos.

### Cambiar el slider de la portada

En `MAWEWE_SLIDER`, arriba de `assets/data/catalogo.js`. Cada diapositiva es
`modo: 'editorial'`: una foto **sin fondo** (PNG con transparencia real, no una foto
recortada sobre blanco) que va directo sobre un degradado azul/rosado que dibuja el
CSS — no hace falta tarjeta ni mezcla de capas.

```js
{
  modo: 'editorial',
  fondo: 'medianoche',   // el degradado — ver tabla abajo
  tono: 'claro',         // 'claro' = texto blanco/rosado, 'oscuro' = texto marino/gris
  img: 'assets/img/hero/slide-jeans.png',
  antetitulo: 'Denim Chevignon y Americanino',
  titulo: 'El jean que<br><em>te define</em>',
  bajada: '…',
  cta:  { texto: 'Ver denim', href: 'catalogo.html?cat=jeans-men' },
  cta2: { texto: 'Ver toda la sección Hombre', href: 'catalogo.html?dep=hombre' },
  pastillas: ['Tallas 28 a 40', 'Corte slim y classic', 'Marca original']
}
```

`fondo` acepta cinco degradados, todos en la misma familia (marino + azul + rosa),
definidos en `assets/css/mawewe.css` bajo `.hs__slide[data-fondo='…']`:

| `fondo` | Cómo se ve | `tono` recomendado |
|---|---|---|
| `medianoche` | Marino oscuro liso | `claro` |
| `zafiro` | Marino a azul, con un halo rosado | `claro` |
| `electrico` | Marino a azul vivo, con un halo rosado | `claro` |
| `algodon` | Rosa a lavanda-azul, claro | `oscuro` |
| `pastel` | Celeste a rosa pastel, muy claro | `oscuro` |

`cta2` admite `href` (enlace normal), `wsp` (abre WhatsApp con ese mensaje) o
`chat: true` (abre el asistente Wë).

Existe también `modo: 'banner'` (una imagen a sangre completa con su propio arte y
texto, sin franja ni tarjeta) por si algún día hace falta una campaña así — el slider
lo sigue soportando aunque ninguna diapositiva actual lo usa.

**Las fotos de producto tienen que estar recortadas y con proporción parecida entre
sí** (más o menos 1.4:1 a 1.8:1, horizontal) — si una queda mucho más vertical que las
demás (como pasó con la foto de niños, que era un retrato de cuerpo entero), el
`object-fit: contain` la muestra desproporcionadamente más grande que al resto. La
forma de corregirlo sin recortar el contenido es ensanchar el lienzo con relleno
transparente a los costados hasta emparejar la proporción; no hay que tocar el CSS.

Reordená, borrá o agregá objetos y el slider se rearma solo: los puntos, las flechas,
el autoplay y la barra de progreso salen de la cantidad de diapositivas.

La franja negra de debajo del slider sale de `MAWEWE_PROMOS`, en el mismo archivo.

### Cambiar teléfonos, horarios o dirección

Arriba del todo de `assets/data/catalogo.js`, en `MAWEWE_NEGOCIO`. Se usa en la
cabecera, el pie, la página de contacto y el chatbot a la vez.

### Reorganizar el menú superior

En `MAWEWE_DEPARTAMENTOS` (mismo archivo). Cada departamento es un ítem del menú,
con sus columnas (`grupos`) y su tarjeta destacada con foto.

> Si agregás o quitás un departamento, acordate de reflejarlo también en la lista
> `<ul class="nav__lista">` de `plantillas/parte-cabecera.html` y regenerar (ver abajo).

---

## Colores y tipografía

Todo el sistema visual sale de las variables al inicio de `assets/css/mawewe.css`:

```css
--marino-800: #252b34;  /* color principal (pedido tal cual) */
--marino:     #35507a;  /* acento — links, botones, iconos */
--rosa-500:   #d1477e;  /* "Ofertas", urgencias */
--rosa:       #c25b8f;  /* acento secundario */
--crema:      #f6f7f9;  /* fondo */
```

El resto de tonos (`--marino-900`, `--marino-600`, `--rosa-900`, `--rosa-400`,
`--rosa-100`, y los neutros `--carbon`/`--grafito`/`--gris`/`--linea`/`--arena`) son
derivados de esos mismos tres colores — cambiando las variables de arriba, todo el
sitio se reacomoda solo.

Las tipografías son **Fraunces** (títulos, desde Google Fonts) y **Arial** (todo lo
demás: menú, botones, pastillas, fichas y textos corridos). Arial es fuente de sistema:
no se descarga nada, no depende de la conexión y no distorsiona los textos chicos en
mayúsculas.

### El logo

Es **el logo de siempre**, recoloreado y guardado como archivos propios en
`assets/img/marca/`:

| Archivo | Dónde se usa |
|---|---|
| `logo-rosa.png` | Cabecera y menú móvil (fondo claro) |
| `sello-rosa.png` | Pie de página, con el delfín (fondo oscuro) |
| `logo-marino.png` · `logo-crema.png` · `sello-crema.png` · `sello-marino.png` | Variantes de repuesto, por si algún día conviene otro contraste |

Se generaron recoloreando píxel a píxel el PNG original y conservando el canal alfa, así
que el trazo y el antialias son idénticos: sólo cambió el color. En el HTML son un
`<img class="marca">` común, y el CSS sólo les fija la **altura** (el ancho sale de la
proporción):

```css
.marca { height: 44px; width: auto; }
.marca--sello { height: 80px; }
```

Para regenerar cualquier variante: cargar `logo.png` (o `logo-footer.png` para la
versión con delfín) en un `<canvas>`, recorrer `getImageData` y, para cada píxel con
`alfa > 0`, reemplazar sus canales R/G/B por el color deseado dejando el alfa intacto;
exportar con `canvas.toDataURL('image/png')`. No hay que repetir esto a mano: cualquier
color nuevo sale con ese mismo procedimiento.

> Antes esto se resolvía con una máscara CSS sobre el PNG original. Se cambió porque la
> máscara depende del soporte de `mask` y de cómo resuelva el navegador la ruta relativa
> del CSS, y en algunos casos el logo simplemente no aparecía. Con un `<img>` se ve
> siempre. La contra: si cambia el color de la marca hay que regenerar esos PNG.

---

## Regenerar los HTML

Las siete páginas comparten cabecera y pie. Para no editarlos siete veces, están
separados en `plantillas/`:

```
plantillas/parte-cabecera.html   Barra de anuncios, cabecera, menú, buscador, cajón móvil
plantillas/parte-pie.html        Pie, botón de WhatsApp y los <script>
plantillas/cuerpo-*.html         El contenido propio de cada página
plantillas/armar.sh              Junta todo y escribe los .html de la raíz
```

Con Git Bash (o cualquier shell) desde la raíz del proyecto:

```sh
bash plantillas/armar.sh
```

> **Ojo:** el script sobrescribe los `.html` de la raíz. Si preferís editar los HTML
> a mano, hacelo y no vuelvas a ejecutar `armar.sh`. Si vas a seguir usando las
> plantillas, editá siempre en `plantillas/`.

---

## Publicar

Subir por FTP a la raíz del hosting:

- `index.html`, `catalogo.html`, `producto.html`, `nosotros.html`, `contacto.html`,
  `pagos.html`, `404.html`
- `assets/`
- `.htaccess`, `robots.txt`, `sitemap.xml`

`plantillas/` y `pagina-antigua/` no hacen falta en el servidor (y quedan excluidas
de los buscadores en `robots.txt`).

---

## Pendientes conocidos

- **Precios.** El sitio anterior no publicaba ninguno, así que la ficha dice
  "Precio a consultar" y empuja a WhatsApp. Si en algún momento se cargan precios,
  agregar un campo `precio` a cada producto y mostrarlo en `catalogo.js`.
- **Nombres repetidos.** Varios productos comparten nombre porque así estaban en el
  sitio viejo (por ejemplo tres "Panda Gigante 140cm" con fotos distintas). Se
  arreglan editando `nombre` en `assets/data/catalogo.js`.
- **Las fotos del slider pesan mucho.** Las cinco (`assets/img/hero/slide-*.png`) están
  entre 500 KB y 1.5 MB porque salieron de un recorte por canvas sin optimizador de PNG
  (esta máquina no tenía `pngquant`/`cwebp`/ImageMagick a mano). Pasarlas por un
  optimizador de PNG, o a WebP con transparencia, las bajaría bastante sin perder
  calidad visible.
- **Fotos del catálogo.** Son las del sitio anterior, en JPG sin optimizar (~51 MB en
  total). Convertirlas a WebP reduciría bastante el peso de las páginas.
- **Relojes aparece en Mujer y en Hombre.** La categoría `relojes` mezcla líneas de
  dama y de caballero, así que en el departamento Mujer se cuelan relojes de hombre.
  Se arregla partiéndola en dos categorías (`relojes-damas` / `relojes-hombres`) en
  `MAWEWE_CATEGORIAS` y cambiando el `cat` de cada producto: el campo `detalle` ya
  dice cuál es cuál.
- **Redes sociales.** Los enlaces de Instagram y TikTok del pie están armados con el
  usuario `mawewe_ec`; conviene verificarlos antes de publicar.
