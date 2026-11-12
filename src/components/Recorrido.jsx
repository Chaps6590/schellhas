import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, InstagramLogo, MapPin, Plus, WhatsappLogo, X } from '@phosphor-icons/react'
import { marca, ciudad, waLink } from '../content.js'
import { scenes } from '../scenes.js'
import SceneSet from './recorrido/Sets.jsx'
import GiftForm from './recorrido/GiftForm.jsx'
import { addChoreography } from './recorrido/choreography.js'
import './Recorrido.css'
import './Sets.css'
import './Recorrido.motion.css'

gsap.registerPlugin(ScrollTrigger)

const LAST = scenes.length - 1
const TOTAL_TIME = LAST * 2 + 1
const SCROLL_PER_UNIT = 0.68 // alto de pantalla de scroll por unidad de tiempo del timeline
const ANGLE = 60 // posición de cada escena en la "línea de cámara" (cam.r = -índice × ANGLE)
const DESTINATIONS = scenes.map((_, index) => index * 2 + 0.4)
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const CONTACT = waLink('Hola, les escribo desde el recorrido de Schellhas. Quería hacerles una consulta.')
const GIFT = waLink('Hola! Quiero consultar por una Gift Card.')
const idx = id => scenes.findIndex(item => item.id === id)
const SPACE = idx('espacio')
const CONTACTO = idx('contacto')
const REGALOS = idx('regalos')

// El hilo: un trazo que cruza la pantalla en cada tramo del camino.
// Cada tramo usa una curva distinta; la estela (L) es la fracción visible del trazo.
const WAY_PATHS = [
  'M -120 610 C 220 520 380 720 760 610 S 1240 470 1720 560',
  'M -120 330 C 260 440 480 240 860 340 S 1300 520 1720 400',
]
const WAY_TAIL = 0.34
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

function SceneTitle({ scene, index }) {
  const Heading = index === 0 ? 'h1' : 'h2'
  return <Heading className={`exhibit__title ${index === 0 ? 'exhibit__title--intro' : ''}`}>
    {index === 0 ? <><span className="exhibit__135">135</span><span>años mirando<br />Paraná.</span></> : scene.title}
  </Heading>
}

function ContactLinks() {
  return <div className="exhibit__contact">
    <a className="exhibit__cta" data-magnetic="0.18" href={CONTACT} target="_blank" rel="noreferrer"><WhatsappLogo size={19} />Hablemos<ArrowUpRight size={17} /></a>
    <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={17} />Cómo llegar</a>
    <a className="exhibit__instagram" href={marca.instagram} target="_blank" rel="noreferrer" aria-label="Schellhas en Instagram"><InstagramLogo size={21} /></a>
  </div>
}

function ReadingVersion({ onExit, allowExit }) {
  return <div className="exhibit-reading">
    <div className="exhibit-reading__intro wrap"><p>El mundo de Schellhas</p>{allowExit && <button type="button" onClick={onExit}>Volver al recorrido<ArrowUpRight size={17} /></button>}</div>
    {scenes.map((scene, index) => <article className={`exhibit-reading__scene exhibit-reading__scene--${scene.room}`} id={scene.id} key={scene.id}>
      <img src={scene.image} alt={scene.alt} width="2200" height="1244" loading={index ? 'lazy' : 'eager'} />
      <div className="exhibit-reading__content wrap">
        <p className="exhibit__intro">{scene.intro}</p>
        <SceneTitle scene={scene} index={index} />
        <p className="exhibit__description">{scene.description}</p>
        <div className="exhibit-reading__details">{scene.details.map(detail => <section key={detail.title}><h3>{detail.title}</h3><p>{detail.text}</p></section>)}</div>
        {index === SPACE && <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={18} />{marca.direccion}, Paraná</a>}
        {index === REGALOS && <a className="exhibit__cta" href={GIFT} target="_blank" rel="noreferrer"><WhatsappLogo size={19} />Consultar por la Gift Card<ArrowUpRight size={17} /></a>}
        {index === CONTACTO && <ContactLinks />}
        {scene.note && <small>{scene.note}</small>}
      </div>
    </article>)}
    <p className="exhibit-reading__credits wrap">Los ambientes y personajes son escenografías ilustrativas. La vista de Paraná se basa en una fotografía de <a href={ciudad.fuente} target="_blank" rel="noreferrer">ANDY ABIR ALAN</a>, con atardecer recreado, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>.</p>
  </div>
}

export default function Recorrido() {
  const rootRef = useRef(null)
  const viewportRef = useRef(null)
  const masterRef = useRef(null)
  const gotoRef = useRef(null)
  const activeRef = useRef(0)
  const closeRef = useRef(null)
  const hotspotRef = useRef(null)
  const pointerRef = useRef(null)
  const stepsRef = useRef(null)
  const spotRef = useRef(null)
  const travelRef = useRef(null)
  const targetRef = useRef(null)
  const [active, setActive] = useState(0)
  const [manualReading, setManualReading] = useState(false)
  const [detail, setDetail] = useState(null)
  const [topic, setTopic] = useState(0)
  const reduce = useReducedMotion()
  const reading = manualReading || Boolean(reduce)
  const scene = scenes[active]

  const goTo = useCallback(index => {
    const safe = clamp(index, 0, LAST)
    if (reading) document.getElementById(scenes[safe].id)?.scrollIntoView({ behavior: 'instant' })
    else gotoRef.current?.(safe)
  }, [reading])

  useEffect(() => {
    function navigate(event) {
      const aliases = { miradas: 'colecciones', oficio: 'atencion', especialidad: 'atencion', 'gift-card': 'regalos' }
      const id = aliases[event.detail] || event.detail
      const index = scenes.findIndex(item => item.id === id)
      if (index >= 0) goTo(index)
    }
    window.addEventListener('schellhas:navigate', navigate)
    return () => window.removeEventListener('schellhas:navigate', navigate)
  }, [goTo])

  useEffect(() => { setDetail(null); setTopic(0) }, [active])

  // Le avisa a la barra de navegación en qué parada del camino está la persona.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('schellhas:scene', { detail: scenes[active].id }))
  }, [active])

  // Flechas del teclado: avanzar o volver una parada. Si ya hay un viaje en curso, suma sobre el destino.
  useEffect(() => {
    if (reading) return
    function onKey(event) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      const field = event.target
      if (field instanceof HTMLElement && (field.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(field.tagName))) return
      if (document.querySelector('.menu')) return
      event.preventDefault()
      const base = targetRef.current ?? activeRef.current
      goTo(base + (event.key === 'ArrowRight' ? 1 : -1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, reading])

  // Efecto "imán" suave en los botones principales (solo con mouse).
  useEffect(() => {
    if (reading || !window.matchMedia(FINE_POINTER).matches) return
    const cleanups = Array.from(rootRef.current.querySelectorAll('[data-magnetic]')).map(element => {
      const strength = Number(element.dataset.magnetic) || 0.3
      const x = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' })
      const y = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' })
      const onMove = event => {
        const rect = element.getBoundingClientRect()
        x((event.clientX - rect.left - rect.width / 2) * strength)
        y((event.clientY - rect.top - rect.height / 2) * strength)
      }
      const onLeave = () => { x(0); y(0) }
      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerleave', onLeave)
      return () => {
        element.removeEventListener('pointermove', onMove)
        element.removeEventListener('pointerleave', onLeave)
        gsap.set(element, { clearProps: 'x,y' })
      }
    })
    return () => cleanups.forEach(clean => clean())
  }, [reading])

  useEffect(() => {
    if (!detail) return
    closeRef.current?.focus({ preventScroll: true })
    function escape(event) {
      if (event.key === 'Escape') { setDetail(null); hotspotRef.current?.focus({ preventScroll: true }) }
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [detail])

  useLayoutEffect(() => {
    if (reading) return
    const root = rootRef.current
    const viewport = viewportRef.current
    let frame
    const context = gsap.context(() => {
      const look = root.querySelector('.exhibit__look')
      const sets = gsap.utils.toArray('.exhibit__set', root)
      const copies = gsap.utils.toArray('.exhibit__copy', root)
      const progress = root.querySelector('.exhibit__progress-fill')
      const setProgress = gsap.quickSetter(progress, 'scaleX')
      const copyOpacity = copies.map(copy => gsap.quickSetter(copy, 'opacity'))
      const copyVisibility = copies.map(copy => gsap.quickSetter(copy, 'visibility'))
      const copyX = copies.map(copy => gsap.quickSetter(copy, 'x', 'px'))
      // El escenario se desplaza apenas con el cursor para dar profundidad.
      gsap.set(look, { scale: 1.025 })
      const lookX = gsap.quickTo(look, 'x', { duration: 0.9, ease: 'power3.out' })
      const lookY = gsap.quickTo(look, 'y', { duration: 0.9, ease: 'power3.out' })
      const spot = spotRef.current
      const spotX = gsap.quickTo(spot, 'x', { duration: 0.9, ease: 'power3.out' })
      const spotY = gsap.quickTo(spot, 'y', { duration: 0.9, ease: 'power3.out' })
      gsap.set(spot, { xPercent: -50, yPercent: -50 })
      pointerRef.current = { lookX, lookY, spotX, spotY }

      // El hilo del camino: trazo + punta luminosa que cruzan la pantalla en cada tramo.
      const wayLines = gsap.utils.toArray('.exhibit__way', root)
      const wayHead = root.querySelector('.exhibit__way-head')
      const wayCore = WAY_PATHS.map((_, lane) => wayLines.find(line => Number(line.dataset.lane) === lane && line.dataset.core))
      const wayLength = wayCore.map(line => line.getTotalLength())
      function drawWay(lane, t) {
        const head = t * (1 + WAY_TAIL)
        const strength = t <= 0 || t >= 1 ? 0 : Math.sin(Math.PI * t) ** 0.6
        wayLines.forEach(line => {
          const mine = Number(line.dataset.lane) === lane
          line.style.opacity = mine ? strength : 0
          if (mine) line.style.strokeDashoffset = WAY_TAIL - head
        })
        const point = wayCore[lane].getPointAtLength(clamp(head, 0, 1) * wayLength[lane])
        wayHead.setAttribute('transform', `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`)
        wayHead.style.opacity = strength
      }

      // Entrada de la primera escena: el 135 cuenta desde cero y el texto sube escalonado.
      const first = copies[0]
      const counter = first.querySelector('.exhibit__135')
      const intro = { p: 0, n: 0 }
      first.style.setProperty('--p', '0')
      if (counter) counter.textContent = '0'
      const introTween = gsap.to(intro, {
        p: 1, n: 135, duration: 2, delay: 0.25, ease: 'power3.out',
        onUpdate() {
          first.style.setProperty('--p', intro.p.toFixed(3))
          if (counter) counter.textContent = String(Math.round(intro.n))
        },
      })

      function layout() {
        const anchoredCopy = window.matchMedia('(max-width: 767px), (max-height: 500px)').matches
        gsap.set(copies, { y: 0, yPercent: anchoredCopy ? 0 : -50 })
      }
      layout()

      const cam = { r: 0 } // posición de la cámara a lo largo del camino
      const keeper = { value: 0 }
      const master = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate() {
          const rotation = cam.r
          const next = clamp(Math.round(-rotation / ANGLE), 0, LAST)
          const position = -rotation / ANGLE
          if (this.time() > 0.05 && introTween.isActive()) introTween.kill()
          // Solo se muestran la escena actual y la que está entrando o saliendo.
          sets.forEach((set, index) => {
            const visible = Math.abs(position - index) < 1 ? 'visible' : 'hidden'
            if (set.dataset.v !== visible) { set.style.visibility = visible; set.dataset.v = visible }
          })
          copies.forEach((copy, index) => {
            const offset = rotation + index * ANGLE
            const distance = Math.abs(offset)
            const opacity = clamp((24 - distance) / 16, 0, 1)
            copyOpacity[index](opacity)
            copyVisibility[index](opacity > 0.001 ? 'visible' : 'hidden')
            copyX[index](clamp(offset, -40, 40) * 0.8)
            // --p: cuánto "entró" el texto; --dir: de qué lado llega o hacia dónde se va.
            if (distance < 30 && !(index === 0 && introTween.isActive())) {
              copy.style.setProperty('--p', clamp((22 - distance) / 14, 0, 1).toFixed(3))
              copy.style.setProperty('--dir', offset >= 0 ? '1' : '-1')
            }
          })
          setProgress(this.time() / TOTAL_TIME)
          stepsRef.current?.style.setProperty('--trail', (clamp(position, 0, LAST) / LAST).toFixed(4))
          if (next !== activeRef.current) { activeRef.current = next; setActive(next) }
        },
        scrollTrigger: {
          id: 'schellhas-exhibit', trigger: root, pin: viewport,
          start: 'top top', end: () => `+=${viewport.offsetHeight * TOTAL_TIME * SCROLL_PER_UNIT}`,
          scrub: 0.85, anticipatePin: 1, invalidateOnRefresh: true,
          onRefreshInit: layout,
        },
      })
      master.to(keeper, { value: TOTAL_TIME, duration: TOTAL_TIME }, 0)
      for (let index = 1; index < scenes.length; index++) {
        const start = (index - 1) * 2 + 1
        master.to(cam, { r: -index * ANGLE, duration: 1, ease: 'power2.inOut' }, start)
        const lane = (index - 1) % WAY_PATHS.length
        const sweep = { t: 0 }
        master.fromTo(sweep, { t: 0 }, { t: 1, duration: 1, ease: 'power2.inOut', immediateRender: false, onUpdate: () => drawWay(lane, sweep.t) }, start)
      }
      // Cada escena entra con su propia transición y se mueve en reposo.
      addChoreography(gsap, master, sets, viewport)
      copies.forEach((_, index) => {
        copyOpacity[index](index === 0 ? 1 : 0)
        copyVisibility[index](index === 0 ? 'visible' : 'hidden')
      })
      masterRef.current = master

      // Viajar a una parada: por defecto se recorre el camino con el scroll animado (se ve la transición y el hilo).
      gotoRef.current = (index, { instant = false } = {}) => {
        const trigger = master.scrollTrigger
        const targetTime = DESTINATIONS[index]
        const top = trigger.start + (trigger.end - trigger.start) * targetTime / TOTAL_TIME
        travelRef.current?.kill()
        window.history.replaceState(null, '', `#${scenes[index].id}`)
        if (instant) {
          targetRef.current = null
          window.scrollTo({ top, behavior: 'instant' })
          ScrollTrigger.update()
          trigger.getTween()?.progress(1)
          master.time(targetTime)
          return
        }
        const cursor = { y: window.scrollY }
        targetRef.current = index
        travelRef.current = gsap.to(cursor, {
          y: top,
          duration: Math.min(3.2, 0.8 + Math.abs(top - cursor.y) / viewport.clientHeight * 0.45),
          ease: 'power3.inOut',
          onUpdate: () => { window.scrollTo(0, cursor.y); ScrollTrigger.update() },
          onComplete: () => { targetRef.current = null },
        })
      }
      // Si la persona toma el control (rueda, dedo), se cancela el viaje automático.
      const cancelTravel = () => { travelRef.current?.kill(); targetRef.current = null }
      window.addEventListener('wheel', cancelTravel, { passive: true })
      window.addEventListener('touchstart', cancelTravel, { passive: true })

      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const index = scenes.findIndex(item => `#${item.id}` === window.location.hash)
        if (index > 0) { introTween.kill(); gotoRef.current(index, { instant: true }) }
      })

      return () => {
        window.removeEventListener('wheel', cancelTravel)
        window.removeEventListener('touchstart', cancelTravel)
        travelRef.current?.kill()
        if (counter) counter.textContent = '135'
      }
    }, root)

    return () => {
      cancelAnimationFrame(frame)
      context.revert()
      pointerRef.current = null
      masterRef.current = null
      gotoRef.current = null
      targetRef.current = null
    }
  }, [reading])

  function move(event) {
    if (!window.matchMedia(FINE_POINTER).matches || !pointerRef.current) return
    const rect = event.currentTarget.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width - 0.5
    const ny = (event.clientY - rect.top) / rect.height - 0.5
    pointerRef.current.lookX(-nx * 26)
    pointerRef.current.lookY(-ny * 16)
    pointerRef.current.spotX(event.clientX - rect.left)
    pointerRef.current.spotY(event.clientY - rect.top)
    spotRef.current?.classList.add('is-live')
  }
  function leave() {
    pointerRef.current?.lookX(0)
    pointerRef.current?.lookY(0)
    spotRef.current?.classList.remove('is-live')
  }

  function closeDetail() { setDetail(null); hotspotRef.current?.focus({ preventScroll: true }) }
  function toggleReading() {
    setDetail(null)
    setManualReading(value => !value)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <section className={`exhibit ${reading ? 'exhibit--reading' : ''}`} ref={rootRef} aria-label="El mundo de Schellhas">
      <div className="exhibit__viewport" ref={viewportRef} data-active={active} onPointerMove={move} onPointerLeave={leave}>
        <div className="exhibit__look">
          {scenes.map((item, index) => <SceneSet scene={item} index={index} active={active === index} key={item.id} />)}
        </div>
        <div className="exhibit__vignette" aria-hidden="true" />
        <div className="exhibit__spot" ref={spotRef} aria-hidden="true" />
        <svg className="exhibit__wayline" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          {WAY_PATHS.map((d, lane) => <g key={lane}>
            <path className="exhibit__way exhibit__way--glow" data-lane={lane} d={d} pathLength="1" />
            <path className="exhibit__way exhibit__way--core" data-lane={lane} data-core="true" d={d} pathLength="1" />
          </g>)}
          <g className="exhibit__way-head"><circle r="16" /><circle r="4.5" /></g>
        </svg>
        <div className="exhibit__copies">
          {scenes.map((item, index) => <article className={`exhibit__copy exhibit__copy--${item.room}`} key={item.id} id={reading ? undefined : item.id} aria-hidden={active !== index} inert={active !== index}>
            <p className="exhibit__intro">{item.intro}</p>
            <SceneTitle scene={item} index={index} />
            <p className="exhibit__description">{item.description}</p>
            {index === 0 && <button className="exhibit__enter" data-magnetic="0.2" type="button" onClick={() => goTo(1)}>Entrar al recorrido<ArrowRight size={20} /></button>}
            {index === SPACE && <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={18} />{marca.direccion}, Paraná<ArrowUpRight size={15} /></a>}
            {index === REGALOS && <GiftForm />}
            {index === CONTACTO && <><ContactLinks /><p className="exhibit__phone">{marca.telefonos.join(' / ')}</p></>}
          </article>)}
        </div>

        <div className="exhibit__set-label" aria-live="polite"><span key={`n${active}`}>0{active + 1}</span><span key={`l${active}`}>{scene.label}</span></div>
        {scene.hotspot && <button ref={hotspotRef} data-magnetic="0.25" className="exhibit__hotspot" type="button" aria-expanded={detail === 'scene'} aria-controls="exhibit-detail" onClick={() => { setTopic(0); setDetail(detail === 'scene' ? null : 'scene') }}><span className="exhibit__hotspot-plus"><Plus size={20} /></span><span>{scene.hotspot}</span></button>}

        {detail && <aside className="exhibit__detail" id="exhibit-detail" aria-label={detail === 'credits' ? 'Sobre las imágenes' : scene.hotspot} data-lenis-prevent>
          <button ref={closeRef} className="exhibit__detail-close" type="button" onClick={closeDetail} aria-label="Cerrar información"><X size={22} /></button>
          {detail === 'credits' ? <><p className="exhibit__detail-kicker">Sobre las imágenes</p><h2>Una puesta en escena.</h2><p>Los ambientes, modelos y escenas de atención son ilustrativos. No representan al equipo, pacientes o instalaciones reales de Schellhas.</p><p>La vista de Paraná parte de una fotografía de <a href={ciudad.fuente} target="_blank" rel="noreferrer">ANDY ABIR ALAN</a>, con atardecer recreado, bajo licencia <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>.</p></> : <>
            <p className="exhibit__detail-kicker">{scene.label}</p>
            {scene.details.length > 1 && <div className="exhibit__topics" aria-label="Temas">{scene.details.map((item, index) => <button key={item.title} type="button" aria-pressed={topic === index} onClick={() => setTopic(index)}>{item.title}</button>)}</div>}
            <h2>{scene.details[topic]?.title}</h2><p>{scene.details[topic]?.text}</p>
            {active === SPACE && <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={18} />Cómo llegar<ArrowUpRight size={17} /></a>}
            {active === CONTACTO && <ContactLinks />}
          </>}
        </aside>}

        <div className="exhibit__controls">
          <div className="exhibit__hint"><ArrowDown size={16} /><span>Scrolleá para seguir el camino</span></div>
          <nav className="exhibit__steps" ref={stepsRef} aria-label="Escenarios">
            <span className="exhibit__trail" aria-hidden="true"><span className="exhibit__trail-fill" /><span className="exhibit__trail-marker" /></span>
            {scenes.map((item, index) => <button type="button" key={item.id} aria-label={`Ir a ${item.label}`} aria-current={active === index ? 'step' : undefined} data-passed={index < active ? '' : undefined} onClick={() => goTo(index)}><span className="exhibit__stop" aria-hidden="true" /><span className="exhibit__step-num">0{index + 1}</span><span className="exhibit__step-label">{item.label}</span></button>)}
          </nav>
          <div className="exhibit__arrows"><button type="button" data-magnetic="0.35" aria-label="Escenario anterior" disabled={active === 0} onClick={() => goTo(active - 1)}><ArrowLeft size={20} /></button><button type="button" data-magnetic="0.35" aria-label="Escenario siguiente" disabled={active === LAST} onClick={() => goTo(active + 1)}><ArrowRight size={20} /></button></div>
        </div>
        <div className="exhibit__utility"><button type="button" onClick={toggleReading}><BookOpen size={14} />Lectura</button><button type="button" onClick={() => setDetail(detail === 'credits' ? null : 'credits')}>Sobre las imágenes</button><span>{scene.note || 'Schellhas · Otra forma de ver'}</span></div>
        <div className="exhibit__progress" aria-hidden="true"><div className="exhibit__progress-fill" /></div>
      </div>
      {reading && <ReadingVersion onExit={toggleReading} allowExit={!reduce} />}
    </section>
  )
}
