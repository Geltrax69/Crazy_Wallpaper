import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { getCollection } from '../../../data/collections/collections'
import { H1, Body, Meta, Caption } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import NotFoundPage from '../../notfound/components/NotFoundPage'
import '../collections.css'

const RATIOS = ['16/10', '4/5', '1/1', '3/2']

export default function CollectionDetailPage() {
  const { slug } = useParams()
  const { catalog } = useStore()
  const collection = getCollection(slug)

  useDocumentMeta(
    collection ? `${collection.name} — Papier` : 'Collection — Papier',
    collection?.description
  )

  if (!collection) return <NotFoundPage />

  const works = catalog.filter((w) => w.collection === collection.slug)

  return (
    <div className="container">
      <Reveal>
        <div className="coll-detail__hero">
          <div>
            <Link to="/collections" className="u-link t-meta" style={{ color: 'var(--muted)' }}>
              ← All collections
            </Link>
            <h1 className="coll-detail__name" style={{ marginTop: 'var(--space-md)' }}>
              {collection.name.split('').length > 8 ? <em>{collection.name}</em> : collection.name}
            </h1>
            <Meta style={{ color: 'var(--muted)', marginTop: 'var(--space-sm)' }}>
              {collection.tagline} — {works.length} works
            </Meta>
            <Body style={{ marginTop: 'var(--space-lg)', maxWidth: '46ch', color: 'var(--muted)' }}>
              {collection.description}
            </Body>
          </div>
          <img src={collection.artwork} alt={`${collection.name} collection artwork`} />
        </div>
      </Reveal>

      <div className="shop-grid" style={{ paddingTop: 0 }}>
        {works.map((w, i) => (
          <Reveal key={w.id} delay={(i % 4) * 60}>
            <ProductCard wallpaper={w} ratio={RATIOS[i % RATIOS.length]} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="empty-state" style={{ paddingTop: 0 }}>
          <Caption style={{ color: 'var(--faint)' }}>
            More {collection.name.toLowerCase()} pieces arrive monthly.
          </Caption>
        </div>
      </Reveal>
    </div>
  )
}
