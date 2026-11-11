import { MotionConfig } from 'motion/react'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Manifiesto from './components/Manifiesto.jsx'
import Ciudad from './components/Ciudad.jsx'
import Historia from './components/Historia.jsx'
import Espacio from './components/Espacio.jsx'
import Especialidad from './components/Especialidad.jsx'
import Marcas from './components/Marcas.jsx'
import GiftCard from './components/GiftCard.jsx'
import Contacto from './components/Contacto.jsx'

export default function App() {
  useSmoothScroll()

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Manifiesto />
        <Ciudad />
        <Historia />
        <Espacio />
        <Especialidad />
        <Marcas />
        <GiftCard />
      </main>
      <Contacto />
    </MotionConfig>
  )
}
