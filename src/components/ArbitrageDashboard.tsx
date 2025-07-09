import { Target } from 'lucide-react';
import { DataSection } from '@/components/common/DataSection';
import { useArbitrageOpportunities } from '@/hooks/useArbitrageOpportunities';
import { ArbitrageTable } from './arbitrage/ArbitrageTable';
import { ArbitrageDashboardHeader } from './arbitrage/ArbitrageDashboardHeader';
import ArbitrageStats from './arbitrage/ArbitrageStats';
import LivePricesAcrossExchanges from './arbitrage/LivePricesAcrossExchanges';

interface ArbitrageDashboardProps {
  isDarkMode: boolean;
}

const ArbitrageDashboard = ({ isDarkMode }: ArbitrageDashboardProps) => {
  const { 
    opportunities: persistentOpportunities, 
    loading, 
    refetch, 
    arbitrageData 
  } = useArbitrageOpportunities();

  const opportunities = persistentOpportunities.slice(0, 10); // Limit to 10 for main page
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <DataSection
      title="Live Arbitrage Opportunities"
      subtitle={`Real-time profit opportunities across exchanges - Updated every 15 seconds`}
      icon={<Target className="h-6 w-6 text-primary" />}
      onRefresh={handleRefresh}
      isLoading={loading}
      className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6"
      headerActions={
        <ArbitrageDashboardHeader 
          opportunitiesCount={opportunities.length}
          avgSpread={stats.avgSpread}
        />
      }
    >
      <ArbitrageTable
        opportunities={opportunities}
        loading={loading && !arbitrageData}
        limit={10}
      />

      {arbitrageData && (
        <>
          <ArbitrageStats stats={stats} isDarkMode={isDarkMode} />
          <LivePricesAcrossExchanges />
        </>
      )}
    </DataSection>
  );
};

export default ArbitrageDashboard;