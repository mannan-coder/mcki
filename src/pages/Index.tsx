
import { useState, Suspense, lazy } from 'react';
import Layout from '@/components/Layout';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { MarketOverviewSection } from '@/components/sections/MarketOverviewSection';
import { TopGainersLosers } from '@/components/sections/TopGainersLosers';
import { TopVolumeSection } from '@/components/sections/TopVolumeSection';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';

// Lazy load heavy components for better performance
const ArbitrageDashboard = lazy(() => import('@/components/ArbitrageDashboard'));
const OnChainAnalysis = lazy(() => import('@/components/OnChainAnalysis'));
const NewsAlert = lazy(() => import('@/components/NewsAlert'));
const InsightsAlerts = lazy(() => import('@/components/InsightsAlerts'));
const CalculatorsSection = lazy(() => import('@/components/CalculatorsSection'));

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const { data: marketData, isLoading } = useOptimizedCryptoData();

  return (
    <Layout showFooter={true}>
      <div className="min-h-screen">
        {/* Hero Section - Minimal and Clean */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Professional Crypto Analytics
              </span>
            </h1>
            <p className="text-base sm:text-lg max-w-3xl mx-auto text-muted-foreground">
              Real-time market data, arbitrage opportunities, and comprehensive cryptocurrency analytics
            </p>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-8">
          {/* Market Overview Section */}
          <MarketOverviewSection isDarkMode={isDarkMode} />
          
          {/* Top Gainers & Losers Section */}
          <TopGainersLosers 
            coins={marketData?.coins || []} 
            loading={isLoading && !marketData}
          />
          
          {/* Top Volume Section */}
          <TopVolumeSection 
            coins={marketData?.coins || []} 
            loading={isLoading && !marketData}
          />
          
          {/* Arbitrage Opportunities Section */}
          <Suspense fallback={<SkeletonCard isDarkMode={isDarkMode} />}>
            <ArbitrageDashboard isDarkMode={isDarkMode} />
          </Suspense>
          
          {/* On-Chain Analysis Section */}
          <Suspense fallback={<SkeletonCard isDarkMode={isDarkMode} />}>
            <OnChainAnalysis isDarkMode={isDarkMode} />
          </Suspense>
          
          {/* News & Insights Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Suspense fallback={<SkeletonCard isDarkMode={isDarkMode} />}>
              <NewsAlert isDarkMode={isDarkMode} />
            </Suspense>
            
            <Suspense fallback={<SkeletonCard isDarkMode={isDarkMode} />}>
              <InsightsAlerts isDarkMode={isDarkMode} />
            </Suspense>
          </div>
          
          {/* Tools & Calculators Section */}
          <Suspense fallback={<SkeletonCard isDarkMode={isDarkMode} />}>
            <CalculatorsSection isDarkMode={isDarkMode} />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
