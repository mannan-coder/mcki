import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { formatPrice, formatVolume } from '@/utils/priceFormatters';
import { usePriceHistory, TimeframeType } from '@/hooks/usePriceHistory';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface EnhancedCoinChartProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    currentPrice: number;
    priceChangePercentage24h: number;
    ath?: number;
    atl?: number;
  };
  loading?: boolean;
}

const timeframes: { value: TimeframeType; label: string }[] = [
  { value: '1d', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '3M' },
  { value: '1y', label: '1Y' },
  { value: 'max', label: 'MAX' },
];

export const EnhancedCoinChart = ({ coin, loading: coinLoading }: EnhancedCoinChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>('7d');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { data: priceHistory, loading: historyLoading, setTimeframe } = usePriceHistory(
    coin.id, 
    selectedTimeframe
  );

  const chartData = useMemo(() => {
    if (!priceHistory?.prices || !priceHistory?.volumes) return [];
    
    return priceHistory.prices.map((pricePoint, index) => {
      const volumePoint = priceHistory.volumes[index];
      const timestamp = pricePoint.time;
      const date = new Date(timestamp);
      
      return {
        time: timestamp,
        price: pricePoint.price,
        volume: volumePoint?.volume || 0,
        formattedPrice: formatPrice(pricePoint.price),
        formattedVolume: formatVolume(volumePoint?.volume || 0),
        date: date.toLocaleDateString(),
        displayDate: selectedTimeframe === '1d' 
          ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date
      };
    });
  }, [priceHistory, selectedTimeframe]);

  const chartStats = useMemo(() => {
    if (!priceHistory?.priceRange || chartData.length === 0) return null;
    
    const volumes = chartData.map(d => d.volume);
    const maxVolume = Math.max(...volumes);
    
    return {
      priceRange: priceHistory.priceRange,
      maxVolume,
      dataLength: chartData.length
    };
  }, [priceHistory, chartData]);

  const isPositive = coin.priceChangePercentage24h >= 0;
  const lineColor = isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))';

  const handleTimeframeChange = (timeframe: TimeframeType) => {
    setSelectedTimeframe(timeframe);
    setTimeframe(timeframe);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && chartData[0]) {
      const dataPoint = chartData.find(d => d.time === label) || chartData[0];
      
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl"
        >
          <div className="space-y-2">
            <div className="font-semibold text-foreground">
              {formatPrice(payload[0]?.value || dataPoint.price)}
            </div>
            {payload[1] && (
              <div className="text-sm text-muted-foreground">
                Volume: {formatVolume(payload[1].value)}
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              {dataPoint.displayDate}
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  if (coinLoading) {
    return (
      <Card className="mb-6 lg:mb-8">
        <CardHeader className="pb-3">
          <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-muted rounded animate-pulse mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64 lg:h-96 bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="mb-6 lg:mb-8 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="h-5 w-5" />
                {coin.name} Price Chart
              </CardTitle>
              
              {/* Current Price and 24h Range */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-4">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    {formatPrice(coin.currentPrice)}
                  </div>
                  <div className={`flex items-center gap-1 font-medium ${
                    isPositive ? 'text-success' : 'text-destructive'
                  }`}>
                    {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(coin.priceChangePercentage24h).toFixed(2)}%
                  </div>
                </div>
                
                {/* Price Range Bar */}
                {chartStats?.priceRange && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>24h Range</span>
                      <span>{formatPrice(chartStats.priceRange.low)} - {formatPrice(chartStats.priceRange.high)}</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 bg-gradient-to-r from-destructive/20 via-muted-foreground/30 to-success/20 rounded-full"
                        style={{
                          left: '0%',
                          right: '0%'
                        }}
                      />
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-foreground rounded-full"
                        style={{
                          left: `${Math.max(0, Math.min(100, 
                            ((coin.currentPrice - chartStats.priceRange.low) / 
                            (chartStats.priceRange.high - chartStats.priceRange.low)) * 100
                          ))}%`,
                          transform: 'translateX(-50%)'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeframe Buttons */}
            <div className="flex flex-wrap gap-1">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe.value}
                  variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimeframeChange(timeframe.value)}
                  className="h-8 px-3 text-xs font-medium"
                  disabled={historyLoading}
                >
                  {timeframe.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 lg:p-6">
          {historyLoading ? (
            <div className="h-64 lg:h-96 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-muted-foreground">Loading chart data...</span>
              </div>
            </div>
          ) : chartData.length > 0 ? (
            <div className="space-y-4">
              {/* Main Chart */}
              <div className="h-64 lg:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ 
                      top: 20, 
                      right: isMobile ? 10 : 30, 
                      left: isMobile ? 10 : 30, 
                      bottom: 60 
                    }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="hsl(var(--border))" 
                      opacity={0.3}
                    />
                    <XAxis 
                      dataKey="time"
                      type="number"
                      scale="time"
                      domain={['dataMin', 'dataMax']}
                      tickFormatter={(value) => {
                        const dataPoint = chartData.find(d => d.time === value);
                        return dataPoint?.displayDate || '';
                      }}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      yAxisId="price"
                      orientation="right"
                      tickFormatter={(value) => formatPrice(value, true)}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={isMobile ? 60 : 80}
                    />
                    <YAxis 
                      yAxisId="volume"
                      orientation="left"
                      tickFormatter={(value) => formatVolume(value).replace('$', '')}
                      tick={{ fontSize: isMobile ? 9 : 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={isMobile ? 40 : 60}
                      domain={[0, chartStats?.maxVolume || 'dataMax']}
                    />
                    
                    <Tooltip 
                      content={<CustomTooltip />}
                      cursor={{ 
                        stroke: 'hsl(var(--muted-foreground))', 
                        strokeWidth: 1,
                        strokeDasharray: '3 3'
                      }}
                    />

                    {/* Current Price Reference Line */}
                    <ReferenceLine 
                      yAxisId="price"
                      y={coin.currentPrice} 
                      stroke="hsl(var(--primary))" 
                      strokeDasharray="4 4" 
                      strokeWidth={1}
                    />

                    {/* Volume Bars */}
                    <Bar
                      yAxisId="volume"
                      dataKey="volume"
                      fill="hsl(var(--muted-foreground))"
                      opacity={0.3}
                      radius={[1, 1, 0, 0]}
                    />

                    {/* Price Line */}
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      stroke={lineColor}
                      strokeWidth={isMobile ? 2 : 3}
                      dot={false}
                      activeDot={{ 
                        r: isMobile ? 4 : 5, 
                        fill: lineColor,
                        strokeWidth: 2,
                        stroke: 'hsl(var(--background))'
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Stats */}
              {chartStats?.priceRange && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">High</div>
                    <div className="font-semibold text-success">
                      {formatPrice(chartStats.priceRange.high)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Low</div>
                    <div className="font-semibold text-destructive">
                      {formatPrice(chartStats.priceRange.low)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Change</div>
                    <div className={`font-semibold ${
                      chartStats.priceRange.changePercent >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {chartStats.priceRange.changePercent >= 0 ? '+' : ''}
                      {chartStats.priceRange.changePercent.toFixed(2)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Period</div>
                    <Badge variant="outline" className="font-medium">
                      {timeframes.find(t => t.value === selectedTimeframe)?.label}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 lg:h-96 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-lg font-medium mb-1">No chart data available</p>
                <p className="text-sm">Try selecting a different timeframe</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};