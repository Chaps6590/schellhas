// Cada escena tiene su propia composición. Los data-layer son los puntos de enganche
// que usa choreography.js para animar entradas, salidas y movimientos de reposo.
function Layer({ name, src, className = '', eager }) {
  return (
    <div className={`exhibit__layer exhibit__layer--${name} ${className}`} data-layer={name}>
      <img src={src} alt="" decoding="async" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} />
    </div>
  )
}

const compositions = {
  // 01 · Retrato a sangre
  hall: ({ scene }) => <>
    <div className="exhibit__bg" data-layer="bg" />
    <Layer name="photo" src={scene.image} eager />
    <div className="exhibit__shade" />
  </>,

  // 02 · Collage: una foto principal y dos recortes superpuestos
  archive: () => <>
    <div className="exhibit__bg" data-layer="bg" />
    <Layer name="a" src="/img/editorial-oficio.webp" eager />
    <Layer name="b" src="/img/historia-rio.webp" eager />
    <Layer name="c" src="/img/historia-recuerdos.webp" eager />
    <div className="exhibit__shade" />
  </>,

  // 03 · Galería: tres paneles verticales a distinta altura
  fashion: () => <>
    <div className="exhibit__bg" data-layer="bg" />
    <Layer name="p1" src="/img/editorial-mirada-mujer.webp" eager />
    <Layer name="p2" src="/img/editorial-mirada-hombre.webp" eager />
    <Layer name="p3" src="/img/editorial-mirada-plata.webp" eager />
    <div className="exhibit__shade" />
  </>,

  // 04 · Ventana que se abre al espacio
  space: ({ scene }) => <>
    <div className="exhibit__bg" data-layer="bg" />
    <Layer name="photo" src={scene.image} eager />
    <div className="exhibit__shade" />
  </>,

  // 05 · Foto grande y una "lente" circular con el detalle
  care: ({ scene }) => <>
    <div className="exhibit__bg" data-layer="bg" />
    <Layer name="a" src={scene.image} eager />
    <div className="exhibit__shade" />
    <Layer name="lens" src="/img/servicio-prueba.webp" eager />
  </>,

  // 06 · Regalos: la fotografía de la tarjeta a sangre; el formulario vive en la columna de texto
  gift: ({ scene }) => <>
    <div className="exhibit__bg" data-layer="bg" />
    <Layer name="bgimg" src={scene.image} eager />
    <div className="exhibit__shade" />
  </>,

  // 07 · Panorámica del río que se desliza
  river: ({ scene }) => <>
    <div className="exhibit__bg" data-layer="bg" />
    <div className="exhibit__layer exhibit__layer--photo exhibit__layer--pano" data-layer="photo">
      <img src={scene.image} alt="" decoding="async" loading="eager" />
    </div>
    <div className="exhibit__shade" />
  </>,
}

export default function Set({ scene, index }) {
  const Composition = compositions[scene.room]
  return (
    <div className={`exhibit__set exhibit__set--${scene.room}`} data-set={index} aria-hidden="true">
      <Composition scene={scene} />
    </div>
  )
}
