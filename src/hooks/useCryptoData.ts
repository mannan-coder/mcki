import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CryptoData {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  fearGreedIndex: number;
  activeCryptocurrencies: number;
  markets: number;
  coins: Array<{
    id: string;
    symbol: string;
    name: string;
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
    change30d: number;
    marketCap: number;
    volume: number;
    rank: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    ath: number;
    athDate: string;
    atl: number;
    atlDate: string;
    image: string;
    sparkline: number[];
    lastUpdated: string;
  }>;
  lastUpdated: string;
}

export const useCryptoData = () => {
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async (limit: number = 250) => {
    try {
      // Only set loading on initial fetch
      if (!data) setLoading(true);
      
      const { data: result, error } = await supabase.functions.invoke('crypto-market-data', {
        body: { limit: limit.toString() }
      });
      
      if (error) throw error;
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch crypto data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Refresh data every 45 seconds to avoid rate limits
    const interval = setInterval(() => fetchCryptoData(), 45000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: () => fetchCryptoData() };
};