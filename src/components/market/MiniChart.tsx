import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  sparkline?: number[];
  priceChangePercentage24h: number;
}

export const MiniChart = ({ sparkline, priceChangePercentage24h }: MiniChartProps) => {
  if (!sparkline || sparkline.length === 0) {
    return (
      <div className="w-20 h-12 flex items-center justify-center text-muted-foreground text-xs">
        No data
      </div>
    );
  }

  // Transform sparkline data for the mini chart
  const chartData = sparkline.map((price, index) => ({
    index,
    price: price
  }));

  const isPositive = priceChangePercentage24h >= 0;
  const lineColor = isPositive ? '#22c55e' : '#ef4444';

  return (
    <div className="w-20 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};