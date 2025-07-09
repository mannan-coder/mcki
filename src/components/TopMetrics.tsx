
import { ArrowUp, ArrowDown, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';

interface TopMetricsProps {
  isDarkMode: boolean;
}

const TopMetrics = ({ isDarkMode }: TopMetricsProps) => {
  const { data: marketData, isLoading: loading, isRealTime } = useOptimizedCryptoData(100, false);

  if (!marketData) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-xl border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}>
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-muted rounded-lg animate-pulse"></div>
                  <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-muted rounded-full animate-pulse"></div>
                      <div className="h-4 w-12 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-16 bg-muted rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Process real data
  const sortedCoins = [...marketData.coins].sort((a, b) => b.change24h - a.change24h);
  const topGainers = sortedCoins.slice(0, 5).map(coin => ({
    symbol: coin.symbol,
    change: `${coin.change24h > 0 ? '+' : ''}${coin.change24h.toFixed(2)}%`,
    price: `$${coin.price.toFixed(coin.price > 1 ? 2 : 6)}`
  }));

  const topLosers = sortedCoins.slice(-5).reverse().map(coin => ({
    symbol: coin.symbol,
    change: `${coin.change24h.toFixed(2)}%`,
    price: `$${coin.price.toFixed(coin.price > 1 ? 2 : 6)}`
  }));

  const topVolume = [...marketData.coins]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5)
    .map(coin => ({
      symbol: coin.symbol,
      volume: `$${coin.volume > 1e9 ? (coin.volume / 1e9).toFixed(1) + 'B' : (coin.volume / 1e6).toFixed(1) + 'M'}`
    }));

  // Get newly launched coins (coins ranked 500+ with recent price action)
  const newlyLaunched = [...marketData.coins]
    .filter(coin => coin.rank > 500 && coin.change24h > 10) // High growth recent coins
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 5)
    .map(coin => ({
      symbol: coin.symbol,
      price: `$${coin.price.toFixed(coin.price > 1 ? 2 : 6)}`,
      launched: `${Math.floor(Math.random() * 24)}h ago`
    }));

  const MetricCard = ({ title, icon: Icon, children, gradient }: any) => (
    <motion.div 
      className="rounded-lg border backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover bg-card/80 border-border/50 hover:border-border/70"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-2 sm:p-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-1 sm:p-1.5 rounded-md bg-gradient-to-r ${gradient} shadow-lg`}>
              <Icon size={12} className="text-white sm:w-4 sm:h-4" />
            </div>
            <h3 className="font-semibold text-xs sm:text-sm text-foreground">
              {title}
            </h3>
          </div>
          <div className="text-xs px-1.5 py-0.5 rounded-full bg-muted/70 text-muted-foreground">
            Top 3
          </div>
        </div>
      </div>
      <div className="p-2 sm:p-3 space-y-1 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );

  const CoinItem = ({ symbol, change, price, volume, launched }: any) => (
    <motion.div 
      className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0 bg-gradient-to-br from-muted to-muted-foreground/20 text-foreground">
          {symbol.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs sm:text-sm truncate text-foreground">
            {symbol}
          </div>
          {price && (
            <div className="text-xs font-medium truncate text-muted-foreground">
              {price}
            </div>
          )}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        {change && (
          <div className={`text-xs sm:text-sm font-bold ${
            change.startsWith('+') ? 'text-success' : 'text-destructive'
          }`}>
            {change}
          </div>
        )}
        {volume && (
          <div className="text-xs sm:text-sm font-bold text-primary">
            {volume}
          </div>
        )}
        {launched && (
          <div className="text-xs font-medium text-muted-foreground">
            {launched}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">
          Market Insights
        </h2>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-md border transition-colors bg-card border-border text-foreground hover:bg-muted/50">
            All
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-md border transition-colors bg-card border-border text-foreground hover:bg-muted/50">
            Highlights
          </button>
        </div>
      </div>

      {/* Compact Grid - One Row Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        <MetricCard 
          title="🔥 Top Gainers" 
          icon={ArrowUp} 
          gradient="from-success to-success/80"
        >
          {topGainers.slice(0, 3).map((coin, index) => (
            <CoinItem key={index} {...coin} />
          ))}
        </MetricCard>

        <MetricCard 
          title="📉 Top Losers" 
          icon={ArrowDown} 
          gradient="from-destructive to-destructive/80"
        >
          {topLosers.slice(0, 3).map((coin, index) => (
            <CoinItem key={index} {...coin} />
          ))}
        </MetricCard>

        <MetricCard 
          title="💰 Top Volume" 
          icon={TrendingUp} 
          gradient="from-primary to-primary/80"
        >
          {topVolume.slice(0, 3).map((coin, index) => (
            <CoinItem key={index} symbol={coin.symbol} volume={coin.volume} />
          ))}
        </MetricCard>
      </div>
    </div>
  );
};

export default TopMetrics;
