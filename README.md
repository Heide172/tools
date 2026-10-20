# tools

Мелкие утилиты на https://tools.atonyan.dev. Публикуется GitHub Pages из `main` (workflow `.github/workflows/pages.yml`), DNS atonyan.dev у Timeweb.

Стек тот же, что у `tli`: Vite, React 19 с React Compiler, TypeScript, TanStack Router (file-based, `src/routes`) и Query, jotai для настроек, Tailwind 4 с токенами в `src/styles/app.css`, Base UI с обёртками в `src/ui`, react-hook-form, reactuse.

Инструменты перечислены в `src/tools.ts`: главная и шапка строятся из этого списка, у каждого инструмента свой роут. Чистая логика живёт в `src/lib`, данные для рендера готовят query-функции в `src/queries`.

- `/password` — генератор паролей (`src/lib/password.ts`, тест `test/password.test.ts`).

```
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ (+ 404.html для SPA-роутов на Pages)
npm test           # node --test
npm run lint && npm run format:check && npm run typecheck
```
