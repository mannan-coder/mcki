
import { memo, useState, useEffect, useRef } from 'react';
import AdSenseAd from './AdSenseAd';

interface AdPlacementProps {
  position: 'header' | 'sidebar' | 'content' | 'footer' | 'mobile-banner';
  className?: string;
}

const AdPlacement = memo(({ position, className = '' }: AdPlacementProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if ad loaded with multiple checks
    const checkAdLoad = () => {
      if (containerRef.current) {
        const adElement = containerRef.current.querySelector('.adsbygoogle');
        if (adElement) {
          const hasContent = adElement.children.length > 0 || 
                           (adElement as HTMLElement).getAttribute('data-ad-status') === 'filled' ||
                           (adElement as HTMLElement).offsetHeight > 100;
          
          if (hasContent) {
            setIsLoaded(true);
          }
        }
      }
    };

    // Check immediately
    checkAdLoad();
    
    // Check again after short delay
    const timer1 = setTimeout(checkAdLoad, 500);
    
    // Final check - if still not loaded, hide it
    const timer2 = setTimeout(() => {
      if (!isLoaded) {
        setShouldHide(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoaded]);
  // Ad slot ID - Banner-ads-Horizontal
  const adSlots = {
    header: '8636350170',
    sidebar: '8636350170', 
    content: '8636350170',
    footer: '8636350170',
    'mobile-banner': '8636350170'
  };

  const adConfigs = {
    header: {
      adFormat: 'horizontal' as const,
      style: { minHeight: '90px' }
    },
    sidebar: {
      adFormat: 'vertical' as const,
      style: { minHeight: '600px', maxWidth: '300px' }
    },
    content: {
      adFormat: 'rectangle' as const,
      style: { minHeight: '250px' }
    },
    footer: {
      adFormat: 'horizontal' as const,
      style: { minHeight: '90px' }
    },
    'mobile-banner': {
      adFormat: 'horizontal' as const,
      style: { minHeight: '50px' }
    }
  };

  const config = adConfigs[position];

  // Don't render if should hide (ad didn't load)
  if (shouldHide) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`ad-placement ad-placement-${position} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
      } ${className}`}
    >
      {isLoaded && (
        <div className="text-xs text-muted-foreground text-center mb-2">
          Advertisement
        </div>
      )}
      <AdSenseAd
        adSlot={adSlots[position]}
        adFormat={config.adFormat}
        style={config.style}
        className="w-full"
      />
    </div>
  );
});

AdPlacement.displayName = 'AdPlacement';

export default AdPlacement;
