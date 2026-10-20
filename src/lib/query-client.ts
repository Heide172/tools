import {QueryClient} from '@tanstack/react-query'

// Контент статичный и живёт в бандле, поэтому не протухает.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      retry: false,
    },
  },
})
