import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { DataSection } from '@/components/common/DataSection';
import { useLivePricesData } from '@/hooks/useLivePricesData';
import { ExchangePricesTable } from '../live-prices/ExchangePricesTable';

interface LivePricesAcrossExchangesProps {
  loading?: boolean;
}

const LivePricesAcrossExchanges = ({ loading = false }: LivePricesAcrossExchangesProps) => {
  const { 
    coinPricesData, 
    isLoading, 
    refetch 
  } = useLivePricesData();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <DataSection
      title="Live Prices Across Exchanges"
      subtitle="Real-time cryptocurrency exchange rates across major trading platforms"
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
        {/* Exchange Prices Table */}
        <ExchangePricesTable
          coinPricesData={coinPricesData.slice(0, 10)}
          loading={isLoading || loading}
        />
      </div>
    </DataSection>
  );
};

export default LivePricesAcrossExchanges;