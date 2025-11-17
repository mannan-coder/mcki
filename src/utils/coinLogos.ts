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
  
  // Use local fallback instead of via.placeholder.com
  if (!exchangeLogos[exchangeName]) {
    const { getExchangeFallbackAvatar } = require('./avatarGenerator');
    return getExchangeFallbackAvatar(exchange, 24);
  }
  
  return exchangeLogos[exchangeName];
};

export const getCoinLogoById = (coinId: string): string => {
  // Comprehensive coin logo mapping with high-quality images
  const coinLogos: { [key: string]: string } = {
    'bitcoin': 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
    'ethereum': 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
    'tether': 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png',
    'binancecoin': 'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    'solana': 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    'usd-coin': 'https://coin-images.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    'staked-ether': 'https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png',
    'xrp': 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    'dogecoin': 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png',
    'the-open-network': 'https://coin-images.coingecko.com/coins/images/17980/large/ton_symbol.png',
    'cardano': 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png',
    'avalanche-2': 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    'tron': 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png',
    'chainlink': 'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    'shiba-inu': 'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png',
    'wrapped-bitcoin': 'https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png',
    'polkadot': 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png',
    'bitcoin-cash': 'https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png',
    'litecoin': 'https://coin-images.coingecko.com/coins/images/2/large/litecoin.png',
    'polygon': 'https://coin-images.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    'near': 'https://coin-images.coingecko.com/coins/images/10365/large/near_icon.png',
    'internet-computer': 'https://coin-images.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png',
    'multi-collateral-dai': 'https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png',
    'uniswap': 'https://coin-images.coingecko.com/coins/images/12504/large/uniswap-uni.png',
    'ethereum-classic': 'https://coin-images.coingecko.com/coins/images/453/large/ethereum-classic-logo.png',
    'aptos': 'https://coin-images.coingecko.com/coins/images/26455/large/aptos_round.png',
    'render-token': 'https://coin-images.coingecko.com/coins/images/11636/large/rndr.png',
    'mantle': 'https://coin-images.coingecko.com/coins/images/30980/large/token-logo.png',
    'crypto-com-chain': 'https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png',
    'stellar': 'https://coin-images.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
    'okb': 'https://coin-images.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png',
    'filecoin': 'https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png',
    'cosmos': 'https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png',
    'vechain': 'https://coin-images.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png',
    'monero': 'https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png',
    'hedera-hashgraph': 'https://coin-images.coingecko.com/coins/images/3441/large/Hedera_Hashgraph_logo.png',
    'arbitrum': 'https://coin-images.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg',
    'optimism': 'https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png',
    'kaspa': 'https://coin-images.coingecko.com/coins/images/25751/large/kaspa-icon-exchanges.png',
    'immutable-x': 'https://coin-images.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png',
    'bittensor': 'https://coin-images.coingecko.com/coins/images/28452/large/tau_white.png',
    'artificial-superintelligence-alliance': 'https://coin-images.coingecko.com/coins/images/28298/large/fet.png',
    'injective-protocol': 'https://coin-images.coingecko.com/coins/images/12882/large/Secondary_Symbol.png',
    'fantom': 'https://coin-images.coingecko.com/coins/images/4001/large/Fantom_round.png',
    'first-digital-usd': 'https://coin-images.coingecko.com/coins/images/31069/large/fdusd.png',
    'the-graph': 'https://coin-images.coingecko.com/coins/images/13397/large/Graph_Token.png',
    'algorand': 'https://coin-images.coingecko.com/coins/images/4380/large/download.png',
    'thorchain': 'https://coin-images.coingecko.com/coins/images/6595/large/RUNE.png',
    'sei-network': 'https://coin-images.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png',
    'maker': 'https://coin-images.coingecko.com/coins/images/1364/large/Mark_Maker.png',
    'celestia': 'https://coin-images.coingecko.com/coins/images/31967/large/tia.jpg',
    'lido-dao': 'https://coin-images.coingecko.com/coins/images/13573/large/Lido_DAO.png',
    'pepe': 'https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg'
  };
  
  // First try the mapping
  if (coinLogos[coinId]) {
    return coinLogos[coinId];
  }
  
  // Try direct CoinGecko API approach
  const directUrl = `https://coin-images.coingecko.com/coins/images/1/large/${coinId}.png`;
  
  // Return the direct URL - the component will handle errors
  return directUrl;
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