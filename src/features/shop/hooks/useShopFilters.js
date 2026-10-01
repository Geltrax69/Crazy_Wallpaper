import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Popular' },
  { id: 'price-asc', label: 'Price · low to high' },
  { id: 'price-desc', label: 'Price · high to low' },
]

function toneOf(w) {
  const hexes = w.colors.join(' ').toLowerCase()
  if (/#141311|#1b1814/.test(hexes)) return 'dark'
  if (/7d8ca3|a49ac2|8a9b7e|9aa0a8/.test(hexes)) return 'cool'
  if (/b0552f|c97e4b|a8762f|d8c48a/.test(hexes)) return 'warm'
  return 'light'
}

export function useShopFilters(wallpapers) {
  const [params, setParams] = useSearchParams()

  const category = params.get('category') || 'all'
  const collection = params.get('collection') || 'all'
  const tone = params.get('tone') || 'all'
  const maxPrice = params.get('maxPrice') || 'any'
  const sort = params.get('sort') || 'featured'
  const onlyNew = params.get('filter') === 'new'

  const results = useMemo(() => {
    let list = [...wallpapers]
    if (onlyNew) list = list.filter((w) => w.isNew)
    if (category !== 'all') list = list.filter((w) => w.category === category)
    if (collection !== 'all') list = list.filter((w) => w.collection === collection)
    if (tone !== 'all') list = list.filter((w) => toneOf(w) === tone)
    if (maxPrice !== 'any') list = list.filter((w) => w.price <= Number(maxPrice))

    switch (sort) {
      case 'newest': list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break
      case 'popular': list.sort((a, b) => b.popularity - a.popularity); break
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      default: list.sort((a, b) => (b.featured - a.featured) || (b.popularity - a.popularity))
    }
    return list
  }, [wallpapers, category, collection, tone, maxPrice, sort, onlyNew])

  function set(key, value) {
    const next = new URLSearchParams(params)
    if (!value || value === 'all' || value === 'any' || value === 'featured') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  return { results, category, collection, tone, maxPrice, sort, onlyNew, set, SORTS }
}
