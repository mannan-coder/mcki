
import { useEffect } from 'react';

interface AdSenseScriptProps {
  publisherId: string;
}

const AdSenseScript = ({ publisherId }: AdSenseScriptProps) => {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') return;
    
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    // Add error handling
    script.onerror = () => {
      console.error('Failed to load AdSense script');
    };
    
    document.head.appendChild(script);
    
    // Initialize adsbygoogle array
    if (!window.adsbygoogle) {
      window.adsbygoogle = [];
    }
    
    return () => {
      document.head.removeChild(script);
    };
  }, [publisherId]);

  return null;
};

export default AdSenseScript;
