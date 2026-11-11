import { manifiesto } from '../content.js'
import './Manifiesto.css'

function conEnfasis(texto) {
  return texto.split('*').map((parte, i) => (i % 2 ? <em key={i}>{parte}</em> : parte))
}

export default function Manifiesto() {
  return (
    <section className="mani wrap" aria-labelledby="manifiesto-titulo">
      <div className="mani__text">
        <p className="eyebrow">La mirada de Schellhas</p>
        <h2 id="manifiesto-titulo" className="display">{conEnfasis(manifiesto.titulo)}</h2>
        <p className="lead">{manifiesto.texto}</p>
      </div>
      <div className="mani__gallery">
        {manifiesto.imagenes.map((imagen, i) => (
          <figure className={`mani__fig mani__fig--${i + 1}`} key={imagen.src}>
            <div className="mani__image">
              <img className="foto" src={imagen.src} alt={imagen.alt} loading="lazy" width="800" height="1000" />
            </div>
            <figcaption><span>0{i + 1}</span>{imagen.epigrafe}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
