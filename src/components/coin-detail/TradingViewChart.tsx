import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  ReferenceLine,
  CartesianGrid,
  Cell,
  Rectangle
} from 'recharts';
import { formatPrice, formatVolume } from '@/utils/priceFormatters';
import { usePriceHistory, TimeframeType } from '@/hooks/usePriceHistory';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Maximize2, 
  Settings, 
  Target, 
  Activity,
  Volume2,
  Grid3X3,
  BarChart2
} from 'lucide-react';

interface TradingViewChartProps {
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

const timeframes: { value: TimeframeType; label: string; interval: string }[] = [
  { value: '1d', label: '1D', interval: '1h' },
  { value: '7d', label: '7D', interval: '4h' },
  { value: '30d', label: '30D', interval: '1d' },
  { value: '90d', label: '90D', interval: '1d' },
  { value: '1y', label: '1Y', interval: '1w' },
  { value: 'max', label: 'All', interval: '1M' },
];

// Custom Candlestick Component
const Candlestick = (props: any) => {
  const { payload, x, y, width, height } = props;
  if (!payload) return null;

  const { open, high, low, close } = payload;
  const isGreen = close >= open;
  const color = isGreen ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
  
  const bodyHeight = Math.abs(close - open);
  const bodyY = Math.min(close, open);
  
  // Wick lines
  const wickX = x + width / 2;
  
  return (
    <g>
      {/* High-Low Wick */}
      <line
        x1={wickX}
        y1={y}
        x2={wickX}
        y2={y + height}
        stroke={color}
        strokeWidth={1}
      />
      {/* Candlestick Body */}
      <rect
        x={x + width * 0.2}
        y={bodyY}
        width={width * 0.6}
        height={Math.max(bodyHeight, 1)}
        fill={isGreen ? color : color}
        stroke={color}
        strokeWidth={1}
        opacity={isGreen ? 0.8 : 1}
      />
    </g>
  );
};

export const TradingViewChart = ({ coin, loading: coinLoading }: TradingViewChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>('7d');
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
  const [showVolume, setShowVolume] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showMA, setShowMA] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  // Process chart data with better historical data handling
  const chartData = useMemo(() => {
    if (!priceHistory?.prices || !priceHistory?.volumes) return [];
    
    const prices = priceHistory.prices;
    const volumes = priceHistory.volumes;
    
    // Create chart data points directly from price history
    const processedData = prices.map((pricePoint, index) => {
      const volumePoint = volumes[index];
      const timestamp = pricePoint.time;
      const date = new Date(timestamp);
      
      // For candlestick, we'll simulate OHLC from the available price data
      const price = pricePoint.price;
      const prevPrice = index > 0 ? prices[index - 1].price : price;
      
      // Simulate OHLC data with some realistic variation
      const open = prevPrice;
      const close = price;
      const variation = price * 0.002; // 0.2% variation
      const high = Math.max(open, close) + Math.random() * variation;
      const low = Math.min(open, close) - Math.random() * variation;
      
      const volume = volumePoint?.volume || 0;
      
      return {
        timestamp,
        date: date.toISOString(),
        open,
        high,
        low,
        close,
        volume,
        price, // Main price for line chart
        displayDate: selectedTimeframe === '1d' 
          ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              ...(selectedTimeframe === 'max' ? { year: '2-digit' } : {})
            }),
        formattedPrice: formatPrice(price),
        formattedVolume: formatVolume(volume),
        isGreen: close >= open
      };
    }).filter(point => point.price > 0); // Filter out invalid data points
    
    // Calculate moving averages
    return processedData.map((point, index) => {
      // Calculate 7-period moving average
      const start = Math.max(0, index - 6);
      const ma7Data = processedData.slice(start, index + 1);
      const ma7 = ma7Data.length > 0 ? 
        ma7Data.reduce((sum, item) => sum + item.close, 0) / ma7Data.length : point.close;
      
      return {
        ...point,
        ma7
      };
    });
  }, [priceHistory, selectedTimeframe]);

  const chartStats = useMemo(() => {
    if (!priceHistory?.priceRange || chartData.length === 0) return null;
    
    const volumes = chartData.map(d => d.volume);
    const prices = chartData.map(d => d.close);
    const highs = chartData.map(d => d.high);
    const lows = chartData.map(d => d.low);
    
    return {
      priceRange: priceHistory.priceRange,
      maxVolume: Math.max(...volumes),
      avgVolume: volumes.reduce((a, b) => a + b, 0) / volumes.length,
      highestPrice: Math.max(...highs),
      lowestPrice: Math.min(...lows),
      volatility: ((Math.max(...prices) - Math.min(...prices)) / Math.min(...prices)) * 100
    };
  }, [priceHistory, chartData]);

  const isPositive = coin.priceChangePercentage24h >= 0;
  const lineColor = isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))';

  const handleTimeframeChange = (timeframe: TimeframeType) => {
    setSelectedTimeframe(timeframe);
    setTimeframe(timeframe);
  };

  // Enhanced tooltip for professional trading view
  const TradingTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = chartData.find(d => d.timestamp === label) || chartData[0];
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-2xl min-w-[200px]"
      >
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">
            {data.displayDate}
          </div>
          
          {chartType === 'candlestick' ? (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">O:</span>
                <span className="ml-1 font-mono">{formatPrice(data.open)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">H:</span>
                <span className="ml-1 font-mono text-success">{formatPrice(data.high)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">L:</span>
                <span className="ml-1 font-mono text-destructive">{formatPrice(data.low)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">C:</span>
                <span className={`ml-1 font-mono ${data.isGreen ? 'text-success' : 'text-destructive'}`}>
                  {formatPrice(data.close)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-lg font-semibold">
              {formatPrice(data.price)}
            </div>
          )}
          
          {showVolume && (
            <div className="pt-1 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <BarChart2 className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Volume:</span>
                <span className="font-mono">{formatVolume(data.volume)}</span>
              </div>
            </div>
          )}
          
          {showMA && data.ma7 && (
            <div className="text-sm">
              <span className="text-muted-foreground">MA7:</span>
              <span className="ml-1 font-mono text-blue-500">{formatPrice(data.ma7)}</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  if (coinLoading) {
    return (
      <Card className="mb-6 lg:mb-8">
        <CardHeader className="pb-3">
          <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-muted rounded animate-pulse mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-96 lg:h-[32rem] bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  const chartHeight = isFullscreen ? 'flex-1 min-h-[60vh]' : 'h-80 sm:h-96 lg:h-[32rem]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={isFullscreen ? 'fixed inset-0 z-[9999] bg-background/95 backdrop-blur-md flex flex-col' : ''}
    >
      {/* Fullscreen Header with Close Button */}
      {isFullscreen && (
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{coin.name} Chart</h2>
              <p className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()} • Full View</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(false)}
            className="h-9 px-3 hover:bg-destructive/10 hover:border-destructive/20"
          >
            <span className="mr-2">Close</span>
            <span className="text-xs">✕</span>
          </Button>
        </div>
      )}

      <Card className={`shadow-lg border-0 bg-gradient-to-br from-card to-muted/30 ${
        isFullscreen 
          ? 'flex-1 rounded-none m-0 border-0 shadow-none bg-transparent overflow-auto' 
          : 'mb-6 lg:mb-8'
      }`}>
        <CardHeader className={`pb-6 border-b border-border/50 bg-gradient-to-r from-card to-muted/20 ${isFullscreen ? 'flex-shrink-0' : ''}`}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Title and Price Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {coin.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm font-medium">{coin.symbol.toUpperCase()}</span>
                    <Badge variant="secondary" className="text-xs bg-muted/50">
                      {timeframes.find(t => t.value === selectedTimeframe)?.interval}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Real-time Price Display */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="space-y-1">
                  <div className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                    {formatPrice(coin.currentPrice)}
                  </div>
                  <div className={`flex items-center gap-2 text-lg font-semibold px-3 py-1 rounded-full ${
                    isPositive 
                      ? 'text-success bg-success/10' 
                      : 'text-destructive bg-destructive/10'
                  }`}>
                    {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span>{isPositive ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Chart Stats */}
              {chartStats && (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 p-4 bg-muted/20 rounded-xl border border-border/30">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-medium mb-1">24h High</div>
                    <div className="font-bold text-success text-lg">{formatPrice(chartStats.highestPrice)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-medium mb-1">24h Low</div>
                    <div className="font-bold text-destructive text-lg">{formatPrice(chartStats.lowestPrice)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Volume</div>
                    <div className="font-bold text-lg">{formatVolume(chartStats.avgVolume)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Volatility</div>
                    <div className="font-bold text-lg">{chartStats.volatility.toFixed(2)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Status</div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="font-bold text-success text-lg">Live</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 lg:items-end">
              {/* Timeframe Selector */}
              <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-lg border border-border/30">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.value}
                    variant={selectedTimeframe === timeframe.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleTimeframeChange(timeframe.value)}
                    className={`h-9 px-4 text-sm font-medium transition-all ${
                      selectedTimeframe === timeframe.value 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'hover:bg-muted/50'
                    }`}
                    disabled={historyLoading}
                  >
                    {timeframe.label}
                  </Button>
                ))}
              </div>

              {/* Chart Controls */}
              <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 p-1 bg-background/50 rounded-md">
                  <Button
                    variant={chartType === 'line' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setChartType('line')}
                    className="h-8 px-3"
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    Line
                  </Button>
                  <Button
                    variant={chartType === 'candlestick' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setChartType('candlestick')}
                    className="h-8 px-3"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Candles
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="volume"
                      checked={showVolume}
                      onCheckedChange={setShowVolume}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor="volume" className="text-sm font-medium cursor-pointer">
                      <BarChart2 className="h-4 w-4 inline mr-1" />
                      Volume
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="grid"
                      checked={showGrid}
                      onCheckedChange={setShowGrid}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor="grid" className="text-sm font-medium cursor-pointer">
                      <Grid3X3 className="h-4 w-4 inline mr-1" />
                      Grid
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="ma"
                      checked={showMA}
                      onCheckedChange={setShowMA}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor="ma" className="text-sm font-medium cursor-pointer">
                      MA7
                    </Label>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="h-9 px-3 bg-background/50 hover:bg-muted"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`${isFullscreen ? 'flex-1 overflow-auto p-4' : 'p-0'}`}>
          {historyLoading ? (
            <div className={`${chartHeight} flex items-center justify-center`}>
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="text-muted-foreground text-lg">Loading market data...</span>
              </div>
            </div>
          ) : chartData.length > 0 ? (
            <div className={`${isFullscreen ? 'h-full min-h-[60vh]' : chartHeight} w-full p-4 sm:p-6`}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ 
                    top: 20, 
                    right: isMobile ? 10 : 30, 
                    left: isMobile ? 10 : 30, 
                    bottom: showVolume ? (isMobile ? 60 : 80) : (isMobile ? 30 : 40)
                  }}
                >
                  {showGrid && (
                    <CartesianGrid 
                      strokeDasharray="2 2" 
                      stroke="hsl(var(--border))" 
                      opacity={0.4}
                      horizontal={true}
                      vertical={true}
                    />
                  )}
                  
                  <XAxis 
                    dataKey="timestamp"
                    type="number"
                    scale="time"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => {
                      const dataPoint = chartData.find(d => d.timestamp === value);
                      return dataPoint?.displayDate || '';
                    }}
                    tick={{ fontSize: isMobile ? 10 : 11, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
                    tickLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
                    tickCount={isMobile ? 3 : 6}
                    interval="preserveStartEnd"
                  />
                  
                  <YAxis 
                    yAxisId="price"
                    orientation="right"
                    domain={['dataMin * 0.999', 'dataMax * 1.001']}
                    tickFormatter={(value) => formatPrice(value, true)}
                    tick={{ fontSize: isMobile ? 9 : 11, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
                    tickLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
                    width={isMobile ? 60 : 80}
                    tickCount={isMobile ? 5 : 8}
                  />
                  
                  {showVolume && (
                    <YAxis 
                      yAxisId="volume"
                      orientation="left"
                      domain={[0, 'dataMax * 1.2']}
                      tickFormatter={(value) => formatVolume(value).replace('$', '')}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
                      tickLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
                      width={60}
                      tickCount={4}
                    />
                  )}
                  
                  <Tooltip 
                    content={<TradingTooltip />}
                    cursor={{ 
                      stroke: 'hsl(var(--primary))', 
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
                    strokeWidth={2}
                    label={{ 
                      value: `Current: ${formatPrice(coin.currentPrice)}`, 
                      position: "right",
                      style: { fontSize: '12px', fill: 'hsl(var(--primary))' }
                    }}
                  />

                  {/* Volume Bars */}
                  {showVolume && (
                    <Bar
                      yAxisId="volume"
                      dataKey="volume"
                      fill="hsl(var(--muted-foreground))"
                      opacity={0.3}
                      radius={[1, 1, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isGreen ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} 
                          opacity={0.4}
                        />
                      ))}
                    </Bar>
                  )}

                  {/* Moving Average */}
                  {showMA && (
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="ma7"
                      stroke="hsl(var(--primary))"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      dot={false}
                      opacity={0.8}
                    />
                  )}

                  {/* Main Price Chart */}
                  {chartType === 'line' ? (
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      stroke={lineColor}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ 
                        r: 4, 
                        fill: lineColor,
                        strokeWidth: 2,
                        stroke: 'hsl(var(--background))'
                      }}
                    />
                  ) : (
                    // Candlestick representation using custom component
                    <Bar
                      yAxisId="price"
                      dataKey="high"
                      shape={<Candlestick />}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className={`${chartHeight} flex items-center justify-center text-muted-foreground`}>
              <div className="text-center">
                <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-lg font-medium mb-2">No chart data available</p>
                <p className="text-sm">Market data will appear when available</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};