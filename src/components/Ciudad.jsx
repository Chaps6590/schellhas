import { useRef } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ciudad } from '../content.js'
import './Ciudad.css'

// Escena fija: una foto chica del rio se abre hasta ocupar toda la pantalla.
// Cuenta el paso de "mirar una foto" a "estar ahi".
export default function Ciudad() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const v = useTransform(scrollYProgress, [0.05, 0.62], [27, 0])
  const h = useTransform(scrollYProgress, [0.05, 0.62], [31, 0])
  const r = useTransform(scrollYProgress, [0.5, 0.62], [4, 0])
  const clipPath = useMotionTemplate`inset(${v}% ${h}% round ${r}px)`
  const scale = useTransform(scrollYProgress, [0, 0.62], [1.18, 1])
  const tituloOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const tituloY = useTransform(scrollYProgress, [0, 0.22], [0, -40])
  const textoOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1])
  const textoY = useTransform(scrollYProgress, [0.62, 0.82], [30, 0])

  if (reduce) {
    return (
      <section className="ciudad ciudad--static">
        <img className="ciudad__img" src={ciudad.imagen} alt={ciudad.alt} loading="lazy" />
        <div className="ciudad__scrim" aria-hidden="true" />
        <div className="ciudad__caption wrap">
          <h2 className="display">{ciudad.titulo}</h2>
          <p>{ciudad.texto}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="ciudad" ref={ref}>
      <div className="ciudad__sticky">
        <motion.h2 className="ciudad__title display" style={{ opacity: tituloOpacity, y: tituloY }}>
          {ciudad.titulo}
        </motion.h2>

        <motion.div className="ciudad__frame" style={{ clipPath }}>
          <motion.img
            className="ciudad__img"
            src={ciudad.imagen}
            alt={ciudad.alt}
            loading="lazy"
            style={{ scale }}
          />
          <motion.div className="ciudad__scrim" aria-hidden="true" style={{ opacity: textoOpacity }} />
        </motion.div>

        <motion.div className="ciudad__caption wrap" style={{ opacity: textoOpacity, y: textoY }}>
          <p>{ciudad.texto}</p>
        </motion.div>
      </div>
    </section>
  )
}
