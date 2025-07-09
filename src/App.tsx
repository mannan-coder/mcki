import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Arbitrage = lazy(() => import("./pages/Arbitrage"));
const Market = lazy(() => import("./pages/Market"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Analytics = lazy(() => import("./pages/Analytics"));
const ChainAnalytics = lazy(() => import("./pages/ChainAnalytics"));
const Tools = lazy(() => import("./pages/Tools"));
const About = lazy(() => import("./pages/About"));
const Alerts = lazy(() => import("./pages/Alerts"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MarketCapDetails = lazy(() => import("./pages/MarketCapDetails"));
const VolumeDetails = lazy(() => import("./pages/VolumeDetails"));
const CoinDetail = lazy(() => import("./pages/CoinDetail"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  </div>
);

const App = () => (
  <TooltipProvider>
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Sonner />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/arbitrage" element={<Arbitrage />} />
          <Route path="/market" element={<Market />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/market-cap-details" element={<MarketCapDetails />} />
          <Route path="/volume-details" element={<VolumeDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/chain-analytics" element={<ChainAnalytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  </TooltipProvider>
);

export default App;
