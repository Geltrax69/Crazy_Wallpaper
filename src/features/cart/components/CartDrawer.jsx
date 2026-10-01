import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { BodySm, Caption, Meta } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Price from '../../../components/ui/Price'
import Icon from '../../../components/ui/Icon'
import './cart-drawer.css'
import '../cart.css'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, subtotal } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCartOpen])

  return (
    <>
      <div
        className={`cart-drawer__scrim${cartOpen ? ' is-open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${cartOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        inert={!cartOpen}
      >
        <div className="cart-drawer__head">
          <Meta>Cart — {cart.length} {cart.length === 1 ? 'item' : 'items'}</Meta>
          <button className="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}>
            <Icon name="close" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <BodySm>Your cart is empty. The archive awaits.</BodySm>
            <Button variant="ghost" size="sm" to="/shop" onClick={() => setCartOpen(false)}>
              Explore wallpapers
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.map((w) => (
                <div className="cart-line" key={w.id}>
                  <Link to={`/wallpaper/${w.slug}`} onClick={() => setCartOpen(false)}>
                    <img src={w.thumbnail} alt={w.title} loading="lazy" />
                  </Link>
                  <div className="cart-line__info">
                    <BodySm><strong>{w.title}</strong></BodySm>
                    <Caption style={{ color: 'var(--muted)' }}>{w.collection} · Digital download</Caption>
                    <button
                      className="cart-remove cart-remove--sm"
                      onClick={() => removeFromCart(w.id)}
                      aria-label={`Remove ${w.title} from cart`}
                    >
                      <Icon name="close" size={13} /> Remove
                    </button>
                  </div>
                  <Price value={w.price} />
                </div>
              ))}
            </div>
            <div className="cart-drawer__foot">
              <div className="cart-total">
                <Meta>Subtotal</Meta>
                <Price value={subtotal} large />
              </div>
              <Button
                variant="primary"
                onClick={() => { setCartOpen(false); navigate('/checkout') }}
              >
                Checkout <Icon name="arrowRight" size={18} />
              </Button>
              <Button variant="quiet" to="/cart" onClick={() => setCartOpen(false)}>
                View full cart
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
