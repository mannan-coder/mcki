import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { formatPrice } from '@/utils/priceFormatters';
import { useMemo, useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CoinChartProps {
  coin: {
    name: string;
    symbol: string;
    sparkline?: number[];
    currentPrice: number;
    priceChangePercentage24h: number;
    ath?: number;
    atl?: number;
  };
  loading?: boolean;
}

export const CoinChart = ({ coin, loading }: CoinChartProps) => {
  // Mobile detection hook
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize chart data processing for performance
  const chartData = useMemo(() => {
    if (!coin.sparkline || coin.sparkline.length === 0) return [];
    
    return coin.sparkline.map((price, index) => {
      const hoursAgo = 168 - (index * (168 / coin.sparkline!.length)); // 7 days = 168 hours
      const date = new Date();
      date.setHours(date.getHours() - hoursAgo);
      
      return {
        time: index,
        price: price,
        formattedPrice: formatPrice(price),
        date: date.toLocaleDateString(),
        hour: date.getHours(),
        fullDate: date,
        displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
    });
  }, [coin.sparkline]);

  // Memoize calculations for performance
  const chartStats = useMemo(() => {
    if (chartData.length === 0) return null;
    
    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.05; // Reduced padding for better mobile view
    
    return {
      minPrice,
      maxPrice,
      priceRange,
      padding,
      domain: [minPrice - padding, maxPrice + padding]
    };
  }, [chartData]);

  const isPositive = coin.priceChangePercentage24h >= 0;
  const lineColor = isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))';

  if (loading) {
    return (
      <Card className="mb-6 lg:mb-8">
        <CardHeader className="pb-3">
          <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-muted rounded animate-pulse mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64 lg:h-80 bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Enhanced mobile-friendly tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && chartData[label]) {
      const data = chartData[label];
      const change = chartData.length > 1 ? 
        ((payload[0].value - chartData[0].price) / chartData[0].price * 100) : 0;
      
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl max-w-xs"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="font-semibold text-foreground text-base">
              {formatPrice(payload[0].value)}
            </div>
            {change !== 0 && (
              <div className={`flex items-center gap-1 text-xs ${
                change >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(change).toFixed(2)}%
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {data.displayDate} • {data.hour.toString().padStart(2, '0')}:00
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="mb-6 lg:mb-8 hover:shadow-lg transition-all duration-300 touch-manipulation">
        <CardHeader className="pb-3 lg:pb-4">
          <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
            📈 Price Chart (7 Days)
          </CardTitle>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Current:</span>
              <span className="font-semibold text-foreground">{formatPrice(coin.currentPrice)}</span>
            </div>
            <div className={`flex items-center gap-1 font-medium ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(coin.priceChangePercentage24h).toFixed(2)}% (24h)
            </div>
            {coin.ath && (
              <div className="flex items-center gap-2 text-xs lg:text-sm">
                <span className="text-muted-foreground">ATH:</span>
                <span className="font-medium">{formatPrice(coin.ath)}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          {chartData.length > 0 ? (
            <div className="h-48 sm:h-64 lg:h-80 w-full touch-pan-x">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData} 
                  margin={{ 
                    top: 10, 
                    right: isMobile ? 10 : 20, 
                    left: isMobile ? 10 : 20, 
                    bottom: 10 
                  }}
                >
                  <XAxis 
                    dataKey="time"
                    type="number"
                    scale="linear"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => {
                      const data = chartData[Math.floor(value)];
                      if (!data) return '';
                      
                      // Show fewer ticks on mobile
                      if (isMobile && value % Math.ceil(chartData.length / 3) !== 0) return '';
                      
                      return data.displayDate;
                    }}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    domain={chartStats?.domain || ['dataMin', 'dataMax']}
                    tickFormatter={(value) => formatPrice(value, true)}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={isMobile ? 60 : 80}
                    tickCount={isMobile ? 4 : 6}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ 
                      stroke: 'hsl(var(--muted-foreground))', 
                      strokeWidth: 1,
                      strokeDasharray: '3 3'
                    }}
                    allowEscapeViewBox={{ x: false, y: true }}
                  />
                  {coin.currentPrice && chartStats && (
                    <ReferenceLine 
                      y={coin.currentPrice} 
                      stroke="hsl(var(--primary))" 
                      strokeDasharray="4 4" 
                      strokeWidth={1.5}
                      label={{ 
                        value: "Current", 
                        position: "right",
                        fontSize: 10,
                        fill: 'hsl(var(--muted-foreground))'
                      }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={lineColor}
                    strokeWidth={isMobile ? 1.5 : 2}
                    dot={false}
                    activeDot={{ 
                      r: isMobile ? 3 : 4, 
                      fill: lineColor,
                      strokeWidth: 2,
                      stroke: 'hsl(var(--background))',
                      filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.3))'
                    }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-48 sm:h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl mb-2">📊</div>
                <p className="text-sm lg:text-base">Chart data not available</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Price history will appear when available</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};