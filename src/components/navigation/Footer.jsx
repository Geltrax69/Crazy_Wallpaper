import { Link } from 'react-router-dom'
import { BodySm, Meta } from '../typography/Type'
import './footer.css'

const COLS = [
  {
    title: 'Archive',
    links: [
      { label: 'All wallpapers', to: '/shop' },
      { label: 'Collections', to: '/collections' },
      { label: 'Categories', to: '/categories' },
      { label: 'New arrivals', to: '/shop?filter=new' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', to: '/about' },
      { label: 'License', to: '/license' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', to: '/account' },
      { label: 'Downloads', to: '/downloads' },
      { label: 'Saved', to: '/favorites' },
      { label: 'Cart', to: '/cart' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="footer-brand">
            <span className="wordmark">Papier<em>.</em></span>
            <BodySm>An art-directed archive of premium digital wallpapers. Art for your screens, printed in light.</BodySm>
          </div>
          {COLS.map((col) => (
            <nav className="footer-col" key={col.title} aria-label={col.title}>
              <Meta as="h4">{col.title}</Meta>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to + l.label}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="site-footer__bottom">
          <Meta>© 2026 Papier Studio</Meta>
          <Meta>Set in Junicode</Meta>
          <Meta>Vol. 01 — MMXXVI</Meta>
        </div>
      </div>
    </footer>
  )
}
