import React, { memo } from 'react';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveSignals } from './LiveSignals';
import { MiniChart } from './MiniChart';
import { CoinRowSkeleton, TableHeaderSkeleton } from './SkeletonLoader';

interface CryptoTableProps {
  data: any[];
  loading?: boolean;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onSort: (key: string) => void;
  onToggleFavorite?: (coinId: string) => void;
  favorites?: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

const SortButton = memo(({ label, sortKey, sortConfig, onSort }: {
  label: string;
  sortKey: string;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onSort: (key: string) => void;
}) => (
  <button
    onClick={() => onSort(sortKey)}
    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
  >
    <span>{label}</span>
    {sortConfig.key === sortKey && (
      sortConfig.direction === 'asc' ? 
        <ChevronUp className="h-3 w-3" /> : 
        <ChevronDown className="h-3 w-3" />
    )}
  </button>
));

const CoinRow = memo(({ coin, index, onToggleFavorite, favorites, lastUpdateTime }: {
  coin: any;
  index: number;
  onToggleFavorite?: (coinId: string) => void;
  favorites?: string[];
  lastUpdateTime?: number;
}) => (
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

export const ModernCryptoTable = memo(({
  data,
  loading,
  sortConfig,
  onSort,
  onToggleFavorite,
  favorites,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex
}: CryptoTableProps) => {
  if (loading) {
    return (
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-card to-muted/30">
        <TableHeaderSkeleton />
        {[...Array(10)].map((_, i) => (
          <CoinRowSkeleton key={i} />
        ))}
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-card to-muted/30">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/20">
        <h3 className="text-lg font-semibold">Market Data</h3>
        <div className="text-sm text-muted-foreground">
          Showing {startIndex} to {endIndex} of {totalItems} coins
        </div>
      </div>

      {/* Table Header - Desktop only */}
      <div className="hidden lg:grid lg:grid-cols-7 gap-4 p-4 border-b bg-muted/10">
        <SortButton label="Coin" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
        <div className="text-right">
          <SortButton label="Price" sortKey="price" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="text-right">
          <SortButton label="24h" sortKey="change24h" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-muted-foreground">7d Chart</span>
        </div>
        <div className="text-right">
          <SortButton label="Market Cap" sortKey="marketCap" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="text-right">
          <SortButton label="Volume" sortKey="volume" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div>
          <span className="text-sm font-medium text-muted-foreground">Live Signals</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border/30">
        {data.map((coin, index) => (
          <CoinRow
            key={coin.id}
            coin={coin}
            index={index}
            onToggleFavorite={onToggleFavorite}
            favorites={favorites}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t bg-muted/10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (pageNum > totalPages) return null;
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  );
});