
import { memo } from 'react';
import AdSenseAd from './AdSenseAd';

interface AdPlacementProps {
  position: 'header' | 'sidebar' | 'content' | 'footer' | 'mobile-banner';
  className?: string;
}

const AdPlacement = memo(({ position, className = '' }: AdPlacementProps) => {
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

  return (
    <div className={`ad-placement ad-placement-${position} ${className}`}>
      <div className="text-xs text-muted-foreground text-center mb-2">
        Advertisement
      </div>
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
