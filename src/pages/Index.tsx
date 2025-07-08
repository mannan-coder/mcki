
import { useState, Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import TopMetricsBanner from '@/components/TopMetricsBanner';
import Footer from '@/components/Footer';
import { SkeletonCard } from '@/components/ui/skeleton-card';

// Lazy load heavy components
const ArbitrageDashboard = lazy(() => import('@/components/ArbitrageDashboard'));
const MarketOverview = lazy(() => import('@/components/MarketOverview'));
const OnChainAnalysis = lazy(() => import('@/components/OnChainAnalysis'));
const NewsAlert = lazy(() => import('@/components/NewsAlert'));
const InsightsAlerts = lazy(() => import('@/components/InsightsAlerts'));
const CalculatorsSection = lazy(() => import('@/components/CalculatorsSection'));

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="relative bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
        
        <main className="relative z-10">
          {/* Compact Top Banner */}
          <TopMetricsBanner isDarkMode={isDarkMode} />
          
          {/* Ultra-Compact Hero Section */}
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3">
            <div className="text-center mb-3 sm:mb-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-foreground">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  Professional Crypto Analytics
                </span>
              </h1>
              <p className="text-sm sm:text-base max-w-2xl mx-auto text-muted-foreground">
                Real-time market data, arbitrage opportunities, and comprehensive cryptocurrency analytics
              </p>
            </div>
          </div>

          {/* Ultra-Compact Content Sections with Lazy Loading */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 pb-4 sm:pb-6">
            <Suspense fallback={<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"><SkeletonCard isDarkMode={isDarkMode} /></div>}>
              <MarketOverview isDarkMode={isDarkMode} />
            </Suspense>
            
            <Suspense fallback={<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"><SkeletonCard isDarkMode={isDarkMode} /></div>}>
              <ArbitrageDashboard isDarkMode={isDarkMode} />
            </Suspense>
            
            <Suspense fallback={<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"><SkeletonCard isDarkMode={isDarkMode} /></div>}>
              <OnChainAnalysis isDarkMode={isDarkMode} />
            </Suspense>
            
            <Suspense fallback={<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"><SkeletonCard isDarkMode={isDarkMode} /></div>}>
              <NewsAlert isDarkMode={isDarkMode} />
            </Suspense>
            
            <Suspense fallback={<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"><SkeletonCard isDarkMode={isDarkMode} /></div>}>
              <InsightsAlerts isDarkMode={isDarkMode} />
            </Suspense>
            
            <Suspense fallback={<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"><SkeletonCard isDarkMode={isDarkMode} /></div>}>
              <CalculatorsSection isDarkMode={isDarkMode} />
            </Suspense>
          </div>
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Index;
