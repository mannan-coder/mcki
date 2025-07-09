import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, Minus, AlertTriangle } from 'lucide-react';
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
    // Enhanced Buy Signals Logic
    const buySignals = coins.filter(coin => {
      const change24h = coin.change24h;
      const change7d = coin.change7d || 0;
      const volumeRatio = coin.volume / coin.marketCap;
      const avgVolume = coin.volume / 1e9; // Volume in billions
      
      // Strong buy criteria: positive momentum + high volume + recovering from dip
      return (
        change24h > 2 && // Strong 24h gains
        change7d > -10 && // Not in severe decline
        volumeRatio > 0.05 && // High volume relative to market cap
        avgVolume > 0.1 // Minimum liquidity
      );
    })
    .sort((a, b) => (b.change24h + (b.change7d || 0)) - (a.change24h + (a.change7d || 0)))
    .slice(0, 4);

    // Enhanced Sell Signals Logic
    const sellSignals = coins.filter(coin => {
      const change24h = coin.change24h;
      const change7d = coin.change7d || 0;
      const volumeRatio = coin.volume / coin.marketCap;
      
      // Strong sell criteria: declining momentum + high volume (selling pressure)
      return (
        change24h < -3 && // Significant 24h decline
        change7d < -5 && // Weekly decline trend
        volumeRatio > 0.04 && // High volume indicating selling pressure
        change24h < change7d // Accelerating decline
      );
    })
    .sort((a, b) => a.change24h - b.change24h) // Most declining first
    .slice(0, 4);

    // Enhanced Consolidating Signals Logic  
    const consolidatingSignals = coins.filter(coin => {
      const change24h = coin.change24h;
      const change7d = coin.change7d || 0;
      const volumeRatio = coin.volume / coin.marketCap;
      
      // Consolidation: low volatility + steady volume
      return (
        Math.abs(change24h) < 3 && // Low 24h volatility
        Math.abs(change7d) < 8 && // Low weekly volatility  
        volumeRatio > 0.02 && // Healthy volume
        volumeRatio < 0.15 // Not excessive volume
      );
    })
    .sort((a, b) => Math.abs(a.change24h) - Math.abs(b.change24h)) // Most stable first
    .slice(0, 4);

    // Enhanced High Momentum Signals Logic
    const momentumSignals = coins.filter(coin => {
      const change24h = coin.change24h;
      const change7d = coin.change7d || 0;
      const volumeRatio = coin.volume / coin.marketCap;
      const marketCapInB = coin.marketCap / 1e9;
      
      // High momentum: strong gains + exceptional volume + market cap significance
      return (
        change24h > 5 && // Strong 24h gains
        volumeRatio > 0.1 && // Very high volume
        marketCapInB > 0.1 && // Minimum market cap for credibility
        (change7d > 0 || change24h > 10) // Either weekly gains or exceptional daily gains
      );
    })
    .sort((a, b) => (b.volume / b.marketCap) - (a.volume / a.marketCap)) // Highest volume ratio first
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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Live Market Signals</h2>
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