// Todo el contenido editable del sitio vive aca.
// Las fotos editorial-* son imágenes ilustrativas generadas con Higgsfield.
// No representan el local, su personal ni productos confirmados del catálogo.
// La vista de Paraná usa una fotografía real con atardecer recreado en Higgsfield.
// Créditos y licencia: /public/img/CREDITOS.md.

const WHATSAPP = '5493434715911'

export const waLink = (texto) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`

export const marca = {
  nombre: 'Ópticas Schellhas',
  lema: 'Otra forma de ver',
  anios: 135,
  direccion: 'Urquiza 1043',
  ciudad: 'Paraná, Entre Ríos',
  telefonos: ['343 471-5911', '343 432-5824'],
  email: 'schellhasparana@hotmail.com',
  instagram: 'https://www.instagram.com/optica.schellhas.pna/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Urquiza+1043+Paran%C3%A1+Entre+R%C3%ADos',
  // TODO confirmar horarios con el local
  horarios: 'Consultá nuestros horarios por WhatsApp',
}

export const nav = [
  { id: 'historia', label: 'La historia' },
  { id: 'colecciones', label: 'Las miradas' },
  { id: 'espacio', label: 'El espacio' },
  { id: 'atencion', label: 'El oficio' },
  { id: 'regalos', label: 'Regalos' },
  { id: 'contacto', label: 'Encontranos' },
]

// Relato institucional. La galería usa imágenes editoriales ilustrativas;
// no se atribuyen estas personas o espacios al equipo real del local.
export const recorrido = [
  {
    id: 'miradas', label: 'Las miradas', eyebrow: 'Ópticas Schellhas · Paraná',
    title: 'Otra forma *de ver.*',
    text: 'Hay miradas que dicen todo. Hace 135 años acompañamos a las de nuestra ciudad.',
    photos: [
      { src: '/img/editorial-mirada-hombre.webp', alt: 'Retrato editorial de un hombre con anteojos negros', caption: 'Actitud propia', x: -37, y: -6, depth: 60, angle: 12, tilt: -4, width: 20 },
      { src: '/img/editorial-mirada-mujer.webp', alt: 'Retrato editorial de una mujer con anteojos color cereza', caption: 'Una mirada, una identidad', x: 36, y: -8, depth: -100, angle: -14, tilt: 4, width: 21 },
      { src: '/img/editorial-mirada-plata.webp', alt: 'Retrato editorial de un hombre de pelo plateado con anteojos de metal', caption: 'El estilo no tiene edad', x: -24, y: 32, depth: -200, angle: 7, tilt: 3, width: 13 },
      { src: '/img/editorial-retrato.webp', alt: 'Retrato editorial de una mujer con anteojos bordó', caption: 'Tu forma de mirar', x: 26, y: 32, depth: -100, angle: -6, tilt: -3, width: 12 },
    ],
  },
  {
    id: 'historia', label: 'La historia', eyebrow: 'Un apellido. Una ciudad. 135 años.',
    title: 'Una historia *de miradas.*',
    text: 'Somos Ópticas Schellhas. En Paraná, el oficio óptico y la atención personal son parte de nuestra manera de hacer las cosas.',
    photos: [
      { src: '/img/historia-examen.webp', alt: 'Imagen de archivo ilustrativa de un examen visual', caption: 'El oficio a través del tiempo · Imagen ilustrativa', x: -37, y: -2, depth: -80, angle: 12, tilt: -3, width: 23 },
      { src: '/img/editorial-armazon.webp', alt: 'Armazón de acetato sobre una base de piedra', caption: 'Los detalles que permanecen', x: 37, y: 3, depth: -150, angle: -12, tilt: 4, width: 21 },
      { src: '/img/editorial-detalle.webp', alt: 'Dos armazones de distintas épocas y estilos sobre lino', caption: 'Otras formas. La misma dedicación.', x: -26, y: 32, depth: -300, angle: 8, tilt: 2, width: 15 },
    ],
  },
  {
    id: 'oficio', label: 'El oficio', eyebrow: 'La precisión también se hace a mano',
    title: 'Detrás de cada *detalle.*',
    text: 'Escuchar, medir, ajustar. Revisar una bisagra, acompañar una adaptación. El trabajo que hace que tus anteojos se sientan tuyos.',
    photos: [
      { src: '/img/editorial-oficio.webp', alt: 'Manos ajustando la bisagra de unos anteojos con una herramienta de precisión', caption: 'Ajustar. Cuidar. Dar una nueva vida.', x: -38, y: -2, depth: -90, angle: 13, tilt: -3, width: 25 },
      { src: '/img/editorial-medicion.webp', alt: 'Escena ilustrativa de una medición visual personalizada', caption: 'La tecnología al servicio de cada persona', x: 39, y: 0, depth: -180, angle: -12, tilt: 3, width: 25 },
      { src: '/img/editorial-detalle.webp', alt: 'Detalle de lentes y armazones sobre lino', caption: 'Cada milímetro importa', x: 25, y: 33, depth: -280, angle: -7, width: 14 },
    ],
  },
  {
    id: 'espacio', label: 'El local', eyebrow: 'Urquiza 1043 · En pleno centro de Paraná',
    title: 'Pasá. Tomate *tu tiempo.*',
    text: 'Un lugar para conversar, probar y preguntar. Te esperamos para conocer tu forma de mirar y acompañarte a encontrar comodidad.',
    photos: [
      { src: '/img/editorial-seleccion.webp', alt: 'Composición ilustrativa de armazones sobre bases de piedra y madera', caption: 'Diseño, de cerca · Imagen de ambientación', x: -38, y: 0, depth: -100, angle: 12, tilt: -2, width: 24 },
      { src: '/img/editorial-retrato.webp', alt: 'Mujer con anteojos bordó y una sonrisa natural', caption: 'La atención empieza por escuchar', x: 38, y: -2, depth: -160, angle: -12, tilt: 3, width: 21 },
      { src: '/img/editorial-armazon.webp', alt: 'Armazón óptico de acetato color miel', caption: 'Cada elección es personal', x: -25, y: 33, depth: -300, angle: 6, width: 14 },
    ],
  },
]

export const oficio = [
  {
    id: 'ajuste', title: 'Ajuste y reparación', label: 'Cuidar', image: '/img/editorial-oficio.webp',
    alt: 'Detalle ilustrativo de una reparación de anteojos',
    text: 'Un anteojo también necesita cuidado. Revisamos cómo apoya, cómo cierran las patillas y qué le pasa a ese armazón que querés seguir usando.',
    details: ['Revisión del estado del armazón y sus bisagras.', 'Ajuste del apoyo y de las patillas para mejorar la comodidad.', 'Evaluación de la reparación según el material y el estado de la pieza.'],
  },
  {
    id: 'medicion', title: 'Medir para cada mirada', label: 'Medir', image: '/img/editorial-medicion.webp',
    alt: 'Escena ilustrativa de medición visual con equipamiento digital',
    text: 'La posición de tus ojos y la forma en que usás el armazón importan. La medición permite centrar cada lente para esa combinación de persona y anteojo.',
    details: ['Mediciones personalizadas sobre el armazón elegido.', 'Equipamiento digital para acompañar el trabajo de precisión.', 'Tiempo para explicar el proceso y responder preguntas.'],
  },
  {
    id: 'multifocales', title: 'Acompañar la adaptación', label: 'Acompañar', image: '/img/editorial-retrato.webp',
    alt: 'Retrato editorial de una mujer usando anteojos',
    text: 'Los multifocales reúnen distintas distancias de visión. Elegirlos y acostumbrarse a usarlos es un proceso que acompañamos de manera personal.',
    details: ['Orientación sobre el uso de las distintas zonas del lente.', 'Seguimiento de la comodidad durante la adaptación.', 'Espacio para volver, preguntar y revisar el ajuste.'],
  },
]

export const hero = {
  titulo: 'Otra forma de ver.',
  bajada:
    'Hace 135 años acompañamos la mirada de Paraná. Un oficio que pasó de mano en mano y sigue en la misma ciudad.',
  imagen: '/img/hero.webp',
  alt: 'Mujer con anteojos de sol en un paisaje al atardecer',
}

export const manifiesto = {
  // La palabra entre asteriscos se muestra en cursiva.
  titulo: 'Cada par de anteojos guarda una *historia*',
  texto:
    'En Schellhas no se vende un armazón: se conversa, se mide, se prueba. Así lo hacemos desde siempre.',
  imagenes: [
    { src: '/img/editorial-armazon.webp', alt: 'Armazón de acetato color miel sobre una base de piedra clara', epigrafe: 'Una elección personal' },
    { src: '/img/editorial-oficio.webp', alt: 'Manos ajustando con precisión la bisagra de un armazón', epigrafe: 'El valor del oficio' },
    { src: '/img/editorial-retrato.webp', alt: 'Retrato de una mujer con anteojos color bordó y camisa de lino', epigrafe: 'Tu forma de mirar' },
    { src: '/img/editorial-detalle.webp', alt: 'Armazones de metal y acetato sobre una tela de lino natural', epigrafe: 'Los pequeños detalles' },
  ],
}

export const ciudad = {
  titulo: 'Paraná, nuestra ciudad',
  texto:
    'Frente al mismo río, generación tras generación. La ciudad cambió y nosotros con ella, sin movernos del centro.',
  imagen: '/img/parana-desde-el-rio.webp',
  alt: 'Vista panorámica de Paraná desde el río, con edificios sobre la barranca y reflejos dorados; atardecer recreado',
  fuente: 'https://commons.wikimedia.org/wiki/File:Panor%C3%A1mica_de_Paran%C3%A1,_Entre_R%C3%ADos.jpg',
}

// TODO: capítulos redactados como borrador. Reemplazar por los hitos reales
// (año de fundación, fundadores, mudanzas, generaciones) cuando el local los confirme.
export const historia = {
  titulo: '135 años, cuatro capítulos',
  capitulos: [
    {
      etiqueta: 'El origen',
      titulo: 'Una óptica para una ciudad que crecía',
      texto:
        'Schellhas abrió sus puertas cuando Paraná todavía se estaba haciendo. El oficio llegó con un apellido y se quedó.',
      imagen: '/img/historia-examen.webp',
      alt: 'Fotografía antigua en blanco y negro de un examen de la vista',
    },
    {
      etiqueta: 'El oficio',
      titulo: 'Medir, tallar, ajustar a mano',
      texto:
        'Durante décadas cada lente se trabajó en el taller propio. Esa paciencia por el detalle es la base de todo lo que vino después.',
      imagen: '/img/historia-taller.webp',
      alt: 'Manos ajustando un armazón sobre una mesa de trabajo',
    },
    {
      etiqueta: 'Las generaciones',
      titulo: 'Abuelos, padres e hijos en el mismo mostrador',
      texto:
        'Familias enteras eligieron sus primeros anteojos acá. Muchas siguen viniendo, ahora con sus nietos.',
      imagen: '/img/retrato-atardecer.webp',
      alt: 'Retrato de una mujer a contraluz durante el atardecer',
    },
    {
      etiqueta: 'Hoy',
      titulo: 'Tecnología nueva, la misma atención',
      texto:
        'Sumamos equipamiento de medición digital y lentes de última generación. Lo que no cambió es el tiempo que le dedicamos a cada persona.',
      imagen: '/img/editorial-medicion.webp',
      alt: 'Escena ilustrativa de atención personalizada con un equipo de medición visual',
    },
  ],
}

export const espacio = {
  titulo: 'Un local para recorrer sin apuro',
  texto: 'Urquiza 1043, en pleno centro. Pasá, probate lo que quieras y preguntá todo.',
  imagenes: [
    { src: '/img/editorial-seleccion.webp', alt: 'Selección ilustrativa de armazones sobre bases de piedra y madera' },
    { src: '/img/editorial-detalle.webp', alt: 'Detalle de armazones sobre lino natural' },
    { src: '/img/editorial-oficio.webp', alt: 'Detalle del ajuste manual de un armazón' },
  ],
}

export const especialidad = {
  titulo: 'Especialistas en multifocales',
  texto:
    'Un multifocal bien hecho no se nota. Depende de la medición, de la calidad del lente y de quién te acompaña en la adaptación.',
  imagen: '/img/servicio-prueba.webp',
  alt: 'Manos sosteniendo unos anteojos frente a una cartilla de prueba visual',
  // Items tomados de las historias destacadas del Instagram del local.
  servicios: [
    {
      titulo: 'Multifocales a medida',
      texto: 'Medición personalizada y seguimiento hasta que te sientas cómodo.',
    },
    {
      titulo: 'Lentes asféricas',
      texto: 'Más delgadas y livianas, con mejor visión en los bordes.',
    },
    {
      titulo: 'Medición digital',
      texto: 'Equipamiento de precisión para centrar cada lente en tu armazón.',
    },
    {
      titulo: 'Obras sociales y convenios',
      texto: 'Trabajamos con PAMI, obras sociales, colegios e instituciones de la ciudad.',
    },
  ],
}

// TODO confirmar el listado de marcas con el local (Ray-Ban esta confirmada por su Instagram).
export const marcas = {
  titulo: 'Las marcas que elegimos',
  lista: ['Ray-Ban', 'Vogue Eyewear', 'Oakley', 'Vulk', 'Reef', 'Rusty', 'Mormaii', 'Infinit'],
}

export const giftCard = {
  titulo: 'Regalá una nueva forma de ver',
  texto:
    'La Gift Card Schellhas se usa en armazones, anteojos de sol y lentes. La armás acá y la coordinamos por WhatsApp.',
  // TODO confirmar montos con el local
  montos: [30000, 50000, 80000, 120000],
}
