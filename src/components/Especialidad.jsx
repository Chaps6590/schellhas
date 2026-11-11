import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight } from '@phosphor-icons/react'
import { oficio } from '../content.js'
import './Especialidad.css'

export default function Especialidad() {
  const [selected, setSelected] = useState(0)
  const buttons = useRef([])
  const reduce = useReducedMotion()
  const item = oficio[selected]

  function navigate(event, index) {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % oficio.length
    if (event.key === 'ArrowLeft') next = (index + oficio.length - 1) % oficio.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = oficio.length - 1
    if (next === undefined) return
    event.preventDefault()
    setSelected(next)
    buttons.current[next]?.focus()
  }

  return (
    <section className="espc" id="especialidad" aria-labelledby="oficio-heading">
      <div className="wrap">
        <div className="espc__heading">
          <div>
            <p className="eyebrow">El oficio, explicado de cerca</p>
            <h2 className="display" id="oficio-heading">Lo que hacemos.<br /><em>Cómo lo hacemos.</em></h2>
          </div>
          <p className="lead">Detrás de un anteojo cómodo hay decisiones, precisión y tiempo. Entrá en cada parte del proceso.</p>
        </div>

        <div className="espc__tabs" role="tablist" aria-label="Explorar nuestro trabajo">
          {oficio.map((entry, index) => (
            <button type="button" role="tab" key={entry.id} id={`tab-${entry.id}`} aria-selected={selected === index} aria-controls={`panel-${entry.id}`} tabIndex={selected === index ? 0 : -1} ref={el => { buttons.current[index] = el }} onClick={() => setSelected(index)} onKeyDown={event => navigate(event, index)}>
              <span>0{index + 1}</span>{entry.label}<ArrowDownRight size={22} />
            </button>
          ))}
        </div>

        <div className="espc__inner" role="tabpanel" id={`panel-${item.id}`} aria-labelledby={`tab-${item.id}`} tabIndex={0}>
          <figure className="espc__fig">
            <AnimatePresence initial={false}>
              <motion.img key={item.image} className="foto" src={item.image} alt={item.alt} width="1200" height="1000" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.25 }} />
            </AnimatePresence>
            <figcaption>El oficio en imágenes · Escenas ilustrativas</figcaption>
          </figure>
          <div className="espc__body">
            <p className="espc__number" aria-hidden="true">0{selected + 1}</p>
            <h3>{item.title}</h3>
            <p className="lead">{item.text}</p>
            <ul className="espc__details">
              {item.details.map(detail => <li key={detail}>{detail}</li>)}
            </ul>
            <p className="espc__note">Cada persona y cada armazón necesitan una evaluación particular. Consultanos en el local.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
