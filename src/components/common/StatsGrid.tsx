import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveCard } from './ResponsiveCard';

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  description?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4 | 6;
  loading?: boolean;
  className?: string;
}

export const StatsGrid = ({
  stats,
  columns = 4,
  loading = false,
  className = ""
}: StatsGridProps) => {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-3 sm:gap-4 ${className}`}>
        {Array.from({ length: columns }).map((_, index) => (
          <ResponsiveCard key={index} size="sm">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-8 bg-muted rounded animate-pulse"></div>
              <div className="h-3 bg-muted/60 rounded animate-pulse"></div>
            </div>
          </ResponsiveCard>
        ))}
      </div>
    );
  }

  const getChangeColor = (type?: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3 sm:gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ResponsiveCard size="sm" className="h-full">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                {stat.icon}
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-lg sm:text-xl font-bold text-foreground">
                  {stat.value}
                </span>
                {stat.change && (
                  <span className={`text-xs font-medium ${getChangeColor(stat.changeType)}`}>
                    {stat.change}
                  </span>
                )}
              </div>
              
              {stat.description && (
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              )}
            </div>
          </ResponsiveCard>
        </motion.div>
      ))}
    </div>
  );
};