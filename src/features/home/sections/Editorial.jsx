import { H2, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Reveal from '../../../components/animation/Reveal'
import { wallpaperById } from '../data/home'

export default function Editorial() {
  const art = wallpaperById('w23')
  return (
    <section className="section editorial" aria-label="Our philosophy">
      <div className="container editorial__inner">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)' }}>The philosophy</Meta>
          <H2 as="h2" className="editorial__title">
            Your screen <em>is</em> a wall.
          </H2>
        </Reveal>
        <Reveal delay={140}>
          <div className="editorial__copy">
            <Body>
              You look at it for hours a day — more than any wall in your home, more than
              any painting you own. And yet most screens are dressed in whatever shipped
              with the device.
            </Body>
            <Body>
              We treat digital space like physical space: deliberately, with taste, and
              with art that earns its place. Every wallpaper in the archive is composed,
              color-graded and finished by hand — then mastered for every screen you own,
              from a phone to an ultrawide.
            </Body>
            <BodySm style={{ color: 'var(--muted)' }}>
              No subscriptions. No watermarks. Buy once, keep forever, download in every
              resolution.
            </BodySm>
          </div>
        </Reveal>
        {art && (
          <Reveal delay={100}>
            <figure className="editorial__figure">
              <img src={art.preview} alt={art.title} loading="lazy" />
              <figcaption>
                <Caption>{art.title} — from the Photographic collection</Caption>
                <Caption>Fig. 01</Caption>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  )
}
