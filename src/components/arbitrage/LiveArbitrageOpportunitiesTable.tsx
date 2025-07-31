import { useState } from 'react';
import { TrendingUp, RefreshCw, BarChart3 } from 'lucide-react';
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
    totalOpportunities: number;
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
    <div className="w-full bg-gray-900 rounded-lg p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Live Arbitrage Opportunities
            </h2>
          </div>
          <p className="text-gray-400 mb-3">
            Real-time profit opportunities across exchanges - Updated every 15 seconds
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">
                {stats.totalOpportunities || sortedOpportunities.length} Active
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className="text-orange-400 font-medium">
                Avg: {stats.avgSpread?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 text-sm font-medium shadow-lg flex items-center space-x-2">
            <BarChart3 size={16} />
            <span>Analysis</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 text-sm font-medium shadow-lg"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr className="border-b border-gray-600">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Buy From
                </th>
                <th className="px-2 py-3 text-center text-sm font-medium text-gray-300">
                  →
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Sell To
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Spread
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-600">
              {sortedOpportunities.map((opportunity, index) => (
                <tr key={`${opportunity.pair}-${opportunity.buyExchange}-${opportunity.sellExchange}-${index}`} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-yellow-400">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
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
                        <div className="text-sm font-semibold text-white">
                          {opportunity.pair?.split('/')[0] || 'Unknown'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {opportunity.pair || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex flex-col">
                      <span className="text-sm text-green-400 font-medium">
                        {opportunity.buyExchange}
                      </span>
                      <span className="text-xs text-gray-400">
                        ${opportunity.buyPrice.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <div className="text-gray-400">→</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex flex-col">
                      <span className="text-sm text-red-400 font-medium">
                        {opportunity.sellExchange}
                      </span>
                      <span className="text-xs text-gray-400">
                        ${opportunity.sellPrice.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-sm font-semibold text-yellow-400">
                      {opportunity.spread}%
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-sm font-semibold text-green-400">
                      ${opportunity.profitPotential.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">
                      ${(opportunity.volume24h / 1000000).toFixed(1)}M vol
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-xs text-gray-400">
                      {getTimeAgo(opportunity.lastUpdated)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-black rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 text-sm font-medium shadow-md">
                      Trade
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