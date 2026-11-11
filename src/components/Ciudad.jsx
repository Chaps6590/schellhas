import { ciudad } from '../content.js'
import './Ciudad.css'

export default function Ciudad() {
  return (
    <section className="ciudad wrap" aria-labelledby="ciudad-titulo">
      <div className="ciudad__heading">
        <div>
          <p className="eyebrow">Nuestro lugar en el mundo</p>
          <h2 id="ciudad-titulo" className="display">{ciudad.titulo}</h2>
        </div>
        <p className="lead">{ciudad.texto}</p>
      </div>
      <figure className="ciudad__figure">
        <img className="ciudad__img" src={ciudad.imagen} alt={ciudad.alt} loading="lazy" width="2000" height="1123" />
        <figcaption>
          <span>La costanera. El río. Nuestra ciudad.</span>
          <span>Foto: <a href={ciudad.fuente} target="_blank" rel="noreferrer">Claudeo3000</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · Recorte y compresión</span>
        </figcaption>
      </figure>
    </section>
  )
}
