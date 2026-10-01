import { Link } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Price from '../../../components/ui/Price'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import '../account.css'

export default function AccountPage() {
  const { orders, favorites, cartCount } = useStore()
  useDocumentMeta('Account — Papier', 'Your orders, downloads and saved wallpapers.')

  const totalSpent = orders.reduce((s, o) => s + o.total, 0)

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Your account</Meta>
          <H1 as="h1">Hello, <em>collector.</em></H1>
        </Reveal>
      </header>

      <div className="account-grid">
        <Reveal>
          <div className="account-stats">
            <div className="stat">
              <span className="t-h2">{orders.reduce((s, o) => s + o.items.length, 0)}</span>
              <Caption style={{ color: 'var(--muted)' }}>Wallpapers owned</Caption>
            </div>
            <div className="stat">
              <span className="t-h2">{favorites.length}</span>
              <Caption style={{ color: 'var(--muted)' }}>Saved</Caption>
            </div>
            <div className="stat">
              <span className="t-h2">{orders.length}</span>
              <Caption style={{ color: 'var(--muted)' }}>Orders</Caption>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <section className="account-section" aria-label="Orders">
            <div className="sec-head">
              <h2 className="t-h3">Order history</h2>
              <Link to="/downloads" className="u-link t-meta">Downloads</Link>
            </div>
            {orders.length === 0 ? (
              <div className="account-empty">
                <Body>No orders yet.</Body>
                <Button variant="ghost" size="sm" to="/shop">Start collecting</Button>
              </div>
            ) : (
              <div className="order-list">
                {orders.map((o) => (
                  <div key={o.id} className="order-row">
                    <div>
                      <BodySm><strong>{o.id}</strong></BodySm>
                      <Caption style={{ color: 'var(--muted)' }}>
                        {new Date(o.purchasedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {o.items.length} {o.items.length === 1 ? 'item' : 'items'}
                      </Caption>
                    </div>
                    <div className="order-row__thumbs" aria-hidden="true">
                      {o.items.slice(0, 3).map((item) => (
                        <img key={item.id} src={item.image} alt="" loading="lazy" />
                      ))}
                    </div>
                    <Price value={o.total} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </Reveal>

        <Reveal delay={120}>
          <section className="account-section" aria-label="Shortcuts">
            <div className="sec-head">
              <h2 className="t-h3">Shortcuts</h2>
            </div>
            <div className="shortcut-list">
              <Link to="/downloads" className="shortcut">
                <span><BodySm><strong>Downloads</strong></BodySm><Caption style={{ color: 'var(--muted)' }}>All your files, every resolution</Caption></span>
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link to="/favorites" className="shortcut">
                <span><BodySm><strong>Saved</strong></BodySm><Caption style={{ color: 'var(--muted)' }}>{favorites.length} pieces waiting</Caption></span>
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link to="/cart" className="shortcut">
                <span><BodySm><strong>Cart</strong></BodySm><Caption style={{ color: 'var(--muted)' }}>{cartCount} items</Caption></span>
                <Icon name="arrowRight" size={18} />
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  )
}
