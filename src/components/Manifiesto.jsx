import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { manifiesto } from '../content.js'
import './Manifiesto.css'

function conEnfasis(texto) {
  return texto.split('*').map((parte, i) => (i % 2 ? <em key={i}>{parte}</em> : parte))
}

const VELOCIDADES = [12, -9, 16, -12]

function FotoFlotante({ imagen, indice, progreso, reduce }) {
  const distancia = VELOCIDADES[indice]
  const transform = useTransform(progreso, [0, 1], [
    `translateY(${distancia}%)`, `translateY(${-distancia}%)`,
  ])

  return (
    <motion.figure
      className={`mani__fig mani__fig--${indice + 1}`}
      style={reduce ? undefined : { transform }}
    >
      <div className="mani__image">
        <img className="foto" src={imagen.src} alt={imagen.alt} loading="lazy" width="800" height="1000" />
      </div>
      <figcaption><span>0{indice + 1}</span>{imagen.epigrafe}</figcaption>
    </motion.figure>
  )
}

export default function Manifiesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section className="mani wrap" ref={ref} aria-labelledby="manifiesto-titulo">
      <motion.div
        className="mani__text"
        initial={reduce ? false : { opacity: 0, transform: 'translateY(40px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow">La mirada de Schellhas</p>
        <h2 id="manifiesto-titulo" className="display">{conEnfasis(manifiesto.titulo)}</h2>
        <p className="lead">{manifiesto.texto}</p>
      </motion.div>
      <div className="mani__gallery">
        {manifiesto.imagenes.map((imagen, i) => (
          <FotoFlotante key={imagen.src} imagen={imagen} indice={i} progreso={scrollYProgress} reduce={reduce} />
        ))}
      </div>
    </section>
  )
}
