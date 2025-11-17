
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface OptimizedMarketData {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  activeCryptocurrencies: number;
  markets: number;
  fearGreedIndex: number;
  coins: Array<{
    id: string;
    symbol: string;
    name: string;
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
    marketCap: number;
    volume: number;
    rank: number;
    image: string;
    sparkline: number[];
    high24h: number;
    low24h: number;
    ath: number;
    athChangePercentage: number;
  }>;
  topGainers: Array<{
    id: string;
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    change7d: number;
    marketCap: number;
    volume: number;
    rank: number;
    image: string;
  }>;
  topLosers: Array<{
    id: string;
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    change7d: number;
    marketCap: number;
    volume: number;
    rank: number;
    image: string;
  }>;
  lastUpdated: string;
}

export const useOptimizedMarketOverview = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['optimized-market-overview'],
    queryFn: async (): Promise<OptimizedMarketData> => {
      try {
        const { data, error } = await supabase.functions.invoke('crypto-market-overview');
        
        if (error) {
          console.warn('⚠️ Market overview API temporarily unavailable:', error.message);
          throw new Error('Market data unavailable');
        }
        
        return data;
      } catch (error) {
        console.warn('⚠️ Unable to load live market data. Please try again later.');
        throw error;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: false, // Disable auto-refetch to prevent error spam
    refetchOnWindowFocus: false,
    retry: 1, // Only retry once
    retryDelay: 3000,
  });

  const refetch = async () => {
    // Invalidate and refetch the query to get fresh data
    await queryClient.invalidateQueries({ queryKey: ['optimized-market-overview'] });
    return query.refetch();
  };

  return {
    ...query,
    refetch
  };
};
