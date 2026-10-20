import {type QueryClient} from '@tanstack/react-query'
import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'

import {Header} from '#/components/header'

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
  component: RootLayout,
  notFoundComponent: () => (
    <main className="mx-auto max-w-[1360px] px-4 py-10 md:px-6">
      <h1 className="text-lg text-ink-head">Страница не найдена</h1>
    </main>
  ),
})

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <footer className="mx-auto max-w-[1360px] px-4 py-8 text-xs text-ink-dim md:px-6">
        Всё считается в браузере, на сервер ничего не уходит. Код:{' '}
        <a href="https://github.com/Heide172/tools" className="underline">
          github.com/Heide172/tools
        </a>
      </footer>
    </>
  )
}
