import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume: number;
  rank: number;
  image: string;
}

interface TopGainersLosersProps {
  coins: Coin[];
  loading?: boolean;
}

export const TopGainersLosers = ({ coins, loading = false }: TopGainersLosersProps) => {
  if (loading) {
    return (
      <DataSection
        title="Top Gainers & Losers"
        subtitle="24-hour price performance leaders"
        icon={<Activity className="h-6 w-6 text-primary" />}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <ResponsiveCard key={i}>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                        <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                      <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </ResponsiveCard>
          ))}
        </div>
      </DataSection>
    );
  }

  const sortedCoins = [...coins].sort((a, b) => b.change24h - a.change24h);
  const topGainers = sortedCoins.slice(0, 5);
  const topLosers = sortedCoins.slice(-5).reverse();

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const CoinRow = ({ coin, index }: { coin: Coin; index: number }) => (
    <motion.div
      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold text-muted-foreground">
          {index + 1}
        </div>
        <img 
          src={coin.image} 
          alt={coin.name}
          className="w-8 h-8 rounded-full flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate text-foreground">
            {coin.symbol}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {coin.name}
          </div>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-semibold text-sm text-foreground">
          {formatPrice(coin.price)}
        </div>
        <div className={`text-sm font-medium ${
          coin.change24h >= 0 ? 'text-success' : 'text-destructive'
        }`}>
          {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
        </div>
      </div>
    </motion.div>
  );

  return (
    <DataSection
      title="Top Gainers & Losers"
      subtitle="24-hour price performance leaders"
      icon={<Activity className="h-6 w-6 text-primary" />}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Gainers */}
        <ResponsiveCard className="h-fit">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Top Gainers</h3>
              <div className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                24h
              </div>
            </div>
            <div className="space-y-1">
              {topGainers.map((coin, index) => (
                <CoinRow key={coin.id} coin={coin} index={index} />
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Top Losers */}
        <ResponsiveCard className="h-fit">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-foreground">Top Losers</h3>
              <div className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                24h
              </div>
            </div>
            <div className="space-y-1">
              {topLosers.map((coin, index) => (
                <CoinRow key={coin.id} coin={coin} index={index} />
              ))}
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </DataSection>
  );
};