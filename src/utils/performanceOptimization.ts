
// Advanced performance optimization utilities
import { lazy } from 'react';

// Lazy load components for better performance
export const LazyComponents = {
  ArbitrageDashboard: lazy(() => import('@/components/ArbitrageDashboard')),
  CryptoTable: lazy(() => import('@/components/CryptoTable')),
  MarketOverview: lazy(() => import('@/components/MarketOverview')),
  NewsAlert: lazy(() => import('@/components/NewsAlert')),
  OnChainAnalysis: lazy(() => import('@/components/OnChainAnalysis')),
};

// Image optimization
export const optimizeImage = (src: string, width?: number, height?: number) => {
  if (!src) return '/placeholder.svg';
  
  // Add WebP format support
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();
  
  // Return optimized image URL
  if (src.includes('coingecko.com')) {
    return `${src}${width ? `?width=${width}` : ''}${height ? `&height=${height}` : ''}`;
  }
  
  return src;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = '/fonts/inter.woff2';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
  
  // Preload critical CSS
  const cssLink = document.createElement('link');
  cssLink.rel = 'preload';
  cssLink.href = '/src/index.css';
  cssLink.as = 'style';
  document.head.appendChild(cssLink);
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });
};

// Performance monitoring
export const performanceMonitor = {
  measurePageLoad: () => {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      console.log('Page Load Time:', pageLoadTime + 'ms');
      
      // Send to analytics if needed
      if (pageLoadTime > 3000) {
        console.warn('Slow page load detected:', pageLoadTime + 'ms');
      }
    });
  },
  
  measureLCP: () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime + 'ms');
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }
};

// Resource cleanup
export const cleanupResources = () => {
  // Clear unused event listeners
  // Clear large objects from memory
  // Cancel pending requests
  if (window.AbortController) {
    const controller = new AbortController();
    return controller;
  }
};
