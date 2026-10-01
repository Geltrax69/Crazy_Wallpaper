import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Display, BodySm, Meta } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import { HERO_FLOATS, wallpaperById } from '../data/home'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.querySelectorAll('.hero-float').forEach((f) => {
          const depth = parseFloat(f.dataset.depth || 24)
          f.style.setProperty('--px', (-nx * depth).toFixed(1))
          f.style.setProperty('--py', (-ny * depth).toFixed(1))
        })
      })
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero" ref={ref} aria-label="Introduction">
      <div className="hero__meta">
        <Meta>New archive — Vol. 01</Meta>
        <Meta>Digital wallpapers · 2026</Meta>
      </div>

      {HERO_FLOATS.map((f) => {
        const w = wallpaperById(f.id)
        if (!w) return null
        return (
          <div key={f.id} className={`hero-float ${f.className}`} data-depth={f.depth} aria-hidden="true">
            <img src={w.preview} alt="" />
          </div>
        )
      })}

      <div className="hero__title">
        <Reveal>
          <Display>
            <span className="line">wallpapers</span>
            <span className="line line--2">for unusual</span>
            <span className="line line--3">spaces.</span>
          </Display>
        </Reveal>
      </div>

      <div className="hero__foot">
        <Reveal delay={120}>
          <BodySm className="hero__standfirst">
            An art-directed archive of premium digital wallpapers — for desktop, mobile,
            tablet and ultrawide. Art for your screens, printed in light.
          </BodySm>
        </Reveal>
        <Reveal delay={220}>
          <Button to="/shop" variant="quiet" data-cursor="Browse">
            Explore wallpapers <Icon name="arrowRight" size={18} className="btn-arrow" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
