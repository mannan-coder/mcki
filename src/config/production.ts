// Production configuration for Hostinger deployment
export const PRODUCTION_CONFIG = {
  // API settings
  API_RATE_LIMIT_DELAY: 10000, // 10 seconds between API calls
  MAX_CONCURRENT_REQUESTS: 2, // Limit concurrent requests
  REQUEST_TIMEOUT: 30000, // 30 seconds timeout
  
  // Data fetching limits
  DEFAULT_COIN_LIMIT: 50, // Reduced from 100
  MARKET_PAGE_LIMIT: 100, // Reduced from 500
  HOMEPAGE_LIMIT: 20, // Minimal for homepage
  
  // Cache settings
  CACHE_DURATION: 15 * 60 * 1000, // 15 minutes
  STALE_TIME: 10 * 60 * 1000, // 10 minutes
  
  // Performance settings
  DISABLE_PREFETCH: true,
  DISABLE_BACKGROUND_REFETCH: true,
  DISABLE_NOTIFICATIONS: true,
  
  // Error handling
  MAX_RETRIES: 1,
  RETRY_DELAY: 5000,
};

// Check if running in production
export const isProduction = () => {
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1' &&
         !window.location.hostname.includes('lovableproject.com');
};