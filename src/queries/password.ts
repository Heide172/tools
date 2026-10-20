import {queryOptions} from '@tanstack/react-query'

import {
  alphabet,
  entropyBits,
  generate,
  type PasswordOptions,
} from '#/lib/password'

export type PasswordChar = {ch: string; kind: 'letter' | 'digit' | 'symbol'}

function kindOf(ch: string): PasswordChar['kind'] {
  if (/\d/.test(ch)) return 'digit'
  if (/[a-z]/i.test(ch)) return 'letter'
  return 'symbol'
}

function build(opts: PasswordOptions) {
  const value = generate(opts)
  return {
    value,
    chars: [...value].map(ch => ({ch, kind: kindOf(ch)})),
    bits: entropyBits(opts),
    alphabetSize: alphabet(opts).length,
  }
}

export type PasswordData = ReturnType<typeof build>

// seed меняется на каждое «Ещё», иначе кэш отдаст тот же пароль.
export function passwordQueryOptions(opts: PasswordOptions, seed: number) {
  return queryOptions({
    queryKey: ['password', opts, seed],
    queryFn: () => build(opts),
  })
}
