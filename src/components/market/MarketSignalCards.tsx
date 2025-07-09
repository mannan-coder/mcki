import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, Minus } from 'lucide-react';
import { useMemo } from 'react';

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
    const buySignals = coins.filter(coin => {
      const change24h = coin.change24h;
      const change7d = coin.change7d || 0;
      const volumeInB = coin.volume / 1e9;
      return change24h > 1 && change7d > 0 && volumeInB > 0.5;
    }).slice(0, 3);

    const consolidatingSignals = coins.filter(coin => {
      const change24h = coin.change24h;
      const change7d = coin.change7d || 0;
      return Math.abs(change24h) < 2 && Math.abs(change7d) < 5;
    }).slice(0, 3);

    const momentumSignals = coins.filter(coin => {
      const change24h = coin.change24h;
      const volumeRatio = coin.volume / coin.marketCap;
      return change24h > 3 && volumeRatio > 0.1;
    }).slice(0, 3);

    return { buySignals, consolidatingSignals, momentumSignals };
  }, [coins]);

  const SignalCard = ({ 
    title, 
    icon, 
    color, 
    bgColor, 
    coins, 
    description 
  }: {
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    coins: any[];
    description: string;
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <SignalCard
        title="Buy Signals"
        icon={<TrendingUp className="h-5 w-5" />}
        color="text-green-600 dark:text-green-400"
        bgColor="bg-green-50/50 dark:bg-green-950/20"
        coins={signalData.buySignals}
        description="Strong upward momentum with volume confirmation"
      />
      
      <SignalCard
        title="Consolidating"
        icon={<Minus className="h-5 w-5" />}
        color="text-blue-600 dark:text-blue-400"
        bgColor="bg-blue-50/50 dark:bg-blue-950/20"
        coins={signalData.consolidatingSignals}
        description="Stable price action, potential for breakout"
      />
      
      <SignalCard
        title="High Momentum"
        icon={<Activity className="h-5 w-5" />}
        color="text-purple-600 dark:text-purple-400"
        bgColor="bg-purple-50/50 dark:bg-purple-950/20"
        coins={signalData.momentumSignals}
        description="High volume activity with price appreciation"
      />
    </div>
  );
};