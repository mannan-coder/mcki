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

    let timeoutId: NodeJS.Timeout;

    // Wait for meaningful content and DOM ready before initializing ads
    const initializeAds = () => {
      try {
        // Check if adsbygoogle script is loaded and DOM has content
        const hasContent = document.body.children.length > 2; // More than just script tags
        
        if (typeof window !== 'undefined' && (window as any).adsbygoogle && hasContent) {
          // Auto Ads are already initialized via the script tag in index.html
          // Mark as initialized to prevent duplicates
          adsInitialized.current = true;
          
          // Signal that ads are ready (only in development)
          if (process.env.NODE_ENV === 'development') {
            console.log('Google Auto Ads ready');
          }
        }
      } catch (error) {
        // Silently fail in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Error initializing Auto Ads:', error);
        }
      }
    };

    // Wait for DOM content and meaningful content to load
    if (document.readyState === 'complete') {
      timeoutId = setTimeout(initializeAds, 1500);
    } else {
      const handleLoad = () => {
        timeoutId = setTimeout(initializeAds, 1500);
      };
      window.addEventListener('load', handleLoad);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // This component doesn't render anything - it just manages Auto Ads initialization
  return null;
};

export default AutoAdsLoader;
