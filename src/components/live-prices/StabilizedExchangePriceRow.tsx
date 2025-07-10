import { formatPrice, formatVolume } from '@/utils/priceFormatters';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StabilizedExchangePriceRowProps {
  coin: any;
  index: number;
  priceChanges: Record<string, 'up' | 'down' | 'neutral'>;
}

export const StabilizedExchangePriceRow = ({ 
  coin, 
  index, 
  priceChanges 
}: StabilizedExchangePriceRowProps) => {
  
  const PriceChangeIndicator = ({ change }: { change: 'up' | 'down' | 'neutral' }) => {
    if (change === 'neutral') return null;
    
    return (
      <span className={`inline-flex items-center ml-1 transition-all duration-300 ${
        change === 'up' ? 'text-success animate-pulse' : 'text-destructive animate-pulse'
      }`}>
        {change === 'up' ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
      </span>
    );
  };

  return (
    <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img 
            src={coin.image}
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
      
      {/* Exchange prices - first 6 exchanges */}
      {coin.prices.slice(0, 6).map((exchange: any) => (
        <td key={exchange.exchange} className="py-4 px-3 text-center">
          <div className="flex items-center justify-center min-h-[2.5rem]">
            <div>
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(exchange.price)}
                </span>
                <PriceChangeIndicator change={priceChanges[exchange.exchange] || 'neutral'} />
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {formatVolume(exchange.volume)}
              </div>
            </div>
          </div>
        </td>
      ))}
      
      <td className="py-4 px-4 text-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          coin.maxSpread > 1 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
        }`}>
          {coin.maxSpread.toFixed(2)}%
        </span>
      </td>
    </tr>
  );
};