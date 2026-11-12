// Coreografía del recorrido. Cada escena entra con su propia transición y tiene un movimiento de reposo.
// Tiempo del timeline: la escena i llega entre 2i-1 y 2i, descansa entre 2i y 2i+1.
const layer = (set, name) => set.querySelector(`[data-layer="${name}"]`)
const box = element => ({ left: element.offsetLeft, top: element.offsetTop, width: element.offsetWidth, height: element.offsetHeight })

export function addChoreography(gsap, master, sets, viewport) {
  const room = name => sets.find(set => set.classList.contains(`exhibit__set--${name}`))
  const hall = room('hall')
  const archive = room('archive')
  const fashion = room('fashion')
  const space = room('space')
  const care = room('care')
  const gift = room('gift')
  const river = room('river')
  const vw = () => viewport.clientWidth
  const vh = () => viewport.clientHeight
  const px = value => `${Math.round(value)}px`
  const img = (set, name) => layer(set, name).querySelector('img')

  // Fondos que entran con fundido (las escenas con paneles dejan ver la anterior mientras llegan).
  master.fromTo(layer(fashion, 'bg'), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none' }, 3)

  // ── Reposo: cada escena se mueve un poco mientras la mirás ──
  master.fromTo(img(hall, 'photo'), { scale: 1.02, transformOrigin: '50% 0%' }, { scale: 1.06, duration: 1, ease: 'none', immediateRender: false }, 0)

  master.to(layer(archive, 'a'), { y: -16, duration: 1, ease: 'none' }, 2)
  master.to(layer(archive, 'b'), { y: -44, duration: 1, ease: 'none' }, 2)
  master.to(layer(archive, 'c'), { y: 34, duration: 1, ease: 'none' }, 2)

  master.to(layer(fashion, 'p1'), { y: -30, duration: 1, ease: 'none' }, 4)
  master.to(layer(fashion, 'p2'), { y: 28, duration: 1, ease: 'none' }, 4)
  master.to(layer(fashion, 'p3'), { y: -30, duration: 1, ease: 'none' }, 4)

  master.fromTo(img(space, 'photo'), { scale: 1.03 }, { scale: 1.1, duration: 1, ease: 'none', immediateRender: false }, 6)

  master.fromTo(img(care, 'a'), { scale: 1.02 }, { scale: 1.08, duration: 1, ease: 'none', immediateRender: false }, 8)
  master.fromTo(img(care, 'lens'), { scale: 1 }, { scale: 1.2, duration: 1, ease: 'none', immediateRender: false }, 8)

  master.fromTo(img(gift, 'bgimg'), { scale: 1.04 }, { scale: 1.11, duration: 1, ease: 'none', immediateRender: false }, 10)

  // ── 01 → 02 · Telón horizontal: la historia entra desde la derecha como una cortina ──
  master.fromTo(archive, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' }, 1)
  master.to(layer(hall, 'photo'), { xPercent: -9, duration: 1, ease: 'power2.inOut' }, 1)
  master.fromTo(layer(archive, 'a'), { xPercent: 14, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 1.1)
  master.fromTo(layer(archive, 'b'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 1.2)
  master.fromTo(layer(archive, 'c'), { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' }, 1.3)

  // ── 02 → 03 · Paneles que suben uno a uno ──
  master.to(archive, { scale: 0.94, duration: 1, ease: 'power2.in' }, 3)
  ;['p1', 'p2', 'p3'].forEach((name, index) => {
    master.fromTo(layer(fashion, name), { yPercent: 108 }, { yPercent: 0, duration: 0.95, ease: 'power3.out' }, 3.05 + index * 0.12)
  })

  // ── 03 → 04 · El panel del medio se expande hasta ocupar toda la pantalla ──
  const panelInset = () => {
    const p = box(layer(fashion, 'p2'))
    return `inset(${px(p.top)} ${px(vw() - p.left - p.width)} ${px(vh() - p.top - p.height)} ${px(p.left)} round 4px)`
  }
  master.fromTo(space, { clipPath: panelInset }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1, ease: 'power3.inOut' }, 5)
  master.fromTo(layer(space, 'photo'), { scale: 1.2 }, { scale: 1, duration: 1, ease: 'power3.inOut' }, 5)
  master.to(layer(fashion, 'p1'), { xPercent: -45, opacity: 0, duration: 0.7, ease: 'power2.in' }, 5)
  master.to(layer(fashion, 'p3'), { xPercent: 45, opacity: 0, duration: 0.7, ease: 'power2.in' }, 5)

  // ── 04 → 05 · Iris: se abre desde la lente y descubre el oficio ──
  const lens = () => {
    const l = box(layer(care, 'lens'))
    return { x: l.left + l.width / 2, y: l.top + l.height / 2 }
  }
  master.fromTo(care, { clipPath: () => `circle(0px at ${px(lens().x)} ${px(lens().y)})` }, { clipPath: () => `circle(${px(Math.hypot(vw(), vh()))} at ${px(lens().x)} ${px(lens().y)})`, duration: 1, ease: 'power2.inOut' }, 7)
  master.fromTo(layer(care, 'a'), { scale: 1.25 }, { scale: 1, duration: 1, ease: 'power3.inOut' }, 7)
  master.fromTo(layer(care, 'lens'), { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.3)' }, 7.1)
  master.to(space, { scale: 1.06, duration: 1, ease: 'power2.in' }, 7)

  // ── 05 → 06 · Empuje vertical: los regalos suben y la foto de la tarjeta se acomoda ──
  master.fromTo(gift, { yPercent: 100 }, { yPercent: 0, duration: 1, ease: 'power3.inOut' }, 9)
  master.to(care, { yPercent: -16, duration: 1, ease: 'power3.inOut' }, 9)
  master.fromTo(layer(gift, 'bgimg'), { yPercent: -14 }, { yPercent: 0, duration: 1, ease: 'power3.inOut' }, 9)
  master.fromTo(img(gift, 'bgimg'), { xPercent: 8 }, { xPercent: 0, duration: 1.1, ease: 'power3.out', immediateRender: false }, 9.1)

  // ── 06 → 07 · Desplazamiento horizontal: el río entra y se recorre en panorámica ──
  master.fromTo(river, { xPercent: 100 }, { xPercent: 0, duration: 1, ease: 'power3.inOut' }, 11)
  master.to(gift, { xPercent: -26, duration: 1, ease: 'power3.inOut' }, 11)
  master.fromTo(layer(river, 'photo'), { xPercent: -24 }, { xPercent: 0, duration: 1, ease: 'power3.inOut' }, 11)
  master.fromTo(img(river, 'photo'), { xPercent: 0 }, { xPercent: -33, duration: 2, ease: 'none', immediateRender: false }, 11)
}
