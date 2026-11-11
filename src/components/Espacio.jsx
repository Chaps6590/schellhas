import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, MapPin } from '@phosphor-icons/react'
import { espacio, marca } from '../content.js'
import './Espacio.css'

const EASE = [0.16, 1, 0.3, 1]

// La foto se descubre como una persiana y se mueve apenas dentro de su marco.
function Foto({ imagen, clase, demora = 0 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    // El disparador es la figura (siempre visible para el observador);
    // lo que se recorta es la capa interna.
    <motion.figure
      ref={ref}
      className={`esp__fig ${clase}`}
      initial={reduce ? false : 'oculta'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="esp__clip"
        variants={{
          oculta: { clipPath: 'inset(100% 0% 0% 0%)' },
          visible: { clipPath: 'inset(0% 0% 0% 0%)' },
        }}
        transition={{ duration: 1.2, ease: EASE, delay: demora }}
      >
        <motion.img src={imagen.src} alt={imagen.alt} loading="lazy" style={reduce ? undefined : { y }} />
      </motion.div>
    </motion.figure>
  )
}

export default function Espacio() {
  const [grande, alta, chica] = espacio.imagenes

  return (
    <section className="esp wrap" id="espacio">
      <Foto imagen={grande} clase="esp__fig--a" />

      <div className="esp__text">
        <p className="eyebrow">Te esperamos en el centro</p>
        <h2 className="display">{espacio.titulo}</h2>
        <p className="lead">{espacio.texto}</p>
        <a className="esp__dir" href={marca.mapa} target="_blank" rel="noreferrer">
          <MapPin size={20} />
          <span>
            {marca.direccion}, {marca.ciudad}
          </span>
          <ArrowUpRight size={18} />
        </a>
      </div>

      <Foto imagen={alta} clase="esp__fig--b" demora={0.1} />
      <Foto imagen={chica} clase="esp__fig--c" demora={0.15} />
      <p className="esp__note">El diseño y el oficio, de cerca. Imágenes ilustrativas.</p>
    </section>
  )
}
