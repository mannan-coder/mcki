
import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseScript = () => {
  useEffect(() => {
    // Only load AdSense script once
    if (document.querySelector('script[src*="adsbygoogle.js"]')) {
      return;
    }

    try {
      // Create and load Google AdSense script
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID';
      document.head.appendChild(script);

      // Initialize adsbygoogle array
      window.adsbygoogle = window.adsbygoogle || [];

      // Initialize Auto Ads
      script.onload = () => {
        try {
          // Enable Auto Ads - this will automatically place ads throughout the site
          window.adsbygoogle.push({
            google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
            enable_page_level_ads: true,
            overlays: {bottom: true}
          });
          console.log('Google Auto Ads initialized');
        } catch (error) {
          console.error('Auto Ads initialization error:', error);
        }
      };

      script.onerror = () => {
        console.error('Failed to load AdSense script');
      };

    } catch (error) {
      console.error('AdSense script loading error:', error);
    }
  }, []);

  return null;
};

export default AdSenseScript;
