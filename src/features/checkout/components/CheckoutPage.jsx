import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { processPayment } from '../services/checkoutService'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Price from '../../../components/ui/Price'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import '../checkout.css'

export default function CheckoutPage() {
  const { cart, subtotal, placeOrder } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useDocumentMeta('Checkout — Papier', 'Complete your purchase securely.')

  async function onSubmit(e) {
    e.preventDefault()
    if (cart.length === 0) return
    setBusy(true)
    setError('')
    try {
      await processPayment({ email, items: cart, total: subtotal })
      const order = placeOrder({ email, items: cart })
      navigate(`/checkout/success?order=${order.id}`, { replace: true })
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <Body>Your cart is empty — nothing to check out.</Body>
          <Button to="/shop">Explore the archive</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Almost yours</Meta>
          <H1 as="h1">Check<em>out</em></H1>
        </Reveal>
      </header>

      <div className="checkout-layout">
        <Reveal>
          <form className="checkout-form" onSubmit={onSubmit} noValidate={false}>
            <section aria-label="Contact">
              <Meta style={{ marginBottom: 'var(--space-md)' }}>01 — Contact</Meta>
              <label className="field">
                <Caption>Email</Caption>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
              </label>
              <label className="field">
                <Caption>Name</Caption>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
              </label>
            </section>

            <section aria-label="Payment">
              <Meta style={{ marginBottom: 'var(--space-md)' }}>02 — Payment</Meta>
              <label className="field">
                <Caption>Card number</Caption>
                <input type="text" inputMode="numeric" required value={card} onChange={(e) => setCard(e.target.value.replace(/[^\d]/g, '').slice(0, 16))} placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
              </label>
              <div className="field-row">
                <label className="field">
                  <Caption>Expiry</Caption>
                  <input type="text" required placeholder="MM / YY" autoComplete="cc-exp" />
                </label>
                <label className="field">
                  <Caption>CVC</Caption>
                  <input type="text" inputMode="numeric" required placeholder="123" autoComplete="cc-csc" />
                </label>
              </div>
              <Caption style={{ color: 'var(--faint)' }}>
                Demo checkout — no real payment is processed. Connect a payment provider to go live.
              </Caption>
            </section>

            {error && <p className="form-error" role="alert">{error}</p>}

            <Button type="submit" variant="primary" size="lg" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>
              {busy ? 'Processing…' : <><Icon name="check" size={18} /> Pay {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(subtotal)}</>}
            </Button>
            <Caption style={{ color: 'var(--faint)', textAlign: 'center', display: 'block' }}>
              30-day money-back guarantee · Instant download after payment
            </Caption>
          </form>
        </Reveal>

        <Reveal delay={100}>
          <aside className="cart-summary" aria-label="Order summary">
            <Meta style={{ color: 'var(--muted)' }}>Order — {cart.length} items</Meta>
            <div className="checkout-items">
              {cart.map((w) => (
                <div key={w.id} className="checkout-line">
                  <img src={w.thumbnail} alt={w.title} loading="lazy" />
                  <div style={{ flex: 1 }}>
                    <BodySm><strong>{w.title}</strong></BodySm>
                    <Caption style={{ color: 'var(--muted)' }}>All resolutions</Caption>
                  </div>
                  <Price value={w.price} />
                </div>
              ))}
            </div>
            <div className="cart-summary__row cart-summary__total">
              <BodySm><strong>Total</strong></BodySm>
              <Price value={subtotal} large />
            </div>
            <Link to="/cart" className="u-link t-meta" style={{ color: 'var(--muted)', textAlign: 'center', display: 'block' }}>
              Edit cart
            </Link>
          </aside>
        </Reveal>
      </div>
    </div>
  )
}
