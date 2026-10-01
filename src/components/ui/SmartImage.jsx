import { useState } from 'react'
import { cx } from '../../lib/utils/format'

/* Image with a shimmer placeholder: reserves space with a warm wash,
   fades the photo in once loaded. */
export default function SmartImage({ src, alt = '', eager = false, className, imgClassName, ...rest }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <span className={cx('img-ph', loaded && 'is-loaded', className)}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={imgClassName}
        {...rest}
      />
    </span>
  )
}
