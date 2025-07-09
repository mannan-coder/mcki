import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Create a client with optimized defaults for performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 10 * 60 * 1000, // 10 minutes (increased for better caching)
      refetchOnWindowFocus: false,
      refetchInterval: 30 * 1000, // Refetch every 30 seconds
      retry: (failureCount, error) => {
        // Intelligent retry logic
        if (failureCount < 2 && error?.message !== 'Network Error') {
          return true;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      placeholderData: (previousData: any) => previousData, // Keep previous data during refetch for glitch-free updates
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
