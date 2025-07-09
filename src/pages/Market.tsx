import React, { useState, useMemo, useCallback } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCoinsByCategory } from '@/utils/coinCategories';
import { ModernCryptoTable } from '@/components/market/ModernCryptoTable';
import { toast } from "sonner";

const MarketPage = () => {
  const { data: cryptoData, isLoading, refetch, isRealTime, lastUpdateTime } = useOptimizedCryptoData(250, true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'}>({ 
    key: 'rank', 
    direction: 'asc' 
  });
  
  const ITEMS_PER_PAGE = 100; // Optimized pagination

  const categories = [
    'All', 'DeFi', 'Layer 1', 'Layer 2', 'Gaming', 'NFT', 'Meme', 'AI'
  ];

  // Memoized filtering and search
  const filteredCoins = useMemo(() => {
    if (!cryptoData?.coins) return [];
    
    return cryptoData.coins.filter(coin => {
      const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [cryptoData?.coins, searchTerm]);

  const categoryFilteredCoins = useMemo(() => {
    return getCoinsByCategory(filteredCoins, selectedCategory);
  }, [filteredCoins, selectedCategory]);


  // Optimized sorting and pagination
  const sortedAndPaginatedData = useMemo(() => {
    let sortedCoins = [...categoryFilteredCoins];
    
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
    
    const totalItems = sortedCoins.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCoins = sortedCoins.slice(startIndex, endIndex);
    
    return {
      coins: paginatedCoins,
      totalItems,
      totalPages,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems)
    };
  }, [categoryFilteredCoins, sortConfig, currentPage, ITEMS_PER_PAGE]);

  // Optimized coin data formatting
  const formattedCoinData = useMemo(() => {
    return sortedAndPaginatedData.coins.map((coin) => ({
      rank: coin.rank,
      name: coin.name,
      symbol: coin.symbol,
      price: `$${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
      change24h: `${coin.change24h > 0 ? '+' : ''}${coin.change24h.toFixed(2)}%`,
      marketCap: `$${(coin.marketCap / 1e9).toFixed(2)}B`,
      volume: `$${(coin.volume / 1e9).toFixed(2)}B`,
      chart: coin,
      image: coin.image,
      id: coin.id,
      // Raw values for sorting and signals
      _price: coin.price,
      _change24h: coin.change24h,
      _marketCap: coin.marketCap,
      _volume: coin.volume,
      change1h: coin.change1h || 0,
      change7d: coin.change7d || 0,
      high24h: coin.high24h || coin.price,
      low24h: coin.low24h || coin.price,
      athChangePercentage: coin.athChangePercentage || -50,
      sparkline: coin.sparkline || []
    }));
  }, [sortedAndPaginatedData.coins]);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleFavorite = useCallback((coinId: string) => {
    setFavorites(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      toast.loading("Refreshing market data...", { duration: 1500 });
      await refetch();
      toast.success("Market data updated!", { duration: 2000 });
    } catch (error) {
      toast.error("Failed to refresh data", { duration: 3000 });
    }
  }, [refetch]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Header with Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Cryptocurrency Market
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Real-time data from {cryptoData?.coins?.length || 0} cryptocurrencies</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                  isRealTime 
                    ? 'bg-success/20 text-success border border-success/30' 
                    : 'bg-muted/50 text-muted-foreground border border-border'
                }`}>
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isRealTime ? 'bg-success animate-pulse' : 'bg-muted-foreground'
                  }`} />
                  {isRealTime ? 'Live' : 'Offline'}
                  {lastUpdateTime && (
                    <span className="ml-1 font-mono text-xs">
                      {new Date(lastUpdateTime).toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 min-w-[250px] bg-background/50 border-border/50 focus:bg-background"
                />
              </div>

              <Button
                onClick={handleRefresh}
                disabled={isLoading}
                className="whitespace-nowrap"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <Card className="border-0 bg-gradient-to-br from-card to-muted/30">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const categoryCount = getCoinsByCategory(filteredCoins, category).length;
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                      className="text-xs"
                    >
                      {category}
                      {category !== 'All' && categoryCount > 0 && (
                        <span className="ml-1 text-xs opacity-70">
                          ({categoryCount})
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Main Data Table */}
          <ModernCryptoTable
            data={formattedCoinData}
            loading={isLoading && !cryptoData}
            sortConfig={sortConfig}
            onSort={handleSort}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
            currentPage={currentPage}
            totalPages={sortedAndPaginatedData.totalPages}
            onPageChange={handlePageChange}
            totalItems={sortedAndPaginatedData.totalItems}
            startIndex={sortedAndPaginatedData.startIndex}
            endIndex={sortedAndPaginatedData.endIndex}
          />

        </div>
      </div>
    </Layout>
  );
};

export default MarketPage;