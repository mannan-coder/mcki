import { motion } from 'framer-motion';
import { getCoinLogoById } from '@/utils/coinLogos';
import { formatPrice, formatVolume } from '@/utils/priceFormatters';

interface ExchangePriceRowProps {
  coin: any;
  index: number;
}

export const ExchangePriceRow = ({ coin, index }: ExchangePriceRowProps) => {
  const coinLogo = getCoinLogoById(coin.id || coin.symbol.toLowerCase());

  return (
    <motion.tr
      className="border-b border-border/30 hover:bg-muted/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img 
            src={coinLogo}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div>
            <div className="font-semibold text-foreground">{coin.symbol}</div>
            <div className="text-sm text-muted-foreground">{coin.name}</div>
          </div>
        </div>
      </td>
      {coin.prices.slice(0, 5).map((exchange: any) => (
        <td key={exchange.exchange} className="py-4 px-4 text-center">
          <div className="font-semibold text-foreground">{formatPrice(exchange.price)}</div>
          <div className="text-sm text-muted-foreground">{formatVolume(exchange.volume)}</div>
        </td>
      ))}
      <td className="py-4 px-4 text-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          coin.maxSpread > 1 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
        }`}>
          {coin.maxSpread.toFixed(2)}%
        </span>
      </td>
    </motion.tr>
  );
};