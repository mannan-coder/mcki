import { useState } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Activity, DollarSign, Users, BarChart3, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useSentimentData } from '@/hooks/useSentimentData';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import MarketCapModal from './MarketCapModal';
import VolumeModal from './VolumeModal';

interface MarketOverviewProps {
  isDarkMode: boolean;
}

const MarketOverview = ({ isDarkMode }: MarketOverviewProps) => {
  const [showMarketCapModal, setShowMarketCapModal] = useState(false);
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const { data: marketData, loading, error, refetch } = useCryptoData();
  const { data: sentimentData } = useSentimentData();

  if (loading) {
    return (
      <section id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2"></div>
            <div className="h-5 w-64 bg-muted/60 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-muted rounded-lg animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`p-6 rounded-xl border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-24 bg-muted rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex justify-between">
                    <div className="h-3 w-20 bg-muted/60 rounded animate-pulse"></div>
                    <div className="h-3 w-16 bg-muted/60 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !marketData) {
    return (
      <section id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading market data: {error}</p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const marketStats = {
    totalMarketCap: `$${(marketData.totalMarketCap / 1e12).toFixed(2)}T`,
    totalVolume: `$${(marketData.totalVolume / 1e9).toFixed(1)}B`,
    btcDominance: `${marketData.btcDominance.toFixed(1)}%`,
    ethDominance: `${marketData.ethDominance?.toFixed(1) || '18.2'}%`,
    activeCoins: marketData.activeCryptocurrencies?.toLocaleString() || '13,247',
    exchanges: marketData.markets?.toLocaleString() || '794'
  };

  const fearGreedIndex = sentimentData?.fearGreedIndex?.value || marketData.fearGreedIndex;
  // Use real historical data if available
  const historicalData = sentimentData?.historical ? {
    current: sentimentData.fearGreedIndex.value,
    yesterday: sentimentData.historical.last7Days[1]?.value || sentimentData.fearGreedIndex.value - 5,
    weekAgo: sentimentData.historical.avg7d,
    monthAgo: sentimentData.historical.avg30d,
    hourlyData: sentimentData.historical.last7Days.slice(0, 7).map(d => d.value),
    dailyData: sentimentData.historical.last30Days.slice(0, 14).map(d => d.value),
    weeklyTrend: sentimentData.historical.avg7d > sentimentData.historical.avg30d ? '+5.0' : '-3.2',
    monthlyTrend: '+14.0'
  } : {
    current: fearGreedIndex,
    yesterday: fearGreedIndex - 5,
    weekAgo: fearGreedIndex + 12,
    monthAgo: fearGreedIndex - 14,
    hourlyData: [68, 69, 67, 65, 67, 70, fearGreedIndex],
    dailyData: Array.from({length: 14}, () => Math.floor(Math.random() * 40) + 40),
    weeklyTrend: '+5.0',
    monthlyTrend: '+14.0'
  };

  // Calculate real ETH dominance from market data
  const ethCoin = marketData.coins.find(coin => coin.symbol === 'ETH');
  const realEthDominance = ethCoin ? ((ethCoin.marketCap / marketData.totalMarketCap) * 100).toFixed(1) + '%' : marketStats.ethDominance;

  const getFearGreedColor = (value: number) => {
    if (value >= 75) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    if (value >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getFearGreedLabel = (value: number) => {
    if (value >= 75) return 'Extreme Greed';
    if (value >= 55) return 'Greed';
    if (value >= 45) return 'Neutral';
    if (value >= 25) return 'Fear';
    return 'Extreme Fear';
  };

  return (
    <section id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Cryptocurrency Prices by Market Cap
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The global cryptocurrency market cap today is <span className="font-semibold text-primary">{marketStats.totalMarketCap}</span>, a <span className="text-green-500 font-semibold">+2.9% change</span> in the last 24 hours. 
            <Link to="/market" className="text-primary hover:underline ml-1">Read more</Link>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Highlights</span>
          <div className="w-10 h-5 bg-green-500 rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
          </div>
        </div>
      </div>

      {/* CoinGecko-style main content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Market Stats - Left Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Compact Market Cap Card */}
            <div className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80' 
                : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
            }`}
              onClick={() => setShowMarketCapModal(true)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                    <TrendingUp className="text-white" size={16} />
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Market Cap
                    </div>
                    <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {marketStats.totalMarketCap}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-500 text-sm font-medium">+2.9%</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    24h change
                  </div>
                </div>
              </div>
              
              {/* Mini Chart Preview */}
              <div className="h-12 relative">
                <svg width="100%" height="100%" className="overflow-visible">
                  <defs>
                    <linearGradient id="miniMarketCapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,40 Q25,35 50,30 T100,25 T150,20 T200,25 T250,30 L250,48 L0,48 Z"
                    fill="url(#miniMarketCapGradient)"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </svg>
                <div className={`absolute bottom-0 right-0 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  📈 Click for detailed view
                </div>
              </div>
            </div>

            {/* Compact Volume Card */}
            <div className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80' 
                : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
            }`}
              onClick={() => setShowVolumeModal(true)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                    <Activity className="text-white" size={16} />
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      24h Volume
                    </div>
                    <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {marketStats.totalVolume}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-500 text-sm font-medium">-1.5%</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    24h change
                  </div>
                </div>
              </div>
              
              {/* Mini Chart Preview */}
              <div className="h-12 relative">
                <svg width="100%" height="100%" className="overflow-visible">
                  <defs>
                    <linearGradient id="miniVolumeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {/* Volume bars */}
                  <rect x="10" y="25" width="15" height="23" fill="#3b82f6" opacity="0.7"/>
                  <rect x="30" y="15" width="15" height="33" fill="#3b82f6" opacity="0.7"/>
                  <rect x="50" y="30" width="15" height="18" fill="#3b82f6" opacity="0.7"/>
                  <rect x="70" y="20" width="15" height="28" fill="#3b82f6" opacity="0.7"/>
                  <rect x="90" y="10" width="15" height="38" fill="#3b82f6" opacity="0.7"/>
                  <rect x="110" y="35" width="15" height="13" fill="#3b82f6" opacity="0.7"/>
                  <rect x="130" y="25" width="15" height="23" fill="#3b82f6" opacity="0.7"/>
                  {/* Trend line */}
                  <path
                    d="M15,35 L40,25 L60,40 L80,30 L100,20 L120,45 L140,35"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                </svg>
                <div className={`absolute bottom-0 right-0 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  📊 Click for detailed view
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trending & Top Gainers */}
        <div className="lg:col-span-4 space-y-6">
          {/* Trending Section */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/60 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                🔥 Trending
              </h3>
              <Link to="/market" className="text-primary text-sm hover:underline">View more</Link>
            </div>
            <div className="space-y-3">
              {marketData.coins.slice(0, 3).map((coin, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {coin.symbol.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {coin.symbol}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${coin.price.toFixed(coin.price > 1 ? 2 : 6)}
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${coin.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Gainers Section */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/60 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                🚀 Top Gainers
              </h3>
              <Link to="/market" className="text-primary text-sm hover:underline">View more</Link>
            </div>
            <div className="space-y-3">
              {[...marketData.coins].sort((a, b) => b.change24h - a.change24h).slice(0, 3).map((coin, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {coin.symbol.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {coin.symbol}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${coin.price.toFixed(coin.price > 1 ? 2 : 6)}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-500">
                    +{coin.change24h.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Market Dominance
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bitcoin</span>
              <span className="text-orange-500 font-semibold">{marketStats.btcDominance}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ethereum</span>
              <span className="text-blue-500 font-semibold">{marketStats.ethDominance}</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Market Statistics
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active Coins</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketStats.activeCoins}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Exchanges</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketStats.exchanges}
              </span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            24h Trading Volume
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Volume</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketStats.totalVolume}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Change</span>
              <span className="text-red-500 font-semibold text-sm">-1.5%</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Fear & Greed Index
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current</span>
              <span className={`font-semibold text-sm ${getFearGreedColor(fearGreedIndex)}`}>
                {fearGreedIndex}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</span>
              <span className={`font-semibold text-sm ${getFearGreedColor(fearGreedIndex)}`}>
                {getFearGreedLabel(fearGreedIndex)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MarketCapModal 
        isOpen={showMarketCapModal} 
        onClose={() => setShowMarketCapModal(false)} 
        isDarkMode={isDarkMode} 
        marketData={marketData}
      />
      <VolumeModal 
        isOpen={showVolumeModal} 
        onClose={() => setShowVolumeModal(false)} 
        isDarkMode={isDarkMode} 
        marketData={marketData}
      />
    </section>
  );
};

export default MarketOverview;