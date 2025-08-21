// Utilities for prerendering and static generation

// Check if we're in a prerender environment
export const isPrerendering = (): boolean => {
  return typeof window === 'undefined' || 
         (typeof navigator !== 'undefined' && /HeadlessChrome/.test(navigator.userAgent));
};

// Get static data for prerendering
export const getStaticData = (route: string) => {
  const staticData: Record<string, any> = {
    '/': {
      title: 'MCKI - Professional Crypto Intelligence Platform',
      description: 'Advanced cryptocurrency arbitrage intelligence powered by AI. Real-time market analysis, profitable trading opportunities, and comprehensive tools for multi-chain operations.',
      keywords: ['crypto arbitrage', 'cryptocurrency trading', 'bitcoin arbitrage', 'blockchain analysis']
    },
    '/market': {
      title: 'Crypto Market Overview | MCKI',
      description: 'Real-time cryptocurrency market data, live prices, and comprehensive market analysis tools.',
      keywords: ['crypto market', 'cryptocurrency prices', 'market analysis', 'live prices']
    },
    '/arbitrage': {
      title: 'Crypto Arbitrage Opportunities | MCKI', 
      description: 'Live cryptocurrency arbitrage opportunities across top exchanges. Find profitable trading gaps with AI-powered analysis.',
      keywords: ['crypto arbitrage', 'arbitrage opportunities', 'exchange comparison', 'trading gaps']
    },
    '/news': {
      title: 'Crypto News & Analysis | MCKI',
      description: 'Latest cryptocurrency news, market analysis, and expert insights. Stay updated with real-time crypto market developments.',
      keywords: ['crypto news', 'cryptocurrency analysis', 'market news', 'crypto insights']
    },
    '/about': {
      title: 'About MCKI | Multi-Chain Knowledge Intelligence',
      description: 'Learn about MCKI\'s mission to provide advanced cryptocurrency intelligence through AI-powered analytics and real-time market data.',
      keywords: ['about mcki', 'crypto intelligence', 'blockchain analytics', 'company information']
    },
    '/contact': {
      title: 'Contact MCKI | Get In Touch',
      description: 'Contact the MCKI team for support, partnerships, or inquiries about our cryptocurrency intelligence platform.',
      keywords: ['contact mcki', 'crypto support', 'get in touch', 'customer service']
    }
  };

  return staticData[route] || {
    title: 'MCKI - Professional Crypto Intelligence Platform',
    description: 'Advanced cryptocurrency arbitrage intelligence powered by AI.',
    keywords: ['crypto', 'cryptocurrency', 'arbitrage', 'trading']
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);

  // Preconnect to APIs
  const apiPreconnect = document.createElement('link');
  apiPreconnect.rel = 'preconnect';
  apiPreconnect.href = 'https://api.coingecko.com';
  document.head.appendChild(apiPreconnect);
};

// Optimize images for prerendering
export const optimizeImageForPrerender = (src: string, alt: string, className?: string) => {
  return {
    src,
    alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    className,
    // Add dimensions for better CLS
    style: { 
      aspectRatio: 'auto',
      maxWidth: '100%',
      height: 'auto'
    }
  };
};

// Critical CSS injection for prerendering
export const injectCriticalCSS = () => {
  if (typeof document === 'undefined') return;

  const criticalCSS = `
    /* Critical styles for above-the-fold content */
    .hero-section { min-height: 50vh; }
    .loading-skeleton { animation: pulse 2s infinite; }
    .top-metrics-banner { position: sticky; top: 0; z-index: 50; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  const style = document.createElement('style');
  style.innerHTML = criticalCSS;
  document.head.appendChild(style);
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }
};

export default {
  isPrerendering,
  getStaticData,
  preloadCriticalResources,
  optimizeImageForPrerender,
  injectCriticalCSS,
  registerServiceWorker
};