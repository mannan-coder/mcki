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
      className="p-3 rounded-lg border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:scale-[1.01] bg-card/80 border-border/50 hover:bg-card/90"
      onClick={() => navigate('/volume-details')}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-gradient-to-r from-primary to-primary/80 rounded-md">
            <Activity className="text-white" size={12} />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">
              24h Volume
            </div>
            <div className="text-base sm:text-lg font-bold text-foreground">
              {totalVolume}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-destructive text-sm font-medium">-1.5%</div>
          <div className="text-xs text-muted-foreground">
            24h
          </div>
        </div>
      </div>
      
      <div className="h-10 sm:h-12 -mx-1 mb-2">
        <ChartContainer
          config={{
            volume: { label: "Volume", color: "#3b82f6" }
          }}
          className="h-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
          >
            <Bar
              dataKey="volume"
              fill="#3b82f6"
              radius={[1, 1, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      
      <div className="flex items-center justify-end space-x-1 text-xs text-muted-foreground">
        <BarChart3 size={10} />
        <span>Details</span>
      </div>
    </motion.div>
  );
};