import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PageData {
  page: string;
  views: number;
  percentage: number;
  avgTime: string;
}

interface TopPagesProps {
  pages: PageData[];
}

const TopPages = ({ pages }: TopPagesProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-sm">{page.page}</div>
                <div className="text-xs text-muted-foreground">Avg. time: {page.avgTime}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">{formatNumber(page.views)}</div>
                <div className="text-xs text-muted-foreground">{page.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPages;