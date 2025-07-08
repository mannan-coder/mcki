
import { TrendingUp, TrendingDown, Users, Activity, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OnChainAnalysisProps {
  isDarkMode: boolean;
}

const OnChainAnalysis = ({ isDarkMode }: OnChainAnalysisProps) => {
  const onChainData = {
    walletGrowth: {
      daily: '+12,485',
      weekly: '+87,231',
      change: '+5.2%'
    },
    whaleMovements: [
      { type: 'buy', amount: '1,250 BTC', exchange: 'Unknown → Binance', time: '2h ago' },
      { type: 'sell', amount: '892 ETH', exchange: 'Coinbase → Unknown', time: '4h ago' },
      { type: 'buy', amount: '45,000 SOL', exchange: 'Unknown → Kraken', time: '6h ago' },
    ],
    exchangeFlows: {
      inflow: '$2.1B',
      outflow: '$1.8B',
      netFlow: '+$300M'
    }
  };

  return (
    <section id="analytics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            On-Chain Analysis
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Advanced blockchain data and whale tracking
          </p>
        </div>
        <Link 
          to="/analytics"
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>View Analytics</span>
          <ExternalLink size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wallet Growth */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <Users className="text-white" size={20} />
            </div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Wallet Growth Trends
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily New Wallets</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-500">{onChainData.walletGrowth.daily}</span>
                <TrendingUp className="text-green-500" size={16} />
              </div>
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Weekly Growth</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-500">{onChainData.walletGrowth.weekly}</span>
                <span className="text-green-500 text-sm">{onChainData.walletGrowth.change}</span>
              </div>
            </div>
          </div>

          {/* Simple growth chart representation */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-end space-x-2 h-20">
              {[65, 72, 58, 89, 94, 78, 95].map((height, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t flex-1"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Last 7 days wallet creation activity
            </div>
          </div>
        </div>

        {/* Exchange Flows */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
              <Activity className="text-white" size={20} />
            </div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Exchange Flows (24h)
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className="text-red-500" size={16} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Inflow</span>
              </div>
              <span className="text-red-500 font-semibold">{onChainData.exchangeFlows.inflow}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Outflow</span>
              </div>
              <span className="text-green-500 font-semibold">{onChainData.exchangeFlows.outflow}</span>
            </div>

            <div className={`border-t pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Net Flow</span>
                <span className="text-green-500 font-bold text-lg">{onChainData.exchangeFlows.netFlow}</span>
              </div>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Positive net flow indicates accumulation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Whale Movements */}
      <div className={`mt-8 p-6 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      }`}>
        <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          🐋 Whale Movements
        </h3>

        <div className="space-y-4">
          {onChainData.whaleMovements.map((movement, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700/30 border-gray-600/30' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  movement.type === 'buy' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {movement.type === 'buy' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div>
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {movement.type === 'buy' ? 'Large Buy' : 'Large Sell'}: {movement.amount}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {movement.exchange}
                  </div>
                </div>
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {movement.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnChainAnalysis;
