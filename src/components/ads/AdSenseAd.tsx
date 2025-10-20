
import { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  adLayout?: string;
  adLayoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseAd = ({ 
  adSlot, 
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  className = '',
  style = {}
}: AdSenseAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    
    try {
      // Initialize AdSense
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const adStyle = {
    display: 'block',
    minHeight: '250px',
    width: '100%',
    ...style
  };

  return (
    <div className={`adsense-container my-8 ${className}`} ref={adRef}>
      <div className="text-xs text-muted-foreground text-center mb-2">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-5532318785992990"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseAd;
