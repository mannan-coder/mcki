import React, { memo, useMemo } from 'react';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SignalsOverviewProps {
  coins: Array<{
    id: string;
    name: string;
    symbol: string;
    image: string;
    price: number;
    change24h: number;
    change7d: number;
    change1h: number;
    volume: number;
    marketCap: number;
    athChangePercentage: number;
    sparkline: number[];
  }>;
  loading?: boolean;
}

const SignalCard = memo(({ 
  title, 
  count, 
  coins, 
  icon, 
  color,
  bgColor,
  borderColor 
}: { 
  title: string; 
  count: number; 
  coins: any[]; 
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}) => (
  <Card className={`${bgColor} ${borderColor} border-2 hover:shadow-lg transition-all duration-300`}>
    <CardHeader className="pb-3">
      <CardTitle className={`text-sm font-bold flex items-center gap-2 ${color}`}>
        {icon}
        {title}
        <Badge variant="outline" className="ml-auto font-bold">
          {count}
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-2">
        {coins.slice(0, 3).map((coin) => (
          <div key={coin.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={coin.image} 
                alt={coin.name}
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <span className="font-semibold text-sm">{coin.symbol}</span>
            </div>
            <span className={`text-sm font-bold ${
              coin.change24h > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(1)}%
            </span>
          </div>
        ))}
        {count > 3 && (
          <div className="text-xs text-muted-foreground text-center pt-1">
            +{count - 3} more coins
          </div>
        )}
      </div>
    </CardContent>
  </Card>
));

const SignalSkeleton = memo(() => (
  <Card className="bg-muted/20">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-muted rounded animate-pulse" />
        <div className="w-20 h-4 bg-muted rounded animate-pulse" />
        <div className="w-8 h-5 bg-muted rounded-full animate-pulse ml-auto" />
      </div>
    </CardHeader>
    <CardContent className="pt-0 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-muted rounded-full animate-pulse" />
            <div className="w-12 h-4 bg-muted rounded animate-pulse" />
          </div>
          <div className="w-12 h-4 bg-muted rounded animate-pulse" />
        </div>
      ))}
    </CardContent>
  </Card>
));

export const SignalsOverview = memo(({ coins, loading }: SignalsOverviewProps) => {
  const signals = useMemo(() => {
    if (!coins.length) return {};

    const strongBuys = coins.filter(coin => 
      coin.change24h > 8 && coin.change7d > 15 && (coin.volume / coin.marketCap) > 0.1
    );

    const breakouts = coins.filter(coin => 
      coin.change24h > 15 && coin.change7d > 25 && (coin.volume / coin.marketCap) > 0.2
    );

    const accumulation = coins.filter(coin => 
      coin.change24h > -10 && coin.change24h < -3 && coin.change7d > 0 && 
      (coin.athChangePercentage || -50) < -40
    );

    const highVolume = coins.filter(coin => 
      (coin.volume / coin.marketCap) > 0.25 && Math.abs(coin.change24h) > 5
    );

    const strongSells = coins.filter(coin => 
      coin.change24h < -8 && coin.change7d < -15 && (coin.change1h || 0) < -2
    );

    const consolidation = coins.filter(coin => 
      Math.abs(coin.change24h) < 3 && Math.abs(coin.change7d || 0) < 8
    );

    return {
      strongBuys,
      breakouts,
      accumulation,
      highVolume,
      strongSells,
      consolidation
    };
  }, [coins]);

  if (loading && !coins.length) {
    return (
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Market Signals Overview</h2>
          <p className="text-muted-foreground">Real-time trading signals across all cryptocurrencies</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <SignalSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const signalData = [
    {
      title: 'Breakouts',
      count: signals.breakouts?.length || 0,
      coins: signals.breakouts || [],
      icon: <Zap className="h-4 w-4" />,
      color: 'text-yellow-700',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-300'
    },
    {
      title: 'Strong Buys',
      count: signals.strongBuys?.length || 0,
      coins: signals.strongBuys || [],
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'text-green-700',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-300'
    },
    {
      title: 'High Volume',
      count: signals.highVolume?.length || 0,
      coins: signals.highVolume || [],
      icon: <Activity className="h-4 w-4" />,
      color: 'text-purple-700',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-300'
    },
    {
      title: 'Accumulation',
      count: signals.accumulation?.length || 0,
      coins: signals.accumulation || [],
      icon: <Target className="h-4 w-4" />,
      color: 'text-cyan-700',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-300'
    },
    {
      title: 'Consolidation',
      count: signals.consolidation?.length || 0,
      coins: signals.consolidation || [],
      icon: <Activity className="h-4 w-4" />,
      color: 'text-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      borderColor: 'border-blue-300'
    },
    {
      title: 'Strong Sells',
      count: signals.strongSells?.length || 0,
      coins: signals.strongSells || [],
      icon: <TrendingDown className="h-4 w-4" />,
      color: 'text-red-700',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      borderColor: 'border-red-300'
    }
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Market Signals Overview</h2>
        <p className="text-muted-foreground">Real-time trading signals across all cryptocurrencies</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {signalData.map((signal) => (
          <SignalCard key={signal.title} {...signal} />
        ))}
      </div>
    </div>
  );
});