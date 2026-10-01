import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { H2, Meta, Caption } from '../../../components/typography/Type'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import { COLLECTIONS_TEASER } from '../data/home'

export default function CollectionsTeaser() {
  const [peek, setPeek] = useState(null)
  const peekRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    let x = 0, y = 0, px = 0, py = 0
    const onMove = (e) => { x = e.clientX; y = e.clientY }
    const loop = () => {
      px += (x - px) * 0.16
      py += (y - py) * 0.16
      if (peekRef.current) {
        peekRef.current.style.transform = `translate(${px + 28}px, ${py - 110}px)`
      }
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
    <section className="section" aria-label="Collections">
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <H2 as="h2">Twelve <em className="t-italic">collections</em></H2>
            <Link to="/collections" className="u-link t-meta">All collections</Link>
          </div>
        </Reveal>
        <div className="coll-list">
          {COLLECTIONS_TEASER.map((c, i) => (
            <Reveal key={c.id} delay={i * 40}>
              <Link
                to={`/collections/${c.slug}`}
                className="coll-row"
                onMouseEnter={() => setPeek(c.artwork)}
                onMouseLeave={() => setPeek(null)}
              >
                <Meta className="coll-row__index">{String(i + 1).padStart(2, '0')}</Meta>
                <span className="coll-row__name">{c.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <Caption className="coll-row__tag">{c.tagline}</Caption>
                  <Icon name="arrowRight" size={20} className="coll-row__arrow" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      <div ref={peekRef} className={`coll-peek${peek ? ' is-visible' : ''}`} aria-hidden="true">
        {peek && <img src={peek} alt="" />}
      </div>
    </section>
  )
}
