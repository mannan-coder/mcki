import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

interface LiveSignalsProps {
  coin: {
    priceChangePercentage24h: number;
    priceChangePercentage7d?: number;
    volume: number;
    marketCap: number;
  };
}

export const LiveSignals = ({ coin }: LiveSignalsProps) => {
  const getTrendSignal = () => {
    const change24h = coin.priceChangePercentage24h;
    const change7d = coin.priceChangePercentage7d || 0;
    const volumeInB = coin.volume / 1e9;
    
    // More sophisticated signal logic
    const isStrong24h = Math.abs(change24h) > 5;
    const isPositive24h = change24h > 0;
    const isPositive7d = change7d > 0;
    const hasGoodVolume = volumeInB > 1;
    
    // Bullish signals
    if (change24h > 8 && change7d > 15 && hasGoodVolume) {
      return { 
        signal: 'Breakout', 
        color: 'text-emerald-600 dark:text-emerald-400', 
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        icon: <TrendingUp className="h-3 w-3" />
      };
    }
    
    if (change24h > 3 && change7d > 5 && hasGoodVolume) {
      return { 
        signal: 'Strong Buy', 
        color: 'text-green-600 dark:text-green-400', 
        bgColor: 'bg-green-50 dark:bg-green-950/30',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <TrendingUp className="h-3 w-3" />
      };
    }
    
    if (change24h > 1 && isPositive7d) {
      return { 
        signal: 'Buy', 
        color: 'text-green-500 dark:text-green-400', 
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <TrendingUp className="h-3 w-3" />
      };
    }
    
    // Neutral/consolidation signals
    if (Math.abs(change24h) < 2 && Math.abs(change7d) < 5) {
      return { 
        signal: 'Consolidating', 
        color: 'text-blue-600 dark:text-blue-400', 
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: <Minus className="h-3 w-3" />
      };
    }
    
    // Watch signals for potential reversals
    if (change24h < -2 && change24h > -8 && change7d > 0) {
      return { 
        signal: 'Dip Buy', 
        color: 'text-yellow-600 dark:text-yellow-400', 
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    // Bearish but not panic
    if (change24h < -1 && change7d < -3) {
      return { 
        signal: 'Weak', 
        color: 'text-orange-600 dark:text-orange-400', 
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        icon: <TrendingDown className="h-3 w-3" />
      };
    }
    
    // Default to neutral
    return { 
      signal: 'Neutral', 
      color: 'text-gray-600 dark:text-gray-400', 
      bgColor: 'bg-gray-50 dark:bg-gray-950/15',
      borderColor: 'border-gray-200 dark:border-gray-800',
      icon: <Minus className="h-3 w-3" />
    };
  };

  const getMomentumSignal = () => {
    const change24h = coin.priceChangePercentage24h;
    const volumeInB = coin.volume / 1e9;
    const marketCapInB = coin.marketCap / 1e9;
    
    // Volume-to-market cap ratio for momentum
    const volumeRatio = volumeInB / marketCapInB;
    
    if (volumeRatio > 0.15 && change24h > 2) {
      return { 
        signal: 'High Momentum', 
        color: 'text-purple-600 dark:text-purple-400', 
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    if (volumeRatio > 0.1) {
      return { 
        signal: 'Active', 
        color: 'text-blue-600 dark:text-blue-400', 
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    if (volumeRatio > 0.05) {
      return { 
        signal: 'Moderate', 
        color: 'text-indigo-500 dark:text-indigo-400', 
        bgColor: 'bg-indigo-50 dark:bg-indigo-950/15',
        borderColor: 'border-indigo-200 dark:border-indigo-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    return { 
      signal: 'Low Activity', 
      color: 'text-gray-500 dark:text-gray-400', 
      bgColor: 'bg-gray-50 dark:bg-gray-950/15',
      borderColor: 'border-gray-200 dark:border-gray-800',
      icon: <Activity className="h-3 w-3" />
    };
  };

  const trendSignal = getTrendSignal();
  const momentumSignal = getMomentumSignal();

  return (
    <div className="flex flex-col gap-2 min-w-[100px]">
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${trendSignal.color} ${trendSignal.bgColor} ${trendSignal.borderColor}`}>
        {trendSignal.icon}
        <span>{trendSignal.signal}</span>
      </div>
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${momentumSignal.color} ${momentumSignal.bgColor} ${momentumSignal.borderColor}`}>
        {momentumSignal.icon}
        <span>{momentumSignal.signal}</span>
      </div>
    </div>
  );
};