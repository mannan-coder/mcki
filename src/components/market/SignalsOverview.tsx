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
  borderColor,
  description 
}: { 
  title: string; 
  count: number; 
  coins: any[]; 
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}) => (
  <div className={`${bgColor} ${borderColor} border rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
    <div className={`flex items-center gap-3 ${color} mb-3`}>
      <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-sm font-bold">{title}</span>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{count}</span>
        <span className="text-xs text-muted-foreground">signals</span>
      </div>
      {coins.length > 0 && (
        <div className="flex items-center gap-1">
          {coins.slice(0, 3).map((coin) => (
            <div key={coin.id} className="relative">
              <img 
                src={coin.image} 
                alt={coin.name}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
          ))}
          {coins.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border-2 border-white dark:border-gray-800">
              <span className="text-xs font-medium">
                +{coins.length - 3}
              </span>
            </div>
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
    if (!coins.length) return { buy: [], sell: [], consolidation: [], highVolume: [] };

    // Calculate average volume ratio for baseline
    const avgVolumeRatio = coins.reduce((sum, coin) => sum + (coin.volume / coin.marketCap), 0) / coins.length;
    
    // Advanced BUY signal algorithm
    const buySignals = coins.filter(coin => {
      // Multi-timeframe momentum analysis
      const momentum1h = coin.change1h || 0;
      const momentum24h = coin.change24h;
      const momentum7d = coin.change7d;
      
      // Volume confirmation (above average with momentum)
      const volumeRatio = coin.volume / coin.marketCap;
      const volumeConfirmation = volumeRatio > avgVolumeRatio * 1.5;
      
      // Trend strength calculation
      const trendStrength = (momentum24h > 0 ? 1 : 0) + (momentum7d > 0 ? 1 : 0) + (momentum1h > 0 ? 1 : 0);
      
      // Sparkline momentum (if available)
      let sparklineMomentum = 0;
      if (coin.sparkline && coin.sparkline.length >= 10) {
        const recent = coin.sparkline.slice(-5);
        const earlier = coin.sparkline.slice(-10, -5);
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
        sparklineMomentum = (recentAvg - earlierAvg) / earlierAvg * 100;
      }
      
      // Strong buy conditions
      return (
        momentum24h > 5 && 
        momentum7d > 10 && 
        volumeConfirmation && 
        trendStrength >= 2 && 
        sparklineMomentum > 2 &&
        (coin.athChangePercentage || -20) > -80 // Not too close to ATH
      );
    });

    // Advanced SELL signal algorithm
    const sellSignals = coins.filter(coin => {
      const momentum1h = coin.change1h || 0;
      const momentum24h = coin.change24h;
      const momentum7d = coin.change7d;
      
      // Volume divergence (high volume with negative price action)
      const volumeRatio = coin.volume / coin.marketCap;
      const volumeDivergence = volumeRatio > avgVolumeRatio * 1.3;
      
      // Negative trend strength
      const bearishTrend = (momentum24h < 0 ? 1 : 0) + (momentum7d < 0 ? 1 : 0) + (momentum1h < 0 ? 1 : 0);
      
      // Overbought conditions (near ATH with negative momentum)
      const overbought = (coin.athChangePercentage || -50) > -15 && momentum24h < -3;
      
      // Distribution pattern detection
      let distributionPattern = false;
      if (coin.sparkline && coin.sparkline.length >= 10) {
        const recent = coin.sparkline.slice(-3);
        const peak = Math.max(...coin.sparkline.slice(-10));
        const currentPrice = recent[recent.length - 1];
        distributionPattern = (peak - currentPrice) / peak > 0.05;
      }
      
      return (
        momentum24h < -8 && 
        bearishTrend >= 2 && 
        (volumeDivergence || overbought || distributionPattern) &&
        momentum7d < -10
      );
    });

    // Advanced CONSOLIDATION signal algorithm
    const consolidationSignals = coins.filter(coin => {
      const momentum1h = Math.abs(coin.change1h || 0);
      const momentum24h = Math.abs(coin.change24h);
      const momentum7d = Math.abs(coin.change7d);
      
      // Low volatility across timeframes
      const lowVolatility = momentum1h < 2 && momentum24h < 4 && momentum7d < 8;
      
      // Stable volume (not too high, not too low)
      const volumeRatio = coin.volume / coin.marketCap;
      const stableVolume = volumeRatio > avgVolumeRatio * 0.3 && volumeRatio < avgVolumeRatio * 2;
      
      // Range-bound price action
      let rangeBound = false;
      if (coin.sparkline && coin.sparkline.length >= 20) {
        const prices = coin.sparkline.slice(-20);
        const high = Math.max(...prices);
        const low = Math.min(...prices);
        const range = (high - low) / low;
        const currentPrice = prices[prices.length - 1];
        
        // Price staying within narrow range
        rangeBound = range < 0.15 && currentPrice > low * 1.1 && currentPrice < high * 0.9;
      }
      
      return lowVolatility && stableVolume && (rangeBound || momentum7d < 5);
    });

    // Advanced HIGH VOLUME signal algorithm
    const highVolumeSignals = coins.filter(coin => {
      const volumeRatio = coin.volume / coin.marketCap;
      const momentum24h = Math.abs(coin.change24h);
      
      // Exceptional volume (3x average or more)
      const exceptionalVolume = volumeRatio > avgVolumeRatio * 3;
      
      // Volume with price movement (not just wash trading)
      const volumeWithMovement = volumeRatio > avgVolumeRatio * 2 && momentum24h > 3;
      
      // Breakout volume (high volume with strong directional move)
      const breakoutVolume = volumeRatio > avgVolumeRatio * 2.5 && momentum24h > 8;
      
      // Unusual volume pattern
      let unusualPattern = false;
      if (coin.sparkline && coin.sparkline.length >= 10) {
        const recentVolume = volumeRatio;
        const historicalAvg = avgVolumeRatio;
        unusualPattern = recentVolume > historicalAvg * 4;
      }
      
      return exceptionalVolume || volumeWithMovement || breakoutVolume || unusualPattern;
    });

    return {
      buy: buySignals,
      sell: sellSignals,
      consolidation: consolidationSignals,
      highVolume: highVolumeSignals
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <SignalSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>
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
    <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm">Market Signals</h3>
            <p className="text-xs text-muted-foreground">Live trading indicators</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {signalData.map((signal) => (
            <SignalCard key={signal.title} {...signal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
});