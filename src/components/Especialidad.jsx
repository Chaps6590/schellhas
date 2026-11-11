import { motion } from 'motion/react'
import { especialidad } from '../content.js'
import './Especialidad.css'

const EASE = [0.16, 1, 0.3, 1]

export default function Especialidad() {
  return (
    <section className="espc" id="especialidad">
      <div className="espc__inner wrap">
        <figure className="espc__fig">
          <img className="foto" src={especialidad.imagen} alt={especialidad.alt} loading="lazy" />
        </figure>

        <div className="espc__body">
          <p className="eyebrow espc__eyebrow">Nuestra especialidad</p>
          <h2 className="display">{especialidad.titulo}</h2>
          <p className="lead">{especialidad.texto}</p>

          <ul className="espc__list">
            {especialidad.servicios.map((s, i) => (
              <motion.li
                key={s.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              >
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
