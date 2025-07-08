import { motion } from 'framer-motion';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area } from 'recharts';

interface MarketCapCardProps {
  isDarkMode: boolean;
  totalMarketCap: string;
  marketCapValue: number;
}

export const MarketCapCard = ({ isDarkMode, totalMarketCap, marketCapValue }: MarketCapCardProps) => {
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
      className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80' 
          : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
      }`}
      onClick={() => navigate('/market-cap-details')}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <TrendingUp className="text-white" size={16} />
          </div>
          <div>
            <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Market Cap
            </div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {totalMarketCap}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-green-500 text-sm font-medium">+2.9%</div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            24h change
          </div>
        </div>
      </div>
      
      <div className="h-16 -mx-2">
        <ChartContainer
          config={{
            value: { label: "Market Cap", color: "#10b981" }
          }}
          className="h-full"
        >
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="marketCapMiniGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#marketCapMiniGradient)"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </div>
      
      <div className={`flex items-center justify-end space-x-1 text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <ExternalLink size={12} />
        <span>Click for detailed view</span>
      </div>
    </motion.div>
  );
};