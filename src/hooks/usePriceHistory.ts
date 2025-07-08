import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PricePoint {
  time: number;
  price: number;
  date: string;
}

interface VolumePoint {
  time: number;
  volume: number;
  date: string;
}

interface MarketCapPoint {
  time: number;
  marketCap: number;
  date: string;
}

interface PriceHistory {
  prices: PricePoint[];
  volumes: VolumePoint[];
  marketCaps: MarketCapPoint[];
}

export const usePriceHistory = (coinId: string, days: number = 7, interval: string = 'daily') => {
  const [data, setData] = useState<PriceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPriceHistory = async (id: string, d: number, i: string) => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase.functions.invoke('crypto-price-history', {
        body: { id, days: d.toString(), interval: i }
      });
      
      if (error) throw error;
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchPriceHistory(coinId, days, interval);
    }
  }, [coinId, days, interval]);

  return { data, loading, error, refetch: () => fetchPriceHistory(coinId, days, interval) };
};