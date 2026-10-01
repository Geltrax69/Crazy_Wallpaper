import { Link } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { getWallpaper } from '../../../data/wallpapers/wallpapers'
import { downloadArtwork } from '../services/downloadService'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import '../downloads.css'

const SIZES = ['4K', '5K', '8K', 'Ultrawide', 'Mobile']

export default function DownloadsPage() {
  const { orders } = useStore()
  useDocumentMeta('Downloads — Papier', 'Download your purchased wallpapers in every resolution.')

  const items = orders.flatMap((o) =>
    o.items.map((item) => ({ ...item, purchasedAt: o.purchasedAt, orderId: o.id }))
  )

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Your collection</Meta>
          <H1 as="h1">Down<em>loads</em></H1>
          <Body style={{ maxWidth: '52ch', marginTop: 'var(--space-md)', color: 'var(--muted)' }}>
            Every purchase, every resolution, forever. Re-download anytime.
          </Body>
        </Reveal>
      </header>

      {items.length === 0 ? (
        <Reveal>
          <div className="empty-state">
            <Body>Nothing here yet — your purchased wallpapers will appear in this collection.</Body>
            <Button to="/shop">Explore the archive</Button>
          </div>
        </Reveal>
      ) : (
        <div className="downloads-list">
          {items.map((item, i) => {
            const w = getWallpaper(item.id)
            return (
              <Reveal key={`${item.orderId}-${item.id}`} delay={(i % 3) * 60}>
                <article className="download-card">
                  <Link to={`/wallpaper/${item.slug}`} className="download-card__thumb" data-cursor="View">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </Link>
                  <div className="download-card__body">
                    <h2 className="t-h3"><Link to={`/wallpaper/${item.slug}`}>{item.title}</Link></h2>
                    <Caption style={{ color: 'var(--muted)', marginTop: '0.3rem' }}>
                      Purchased {new Date(item.purchasedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </Caption>
                    <div className="download-card__sizes">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          className="dl-btn"
                          onClick={() => w && downloadArtwork(w, size)}
                        >
                          <Icon name="download" size={14} /> {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      )}
    </div>
  )
}
