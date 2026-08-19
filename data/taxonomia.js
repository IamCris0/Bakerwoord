'use strict';

/* =============================================================================
   Taxonomía del catálogo
   -----------------------------------------------------------------------------
   Dos ejes independientes:
     · categorias — qué es la pieza (lámpara, cúpula, placa…). Define las páginas
       de catálogo y la columna «Por producto» del menú.
     · ocasiones  — para qué momento se regala. Cruza todas las categorías y
       define las páginas /ocasiones/*.html y la columna «Por ocasión».
   Un producto pertenece a UNA categoría y a VARIAS ocasiones.
   ========================================================================== */

const { IMG } = require('./site.js');

const categorias = [
  {
    id: 'lamparas-led',
    nombre: 'Lámparas LED 3D',
    nombreCorto: 'Lámparas LED',
    icono: 'lightbulb',
    titulo: 'Lámparas LED en acrílico grabado',
    bajada:
      'Una placa de acrílico transparente, grabada punto por punto con láser, que se enciende desde la base. De día parece vidrio; de noche, la foto aparece flotando en el aire.',
    portada: IMG + '/productos/led-madera/2.jpg',
    destacada: true,
    subcategorias: [
      { id: 'base-madera', nombre: 'Base de madera', nota: 'Luz cálida fija' },
      { id: 'base-grietas', nombre: 'Base grietas RGB', nota: '16 colores táctiles' },
      { id: 'base-parlante', nombre: 'Con parlante Bluetooth', nota: 'Suena y alumbra' },
      { id: 'base-giratoria', nombre: 'Base giratoria 360°', nota: 'Gira sobre su eje' },
      { id: 'base-negra', nombre: 'Base negra clásica', nota: 'Sobria, para oficina' },
      { id: 'base-bateria', nombre: 'Base con batería', nota: 'Sin cables' },
      { id: 'cuadros-led', nombre: 'Cuadros LED de pared', nota: 'Marco de madera' },
      { id: 'lamparas-mix', nombre: 'Colección de diseños', nota: 'Modelos listos' },
    ],
  },
  {
    id: 'cupulas-florales',
    nombre: 'Cúpulas y flores eternas',
    nombreCorto: 'Cúpulas florales',
    icono: 'seedling',
    titulo: 'Cúpulas de cristal con flores preservadas',
    bajada:
      'Flores naturales tratadas para durar años bajo una cúpula de vidrio, con una guirnalda micro-LED y una placa grabada con tu dedicatoria.',
    portada: IMG + '/productos/cupula-flor-girasol/9.jpg',
    destacada: true,
    subcategorias: [
      { id: 'girasoles', nombre: 'Girasol eterno', nota: 'El más pedido' },
      { id: 'rosas-preservadas', nombre: 'Rosa preservada', nota: 'Con gypsophila' },
    ],
  },
  {
    id: 'recuerdos-eventos',
    nombre: 'Recuerdos para eventos',
    nombreCorto: 'Recuerdos',
    icono: 'gift',
    titulo: 'Recuerdos y detalles para eventos',
    bajada:
      'Souvenirs cortados y grabados a medida para el día que estás organizando. Desde 20 piezas, con el nombre, la fecha y el logo que nos pases.',
    portada: IMG + '/eventos/graduados/2.jpg',
    destacada: true,
    subcategorias: [
      { id: 'graduaciones', nombre: 'Graduaciones' },
      { id: 'bautizos', nombre: 'Bautizos' },
      { id: 'babyshower', nombre: 'Baby shower' },
      { id: 'bodas', nombre: 'Bodas y matrimonios' },
      { id: 'cumpleanos', nombre: 'Cumpleaños' },
      { id: 'sacramentos', nombre: 'Primera comunión y confirmación' },
      { id: 'dia-madre', nombre: 'Día de la Madre' },
      { id: 'dia-padre', nombre: 'Día del Padre' },
      { id: 'dia-maestro', nombre: 'Día del Maestro' },
      { id: 'dia-nino', nombre: 'Día del Niño' },
      { id: 'dia-mujer', nombre: 'Día de la Mujer' },
      { id: 'enamorados', nombre: 'San Valentín' },
      { id: 'memoriales', nombre: 'Recordatorios y homenajes' },
      { id: 'detalles-led', nombre: 'Cuadros LED de recuerdo' },
    ],
  },
  {
    id: 'placas-reconocimientos',
    nombre: 'Placas y reconocimientos',
    nombreCorto: 'Placas',
    icono: 'award',
    titulo: 'Placas, medallas y reconocimientos',
    bajada:
      'Distinciones para instituciones, empresas y clubes deportivos. Escudo, nombre y motivo grabados con precisión de máquina, listos para entregar en tarima.',
    portada: IMG + '/productos/placas-personalizadas/7.jpg',
    destacada: true,
    subcategorias: [
      { id: 'placas-honorificas', nombre: 'Placas honoríficas' },
      { id: 'trofeos-premios', nombre: 'Trofeos y premios' },
    ],
  },
  {
    id: 'articulos-personalizados',
    nombre: 'Artículos personalizados',
    nombreCorto: 'Artículos',
    icono: 'star',
    titulo: 'Artículos personalizados de uso diario',
    bajada:
      'Objetos que se usan todos los días y llevan tu nombre grabado: agendas de cuero, llaveros, portarretratos y cuadros tallados.',
    portada: IMG + '/productos/portaretratos-doble-impresion/1.jpg',
    destacada: true,
    subcategorias: [
      { id: 'portarretratos', nombre: 'Portarretratos' },
      { id: 'llaveros', nombre: 'Llaveros grabados' },
      { id: 'agendas', nombre: 'Agendas y cuadernos' },
      { id: 'cuadros-libro', nombre: 'Tarjetas tipo libro' },
      { id: 'navidad', nombre: 'Adornos de Navidad' },
      { id: 'cajas-madera', nombre: 'Cajas y estuches' },
    ],
  },
  {
    id: 'corte-materiales',
    nombre: 'Corte y grabado por encargo',
    nombreCorto: 'Corte láser',
    icono: 'scissors',
    titulo: 'Servicio de corte y grabado láser',
    bajada:
      'Mandanos tu archivo o tus medidas y cortamos la pieza. Trabajamos acrílico, madera, MDF, cuero, papel y cartón para arquitectos, diseñadores y negocios.',
    portada: IMG + '/productos/acrilico/5.png',
    destacada: true,
    esServicio: true,
    subcategorias: [
      { id: 'acrilico', nombre: 'Acrílico cristal' },
      { id: 'madera-mdf', nombre: 'Madera y MDF' },
      { id: 'cuero', nombre: 'Cuero y cuerina' },
      { id: 'cartulina-papel', nombre: 'Papel y cartulina' },
      { id: 'carton-laser', nombre: 'Cartón rígido' },
      { id: 'exhibidores', nombre: 'Exhibidores y señalética' },
    ],
  },
];

const ocasiones = [
  {
    id: 'grados',
    nombre: 'Graduaciones',
    icono: 'graduation-cap',
    imagen: IMG + '/eventos/graduados/1.jpg',
    titulo: 'Regalos y recuerdos de graduación',
    bajada: 'Birretes en acrílico, placas de honor y detalles para toda la promoción. Desde 20 piezas con el logo de la institución.',
  },
  {
    id: 'matrimonios',
    nombre: 'Bodas',
    icono: 'ring',
    imagen: IMG + '/eventos/matrimonios/3.jpg',
    titulo: 'Bodas y matrimonios',
    bajada: 'Letreros de bienvenida, números de mesa, cajas de anillos y souvenirs para los invitados.',
  },
  {
    id: 'madre',
    nombre: 'Día de la Madre',
    icono: 'heart',
    imagen: IMG + '/eventos/madre/4.jpg',
    titulo: 'Regalos para el Día de la Madre',
    bajada: 'Lo que más nos piden en mayo: cúpulas con flores preservadas y lámparas con fotos de familia.',
  },
  {
    id: 'padre',
    nombre: 'Día del Padre',
    icono: 'mug-hot',
    imagen: IMG + '/eventos/diadelpadre/6.jpg',
    titulo: 'Regalos para el Día del Padre',
    bajada: 'Agendas de cuero pirograbadas, lámparas con parlante y placas con dedicatoria.',
  },
  {
    id: 'bautizos',
    nombre: 'Bautizos',
    icono: 'dove',
    imagen: IMG + '/eventos/bautizos/5.png',
    titulo: 'Bautizos y sacramentos',
    bajada: 'Cruces en acrílico espejado, tarjetas caladas y recuerdos con el nombre del bebé.',
  },
  {
    id: 'babyshower',
    nombre: 'Baby shower',
    icono: 'baby',
    imagen: IMG + '/eventos/baby-shower/2.png',
    titulo: 'Baby shower y dulce espera',
    bajada: 'Cajitas, letreros y recuerdos en tonos pastel para la llegada del bebé.',
  },
  {
    id: 'cumpleanos',
    nombre: 'Cumpleaños',
    icono: 'cake-candles',
    imagen: IMG + '/eventos/cumpleanos/3.jpg',
    titulo: 'Cumpleaños',
    bajada: 'Toppers, letreros de números y detalles temáticos para la mesa dulce.',
  },
  {
    id: 'maestro',
    nombre: 'Día del Maestro',
    icono: 'chalkboard-user',
    imagen: IMG + '/eventos/dia-del-maestro/1.jpg',
    titulo: 'Día del Maestro',
    bajada: 'Placas de agradecimiento y detalles para todo el cuerpo docente.',
  },
  {
    id: 'nino',
    nombre: 'Día del Niño',
    icono: 'child-reaching',
    imagen: IMG + '/eventos/dia-del-nino/2.jpg',
    titulo: 'Día del Niño',
    bajada: 'Lámparas de personajes, llaveros y sorpresas para entregar en el aula.',
  },
  {
    id: 'mujer',
    nombre: 'Día de la Mujer',
    icono: 'venus',
    imagen: IMG + '/eventos/diadelamujer/1.jpg',
    titulo: 'Día de la Mujer',
    bajada: 'Detalles honoríficos y frases grabadas para reconocer a las mujeres de tu equipo.',
  },
  {
    id: 'enamorados',
    nombre: 'San Valentín',
    icono: 'heart-circle-bolt',
    imagen: IMG + '/eventos/enamorados/2.jpg',
    titulo: 'San Valentín y aniversarios',
    bajada: 'Rosas eternas, lámparas con código Spotify y cúpulas con la foto de los dos.',
  },
  {
    id: 'aniversario',
    nombre: 'Aniversarios',
    icono: 'champagne-glasses',
    imagen: IMG + '/productos/led-madera/1.jpg',
    titulo: 'Aniversarios',
    bajada: 'La fecha, la canción y la foto de los dos, grabadas en una pieza que se enciende.',
  },
  {
    id: 'navidad',
    nombre: 'Navidad',
    icono: 'tree',
    imagen: IMG + '/productos/navidad/2.jpg',
    titulo: 'Navidad y fin de año',
    bajada: 'Adornos con el nombre de cada miembro de la familia y regalos corporativos de fin de año.',
  },
  {
    id: 'corporativo',
    nombre: 'Empresas',
    icono: 'building',
    imagen: IMG + '/productos/placas-personalizadas/7.jpg',
    titulo: 'Empresas e instituciones',
    bajada: 'Reconocimientos, señalética, llaveros publicitarios y portamenús con factura.',
  },
];

/* Índices de consulta rápida */
const categoriaPorId = Object.fromEntries(categorias.map((c) => [c.id, c]));
const ocasionPorId = Object.fromEntries(ocasiones.map((o) => [o.id, o]));

const subcategoriaPorId = {};
categorias.forEach((c) => {
  c.subcategorias.forEach((s) => {
    subcategoriaPorId[s.id] = { ...s, categoria: c.id };
  });
});

module.exports = { categorias, ocasiones, categoriaPorId, ocasionPorId, subcategoriaPorId };
