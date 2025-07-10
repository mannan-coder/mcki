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