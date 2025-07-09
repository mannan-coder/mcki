import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import ArbitrageHeader from '@/components/arbitrage/ArbitrageHeader';
import ArbitrageStatsOverview from '@/components/arbitrage/ArbitrageStatsOverview';
import LiveArbitrageOpportunitiesTable from '@/components/arbitrage/LiveArbitrageOpportunitiesTable';
import ExchangeRatesTable from '@/components/arbitrage/ExchangeRatesTable';

const ArbitragePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const { data: arbitrageData, loading, refetch } = useArbitrageData();

  // Use live data from the API
  const opportunities = arbitrageData?.arbitrageOpportunities || [];
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const handleRefresh = async () => {
    await refetch();
  };

  if (loading && !arbitrageData) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-20 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArbitrageHeader 
          isDarkMode={isDarkMode}
          loading={loading}
          onRefresh={handleRefresh}
        />

        <ArbitrageStatsOverview 
          isDarkMode={isDarkMode}
          stats={stats}
          opportunities={opportunities}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <LiveArbitrageOpportunitiesTable 
            isDarkMode={isDarkMode}
            opportunities={opportunities}
            loading={loading}
            onRefresh={handleRefresh}
            stats={stats}
          />

          <ExchangeRatesTable isDarkMode={isDarkMode} />
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ArbitragePage;