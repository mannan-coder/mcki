import { getCoinLogoById } from '@/utils/coinLogos';
import { getTimeAgo } from '@/utils/timeUtils';

// Helper function to map common symbols to coin IDs
const getCoinIdFromSymbol = (symbol: string) => {
  const symbolMap: { [key: string]: string } = {
    'btc': 'bitcoin',
    'eth': 'ethereum',
    'bnb': 'binancecoin',
    'sol': 'solana',
    'ada': 'cardano',
    'avax': 'avalanche-2',
    'matic': 'polygon',
    'link': 'chainlink',
    'ltc': 'litecoin',
    'uni': 'uniswap',
    'xlm': 'stellar',
    'vet': 'vechain',
    'fil': 'filecoin',
    'doge': 'dogecoin',
    'shib': 'shiba-inu',
    'pepe': 'pepe'
  };
  
  return symbolMap[symbol.toLowerCase()] || symbol.toLowerCase();
};

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
      // Extract coin symbol from pair (e.g., "BTC-USDT" -> "bitcoin")
      const coinSymbol = row.pair ? row.pair.split('-')[0].toLowerCase() : 'bitcoin';
      const coinId = getCoinIdFromSymbol(coinSymbol);
      const coinLogo = getCoinLogoById(coinId);
      
      return (
        <div className="flex items-center space-x-3">
          <img 
            src={coinLogo} 
            alt={row.pair ? row.pair.split('-')[0] : 'Coin'}
            className="w-10 h-10 rounded-full border border-border/20 bg-background"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div>
            <div className="font-semibold text-foreground text-sm">
              {row.pair ? row.pair.split('-')[0] : 'Unknown'}
            </div>
            <div className="text-xs text-muted-foreground">
              {row.pair || 'N/A'}
            </div>
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