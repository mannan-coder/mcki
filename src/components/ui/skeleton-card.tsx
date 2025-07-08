import { motion } from 'framer-motion';

interface SkeletonCardProps {
  isDarkMode: boolean;
  className?: string;
}

export const SkeletonCard = ({ isDarkMode, className = "" }: SkeletonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-4 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      } ${className}`}
    >
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-lg"></div>
            <div>
              <div className="h-4 w-20 bg-muted rounded mb-1"></div>
              <div className="h-6 w-16 bg-muted rounded"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-4 w-12 bg-muted rounded mb-1"></div>
            <div className="h-3 w-16 bg-muted/60 rounded"></div>
          </div>
        </div>
        
        <div className="h-16 bg-muted/30 rounded mb-2"></div>
        
        <div className="flex items-center justify-end space-x-1">
          <div className="h-3 w-3 bg-muted rounded"></div>
          <div className="h-3 w-24 bg-muted rounded"></div>
        </div>
      </div>
    </motion.div>
  );
};

export const SkeletonMetricCard = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-4 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
    >
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-8 w-12 bg-muted rounded"></div>
        </div>
        
        <div className="mb-4">
          <div className="w-full h-3 bg-muted rounded-full mb-2"></div>
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-muted/60 rounded"></div>
            <div className="h-3 w-16 bg-muted/60 rounded"></div>
          </div>
        </div>
        
        <div className="h-12 bg-muted/30 rounded mb-4"></div>
        
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-muted rounded"></div>
          <div className="flex items-center space-x-3">
            <div className="h-3 w-12 bg-muted/60 rounded"></div>
            <div className="h-3 w-12 bg-muted/60 rounded"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SkeletonSidebarCard = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
    >
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-24 bg-muted rounded"></div>
          <div className="h-4 w-16 bg-muted rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-12 bg-muted rounded mb-1"></div>
                <div className="h-3 w-16 bg-muted/60 rounded"></div>
              </div>
              <div className="h-4 w-12 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};