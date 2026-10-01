import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { downloadAll } from '../../downloads/services/downloadService'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Price from '../../../components/ui/Price'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams()
  const { orders } = useStore()
  const order = orders.find((o) => o.id === params.get('order')) || orders[0]

  useDocumentMeta('Thank you — Papier', 'Your wallpapers are ready to download.')

  if (!order) {
    return (
      <div className="container">
        <div className="empty-state">
          <Body>No recent order found.</Body>
          <Button to="/shop">Explore the archive</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '860px' }}>
      <div className="success-hero">
        <Reveal>
          <span className="success-check"><Icon name="check" size={30} /></span>
          <Meta style={{ color: 'var(--muted)' }}>Order {order.id}</Meta>
          <H1 as="h1">Thank <em>you.</em></H1>
          <Body style={{ color: 'var(--muted)', maxWidth: '46ch', marginTop: 'var(--space-md)' }}>
            Your wallpapers are ready. A receipt was sent to {order.email || 'your email'}.
            Download everything now, or find it anytime under Downloads.
          </Body>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="success-items">
          {order.items.map((item) => (
            <div key={item.id} className="cart-page__line">
              <span className="cart-page__thumb"><img src={item.image} alt={item.title} /></span>
              <div>
                <h2 className="t-h3">{item.title}</h2>
                <Caption style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>All resolutions included</Caption>
              </div>
              <Price value={item.price} large />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="success-ctas">
          <Button variant="primary" size="lg" onClick={() => downloadAll(order)}>
            <Icon name="download" size={18} /> Download all
          </Button>
          <Button variant="ghost" size="lg" to="/downloads">
            Go to my downloads
          </Button>
        </div>
        <div className="empty-state" style={{ paddingTop: 'var(--space-xl)' }}>
          <BodySm><Link to="/shop" className="u-link">Continue browsing the archive</Link></BodySm>
        </div>
      </Reveal>
    </div>
  )
}
