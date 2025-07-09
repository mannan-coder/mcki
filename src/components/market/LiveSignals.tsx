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
  const get24hSignal = () => {
    const change24h = coin.priceChangePercentage24h;
    if (change24h > 5) return { 
      signal: 'Strong Buy', 
      color: 'text-green-600 dark:text-green-400', 
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: <TrendingUp className="h-3 w-3" />
    };
    if (change24h > 2) return { 
      signal: 'Buy', 
      color: 'text-green-500 dark:text-green-400', 
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: <TrendingUp className="h-3 w-3" />
    };
    if (change24h > -2) return { 
      signal: 'Hold', 
      color: 'text-yellow-600 dark:text-yellow-400', 
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      icon: <Minus className="h-3 w-3" />
    };
    if (change24h > -5) return { 
      signal: 'Sell', 
      color: 'text-red-500 dark:text-red-400', 
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800',
      icon: <TrendingDown className="h-3 w-3" />
    };
    return { 
      signal: 'Strong Sell', 
      color: 'text-red-600 dark:text-red-400', 
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800',
      icon: <TrendingDown className="h-3 w-3" />
    };
  };

  const getVolumeSignal = () => {
    const volumeInB = coin.volume / 1e9;
    if (volumeInB > 10) return { 
      signal: 'High Vol', 
      color: 'text-blue-600 dark:text-blue-400', 
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: <Activity className="h-3 w-3" />
    };
    if (volumeInB > 1) return { 
      signal: 'Med Vol', 
      color: 'text-blue-500 dark:text-blue-400', 
      bgColor: 'bg-blue-50 dark:bg-blue-950/15',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: <Activity className="h-3 w-3" />
    };
    return { 
      signal: 'Low Vol', 
      color: 'text-gray-500 dark:text-gray-400', 
      bgColor: 'bg-gray-50 dark:bg-gray-950/15',
      borderColor: 'border-gray-200 dark:border-gray-800',
      icon: <Activity className="h-3 w-3" />
    };
  };

  const priceSignal = get24hSignal();
  const volumeSignal = getVolumeSignal();

  return (
    <div className="flex flex-col gap-2 min-w-[100px]">
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${priceSignal.color} ${priceSignal.bgColor} ${priceSignal.borderColor}`}>
        {priceSignal.icon}
        <span>{priceSignal.signal}</span>
      </div>
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${volumeSignal.color} ${volumeSignal.bgColor} ${volumeSignal.borderColor}`}>
        {volumeSignal.icon}
        <span>{volumeSignal.signal}</span>
      </div>
    </div>
  );
};