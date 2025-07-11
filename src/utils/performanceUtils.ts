// Performance utilities for production deployment
export const memoryCleanup = () => {
  // Clear unused data from memory
  if (window.gc) {
    window.gc();
  }
  
  // Clear large arrays from localStorage if they exist
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('large-data') || key.includes('cache')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Memory cleanup failed:', error);
  }
};

// Debounce function for API calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for frequent operations
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Monitor performance and log warnings
export const performanceMonitor = {
  logMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory Usage:', {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
      });
      
      // Warn if memory usage is high
      if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
        console.warn('High memory usage detected - consider cleanup');
        memoryCleanup();
      }
    }
  },
  
  measurePageLoad: () => {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart + 'ms');
    });
  }
};