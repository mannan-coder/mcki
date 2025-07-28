import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Arbitrage = lazy(() => import('@/pages/Arbitrage'));
const ChainAnalytics = lazy(() => import('@/pages/ChainAnalytics'));
const Market = lazy(() => import('@/pages/Market'));
const MarketCapDetails = lazy(() => import('@/pages/MarketCapDetails'));
const News = lazy(() => import('@/pages/News'));
const NewsDetail = lazy(() => import('@/pages/NewsDetail'));
const Tools = lazy(() => import('@/pages/Tools'));
const VolumeDetails = lazy(() => import('@/pages/VolumeDetails'));
const CoinDetail = lazy(() => import('@/pages/CoinDetail'));
const Alerts = lazy(() => import('@/pages/Alerts'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Events = lazy(() => import('@/pages/Events'));

// New pages
const Contact = lazy(() => import('@/pages/Contact'));
const Blog = lazy(() => import('@/pages/Blog'));
const Careers = lazy(() => import('@/pages/Careers'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Cookies = lazy(() => import('@/pages/Cookies'));
const Disclaimer = lazy(() => import('@/pages/Disclaimer'));

// Detail pages
const WhaleDetail = lazy(() => import('@/pages/WhaleDetail'));
const TrendingDetail = lazy(() => import('@/pages/TrendingDetail'));
const AlertDetail = lazy(() => import('@/pages/AlertDetail'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen p-8 space-y-6">
    <Skeleton className="h-12 w-1/3" />
    <Skeleton className="h-64 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48" />
      ))}
    </div>
  </div>
);

function App() {

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/arbitrage" element={<Arbitrage />} />
          <Route path="/chain-analytics" element={<ChainAnalytics />} />
          <Route path="/market" element={<Market />} />
          <Route path="/market-cap-details" element={<MarketCapDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/volume-details" element={<VolumeDetails />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<Events />} />
          <Route path="/alerts" element={<Alerts />} />
          
          {/* Detail pages */}
          <Route path="/trending-detail/:id" element={<TrendingDetail />} />
          <Route path="/whale-detail/:id" element={<WhaleDetail />} />
          <Route path="/alert-detail/:id" element={<AlertDetail />} />
          
          {/* New pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <Toaster 
        position="bottom-right"
        expand={false}
        richColors
        closeButton
      />
    </ErrorBoundary>
  );
}

export default App;