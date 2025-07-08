import { useState } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Activity, DollarSign, Users, BarChart3, ExternalLink, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useSentimentData } from '@/hooks/useSentimentData';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, Area, AreaChart } from 'recharts';
import MarketCapModal from './MarketCapModal';
import VolumeModal from './VolumeModal';

interface MarketOverviewProps {
  isDarkMode: boolean;
}

const MarketOverview = ({ isDarkMode }: MarketOverviewProps) => {
  const navigate = useNavigate();
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
        {/* Main Market Stats - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Compact Market Cap Card */}
            <div className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80' 
                : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
            }`}
              onClick={() => navigate('/market-cap-details')}
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
              
              {/* Live Chart with Recharts */}
              <div className="h-16 -mx-2">
                <ChartContainer
                  config={{
                    value: { label: "Market Cap", color: "#10b981" }
                  }}
                  className="h-full"
                >
                  <AreaChart
                    data={[
                      { time: 0, value: marketData.totalMarketCap * 0.97 },
                      { time: 1, value: marketData.totalMarketCap * 0.98 },
                      { time: 2, value: marketData.totalMarketCap * 0.99 },
                      { time: 3, value: marketData.totalMarketCap * 1.01 },
                      { time: 4, value: marketData.totalMarketCap * 1.02 },
                      { time: 5, value: marketData.totalMarketCap * 1.029 },
                      { time: 6, value: marketData.totalMarketCap }
                    ]}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="marketCapMiniGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#marketCapMiniGradient)"
                      dot={false}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
              
              <div className={`flex items-center justify-end space-x-1 text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <ExternalLink size={12} />
                <span>Click for detailed view</span>
              </div>
            </div>

            {/* Compact Volume Card */}
            <div className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80' 
                : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
            }`}
              onClick={() => navigate('/volume-details')}
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
              
              {/* Live Volume Chart with Recharts */}
              <div className="h-16 -mx-2">
                <ChartContainer
                  config={{
                    volume: { label: "Volume", color: "#3b82f6" }
                  }}
                  className="h-full"
                >
                  <BarChart
                    data={[
                      { time: 0, volume: marketData.totalVolume * 1.05 },
                      { time: 1, volume: marketData.totalVolume * 1.12 },
                      { time: 2, volume: marketData.totalVolume * 0.98 },
                      { time: 3, volume: marketData.totalVolume * 1.08 },
                      { time: 4, volume: marketData.totalVolume * 0.92 },
                      { time: 5, volume: marketData.totalVolume * 1.15 },
                      { time: 6, volume: marketData.totalVolume * 0.95 },
                      { time: 7, volume: marketData.totalVolume * 1.03 },
                      { time: 8, volume: marketData.totalVolume * 1.07 },
                      { time: 9, volume: marketData.totalVolume }
                    ]}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <Bar
                      dataKey="volume"
                      fill="#3b82f6"
                      radius={[1, 1, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <div className={`flex items-center justify-end space-x-1 text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <BarChart3 size={12} />
                <span>Click for detailed view</span>
              </div>
            </div>
          </div>

          {/* Fear & Greed Index with Enhanced Visual Bar */}
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/60 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Fear & Greed Index
              </h3>
              <div className={`text-2xl font-bold ${getFearGreedColor(fearGreedIndex)}`}>
                {fearGreedIndex}
              </div>
            </div>
            
            {/* Progress Bar Style Indicator */}
            <div className="mb-4">
              <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    fearGreedIndex >= 75 ? 'bg-green-500' :
                    fearGreedIndex >= 50 ? 'bg-yellow-500' :
                    fearGreedIndex >= 25 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${fearGreedIndex}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Extreme Fear</span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Extreme Greed</span>
              </div>
            </div>
            
            {/* Historical Bar Chart */}
            <div className="h-12 mb-4">
              <ChartContainer
                config={{
                  fearGreed: { label: "Fear & Greed Index", color: getFearGreedColor(fearGreedIndex).replace('text-', '') }
                }}
                className="h-full"
              >
                <BarChart
                  data={[
                    { period: '7d', value: historicalData.weekAgo },
                    { period: '6d', value: historicalData.weekAgo + 3 },
                    { period: '5d', value: historicalData.weekAgo - 2 },
                    { period: '4d', value: historicalData.weekAgo + 5 },
                    { period: '3d', value: historicalData.weekAgo - 1 },
                    { period: '2d', value: historicalData.yesterday + 2 },
                    { period: '1d', value: historicalData.yesterday },
                    { period: 'Now', value: fearGreedIndex }
                  ]}
                  margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                >
                  <Bar
                    dataKey="value"
                    fill={fearGreedIndex >= 75 ? '#10b981' :
                         fearGreedIndex >= 50 ? '#f59e0b' :
                         fearGreedIndex >= 25 ? '#f97316' : '#ef4444'}
                    radius={[1, 1, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${getFearGreedColor(fearGreedIndex)}`}>
                {getFearGreedLabel(fearGreedIndex)}
              </span>
              <div className="flex items-center space-x-3 text-xs">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  7d: {historicalData.weekAgo}
                </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  30d: {historicalData.monthAgo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trending & Top Gainers - Takes 1 column on xl screens */}
        <div className="xl:col-span-1 space-y-4">
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
          {/* Top Losers Section */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/60 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                📉 Top Losers
              </h3>
              <Link to="/market" className="text-primary text-sm hover:underline">View more</Link>
            </div>
            <div className="space-y-3">
              {[...marketData.coins].sort((a, b) => a.change24h - b.change24h).slice(0, 3).map((coin, index) => (
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
                  <div className="text-sm font-medium text-red-500">
                    {coin.change24h.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
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

        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
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

        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
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

        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Global Metrics
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market Cap</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketStats.totalMarketCap}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>24h Change</span>
              <span className="text-green-500 font-semibold text-sm">+2.9%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;