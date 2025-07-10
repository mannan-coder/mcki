import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataTable } from '@/components/common/DataTable';

interface OpportunitiesSectionProps {
  formattedData: any[];
  columns: any[];
}

export const OpportunitiesSection = ({ formattedData, columns }: OpportunitiesSectionProps) => {
  return (
    <div className="w-full">
      <ResponsiveCard>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Live Opportunities</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
          
          <DataTable
            data={formattedData}
            columns={columns}
            emptyMessage="No arbitrage opportunities found"
          />
        </div>
      </ResponsiveCard>
    </div>
  );
};