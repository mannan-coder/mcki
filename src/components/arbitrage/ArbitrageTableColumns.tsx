import { getCoinLogoById } from '@/utils/coinLogos';
import { getTimeAgo } from '@/utils/timeUtils';

// Helper function to map common symbols to coin IDs
const getCoinIdFromSymbol = (symbol: string) => {
  const symbolMap: { [key: string]: string } = {
    'btc': 'bitcoin',
    'eth': 'ethereum',
    'usdt': 'tether',
    'usdc': 'usd-coin',
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
    'pepe': 'pepe',
    'xrp': 'xrp',
    'trx': 'tron',
    'dot': 'polkadot',
    'bch': 'bitcoin-cash',
    'near': 'near',
    'icp': 'internet-computer',
    'dai': 'multi-collateral-dai',
    'etc': 'ethereum-classic',
    'apt': 'aptos',
    'rndr': 'render-token',
    'mnt': 'mantle',
    'cro': 'crypto-com-chain',
    'okb': 'okb',
    'atom': 'cosmos',
    'xmr': 'monero',
    'hbar': 'hedera-hashgraph',
    'arb': 'arbitrum',
    'op': 'optimism',
    'kas': 'kaspa',
    'imx': 'immutable-x',
    'tao': 'bittensor',
    'fet': 'artificial-superintelligence-alliance',
    'inj': 'injective-protocol',
    'ftm': 'fantom',
    'fdusd': 'first-digital-usd',
    'grt': 'the-graph',
    'algo': 'algorand',
    'rune': 'thorchain',
    'sei': 'sei-network',
    'mkr': 'maker',
    'tia': 'celestia',
    'ldo': 'lido-dao',
    'ton': 'the-open-network',
    'steth': 'staked-ether',
    'wbtc': 'wrapped-bitcoin'
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
          <div className="relative">
            <img 
              src={coinLogo} 
              alt={row.pair ? row.pair.split('-')[0] : 'Coin'}
              className="w-8 h-8 rounded-full border border-border/20 bg-background shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            {/* Loading state indicator */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground text-sm truncate">
              {row.pair ? row.pair.split('-')[0] : 'Unknown'}
            </div>
            <div className="text-xs text-muted-foreground truncate">
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