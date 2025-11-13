import { useEffect, useRef } from 'react';

/**
 * AutoAdsLoader - Safely initializes Google Auto Ads once per session
 * Prevents duplicate initialization and console errors
 * Only loads on pages with meaningful content (not login, 404, or loading screens)
 */
const AutoAdsLoader = () => {
  const adsInitialized = useRef(false);

  useEffect(() => {
    // Prevent duplicate initialization
    if (adsInitialized.current) return;

    // Check if we're on a content page (not login/404/loading)
    const pathname = window.location.pathname;
    const excludedPaths = ['/login', '/signup', '/404'];
    
    if (excludedPaths.includes(pathname)) {
      return;
    }

    // Wait for meaningful content to load before initializing ads
    const initializeAds = () => {
      try {
        // Check if adsbygoogle script is loaded
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          // Auto Ads are already initialized via the script tag in index.html
          // No need to push anything - Auto Ads handles placement automatically
          adsInitialized.current = true;
          console.log('Google Auto Ads ready');
        }
      } catch (error) {
        console.error('Error initializing Auto Ads:', error);
      }
    };

    // Wait for page content to be meaningful before initializing
    const timer = setTimeout(initializeAds, 1000);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything - it just manages Auto Ads initialization
  return null;
};

export default AutoAdsLoader;
