
import { useState, useEffect } from 'react';
import { ExternalLink, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import { DataSection } from '@/components/common/DataSection';
import { DataTable } from '@/components/common/DataTable';
import ArbitrageOpportunityRow from './arbitrage/ArbitrageOpportunityRow';
import ArbitrageStats from './arbitrage/ArbitrageStats';
import LivePricesAcrossExchanges from './arbitrage/LivePricesAcrossExchanges';

interface ArbitrageDashboardProps {
  isDarkMode: boolean;
}

const ArbitrageDashboard = ({ isDarkMode }: ArbitrageDashboardProps) => {
  const { data: arbitrageData, loading, refetch } = useArbitrageData();
  const [persistentOpportunities, setPersistentOpportunities] = useState<any[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  // Manage persistent opportunities with 60-second visibility
  useEffect(() => {
    if (arbitrageData?.arbitrageOpportunities) {
      const opportunities = arbitrageData.arbitrageOpportunities;
      const now = new Date();
      const newOpportunities = opportunities.map(opp => ({
        ...opp,
        addedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 60000).toISOString() // 60 seconds from now
      }));

      setPersistentOpportunities(prev => {
        // Remove expired opportunities
        const unexpired = prev.filter(opp => new Date(opp.expiresAt) > now);
        
        // Merge with new opportunities, avoiding duplicates
        const merged = [...unexpired];
        newOpportunities.forEach(newOpp => {
          const exists = merged.find(existing => 
            existing.pair === newOpp.pair && 
            existing.buyExchange === newOpp.buyExchange && 
            existing.sellExchange === newOpp.sellExchange
          );
          if (!exists) {
            merged.push(newOpp);
          }
        });
        
        return merged.sort((a, b) => b.spread - a.spread);
      });
      
      setLastUpdateTime(now);
    }
  }, [arbitrageData?.arbitrageOpportunities]);

  // Clean up expired opportunities every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setPersistentOpportunities(prev => 
        prev.filter(opp => new Date(opp.expiresAt) > now)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };

  const opportunities = persistentOpportunities;
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const handleRefresh = () => {
    refetch();
  };

  // Prepare table columns for the new DataTable component
  const tableColumns = [
    {
      key: 'rank',
      header: '#',
      className: 'text-center',
      render: (_: any, __: any, index: number) => (
        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
          {index + 1}
        </div>
      )
    },
    {
      key: 'asset',
      header: 'Asset',
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            {row.pair.split('-')[0].slice(0, 2)}
          </div>
          <div>
            <div className="font-medium text-foreground">{row.pair.split('-')[0]}</div>
            <div className="text-xs text-muted-foreground">{row.pair}</div>
          </div>
        </div>
      )
    },
    {
      key: 'buyExchange',
      header: 'Buy From',
      className: 'text-center',
      render: (value: any, row: any) => (
        <div className="text-sm font-medium text-success">{row.buyExchange}</div>
      )
    },
    {
      key: 'arrow',
      header: '→',
      className: 'text-center',
      render: () => <span className="text-muted-foreground">→</span>
    },
    {
      key: 'sellExchange',
      header: 'Sell To',
      className: 'text-center',
      render: (value: any, row: any) => (
        <div className="text-sm font-medium text-destructive">{row.sellExchange}</div>
      )
    },
    {
      key: 'spread',
      header: 'Spread',
      className: 'text-center',
      render: (value: any, row: any) => (
        <div className="text-sm font-bold text-warning">{row.spread.toFixed(2)}%</div>
      )
    },
    {
      key: 'profitPotential',
      header: 'Profit',
      className: 'text-center',
      render: (value: any, row: any) => (
        <div className="text-sm font-bold text-success">${row.profitPotential?.toFixed(2) || 'N/A'}</div>
      )
    },
    {
      key: 'lastUpdated',
      header: 'Updated',
      className: 'text-center',
      render: (value: any, row: any) => (
        <div className="text-xs text-muted-foreground">
          {getTimeAgo(row.addedAt || row.lastUpdated)}
        </div>
      )
    },
    {
      key: 'action',
      header: 'Action',
      className: 'text-center',
      render: () => (
        <button className="px-2 py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20 transition-colors">
          Trade
        </button>
      )
    }
  ];

  return (
    <DataSection
      title="Live Arbitrage Opportunities"
      subtitle={`Real-time profit opportunities across exchanges - Updated every 15 seconds`}
      icon={<Target className="h-6 w-6 text-primary" />}
      onRefresh={handleRefresh}
      isLoading={loading}
      className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6"
      headerActions={
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-medium">{opportunities.length} Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-primary font-medium">Avg: {stats.avgSpread?.toFixed(2)}%</span>
            </div>
          </div>
          <Link 
            to="/arbitrage"
            className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <span>Analysis</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      }
    >
      <DataTable
        data={opportunities}
        columns={tableColumns}
        loading={loading && !arbitrageData}
        emptyMessage="No arbitrage opportunities available at the moment"
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
