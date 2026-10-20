import {Link} from '@tanstack/react-router'

import {TOOLS} from '#/tools'

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-baseline gap-x-5 gap-y-1 px-4 py-4 md:px-6">
        <Link to="/" className="text-ink-head">
          tools.atonyan.dev
        </Link>
        <nav className="flex gap-3 text-sm">
          {TOOLS.map(t => (
            <Link
              key={t.to}
              to={t.to}
              className="text-ink-dim hover:text-ink-head"
              activeProps={{
                className: 'text-ink-head underline underline-offset-4',
              }}>
              {t.title.toLowerCase()}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
