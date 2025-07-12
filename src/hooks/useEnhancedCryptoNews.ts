import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedNewsItem {
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

export const useEnhancedCryptoNews = () => {
  const [news, setNews] = useState<EnhancedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      // Only set loading on initial fetch for better UX
      if (news.length === 0) setLoading(true);
      
      console.log('Fetching enhanced crypto news...');
      const { data: result, error } = await supabase.functions.invoke('crypto-news');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Enhanced news fetched successfully:', result?.news?.length || 0, 'articles');
      setNews(result.news || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch enhanced news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      
      // Enhanced fallback news data with more comprehensive content
      setNews([
        {
          id: 1,
          title: "Bitcoin ETF Drives Unprecedented Institutional Adoption Wave",
          summary: "Financial institutions are accelerating Bitcoin adoption with ETF inflows exceeding $3B this month, marking a new era of mainstream acceptance.",
          category: "Bitcoin",
          time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "Financial Times",
          image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop&auto=format",
          author: "Sarah Johnson",
          readTime: "6 min read",
          tags: ["Bitcoin", "ETF", "Institutional", "Adoption"],
          views: 15420,
          featured: true,
          sentiment: 85
        },
        {
          id: 2,
          title: "Ethereum Layer 2 Solutions Process Record 10M Daily Transactions",
          summary: "Arbitrum and Polygon reach new milestones as Layer 2 adoption surges, with transaction costs falling below $0.001 per transaction.",
          category: "Ethereum",
          time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "The Block",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&auto=format",
          author: "Michael Chen",
          readTime: "5 min read",
          tags: ["Ethereum", "Layer 2", "Scaling", "Technology"],
          views: 12350,
          featured: true,
          sentiment: 80
        },
        {
          id: 3,
          title: "Global Regulators Unite on Comprehensive Crypto Framework",
          summary: "G20 nations announce coordinated cryptocurrency regulation approach, providing clarity for institutions and fostering innovation.",
          category: "Regulation",
          time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "Reuters",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format",
          author: "Emily Rodriguez",
          readTime: "7 min read",
          tags: ["Regulation", "G20", "Framework", "Compliance"],
          views: 18750,
          featured: true,
          sentiment: 75
        },
        {
          id: 4,
          title: "DeFi Total Value Locked Surpasses $100 Billion Milestone",
          summary: "Decentralized finance protocols achieve historic TVL milestone as yield farming and liquidity provision reach new peaks.",
          category: "DeFi",
          time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "DeFi Pulse",
          image: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=400&h=300&fit=crop&auto=format",
          author: "Alex Kim",
          readTime: "4 min read",
          tags: ["DeFi", "TVL", "Milestone", "Liquidity"],
          views: 9850,
          featured: false,
          sentiment: 78
        },
        {
          id: 5,
          title: "NFT Gaming Revolution: Play-to-Earn Economy Tops $5 Billion",
          summary: "Blockchain gaming reaches new heights with players earning significant income through NFT-based play-to-earn mechanisms.",
          category: "NFT",
          time: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "GameFi Today",
          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop&auto=format",
          author: "Lisa Zhang",
          readTime: "5 min read",
          tags: ["NFT", "Gaming", "Play-to-Earn", "Blockchain"],
          views: 11200,
          featured: false,
          sentiment: 82
        },
        {
          id: 6,
          title: "Central Bank Digital Currencies Gain Momentum Globally",
          summary: "Over 100 countries exploring CBDCs as digital payment infrastructure evolves, with pilot programs showing promising results.",
          category: "Technology",
          time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          impact: "neutral",
          source: "Bank for International Settlements",
          image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop&auto=format",
          author: "Roberto Silva",
          readTime: "6 min read",
          tags: ["CBDC", "Central Banks", "Digital Currency", "Payments"],
          views: 7650,
          featured: false,
          sentiment: 65
        },
        {
          id: 7,
          title: "Web3 Social Media Platforms See 300% User Growth",
          summary: "Decentralized social networks attract millions of users seeking censorship resistance and data ownership control.",
          category: "Technology",
          time: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "Web3 Insights",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&auto=format",
          author: "David Park",
          readTime: "4 min read",
          tags: ["Web3", "Social Media", "Decentralization", "Users"],
          views: 8900,
          featured: false,
          sentiment: 73
        },
        {
          id: 8,
          title: "Cryptocurrency Mining Transitions to Renewable Energy",
          summary: "Bitcoin mining operations report 58% renewable energy usage as industry addresses environmental concerns.",
          category: "Technology",
          time: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "Green Crypto Report",
          image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&auto=format",
          author: "Maria Thompson",
          readTime: "5 min read",
          tags: ["Mining", "Renewable Energy", "Environment", "Sustainability"],
          views: 6750,
          featured: false,
          sentiment: 70
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 5 minutes for better performance while maintaining freshness
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { news, loading, error, refetch: fetchNews };
};