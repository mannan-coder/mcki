import { DataTable } from '@/components/common/DataTable';
import { getArbitrageTableColumns } from './ArbitrageTableColumns';

interface ArbitrageTableProps {
  opportunities: any[];
  loading: boolean;
  limit?: number;
}

export const ArbitrageTable = ({ opportunities, loading, limit }: ArbitrageTableProps) => {
  const tableColumns = getArbitrageTableColumns();
  const displayOpportunities = limit ? opportunities.slice(0, limit) : opportunities;

  return (
    <DataTable
      data={displayOpportunities}
      columns={tableColumns}
      loading={loading}
      emptyMessage="No arbitrage opportunities available at the moment"
    />
  );
};