import React, { memo, useMemo } from 'react';
import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SignalCard } from './SignalCard';
import { SignalSkeleton } from './SignalSkeleton';
import { calculateSignals } from '@/utils/signalAlgorithms';

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

export const SignalsOverview = memo(({ coins, loading }: SignalsOverviewProps) => {
  const signals = useMemo(() => calculateSignals(coins), [coins]);

  if (loading && !coins.length) {
    return (
      <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">Market Signals</h3>
              <p className="text-sm text-muted-foreground">Advanced AI-powered trading indicators with real-time analysis</p>
            </div>
            <Badge variant="outline" className="text-xs font-medium">
              Loading...
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SignalSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const signalData = [
    {
      title: 'BUY',
      count: signals.buy?.length || 0,
      coins: signals.buy || [],
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50',
      borderColor: 'border-emerald-300 dark:border-emerald-700',
      description: 'Multi-timeframe bullish momentum'
    },
    {
      title: 'SELL',
      count: signals.sell?.length || 0,
      coins: signals.sell || [],
      icon: <TrendingDown className="h-5 w-5" />,
      color: 'text-red-700 dark:text-red-300',
      bgColor: 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/50 dark:to-rose-950/50',
      borderColor: 'border-red-300 dark:border-red-700',
      description: 'Bearish trend with distribution'
    },
    {
      title: 'CONSOLIDATION',
      count: signals.consolidation?.length || 0,
      coins: signals.consolidation || [],
      icon: <Activity className="h-5 w-5" />,
      color: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50',
      borderColor: 'border-blue-300 dark:border-blue-700',
      description: 'Range-bound with low volatility'
    },
    {
      title: 'HIGH VOLUME',
      count: signals.highVolume?.length || 0,
      coins: signals.highVolume || [],
      icon: <Zap className="h-5 w-5" />,
      color: 'text-purple-700 dark:text-purple-300',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50',
      borderColor: 'border-purple-300 dark:border-purple-700',
      description: 'Unusual trading activity'
    }
  ];

  return (
    <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">Market Signals</h3>
            <p className="text-sm text-muted-foreground">Advanced AI-powered trading indicators with real-time analysis</p>
          </div>
          <Badge variant="outline" className="text-xs font-medium">
            Live Data
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {signalData.map((signal) => (
            <SignalCard key={signal.title} {...signal} />
          ))}
        </div>
      </div>
    </div>
  );
});