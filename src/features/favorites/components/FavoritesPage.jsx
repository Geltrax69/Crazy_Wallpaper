import { Link } from 'react-router-dom'
import { useStore } from '../../../app/providers/StoreProvider'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import ProductCard from '../../../components/gallery/ProductCard'
import Button from '../../../components/ui/Button'
import Price from '../../../components/ui/Price'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import '../favorites.css'

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useStore()
  useDocumentMeta('Saved — Papier', 'Wallpapers you saved for later.')

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>
            {favorites.length} {favorites.length === 1 ? 'piece' : 'pieces'}
          </Meta>
          <H1 as="h1">Saved for <em>later</em></H1>
          <Body style={{ maxWidth: '52ch', marginTop: 'var(--space-md)', color: 'var(--muted)' }}>
            A quiet corner for the ones you can’t stop thinking about.
          </Body>
        </Reveal>
      </header>

      {favorites.length === 0 ? (
        <Reveal>
          <div className="empty-state">
            <Body>Nothing saved yet. Tap the heart on any wallpaper to keep it here.</Body>
            <Button to="/shop">Explore the archive</Button>
          </div>
        </Reveal>
      ) : (
        <div className="favorites-grid">
          {favorites.map((w, i) => (
            <Reveal key={w.id} delay={(i % 3) * 60}>
              <ProductCard wallpaper={w} ratio={i % 2 === 0 ? '4/5' : '4/3'} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
