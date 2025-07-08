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
      className={`p-4 rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Fear & Greed Index
        </h3>
        <div className={`text-2xl font-bold ${getFearGreedColor(fearGreedIndex)}`}>
          {fearGreedIndex}
        </div>
      </div>
      
      <div className="mb-4">
        <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              fearGreedIndex >= 75 ? 'bg-green-500' :
              fearGreedIndex >= 50 ? 'bg-yellow-500' :
              fearGreedIndex >= 25 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${fearGreedIndex}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Extreme Fear</span>
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Extreme Greed</span>
        </div>
      </div>
      
      <div className="h-12 mb-4">
        <ChartContainer
          config={{
            fearGreed: { label: "Fear & Greed Index", color: getFearGreedColor(fearGreedIndex).replace('text-', '') }
          }}
          className="h-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
          >
            <Bar
              dataKey="value"
              fill={fearGreedIndex >= 75 ? '#10b981' :
                   fearGreedIndex >= 50 ? '#f59e0b' :
                   fearGreedIndex >= 25 ? '#f97316' : '#ef4444'}
              radius={[1, 1, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${getFearGreedColor(fearGreedIndex)}`}>
          {getFearGreedLabel(fearGreedIndex)}
        </span>
        <div className="flex items-center space-x-3 text-xs">
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            7d: {historicalData.weekAgo}
          </span>
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            30d: {historicalData.monthAgo}
          </span>
        </div>
      </div>
    </motion.div>
  );
};