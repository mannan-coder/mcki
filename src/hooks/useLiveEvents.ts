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
      
      // Enhanced fallback events data with more events
      const fallbackData: LiveEventsData = {
        upcomingEvents: [
          {
            id: '1',
            title: 'Bitcoin ETF Decision',
            date: '2025-07-12',
            time: '14:00 UTC',
            impact: 'high',
            type: 'economic',
            description: 'SEC decision on Bitcoin ETF applications that could significantly impact cryptocurrency markets',
            countdown: 'In 2 days'
          },
          {
            id: '2',
            title: 'Ethereum Network Upgrade',
            date: '2025-07-15',
            time: '12:00 UTC',
            impact: 'medium',
            type: 'upgrade',
            description: 'Minor network improvements and optimizations to enhance transaction efficiency',
            countdown: 'In 5 days'
          },
          {
            id: '3',
            title: 'Fed Interest Rate Decision',
            date: '2025-07-17',
            time: '18:00 UTC',
            impact: 'high',
            type: 'economic',
            description: 'Federal Reserve interest rate announcement that could impact crypto market sentiment',
            countdown: 'In 1 week'
          },
          {
            id: '4',
            title: 'Bitcoin Halving Countdown',
            date: '2025-08-20',
            time: '12:00 UTC',
            impact: 'high',
            type: 'network',
            description: 'Approaching Bitcoin halving event that will reduce mining rewards by 50%',
            countdown: 'In 1 month'
          },
          {
            id: '5',
            title: 'Cardano Chang Hard Fork',
            date: '2025-07-25',
            time: '16:00 UTC',
            impact: 'medium',
            type: 'upgrade',
            description: 'Major Cardano network upgrade introducing governance features and smart contract improvements',
            countdown: 'In 2 weeks'
          },
          {
            id: '6',
            title: 'Solana Breakpoint Conference',
            date: '2025-08-05',
            time: '09:00 UTC',
            impact: 'medium',
            type: 'conference',
            description: 'Annual Solana developer conference with major ecosystem announcements expected',
            countdown: 'In 3 weeks'
          },
          {
            id: '7',
            title: 'European Crypto Regulation (MiCA)',
            date: '2025-07-30',
            time: '10:00 UTC',
            impact: 'high',
            type: 'regulatory',
            description: 'Implementation of Markets in Crypto-Assets regulation across European Union',
            countdown: 'In 2.5 weeks'
          },
          {
            id: '8',
            title: 'Polygon zkEVM Mainnet Beta',
            date: '2025-08-10',
            time: '15:00 UTC',
            impact: 'medium',
            type: 'upgrade',
            description: 'Launch of Polygon zkEVM mainnet beta with enhanced scaling capabilities',
            countdown: 'In 1 month'
          },
          {
            id: '9',
            title: 'Chainlink CCIP Launch',
            date: '2025-08-15',
            time: '14:00 UTC',
            impact: 'medium',
            type: 'upgrade',
            description: 'Cross-Chain Interoperability Protocol enabling secure cross-chain communications',
            countdown: 'In 5 weeks'
          },
          {
            id: '10',
            title: 'Bank of Japan Digital Yen Pilot',
            date: '2025-09-01',
            time: '01:00 UTC',
            impact: 'high',
            type: 'economic',
            description: 'Central bank digital currency pilot program launch in Japan',
            countdown: 'In 7 weeks'
          },
          {
            id: '11',
            title: 'Avalanche Subnet Updates',
            date: '2025-08-22',
            time: '17:00 UTC',
            impact: 'low',
            type: 'upgrade',
            description: 'Technical improvements to Avalanche subnet infrastructure and performance',
            countdown: 'In 6 weeks'
          },
          {
            id: '12',
            title: 'Cosmos Hub Upgrade v12',
            date: '2025-09-05',
            time: '13:00 UTC',
            impact: 'medium',
            type: 'upgrade',
            description: 'Major Cosmos Hub upgrade with interchain security and liquid staking features',
            countdown: 'In 8 weeks'
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