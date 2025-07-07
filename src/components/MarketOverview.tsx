
interface MarketOverviewProps {
  isDarkMode: boolean;
}

const MarketOverview = ({ isDarkMode }: MarketOverviewProps) => {
  const marketStats = {
    totalMarketCap: '$2.63T',
    totalVolume: '$89.2B',
    btcDominance: '54.2%',
    ethDominance: '17.8%',
    activeCoins: '13,247',
    exchanges: '794'
  };

  const fearGreedIndex = 72; // 0-100 scale

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
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Market Overview
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time cryptocurrency market statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Market Stats */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Total Market Cap
            </h3>
            <div className="text-green-500 text-sm">+2.4%</div>
          </div>
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {marketStats.totalMarketCap}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            24h change: +$58.2B
          </p>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              24h Volume
            </h3>
            <div className="text-red-500 text-sm">-1.2%</div>
          </div>
          <div className="text-3xl font-bold text-purple-500 mb-2">
            {marketStats.totalVolume}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Market activity
          </p>
        </div>

        {/* Fear & Greed Index - Made smaller */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Fear & Greed Index
          </h3>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={isDarkMode ? '#374151' : '#e5e7eb'}
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={fearGreedIndex >= 75 ? '#10b981' : fearGreedIndex >= 50 ? '#f59e0b' : fearGreedIndex >= 25 ? '#f97316' : '#ef4444'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${fearGreedIndex * 2.51} 251`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-2xl font-bold ${getFearGreedColor(fearGreedIndex)}`}>
                  {fearGreedIndex}
                </div>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getFearGreedLabel(fearGreedIndex)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>24h:</span>
              <span className="text-green-500">+5</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Week:</span>
              <span className="text-red-500">-12</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Market Dominance
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bitcoin</span>
              <span className="text-orange-500 font-semibold">{marketStats.btcDominance}</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: marketStats.btcDominance }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ethereum</span>
              <span className="text-blue-500 font-semibold">{marketStats.ethDominance}</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: marketStats.ethDominance }}></div>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Market Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active Coins</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketStats.activeCoins}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Exchanges</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketStats.exchanges}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>DeFi Volume</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $12.4B
              </span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Additional Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Staking Volume</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $145.2B
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>NFT Volume</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $892.4M
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market Cap Change</span>
              <span className="text-green-500 font-semibold">
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
