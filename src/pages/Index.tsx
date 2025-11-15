
import { Suspense, lazy } from 'react';
import Layout from '@/components/Layout';
import TopMetricsBanner from '@/components/TopMetricsBanner';
import { OptimizedMarketOverviewSection } from '@/components/sections/OptimizedMarketOverviewSection';
import { OptimizedLiveMarketSignalsSection } from '@/components/sections/OptimizedLiveMarketSignalsSection';
import { OptimizedTopGainersLosers } from '@/components/sections/OptimizedTopGainersLosers';
import { MarketSentimentSection } from '@/components/sections/MarketSentimentSection';
import { CalculatorsSuiteSection } from '@/components/sections/CalculatorsSuiteSection';
import { InsightsEventsSection } from '@/components/sections/InsightsEventsSection';
import { TopVolumeSection } from '@/components/sections/TopVolumeSection';
import OnChainAnalysis from '@/components/OnChainAnalysis';
import LivePricesAcrossExchanges from '@/components/arbitrage/LivePricesAcrossExchanges';
import { ContentEnhancer } from '@/components/seo/ContentEnhancer';
import { Toaster } from '@/components/ui/sonner';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';

// Lazy load heavy components
const LazyArbitrageSection = lazy(() => import('@/components/sections/LiveArbitrageSection'));
const LazyNewsSection = lazy(() => import('@/components/sections/NewsAlertsSection'));
const LazyWhaleSection = lazy(() => import('@/components/sections/WhaleMovementsSection'));
const LazyEventsSection = lazy(() => import('@/components/sections/UpcomingEventsSection'));

const Index = () => {
  const { data: cryptoData, isLoading: cryptoLoading } = useOptimizedCryptoData();
  const seoProps = {
    title: "MCKI - Professional Crypto Intelligence Platform",
    description: "Real-time cryptocurrency market analysis, arbitrage opportunities, and trading intelligence. Get live crypto data, market insights, and professional trading tools.",
    keywords: [
      "cryptocurrency trading",
      "crypto arbitrage",
      "bitcoin analysis",
      "ethereum trading",
      "blockchain analytics",
      "crypto market data",
      "trading signals",
      "crypto intelligence",
      "market analysis tools",
      "cryptocurrency insights"
    ],
    canonical: "https://mcki.site",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "MCKI - Professional Crypto Intelligence",
      "description": "Real-time cryptocurrency market analysis, arbitrage opportunities, and trading intelligence platform",
      "url": "https://mcki.site",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Real-time crypto market data",
        "Arbitrage opportunity detection",
        "Trading signal analysis",
        "Market sentiment tracking",
        "Portfolio management tools"
      ]
    }
  };

  return (
    <Layout seoProps={seoProps}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-background to-muted/20 border-b border-border/40">
          <div className="container mx-auto px-4 py-12 sm:py-16 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6 tracking-tight">
              Professional Crypto Analytics & Arbitrage Intelligence
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 mb-6">
              MCKI provides real-time cryptocurrency market data, arbitrage opportunities, and comprehensive blockchain analytics for professional traders and investors. Our platform monitors 150+ exchanges 24/7, delivering actionable insights, profitable trading opportunities, and advanced market intelligence tools to help you make informed decisions in the fast-paced crypto market.
            </p>
            <div className="max-w-4xl mx-auto px-4 text-sm sm:text-base text-muted-foreground">
              <p>Track live price movements across multiple exchanges, identify arbitrage spreads, analyze on-chain metrics, monitor whale movements, and stay ahead with real-time alerts. Whether you're looking for arbitrage opportunities, market sentiment analysis, or comprehensive trading calculators, MCKI delivers the data and tools you need to succeed in cryptocurrency trading.</p>
            </div>
          </div>
        </section>

        {/* Top Metrics Banner */}
        <section className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-2">
            <TopMetricsBanner isDarkMode={true} />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <OptimizedMarketOverviewSection isDarkMode={true} />
        </section>

        {/* Live Market Signals Section */}
        <section className="container mx-auto px-4 py-8">
          <OptimizedLiveMarketSignalsSection />
        </section>

        {/* Top Gainers/Losers Section */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <OptimizedTopGainersLosers />
        </section>

        {/* Highest Volume Section */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <TopVolumeSection coins={cryptoData?.coins || []} loading={cryptoLoading} />
        </section>

        {/* Arbitrage Section */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <LazyArbitrageSection />
          </Suspense>
        </section>

        {/* Live Exchange Data Section - Moved after arbitrage */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <LivePricesAcrossExchanges />
        </section>

        {/* On-Chain Analysis Section */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <OnChainAnalysis />
        </section>

        {/* Lazy loaded sections */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <LazyNewsSection />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <LazyWhaleSection />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <MarketSentimentSection />
        </section>

        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <InsightsEventsSection />
        </section>

        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <LazyEventsSection />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <CalculatorsSuiteSection />
        </section>

        {/* Rich Content Section for SEO and AdSense */}
        <ContentEnhancer />
      </div>
      
      <Toaster />
    </Layout>
  );
};

export default Index;
