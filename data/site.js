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
  fundacion: 2016,
  logo: IMG + '/logo.png',
  logoClaro: IMG + '/footer-logo.png',
  favicon: IMG + '/favicon.png',

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

  redes: [
    { nombre: 'Facebook', icono: 'facebook-f', url: 'https://www.facebook.com/creatividadlaser.ec' },
    { nombre: 'Instagram', icono: 'instagram', url: 'https://www.instagram.com/creatividadlaser.ec' },
    { nombre: 'TikTok', icono: 'tiktok', url: 'https://www.tiktok.com/@creatividadlaser' },
  ],

  /* Barra superior rotativa */
  avisos: [
    'Envíos a todo el Ecuador · Servientrega con número de guía',
    'Boceto digital sin costo antes de fabricar',
    'Producción propia en Lago Agrio desde 2016',
  ],

  /* Franja de garantías bajo el hero */
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
      r: 'Sí, despachamos a todo el Ecuador por Servientrega con guía de rastreo. Las piezas de vidrio y acrílico viajan con doble empaque anti-golpes.',
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
    { nombre: 'Banco Pichincha', imagen: IMG + '/banco-pichincha.png' },
    { nombre: 'Banco Guayaquil', imagen: IMG + '/banco-guayaquil.png' },
    { nombre: 'Banco Internacional', imagen: IMG + '/banco-internacional.png' },
    { nombre: 'Tarjetas de crédito', imagen: IMG + '/tarjetas.png' },
  ],
};

module.exports = { site, IMG };
