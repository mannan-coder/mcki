import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useRef } from 'react';
import { toast } from "sonner";

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
    // Additional fields for enhanced analytics
    priceChange24h: number;
    priceChangePercentage1h: number;
    marketCapChange24h: number;
    marketCapChangePercentage24h: number;
    fullyDilutedValuation: number;
    high24h: number;
    low24h: number;
    athChangePercentage: number;
    atlChangePercentage: number;
    roi: any;
    platforms: any;
    detailPlatforms: any;
    categories: string[];
    publicNotice: any;
    additionalNotices: any[];
    localization: any;
    description: any;
    links: any;
    countryOrigin: string;
    genesisDate: string | null;
    contractAddress: string;
    sentimentVotesUpPercentage: number;
    sentimentVotesDownPercentage: number;
    marketCapRank: number;
    coingeckoRank: number;
    coingeckoScore: number;
    developerScore: number;
    communityScore: number;
    liquidityScore: number;
    publicInterestScore: number;
  }>;
  lastUpdated: string;
}

const fetchCryptoData = async (limit: number = 500): Promise<CryptoData> => {
  const { data, error } = await supabase.functions.invoke('crypto-market-data', {
    body: { limit: limit.toString() }
  });
  
  if (error) throw error;
  return data;
};

// Price change notification system
const usePriceChangeNotifications = (data: CryptoData | undefined, isEnabled: boolean = true) => {
  const previousDataRef = useRef<CryptoData | undefined>();
  
  useEffect(() => {
    if (!isEnabled || !data || !previousDataRef.current) {
      previousDataRef.current = data;
      return;
    }

    const previousData = previousDataRef.current;
    const currentData = data;

    // Check for significant price changes (>5% in major coins)
    const majorCoins = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'xrp'];
    
    currentData.coins.forEach(coin => {
      const previousCoin = previousData.coins.find(c => c.id === coin.id);
      
      if (previousCoin && majorCoins.includes(coin.id)) {
        const priceDiff = ((coin.price - previousCoin.price) / previousCoin.price) * 100;
        
        if (Math.abs(priceDiff) >= 5) {
          const direction = priceDiff > 0 ? 'up' : 'down';
          const emoji = priceDiff > 0 ? '🚀' : '📉';
          
          toast(`${emoji} ${coin.name} ${direction} ${Math.abs(priceDiff).toFixed(1)}%`, {
            description: `Price moved to $${coin.price.toLocaleString()}`,
            duration: 4000,
          });
        }
      }
    });

    previousDataRef.current = currentData;
  }, [data, isEnabled]);
};

export const useOptimizedCryptoData = (limit: number = 500, enableNotifications: boolean = true) => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['crypto-data', limit],
    queryFn: () => fetchCryptoData(limit),
    staleTime: 15 * 1000, // 15 seconds - more aggressive for real-time feel
    refetchInterval: 15 * 1000, // Refetch every 15 seconds for real-time updates
    refetchOnWindowFocus: true, // Re-enable for fresh data when user returns
    refetchOnMount: true,
    placeholderData: (previousData: CryptoData | undefined) => previousData,
    retry: (failureCount, error) => {
      // Smart retry logic
      if (failureCount < 3 && !error?.message?.includes('rate limit')) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    meta: {
      errorMessage: 'Failed to fetch market data'
    },
    // Add background refetch for seamless updates
    refetchIntervalInBackground: true,
    // Force updates to trigger re-renders
    structuralSharing: false,
  });

  // Enable price change notifications
  usePriceChangeNotifications(query.data, enableNotifications);

  // Smart background updates - prefetch next batch
  useEffect(() => {
    if (query.data && !query.isFetching) {
      // Prefetch with slightly more data for smooth transitions
      const prefetchTimer = setTimeout(() => {
        queryClient.prefetchQuery({
          queryKey: ['crypto-data', limit + 50],
          queryFn: () => fetchCryptoData(limit + 50),
          staleTime: 30 * 1000,
        });
      }, 10000); // Prefetch after 10 seconds

      return () => clearTimeout(prefetchTimer);
    }
  }, [query.data, query.isFetching, queryClient, limit]);

  // Enhanced refetch with optimistic updates
  const enhancedRefetch = async () => {
    try {
      // Show loading indicator
      toast("Refreshing market data...", { duration: 1500 });
      
      await query.refetch();
      
      toast.success("Market data updated!", { duration: 2000 });
    } catch (error) {
      toast.error("Failed to refresh data", { duration: 3000 });
    }
  };

  return {
    ...query,
    refetch: enhancedRefetch,
    // Add real-time status indicator
    isRealTime: query.dataUpdatedAt && (Date.now() - query.dataUpdatedAt < 30000),
    lastUpdateTime: query.dataUpdatedAt,
  };
};