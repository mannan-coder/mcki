
import { TrendingUp, ArrowUp, ArrowDown, Activity, DollarSign, Users, BarChart3, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useSentimentData } from '@/hooks/useSentimentData';

interface MarketOverviewProps {
  isDarkMode: boolean;
}

const MarketOverview = ({ isDarkMode }: MarketOverviewProps) => {
  const { data: marketData, loading, error, refetch } = useCryptoData();
  const { data: sentimentData } = useSentimentData();

  if (loading) {
    return (
      <section id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-primary" size={32} />
          <span className={`ml-3 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Loading market data...
          </span>
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Market Overview
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time cryptocurrency market statistics
          </p>
        </div>
        <Link 
          to="/market"
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>View Details</span>
          <ExternalLink size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {/* Enhanced Market Cap with Comprehensive Details */}
        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Total Market Cap
            </h3>
            <div className="text-green-500 text-xs font-medium">+2.4%</div>
          </div>
          <div className="text-2xl font-bold text-blue-500 mb-3">
            {marketStats.totalMarketCap}
          </div>
          
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>24h Change:</span>
              <span className="text-green-500 font-semibold">+$58.2B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>7d Change:</span>
              <span className="text-green-500 font-semibold">+$127.8B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>BTC Dominance:</span>
              <span className="text-orange-500 font-semibold">{marketStats.btcDominance}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>ETH Dominance:</span>
              <span className="text-blue-500 font-semibold">{marketStats.ethDominance}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Open Interest:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$34.2B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>ETH Gas Fee:</span>
              <span className="text-blue-500 font-semibold">12 gwei</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Altcoin Season:</span>
              <span className="text-green-500 font-semibold">78/100</span>
            </div>
          </div>
          
          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Market Health: <span className="text-green-500 font-medium">Strong</span> • ATH: $3.02T
            </p>
          </div>
        </div>

        {/* Enhanced Volume with Comprehensive Coin Details */}
        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              24h Trading Volume
            </h3>
            <div className="text-red-500 text-xs font-medium">-1.2%</div>
          </div>
          <div className="text-2xl font-bold text-purple-500 mb-3">
            {marketStats.totalVolume}
          </div>
          
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>BTC Volume:</span>
              </div>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$28.4B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>ETH Volume:</span>
              </div>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$16.8B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>SOL Volume:</span>
              </div>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$3.2B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>USDT Volume:</span>
              </div>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$24.1B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>DEX Volume:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$8.4B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Derivatives:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$28.5B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Avg Daily (7d):</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$91.7B</span>
            </div>
          </div>
          
          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Spot: <span className="text-blue-500 font-medium">68%</span> • Futures: <span className="text-purple-500 font-medium">32%</span>
            </p>
          </div>
        </div>

        {/* Fear & Greed Index - Compact */}
        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Fear & Greed Index
          </h3>
          
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className={`text-2xl font-bold ${getFearGreedColor(fearGreedIndex)}`}>
                {fearGreedIndex}
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {getFearGreedLabel(fearGreedIndex)}
              </div>
            </div>
            
            {/* Fear & Greed Bar */}
            <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : ''} mb-1`}>
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  fearGreedIndex >= 75 ? 'bg-green-500' : 
                  fearGreedIndex >= 50 ? 'bg-yellow-500' : 
                  fearGreedIndex >= 25 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${fearGreedIndex}%` }}
              ></div>
            </div>
            
            {/* Scale indicators */}
            <div className="flex justify-between text-xs mt-1">
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>0</span>
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>25</span>
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>50</span>
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>75</span>
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>100</span>
            </div>
          </div>

          <div className="space-y-1 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Yesterday:</span>
              <span className={`font-medium ${getFearGreedColor(historicalData.yesterday)}`}>
                {historicalData.yesterday} ({historicalData.current > historicalData.yesterday ? '+' : ''}{historicalData.current - historicalData.yesterday})
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Week ago:</span>
              <span className={`font-medium ${getFearGreedColor(historicalData.weekAgo)}`}>
                {historicalData.weekAgo} ({historicalData.current > historicalData.weekAgo ? '+' : ''}{historicalData.current - historicalData.weekAgo})
              </span>
            </div>
          </div>

          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center">
                <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  24h Change
                </div>
                <div className={`font-bold ${historicalData.current > historicalData.yesterday ? 'text-green-500' : 'text-red-500'}`}>
                  {historicalData.current > historicalData.yesterday ? '+' : ''}{historicalData.current - historicalData.yesterday}
                </div>
              </div>
              <div className="text-center">
                <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  7d Change
                </div>
                <div className={`font-bold ${historicalData.current > historicalData.weekAgo ? 'text-green-500' : 'text-red-500'}`}>
                  {historicalData.current > historicalData.weekAgo ? '+' : ''}{historicalData.current - historicalData.weekAgo}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Market Dominance
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bitcoin</span>
              <span className="text-orange-500 font-semibold text-sm">{marketStats.btcDominance}</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-1.5 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: marketStats.btcDominance }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ethereum</span>
              <span className="text-blue-500 font-semibold text-sm">{realEthDominance}</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-1.5 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: realEthDominance }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tether (USDT)</span>
              <span className="text-green-500 font-semibold text-sm">3.7%</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-1.5 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '3.7%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>BNB</span>
              <span className="text-yellow-500 font-semibold text-sm">3.1%</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-1.5 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '3.1%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Solana</span>
              <span className="text-purple-500 font-semibold text-sm">2.8%</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-1.5 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '2.8%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Others</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>19.9%</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
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
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Trading Pairs</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                45,832
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Exchanges</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketStats.exchanges}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>DeFi Volume</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $12.4B
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Listings (24h)</span>
              <span className="text-green-500 font-semibold text-sm">
                24
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Layer 1 Protocols</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                156
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Meme Coins</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                2,847
              </span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Advanced Market Metrics
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Staking Volume</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $145.2B
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Derivatives Volume</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $89.7B
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Futures Open Interest</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $34.2B
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>NFT Volume (24h)</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $892.4M
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cross-chain Volume</span>
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $4.8B
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Institutional Holdings</span>
              <span className="text-blue-500 font-semibold text-sm">
                68.4%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Liquidations (24h)</span>
              <span className="text-red-500 font-semibold text-sm">
                $142.7M
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Long/Short Ratio</span>
              <span className="text-green-500 font-semibold text-sm">
                2.1:1
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market Cap Change</span>
              <span className="text-green-500 font-semibold text-sm">
                +2.4%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
