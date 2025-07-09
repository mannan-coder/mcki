import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

interface CoinDetailPriceInfoProps {
  coinDetails: {
    currentPrice: number;
    priceChangePercentage24h: number;
    priceChangePercentage7d: number;
    ath: number;
    athDate: string;
    atl: number;
    atlDate: string;
  };
  formatPrice: (price: number) => string;
}

export const CoinDetailPriceInfo: React.FC<CoinDetailPriceInfoProps> = ({ 
  coinDetails, 
  formatPrice 
}) => {
  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border/20">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Price Information
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Price</span>
          <span className="text-xl sm:text-2xl font-bold text-primary">
            {formatPrice(coinDetails.currentPrice)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">24h Change</span>
          <div className={`flex items-center space-x-1 ${
            coinDetails.priceChangePercentage24h >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {coinDetails.priceChangePercentage24h >= 0 ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
            <span className="font-semibold">
              {Math.abs(coinDetails.priceChangePercentage24h).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">7d Change</span>
          <div className={`flex items-center space-x-1 ${
            coinDetails.priceChangePercentage7d >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {coinDetails.priceChangePercentage7d >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
            <span className="font-semibold">
              {Math.abs(coinDetails.priceChangePercentage7d).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">All Time High</span>
          <div className="text-right">
            <div className="font-semibold text-foreground">{formatPrice(coinDetails.ath)}</div>
            <div className="text-xs text-muted-foreground">
              {new Date(coinDetails.athDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">All Time Low</span>
          <div className="text-right">
            <div className="font-semibold text-foreground">{formatPrice(coinDetails.atl)}</div>
            <div className="text-xs text-muted-foreground">
              {new Date(coinDetails.atlDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};