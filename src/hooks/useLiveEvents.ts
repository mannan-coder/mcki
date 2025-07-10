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
  cryptoNews?: any[];
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
      
      // Minimal fallback - API should be working with CoinGecko
      const fallbackData: LiveEventsData = {
        upcomingEvents: [
          {
            id: 'fallback-1',
            title: 'API Temporarily Unavailable',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            time: '12:00 UTC',
            impact: 'low',
            type: 'system',
            description: 'Live events will resume shortly',
            countdown: 'Retrying...'
          }
        ],
        liveAlerts: [],
        marketSignals: [],
        lastUpdated: new Date().toISOString()
      };
      
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
    
    // Refresh every 2 minutes for live data
    const interval = setInterval(fetchEventsData, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchEventsData };
};