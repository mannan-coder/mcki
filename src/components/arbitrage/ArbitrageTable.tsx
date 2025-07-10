import { DataTable } from '@/components/common/DataTable';
import { getArbitrageTableColumns } from './ArbitrageTableColumns';
import { MobileArbitrageCard } from './MobileArbitrageCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArbitrageTableProps {
  opportunities: any[];
  loading: boolean;
  limit?: number;
}

export const ArbitrageTable = ({ opportunities, loading, limit }: ArbitrageTableProps) => {
  const isMobile = useIsMobile();
  const tableColumns = getArbitrageTableColumns();
  const displayOpportunities = limit ? opportunities.slice(0, limit) : opportunities;

  if (loading) {
    return (
      <div className="space-y-4">
        {isMobile ? (
          // Mobile loading cards
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-6 h-6 bg-muted rounded-full"></div>
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-3 bg-muted rounded w-16"></div>
                  <div className="h-2 bg-muted rounded w-24"></div>
                </div>
                <div className="h-6 w-12 bg-muted rounded-full"></div>
              </div>
              <div className="h-12 bg-muted rounded-lg mb-3"></div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-muted rounded"></div>
                <div className="h-8 w-16 bg-muted rounded-lg"></div>
              </div>
            </div>
          ))
        ) : (
          // Desktop loading table
          <DataTable
            data={[]}
            columns={tableColumns}
            loading={true}
            emptyMessage="Loading arbitrage opportunities..."
          />
        )}
      </div>
    );
  }

  if (displayOpportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-sm">
          No arbitrage opportunities available at the moment
        </div>
      </div>
    );
  }

  return (
    <div>
      {isMobile ? (
        // Mobile Card Layout
        <div className="space-y-3">
          {displayOpportunities.map((opportunity, index) => (
            <MobileArbitrageCard
              key={`${opportunity.pair}-${opportunity.buyExchange}-${opportunity.sellExchange}-${index}`}
              opportunity={opportunity}
              index={index}
            />
          ))}
        </div>
      ) : (
        // Desktop Table Layout
        <DataTable
          data={displayOpportunities}
          columns={tableColumns}
          loading={false}
          emptyMessage="No arbitrage opportunities available at the moment"
        />
      )}
    </div>
  );
};