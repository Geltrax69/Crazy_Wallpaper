import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { searchWallpapers } from '../../../data/wallpapers/wallpapers'
import { H1, Body, Meta, Caption } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import '../search.css'

const SUGGESTIONS = ['nocturnal', 'minimal', 'dune', 'ink', 'blue', 'retro sun', 'concrete', 'fog']

export default function SearchPage() {
  const { catalog } = useStore()
  const [params, setParams] = useSearchParams()
  const [value, setValue] = useState(params.get('q') || '')

  useDocumentMeta('Search — Papier', 'Search the wallpaper archive by title, collection, mood or color.')

  const results = useMemo(
    () => (value.trim() ? searchWallpapers(value) : []),
    [value]
  )
  const popular = useMemo(() => [...catalog].sort((a, b) => b.popularity - a.popularity).slice(0, 4), [catalog])

  function onChange(e) {
    const v = e.target.value
    setValue(v)
    const next = new URLSearchParams(params)
    if (v.trim()) next.set('q', v)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  return (
    <div className="container">
      <div className="search-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Search</Meta>
          <div className="search-field">
            <Icon name="search" size={28} />
            <input
              type="search"
              value={value}
              onChange={onChange}
              placeholder="Search the archive"
              aria-label="Search the archive"
              autoFocus
            />
          </div>
        </Reveal>
      </div>

      {!value.trim() && (
        <Reveal>
          <div className="search-suggest">
            <Caption style={{ color: 'var(--faint)' }}>Try</Caption>
            <div className="search-suggest__pills">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="pill" onClick={() => { setValue(s); setParams({ q: s }, { replace: true }) }}>
                  {s}
                </button>
              ))}
            </div>
            <Meta style={{ color: 'var(--faint)', marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-lg)' }}>
              Most loved right now
            </Meta>
            <div className="search-popular">
              {popular.map((w) => (
                <ProductCard key={w.id} wallpaper={w} ratio="4/3" />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {value.trim() !== '' && (
        <div>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)' }}>
            {results.length} {results.length === 1 ? 'result' : 'results'} for “{value.trim()}”
          </Meta>
          {results.length === 0 ? (
            <div className="empty-state">
              <Body>Nothing found. Try a mood — “calm”, “dark”, “warm” — or a collection name.</Body>
            </div>
          ) : (
            <div className="search-grid">
              {results.map((w, i) => (
                <Reveal key={w.id} delay={(i % 4) * 50}>
                  <ProductCard wallpaper={w} ratio={i % 3 === 0 ? '4/5' : '4/3'} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
