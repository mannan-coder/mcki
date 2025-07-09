// Category mapping for cryptocurrencies
export const coinCategories = {
  'DeFi': [
    'uniswap', 'compound', 'aave', 'maker', 'synthetix', 'yearn-finance', 
    'curve-dao-token', 'pancakeswap-token', 'sushiswap', '1inch', 'balancer',
    'bancor-network-token', 'kyber-network-crystal', 'loopring', 'badger-dao'
  ],
  'Layer 1': [
    'bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana', 'avalanche-2',
    'polkadot', 'cosmos', 'algorand', 'tezos', 'near', 'fantom', 'harmony',
    'elrond-erd-2', 'terra-luna', 'flow', 'hedera-hashgraph', 'internet-computer'
  ],
  'Layer 2': [
    'polygon', 'arbitrum', 'optimism', 'immutable-x', 'loopring',
    'matic-network', 'metis-token'
  ],
  'Gaming': [
    'axie-infinity', 'the-sandbox', 'decentraland', 'gala', 'enjincoin',
    'chromia', 'illuvium', 'star-atlas', 'ultraman', 'alien-worlds',
    'smooth-love-potion', 'stepn', 'verasity'
  ],
  'NFT': [
    'enjincoin', 'flow', 'theta-token', 'chiliz', 'wax', 'lukso-token',
    'ecomi', 'rarible', 'super-rare'
  ],
  'Meme': [
    'dogecoin', 'shiba-inu', 'dogelon-mars', 'floki', 'safemoon',
    'baby-doge-coin', 'akita-inu', 'kishu-inu', 'pepe', 'bonk'
  ],
  'AI': [
    'fetch-ai', 'singularitynet', 'ocean-protocol', 'numeraire',
    'cortex', 'matrix-ai-network', 'deep-brain-chain', 'artificial-liquid-intelligence'
  ],
  'RWA': [
    'chainlink', 'maker', 'centrifuge', 'maple', 'goldfinch',
    'truefi', 'backed-finance'
  ],
  'Privacy': [
    'monero', 'zcash', 'dash', 'verge', 'horizen', 'beam', 'grin',
    'secret', 'oasis-network', 'tornado-cash'
  ]
};

export const getCoinCategory = (coinId: string): string[] => {
  const categories: string[] = [];
  
  Object.entries(coinCategories).forEach(([category, coins]) => {
    if (coins.includes(coinId.toLowerCase())) {
      categories.push(category);
    }
  });
  
  return categories.length > 0 ? categories : [];
};

export const getCoinsByCategory = (coins: any[], category: string): any[] => {
  if (category === 'All') return coins;
  
  const categoryCoins = coinCategories[category as keyof typeof coinCategories] || [];
  
  return coins.filter(coin => 
    categoryCoins.includes(coin.id?.toLowerCase() || coin.symbol?.toLowerCase())
  );
};