import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, ExternalLink, BarChart3, Clock, DollarSign, Target, Zap, Activity, Users, Layers, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import { getCoinLogoById } from '@/utils/coinLogos';


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
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [sortBy, setSortBy] = useState('spread');
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedCoinForChart, setSelectedCoinForChart] = useState<string | null>(null);
  
  const { data: arbitrageData, loading, error, refetch } = useArbitrageData();

  // Use live data from the API
  const opportunities = arbitrageData?.arbitrageOpportunities || [];
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const exchangeRates: { [key: string]: ExchangeRate[] } = {
    BTC: [
      { exchange: 'Binance', price: 67890, volume24h: '$45.2B', change24h: 2.4, lastUpdate: '2s ago', spread: 0.05, orderBookDepth: '$2.8M' },
      { exchange: 'Coinbase', price: 67825, volume24h: '$32.1B', change24h: 2.2, lastUpdate: '3s ago', spread: 0.08, orderBookDepth: '$2.1M' },
      { exchange: 'KuCoin', price: 67150, volume24h: '$28.7B', change24h: 1.8, lastUpdate: '2s ago', spread: 0.12, orderBookDepth: '$1.9M' },
      { exchange: 'OKX', price: 67945, volume24h: '$41.3B', change24h: 2.6, lastUpdate: '4s ago', spread: 0.06, orderBookDepth: '$2.5M' },
      { exchange: 'Kraken', price: 67780, volume24h: '$19.8B', change24h: 2.1, lastUpdate: '5s ago', spread: 0.09, orderBookDepth: '$1.4M' },
      { exchange: 'Huobi', price: 67675, volume24h: '$15.2B', change24h: 1.9, lastUpdate: '6s ago', spread: 0.11, orderBookDepth: '$1.1M' },
      { exchange: 'Bitfinex', price: 67920, volume24h: '$12.8B', change24h: 2.3, lastUpdate: '4s ago', spread: 0.07, orderBookDepth: '$980K' }
    ],
    ETH: [
      { exchange: 'Binance', price: 3845, volume24h: '$28.4B', change24h: 1.8, lastUpdate: '3s ago', spread: 0.04, orderBookDepth: '$1.8M' },
      { exchange: 'Coinbase', price: 3820, volume24h: '$24.1B', change24h: 1.6, lastUpdate: '2s ago', spread: 0.07, orderBookDepth: '$1.5M' },
      { exchange: 'KuCoin', price: 3856, volume24h: '$16.2B', change24h: 1.9, lastUpdate: '4s ago', spread: 0.09, orderBookDepth: '$1.2M' },
      { exchange: 'OKX', price: 3865, volume24h: '$22.7B', change24h: 2.0, lastUpdate: '3s ago', spread: 0.05, orderBookDepth: '$1.6M' },
      { exchange: 'Kraken', price: 3838, volume24h: '$12.9B', change24h: 1.7, lastUpdate: '6s ago', spread: 0.08, orderBookDepth: '$1.1M' },
      { exchange: 'Huobi', price: 3842, volume24h: '$9.4B', change24h: 1.8, lastUpdate: '5s ago', spread: 0.06, orderBookDepth: '$890K' },
      { exchange: 'Bitfinex', price: 3851, volume24h: '$7.2B', change24h: 1.9, lastUpdate: '7s ago', spread: 0.08, orderBookDepth: '$720K' }
    ],
    SOL: [
      { exchange: 'Binance', price: 178.9, volume24h: '$8.2B', change24h: -0.7, lastUpdate: '4s ago', spread: 0.06, orderBookDepth: '$680K' },
      { exchange: 'Coinbase', price: 179.2, volume24h: '$6.1B', change24h: -0.5, lastUpdate: '5s ago', spread: 0.09, orderBookDepth: '$520K' },
      { exchange: 'KuCoin', price: 177.8, volume24h: '$4.8B', change24h: -0.9, lastUpdate: '7s ago', spread: 0.11, orderBookDepth: '$410K' },
      { exchange: 'OKX', price: 178.4, volume24h: '$5.9B', change24h: -0.6, lastUpdate: '6s ago', spread: 0.08, orderBookDepth: '$580K' },
      { exchange: 'Kraken', price: 176.2, volume24h: '$3.2B', change24h: -1.2, lastUpdate: '8s ago', spread: 0.12, orderBookDepth: '$340K' },
      { exchange: 'Huobi', price: 177.5, volume24h: '$2.8B', change24h: -0.8, lastUpdate: '9s ago', spread: 0.10, orderBookDepth: '$290K' },
      { exchange: 'Bybit', price: 176.8, volume24h: '$3.5B', change24h: -1.0, lastUpdate: '7s ago', spread: 0.11, orderBookDepth: '$310K' }
    ]
  };

  const generateChartData = (coin: string) => {
    const basePrice = exchangeRates[coin]?.[0]?.price || 100;
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      price: basePrice + (Math.random() - 0.5) * basePrice * 0.05,
      volume: Math.random() * 1000000,
      spread: Math.random() * 3
    }));
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

  const getCoinSymbolFromPair = (pair: string) => {
    const symbol = pair?.split('/')[0] || '';
    // Map common symbols to their CoinGecko IDs
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

  const handleViewDetails = (coin: string) => {
    setSelectedCoinForChart(coin);
    setShowChartModal(true);
  };

  const handleRefresh = async () => {
    await refetch();
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

  const selectedRates = exchangeRates[selectedCoin] || [];
  const maxPrice = Math.max(...selectedRates.map(r => r.price));
  const minPrice = Math.min(...selectedRates.map(r => r.price));

  if (loading && !arbitrageData) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-20 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </main>
      </div>
    );
  }

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
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
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
            <div className="text-3xl font-bold text-green-500">{stats.totalOpportunities}</div>
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
            <div className="text-3xl font-bold text-blue-500">{stats.avgSpread?.toFixed(2) || 0}%</div>
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
            <div className="text-3xl font-bold text-purple-500">${((stats.estimatedDailyVolume || 0) / 1000).toFixed(1)}B</div>
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
                Best Spread
              </h3>
            </div>
            <div className="text-3xl font-bold text-orange-500">{opportunities.length > 0 ? Math.max(...opportunities.map(o => o.spread)).toFixed(2) : 0}%</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Highest profit potential
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
                  <div className={`col-span-2 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Volume</div>
                  <div className={`col-span-1 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time</div>
                  <div className={`col-span-1 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Profit</div>
                </div>
              </div>

              {/* Data Rows */}
              <div className={`divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
                {sortedOpportunities.map((opportunity, index) => (
                  <div key={index} className={`px-6 py-5 hover:bg-gray-500/5 transition-colors`}>
                    <div className="grid grid-cols-12 gap-4 items-center">
                       {/* Asset */}
                       <div className="col-span-3 flex items-center space-x-3">
                         <img 
                           src={getCoinLogoById(getCoinSymbolFromPair(opportunity.pair || ''))} 
                           alt={opportunity.pair?.split('/')[0] || ''}
                           className="w-10 h-10 rounded-full"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.src = `https://via.placeholder.com/40x40/666666/ffffff?text=${(opportunity.pair?.split('/')[0] || 'C').charAt(0)}`;
                           }}
                         />
                         <div>
                           <div className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                             {opportunity.pair?.split('/')[0] || 'Unknown'}
                           </div>
                           <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                             {opportunity.pair || 'N/A'}
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
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border mt-1 inline-block ${getRiskColor(opportunity.spread)}`}>
                              {opportunity.spread > 1.5 ? 'Low' : opportunity.spread > 0.8 ? 'Med' : 'High'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Volume */}
                      <div className="col-span-2 text-center">
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          ${(opportunity.volume24h / 1000000).toFixed(1)}M
                        </div>
                      </div>

                       {/* Time */}
                       <div className="col-span-1 text-center">
                         <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                           {getTimeAgo(opportunity.lastUpdated)}
                         </div>
                       </div>

                      {/* Profit */}
                      <div className="col-span-1 text-center">
                        <div className={`font-bold text-green-500 text-sm`}>
                          {opportunity.profitPotential.toFixed(2)}%
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
              <div className="flex flex-wrap gap-2">
                {['BTC', 'ETH', 'SOL'].map((coin) => (
                  <button
                    key={coin}
                    onClick={() => setSelectedCoin(coin)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
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
                  {selectedCoin} Exchange Prices
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-50/90'}`}>
                    <tr className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                      <th className={`px-3 py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Exchange
                      </th>
                      <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Price
                      </th>
                      <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        24h Change
                      </th>
                      <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Volume
                      </th>
                      <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Spread
                      </th>
                      <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
                    {selectedRates.map((rate, index) => (
                      <tr key={index} className={`hover:bg-gray-500/5 transition-colors ${isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'}`}>
                        <td className="px-3 py-3">
                          <div className="flex items-center space-x-2">
                            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {rate.exchange}
                            </div>
                            <div className="flex items-center space-x-1">
                              {rate.price === maxPrice && (
                                <span className="text-xs text-red-500 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">HIGH</span>
                              )}
                              {rate.price === minPrice && (
                                <span className="text-xs text-green-500 font-medium bg-green-500/10 px-1.5 py-0.5 rounded">LOW</span>
                              )}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-3 py-3 text-right">
                          <div className={`text-sm font-bold ${
                            rate.price === maxPrice ? 'text-red-500' : 
                            rate.price === minPrice ? 'text-green-500' : 
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${rate.price.toLocaleString()}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Depth: {rate.orderBookDepth}
                          </div>
                        </td>
                        
                        <td className="px-3 py-3 text-right">
                          <div className={`text-sm font-medium ${rate.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
                          </div>
                        </td>
                        
                        <td className="px-3 py-3 text-right">
                          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {rate.volume24h}
                          </div>
                        </td>
                        
                        <td className="px-3 py-3 text-right">
                          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {rate.spread}%
                          </div>
                        </td>
                        
                        <td className="px-3 py-3 text-center">
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {rate.lastUpdate}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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