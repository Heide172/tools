import {Slider as BaseSlider} from '@base-ui/react/slider'

import {cx, type StyledProps} from '#/lib/cx'

export function Slider({
  className,
  ...props
}: StyledProps<typeof BaseSlider.Root<number>>) {
  return (
    <BaseSlider.Root className={cx('flex-1', className)} {...props}>
      <BaseSlider.Control className="flex h-5 w-full cursor-pointer touch-none items-center">
        <BaseSlider.Track className="relative h-0.5 w-full bg-line">
          <BaseSlider.Indicator className="bg-ink" />
          <BaseSlider.Thumb className="size-3.5 rounded-sm bg-ink focus-visible:shadow-focus focus-visible:outline-none" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
