import assert from 'node:assert/strict'
import {test} from 'node:test'

import {
  alphabet,
  entropyBits,
  generate,
  SET_KEYS,
  SETS,
  type PasswordOptions,
} from '../src/lib/password.ts'

const all: PasswordOptions = {
  upper: true,
  lower: true,
  digits: true,
  symbols: true,
  noAmbiguous: true,
  length: 8,
}

test('каждый выбранный класс присутствует, похожих символов нет', () => {
  for (let i = 0; i < 200; i++) {
    const p = generate(all)
    assert.equal(p.length, 8)
    assert.ok(!/[0O1lI|]/.test(p), p)
    for (const k of SET_KEYS)
      assert.ok(
        [...p].some(c => SETS[k].includes(c)),
        `${k} нет в ${p}`,
      )
  }
})

test('алфавит, энтропия, пустой набор, уникальность', () => {
  const digits = {...all, upper: false, lower: false, symbols: false}
  assert.equal(alphabet(digits), '23456789')
  assert.equal(entropyBits({...digits, noAmbiguous: false, length: 10}), 33)
  assert.equal(generate({...digits, digits: false}), '')
  const seen = new Set(
    Array.from({length: 50}, () => generate({...all, length: 12})),
  )
  assert.equal(seen.size, 50)
})
