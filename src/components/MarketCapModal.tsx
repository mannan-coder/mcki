import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';

interface MarketCapModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  marketData: any;
}

const MarketCapModal = ({ isOpen, onClose, isDarkMode, marketData }: MarketCapModalProps) => {
  const [timeframe, setTimeframe] = useState('7d');

  // Generate sample data for different timeframes
  const generateChartData = (days: number) => {
    const data = [];
    const baseValue = marketData.totalMarketCap;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const value = baseValue * (1 + variation);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: value,
        volume: (Math.random() * 200 + 100) * 1e9, // Random volume
        timestamp: date.getTime(),
      });
    }
    
    return data;
  };

  const getChartData = () => {
    switch (timeframe) {
      case '24h': return generateChartData(1);
      case '7d': return generateChartData(7);
      case '14d': return generateChartData(14);
      case '1m': return generateChartData(30);
      case '3m': return generateChartData(90);
      case 'Max': return generateChartData(365);
      default: return generateChartData(7);
    }
  };

  const chartData = getChartData();
  const currentValue = chartData[chartData.length - 1]?.value || marketData.totalMarketCap;
  const previousValue = chartData[chartData.length - 2]?.value || marketData.totalMarketCap;
  const change = ((currentValue - previousValue) / previousValue) * 100;

  const formatValue = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  const timeframes = [
    { key: '24h', label: '24h' },
    { key: '7d', label: '7d' },
    { key: '14d', label: '14d' },
    { key: '1m', label: '1m' },
    { key: '3m', label: '3m' },
    { key: 'Max', label: 'Max' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl h-[80vh] ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Total Cryptocurrency Market Cap Chart
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 space-y-6">
          {/* Market Cap Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Current Market Cap
              </div>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatValue(currentValue)}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Coins Tracked
              </div>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketData.activeCryptocurrencies?.toLocaleString() || '17,581'}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Exchanges
              </div>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketData.markets?.toLocaleString() || '1,308'}
              </div>
            </div>
          </div>

          {/* Time Period Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {timeframes.map((tf) => (
                <Button
                  key={tf.key}
                  variant={timeframe === tf.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf.key)}
                  className="h-8 px-3"
                >
                  {tf.label}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8 px-3">
                <Calendar size={16} className="mr-1" />
                Custom
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-3">
                <Download size={16} className="mr-1" />
                Export
              </Button>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ChartContainer
              config={{
                value: { label: "Market Cap", color: "#10b981" },
                volume: { label: "Volume", color: "#3b82f6" }
              }}
              className="h-96"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="marketCapGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date"
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis 
                    tickFormatter={formatValue}
                    domain={['dataMin * 0.95', 'dataMax * 1.05']}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: any) => [formatValue(value), "Market Cap"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#marketCapGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Market Dominance */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Market Dominance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bitcoin</div>
                <div className="text-orange-500 font-bold">{marketData.btcDominance?.toFixed(1)}%</div>
              </div>
              <div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ethereum</div>
                <div className="text-blue-500 font-bold">
                  {((marketData.coins?.find((c: any) => c.symbol === 'ETH')?.marketCap / marketData.totalMarketCap * 100) || 18.2).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Others</div>
                <div className="text-gray-500 font-bold">
                  {(100 - marketData.btcDominance - ((marketData.coins?.find((c: any) => c.symbol === 'ETH')?.marketCap / marketData.totalMarketCap * 100) || 18.2)).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Stablecoins</div>
                <div className="text-green-500 font-bold">7.3%</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarketCapModal;