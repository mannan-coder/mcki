import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { DataSection } from '@/components/common/DataSection';
import { useLivePricesData } from '@/hooks/useLivePricesData';
import { StabilizedExchangePricesTable } from '../live-prices/StabilizedExchangePricesTable';
import { useToast } from '@/hooks/use-toast';

interface LivePricesAcrossExchangesProps {
  loading?: boolean;
}

const LivePricesAcrossExchanges = ({ loading = false }: LivePricesAcrossExchangesProps) => {
  const { 
    coinPricesData, 
    isLoading, 
    refetch 
  } = useLivePricesData();
  const { toast } = useToast();

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Prices Updated",
      description: "Live exchange prices have been refreshed successfully.",
    });
  };

  return (
    <div id="live-prices">
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
            View Full Analysis
          </Link>
        }
      >
      <div className="space-y-6">
        {/* Exchange Prices Table */}
        <StabilizedExchangePricesTable
          coinPricesData={coinPricesData.slice(0, 10)}
          loading={isLoading || loading}
        />
      </div>
    </DataSection>
    </div>
  );
};

export default LivePricesAcrossExchanges;