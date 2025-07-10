import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content?: string;
  category: string;
  time: string;
  impact: string;
  sentiment?: number;
  source: string;
  author?: string;
  readTime?: string;
  tags?: string[];
  url?: string;
  image?: string;
  views?: number;
  featured?: boolean;
}

export const useCryptoNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      // Only set loading on initial fetch
      if (news.length === 0) setLoading(true);
      
      console.log('Fetching crypto news...');
      const { data: result, error } = await supabase.functions.invoke('crypto-news');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('News fetched successfully:', result?.news?.length || 0, 'articles');
      setNews(result.news || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      
      // Fallback news data
      setNews([
        {
          id: 1,
          title: "Bitcoin ETF Sees Record Inflows as Institutional Interest Surges",
          summary: "Major financial institutions are pouring money into Bitcoin ETFs, with inflows reaching $2.1 billion this week alone.",
          category: "Bitcoin",
          time: new Date(Date.now() - 1800000).toISOString(),
          impact: "bullish",
          source: "CryptoNews",
          image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop"
        },
        {
          id: 2,
          title: "Ethereum Layer 2 Solutions Hit New Transaction Volume Records",
          summary: "Arbitrum and Optimism process over 5 million transactions daily as developers embrace scaling solutions.",
          category: "Ethereum",
          time: new Date(Date.now() - 3600000).toISOString(),
          impact: "bullish",
          source: "DeFi Daily",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop"
        },
        {
          id: 3,
          title: "Central Bank Digital Currency Trials Expand Globally",
          summary: "15 more countries announce CBDC pilot programs, potentially reshaping the digital payment landscape.",
          category: "Regulation",
          time: new Date(Date.now() - 7200000).toISOString(),
          impact: "neutral",
          source: "Regulatory Watch",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 10 minutes for better performance
    const interval = setInterval(fetchNews, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { news, loading, error, refetch: fetchNews };
};