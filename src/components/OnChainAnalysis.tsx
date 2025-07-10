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
      change: '+5.2%'
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
      icon: <Activity className="h-5 w-5" />
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
        {/* Key Metrics */}
        <StatsGrid stats={statsData} />
        
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
      </div>
    </DataSection>
  );
};

export default OnChainAnalysis;