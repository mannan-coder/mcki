import { useState, useEffect, useRef } from 'react';

interface PriceData {
  exchange: string;
  price: number;
  volume: number;
  change24h: number;
  spread: number;
}

interface CoinPriceData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  prices: PriceData[];
  avgPrice: number;
  maxSpread: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
}

// Hook to stabilize rapidly changing prices for better UX
export const useStabilizedPrices = (rawData: CoinPriceData[], updateInterval = 2000) => {
  const [stabilizedData, setStabilizedData] = useState<CoinPriceData[]>([]);
  const [priceChanges, setPriceChanges] = useState<Record<string, Record<string, 'up' | 'down' | 'neutral'>>>({});
  const lastUpdateTime = useRef<number>(Date.now());
  const previousPrices = useRef<Record<string, Record<string, number>>>({});

  useEffect(() => {
    // If we have no data yet, set empty array immediately
    if (rawData.length === 0) {
      setStabilizedData([]);
      return;
    }

    const now = Date.now();
    
    // Only update if enough time has passed since last update
    if (now - lastUpdateTime.current < updateInterval) {
      // Still set the data on first load even if interval hasn't passed
      if (stabilizedData.length === 0) {
        setStabilizedData(rawData);
      }
      return;
    }

    // Track price changes for visual indicators
    const newPriceChanges: Record<string, Record<string, 'up' | 'down' | 'neutral'>> = {};
    
    rawData.forEach(coin => {
      newPriceChanges[coin.symbol] = {};
      
      coin.prices.forEach(exchange => {
        const prevPrice = previousPrices.current[coin.symbol]?.[exchange.exchange];
        
        if (prevPrice !== undefined) {
          const changeThreshold = prevPrice * 0.001; // 0.1% threshold
          if (exchange.price > prevPrice + changeThreshold) {
            newPriceChanges[coin.symbol][exchange.exchange] = 'up';
          } else if (exchange.price < prevPrice - changeThreshold) {
            newPriceChanges[coin.symbol][exchange.exchange] = 'down';
          } else {
            newPriceChanges[coin.symbol][exchange.exchange] = 'neutral';
          }
        } else {
          newPriceChanges[coin.symbol][exchange.exchange] = 'neutral';
        }
        
        // Store current price as previous for next comparison
        if (!previousPrices.current[coin.symbol]) {
          previousPrices.current[coin.symbol] = {};
        }
        previousPrices.current[coin.symbol][exchange.exchange] = exchange.price;
      });
    });

    setPriceChanges(newPriceChanges);
    setStabilizedData(rawData);
    lastUpdateTime.current = now;
  }, [rawData, updateInterval, stabilizedData.length]);

  // Clear price change indicators after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPriceChanges(prev => {
        const cleared: Record<string, Record<string, 'up' | 'down' | 'neutral'>> = {};
        Object.keys(prev).forEach(symbol => {
          cleared[symbol] = {};
          Object.keys(prev[symbol]).forEach(exchange => {
            cleared[symbol][exchange] = 'neutral';
          });
        });
        return cleared;
      });
    }, 1500); // Clear indicators after 1.5 seconds

    return () => clearTimeout(timer);
  }, [priceChanges]);

  return {
    stabilizedData,
    priceChanges
  };
};