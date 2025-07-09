import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  description: string;
  image: string;
  marketCapRank: number;
  currentPrice: number;
  marketCap: number;
  totalVolume: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  priceChangePercentage30d: number;
  priceChangePercentage1y: number;
  ath: number;
  athDate: string;
  atl: number;
  atlDate: string;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  sparkline: number[];
  lastUpdated: string;
}

export const useCoinDetails = (coinId: string) => {
  const [data, setData] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinDetails = async (id: string) => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase.functions.invoke('crypto-coin-details', {
        body: { id }
      });
      
      if (error) throw error;
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch coin details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchCoinDetails(coinId);
      
      // Refresh coin details every 30 seconds for real-time updates
      const interval = setInterval(() => fetchCoinDetails(coinId), 30000);
      
      return () => clearInterval(interval);
    }
  }, [coinId]);

  return { data, loading, error, refetch: () => fetchCoinDetails(coinId) };
};