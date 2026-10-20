import {NumberField as BaseNumberField} from '@base-ui/react/number-field'

import {cx, type StyledProps} from '#/lib/cx'

export function NumberField({
  className,
  ...props
}: StyledProps<typeof BaseNumberField.Root>) {
  return (
    <BaseNumberField.Root {...props}>
      <BaseNumberField.Input
        className={cx(
          'w-[5ch] rounded-sm border border-line-strong bg-bg px-2 py-1 text-right text-base text-ink',
          'focus:border-ink focus:outline-none',
          className,
        )}
      />
    </BaseNumberField.Root>
  )
}
