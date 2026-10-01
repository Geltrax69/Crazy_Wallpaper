import { Link } from 'react-router-dom'
import { H2, Meta } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Reveal from '../../../components/animation/Reveal'
import Icon from '../../../components/ui/Icon'
import { FEATURED } from '../data/home'

const RATIOS = ['16/11', '3/4', '4/3', '16/10', '1/1', '16/9']

export default function FeaturedWorks() {
  return (
    <section className="section" aria-label="Featured wallpapers">
      <div className="container">
        <Reveal>
          <div className="sec-head">
            <H2 as="h2">Selected <em className="t-italic">works</em></H2>
            <Link to="/shop" className="sec-link">
              View the archive <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="featured-grid">
          {FEATURED.map((w, i) => (
            <Reveal key={w.id} delay={(i % 3) * 90}>
              <ProductCard wallpaper={w} ratio={RATIOS[i % RATIOS.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
