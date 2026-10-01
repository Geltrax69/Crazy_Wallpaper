import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../app/providers/StoreProvider'
import { NAV_LINKS } from '../../lib/constants/site'
import { Meta } from '../typography/Type'
import Icon from '../ui/Icon'
import './header.css'

export default function Header() {
  const { cartCount, theme, toggleTheme } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="wordmark" aria-label="Papier home">
            Papier<em>.</em>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="icon-btn"
              aria-label={themeLabel}
              title={themeLabel}
              onClick={toggleTheme}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <button className="icon-btn" aria-label="Search" title="Search" onClick={() => navigate('/search')}>
              <Icon name="search" />
            </button>
            <button className="icon-btn icon-btn--account" aria-label="Account" title="Account" onClick={() => navigate('/account')}>
              <Icon name="user" />
            </button>
            <button className="icon-btn" aria-label="Saved wallpapers" title="Saved" onClick={() => navigate('/favorites')}>
              <Icon name="heart" />
            </button>
            <button className="icon-btn" aria-label={`Cart, ${cartCount} items`} title="Cart" onClick={() => navigate('/cart')}>
              <Icon name="bag" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="icon-btn menu-btn" aria-label="Open menu" title="Menu" onClick={() => setMenuOpen(true)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <nav className="tab-bar" aria-label="Primary">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')} aria-label="Home">
          <Icon name="home" size={22} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => (isActive ? 'is-active' : '')} aria-label="Shop">
          <Icon name="grid" size={22} />
          <span>Shop</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => (isActive ? 'is-active' : '')} aria-label="Search">
          <Icon name="search" size={22} />
          <span>Search</span>
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'is-active' : '')} aria-label="Saved">
          <Icon name="heart" size={22} />
          <span>Saved</span>
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'is-active' : '')} aria-label={`Cart, ${cartCount} items`}>
          <Icon name="bag" size={22} />
          <span>Cart</span>
          {cartCount > 0 && <span className="tab-bar__count">{cartCount}</span>}
        </NavLink>
      </nav>

      <div className={`mobile-nav${menuOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!menuOpen}>
        <div className="mobile-nav__top">
          <span className="wordmark">Papier<em>.</em></span>
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav className="mobile-nav__links" aria-label="Mobile">
          {[{ label: 'Home', to: '/' }, ...NAV_LINKS].map((l, i) => (
            <Link key={l.to} to={l.to} style={{ transitionDelay: `${80 + i * 60}ms` }}>
              {l.label}
              <span className="t-meta">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-nav__foot">
          <Meta>Archive Vol. 01</Meta>
          <Meta>2026</Meta>
        </div>
      </div>
    </>
  )
}
