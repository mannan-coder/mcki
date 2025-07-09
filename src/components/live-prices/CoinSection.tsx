import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { CoinRow } from './CoinRow';

interface CoinSectionProps {
  title: string;
  coins: any[];
  category: 'gainer' | 'loser' | 'volume';
  loading?: boolean;
}

export const CoinSection = ({ title, coins, category, loading }: CoinSectionProps) => {
  if (loading) {
    return (
      <ResponsiveCard>
        <div className="space-y-4">
          <div className="h-5 bg-muted rounded animate-pulse"></div>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-muted rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-muted/60 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-muted/60 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveCard>
    );
  }

  return (
    <ResponsiveCard>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="space-y-0">
          {coins.map((coin, index) => (
            <CoinRow 
              key={coin.id || coin.symbol}
              coin={coin}
              index={index}
              category={category}
            />
          ))}
        </div>
      </div>
    </ResponsiveCard>
  );
};