import {Field as BaseField} from '@base-ui/react/field'

import {cx, type StyledProps} from '#/lib/cx'

export function FieldRoot({
  className,
  ...props
}: StyledProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      className={cx('flex flex-col gap-1', className)}
      {...props}
    />
  )
}

export function FieldLabel({
  className,
  ...props
}: StyledProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={cx('text-xs text-ink-dim', className)}
      {...props}
    />
  )
}

export function FieldError({
  className,
  ...props
}: StyledProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      className={cx('text-xs text-danger', className)}
      {...props}
    />
  )
}
