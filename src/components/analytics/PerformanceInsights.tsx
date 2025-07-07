import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PerformanceInsights = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Performance Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="text-2xl font-bold text-success">94</div>
            <div className="text-sm text-muted-foreground">Page Speed Score</div>
            <Badge variant="secondary" className="mt-2">Excellent</Badge>
          </div>
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="text-2xl font-bold text-primary">1.2s</div>
            <div className="text-sm text-muted-foreground">Avg. Load Time</div>
            <Badge variant="secondary" className="mt-2">Good</Badge>
          </div>
          <div className="text-center p-4 border border-border rounded-lg">
            <div className="text-2xl font-bold text-success">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
            <Badge variant="secondary" className="mt-2">Excellent</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceInsights;