import { getCoinLogoById } from '@/utils/coinLogos';
import { getTimeAgo } from '@/utils/timeUtils';
import { ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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

// Exchange URL mapping for trade links
const getExchangeTradeUrl = (exchange: string, pair: string) => {
  const exchangeUrls: { [key: string]: string } = {
    'binance': `https://www.binance.com/en/trade/${pair.replace('-', '_')}`,
    'okx': `https://www.okx.com/trade-spot/${pair.toLowerCase()}`,
    'bybit': `https://www.bybit.com/trade/spot/${pair.replace('-', '')}`,
    'kucoin': `https://www.kucoin.com/trade/${pair.replace('-', '-')}`,
    'kraken': `https://pro.kraken.com/app/trade/${pair.replace('-', '-')}`,
    'coinbase': `https://pro.coinbase.com/trade/${pair.replace('-', '-')}`,
    'gate.io': `https://www.gate.io/trade/${pair.replace('-', '_')}`,
    'huobi': `https://www.huobi.com/en-us/exchange/${pair.toLowerCase().replace('-', '_')}`,
    'mexc': `https://www.mexc.com/exchange/${pair.replace('-', '_')}`,
    'bitfinex': `https://trading.bitfinex.com/t/${pair.replace('-', '')}`,
  };
  
  return exchangeUrls[exchange.toLowerCase()] || '#';
};

// Trade dropdown component
const TradeDropdown = ({ buyExchange, sellExchange, pair }: { buyExchange: string, sellExchange: string, pair: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const handleExchangeClick = (exchange: string) => {
    const url = getExchangeTradeUrl(exchange, pair);
    if (url !== '#') {
      window.open(url, '_blank');
    }
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1 whitespace-nowrap"
      >
        Trade
        <ExternalLink className="h-3 w-3" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-36">
          <div className="p-2 space-y-1">
            <button
              onClick={() => handleExchangeClick(buyExchange)}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded text-xs text-success font-medium transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Buy on {buyExchange}
            </button>
            <button
              onClick={() => handleExchangeClick(sellExchange)}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded text-xs text-destructive font-medium transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-destructive rounded-full"></span>
              Sell on {sellExchange}
            </button>
          </div>
        </div>
      )}
    </div>
  );
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
          <div className="relative w-8 h-8 flex-shrink-0">
            <img 
              src={coinLogo} 
              alt={row.pair ? row.pair.split('-')[0] : 'Coin'}
              className="w-8 h-8 rounded-full border border-border/20 bg-background shadow-sm object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Try alternative URL first
                if (!target.src.includes('placeholder')) {
                  target.src = `https://assets.coingecko.com/coins/images/1/large/${coinSymbol}.png`;
                  return;
                }
                // Final fallback to a styled placeholder
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.coin-placeholder')) {
                  const placeholder = document.createElement('div');
                  placeholder.className = 'coin-placeholder w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-border/20';
                  placeholder.textContent = (row.pair ? row.pair.split('-')[0] : 'C').charAt(0).toUpperCase();
                  parent.appendChild(placeholder);
                }
              }}
              onLoad={(e) => {
                // Remove any placeholder if image loads successfully
                const target = e.target as HTMLImageElement;
                const parent = target.parentElement;
                const placeholder = parent?.querySelector('.coin-placeholder');
                if (placeholder) {
                  placeholder.remove();
                }
                target.style.display = 'block';
              }}
            />
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
    render: (value: any, row: any) => (
      <TradeDropdown 
        buyExchange={row.buyExchange} 
        sellExchange={row.sellExchange} 
        pair={row.pair}
      />
    )
  }
];