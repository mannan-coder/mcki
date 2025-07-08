
import { RefreshCw, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import ArbitrageOpportunityRow from './arbitrage/ArbitrageOpportunityRow';
import ArbitrageStats from './arbitrage/ArbitrageStats';
import LivePricesAcrossExchanges from './arbitrage/LivePricesAcrossExchanges';

interface ArbitrageDashboardProps {
  isDarkMode: boolean;
}

const ArbitrageDashboard = ({ isDarkMode }: ArbitrageDashboardProps) => {
  const { data: arbitrageData, loading, refetch } = useArbitrageData();

  if (!arbitrageData) {
    return null; // Don't show loading, just hide until data loads
  }

  const opportunities = arbitrageData?.arbitrageOpportunities || [];
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <section id="arbitrage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💰 Live Arbitrage Opportunities
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time profit opportunities across exchanges - Updated every 30 seconds
          </p>
          <div className="mt-2 flex items-center space-x-4 text-sm">
            <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-medium`}>
              {opportunities.length} Active Opportunities
            </span>
            <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
              Avg Spread: {stats.avgSpread?.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link 
            to="/arbitrage"
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span>View Details</span>
            <ExternalLink size={16} />
          </Link>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className={`rounded-xl border backdrop-blur-sm overflow-hidden shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700/60' 
          : 'bg-white/95 border-gray-200/60'
      }`}>
        {/* Desktop Header */}
        <div className={`hidden lg:block px-6 py-5 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/95' : 'border-gray-200/60 bg-gray-50/90'}`}>
          <div className="grid grid-cols-12 gap-6 text-sm font-semibold items-center">
            <div className={`col-span-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center space-x-2">
                <span>🪙</span>
                <span>Asset & Risk</span>
              </div>
            </div>
            <div className={`col-span-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center justify-center space-x-2">
                <span>🔄</span>
                <span>Exchange Flow</span>
              </div>
            </div>
            <div className={`col-span-2 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center justify-center space-x-2">
                <span>📈</span>
                <span>Spread</span>
              </div>
            </div>
            <div className={`col-span-3 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center justify-end space-x-2">
                <span>💰</span>
                <span>Profit & Action</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className={`lg:hidden px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/95' : 'border-gray-200/60 bg-gray-50/90'}`}>
          <div className="text-sm font-semibold">
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>💰 Live Arbitrage Opportunities</span>
          </div>
        </div>

        {/* Data Rows */}
        <div className={`divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
          {opportunities.map((opportunity, index) => (
            <ArbitrageOpportunityRow 
              key={index} 
              opportunity={opportunity} 
              isDarkMode={isDarkMode} 
            />
          ))}
        </div>
      </div>

      <ArbitrageStats stats={stats} isDarkMode={isDarkMode} />

      <LivePricesAcrossExchanges opportunities={opportunities} isDarkMode={isDarkMode} />
    </section>
  );
};

export default ArbitrageDashboard;
