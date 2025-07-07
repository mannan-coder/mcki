import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SourceData {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

interface TrafficSourcesProps {
  sources: SourceData[];
}

const TrafficSources = ({ sources }: TrafficSourcesProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }}></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">{source.source}</span>
                  <span className="text-sm">{formatNumber(source.visitors)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${source.percentage}%`,
                      backgroundColor: source.color 
                    }}
                  ></div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{source.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSources;