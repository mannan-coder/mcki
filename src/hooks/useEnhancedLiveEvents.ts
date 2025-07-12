import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  impact: string;
  type: string;
  description: string;
  countdown: string;
  venue?: string;
  website?: string;
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

interface MarketMetrics {
  totalMarketCap: number;
  btcDominance: number;
  ethDominance: number;
  totalVolume24h: number;
  activeCryptocurrencies: number;
  fearGreedIndex: number;
}

interface EnhancedLiveEventsData {
  upcomingEvents: EnhancedEvent[];
  liveAlerts: LiveAlert[];
  marketSignals: MarketSignal[];
  marketMetrics: MarketMetrics;
  lastUpdated: string;
  success: boolean;
}

export const useEnhancedLiveEvents = () => {
  const [data, setData] = useState<EnhancedLiveEventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventsData = async () => {
    try {
      if (!data) setLoading(true);
      
      console.log('Fetching enhanced live events data...');
      const { data: result, error } = await supabase.functions.invoke('crypto-live-events');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Enhanced events data fetched successfully');
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch enhanced events data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events data');
      
      // Enhanced fallback data
      const fallbackData: EnhancedLiveEventsData = {
        upcomingEvents: [
          {
            id: 'fallback-1',
            title: 'Bitcoin Network Upgrade',
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            time: '12:00 UTC',
            impact: 'high',
            type: 'upgrade',
            description: 'Major Bitcoin network upgrade improving transaction efficiency and security',
            countdown: '30d 0h'
          },
          {
            id: 'fallback-2',
            title: 'Global Crypto Conference 2025',
            date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            time: '09:00 UTC',
            impact: 'medium',
            type: 'conference',
            description: 'Largest cryptocurrency conference bringing together industry leaders',
            countdown: '45d 0h'
          }
        ],
        liveAlerts: [
          {
            id: 'alert-fallback-1',
            type: 'price',
            title: 'Bitcoin Price Movement',
            message: 'BTC showing strong momentum with increased volume',
            time: new Date().toISOString(),
            severity: 'medium',
            symbol: 'BTC',
            price: '$45,000',
            change: '+3.2%'
          }
        ],
        marketSignals: [
          {
            id: 'signal-fallback-1',
            signal: 'Market Recovery',
            asset: 'BTC',
            strength: 'Medium',
            timeframe: '4H',
            description: 'Bitcoin showing signs of recovery with increased buying pressure',
            confidence: 75,
            action: 'Watch'
          }
        ],
        marketMetrics: {
          totalMarketCap: 2500000000000,
          btcDominance: 52.5,
          ethDominance: 16.8,
          totalVolume24h: 45000000000,
          activeCryptocurrencies: 13500,
          fearGreedIndex: 65
        },
        lastUpdated: new Date().toISOString(),
        success: false
      };
      
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
    
    // Refresh every 2 minutes for live data, but reduced for performance
    const interval = setInterval(fetchEventsData, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchEventsData };
};