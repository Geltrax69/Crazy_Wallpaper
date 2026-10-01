import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { H1, H2, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import { wallpaperById } from '../../home/data/home'
import '../about.css'

const PRINCIPLES = [
  { n: '01', title: 'Composed, not generated-and-dumped', text: 'Every piece begins with an intention — a mood, a room, a time of day. We art-direct each wallpaper like a print, then master it for screens.' },
  { n: '02', title: 'Restraint is a feature', text: 'A wallpaper should recede when you work and reward you when you look. We avoid noise, clutter and visual shouting.' },
  { n: '03', title: 'Every screen, one purchase', text: 'Desktop, ultrawide, tablet, phone — each artwork is finished in every resolution. Buy once, download forever.' },
  { n: '04', title: 'Yours, truly', text: 'No subscriptions, no watermarks, no expiring licenses. When you buy a wallpaper, it is yours in the oldest sense of the word.' },
]

export default function AboutPage() {
  useDocumentMeta('About — Papier', 'Why Papier exists: digital walls deserve better art.')
  const art = wallpaperById('w11')

  return (
    <div>
      <div className="container">
        <header className="page-head about-head">
          <Reveal>
            <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>The studio</Meta>
            <H1 as="h1">
              Digital walls deserve<br /><em>better art.</em>
            </H1>
          </Reveal>
        </header>
      </div>

      {art && (
        <Reveal>
          <div className="container">
            <figure className="about-figure">
              <img src={art.preview} alt={art.title} loading="lazy" />
              <figcaption>
                <Caption>{art.title} — Surreal collection</Caption>
                <Caption>Composed 2026</Caption>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      )}

      <div className="container about-body">
        <Reveal>
          <div className="about-cols">
            <H2 as="h2">We spend our lives looking at <em>rectangles of light.</em></H2>
            <div className="about-copy">
              <Body>
                Papier began with a simple observation: the average person looks at their
                screens for hours every day — more than at any wall, window or painting
                they own. And yet those screens are dressed in whatever shipped with the device.
              </Body>
              <Body>
                We think that’s wrong. A screen is a wall. Walls deserve art — considered,
                composed, finished by people who care about how light falls on a surface.
              </Body>
              <Body>
                So we built an archive, not a marketplace. A small, opinionated collection
                of digital wallpapers, released in volumes, each piece art-directed like a
                gallery print and mastered for every device you own.
              </Body>
            </div>
          </div>
        </Reveal>

        <div className="about-principles">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 70}>
              <div className="principle">
                <Meta style={{ color: 'var(--faint)' }}>{p.n}</Meta>
                <h3 className="t-h3">{p.title}</h3>
                <BodySm style={{ color: 'var(--muted)' }}>{p.text}</BodySm>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="about-cta">
            <H2 as="h2">See what we <em>mean.</em></H2>
            <Button to="/shop" size="lg" style={{ marginTop: 'var(--space-lg)' }}>
              Explore the archive <Icon name="arrowRight" size={20} />
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
