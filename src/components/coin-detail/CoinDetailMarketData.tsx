import React from 'react';

interface CoinDetailMarketDataProps {
  coinDetails: {
    marketCap: number;
    totalVolume: number;
    circulatingSupply: number;
    totalSupply?: number;
    maxSupply?: number;
  };
  formatMarketCap: (value: number) => string;
}

export const CoinDetailMarketData: React.FC<CoinDetailMarketDataProps> = ({ 
  coinDetails, 
  formatMarketCap 
}) => {
  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border/20">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Market Data
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Market Cap</span>
          <span className="font-semibold text-foreground">
            {formatMarketCap(coinDetails.marketCap)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">24h Volume</span>
          <span className="font-semibold text-foreground">
            {formatMarketCap(coinDetails.totalVolume)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Circulating Supply</span>
          <span className="font-semibold text-sm text-foreground">
            {coinDetails.circulatingSupply.toLocaleString()}
          </span>
        </div>

        {coinDetails.totalSupply && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Supply</span>
            <span className="font-semibold text-sm text-foreground">
              {coinDetails.totalSupply.toLocaleString()}
            </span>
          </div>
        )}

        {coinDetails.maxSupply && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Max Supply</span>
            <span className="font-semibold text-sm text-foreground">
              {coinDetails.maxSupply.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};