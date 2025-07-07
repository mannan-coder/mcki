import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, ExternalLink, BarChart3, Clock, DollarSign, Target, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ArbitrageOpportunity {
  id: number;
  symbol: string;
  name: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  profit: string;
  netProfit: string;
  volume: string;
  confidence: number;
  timeToExecute: string;
  risk: 'Low' | 'Medium' | 'High';
  fees: string;
  liquidityDepth: string;
  lastUpdated: string;
  priceHistory: number[];
}

interface ExchangeRate {
  exchange: string;
  price: number;
  volume24h: string;
  change24h: number;
  lastUpdate: string;
  spread: number;
  orderBookDepth: string;
}

const ArbitragePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [sortBy, setSortBy] = useState('spread');

  const arbitrageData: ArbitrageOpportunity[] = [
    {
      id: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      buyExchange: 'KuCoin',
      sellExchange: 'Binance',
      buyPrice: 67150,
      sellPrice: 67890,
      spread: 1.10,
      profit: '$740',
      netProfit: '$727.50',
      volume: '2.5M',
      confidence: 95,
      timeToExecute: '3-5 min',
      risk: 'Low',
      fees: '$12.50',
      liquidityDepth: '$847K',
      lastUpdated: '2s ago',
      priceHistory: [67100, 67125, 67140, 67150]
    },
    {
      id: 2,
      symbol: 'ETH',
      name: 'Ethereum',
      buyExchange: 'Coinbase',
      sellExchange: 'OKX',
      buyPrice: 3820,
      sellPrice: 3865,
      spread: 1.18,
      profit: '$45',
      netProfit: '$41.20',
      volume: '8.2M',
      confidence: 92,
      timeToExecute: '2-4 min',
      risk: 'Low',
      fees: '$3.80',
      liquidityDepth: '$1.2M',
      lastUpdated: '5s ago',
      priceHistory: [3815, 3818, 3819, 3820]
    },
    {
      id: 3,
      symbol: 'SOL',
      name: 'Solana',
      buyExchange: 'Kraken',
      sellExchange: 'Binance',
      buyPrice: 176.2,
      sellPrice: 178.9,
      spread: 1.53,
      profit: '$2.70',
      netProfit: '$2.25',
      volume: '1.8M',
      confidence: 88,
      timeToExecute: '4-6 min',
      risk: 'Medium',
      fees: '$0.45',
      liquidityDepth: '$234K',
      lastUpdated: '8s ago',
      priceHistory: [175.8, 176.0, 176.1, 176.2]
    },
    {
      id: 4,
      symbol: 'ADA',
      name: 'Cardano',
      buyExchange: 'Binance',
      sellExchange: 'KuCoin',
      buyPrice: 0.648,
      sellPrice: 0.657,
      spread: 1.39,
      profit: '$0.009',
      netProfit: '$0.007',
      volume: '5.1M',
      confidence: 85,
      timeToExecute: '5-8 min',
      risk: 'Medium',
      fees: '$0.002',
      liquidityDepth: '$89K',
      lastUpdated: '12s ago',
      priceHistory: [0.645, 0.646, 0.647, 0.648]
    },
    {
      id: 5,
      symbol: 'MATIC',
      name: 'Polygon',
      buyExchange: 'OKX',
      sellExchange: 'Coinbase',
      buyPrice: 0.865,
      sellPrice: 0.882,
      spread: 1.96,
      profit: '$0.017',
      netProfit: '$0.014',
      volume: '3.4M',
      confidence: 90,
      timeToExecute: '3-7 min',
      risk: 'Low',
      fees: '$0.003',
      liquidityDepth: '$156K',
      lastUpdated: '6s ago',
      priceHistory: [0.863, 0.864, 0.864, 0.865]
    }
  ];

  const exchangeRates: { [key: string]: ExchangeRate[] } = {
    BTC: [
      { exchange: 'Binance', price: 67890, volume24h: '$45.2B', change24h: 2.4, lastUpdate: '2s ago', spread: 0.05, orderBookDepth: '$2.8M' },
      { exchange: 'Coinbase', price: 67825, volume24h: '$32.1B', change24h: 2.2, lastUpdate: '3s ago', spread: 0.08, orderBookDepth: '$2.1M' },
      { exchange: 'KuCoin', price: 67150, volume24h: '$28.7B', change24h: 1.8, lastUpdate: '2s ago', spread: 0.12, orderBookDepth: '$1.9M' },
      { exchange: 'OKX', price: 67945, volume24h: '$41.3B', change24h: 2.6, lastUpdate: '4s ago', spread: 0.06, orderBookDepth: '$2.5M' },
      { exchange: 'Kraken', price: 67780, volume24h: '$19.8B', change24h: 2.1, lastUpdate: '5s ago', spread: 0.09, orderBookDepth: '$1.4M' }
    ],
    ETH: [
      { exchange: 'Binance', price: 3845, volume24h: '$28.4B', change24h: 1.8, lastUpdate: '3s ago', spread: 0.04, orderBookDepth: '$1.8M' },
      { exchange: 'Coinbase', price: 3820, volume24h: '$24.1B', change24h: 1.6, lastUpdate: '2s ago', spread: 0.07, orderBookDepth: '$1.5M' },
      { exchange: 'KuCoin', price: 3856, volume24h: '$16.2B', change24h: 1.9, lastUpdate: '4s ago', spread: 0.09, orderBookDepth: '$1.2M' },
      { exchange: 'OKX', price: 3865, volume24h: '$22.7B', change24h: 2.0, lastUpdate: '3s ago', spread: 0.05, orderBookDepth: '$1.6M' },
      { exchange: 'Kraken', price: 3838, volume24h: '$12.9B', change24h: 1.7, lastUpdate: '6s ago', spread: 0.08, orderBookDepth: '$1.1M' }
    ],
    SOL: [
      { exchange: 'Binance', price: 178.9, volume24h: '$8.2B', change24h: -0.7, lastUpdate: '4s ago', spread: 0.06, orderBookDepth: '$680K' },
      { exchange: 'Coinbase', price: 179.2, volume24h: '$6.1B', change24h: -0.5, lastUpdate: '5s ago', spread: 0.09, orderBookDepth: '$520K' },
      { exchange: 'KuCoin', price: 177.8, volume24h: '$4.8B', change24h: -0.9, lastUpdate: '7s ago', spread: 0.11, orderBookDepth: '$410K' },
      { exchange: 'OKX', price: 178.4, volume24h: '$5.9B', change24h: -0.6, lastUpdate: '6s ago', spread: 0.08, orderBookDepth: '$580K' },
      { exchange: 'Kraken', price: 176.2, volume24h: '$3.2B', change24h: -1.2, lastUpdate: '8s ago', spread: 0.12, orderBookDepth: '$340K' }
    ]
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const sortedOpportunities = [...arbitrageData].sort((a, b) => {
    switch (sortBy) {
      case 'spread':
        return b.spread - a.spread;
      case 'profit':
        return parseFloat(b.netProfit.replace('$', '')) - parseFloat(a.netProfit.replace('$', ''));
      case 'confidence':
        return b.confidence - a.confidence;
      case 'risk':
        const riskOrder = { 'Low': 3, 'Medium': 2, 'High': 1 };
        return riskOrder[b.risk] - riskOrder[a.risk];
      default:
        return 0;
    }
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'High': return 'text-red-500 bg-red-500/20 border-red-500/30';
      default: return '';
    }
  };

  const selectedRates = exchangeRates[selectedCoin] || [];
  const maxPrice = Math.max(...selectedRates.map(r => r.price));
  const minPrice = Math.min(...selectedRates.map(r => r.price));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ⚡ Arbitrage Trading Hub
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time arbitrage opportunities and exchange rate analysis
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className="flex items-center space-x-3 mb-2">
              <Target className="text-green-500" size={24} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Active Opportunities
              </h3>
            </div>
            <div className="text-3xl font-bold text-green-500">{arbitrageData.length}</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Profitable trades available
            </p>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="text-blue-500" size={24} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Avg. Spread
              </h3>
            </div>
            <div className="text-3xl font-bold text-blue-500">
              {(arbitrageData.reduce((sum, op) => sum + op.spread, 0) / arbitrageData.length).toFixed(2)}%
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Across all pairs
            </p>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className="flex items-center space-x-3 mb-2">
              <DollarSign className="text-purple-500" size={24} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Total Volume
              </h3>
            </div>
            <div className="text-3xl font-bold text-purple-500">$21.0M</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              24h arbitrage volume
            </p>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="text-orange-500" size={24} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Avg. Execution
              </h3>
            </div>
            <div className="text-3xl font-bold text-orange-500">4.2 min</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Average completion time
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Arbitrage Opportunities */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                🔥 Live Arbitrage Opportunities
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="spread">Sort by Spread</option>
                <option value="profit">Sort by Profit</option>
                <option value="confidence">Sort by Confidence</option>
                <option value="risk">Sort by Risk</option>
              </select>
            </div>

            <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-700/60' 
                : 'bg-white/90 border-gray-200/60'
            }`}>
              {/* Header */}
              <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold items-center">
                  <div className={`col-span-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Asset</div>
                  <div className={`col-span-2 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Route</div>
                  <div className={`col-span-2 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Prices</div>
                  <div className={`col-span-1 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Spread</div>
                  <div className={`col-span-2 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Risk/Confidence</div>
                  <div className={`col-span-2 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Profit</div>
                </div>
              </div>

              {/* Data Rows */}
              <div className={`divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
                {sortedOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className={`px-6 py-5 hover:bg-gray-500/5 transition-colors`}>
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Asset */}
                      <div className="col-span-3 flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {opportunity.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {opportunity.symbol}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {opportunity.name}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Vol: {opportunity.volume}
                          </div>
                        </div>
                      </div>

                      {/* Route */}
                      <div className="col-span-2 text-center">
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {opportunity.buyExchange}
                        </div>
                        <div className="text-xs text-gray-500 my-1">↓</div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {opportunity.sellExchange}
                        </div>
                      </div>

                      {/* Prices */}
                      <div className="col-span-2 text-center">
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <div className="text-xs">Buy:</div>
                          <div className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            ${opportunity.buyPrice.toLocaleString()}
                          </div>
                          <div className="text-xs mt-1">Sell:</div>
                          <div className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            ${opportunity.sellPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Spread */}
                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="flex items-center space-x-1 justify-center">
                              <TrendingUp size={14} className="text-green-500" />
                              <span className="text-green-500 font-semibold text-sm">
                                {opportunity.spread}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Risk/Confidence */}
                      <div className="col-span-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border mb-2 inline-block ${getRiskColor(opportunity.risk)}`}>
                          {opportunity.risk} Risk
                        </span>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {opportunity.confidence}% confidence
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {opportunity.timeToExecute}
                        </div>
                      </div>

                      {/* Profit */}
                      <div className="col-span-2 text-right">
                        <div className={`font-bold text-green-500 text-lg mb-1`}>
                          {opportunity.profit}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          Net: <span className="font-medium">{opportunity.netProfit}</span>
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Fees: {opportunity.fees}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exchange Rates */}
          <div className="xl:col-span-1">
            <div className="mb-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                📊 Exchange Rates
              </h2>
              <div className="flex space-x-2">
                {['BTC', 'ETH', 'SOL'].map((coin) => (
                  <button
                    key={coin}
                    onClick={() => setSelectedCoin(coin)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCoin === coin
                        ? 'bg-blue-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {coin}
                  </button>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-700/60' 
                : 'bg-white/90 border-gray-200/60'
            }`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCoin} Prices
                </h3>
              </div>

              <div className="space-y-0">
                {selectedRates.map((rate, index) => (
                  <div key={index} className={`px-4 py-4 border-b last:border-b-0 ${isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {rate.exchange}
                      </div>
                      <div className="flex items-center space-x-2">
                        {rate.price === maxPrice && (
                          <span className="text-xs text-red-500 font-medium">HIGHEST</span>
                        )}
                        {rate.price === minPrice && (
                          <span className="text-xs text-green-500 font-medium">LOWEST</span>
                        )}
                      </div>
                    </div>
                    
                    <div className={`text-lg font-bold mb-1 ${
                      rate.price === maxPrice ? 'text-red-500' : 
                      rate.price === minPrice ? 'text-green-500' : 
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${rate.price.toLocaleString()}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        24h Vol: {rate.volume24h}
                      </div>
                      <div className={`${rate.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
                      </div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Spread: {rate.spread}%
                      </div>
                      <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Depth: {rate.orderBookDepth}
                      </div>
                    </div>
                    
                    <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Updated: {rate.lastUpdate}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`mt-6 rounded-xl border backdrop-blur-sm p-4 ${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-700/60' 
                : 'bg-white/90 border-gray-200/60'
            }`}>
              <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 hover:bg-gray-700/50 text-gray-300' 
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}>
                  Set Price Alerts
                </button>
                <button className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 hover:bg-gray-700/50 text-gray-300' 
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}>
                  Export Data
                </button>
                <button className={`w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors`}>
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ArbitragePage;