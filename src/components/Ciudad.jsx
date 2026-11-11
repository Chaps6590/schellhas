import { useRef } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ciudad } from '../content.js'
import './Ciudad.css'

function Creditos() {
  return (
    <p className="ciudad__credit">
      Atardecer recreado con IA · Foto base: <a href={ciudad.fuente} target="_blank" rel="noreferrer">ANDY ABIR ALAN</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>
    </p>
  )
}

export default function Ciudad() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // La ventana se abre hasta ocupar la pantalla, como en la escena original.
  const vertical = useTransform(scrollYProgress, [0.05, 0.62], [27, 0])
  const horizontal = useTransform(scrollYProgress, [0.05, 0.62], [22, 0])
  const radius = useTransform(scrollYProgress, [0.5, 0.62], [4, 0])
  const clipPath = useMotionTemplate`inset(${vertical}% ${horizontal}% round ${radius}px)`
  const transform = useTransform(scrollYProgress, [0, 0.62], ['scale(1.12)', 'scale(1)'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const titleTransform = useTransform(scrollYProgress, [0, 0.22], ['translateY(0px)', 'translateY(-40px)'])
  const captionOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1])
  const captionTransform = useTransform(scrollYProgress, [0.62, 0.82], ['translateY(30px)', 'translateY(0px)'])

  if (reduce) {
    return (
      <section className="ciudad ciudad--static wrap" ref={ref} aria-labelledby="ciudad-titulo">
        <div className="ciudad__heading">
          <div>
            <p className="eyebrow">Nuestro lugar en el mundo</p>
            <h2 id="ciudad-titulo" className="display">{ciudad.titulo}</h2>
          </div>
          <p className="lead">{ciudad.texto}</p>
        </div>
        <img className="ciudad__img" src={ciudad.imagen} alt={ciudad.alt} loading="lazy" width="2400" height="1357" />
        <Creditos />
      </section>
    )
  }

  return (
    <section className="ciudad" ref={ref} aria-labelledby="ciudad-titulo">
      <div className="ciudad__sticky">
        <motion.h2 id="ciudad-titulo" className="ciudad__title display" style={{ opacity: titleOpacity, transform: titleTransform }}>
          {ciudad.titulo}
        </motion.h2>
        <motion.div className="ciudad__frame" style={{ clipPath }}>
          <motion.img className="ciudad__img" src={ciudad.imagen} alt={ciudad.alt} loading="lazy" width="2400" height="1357" style={{ transform }} />
          <motion.div className="ciudad__scrim" aria-hidden="true" style={{ opacity: captionOpacity }} />
        </motion.div>
        <motion.div className="ciudad__caption wrap" style={{ opacity: captionOpacity, transform: captionTransform }}>
          <p>{ciudad.texto}</p>
          <Creditos />
        </motion.div>
      </div>
    </section>
  )
}
