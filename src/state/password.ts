import {atomWithStorage} from 'jotai/utils'

import {type PasswordOptions} from '#/lib/password'

export const DEFAULT_OPTIONS: PasswordOptions = {
  length: 20,
  upper: true,
  lower: true,
  digits: true,
  symbols: true,
  noAmbiguous: true,
}

// Настройки переживают уход со страницы и перезагрузку.
export const passwordOptionsAtom = atomWithStorage<PasswordOptions>(
  'password-options',
  DEFAULT_OPTIONS,
)
