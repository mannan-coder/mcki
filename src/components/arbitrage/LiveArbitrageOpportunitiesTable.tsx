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
    <div className="w-full bg-background/95 backdrop-blur-sm rounded-xl border border-border/40 p-6 shadow-2xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Live Arbitrage Opportunities
            </h2>
          </div>
          <p className="text-muted-foreground mb-3">
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
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-primary font-medium">
                Avg: {stats.avgSpread?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 text-sm font-medium shadow-lg flex items-center space-x-2">
            <BarChart3 size={16} />
            <span>Analysis</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 disabled:opacity-50 text-sm font-medium shadow-lg"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/40 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border/40">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Buy From
                </th>
                <th className="px-2 py-3 text-center text-sm font-medium text-muted-foreground">
                  →
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Sell To
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Spread
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-card/30 divide-y divide-border/30">
              {sortedOpportunities.map((opportunity, index) => (
                <tr key={`${opportunity.pair}-${opportunity.buyExchange}-${opportunity.sellExchange}-${index}`} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-primary">
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
                          const { getCoinFallbackAvatar } = require('@/utils/avatarGenerator');
                          target.src = getCoinFallbackAvatar(opportunity.pair?.split('/')[0] || 'C', 32);
                        }}
                      />
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {opportunity.pair?.split('/')[0] || 'Unknown'}
                        </div>
                        <div className="text-xs text-muted-foreground">
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
                      <span className="text-xs text-muted-foreground">
                        ${opportunity.buyPrice.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <div className="text-muted-foreground">→</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex flex-col">
                      <span className="text-sm text-red-400 font-medium">
                        {opportunity.sellExchange}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ${opportunity.sellPrice.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-sm font-semibold text-primary">
                      {opportunity.spread.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-sm font-semibold text-green-400">
                      ${opportunity.profitPotential.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-xs text-muted-foreground">
                      {getTimeAgo(opportunity.lastUpdated)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="px-3 py-1.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 text-sm font-medium shadow-md">
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