import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CryptoData {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  fearGreedIndex: number;
  activeCryptocurrencies: number;
  markets: number;
  coins: Array<{
    id: string;
    symbol: string;
    name: string;
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
    change30d: number;
    marketCap: number;
    volume: number;
    rank: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    ath: number;
    athDate: string;
    atl: number;
    atlDate: string;
    image: string;
    sparkline: number[];
    lastUpdated: string;
  }>;
  lastUpdated: string;
}

const fetchCryptoData = async (limit: number = 250): Promise<CryptoData> => {
  const { data, error } = await supabase.functions.invoke('crypto-market-data', {
    body: { limit: limit.toString() }
  });
  
  if (error) throw error;
  return data;
};

export const useOptimizedCryptoData = (limit: number = 250) => {
  return useQuery({
    queryKey: ['crypto-data', limit],
    queryFn: () => fetchCryptoData(limit),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    refetchOnWindowFocus: false, // Disabled to prevent unnecessary refetches
    placeholderData: (previousData: CryptoData | undefined) => previousData, // Keep previous data during refetch for smooth updates
    retry: (failureCount, error) => {
      // Smart retry logic based on error type
      if (failureCount < 2 && !error?.message?.includes('rate limit')) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    meta: {
      errorMessage: 'Failed to fetch market data'
    }
  });
};