import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {QueryClientProvider} from '@tanstack/react-query'
import {RouterProvider} from '@tanstack/react-router'

import {queryClient} from '#/lib/query-client'
import {router} from '#/router'

import '#/styles/app.css'

const container = document.getElementById('root')
if (!container) throw new Error('#root not found')

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
