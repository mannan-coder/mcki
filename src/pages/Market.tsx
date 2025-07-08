import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Star, Volume2, Clock, BarChart3, Eye, Plus, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import CryptoTable from '@/components/CryptoTable';
import { useCryptoData } from '@/hooks/useCryptoData';

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
  const { data: cryptoData, loading, error, refetch } = useCryptoData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const categories = [
    'All', 'DeFi', 'Layer 1', 'Layer 2', 'Gaming', 'NFT', 'Meme', 'AI', 'RWA', 'Privacy'
  ];

  const toggleFavorite = (coinId: string) => {
    setFavorites(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  const filteredCoins = cryptoData?.coins?.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All'; // For now, show all as we don't have category data
    const matchesFavorites = !showOnlyFavorites || favorites.includes(coin.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  }) || [];

  // Don't show loading state, just render empty until data loads

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading market data: {error}</p>
            <button 
              onClick={refetch}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

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
            <div className="text-lg font-bold text-foreground">
              ${cryptoData ? (cryptoData.totalMarketCap / 1e12).toFixed(2) + 'T' : 'Loading...'}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">24h Volume</div>
            <div className="text-lg font-bold text-foreground">
              ${cryptoData ? (cryptoData.totalVolume / 1e9).toFixed(1) + 'B' : 'Loading...'}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">BTC Dominance</div>
            <div className="text-lg font-bold text-primary">
              {cryptoData ? cryptoData.btcDominance.toFixed(1) + '%' : 'Loading...'}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">Active Coins</div>
            <div className="text-lg font-bold text-accent">
              {cryptoData ? cryptoData.activeCryptocurrencies.toLocaleString() : 'Loading...'}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">Exchanges</div>
            <div className="text-lg font-bold text-success">
              {cryptoData ? cryptoData.markets.toLocaleString() : 'Loading...'}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm">
            <div className="text-xs text-muted-foreground mb-1">Last Updated</div>
            <div className="text-lg font-bold text-warning">
              {cryptoData ? new Date(cryptoData.lastUpdated).toLocaleTimeString() : 'Loading...'}
            </div>
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

        {/* Live Crypto Table */}
        <CryptoTable 
          coins={filteredCoins} 
          isDarkMode={false} // You can pass theme state here
          onCoinClick={(coinId) => {
            // Handle coin click - could navigate to coin detail page
            console.log('Clicked coin:', coinId);
          }}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {filteredCoins.length} of {cryptoData?.coins?.length || 0} coins
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={refetch}
              className="flex items-center space-x-2 px-3 py-1 rounded border border-border hover:bg-muted text-foreground transition-colors"
            >
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>
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
      </div>
    </Layout>
  );
};

export default MarketPage;