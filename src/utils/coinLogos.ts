// Coin and exchange logo utilities
export const getCoinLogo = (symbol: string): string => {
  const coinSymbol = symbol.toLowerCase();
  return `https://assets.coingecko.com/coins/images/markets/logo/${coinSymbol}.png`;
};

export const getExchangeLogo = (exchange: string): string => {
  const exchangeLogos: { [key: string]: string } = {
    'binance': 'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
    'coinbase': 'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png',
    'kucoin': 'https://assets.coingecko.com/markets/images/61/small/kucoin.jpg',
    'okx': 'https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.jpg',
    'kraken': 'https://assets.coingecko.com/markets/images/29/small/kraken.jpg',
    'bybit': 'https://assets.coingecko.com/markets/images/698/small/bybit_spot.jpg',
    'gate.io': 'https://assets.coingecko.com/markets/images/60/small/gate.jpg',
    'gateio': 'https://assets.coingecko.com/markets/images/60/small/gate.jpg',
    'huobi': 'https://assets.coingecko.com/markets/images/23/small/huobi_logo.jpg',
    'bitfinex': 'https://assets.coingecko.com/markets/images/4/small/BItfinex.png'
  };
  
  const exchangeName = exchange.toLowerCase();
  return exchangeLogos[exchangeName] || `https://via.placeholder.com/24x24/666666/ffffff?text=${exchange.charAt(0).toUpperCase()}`;
};

export const getCoinLogoById = (coinId: string): string => {
  const coinLogos: { [key: string]: string } = {
    'bitcoin': 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    'ethereum': 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    'binancecoin': 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    'solana': 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    'cardano': 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    'avalanche-2': 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
    'polygon': 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    'chainlink': 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
    'litecoin': 'https://assets.coingecko.com/coins/images/2/small/litecoin.png',
    'uniswap': 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
    'stellar': 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
    'vechain': 'https://assets.coingecko.com/coins/images/1167/small/VeChain-Logo-768x725.png',
    'filecoin': 'https://assets.coingecko.com/coins/images/12817/small/filecoin.png',
    'dogecoin': 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
    'shiba-inu': 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
    'pepe': 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg'
  };
  
  return coinLogos[coinId] || `https://via.placeholder.com/24x24/666666/ffffff?text=${coinId.charAt(0).toUpperCase()}`;
};

export const getExchangeColor = (exchange: string): string => {
  const exchangeColors: { [key: string]: string } = {
    'binance': '#f0b90b',
    'coinbase': '#0052ff',
    'kucoin': '#00d4aa',
    'okx': '#000000',
    'kraken': '#5741d9',
    'bybit': '#f7931a',
    'gate.io': '#64b5f6',
    'gateio': '#64b5f6',
    'huobi': '#2eaad8',
    'bitfinex': '#16a085'
  };
  
  return exchangeColors[exchange.toLowerCase()] || '#666666';
};