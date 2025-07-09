import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiveSignals } from '@/components/market/LiveSignals';

interface CoinSignalsProps {
  coin: {
    name: string;
    symbol: string;
    priceChangePercentage24h: number;
    priceChangePercentage7d?: number;
    totalVolume: number;
    marketCap: number;
  };
  loading?: boolean;
}

export const CoinSignals = ({ coin, loading }: CoinSignalsProps) => {
  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="mb-8 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 Trading Signals
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time analysis based on price action, volume, and momentum
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <LiveSignals 
              coin={{
                priceChangePercentage24h: coin.priceChangePercentage24h,
                priceChangePercentage7d: coin.priceChangePercentage7d,
                volume: coin.totalVolume,
                marketCap: coin.marketCap
              }}
            />
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">24h Change</div>
                <div className={`font-semibold ${
                  coin.priceChangePercentage24h >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {coin.priceChangePercentage24h >= 0 ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">7d Change</div>
                <div className={`font-semibold ${
                  (coin.priceChangePercentage7d || 0) >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {(coin.priceChangePercentage7d || 0) >= 0 ? '+' : ''}{(coin.priceChangePercentage7d || 0).toFixed(2)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Volume/MCap</div>
                <div className="font-semibold text-foreground">
                  {((coin.totalVolume / coin.marketCap) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Activity</div>
                <div className="font-semibold text-foreground">
                  {coin.totalVolume / 1e9 > 10 ? 'High' : coin.totalVolume / 1e9 > 1 ? 'Medium' : 'Low'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};