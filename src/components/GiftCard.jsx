import { useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { giftCard, waLink } from '../content.js'
import './GiftCard.css'

const pesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

const RESORTE = { stiffness: 140, damping: 18, mass: 0.6 }

export default function GiftCard() {
  const [para, setPara] = useState('')
  const [monto, setMonto] = useState(giftCard.montos[1])
  const reduce = useReducedMotion()

  // Posicion del puntero sobre la tarjeta (0 a 1). Valores de movimiento, no estado:
  // se actualizan en cada frame sin volver a renderizar React.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateY = useSpring(useTransform(px, [0, 1], [-16, 16]), RESORTE)
  const rotateX = useSpring(useTransform(py, [0, 1], [12, -12]), RESORTE)
  const brilloX = useTransform(px, [0, 1], ['0%', '100%'])
  const brilloY = useTransform(py, [0, 1], ['0%', '100%'])
  const brillo = useMotionTemplate`radial-gradient(circle at ${brilloX} ${brilloY}, rgb(255 255 255 / 0.34), transparent 55%)`

  function mover(e) {
    if (reduce) return
    const caja = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - caja.left) / caja.width)
    py.set((e.clientY - caja.top) / caja.height)
  }

  function soltar() {
    px.set(0.5)
    py.set(0.5)
  }

  const nombre = para.trim()
  const mensaje = `Hola! Quiero regalar una Gift Card de ${pesos.format(monto)}${
    nombre ? ` para ${nombre}` : ''
  }.`

  return (
    <section className="gift" id="gift-card">
      <div className="gift__inner wrap">
        <div className="gift__stage" onPointerMove={mover} onPointerLeave={soltar}>
          <motion.div className="gift__card" style={reduce ? undefined : { rotateX, rotateY }}>
            <div className="gift__card-top">
              <span className="gift__brand">
                <small>Ópticas</small>
                Schellhas
              </span>
              <span className="gift__kind">Gift Card</span>
            </div>
            <div className="gift__card-bottom">
              <span className="gift__para">
                <small>Para</small>
                <span className={nombre ? '' : 'gift__para--vacio'}>{nombre || 'Tu persona favorita'}</span>
              </span>
              <span className="gift__monto">{pesos.format(monto)}</span>
            </div>
            {!reduce && <motion.div className="gift__sheen" aria-hidden="true" style={{ background: brillo }} />}
          </motion.div>
        </div>

        <div className="gift__body">
          <p className="eyebrow gift__eyebrow">Gift Card</p>
          <h2 className="display">{giftCard.titulo}</h2>
          <p className="lead">{giftCard.texto}</p>

          <form className="gift__form" onSubmit={(e) => e.preventDefault()}>
            <div className="gift__field">
              <label htmlFor="gift-para">¿Para quién es?</label>
              <input
                id="gift-para"
                type="text"
                value={para}
                onChange={(e) => setPara(e.target.value)}
                maxLength={22}
                autoComplete="off"
                placeholder="Ej: Mamá"
              />
            </div>

            <fieldset className="gift__field">
              <legend>Monto</legend>
              <div className="gift__montos">
                {giftCard.montos.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={m === monto ? 'is-on' : ''}
                    aria-pressed={m === monto}
                    onClick={() => setMonto(m)}
                  >
                    {pesos.format(m)}
                  </button>
                ))}
              </div>
            </fieldset>

            <a className="btn btn--solid gift__cta" href={waLink(mensaje)} target="_blank" rel="noreferrer">
              <WhatsappLogo size={18} />
              Pedir Gift Card
            </a>
            <p className="gift__nota">Sin pago online. Coordinamos el pago y la entrega por WhatsApp.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
