import { useState } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { giftCard, waLink } from '../../content.js'

const pesos = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

// Personalización de la Gift Card. Sin pago online: el pedido se coordina por WhatsApp.
export default function GiftForm() {
  const [para, setPara] = useState('')
  const [monto, setMonto] = useState(giftCard.montos[1])
  const nombre = para.trim()
  const mensaje = `Hola! Quiero regalar una Gift Card de ${pesos.format(monto)}${nombre ? ` para ${nombre}` : ''}.`

  return (
    <form className="gform" onSubmit={event => event.preventDefault()}>
      <div className="gform__preview" aria-live="polite">
        <span className="gform__para"><small>Para</small><b className={nombre ? '' : 'is-empty'}>{nombre || 'Tu persona favorita'}</b></span>
        <span className="gform__monto" key={monto}>{pesos.format(monto)}</span>
      </div>
      <label className="gform__field">
        <span>¿Para quién es?</span>
        <input type="text" value={para} maxLength={22} autoComplete="off" placeholder="Ej: Mamá" onChange={event => setPara(event.target.value)} />
      </label>
      <fieldset className="gform__montos">
        <legend>Monto</legend>
        {giftCard.montos.map(value => (
          <button key={value} type="button" aria-pressed={value === monto} onClick={() => setMonto(value)}>{pesos.format(value)}</button>
        ))}
      </fieldset>
      <a className="gform__cta" data-magnetic="0.12" href={waLink(mensaje)} target="_blank" rel="noreferrer"><WhatsappLogo size={19} />Pedir Gift Card</a>
      <p className="gform__note">Sin pago online. Coordinamos el pago y la entrega por WhatsApp.</p>
    </form>
  )
}
