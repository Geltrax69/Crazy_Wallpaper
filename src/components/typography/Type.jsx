import { cx } from '../../lib/utils/format'

function T({ as: Tag = 'p', variant = 't-body', className, italic, children, ...rest }) {
  return (
    <Tag className={cx(variant, italic && 't-italic', className)} {...rest}>
      {children}
    </Tag>
  )
}

export const Display = (p) => <T as="h1" variant="t-display" {...p} />
export const H1 = (p) => <T as="h1" variant="t-h1" {...p} />
export const H2 = (p) => <T as="h2" variant="t-h2" {...p} />
export const H3 = (p) => <T as="h3" variant="t-h3" {...p} />
export const Lead = (p) => <T as="p" variant="t-lead" {...p} />
export const Body = (p) => <T as="p" variant="t-body" {...p} />
export const BodySm = (p) => <T as="p" variant="t-body-sm" {...p} />
export const Caption = (p) => <T as="p" variant="t-caption" {...p} />
export const Meta = (p) => <T as="p" variant="t-meta" {...p} />
