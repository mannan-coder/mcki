import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Download, ArrowLeft } from 'lucide-react';
import { useCryptoData } from '@/hooks/useCryptoData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MarketCapDetails = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');
  const { data: marketData } = useCryptoData();

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
  const generateChartData = (days: number) => {
    const data = [];
    const baseValue = marketData.totalMarketCap;
    const baseVolume = marketData.totalVolume;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const value = baseValue * (1 + variation);
      const volume = baseVolume * (1 + (Math.random() - 0.5) * 0.2); // ±10% volume variation
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: value,
        volume: volume,
        btcDominance: marketData.btcDominance + (Math.random() - 0.5) * 5,
        ethDominance: ((marketData.coins?.find((c: any) => c.symbol === 'ETH')?.marketCap / marketData.totalMarketCap * 100) || 18.2) + (Math.random() - 0.5) * 3,
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
                Total Cryptocurrency Market Cap Chart
              </h1>
            </div>
          </div>

          {/* Market Cap Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Current Market Cap
              </div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {formatValue(currentValue)}
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
                Total Coins Tracked
              </div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {marketData.activeCryptocurrencies?.toLocaleString() || '17,581'}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active cryptocurrencies
              </div>
            </div>
            
            <div className={`p-6 rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Total Exchanges
              </div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {marketData.markets?.toLocaleString() || '1,308'}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Exchanges tracked
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
                value: { label: "Market Cap", color: "#10b981" },
                volume: { label: "Volume", color: "#3b82f6" },
                btcDominance: { label: "BTC Dominance", color: "#f59e0b" }
              }}
              className="h-96"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
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
                    yAxisId="left"
                    tickFormatter={formatValue}
                    domain={['dataMin * 0.95', 'dataMax * 1.05']}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={formatValue}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: any, name: string) => [formatValue(value), name]}
                  />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#marketCapGradient)"
                    name="Market Cap"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="volume" 
                    fill="#3b82f6"
                    name="Volume"
                    opacity={0.3}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Market Cap Breakdown */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Market Cap by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Layer 1</div>
                <div className="text-2xl font-bold text-blue-500 mb-1">{formatValue(currentValue * 0.45)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>45%</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>DeFi</div>
                <div className="text-2xl font-bold text-green-500 mb-1">{formatValue(currentValue * 0.25)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>25%</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>NFT/Gaming</div>
                <div className="text-2xl font-bold text-purple-500 mb-1">{formatValue(currentValue * 0.15)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>15%</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Others</div>
                <div className="text-2xl font-bold text-gray-500 mb-1">{formatValue(currentValue * 0.15)}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>15%</div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default MarketCapDetails;