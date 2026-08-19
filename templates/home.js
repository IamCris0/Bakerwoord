'use strict';

const { site, IMG } = require('../data/site.js');
const { productos } = require('../data/productos.js');
const { esc, wa } = require('./partials.js');
const P = require('./piezas.js');

const SLIDES = [
  {
    img: IMG + '/productos/led-madera/2.jpg',
    mini: IMG + '/productos/led-madera/1.jpg',
    alt: 'Lámpara LED de acrílico grabada con una foto de pareja y dedicatoria de aniversario',
    rotulo: 'Lámparas LED',
    badge: { icono: 'lightbulb', texto: 'Grabado óptico en acrílico' },
    titulo: 'Si lo puedes imaginar,<br><em>lo podemos grabar</em>',
    texto:
      'Una foto de celular alcanza. La convertimos en una lámina de acrílico grabada punto por punto que se enciende sobre una base de madera.',
    cta: { href: 'lamparas-led.html', texto: 'Ver lámparas', icono: 'arrow-right' },
    tag: { icono: 'lightbulb', titulo: 'Acrílico de 4 mm', pie: 'Base de madera · LED cálido' },
    wa: 'Hola, quisiera cotizar una lámpara LED personalizada.',
  },
  {
    img: IMG + '/productos/cupula-flor-girasol/9.jpg',
    mini: IMG + '/productos/cupula-flor-girasol/17.jpg',
    alt: 'Cúpula de cristal con girasol preservado y luces LED sobre base de madera',
    rotulo: 'Flores eternas',
    badge: { icono: 'seedling', texto: 'Flores naturales preservadas' },
    titulo: 'Flores que no<br><em>se marchitan</em>',
    texto:
      'Girasoles y rosas tratadas para durar años bajo una cúpula de vidrio, con luces cálidas y tu dedicatoria grabada en la base.',
    cta: { href: 'cupulas-florales.html', texto: 'Ver cúpulas', icono: 'arrow-right' },
    tag: { icono: 'seedling', titulo: 'Duran años', pie: 'Sin agua ni cuidados' },
    wa: 'Hola, quisiera información sobre las cúpulas con flores preservadas.',
  },
  {
    img: IMG + '/eventos/graduados/2.jpg',
    mini: IMG + '/eventos/graduados/1.jpg',
    alt: 'Recuerdos de graduación en acrílico grabado con birrete y nombre del graduado',
    rotulo: 'Eventos',
    badge: { icono: 'gift', texto: 'Desde 20 piezas' },
    titulo: 'El recuerdo que<br><em>se llevan todos</em>',
    texto:
      'Grados, bodas, bautizos y aniversarios. Cortamos y grabamos el souvenir de tu evento con el nombre, la fecha y el logo que nos pases.',
    cta: { href: 'recuerdos-eventos.html', texto: 'Ver recuerdos', icono: 'arrow-right' },
    tag: { icono: 'gift', titulo: 'Nombre uno por uno', pie: 'Sin costo adicional' },
    wa: 'Hola, estoy organizando un evento y quiero cotizar recuerdos personalizados.',
  },
  {
    img: IMG + '/productos/acrilico/5.png',
    mini: IMG + '/productos/acrilico/3.png',
    alt: 'Piezas de acrílico cristal cortadas a láser con canto pulido',
    rotulo: 'Corte láser',
    badge: { icono: 'scissors', texto: 'Servicio por encargo' },
    titulo: 'Mandá el archivo,<br><em>nosotros cortamos</em>',
    texto:
      'Acrílico, MDF, cuero, papel y cartón con precisión de máquina. Para arquitectos, diseñadores, publicistas y negocios de todo el país.',
    cta: { href: 'corte-materiales.html', texto: 'Ver el servicio', icono: 'arrow-right' },
    tag: { icono: 'ruler-combined', titulo: 'Hasta 60 × 90 cm', pie: 'AI · SVG · DXF · PDF' },
    wa: 'Hola, necesito cotizar un trabajo de corte láser.',
  },
];

function hero() {
  return `<section class="hero" id="hero" aria-roledescription="carrusel" aria-label="Destacados">
    <div class="hero__stage">
      ${SLIDES.map(
        (s, i) => `<article class="hero__slide${i === 0 ? ' on' : ''}" aria-hidden="${i !== 0}" aria-label="${
          i + 1
        } de ${SLIDES.length}">
        <span class="hero__wash" style="background-image:url('${s.img}')" aria-hidden="true"></span>
        <span class="hero__dither" aria-hidden="true"></span>
        <div class="hero__body">
          <div class="wrap hero__grid">
            <div class="hero__inner">
              <span class="hero__badge"><i class="fa-solid fa-${s.badge.icono}"></i>${esc(s.badge.texto)}</span>
              ${
                /* Sólo el primer titular es h1: una página tiene un único
                   encabezado principal, aunque el carrusel muestre cuatro. */
                i === 0
                  ? `<h1 class="t-hero">${s.titulo}</h1>`
                  : `<p class="t-hero" role="heading" aria-level="2">${s.titulo}</p>`
              }
              <p class="hero__desc">${esc(s.texto)}</p>
              <div class="hero__actions">
                <a class="btn btn--amber btn--lg" href="${s.cta.href}">${esc(s.cta.texto)} <i class="fa-solid fa-${
          s.cta.icono
        }"></i></a>
                <a class="btn btn--glass btn--lg" href="${wa(s.wa)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Cotizar ahora</a>
              </div>
            </div>
            <figure class="hero__art">
              <div class="hero__art-frame">
                <img src="${s.img}" alt="${esc(s.alt)}" ${
          i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'
        } decoding="async">
              </div>
              <figcaption class="hero__tag">
                <i class="fa-solid fa-${s.tag.icono}"></i>
                <span>
                  <strong>${esc(s.tag.titulo)}</strong>
                  <span>${esc(s.tag.pie)}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </article>`
      ).join('\n      ')}
    </div>

    <button class="hero__arrow hero__arrow--prev" data-hero-prev aria-label="Anterior"><i class="fa-solid fa-chevron-left"></i></button>
    <button class="hero__arrow hero__arrow--next" data-hero-next aria-label="Siguiente"><i class="fa-solid fa-chevron-right"></i></button>

    <div class="hero__nav">
      <div class="wrap hero__nav-inner" role="tablist" aria-label="Elegir destacado">
        ${SLIDES.map(
          (s, i) => `<button class="hero__chip${i === 0 ? ' on' : ''}" data-hero-go="${i}" role="tab" aria-selected="${
            i === 0
          }">
          <img src="${s.mini}" alt="" loading="lazy" decoding="async" width="44" height="44">
          <span class="hero__chip-txt">
            <span class="hero__chip-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="hero__chip-name">${esc(s.rotulo)}</span>
          </span>
        </button>`
        ).join('\n        ')}
      </div>
    </div>
  </section>`;
}

function home() {
  const destacados = productos.filter((p) => p.destacado).slice(0, 8);
  const novedades = productos.filter((p) => !p.destacado).slice(0, 8);


  return `${hero()}

  ${P.garantias()}

  <section class="section section--tight">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Empezá por acá',
        titulo: '¿Para qué ocasión es el regalo?',
        texto: 'Elegí el momento y te mostramos sólo lo que encaja, con los tiempos de producción de cada pieza.',
        partido: true,
        enlace: 'catalogo.html',
        textoEnlace: 'Ver catálogo completo',
      })}
      ${P.filaOcasiones('', 14)}
    </div>
  </section>

  <section class="section section--tint" id="destacados">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Lo más pedido',
        titulo: 'Las piezas que más salen del taller',
        texto: 'Modelos probados, con producción entre 3 y 5 días hábiles.',
        partido: true,
        enlace: 'catalogo.html',
        textoEnlace: 'Ver todo',
      })}
      <div class="rail" data-rail>
        <div class="rail__track" data-rail-track>
          ${destacados.map((p) => P.tarjeta(p, '')).join('\n          ')}
        </div>
        <div class="rail__btns" style="margin-top:1.2rem">
          <button class="rail__btn" data-rail-prev aria-label="Anterior"><i class="fa-solid fa-arrow-left"></i></button>
          <button class="rail__btn" data-rail-next aria-label="Siguiente"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Qué fabricamos',
        titulo: 'Seis líneas de trabajo, un mismo taller',
        texto: 'Todo se corta, se graba y se arma acá en Nueva Loja. Nada se terceriza ni se importa armado.',
      })}
      ${P.mosaicoCategorias('')}
    </div>
  </section>

  <section class="section section--tint">
    <div class="wrap split">
      <div data-reveal>
        <p class="eyebrow">Cómo funciona el grabado</p>
        <h2 class="t-xl">Apagada parece vidrio.<br>Encendida aparece la foto.</h2>
        <p class="lede">
          El láser abre miles de puntos microscópicos dentro del acrílico. Esos puntos son
          invisibles con luz de día, pero cuando el LED entra por el canto de la lámina,
          cada uno se enciende y dibuja la imagen en el aire.
        </p>
        <div class="checks">
          <div class="check">
            <i class="fa-solid fa-check"></i>
            <div>
              <strong>Sirve cualquier foto nítida</strong>
              <span>Nosotros la limpiamos, ajustamos el contraste y te mostramos cómo va a quedar antes de grabar.</span>
            </div>
          </div>
          <div class="check">
            <i class="fa-solid fa-check"></i>
            <div>
              <strong>No se despinta ni se borra</strong>
              <span>El grabado está dentro del material, no encima. No es impresión ni vinil.</span>
            </div>
          </div>
          <div class="check">
            <i class="fa-solid fa-check"></i>
            <div>
              <strong>Elegís la base</strong>
              <span>Madera con luz cálida, base negra de oficina, grietas multicolor o parlante Bluetooth.</span>
            </div>
          </div>
        </div>
        <a class="btn btn--ghost" href="lamparas-led.html">Ver las ocho bases <i class="fa-solid fa-arrow-right"></i></a>
      </div>
      <div class="split__media lit" data-reveal style="--d:.08s">
        <img src="${IMG}/productos/led-grietas/3.jpg" alt="Lámpara LED encendida con retrato grabado en acrílico" loading="lazy" decoding="async" width="720" height="612">
        <div class="split__note">
          <strong>Acrílico cristal de 4 mm</strong>
          <span>Grabado óptico · base de madera con LED cálido · cable USB</span>
        </div>
      </div>
    </div>
  </section>

  ${P.proceso()}

  <section class="section">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Materiales',
        titulo: 'Lo que entra en la máquina',
        texto: 'Si tenés un material que no está en la lista, consultanos: hacemos una prueba en un retazo antes de aceptar el trabajo.',
        partido: true,
        enlace: 'corte-materiales.html',
        textoEnlace: 'Pedir corte a medida',
      })}
      <div class="materials">
        ${site.materiales
          .map(
            (m, i) => `<article class="material lit" data-reveal style="--d:${i * 0.05}s">
          <div class="material__img"><img src="${m.imagen}" alt="${esc(m.nombre)}" loading="lazy" decoding="async" width="320" height="240"></div>
          <div class="material__body">
            <h4>${esc(m.nombre)}</h4>
            <span class="spec">${esc(m.espesor)}</span>
            <p>${esc(m.nota)}</p>
          </div>
        </article>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Recién salido',
        titulo: 'Otras piezas del catálogo',
        partido: true,
        enlace: 'catalogo.html',
        textoEnlace: 'Ver todo el catálogo',
      })}
      <div class="rail" data-rail>
        <div class="rail__track" data-rail-track>
          ${novedades.map((p) => P.tarjeta(p, '')).join('\n          ')}
        </div>
        <div class="rail__btns" style="margin-top:1.2rem">
          <button class="rail__btn" data-rail-prev aria-label="Anterior"><i class="fa-solid fa-arrow-left"></i></button>
          <button class="rail__btn" data-rail-next aria-label="Siguiente"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--ink">
    <div class="wrap">
      ${P.cabecera({
        eyebrow: 'Trabajos entregados',
        titulo: 'Piezas que ya están en una sala, una oficina o una vitrina',
        texto: 'Fotos de pedidos reales del taller. Tocá cualquiera para verla en grande.',
      })}
      ${P.mosaicoTrabajos(site.galeriaPortada)}
    </div>
  </section>

  ${P.seccionTestimonios({ titulo: 'Lo que nos escriben después de recibir el pedido' })}

  <section class="section section--tint">
    <div class="wrap wrap-narrow">
      ${P.cabecera({
        eyebrow: 'Antes de escribir',
        titulo: 'Preguntas que nos hacen todos los días',
      })}
      ${P.preguntas()}
    </div>
  </section>

  ${P.cierre('')}`;
}

module.exports = { home, SLIDES };
