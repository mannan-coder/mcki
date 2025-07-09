import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity, 
  Zap, 
  Target, 
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart3,
  PieChart,
  Signal
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EnhancedSignalsProps {
  coin: {
    priceChangePercentage24h: number;
    priceChangePercentage7d?: number;
    priceChangePercentage1h?: number;
    volume: number;
    marketCap: number;
    high24h?: number;
    low24h?: number;
    price?: number;
    athChangePercentage?: number;
    sparkline?: number[];
  };
}

interface SignalData {
  signal: string;
  type: 'trend' | 'volume' | 'momentum' | 'risk';
  strength: 'weak' | 'moderate' | 'strong' | 'extreme';
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  confidence: number;
  description: string;
}

export const EnhancedSignals = ({ coin }: EnhancedSignalsProps) => {
  const signals = useMemo(() => {
    const change24h = coin.priceChangePercentage24h;
    const change7d = coin.priceChangePercentage7d || 0;
    const change1h = coin.priceChangePercentage1h || 0;
    const volumeInB = coin.volume / 1e9;
    const marketCapInB = coin.marketCap / 1e9;
    const athDistance = coin.athChangePercentage || -50;
    const volumeRatio = volumeInB / marketCapInB;
    
    // Calculate momentum from sparkline
    let momentum = 0;
    if (coin.sparkline && coin.sparkline.length > 10) {
      const recent = coin.sparkline.slice(-5);
      const earlier = coin.sparkline.slice(-10, -5);
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
      momentum = ((recentAvg - earlierAvg) / earlierAvg) * 100;
    }
    
    const volatility = Math.abs(change24h) + Math.abs(change7d) + Math.abs(change1h);
    const signals: SignalData[] = [];
    
    // === TREND SIGNALS ===
    
    // Extreme Bullish Breakout
    if (change24h > 20 && change7d > 30 && change1h > 5 && volumeRatio > 0.3) {
      signals.push({
        signal: 'BREAKOUT',
        type: 'trend',
        strength: 'extreme',
        color: 'text-yellow-600',
        bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100',
        icon: <Zap className="h-3 w-3" />,
        confidence: 95,
        description: 'Explosive upward momentum with high volume'
      });
    }
    // Strong Buy Signal
    else if (change24h > 8 && change7d > 15 && momentum > 5) {
      signals.push({
        signal: 'STRONG BUY',
        type: 'trend',
        strength: 'strong',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: <ArrowUpCircle className="h-3 w-3" />,
        confidence: 85,
        description: 'Strong bullish momentum across timeframes'
      });
    }
    // Buy Signal
    else if (change24h > 3 && change7d > 5 && change1h > 0) {
      signals.push({
        signal: 'BUY',
        type: 'trend',
        strength: 'moderate',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        icon: <TrendingUp className="h-3 w-3" />,
        confidence: 70,
        description: 'Positive trend with upward momentum'
      });
    }
    // Accumulation Zone
    else if (change24h > -10 && change24h < -3 && change7d > 0 && athDistance < -40) {
      signals.push({
        signal: 'ACCUMULATE',
        type: 'trend',
        strength: 'moderate',
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50',
        icon: <Target className="h-3 w-3" />,
        confidence: 65,
        description: 'Potential reversal zone for accumulation'
      });
    }
    // Sell Signal
    else if (change24h < -8 && change7d < -15 && change1h < -2) {
      signals.push({
        signal: 'SELL',
        type: 'trend',
        strength: 'strong',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: <ArrowDownCircle className="h-3 w-3" />,
        confidence: 80,
        description: 'Strong bearish momentum across timeframes'
      });
    }
    // Consolidation
    else if (Math.abs(change24h) < 3 && Math.abs(change7d) < 8) {
      signals.push({
        signal: 'CONSOLIDATION',
        type: 'trend',
        strength: 'weak',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: <Minus className="h-3 w-3" />,
        confidence: 60,
        description: 'Sideways movement, awaiting direction'
      });
    }
    
    // === VOLUME SIGNALS ===
    
    // Whale Activity
    if (volumeRatio > 0.5 && Math.abs(change24h) > 5) {
      signals.push({
        signal: 'WHALE ACTIVITY',
        type: 'volume',
        strength: 'extreme',
        color: 'text-purple-600',
        bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100',
        icon: <Signal className="h-3 w-3" />,
        confidence: 90,
        description: 'Unusual large volume indicating institutional activity'
      });
    }
    // High Volume
    else if (volumeRatio > 0.25) {
      signals.push({
        signal: 'HIGH VOLUME',
        type: 'volume',
        strength: 'strong',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        icon: <BarChart3 className="h-3 w-3" />,
        confidence: 75,
        description: 'Significantly above average trading volume'
      });
    }
    // Volume Spike
    else if (volumeRatio > 0.15 && change24h > 3) {
      signals.push({
        signal: 'VOLUME SPIKE',
        type: 'volume',
        strength: 'moderate',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        icon: <Activity className="h-3 w-3" />,
        confidence: 70,
        description: 'Volume spike supporting price movement'
      });
    }
    // Low Volume Warning
    else if (volumeRatio < 0.05) {
      signals.push({
        signal: 'LOW VOLUME',
        type: 'volume',
        strength: 'weak',
        color: 'text-gray-500',
        bgColor: 'bg-gray-50',
        icon: <PieChart className="h-3 w-3" />,
        confidence: 40,
        description: 'Below average volume may indicate weak momentum'
      });
    }
    
    // === MOMENTUM SIGNALS ===
    
    // Strong Momentum
    if (momentum > 10 && change24h > 5) {
      signals.push({
        signal: 'MOMENTUM',
        type: 'momentum',
        strength: 'strong',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        icon: <TrendingUp className="h-3 w-3" />,
        confidence: 80,
        description: 'Strong upward momentum building'
      });
    }
    // Momentum Reversal
    else if (momentum < -10 && change24h < -5) {
      signals.push({
        signal: 'REVERSAL',
        type: 'momentum',
        strength: 'moderate',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        icon: <TrendingDown className="h-3 w-3" />,
        confidence: 70,
        description: 'Momentum shifting to downside'
      });
    }
    
    // === RISK SIGNALS ===
    
    // High Risk
    if (volatility > 40 || Math.abs(change24h) > 15) {
      signals.push({
        signal: 'HIGH RISK',
        type: 'risk',
        strength: 'extreme',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: <AlertTriangle className="h-3 w-3" />,
        confidence: 85,
        description: 'High volatility indicates significant risk'
      });
    }
    // Medium Risk
    else if (volatility > 20 || Math.abs(change24h) > 8) {
      signals.push({
        signal: 'MEDIUM RISK',
        type: 'risk',
        strength: 'moderate',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        icon: <AlertTriangle className="h-3 w-3" />,
        confidence: 70,
        description: 'Moderate volatility requires caution'
      });
    }
    // Low Risk
    else if (volatility < 10 && Math.abs(change24h) < 5) {
      signals.push({
        signal: 'LOW RISK',
        type: 'risk',
        strength: 'weak',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <Target className="h-3 w-3" />,
        confidence: 60,
        description: 'Stable price action with low volatility'
      });
    }
    
    return signals.sort((a, b) => b.confidence - a.confidence).slice(0, 4);
  }, [coin]);

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'extreme': return 'border-2 border-yellow-400 shadow-lg';
      case 'strong': return 'border-2 border-green-400 shadow-md';
      case 'moderate': return 'border border-blue-400 shadow-sm';
      default: return 'border border-gray-300';
    }
  };

  return (
    <div className="flex gap-1.5 flex-wrap max-w-[200px]">
      {signals.slice(0, 3).map((signal, index) => (
        <div
          key={index}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-all duration-200 hover:scale-105 cursor-pointer ${signal.color} ${signal.bgColor} border ${getBorderColor(signal.strength)}`}
          title={`${signal.description} (${signal.confidence}% confidence)`}
        >
          <span className="text-xs">{signal.icon}</span>
          <span className="text-xs font-bold truncate">{signal.signal}</span>
          <span className="text-xs font-bold opacity-75">{signal.confidence}%</span>
        </div>
      ))}
      
      {signals.length === 0 && (
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200">
          <Minus className="h-3 w-3" />
          <span className="text-xs">NEUTRAL</span>
          <span className="text-xs opacity-75">50%</span>
        </div>
      )}
      
      {signals.length > 3 && (
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground bg-muted/50 border border-muted">
          <span className="text-xs">+{signals.length - 3}</span>
        </div>
      )}
    </div>
  );

  function getBorderColor(strength: string) {
    switch (strength) {
      case 'extreme': return 'border-yellow-400';
      case 'strong': return 'border-green-400';
      case 'moderate': return 'border-blue-400';
      default: return 'border-gray-300';
    }
  }
};