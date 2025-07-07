
import { TrendingUp, ExternalLink, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface ArbitrageDashboardProps {
  isDarkMode: boolean;
}

const ArbitrageDashboard = ({ isDarkMode }: ArbitrageDashboardProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const arbitrageOpportunities = [
    {
      symbol: 'BTC',
      buyExchange: 'KuCoin',
      sellExchange: 'Binance',
      buyPrice: 67150,
      sellPrice: 67890,
      spread: 1.1,
      profit: '$740',
      volume: '2.5M'
    },
    {
      symbol: 'ETH',
      buyExchange: 'Coinbase',
      sellExchange: 'OKX',
      buyPrice: 3820,
      sellPrice: 3865,
      spread: 1.18,
      profit: '$45',
      volume: '8.2M'
    },
    {
      symbol: 'SOL',
      buyExchange: 'Kraken',
      sellExchange: 'Binance',
      buyPrice: 176.2,
      sellPrice: 178.9,
      spread: 1.53,
      profit: '$2.70',
      volume: '1.8M'
    },
    {
      symbol: 'ADA',
      buyExchange: 'Binance',
      sellExchange: 'KuCoin',
      buyPrice: 0.648,
      sellPrice: 0.657,
      spread: 1.39,
      profit: '$0.009',
      volume: '5.1M'
    },
    {
      symbol: 'MATIC',
      buyExchange: 'OKX',
      sellExchange: 'Coinbase',
      buyPrice: 0.865,
      sellPrice: 0.882,
      spread: 1.96,
      profit: '$0.017',
      volume: '3.4M'
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <section id="arbitrage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Arbitrage Opportunities
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time profit opportunities across top exchanges
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 text-sm font-semibold">
            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Coin</div>
            <div className={`hidden md:block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Buy From</div>
            <div className={`hidden md:block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sell To</div>
            <div className={`hidden md:block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Buy Price</div>
            <div className={`hidden md:block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sell Price</div>
            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Spread</div>
            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Est. Profit</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-gray-700/30">
          {arbitrageOpportunities.map((opportunity, index) => (
            <div key={index} className={`px-6 py-4 hover:bg-gray-500/10 transition-colors cursor-pointer`}>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
                {/* Coin */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {opportunity.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {opportunity.symbol}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Vol: {opportunity.volume}
                    </div>
                  </div>
                </div>

                {/* Buy Exchange */}
                <div className="hidden md:block">
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {opportunity.buyExchange}
                  </div>
                </div>

                {/* Sell Exchange */}
                <div className="hidden md:block">
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {opportunity.sellExchange}
                  </div>
                </div>

                {/* Buy Price */}
                <div className="hidden md:block">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    ${opportunity.buyPrice.toLocaleString()}
                  </div>
                </div>

                {/* Sell Price */}
                <div className="hidden md:block">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    ${opportunity.sellPrice.toLocaleString()}
                  </div>
                </div>

                {/* Spread */}
                <div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-green-500 font-medium">
                      {opportunity.spread}%
                    </span>
                  </div>
                  <div className="md:hidden text-xs text-gray-500 mt-1">
                    {opportunity.buyExchange} → {opportunity.sellExchange}
                  </div>
                </div>

                {/* Profit */}
                <div className="text-right">
                  <div className={`font-bold text-green-500`}>
                    {opportunity.profit}
                  </div>
                  <button className="text-xs text-blue-500 hover:text-blue-400 flex items-center space-x-1 mt-1">
                    <span>Execute</span>
                    <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Active Opportunities
          </h3>
          <div className="text-3xl font-bold text-green-500">24</div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Profitable trades available
          </p>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Avg. Spread
          </h3>
          <div className="text-3xl font-bold text-blue-500">1.42%</div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Across all exchanges
          </p>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Total Volume
          </h3>
          <div className="text-3xl font-bold text-purple-500">$2.1B</div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            24h arbitrage volume
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArbitrageDashboard;
