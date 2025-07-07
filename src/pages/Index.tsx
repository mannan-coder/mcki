
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TopMetrics from '@/components/TopMetrics';
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
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <div className="relative">
        {/* Binance-style background */}
        <div className="absolute inset-0 bg-background" />
        
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="relative z-10">
          <MarketOverview isDarkMode={isDarkMode} />
          <TopMetrics isDarkMode={isDarkMode} />
          <ArbitrageDashboard isDarkMode={isDarkMode} />
          <OnChainAnalysis isDarkMode={isDarkMode} />
          <NewsAlert isDarkMode={isDarkMode} />
          <InsightsAlerts isDarkMode={isDarkMode} />
          <CalculatorsSection isDarkMode={isDarkMode} />
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Index;
