import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  impact: string;
  type: string;
  description: string;
  countdown: string;
}

interface LiveAlert {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  severity: string;
  symbol?: string;
  price?: string;
  change?: string;
  volume?: string;
  amount?: string;
  value?: string;
}

interface MarketSignal {
  id: string;
  signal: string;
  asset: string;
  strength: string;
  timeframe: string;
  description: string;
  confidence: number;
  action: string;
}

interface LiveEventsData {
  upcomingEvents: UpcomingEvent[];
  liveAlerts: LiveAlert[];
  marketSignals: MarketSignal[];
  lastUpdated: string;
}

export const useLiveEvents = () => {
  const [data, setData] = useState<LiveEventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventsData = async () => {
    try {
      if (!data) setLoading(true);
      
      console.log('Fetching live events data...');
      const { data: result, error } = await supabase.functions.invoke('crypto-live-events');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Events data fetched successfully');
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch events data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
    
    // Refresh every 3 minutes
    const interval = setInterval(fetchEventsData, 3 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchEventsData };
};