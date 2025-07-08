import { TrendingUp } from 'lucide-react';

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

  return (
    <div className={`px-6 py-5 hover:bg-gray-500/5 transition-colors cursor-pointer`}>
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Asset - col-span-3 */}
        <div className="col-span-3 flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            {symbol.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {symbol}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
              Vol: {(opportunity.volume24h / 1000000).toFixed(1)}M • {new Date(opportunity.lastUpdated).toLocaleTimeString()}
            </div>
            <div className={`flex items-center space-x-2 mt-1`}>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                opportunity.spread > 1.5 ? (isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700') :
                opportunity.spread > 0.5 ? (isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-700') :
                (isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-700')
              }`}>
                {opportunity.spread > 1.5 ? 'High' : opportunity.spread > 0.5 ? 'Medium' : 'Low'}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {Math.floor(95 + Math.random() * 5)}%
              </span>
            </div>
          </div>
        </div>

        {/* Buy Exchange - col-span-2 */}
        <div className="col-span-2 hidden md:block">
          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {opportunity.buyExchange}
          </div>
          <div className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            ${opportunity.buyPrice.toLocaleString()}
          </div>
        </div>

        {/* Sell Exchange - col-span-2 */}
        <div className="col-span-2 hidden md:block">
          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {opportunity.sellExchange}
          </div>
          <div className={`text-xs font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            ${opportunity.sellPrice.toLocaleString()}
          </div>
        </div>

        {/* Prices - col-span-2 */}
        <div className="col-span-2 hidden lg:block">
          <div className="text-center space-y-1">
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Buy Price
            </div>
            <div className={`font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              ${opportunity.buyPrice.toLocaleString()}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
              Sell Price
            </div>
            <div className={`font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              ${opportunity.sellPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Spread - col-span-1 */}
        <div className="col-span-1">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center space-x-1 justify-center">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-green-500 font-semibold text-sm">
                  {opportunity.spread}%
                </span>
              </div>
              <div className="lg:hidden text-xs text-gray-500 mt-1 truncate">
                {opportunity.buyExchange} → {opportunity.sellExchange}
              </div>
            </div>
          </div>
        </div>

        {/* Profit - col-span-2 */}
        <div className="col-span-2">
          <div className="text-right">
            <div className={`font-bold text-green-500 text-lg mb-1`}>
              ${profit}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              Net: <span className="font-medium">${netProfit}</span>
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Fees: ${fees}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitrageOpportunityRow;