
import { motion } from 'framer-motion';
import { OptimizedMarketSignalCards } from '@/components/market/OptimizedMarketSignalCards';
import { useOptimizedMarketOverview } from '@/hooks/useOptimizedMarketOverview';

interface OptimizedLiveMarketSignalsSectionProps {
  loading?: boolean;
}

export const OptimizedLiveMarketSignalsSection = ({ loading }: OptimizedLiveMarketSignalsSectionProps) => {
  const { data: marketData, isLoading } = useOptimizedMarketOverview();

  if (isLoading || loading) {
    return (
      <section className="space-y-6">
        <div className="text-center">
          <div className="h-8 w-64 bg-muted rounded animate-pulse mx-auto mb-2"></div>
          <div className="h-4 w-96 bg-muted rounded animate-pulse mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="h-8 w-8 bg-muted rounded animate-pulse mx-auto mb-1"></div>
              <div className="h-3 w-16 bg-muted rounded animate-pulse mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!marketData) {
    return null;
  }

  return (
    <motion.section 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <OptimizedMarketSignalCards coins={marketData.coins} />
    </motion.section>
  );
};
