import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { COLLECTIONS } from '../../../data/collections/collections'
import { WALLPAPERS } from '../../../data/wallpapers/wallpapers'
import { H1, Body, Meta, Caption } from '../../../components/typography/Type'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import '../collections.css'

export default function CollectionsPage() {
  useDocumentMeta('Collections — Papier', 'Twelve curated collections of premium wallpapers.')

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Curated series</Meta>
          <H1 as="h1">Collec<em>tions</em></H1>
          <Body style={{ maxWidth: '52ch', marginTop: 'var(--space-md)', color: 'var(--muted)' }}>
            Twelve ongoing series, each with its own visual identity. New pieces join monthly.
          </Body>
        </Reveal>
      </header>

      <div className="collections-grid">
        {COLLECTIONS.map((c, i) => {
          const count = WALLPAPERS.filter((w) => w.collection === c.slug).length
          const flip = i % 2 === 1
          return (
            <Reveal key={c.id}>
              <Link
                to={`/collections/${c.slug}`}
                className={`collection-card${flip ? ' is-flip' : ''}`}
                data-cursor="Open"
                style={{ '--accent': c.accent }}
              >
                <div className="collection-card__media">
                  <img src={c.artwork} alt={`${c.name} collection`} loading="lazy" />
                </div>
                <div className="collection-card__body">
                  <Meta style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')} — {count} works</Meta>
                  <h2 className="collection-card__name">{c.name}</h2>
                  <Body style={{ color: 'var(--muted)' }}>{c.tagline}</Body>
                  <span className="collection-card__link">
                    Enter collection <Icon name="arrowRight" size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
