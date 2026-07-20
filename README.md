# Crazyshop — Demo de página de inicio

Recreación en HTML/CSS/JS de la página de inicio de Crazyshop (header con anuncio,
buscador, menú de categorías, carrusel principal, tarjetas de oferta y franja de
beneficios), lista para presentar localmente o compartir por red.

## Estructura de carpetas

```
crazyshop/
├── index.html          Página de inicio
├── css/
│   └── styles.css      Estilos (tokens de diseño, componentes, responsive)
├── js/
│   └── main.js         Carrusel, menú móvil, mega menú de categorías, badges
├── assets/img/         (reservado para imágenes propias, si quieres reemplazar las de stock)
├── server.js           Servidor local sin dependencias (Node.js)
├── package.json
└── README.md
```

## Cómo verlo localmente

**Opción rápida (doble clic):** abre `index.html` directamente en el navegador.
Funciona, pero para compartirlo por red necesitas un servidor (opción de abajo).

**Con servidor local (recomendado para compartir):**

```bash
cd crazyshop
node server.js
```

Verás algo como:

```
Local:     http://localhost:8080
En tu red: http://192.168.1.23:8080
```

- Abre la URL **Local** en tu propia PC.
- Comparte la URL **"En tu red"** con alguien conectado al mismo Wi-Fi/red local
  (oficina, casa) — podrá abrirla directamente en su navegador.
- Para usar otro puerto: `node server.js 3000`

También puedes usar `npm start` (equivalente a `node server.js`).

### Alternativa con Python

Si prefieres no usar Node.js:

```bash
cd crazyshop
python -m http.server 8080
```

## Compartir fuera de tu red local (opcional)

La opción "En tu red" solo funciona si la otra persona está en la misma red
Wi-Fi/LAN. Para que alguien fuera de tu red acceda:

1. Revisa que el Firewall de Windows permita conexiones entrantes al puerto usado
   (Windows puede pedir confirmación la primera vez que ejecutes `node server.js`; acepta "Permitir acceso").
2. Configura redirección de puertos (port forwarding) en tu router hacia la IP de
   tu PC y el puerto del servidor, o usa un túnel temporal (por ejemplo `ngrok`,
   `cloudflared`) si prefieres no tocar la configuración del router.

## Notas de diseño

- Tipografía: Poppins (encabezados) + Inter (texto), vía Google Fonts.
- Paleta: naranja marca `#F2542D`, tinta `#17181C`, fondo `#F7F6F3`, más los tres
  acentos de las tarjetas de oferta (menta, ladrillo, dorado).
- Interacciones: header que se compacta al hacer scroll, mega menú de categorías,
  carrusel con autoplay/swipe/flechas/puntos, menú móvil con hamburguesa, y
  contadores animados en los íconos de comparar/favoritos/carrito.
- Las fotografías del héroe y las tarjetas de oferta son imágenes de stock
  (Unsplash) usadas solo como referencia visual; reemplázalas en `index.html`
  (atributo `style="--img:url(...)"`) por tus propias imágenes en `assets/img/`
  cuando tengas fotografía real de producto.
