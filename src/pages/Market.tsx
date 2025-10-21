import { useState, useMemo } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { DataTable } from '@/components/common/PaginatedDataTable';
import { getCoinsByCategory } from '@/utils/coinCategories';
import { LiveSignals } from '@/components/market/LiveSignals';
import { MiniChart } from '@/components/market/MiniChart';
import { MarketSignalCards } from '@/components/market/MarketSignalCards';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import LazyAdBanner from '@/components/ads/LazyAdBanner';

const MarketPage = () => {
  const { data: cryptoData, isLoading, refetch, isRealTime, lastUpdateTime } = useOptimizedCryptoData(100, false); // Reduced limit and disabled notifications for performance
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'}>({ key: 'rank', direction: 'asc' });
  
  const ITEMS_PER_PAGE = 100; // Show 100 coins per page for optimal performance

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
    const matchesFavorites = !showOnlyFavorites || favorites.includes(coin.id);
    return matchesSearch && matchesFavorites;
  }) || [];

  // Apply category filter after basic filtering
  const categoryFilteredCoins = getCoinsByCategory(filteredCoins, selectedCategory);

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

  // Sorting and pagination logic
  const sortedAndPaginatedData = useMemo(() => {
    let sortedCoins = [...categoryFilteredCoins];
    
    // Sort data
    if (sortConfig.key) {
      sortedCoins.sort((a, b) => {
        let aVal, bVal;
        
        switch (sortConfig.key) {
          case 'rank':
            aVal = a.rank;
            bVal = b.rank;
            break;
          case 'name':
            aVal = a.name.toLowerCase();
            bVal = b.name.toLowerCase();
            break;
          case 'price':
            aVal = a.price;
            bVal = b.price;
            break;
          case 'change24h':
            aVal = a.change24h;
            bVal = b.change24h;
            break;
          case 'marketCap':
            aVal = a.marketCap;
            bVal = b.marketCap;
            break;
          case 'volume':
            aVal = a.volume;
            bVal = b.volume;
            break;
          default:
            return 0;
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Calculate pagination
    const totalItems = sortedCoins.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCoins = sortedCoins.slice(startIndex, endIndex);
    
    return {
      coins: paginatedCoins,
      totalItems,
      totalPages
    };
  }, [categoryFilteredCoins, sortConfig, currentPage, ITEMS_PER_PAGE]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCoinData = (coins: any[]) => {
    return coins.map((coin, index) => ({
      rank: coin.rank,
      name: coin.name,
      symbol: coin.symbol,
      price: `$${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
      change24h: `${coin.change24h > 0 ? '+' : ''}${coin.change24h.toFixed(2)}%`,
      marketCap: `$${(coin.marketCap / 1e9).toFixed(2)}B`,
      volume: `$${(coin.volume / 1e9).toFixed(2)}B`,
      signals: coin, // Pass the full coin object for signals
      chart: coin, // Pass the full coin object for chart
      image: coin.image,
      id: coin.id,
      // Raw values for sorting
      _price: coin.price,
      _change24h: coin.change24h,
      _marketCap: coin.marketCap,
      _volume: coin.volume
    }));
  };

  const coinColumns = [
    { key: 'rank', header: '#', sortable: true },
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors" 
             onClick={() => window.location.href = `/coin/${row.id}`}>
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
    {
      key: 'chart',
      header: 'Chart (7d)',
      sortable: false,
      render: (coin: any) => (
        <MiniChart 
          sparkline={coin.sparkline} 
          priceChangePercentage24h={coin.change24h}
        />
      )
    },
    {
      key: 'signals',
      header: 'Live Signals',
      sortable: false,
      render: (coin: any) => (
        <LiveSignals 
          key={`${coin.id}-${coin.change24h}-${Date.now()}`} // Force re-render on data change
          coin={{
            priceChangePercentage24h: coin.change24h,
            priceChangePercentage7d: coin.change7d,
            priceChangePercentage1h: coin.change1h || 0,
            volume: coin.volume,
            marketCap: coin.marketCap,
            high24h: coin.high24h,
            low24h: coin.low24h,
            price: coin.price,
            athChangePercentage: coin.athChangePercentage,
            sparkline: coin.sparkline
          }}
        />
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
          subtitle={
            <div className="flex items-center gap-4">
              <span>Real-time cryptocurrency prices, market caps, and trading data</span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isRealTime 
                  ? 'bg-success/20 text-success border border-success/30 shadow-sm' 
                  : 'bg-muted/50 text-muted-foreground border border-border'
              }`}>
                <div className={`w-2 h-2 rounded-full transition-all ${
                  isRealTime ? 'bg-success animate-pulse shadow-lg shadow-success/50' : 'bg-muted-foreground'
                }`} />
                {isRealTime ? 'Live' : 'Offline'}
                {lastUpdateTime && (
                  <span className="ml-1 font-mono text-xs">
                    • Updated {new Date(lastUpdateTime).toLocaleTimeString()}
                  </span>
                )}
              </div>
              {isLoading && (
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full animate-spin"></div>
                  Updating...
                </div>
              )}
            </div>
          }
          icon={<span className="text-2xl">🏪</span>}
          onRefresh={() => refetch()}
          isLoading={isLoading}
        >
          <div className="space-y-6">
            {/* Market Stats */}
            <StatsGrid stats={marketStats} />

            {/* Market Signal Cards */}
            <MarketSignalCards coins={categoryFilteredCoins} />

            {/* Strategic Ad Placement - After Market Signals (High engagement) */}
            <LazyAdBanner className="my-6" />

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
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page when searching
                      }}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const categoryCount = getCoinsByCategory(filteredCoins, category).length;
                      return (
                        <motion.button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1); // Reset to first page when changing category
                          }}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedCategory === category
                              ? 'bg-primary text-primary-foreground shadow-md'
                              : 'bg-secondary text-secondary-foreground hover:bg-muted border border-border'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {category} {category !== 'All' && `(${categoryCount})`}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ResponsiveCard>

            {/* Crypto Table */}
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Market Data</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedAndPaginatedData.totalItems)} of {sortedAndPaginatedData.totalItems} coins
                      {selectedCategory !== 'All' && (
                        <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {selectedCategory}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isLoading}
                        className="h-8 px-3 text-xs"
                      >
                        <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                      {cryptoData?.lastUpdated && (
                        <div className="text-xs text-muted-foreground">
                          Data: {new Date(cryptoData.lastUpdated).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <DataTable
                  data={formatCoinData(sortedAndPaginatedData.coins)}
                  columns={coinColumns}
                  emptyMessage="No cryptocurrencies found"
                  pagination={{
                    currentPage,
                    totalPages: sortedAndPaginatedData.totalPages,
                    pageSize: ITEMS_PER_PAGE,
                    totalItems: sortedAndPaginatedData.totalItems,
                    onPageChange: handlePageChange
                  }}
                  sorting={{
                    key: sortConfig.key,
                    direction: sortConfig.direction,
                    onSort: handleSort
                  }}
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