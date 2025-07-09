import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice, formatVolume, formatMarketCap, formatPercentage } from '@/utils/priceFormatters';

interface CoinStatsProps {
  coin: {
    marketCap: number;
    totalVolume: number;
    circulatingSupply?: number;
    totalSupply?: number;
    maxSupply?: number;
    ath?: number;
    atl?: number;
    athDate?: string;
    atlDate?: string;
    priceChangePercentage7d?: number;
    priceChangePercentage30d?: number;
    priceChangePercentage1y?: number;
  };
  loading?: boolean;
}

export const CoinStats = ({ coin, loading }: CoinStatsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Market Cap',
      value: formatMarketCap(coin.marketCap),
      icon: '💰'
    },
    {
      title: '24h Volume',
      value: formatVolume(coin.totalVolume),
      icon: '📊'
    },
    {
      title: 'Circulating Supply',
      value: coin.circulatingSupply ? `${(coin.circulatingSupply / 1000000).toFixed(2)}M` : 'N/A',
      subtitle: coin.maxSupply ? `/ ${(coin.maxSupply / 1000000).toFixed(2)}M` : '',
      icon: '🪙'
    },
    {
      title: 'All-Time High',
      value: coin.ath ? formatPrice(coin.ath) : 'N/A',
      subtitle: coin.athDate ? new Date(coin.athDate).toLocaleDateString() : '',
      icon: '🚀'
    }
  ];

  const pricePerformance = [
    {
      period: '7 Days',
      change: coin.priceChangePercentage7d || 0,
      icon: '📅'
    },
    {
      period: '30 Days',
      change: coin.priceChangePercentage30d || 0,
      icon: '📆'
    },
    {
      period: '1 Year',
      change: coin.priceChangePercentage1y || 0,
      icon: '🗓️'
    },
    {
      title: 'All-Time Low',
      value: coin.atl ? formatPrice(coin.atl) : 'N/A',
      subtitle: coin.atlDate ? new Date(coin.atlDate).toLocaleDateString() : '',
      icon: '📉'
    }
  ];

  return (
    <div className="space-y-8 mb-8">
      {/* Main Stats */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Market Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{stat.icon}</span>
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  {stat.subtitle && (
                    <div className="text-sm text-muted-foreground mt-1">{stat.subtitle}</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Price Performance */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Price Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricePerformance.map((perf, index) => (
            <motion.div
              key={perf.period || perf.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{perf.icon}</span>
                    {perf.period || perf.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {perf.change !== undefined ? (
                    <div className={`text-2xl font-bold ${
                      perf.change >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {perf.change >= 0 ? '+' : ''}{formatPercentage(perf.change)}
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-foreground">{perf.value}</div>
                      {perf.subtitle && (
                        <div className="text-sm text-muted-foreground mt-1">{perf.subtitle}</div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};