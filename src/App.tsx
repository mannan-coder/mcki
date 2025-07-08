import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Arbitrage from "./pages/Arbitrage";
import Market from "./pages/Market";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Analytics from "./pages/Analytics";
import ChainAnalytics from "./pages/ChainAnalytics";
import Tools from "./pages/Tools";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import MarketCapDetails from "./pages/MarketCapDetails";
import VolumeDetails from "./pages/VolumeDetails";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/arbitrage" element={<Arbitrage />} />
      <Route path="/market" element={<Market />} />
      <Route path="/market-cap-details" element={<MarketCapDetails />} />
      <Route path="/volume-details" element={<VolumeDetails />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/chain-analytics" element={<ChainAnalytics />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/about" element={<About />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
