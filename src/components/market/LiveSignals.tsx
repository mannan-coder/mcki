import React from 'react';
import { Badge } from '@/components/ui/badge';

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
    if (change24h > 5) return { signal: 'STRONG BUY', color: 'bg-green-600 text-white', icon: '🚀' };
    if (change24h > 2) return { signal: 'BUY', color: 'bg-green-500 text-white', icon: '📈' };
    if (change24h > -2) return { signal: 'HOLD', color: 'bg-yellow-500 text-white', icon: '⏸️' };
    if (change24h > -5) return { signal: 'SELL', color: 'bg-red-500 text-white', icon: '📉' };
    return { signal: 'STRONG SELL', color: 'bg-red-600 text-white', icon: '💥' };
  };

  const getVolumeSignal = () => {
    // Simple volume-based signal (this could be more sophisticated)
    const volumeInB = coin.volume / 1e9;
    if (volumeInB > 10) return { signal: 'HIGH VOL', color: 'bg-blue-500 text-white', icon: '📊' };
    if (volumeInB > 1) return { signal: 'MED VOL', color: 'bg-blue-400 text-white', icon: '📊' };
    return { signal: 'LOW VOL', color: 'bg-gray-500 text-white', icon: '📊' };
  };

  const priceSignal = get24hSignal();
  const volumeSignal = getVolumeSignal();

  return (
    <div className="flex flex-col gap-1">
      <Badge className={`text-xs px-2 py-1 ${priceSignal.color}`}>
        <span className="mr-1">{priceSignal.icon}</span>
        {priceSignal.signal}
      </Badge>
      <Badge className={`text-xs px-2 py-1 ${volumeSignal.color}`}>
        <span className="mr-1">{volumeSignal.icon}</span>
        {volumeSignal.signal}
      </Badge>
    </div>
  );
};