import React from 'react';

interface CoinDetailDescriptionProps {
  coinDetails: {
    name: string;
    description: string;
  };
}

export const CoinDetailDescription: React.FC<CoinDetailDescriptionProps> = ({ 
  coinDetails 
}) => {
  if (!coinDetails.description) return null;

  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border/20">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        About {coinDetails.name}
      </h3>
      <div 
        className="text-sm leading-relaxed max-h-32 overflow-y-auto text-muted-foreground"
        dangerouslySetInnerHTML={{ 
          __html: coinDetails.description.slice(0, 800) + '...' 
        }}
      />
    </div>
  );
};