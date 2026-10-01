import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { H1, Body, BodySm, Meta } from '../../../components/typography/Type'
import Reveal from '../../../components/animation/Reveal'
import '../faq.css'

const FAQS = [
  { q: 'What exactly am I buying?', a: 'A high-resolution digital artwork file — mastered in 4K, 5K, 8K, ultrawide, tablet and mobile sizes, in JPG and PNG. No physical product ships; everything is an instant download.' },
  { q: 'How do I receive my wallpapers?', a: 'Immediately after checkout you’ll land on a download page, and everything is also stored under Downloads in your account — forever. Re-download anytime, in any size.' },
  { q: 'Can I use these commercially?', a: 'Yes. Every purchase includes personal and commercial use: client decks, office walls, streams, videos. The only things you can’t do are resell the files themselves or feed them to AI training datasets. See the License page for details.' },
  { q: 'Will this work on my ultrawide / phone / tablet?', a: 'Yes — every wallpaper ships in all aspect ratios including 21:9 ultrawide and 9:16 mobile. If a new device format appears, we add it to the archive and you re-download free.' },
  { q: 'Do you offer refunds?', a: 'Digital goods can’t be returned, but we offer a 30-day money-back guarantee, no questions asked. If a piece isn’t right for your screens, write to us.' },
  { q: 'Are new wallpapers added?', a: 'Monthly. Collections grow over time, and buying early never penalizes you — new sizes of pieces you own are always free.' },
  { q: 'Can I request a custom wallpaper?', a: 'We take a small number of commissions each quarter — a palette, a mood, your space. Write to us via the Contact page with what you have in mind.' },
]

export default function FaqPage() {
  useDocumentMeta('FAQ — Papier', 'Questions about buying, downloading, licensing and using Papier wallpapers.')

  return (
    <div className="container" style={{ maxWidth: '880px' }}>
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Good questions</Meta>
          <H1 as="h1">Frequently <em>asked</em></H1>
        </Reveal>
      </header>

      <div className="faq-list">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 40}>
            <details className="faq-item">
              <summary>
                <span className="t-h3">{f.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <BodySm className="faq-answer">{f.a}</BodySm>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="empty-state">
          <Body>Still curious? <Link to="/contact" className="u-link">Ask us anything</Link>.</Body>
        </div>
      </Reveal>
    </div>
  )
}
