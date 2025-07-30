
import { motion } from 'framer-motion';
import LiveArbitrageOpportunitiesTable from '@/components/arbitrage/LiveArbitrageOpportunitiesTable';
import { useArbitrageData } from '@/hooks/useArbitrageData';

const LiveArbitrageSection = () => {
  const { data: arbitrageData, loading, error, refetch } = useArbitrageData();

  if (error) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <LiveArbitrageOpportunitiesTable
        isDarkMode={true}
        opportunities={arbitrageData?.arbitrageOpportunities || []}
        loading={loading}
        onRefresh={refetch}
        stats={{
          avgSpread: arbitrageData?.marketMaking?.avgSpread || 0,
          totalOpportunities: arbitrageData?.marketMaking?.totalOpportunities || 0
        }}
      />
    </motion.section>
  );
};

export default LiveArbitrageSection;
