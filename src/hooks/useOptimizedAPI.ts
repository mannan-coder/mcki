import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

interface UseOptimizedAPIOptions {
  queryKey: string[];
  queryFn: () => Promise<any>;
  staleTime?: number;
  refetchInterval?: number;
  retry?: number;
  retryDelay?: number;
  enabled?: boolean;
}

export const useOptimizedAPI = ({
  queryKey,
  queryFn,
  staleTime = 5 * 60 * 1000, // 5 minutes
  refetchInterval,
  retry = 3,
  retryDelay = 1000,
  enabled = true
}: UseOptimizedAPIOptions) => {
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const queryClient = useQueryClient();

  const optimizedQueryFn = useCallback(async () => {
    const now = Date.now();
    
    // Prevent too frequent API calls
    if (now - lastFetchTime < 1000) {
      const cachedData = queryClient.getQueryData(queryKey);
      if (cachedData) return cachedData;
    }
    
    setLastFetchTime(now);
    
    try {
      const result = await queryFn();
      return result;
    } catch (error) {
      console.error(`API Error for ${queryKey.join('-')}:`, error);
      
      // Return cached data if available during error
      const cachedData = queryClient.getQueryData(queryKey);
      if (cachedData) {
        console.log('Returning cached data due to API error');
        return cachedData;
      }
      
      throw error;
    }
  }, [queryFn, queryKey, queryClient, lastFetchTime]);

  const query = useQuery({
    queryKey,
    queryFn: optimizedQueryFn,
    staleTime,
    refetchInterval,
    retry: (failureCount, error) => {
      // Don't retry on 429 (rate limit) errors
      if (error?.message?.includes('429')) return false;
      return failureCount < retry;
    },
    retryDelay: (attemptIndex) => Math.min(retryDelay * Math.pow(2, attemptIndex), 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
    // Keep data fresh with structural sharing
    structuralSharing: true,
    // Prevent background refetch to avoid unnecessary API calls
    refetchIntervalInBackground: false,
  });

  const optimizedRefetch = useCallback(async () => {
    try {
      await queryClient.invalidateQueries({ queryKey });
      return query.refetch();
    } catch (error) {
      console.error('Refetch error:', error);
      throw error;
    }
  }, [queryClient, queryKey, query]);

  return {
    ...query,
    refetch: optimizedRefetch,
    isStale: query.dataUpdatedAt && (Date.now() - query.dataUpdatedAt > staleTime),
  };
};
