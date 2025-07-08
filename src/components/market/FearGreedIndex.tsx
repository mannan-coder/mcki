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
      className="p-3 rounded-lg border backdrop-blur-sm bg-card/80 border-border/50"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Ultra-Compact Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground">
          Fear & Greed Index
        </h3>
        <div className="flex items-center gap-1.5">
          <div className={`text-base font-bold ${getFearGreedColor(fearGreedIndex)}`}>
            {fearGreedIndex}
          </div>
          <div className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getFearGreedColor(fearGreedIndex)} ${
            fearGreedIndex >= 75 ? 'bg-success/20' :
            fearGreedIndex >= 50 ? 'bg-warning/20' :
            fearGreedIndex >= 25 ? 'bg-warning/20' : 'bg-destructive/20'
          }`}>
            {getFearGreedLabel(fearGreedIndex)}
          </div>
        </div>
      </div>
      
      {/* Ultra-Compact Progress Bar */}
      <div className="mb-2">
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div 
            className={`h-full rounded-full transition-all duration-1000 ${
              fearGreedIndex >= 75 ? 'bg-gradient-to-r from-success to-success/80' :
              fearGreedIndex >= 50 ? 'bg-gradient-to-r from-warning to-warning/80' :
              fearGreedIndex >= 25 ? 'bg-gradient-to-r from-warning to-warning/80' : 'bg-gradient-to-r from-destructive to-destructive/80'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${fearGreedIndex}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-muted-foreground">Fear</span>
          <span className="text-muted-foreground">Greed</span>
        </div>
      </div>
      
      {/* Ultra-Compact Chart */}
      <div className="h-8 sm:h-10 mb-2">
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
              fill={fearGreedIndex >= 75 ? 'hsl(var(--success))' :
                   fearGreedIndex >= 50 ? 'hsl(var(--warning))' :
                   fearGreedIndex >= 25 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'}
              radius={[1, 1, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      
      {/* Ultra-Compact Historical Data */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">
            7d: {historicalData.weekAgo}
          </span>
          <span className="text-muted-foreground">
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