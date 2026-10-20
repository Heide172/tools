import assert from 'node:assert/strict';
import { generate, alphabet, entropyBits, SETS } from './gen.js';

const all = { upper: true, lower: true, digits: true, symbols: true, noAmbiguous: true, length: 8 };
for (let i = 0; i < 200; i++) {
  const p = generate(all);
  assert.equal(p.length, 8);
  assert.ok(!/[0O1lI|]/.test(p), p);
  for (const k of Object.keys(SETS)) assert.ok([...p].some((c) => SETS[k].includes(c)), `${k} нет в ${p}`);
}
assert.equal(alphabet({ digits: true, noAmbiguous: true }), '23456789');
assert.equal(entropyBits({ digits: true, length: 10 }), 33);
assert.throws(() => generate({ length: 5 }));
const seen = new Set(Array.from({ length: 50 }, () => generate({ lower: true, length: 12 })));
assert.equal(seen.size, 50);
console.log('ok');
