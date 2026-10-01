import { WALLPAPERS } from '../../../data/wallpapers/wallpapers'
import { COLLECTIONS } from '../../../data/collections/collections'

export const HERO_FLOATS = [
  { id: 'w11', depth: 34, className: 'hero-float--a', ratio: '4/3' },
  { id: 'w03', depth: 20, className: 'hero-float--b', ratio: '3/4' },
  { id: 'w19', depth: 48, className: 'hero-float--c', ratio: '1/1' },
]

export function wallpaperById(id) {
  return WALLPAPERS.find((w) => w.id === id)
}

export const FEATURED = WALLPAPERS.filter((w) => w.featured)
export const NEW_ARRIVALS = WALLPAPERS.filter((w) => w.isNew)
export const COLLECTIONS_TEASER = COLLECTIONS.slice(0, 6)
