import { motion } from 'framer-motion';
import { Activity, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar } from 'recharts';

interface VolumeCardProps {
  isDarkMode: boolean;
  totalVolume: string;
  volumeValue: number;
}

export const VolumeCard = ({ isDarkMode, totalVolume, volumeValue }: VolumeCardProps) => {
  const navigate = useNavigate();

  const chartData = [
    { time: 0, volume: volumeValue * 1.05 },
    { time: 1, volume: volumeValue * 1.12 },
    { time: 2, volume: volumeValue * 0.98 },
    { time: 3, volume: volumeValue * 1.08 },
    { time: 4, volume: volumeValue * 0.92 },
    { time: 5, volume: volumeValue * 1.15 },
    { time: 6, volume: volumeValue * 0.95 },
    { time: 7, volume: volumeValue * 1.03 },
    { time: 8, volume: volumeValue * 1.07 },
    { time: 9, volume: volumeValue }
  ];

  return (
    <motion.div 
      className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80' 
          : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
      }`}
      onClick={() => navigate('/volume-details')}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
            <Activity className="text-white" size={16} />
          </div>
          <div>
            <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              24h Volume
            </div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {totalVolume}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-red-500 text-sm font-medium">-1.5%</div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            24h change
          </div>
        </div>
      </div>
      
      <div className="h-16 -mx-2">
        <ChartContainer
          config={{
            volume: { label: "Volume", color: "#3b82f6" }
          }}
          className="h-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <Bar
              dataKey="volume"
              fill="#3b82f6"
              radius={[1, 1, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      
      <div className={`flex items-center justify-end space-x-1 text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <BarChart3 size={12} />
        <span>Click for detailed view</span>
      </div>
    </motion.div>
  );
};