
import { TrendingUp, TrendingDown, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { motion } from 'framer-motion';

interface OnChainAnalysisProps {
  loading?: boolean;
}

const OnChainAnalysis = ({ loading = false }: OnChainAnalysisProps) => {
  const onChainData = {
    walletGrowth: {
      daily: '+12,485',
      weekly: '+87,231',
      change: '+5.2%'
    },
    whaleMovements: [
      { type: 'buy', amount: '1,250 BTC', exchange: 'Unknown → Binance', time: '2h ago' },
      { type: 'sell', amount: '892 ETH', exchange: 'Coinbase → Unknown', time: '4h ago' },
      { type: 'buy', amount: '45,000 SOL', exchange: 'Unknown → Kraken', time: '6h ago' },
    ],
    exchangeFlows: {
      inflow: '$2.1B',
      outflow: '$1.8B',
      netFlow: '+$300M'
    }
  };

  const statsData = [
    {
      label: 'Daily New Wallets',
      value: onChainData.walletGrowth.daily,
      change: onChainData.walletGrowth.change,
      trend: 'up' as const,
      icon: <Users className="h-5 w-5" />
    },
    {
      label: 'Weekly Growth',
      value: onChainData.walletGrowth.weekly,
      change: '+5.2%',
      trend: 'up' as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      label: 'Exchange Inflow',
      value: onChainData.exchangeFlows.inflow,
      change: '-8.5%',
      trend: 'down' as const,
      icon: <TrendingDown className="h-5 w-5" />
    },
    {
      label: 'Net Flow',
      value: onChainData.exchangeFlows.netFlow,
      change: '+12.3%',
      trend: 'up' as const,
      icon: <Activity className="h-5 w-5" />
    }
  ];

  if (loading) {
    return (
      <DataSection
        title="On-Chain Analysis"
        subtitle="Advanced blockchain data and whale tracking"
        icon={<Activity className="h-6 w-6 text-primary" />}
        headerActions={
          <Link 
            to="/analytics"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            View Analytics
          </Link>
        }
      >
        <div className="space-y-6">
          <StatsGrid stats={[]} loading={true} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </ResponsiveCard>
            
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                <div className="h-32 bg-muted/30 rounded animate-pulse"></div>
              </div>
            </ResponsiveCard>
          </div>
        </div>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="On-Chain Analysis"
      subtitle="Advanced blockchain data and whale tracking"
      icon={<Activity className="h-6 w-6 text-primary" />}
      headerActions={
        <Link 
          to="/analytics"
          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
        >
          View Analytics
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <StatsGrid stats={statsData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Growth Trends */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Wallet Growth Trends</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">{onChainData.walletGrowth.daily}</div>
                  <div className="text-sm text-muted-foreground">Daily New</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{onChainData.walletGrowth.weekly}</div>
                  <div className="text-sm text-muted-foreground">Weekly Total</div>
                </div>
              </div>

              {/* Growth Chart */}
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-end space-x-1 h-20 mb-2">
                  {[65, 72, 58, 89, 94, 78, 95].map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-t from-success to-success/60 rounded-t flex-1"
                      style={{ height: `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">Last 7 days wallet activity</div>
              </div>
            </div>
          </ResponsiveCard>

          {/* Exchange Flows */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Exchange Flows (24h)</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-foreground">Inflow</span>
                  </div>
                  <span className="font-semibold text-destructive">{onChainData.exchangeFlows.inflow}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-foreground">Outflow</span>
                  </div>
                  <span className="font-semibold text-success">{onChainData.exchangeFlows.outflow}</span>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Net Flow</span>
                    <span className="text-lg font-bold text-success">{onChainData.exchangeFlows.netFlow}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Positive net flow indicates accumulation
                  </p>
                </div>
              </div>
            </div>
          </ResponsiveCard>
        </div>

        {/* Whale Movements */}
        <ResponsiveCard>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <span>🐋</span>
              <span>Whale Movements</span>
            </h3>

            <div className="space-y-3">
              {onChainData.whaleMovements.map((movement, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      movement.type === 'buy' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-destructive/20 text-destructive'
                    }`}>
                      {movement.type === 'buy' ? 
                        <TrendingUp className="h-4 w-4" /> : 
                        <TrendingDown className="h-4 w-4" />
                      }
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {movement.type === 'buy' ? 'Large Buy' : 'Large Sell'}: {movement.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">{movement.exchange}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{movement.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </DataSection>
  );
};

export default OnChainAnalysis;
