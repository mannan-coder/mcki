import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Download, ArrowLeft } from 'lucide-react';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VolumeDetails = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');
  const { data: marketData, isRealTime } = useOptimizedCryptoData(250, false);

  if (!marketData) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-4"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate sample data for different timeframes
  const generateVolumeData = (days: number) => {
    const data = [];
    const baseVolume = marketData.totalVolume;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
      const volume = baseVolume * (1 + variation);
      const spotVolume = volume * 0.7; // 70% spot trading
      const derivativesVolume = volume * 0.3; // 30% derivatives
      
      data.push({
        date: date.toISOString().split('T')[0],
        totalVolume: volume,
        spotVolume: spotVolume,
        derivativesVolume: derivativesVolume,
        timestamp: date.getTime(),
      });
    }
    
    return data;
  };

  const getChartData = () => {
    switch (timeframe) {
      case '24h': return generateVolumeData(1);
      case '7d': return generateVolumeData(7);
      case '14d': return generateVolumeData(14);
      case '1m': return generateVolumeData(30);
      case '3m': return generateVolumeData(90);
      case 'Max': return generateVolumeData(365);
      default: return generateVolumeData(7);
    }
  };

  const chartData = getChartData();
  const currentVolume = chartData[chartData.length - 1]?.totalVolume || marketData.totalVolume;
  const previousVolume = chartData[chartData.length - 2]?.totalVolume || marketData.totalVolume;
  const change = ((currentVolume - previousVolume) / previousVolume) * 100;

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
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to Dashboard</span>
              </Button>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Total Cryptocurrency Trading Volume Chart
              </h1>
            </div>
          </div>

          {/* Volume Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                24h Trading Volume
              </div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {formatValue(currentVolume)}
              </div>
              <div className={`flex items-center space-x-2 text-sm ${
                change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{change >= 0 ? '+' : ''}{change.toFixed(2)}%</span>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Spot Trading Volume
              </div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {formatValue(currentVolume * 0.7)}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                70% of total volume
              </div>
            </div>
            
            <div className={`p-6 rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Derivatives Volume
              </div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {formatValue(currentVolume * 0.3)}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                30% of total volume
              </div>
            </div>
          </div>

          {/* Time Period Selector */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              {timeframes.map((tf) => (
                <Button
                  key={tf.key}
                  variant={timeframe === tf.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf.key)}
                  className="h-9 px-4"
                >
                  {tf.label}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-9 px-4">
                <Calendar size={16} className="mr-2" />
                Custom
              </Button>
              <Button variant="outline" size="sm" className="h-9 px-4">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Chart */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } mb-8`}>
            <ChartContainer
              config={{
                totalVolume: { label: "Total Volume", color: "#ef4444" },
                spotVolume: { label: "Spot Volume", color: "#3b82f6" },
                derivativesVolume: { label: "Derivatives Volume", color: "#8b5cf6" }
              }}
              className="h-96"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
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
                    domain={['dataMin * 0.9', 'dataMax * 1.1']}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: any, name: string) => [formatValue(value), name]}
                  />
                  <Bar 
                    dataKey="spotVolume" 
                    fill="#3b82f6"
                    name="Spot Volume"
                    stackId="volume"
                  />
                  <Bar 
                    dataKey="derivativesVolume" 
                    fill="#8b5cf6"
                    name="Derivatives Volume"
                    stackId="volume"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalVolume" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Total Volume"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Volume Breakdown */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Top Exchanges by Volume (24h)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Binance</div>
                <div className="text-2xl font-bold text-yellow-500 mb-1">{formatValue(currentVolume * 0.25)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>25%</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Coinbase</div>
                <div className="text-2xl font-bold text-blue-500 mb-1">{formatValue(currentVolume * 0.18)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>18%</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Kraken</div>
                <div className="text-2xl font-bold text-purple-500 mb-1">{formatValue(currentVolume * 0.15)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>15%</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Others</div>
                <div className="text-2xl font-bold text-gray-500 mb-1">{formatValue(currentVolume * 0.42)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>42%</div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default VolumeDetails;