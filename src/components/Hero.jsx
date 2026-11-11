import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { hero, marca } from '../content.js'
import './Hero.css'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // La foto se queda atras y el texto se va antes: da profundidad al salir del hero.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14])
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section className="hero" id="inicio" ref={ref}>
      <motion.img
        className="hero__img"
        src={hero.imagen}
        alt={hero.alt}
        fetchPriority="high"
        style={reduce ? undefined : { y, scale }}
      />
      <div className="hero__scrim" aria-hidden="true" />

      <motion.div className="hero__content wrap" style={reduce ? undefined : { opacity: fade, y: lift }}>
        <div className="hero__text">
          <h1 className="hero__title">
            <span className="hero__mask">
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
              >
                {hero.titulo}
              </motion.span>
            </span>
          </h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          >
            {hero.bajada}
          </motion.p>
          <motion.a
            className="btn btn--light"
            href="#historia"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          >
            Conocé la historia
            <ArrowRight size={18} />
          </motion.a>
        </div>

        <motion.p
          className="hero__years"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
        >
          <span>{marca.anios}</span> años
        </motion.p>
      </motion.div>
    </section>
  )
}
