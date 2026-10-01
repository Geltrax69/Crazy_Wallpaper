import { useEffect, useState } from 'react'
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
import SmartImage from '../../../components/ui/SmartImage'
import Reveal from '../../../components/animation/Reveal'
import NotFoundPage from '../../notfound/components/NotFoundPage'
import { cx } from '../../../lib/utils/format'
import '../product.css'

function SpecTags({ label, items }) {
  return (
    <div className="spec-row">
      <Caption style={{ color: 'var(--muted)' }}>{label}</Caption>
      <div className="tag-row">
        {items.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
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
  const [lightbox, setLightbox] = useState(false)
  const related = catalog
    .filter((x) => x.id !== w.id && (x.collection === w.collection || x.category === w.category))
    .slice(0, 3)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(false) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [lightbox])

  function buyNow() {
    if (!added) addToCart(w.id)
    navigate('/checkout')
  }

  const sameName = category?.name && category.name === collection?.name

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
          <button
            type="button"
            className="product-media__frame"
            onClick={() => setLightbox(true)}
            aria-label={`View ${w.title} fullscreen`}
            data-cursor="Zoom"
          >
            <SmartImage src={w.preview} alt={w.title} eager />
            <span className="product-media__zoom" aria-hidden="true">
              <Icon name="plus" size={14} /> Fullscreen
            </span>
          </button>
          <div className="product-media__badges">
            {w.isNew && <Badge tone="ink">New</Badge>}
            <Badge>8K included</Badge>
          </div>
        </Reveal>

        <div className="product-info">
          <Reveal>
            <Meta style={{ color: 'var(--muted)' }}>
              {sameName ? (
                <Link to={`/collections/${collection.slug}`} className="u-link">{collection?.name}</Link>
              ) : (
                <>{category?.name} · <Link to={`/collections/${collection.slug}`} className="u-link">{collection?.name}</Link></>
              )}
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
              <SpecTags label="Aspect ratios" items={w.aspectRatios} />
              <SpecTags label="Devices" items={w.supportedDevices} />
              <SpecTags label="Formats" items={w.fileFormats} />
              <div className="spec-row">
                <Caption style={{ color: 'var(--muted)' }}>License</Caption>
                <BodySm><Link to="/license" className="u-link">Personal & commercial use</Link></BodySm>
              </div>
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

      <div className="buy-bar">
        <div className="buy-bar__meta">
          <BodySm className="buy-bar__title">{w.title}</BodySm>
          <Price value={w.price} />
        </div>
        <Button
          variant="primary"
          onClick={() => addToCart(w.id)}
          className={cx(added && 'is-in-cart')}
          aria-label={added ? `${w.title} is in your cart` : `Add ${w.title} to cart`}
        >
          {added ? <><Icon name="check" size={16} /> In cart</> : 'Add to cart'}
        </Button>
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${w.title}, fullscreen view`}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="lightbox__close"
            aria-label="Close fullscreen view"
            onClick={() => setLightbox(false)}
          >
            <Icon name="close" size={20} />
          </button>
          <img src={w.preview} alt={w.title} onClick={(e) => e.stopPropagation()} />
          <p className="lightbox__cap"><BodySm>{w.title} — tap anywhere to close</BodySm></p>
        </div>
      )}
    </div>
  )
}
