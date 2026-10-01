import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { CATEGORIES } from '../../../data/categories/categories'
import { COLLECTIONS } from '../../../data/collections/collections'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Reveal from '../../../components/animation/Reveal'
import Button from '../../../components/ui/Button'
import { useShopFilters } from '../hooks/useShopFilters'
import '../shop.css'

const RATIOS = ['16/10', '4/5', '1/1', '16/9', '3/2']

export default function ShopPage() {
  const { catalog } = useStore()
  const { results, category, collection, tone, maxPrice, sort, onlyNew, set, SORTS } =
    useShopFilters(catalog)
  const pillsRef = useRef(null)
  const [pillStart, setPillStart] = useState(true)
  const [pillEnd, setPillEnd] = useState(true)

  useEffect(() => {
    const el = pillsRef.current
    if (!el) return
    const update = () => {
      setPillStart(el.scrollLeft <= 8)
      setPillEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useDocumentMeta(
    'Archive — Papier',
    'Browse the full archive of premium digital wallpapers. Filter by category, collection, tone and price.'
  )

  return (
    <div className="container">
      <header className="shop-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>
            {onlyNew ? 'Fresh from the studio' : 'The full archive'}
          </Meta>
          <H1 as="h1">
            {onlyNew ? <>New <em>arrivals</em></> : <>Wallpaper <em>archive</em></>}
          </H1>
          <div className="shop-sub">
            <Body style={{ maxWidth: '52ch' }}>
              Every piece is composed by hand and mastered for all your screens.
              Buy once, download in every resolution, keep forever.
            </Body>
          </div>
        </Reveal>
      </header>

      <div className="shop-sticky">
        <div className="filter-bar" data-ps={pillStart} data-pe={pillEnd}>
          <div className="filter-bar__inner" ref={pillsRef} role="group" aria-label="Filter by category">
            <button className={`pill${category === 'all' ? ' is-active' : ''}`} onClick={() => set('category', 'all')}>
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`pill${category === c.slug ? ' is-active' : ''}`}
                onClick={() => set('category', c.slug)}
                aria-pressed={category === c.slug}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-selects" role="group" aria-label="More filters">
          <label className="select-wrap">
            <Caption>Collection</Caption>
            <select value={collection} onChange={(e) => set('collection', e.target.value)} aria-label="Collection">
              <option value="all">All</option>
              {COLLECTIONS.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="select-wrap">
            <Caption>Tone</Caption>
            <select value={tone} onChange={(e) => set('tone', e.target.value)} aria-label="Tone">
              <option value="all">All</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="warm">Warm</option>
              <option value="cool">Cool</option>
            </select>
          </label>
          <label className="select-wrap">
            <Caption>Price</Caption>
            <select value={maxPrice} onChange={(e) => set('maxPrice', e.target.value)} aria-label="Max price">
              <option value="any">Any</option>
              <option value="20">Under $20</option>
              <option value="30">Under $30</option>
            </select>
          </label>
          <label className="select-wrap" style={{ marginLeft: 'auto' }}>
            <Caption>Sort</Caption>
            <select value={sort} onChange={(e) => set('sort', e.target.value)} aria-label="Sort">
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="shop-count" aria-live="polite">
        <strong>{results.length}</strong> {results.length === 1 ? 'wallpaper' : 'wallpapers'}
      </p>

      {results.length === 0 ? (
        <div className="empty-state">
          <Body>Nothing in the archive matches those filters.</Body>
          <Button variant="ghost" size="sm" onClick={() => { set('category', 'all'); set('collection', 'all'); set('tone', 'all'); set('maxPrice', 'any') }}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="shop-grid">
          {results.map((w, i) => (
            <Reveal key={w.id} delay={(i % 5) * 60}>
              <ProductCard wallpaper={w} ratio={RATIOS[i % RATIOS.length]} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal>
        <div className="empty-state" style={{ paddingTop: 0 }}>
          <BodySm>Can’t find the one? <Link to="/contact" className="u-link">Tell us what you’re looking for</Link> — the archive grows monthly.</BodySm>
        </div>
      </Reveal>
    </div>
  )
}
