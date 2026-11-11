// Todo el contenido editable del sitio vive aca.
// Las fotos editorial-* son imágenes ilustrativas generadas con Higgsfield.
// No representan el local, su personal ni productos confirmados del catálogo.
// Créditos de la fotografía real de Paraná: /public/img/CREDITOS.md.

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
  { id: 'historia', label: 'Historia' },
  { id: 'espacio', label: 'El local' },
  { id: 'especialidad', label: 'Especialidad' },
  { id: 'marcas', label: 'Marcas' },
  { id: 'gift-card', label: 'Gift Card' },
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
  imagen: '/img/parana-costanera.webp',
  alt: 'Mirador de la costanera de Paraná junto al río al atardecer',
  fuente: 'https://commons.wikimedia.org/wiki/File:Costanera_de_Parana.jpg',
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
