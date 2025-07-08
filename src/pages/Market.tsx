import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Star, Volume2, Clock, BarChart3, Eye, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
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
    // Additional coin data would go here...
  ];

  const toggleFavorite = (coinId: string) => {
    setFavorites(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  const filteredCoins = coinData.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || coin.category === selectedCategory;
    const matchesFavorites = !showOnlyFavorites || favorites.includes(coin.id);
    return matchesSearch && matchesCategory && matchesFavorites;
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
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              🏪 Cryptocurrency Market
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time cryptocurrency prices, market caps, and trading data
            </p>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
            <div className="text-lg font-bold text-foreground">{marketStats.totalMarketCap}</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">24h Volume</div>
            <div className="text-lg font-bold text-foreground">{marketStats.totalVolume}</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">BTC Dominance</div>
            <div className="text-lg font-bold text-primary">{marketStats.btcDominance}</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">Active Coins</div>
            <div className="text-lg font-bold text-accent">{marketStats.activeCoins}</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">Exchanges</div>
            <div className="text-lg font-bold text-success">{marketStats.totalExchanges}</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">DeFi TVL</div>
            <div className="text-lg font-bold text-warning">{marketStats.defiTvl}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search coins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground"
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
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-muted'
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
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              <Star size={16} />
              <span className="text-sm">Favorites</span>
            </button>
          </div>
        </div>

        {/* Market Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-border bg-muted/50">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold items-center text-muted-foreground">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-1 text-right">24h %</div>
              <div className="col-span-2 text-right">24h Volume</div>
              <div className="col-span-2 text-right">Market Cap</div>
              <div className="col-span-1 text-center">Chart</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {filteredCoins.map((coin) => (
              <div key={coin.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Rank */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(coin.id)}
                        className={`${favorites.includes(coin.id) ? 'text-warning' : 'text-muted-foreground'} hover:text-warning transition-colors`}
                      >
                        <Star size={16} fill={favorites.includes(coin.id) ? 'currentColor' : 'none'} />
                      </button>
                      <span className="text-sm text-muted-foreground">
                        {coin.rank}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="col-span-3 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-muted text-muted-foreground">
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right">
                    <div className="font-semibold text-foreground">
                      ${coin.price < 1 ? coin.price.toFixed(6) : coin.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      H: ${coin.high24h.toLocaleString()} L: ${coin.low24h.toLocaleString()}
                    </div>
                  </div>

                  {/* 24h Change */}
                  <div className="col-span-1 text-right">
                    <div className={`font-semibold flex items-center justify-end space-x-1 ${
                      coin.change24h >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {coin.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span>{coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="col-span-2 text-right">
                    <div className="font-semibold text-foreground">
                      {coin.volume24h}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {coin.lastUpdated}
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="col-span-2 text-right">
                    <div className="font-semibold text-foreground">
                      {coin.marketCap}
                    </div>
                    <div className="text-xs text-muted-foreground">
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
                            stroke={coin.change24h >= 0 ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} 
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
          <div className="text-sm text-muted-foreground">
            Showing {filteredCoins.length} of {coinData.length} coins
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded border border-border hover:bg-muted text-foreground transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1 rounded border border-border hover:bg-muted text-foreground transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketPage;