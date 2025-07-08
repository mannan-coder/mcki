import { TrendingUp, ArrowRight, ExternalLink } from 'lucide-react';
import { getCoinLogoById } from '@/utils/coinLogos';

interface ArbitrageOpportunity {
  pair?: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  volume24h: number;
  lastUpdated: string;
}

interface ArbitrageOpportunityRowProps {
  opportunity: ArbitrageOpportunity;
  isDarkMode: boolean;
  index: number;
}

const ArbitrageOpportunityRow = ({ opportunity, isDarkMode, index }: ArbitrageOpportunityRowProps) => {
  const symbol = opportunity.pair?.split('/')[0] || 'CRYPTO';
  const profit = ((opportunity.sellPrice - opportunity.buyPrice) * 1).toFixed(2);
  const fees = (opportunity.sellPrice * 0.002).toFixed(2);
  const netProfit = (parseFloat(profit) - parseFloat(fees)).toFixed(2);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value);
  };

  const getRiskBadge = (spread: number) => {
    if (spread > 1.5) {
      return {
        label: 'High',
        color: isDarkMode ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300'
      };
    } else if (spread > 0.5) {
      return {
        label: 'Med',
        color: isDarkMode ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300'
      };
    } else {
      return {
        label: 'Low',
        color: isDarkMode ? 'bg-red-900/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300'
      };
    }
  };

  const riskBadge = getRiskBadge(opportunity.spread);

  return (
    <tr className={`border-b transition-all duration-200 hover:bg-gray-500/5 group ${
      isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'
    }`}>
      {/* Rank */}
      <td className="px-3 py-3 text-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          index < 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
        }`}>
          {index + 1}
        </div>
      </td>

      {/* Asset */}
      <td className="px-3 py-3">
        <div className="flex items-center space-x-2">
          <img 
            src={getCoinLogoById(symbol.toLowerCase())} 
            alt={symbol}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/32x32/666666/ffffff?text=${symbol.charAt(0)}`;
            }}
          />
          <div>
            <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {symbol}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {(opportunity.volume24h / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      </td>

      {/* Buy Exchange */}
      <td className="px-3 py-3 text-center">
        <div className={`p-2 rounded-md border ${
          isDarkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
        }`}>
          <div className={`font-medium text-xs ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-1`}>
            {opportunity.buyExchange}
          </div>
          <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatCurrency(opportunity.buyPrice)}
          </div>
        </div>
      </td>

      {/* Arrow */}
      <td className="px-1 py-3 text-center">
        <ArrowRight size={16} className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} group-hover:translate-x-1 transition-transform duration-200`} />
      </td>

      {/* Sell Exchange */}
      <td className="px-3 py-3 text-center">
        <div className={`p-2 rounded-md border ${
          isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className={`font-medium text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} mb-1`}>
            {opportunity.sellExchange}
          </div>
          <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatCurrency(opportunity.sellPrice)}
          </div>
        </div>
      </td>

      {/* Spread */}
      <td className="px-3 py-3 text-center">
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-green-500 font-bold text-base">
              {opportunity.spread}%
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${riskBadge.color}`}>
            {riskBadge.label}
          </span>
        </div>
      </td>

      {/* Profit */}
      <td className="px-3 py-3 text-center">
        <div className="space-y-1">
          <div className="text-green-500 font-bold text-base">
            ${profit}
          </div>
          <div className="text-xs">
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Net: <span className="font-medium text-green-600">${netProfit}</span>
            </div>
          </div>
        </div>
      </td>

      {/* Action */}
      <td className="px-3 py-3 text-center">
        <button className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
        }`}>
          <div className="flex items-center space-x-1">
            <span>Trade</span>
            <ExternalLink size={12} />
          </div>
        </button>
      </td>
    </tr>
  );
};

export default ArbitrageOpportunityRow;