
// Production configuration for optimal performance
export const PRODUCTION_CONFIG = {
  // API settings - optimized for high traffic
  API_RATE_LIMIT_DELAY: 2000, // 2 seconds between API calls
  MAX_CONCURRENT_REQUESTS: 3, // Increased for better user experience
  REQUEST_TIMEOUT: 15000, // 15 seconds timeout
  
  // Data fetching limits - optimized for performance
  DEFAULT_COIN_LIMIT: 100, // Increased for better UX
  MARKET_PAGE_LIMIT: 250, // Balanced for performance
  HOMEPAGE_LIMIT: 50, // Optimal for homepage
  
  // Cache settings - longer cache for better performance
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  STALE_TIME: 3 * 60 * 1000, // 3 minutes
  
  // Performance settings
  DISABLE_PREFETCH: false, // Enable prefetch for better UX
  DISABLE_BACKGROUND_REFETCH: false, // Enable for fresh data
  DISABLE_NOTIFICATIONS: false, // Enable for user engagement
  
  // Error handling
  MAX_RETRIES: 2, // Reduced for faster error handling
  RETRY_DELAY: 2000, // 2 seconds
  
  // SEO and performance
  ENABLE_SERVICE_WORKER: true,
  ENABLE_LAZY_LOADING: true,
  ENABLE_IMAGE_OPTIMIZATION: true,
  ENABLE_COMPRESSION: true,
  
  // AdSense configuration
  ADSENSE_CLIENT_ID: "ca-pub-5532318785992990",
  ENABLE_ADS: true,
  
  // Analytics
  ENABLE_ANALYTICS: true,
  GOOGLE_ANALYTICS_ID: "GA_MEASUREMENT_ID", // Replace with actual ID
};

// Check if running in production
export const isProduction = () => {
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1' &&
         !window.location.hostname.includes('lovableproject.com');
};

// Performance optimization flags
export const PERFORMANCE_CONFIG = {
  // Lazy loading
  INTERSECTION_OBSERVER_THRESHOLD: 0.1,
  INTERSECTION_OBSERVER_ROOT_MARGIN: '50px',
  
  // Image optimization
  WEBP_SUPPORT: true,
  LAZY_LOAD_IMAGES: true,
  
  // Code splitting
  CHUNK_SIZE_LIMIT: 500000, // 500KB
  
  // Bundle optimization
  TREE_SHAKING: true,
  MINIFICATION: true,
  COMPRESSION: true,
};
