import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedSignals } from '../EnhancedSignals';
import { MiniChart } from '../MiniChart';
import { CoinRowProps } from './types';

export const CoinRow = memo(({ coin, index, onToggleFavorite, favorites, lastUpdateTime }: CoinRowProps) => (
  <>
    {/* Enhanced Mobile Layout */}
    <div className="lg:hidden border-b border-border/50 hover:bg-muted/20 transition-all duration-200">
      <div className="p-4 space-y-3">
        {/* Top Row - Coin Info & Favorite */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded">
                #{coin.rank}
              </span>
              {onToggleFavorite && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(coin.id)}
                  className="p-1 h-6 w-6"
                >
                  <Star className={`h-3 w-3 ${favorites?.includes(coin.id) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                </Button>
              )}
            </div>
            <img 
              src={coin.image} 
              alt={coin.name}
              className="w-10 h-10 rounded-full ring-2 ring-border/20"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div>
              <div className="font-bold text-foreground">{coin.symbol}</div>
              <div className="text-sm text-muted-foreground truncate max-w-[120px]">{coin.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-foreground">{coin.price}</div>
            <div className={`text-sm font-semibold ${
              coin.change24h.startsWith('+') ? 'text-green-600' : coin.change24h.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {coin.change24h}
            </div>
          </div>
        </div>
        
        {/* Market Data Grid */}
        <div className="grid grid-cols-2 gap-3 bg-muted/10 rounded-lg p-3">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground font-medium">Market Cap</div>
            <div className="font-semibold text-sm">{coin.marketCap}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground font-medium">Volume (24h)</div>
            <div className="font-semibold text-sm">{coin.volume}</div>
          </div>
        </div>
        
        {/* Chart Section */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">Price Trend (7d)</div>
          <div className="bg-muted/10 rounded-lg p-3">
            <MiniChart 
              sparkline={coin.chart.sparkline} 
              priceChangePercentage24h={coin.chart.change24h}
            />
          </div>
        </div>
        
        {/* Trading Signals */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">Trading Indicators</div>
          <div className="bg-muted/10 rounded-lg p-3">
            <EnhancedSignals 
              coin={{
                priceChangePercentage24h: coin._change24h,
                priceChangePercentage7d: coin.change7d,
                priceChangePercentage1h: coin.change1h || 0,
                volume: coin._volume,
                marketCap: coin._marketCap,
                high24h: coin.high24h,
                low24h: coin.low24h,
                price: coin._price,
                athChangePercentage: coin.athChangePercentage,
                sparkline: coin.sparkline
              }}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Enhanced Desktop Table Layout */}
    <div className="hidden lg:block border-b border-border/50 hover:bg-muted/20 transition-all duration-200 group">
      <div className="grid grid-cols-12 items-center py-3 px-4 gap-3">
        {/* Rank & Favorite */}
        <div className="col-span-1 flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-mono w-8">{coin.rank}</span>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(coin.id)}
              className="p-0 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Star className={`h-3 w-3 ${favorites?.includes(coin.id) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
            </Button>
          )}
        </div>

        {/* Cryptocurrency Info */}
        <div className="col-span-2 flex items-center gap-3">
          <img 
            src={coin.image} 
            alt={coin.name}
            className="w-9 h-9 rounded-full ring-1 ring-border/20"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="font-bold text-foreground truncate text-sm">{coin.symbol}</div>
            <div className="text-xs text-muted-foreground truncate">{coin.name}</div>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-1 text-right">
          <div className="font-bold text-foreground text-sm">{coin.price}</div>
        </div>

        {/* 24h Change */}
        <div className="col-span-1 text-right">
          <div className={`font-semibold text-sm px-2 py-1 rounded-md ${
            coin.change24h.startsWith('+') 
              ? 'text-green-700 bg-green-50 border border-green-200' 
              : coin.change24h.startsWith('-') 
              ? 'text-red-700 bg-red-50 border border-red-200' 
              : 'text-muted-foreground bg-muted/20'
          }`}>
            {coin.change24h}
          </div>
        </div>

        {/* 7d Chart */}
        <div className="col-span-2 flex justify-center">
          <div className="w-full max-w-[120px]">
            <MiniChart 
              sparkline={coin.chart.sparkline} 
              priceChangePercentage24h={coin.chart.change24h}
            />
          </div>
        </div>

        {/* Market Cap */}
        <div className="col-span-1 text-right">
          <div className="font-semibold text-foreground text-sm">{coin.marketCap}</div>
          <div className="text-xs text-muted-foreground">Market Cap</div>
        </div>

        {/* Volume */}
        <div className="col-span-1 text-right">
          <div className="font-semibold text-foreground text-sm">{coin.volume}</div>
          <div className="text-xs text-muted-foreground">Volume</div>
        </div>

        {/* Trading Signals */}
        <div className="col-span-3">
          <EnhancedSignals 
            coin={{
              priceChangePercentage24h: coin._change24h,
              priceChangePercentage7d: coin.change7d,
              priceChangePercentage1h: coin.change1h || 0,
              volume: coin._volume,
              marketCap: coin._marketCap,
              high24h: coin.high24h,
              low24h: coin.low24h,
              price: coin._price,
              athChangePercentage: coin.athChangePercentage,
              sparkline: coin.sparkline
            }}
          />
        </div>
      </div>
    </div>
  </>
));