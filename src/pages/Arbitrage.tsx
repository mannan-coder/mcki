import { useState } from 'react';
import Layout from '@/components/Layout';
import { useArbitrageData } from '@/hooks/useArbitrageData';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { DataTable } from '@/components/common/DataTable';
import { TrendingUp, DollarSign, Activity, RefreshCw, Building2, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCoinLogoById } from '@/utils/coinLogos';

const ArbitragePage = () => {
  const { data: arbitrageData, loading, refetch } = useArbitrageData();

  // Use live data from the API - show all opportunities on arbitrage page
  const opportunities = arbitrageData?.arbitrageOpportunities || [];
  const stats = arbitrageData?.marketMaking || { totalOpportunities: 0, avgSpread: 0, estimatedDailyVolume: 0 };

  const handleRefresh = async () => {
    await refetch();
  };

  const statsData = [
    {
      label: 'Active Opportunities',
      value: stats.totalOpportunities.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <Target className="h-5 w-5" />
    },
    {
      label: 'Average Spread',
      value: `${stats.avgSpread.toFixed(2)}%`,
      change: '-0.3%',
      trend: 'down' as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      label: 'Est. Daily Volume',
      value: `$${(stats.estimatedDailyVolume / 1000000).toFixed(1)}M`,
      change: '+8.7%',
      trend: 'up' as const,
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      label: 'Exchanges Monitored',
      value: '15',
      change: '0%',
      trend: 'neutral' as const,
      icon: <Building2 className="h-5 w-5" />
    }
  ];

  const exchangeData = [
    { name: 'Binance', volume: '$2.1B', spread: '0.02%', status: 'Online' },
    { name: 'Coinbase', volume: '$1.8B', spread: '0.04%', status: 'Online' },
    { name: 'Kraken', volume: '$890M', spread: '0.06%', status: 'Online' },
    { name: 'OKX', volume: '$1.2B', spread: '0.03%', status: 'Online' }
  ];

  const formatOpportunityData = () => {
    return opportunities.map((opp: any) => ({
      coin: opp.coin || opp.pair?.split('-')[0] || 'Unknown',
      pair: opp.pair,
      buyExchange: opp.buyExchange,
      sellExchange: opp.sellExchange,
      buyPrice: `$${opp.buyPrice?.toFixed(2) || '0.00'}`,
      sellPrice: `$${opp.sellPrice?.toFixed(2) || '0.00'}`,
      spread: `${opp.spread?.toFixed(2) || '0.00'}%`,
      profit: `$${opp.estimatedProfit?.toFixed(2) || '0.00'}`,
      volume: `$${(opp.volume24h / 1000000)?.toFixed(1) || '0.0'}M`
    }));
  };

  const opportunityColumns = [
    { 
      key: 'coin', 
      header: 'Coin', 
      sortable: true,
      render: (value: string, row: any) => {
        const coinSymbol = row.coin.toLowerCase();
        const coinLogo = getCoinLogoById(coinSymbol);
        return (
          <div className="flex items-center space-x-3">
            <img 
              src={coinLogo} 
              alt={row.coin}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div>
              <div className="font-semibold text-foreground">{row.coin}</div>
              <div className="text-sm text-muted-foreground">{row.pair}</div>
            </div>
          </div>
        );
      }
    },
    { key: 'buyExchange', header: 'Buy Exchange', sortable: true },
    { key: 'sellExchange', header: 'Sell Exchange', sortable: true },
    { key: 'buyPrice', header: 'Buy Price', sortable: true },
    { key: 'sellPrice', header: 'Sell Price', sortable: true },
    { key: 'spread', header: 'Spread', sortable: true },
    { key: 'profit', header: 'Est. Profit', sortable: true },
    { key: 'volume', header: '24h Volume', sortable: true }
  ];

  const exchangeColumns = [
    { key: 'name', header: 'Exchange', sortable: true },
    { key: 'volume', header: '24h Volume', sortable: true },
    { key: 'spread', header: 'Avg Spread', sortable: true },
    { key: 'status', header: 'Status', sortable: false }
  ];

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
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResponsiveCard>
                    <div className="space-y-4">
                      <div className="h-6 bg-muted rounded animate-pulse"></div>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex justify-between p-4 border-b border-border/50 last:border-b-0">
                          <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                          <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </ResponsiveCard>
                </div>
                
                <ResponsiveCard>
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex justify-between p-3">
                        <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </ResponsiveCard>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Opportunities Table */}
              <div className="lg:col-span-2">
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
                      data={formatOpportunityData()}
                      columns={opportunityColumns}
                      emptyMessage="No arbitrage opportunities found"
                    />
                  </div>
                </ResponsiveCard>
              </div>

              {/* Exchange Status */}
              <ResponsiveCard>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Exchange Status</h3>
                  
                  <div className="space-y-3">
                    {exchangeData.map((exchange, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div>
                          <div className="font-medium text-foreground">{exchange.name}</div>
                          <div className="text-sm text-muted-foreground">{exchange.volume}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">{exchange.spread}</div>
                          <div className="text-xs">
                            <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">
                              {exchange.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ResponsiveCard>
            </div>
          </div>
        </DataSection>
      </div>
    </Layout>
  );
};

export default ArbitragePage;