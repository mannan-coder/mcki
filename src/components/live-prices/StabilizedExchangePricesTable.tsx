import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { StabilizedExchangePriceRow } from './StabilizedExchangePriceRow';
import { useStabilizedPrices } from '@/hooks/useStabilizedPrices';
import { formatPrice, formatVolume } from '@/utils/priceFormatters';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StabilizedExchangePricesTableProps {
  coinPricesData: any[];
  loading?: boolean;
}

export const StabilizedExchangePricesTable = ({ 
  coinPricesData, 
  loading 
}: StabilizedExchangePricesTableProps) => {
  const { stabilizedData, priceChanges } = useStabilizedPrices(coinPricesData, 2500);

  if (loading) {
    return (
      <ResponsiveCard>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse"></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                  </th>
                  {['Binance', 'Coinbase', 'Kraken', 'OKX', 'Bybit', 'Gate.io'].map((exchange) => (
                    <th key={exchange} className="text-center py-3 px-4">
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                    </th>
                  ))}
                  <th className="text-center py-3 px-4">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-border/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                        <div className="space-y-1">
                          <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                          <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <td key={j} className="py-4 px-4 text-center">
                        <div className="space-y-1">
                          <div className="h-4 w-16 bg-muted rounded animate-pulse mx-auto"></div>
                          <div className="h-3 w-12 bg-muted/60 rounded animate-pulse mx-auto"></div>
                        </div>
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center">
                      <div className="h-6 w-12 bg-muted rounded-full animate-pulse mx-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ResponsiveCard>
    );
  }

  const PriceChangeIndicator = ({ change }: { change: 'up' | 'down' | 'neutral' }) => {
    if (change === 'neutral') return null;
    
    return (
      <span className={`inline-flex items-center ml-1 transition-opacity duration-300 ${
        change === 'up' ? 'text-success' : 'text-destructive'
      }`}>
        {change === 'up' ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
      </span>
    );
  };

  // Show empty state if no data
  if (!loading && stabilizedData.length === 0) {
    return (
      <ResponsiveCard>
        <div className="text-center py-8">
          <Minus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No price data available</p>
        </div>
      </ResponsiveCard>
    );
  }

  return (
    <ResponsiveCard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Live Exchange Prices</h3>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <ArrowUp className="w-3 h-3 text-success" />
              <span>Price Up</span>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowDown className="w-3 h-3 text-destructive" />
              <span>Price Down</span>
            </div>
          </div>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground min-w-[140px]">Asset</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground min-w-[100px]">Binance</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground min-w-[100px]">Coinbase</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground min-w-[100px]">Kraken</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground min-w-[100px]">OKX</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground min-w-[100px]">Bybit</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground min-w-[100px]">Gate.io</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground min-w-[100px]">Max Spread</th>
              </tr>
            </thead>
            <tbody>
              {stabilizedData.map((coin, index) => (
                <StabilizedExchangePriceRow 
                  key={coin.symbol}
                  coin={coin}
                  index={index}
                  priceChanges={priceChanges[coin.symbol] || {}}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablet Table - Fewer exchanges */}
        <div className="hidden lg:block xl:hidden overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Asset</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground">Binance</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground">Coinbase</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground">Kraken</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground">OKX</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Spread</th>
              </tr>
            </thead>
            <tbody>
              {stabilizedData.map((coin, index) => (
                <tr key={coin.symbol} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">
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
                  {coin.prices.slice(0, 4).map((exchange: any) => (
                    <td key={exchange.exchange} className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <div className="text-sm font-medium text-foreground">
                          {formatPrice(exchange.price)}
                        </div>
                        <PriceChangeIndicator change={priceChanges[coin.symbol]?.[exchange.exchange] || 'neutral'} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {formatVolume(exchange.volume)}
                      </div>
                    </td>
                  ))}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      coin.maxSpread > 1 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
                    }`}>
                      {coin.maxSpread.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Optimized for mobile */}
        <div className="lg:hidden space-y-3">
          {stabilizedData.map((coin, index) => (
            <div key={coin.symbol} className="p-3 border border-border/50 rounded-lg bg-card/50">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <img 
                    src={coin.image}
                    alt={coin.name}
                    className="w-7 h-7 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div>
                    <div className="font-semibold text-sm text-foreground">{coin.symbol}</div>
                    <div className="text-xs text-muted-foreground">{coin.name}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  coin.maxSpread > 1 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
                }`}>
                  {coin.maxSpread.toFixed(2)}% spread
                </span>
              </div>
              
              {/* Top 4 exchanges in a 2x2 grid */}
              <div className="grid grid-cols-2 gap-2">
                {coin.prices.slice(0, 4).map((exchange: any) => (
                  <div key={exchange.exchange} className="text-center p-2 bg-muted/20 rounded-md">
                    <div className="text-xs text-muted-foreground font-medium mb-1">{exchange.exchange}</div>
                    <div className="flex items-center justify-center">
                      <div className="font-semibold text-sm text-foreground">
                        {formatPrice(exchange.price)}
                      </div>
                      <PriceChangeIndicator change={priceChanges[coin.symbol]?.[exchange.exchange] || 'neutral'} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {formatVolume(exchange.volume)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional exchanges if available */}
              {coin.prices.length > 4 && (
                <div className="mt-2 text-center">
                  <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                    +{coin.prices.length - 4} more exchanges
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ResponsiveCard>
  );
};