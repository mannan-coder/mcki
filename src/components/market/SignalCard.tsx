import React, { memo } from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
}

interface SignalCardProps {
  title: string;
  count: number;
  coins: CoinData[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const SignalCard = memo(({ 
  title, 
  count, 
  coins, 
  icon, 
  color,
  bgColor,
  borderColor,
  description 
}: SignalCardProps) => (
  <Card className={`${bgColor} ${borderColor} border-2 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden`}>
    <CardHeader className="pb-3">
      <div className={`flex items-center gap-3 ${color}`}>
        <div className="p-2.5 rounded-xl bg-white/70 dark:bg-black/30 shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-bold">{title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <Badge variant="secondary" className="text-xs font-semibold px-2 py-1">
          {count}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      {coins.length > 0 ? (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Top Signals ({Math.min(coins.length, 3)})
          </div>
          {coins.slice(0, 3).map((coin) => (
            <div key={coin.id} className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors">
              <div className="flex items-center gap-2">
                <img 
                  src={coin.image} 
                  alt={coin.name}
                  className="w-7 h-7 rounded-full border border-white dark:border-gray-700 shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">{coin.symbol.toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-16">
                    {coin.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-xs font-semibold">
                  ${coin.price?.toFixed(coin.price < 1 ? 4 : 2) || '0.00'}
                </span>
                <span className={`text-xs font-medium ${
                  coin.change24h >= 0 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h?.toFixed(2) || '0.00'}%
                </span>
              </div>
            </div>
          ))}
          {coins.length > 3 && (
            <div className="text-center pt-1">
              <span className="text-xs text-muted-foreground font-medium">
                +{coins.length - 3} more signals
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-2">
            <Target className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">No signals detected</p>
        </div>
      )}
    </CardContent>
  </Card>
));