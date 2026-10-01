import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { WALLPAPERS, getWallpaper } from '../../data/wallpapers/wallpapers'

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — state still works in memory */
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cartIds, setCartIds] = useState(() => load('papier-cart', []))
  const [favoriteIds, setFavoriteIds] = useState(() => load('papier-favorites', []))
  const [orders, setOrders] = useState(() => load('papier-orders', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [lastAddedId, setLastAddedId] = useState(null)

  useEffect(() => save('papier-cart', cartIds), [cartIds])
  useEffect(() => save('papier-favorites', favoriteIds), [favoriteIds])
  useEffect(() => save('papier-orders', orders), [orders])

  const cart = useMemo(
    () => cartIds.map(getWallpaper).filter(Boolean),
    [cartIds]
  )
  const favorites = useMemo(
    () => favoriteIds.map(getWallpaper).filter(Boolean),
    [favoriteIds]
  )
  const subtotal = useMemo(() => cart.reduce((s, w) => s + w.price, 0), [cart])

  function addToCart(id) {
    setCartIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    setLastAddedId(id)
    window.setTimeout(() => setLastAddedId((cur) => (cur === id ? null : cur)), 1600)
  }
  function removeFromCart(id) {
    setCartIds((prev) => prev.filter((x) => x !== id))
  }
  function clearCart() {
    setCartIds([])
  }
  function toggleFavorite(id) {
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  function placeOrder({ email, items }) {
    const order = {
      id: `ord_${Date.now().toString(36)}`,
      email,
      items: items.map((w) => ({ id: w.id, slug: w.slug, title: w.title, price: w.price, image: w.image })),
      total: items.reduce((s, w) => s + w.price, 0),
      purchasedAt: new Date().toISOString(),
    }
    setOrders((prev) => [order, ...prev])
    clearCart()
    return order
  }

  const value = {
    cart, cartIds, cartOpen, setCartOpen, lastAddedId,
    addToCart, removeFromCart, clearCart,
    cartCount: cart.length, subtotal,
    favorites, favoriteIds, toggleFavorite,
    isFavorite: (id) => favoriteIds.includes(id),
    inCart: (id) => cartIds.includes(id),
    orders, placeOrder,
    catalog: WALLPAPERS,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
