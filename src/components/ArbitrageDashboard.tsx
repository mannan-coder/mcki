
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
    return (
      <section id="arbitrage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-64 bg-muted rounded-lg animate-pulse mb-2"></div>
            <div className="h-5 w-80 bg-muted/60 rounded-lg animate-pulse mb-2"></div>
            <div className="flex items-center space-x-4">
              <div className="h-4 w-32 bg-muted/60 rounded animate-pulse"></div>
              <div className="h-4 w-28 bg-muted/60 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-28 bg-muted rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-muted rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className={`rounded-xl border backdrop-blur-sm overflow-hidden shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800/95 border-gray-700/60' 
            : 'bg-white/98 border-gray-200/60'
        }`}>
          <div className={`px-6 py-5 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/98' : 'border-gray-200/60 bg-gray-50/95'}`}>
            <div className="h-6 w-64 bg-muted rounded animate-pulse"></div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-50/90'}`}>
                <tr className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                  {['Rank', 'Asset', 'Buy From', '→', 'Sell To', 'Spread', 'Profit', 'Action'].map((header, i) => (
                    <th key={i} className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
                        <div>
                          <div className="h-5 w-16 bg-muted rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-20 bg-muted/60 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-16 w-24 bg-muted rounded-lg animate-pulse"></div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="h-5 w-5 bg-muted rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-16 w-24 bg-muted rounded-lg animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-12 w-16 bg-muted rounded-lg animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-12 w-16 bg-muted rounded-lg animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 w-16 bg-muted rounded-lg animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional sections skeleton */}
        <div className="mt-12 space-y-8">
          <div className="h-40 bg-muted/30 rounded-xl animate-pulse"></div>
          <div className="h-64 bg-muted/30 rounded-xl animate-pulse"></div>
        </div>
      </section>
    );
  }

  const opportunities = arbitrageData?.arbitrageOpportunities || [];
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <section id="arbitrage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className={`text-3xl lg:text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💰 Live Arbitrage Opportunities
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            Real-time profit opportunities across exchanges - Updated every 30 seconds
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-semibold`}>
                {opportunities.length} Active Opportunities
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold`}>
                Avg Spread: {stats.avgSpread?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/arbitrage"
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <span>View Full Analysis</span>
            <ExternalLink size={18} />
          </Link>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl font-medium"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700/60' 
          : 'bg-white/98 border-gray-200/60'
      }`}>
        {/* Table Header */}
        <div className={`px-6 py-5 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/98' : 'border-gray-200/60 bg-gray-50/95'}`}>
          <div className="text-lg font-bold flex items-center space-x-2">
            <span>🏆</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Top Arbitrage Opportunities</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-50/90'}`}>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Rank
                </th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Asset
                </th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Buy From
                </th>
                <th className={`px-2 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  →
                </th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sell To
                </th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Spread
                </th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Profit
                </th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
              {opportunities.map((opportunity, index) => (
                <ArbitrageOpportunityRow 
                  key={index} 
                  opportunity={opportunity} 
                  isDarkMode={isDarkMode}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ArbitrageStats stats={stats} isDarkMode={isDarkMode} />

      <LivePricesAcrossExchanges opportunities={opportunities} isDarkMode={isDarkMode} />
    </section>
  );
};

export default ArbitrageDashboard;
