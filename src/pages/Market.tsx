import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Star, Volume2, Clock, BarChart3, Eye, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  high24h: number;
  low24h: number;
  sparklineData: number[];
  category: string;
  rank: number;
  isFavorite: boolean;
  ath: number;
  athChangePercentage: number;
  circulatingSupply: string;
  totalSupply: string;
  lastUpdated: string;
}

const MarketPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const categories = [
    'All', 'DeFi', 'Layer 1', 'Layer 2', 'Gaming', 'NFT', 'Meme', 'AI', 'RWA', 'Privacy'
  ];

  const generateSparklineData = () => {
    return Array.from({ length: 24 }, () => Math.random() * 100 + 50);
  };

  const coinData: CoinData[] = [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 67890,
      change24h: 2.4,
      volume24h: '$28.5B',
      marketCap: '$1.34T',
      high24h: 68420,
      low24h: 66180,
      sparklineData: generateSparklineData(),
      category: 'Layer 1',
      rank: 1,
      isFavorite: false,
      ath: 73750,
      athChangePercentage: -7.9,
      circulatingSupply: '19.7M BTC',
      totalSupply: '21M BTC',
      lastUpdated: '2 minutes ago'
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3845,
      change24h: 1.8,
      volume24h: '$15.2B',
      marketCap: '$462.1B',
      high24h: 3892,
      low24h: 3756,
      sparklineData: generateSparklineData(),
      category: 'Layer 1',
      rank: 2,
      isFavorite: false,
      ath: 4878,
      athChangePercentage: -21.2,
      circulatingSupply: '120.3M ETH',
      totalSupply: '120.3M ETH',
      lastUpdated: '1 minute ago'
    },
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      price: 178.9,
      change24h: -0.7,
      volume24h: '$3.8B',
      marketCap: '$84.2B',
      high24h: 182.5,
      low24h: 175.2,
      sparklineData: generateSparklineData(),
      category: 'Layer 1',
      rank: 3,
      isFavorite: false,
      ath: 259.96,
      athChangePercentage: -31.2,
      circulatingSupply: '470.8M SOL',
      totalSupply: '588.6M SOL',
      lastUpdated: '3 minutes ago'
    },
    {
      id: 'uniswap',
      symbol: 'UNI',
      name: 'Uniswap',
      price: 12.84,
      change24h: 3.2,
      volume24h: '$485M',
      marketCap: '$9.7B',
      high24h: 13.12,
      low24h: 12.45,
      sparklineData: generateSparklineData(),
      category: 'DeFi',
      rank: 15,
      isFavorite: false,
      ath: 44.97,
      athChangePercentage: -71.4,
      circulatingSupply: '755.7M UNI',
      totalSupply: '1B UNI',
      lastUpdated: '2 minutes ago'
    },
    {
      id: 'chainlink',
      symbol: 'LINK',
      name: 'Chainlink',
      price: 14.28,
      change24h: -0.3,
      volume24h: '$892M',
      marketCap: '$8.4B',
      high24h: 14.65,
      low24h: 14.12,
      sparklineData: generateSparklineData(),
      category: 'DeFi',
      rank: 16,
      isFavorite: false,
      ath: 52.7,
      athChangePercentage: -72.9,
      circulatingSupply: '588.1M LINK',
      totalSupply: '1B LINK',
      lastUpdated: '4 minutes ago'
    },
    {
      id: 'polygon',
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.865,
      change24h: 1.96,
      volume24h: '$324M',
      marketCap: '$8.5B',
      high24h: 0.882,
      low24h: 0.841,
      sparklineData: generateSparklineData(),
      category: 'Layer 2',
      rank: 14,
      isFavorite: false,
      ath: 2.92,
      athChangePercentage: -70.4,
      circulatingSupply: '9.32B MATIC',
      totalSupply: '10B MATIC',
      lastUpdated: '1 minute ago'
    },
    {
      id: 'shiba-inu',
      symbol: 'SHIB',
      name: 'Shiba Inu',
      price: 0.000025,
      change24h: 5.8,
      volume24h: '$1.2B',
      marketCap: '$14.7B',
      high24h: 0.000026,
      low24h: 0.000023,
      sparklineData: generateSparklineData(),
      category: 'Meme',
      rank: 11,
      isFavorite: false,
      ath: 0.000088,
      athChangePercentage: -71.6,
      circulatingSupply: '589.3T SHIB',
      totalSupply: '999.98T SHIB',
      lastUpdated: '2 minutes ago'
    },
    {
      id: 'avalanche',
      symbol: 'AVAX',
      name: 'Avalanche',
      price: 42.15,
      change24h: 2.68,
      volume24h: '$756M',
      marketCap: '$16.8B',
      high24h: 43.28,
      low24h: 41.02,
      sparklineData: generateSparklineData(),
      category: 'Layer 1',
      rank: 9,
      isFavorite: false,
      ath: 146.22,
      athChangePercentage: -71.2,
      circulatingSupply: '398.5M AVAX',
      totalSupply: '720M AVAX',
      lastUpdated: '3 minutes ago'
    },
    {
      id: 'immutable',
      symbol: 'IMX',
      name: 'Immutable',
      price: 1.67,
      change24h: 8.4,
      volume24h: '$89M',
      marketCap: '$2.7B',
      high24h: 1.72,
      low24h: 1.52,
      sparklineData: generateSparklineData(),
      category: 'Gaming',
      rank: 45,
      isFavorite: false,
      ath: 9.52,
      athChangePercentage: -82.5,
      circulatingSupply: '1.61B IMX',
      totalSupply: '2B IMX',
      lastUpdated: '5 minutes ago'
    },
    {
      id: 'render',
      symbol: 'RNDR',
      name: 'Render',
      price: 7.89,
      change24h: 12.3,
      volume24h: '$156M',
      marketCap: '$4.1B',
      high24h: 8.12,
      low24h: 6.98,
      sparklineData: generateSparklineData(),
      category: 'AI',
      rank: 28,
      isFavorite: false,
      ath: 13.75,
      athChangePercentage: -42.6,
      circulatingSupply: '519.6M RNDR',
      totalSupply: '536.8M RNDR',
      lastUpdated: '1 minute ago'
    }
  ];

  const toggleFavorite = (coinId: string) => {
    setFavorites(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  const filteredCoins = coinData
    .filter(coin => {
      const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || coin.category === selectedCategory;
      const matchesFavorites = !showOnlyFavorites || favorites.includes(coin.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'change24h':
          aValue = a.change24h;
          bValue = b.change24h;
          break;
        case 'volume24h':
          aValue = parseFloat(a.volume24h.replace(/[$BM]/g, ''));
          bValue = parseFloat(b.volume24h.replace(/[$BM]/g, ''));
          break;
        case 'market_cap':
        default:
          aValue = parseFloat(a.marketCap.replace(/[$TBM]/g, ''));
          bValue = parseFloat(b.marketCap.replace(/[$TBM]/g, ''));
          break;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });

  const marketStats = {
    totalMarketCap: '$2.64T',
    totalVolume: '$89.2B',
    btcDominance: '50.8%',
    activeCoins: '2.8M',
    totalExchanges: '756',
    defiTvl: '$68.4B'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🏪 Cryptocurrency Market
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time cryptocurrency prices, market caps, and trading data
            </p>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              Market Cap
            </div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {marketStats.totalMarketCap}
            </div>
          </div>
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              24h Volume
            </div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {marketStats.totalVolume}
            </div>
          </div>
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              BTC Dominance
            </div>
            <div className={`text-lg font-bold text-orange-500`}>
              {marketStats.btcDominance}
            </div>
          </div>
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              Active Coins
            </div>
            <div className={`text-lg font-bold text-blue-500`}>
              {marketStats.activeCoins}
            </div>
          </div>
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              Exchanges
            </div>
            <div className={`text-lg font-bold text-purple-500`}>
              {marketStats.totalExchanges}
            </div>
          </div>
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/60' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              DeFi TVL
            </div>
            <div className={`text-lg font-bold text-green-500`}>
              {marketStats.defiTvl}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-xl border backdrop-blur-sm p-6 mb-8 ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} size={20} />
              <input
                type="text"
                placeholder="Search coins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                showOnlyFavorites
                  ? 'bg-yellow-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Star size={16} />
              <span className="text-sm">Favorites</span>
            </button>
          </div>
        </div>

        {/* Market Table */}
        <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          {/* Table Header */}
          <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold items-center">
              <div className={`col-span-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>#</div>
              <div className={`col-span-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</div>
              <div className={`col-span-2 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price</div>
              <div className={`col-span-1 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>24h %</div>
              <div className={`col-span-2 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>24h Volume</div>
              <div className={`col-span-2 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market Cap</div>
              <div className={`col-span-1 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Chart</div>
            </div>
          </div>

          {/* Table Body */}
          <div className={`divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
            {filteredCoins.map((coin) => (
              <div key={coin.id} className={`px-6 py-4 hover:bg-gray-500/5 transition-colors`}>
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Rank */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(coin.id)}
                        className={`${favorites.includes(coin.id) ? 'text-yellow-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-yellow-500 transition-colors`}
                      >
                        <Star size={16} fill={favorites.includes(coin.id) ? 'currentColor' : 'none'} />
                      </button>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {coin.rank}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="col-span-3 flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {coin.name}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {coin.symbol}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      coin.category === 'DeFi' ? 'bg-purple-500/20 text-purple-400' :
                      coin.category === 'Layer 1' ? 'bg-blue-500/20 text-blue-400' :
                      coin.category === 'Layer 2' ? 'bg-green-500/20 text-green-400' :
                      coin.category === 'Gaming' ? 'bg-orange-500/20 text-orange-400' :
                      coin.category === 'Meme' ? 'bg-pink-500/20 text-pink-400' :
                      coin.category === 'AI' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {coin.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${coin.price < 1 ? coin.price.toFixed(6) : coin.price.toLocaleString()}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      H: ${coin.high24h.toLocaleString()} L: ${coin.low24h.toLocaleString()}
                    </div>
                  </div>

                  {/* 24h Change */}
                  <div className="col-span-1 text-right">
                    <div className={`font-semibold flex items-center justify-end space-x-1 ${
                      coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {coin.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span>{coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="col-span-2 text-right">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {coin.volume24h}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {coin.lastUpdated}
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="col-span-2 text-right">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {coin.marketCap}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {coin.circulatingSupply}
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-20 h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={coin.sparklineData.map((value, index) => ({ value, index }))}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={coin.change24h >= 0 ? '#10b981' : '#ef4444'} 
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredCoins.length} of {coinData.length} coins
          </div>
          <div className="flex space-x-2">
            <button className={`px-3 py-1 rounded border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-blue-500 text-white">1</button>
            <button className={`px-3 py-1 rounded border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}>
              2
            </button>
            <button className={`px-3 py-1 rounded border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}>
              Next
            </button>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default MarketPage;