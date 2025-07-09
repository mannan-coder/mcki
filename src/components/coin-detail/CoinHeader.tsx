import { motion } from 'framer-motion';
import { getCoinLogoById } from '@/utils/coinLogos';
import { formatPrice, formatVolume, formatMarketCap, formatPercentage } from '@/utils/priceFormatters';

interface CoinHeaderProps {
  coin: {
    id: string;
    symbol: string;
    name: string;
    marketCapRank?: number;
    currentPrice: number;
    priceChangePercentage24h: number;
    priceChange24h: number;
  };
  loading?: boolean;
}

export const CoinHeader = ({ coin, loading }: CoinHeaderProps) => {
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-muted rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
            <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const coinLogo = getCoinLogoById(coin.id);
  const isPositive = coin.priceChangePercentage24h >= 0;

  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={coinLogo}
          alt={coin.name}
          className="w-16 h-16 rounded-full border border-border/20"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {coin.name}
          </h1>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-lg text-muted-foreground font-medium">
              {coin.symbol.toUpperCase()}
            </span>
            {coin.marketCapRank && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Rank #{coin.marketCapRank}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          {formatPrice(coin.currentPrice)}
        </div>
        <div className={`flex items-center justify-end space-x-2 mt-1 ${
          isPositive ? 'text-success' : 'text-destructive'
        }`}>
          <span className="text-sm font-medium">
            {isPositive ? '▲' : '▼'}
          </span>
          <span className="text-lg font-semibold">
            {formatPercentage(coin.priceChangePercentage24h)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({isPositive ? '+' : ''}{formatPrice(coin.priceChange24h)})
          </span>
        </div>
      </div>
    </motion.div>
  );
};