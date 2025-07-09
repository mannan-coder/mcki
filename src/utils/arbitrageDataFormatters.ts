export const formatArbitrageOpportunityData = (opportunities: any[]) => {
  return opportunities.map((opp: any) => ({
    coin: opp.coin || opp.pair?.split('-')[0] || 'Unknown',
    pair: opp.pair,
    buyExchange: opp.buyExchange,
    sellExchange: opp.sellExchange,
    buyPrice: `$${opp.buyPrice?.toFixed(2) || '0.00'}`,
    sellPrice: `$${opp.sellPrice?.toFixed(2) || '0.00'}`,
    spread: `${opp.spread?.toFixed(2) || '0.00'}%`,
    profit: `$${opp.estimatedProfit?.toFixed(2) || '0.00'}`,
    volume: `$${(opp.volume24h / 1000000)?.toFixed(1) || '0.0'}M`
  }));
};