import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Activity } from 'lucide-react';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { motion } from 'framer-motion';
import { useWhaleData } from '@/hooks/useWhaleData';
import { getTimeAgo } from '@/utils/timeUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface WhaleMovementsSectionProps {
  loading?: boolean;
}

export const WhaleMovementsSection = ({ loading = false }: WhaleMovementsSectionProps) => {
  const { data: whaleData, loading: whaleLoading } = useWhaleData();
  const navigate = useNavigate();

  const whaleStats = [
    {
      label: 'Large Transfers (24h)',
      value: whaleData?.whaleTransactions?.length?.toString() || '15',
      change: '+25%',
      trend: 'up' as const,
      icon: <Activity className="h-5 w-5" />
    },
    {
      label: 'Exchange Inflows',
      value: whaleData?.exchangeFlows?.bitcoin?.totalInflow || '$1.2B',
      change: '+15.2%',
      trend: 'up' as const,
      icon: <ArrowDownLeft className="h-5 w-5" />
    },
    {
      label: 'Exchange Outflows',
      value: whaleData?.exchangeFlows?.bitcoin?.totalOutflow || '$0.8B',
      change: '-8.3%',
      trend: 'down' as const,
      icon: <ArrowUpRight className="h-5 w-5" />
    },
    {
      label: 'Net Flow',
      value: whaleData?.exchangeFlows?.bitcoin?.netFlow || '+$400M',
      change: whaleData?.exchangeFlows?.bitcoin?.change24h || '+15.2%',
      trend: 'up' as const,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const getStatusIcon = (status: string) => {
    return status === 'inflow' ? 
      <ArrowDownLeft className="h-4 w-4 text-destructive" /> : 
      <ArrowUpRight className="h-4 w-4 text-success" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  if (loading || whaleLoading) {
    return (
      <DataSection
        title="Whale Movements"
        subtitle="Track large cryptocurrency transfers and exchange flows"
        icon={<Activity className="h-6 w-6 text-primary" />}
      >
        <div className="space-y-6">
          <StatsGrid stats={[]} loading={true} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between p-3">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </ResponsiveCard>
            
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between p-3">
                    <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </ResponsiveCard>
          </div>
        </div>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="Whale Movements"
      subtitle="Track large cryptocurrency transfers and exchange flows"
      icon={<Activity className="h-6 w-6 text-primary" />}
    >
      <div className="space-y-6">
        <StatsGrid stats={whaleStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Whale Transactions */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Recent Large Transfers</h3>
              </div>

              <div className="space-y-3">
                {(whaleData?.whaleTransactions || []).slice(0, 5).map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      navigate(`/whale-detail/${transaction.id}`);
                      toast.success(`Opening whale transaction details`);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground text-sm">{transaction.amount}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactColor(transaction.impact)}`}>
                            {transaction.impact.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.from} → {transaction.to}
                        </div>
                        <div className="text-xs font-medium text-foreground">
                          {transaction.usdValue}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getTimeAgo(transaction.time)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ResponsiveCard>

          {/* Exchange Flows */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Exchange Flows (24h)</h3>
              </div>

              <div className="space-y-4">
                {/* Bitcoin Flow */}
                <div className="p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Bitcoin (BTC)</span>
                    <span className={`text-sm ${
                      whaleData?.exchangeFlows?.bitcoin?.trend === 'bullish' ? 'text-success' : 'text-destructive'
                    }`}>
                      {whaleData?.exchangeFlows?.bitcoin?.netFlow}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Inflow: {whaleData?.exchangeFlows?.bitcoin?.totalInflow}</span>
                    <span>Outflow: {whaleData?.exchangeFlows?.bitcoin?.totalOutflow}</span>
                  </div>
                </div>

                {/* Ethereum Flow */}
                <div className="p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Ethereum (ETH)</span>
                    <span className={`text-sm ${
                      whaleData?.exchangeFlows?.ethereum?.trend === 'bullish' ? 'text-success' : 'text-destructive'
                    }`}>
                      {whaleData?.exchangeFlows?.ethereum?.netFlow}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Inflow: {whaleData?.exchangeFlows?.ethereum?.totalInflow}</span>
                    <span>Outflow: {whaleData?.exchangeFlows?.ethereum?.totalOutflow}</span>
                  </div>
                </div>

                {/* Top Exchanges */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Top Exchanges by Flow</h4>
                  <div className="space-y-2">
                    {(whaleData?.exchangeFlows?.exchanges || []).map((exchange, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{exchange.name}</span>
                        <span className={`font-medium ${
                          exchange.netFlow.startsWith('+') ? 'text-success' : 'text-destructive'
                        }`}>
                          {exchange.netFlow}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveCard>
        </div>
      </div>
    </DataSection>
  );
};