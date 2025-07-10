import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SentimentData {
  overall: number;
  score: number;
  change24h: string;
  status: string;
  indicators: {
    socialVolume: string;
    newsVolume: string;
    marketVolume: string;
  };
}

interface FearGreedData {
  value: number;
  classification: string;
  change24h: string;
  trend: string;
  timestamp: number;
}

interface TrendingTopic {
  rank: number;
  name: string;
  symbol: string;
  score: number;
  change24h: string;
  volume: string;
  mentions: number;
}

interface LiveSentimentData {
  sentiment: SentimentData;
  fearGreed: FearGreedData;
  trending: TrendingTopic[];
  lastUpdated: string;
}

export const useLiveSentiment = () => {
  const [data, setData] = useState<LiveSentimentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSentimentData = async () => {
    try {
      if (!data) setLoading(true);
      
      console.log('Fetching live sentiment data...');
      const { data: result, error } = await supabase.functions.invoke('crypto-sentiment-live');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Sentiment data fetched successfully');
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch sentiment data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sentiment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentimentData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchSentimentData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchSentimentData };
};