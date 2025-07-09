export const formatPrice = (price: number) => {
  if (price >= 1) {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${price.toFixed(6)}`;
};

export const formatVolume = (volume: number) => {
  if (volume >= 1000000000) {
    return `$${(volume / 1000000000).toFixed(1)}B`;
  }
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  }
  return `$${(volume / 1000).toFixed(0)}K`;
};

export const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1000000000) {
    return `$${(marketCap / 1000000000).toFixed(1)}B`;
  }
  if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(1)}M`;
  }
  return `$${(marketCap / 1000).toFixed(0)}K`;
};

export const formatPercentage = (percentage: number) => {
  const formatted = percentage.toFixed(2);
  return percentage >= 0 ? `+${formatted}%` : `${formatted}%`;
};