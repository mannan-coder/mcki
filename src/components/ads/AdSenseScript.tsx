
import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseScript = () => {
  useEffect(() => {
    // Only load AdSense script once globally
    if (document.querySelector('script[src*="adsbygoogle.js"]')) {
      return;
    }

    try {
      // Create and load Google AdSense script
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5532318785992990';
      document.head.appendChild(script);

      // Initialize adsbygoogle array
      window.adsbygoogle = window.adsbygoogle || [];

      script.onload = () => {
        console.log('Google AdSense script loaded successfully');
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
