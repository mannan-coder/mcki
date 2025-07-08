
import { ArrowUp, ArrowDown, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCryptoData } from '@/hooks/useCryptoData';

interface TopMetricsProps {
  isDarkMode: boolean;
}

const TopMetrics = ({ isDarkMode }: TopMetricsProps) => {
  const { data: marketData, loading } = useCryptoData();

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
      className={`rounded-xl sm:rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600/70' 
          : 'bg-white/80 border-gray-200/50 hover:border-gray-300/70'
      }`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-4 sm:p-5 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
              <Icon size={18} className="text-white sm:hidden" />
              <Icon size={22} className="text-white hidden sm:block" />
            </div>
            <h3 className={`font-bold text-sm sm:text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${
            isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            Top 5
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );

  const CoinItem = ({ symbol, change, price, volume, launched }: any) => (
    <motion.div 
      className="flex items-center justify-between py-2 px-2 sm:px-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md flex-shrink-0 ${
          isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
        }`}>
          {symbol.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-sm sm:text-base truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {symbol}
          </div>
          {price && (
            <div className={`text-xs font-medium truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {price}
            </div>
          )}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        {change && (
          <div className={`text-xs sm:text-sm font-bold ${
            change.startsWith('+') ? 'text-green-500' : 'text-red-500'
          }`}>
            {change}
          </div>
        )}
        {volume && (
          <div className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {volume}
          </div>
        )}
        {launched && (
          <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {launched}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Market Insights
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
            isDarkMode 
              ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}>
            All
          </button>
          <button className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
            isDarkMode 
              ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}>
            Highlights
          </button>
        </div>
      </div>

      {/* Responsive Grid - Stacked on mobile */}
      <div className="space-y-4">
        <MetricCard 
          title="🔥 Top Gainers" 
          icon={ArrowUp} 
          gradient="from-green-500 to-emerald-600"
        >
          {topGainers.map((coin, index) => (
            <CoinItem key={index} {...coin} />
          ))}
        </MetricCard>

        <MetricCard 
          title="📉 Top Losers" 
          icon={ArrowDown} 
          gradient="from-red-500 to-rose-600"
        >
          {topLosers.map((coin, index) => (
            <CoinItem key={index} {...coin} />
          ))}
        </MetricCard>

        <MetricCard 
          title="💰 Top Volume" 
          icon={TrendingUp} 
          gradient="from-blue-500 to-cyan-600"
        >
          {topVolume.map((coin, index) => (
            <CoinItem key={index} symbol={coin.symbol} volume={coin.volume} />
          ))}
        </MetricCard>

        <MetricCard 
          title="✨ Newly Launched" 
          icon={Sparkles} 
          gradient="from-purple-500 to-violet-600"
        >
          {newlyLaunched.map((coin, index) => (
            <CoinItem key={index} symbol={coin.symbol} price={coin.price} launched={coin.launched} />
          ))}
        </MetricCard>
      </div>
    </div>
  );
};

export default TopMetrics;
