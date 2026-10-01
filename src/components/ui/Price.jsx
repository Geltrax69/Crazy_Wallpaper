import { formatPrice } from '../../lib/utils/format'
import { cx } from '../../lib/utils/format'

export default function Price({ value, className, large }) {
  return (
    <span className={cx('t-tabular', className)} style={large ? { fontSize: '1.5rem' } : undefined}>
      {formatPrice(value)}
    </span>
  )
}
