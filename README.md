# Creatividad Láser — sitio web

Sitio del taller de corte y grabado láser de Nueva Loja (Lago Agrio), Ecuador.
Es un sitio **estático**: se genera con Node y el resultado se sube por FTP a
cualquier hosting. No necesita base de datos, PHP ni servidor especial.

---

## Cómo trabajar con el sitio

```bash
npm run build     # regenera todo el HTML
npm run dev       # regenera y levanta http://localhost:4321 para revisar
npm run imagenes  # optimiza las fotos (sólo al agregar fotos nuevas)
```

No hay dependencias que instalar. Sólo hace falta Node 18 o superior.

**Sobre las imágenes.** Muchas fotos del archivo estaban guardadas como PNG y
pesaban hasta 400 KB cada una; la portada llegaba a 2,6 MB. `npm run imagenes`
genera copias en JPEG dentro de `assets/img/` y el sitio las usa
automáticamente: la portada bajó a 1,3 MB. Corré ese comando sólo cuando sumes
o cambies fotos; el resto del tiempo alcanza con `npm run build`.

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

## ⚠️ Revisar antes de publicar

Del sitio anterior se pudo confirmar la dirección, los teléfonos, el correo, el
horario, los bancos, el Facebook y las fotos de los productos. **Todo lo demás
son textos comerciales que hay que verificar**, porque son compromisos con el
cliente. Repasá esta lista:

1. **Plazos de producción.** Cada ficha dice «3 a 5 días hábiles» (o 1 a 2, o 5
   a 7). Están en `data/productos.js`, campo `tiempo`. Ajustalos a lo que
   realmente tardás.

2. **Pedidos mínimos.** Algunas fichas piden «desde 20 piezas». Campo `minimo`.

3. **Medidas.** Las medidas de cada producto (`medidas`) son estimadas a partir
   de las fotos. Corregí las que no coincidan.

4. **Las 4 promesas de la franja principal.** `data/site.js` → `garantias`:
   boceto previo, plazo, envíos y garantía de rehacer piezas falladas. Aparecen
   en todas las páginas.

5. **Preguntas frecuentes.** `data/site.js` → `faq`. En especial el 50% de
   anticipo y la respuesta sobre envíos.

6. **Los 4 pasos del proceso.** `data/site.js` → `proceso`.

7. **Año de apertura.** `data/site.js` → `fundacion` está en `null`, así que el
   sitio no dice ninguna fecha ni cuenta años de trayectoria. Poné el año real y
   las frases aparecen solas.

8. **Opiniones de clientes.** `data/site.js` → `testimonios` está vacío y la
   sección no se muestra. No pusimos reseñas de relleno: inventarlas engaña al
   comprador. Pegá ahí comentarios reales y la sección se activa sola.

9. **Redes sociales.** Sólo Facebook y WhatsApp están puestos, porque son los
   únicos confirmados. Instagram y TikTok quedaron comentados en `redes`;
   descomentalos con el usuario real si existen.

10. **Fotos en mejor resolución.** El archivo actual llega a 450 px de ancho. El
    sitio está armado para que se vean nítidas a ese tamaño (ninguna se estira),
    pero si algún día se vuelven a fotografiar las piezas a 1600 px, el sitio
    gana mucho. Varias fotos traen una marca «1/9» de catálogo en la esquina;
    conviene reemplazarlas.

---

## Publicar

Subí al hosting **todo el contenido de la carpeta**, incluyendo:

- los `.html` de la raíz, `producto/` y `ocasiones/`
- `assets/` completo (ahí están el CSS, el JS y las fotos optimizadas)
- `pagina-antigua/assets/images/logo.png`, el favicon y los logos de bancos
- `.htaccess`, `sitemap.xml`, `robots.txt`

Si ya corriste `npm run imagenes`, el sitio sirve las fotos desde
`assets/img/` y no necesita el resto de `pagina-antigua/` para funcionar.
Conviene subirlo igual la primera vez, por si alguna referencia quedó apuntando
al original.

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
