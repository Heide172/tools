import {startTransition, useEffect, useState} from 'react'
import {useClipboard, useWindowEvent} from '@siberiacancode/reactuse'
import {useSuspenseQuery} from '@tanstack/react-query'
import {createFileRoute} from '@tanstack/react-router'
import {useAtom} from 'jotai'
import {Controller, useForm} from 'react-hook-form'

import {cx} from '#/lib/cx'
import {SET_KEYS, type PasswordOptions, type SetKey} from '#/lib/password'
import {passwordQueryOptions, type PasswordData} from '#/queries/password'
import {passwordOptionsAtom} from '#/state/password'
import {Button} from '#/ui/button'
import {Checkbox} from '#/ui/checkbox'
import {NumberField} from '#/ui/number-field'
import {Slider} from '#/ui/slider'

export const Route = createFileRoute('/password')({component: PasswordPage})

const SET_LABELS: Record<SetKey, string> = {
  upper: 'прописные A–Z',
  lower: 'строчные a–z',
  digits: 'цифры 0–9',
  symbols: 'символы !@#$%…',
}

const KIND_CLASS: Record<PasswordData['chars'][number]['kind'], string> = {
  letter: '',
  digit: 'text-digit',
  symbol: 'text-symbol',
}

function PasswordPage() {
  const [opts, setOpts] = useAtom(passwordOptionsAtom)
  const {control, watch} = useForm<PasswordOptions>({defaultValues: opts})
  useEffect(() => {
    const sub = watch(v => startTransition(() => setOpts(v as PasswordOptions)))
    return () => sub.unsubscribe()
  }, [watch, setOpts])
  const [seed, setSeed] = useState(0)

  const {data} = useSuspenseQuery(passwordQueryOptions(opts, seed))
  const {copy} = useClipboard()
  const [copied, setCopied] = useState(false)

  function again() {
    startTransition(() => setSeed(s => s + 1))
    setCopied(false)
  }
  function copyNow() {
    if (!data.value) return
    void copy(data.value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  useWindowEvent('keydown', e => {
    if (e.target !== document.body || e.metaKey || e.ctrlKey) return
    if (e.code === 'Space') {
      e.preventDefault()
      again()
    }
    if (e.key === 'Enter') copyNow()
  })

  return (
    <main className="mx-auto max-w-[680px] px-4 py-8 md:px-6">
      <h1 className="mb-3 font-semibold text-ink-head">Случайный пароль</h1>
      <PasswordView data={data} onCopy={copyNow} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button onClick={again}>Ещё</Button>
        <Button variant="ghost" onClick={copyNow}>
          Скопировать
        </Button>
        {copied && <span className="text-ok">скопировано</span>}
        <span className="ml-auto text-ink-dim">
          {data.value ? `${data.bits} бит` : 'выбери хотя бы один набор'}
        </span>
      </div>

      <form className="mt-7 grid gap-2.5">
        <Controller
          control={control}
          name="length"
          render={({field}) => (
            <div className="flex items-center gap-4">
              длина
              <Slider
                min={6}
                max={64}
                value={field.value}
                onValueChange={field.onChange}
              />
              <NumberField
                min={6}
                max={64}
                value={field.value}
                onValueChange={v => {
                  if (v !== null) field.onChange(v)
                }}
              />
            </div>
          )}
        />
        {[...SET_KEYS, 'noAmbiguous' as const].map(key => (
          <label key={key} className="flex cursor-pointer items-center gap-2.5">
            <Controller
              control={control}
              name={key}
              render={({field}) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            {key === 'noAmbiguous'
              ? 'без похожих 0 O 1 l I |'
              : SET_LABELS[key]}
          </label>
        ))}
      </form>
      <p className="mt-7 text-xs text-ink-dim">
        <kbd>Пробел</kbd> — новый пароль, <kbd>Enter</kbd> — скопировать.
      </p>
    </main>
  )
}

function PasswordView({
  data,
  onCopy,
}: {
  data: PasswordData
  onCopy: () => void
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      title="Нажми, чтобы скопировать"
      className={cx(
        'min-h-[72px] w-full cursor-pointer rounded-sm border border-line p-4 text-left',
        'text-pw tracking-wider wrap-anywhere select-all',
        'focus-visible:shadow-focus focus-visible:outline-none',
      )}>
      {data.chars.map((c, i) => (
        <span key={i} className={KIND_CLASS[c.kind]}>
          {c.ch}
        </span>
      ))}
    </button>
  )
}
