import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { ExchangeStatusCard } from './ExchangeStatusCard';

interface ExchangeStatusSectionProps {
  exchangeData: Array<{
    name: string;
    volume: string;
    spread: string;
    status: string;
  }>;
}

export const ExchangeStatusSection = ({ exchangeData }: ExchangeStatusSectionProps) => {
  return (
    <ResponsiveCard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Exchange Status & Performance</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        
        {/* Exchange Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exchangeData.map((exchange, index) => (
            <ExchangeStatusCard 
              key={index}
              exchange={exchange}
              index={index}
            />
          ))}
        </div>
        
        {/* Additional Exchange Details */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-md font-medium text-foreground mb-4">Market Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-muted-foreground">Avg Response Time</div>
              <div className="font-medium text-foreground">~150ms</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-muted-foreground">Active Trading Pairs</div>
              <div className="font-medium text-foreground">1,247</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-muted-foreground">Total Market Depth</div>
              <div className="font-medium text-foreground">$2.8B</div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveCard>
  );
};