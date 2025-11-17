
import { motion } from 'framer-motion';
import { OptimizedMarketSignalCards } from '@/components/market/OptimizedMarketSignalCards';
import { useOptimizedMarketOverview } from '@/hooks/useOptimizedMarketOverview';

interface OptimizedLiveMarketSignalsSectionProps {
  loading?: boolean;
}

export const OptimizedLiveMarketSignalsSection = ({ loading }: OptimizedLiveMarketSignalsSectionProps) => {
  const { data: marketData, isLoading, isError } = useOptimizedMarketOverview();

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

  if (isError || !marketData) {
    return (
      <section className="space-y-6">
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Market Data Temporarily Unavailable
            </h3>
            <p className="text-muted-foreground">
              We're experiencing temporary connectivity issues. Please check back in a few minutes.
            </p>
          </div>
        </div>
      </section>
    );
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
