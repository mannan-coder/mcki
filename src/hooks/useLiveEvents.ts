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
      
      // Fallback events data
      const fallbackData: LiveEventsData = {
        upcomingEvents: [
          {
            id: '1',
            title: 'Bitcoin Halving Event',
            date: '2024-04-20',
            time: '12:00 UTC',
            impact: 'high',
            type: 'network',
            description: 'The next Bitcoin halving event that will reduce mining rewards by 50%',
            countdown: 'In 3 months'
          },
          {
            id: '2',
            title: 'Ethereum Dencun Upgrade',
            date: '2024-03-15',
            time: '14:30 UTC',
            impact: 'medium',
            type: 'upgrade',
            description: 'Major Ethereum network upgrade to improve scalability and reduce fees',
            countdown: 'In 2 weeks'
          },
          {
            id: '3',
            title: 'Federal Reserve Interest Rate Decision',
            date: '2024-02-01',
            time: '19:00 UTC',
            impact: 'high',
            type: 'economic',
            description: 'Fed meeting that could impact cryptocurrency markets significantly',
            countdown: 'Tomorrow'
          }
        ],
        liveAlerts: [
          {
            id: '1',
            type: 'price',
            title: 'BTC Price Alert',
            message: 'Bitcoin breaks above $65,000 resistance level',
            time: new Date(Date.now() - 300000).toISOString(),
            severity: 'high',
            symbol: 'BTC',
            price: '$65,234',
            change: '+2.3%'
          }
        ],
        marketSignals: [
          {
            id: '1',
            signal: 'Golden Cross',
            asset: 'BTC',
            strength: 'Strong',
            timeframe: '4H',
            description: 'Moving averages indicate bullish momentum',
            confidence: 85,
            action: 'BUY'
          }
        ],
        lastUpdated: new Date().toISOString()
      };
      
      setData(fallbackData);
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