import React, { useState, useMemo, useCallback } from 'react';
import { Search, RefreshCw, Filter, SortAsc } from 'lucide-react';
import Layout from '@/components/Layout';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCoinsByCategory } from '@/utils/coinCategories';
import { CryptoTable } from '@/components/market/crypto-table';
import { MarketStats } from '@/components/market/MarketStats';
import { TopMovers } from '@/components/market/TopMovers';
import { SignalsOverview } from '@/components/market/SignalsOverview';
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
      {/* Professional Hero Background */}
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        
        {/* Professional Header with Gradient */}
        <div className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border-b border-border/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-12 bg-gradient-to-b from-primary to-accent rounded-full" />
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
                      Market Dashboard
                    </h1>
                    <p className="text-lg text-muted-foreground mt-1">Professional cryptocurrency analytics</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border backdrop-blur-sm">
                    <span className="text-muted-foreground">Tracking</span>
                    <span className="font-bold text-primary text-lg">{cryptoData?.coins?.length || 0}</span>
                    <span className="text-muted-foreground">assets</span>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border backdrop-blur-sm transition-all ${
                    isRealTime 
                      ? 'bg-success/10 text-success border-success/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      isRealTime ? 'bg-success animate-pulse' : 'bg-destructive'
                    }`} />
                    <span>{isRealTime ? 'Live Feed' : 'Reconnecting'}</span>
                    {lastUpdateTime && (
                      <span className="ml-1 font-mono opacity-75">
                        {new Date(lastUpdateTime).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Search by name or symbol..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-12 min-w-[320px] h-12 border-border/50 focus:border-primary bg-card/50 backdrop-blur-sm text-base"
                  />
                </div>

                <Button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  variant="outline"
                  className="h-12 px-8 font-medium bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary/5"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Market Overview Stats */}
          <div className="space-y-6">
            <MarketStats 
              data={cryptoData}
              loading={isLoading && !cryptoData}
            />

            {/* Enhanced Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopMovers 
                coins={categoryFilteredCoins}
                loading={isLoading && !cryptoData}
              />
            </div>

            {/* Market Signals Dashboard */}
            <SignalsOverview 
              coins={categoryFilteredCoins}
              loading={isLoading && !cryptoData}
            />
          </div>

          {/* Professional Filters Panel */}
          <Card className="border-0 bg-gradient-to-r from-card/80 via-card to-card/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Filter Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category) => {
                      const categoryCount = getCoinsByCategory(filteredCoins, category).length;
                      const isSelected = selectedCategory === category;
                      return (
                        <Button
                          key={category}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleCategoryChange(category)}
                          className={`text-sm font-medium transition-all duration-200 ${
                            isSelected 
                              ? 'bg-primary shadow-lg scale-105' 
                              : 'hover:bg-muted/50 hover:scale-105 border-border/50'
                          }`}
                        >
                          {category}
                          {category !== 'All' && categoryCount > 0 && (
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                              isSelected 
                                ? 'bg-primary-foreground/20 text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {categoryCount}
                            </span>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 px-4 py-2 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SortAsc className="h-4 w-4" />
                    <span>Sort:</span>
                  </div>
                  <div className="text-sm font-semibold">
                    {sortConfig.key}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    sortConfig.direction === 'asc' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {sortConfig.direction === 'asc' ? '↑ ASC' : '↓ DESC'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Data Table */}
          <div className="bg-gradient-to-b from-card/50 to-card rounded-xl border border-border/50 shadow-2xl backdrop-blur-sm">
            <CryptoTable
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
      </div>
    </Layout>
  );
};

export default MarketPage;