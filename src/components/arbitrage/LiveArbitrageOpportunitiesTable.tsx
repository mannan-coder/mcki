import { useState } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { getCoinLogoById } from '@/utils/coinLogos';
import { useToast } from '@/hooks/use-toast';

interface Opportunity {
  pair?: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  profitPotential: number;
  volume24h: number;
  lastUpdated: string;
}

interface LiveArbitrageOpportunitiesTableProps {
  isDarkMode: boolean;
  opportunities: Opportunity[];
  loading: boolean;
  onRefresh: () => void;
  stats: {
    avgSpread: number;
  };
}

const LiveArbitrageOpportunitiesTable = ({ 
  isDarkMode, 
  opportunities, 
  loading, 
  onRefresh, 
  stats 
}: LiveArbitrageOpportunitiesTableProps) => {
  const [sortBy, setSortBy] = useState('spread');
  const { toast } = useToast();

  const handleRefresh = () => {
    onRefresh();
    toast({
      title: "Arbitrage Data Refreshed",
      description: "Live arbitrage opportunities have been updated.",
    });
  };

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    switch (sortBy) {
      case 'spread':
        return b.spread - a.spread;
      case 'profit':
        return b.profitPotential - a.profitPotential;
      default:
        return 0;
    }
  });

  const getRiskColor = (spread: number) => {
    if (spread > 1.5) {
      return 'text-green-500 bg-green-500/20 border-green-500/30';
    } else if (spread > 0.8) {
      return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
    }
    return 'text-red-500 bg-red-500/20 border-red-500/30';
  };

  const getCoinSymbolFromPair = (pair: string) => {
    const symbol = pair?.split('/')[0] || '';
    const symbolMap: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum', 
      'BNB': 'binancecoin',
      'SOL': 'solana',
      'ADA': 'cardano',
      'AVAX': 'avalanche-2',
      'MATIC': 'polygon',
      'LINK': 'chainlink',
      'LTC': 'litecoin',
      'UNI': 'uniswap',
      'XLM': 'stellar',
      'VET': 'vechain',
      'FIL': 'filecoin',
      'DOGE': 'dogecoin',
      'SHIB': 'shiba-inu',
      'PEPE': 'pepe'
    };
    return symbolMap[symbol.toUpperCase()] || symbol.toLowerCase();
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };

  return (
    <div className="xl:col-span-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 space-y-3 lg:space-y-0">
        <div>
          <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💰 Live Arbitrage Opportunities
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            Real-time profit opportunities across exchanges - Updated every 15 seconds
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-medium`}>
                {sortedOpportunities.length} Active
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                Avg: {stats.avgSpread?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-1.5 rounded-lg border transition-colors text-sm ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="spread">Sort by Spread</option>
            <option value="profit">Sort by Profit</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 text-sm"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className={`rounded-lg border backdrop-blur-sm overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700/60' 
          : 'bg-white/98 border-gray-200/60'
      }`}>
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/98' : 'border-gray-200/60 bg-gray-50/95'}`}>
          <div className="text-base font-bold flex items-center space-x-2">
            <span>🏆</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Top Arbitrage Opportunities</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-50/90'}`}>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                <th className={`px-3 py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  #
                </th>
                <th className={`px-3 py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Asset
                </th>
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Buy From
                </th>
                <th className={`px-1 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  →
                </th>
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sell To
                </th>
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Spread
                </th>
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Profit
                </th>
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Last Updated
                </th>
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
              {sortedOpportunities.map((opportunity, index) => (
                <tr key={`${opportunity.pair}-${opportunity.buyExchange}-${opportunity.sellExchange}-${index}`} className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                  <td className="px-3 py-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' :
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={getCoinLogoById(getCoinSymbolFromPair(opportunity.pair || ''))} 
                        alt={opportunity.pair?.split('/')[0] || ''}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/32x32/666666/ffffff?text=${(opportunity.pair?.split('/')[0] || 'C').charAt(0)}`;
                        }}
                      />
                      <div>
                        <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {opportunity.pair?.split('/')[0] || 'Unknown'}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {opportunity.pair || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className={`text-center p-2 rounded border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {opportunity.buyExchange}
                      </div>
                      <div className={`text-xs font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${opportunity.buyPrice.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-1 py-3 text-center">
                    <div className="text-green-500">→</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className={`text-center p-2 rounded border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {opportunity.sellExchange}
                      </div>
                      <div className={`text-xs font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${opportunity.sellPrice.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex items-center space-x-1 justify-center">
                          <TrendingUp size={12} className="text-green-500" />
                          <span className="text-green-500 font-semibold text-sm">
                            {opportunity.spread}%
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border mt-1 inline-block ${getRiskColor(opportunity.spread)}`}>
                          {opportunity.spread > 1.5 ? 'Low' : opportunity.spread > 0.8 ? 'Med' : 'High'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className={`font-bold text-green-500 text-sm`}>
                      {opportunity.profitPotential.toFixed(2)}%
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${(opportunity.volume24h / 1000000).toFixed(1)}M vol
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getTimeAgo(opportunity.lastUpdated)}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveArbitrageOpportunitiesTable;