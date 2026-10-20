export const SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}:;,.?',
} as const

export type SetKey = keyof typeof SETS
export const SET_KEYS = Object.keys(SETS) as SetKey[]

export type PasswordOptions = Record<SetKey, boolean> & {
  length: number
  noAmbiguous: boolean
}

const AMBIGUOUS = /[0O1lI|]/g

// Равномерное целое в [0, n) без смещения по модулю.
function randInt(n: number) {
  const limit = 256 - (256 % n)
  const b = new Uint8Array(1)
  do crypto.getRandomValues(b)
  while (b[0]! >= limit)
  return b[0]! % n
}

function groups(opts: PasswordOptions) {
  return SET_KEYS.filter(k => opts[k]).map(k =>
    opts.noAmbiguous ? SETS[k].replace(AMBIGUOUS, '') : SETS[k],
  )
}

export function alphabet(opts: PasswordOptions) {
  return groups(opts).join('')
}

export function generate(opts: PasswordOptions) {
  const a = alphabet(opts)
  if (!a) return ''
  const gs = groups(opts)
  // ponytail: пересборка, пока не встретился каждый выбранный класс;
  // при длине >= числу классов заканчивается за пару итераций
  for (;;) {
    let s = ''
    for (let i = 0; i < opts.length; i++) s += a[randInt(a.length)]
    if (
      opts.length < gs.length ||
      gs.every(g => [...s].some(c => g.includes(c)))
    )
      return s
  }
}

export function entropyBits(opts: PasswordOptions) {
  const n = alphabet(opts).length
  return n ? Math.round(opts.length * Math.log2(n)) : 0
}
