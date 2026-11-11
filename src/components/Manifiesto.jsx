import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { manifiesto } from '../content.js'
import './Manifiesto.css'

// "texto con *enfasis*" -> el tramo entre asteriscos va en cursiva.
function conEnfasis(texto) {
  return texto.split('*').map((parte, i) => (i % 2 ? <em key={i}>{parte}</em> : parte))
}

// Cada foto flota a una velocidad distinta: las del frente se mueven mas.
const VELOCIDADES = [140, -90, 200, -150]

function Flotante({ imagen, indice, progreso, reduce }) {
  const d = VELOCIDADES[indice % VELOCIDADES.length]
  const y = useTransform(progreso, [0, 1], [d, -d])
  return (
    <motion.figure className={`mani__fig mani__fig--${indice + 1}`} style={reduce ? undefined : { y }}>
      <img className="foto" src={imagen.src} alt={imagen.alt} loading="lazy" />
    </motion.figure>
  )
}

export default function Manifiesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section className="mani" ref={ref}>
      {manifiesto.imagenes.map((imagen, i) => (
        <Flotante key={imagen.src} imagen={imagen} indice={i} progreso={scrollYProgress} reduce={reduce} />
      ))}

      <motion.div
        className="mani__text"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="display">{conEnfasis(manifiesto.titulo)}</h2>
        <p className="lead">{manifiesto.texto}</p>
      </motion.div>
    </section>
  )
}
