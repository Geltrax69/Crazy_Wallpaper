export const CATEGORIES = [
  { id: 'abstract', slug: 'abstract', name: 'Abstract', index: '01', blurb: 'Form without a subject.' },
  { id: 'architecture', slug: 'architecture', name: 'Architecture', index: '02', blurb: 'Walls, light, geometry.' },
  { id: 'nature', slug: 'nature', name: 'Nature', index: '03', blurb: 'The outside, edited.' },
  { id: 'surreal', slug: 'surreal', name: 'Surreal', index: '04', blurb: 'Dreams with good lighting.' },
  { id: 'minimal', slug: 'minimal', name: 'Minimal', index: '05', blurb: 'Less, but better.' },
  { id: 'texture', slug: 'texture', name: 'Texture', index: '06', blurb: 'Surfaces you can feel.' },
  { id: 'photography', slug: 'photography', name: 'Photography', index: '07', blurb: 'The world, as found.' },
  { id: '3d', slug: '3d', name: '3D', index: '08', blurb: 'Objects that never existed.' },
  { id: 'retro', slug: 'retro', name: 'Retro', index: '09', blurb: 'The past, color-corrected.' },
  { id: 'monochrome', slug: 'monochrome', name: 'Monochrome', index: '10', blurb: 'Black, white, and conviction.' },
]

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug)
}
