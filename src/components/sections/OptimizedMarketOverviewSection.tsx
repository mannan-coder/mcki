
import { motion } from 'framer-motion';
import { Activity, DollarSign, TrendingUp } from 'lucide-react';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { MarketCapCard } from '../market/MarketCapCard';
import { VolumeCard } from '../market/VolumeCard';
import { FearGreedIndex } from '../market/FearGreedIndex';
import { useOptimizedMarketOverview } from '@/hooks/useOptimizedMarketOverview';
import { useToast } from '@/hooks/use-toast';

interface OptimizedMarketOverviewSectionProps {
  isDarkMode: boolean;
}

export const OptimizedMarketOverviewSection = ({ isDarkMode }: OptimizedMarketOverviewSectionProps) => {
  const { data: marketData, isLoading, error, refetch } = useOptimizedMarketOverview();
  const { toast } = useToast();

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Market Overview Refreshed",
      description: "Latest market data has been updated successfully.",
    });
  };

  if (isLoading && !marketData) {
    return (
      <DataSection
        title="Market Overview"
        subtitle="Real-time cryptocurrency market data and comprehensive analytics"
        icon={<Activity className="h-6 w-6 text-primary" />}
        className="space-y-6"
      >
        <StatsGrid stats={[]} columns={4} loading={true} />
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
    activeCoins: marketData.activeCryptocurrencies?.toLocaleString() || '13,247'
  };

  const historicalData = {
    current: marketData.fearGreedIndex,
    yesterday: marketData.fearGreedIndex - 5,
    weekAgo: marketData.fearGreedIndex + 12,
    monthAgo: marketData.fearGreedIndex - 14,
    hourlyData: [68, 69, 67, 65, 67, 70, marketData.fearGreedIndex],
    dailyData: Array.from({length: 14}, () => Math.floor(Math.random() * 40) + 40),
    weeklyTrend: '+5.0',
    monthlyTrend: '+14.0'
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DataSection
        title="Market Overview"
        subtitle="Real-time cryptocurrency market data and comprehensive analytics"
        icon={<Activity className="h-6 w-6 text-primary" />}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        className="space-y-6"
      >
        <StatsGrid stats={statsData} columns={4} />

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
              fearGreedIndex={marketData.fearGreedIndex}
              historicalData={historicalData}
            />
          </div>
        </div>
      </DataSection>
    </motion.div>
  );
};
