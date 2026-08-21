'use strict';

/* =============================================================================
   CREATIVIDAD LÁSER — Configuración global del sitio
   Única fuente de verdad para marca, contacto, navegación y contenido editorial.
   Editá este archivo y ejecutá `npm run build` para regenerar el sitio.
   ========================================================================== */

const IMG = 'pagina-antigua/assets/images';

const site = {
  nombre: 'Creatividad Láser',
  lema: 'Si lo puedes imaginar, lo podemos crear',
  dominio: 'https://www.creatividad-laser.com',
  descripcion:
    'Taller de corte y grabado láser en Lago Agrio. Lámparas LED en acrílico grabado, cúpulas con flores preservadas, placas de reconocimiento y recuerdos personalizados con envíos a todo Ecuador.',

  /* Año de apertura del taller.
     Dejalo en `null` mientras no esté confirmado: con null, el sitio no dice
     ninguna fecha ni cuenta años de trayectoria. Poné el año real (ej. 2016)
     y las frases correspondientes aparecen solas. */
  fundacion: null,

  /* Dos versiones del isotipo: logo.png tiene "Creatividad" en trazo oscuro
     (para fondos claros: cabecera, cajón móvil). logo-2.png lo tiene en
     blanco (para fondos oscuros: el pie de página). Viven en assets/img/marca/
     —no en pagina-antigua/— para que el sitio no dependa de esa carpeta al
     subirlo al servidor. */
  logo: 'assets/img/marca/logo.png',
  logoClaro: 'assets/img/marca/logo-2.png',
  favicon: 'assets/img/marca/favicon.png',

  contacto: {
    telefono1: '098 992 6138',
    telefono1Tel: '+593989926138',
    telefono2: '099 368 1748',
    telefono2Tel: '+593993681748',
    whatsapp: '593989926138',
    email: 'info@creatividad-laser.com',
    direccion: 'Calle 12 de Febrero 1913, entre Av. Quito y Jorge Añazco',
    referencia: 'Junto al Banco Pichincha',
    ciudad: 'Nueva Loja (Lago Agrio)',
    provincia: 'Sucumbíos',
    pais: 'Ecuador',
    horario: 'Lunes a sábado, 09:00 – 20:00',
    horarioCorto: 'Lun a Sáb · 09:00 – 20:00',
    mapa: 'https://maps.google.com/?q=Creatividad+Laser+Lago+Agrio+Ecuador',
  },

  /* Sólo Facebook está confirmado (es el enlace que usaba el sitio anterior).
     Para sumar Instagram o TikTok, descomentá la línea y poné el usuario real:
     un ícono que lleva a un perfil inexistente hace perder al visitante. */
  redes: [
    { nombre: 'Facebook', icono: 'facebook-f', url: 'https://www.facebook.com/creatividadlaser.ec' },
    // { nombre: 'Instagram', icono: 'instagram', url: 'https://www.instagram.com/TU_USUARIO' },
    // { nombre: 'TikTok', icono: 'tiktok', url: 'https://www.tiktok.com/@TU_USUARIO' },
    { nombre: 'WhatsApp', icono: 'whatsapp', url: 'https://wa.me/593989926138' },
  ],

  /* Barra superior rotativa */
  avisos: [
    'Envíos a todo el Ecuador y también al exterior',
    'Boceto digital sin costo antes de fabricar',
    'Producción propia en el taller de Lago Agrio',
  ],

  /* -------------------------------------------------------------------------
     PROMESAS AL CLIENTE — revisalas antes de publicar.

     Estas cuatro frases aparecen en toda la web y son compromisos concretos:
     plazos, garantía y forma de trabajo. Están redactadas según lo que hace un
     taller de este tipo, pero nadie las confirmó todavía. Leelas y ajustá lo
     que no coincida con cómo trabajás realmente. Prometer algo que después no
     se cumple cuesta más caro que no prometerlo.
     ---------------------------------------------------------------------- */
  garantias: [
    {
      icono: 'pen-ruler',
      titulo: 'Boceto antes de cortar',
      texto: 'Aprobás el diseño digital antes de que la máquina encienda.',
    },
    {
      icono: 'bolt',
      titulo: '3 a 5 días hábiles',
      texto: 'Producción propia, sin intermediarios ni esperas de importación.',
    },
    {
      icono: 'truck-fast',
      titulo: 'Envíos a todo Ecuador',
      texto: 'Empaque anti-golpes y guía de rastreo el día del despacho.',
    },
    {
      icono: 'shield-halved',
      titulo: 'Garantía de taller',
      texto: 'Si el grabado sale con falla, lo rehacemos sin costo.',
    },
  ],

  /* Proceso — es una secuencia real, por eso va numerada */
  proceso: [
    {
      titulo: 'Contanos la idea',
      texto: 'Escribinos por WhatsApp con la foto, el texto o la referencia. No hace falta que tengas un diseño listo.',
      icono: 'comments',
    },
    {
      titulo: 'Recibís el boceto',
      texto: 'Vectorizamos tu imagen y te enviamos una vista previa digital. Ajustamos hasta que te guste.',
      icono: 'compass-drafting',
    },
    {
      titulo: 'La máquina graba',
      texto: 'Cortamos y grabamos en el taller. Cada pieza se arma y se prueba a mano antes de empacar.',
      icono: 'wand-magic-sparkles',
    },
    {
      titulo: 'Llega a su destino',
      texto: 'Retirás en Lago Agrio o lo despachamos con guía de rastreo a cualquier ciudad del país.',
      icono: 'box-open',
    },
  ],

  /* Materiales que procesa el taller */
  materiales: [
    {
      nombre: 'Acrílico cristal',
      espesor: '2 – 10 mm',
      nota: 'Corte, grabado óptico y pulido de cantos',
      imagen: IMG + '/productos/acrilico/3.png',
    },
    {
      nombre: 'Madera y MDF',
      espesor: '3 – 12 mm',
      nota: 'Calado decorativo, letras en bloque y bases',
      imagen: IMG + '/productos/madera-mdf/2.png',
    },
    {
      nombre: 'Cuero y cuerina',
      espesor: '0,8 – 3 mm',
      nota: 'Pirograbado de logos, iniciales y marcas',
      imagen: IMG + '/productos/cuero/2.png',
    },
    {
      nombre: 'Papel y cartulina',
      espesor: '150 – 350 g',
      nota: 'Filigrana fina para invitaciones y tarjetas',
      imagen: IMG + '/productos/papel-cartulina/2.png',
    },
    {
      nombre: 'Cartón rígido',
      espesor: '1 – 5 mm',
      nota: 'Maquetas, cajas y estructuras armables',
      imagen: IMG + '/productos/carton-laser/2.png',
    },
  ],

  /* Mosaicos de trabajos entregados. Son fotos del archivo del taller, elegidas
     por tener fondo cálido para que el mosaico no tenga huecos blancos dentro
     de la franja oscura. Para cambiarlas, mirá pagina-antigua/galeria/img/ */
  galeriaPortada: [25, 2, 6, 9, 26, 42, 31, 50, 53, 37].map(
    (n) => `pagina-antigua/galeria/img/${String(n).padStart(3, '0')}.jpg`
  ),

  galeriaTaller: [24, 5, 20, 27, 41, 49, 51, 55, 29, 43].map(
    (n) => `pagina-antigua/galeria/img/${String(n).padStart(3, '0')}.jpg`
  ),

  /* -------------------------------------------------------------------------
     TESTIMONIOS — la lista está vacía a propósito.

     La sección de opiniones NO se muestra mientras este arreglo esté vacío.
     Publicar reseñas inventadas engaña al comprador y puede traerte problemas
     legales, así que no dejamos ninguna de relleno.

     Para activarla: copiá aquí comentarios REALES (los de tu página de
     Facebook, capturas de WhatsApp con permiso del cliente, reseñas de Google)
     con este formato, y volvé a ejecutar `npm run build`:

       {
         texto: 'Lo que escribió el cliente, tal cual.',
         autor: 'Nombre del cliente',
         lugar: 'Ciudad',
         motivo: 'Qué compró',
       },
     ---------------------------------------------------------------------- */
  testimonios: [],

  faq: [
    {
      p: '¿Necesito enviar un diseño listo?',
      r: 'No. Alcanza con una foto de celular, un texto o una referencia que hayas visto. Nosotros vectorizamos la imagen y te mandamos el boceto para que lo apruebes antes de cortar.',
    },
    {
      p: '¿Cuánto demora un pedido?',
      r: 'Entre 3 y 5 días hábiles para pedidos personalizados. Para volúmenes grandes (más de 50 piezas) coordinamos la fecha al momento de cotizar. Si tenés una fecha límite, decilo desde el primer mensaje.',
    },
    {
      p: '¿Por qué no veo precios en la web?',
      r: 'Cada pieza cambia de precio según material, tamaño, cantidad y complejidad del grabado. Por eso cotizamos una por una: nos escribís con lo que querés y te pasamos el valor exacto, sin sorpresas.',
    },
    {
      p: '¿Hacen envíos fuera de Lago Agrio?',
      r: 'Sí. Damos servicio a nivel nacional y también al exterior. Coordinamos la transportadora al momento de cerrar el pedido y te pasamos el número de guía. Las piezas de vidrio y acrílico viajan con doble empaque anti-golpes.',
    },
    {
      p: '¿Cómo puedo pagar?',
      r: 'Transferencia o depósito a Banco Pichincha, Banco Guayaquil y Banco Internacional, además de efectivo en el taller. Para pedidos personalizados pedimos el 50% de anticipo para iniciar producción.',
    },
    {
      p: '¿Trabajan con empresas e instituciones?',
      r: 'Sí. Hacemos placas de reconocimiento, señalética, llaveros publicitarios, portamenús y premios corporativos con factura. Escribinos con el logo y la cantidad y te armamos la propuesta.',
    },
  ],

  bancos: [
    { nombre: 'Banco Pichincha', imagen: 'assets/img/bancos/banco-pichincha.png' },
    { nombre: 'Banco Guayaquil', imagen: 'assets/img/bancos/banco-guayaquil.png' },
    { nombre: 'Banco Internacional', imagen: 'assets/img/bancos/banco-internacional.png' },
    { nombre: 'Tarjetas de crédito', imagen: 'assets/img/bancos/tarjetas.png' },
  ],
};

module.exports = { site, IMG };
