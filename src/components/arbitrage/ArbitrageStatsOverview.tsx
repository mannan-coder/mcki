import { Target, TrendingUp, DollarSign, Clock } from 'lucide-react';

interface ArbitrageStatsOverviewProps {
  isDarkMode: boolean;
  stats: {
    totalOpportunities: number;
    avgSpread: number;
    estimatedDailyVolume: number;
  };
  opportunities: any[];
}

const ArbitrageStatsOverview = ({ isDarkMode, stats, opportunities }: ArbitrageStatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className={`p-6 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <div className="flex items-center space-x-3 mb-2">
          <Target className="text-green-500" size={24} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Active Opportunities
          </h3>
        </div>
        <div className="text-3xl font-bold text-green-500">{stats.totalOpportunities}</div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Profitable trades available
        </p>
      </div>

      <div className={`p-6 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <div className="flex items-center space-x-3 mb-2">
          <TrendingUp className="text-blue-500" size={24} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Avg. Spread
          </h3>
        </div>
        <div className="text-3xl font-bold text-blue-500">{stats.avgSpread?.toFixed(2) || 0}%</div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Across all pairs
        </p>
      </div>

      <div className={`p-6 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <div className="flex items-center space-x-3 mb-2">
          <DollarSign className="text-purple-500" size={24} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Total Volume
          </h3>
        </div>
        <div className="text-3xl font-bold text-purple-500">${((stats.estimatedDailyVolume || 0) / 1000).toFixed(1)}B</div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          24h arbitrage volume
        </p>
      </div>

      <div className={`p-6 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <div className="flex items-center space-x-3 mb-2">
          <Clock className="text-orange-500" size={24} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Best Spread
          </h3>
        </div>
        <div className="text-3xl font-bold text-orange-500">{opportunities.length > 0 ? Math.max(...opportunities.map(o => o.spread)).toFixed(2) : 0}%</div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Highest profit potential
        </p>
      </div>
    </div>
  );
};

export default ArbitrageStatsOverview;