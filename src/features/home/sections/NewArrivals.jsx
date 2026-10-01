import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { H2, Meta, Caption } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import { NEW_ARRIVALS } from '../data/home'

export default function NewArrivals() {
  const railRef = useRef(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
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
    return () => {
      rail.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <section className="section" aria-label="New arrivals" style={{ background: 'var(--bg-warm)' }}>
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <H2 as="h2">New <em className="t-italic">arrivals</em></H2>
            <span className="rail-hint">
              <Caption>Drag</Caption>
              <Icon name="arrowRight" size={15} />
            </span>
          </div>
        </Reveal>
        <div className="rail" ref={railRef} data-cursor="Drag">
          {NEW_ARRIVALS.map((w) => (
            <ProductCard key={w.id} wallpaper={w} ratio="4/5" />
          ))}
        </div>
        <Reveal>
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <Link to="/shop?filter=new" className="u-link t-meta">All new wallpapers</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
