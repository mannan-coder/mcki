import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Zap, Target, AlertTriangle } from 'lucide-react';

interface LiveSignalsProps {
  coin: {
    priceChangePercentage24h: number;
    priceChangePercentage7d?: number;
    volume: number;
    marketCap: number;
    priceChangePercentage1h?: number;
    high24h?: number;
    low24h?: number;
    price?: number;
    athChangePercentage?: number;
    sparkline?: number[];
  };
}

export const LiveSignals = ({ coin }: LiveSignalsProps) => {
  const getTrendSignal = () => {
    const change24h = coin.priceChangePercentage24h;
    const change7d = coin.priceChangePercentage7d || 0;
    const change1h = coin.priceChangePercentage1h || 0;
    const volumeInB = coin.volume / 1e9;
    const athDistance = coin.athChangePercentage || -50;
    
    // More sophisticated signal logic with multiple timeframes
    const isStrong24h = Math.abs(change24h) > 5;
    const isPositive24h = change24h > 0;
    const isPositive7d = change7d > 0;
    const isPositive1h = change1h > 0;
    const hasGoodVolume = volumeInB > 1;
    const nearATH = athDistance > -20; // Within 20% of ATH
    
    // Momentum analysis using sparkline
    let momentumStrength = 0;
    if (coin.sparkline && coin.sparkline.length > 5) {
      const recent = coin.sparkline.slice(-5);
      const earlier = coin.sparkline.slice(-10, -5);
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
      momentumStrength = ((recentAvg - earlierAvg) / earlierAvg) * 100;
    }
    
    // Extreme bullish signals
    if (change24h > 15 && change7d > 25 && hasGoodVolume && momentumStrength > 5) {
      return { 
        signal: 'Rocket', 
        color: 'text-yellow-600 dark:text-yellow-400', 
        bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30',
        borderColor: 'border-yellow-300 dark:border-yellow-700',
        icon: <Zap className="h-3 w-3" />
      };
    }
    
    // Strong breakout patterns
    if (change24h > 8 && change7d > 15 && hasGoodVolume && nearATH) {
      return { 
        signal: 'Breakout', 
        color: 'text-emerald-600 dark:text-emerald-400', 
        bgColor: 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        icon: <TrendingUp className="h-3 w-3" />
      };
    }
    
    // Strong buy with multiple confirmations
    if (change24h > 5 && change7d > 8 && change1h > 1 && hasGoodVolume) {
      return { 
        signal: 'Strong Buy', 
        color: 'text-green-600 dark:text-green-400', 
        bgColor: 'bg-green-50 dark:bg-green-950/30',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <TrendingUp className="h-3 w-3" />
      };
    }
    
    // Regular buy signal
    if (change24h > 2 && isPositive7d && momentumStrength > 0) {
      return { 
        signal: 'Buy', 
        color: 'text-green-500 dark:text-green-400', 
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800',
        icon: <TrendingUp className="h-3 w-3" />
      };
    }
    
    // Accumulation zone (potential reversal)
    if (change24h < -5 && change24h > -15 && change7d > -10 && athDistance < -50) {
      return { 
        signal: 'Accumulate', 
        color: 'text-cyan-600 dark:text-cyan-400', 
        bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
        borderColor: 'border-cyan-200 dark:border-cyan-800',
        icon: <Target className="h-3 w-3" />
      };
    }
    
    // Consolidation/sideways movement
    if (Math.abs(change24h) < 3 && Math.abs(change7d) < 8 && Math.abs(momentumStrength) < 2) {
      return { 
        signal: 'Consolidating', 
        color: 'text-blue-600 dark:text-blue-400', 
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: <Minus className="h-3 w-3" />
      };
    }
    
    // Dip buying opportunity
    if (change24h < -3 && change24h > -10 && change7d > 0 && hasGoodVolume) {
      return { 
        signal: 'Dip Buy', 
        color: 'text-yellow-600 dark:text-yellow-400', 
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    // Caution - potential downtrend
    if (change24h < -5 && change7d < -10 && momentumStrength < -3) {
      return { 
        signal: 'Caution', 
        color: 'text-orange-600 dark:text-orange-400', 
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        icon: <AlertTriangle className="h-3 w-3" />
      };
    }
    
    // Strong sell signal
    if (change24h < -10 && change7d < -15 && change1h < -2) {
      return { 
        signal: 'Sell', 
        color: 'text-red-600 dark:text-red-400', 
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <TrendingDown className="h-3 w-3" />
      };
    }
    
    // Default neutral
    return { 
      signal: 'Neutral', 
      color: 'text-gray-600 dark:text-gray-400', 
      bgColor: 'bg-gray-50 dark:bg-gray-950/15',
      borderColor: 'border-gray-200 dark:border-gray-800',
      icon: <Minus className="h-3 w-3" />
    };
  };

  const getVolumeSignal = () => {
    const change24h = coin.priceChangePercentage24h;
    const volumeInB = coin.volume / 1e9;
    const marketCapInB = coin.marketCap / 1e9;
    
    // Volume-to-market cap ratio for activity analysis
    const volumeRatio = volumeInB / marketCapInB;
    const priceDirection = change24h > 0 ? 'bullish' : 'bearish';
    
    // Whale activity detection
    if (volumeRatio > 0.3 && Math.abs(change24h) > 3) {
      return { 
        signal: 'Whale Activity', 
        color: 'text-purple-600 dark:text-purple-400', 
        bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        icon: <Zap className="h-3 w-3" />
      };
    }
    
    // High momentum with volume confirmation
    if (volumeRatio > 0.15 && change24h > 3) {
      return { 
        signal: 'High Momentum', 
        color: 'text-purple-600 dark:text-purple-400', 
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    // Unusual volume spike
    if (volumeRatio > 0.2) {
      return { 
        signal: 'Volume Spike', 
        color: 'text-indigo-600 dark:text-indigo-400', 
        bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
        borderColor: 'border-indigo-200 dark:border-indigo-800',
        icon: <TrendingUp className="h-3 w-3" />
      };
    }
    
    // Normal active trading
    if (volumeRatio > 0.1) {
      return { 
        signal: 'Active', 
        color: 'text-blue-600 dark:text-blue-400', 
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    // Moderate activity
    if (volumeRatio > 0.05) {
      return { 
        signal: 'Moderate', 
        color: 'text-slate-600 dark:text-slate-400', 
        bgColor: 'bg-slate-50 dark:bg-slate-950/15',
        borderColor: 'border-slate-200 dark:border-slate-800',
        icon: <Activity className="h-3 w-3" />
      };
    }
    
    // Low volume warning
    return { 
      signal: 'Low Volume', 
      color: 'text-gray-500 dark:text-gray-400', 
      bgColor: 'bg-gray-50 dark:bg-gray-950/15',
      borderColor: 'border-gray-200 dark:border-gray-800',
      icon: <Minus className="h-3 w-3" />
    };
  };

  const getRiskSignal = () => {
    const change24h = coin.priceChangePercentage24h;
    const change7d = coin.priceChangePercentage7d || 0;
    const athDistance = coin.athChangePercentage || -50;
    const volatility = Math.abs(change24h) + Math.abs(change7d);
    
    // Risk assessment based on multiple factors
    if (volatility > 50 || change24h > 20 || change24h < -20) {
      return { 
        signal: 'High Risk', 
        color: 'text-red-600 dark:text-red-400', 
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        borderColor: 'border-red-200 dark:border-red-800',
        icon: <AlertTriangle className="h-3 w-3" />
      };
    }
    
    if (volatility > 25 || Math.abs(change24h) > 10) {
      return { 
        signal: 'Med Risk', 
        color: 'text-orange-600 dark:text-orange-400', 
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        icon: <AlertTriangle className="h-3 w-3" />
      };
    }
    
    if (volatility > 10 || Math.abs(change24h) > 5) {
      return { 
        signal: 'Low Risk', 
        color: 'text-yellow-600 dark:text-yellow-400', 
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        icon: <Target className="h-3 w-3" />
      };
    }
    
    return { 
      signal: 'Stable', 
      color: 'text-green-600 dark:text-green-400', 
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: <Target className="h-3 w-3" />
    };
  };

  // Memoize signals to ensure they update when coin data changes
  const signals = useMemo(() => {
    const trendSignal = getTrendSignal();
    const volumeSignal = getVolumeSignal();
    const riskSignal = getRiskSignal();
    
    // Add a timestamp to force updates
    // Force signal recalculation on data changes
    
    return { trendSignal, volumeSignal, riskSignal };
  }, [coin.priceChangePercentage24h, coin.priceChangePercentage7d, coin.volume, coin.marketCap, coin.priceChangePercentage1h]);

  const { trendSignal, volumeSignal, riskSignal } = signals;

  return (
    <div className="flex flex-col gap-1.5 min-w-[120px]">
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${trendSignal.color} ${trendSignal.bgColor} ${trendSignal.borderColor} shadow-sm`}>
        {trendSignal.icon}
        <span>{trendSignal.signal}</span>
      </div>
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${volumeSignal.color} ${volumeSignal.bgColor} ${volumeSignal.borderColor} shadow-sm`}>
        {volumeSignal.icon}
        <span>{volumeSignal.signal}</span>
      </div>
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${riskSignal.color} ${riskSignal.bgColor} ${riskSignal.borderColor} shadow-sm`}>
        {riskSignal.icon}
        <span>{riskSignal.signal}</span>
      </div>
    </div>
  );
};