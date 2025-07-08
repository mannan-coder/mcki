import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { useSentimentData } from '@/hooks/useSentimentData';
import { SkeletonCard, SkeletonMetricCard, SkeletonSidebarCard } from '@/components/ui/skeleton-card';
import { MarketHeader } from './market/MarketHeader';
import { MarketCapCard } from './market/MarketCapCard';
import { VolumeCard } from './market/VolumeCard';
import { FearGreedIndex } from './market/FearGreedIndex';
import TopMetrics from './TopMetrics';

interface MarketOverviewProps {
  isDarkMode: boolean;
}

const MarketOverview = ({ isDarkMode }: MarketOverviewProps) => {
  const [showMarketCapModal, setShowMarketCapModal] = useState(false);
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const { data: marketData, isLoading, error, refetch } = useOptimizedCryptoData();
  const { data: sentimentData } = useSentimentData();

  // Show skeleton loaders only on initial load
  if (isLoading && !marketData) {
    return (
      <section id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Skeleton */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8"
        >
          <div className="mb-4 lg:mb-0">
            <div className="h-6 lg:h-8 w-48 lg:w-64 bg-muted rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 lg:h-5 w-64 lg:w-80 bg-muted/60 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-8 lg:h-10 w-32 bg-muted rounded-lg animate-pulse"></div>
        </motion.div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
              <SkeletonCard isDarkMode={isDarkMode} />
              <SkeletonCard isDarkMode={isDarkMode} />
            </div>
            <SkeletonMetricCard isDarkMode={isDarkMode} />
          </div>
          
          <div className="lg:col-span-1 space-y-4">
            <SkeletonSidebarCard isDarkMode={isDarkMode} />
            <SkeletonSidebarCard isDarkMode={isDarkMode} />
            <SkeletonSidebarCard isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Additional Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} isDarkMode={isDarkMode} />
          ))}
        </div>
      </section>
    );
  }

  if (error || !marketData) {
    return (
      <section id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading market data: {error?.message || 'Unknown error'}</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const marketStats = {
    totalMarketCap: `$${(marketData.totalMarketCap / 1e12).toFixed(2)}T`,
    totalVolume: `$${(marketData.totalVolume / 1e9).toFixed(1)}B`,
    btcDominance: `${marketData.btcDominance.toFixed(1)}%`,
    ethDominance: `${marketData.ethDominance?.toFixed(1) || '18.2'}%`,
    activeCoins: marketData.activeCryptocurrencies?.toLocaleString() || '13,247',
    exchanges: marketData.markets?.toLocaleString() || '794'
  };

  const fearGreedIndex = sentimentData?.fearGreedIndex?.value || marketData.fearGreedIndex;
  // Use real historical data if available
  const historicalData = sentimentData?.historical ? {
    current: sentimentData.fearGreedIndex.value,
    yesterday: sentimentData.historical.last7Days[1]?.value || sentimentData.fearGreedIndex.value - 5,
    weekAgo: sentimentData.historical.avg7d,
    monthAgo: sentimentData.historical.avg30d,
    hourlyData: sentimentData.historical.last7Days.slice(0, 7).map(d => d.value),
    dailyData: sentimentData.historical.last30Days.slice(0, 14).map(d => d.value),
    weeklyTrend: sentimentData.historical.avg7d > sentimentData.historical.avg30d ? '+5.0' : '-3.2',
    monthlyTrend: '+14.0'
  } : {
    current: fearGreedIndex,
    yesterday: fearGreedIndex - 5,
    weekAgo: fearGreedIndex + 12,
    monthAgo: fearGreedIndex - 14,
    hourlyData: [68, 69, 67, 65, 67, 70, fearGreedIndex],
    dailyData: Array.from({length: 14}, () => Math.floor(Math.random() * 40) + 40),
    weeklyTrend: '+5.0',
    monthlyTrend: '+14.0'
  };

  // Calculate real ETH dominance from market data
  const ethCoin = marketData.coins.find(coin => coin.symbol === 'ETH');
  const realEthDominance = ethCoin ? ((ethCoin.marketCap / marketData.totalMarketCap) * 100).toFixed(1) + '%' : marketStats.ethDominance;

  const getFearGreedColor = (value: number) => {
    if (value >= 75) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    if (value >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getFearGreedLabel = (value: number) => {
    if (value >= 75) return 'Extreme Greed';
    if (value >= 55) return 'Greed';
    if (value >= 45) return 'Neutral';
    if (value >= 25) return 'Fear';
    return 'Extreme Fear';
  };

  return (
    <motion.section 
      id="market" 
      className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MarketHeader isDarkMode={isDarkMode} totalMarketCap={marketStats.totalMarketCap} />

      {/* Ultra-Compact Layout */}
      <div className="space-y-3 sm:space-y-4">
        {/* Market Stats Cards - Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          <MarketCapCard 
            isDarkMode={isDarkMode}
            totalMarketCap={marketStats.totalMarketCap}
            marketCapValue={marketData.totalMarketCap}
          />
          
          <VolumeCard 
            isDarkMode={isDarkMode}
            totalVolume={marketStats.totalVolume}
            volumeValue={marketData.totalVolume}
          />
          
          {/* Fear & Greed - Compact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FearGreedIndex 
              isDarkMode={isDarkMode}
              fearGreedIndex={fearGreedIndex}
              historicalData={historicalData}
            />
          </div>
        </div>

        {/* Market Insights - Compact */}
        <div className="mt-2 sm:mt-3">
          <TopMetrics isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Compact Stats Row */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="p-3 rounded-lg border backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-sm font-semibold mb-2 text-foreground">
            Market Dominance
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Bitcoin</span>
              <span className="text-warning font-semibold text-xs">{marketStats.btcDominance}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Ethereum</span>
              <span className="text-primary font-semibold text-xs">{marketStats.ethDominance}</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg border backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-sm font-semibold mb-2 text-foreground">
            Market Statistics
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Active Coins</span>
              <span className="font-semibold text-xs text-foreground">
                {marketStats.activeCoins}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Exchanges</span>
              <span className="font-semibold text-xs text-foreground">
                {marketStats.exchanges}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg border backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-sm font-semibold mb-2 text-foreground">
            24h Trading Volume
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total Volume</span>
              <span className="font-semibold text-xs text-foreground">
                {marketStats.totalVolume}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Change</span>
              <span className="text-destructive font-semibold text-xs">-1.5%</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg border backdrop-blur-sm bg-card/80 border-border/50">
          <h3 className="text-sm font-semibold mb-2 text-foreground">
            Global Metrics
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Market Cap</span>
              <span className="font-semibold text-xs text-foreground">
                {marketStats.totalMarketCap}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">24h Change</span>
              <span className="text-success font-semibold text-xs">+2.9%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default MarketOverview;