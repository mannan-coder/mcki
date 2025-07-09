import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, Minus, AlertTriangle, Zap } from 'lucide-react';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

interface MarketSignalCardsProps {
  coins: Array<{
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    change7d?: number;
    volume: number;
    marketCap: number;
    image: string;
  }>;
}

export const MarketSignalCards = ({ coins }: MarketSignalCardsProps) => {
  const signalData = useMemo(() => {
    // Helper functions for technical analysis
    const calculateRSI = (change24h: number, change7d: number) => {
      // Simplified RSI calculation based on recent price changes
      const avgGain = Math.max(0, change24h) + Math.max(0, change7d);
      const avgLoss = Math.abs(Math.min(0, change24h)) + Math.abs(Math.min(0, change7d));
      if (avgLoss === 0) return 100;
      const rs = avgGain / avgLoss;
      return 100 - (100 / (1 + rs));
    };

    const getVolumeStrength = (volume: number, marketCap: number) => {
      const volumeRatio = volume / marketCap;
      if (volumeRatio > 0.2) return 'extreme';
      if (volumeRatio > 0.1) return 'high';
      if (volumeRatio > 0.05) return 'moderate';
      if (volumeRatio > 0.02) return 'low';
      return 'minimal';
    };

    const getTrendStrength = (change24h: number, change7d: number) => {
      const momentum = change24h + (change7d / 7); // Weighted momentum
      if (Math.abs(momentum) > 10) return 'strong';
      if (Math.abs(momentum) > 5) return 'moderate';
      if (Math.abs(momentum) > 2) return 'weak';
      return 'sideways';
    };

    const isBreakoutPattern = (change24h: number, volume: number, marketCap: number) => {
      const volumeRatio = volume / marketCap;
      return Math.abs(change24h) > 3 && volumeRatio > 0.08;
    };

    // ENHANCED BUY SIGNALS - Multiple confirmation factors
    const buySignals = coins.filter(coin => {
      const { change24h, change7d = 0, volume, marketCap } = coin;
      const rsi = calculateRSI(change24h, change7d);
      const volumeStrength = getVolumeStrength(volume, marketCap);
      const trendStrength = getTrendStrength(change24h, change7d);
      const volumeRatio = volume / marketCap;
      const marketCapInB = marketCap / 1e9;

      // Buy criteria: Multiple confirmation signals
      const bullishMomentum = change24h > 1 && change7d > -15; // Recovery from dip allowed
      const volumeConfirmation = volumeRatio > 0.03 && volumeStrength !== 'minimal';
      const rsiOversoldRecovery = rsi < 40 && change24h > 0; // RSI oversold with recovery
      const breakoutPattern = isBreakoutPattern(change24h, volume, marketCap) && change24h > 0;
      const trendReversal = change24h > 3 && change7d < 0 && volumeRatio > 0.05; // Reversal pattern
      const qualityToken = marketCapInB > 0.1; // Minimum credibility

      const signals = [
        bullishMomentum,
        volumeConfirmation,
        rsiOversoldRecovery,
        breakoutPattern,
        trendReversal,
        qualityToken
      ].filter(Boolean).length;

      return signals >= 3; // Require at least 3 confirmation signals
    })
    .sort((a, b) => {
      // Sort by momentum score
      const scoreA = a.change24h + (a.volume / a.marketCap) * 100;
      const scoreB = b.change24h + (b.volume / b.marketCap) * 100;
      return scoreB - scoreA;
    })
    .slice(0, 4);

    // ENHANCED SELL SIGNALS - Professional grade analysis
    const sellSignals = coins.filter(coin => {
      const { change24h, change7d = 0, volume, marketCap } = coin;
      const rsi = calculateRSI(change24h, change7d);
      const volumeStrength = getVolumeStrength(volume, marketCap);
      const trendStrength = getTrendStrength(change24h, change7d);
      const volumeRatio = volume / marketCap;
      const marketCapInB = marketCap / 1e9;

      // Sell criteria: Distribution and breakdown patterns
      const bearishMomentum = change24h < -2 && change7d < -3; // Sustained decline
      const distributionPattern = change24h < 0 && volumeRatio > 0.06; // High volume selling
      const rsiOverboughtDecline = rsi > 65 && change24h < -1; // Overbought and declining
      const breakdownPattern = isBreakoutPattern(change24h, volume, marketCap) && change24h < -3;
      const trendDeteriorating = change24h < change7d && change24h < -1; // Accelerating decline
      const profitTakingPattern = change7d > 15 && change24h < -3 && volumeRatio > 0.08; // Profit taking after gains
      const weeklyDowntrend = change7d < -10 && change24h < 0; // Confirmed downtrend
      const volumeDivergence = change24h < -5 && volumeRatio > 0.1; // High volume decline

      const bearishSignals = [
        bearishMomentum,
        distributionPattern,
        rsiOverboughtDecline,
        breakdownPattern,
        trendDeteriorating,
        profitTakingPattern,
        weeklyDowntrend,
        volumeDivergence
      ].filter(Boolean).length;

      return bearishSignals >= 2 && marketCapInB > 0.05; // Require 2+ bearish signals
    })
    .sort((a, b) => {
      // Sort by bearish strength (most bearish first)
      const scoreA = Math.abs(a.change24h) + Math.abs(a.change7d || 0) + (a.volume / a.marketCap) * 50;
      const scoreB = Math.abs(b.change24h) + Math.abs(b.change7d || 0) + (b.volume / b.marketCap) * 50;
      return scoreB - scoreA;
    })
    .slice(0, 4);

    // ENHANCED CONSOLIDATING SIGNALS - Range-bound analysis
    const consolidatingSignals = coins.filter(coin => {
      const { change24h, change7d = 0, volume, marketCap } = coin;
      const rsi = calculateRSI(change24h, change7d);
      const volumeRatio = volume / marketCap;
      const volatility = Math.abs(change24h) + Math.abs(change7d) / 7;
      const marketCapInB = marketCap / 1e9;

      // Consolidation criteria: Low volatility with balanced pressure
      const lowVolatility = volatility < 4; // Low combined volatility
      const balancedRSI = rsi > 35 && rsi < 65; // Neither oversold nor overbought
      const moderateVolume = volumeRatio > 0.02 && volumeRatio < 0.12; // Healthy but not extreme volume
      const rangebound = Math.abs(change24h) < 3 && Math.abs(change7d) < 8;
      const accumulation = change7d > -5 && change7d < 10; // Gentle accumulation range
      const qualityToken = marketCapInB > 0.1;

      const consolidationSignals = [
        lowVolatility,
        balancedRSI,
        moderateVolume,
        rangebound,
        accumulation,
        qualityToken
      ].filter(Boolean).length;

      return consolidationSignals >= 4;
    })
    .sort((a, b) => {
      // Sort by stability (least volatile first)
      const stabilityA = Math.abs(a.change24h) + Math.abs(a.change7d || 0) / 7;
      const stabilityB = Math.abs(b.change24h) + Math.abs(b.change7d || 0) / 7;
      return stabilityA - stabilityB;
    })
    .slice(0, 4);

    // ENHANCED HIGH MOMENTUM SIGNALS - Explosive movement detection
    const momentumSignals = coins.filter(coin => {
      const { change24h, change7d = 0, volume, marketCap } = coin;
      const volumeRatio = volume / marketCap;
      const volumeStrength = getVolumeStrength(volume, marketCap);
      const trendStrength = getTrendStrength(change24h, change7d);
      const marketCapInB = marketCap / 1e9;

      // Momentum criteria: Exceptional movement with volume confirmation
      const strongMovement = Math.abs(change24h) > 5;
      const volumeExplosion = volumeRatio > 0.15 || volumeStrength === 'extreme';
      const parabolicMove = Math.abs(change24h) > 10 && volumeRatio > 0.08;
      const breakoutVolume = Math.abs(change24h) > 3 && volumeRatio > 0.12;
      const trendAcceleration = Math.abs(change24h) > Math.abs(change7d / 3); // Accelerating trend
      const qualityToken = marketCapInB > 0.05;
      const sustainedMomentum = (change24h > 5 && change7d > 0) || (change24h < -5 && change7d < -5);

      const momentumSignals = [
        strongMovement,
        volumeExplosion,
        parabolicMove,
        breakoutVolume,
        trendAcceleration,
        qualityToken,
        sustainedMomentum
      ].filter(Boolean).length;

      return momentumSignals >= 3;
    })
    .sort((a, b) => {
      // Sort by momentum intensity
      const intensityA = Math.abs(a.change24h) * (a.volume / a.marketCap) * 100;
      const intensityB = Math.abs(b.change24h) * (b.volume / b.marketCap) * 100;
      return intensityB - intensityA;
    })
    .slice(0, 4);

    return { buySignals, sellSignals, consolidatingSignals, momentumSignals };
  }, [coins]);

  const SignalCard = ({ 
    title, 
    icon, 
    color, 
    bgColor, 
    coins, 
    description,
    strength 
  }: {
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    coins: any[];
    description: string;
    strength?: string;
  }) => (
    <Card className={`${bgColor} border hover:shadow-lg transition-all duration-300`}>
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 text-lg ${color}`}>
          {icon}
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {coins.length > 0 ? coins.map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
              onClick={() => window.location.href = `/coin/${coin.id}`}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={coin.image} 
                  alt={coin.name}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div>
                  <div className="font-medium text-sm">{coin.symbol.toUpperCase()}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-[80px]">{coin.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">${coin.price.toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
                <div className={`text-xs ${coin.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No coins match this signal
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Signal Cards Header */}
      <div className="text-left">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          Live Market Signals
        </h2>
        <p className="text-muted-foreground">Real-time analysis based on price action, volume, and momentum indicators</p>
      </div>

      {/* Signal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SignalCard
          title="Buy Signals"
          icon={<TrendingUp className="h-5 w-5" />}
          color="text-success"
          bgColor="bg-success/5 border-success/20"
          coins={signalData.buySignals}
          description="Strong upward momentum with volume confirmation"
          strength="BULLISH"
        />
        
        <SignalCard
          title="Sell Signals" 
          icon={<TrendingDown className="h-5 w-5" />}
          color="text-destructive"
          bgColor="bg-destructive/5 border-destructive/20"
          coins={signalData.sellSignals}
          description="Declining momentum with selling pressure"
          strength="BEARISH"
        />
        
        <SignalCard
          title="Consolidating"
          icon={<Minus className="h-5 w-5" />}
          color="text-blue-600 dark:text-blue-400"
          bgColor="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50"
          coins={signalData.consolidatingSignals}
          description="Stable price action, potential for breakout"
          strength="NEUTRAL"
        />
        
        <SignalCard
          title="High Momentum"
          icon={<Activity className="h-5 w-5" />}
          color="text-purple-600 dark:text-purple-400"
          bgColor="bg-purple-50/50 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-800/50"
          coins={signalData.momentumSignals}
          description="Exceptional volume with strong price movement"
          strength="VOLATILE"
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{signalData.buySignals.length}</div>
          <div className="text-xs text-muted-foreground">Buy Signals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive">{signalData.sellSignals.length}</div>
          <div className="text-xs text-muted-foreground">Sell Signals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{signalData.consolidatingSignals.length}</div>
          <div className="text-xs text-muted-foreground">Consolidating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{signalData.momentumSignals.length}</div>
          <div className="text-xs text-muted-foreground">High Momentum</div>
        </div>
      </div>
    </div>
  );
};