import { cx } from '../../lib/utils/format'
import './badge.css'

export default function Badge({ children, tone = 'default', className }) {
  return <span className={cx('badge', `badge--${tone}`, className)}>{children}</span>
}
