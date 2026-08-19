'use strict';

/* =============================================================================
   Redirecciones 301 del sitio viejo al nuevo
   -----------------------------------------------------------------------------
   Las páginas antiguas vivían en la raíz del dominio
   (creatividad-laser.com/led-base-madera.html). En el sitio nuevo ese archivo
   está bajo /pagina-antigua/, así que sin estas reglas cada enlace publicado en
   Facebook, cada resultado de Google y cada link compartido por WhatsApp
   durante años daría 404 el día que se publique.

   `build.js` convierte este mapa en un .htaccess (Apache / hosting cPanel).
   Si el hosting es Nginx, pasale este mismo listado al proveedor.
   ========================================================================== */

const redirecciones = {
  /* Institucionales */
  'empresa.html': 'nosotros.html',
  'contactos.html': 'contacto.html',
  'pedidos.html': 'contacto.html',
  'error.html': '404.html',

  /* Listados generales */
  'productos.html': 'catalogo.html',
  'productos100.html': 'catalogo.html',
  'personalizados.html': 'catalogo.html',
  'recuerdos-personalizados.html': 'recuerdos-eventos.html',
  'eventos-especiales.html': 'recuerdos-eventos.html',
  'eventos-actual.html': 'recuerdos-eventos.html',

  /* Lámparas LED */
  'led-base-madera.html': 'producto/lampara-led-base-madera.html',
  'led-base-grietas.html': 'producto/lampara-led-grietas.html',
  'led-base-negra.html': 'producto/lampara-led-base-negra.html',
  'led-cuadros.html': 'producto/cuadro-led-pared.html',
  'lampara-led-base-madera-con-parlante.html': 'producto/lampara-led-parlante.html',
  'lampara-led-base-madera-con-bateria.html': 'producto/lampara-led-bateria.html',
  'lampara-led-base-parlante-giratoria.html': 'producto/lampara-led-giratoria.html',
  'lampara-luna.html': 'producto/lampara-luna.html',
  'reloj-cubo-luz-led.html': 'producto/lamparas-coleccion.html',
  'detalles-led.html': 'producto/cuadros-led-evento.html',

  /* Cúpulas */
  'cupula-con-flor-de-gypsophila-rosa-girasol.html': 'producto/cupula-girasol.html',

  /* Artículos */
  'llaveros-personalizados.html': 'producto/llaveros-personalizados.html',
  'agendas-personalizadas.html': 'producto/agenda-personalizada.html',
  'portaretratos-doble-impresion.html': 'producto/portarretrato-doble.html',

  /* Placas */
  'placas-reconocimientos-agradecimientos.html': 'producto/placa-reconocimiento.html',
  'plascas-medallas-personalizadas.html': 'placas-reconocimientos.html',

  /* Corte de materiales */
  'acrilico-laser.html': 'producto/corte-acrilico.html',
  'madera-mdf.html': 'producto/corte-madera-mdf.html',
  'cuero-laser.html': 'producto/corte-cuero.html',
  'papel-cartulina.html': 'producto/tarjetas-invitacion.html',

  /* Ocasiones */
  'graduados.html': 'ocasiones/grados.html',
  'matrimonios.html': 'ocasiones/matrimonios.html',
  'bautizos.html': 'ocasiones/bautizos.html',
  'babyshower.html': 'ocasiones/babyshower.html',
  'cumpleanos.html': 'ocasiones/cumpleanos.html',
  'dia-de-la-madre.html': 'ocasiones/madre.html',
  'dia-del-padre.html': 'ocasiones/padre.html',
  'dia-del-maestro.html': 'ocasiones/maestro.html',
  'dia-del-ninio.html': 'ocasiones/nino.html',
  'dia-de-la-mujer.html': 'ocasiones/mujer.html',
  'enamorados.html': 'ocasiones/enamorados.html',
  'san-valentin-matrimonios.html': 'ocasiones/enamorados.html',
  'navidad.html': 'ocasiones/navidad.html',
  'sacramentos.html': 'producto/recuerdos-sacramentos.html',
};

/* Las páginas «submenu» eran variantes de un mismo modelo de lámpara.
   Todas apuntan a la colección completa. */
const submenus = [
  'lampara-submenu.html',
  'lampara-submenu2.html',
  'lampara-submenu3.html',
  'lampara-submenu4.html',
  'lampara-submenu5.html',
  'lampara-submenu-6.html',
  'lampara-submenu-7.html',
  'lampara-submenu-8.html',
  'lampara-submenu-9.html',
  'lampara-submenu-10.html',
  'lampara-submenu-11.html',
  'lampara-submenu-12.html',
  'lampara-submenu-13.html',
  'lampara-submenu-14.html',
  'lampara-submenu-15.html',
  'lampara-submenu-16.html',
  'base-madera-submenu.html',
  'base-madera-submenu-1.html',
  'base-madera-submenu-2.html',
];

submenus.forEach((f) => {
  redirecciones[f] = 'lamparas-led.html';
});

module.exports = { redirecciones };
