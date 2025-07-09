import React, { memo } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TopMoversProps {
  coins: Array<{
    id: string;
    name: string;
    symbol: string;
    image: string;
    price: number;
    change24h: number;
    volume: number;
    marketCap: number;
  }>;
  loading?: boolean;
}

const MoverCard = memo(({ 
  coin, 
  type 
}: { 
  coin: any; 
  type: 'gainer' | 'loser' | 'volume';
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
    <img 
      src={coin.image} 
      alt={coin.name}
      className="w-8 h-8 rounded-full"
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/placeholder.svg';
      }}
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm truncate">{coin.symbol}</span>
        <Badge variant="outline" className="text-xs">
          #{coin.rank || 'N/A'}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground truncate">{coin.name}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-semibold">${coin.price.toLocaleString()}</p>
      <p className={`text-xs flex items-center gap-1 ${
        type === 'gainer' 
          ? 'text-success' 
          : type === 'loser' 
          ? 'text-destructive' 
          : 'text-primary'
      }`}>
        {type === 'gainer' && <TrendingUp className="h-3 w-3" />}
        {type === 'loser' && <TrendingDown className="h-3 w-3" />}
        {type === 'volume' && <Activity className="h-3 w-3" />}
        {type === 'volume' 
          ? `$${(coin.volume / 1e9).toFixed(1)}B`
          : `${coin.change24h > 0 ? '+' : ''}${coin.change24h.toFixed(1)}%`
        }
      </p>
    </div>
  </div>
));

const MoverSkeleton = memo(() => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
    <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="w-16 h-4 bg-muted rounded animate-pulse" />
      <div className="w-24 h-3 bg-muted rounded animate-pulse" />
    </div>
    <div className="text-right space-y-2">
      <div className="w-16 h-4 bg-muted rounded animate-pulse" />
      <div className="w-12 h-3 bg-muted rounded animate-pulse" />
    </div>
  </div>
));

export const TopMovers = memo(({ coins, loading }: TopMoversProps) => {
  if (loading && !coins.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {['Top Gainers', 'Top Losers', 'Highest Volume'].map((title) => (
          <Card key={title} className="border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {[...Array(3)].map((_, i) => (
                <MoverSkeleton key={i} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!coins.length) return null;

  const gainers = coins
    .filter(coin => coin.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3);

  const losers = coins
    .filter(coin => coin.change24h < 0)
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 3);

  const highVolume = coins
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            Top Gainers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {gainers.map((coin) => (
            <MoverCard key={coin.id} coin={coin} type="gainer" />
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            Top Losers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {losers.map((coin) => (
            <MoverCard key={coin.id} coin={coin} type="loser" />
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Highest Volume
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {highVolume.map((coin) => (
            <MoverCard key={coin.id} coin={coin} type="volume" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
});