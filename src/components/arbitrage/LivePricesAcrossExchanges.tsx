import { Link } from 'react-router-dom';
import { Building2, RefreshCw } from 'lucide-react';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { DataTable } from '@/components/common/DataTable';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';

interface ExchangePrice {
  exchange: string;
  price: number;
  volume: number;
  change24h: number;
  spread: number;
}

interface CoinPrices {
  symbol: string;
  name: string;
  image: string;
  prices: ExchangePrice[];
  avgPrice: number;
  maxSpread: number;
}

interface LivePricesAcrossExchangesProps {
  loading?: boolean;
}

const LivePricesAcrossExchanges = ({ loading = false }: LivePricesAcrossExchangesProps) => {
  const { data: cryptoData, isLoading } = useOptimizedCryptoData();

  // Generate mock exchange data for demonstration
  const generateExchangePrices = (): CoinPrices[] => {
    if (!cryptoData?.coins) return [];
    
    const exchanges = ['Binance', 'Coinbase', 'Kraken', 'OKX', 'Bybit'];
    
    return cryptoData.coins.slice(0, 8).map(coin => {
      const prices: ExchangePrice[] = exchanges.map(exchange => {
        const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
        const price = coin.price * (1 + variation);
        return {
          exchange,
          price,
          volume: Math.random() * 10000000,
          change24h: coin.change24h + (Math.random() - 0.5) * 5,
          spread: Math.abs(variation) * 100
        };
      });
      
      const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
      const maxSpread = Math.max(...prices.map(p => p.spread));
      
      return {
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        prices,
        avgPrice,
        maxSpread
      };
    });
  };

  const coinPricesData = generateExchangePrices();

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(6)}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    return `$${(volume / 1000).toFixed(0)}K`;
  };

  if (loading || isLoading) {
    return (
      <DataSection
        title="Live Prices Across Exchanges"
        subtitle="Real-time cryptocurrency prices and volumes across major exchanges"
        icon={<Building2 className="h-6 w-6 text-primary" />}
        headerActions={
          <Link 
            to="/arbitrage"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            View All
          </Link>
        }
      >
        <ResponsiveCard>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-border/50 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="text-center">
                      <div className="h-4 w-16 bg-muted rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResponsiveCard>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="Live Prices Across Exchanges"
      subtitle="Real-time cryptocurrency prices and volumes across major exchanges"
      icon={<Building2 className="h-6 w-6 text-primary" />}
      
      isLoading={isLoading}
      headerActions={
        <Link 
          to="/arbitrage"
          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
        >
          View All
        </Link>
      }
    >
      <ResponsiveCard>
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
                <th className="text-center py-3 px-4 font-semibold text-foreground">Max Spread</th>
              </tr>
            </thead>
            <tbody>
              {coinPricesData.map((coin) => (
                <tr key={coin.symbol} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
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
                  {coin.prices.slice(0, 4).map((exchange) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {coinPricesData.map((coin) => (
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
                {coin.prices.slice(0, 4).map((exchange) => (
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
      </ResponsiveCard>
    </DataSection>
  );
};

export default LivePricesAcrossExchanges;