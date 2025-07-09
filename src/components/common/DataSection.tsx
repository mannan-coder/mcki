import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface DataSectionProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
  headerActions?: ReactNode;
}

export const DataSection = ({
  title,
  subtitle,
  icon,
  children,
  onRefresh,
  isLoading = false,
  className = "",
  headerActions
}: DataSectionProps) => {
  return (
    <motion.section
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            {icon}
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {headerActions}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          )}
        </div>
      </div>
      
      {children}
    </motion.section>
  );
};