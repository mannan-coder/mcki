import { motion } from 'framer-motion';
import { getCoinLogoById } from '@/utils/coinLogos';
import { formatPrice, formatVolume, formatPercentage } from '@/utils/priceFormatters';

interface CoinRowProps {
  coin: any;
  index: number;
  category: 'gainer' | 'loser' | 'volume';
}

export const CoinRow = ({ coin, index, category }: CoinRowProps) => {
  const coinLogo = getCoinLogoById(coin.id || coin.symbol.toLowerCase());
  
  const getIndicatorColor = () => {
    switch (category) {
      case 'gainer':
        return 'text-success';
      case 'loser':
        return 'text-destructive';
      case 'volume':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getMetricValue = () => {
    switch (category) {
      case 'gainer':
      case 'loser':
        return formatPercentage(coin.change24h);
      case 'volume':
        return formatVolume(coin.volume);
      default:
        return formatPrice(coin.price);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between p-3 border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-colors"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-muted-foreground">
          {index + 1}
        </div>
        <img 
          src={coinLogo}
          alt={coin.name}
          className="w-8 h-8 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground truncate">{coin.symbol}</div>
          <div className="text-xs text-muted-foreground truncate">{coin.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium text-foreground">{formatPrice(coin.price)}</div>
        <div className={`text-xs font-medium ${getIndicatorColor()}`}>
          {getMetricValue()}
        </div>
      </div>
    </motion.div>
  );
};