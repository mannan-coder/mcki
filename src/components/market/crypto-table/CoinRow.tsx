import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiveSignals } from '../LiveSignals';
import { MiniChart } from '../MiniChart';
import { CoinRowProps } from './types';

export const CoinRow = memo(({ coin, index, onToggleFavorite, favorites, lastUpdateTime }: CoinRowProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 p-4 hover:bg-muted/30 transition-colors border-b border-border/30 last:border-b-0">
    {/* Mobile Layout */}
    <div className="lg:hidden space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs text-muted-foreground font-mono">#{coin.rank}</span>
          <img 
            src={coin.image} 
            alt={coin.name}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div>
            <div className="font-semibold text-foreground">{coin.symbol}</div>
            <div className="text-sm text-muted-foreground">{coin.name}</div>
          </div>
        </div>
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(coin.id)}
            className="p-1"
          >
            <Star className={`h-4 w-4 ${favorites?.includes(coin.id) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-muted-foreground">Price</div>
          <div className="font-semibold">{coin.price}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">24h Change</div>
          <div className={`font-semibold ${
            coin.change24h.startsWith('+') ? 'text-success' : coin.change24h.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {coin.change24h}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Market Cap</div>
          <div className="text-sm">{coin.marketCap}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Volume</div>
          <div className="text-sm">{coin.volume}</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">7d Chart</div>
        <MiniChart 
          sparkline={coin.chart.sparkline} 
          priceChangePercentage24h={coin.chart.change24h}
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Live Signals</div>
        <LiveSignals 
          key={`${coin.id}-${coin.change24h}-${lastUpdateTime}`}
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

    {/* Desktop Layout */}
    <div className="hidden lg:contents">
      {/* Rank & Name */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground font-mono w-8">#{coin.rank}</span>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(coin.id)}
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Star className={`h-3 w-3 ${favorites?.includes(coin.id) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
            </Button>
          )}
        </div>
        <img 
          src={coin.image} 
          alt={coin.name}
          className="w-8 h-8 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="min-w-0">
          <div className="font-semibold text-foreground truncate">{coin.symbol}</div>
          <div className="text-sm text-muted-foreground truncate">{coin.name}</div>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <div className="font-semibold">{coin.price}</div>
      </div>

      {/* 24h Change */}
      <div className="text-right">
        <div className={`font-semibold ${
          coin.change24h.startsWith('+') ? 'text-success' : coin.change24h.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'
        }`}>
          {coin.change24h}
        </div>
      </div>

      {/* 7d Chart */}
      <div className="flex justify-center">
        <MiniChart 
          sparkline={coin.chart.sparkline} 
          priceChangePercentage24h={coin.chart.change24h}
        />
      </div>

      {/* Market Cap */}
      <div className="text-right">
        <div className="font-medium">{coin.marketCap}</div>
      </div>

      {/* Volume */}
      <div className="text-right">
        <div className="font-medium">{coin.volume}</div>
      </div>

      {/* Signals */}
      <div>
        <LiveSignals 
          key={`${coin.id}-${coin.change24h}-${lastUpdateTime}`}
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
));