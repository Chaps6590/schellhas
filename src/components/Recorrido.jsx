import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, InstagramLogo, MapPin, Plus, WhatsappLogo, X } from '@phosphor-icons/react'
import { marca, ciudad, waLink } from '../content.js'
import { scenes } from '../scenes.js'
import './Recorrido.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_TIME = 11
const ANGLE = 60
const DESTINATIONS = scenes.map((_, index) => index * 2 + 0.4)
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const CONTACT = waLink('Hola, les escribo desde el recorrido de Schellhas. Quería hacerles una consulta.')

function SceneTitle({ scene, index }) {
  const Heading = index === 0 ? 'h1' : 'h2'
  return <Heading className={`exhibit__title ${index === 0 ? 'exhibit__title--intro' : ''}`}>
    {index === 0 ? <><span className="exhibit__135">135</span><span>años mirando<br />Paraná.</span></> : scene.title}
  </Heading>
}

function ContactLinks() {
  return <div className="exhibit__contact">
    <a className="exhibit__cta" href={CONTACT} target="_blank" rel="noreferrer"><WhatsappLogo size={19} />Hablemos<ArrowUpRight size={17} /></a>
    <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={17} />Cómo llegar</a>
    <a className="exhibit__instagram" href={marca.instagram} target="_blank" rel="noreferrer" aria-label="Schellhas en Instagram"><InstagramLogo size={21} /></a>
  </div>
}

function Room({ scene, index }) {
  return (
    <div className={`exhibit__set exhibit__set--${scene.room}`} data-set={index} aria-hidden="true">
      <div className="exhibit__architecture">
        <img className="exhibit__backdrop" src={scene.image} alt="" width="2200" height="1244" loading={index < 2 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
        {scene.secondaryImage && <img className="exhibit__portrait-companion" src={scene.secondaryImage} width="1000" height="1334" alt="" loading="lazy" />}
        <div className="exhibit__room-shade" />
      </div>
      <div className="exhibit__light" style={{ '--room-light': scene.light }}><span /><span /></div>
    </div>
  )
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
        {index === 3 && <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={18} />{marca.direccion}, Paraná</a>}
        {index === 5 && <ContactLinks />}
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
  const [active, setActive] = useState(0)
  const [manualReading, setManualReading] = useState(false)
  const [detail, setDetail] = useState(null)
  const [topic, setTopic] = useState(0)
  const reduce = useReducedMotion()
  const reading = manualReading || Boolean(reduce)
  const scene = scenes[active]

  const goTo = useCallback(index => {
    const safe = clamp(index, 0, scenes.length - 1)
    if (reading) document.getElementById(scenes[safe].id)?.scrollIntoView({ behavior: 'instant' })
    else gotoRef.current?.(safe)
  }, [reading])

  useEffect(() => {
    function navigate(event) {
      const aliases = { miradas: 'colecciones', oficio: 'atencion', especialidad: 'atencion' }
      const id = aliases[event.detail] || event.detail
      const index = scenes.findIndex(item => item.id === id)
      if (index >= 0) goTo(index)
    }
    window.addEventListener('schellhas:navigate', navigate)
    return () => window.removeEventListener('schellhas:navigate', navigate)
  }, [goTo])

  useEffect(() => { setDetail(null); setTopic(0) }, [active])

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
    let radius = 0
    const context = gsap.context(() => {
      const rotor = root.querySelector('.exhibit__rotor')
      const dolly = root.querySelector('.exhibit__dolly')
      const look = root.querySelector('.exhibit__look')
      const rooms = gsap.utils.toArray('.exhibit__set', root)
      const copies = gsap.utils.toArray('.exhibit__copy', root)
      const progress = root.querySelector('.exhibit__progress-fill')
      const setProgress = gsap.quickSetter(progress, 'scaleX')
      const copyOpacity = copies.map(copy => gsap.quickSetter(copy, 'opacity'))
      const copyVisibility = copies.map(copy => gsap.quickSetter(copy, 'visibility'))
      const copyX = copies.map(copy => gsap.quickSetter(copy, 'x', 'px'))
      const yaw = gsap.quickTo(look, 'rotationY', { duration: 0.8, ease: 'power2.out' })
      const pitch = gsap.quickTo(look, 'rotationX', { duration: 0.8, ease: 'power2.out' })
      pointerRef.current = { yaw, pitch }

      function layout() {
        radius = viewport.clientWidth / (2 * Math.tan(Math.PI / 6))
        gsap.set(rotor, { transformOrigin: `50% 50% ${-radius}px` })
        rooms.forEach((room, index) => gsap.set(room, { rotationY: index * ANGLE, transformOrigin: `50% 50% ${-radius}px` }))
        const anchoredCopy = window.matchMedia('(max-width: 767px), (max-height: 500px)').matches
        gsap.set(copies, { y: 0, yPercent: anchoredCopy ? 0 : -50 })
      }
      layout()

      const keeper = { value: 0 }
      const master = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate() {
          const rotation = Number(gsap.getProperty(rotor, 'rotationY'))
          const next = clamp(Math.round(-rotation / ANGLE), 0, 5)
          copies.forEach((_, index) => {
            const distance = Math.abs(rotation + index * ANGLE)
            const opacity = clamp((24 - distance) / 16, 0, 1)
            copyOpacity[index](opacity)
            copyVisibility[index](opacity > 0.001 ? 'visible' : 'hidden')
            copyX[index](clamp(rotation + index * ANGLE, -40, 40) * 0.8)
          })
          setProgress(this.time() / TOTAL_TIME)
          if (next !== activeRef.current) { activeRef.current = next; setActive(next) }
        },
        scrollTrigger: {
          id: 'schellhas-exhibit', trigger: root, pin: viewport,
          start: 'top top', end: () => `+=${viewport.offsetHeight * 7.5}`,
          scrub: 0.85, anticipatePin: 1, invalidateOnRefresh: true,
          onRefreshInit: layout,
        },
      })
      master.to(keeper, { value: TOTAL_TIME, duration: TOTAL_TIME }, 0)
      for (let index = 1; index < scenes.length; index++) {
        const start = (index - 1) * 2 + 1
        master.to(rotor, { rotationY: -index * ANGLE, duration: 1, ease: 'power2.inOut' }, start)
        master.to(dolly, { z: () => Math.min(120, viewport.clientWidth * 0.07), duration: 0.5, ease: 'power2.in' }, start)
        master.to(dolly, { z: 0, duration: 0.5, ease: 'power2.out' }, start + 0.5)
      }
      rooms.forEach((room, index) => {
        const portrait = index === 0 || index === 2
        master.fromTo(room.querySelector('.exhibit__backdrop'), { scale: portrait ? 1 : 1.03 }, { scale: portrait ? 1.035 : 1.09, duration: 1, immediateRender: false }, index * 2)
        if (index < scenes.length - 1) master.to(rotor, { rotationY: -(index * ANGLE + 3), duration: 1 }, index * 2)
      })
      copies.forEach((_, index) => {
        copyOpacity[index](index === 0 ? 1 : 0)
        copyVisibility[index](index === 0 ? 'visible' : 'hidden')
      })
      masterRef.current = master
      gotoRef.current = index => {
        const trigger = master.scrollTrigger
        const targetTime = DESTINATIONS[index]
        window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * targetTime / TOTAL_TIME, behavior: 'instant' })
        ScrollTrigger.update()
        trigger.getTween()?.progress(1)
        master.time(targetTime)
        window.history.replaceState(null, '', `#${scenes[index].id}`)
      }

      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const index = scenes.findIndex(item => `#${item.id}` === window.location.hash)
        if (index > 0) gotoRef.current(index)
      })
    }, root)

    return () => {
      cancelAnimationFrame(frame)
      context.revert()
      pointerRef.current = null
      masterRef.current = null
      gotoRef.current = null
    }
  }, [reading])

  function move(event) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || !pointerRef.current) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerRef.current.yaw(((event.clientX - rect.left) / rect.width - 0.5) * 2.2)
    pointerRef.current.pitch(((event.clientY - rect.top) / rect.height - 0.5) * -1.2)
  }

  function closeDetail() { setDetail(null); hotspotRef.current?.focus({ preventScroll: true }) }
  function toggleReading() {
    setDetail(null)
    setManualReading(value => !value)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <section className={`exhibit ${reading ? 'exhibit--reading' : ''}`} ref={rootRef} aria-label="El mundo de Schellhas">
      <div className="exhibit__viewport" ref={viewportRef} data-active={active} onPointerMove={move} onPointerLeave={() => { pointerRef.current?.yaw(0); pointerRef.current?.pitch(0) }}>
        <div className="exhibit__look"><div className="exhibit__dolly"><div className="exhibit__rotor">
          {scenes.map((item, index) => <Room scene={item} index={index} key={item.id} />)}
        </div></div></div>
        <div className="exhibit__vignette" aria-hidden="true" />
        <div className="exhibit__copies">
          {scenes.map((item, index) => <article className={`exhibit__copy exhibit__copy--${item.room}`} key={item.id} id={reading ? undefined : item.id} aria-hidden={active !== index} inert={active !== index}>
            <p className="exhibit__intro">{item.intro}</p>
            <SceneTitle scene={item} index={index} />
            <p className="exhibit__description">{item.description}</p>
            {index === 0 && <button className="exhibit__enter" type="button" onClick={() => goTo(1)}>Entrar al recorrido<ArrowRight size={20} /></button>}
            {index === 3 && <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={18} />{marca.direccion}, Paraná<ArrowUpRight size={15} /></a>}
            {index === 5 && <><ContactLinks /><p className="exhibit__phone">{marca.telefonos.join(' / ')}</p></>}
          </article>)}
        </div>

        <div className="exhibit__set-label" aria-live="polite"><span>0{active + 1}</span><span>{scene.label}</span></div>
        <button ref={hotspotRef} className="exhibit__hotspot" type="button" aria-expanded={detail === 'scene'} aria-controls="exhibit-detail" onClick={() => { setTopic(0); setDetail(detail === 'scene' ? null : 'scene') }}><span className="exhibit__hotspot-plus"><Plus size={20} /></span><span>{scene.hotspot}</span></button>

        {detail && <aside className="exhibit__detail" id="exhibit-detail" aria-label={detail === 'credits' ? 'Sobre las imágenes' : scene.hotspot} data-lenis-prevent>
          <button ref={closeRef} className="exhibit__detail-close" type="button" onClick={closeDetail} aria-label="Cerrar información"><X size={22} /></button>
          {detail === 'credits' ? <><p className="exhibit__detail-kicker">Sobre las imágenes</p><h2>Una puesta en escena.</h2><p>Los ambientes, modelos y escenas de atención son ilustrativos. No representan al equipo, pacientes o instalaciones reales de Schellhas.</p><p>La vista de Paraná parte de una fotografía de <a href={ciudad.fuente} target="_blank" rel="noreferrer">ANDY ABIR ALAN</a>, con atardecer recreado, bajo licencia <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>.</p></> : <>
            <p className="exhibit__detail-kicker">{scene.label}</p>
            {scene.details.length > 1 && <div className="exhibit__topics" aria-label="Temas">{scene.details.map((item, index) => <button key={item.title} type="button" aria-pressed={topic === index} onClick={() => setTopic(index)}>{item.title}</button>)}</div>}
            <h2>{scene.details[topic]?.title}</h2><p>{scene.details[topic]?.text}</p>
            {active === 3 && <a className="exhibit__map" href={marca.mapa} target="_blank" rel="noreferrer"><MapPin size={18} />Cómo llegar<ArrowUpRight size={17} /></a>}
            {active === 5 && <ContactLinks />}
          </>}
        </aside>}

        <div className="exhibit__controls">
          <div className="exhibit__hint"><ArrowDown size={16} /><span>Scroll para cambiar de escenario</span></div>
          <nav className="exhibit__steps" aria-label="Escenarios">
            {scenes.map((item, index) => <button type="button" key={item.id} aria-label={`Ir a ${item.label}`} aria-current={active === index ? 'step' : undefined} onClick={() => goTo(index)}><span>0{index + 1}</span><span className="exhibit__step-label">{item.label}</span></button>)}
          </nav>
          <div className="exhibit__arrows"><button type="button" aria-label="Escenario anterior" disabled={active === 0} onClick={() => goTo(active - 1)}><ArrowLeft size={20} /></button><button type="button" aria-label="Escenario siguiente" disabled={active === 5} onClick={() => goTo(active + 1)}><ArrowRight size={20} /></button></div>
        </div>
        <div className="exhibit__utility"><button type="button" onClick={toggleReading}><BookOpen size={14} />Lectura</button><button type="button" onClick={() => setDetail(detail === 'credits' ? null : 'credits')}>Sobre las imágenes</button><span>{scene.note || 'Schellhas · Otra forma de ver'}</span></div>
        <div className="exhibit__progress" aria-hidden="true"><div className="exhibit__progress-fill" /></div>
      </div>
      {reading && <ReadingVersion onExit={toggleReading} allowExit={!reduce} />}
    </section>
  )
}
