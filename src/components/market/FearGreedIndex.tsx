import { motion } from 'framer-motion';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar } from 'recharts';

interface FearGreedIndexProps {
  isDarkMode: boolean;
  fearGreedIndex: number;
  historicalData: {
    weekAgo: number;
    yesterday: number;
    monthAgo: number;
  };
}

export const FearGreedIndex = ({ isDarkMode, fearGreedIndex, historicalData }: FearGreedIndexProps) => {
  const getFearGreedColor = (value: number) => {
    if (value >= 75) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    if (value >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getFearGreedLabel = (value: number) => {
    if (value >= 75) return 'Extreme Greed';
    if (value >= 55) return 'Greed';
    if (value >= 45) return 'Neutral';
    if (value >= 25) return 'Fear';
    return 'Extreme Fear';
  };

  const chartData = [
    { period: '7d', value: historicalData.weekAgo },
    { period: '6d', value: historicalData.weekAgo + 3 },
    { period: '5d', value: historicalData.weekAgo - 2 },
    { period: '4d', value: historicalData.weekAgo + 5 },
    { period: '3d', value: historicalData.weekAgo - 1 },
    { period: '2d', value: historicalData.yesterday + 2 },
    { period: '1d', value: historicalData.yesterday },
    { period: 'Now', value: fearGreedIndex }
  ];

  return (
    <motion.div 
      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Fear & Greed Index
        </h3>
        <div className="flex items-center gap-2">
          <div className={`text-lg sm:text-xl font-bold ${getFearGreedColor(fearGreedIndex)}`}>
            {fearGreedIndex}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFearGreedColor(fearGreedIndex)} ${
            fearGreedIndex >= 75 ? 'bg-green-500/20' :
            fearGreedIndex >= 50 ? 'bg-yellow-500/20' :
            fearGreedIndex >= 25 ? 'bg-orange-500/20' : 'bg-red-500/20'
          }`}>
            {getFearGreedLabel(fearGreedIndex)}
          </div>
        </div>
      </div>
      
      {/* Compact Progress Bar */}
      <div className="mb-3">
        <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
          <motion.div 
            className={`h-full rounded-full transition-all duration-1000 ${
              fearGreedIndex >= 75 ? 'bg-gradient-to-r from-green-400 to-green-600' :
              fearGreedIndex >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
              fearGreedIndex >= 25 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-red-400 to-red-600'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${fearGreedIndex}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fear</span>
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Greed</span>
        </div>
      </div>
      
      {/* Compact Chart */}
      <div className="h-10 sm:h-12 mb-3">
        <ChartContainer
          config={{
            fearGreed: { label: "Fear & Greed Index", color: getFearGreedColor(fearGreedIndex).replace('text-', '') }
          }}
          className="h-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 1, right: 1, left: 1, bottom: 1 }}
          >
            <Bar
              dataKey="value"
              fill={fearGreedIndex >= 75 ? '#10b981' :
                   fearGreedIndex >= 50 ? '#f59e0b' :
                   fearGreedIndex >= 25 ? '#f97316' : '#ef4444'}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      
      {/* Compact Historical Data */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center space-x-3">
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            7d: {historicalData.weekAgo}
          </span>
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            30d: {historicalData.monthAgo}
          </span>
        </div>
        <span className={`${getFearGreedColor(fearGreedIndex)} font-medium`}>
          {fearGreedIndex}/100
        </span>
      </div>
    </motion.div>
  );
};