
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TopMetrics from '@/components/TopMetrics';
import ArbitrageDashboard from '@/components/ArbitrageDashboard';
import MarketOverview from '@/components/MarketOverview';
import OnChainAnalysis from '@/components/OnChainAnalysis';
import InsightsAlerts from '@/components/InsightsAlerts';
import CalculatorsSection from '@/components/CalculatorsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 pointer-events-none" />
        
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="relative z-10">
          <TopMetrics isDarkMode={isDarkMode} />
          <ArbitrageDashboard isDarkMode={isDarkMode} />
          <MarketOverview isDarkMode={isDarkMode} />
          <OnChainAnalysis isDarkMode={isDarkMode} />
          <InsightsAlerts isDarkMode={isDarkMode} />
          <CalculatorsSection isDarkMode={isDarkMode} />
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Index;
