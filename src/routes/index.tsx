import {createFileRoute, Link} from '@tanstack/react-router'

import {TOOLS} from '#/tools'

export const Route = createFileRoute('/')({component: Index})

function Index() {
  return (
    <main className="mx-auto max-w-[1360px] px-4 py-8 md:px-6">
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {TOOLS.map(t => (
          <li key={t.to}>
            <Link
              to={t.to}
              className="block rounded-sm border border-line px-4 py-3 hover:border-line-strong">
              <div className="text-ink-head">{t.title}</div>
              <div className="text-sm text-ink-dim">{t.description}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
