import { Link } from 'react-router-dom'
import { cx } from '../../lib/utils/format'
import './button.css'

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const cls = cx('btn', `btn--${variant}`, `btn--${size}`, className)
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button type="button" className={cls} {...rest}>{children}</button>
}
