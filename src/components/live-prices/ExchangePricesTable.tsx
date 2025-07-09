import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { ExchangePriceRow } from './ExchangePriceRow';
import { formatPrice, formatVolume } from '@/utils/priceFormatters';

interface ExchangePricesTableProps {
  coinPricesData: any[];
  loading?: boolean;
}

export const ExchangePricesTable = ({ coinPricesData, loading }: ExchangePricesTableProps) => {
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
                  {['Binance', 'Coinbase', 'Kraken', 'OKX', 'Bybit'].map((exchange) => (
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
                    {[1, 2, 3, 4, 5].map((j) => (
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

  return (
    <ResponsiveCard>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Live Exchange Prices</h3>
        
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Asset</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Binance</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Coinbase</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Kraken</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">OKX</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Bybit</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Max Spread</th>
              </tr>
            </thead>
            <tbody>
              {coinPricesData.map((coin, index) => (
                <ExchangePriceRow 
                  key={coin.symbol}
                  coin={coin}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {coinPricesData.map((coin, index) => (
            <div key={coin.symbol} className="p-4 border border-border/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
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
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  coin.maxSpread > 1 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
                }`}>
                  {coin.maxSpread.toFixed(2)}% spread
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {coin.prices.slice(0, 4).map((exchange: any) => (
                  <div key={exchange.exchange} className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">{exchange.exchange}</div>
                    <div className="font-semibold text-sm text-foreground">{formatPrice(exchange.price)}</div>
                    <div className="text-xs text-muted-foreground">{formatVolume(exchange.volume)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResponsiveCard>
  );
};