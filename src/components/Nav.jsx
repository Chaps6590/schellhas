import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { List, WhatsappLogo, X } from '@phosphor-icons/react'
import Logo from './Logo.jsx'
import { nav, waLink } from '../content.js'
import './Nav.css'

const WA = waLink('Hola! Les escribo desde la web.')

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  // Sobre la foto del hero la barra es transparente; despues toma el fondo de la pagina.
  useMotionValueEvent(scrollY, 'change', (v) => {
    setSolid(v > window.innerHeight - 90)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`nav ${solid ? 'nav--solid' : ''}`}>
        <div className="nav__inner wrap">
          <a href="#inicio" className="nav__logo">
            <Logo />
          </a>

          <nav className="nav__links" aria-label="Secciones">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="nav__cta" href={WA} target="_blank" rel="noreferrer">
            <WhatsappLogo size={18} weight="regular" />
            Escribinos
          </a>

          <button
            className="nav__toggle"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <List size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="menu__top wrap">
              <Logo />
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                <X size={26} />
              </button>
            </div>
            <nav className="menu__links wrap" aria-label="Secciones">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="menu__bottom wrap">
              <a className="btn btn--solid" href={WA} target="_blank" rel="noreferrer">
                <WhatsappLogo size={18} />
                Escribinos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
