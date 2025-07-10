import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WhaleTransaction {
  id: string;
  amount: string;
  usdValue: string;
  from: string;
  to: string;
  time: string;
  status: 'inflow' | 'outflow';
  impact: 'high' | 'medium' | 'low';
}

interface ExchangeFlow {
  totalInflow: string;
  totalOutflow: string;
  netFlow: string;
  trend: string;
  change24h: string;
}

interface WhaleData {
  whaleTransactions: WhaleTransaction[];
  exchangeFlows: {
    bitcoin: ExchangeFlow;
    ethereum: ExchangeFlow;
    exchanges: Array<{
      name: string;
      inflow: string;
      outflow: string;
      netFlow: string;
    }>;
  };
  lastUpdated: string;
}

export const useWhaleData = () => {
  const [data, setData] = useState<WhaleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWhaleData = async () => {
    try {
      if (!data) setLoading(true);
      
      console.log('Fetching whale data...');
      const { data: result, error } = await supabase.functions.invoke('crypto-whale-data');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Whale data fetched successfully');
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch whale data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch whale data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWhaleData();
    
    // Refresh every 2 minutes for real-time feel
    const interval = setInterval(fetchWhaleData, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchWhaleData };
};