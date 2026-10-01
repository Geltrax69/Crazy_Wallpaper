import abstractArt from '../../assets/wallpapers/abstract-01.jpg'
import nocturnalArt from '../../assets/wallpapers/nocturnal-01.jpg'
import architectureArt from '../../assets/wallpapers/architecture-01.jpg'
import organicArt from '../../assets/wallpapers/organic-01.jpg'
import minimalArt from '../../assets/wallpapers/minimal-01.jpg'
import surrealArt from '../../assets/wallpapers/surreal-01.jpg'
import textureArt from '../../assets/wallpapers/texture-01.jpg'
import retroArt from '../../assets/wallpapers/retro-01.jpg'
import monochromeArt from '../../assets/wallpapers/monochrome-01.jpg'
import colorStudyArt from '../../assets/wallpapers/color-study-01.jpg'
import threedArt from '../../assets/wallpapers/threed-01.jpg'
import photographicArt from '../../assets/wallpapers/photographic-01.jpg'

const BASE = {
  resolutions: ['4K', '5K', '8K', 'Ultrawide', 'Mobile', 'Tablet'],
  aspectRatios: ['16:9', '16:10', '21:9', '9:16', '4:3'],
  supportedDevices: ['Desktop', 'Laptop', 'Tablet', 'Mobile', 'Ultrawide monitor'],
  fileFormats: ['JPG', 'PNG'],
}

function make(entry) {
  return {
    ...BASE,
    thumbnail: entry.image,
    preview: entry.image,
    images: [entry.image],
    ...entry,
  }
}

export const WALLPAPERS = [
  make({ id: 'w01', slug: 'tender-machines', title: 'Tender Machines', description: 'Soft biomorphic forms in warm plaster, interrupted by a single terracotta curve. Like a machine dreaming of the sea.', price: 28, category: 'abstract', collection: 'abstract', tags: ['biomorphic', 'warm', 'sculptural', 'calm'], image: abstractArt, featured: true, isNew: true, popularity: 96, colors: ['#f2ede3', '#b0552f', '#e4d9c8'], createdAt: '2026-09-28' }),
  make({ id: 'w02', slug: 'plaster-poem', title: 'Plaster Poem', description: 'A quieter take on the same plaster study — all breath, no punctuation.', price: 22, category: 'texture', collection: 'abstract', tags: ['plaster', 'neutral', 'soft'], image: abstractArt, popularity: 71, colors: ['#f2ede3', '#e4d9c8'], createdAt: '2026-08-14' }),
  make({ id: 'w03', slug: 'night-unfinished', title: 'Night, Unfinished', description: 'A charcoal sky with the stars left in. For working late without feeling alone.', price: 26, category: 'minimal', collection: 'nocturnal', tags: ['night', 'dark', 'stars', 'calm'], image: nocturnalArt, featured: true, popularity: 93, colors: ['#141311', '#2b2925', '#d8d4c9'], createdAt: '2026-09-02' }),
  make({ id: 'w04', slug: 'small-hours', title: 'Small Hours', description: 'The moon, doing very little, very beautifully. A nocturne for your lock screen.', price: 24, category: 'photography', collection: 'nocturnal', tags: ['moon', 'night', 'minimal'], image: nocturnalArt, isNew: true, popularity: 88, colors: ['#141311', '#d8d4c9'], createdAt: '2026-09-30' }),
  make({ id: 'w05', slug: 'concrete-pastoral', title: 'Concrete Pastoral', description: 'Daylight rakes across a curved concrete wall. Brutalism, but make it gentle.', price: 32, category: 'architecture', collection: 'architecture', tags: ['concrete', 'brutalist', 'light', 'shadow'], image: architectureArt, featured: true, popularity: 91, colors: ['#e8e4da', '#b9b2a4', '#6f6a61'], createdAt: '2026-07-19' }),
  make({ id: 'w06', slug: 'wall-study-ii', title: 'Wall Study II', description: 'One wall, one shadow line, nothing else to argue about.', price: 20, category: 'minimal', collection: 'architecture', tags: ['minimal', 'shadow', 'geometry'], image: architectureArt, popularity: 64, colors: ['#e8e4da', '#6f6a61'], createdAt: '2026-06-30' }),
  make({ id: 'w07', slug: 'morning-through-leaves', title: 'Morning, Through Leaves', description: 'Botanical shadows on cream linen. The closest thing to a garden your desktop will get.', price: 24, category: 'nature', collection: 'organic', tags: ['botanical', 'light', 'morning', 'linen'], image: organicArt, isNew: true, popularity: 85, colors: ['#f4f1e6', '#8a9b7e', '#d9d2bd'], createdAt: '2026-09-25' }),
  make({ id: 'w08', slug: 'herbarium-shadow', title: 'Herbarium Shadow', description: 'Pressed-leaf silhouettes, soft as a held breath.', price: 18, category: 'nature', collection: 'organic', tags: ['leaves', 'shadow', 'soft'], image: organicArt, popularity: 58, colors: ['#f4f1e6', '#8a9b7e'], createdAt: '2026-05-11' }),
  make({ id: 'w09', slug: 'one-line', title: 'One Line', description: 'A single horizon in an ocean of off-white. For desktops that are already full.', price: 16, category: 'minimal', collection: 'minimal', tags: ['horizon', 'negative space', 'zen'], image: minimalArt, popularity: 82, colors: ['#faf9f6', '#cfc9bc'], createdAt: '2026-08-02' }),
  make({ id: 'w10', slug: 'almost-nothing', title: 'Almost Nothing', description: 'Even less than One Line, if you can believe it.', price: 14, category: 'minimal', collection: 'minimal', tags: ['minimal', 'white', 'quiet'], image: minimalArt, popularity: 49, colors: ['#faf9f6'], createdAt: '2026-04-18' }),
  make({ id: 'w11', slug: 'the-floating-arch', title: 'The Floating Arch', description: 'A pale stone arch, hovering in a hazy sky, unbothered by physics. Our most asked-about piece.', price: 34, category: 'surreal', collection: 'surreal', tags: ['floating', 'stone', 'dream', 'sky'], image: surrealArt, featured: true, isNew: true, popularity: 98, colors: ['#efe9db', '#d8cdb4', '#a89a7e'], createdAt: '2026-09-29' }),
  make({ id: 'w12', slug: 'dream-of-stone', title: 'Dream of Stone', description: 'The arch again, from further away, in softer weather.', price: 28, category: 'surreal', collection: 'surreal', tags: ['surreal', 'stone', 'haze'], image: surrealArt, popularity: 76, colors: ['#efe9db', '#d8cdb4'], createdAt: '2026-07-07' }),
  make({ id: 'w13', slug: 'hand-of-the-maker', title: 'Hand of the Maker', description: 'Trowel arcs in warm grey plaster, caught by side light. You can almost feel it.', price: 20, category: 'texture', collection: 'texture', tags: ['plaster', 'tactile', 'craft'], image: textureArt, popularity: 67, colors: ['#ddd6c8', '#b9b0a0'], createdAt: '2026-06-12' }),
  make({ id: 'w14', slug: 'limewash', title: 'Limewash', description: 'Cloudy mineral washes, layered by hand. Analog warmth for a glass rectangle.', price: 18, category: 'texture', collection: 'texture', tags: ['limewash', 'mineral', 'warm'], image: textureArt, isNew: true, popularity: 79, colors: ['#e5dfd2', '#c9c0ae'], createdAt: '2026-09-20' }),
  make({ id: 'w15', slug: 'sun-1974', title: 'Sun, 1974', description: 'A mustard sunburst rising off aged cream paper. Nostalgia without the dust.', price: 26, category: 'retro', collection: 'retro', tags: ['sunburst', '70s', 'mustard', 'print'], image: retroArt, featured: true, popularity: 89, colors: ['#f0e8d2', '#c97e4b', '#a8762f'], createdAt: '2026-08-22' }),
  make({ id: 'w16', slug: 'amber-afternoon', title: 'Amber Afternoon', description: 'Burnt orange bands fading into paper grain. Golden hour, permanently.', price: 22, category: 'retro', collection: 'retro', tags: ['retro', 'orange', 'grain'], image: retroArt, popularity: 62, colors: ['#f0e8d2', '#c97e4b'], createdAt: '2026-05-29' }),
  make({ id: 'w17', slug: 'ink-weather', title: 'Ink Weather', description: 'One bold ink stroke with dry-brush edges, like weather crossing paper.', price: 30, category: 'monochrome', collection: 'monochrome', tags: ['ink', 'gestural', 'sumi-e'], image: monochromeArt, isNew: true, popularity: 87, colors: ['#ffffff', '#1b1814'], createdAt: '2026-09-27' }),
  make({ id: 'w18', slug: 'black-water', title: 'Black Water', description: 'Ink pooling dark at the edges. The strongest statement is sometimes the quietest.', price: 24, category: 'abstract', collection: 'monochrome', tags: ['ink', 'black', 'abstract'], image: monochromeArt, popularity: 73, colors: ['#ffffff', '#1b1814', '#6f6a61'], createdAt: '2026-07-15' }),
  make({ id: 'w19', slug: 'blue-hour-held', title: 'Blue Hour, Held', description: 'Dusty blue over pale lavender, the exact minute the day changes its mind.', price: 28, category: 'abstract', collection: 'color-studies', tags: ['blue', 'gradient', 'calm', 'rothko'], image: colorStudyArt, featured: true, popularity: 94, colors: ['#7d8ca3', '#a49ac2', '#e9e6de'], createdAt: '2026-08-30' }),
  make({ id: 'w20', slug: 'lavender-field-notes', title: 'Lavender Field Notes', description: 'The lower half of Blue Hour, annotated in light.', price: 22, category: 'minimal', collection: 'color-studies', tags: ['lavender', 'soft', 'field'], image: colorStudyArt, popularity: 66, colors: ['#a49ac2', '#e9e6de'], createdAt: '2026-06-05' }),
  make({ id: 'w21', slug: 'soft-assembly', title: 'Soft Assembly', description: 'Inflated porcelain forms piled gently in studio light. Sculpture for flat screens.', price: 32, category: '3d', collection: '3d', tags: ['render', 'porcelain', 'soft', 'sculpture'], image: threedArt, isNew: true, popularity: 84, colors: ['#f4f2ec', '#d5d2c9', '#9aa0a8'], createdAt: '2026-09-22' }),
  make({ id: 'w22', slug: 'porcelain-drift', title: 'Porcelain Drift', description: 'The same soft forms, caught mid-drift. Weightless and unbothered.', price: 26, category: '3d', collection: '3d', tags: ['3d', 'white', 'floating'], image: threedArt, popularity: 61, colors: ['#f4f2ec', '#d5d2c9'], createdAt: '2026-05-17' }),
  make({ id: 'w23', slug: 'dune-first-light', title: 'Dune, First Light', description: 'A single ridge of sand dividing earth from fog. A window where there are none.', price: 34, category: 'photography', collection: 'photographic', tags: ['dune', 'desert', 'mist', 'dawn'], image: photographicArt, featured: true, popularity: 92, colors: ['#e9e2d4', '#c9bfa9', '#f6f4ee'], createdAt: '2026-08-08' }),
  make({ id: 'w24', slug: 'fog-line', title: 'Fog Line', description: 'Where the dune dissolves into white. Photographed at the edge of visibility.', price: 28, category: 'nature', collection: 'photographic', tags: ['fog', 'minimal', 'landscape'], image: photographicArt, popularity: 70, colors: ['#f6f4ee', '#e9e2d4'], createdAt: '2026-06-21' }),
]

export function getWallpaper(idOrSlug) {
  return WALLPAPERS.find((w) => w.slug === idOrSlug || w.id === idOrSlug)
}

export function searchWallpapers(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return WALLPAPERS.filter((w) => {
    const hay = [w.title, w.description, w.category, w.collection, ...w.tags, ...w.colors]
      .join(' ')
      .toLowerCase()
    return q.split(/\s+/).every((term) => hay.includes(term))
  }).sort((a, b) => b.popularity - a.popularity)
}
