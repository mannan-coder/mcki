
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { DataSection } from '@/components/common/DataSection';
import { LiveArbitrageOpportunitiesTable } from '@/components/arbitrage/LiveArbitrageOpportunitiesTable';
import { useArbitrageData } from '@/hooks/useArbitrageData';

const LiveArbitrageSection = () => {
  const { data: arbitrageData, isLoading, error, refetch } = useArbitrageData();

  if (error) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <DataSection
        title="Live Arbitrage Opportunities"
        subtitle="Real-time profit opportunities across major exchanges"
        icon={<TrendingUp className="h-6 w-6 text-primary" />}
        className="space-y-6"
      >
        <LiveArbitrageOpportunitiesTable
          isDarkMode={true}
          opportunities={arbitrageData?.arbitrageOpportunities || []}
          loading={isLoading}
          onRefresh={refetch}
          stats={{
            avgSpread: arbitrageData?.marketMaking?.avgSpread || 0
          }}
        />
      </DataSection>
    </motion.section>
  );
};

export default LiveArbitrageSection;
