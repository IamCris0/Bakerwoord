# Creatividad Láser — sitio web

Sitio del taller de corte y grabado láser de Nueva Loja (Lago Agrio), Ecuador.
Es un sitio **estático**: se genera con Node y el resultado se sube por FTP a
cualquier hosting. No necesita base de datos, PHP ni servidor especial.

---

## Cómo trabajar con el sitio

```bash
npm run build     # regenera todo el HTML
npm run dev       # regenera y levanta http://localhost:4321 para revisar
```

No hay dependencias que instalar. Sólo hace falta Node 18 o superior.

> **Importante:** los archivos `.html` de la raíz, de `producto/` y de
> `ocasiones/` **se generan automáticamente**. Si los editás a mano, el próximo
> `npm run build` pisa los cambios. Editá `data/` y `templates/`.

---

## Dónde se cambia cada cosa

| Quiero cambiar…                                   | Archivo                       |
| ------------------------------------------------- | ----------------------------- |
| Teléfono, dirección, horario, redes sociales      | `data/site.js`                |
| Preguntas frecuentes                              | `data/site.js` → `faq`        |
| Los 4 pasos del proceso                           | `data/site.js` → `proceso`    |
| Materiales y espesores                            | `data/site.js` → `materiales` |
| Opiniones de clientes                             | `data/site.js` → `testimonios`|
| Productos (nombre, fotos, descripción, precio…)   | `data/productos.js`           |
| Categorías, subcategorías y ocasiones             | `data/taxonomia.js`           |
| Redirecciones del sitio viejo                     | `data/redirecciones.js`       |
| Colores, tipografías, espaciados                  | `styles/01-base.css`          |
| Textos de la portada                              | `templates/home.js`           |
| Respuestas del asistente                          | `assets/js/bot.js`            |

Después de cualquier cambio: `npm run build`.

---

## Añadir un producto

1. Abrí `data/productos.js`.
2. Copiá un bloque completo de producto (desde `{` hasta `},`).
3. Cambiá el `id` — tiene que ser único, sin espacios ni tildes. Ese `id` es la
   URL: `producto/<id>.html`.
4. Apuntá `galeria` a fotos que existan dentro de
   `pagina-antigua/assets/images/`. El atajo `g('carpeta', 'jpg', [1,2,3])` arma
   la lista sola.
5. Ejecutá `npm run build`. La ficha, el menú, el buscador, el sitemap y los
   filtros se actualizan solos.

El `build` avisa si un producto apunta a una subcategoría o una ocasión que no
existe.

---

## Qué falta antes de publicar

Tres cosas que dependen del taller, no del código:

1. **Opiniones de clientes.** `data/site.js` → `testimonios` está vacío a
   propósito y la sección no aparece. No pusimos reseñas de relleno porque
   inventarlas engaña al comprador. Copiá ahí comentarios reales (Facebook,
   Google, capturas de WhatsApp con permiso) y la sección se activa sola.

2. **Fotos en mejor resolución.** El archivo actual tiene fotos de 320 a 450
   píxeles de ancho. El sitio está armado para que se vean bien a ese tamaño
   (nunca se estiran), pero si algún día se fotografían las piezas de nuevo, con
   1600 px de lado el sitio gana bastante. Varias fotos del archivo tienen una
   marca «1/9» de catálogo en la esquina; conviene reemplazarlas.

3. **Enlaces de redes.** Verificá los perfiles en `data/site.js` → `redes`.
   Instagram y TikTok están puestos con el usuario esperado; si el usuario real
   es otro, corregilo.

---

## Publicar

Subí al hosting **todo el contenido de la carpeta**, incluyendo:

- los `.html` de la raíz, `producto/` y `ocasiones/`
- `assets/`
- `pagina-antigua/assets/` y `pagina-antigua/galeria/` (ahí viven las fotos)
- `.htaccess`, `sitemap.xml`, `robots.txt`

`.htaccess` fuerza HTTPS y redirige las 63 URLs del sitio anterior a su página
nueva, para no perder el posicionamiento en Google ni romper los enlaces
compartidos en Facebook y WhatsApp. Si el hosting usa Nginx en vez de Apache,
pasale a soporte la lista de `data/redirecciones.js`.

No hace falta subir `data/`, `templates/`, `styles/`, `build.js` ni
`servidor.js`: son las fuentes, no el sitio. Tampoco molestan si van.

---

## Estructura

```
data/            contenido editable (productos, taxonomía, datos del taller)
templates/       plantillas que arman el HTML
styles/          hojas de estilo fuente (se concatenan en assets/css/site.css)
assets/          CSS y JS finales que usa el navegador
producto/        fichas generadas, una por producto
ocasiones/       páginas generadas, una por ocasión
pagina-antigua/  sitio anterior — se conserva por su archivo de fotos
build.js         el generador
servidor.js      servidor local para ver el sitio antes de subirlo
```
