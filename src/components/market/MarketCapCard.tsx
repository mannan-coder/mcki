import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area } from 'recharts';
import { generateUniqueId } from '@/utils/idGenerator';

interface MarketCapCardProps {
  isDarkMode: boolean;
  totalMarketCap: string;
  marketCapValue: number;
}

export const MarketCapCard = ({ isDarkMode, totalMarketCap, marketCapValue }: MarketCapCardProps) => {
  const gradientId = useMemo(() => generateUniqueId('marketCapGradient'), []);
  const navigate = useNavigate();

  const chartData = [
    { time: 0, value: marketCapValue * 0.97 },
    { time: 1, value: marketCapValue * 0.98 },
    { time: 2, value: marketCapValue * 0.99 },
    { time: 3, value: marketCapValue * 1.01 },
    { time: 4, value: marketCapValue * 1.02 },
    { time: 5, value: marketCapValue * 1.029 },
    { time: 6, value: marketCapValue }
  ];

  return (
    <motion.div 
      className="p-3 rounded-lg border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:scale-[1.01] bg-card/80 border-border/50 hover:bg-card/90"
      onClick={() => navigate('/market-cap-details')}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-gradient-to-r from-success to-success/80 rounded-md">
            <TrendingUp className="text-white" size={12} />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">
              Market Cap
            </div>
            <div className="text-base sm:text-lg font-bold text-foreground">
              {totalMarketCap}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-success text-sm font-medium">+2.9%</div>
          <div className="text-xs text-muted-foreground">
            24h
          </div>
        </div>
      </div>
      
      <div className="h-10 sm:h-12 -mx-1 mb-2">
        <ChartContainer
          config={{
            value: { label: "Market Cap", color: "#10b981" }
          }}
          className="h-full"
        >
          <AreaChart
            data={chartData}
            margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </div>
      
      <div className="flex items-center justify-end space-x-1 text-xs text-muted-foreground">
        <ExternalLink size={10} />
        <span>Details</span>
      </div>
    </motion.div>
  );
};