import { Link } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { H1, H2, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Price from '../../../components/ui/Price'
import Icon from '../../../components/ui/Icon'
import ProductCard from '../../../components/gallery/ProductCard'
import Reveal from '../../../components/animation/Reveal'
import '../cart.css'

export default function CartPage() {
  const { cart, removeFromCart, subtotal, catalog } = useStore()
  useDocumentMeta('Cart — Papier', 'Review your selected wallpapers.')
  const suggestions = catalog.filter((w) => !cart.some((c) => c.id === w.id)).slice(0, 4)

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </Meta>
          <H1 as="h1">Your <em>cart</em></H1>
        </Reveal>
      </header>

      {cart.length === 0 ? (
        <Reveal>
          <div className="empty-state cart-empty">
            <Meta style={{ color: 'var(--muted)' }}>Nothing here yet</Meta>
            <H2 as="p" className="cart-empty__title">Your cart is <em className="t-italic">empty.</em></H2>
            <Body style={{ maxWidth: '44ch', color: 'var(--muted)' }}>
              Every wallpaper is a one-time purchase — yours forever, in every
              resolution. Start with a few of our favourites below.
            </Body>
            <Button to="/shop" variant="primary">Explore the archive</Button>
          </div>
          {suggestions.length > 0 && (
            <div className="cart-suggest">
              <div className="sec-head">
                <h2 className="t-h2">Start <em className="t-italic">here</em></h2>
                <Link to="/shop" className="sec-link" style={{ fontSize: 'var(--text-body-sm)' }}>
                  View all <Icon name="arrowRight" size={14} />
                </Link>
              </div>
              <div className="cart-suggest__grid">
                {suggestions.map((w, i) => (
                  <Reveal key={w.id} delay={i * 60}>
                    <ProductCard wallpaper={w} ratio="4/5" />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      ) : (
        <div className="cart-page__layout">
          <div className="cart-page__items">
            {cart.map((w, i) => (
              <Reveal key={w.id} delay={i * 50}>
                <div className="cart-page__line">
                  <Link to={`/wallpaper/${w.slug}`} className="cart-page__thumb" data-cursor="View">
                    <img src={w.thumbnail} alt={w.title} />
                  </Link>
                  <div>
                    <h2 className="t-h3"><Link to={`/wallpaper/${w.slug}`}>{w.title}</Link></h2>
                    <Caption style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>
                      Digital download · All resolutions included
                    </Caption>
                    <button
                      className="cart-remove"
                      onClick={() => removeFromCart(w.id)}
                      aria-label={`Remove ${w.title} from cart`}
                    >
                      <Icon name="close" size={14} /> Remove
                    </button>
                  </div>
                  <Price value={w.price} large />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <aside className="cart-summary" aria-label="Order summary">
              <Meta style={{ color: 'var(--muted)' }}>Summary</Meta>
              <div className="cart-summary__row">
                <BodySm>Subtotal</BodySm>
                <Price value={subtotal} />
              </div>
              <div className="cart-summary__row">
                <BodySm>Delivery</BodySm>
                <BodySm style={{ color: 'var(--muted)' }}>Instant download</BodySm>
              </div>
              <div className="cart-summary__row cart-summary__total">
                <BodySm><strong>Total</strong></BodySm>
                <Price value={subtotal} large />
              </div>
              <Button to="/checkout" variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center' }}>
                Checkout <Icon name="arrowRight" size={18} />
              </Button>
              <Link to="/shop" className="u-link t-meta" style={{ color: 'var(--muted)', textAlign: 'center', display: 'block' }}>
                Continue shopping
              </Link>
              <Caption style={{ color: 'var(--faint)', textAlign: 'center', display: 'block', marginTop: 'var(--space-sm)' }}>
                Secure checkout · 30-day guarantee
              </Caption>
            </aside>
          </Reveal>
        </div>
      )}
    </div>
  )
}
