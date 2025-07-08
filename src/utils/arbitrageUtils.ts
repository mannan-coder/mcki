export function getDefaultPrice(symbol: string): number {
  const defaultPrices: { [key: string]: number } = {
    'BTC': 67800,
    'ETH': 3850,
    'SOL': 178,
    'ADA': 0.65,
    'MATIC': 0.88,
    'DOT': 8.5
  };
  return defaultPrices[symbol] || 1;
}

export function getCoinName(symbol: string): string {
  const names: { [key: string]: string } = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'SOL': 'Solana',
    'ADA': 'Cardano',
    'MATIC': 'Polygon',
    'DOT': 'Polkadot'
  };
  return names[symbol] || symbol;
}

export function getBaseVolume(symbol: string, exchange: string): number {
  const volumeMultipliers: { [key: string]: number } = {
    'binance': 1.0,
    'coinbase': 0.7,
    'okx': 0.8,
    'bybit': 0.6,
    'kucoin': 0.4,
    'kraken': 0.3,
    'gateio': 0.2
  };
  
  const baseVolumes: { [key: string]: number } = {
    'BTC': 800,
    'ETH': 600,
    'SOL': 150,
    'ADA': 80,
    'MATIC': 70,
    'DOT': 35
  };
  
  return (baseVolumes[symbol] || 10) * (volumeMultipliers[exchange] || 0.1);
}

export function formatVolume(volume: number): string {
  if (volume >= 1000) {
    return (volume / 1000).toFixed(1) + 'B';
  }
  return volume.toFixed(1) + 'M';
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: price < 1 ? 4 : 2,
    maximumFractionDigits: price < 1 ? 6 : 2
  }).format(price);
}

export function formatVolumeDisplay(volume: string): string {
  // Extract number from volume string (remove 'M' or 'B')
  const numValue = parseFloat(volume.replace(/[MB]/g, ''));
  const unit = volume.includes('B') ? 'B' : 'M';
  
  if (unit === 'B') {
    return `$${numValue.toFixed(1)}B`;
  } else {
    return `$${numValue.toFixed(0)}M`;
  }
}

export interface CoinPriceData {
  symbol: string;
  name: string;
  prices: { [exchange: string]: number };
  volumes: { [exchange: string]: string };
  change24h: number;
}

export function generateCoinPriceData(opportunities: any[]): CoinPriceData[] {
  const exchangeNames = ['binance', 'coinbase', 'kucoin', 'okx', 'kraken', 'bybit', 'gateio'];
  const coinSymbols = ['BTC', 'ETH', 'SOL', 'ADA', 'MATIC', 'DOT'];
  
  return coinSymbols.map(symbol => {
    // Find if this coin has arbitrage opportunities
    const relatedOpportunity = opportunities.find(opp => 
      opp.pair?.includes(symbol) || opp.pair?.startsWith(symbol)
    );
    
    // Use real base price from arbitrage data or fallback to reasonable values
    const basePrice = relatedOpportunity ? 
      (relatedOpportunity.buyPrice + relatedOpportunity.sellPrice) / 2 :
      getDefaultPrice(symbol);
    
    // Generate realistic price variations across exchanges (0.1-2% difference)
    const prices: any = {};
    const volumes: any = {};
    
    exchangeNames.forEach(exchange => {
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      prices[exchange] = basePrice * (1 + variation);
      
      // Generate realistic volumes based on exchange size
      const baseVolume = getBaseVolume(symbol, exchange);
      volumes[exchange] = formatVolume(baseVolume * (0.8 + Math.random() * 0.4));
    });
    
    return {
      symbol,
      name: getCoinName(symbol),
      prices,
      volumes,
      change24h: (Math.random() - 0.5) * 10 // Random 24h change ±5%
    };
  });
}