import { Link } from 'react-router-dom'
import { useStore } from '../../app/providers/StoreProvider'
import { getCategory } from '../../data/categories/categories'
import { getCollection } from '../../data/collections/collections'
import { BodySm, Caption } from '../typography/Type'
import Price from '../ui/Price'
import Icon from '../ui/Icon'
import SmartImage from '../ui/SmartImage'
import { cx } from '../../lib/utils/format'
import './product-card.css'

export default function ProductCard({ wallpaper: w, ratio = '4/3', className }) {
  const { addToCart, removeFromCart, inCart, lastAddedId, toggleFavorite, isFavorite } = useStore()
  const fav = isFavorite(w.id)
  const added = inCart(w.id)
  const justAdded = lastAddedId === w.id
  const category = getCategory(w.category)
  const collection = getCollection(w.collection)

  return (
    <article className={cx('p-card', className)}>
      <div className="p-card__media" style={{ '--card-ratio': ratio }}>
        <Link to={`/wallpaper/${w.slug}`} data-cursor="View" aria-label={`View ${w.title}`}>
          <SmartImage src={w.thumbnail} alt={w.title} />
        </Link>
        <div className="p-card__veil" aria-hidden="true" />
        <button
          className={cx('p-card__fav', fav && 'is-active')}
          aria-label={fav ? `Remove ${w.title} from saved` : `Save ${w.title}`}
          aria-pressed={fav}
          onClick={() => toggleFavorite(w.id)}
        >
          <Icon name="heart" size={17} filled={fav} />
        </button>
        <span className="p-card__view" aria-hidden="true">
          View wallpaper <Icon name="arrowRight" size={15} />
        </span>
        <button
          className={cx('p-card__add', (added || justAdded) && 'is-added')}
          data-cursor={added ? 'Remove' : 'Add'}
          onClick={() => (added ? removeFromCart(w.id) : addToCart(w.id))}
          aria-live="polite"
          aria-label={added ? `Remove ${w.title} from cart` : `Add ${w.title} to cart`}
          title={added ? 'Remove from cart' : 'Add to cart'}
        >
          {added ? (
            justAdded ? (
              <><Icon name="check" size={15} /> Added to cart</>
            ) : (
              <><Icon name="close" size={15} /> Remove</>
            )
          ) : (
            <>Add to cart <Icon name="arrowRight" size={15} /></>
          )}
        </button>
      </div>
      <div className="p-card__meta">
        <div>
          <h3 className="p-card__title">
            <Link to={`/wallpaper/${w.slug}`}>{w.title}</Link>
          </h3>
          <Caption className="p-card__sub">
            {category?.name} · {collection?.name}
          </Caption>
        </div>
        <BodySm className="p-card__price"><Price value={w.price} /></BodySm>
      </div>
    </article>
  )
}
