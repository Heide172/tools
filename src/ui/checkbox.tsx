import {Checkbox as BaseCheckbox} from '@base-ui/react/checkbox'

import {cx, type StyledProps} from '#/lib/cx'

export function Checkbox({
  className,
  ...props
}: StyledProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      className={cx(
        'flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-line-strong bg-bg',
        'data-[checked]:border-ink data-[checked]:bg-ink',
        'focus-visible:shadow-focus focus-visible:outline-none',
        className,
      )}
      {...props}>
      <BaseCheckbox.Indicator className="text-bg">
        <svg
          viewBox="0 0 10 10"
          className="size-2.5 fill-none stroke-current stroke-[1.8]">
          <path d="M1.5 5.2 4 7.5 8.5 2.5" />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}
