import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { H1, H2, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import '../license.css'

const ALLOWED = [
  'Use on all your personal devices — desktop, laptop, tablet, phone',
  'Use as wallpaper in commercial workspaces and offices you own or manage',
  'Use in client presentations, mockups and pitch decks',
  'Use as a background in videos, streams and recordings',
  'Print for personal, non-commercial display',
]
const NOT_ALLOWED = [
  'Resell, redistribute or share the source files',
  'Offer the wallpapers as downloads on another platform',
  'Claim the artwork as your own or remove attribution where credited',
  'Use the artwork in a competing wallpaper product or dataset for AI training',
]

export default function LicensePage() {
  useDocumentMeta('License — Papier', 'Simple, generous licensing: personal and commercial use included.')

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>The fine print, in large print</Meta>
          <H1 as="h1">One license.<br /><em>Yours forever.</em></H1>
          <Body style={{ maxWidth: '56ch', marginTop: 'var(--space-md)', color: 'var(--muted)' }}>
            Every wallpaper you buy includes the same generous license. No tiers, no upsells,
            no renewals. Pay once and use it — personally and commercially — for as long as
            screens exist.
          </Body>
        </Reveal>
      </header>

      <div className="license-grid">
        <Reveal>
          <section className="license-col" aria-label="Allowed">
            <Meta style={{ color: 'var(--accent-green)', marginBottom: 'var(--space-lg)' }}>Allowed</Meta>
            <ul>
              {ALLOWED.map((a) => (
                <li key={a}>
                  <Icon name="check" size={17} />
                  <BodySm>{a}</BodySm>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
        <Reveal delay={100}>
          <section className="license-col" aria-label="Not allowed">
            <Meta style={{ color: 'var(--accent-red)', marginBottom: 'var(--space-lg)' }}>Not allowed</Meta>
            <ul>
              {NOT_ALLOWED.map((a) => (
                <li key={a}>
                  <Icon name="close" size={17} />
                  <BodySm>{a}</BodySm>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      <Reveal>
        <div className="license-note">
          <H2 as="h2">Need something <em>broader?</em></H2>
          <Body style={{ color: 'var(--muted)', maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
            For broadcast, large-scale commercial campaigns or extended rights, write to us —
            we offer extended licenses for individual pieces and the full archive.
          </Body>
          <a href="/contact" className="u-link t-meta" style={{ display: 'inline-block', marginTop: 'var(--space-lg)' }}>
            Contact the studio →
          </a>
        </div>
      </Reveal>
    </div>
  )
}
