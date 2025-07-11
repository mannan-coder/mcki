
import { Suspense, lazy } from 'react';
import Layout from '@/components/Layout';
import { MarketOverviewSection } from '@/components/sections/MarketOverviewSection';
import { TopGainersLosers } from '@/components/sections/TopGainersLosers';
import { LiveMarketSignalsSection } from '@/components/sections/LiveMarketSignalsSection';
import { TopVolumeSection } from '@/components/sections/TopVolumeSection';
import { NewsAlertsSection } from '@/components/sections/NewsAlertsSection';
import { InsightsEventsSection } from '@/components/sections/InsightsEventsSection';
import { CalculatorsSuiteSection } from '@/components/sections/CalculatorsSuiteSection';
import { WhaleMovementsSection } from '@/components/sections/WhaleMovementsSection';
import { MarketSentimentSection } from '@/components/sections/MarketSentimentSection';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';

// Lazy load heavy components for better performance
const ArbitrageDashboard = lazy(() => import('@/components/ArbitrageDashboard'));
const OnChainAnalysis = lazy(() => import('@/components/OnChainAnalysis'));
const LivePricesAcrossExchanges = lazy(() => import('@/components/arbitrage/LivePricesAcrossExchanges'));

const Index = () => {
  const { data: marketData, isLoading } = useOptimizedCryptoData(30, false); // Minimal data for homepage

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
          <MarketOverviewSection isDarkMode={false} />
          
          {/* Top Gainers & Losers Section */}
          <TopGainersLosers 
            coins={marketData?.coins || []} 
            loading={isLoading && !marketData}
          />
          
          {/* Live Market Signals Section */}
          <LiveMarketSignalsSection 
            coins={marketData?.coins || []} 
            loading={isLoading && !marketData}
          />
          
          {/* Top Volume Section */}
          <TopVolumeSection 
            coins={marketData?.coins || []} 
            loading={isLoading && !marketData}
          />
          
          {/* Arbitrage Opportunities Section */}
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20 rounded-lg" />}>
            <ArbitrageDashboard isDarkMode={false} />
          </Suspense>
          
          {/* Whale Movements Section */}
          <WhaleMovementsSection loading={isLoading && !marketData} />
          
          {/* Market Sentiment Section */}
          <MarketSentimentSection loading={isLoading && !marketData} />
          
          {/* On-Chain Analysis Section */}
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20 rounded-lg" />}>
            <OnChainAnalysis loading={isLoading && !marketData} />
          </Suspense>
          
          {/* News & Market Alerts Section */}
          <NewsAlertsSection loading={isLoading && !marketData} />
          
          {/* Merged Insights, Alerts & Events Section */}
          <InsightsEventsSection loading={isLoading && !marketData} />
          
          {/* Finance Calculators Suite Section */}
          <CalculatorsSuiteSection loading={isLoading && !marketData} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
