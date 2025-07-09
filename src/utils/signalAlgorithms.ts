interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
  change7d: number;
  change1h: number;
  volume: number;
  marketCap: number;
  athChangePercentage: number;
  sparkline: number[];
}

export interface SignalResults {
  buy: CoinData[];
  sell: CoinData[];
  consolidation: CoinData[];
  highVolume: CoinData[];
}

export const calculateSignals = (coins: CoinData[]): SignalResults => {
  if (!coins.length) return { buy: [], sell: [], consolidation: [], highVolume: [] };

  // Calculate average volume ratio for baseline
  const avgVolumeRatio = coins.reduce((sum, coin) => sum + (coin.volume / coin.marketCap), 0) / coins.length;
  
  return {
    buy: calculateBuySignals(coins, avgVolumeRatio),
    sell: calculateSellSignals(coins, avgVolumeRatio),
    consolidation: calculateConsolidationSignals(coins, avgVolumeRatio),
    highVolume: calculateHighVolumeSignals(coins, avgVolumeRatio)
  };
};

const calculateBuySignals = (coins: CoinData[], avgVolumeRatio: number): CoinData[] => {
  return coins.filter(coin => {
    // Multi-timeframe momentum analysis
    const momentum1h = coin.change1h || 0;
    const momentum24h = coin.change24h;
    const momentum7d = coin.change7d;
    
    // Volume confirmation (above average with momentum)
    const volumeRatio = coin.volume / coin.marketCap;
    const volumeConfirmation = volumeRatio > avgVolumeRatio * 1.5;
    
    // Trend strength calculation
    const trendStrength = (momentum24h > 0 ? 1 : 0) + (momentum7d > 0 ? 1 : 0) + (momentum1h > 0 ? 1 : 0);
    
    // Sparkline momentum (if available)
    let sparklineMomentum = 0;
    if (coin.sparkline && coin.sparkline.length >= 10) {
      const recent = coin.sparkline.slice(-5);
      const earlier = coin.sparkline.slice(-10, -5);
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
      sparklineMomentum = (recentAvg - earlierAvg) / earlierAvg * 100;
    }
    
    // Strong buy conditions
    return (
      momentum24h > 5 && 
      momentum7d > 10 && 
      volumeConfirmation && 
      trendStrength >= 2 && 
      sparklineMomentum > 2 &&
      (coin.athChangePercentage || -20) > -80 // Not too close to ATH
    );
  });
};

const calculateSellSignals = (coins: CoinData[], avgVolumeRatio: number): CoinData[] => {
  return coins.filter(coin => {
    const momentum1h = coin.change1h || 0;
    const momentum24h = coin.change24h;
    const momentum7d = coin.change7d;
    
    // Volume divergence (high volume with negative price action)
    const volumeRatio = coin.volume / coin.marketCap;
    const volumeDivergence = volumeRatio > avgVolumeRatio * 1.3;
    
    // Negative trend strength
    const bearishTrend = (momentum24h < 0 ? 1 : 0) + (momentum7d < 0 ? 1 : 0) + (momentum1h < 0 ? 1 : 0);
    
    // Overbought conditions (near ATH with negative momentum)
    const overbought = (coin.athChangePercentage || -50) > -15 && momentum24h < -3;
    
    // Distribution pattern detection
    let distributionPattern = false;
    if (coin.sparkline && coin.sparkline.length >= 10) {
      const recent = coin.sparkline.slice(-3);
      const peak = Math.max(...coin.sparkline.slice(-10));
      const currentPrice = recent[recent.length - 1];
      distributionPattern = (peak - currentPrice) / peak > 0.05;
    }
    
    return (
      momentum24h < -8 && 
      bearishTrend >= 2 && 
      (volumeDivergence || overbought || distributionPattern) &&
      momentum7d < -10
    );
  });
};

const calculateConsolidationSignals = (coins: CoinData[], avgVolumeRatio: number): CoinData[] => {
  return coins.filter(coin => {
    const momentum1h = Math.abs(coin.change1h || 0);
    const momentum24h = Math.abs(coin.change24h);
    const momentum7d = Math.abs(coin.change7d);
    
    // Low volatility across timeframes
    const lowVolatility = momentum1h < 2 && momentum24h < 4 && momentum7d < 8;
    
    // Stable volume (not too high, not too low)
    const volumeRatio = coin.volume / coin.marketCap;
    const stableVolume = volumeRatio > avgVolumeRatio * 0.3 && volumeRatio < avgVolumeRatio * 2;
    
    // Range-bound price action
    let rangeBound = false;
    if (coin.sparkline && coin.sparkline.length >= 20) {
      const prices = coin.sparkline.slice(-20);
      const high = Math.max(...prices);
      const low = Math.min(...prices);
      const range = (high - low) / low;
      const currentPrice = prices[prices.length - 1];
      
      // Price staying within narrow range
      rangeBound = range < 0.15 && currentPrice > low * 1.1 && currentPrice < high * 0.9;
    }
    
    return lowVolatility && stableVolume && (rangeBound || momentum7d < 5);
  });
};

const calculateHighVolumeSignals = (coins: CoinData[], avgVolumeRatio: number): CoinData[] => {
  return coins.filter(coin => {
    const volumeRatio = coin.volume / coin.marketCap;
    const momentum24h = Math.abs(coin.change24h);
    
    // Exceptional volume (3x average or more)
    const exceptionalVolume = volumeRatio > avgVolumeRatio * 3;
    
    // Volume with price movement (not just wash trading)
    const volumeWithMovement = volumeRatio > avgVolumeRatio * 2 && momentum24h > 3;
    
    // Breakout volume (high volume with strong directional move)
    const breakoutVolume = volumeRatio > avgVolumeRatio * 2.5 && momentum24h > 8;
    
    // Unusual volume pattern
    let unusualPattern = false;
    if (coin.sparkline && coin.sparkline.length >= 10) {
      const recentVolume = volumeRatio;
      const historicalAvg = avgVolumeRatio;
      unusualPattern = recentVolume > historicalAvg * 4;
    }
    
    return exceptionalVolume || volumeWithMovement || breakoutVolume || unusualPattern;
  });
};