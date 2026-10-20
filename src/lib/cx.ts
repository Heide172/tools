import {type ComponentProps, type ElementType} from 'react'

export function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

// Base UI принимает className и строкой, и функцией от состояния; обёртки
// оставляют только строку, чтобы классы на токенах было видно в разметке.
export type StyledProps<T extends ElementType> = Omit<
  ComponentProps<T>,
  'className'
> & {className?: string}
