import {Button as BaseButton} from '@base-ui/react/button'

import {cx, type StyledProps} from '#/lib/cx'

export function Button({
  className,
  variant = 'solid',
  ...props
}: StyledProps<typeof BaseButton> & {variant?: 'solid' | 'ghost'}) {
  return (
    <BaseButton
      className={cx(
        'cursor-pointer rounded-sm border border-ink px-3.5 py-2 text-base',
        'focus-visible:shadow-focus focus-visible:outline-none',
        variant === 'solid' ? 'bg-ink text-bg' : 'bg-transparent text-ink',
        className,
      )}
      {...props}
    />
  )
}
