import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Production-optimized React Query configuration for Hostinger
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Reduce retries
      retryDelay: attemptIndex => Math.min(3000 * 2 ** attemptIndex, 60000),
      staleTime: 10 * 60 * 1000, // 10 minutes - longer cache
      gcTime: 30 * 60 * 1000, // 30 minutes - keep data longer
      refetchOnWindowFocus: false,
      refetchOnReconnect: false, // Disable to prevent crashes
      refetchOnMount: false, // Only fetch when absolutely necessary
    },
    mutations: {
      retry: 0, // No retries for mutations
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)