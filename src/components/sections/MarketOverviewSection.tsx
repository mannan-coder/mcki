import { motion } from 'framer-motion';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { useSentimentData } from '@/hooks/useSentimentData';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { MarketHeader } from '../market/MarketHeader';
import { MarketCapCard } from '../market/MarketCapCard';
import { VolumeCard } from '../market/VolumeCard';
import { FearGreedIndex } from '../market/FearGreedIndex';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface MarketOverviewSectionProps {
  isDarkMode: boolean;
}

export const MarketOverviewSection = ({ isDarkMode }: MarketOverviewSectionProps) => {
  const { data: marketData, isLoading, error, refetch } = useOptimizedCryptoData();
  const { data: sentimentData } = useSentimentData();

  // Show skeleton loaders only on initial load
  if (isLoading && !marketData) {
    return (
      <DataSection
        title="Market Overview"
        subtitle="Real-time cryptocurrency market data and comprehensive analytics"
        icon={<Activity className="h-6 w-6 text-primary" />}
        className="space-y-6"
      >
        <StatsGrid
          stats={[]}
          columns={4}
          loading={true}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <ResponsiveCard key={i}>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-8 bg-muted rounded animate-pulse"></div>
                <div className="h-20 bg-muted/60 rounded animate-pulse"></div>
              </div>
            </ResponsiveCard>
          ))}
        </div>
      </DataSection>
    );
  }

  if (error || !marketData) {
    return (
      <DataSection
        title="Market Overview"
        subtitle="Real-time cryptocurrency market data and comprehensive analytics"
        icon={<Activity className="h-6 w-6 text-primary" />}
        className="space-y-6"
      >
        <ResponsiveCard className="text-center">
          <div className="space-y-4">
            <p className="text-destructive">Error loading market data: {error?.message || 'Unknown error'}</p>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </ResponsiveCard>
      </DataSection>
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

  // Prepare stats for the StatsGrid component
  const statsData = [
    {
      label: "Market Cap",
      value: marketStats.totalMarketCap,
      change: "+2.9%",
      changeType: 'positive' as const,
      icon: <DollarSign className="h-4 w-4 text-success" />,
      description: "Total cryptocurrency market"
    },
    {
      label: "24h Volume",
      value: marketStats.totalVolume,
      change: "-1.5%",
      changeType: 'negative' as const,
      icon: <Activity className="h-4 w-4 text-primary" />,
      description: "Trading volume"
    },
    {
      label: "BTC Dominance",
      value: marketStats.btcDominance,
      changeType: 'neutral' as const,
      icon: <TrendingUp className="h-4 w-4 text-warning" />,
      description: "Bitcoin market share"
    },
    {
      label: "Active Coins",
      value: marketStats.activeCoins,
      changeType: 'neutral' as const,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      description: "Cryptocurrencies tracked"
    }
  ];

  return (
    <DataSection
      title="Market Overview"
      subtitle="Real-time cryptocurrency market data and comprehensive analytics"
      icon={<Activity className="h-6 w-6 text-primary" />}
      onRefresh={refetch}
      isLoading={isLoading}
      className="space-y-6"
    >
      {/* Primary Market Stats */}
      <StatsGrid stats={statsData} columns={4} />

      {/* Main Market Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        
        <div className="sm:col-span-2 lg:col-span-1">
          <FearGreedIndex 
            isDarkMode={isDarkMode}
            fearGreedIndex={fearGreedIndex}
            historicalData={historicalData}
          />
        </div>
      </div>
    </DataSection>
  );
};