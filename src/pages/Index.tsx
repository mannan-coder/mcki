
import { Suspense, lazy } from 'react';
import Layout from '@/components/Layout';
import TopMetricsBanner from '@/components/TopMetricsBanner';
import { OptimizedMarketOverviewSection } from '@/components/sections/OptimizedMarketOverviewSection';
import { OptimizedLiveMarketSignalsSection } from '@/components/sections/OptimizedLiveMarketSignalsSection';
import { OptimizedTopGainersLosers } from '@/components/sections/OptimizedTopGainersLosers';
import { MarketSentimentSection } from '@/components/sections/MarketSentimentSection';
import { CalculatorsSuiteSection } from '@/components/sections/CalculatorsSuiteSection';
import { InsightsEventsSection } from '@/components/sections/InsightsEventsSection';
import OnChainAnalysis from '@/components/OnChainAnalysis';
import { Toaster } from '@/components/ui/sonner';
import AutoAdPlacement from '@/components/ads/AutoAdPlacement';

// Lazy load heavy components
const LazyArbitrageSection = lazy(() => import('@/components/sections/LiveArbitrageSection'));
const LazyNewsSection = lazy(() => import('@/components/sections/NewsAlertsSection'));
const LazyWhaleSection = lazy(() => import('@/components/sections/WhaleMovementsSection'));
const LazyEventsSection = lazy(() => import('@/components/sections/UpcomingEventsSection'));

const Index = () => {
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
    canonical: "https://mcki.online",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "MCKI - Professional Crypto Intelligence",
      "description": "Real-time cryptocurrency market analysis, arbitrage opportunities, and trading intelligence platform",
      "url": "https://mcki.online",
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
              Professional Crypto Analytics
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Real-time market data, arbitrage opportunities, and comprehensive cryptocurrency analytics
            </p>
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

        {/* Auto Ad Placement after Market Overview */}
        <AutoAdPlacement position="after-section" sectionName="market-overview" className="container mx-auto px-4 py-4" />

        {/* Live Market Signals Section */}
        <section className="container mx-auto px-4 py-8">
          <OptimizedLiveMarketSignalsSection />
        </section>

        {/* Auto Ad Placement after Market Signals */}
        <AutoAdPlacement position="after-section" sectionName="market-signals" className="container mx-auto px-4 py-4" />

        {/* Top Gainers/Losers Section */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <OptimizedTopGainersLosers />
        </section>

        {/* Auto Ad Placement after Top Gainers */}
        <AutoAdPlacement position="after-section" sectionName="top-gainers" className="container mx-auto px-4 py-4" />

        {/* On-Chain Analysis Section */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <OnChainAnalysis />
        </section>

        {/* Arbitrage Section */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <LazyArbitrageSection />
          </Suspense>
        </section>

        {/* Auto Ad Placement after Arbitrage */}
        <AutoAdPlacement position="after-section" sectionName="arbitrage" className="container mx-auto px-4 py-4" />

        {/* Lazy loaded sections */}
        <section className="container mx-auto px-4 py-8 border-t border-border/40">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <LazyNewsSection />
          </Suspense>
        </section>

        {/* Auto Ad Placement after News */}
        <AutoAdPlacement position="after-section" sectionName="news-alerts" className="container mx-auto px-4 py-4" />

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

        {/* Auto Ad Placement after Events */}
        <AutoAdPlacement position="after-section" sectionName="events" className="container mx-auto px-4 py-4" />
      </div>
      
      <Toaster />
    </Layout>
  );
};

export default Index;
