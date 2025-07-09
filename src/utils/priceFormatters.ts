export const formatPrice = (price: number, compact = false): string => {
  if (typeof price !== 'number' || isNaN(price)) return '$0.00';
  
  if (compact && price >= 1000) {
    if (price >= 1e6) {
      return `$${(price / 1e6).toFixed(1)}M`;
    }
    if (price >= 1e3) {
      return `$${(price / 1e3).toFixed(1)}K`;
    }
  }
  
  if (price >= 1) {
    return `$${price.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  } else if (price >= 0.01) {
    return `$${price.toFixed(4)}`;
  } else if (price >= 0.0001) {
    return `$${price.toFixed(6)}`;
  } else {
    return `$${price.toFixed(8)}`;
  }
};

export const formatVolume = (volume: number): string => {
  if (typeof volume !== 'number' || isNaN(volume)) return '$0';
  
  if (volume >= 1e12) {
    return `$${(volume / 1e12).toFixed(2)}T`;
  } else if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`;
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`;
  } else if (volume >= 1e3) {
    return `$${(volume / 1e3).toFixed(2)}K`;
  } else {
    return `$${volume.toLocaleString()}`;
  }
};

export const formatMarketCap = (marketCap: number): string => {
  if (typeof marketCap !== 'number' || isNaN(marketCap)) return '$0';
  
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
};

export const formatPercentage = (percentage: number): string => {
  if (typeof percentage !== 'number' || isNaN(percentage)) return '0.00%';
  
  const formatted = percentage.toFixed(2);
  return percentage >= 0 ? `+${formatted}%` : `${formatted}%`;
};