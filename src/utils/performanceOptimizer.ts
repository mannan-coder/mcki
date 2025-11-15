// Production-ready performance optimization utilities

// Preload critical resources
export const preloadCriticalAssets = () => {
  // Preload Google AdSense script
  const adsenseLink = document.createElement('link');
  adsenseLink.rel = 'preconnect';
  adsenseLink.href = 'https://pagead2.googlesyndication.com';
  adsenseLink.crossOrigin = 'anonymous';
  document.head.appendChild(adsenseLink);

  // Preload Supabase
  const supabaseLink = document.createElement('link');
  supabaseLink.rel = 'dns-prefetch';
  supabaseLink.href = 'https://xtxujpwhqnhkwvlfzgqe.supabase.co';
  document.head.appendChild(supabaseLink);

  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preconnect';
  fontLink.href = 'https://fonts.googleapis.com';
  document.head.appendChild(fontLink);

  const fontStaticLink = document.createElement('link');
  fontStaticLink.rel = 'preconnect';
  fontStaticLink.href = 'https://fonts.gstatic.com';
  fontStaticLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontStaticLink);
};

// Lazy load images with Intersection Observer
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  images.forEach(img => imageObserver.observe(img));
};

// Monitor Core Web Vitals
export const monitorWebVitals = () => {
  if ('PerformanceObserver' in window) {
    // Monitor LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = lastEntry.startTime;
      
      if (lcp > 2500) {
        console.warn(`LCP needs improvement: ${lcp}ms (target: <2500ms)`);
      }
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Observer not supported
    }

    // Monitor FID
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        if (fid > 100) {
          console.warn(`FID needs improvement: ${fid}ms (target: <100ms)`);
        }
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Observer not supported
    }

    // Monitor CLS
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      
      if (clsScore > 0.1) {
        console.warn(`CLS needs improvement: ${clsScore} (target: <0.1)`);
      }
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Observer not supported
    }
  }
};

// Clean up unused resources
export const cleanupResources = () => {
  // Clear old cache entries
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        if (name.includes('old') || name.includes('v1')) {
          caches.delete(name);
        }
      });
    });
  }

  // Clear localStorage if too large
  try {
    const storageSize = JSON.stringify(localStorage).length;
    if (storageSize > 5 * 1024 * 1024) { // 5MB
      console.warn('localStorage is large, consider cleanup');
    }
  } catch (e) {
    // Ignore errors
  }
};

// Optimize third-party scripts
export const optimizeThirdPartyScripts = () => {
  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    script.setAttribute('defer', '');
  });
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Run on load
    if (document.readyState === 'complete') {
      preloadCriticalAssets();
      lazyLoadImages();
      optimizeThirdPartyScripts();
      cleanupResources();
      
      // Monitor performance in production
      if (process.env.NODE_ENV === 'production') {
        monitorWebVitals();
      }
    } else {
      window.addEventListener('load', () => {
        preloadCriticalAssets();
        lazyLoadImages();
        optimizeThirdPartyScripts();
        cleanupResources();
        
        if (process.env.NODE_ENV === 'production') {
          monitorWebVitals();
        }
      });
    }
  }
};
