import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { H2 } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import { NEW_ARRIVALS } from '../data/home'

export default function NewArrivals() {
  const railRef = useRef(null)
  const wrapRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const update = () => {
      setAtStart(rail.scrollLeft <= 8)
      setAtEnd(rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 8)
    }
    update()

    let down = false, startX = 0, startScroll = 0
    const onDown = (e) => {
      down = true
      startX = e.clientX
      startScroll = rail.scrollLeft
      rail.classList.add('is-dragging')
    }
    const onMove = (e) => {
      if (!down) return
      rail.scrollLeft = startScroll - (e.clientX - startX)
    }
    const onUp = () => {
      down = false
      rail.classList.remove('is-dragging')
    }
    rail.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    rail.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      rail.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      rail.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const nudge = (dir) => {
    const rail = railRef.current
    if (rail) rail.scrollBy({ left: dir * rail.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section className="section" aria-label="New arrivals" style={{ background: 'var(--bg-warm)' }}>
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <H2 as="h2">New <em className="t-italic">arrivals</em></H2>
            <div className="rail-nav" role="group" aria-label="Scroll new arrivals">
              <button type="button" className="rail-btn" onClick={() => nudge(-1)} disabled={atStart} aria-label="Scroll left">
                <Icon name="arrowLeft" size={18} />
              </button>
              <button type="button" className="rail-btn" onClick={() => nudge(1)} disabled={atEnd} aria-label="Scroll right">
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          </div>
        </Reveal>
        <div
          className="rail-wrap"
          ref={wrapRef}
          data-at-start={atStart}
          data-at-end={atEnd}
        >
          <div className="rail" ref={railRef} data-cursor="Drag">
            {NEW_ARRIVALS.map((w) => (
              <ProductCard key={w.id} wallpaper={w} ratio="4/5" />
            ))}
          </div>
        </div>
        <Reveal>
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <Link to="/shop?filter=new" className="sec-link">
              All new wallpapers <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
