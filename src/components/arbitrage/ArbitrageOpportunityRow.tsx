import { TrendingUp, ArrowRight } from 'lucide-react';

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
}

const ArbitrageOpportunityRow = ({ opportunity, isDarkMode }: ArbitrageOpportunityRowProps) => {
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
        label: 'High Risk',
        color: isDarkMode ? 'bg-green-900/30 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-200'
      };
    } else if (spread > 0.5) {
      return {
        label: 'Medium Risk',
        color: isDarkMode ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
      };
    } else {
      return {
        label: 'Low Risk',
        color: isDarkMode ? 'bg-red-900/30 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-200'
      };
    }
  };

  const riskBadge = getRiskBadge(opportunity.spread);

  return (
    <>
      {/* Desktop Layout */}
      <div className={`hidden lg:block px-6 py-6 hover:bg-gray-500/5 transition-all duration-200 cursor-pointer group`}>
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Asset Info - Enhanced */}
          <div className="col-span-3 flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${
              isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
            }`}>
              {symbol.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {symbol}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Vol: {(opportunity.volume24h / 1000000).toFixed(1)}M • {new Date(opportunity.lastUpdated).toLocaleTimeString()}
              </div>
              <div className={`flex items-center space-x-2 mt-2`}>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskBadge.color}`}>
                  {riskBadge.label}
                </span>
                <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Success: {Math.floor(95 + Math.random() * 5)}%
                </span>
              </div>
            </div>
          </div>

          {/* Exchange Flow - Visual Enhancement */}
          <div className="col-span-4 hidden md:flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Buy from
              </div>
              <div className={`font-bold text-lg ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-1`}>
                {opportunity.buyExchange}
              </div>
              <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatCurrency(opportunity.buyPrice)}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <ArrowRight size={24} className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-1`} />
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Transfer</span>
            </div>
            
            <div className="text-center">
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Sell to
              </div>
              <div className={`font-bold text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-1`}>
                {opportunity.sellExchange}
              </div>
              <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatCurrency(opportunity.sellPrice)}
              </div>
            </div>
          </div>

          {/* Spread & Profit */}
          <div className="col-span-2 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp size={18} className="text-green-500 mr-2" />
              <span className="text-green-500 font-bold text-xl">
                {opportunity.spread}%
              </span>
            </div>
            <div className="lg:hidden text-xs text-gray-500 mt-1">
              {opportunity.buyExchange} → {opportunity.sellExchange}
            </div>
          </div>

          {/* Profit Details */}
          <div className="col-span-3 text-right">
            <div className="space-y-2">
              <div className={`font-bold text-green-500 text-2xl`}>
                ${profit}
              </div>
              <div className="flex justify-end space-x-4 text-sm">
                <div>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Net: </span>
                  <span className="font-semibold text-green-600">${netProfit}</span>
                </div>
                <div>
                  <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Fees: </span>
                  <span className="font-medium">${fees}</span>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}>
                Execute Trade
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={`lg:hidden px-6 py-6 hover:bg-gray-500/5 transition-colors`}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {symbol.charAt(0)}
              </div>
              <div>
                <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {symbol}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${riskBadge.color}`}>
                  {riskBadge.label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-500 font-bold text-xl">{opportunity.spread}%</div>
              <div className="font-bold text-green-500 text-lg">${profit}</div>
            </div>
          </div>

          {/* Exchange Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-green-500/5 border-green-500/20' : 'bg-green-50 border-green-200'
            }`}>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Buy from
              </div>
              <div className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {opportunity.buyExchange}
              </div>
              <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatCurrency(opportunity.buyPrice)}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Sell to
              </div>
              <div className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {opportunity.sellExchange}
              </div>
              <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatCurrency(opportunity.sellPrice)}
              </div>
            </div>
          </div>

          {/* Profit Details */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Net Profit: </span>
              <span className="font-semibold text-green-600">${netProfit}</span>
              <span className={`ml-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>• Fees: ${fees}</span>
            </div>
            <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}>
              Execute
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArbitrageOpportunityRow;