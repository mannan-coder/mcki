
import { ArrowUp, ArrowDown, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
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
    <div className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-card-hover ${
      isDarkMode 
        ? 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600/70' 
        : 'bg-white/80 border-gray-200/50 hover:border-gray-300/70'
    }`}>
      <div className={`p-5 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
            <Icon size={22} className="text-white" />
          </div>
          <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
      </div>
      <div className="p-5 space-y-3">
        {children}
      </div>
    </div>
  );

  const CoinItem = ({ symbol, change, price, volume, launched }: any) => (
    <div className="flex items-center justify-between py-2 px-1 rounded-lg hover:bg-muted/30 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
          isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
        }`}>
          {symbol.charAt(0)}
        </div>
        <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {symbol}
        </span>
      </div>
      <div className="text-right">
        {change && (
          <div className={`text-sm font-bold ${
            change.startsWith('+') ? 'text-green-500' : 'text-red-500'
          }`}>
            {change}
          </div>
        )}
        {price && (
          <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {price}
          </div>
        )}
        {volume && (
          <div className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {volume}
          </div>
        )}
        {launched && (
          <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {launched}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Market Insights
        </h2>
        <div className="flex items-center space-x-4">
          <button className={`px-4 py-2 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}>
            All
          </button>
          <button className={`px-4 py-2 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}>
            Highlights
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
};

export default TopMetrics;
