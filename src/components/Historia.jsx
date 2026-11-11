import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { historia } from '../content.js'
import './Historia.css'

function Capitulo({ capitulo }) {
  return (
    <article className="hist__panel">
      <figure className="hist__fig">
        <img className="foto" src={capitulo.imagen} alt={capitulo.alt} loading="lazy" />
      </figure>
      <div className="hist__body">
        <p className="hist__tag">{capitulo.etiqueta}</p>
        <h3 className="hist__h">{capitulo.titulo}</h3>
        <p className="hist__p">{capitulo.texto}</p>
      </div>
    </article>
  )
}

// Linea de tiempo horizontal: el scroll vertical avanza los capitulos de costado,
// como pasar las paginas de un album.
export default function Historia() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const n = historia.capitulos.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((n - 1) / n) * 100}%`])

  if (reduce) {
    return (
      <section className="hist hist--static" id="historia">
        <h2 className="display wrap">{historia.titulo}</h2>
        {historia.capitulos.map((c) => (
          <Capitulo key={c.etiqueta} capitulo={c} />
        ))}
      </section>
    )
  }

  return (
    <section className="hist" id="historia" ref={ref} style={{ height: `${n * 100}vh` }}>
      <div className="hist__sticky">
        <h2 className="hist__title display">{historia.titulo}</h2>
        <motion.div className="hist__track" style={{ x, width: `${n * 100}vw` }}>
          {historia.capitulos.map((c) => (
            <Capitulo key={c.etiqueta} capitulo={c} />
          ))}
        </motion.div>
        <motion.div className="hist__progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />
      </div>
    </section>
  )
}
