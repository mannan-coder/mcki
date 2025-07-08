import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FearGreedData {
  fearGreedIndex: {
    value: number;
    classification: string;
    timestamp: string;
    lastUpdate: string;
  };
  historical: {
    last7Days: Array<{ value: number; timestamp: string; date: string }>;
    last30Days: Array<{ value: number; timestamp: string; date: string }>;
    avg7d: number;
    avg30d: number;
  };
  trendingCoins: Array<{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    score: number;
  }>;
  sentimentFactors: Array<{
    factor: string;
    impact: string;
    value: number;
  }>;
  overallSentiment: {
    score: number;
    label: string;
  };
}

export const useSentimentData = () => {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSentimentData = async () => {
    try {
      // Only set loading on initial fetch
      if (!data) setLoading(true);
      
      const { data: result, error } = await supabase.functions.invoke('crypto-sentiment');
      
      if (error) throw error;
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sentiment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentimentData();
    
    // Refresh sentiment data every 5 minutes
    const interval = setInterval(fetchSentimentData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchSentimentData };
};