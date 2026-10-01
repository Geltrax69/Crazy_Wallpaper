import { H2, Meta } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'

export default function FinalCta() {
  return (
    <section className="section final-cta" aria-label="Browse the archive">
      <div className="container">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)' }}>The archive is open</Meta>
          <H2 as="h2">
            Find something<br />
            <em>worth looking at.</em>
          </H2>
          <Button to="/shop" size="lg" data-cursor="Browse">
            Explore the archive <Icon name="arrowRight" size={20} />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
