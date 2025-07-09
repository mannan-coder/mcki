import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PricePoint {
  time: number;
  price: number;
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

interface VolumePoint {
  time: number;
  volume: number;
  date: string;
}

interface MarketCapPoint {
  time: number;
  marketCap: number;
  date: string;
}

interface PriceHistory {
  prices: PricePoint[];
  volumes: VolumePoint[];
  marketCaps: MarketCapPoint[];
  priceRange?: {
    high: number;
    low: number;
    change: number;
    changePercent: number;
  };
}

export type TimeframeType = '1d' | '7d' | '30d' | '90d' | '1y' | 'max';

export const usePriceHistory = (coinId: string, days: TimeframeType = '7d') => {
  const [data, setData] = useState<PriceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDaysNumber = (timeframe: TimeframeType): string => {
    switch (timeframe) {
      case '1d': return '1';
      case '7d': return '7';
      case '30d': return '30';
      case '90d': return '90';
      case '1y': return '365';
      case 'max': return 'max';
      default: return '7';
    }
  };

  const getInterval = (timeframe: TimeframeType): string => {
    switch (timeframe) {
      case '1d': return 'hourly';
      case '7d': return 'daily';
      case '30d': return 'daily';
      case '90d': return 'daily';
      case '1y': return 'daily';
      case 'max': return 'monthly';
      default: return 'daily';
    }
  };

  const fetchPriceHistory = async (id: string, timeframe: TimeframeType) => {
    try {
      setLoading(true);
      const daysStr = getDaysNumber(timeframe);
      const interval = getInterval(timeframe);
      
      const { data: result, error } = await supabase.functions.invoke('crypto-price-history', {
        body: { id, days: daysStr, interval }
      });
      
      if (error) throw error;
      
      // Calculate price range for the timeframe
      if (result?.prices && result.prices.length > 0) {
        const prices = result.prices.map((p: any) => p.price);
        const high = Math.max(...prices);
        const low = Math.min(...prices);
        const firstPrice = result.prices[0].price;
        const lastPrice = result.prices[result.prices.length - 1].price;
        const change = lastPrice - firstPrice;
        const changePercent = (change / firstPrice) * 100;
        
        result.priceRange = {
          high,
          low,
          change,
          changePercent
        };
      }
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchPriceHistory(coinId, days);
    }
  }, [coinId, days]);

  return { 
    data, 
    loading, 
    error, 
    refetch: () => fetchPriceHistory(coinId, days),
    setTimeframe: (timeframe: TimeframeType) => fetchPriceHistory(coinId, timeframe)
  };
};