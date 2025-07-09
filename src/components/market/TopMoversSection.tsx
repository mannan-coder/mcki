import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopMoversSkeletonCard } from './SkeletonLoader';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  change24h: number;
  change7d: number;
  price: number;
  volume: number;
}

interface TopMoversSectionProps {
  coins: Coin[];
  loading?: boolean;
}

export const TopMoversSection = ({ coins, loading }: TopMoversSectionProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <TopMoversSkeletonCard />
        <TopMoversSkeletonCard />
        <TopMoversSkeletonCard />
      </div>
    );
  }

  const topGainers = [...coins]
    .filter(coin => coin.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 5);

  const topLosers = [...coins]
    .filter(coin => coin.change24h < 0)
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 5);

  const topVolume = [...coins]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5);

  const MoverCard = ({ title, data, icon, colorClass }: {
    title: string;
    data: Coin[];
    icon: React.ReactNode;
    colorClass: string;
  }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 text-sm font-medium ${colorClass}`}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((coin, index) => (
          <div key={coin.id} className="flex items-center justify-between group hover:bg-muted/30 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-muted-foreground font-mono w-4">#{index + 1}</span>
              <img 
                src={coin.image} 
                alt={coin.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{coin.symbol}</div>
                <div className="text-xs text-muted-foreground truncate">${coin.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold ${
                coin.change24h >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </div>
              {title === 'Top Volume' && (
                <div className="text-xs text-muted-foreground">
                  ${(coin.volume / 1e9).toFixed(1)}B
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <MoverCard
        title="Top Gainers"
        data={topGainers}
        icon={<TrendingUp className="h-4 w-4" />}
        colorClass="text-success"
      />
      <MoverCard
        title="Top Losers"
        data={topLosers}
        icon={<TrendingDown className="h-4 w-4" />}
        colorClass="text-destructive"
      />
      <MoverCard
        title="Top Volume"
        data={topVolume}
        icon={<TrendingUp className="h-4 w-4" />}
        colorClass="text-primary"
      />
    </div>
  );
};