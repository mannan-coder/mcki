import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ArbitrageOpportunity {
  pair: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  profitPotential: number;
  volume24h: number;
  lastUpdated: string;
}

interface ExchangeStatus {
  exchange: string;
  status: string;
  latency: number;
  tradingFee: number;
  withdrawalFee: number;
  volume24h: number;
}

interface ArbitrageData {
  arbitrageOpportunities: ArbitrageOpportunity[];
  exchangeStatus: ExchangeStatus[];
  marketMaking: {
    totalOpportunities: number;
    avgSpread: number;
    bestOpportunity: ArbitrageOpportunity | null;
    estimatedDailyVolume: number;
  };
  lastUpdated: string;
}

export const useArbitrageData = () => {
  const [data, setData] = useState<ArbitrageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArbitrageData = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase.functions.invoke('crypto-arbitrage');
      
      if (error) throw error;
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch arbitrage data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArbitrageData();
    
    // Refresh arbitrage data every 30 seconds for real-time opportunities
    const interval = setInterval(fetchArbitrageData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchArbitrageData };
};