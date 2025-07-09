import { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { DataTable } from '@/components/common/DataTable';
import { motion } from 'framer-motion';

const MarketPage = () => {
  const { data: cryptoData, isLoading, refetch } = useOptimizedCryptoData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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

  const marketStats = [
    {
      label: 'Market Cap',
      value: cryptoData ? `$${(cryptoData.totalMarketCap / 1e12).toFixed(2)}T` : 'Loading...',
      change: '+2.4%',
      trend: 'up' as const,
      icon: <span>💰</span>
    },
    {
      label: '24h Volume',
      value: cryptoData ? `$${(cryptoData.totalVolume / 1e9).toFixed(1)}B` : 'Loading...',
      change: '+8.1%',
      trend: 'up' as const,
      icon: <span>📊</span>
    },
    {
      label: 'BTC Dominance',
      value: cryptoData ? `${cryptoData.btcDominance.toFixed(1)}%` : 'Loading...',
      change: '-0.5%',
      trend: 'down' as const,
      icon: <span>₿</span>
    },
    {
      label: 'Active Coins',
      value: cryptoData ? cryptoData.activeCryptocurrencies.toLocaleString() : 'Loading...',
      change: '+1.2%',
      trend: 'up' as const,
      icon: <span>🪙</span>
    }
  ];

  const formatCoinData = () => {
    return filteredCoins.map(coin => ({
      rank: coin.rank,
      name: coin.name,
      symbol: coin.symbol,
      price: `$${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
      change24h: `${coin.change24h > 0 ? '+' : ''}${coin.change24h.toFixed(2)}%`,
      marketCap: `$${(coin.marketCap / 1e9).toFixed(2)}B`,
      volume: `$${(coin.volume / 1e9).toFixed(2)}B`,
      image: coin.image,
      id: coin.id
    }));
  };

  const coinColumns = [
    { key: 'rank', header: '#', sortable: true },
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3">
          <img 
            src={row.image} 
            alt={value}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div>
            <div className="font-semibold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{row.symbol}</div>
          </div>
        </div>
      )
    },
    { key: 'price', header: 'Price', sortable: true },
    { 
      key: 'change24h', 
      header: '24h Change', 
      sortable: true,
      render: (value: string) => (
        <span className={`font-medium ${
          value.startsWith('+') ? 'text-success' : value.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'marketCap', header: 'Market Cap', sortable: true },
    { key: 'volume', header: '24h Volume', sortable: true }
  ];

  if (isLoading && !cryptoData) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
          <DataSection
            title="Cryptocurrency Market"
            subtitle="Real-time cryptocurrency prices, market caps, and trading data"
            icon={<span className="text-2xl">🏪</span>}
          >
            <div className="space-y-6">
              <StatsGrid stats={[]} loading={true} />
              
              <ResponsiveCard>
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded animate-pulse"></div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between p-4 border-b border-border/50 last:border-b-0">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </ResponsiveCard>
            </div>
          </DataSection>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        <DataSection
          title="Cryptocurrency Market"
          subtitle="Real-time cryptocurrency prices, market caps, and trading data"
          icon={<span className="text-2xl">🏪</span>}
          onRefresh={() => refetch()}
          isLoading={isLoading}
        >
          <div className="space-y-6">
            {/* Market Stats */}
            <StatsGrid stats={marketStats} />

            {/* Filters */}
            <ResponsiveCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Filters & Search</h3>
                
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      placeholder="Search coins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
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
                </div>
              </div>
            </ResponsiveCard>

            {/* Crypto Table */}
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Market Data</h3>
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredCoins.length} of {cryptoData?.coins?.length || 0} coins
                  </div>
                </div>
                
                <DataTable
                  data={formatCoinData()}
                  columns={coinColumns}
                  emptyMessage="No cryptocurrencies found"
                />
              </div>
            </ResponsiveCard>
          </div>
        </DataSection>
      </div>
    </Layout>
  );
};

export default MarketPage;