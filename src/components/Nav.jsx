import { useEffect, useRef, useState } from 'react'
import { List, WhatsappLogo, X } from '@phosphor-icons/react'
import Logo from './Logo.jsx'
import { nav, waLink } from '../content.js'
import './Nav.css'

const WA = waLink('Hola! Les escribo desde la web.')

export default function Nav() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const toggleRef = useRef(null)

  function navigate(event, id) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setOpen(false)
    window.dispatchEvent(new CustomEvent('schellhas:navigate', { detail: id }))
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const focusable = () => Array.from(dialog.querySelectorAll('a[href], button'))
    focusable()[0]?.focus()
    function handleKey(event) {
      if (event.key === 'Escape') { setOpen(false); return }
      if (event.key !== 'Tab') return
      const elements = focusable()
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <>
      <header className="nav nav--solid">
        <div className="nav__inner wrap">
          <a href="#inicio" className="nav__logo" onClick={event => navigate(event, 'inicio')}>
            <Logo />
          </a>

          <nav className="nav__links" aria-label="Secciones">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={event => navigate(event, item.id)}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="nav__cta" href={WA} target="_blank" rel="noreferrer">
            <WhatsappLogo size={18} weight="regular" />
            Escribinos
          </a>

          <button
            ref={toggleRef}
            className="nav__toggle"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <List size={26} />
          </button>
        </div>
      </header>

        {open && (
          <div
            ref={dialogRef}
            data-lenis-prevent
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            <div className="menu__top wrap">
              <Logo />
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                <X size={26} />
              </button>
            </div>
            <nav className="menu__links wrap" aria-label="Secciones">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={event => navigate(event, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="menu__bottom wrap">
              <a className="btn btn--solid" href={WA} target="_blank" rel="noreferrer">
                <WhatsappLogo size={18} />
                Escribinos
              </a>
            </div>
          </div>
        )}
    </>
  )
}
