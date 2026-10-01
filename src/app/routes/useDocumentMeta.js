import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE } from '../../lib/constants/site'

const TITLES = {
  '/': `${SITE.name} — Wallpapers for unusual spaces`,
  '/shop': `Archive — ${SITE.name}`,
  '/collections': `Collections — ${SITE.name}`,
  '/categories': `Categories — ${SITE.name}`,
  '/search': `Search — ${SITE.name}`,
  '/cart': `Cart — ${SITE.name}`,
  '/checkout': `Checkout — ${SITE.name}`,
  '/downloads': `Downloads — ${SITE.name}`,
  '/account': `Account — ${SITE.name}`,
  '/favorites': `Saved — ${SITE.name}`,
  '/about': `About — ${SITE.name}`,
  '/license': `License — ${SITE.name}`,
  '/faq': `FAQ — ${SITE.name}`,
  '/contact': `Contact — ${SITE.name}`,
}

export function useDocumentMeta(dynamicTitle, description) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = dynamicTitle || TITLES[pathname] || SITE.name
    const tag = document.querySelector('meta[name="description"]')
    if (tag && description) tag.setAttribute('content', description)
    window.scrollTo(0, 0)
  }, [pathname, dynamicTitle, description])
}

/** Inject a JSON-LD script tag for the current page; removed on unmount. */
export function useJsonLd(data) {
  const key = JSON.stringify(data)
  useEffect(() => {
    if (!data) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.textContent = key
    document.head.appendChild(el)
    return () => { document.head.removeChild(el) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
