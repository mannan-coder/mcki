import React from 'react';

interface CoinDetailModalHeaderProps {
  coinDetails: {
    image?: string;
    name?: string;
    symbol?: string;
    marketCapRank?: number;
  } | null;
  onClose: () => void;
}

export const CoinDetailModalHeader: React.FC<CoinDetailModalHeaderProps> = ({ 
  coinDetails, 
  onClose 
}) => {
  return (
    <div className="flex-shrink-0 p-4 sm:p-6 border-b border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {coinDetails?.image && (
            <img 
              src={coinDetails.image} 
              alt={coinDetails.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border/20 shadow-sm"
            />
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {coinDetails?.name || 'Loading...'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {coinDetails?.symbol} • Rank #{coinDetails?.marketCapRank}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};