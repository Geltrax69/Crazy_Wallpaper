/* Download service — for now the purchased artwork files themselves
   are the deliverables. Later this can sign URLs from a CDN. */

export function downloadArtwork(wallpaper, resolution = '4K') {
  const a = document.createElement('a')
  a.href = wallpaper.preview
  a.download = `${wallpaper.slug}-${resolution.toLowerCase()}.jpg`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export function downloadAll(order) {
  order.items.forEach((item, i) => {
    window.setTimeout(() => {
      const w = { slug: item.slug, preview: item.image }
      downloadArtwork(w)
    }, i * 600)
  })
}
