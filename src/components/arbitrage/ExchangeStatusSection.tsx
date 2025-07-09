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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Exchange Status</h3>
        
        <div className="space-y-3">
          {exchangeData.map((exchange, index) => (
            <ExchangeStatusCard 
              key={index}
              exchange={exchange}
              index={index}
            />
          ))}
        </div>
      </div>
    </ResponsiveCard>
  );
};