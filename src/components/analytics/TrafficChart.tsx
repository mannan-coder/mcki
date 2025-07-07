import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

interface TrafficData {
  date: string;
  visitors: number;
  pageviews: number;
  sessions: number;
}

interface TrafficChartProps {
  data: TrafficData[];
}

const TrafficChart = ({ data }: TrafficChartProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Website Traffic Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
              color: "hsl(var(--primary))",
            },
            pageviews: {
              label: "Page Views", 
              color: "hsl(var(--success))",
            },
            sessions: {
              label: "Sessions",
              color: "hsl(var(--accent))",
            },
          }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stackId="1"
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="pageviews" 
                stackId="2"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;