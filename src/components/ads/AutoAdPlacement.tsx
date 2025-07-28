import { memo, useEffect, useState } from 'react';

interface AutoAdPlacementProps {
  position: 'after-section' | 'between-content';
  className?: string;
  sectionName?: string;
}

const AutoAdPlacement = memo(({ position, className = '', sectionName }: AutoAdPlacementProps) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    // Check if ads are loading after a short delay
    const checkAdLoad = setTimeout(() => {
      const adElements = document.querySelectorAll('ins.adsbygoogle');
      let hasLoadedAd = false;
      
      adElements.forEach((ad) => {
        const adInstance = ad as HTMLElement;
        if (adInstance.innerHTML.trim() !== '' || adInstance.offsetHeight > 0) {
          hasLoadedAd = true;
        }
      });

      setIsAdLoaded(hasLoadedAd);
      
      // Hide placeholder if no ads are loading after 3 seconds
      setTimeout(() => {
        setShowPlaceholder(hasLoadedAd);
      }, 3000);
    }, 1000);

    return () => clearTimeout(checkAdLoad);
  }, []);

  // If no ads are loaded and we've waited, don't render anything
  if (!showPlaceholder && !isAdLoaded) {
    return null;
  }

  return (
    <div className={`auto-ad-placement ${className}`}>
      {/* Google Auto Ads will automatically inject ads here */}
      {showPlaceholder && !isAdLoaded && (
        <div className="ad-placeholder py-4 text-center">
          <div className="text-xs text-muted-foreground mb-2">
            Advertisement
          </div>
          <div className="w-full min-h-[250px] bg-muted/20 rounded-lg flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Ad Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
});

AutoAdPlacement.displayName = 'AutoAdPlacement';

export default AutoAdPlacement;