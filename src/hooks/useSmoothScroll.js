import { useEffect } from 'react'
import Lenis from 'lenis'

// Scroll con inercia para que las escenas atadas al scroll se sientan continuas.
// Se desactiva si la persona pidio reducir movimiento.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
