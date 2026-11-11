import { marcas } from '../content.js'
import './Marcas.css'

export default function Marcas() {
  return (
    <section className="marcas" id="marcas">
      <h2 className="marcas__title wrap">{marcas.titulo}</h2>

      {/* La lista real, accesible. La cinta de abajo es solo visual. */}
      <ul className="sr-only">
        {marcas.lista.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      <div className="marcas__belt" aria-hidden="true">
        {[0, 1].map((copia) => (
          <div className="marcas__row" key={copia}>
            {marcas.lista.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
