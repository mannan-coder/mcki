import { Users, Activity } from 'lucide-react';
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
      monthly: '+324,567',
      growth_rate: '+5.2%',
      peak_daily: '18,942',
      avg_daily: '11,234'
    },
    network: {
      active_addresses: '2.4M',
      new_addresses: '+12,485',
      transaction_volume: '$847M',
      gas_fees: '15.2 Gwei'
    }
  };

  const statsData = [
    {
      label: 'Daily New Wallets',
      value: onChainData.walletGrowth.daily,
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: <Users className="h-4 w-4" />,
      description: `Peak: ${onChainData.walletGrowth.peak_daily}`
    },
    {
      label: 'Weekly Growth',
      value: onChainData.walletGrowth.weekly,
      change: '+8.1%',
      changeType: 'positive' as const,
      icon: <Activity className="h-4 w-4" />,
      description: `Avg: ${onChainData.walletGrowth.avg_daily}/day`
    },
    {
      label: 'Active Addresses',
      value: onChainData.network.active_addresses,
      change: '+3.4%',
      changeType: 'positive' as const,
      icon: <Users className="h-4 w-4" />,
      description: 'Last 24h'
    },
    {
      label: 'Transaction Volume',
      value: onChainData.network.transaction_volume,
      change: '+12.7%',
      changeType: 'positive' as const,
      icon: <Activity className="h-4 w-4" />,
      description: 'Daily volume'
    }
  ];

  if (loading) {
    return (
      <DataSection
        title="On-Chain Analysis"
        subtitle="Advanced blockchain data and wallet tracking"
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
        </div>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="On-Chain Analysis"
      subtitle="Advanced blockchain data and wallet tracking"
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
        {/* Key Metrics Grid */}
        <StatsGrid stats={statsData} columns={4} />
        
        {/* Unified Wallet Growth Analysis Card */}
        <ResponsiveCard>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Wallet Growth Trends</h3>
                  <p className="text-sm text-muted-foreground">Live on-chain analytics</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-success">+{onChainData.walletGrowth.growth_rate}</div>
                <div className="text-xs text-muted-foreground">Growth Rate</div>
              </div>
            </div>
            
            {/* Growth Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
                <div className="text-2xl font-bold text-success">{onChainData.walletGrowth.daily}</div>
                <div className="text-sm text-muted-foreground">Daily New Wallets</div>
                <div className="text-xs text-success mt-1">Peak: {onChainData.walletGrowth.peak_daily}</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">{onChainData.walletGrowth.weekly}</div>
                <div className="text-sm text-muted-foreground">Weekly Growth</div>
                <div className="text-xs text-primary mt-1">Avg: {onChainData.walletGrowth.avg_daily}/day</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                <div className="text-2xl font-bold text-accent">{onChainData.walletGrowth.monthly}</div>
                <div className="text-sm text-muted-foreground">Monthly Total</div>
                <div className="text-xs text-accent mt-1">+{onChainData.walletGrowth.growth_rate} vs last month</div>
              </div>
            </div>

            {/* Interactive Growth Chart */}
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-foreground">7-Day Wallet Activity</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span>Daily wallets</span>
                </div>
              </div>
              <div className="flex items-end space-x-1 h-24 mb-2">
                {[65, 72, 58, 89, 94, 78, 95].map((height, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-t from-success to-success/60 rounded-t flex-1 hover:from-success/80 hover:to-success/40 transition-colors cursor-pointer"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>7d ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </DataSection>
  );
};

export default OnChainAnalysis;