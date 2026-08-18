// Base de datos completa de productos de Creatividad Láser
const PRODUCTS_DATA = [
  {
    "id": "lamp-led-madera",
    "name": "Lámpara LED con Base de Madera Grabada",
    "category": "lamparas-led",
    "subCategory": "base-madera",
    "occasion": [
      "padre",
      "cumpleanos",
      "aniversario"
    ],
    "material": "Acrílico + Madera Natural",
    "badge": "Más Solicitado",
    "rating": 5,
    "reviews": 48,
    "image": "pagina-antigua/assets/images/productos/led-madera/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/led-madera/1.jpg",
      "pagina-antigua/assets/images/productos/led-madera/2.jpg",
      "pagina-antigua/assets/images/productos/led-madera/3.jpg",
      "pagina-antigua/assets/images/productos/led-madera/4.jpg"
    ],
    "shortDesc": "Lámpara acrílica esculpida a láser sobre cálida base de madera con iluminación LED y grabado personalizado.",
    "description": "Ilumina tus momentos más memorables con nuestra Lámpara LED personalizada. Tallada mediante láser de alta precisión en acrílico de alta densidad con grabado óptico 3D sobre una sólida base de madera natural. Ideal para dedicatorias, retratos familiares o logotipos.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Placa de acrílico cristalino de alta densidad grabado a láser",
      "Base de madera natural pulida y barnizada con acabado cálido",
      "Iluminación LED de bajo consumo con conexión USB",
      "Grabado personalizado de fotografías, nombres o dedicatorias"
    ],
    "customFields": [
      {
        "name": "Texto o dedicatoria a grabar",
        "placeholder": "Ej. Para el mejor papá del mundo"
      },
      {
        "name": "Fecha especial",
        "placeholder": "Ej. 15 de Septiembre"
      }
    ],
    "relatedIds": [
      "lamp-led-parlante",
      "lamp-led-grietas",
      "lamp-led-giratoria"
    ]
  },
  {
    "id": "lamp-led-grietas",
    "name": "Lámpara LED Base Grietas Táctil Multicolor",
    "category": "lamparas-led",
    "subCategory": "base-grietas",
    "occasion": [
      "cumpleanos",
      "grados",
      "nino"
    ],
    "material": "Acrílico + Base ABS Efecto Grieta",
    "badge": "Multicolor RGB",
    "rating": 4.9,
    "reviews": 56,
    "image": "pagina-antigua/assets/images/productos/led-grietas/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/led-grietas/1.jpg",
      "pagina-antigua/assets/images/productos/led-grietas/2.jpg",
      "pagina-antigua/assets/images/productos/led-grietas/3.jpg"
    ],
    "shortDesc": "Lámpara acrílica interactiva con base texturizada agrietada y selector táctil de 16 colores con control.",
    "description": "Una lámpara interactiva y llamativa con base de acabado texturizado efecto grieta. Cuenta con cambio de colores automático o fijo a través de su panel táctil o control remoto. Perfecta para personajes, logotipos, niños y lámparas de noche.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Hasta 16 colores seleccionables mediante botón táctil o mando a distancia",
      "Base con textura agrietada iluminada internamente",
      "Alimentación dual mediante cable USB o baterías AA",
      "Grabado láser óptico de alta precisión"
    ],
    "customFields": [
      {
        "name": "Nombre o diseño a grabar",
        "placeholder": "Ej. Mateo - Superhéroe favorito"
      }
    ],
    "relatedIds": [
      "lamp-led-madera",
      "lamp-led-negra",
      "lamp-led-giratoria"
    ]
  },
  {
    "id": "lamp-led-parlante",
    "name": "Lámpara LED con Parlante Bluetooth Incorporado",
    "category": "lamparas-led",
    "subCategory": "base-parlante",
    "occasion": [
      "aniversario",
      "enamorados",
      "cumpleanos"
    ],
    "material": "Acrílico + Parlante HD + Base Madera",
    "badge": "Edición Especial",
    "rating": 5,
    "reviews": 32,
    "image": "pagina-antigua/assets/images/productos/led-madera-con-parlantes/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/led-madera-con-parlantes/1.jpg",
      "pagina-antigua/assets/images/productos/led-madera-con-parlantes/2.jpg",
      "pagina-antigua/assets/images/productos/led-madera-con-parlantes/3.jpg"
    ],
    "shortDesc": "Disfruta de tu música preferida y una luz acogedora con grabado láser de código Spotify y sonido HD.",
    "description": "La fusión perfecta entre diseño, luz y melodías. Envíanos tu canción preferida o fotografía y la grabaremos con láser en el acrílico, montado sobre una base de madera que integra un parlante inalámbrico recargable.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Conectividad Bluetooth inalámbrica de amplio alcance",
      "Sonido estéreo de alta fidelidad con bajos nítidos",
      "Grabado de Spotify Code o dedicatoria musical",
      "Batería recargable integrada con cable USB incluido"
    ],
    "customFields": [
      {
        "name": "Enlace de canción o código Spotify",
        "placeholder": "Ej. Perfect - Ed Sheeran"
      },
      {
        "name": "Dedicatoria corta",
        "placeholder": "Ej. Nuestra canción inolvidable"
      }
    ],
    "relatedIds": [
      "lamp-led-madera",
      "lamp-led-giratoria",
      "cupula-girasol"
    ]
  },
  {
    "id": "lamp-led-negra",
    "name": "Lámpara LED con Base Negra Clásica Premium",
    "category": "lamparas-led",
    "subCategory": "base-negra",
    "occasion": [
      "cumpleanos",
      "grados",
      "corporativo"
    ],
    "material": "Acrílico + Base ABS Negra",
    "badge": "Diseño Elegante",
    "rating": 4.8,
    "reviews": 41,
    "image": "pagina-antigua/assets/images/productos/base-negra/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/base-negra/1.jpg",
      "pagina-antigua/assets/images/productos/base-negra/2.jpg",
      "pagina-antigua/assets/images/productos/base-negra/3.jpg"
    ],
    "shortDesc": "Diseño clásico con base negra satinada e iluminación LED uniforme de alto contraste para logotipos y figuras.",
    "description": "Nuestra lámpara LED con base negra resalta la nitidez del grabado láser con un contraste sobrio y profesional. Recomendada para regalos corporativos, reconocimientos y lámparas decorativas de escritorio.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Base negra mate de alta resistencia",
      "Iluminación LED blanca cálida o fría",
      "Bajo consumo energético con puerto USB",
      "Empaque protector listo para regalo"
    ],
    "customFields": [
      {
        "name": "Detalle o logotipo a grabar",
        "placeholder": "Ej. Escudo institucional o nombre"
      }
    ],
    "relatedIds": [
      "lamp-led-madera",
      "lamp-led-grietas",
      "placa-reconocimiento"
    ]
  },
  {
    "id": "lamp-led-giratoria",
    "name": "Lámpara LED Base Giratoria 360",
    "category": "lamparas-led",
    "subCategory": "base-giratoria",
    "occasion": [
      "aniversario",
      "bodas",
      "enamorados"
    ],
    "material": "Acrílico Óptico + Base Giratoria 360",
    "badge": "Giratorio 360",
    "rating": 4.9,
    "reviews": 29,
    "image": "pagina-antigua/assets/images/productos/lampara-led-giratoria/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/lampara-led-giratoria/1.jpg",
      "pagina-antigua/assets/images/productos/lampara-led-giratoria/2.jpg",
      "pagina-antigua/assets/images/productos/lampara-led-giratoria/3.jpg"
    ],
    "shortDesc": "Lámpara con rotación continua de 360 grados, iluminación ambiental y parlante inalámbrico.",
    "description": "Una experiencia visual deslumbrante. El acrílico grabado rota suavemente sobre la base iluminada mientras reproduce música por Bluetooth, proyectando reflejos únicos en la habitación.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Rotación continua silenciosa de 360 grados",
      "Sonido envolvente mediante conexión Bluetooth",
      "Batería recargable de larga duración"
    ],
    "customFields": [
      {
        "name": "Fotos o siluetas para grabado",
        "placeholder": "Ej. Pareja o fecha de boda"
      }
    ],
    "relatedIds": [
      "lamp-led-parlante",
      "cupula-girasol",
      "portarretrato-doble"
    ]
  },
  {
    "id": "led-cuadros-iluminados",
    "name": "Cuadro LED Iluminado Marco de Madera",
    "category": "lamparas-led",
    "subCategory": "cuadros-led",
    "occasion": [
      "matrimonios",
      "aniversario",
      "madre"
    ],
    "material": "Marco de Madera + Acrílico Grabado + LED",
    "badge": "Cuadro Iluminado",
    "rating": 5,
    "reviews": 37,
    "image": "pagina-antigua/assets/images/productos/led-cuadros/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/led-cuadros/1.jpg",
      "pagina-antigua/assets/images/productos/led-cuadros/2.jpg",
      "pagina-antigua/assets/images/productos/led-cuadros/3.jpg"
    ],
    "shortDesc": "Elegante marco de madera con retrato en acrílico grabado que se ilumina desde los bordes.",
    "description": "El marco iluminado combina la calidez de la madera con la nitidez del grabado láser. Al encenderlo, la imagen o frase parece flotar dentro del marco con una suave luz ambiental.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Marco de madera sólida en tono natural o nogal",
      "Cinta LED interior de alta eficiencia energética",
      "Apto para colgar en pared o exhibir sobre escritorio"
    ],
    "customFields": [
      {
        "name": "Fotografía y dedicatoria",
        "placeholder": "Ej. Nombres de novios y fecha de boda"
      }
    ],
    "relatedIds": [
      "cuadro-tipo-libro",
      "portarretrato-doble",
      "lamp-led-madera"
    ]
  },
  {
    "id": "lamp-led-bateria",
    "name": "Lámpara LED Base Batería Portátil",
    "category": "lamparas-led",
    "subCategory": "base-bateria",
    "occasion": [
      "cumpleanos",
      "corporativo"
    ],
    "material": "Acrílico + Base Portátil Batería",
    "badge": "Portátil",
    "rating": 4.8,
    "reviews": 21,
    "image": "pagina-antigua/assets/images/productos/le-base-bateria/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/le-base-bateria/1.jpg",
      "pagina-antigua/assets/images/productos/le-base-bateria/2.jpg"
    ],
    "shortDesc": "Lámpara autónoma sin cables para velador o escritorio con iluminación de bajo consumo.",
    "description": "Lámpara LED práctica que funciona sin necesidad de conexión constante a la corriente. Ideal para veladores infantiles, centros de mesa de eventos y escritorios.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Alimentación por baterías recargables o alcalinas",
      "Diseño compacto y liviano",
      "Grabado láser indeleble"
    ],
    "customFields": [
      {
        "name": "Nombre a grabar",
        "placeholder": "Ej. Nombres o iniciales"
      }
    ],
    "relatedIds": [
      "lamp-led-madera",
      "lamp-led-grietas"
    ]
  },
  {
    "id": "lamp-led-mix",
    "name": "Lámparas LED Colección Diseños Especiales",
    "category": "lamparas-led",
    "subCategory": "lamparas-mix",
    "occasion": [
      "enamorados",
      "cumpleanos"
    ],
    "material": "Acrílico + Base Iluminada",
    "badge": "Colección Mixta",
    "rating": 4.9,
    "reviews": 33,
    "image": "pagina-antigua/assets/images/productos/lamparas-mix/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/lamparas-mix/1.jpg",
      "pagina-antigua/assets/images/productos/lamparas-mix/2.jpg",
      "pagina-antigua/assets/images/productos/lamparas-mix/3.jpg"
    ],
    "shortDesc": "Formatos artísticos de lámparas LED en siluetas de animales, instrumentos musicales y personajes.",
    "description": "Una variedad de formatos especiales para amantes de la música, deportes, mascotas y arquitectura. Grabados con máximo detalle en acrílico cristalino.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Siluetas variadas a elección del cliente",
      "Iluminación LED uniforme en todo el acrílico",
      "Fácil mantenimiento y durabilidad"
    ],
    "customFields": [
      {
        "name": "Diseño o temática a elegir",
        "placeholder": "Ej. Guitarra, León, Escudo de fútbol"
      }
    ],
    "relatedIds": [
      "lamp-led-madera",
      "lamp-led-parlante"
    ]
  },
  {
    "id": "cupula-girasol",
    "name": "Cúpula de Cristal con Girasol Eterno & Luces LED",
    "category": "cupulas-florales",
    "subCategory": "girasoles",
    "occasion": [
      "madre",
      "enamorados",
      "cumpleanos"
    ],
    "material": "Cristal Templado + Girasol Preservado + Madera",
    "badge": "Flor Natural Preservada",
    "rating": 5,
    "reviews": 64,
    "image": "pagina-antigua/assets/images/productos/cupula-flor-girasol/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/cupula-flor-girasol/1.jpg",
      "pagina-antigua/assets/images/productos/cupula-flor-girasol/2.jpg",
      "pagina-antigua/assets/images/productos/cupula-flor-girasol/3.jpg",
      "pagina-antigua/assets/images/productos/cupula-flor-girasol/4.jpg"
    ],
    "shortDesc": "Hermosa cúpula de cristal con girasol natural preservado que conserva su esplendor por años.",
    "description": "Un detalle inolvidable que simboliza luz, energía y admiración eterna. Elaborada con un girasol 100% natural sometido a un proceso de preservación orgánica, protegido dentro de una transparente cúpula de cristal sobre base de madera refinada con guirnalda micro-LED.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Girasol natural preservado de alta calidad",
      "Cúpula transparente de cristal con base de madera",
      "Iluminación con micro-luces LED cálidas",
      "Incluye empaque especial de regalo"
    ],
    "customFields": [
      {
        "name": "Mensaje para tarjeta o placa de madera",
        "placeholder": "Ej. Eres mi luz de todos los días"
      }
    ],
    "relatedIds": [
      "cupula-rosa-eterna",
      "detalles-led-recuerdos",
      "lamp-led-parlante"
    ]
  },
  {
    "id": "cupula-rosa-eterna",
    "name": "Cúpula Encantada con Rosa Eterna & Gypsophila",
    "category": "cupulas-florales",
    "subCategory": "rosas-preservadas",
    "occasion": [
      "madre",
      "enamorados",
      "aniversario"
    ],
    "material": "Cristal + Rosa Preservada + Micro-LED",
    "badge": "Colección Romántica",
    "rating": 4.9,
    "reviews": 51,
    "image": "pagina-antigua/assets/images/productos/cupula-flor-girasol/5.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/cupula-flor-girasol/5.jpg",
      "pagina-antigua/assets/images/productos/cupula-flor-girasol/6.jpg",
      "pagina-antigua/assets/images/productos/cupula-flor-girasol/7.jpg"
    ],
    "shortDesc": "Rosa roja natural preservada acompañada de delicadas ramas de Gypsophila y luces doradas.",
    "description": "Inspirada en las historias de amor eternas. Esta cúpula alberga una majestuosa rosa roja preservada sobre un lecho de vegetación natural y luces cálidas que crean una atmósfera acogedora.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Rosa roja natural importada de preservación óptima",
      "Guirnalda de micro-LED de tono cálido",
      "Base de madera natural torneada a mano"
    ],
    "customFields": [
      {
        "name": "Placa grabada pequeña opcional",
        "placeholder": "Ej. Con amor, Carlos & Sofía"
      }
    ],
    "relatedIds": [
      "cupula-girasol",
      "detalles-led-recuerdos",
      "portarretrato-doble"
    ]
  },
  {
    "id": "recuerdos-graduacion",
    "name": "Recuerdos Grabados en Acrílico para Graduación",
    "category": "recuerdos-eventos",
    "subCategory": "graduaciones",
    "occasion": [
      "grados"
    ],
    "material": "Acrílico Cristal + Madera Grabada",
    "badge": "Graduaciones",
    "rating": 5,
    "reviews": 82,
    "image": "pagina-antigua/assets/images/eventos/graduados/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/graduados/1.jpg",
      "pagina-antigua/assets/images/eventos/graduados/2.jpg",
      "pagina-antigua/assets/images/eventos/graduados/3.jpg",
      "pagina-antigua/assets/images/eventos/graduados/4.jpg"
    ],
    "shortDesc": "Elegantes recuerdos de graduación tallados a láser con birrete, título profesional y nombres.",
    "description": "Inmortaliza el logro académico de la graduación con recuerdos finamente elaborados en acrílico y madera. Disponibles para colegios, universidades y promociones profesionales.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Corte láser de precisión de siluetas de birrete",
      "Grabado de nombre del graduado, título e institución",
      "Precios especiales por lote promocional"
    ],
    "customFields": [
      {
        "name": "Nombre del graduado y título",
        "placeholder": "Ej. Ing. Mateo Paredes - Promoción 2026"
      }
    ],
    "relatedIds": [
      "placa-reconocimiento",
      "llaveros-personalizados",
      "recuerdos-bautizo"
    ]
  },
  {
    "id": "recuerdos-bautizo",
    "name": "Detalles & Recuerdos Personalizados para Bautizo",
    "category": "recuerdos-eventos",
    "subCategory": "bautizos",
    "occasion": [
      "bautizos",
      "sacramentos"
    ],
    "material": "Acrílico Espejo + MDF Fino",
    "badge": "Bautizos",
    "rating": 4.9,
    "reviews": 43,
    "image": "pagina-antigua/assets/images/eventos/bautizos/1.png",
    "gallery": [
      "pagina-antigua/assets/images/eventos/bautizos/1.png",
      "pagina-antigua/assets/images/eventos/bautizos/2.png",
      "pagina-antigua/assets/images/eventos/bautizos/3.png"
    ],
    "shortDesc": "Hermosas cruces y siluetas angelicales en acrílico dorado o plateado grabadas con láser.",
    "description": "Obsequia a tus padrinos e invitados un recuerdo delicado y duradero para la celebración de bautizo o primera comunión.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Diseños en acrílico espejado dorado, plateado o madera pulida",
      "Grabado indeleble de fecha, nombre de los padrinos y del bebé"
    ],
    "customFields": [
      {
        "name": "Nombre del bebé y fecha del evento",
        "placeholder": "Ej. Mi Bautizo - Camila / 12 de Julio"
      }
    ],
    "relatedIds": [
      "recuerdos-babyshower",
      "recuerdos-graduacion"
    ]
  },
  {
    "id": "recuerdos-babyshower",
    "name": "Recuerdos Dulce Espera para Baby Shower",
    "category": "recuerdos-eventos",
    "subCategory": "babyshower",
    "occasion": [
      "babyshower"
    ],
    "material": "MDF Pintado + Acrílico Pastel",
    "badge": "Baby Shower",
    "rating": 5,
    "reviews": 35,
    "image": "pagina-antigua/assets/images/eventos/baby-shower/1.png",
    "gallery": [
      "pagina-antigua/assets/images/eventos/baby-shower/1.png",
      "pagina-antigua/assets/images/eventos/baby-shower/2.png",
      "pagina-antigua/assets/images/eventos/baby-shower/3.png"
    ],
    "shortDesc": "Siluetas tiernas de cochecitos, zapatitos y sonajeros grabados en madera y acrílico.",
    "description": "Celebra la llegada del nuevo integrante de la familia con detallitos encantadores. Personalizamos con el nombre del bebé.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Variedad de figuras cortadas a láser",
      "Colores pasteles y grabados nítidos"
    ],
    "customFields": [
      {
        "name": "Nombre del bebé",
        "placeholder": "Ej. Esperando a Lucas"
      }
    ],
    "relatedIds": [
      "recuerdos-bautizo",
      "recuerdos-dia-nino"
    ]
  },
  {
    "id": "recuerdos-dia-nino",
    "name": "Detalles & Regalos para el Día del Niño",
    "category": "recuerdos-eventos",
    "subCategory": "dia-nino",
    "occasion": [
      "nino"
    ],
    "material": "MDF + Acrílico Multicolor",
    "badge": "Día del Niño",
    "rating": 4.9,
    "reviews": 39,
    "image": "pagina-antigua/assets/images/eventos/dia-del-nino/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/dia-del-nino/1.jpg",
      "pagina-antigua/assets/images/eventos/dia-del-nino/2.jpg",
      "pagina-antigua/assets/images/eventos/dia-del-nino/3.jpg"
    ],
    "shortDesc": "Cajitas sorpresas, portalápices y rompecabezas de madera personalizados para niños.",
    "description": "Fomenta la creatividad de los más pequeños con productos divertidos y didácticos grabados a láser.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Materiales seguros, bordes redondeados y acabados no tóxicos",
      "Opción de armables y grabado de nombres individuales"
    ],
    "customFields": [
      {
        "name": "Nombre del niño o institución",
        "placeholder": "Ej. Escuela Benjamín Carrión"
      }
    ],
    "relatedIds": [
      "lamp-led-grietas",
      "recuerdos-babyshower"
    ]
  },
  {
    "id": "recuerdos-dia-maestro",
    "name": "Placas & Recuerdos para el Día del Maestro",
    "category": "recuerdos-eventos",
    "subCategory": "dia-maestro",
    "occasion": [
      "maestro",
      "corporativo"
    ],
    "material": "Acrílico + Base Madera Robusta",
    "badge": "Día del Maestro",
    "rating": 5,
    "reviews": 58,
    "image": "pagina-antigua/assets/images/eventos/dia-del-maestro/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/dia-del-maestro/1.jpg",
      "pagina-antigua/assets/images/eventos/dia-del-maestro/2.jpg",
      "pagina-antigua/assets/images/eventos/dia-del-maestro/3.jpg"
    ],
    "shortDesc": "Reconocimientos de agradecimiento para docentes con frases dedicatorias en acrílico y madera.",
    "description": "Demuestra tu gratitud hacia los profesores que inspiran vidas. Elaboramos placas de escritorio y portalápices con mensajes imborrables.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Grabado láser de alta precisión con caligrafía elegante",
      "Estructuras duraderas para escritorio docente"
    ],
    "customFields": [
      {
        "name": "Nombre del docente y curso",
        "placeholder": "Ej. Prof. María Elena - 3ro Bachillerato"
      }
    ],
    "relatedIds": [
      "placa-reconocimiento",
      "agendas-cuero-laser"
    ]
  },
  {
    "id": "recuerdos-dia-madre",
    "name": "Regalos Especiales para el Día de la Madre",
    "category": "recuerdos-eventos",
    "subCategory": "dia-madre",
    "occasion": [
      "madre"
    ],
    "material": "Madera MDF + Acrílico Cristal",
    "badge": "Día de la Madre",
    "rating": 5,
    "reviews": 94,
    "image": "pagina-antigua/assets/images/eventos/madre/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/madre/1.jpg",
      "pagina-antigua/assets/images/eventos/madre/2.jpg",
      "pagina-antigua/assets/images/eventos/madre/3.jpg"
    ],
    "shortDesc": "Portarretratos, cajas de recuerdos y árboles genealógicos familiares grabados a láser.",
    "description": "Sorprende a mamá en su día con piezas emotivas diseñadas a medida con nombres de sus hijos.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Diseño estructural tridimensional",
      "Acabado pulido con barniz de protección"
    ],
    "customFields": [
      {
        "name": "Nombres de los hijos",
        "placeholder": "Ej. De tus hijos: Mateo, Valeria y Leo"
      }
    ],
    "relatedIds": [
      "cupula-girasol",
      "lamp-led-madera"
    ]
  },
  {
    "id": "recuerdos-dia-padre",
    "name": "Regalos Especiales para el Día del Padre",
    "category": "recuerdos-eventos",
    "subCategory": "dia-padre",
    "occasion": [
      "padre"
    ],
    "material": "Madera Noble + Acrílico Espejo",
    "badge": "Día del Padre",
    "rating": 4.9,
    "reviews": 42,
    "image": "pagina-antigua/assets/images/eventos/diadelpadre/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/diadelpadre/1.jpg",
      "pagina-antigua/assets/images/eventos/diadelpadre/2.jpg"
    ],
    "shortDesc": "Llaveros de cuero, cajas de vino y organizadores de escritorio grabados para papá.",
    "description": "Detalles ejecutivos y funcionales grabados con frases o fotografías memorables para el héroe de la casa.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Corte sólido de maderas nobles",
      "Grabado profundo resistente"
    ],
    "customFields": [
      {
        "name": "Dedicatoria para papá",
        "placeholder": "Ej. El mejor papá del universo"
      }
    ],
    "relatedIds": [
      "lamp-led-madera",
      "agendas-cuero-laser"
    ]
  },
  {
    "id": "recuerdos-matrimonio",
    "name": "Letreros & Souvenirs para Matrimonios y Bodas",
    "category": "recuerdos-eventos",
    "subCategory": "bodas",
    "occasion": [
      "bodas",
      "aniversario"
    ],
    "material": "Acrílico Espejo + Madera Grabada",
    "badge": "Bodas Elegantes",
    "rating": 5,
    "reviews": 47,
    "image": "pagina-antigua/assets/images/eventos/matrimonios/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/matrimonios/1.jpg",
      "pagina-antigua/assets/images/eventos/matrimonios/2.jpg"
    ],
    "shortDesc": "Letreros de bienvenida para recepción, toppers de pastel y recuerdos de mesa para novios.",
    "description": "Dale un toque refinado a tu boda con detalles de grabado láser en acrílico espejado.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Tipografía de caligrafía fina personalizada",
      "Acrílico espejado dorado y plateado"
    ],
    "customFields": [
      {
        "name": "Nombres de los novios y fecha de boda",
        "placeholder": "Ej. Gabriel & Andrea - 20.08.2026"
      }
    ],
    "relatedIds": [
      "cupula-rosa-eterna",
      "led-cuadros-iluminados"
    ]
  },
  {
    "id": "recuerdos-cumpleanos",
    "name": "Detalles & Letreros Personalizados para Cumpleaños",
    "category": "recuerdos-eventos",
    "subCategory": "cumpleanos",
    "occasion": [
      "cumpleanos"
    ],
    "material": "MDF Calado + Acrílico de Colores",
    "badge": "Cumpleaños",
    "rating": 4.8,
    "reviews": 36,
    "image": "pagina-antigua/assets/images/eventos/cumpleanos/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/cumpleanos/1.jpg",
      "pagina-antigua/assets/images/eventos/cumpleanos/2.jpg"
    ],
    "shortDesc": "Toppers para pastel, letreros gigantes de nombre y recuerdos festivos.",
    "description": "Haz que tu fiesta sea única con toppers de torta en acrílico brillante y nombres calados gigantes para el fondo fotográfico.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Corte fino en acrílico de colores o dorado espejado",
      "Personalización de años y nombre del cumpleañero"
    ],
    "customFields": [
      {
        "name": "Nombre y años a cumplir",
        "placeholder": "Ej. Mis 15 Años - Valentina"
      }
    ],
    "relatedIds": [
      "lamp-led-grietas",
      "recuerdos-dia-nino"
    ]
  },
  {
    "id": "recuerdos-dia-mujer",
    "name": "Detalles Honoríficos para el Día de la Mujer",
    "category": "recuerdos-eventos",
    "subCategory": "dia-mujer",
    "occasion": [
      "dia-mujer",
      "corporativo"
    ],
    "material": "Acrílico + Madera Rosada / Dorada",
    "badge": "Día de la Mujer",
    "rating": 4.9,
    "reviews": 28,
    "image": "pagina-antigua/assets/images/eventos/diadelamujer/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/diadelamujer/1.jpg",
      "pagina-antigua/assets/images/eventos/diadelamujer/2.jpg"
    ],
    "shortDesc": "Placas conmemorativas y detalles en acrílico para celebrar a la mujer en empresas e instituciones.",
    "description": "Reconoce el liderazgo y dedicación femenina en eventos institucionales con hermosas piezas de acrílico y madera.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Diseños delicados y elegantes",
      "Personalización con logotipo de la empresa"
    ],
    "customFields": [
      {
        "name": "Frase o dedicatoria",
        "placeholder": "Ej. Para una mujer extraordinaria"
      }
    ],
    "relatedIds": [
      "cupula-girasol",
      "placa-reconocimiento"
    ]
  },
  {
    "id": "recuerdos-sacramentos",
    "name": "Recuerdos para Sacramentos & Confirmación",
    "category": "recuerdos-eventos",
    "subCategory": "sacramentos",
    "occasion": [
      "sacramentos"
    ],
    "material": "Acrílico Espejo + Madera Fina",
    "badge": "Sacramentos",
    "rating": 4.9,
    "reviews": 19,
    "image": "pagina-antigua/assets/images/eventos/sacramentos/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/eventos/sacramentos/1.jpg",
      "pagina-antigua/assets/images/eventos/sacramentos/2.jpg"
    ],
    "shortDesc": "Recordatorios solemnes de confirmación y comunión con grabado fino.",
    "description": "Recordatorios elegantes en materiales imperecederos con oración calada o datos del sacramento.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Caligrafía religiosa nítida",
      "Formatos de pie o para colgar"
    ],
    "customFields": [
      {
        "name": "Nombre y fecha del sacramento",
        "placeholder": "Ej. Mi Confirmación - Mateo / 2026"
      }
    ],
    "relatedIds": [
      "recuerdos-bautizo"
    ]
  },
  {
    "id": "detalles-led-recuerdos",
    "name": "Detalles LED Luminosos para Eventos",
    "category": "recuerdos-eventos",
    "subCategory": "detalles-led",
    "occasion": [
      "bodas",
      "cumpleanos"
    ],
    "material": "Acrílico + Micro-LED Ambientales",
    "badge": "Luces Ambientales",
    "rating": 5,
    "reviews": 44,
    "image": "pagina-antigua/assets/images/productos/detalles-led/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/detalles-led/1.jpg",
      "pagina-antigua/assets/images/productos/detalles-led/2.jpg"
    ],
    "shortDesc": "Centros de mesa iluminados con números de mesa o siluetas grabadas para recepciones nocturnas.",
    "description": "Crea una atmósfera deslumbrante en tu fiesta con identificadores de mesa luminosos en acrílico con luz LED integrada.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Iluminación LED autónoma",
      "Números o nombres intercambiables"
    ],
    "customFields": [
      {
        "name": "Números de mesa o evento",
        "placeholder": "Ej. Mesa 1 a Mesa 15"
      }
    ],
    "relatedIds": [
      "lamp-led-madera",
      "recuerdos-matrimonio"
    ]
  },
  {
    "id": "placa-reconocimiento",
    "name": "Placas Honoríficas de Reconocimiento Institucional",
    "category": "placas-reconocimientos",
    "subCategory": "placas-honorificas",
    "occasion": [
      "corporativo",
      "maestro",
      "grados"
    ],
    "material": "Acrílico Premium + Base Madera Robusta",
    "badge": "Alta Gama",
    "rating": 5,
    "reviews": 73,
    "image": "pagina-antigua/assets/images/productos/placas-personalizadas/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/placas-personalizadas/1.jpg",
      "pagina-antigua/assets/images/productos/placas-personalizadas/2.jpg",
      "pagina-antigua/assets/images/productos/placas-personalizadas/3.jpg"
    ],
    "shortDesc": "Placas de premiación empresarial y gubernamental con grabado óptico y apliques metálicos.",
    "description": "La distinción perfecta para premiar la excelencia laboral, años de servicio o logros institucionales.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Acrílico cristal de alto grosor biselado a láser",
      "Base de madera natural con peso y estabilidad superior",
      "Grabado directo de escudos institucionales y logotipos"
    ],
    "customFields": [
      {
        "name": "Institución o Empresa otorga",
        "placeholder": "Ej. Cámara de Comercio de Lago Agrio"
      },
      {
        "name": "Nombre del homenajeado y motivo",
        "placeholder": "Ej. A: Dr. Fernando Silva por 25 años de trayectoria"
      }
    ],
    "relatedIds": [
      "medallas-personalizadas",
      "recuerdos-dia-maestro"
    ]
  },
  {
    "id": "medallas-personalizadas",
    "name": "Medallas Deportivas & Honoríficas Personalizadas",
    "category": "placas-reconocimientos",
    "subCategory": "medallas-trofeos",
    "occasion": [
      "corporativo",
      "grados"
    ],
    "material": "Acrílico Grabado + Cinta Satinada",
    "badge": "Eventos & Deportes",
    "rating": 4.9,
    "reviews": 52,
    "image": "pagina-antigua/assets/images/productos/placas-personalizadas/5.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/placas-personalizadas/5.jpg",
      "pagina-antigua/assets/images/productos/placas-personalizadas/6.jpg"
    ],
    "shortDesc": "Medallas talladas a láser en acrílico dorado, plateado o transparente con cinta personalizada.",
    "description": "Ideales para campeonatos deportivos, ferias científicas, graduaciones y concursos estudiantiles.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Corte perimetral a medida sin rebabas",
      "Acrílico especial espejo o grabado traslúcido",
      "Cinta tricolor o unicolor incorporada"
    ],
    "customFields": [
      {
        "name": "Puesto o categoría deportiva",
        "placeholder": "Ej. 1er Lugar - Torneo Intercolegial"
      }
    ],
    "relatedIds": [
      "placa-reconocimiento",
      "llaveros-personalizados"
    ]
  },
  {
    "id": "portarretrato-doble",
    "name": "Portarretratos de Doble Impresión y Grabado",
    "category": "articulos-personalizados",
    "subCategory": "portarretratos",
    "occasion": [
      "aniversario",
      "madre",
      "bodas"
    ],
    "material": "Acrílico Cristal + Madera Noble",
    "badge": "Doble Vista",
    "rating": 4.9,
    "reviews": 41,
    "image": "pagina-antigua/assets/images/productos/portaretratos-doble-impresion/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/portaretratos-doble-impresion/1.jpg",
      "pagina-antigua/assets/images/productos/portaretratos-doble-impresion/2.jpg"
    ],
    "shortDesc": "Exclusivo portarretrato con doble vidrio acrílico y grabado de dedicatorias perimetrales.",
    "description": "Permite exhibir tus mejores fotografías por ambas caras con un marco flotante grabado a láser.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Sistema flotante magnético o de ensamble sencillo",
      "Acrílico ultraclaro anti-amarilleo",
      "Impresión fotográfica HD + grabado láser perimetral"
    ],
    "customFields": [
      {
        "name": "Frase para el borde o base",
        "placeholder": "Ej. Siempre juntos / 2026"
      }
    ],
    "relatedIds": [
      "led-cuadros-iluminados",
      "cuadro-tipo-libro"
    ]
  },
  {
    "id": "llaveros-personalizados",
    "name": "Llaveros Personalizados en Acrílico, Cuero & Madera",
    "category": "articulos-personalizados",
    "subCategory": "llaveros",
    "occasion": [
      "corporativo",
      "cumpleanos",
      "aniversario"
    ],
    "material": "Acrílico Espejo / Cuero / MDF",
    "badge": "Regalo Útil",
    "rating": 4.8,
    "reviews": 110,
    "image": "pagina-antigua/assets/images/productos/llaveros/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/llaveros/1.jpg",
      "pagina-antigua/assets/images/productos/llaveros/2.jpg"
    ],
    "shortDesc": "Llaveros grabados con placas vehiculares, nombres, Spotify codes o logotipos de marcas.",
    "description": "El souvenir publicitario y personal por excelencia. Grabado de alta resistencia al roce.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Herrajes metálicos reforzados incluidos",
      "Resistentes al desgaste diario"
    ],
    "customFields": [
      {
        "name": "Texto, placa o logotipo",
        "placeholder": "Ej. Placa vehícular PBC-1234 o Nombre"
      }
    ],
    "relatedIds": [
      "agendas-cuero-laser",
      "recuerdos-graduacion"
    ]
  },
  {
    "id": "agendas-cuero-laser",
    "name": "Agendas & Cuadernos Grabados en Cuero y Cuerina",
    "category": "articulos-personalizados",
    "subCategory": "agendas-cuero",
    "occasion": [
      "corporativo",
      "maestro",
      "cumpleanos"
    ],
    "material": "Cuerina Sintética Grabable + Hojas Bond",
    "badge": "Ejecutivo",
    "rating": 5,
    "reviews": 38,
    "image": "pagina-antigua/assets/images/productos/agendas/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/agendas/1.jpg",
      "pagina-antigua/assets/images/productos/agendas/2.jpg"
    ],
    "shortDesc": "Agendas ejecutivas grabadas a láser con iniciales, nombres o escudos institucionales.",
    "description": "Un detalle distinguido para profesionales y ejecutivos. La tecnología láser pirograba el cuero.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Portada de cuerina de alta textura",
      "Pirograbado láser permanente"
    ],
    "customFields": [
      {
        "name": "Nombre completo e iniciales",
        "placeholder": "Ej. Dra. Carmen Lucía Viteri"
      }
    ],
    "relatedIds": [
      "llaveros-personalizados",
      "recuerdos-dia-maestro"
    ]
  },
  {
    "id": "cuadro-tipo-libro",
    "name": "Cuadros Grabados Tipo Libro Tallado",
    "category": "articulos-personalizados",
    "subCategory": "cuadros-libro",
    "occasion": [
      "bodas",
      "aniversario",
      "maestro"
    ],
    "material": "Madera Mdf + Grabado Láser",
    "badge": "Edición Libro",
    "rating": 4.9,
    "reviews": 26,
    "image": "pagina-antigua/assets/images/productos/cuadro-tipo-libro/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/cuadro-tipo-libro/1.jpg",
      "pagina-antigua/assets/images/productos/cuadro-tipo-libro/2.jpg"
    ],
    "shortDesc": "Estructura de madera con diseño de libro abierto grabado con poemas o dedicatorias.",
    "description": "Diseño único que simula las páginas abiertas de un libro pergamino. Ideal para cartas de amor o agradecimientos.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Tallado de bordes imitando páginas",
      "Grabado láser de textos largos"
    ],
    "customFields": [
      {
        "name": "Poema o dedicatoria a grabar",
        "placeholder": "Ej. Redacta el texto completo a incluir"
      }
    ],
    "relatedIds": [
      "portarretrato-doble",
      "led-cuadros-iluminados"
    ]
  },
  {
    "id": "adornos-navidad",
    "name": "Adornos & Bolas de Navidad Personalizadas",
    "category": "articulos-personalizados",
    "subCategory": "navidad",
    "occasion": [
      "cumpleanos",
      "corporativo"
    ],
    "material": "Acrílico Espejo + MDF Grabado",
    "badge": "Navidad",
    "rating": 5,
    "reviews": 55,
    "image": "pagina-antigua/assets/images/productos/navidad/1.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/navidad/1.jpg",
      "pagina-antigua/assets/images/productos/navidad/2.jpg"
    ],
    "shortDesc": "Bolas de árbol de navidad con nombres calados en acrílico espejado dorado y rojo.",
    "description": "Viste tu árbol navideño o regala a tus colaboradores adornos grabados con nombres familiares y de mascotas.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Corte limpio con cinta colgante de seda",
      "Nombres calados a mano por láser"
    ],
    "customFields": [
      {
        "name": "Nombres a calar en adornos",
        "placeholder": "Ej. Familia Silva, Mateo, Pelusa"
      }
    ],
    "relatedIds": [
      "llaveros-personalizados",
      "recuerdos-matrimonio"
    ]
  },
  {
    "id": "corte-acrilico-laser",
    "name": "Corte & Grabado de Precisión en Acrílico Cristal",
    "category": "corte-materiales",
    "subCategory": "acrilico",
    "occasion": [
      "corporativo"
    ],
    "material": "Acrílico Colores y Transparente (2mm a 10mm)",
    "badge": "Procesamiento a Medida",
    "rating": 5,
    "reviews": 67,
    "image": "pagina-antigua/assets/images/productos/acrilico/1.png",
    "gallery": [
      "pagina-antigua/assets/images/productos/acrilico/1.png",
      "pagina-antigua/assets/images/productos/acrilico/2.png"
    ],
    "shortDesc": "Fabricación de rótulos, señalética, exhibidores y piezas industriales en acrílico.",
    "description": "Ofrecemos servicio de corte CNC láser para proyectos arquitectónicos, comerciales y decorativos en acrílico.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Bordes pulidos al fuego mediante rayo láser",
      "Tolerancia micrométrica de ajuste de piezas"
    ],
    "customFields": [
      {
        "name": "Dimensiones y descripción del proyecto",
        "placeholder": "Ej. Rótulo 40x20cm con logo calado"
      }
    ],
    "relatedIds": [
      "corte-madera-mdf",
      "placa-reconocimiento"
    ]
  },
  {
    "id": "corte-madera-mdf",
    "name": "Corte & Calado Decorativo en Madera MDF",
    "category": "corte-materiales",
    "subCategory": "madera-mdf",
    "occasion": [
      "corporativo",
      "cumpleanos"
    ],
    "material": "Madera MDF (3mm a 9mm)",
    "badge": "Artesanal Láser",
    "rating": 4.9,
    "reviews": 54,
    "image": "pagina-antigua/assets/images/productos/madera-mdf/1.png",
    "gallery": [
      "pagina-antigua/assets/images/productos/madera-mdf/1.png",
      "pagina-antigua/assets/images/productos/madera-mdf/2.png"
    ],
    "shortDesc": "Nombres calados para pared, mandalas, biombos y estructuras armables de madera.",
    "description": "Corte limpio de madera MDF para decoración de interiores, letreros gigantes y organizadores.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Excelente definición en vectores complejos",
      "Apto para pintar o barnizar"
    ],
    "customFields": [
      {
        "name": "Nombre o vector a calar",
        "placeholder": "Ej. Nombre gigante para mesa principal: Isabella"
      }
    ],
    "relatedIds": [
      "corte-acrilico-laser",
      "corte-cuero-laser"
    ]
  },
  {
    "id": "corte-cuero-laser",
    "name": "Grabado & Marcado Láser en Cuero Natural y Cuerina",
    "category": "corte-materiales",
    "subCategory": "cuero",
    "occasion": [
      "corporativo"
    ],
    "material": "Cuero Vacuno / Cuerina / Gamuza",
    "badge": "Pirograbado Láser",
    "rating": 5,
    "reviews": 31,
    "image": "pagina-antigua/assets/images/productos/cuero/1.png",
    "gallery": [
      "pagina-antigua/assets/images/productos/cuero/1.png",
      "pagina-antigua/assets/images/productos/cuero/2.png"
    ],
    "shortDesc": "Etiquetas para confección, billeteras, parches para gorras y cinturones grabados.",
    "description": "Personalización láser de prendas y marroquinería con contraste quemado natural.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Ideal para marcas de ropa y parches",
      "Corte perimetral limpio con sellado térmico"
    ],
    "customFields": [
      {
        "name": "Diseño o marca a pirograbar",
        "placeholder": "Ej. Logo de marca de ropa o iniciales"
      }
    ],
    "relatedIds": [
      "agendas-cuero-laser",
      "llaveros-personalizados"
    ]
  },
  {
    "id": "corte-cartulina-laser",
    "name": "Corte Fino & Filigrana en Papel y Cartulina",
    "category": "corte-materiales",
    "subCategory": "cartulina-papel",
    "occasion": [
      "bodas",
      "cumpleanos"
    ],
    "material": "Cartulina Fina 220g - 300g",
    "badge": "Filigrana Fina",
    "rating": 4.8,
    "reviews": 23,
    "image": "pagina-antigua/assets/images/productos/papel-cartulina/1.png",
    "gallery": [
      "pagina-antigua/assets/images/productos/papel-cartulina/1.png",
      "pagina-antigua/assets/images/productos/papel-cartulina/2.png"
    ],
    "shortDesc": "Tarjetas de invitación caladas tipo encaje, toppers de pastel y empaques calados.",
    "description": "Corte ultra preciso en papelería fina para partes de matrimonio y sobres calados.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Sin bordes quemados",
      "Cartulinas perladas y mate"
    ],
    "customFields": [
      {
        "name": "Tipo de evento y modelo de tarjeta",
        "placeholder": "Ej. Partes de matrimonio estilo encaje floral"
      }
    ],
    "relatedIds": [
      "recuerdos-matrimonio",
      "corte-carton-laser"
    ]
  },
  {
    "id": "corte-carton-laser",
    "name": "Corte & Estructuras en Cartón Rígido Láser",
    "category": "corte-materiales",
    "subCategory": "carton-laser",
    "occasion": [
      "corporativo"
    ],
    "material": "Cartón Paja / Corrugado / Rígido",
    "badge": "Empaques Rígidos",
    "rating": 4.9,
    "reviews": 18,
    "image": "pagina-antigua/assets/images/productos/carton-laser/1.png",
    "gallery": [
      "pagina-antigua/assets/images/productos/carton-laser/1.png",
      "pagina-antigua/assets/images/productos/carton-laser/2.png"
    ],
    "shortDesc": "Maquetas arquitectónicas, empaques a medida y cajas caladas de cartón.",
    "description": "Prototipado rápido y empaques personalizados en cartón rígido procesado a láser.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Encajes exactos para maquetas",
      "Cajas troqueladas a medida"
    ],
    "customFields": [
      {
        "name": "Especificaciones del cartón o maqueta",
        "placeholder": "Ej. Maqueta escala 1:100"
      }
    ],
    "relatedIds": [
      "corte-cartulina-laser",
      "corte-madera-mdf"
    ]
  },
  {
    "id": "menu-restaurante-laser",
    "name": "Cartas & Menús de Madera y Acrílico para Restaurantes",
    "category": "corte-materiales",
    "subCategory": "menus-restaurante",
    "occasion": [
      "corporativo"
    ],
    "material": "Madera / Acrílico / Cuerina",
    "badge": "Restaurantes",
    "rating": 5,
    "reviews": 27,
    "image": "pagina-antigua/assets/images/productos/produ-menu/15.jpg",
    "gallery": [
      "pagina-antigua/assets/images/productos/produ-menu/15.jpg"
    ],
    "shortDesc": "Portamenús de lujo de madera grabada con logo calado para cafeterías y restaurantes.",
    "description": "Renueva la imagen de tu restaurante con cartas y portamenús elegantes grabados con láser.",
    "leadTime": "3 a 5 días hábiles",
    "features": [
      "Tratamiento lavable y antimanchas",
      "Herrajes para hojas intercambiables"
    ],
    "customFields": [
      {
        "name": "Logo y nombre del restaurante",
        "placeholder": "Ej. Café Gourmet / Logo calado"
      }
    ],
    "relatedIds": [
      "agendas-cuero-laser",
      "placa-reconocimiento"
    ]
  }
];

// Categorías Principales (Páginas Dedicadas)
const MAIN_PAGES_CONFIG = {
  "lamparas-led": {
    title: "Lámparas LED 3D",
    subtitle: "Grabado láser en acrílico con iluminación LED, bases de madera, parlante Bluetooth y controles táctiles.",
    icon: "fa-lightbulb",
    subCategories: [
      { id: "all", name: "Todas las Lámparas" },
      { id: "base-madera", name: "Base Madera Natural" },
      { id: "base-grietas", name: "Base Grietas Multicolor" },
      { id: "base-parlante", name: "Parlante Bluetooth HD" },
      { id: "base-giratoria", name: "Base Giratoria 360" },
      { id: "cuadros-led", name: "Cuadros LED Iluminados" },
      { id: "base-bateria", name: "Base Batería Portátil" },
      { id: "lamparas-mix", name: "Colección Mixta" }
    ]
  },
  "cupulas-florales": {
    title: "Cúpulas Florales & Regalos Eternos",
    subtitle: "Girasoles y Rosas naturales preservadas de larga duración bajo transparente cúpula de cristal con luces LED.",
    icon: "fa-spa",
    subCategories: [
      { id: "all", name: "Todas las Cúpulas" },
      { id: "girasoles", name: "Girasol Eterno" },
      { id: "rosas-preservadas", name: "Rosa Eterna Encantada" }
    ]
  },
  "recuerdos-eventos": {
    title: "Recuerdos & Eventos Sociales",
    subtitle: "Obsequios inolvidables para Graduaciones, Bautizos, Baby Shower, Día del Niño, Día del Maestro, Madre, Padre y Bodas.",
    icon: "fa-gift",
    subCategories: [
      { id: "all", name: "Todos los Recuerdos" },
      { id: "graduaciones", name: "Graduaciones" },
      { id: "bautizos", name: "Bautizos" },
      { id: "babyshower", name: "Baby Shower" },
      { id: "dia-nino", name: "Día del Niño" },
      { id: "dia-maestro", name: "Día del Maestro" },
      { id: "dia-madre", name: "Día de la Madre" },
      { id: "dia-padre", name: "Día del Padre" },
      { id: "bodas", name: "Bodas & Matrimonios" },
      { id: "cumpleanos", name: "Cumpleaños" },
      { id: "dia-mujer", name: "Día de la Mujer" },
      { id: "sacramentos", name: "Sacramentos" },
      { id: "detalles-led", name: "Detalles LED" }
    ]
  },
  "placas-reconocimientos": {
    title: "Placas & Reconocimientos Institucionales",
    subtitle: "Distinción y elegancia para premiaciones empresariales, medallas deportivas y trofeos honoríficos.",
    icon: "fa-award",
    subCategories: [
      { id: "all", name: "Todos los Reconocimientos" },
      { id: "placas-honorificas", name: "Placas Honoríficas" },
      { id: "medallas-trofeos", name: "Medallas & Trofeos" }
    ]
  },
  "articulos-personalizados": {
    title: "Artículos Personalizados & Utilidades",
    subtitle: "Portaretratos dobles, agendas ejecutivas en cuero, llaveros vehiculares, cuadros libro y adornos festivos.",
    icon: "fa-star",
    subCategories: [
      { id: "all", name: "Todos los Artículos" },
      { id: "portarretratos", name: "Portarretratos" },
      { id: "llaveros", name: "Llaveros Grabados" },
      { id: "agendas-cuero", name: "Agendas en Cuero" },
      { id: "cuadros-libro", name: "Cuadros Libro" },
      { id: "navidad", name: "Adornos Navidad" }
    ]
  },
  "corte-materiales": {
    title: "Corte & Procesamiento de Materiales a Medida",
    subtitle: "Servicio de corte CNC láser y pirograbado en Acrílico, Madera MDF, Cuero vacuno, Papel fino y Cartón rígido.",
    icon: "fa-scissors",
    subCategories: [
      { id: "all", name: "Todos los Servicios" },
      { id: "acrilico", name: "Acrílico Cristal" },
      { id: "madera-mdf", name: "Madera MDF" },
      { id: "cuero", name: "Pirograbado en Cuero" },
      { id: "cartulina-papel", name: "Filigrana en Cartulina" },
      { id: "carton-laser", name: "Cartón Rígido" },
      { id: "menus-restaurante", name: "Portamenús Restaurante" }
    ]
  }
};
