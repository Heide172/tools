// Реестр инструментов: главная и шапка строятся из него, у каждого свой роут в src/routes.
export const TOOLS = [
  {
    to: '/password',
    title: 'Пароли',
    description: 'Случайный пароль нужной длины и состава.',
  },
] as const
