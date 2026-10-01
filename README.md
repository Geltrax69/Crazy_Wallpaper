# Papier — Wallpapers for unusual spaces

A digital wallpaper storefront: an art-directed, editorial, minimal shop for
buying and downloading original wallpapers. White canvas, oversized Junicode
typography, floating artwork, restrained color.

> Repository: `Geltrax69/Crazy_Wallpaper` · Live brand: **Papier**

## Features

- **Catalog** — 24 original wallpapers across 10 categories and 12 collections,
  with 12 bespoke artworks, tags, colors, and style metadata
- **Storefront pages** — Home, Shop, Categories, Collections, Product detail,
  Search, Cart, Checkout, Downloads, Favorites, About, License, FAQ, Contact
- **Cart & favorites** — persistent via `localStorage` (`papier-cart`,
  `papier-favorites`, `papier-orders`); digital products are quantity-one
- **Search & filtering** — across title, collection, category, tags, colors,
  and style; collection / tone / price filters with sorting on Shop
- **Checkout flow** — service abstraction (`checkoutService`) ready for a real
  payment backend; orders feed the Downloads page (`downloadService`)
- **Design details** — Junicode throughout (Regular, Italic, Bold);
  light/dark themes with system detection and persistence; reveal-on-scroll;
  product lightbox; sticky mobile buy bar; mobile bottom tab bar
- **Quality bars** — semantic HTML, skip link, visible focus, keyboard
  navigation, alt text, `prefers-reduced-motion` support; lazy-loaded imagery
  with shimmer placeholders; SEO meta, Open Graph, and product structured data

## Tech stack

- React 19 + Vite 8 + `react-router-dom` 7
- No UI framework; hand-built CSS with design tokens
- `oxlint` for linting

## Project structure

```
src/
  app/            # App shell, routes, layouts, providers (store, theme)
  components/     # shared UI: gallery, navigation, typography, animation
  data/           # catalog data: wallpapers, categories, collections
  features/       # feature-owned pages: home, shop, products, cart,
                  #   checkout, downloads, favorites, search, …
  styles/         # global tokens and base styles
  assets/         # 12 original wallpaper artworks
public/fonts/     # Junicode WOFF2 (Regular, Italic, Bold, BoldItalic)
```

State lives in a single `StoreProvider` (React context). The catalog is
data-driven from `src/data/`; services under each feature
(`services/checkoutService.js`, `services/downloadService.js`) are the seam
for future backend / payment / auth integration.

## Getting started

```bash
npm install
npm run dev      # local dev server
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Deployment (GitHub Pages)

The site is served from the `gh-pages` branch under the `/Crazy_Wallpaper/`
subpath. The router picks up its basename from `import.meta.env.BASE_URL`,
and `postbuild` copies `dist/index.html` to `dist/404.html` so client-side
routes resolve on Pages.

```bash
npx vite build --base=/Crazy_Wallpaper/
# push dist/ to the gh-pages branch (use a git worktree; never delete .git)
```

## Notes

- Fonts are self-hosted in `public/fonts/`; artwork in `src/assets/wallpapers/`
  is bundled and hashed by Vite.
- Theme preference persists under `papier-theme`; cart, favorites, and orders
  persist under `papier-cart`, `papier-favorites`, `papier-orders`.
