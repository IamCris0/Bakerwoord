/**
 * Catálogo de El Palacio del Amor.
 * Cada categoría apunta a una carpeta real de assets con fotos numeradas 1.jpg..N.jpg
 * (count = número más alto; los huecos se descartan automáticamente en categoria.html).
 * "ofertas" usa una lista explícita de archivos porque su carpeta no está numerada.
 */
window.CATALOG = {
  whatsapp: 'https://api.whatsapp.com/send?phone=593982693332',

  groups: [
    { id: 'joyas',        title: 'Joyas en Oro 18k' },
    { id: 'aretes',       title: 'Aretes & Piercings' },
    { id: 'relojeria',    title: 'Relojería' },
    { id: 'perfumes',     title: 'Perfumes' },
    { id: 'trofeos',      title: 'Trofeos & Medallas' },
    { id: 'placas',       title: 'Placas & Grabados' },
    { id: 'corporativos', title: 'Corporativos & Regalos' },
    { id: 'deportes',     title: 'Implementos Deportivos' }
  ],

  categories: {
    /* ---- Joyas en Oro 18k ---- */
    'anillos-matrimonio':  { title: 'Anillos de Matrimonio',   group: 'joyas', dir: 'assets/joyas/matrimonio', count: 24, desc: 'Anillos de matrimonio en oro 18k, personalizados con grabado láser incluido.' },
    'joyas-boda':          { title: 'Joyas para Matrimonio',   group: 'joyas', dir: 'assets/joyas/joyas-matrimonio', count: 18, desc: 'Conjuntos y piezas en oro 18k para el día de tu boda.' },
    'anillos-compromiso':  { title: 'Anillos de Compromiso',   group: 'joyas', dir: 'assets/joyas/compromiso', count: 15, desc: 'Solitarios y diseños clásicos en oro 18k para pedir la mano.' },
    'anillos-grado':       { title: 'Anillos de Grado',        group: 'joyas', dir: 'assets/joyas/grado', count: 15, desc: 'Anillos y aros de grado personalizados para tu promoción.' },
    'anillos-15anos':      { title: 'Anillos de 15 Años',      group: 'joyas', dir: 'assets/joyas/15anos', count: 15, desc: 'Diseños especiales en oro 18k para quinceañeras.' },
    'anillos-oro':         { title: 'Anillos en Oro 18k',      group: 'joyas', dir: 'assets/joyas/anillos', count: 15, desc: 'Variedad de anillos en oro de 18 quilates para toda ocasión.' },
    'joyas-damas':         { title: 'Joyas para Damas',        group: 'joyas', dir: 'assets/joyas/damas', count: 21, desc: 'Colección de joyas en oro 18k para damas.' },
    'joyas-caballeros':    { title: 'Joyas para Caballeros',   group: 'joyas', dir: 'assets/joyas/caballeros', count: 21, desc: 'Joyas en oro 18k con estilo para caballeros.' },
    'joyas-plata':         { title: 'Joyas de Plata',          group: 'joyas', dir: 'assets/joyas/plata', count: 15, desc: 'Piezas seleccionadas en plata de calidad.' },
    'cadenas-damas':       { title: 'Cadenas para Damas',      group: 'joyas', dir: 'assets/joyas/cadenas/damas', count: 24, desc: 'Cadenas en oro 18k con dijes, en varios largos y estilos.' },
    'cadenas-caballeros':  { title: 'Cadenas para Caballeros', group: 'joyas', dir: 'assets/joyas/cadenas/caballeros', count: 24, desc: 'Cadenas en oro 18k con presencia para caballeros.' },
    'pulseras-damas':      { title: 'Pulseras para Damas',     group: 'joyas', dir: 'assets/joyas/pulseras/damas', count: 15, desc: 'Pulseras delicadas en oro 18k.' },
    'pulseras-caballeros': { title: 'Pulseras para Caballeros',group: 'joyas', dir: 'assets/joyas/pulseras/caballeros', count: 21, desc: 'Pulseras en oro 18k para caballeros.' },
    'aretes-oro':          { title: 'Aretes en Oro 18k',       group: 'joyas', dir: 'assets/joyas/aretes', count: 21, desc: 'Aretes en oro 18k para uso diario o de gala.' },

    /* ---- Aretes & Piercings ---- */
    'aretes-bebes':        { title: 'Aretes de Bebé',          group: 'aretes', dir: 'assets/aretes/bebes', count: 18, desc: 'Aretes delicados y seguros para bebés.' },
    'piercings':           { title: 'Piercings',               group: 'aretes', dir: 'assets/aretes/piercings', count: 18, desc: 'Piercings en variedad de estilos y materiales.' },
    'aretes-plata':        { title: 'Aretes de Plata',         group: 'aretes', dir: 'assets/aretes/plata', count: 21, desc: 'Aretes en plata para toda ocasión.' },

    /* ---- Relojería ---- */
    'reloj-casio':         { title: 'Relojes CASIO',           group: 'relojeria', dir: 'assets/relojeria/casio', count: 33, desc: 'Relojes CASIO originales con garantía.' },
    'reloj-fossil':        { title: 'Relojes FOSSIL',          group: 'relojeria', dir: 'assets/relojeria/fossil', count: 20, desc: 'Relojes FOSSIL originales con garantía.' },
    'reloj-bulova':        { title: 'Relojes BULOVA',          group: 'relojeria', dir: 'assets/relojeria/bulova', count: 18, desc: 'Relojes suizos BULOVA con elegancia atemporal.' },
    'reloj-citizen':       { title: 'Relojes CITIZEN',         group: 'relojeria', dir: 'assets/relojeria/citizen', count: 21, desc: 'Relojes japoneses CITIZEN de precisión.' },
    'reloj-orient':        { title: 'Relojes ORIENT',          group: 'relojeria', dir: 'assets/relojeria/orient', count: 21, desc: 'Relojes japoneses ORIENT automáticos y de cuarzo.' },
    'reloj-diesel':        { title: 'Relojes DIESEL',          group: 'relojeria', dir: 'assets/relojeria/diesel', count: 21, desc: 'Relojes DIESEL con diseño urbano.' },
    'reloj-qyq':           { title: 'Relojes Q&Q',             group: 'relojeria', dir: 'assets/relojeria/qyq', count: 21, desc: 'Relojes Q&Q resistentes, ideales para el día a día.' },
    'reloj-qyq-damas':     { title: 'Relojes Q&Q Damas',       group: 'relojeria', dir: 'assets/relojeria/qyq/damas', count: 18, desc: 'Relojes Q&Q con diseños para damas.' },

    /* ---- Perfumes ---- */
    'perfumes-damas':      { title: 'Perfumes para Damas',     group: 'perfumes', dir: 'assets/perfumes/damas', count: 39, desc: 'Fragancias originales para damas.' },
    'perfumes-caballeros': { title: 'Perfumes para Caballeros',group: 'perfumes', dir: 'assets/perfumes/caballeros', count: 43, desc: 'Fragancias originales para caballeros.' },

    /* ---- Trofeos & Medallas ---- */
    'trofeos':             { title: 'Trofeos',                 group: 'trofeos', dir: 'assets/trofeos/trofeos', count: 21, desc: 'Trofeos para torneos y premiaciones, con grabado incluido.' },
    'trofeos-deportivos':  { title: 'Trofeos Deportivos',      group: 'trofeos', dir: 'assets/trofeos/deportivos', count: 21, desc: 'Trofeos deportivos en todos los tamaños.' },
    'trofeos-grandes':     { title: 'Trofeos Grandes',         group: 'trofeos', dir: 'assets/trofeos/grande', count: 15, desc: 'Trofeos de gran formato para campeonatos.' },
    'trofeos-cristal':     { title: 'Trofeos Élite de Cristal',group: 'trofeos', dir: 'assets/trofeos/cristal', count: 12, desc: 'Trofeos de cristal para reconocimientos de élite.' },
    'figuras-deportivas':  { title: 'Figuras Deportivas',      group: 'trofeos', dir: 'assets/trofeos/figuras', count: 21, desc: 'Figuras y remates deportivos para trofeos.' },
    'medallas':            { title: 'Medallas',                group: 'trofeos', dir: 'assets/trofeos/medallas', count: 15, desc: 'Medallas para premiaciones, con cinta y grabado.' },
    'medallas-deportivas': { title: 'Medallas Deportivas',     group: 'trofeos', dir: 'assets/trofeos/deportes', count: 15, desc: 'Medallas deportivas para toda disciplina.' },
    'insertos':            { title: 'Insertos para Trofeos y Medallas', group: 'trofeos', dir: 'assets/trofeos/insertos', count: 7, desc: 'Insertos personalizados para trofeos y medallas.' },

    /* ---- Placas & Grabados ---- */
    'placas-conmemorativas': { title: 'Placas Conmemorativas', group: 'placas', dir: 'assets/placas/conmemorativas', count: 21, desc: 'Placas conmemorativas grabadas para homenajes.' },
    'placas-acrilico':     { title: 'Placas de Acrílico',      group: 'placas', dir: 'assets/placas/acrilico', count: 18, desc: 'Placas y acrílicos personalizados.' },
    'placas-cristal':      { title: 'Placas de Cristal',       group: 'placas', dir: 'assets/placas/cristal', count: 18, desc: 'Placas de cristal de alta presentación.' },
    'grabaciones':         { title: 'Grabaciones Láser',       group: 'placas', dir: 'assets/placas/grabaciones', count: 15, desc: 'Grabado láser en todo tipo de material.' },
    'identificaciones':    { title: 'Identificaciones',        group: 'placas', dir: 'assets/placas/identificacion', count: 18, desc: 'Placas de identificación grabadas.' },
    'placas-mascotas':     { title: 'Placas para Mascotas',    group: 'placas', dir: 'assets/placas/mascotas', count: 18, desc: 'Placas de identificación para tu mascota.' },
    'reproduccion-titulos':{ title: 'Reproducción de Títulos', group: 'placas', dir: 'assets/placas/titulos', count: 9, desc: 'Reproducción de títulos en placa para exhibir.' },
    'disenos-unicos':      { title: 'Diseños Únicos',          group: 'placas', dir: 'assets/placas/unicos', count: 18, desc: 'Piezas grabadas únicas, hechas a tu medida.' },

    /* ---- Corporativos & Regalos ---- */
    'coronas':             { title: 'Coronas de Lujo',         group: 'corporativos', dir: 'assets/corporativos/coronas', count: 12, desc: 'Coronas de lujo para reinados y eventos.' },
    'escarapelas':         { title: 'Escarapelas',             group: 'corporativos', dir: 'assets/corporativos/escarapelas', count: 15, desc: 'Escarapelas personalizadas para eventos e instituciones.' },
    'boligrafos':          { title: 'Bolígrafos',              group: 'corporativos', dir: 'assets/corporativos/esferos', count: 9, desc: 'Bolígrafos metálicos grabados con estuche.' },
    'llaveros':            { title: 'Llaveros',                group: 'corporativos', dir: 'assets/corporativos/llaveros', count: 25, desc: 'Llaveros personalizados en varios materiales.' },
    'regalos-oficina':     { title: 'Regalos de Oficina',      group: 'corporativos', dir: 'assets/corporativos/oficina', count: 27, desc: 'Detalles corporativos y regalos para oficina.' },

    /* ---- Implementos Deportivos ---- */
    'balones-gama':        { title: 'Balones Gama Sport',      group: 'deportes', dir: 'assets/balones/gama', count: 21, desc: 'Balones Gama Sport para entrenamientos y torneos.' },
    'balones-mundial':     { title: 'Balones Mundial',         group: 'deportes', dir: 'assets/balones/mundial', count: 21, desc: 'Balones línea Mundial de alta competencia.' },
    'balones-personalizados': { title: 'Balones Personalizados', group: 'deportes', dir: 'assets/balones/personalizados', count: 18, desc: 'Balones personalizados con tu logo o diseño.' },
    'accesorios-deportivos': { title: 'Accesorios Deportivos', group: 'deportes', dir: 'assets/deporte/accesorios', count: 15, desc: 'Accesorios deportivos para equipos y clubes.' },

    /* ---- Ofertas (archivos con nombre propio) ---- */
    'ofertas': {
      title: 'Ofertas Especiales', group: null, dir: 'assets/ofertas', desc: 'Promociones vigentes en joyas, relojería y perfumes. Consulta condiciones en sucursal.',
      files: ['banners-ofertas.jpg', 'joyas-damas.jpg', 'joyas.jpg', 'perfume.jpg', 'perfume2.jpg', 'reloj-fossil.jpg', 'reloj.jpg']
    }
  }
};
