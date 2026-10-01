import { useEffect, useRef, useState } from 'react'
import './custom-cursor.css'

/* Desktop-only contextual cursor label. Appears over [data-cursor] elements. */
export default function CustomCursor() {
  const ref = useRef(null)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let x = 0, y = 0, cx = 0, cy = 0
    const el = ref.current

    const onMove = (e) => {
      x = e.clientX; y = e.clientY
      const t = e.target.closest?.('[data-cursor]')
      setLabel(t ? t.getAttribute('data-cursor') : '')
      setVisible(!!t)
    }
    const loop = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      if (el) el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={`cursor-label${visible ? ' is-visible' : ''}`} aria-hidden="true">
      {label}
    </div>
  )
}
