
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Production-optimized React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 429 (rate limit) errors
        if (error?.message?.includes('429')) return false;
        return failureCount < 2;
      },
      retryDelay: attemptIndex => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
      // Enable structural sharing for better performance
      structuralSharing: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
})

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
  
  // Preload critical API endpoints
  const apiPreload = document.createElement('link');
  apiPreload.rel = 'dns-prefetch';
  apiPreload.href = 'https://api.coingecko.com';
  document.head.appendChild(apiPreload);
};

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  // Web Vitals reporting
  if ('web-vitals' in window) {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(console.log);
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
      onINP(console.log);
    });
  }
};

// Initialize app
preloadCriticalResources();
initPerformanceMonitoring();

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
