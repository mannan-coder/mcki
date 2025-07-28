
import { Suspense, lazy } from 'react';
import Layout from '@/components/Layout';
import TopMetricsBanner from '@/components/TopMetricsBanner';
import { OptimizedMarketOverviewSection } from '@/components/sections/OptimizedMarketOverviewSection';
import { OptimizedLiveMarketSignalsSection } from '@/components/sections/OptimizedLiveMarketSignalsSection';
import { OptimizedTopGainersLosers } from '@/components/sections/OptimizedTopGainersLosers';
import { Toaster } from '@/components/ui/sonner';
import AdPlacement from '@/components/ads/AdPlacement';

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
        {/* Header Ad */}
        <div className="container mx-auto px-4 py-2">
          <AdPlacement position="header" className="mb-4" />
        </div>

        {/* Top Metrics Banner */}
        <section className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-2">
            <TopMetricsBanner isDarkMode={true} />
          </div>
        </section>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Market Overview */}
              <OptimizedMarketOverviewSection isDarkMode={true} />

              {/* Content Ad */}
              <AdPlacement position="content" className="my-8" />

              {/* Live Market Signals */}
              <OptimizedLiveMarketSignalsSection />

              {/* Top Gainers & Losers */}
              <OptimizedTopGainersLosers />

              {/* Lazy loaded sections */}
              <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
                <LazyArbitrageSection />
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
                <LazyNewsSection />
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
                <LazyWhaleSection />
              </Suspense>

              <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
                <LazyEventsSection />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Sidebar Ad */}
              <AdPlacement position="sidebar" className="sticky top-4" />
            </div>
          </div>
        </div>

        {/* Footer Ad */}
        <div className="container mx-auto px-4 py-4 border-t border-border/40">
          <AdPlacement position="footer" />
        </div>

        {/* Mobile Banner Ad */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/40">
          <AdPlacement position="mobile-banner" />
        </div>
      </div>
      
      <Toaster />
    </Layout>
  );
};

export default Index;
