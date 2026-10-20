export const SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}:;,.?',
};
const AMBIGUOUS = /[0O1lI|]/g;

// равномерное целое в [0, n) без смещения по модулю
function randInt(n) {
  const limit = 256 - (256 % n);
  const b = new Uint8Array(1);
  do crypto.getRandomValues(b);
  while (b[0] >= limit);
  return b[0] % n;
}

export function alphabet(opts) {
  let a = Object.keys(SETS)
    .filter((k) => opts[k])
    .map((k) => SETS[k])
    .join('');
  if (opts.noAmbiguous) a = a.replace(AMBIGUOUS, '');
  return a;
}

export function generate(opts) {
  const a = alphabet(opts);
  if (!a) throw new Error('пустой алфавит');
  const groups = Object.keys(SETS)
    .filter((k) => opts[k])
    .map((k) => new Set(SETS[k].replace(opts.noAmbiguous ? AMBIGUOUS : /$^/, '')));
  // ponytail: пересборка, пока не встретился каждый выбранный класс; при длине >= числу классов заканчивается быстро
  for (;;) {
    let s = '';
    for (let i = 0; i < opts.length; i++) s += a[randInt(a.length)];
    if (opts.length < groups.length || groups.every((g) => [...s].some((c) => g.has(c)))) return s;
  }
}

export function entropyBits(opts) {
  return Math.round(opts.length * Math.log2(alphabet(opts).length || 1));
}
