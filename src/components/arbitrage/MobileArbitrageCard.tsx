import { useState, useRef, useEffect } from 'react';
import { ExternalLink, TrendingUp, Clock } from 'lucide-react';
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

interface MobileArbitrageCardProps {
  opportunity: any;
  index: number;
}

export const MobileArbitrageCard = ({ opportunity, index }: MobileArbitrageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const coinSymbol = opportunity.pair ? opportunity.pair.split('/')[0].toLowerCase() : 'bitcoin';
  const coinId = getCoinIdFromSymbol(coinSymbol);
  const coinLogo = getCoinLogoById(coinId);

  const handleTradeClick = (exchange: string) => {
    const url = getExchangeTradeUrl(exchange, opportunity.pair);
    if (url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3 hover:shadow-md transition-all duration-200">
      {/* Header with Rank and Asset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
            {index + 1}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              {!imageError ? (
                <img 
                  src={coinLogo} 
                  alt={opportunity.pair ? opportunity.pair.split('/')[0] : 'Coin'}
                  className="w-8 h-8 rounded-full border border-border/20 bg-background shadow-sm object-cover transition-opacity duration-200"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20 shadow-inner">
                  {(opportunity.pair ? opportunity.pair.split('/')[0] : 'C').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div>
              <div className="font-semibold text-foreground text-sm">
                {opportunity.pair ? opportunity.pair.split('/')[0] : 'Unknown'}
              </div>
              <div className="text-xs text-muted-foreground">
                {opportunity.pair || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Spread Badge */}
        <div className="flex items-center space-x-2">
          <div className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs font-bold border border-warning/20">
            {opportunity.spread.toFixed(2)}%
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <TrendingUp className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Exchange Route with Prices */}
      <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
        <div className="text-center flex-1">
          <div className="text-xs text-muted-foreground mb-1">Buy From</div>
          <div className="text-sm font-medium text-success">{opportunity.buyExchange}</div>
          {opportunity.buyPrice && (
            <div className="text-xs text-muted-foreground mt-1">
              ${typeof opportunity.buyPrice === 'number' ? opportunity.buyPrice.toLocaleString(undefined, {maximumFractionDigits: 2}) : opportunity.buyPrice}
            </div>
          )}
        </div>
        
        <div className="px-3">
          <div className="text-muted-foreground">→</div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xs text-muted-foreground mb-1">Sell To</div>
          <div className="text-sm font-medium text-destructive">{opportunity.sellExchange}</div>
          {opportunity.sellPrice && (
            <div className="text-xs text-muted-foreground mt-1">
              ${typeof opportunity.sellPrice === 'number' ? opportunity.sellPrice.toLocaleString(undefined, {maximumFractionDigits: 2}) : opportunity.sellPrice}
            </div>
          )}
        </div>
      </div>

      {/* Profit and Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-xs text-muted-foreground">Profit Potential</div>
            <div className="text-sm font-bold text-success">
              ${opportunity.profitPotential?.toFixed(2) || 'N/A'}
            </div>
          </div>
          
          {opportunity.addedAt && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{getTimeAgo(opportunity.addedAt || opportunity.lastUpdated)}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs font-medium flex items-center gap-1"
        >
          Trade
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Expanded Trade Options */}
      {isExpanded && (
        <div className="pt-3 border-t border-border space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleTradeClick(opportunity.buyExchange)}
              className="p-3 bg-success/10 text-success rounded-lg hover:bg-success/20 transition-colors text-xs font-medium border border-success/20 flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Buy on {opportunity.buyExchange}
            </button>
            <button
              onClick={() => handleTradeClick(opportunity.sellExchange)}
              className="p-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors text-xs font-medium border border-destructive/20 flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 bg-destructive rounded-full"></span>
              Sell on {opportunity.sellExchange}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};