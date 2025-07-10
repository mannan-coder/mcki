import { TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import { useArbitrageStats } from '@/hooks/useArbitrageStats';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { OpportunitiesSection } from '@/components/arbitrage/OpportunitiesSection';
import { ExchangeStatusSection } from '@/components/arbitrage/ExchangeStatusSection';
import { getArbitrageTableColumns } from '@/components/arbitrage/ArbitrageTableColumns';
import { getExchangeColumns } from '@/utils/arbitrageColumns';
import { getExchangeData } from '@/data/exchangeData';

const ArbitragePage = () => {
  const { data: arbitrageData, loading, refetch } = useArbitrageData();

  // Use live data from the API - show all opportunities on arbitrage page
  const opportunities = arbitrageData?.arbitrageOpportunities || [];
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const handleRefresh = async () => {
    await refetch();
  };

  const statsData = useArbitrageStats(stats);
  const exchangeData = getExchangeData();
  const opportunityColumns = getArbitrageTableColumns();
  const exchangeColumns = getExchangeColumns();
  
  // Format data for the table - use original opportunities data structure
  const formattedOpportunityData = opportunities;

  if (loading && !arbitrageData) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
          <DataSection
            title="Arbitrage Opportunities"
            subtitle="Real-time cryptocurrency arbitrage detection across major exchanges"
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
          >
            <div className="space-y-6">
              <StatsGrid stats={[]} loading={true} />
              
              {/* Loading skeleton for opportunities - Full Width */}
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between p-4 border-b border-border/50 last:border-b-0">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              
              {/* Loading skeleton for exchange status - Full Width */}
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between p-3">
                    <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </DataSection>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        <DataSection
          title="Arbitrage Opportunities"
          subtitle="Real-time cryptocurrency arbitrage detection across major exchanges"
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
          onRefresh={handleRefresh}
          isLoading={loading}
        >
          <div className="space-y-6">
            {/* Key Metrics */}
            <StatsGrid stats={statsData} />
            
            {/* Live Opportunities Table - Full Width */}
            <OpportunitiesSection 
              formattedData={formattedOpportunityData}
              columns={opportunityColumns}
            />

            {/* Exchange Status - Full Width Below */}
            <ExchangeStatusSection exchangeData={exchangeData} />
          </div>
        </DataSection>
      </div>
    </Layout>
  );
};

export default ArbitragePage;