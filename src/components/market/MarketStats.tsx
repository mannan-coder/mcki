import React, { memo } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3, Globe, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MarketStatsProps {
  data?: {
    totalMarketCap: number;
    totalVolume: number;
    btcDominance: number;
    activeCryptocurrencies: number;
    fearGreedIndex: number;
  };
  loading?: boolean;
}

const StatCard = memo(({ 
  title, 
  value, 
  change, 
  icon, 
  trend 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode; 
  trend: 'up' | 'down' | 'neutral';
}) => (
  <Card className="border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          trend === 'up' 
            ? 'bg-success/20 text-success' 
            : trend === 'down' 
            ? 'bg-destructive/20 text-destructive' 
            : 'bg-muted/20 text-muted-foreground'
        }`}>
          {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : trend === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </CardContent>
  </Card>
));

const StatSkeleton = memo(() => (
  <Card className="border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 bg-muted rounded-lg animate-pulse" />
        <div className="w-16 h-6 bg-muted rounded-full animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="w-20 h-4 bg-muted rounded animate-pulse" />
        <div className="w-24 h-8 bg-muted rounded animate-pulse" />
      </div>
    </CardContent>
  </Card>
));

export const MarketStats = memo(({ data, loading }: MarketStatsProps) => {
  if (loading && !data) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        {[...Array(6)].map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const getFearGreedLevel = (value: number) => {
    if (value >= 75) return { label: 'Extreme Greed', color: 'text-green-600' };
    if (value >= 55) return { label: 'Greed', color: 'text-green-500' };
    if (value >= 45) return { label: 'Neutral', color: 'text-yellow-500' };
    if (value >= 25) return { label: 'Fear', color: 'text-orange-500' };
    return { label: 'Extreme Fear', color: 'text-red-500' };
  };

  const fearGreed = getFearGreedLevel(data.fearGreedIndex);

  const stats = [
    {
      title: 'Market Cap',
      value: formatCurrency(data.totalMarketCap),
      change: '+2.4%',
      icon: <BarChart3 className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: '24h Volume',
      value: formatCurrency(data.totalVolume),
      change: '+8.1%',
      icon: <Activity className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'BTC Dominance',
      value: formatPercentage(data.btcDominance),
      change: '-0.5%',
      icon: <span className="text-orange-500 font-bold">₿</span>,
      trend: 'down' as const
    },
    {
      title: 'Active Cryptos',
      value: data.activeCryptocurrencies.toLocaleString(),
      change: '+12',
      icon: <Globe className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Fear & Greed',
      value: data.fearGreedIndex.toString(),
      change: fearGreed.label,
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 'neutral' as const
    },
    {
      title: 'Top Gainers',
      value: '127',
      change: '+23.4%',
      icon: <DollarSign className="h-4 w-4" />,
      trend: 'up' as const
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
});