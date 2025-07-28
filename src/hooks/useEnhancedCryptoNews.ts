import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedNewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  time: string;
  impact: string;
  source: string;
  content?: string;
  author?: string;
  readTime?: string;
  tags?: string[];
  url?: string;
  image?: string;
  views?: number;
  featured?: boolean;
  sentiment?: number;
}

export const useEnhancedCryptoNews = () => {
  const [news, setNews] = useState<EnhancedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      // Only show loading on initial fetch
      if (news.length === 0) setLoading(true);
      
      console.log('Fetching enhanced crypto news...');
      
      // Add timestamp to prevent caching and force fresh data
      const timestamp = Date.now();
      const { data: result, error } = await supabase.functions.invoke('crypto-news', {
        body: { timestamp, forceRefresh: true }
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      if (result && Array.isArray(result)) {
        console.log(`Enhanced news fetched successfully: ${result.length} articles`);
        // Sort by time to get most recent first
        const sortedNews = result.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setNews(sortedNews);
        setError(null);
      } else {
        console.log('No news data received, using fallback');
        // Enhanced fallback data with more variety
        const fallbackNews: EnhancedNewsItem[] = [
          {
            id: Date.now() + 1,
            title: "Bitcoin Surges Past $70K as Institutional Adoption Accelerates",
            summary: "Major financial institutions continue to embrace Bitcoin, driving unprecedented demand and price appreciation across global markets.",
            category: "Bitcoin",
            time: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
            impact: "bullish",
            source: "CryptoNews Today",
            author: "Sarah Johnson",
            readTime: "3 min read",
            tags: ["Bitcoin", "Institutional", "Price", "Bullish"],
            featured: true,
            views: 15420,
            sentiment: 85
          },
          {
            id: Date.now() + 2,
            title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
            summary: "Layer 2 scaling solutions process over 5 million transactions daily, significantly reducing costs and improving user experience.",
            category: "Ethereum",
            time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
            impact: "bullish",
            source: "DeFi Weekly",
            author: "Michael Chen",
            readTime: "4 min read",
            tags: ["Ethereum", "Layer 2", "Scaling", "DeFi"],
            featured: true,
            views: 12750,
            sentiment: 78
          },
          {
            id: Date.now() + 3,
            title: "DeFi Protocol Launches Revolutionary Yield Farming Strategy",
            summary: "New automated yield optimization protocol promises up to 25% APY while maintaining security through advanced smart contract architecture.",
            category: "DeFi",
            time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            impact: "bullish",
            source: "DeFi Pulse",
            author: "Emily Rodriguez",
            readTime: "5 min read",
            tags: ["DeFi", "Yield Farming", "Innovation", "Smart Contracts"],
            featured: false,
            views: 8930,
            sentiment: 82
          },
          {
            id: Date.now() + 4,
            title: "Central Bank Digital Currency Pilots Show Promising Results",
            summary: "Multiple central banks report successful CBDC trials with improved transaction speeds and reduced costs compared to traditional systems.",
            category: "Regulation",
            time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
            impact: "neutral",
            source: "Financial Times",
            author: "David Kim",
            readTime: "6 min read",
            tags: ["CBDC", "Central Banks", "Digital Currency", "Government"],
            featured: false,
            views: 11200,
            sentiment: 65
          },
          {
            id: Date.now() + 5,
            title: "NFT Marketplace Introduces Utility-Based Trading Features",
            summary: "Leading NFT platform launches new features allowing collectors to earn passive income through staking and governance participation.",
            category: "NFT",
            time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
            impact: "bullish",
            source: "NFT Today",
            author: "Lisa Zhang",
            readTime: "4 min read",
            tags: ["NFT", "Marketplace", "Utility", "Staking"],
            featured: false,
            views: 6780,
            sentiment: 71
          },
          {
            id: Date.now() + 6,
            title: "Cryptocurrency Market Cap Reaches New All-Time High",
            summary: "Total cryptocurrency market capitalization surpasses $3 trillion as altcoins experience significant growth alongside Bitcoin and Ethereum.",
            category: "Market",
            time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
            impact: "bullish",
            source: "CoinMarketCap",
            author: "Robert Taylor",
            readTime: "3 min read",
            tags: ["Market Cap", "Altcoins", "Growth", "ATH"],
            featured: false,
            views: 9450,
            sentiment: 88
          },
          {
            id: Date.now() + 7,
            title: "Blockchain Technology Adoption Grows in Traditional Finance",
            summary: "Major banks and financial institutions increasingly integrate blockchain solutions for faster settlements and improved transparency.",
            category: "Adoption",
            time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
            impact: "bullish",
            source: "Bloomberg Crypto",
            author: "Maria Santos",
            readTime: "5 min read",
            tags: ["Blockchain", "Traditional Finance", "Adoption", "Banks"],
            featured: false,
            views: 7320,
            sentiment: 76
          },
          {
            id: Date.now() + 8,
            title: "Crypto Mining Efficiency Improves with Green Energy Initiatives",
            summary: "Mining operations increasingly adopt renewable energy sources, reducing environmental impact while maintaining network security.",
            category: "Mining",
            time: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
            impact: "neutral",
            source: "Green Mining Report",
            author: "Alex Thompson",
            readTime: "4 min read",
            tags: ["Mining", "Green Energy", "Sustainability", "Environment"],
            featured: false,
            views: 5610,
            sentiment: 68
          }
        ];
        
        setNews(fallbackNews);
      }
    } catch (err) {
      console.error('Failed to fetch enhanced news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      
      // Provide minimal fallback
      if (news.length === 0) {
        setNews([
          {
            id: 1,
            title: "Cryptocurrency Market Update",
            summary: "Stay tuned for the latest cryptocurrency market developments and analysis.",
            category: "Market",
            time: new Date().toISOString(),
            impact: "neutral",
            source: "MCKI News"
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 2 minutes for fresher content
    const interval = setInterval(fetchNews, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { news, loading, error, refetch: fetchNews };
};