import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiveSignals } from '../LiveSignals';
import { EnhancedSignals } from '../EnhancedSignals';
import { MiniChart } from '../MiniChart';
import { CoinRowProps } from './types';

export const CoinRow = memo(({ coin, index, onToggleFavorite, favorites, lastUpdateTime }: CoinRowProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 p-4 hover:bg-muted/50 transition-colors group">
    
    {/* Mobile Layout */}
    <div className="lg:hidden space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs text-muted-foreground font-mono w-8">#{coin.rank}</span>
          <img 
            src={coin.image} 
            alt={coin.name}
            className="w-10 h-10 rounded-full ring-2 ring-border"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div>
            <div className="font-bold text-foreground text-sm">{coin.symbol}</div>
            <div className="text-xs text-muted-foreground">{coin.name}</div>
          </div>
        </div>
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(coin.id)}
            className="p-2"
          >
            <Star className={`h-4 w-4 ${favorites?.includes(coin.id) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground font-medium">Price</div>
          <div className="font-bold text-sm">{coin.price}</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground font-medium">24h Change</div>
          <div className={`font-bold text-sm ${
            coin.change24h.startsWith('+') ? 'text-green-600' : coin.change24h.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'
          }`}>
            {coin.change24h}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground font-medium">Market Cap</div>
          <div className="text-sm font-medium">{coin.marketCap}</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground font-medium">Volume</div>
          <div className="text-sm font-medium">{coin.volume}</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground font-medium">7d Chart</div>
        <MiniChart 
          sparkline={coin.chart.sparkline} 
          priceChangePercentage24h={coin.chart.change24h}
        />
      </div>
      
      <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
        <div className="text-xs text-muted-foreground font-medium">Trading Signals</div>
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

    {/* Desktop Layout */}
    <div className="hidden lg:contents">
      {/* Rank & Name */}
      <div className="flex items-center space-x-3">
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
        <img 
          src={coin.image} 
          alt={coin.name}
          className="w-8 h-8 rounded-full ring-2 ring-border"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="min-w-0">
          <div className="font-bold text-foreground truncate">{coin.symbol}</div>
          <div className="text-sm text-muted-foreground truncate">{coin.name}</div>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <div className="font-bold">{coin.price}</div>
      </div>

      {/* 24h Change */}
      <div className="text-right">
        <div className={`font-bold ${
          coin.change24h.startsWith('+') ? 'text-green-600' : coin.change24h.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'
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
      <div className="flex justify-start">
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
));