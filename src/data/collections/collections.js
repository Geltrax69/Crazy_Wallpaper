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

export const COLLECTIONS = [
  { id: 'abstract', slug: 'abstract', name: 'Abstract', tagline: 'Form without a subject', description: 'Shapes that refuse to explain themselves. For screens that need a little mystery.', accent: 'var(--accent-red)', artwork: abstractArt },
  { id: 'nocturnal', slug: 'nocturnal', name: 'Nocturnal', tagline: 'After dark', description: 'Wallpapers for night owls. Deep tones that keep your screen calm when the room goes quiet.', accent: 'var(--accent-blue)', artwork: nocturnalArt },
  { id: 'architecture', slug: 'architecture', name: 'Architecture', tagline: 'Walls, light, geometry', description: 'Concrete, shadow and structure. The built world reduced to its essentials.', accent: 'var(--accent-green)', artwork: architectureArt },
  { id: 'organic', slug: 'organic', name: 'Organic', tagline: 'The outside, edited', description: 'Botanical light and living texture. A small garden for your desktop.', accent: 'var(--accent-green)', artwork: organicArt },
  { id: 'minimal', slug: 'minimal', name: 'Minimal', tagline: 'Less, but better', description: 'Vast quiet spaces. For people whose desktops are already full.', accent: 'var(--accent-yellow)', artwork: minimalArt },
  { id: 'surreal', slug: 'surreal', name: 'Surreal', tagline: 'Dreams with good lighting', description: 'Impossible scenes, rendered calmly. A gentle wrongness for your lock screen.', accent: 'var(--accent-lavender)', artwork: surrealArt },
  { id: 'texture', slug: 'texture', name: 'Texture', tagline: 'Surfaces you can feel', description: 'Plaster, paper, linen. Analog warmth for a glass rectangle.', accent: 'var(--accent-orange)', artwork: textureArt },
  { id: 'retro', slug: 'retro', name: 'Retro', tagline: 'The past, color-corrected', description: 'Sun-faded palettes and print grain. Nostalgia without the dust.', accent: 'var(--accent-orange)', artwork: retroArt },
  { id: 'monochrome', slug: 'monochrome', name: 'Monochrome', tagline: 'Black, white, conviction', description: 'Ink and paper. The strongest statement is sometimes the quietest.', accent: 'var(--ink)', artwork: monochromeArt },
  { id: 'color-studies', slug: 'color-studies', name: 'Color Studies', tagline: 'Fields of feeling', description: 'Slow gradients of considered color. Chromotherapy for your workspace.', accent: 'var(--accent-blue)', artwork: colorStudyArt },
  { id: '3d', slug: '3d', name: '3D', tagline: 'Objects that never existed', description: 'Soft renders and impossible materials. Sculpture for flat screens.', accent: 'var(--accent-lavender)', artwork: threedArt },
  { id: 'photographic', slug: 'photographic', name: 'Photographic', tagline: 'The world, as found', description: 'Quiet landscapes and found moments. Windows where there are none.', accent: 'var(--accent-blue)', artwork: photographicArt },
]

export function getCollection(slug) {
  return COLLECTIONS.find((c) => c.slug === slug)
}
