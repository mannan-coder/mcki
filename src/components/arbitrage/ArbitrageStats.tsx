interface ArbitrageStatsProps {
  stats: {
    totalOpportunities: number;
    avgSpread: number;
    estimatedDailyVolume: number;
  };
  isDarkMode: boolean;
}

const ArbitrageStats = ({ stats, isDarkMode }: ArbitrageStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className={`p-4 rounded-lg border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <h3 className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Active Opportunities
        </h3>
        <div className="text-2xl font-bold text-green-500 mb-2">{stats.totalOpportunities || 0}</div>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Profitable trades available
        </p>
        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className="flex justify-between text-xs">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>High Risk:</span>
            <span className="text-red-500 font-medium">3</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Medium:</span>
            <span className="text-yellow-500 font-medium">8</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Low Risk:</span>
            <span className="text-green-500 font-medium">13</span>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <h3 className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Avg. Spread
        </h3>
        <div className="text-2xl font-bold text-blue-500 mb-2">{stats.avgSpread?.toFixed(2) || 0}%</div>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Across all exchanges
        </p>
        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className="flex justify-between text-xs">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Highest:</span>
            <span className="text-green-500 font-medium">1.96%</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Lowest:</span>
            <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>1.10%</span>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <h3 className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Total Volume
        </h3>
        <div className="text-2xl font-bold text-purple-500 mb-2">${((stats.estimatedDailyVolume || 0) / 1000).toFixed(1)}B</div>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          24h arbitrage volume
        </p>
        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className="flex justify-between text-xs">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>BTC:</span>
            <span className="text-orange-500 font-medium">$847M</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>ETH:</span>
            <span className="text-blue-500 font-medium">$692M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitrageStats;