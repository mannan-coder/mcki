import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { formatPrice } from '@/utils/priceFormatters';

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
  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Transform sparkline data for the chart with proper time intervals
  const chartData = coin.sparkline?.map((price, index) => {
    const hoursAgo = 168 - (index * (168 / coin.sparkline!.length)); // 7 days = 168 hours
    const date = new Date();
    date.setHours(date.getHours() - hoursAgo);
    
    return {
      time: index,
      price: price,
      formattedPrice: formatPrice(price),
      date: date.toLocaleDateString(),
      hour: date.getHours(),
      fullDate: date
    };
  }) || [];

  const isPositive = coin.priceChangePercentage24h >= 0;
  const lineColor = isPositive ? '#22c55e' : '#ef4444';
  
  // Calculate price range for better visualization
  const prices = chartData.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = chartData[label];
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">
            {formatPrice(payload[0].value)}
          </p>
          <p className="text-sm text-muted-foreground">
            {data?.date} {data?.hour}:00
          </p>
          <p className="text-xs text-muted-foreground">
            7-day trend
          </p>
        </div>
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
      <Card className="mb-8 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Price Chart (7 Days)
          </CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span>Current: <span className="font-semibold text-foreground">{formatPrice(coin.currentPrice)}</span></span>
            <span className={`flex items-center gap-1 font-medium ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {isPositive ? '↗' : '↘'} {Math.abs(coin.priceChangePercentage24h).toFixed(2)}% (24h)
            </span>
            {coin.ath && (
              <span className="text-xs">
                ATH: <span className="font-medium">{formatPrice(coin.ath)}</span>
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <XAxis 
                    dataKey="time"
                    type="number"
                    scale="linear"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => {
                      const data = chartData[Math.floor(value)];
                      return data ? data.date.split('/').slice(0, 2).join('/') : '';
                    }}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[minPrice - padding, maxPrice + padding]}
                    tickFormatter={(value) => formatPrice(value, true)}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {coin.currentPrice && (
                    <ReferenceLine 
                      y={coin.currentPrice} 
                      stroke="#6366f1" 
                      strokeDasharray="4 4" 
                      label={{ value: "Current", position: "right" }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={lineColor}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ 
                      r: 4, 
                      fill: lineColor,
                      strokeWidth: 2,
                      stroke: 'var(--background)'
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>Chart data not available</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};