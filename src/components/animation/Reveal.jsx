import { useLayoutEffect, useRef } from 'react'
import { cx } from '../../lib/utils/format'

/* Reveal-on-scroll wrapper. Stagger via `delay` (ms).
   Content renders visible by default; only elements that are actually
   below the fold at mount get the hidden state and fade in on scroll.
   Above-the-fold content is never hidden, so first paint is instant. */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.94 && rect.bottom > -40
    if (reduce || inView) {
      el.classList.add('is-visible')
      return
    }
    el.classList.add('reveal-wait')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('reveal-wait')
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cx('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
