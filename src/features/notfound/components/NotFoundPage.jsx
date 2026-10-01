import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { Display, Body, Meta } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'

export default function NotFoundPage() {
  useDocumentMeta('Not found — Papier')

  return (
    <div className="container" style={{ textAlign: 'center', paddingBlock: 'var(--space-section)' }}>
      <Reveal>
        <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)' }}>Error 404</Meta>
        <Display>This wall is <em className="t-italic">blank.</em></Display>
        <Body style={{ color: 'var(--muted)', marginTop: 'var(--space-lg)' }}>
          The page you’re looking for isn’t in the archive.
        </Body>
        <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <Button to="/" variant="primary">Go home</Button>
          <Button to="/shop" variant="ghost">
            Browse wallpapers <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </Reveal>
    </div>
  )
}
