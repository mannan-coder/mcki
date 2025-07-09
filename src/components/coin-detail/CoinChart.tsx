import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { formatPrice } from '@/utils/priceFormatters';

interface CoinChartProps {
  coin: {
    name: string;
    symbol: string;
    sparkline?: number[];
    currentPrice: number;
    priceChangePercentage24h: number;
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

  // Transform sparkline data for the chart
  const chartData = coin.sparkline?.map((price, index) => ({
    time: index,
    price: price,
    formattedPrice: formatPrice(price)
  })) || [];

  const isPositive = coin.priceChangePercentage24h >= 0;
  const lineColor = isPositive ? '#22c55e' : '#ef4444';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">
            {formatPrice(payload[0].value)}
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
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Current: {formatPrice(coin.currentPrice)}</span>
            <span className={`flex items-center gap-1 ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {isPositive ? '↗' : '↘'} {Math.abs(coin.priceChangePercentage24h).toFixed(2)}% (24h)
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="time" 
                    hide
                  />
                  <YAxis 
                    domain={['dataMin', 'dataMax']}
                    hide
                  />
                  <Tooltip content={<CustomTooltip />} />
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
                      stroke: '#ffffff'
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