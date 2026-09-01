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

En `MAWEWE_SLIDER`, arriba de `assets/data/catalogo.js`. Hay dos tipos de diapositiva:

**`modo: 'editorial'`** — el fondo lo dibuja el CSS con la paleta de la marca y el texto
lo pone la web. La foto del producto se recorta sola (el `mix-blend-mode: multiply`
hace desaparecer el fondo blanco), así que **funciona con cualquier foto de catálogo
que esté sobre fondo blanco**. El campo `fondo` acepta:

| `fondo` | Cómo se ve |
|---|---|
| `vino` | Fondo vino oscuro, texto claro, la foto va sobre una tarjeta crema |
| `arena` | Fondo arena claro, texto vino, la foto se funde con el fondo |
| `oro` | Igual que arena pero en tono dorado |

**`modo: 'banner'`** — la imagen ocupa todo y ya trae su propio arte y texto. Es el
formato de los banners que venían del sitio anterior (`assets/img/hero/1_1.png`,
`1_2.png`, `1_3.png`). Sólo se le superpone el botón, abajo a la izquierda.

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
--vino: #741d2a;    /* color principal */
--oro:  #b4823a;    /* acento */
--crema:#faf6f0;    /* fondo */
```

Cambiando esas tres líneas cambia el sitio entero.

Las tipografías son **Fraunces** (títulos, desde Google Fonts) y **Arial** (todo lo
demás: menú, botones, pastillas, fichas y textos corridos). Arial es fuente de sistema:
no se descarga nada, no depende de la conexión y no distorsiona los textos chicos en
mayúsculas.

### El logo

Es **el logo de siempre**, recoloreado a la paleta nueva y guardado como archivos
propios en `assets/img/marca/`:

| Archivo | Dónde se usa |
|---|---|
| `logo-vino.png` | Cabecera y menú móvil (fondo claro) |
| `sello-crema.png` | Pie de página, con el delfín (fondo oscuro) |
| `logo-crema.png` · `sello-vino.png` | Variantes de repuesto |

Se generaron recoloreando píxel a píxel el PNG original y conservando el canal alfa, así
que el trazo y el antialias son idénticos: sólo cambió el color. En el HTML son un
`<img class="marca">` común, y el CSS sólo les fija la **altura** (el ancho sale de la
proporción):

```css
.marca { height: 44px; width: auto; }
.marca--sello { height: 80px; }
```

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
- **Los banners del slider desentonan.** `1_1.png`, `1_2.png` y `1_3.png` vienen del
  sitio anterior con fondo azul y violeta y texto rosa quemado en la imagen, así que
  cortan con la paleta vino. Se dejaron porque son material que ya existía, pero lo
  ideal es rehacerlos en vino/oro, o directamente borrarlos de `MAWEWE_SLIDER` y dejar
  sólo las diapositivas editoriales (que se arman con cualquier foto de catálogo).
- **Pesan mucho.** Cada uno de esos tres PNG ocupa más de 1 MB. Pasarlos a JPG o WebP
  de ancho 1920 los dejaría por debajo de 200 KB cada uno.
- **Fotos.** Son las del sitio anterior, en JPG sin optimizar (~51 MB en total).
  Convertirlas a WebP reduciría bastante el peso de las páginas.
- **Relojes aparece en Mujer y en Hombre.** La categoría `relojes` mezcla líneas de
  dama y de caballero, así que en el departamento Mujer se cuelan relojes de hombre.
  Se arregla partiéndola en dos categorías (`relojes-damas` / `relojes-hombres`) en
  `MAWEWE_CATEGORIAS` y cambiando el `cat` de cada producto: el campo `detalle` ya
  dice cuál es cuál.
- **Redes sociales.** Los enlaces de Instagram y TikTok del pie están armados con el
  usuario `mawewe_ec`; conviene verificarlos antes de publicar.
