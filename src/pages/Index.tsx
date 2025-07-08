
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TopMetricsBanner from '@/components/TopMetricsBanner';
import ArbitrageDashboard from '@/components/ArbitrageDashboard';
import MarketOverview from '@/components/MarketOverview';
import OnChainAnalysis from '@/components/OnChainAnalysis';
import NewsAlert from '@/components/NewsAlert';
import InsightsAlerts from '@/components/InsightsAlerts';
import CalculatorsSection from '@/components/CalculatorsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="relative bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
        {/* Professional gradient background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="relative z-10 pb-8">
          {/* CoinGecko-style Top Banner */}
          <TopMetricsBanner isDarkMode={isDarkMode} />
          
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
            <div className="text-center mb-8">
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  Professional Crypto Analytics
                </span>
              </h1>
              <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Real-time market data, arbitrage opportunities, and comprehensive cryptocurrency analytics platform
              </p>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-12">
            <MarketOverview isDarkMode={isDarkMode} />
            <ArbitrageDashboard isDarkMode={isDarkMode} />
            <OnChainAnalysis isDarkMode={isDarkMode} />
            <NewsAlert isDarkMode={isDarkMode} />
            <InsightsAlerts isDarkMode={isDarkMode} />
            <CalculatorsSection isDarkMode={isDarkMode} />
          </div>
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Index;
