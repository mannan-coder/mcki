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
  <div className={`${bgColor} ${borderColor} border rounded-lg p-3 hover:shadow-md transition-all duration-200`}>
    <div className={`flex items-center gap-2 ${color} mb-2`}>
      {icon}
      <span className="text-xs font-medium">{title}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">{count}</span>
      {coins.length > 0 && (
        <div className="flex items-center gap-1">
          {coins.slice(0, 2).map((coin) => (
            <img 
              key={coin.id}
              src={coin.image} 
              alt={coin.name}
              className="w-4 h-4 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          ))}
          {coins.length > 2 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{coins.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  </div>
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
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm">Market Signals</h3>
              <p className="text-xs text-muted-foreground">Live trading indicators</p>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <SignalSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>
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
    <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm">Market Signals</h3>
            <p className="text-xs text-muted-foreground">Live trading indicators</p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {signalData.map((signal) => (
            <SignalCard key={signal.title} {...signal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
});