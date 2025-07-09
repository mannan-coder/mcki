import { getCoinLogoById } from '@/utils/coinLogos';
import { getTimeAgo } from '@/utils/timeUtils';

export const getArbitrageTableColumns = () => [
  {
    key: 'rank',
    header: '#',
    className: 'text-center',
    render: (_: any, __: any, index: number) => (
      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
        {index + 1}
      </div>
    )
  },
  {
    key: 'asset',
    header: 'Asset',
    render: (value: any, row: any) => {
      const coinSymbol = row.pair.split('-')[0].toLowerCase();
      const coinLogo = getCoinLogoById(coinSymbol);
      return (
        <div className="flex items-center space-x-2">
          <img 
            src={coinLogo} 
            alt={row.pair.split('-')[0]}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div>
            <div className="font-medium text-foreground">{row.pair.split('-')[0]}</div>
            <div className="text-xs text-muted-foreground">{row.pair}</div>
          </div>
        </div>
      );
    }
  },
  {
    key: 'buyExchange',
    header: 'Buy From',
    className: 'text-center',
    render: (value: any, row: any) => (
      <div className="text-sm font-medium text-success">{row.buyExchange}</div>
    )
  },
  {
    key: 'arrow',
    header: '→',
    className: 'text-center',
    render: () => <span className="text-muted-foreground">→</span>
  },
  {
    key: 'sellExchange',
    header: 'Sell To',
    className: 'text-center',
    render: (value: any, row: any) => (
      <div className="text-sm font-medium text-destructive">{row.sellExchange}</div>
    )
  },
  {
    key: 'spread',
    header: 'Spread',
    className: 'text-center',
    render: (value: any, row: any) => (
      <div className="text-sm font-bold text-warning">{row.spread.toFixed(2)}%</div>
    )
  },
  {
    key: 'profitPotential',
    header: 'Profit',
    className: 'text-center',
    render: (value: any, row: any) => (
      <div className="text-sm font-bold text-success">${row.profitPotential?.toFixed(2) || 'N/A'}</div>
    )
  },
  {
    key: 'lastUpdated',
    header: 'Updated',
    className: 'text-center',
    render: (value: any, row: any) => (
      <div className="text-xs text-muted-foreground">
        {getTimeAgo(row.addedAt || row.lastUpdated)}
      </div>
    )
  },
  {
    key: 'action',
    header: 'Action',
    className: 'text-center',
    render: () => (
      <button className="px-2 py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20 transition-colors">
        Trade
      </button>
    )
  }
];