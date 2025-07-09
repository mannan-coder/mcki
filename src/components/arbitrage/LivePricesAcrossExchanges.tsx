import { Link } from 'react-router-dom';
import { Building2, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { DataSection } from '@/components/common/DataSection';
import { useLivePricesData } from '@/hooks/useLivePricesData';
import { CoinSection } from '../live-prices/CoinSection';
import { ExchangePricesTable } from '../live-prices/ExchangePricesTable';

interface LivePricesAcrossExchangesProps {
  loading?: boolean;
}

const LivePricesAcrossExchanges = ({ loading = false }: LivePricesAcrossExchangesProps) => {
  const { 
    coinPricesData, 
    topGainers, 
    topLosers, 
    topVolume, 
    isLoading, 
    refetch 
  } = useLivePricesData();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <DataSection
      title="Live Prices Across Exchanges"
      subtitle="Real-time cryptocurrency prices, top performers, and exchange data"
      icon={<Building2 className="h-6 w-6 text-primary" />}
      onRefresh={handleRefresh}
      isLoading={isLoading || loading}
      headerActions={
        <Link 
          to="/arbitrage"
          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
        >
          View All
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Top Performers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CoinSection
            title="🚀 Top Gainers"
            coins={topGainers}
            category="gainer"
            loading={isLoading || loading}
          />
          <CoinSection
            title="📉 Top Losers"
            coins={topLosers}
            category="loser"
            loading={isLoading || loading}
          />
          <CoinSection
            title="💰 Highest Volume"
            coins={topVolume}
            category="volume"
            loading={isLoading || loading}
          />
        </div>

        {/* Exchange Prices Table */}
        <ExchangePricesTable
          coinPricesData={coinPricesData.slice(0, 8)}
          loading={isLoading || loading}
        />
      </div>
    </DataSection>
  );
};

export default LivePricesAcrossExchanges;