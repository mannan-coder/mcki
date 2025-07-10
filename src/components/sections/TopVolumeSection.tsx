import { motion } from 'framer-motion';
import { BarChart3, Activity } from 'lucide-react';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { toast } from 'sonner';

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

interface TopVolumeSectionProps {
  coins: Coin[];
  loading?: boolean;
}

export const TopVolumeSection = ({ coins, loading = false }: TopVolumeSectionProps) => {
  if (loading) {
    return (
      <DataSection
        title="Highest Volume"
        subtitle="Most actively traded cryptocurrencies in 24h"
        icon={<BarChart3 className="h-6 w-6 text-primary" />}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ResponsiveCard key={i} size="sm">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
                  <div className="space-y-1 flex-1">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-20 bg-muted/60 rounded animate-pulse"></div>
                </div>
              </div>
            </ResponsiveCard>
          ))}
        </div>
      </DataSection>
    );
  }

  const topVolumeCoins = [...coins]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 6);

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(1)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const VolumeCard = ({ coin, index }: { coin: Coin; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={() => {
        window.location.href = `/coin/${coin.id}`;
        toast.success(`Opening ${coin.name} details`);
      }}
    >
      <ResponsiveCard size="sm" className="h-full hover:shadow-lg transition-all">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={coin.image} 
                alt={coin.name}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate text-foreground">
                {coin.symbol}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {coin.name}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Volume</span>
              <span className="font-bold text-sm text-primary">
                {formatVolume(coin.volume)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Price</span>
              <span className="font-semibold text-sm text-foreground">
                {formatPrice(coin.price)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">24h Change</span>
              <span className={`font-medium text-sm ${
                coin.change24h >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
          
          {/* Volume Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Volume Activity</span>
              <span className="text-muted-foreground">
                #{coin.rank}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((coin.volume / topVolumeCoins[0].volume) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </div>
      </ResponsiveCard>
    </motion.div>
  );

  return (
    <DataSection
      title="Highest Volume"
      subtitle="Most actively traded cryptocurrencies in 24h"
      icon={<BarChart3 className="h-6 w-6 text-primary" />}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topVolumeCoins.map((coin, index) => (
          <VolumeCard key={coin.id} coin={coin} index={index} />
        ))}
      </div>
    </DataSection>
  );
};