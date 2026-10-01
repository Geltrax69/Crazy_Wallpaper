import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta, useJsonLd } from '../../../app/routes/useDocumentMeta'
import { getWallpaper } from '../../../data/wallpapers/wallpapers'
import { getCategory } from '../../../data/categories/categories'
import { getCollection } from '../../../data/collections/collections'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Button from '../../../components/ui/Button'
import Price from '../../../components/ui/Price'
import Badge from '../../../components/ui/Badge'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import NotFoundPage from '../../notfound/components/NotFoundPage'
import { cx } from '../../../lib/utils/format'
import '../product.css'

function SpecRow({ label, children }) {
  return (
    <div className="spec-row">
      <Caption style={{ color: 'var(--muted)' }}>{label}</Caption>
      <BodySm>{children}</BodySm>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const w = getWallpaper(slug)
  const { addToCart, inCart, toggleFavorite, isFavorite, setCartOpen, catalog } = useStore()

  useDocumentMeta(
    w ? `${w.title} — Papier` : 'Wallpaper — Papier',
    w?.description
  )
  useJsonLd(w && {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: w.title,
    description: w.description,
    image: [w.preview],
    brand: { '@type': 'Brand', name: 'Papier' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: w.price.toFixed(2),
      availability: 'https://schema.org/InStock',
    },
  })

  if (!w) return <NotFoundPage />

  const category = getCategory(w.category)
  const collection = getCollection(w.collection)
  const added = inCart(w.id)
  const fav = isFavorite(w.id)
  const related = catalog
    .filter((x) => x.id !== w.id && (x.collection === w.collection || x.category === w.category))
    .slice(0, 3)

  function buyNow() {
    if (!added) addToCart(w.id)
    navigate('/checkout')
  }

  return (
    <div className="container">
      <Reveal>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/shop" className="u-link t-meta" style={{ color: 'var(--muted)' }}>Archive</Link>
          <span aria-hidden="true"> / </span>
          <Link to={`/collections/${collection.slug}`} className="u-link t-meta" style={{ color: 'var(--muted)' }}>
            {collection.name}
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="t-meta">{w.title}</span>
        </nav>
      </Reveal>

      <div className="product-layout">
        <Reveal className="product-media">
          <div data-cursor="View">
            <img src={w.preview} alt={w.title} />
          </div>
          <div className="product-media__badges">
            {w.isNew && <Badge tone="ink">New</Badge>}
            <Badge>8K included</Badge>
          </div>
        </Reveal>

        <div className="product-info">
          <Reveal>
            <Meta style={{ color: 'var(--muted)' }}>
              {category?.name} · <Link to={`/collections/${collection.slug}`} className="u-link">{collection?.name}</Link>
            </Meta>
            <H1 as="h1" className="product-title">{w.title}</H1>
            <div className="product-price-row">
              <Price value={w.price} large />
              <Caption style={{ color: 'var(--muted)' }}>One-time purchase · Yours forever</Caption>
            </div>
            <Body style={{ color: 'var(--ink-soft)' }}>{w.description}</Body>

            <div className="product-ctas">
              <Button
                variant="primary"
                size="lg"
                onClick={() => addToCart(w.id)}
                className={cx(added && 'is-in-cart')}
                data-cursor={added ? undefined : 'Add'}
              >
                {added ? <><Icon name="check" size={18} /> In your cart</> : <>Add to cart <Icon name="arrowRight" size={18} /></>}
              </Button>
              <Button variant="ghost" size="lg" onClick={buyNow}>
                Buy now
              </Button>
              <button
                className={cx('product-fav', fav && 'is-active')}
                onClick={() => toggleFavorite(w.id)}
                aria-pressed={fav}
                aria-label={fav ? 'Remove from saved' : 'Save for later'}
              >
                <Icon name="heart" size={19} filled={fav} />
                <BodySm>{fav ? 'Saved' : 'Save'}</BodySm>
              </button>
            </div>

            <button className="u-link t-meta" style={{ color: 'var(--muted)' }} onClick={() => setCartOpen(true)}>
              View cart →
            </button>
          </Reveal>

          <Reveal delay={120}>
            <div className="spec-list">
              <SpecRow label="Resolutions">{w.resolutions.join(' · ')}</SpecRow>
              <SpecRow label="Aspect ratios">{w.aspectRatios.join(' · ')}</SpecRow>
              <SpecRow label="Devices">{w.supportedDevices.join(' · ')}</SpecRow>
              <SpecRow label="Formats">{w.fileFormats.join(' · ')}</SpecRow>
              <SpecRow label="License">
                <Link to="/license" className="u-link">Personal & commercial use</Link>
              </SpecRow>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="size-grid" aria-label="Available sizes">
              {w.resolutions.map((r) => (
                <div key={r} className="size-chip">
                  <BodySm><strong>{r}</strong></BodySm>
                  <Caption style={{ color: 'var(--faint)' }}>
                    {r === 'Mobile' ? '9:16' : r === 'Ultrawide' ? '21:9' : r === 'Tablet' ? '4:3' : '16:9'}
                  </Caption>
                </div>
              ))}
            </div>
            <BodySm style={{ color: 'var(--muted)', marginTop: 'var(--space-md)' }}>
              Every purchase includes all sizes. No watermarks, no expiry, free re-downloads forever.
            </BodySm>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-label="Related wallpapers" style={{ paddingTop: 0 }}>
          <Reveal>
            <div className="sec-head">
              <h2 className="t-h2">You may also <em className="t-italic">like</em></h2>
              <Link to={`/collections/${collection.slug}`} className="u-link t-meta">
                More {collection.name.toLowerCase()}
              </Link>
            </div>
          </Reveal>
          <div className="related-grid">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <ProductCard wallpaper={r} ratio="4/3" />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
