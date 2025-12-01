import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  image_url?: string;
  source_name: string;
  source_url: string;
  read_time: string;
  featured?: boolean;
}

export interface BlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  hasMore: boolean;
  categories: string[];
  error?: string;
}

export const useBlogData = () => {
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loadingMore, setLoadingMore] = useState(false);

  // Cache for storing fetched data
  const [cache, setCache] = useState<Map<string, BlogResponse>>(new Map());

  const fetchBlogData = useCallback(async (page: number = 1, category: string = 'All', append: boolean = false) => {
    const cacheKey = `${page}-${category}`;
    
    // Check cache first
    if (cache.has(cacheKey) && !append) {
      const cachedData = cache.get(cacheKey)!;
      setBlogData(cachedData);
      setLoading(false);
      return;
    }

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const { data, error: funcError } = await supabase.functions.invoke('crypto-blog-data', {
        body: {
          page,
          category: category === 'All' ? '' : category,
          limit: 25
        }
      });

      if (funcError) {
        throw new Error(funcError.message || 'Failed to fetch blog data');
      }

      if (data) {
        // Update cache
        setCache(prev => new Map(prev).set(cacheKey, data));

        if (append && blogData) {
          // Append new posts to existing ones
          const updatedData = {
            ...data,
            posts: [...blogData.posts, ...data.posts]
          };
          setBlogData(updatedData);
        } else {
          setBlogData(data);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog data';
      setError(errorMessage);
      console.error('Blog data fetch error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [cache, blogData]);

  // Initial load
  useEffect(() => {
    fetchBlogData(1, selectedCategory);
  }, [selectedCategory]);

  const loadMore = useCallback(() => {
    if (blogData && blogData.hasMore && !loadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchBlogData(nextPage, selectedCategory, true);
    }
  }, [blogData, currentPage, selectedCategory, loadingMore, fetchBlogData]);

  const changeCategory = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setBlogData(null);
  }, []);

  const refresh = useCallback(() => {
    setCache(new Map()); // Clear cache
    setCurrentPage(1);
    fetchBlogData(1, selectedCategory);
  }, [selectedCategory, fetchBlogData]);

  return {
    blogData,
    loading,
    loadingMore,
    error,
    selectedCategory,
    currentPage,
    loadMore,
    changeCategory,
    refresh,
    hasMore: blogData?.hasMore || false
  };
};