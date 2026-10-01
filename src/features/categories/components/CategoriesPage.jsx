import { Link } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { CATEGORIES } from '../../../data/categories/categories'
import { WALLPAPERS } from '../../../data/wallpapers/wallpapers'
import { H1, Body, Meta, Caption } from '../../../components/typography/Type'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import '../categories.css'

function representative(slug) {
  return WALLPAPERS.find((w) => w.category === slug)
}

export default function CategoriesPage() {
  const { catalog } = useStore()
  useDocumentMeta('Categories — Papier', 'Explore wallpapers by category: abstract, architecture, nature, surreal, minimal and more.')

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Browse by mood</Meta>
          <H1 as="h1">Cate<em>gories</em></H1>
          <Body style={{ maxWidth: '52ch', marginTop: 'var(--space-md)', color: 'var(--muted)' }}>
            Ten ways into the archive. Hover to preview — click to enter.
          </Body>
        </Reveal>
      </header>

      <div className="cat-list">
        {CATEGORIES.map((c, i) => {
          const rep = representative(c.slug)
          const count = catalog.filter((w) => w.category === c.slug).length
          return (
            <Reveal key={c.id} delay={i * 35}>
              <Link to={`/shop?category=${c.slug}`} className="cat-row" data-cursor="Open">
                <Meta className="cat-row__index">{c.index}</Meta>
                <span className="cat-row__name">{c.name}</span>
                <Caption className="cat-row__blurb">{c.blurb}</Caption>
                <span className="cat-row__thumb" aria-hidden="true">
                  {rep && <img src={rep.thumbnail} alt="" loading="lazy" />}
                </span>
                <span className="cat-row__meta">
                  <Caption>{count} works</Caption>
                  <Icon name="arrowRight" size={18} className="cat-row__arrow" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
