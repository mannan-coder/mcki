import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BarChart3, Clock, User, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { useCryptoNews } from '@/hooks/useCryptoNews';
import { motion } from 'framer-motion';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  time: string;
  impact: string;
  source: string;
  author: string;
  readTime: string;
  image: string;
  sentiment: {
    score: number;
    label: string;
    trend: 'up' | 'down' | 'neutral';
  };
  views: number;
  featured: boolean;
}

const News = () => {
  const { news: newsItems, loading: newsLoading, error } = useCryptoNews();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'ETF', 'Technology', 'Regulation', 'Security', 'Adoption', 'DeFi', 'Market Analysis'];
  const sentimentFilters = ['All', 'Very Positive', 'Positive', 'Neutral', 'Negative'];

  // Mock featured news for demonstration
  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "Bitcoin ETF Approval Drives Market Rally",
      summary: "Major institutional investors are pouring billions into Bitcoin ETFs, pushing BTC to new monthly highs with unprecedented trading volumes.",
      category: "ETF",
      time: "2 hours ago",
      impact: "bullish",
      source: "CoinDesk",
      author: "Sarah Chen",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      sentiment: { score: 85, label: "Very Positive", trend: "up" },
      views: 12847,
      featured: true
    },
    {
      id: 2,
      title: "Ethereum Layer 2 Solutions See Record Growth",
      summary: "Arbitrum and Optimism report 300% increase in daily active users as gas fees remain low and DeFi adoption accelerates.",
      category: "Technology",
      time: "4 hours ago",
      impact: "bullish",
      source: "Decrypt",
      author: "Michael Park",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
      sentiment: { score: 78, label: "Positive", trend: "up" },
      views: 8924,
      featured: false
    }
  ];

  const newsStats = [
    {
      label: 'Articles Today',
      value: newsItems.length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <span>📰</span>
    },
    {
      label: 'Avg Sentiment',
      value: '73%',
      change: '+5%',
      trend: 'up' as const,
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      label: 'Bullish News',
      value: newsData.filter(n => n.impact === 'bullish').length.toString(),
      change: '+8%',
      trend: 'up' as const,
      icon: <span>📈</span>
    },
    {
      label: 'Total Views',
      value: '156K',
      change: '+23%',
      trend: 'up' as const,
      icon: <span>👁️</span>
    }
  ];

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 70) return 'bg-success/20 border-success/30';
    if (score >= 40) return 'bg-warning/20 border-warning/30';
    return 'bg-destructive/20 border-destructive/30';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'text-success bg-success/20 border-success/30';
      case 'bearish': return 'text-destructive bg-destructive/20 border-destructive/30';
      default: return 'text-muted-foreground bg-muted border-muted';
    }
  };

  const filteredNews = newsData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSentiment = selectedSentiment === 'All' || item.sentiment?.label === selectedSentiment;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSentiment && matchesSearch;
  });

  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  if (newsLoading && newsItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
          <DataSection
            title="Crypto News Hub"
            subtitle="Stay updated with the latest cryptocurrency news, market analysis, and sentiment insights"
            icon={<span className="text-2xl">📰</span>}
          >
            <div className="space-y-6">
              <StatsGrid stats={[]} loading={true} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <ResponsiveCard key={i}>
                    <div className="space-y-4">
                      <div className="h-48 bg-muted rounded animate-pulse"></div>
                      <div className="h-6 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                    </div>
                  </ResponsiveCard>
                ))}
              </div>
            </div>
          </DataSection>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        <DataSection
          title="Crypto News Hub"
          subtitle="Stay updated with the latest cryptocurrency news, market analysis, and sentiment insights"
          icon={<span className="text-2xl">📰</span>}
        >
          <div className="space-y-6">
            {/* News Stats */}
            <StatsGrid stats={newsStats} />

            {/* Filters & Search */}
            <ResponsiveCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Filters & Search</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sentiment Filter */}
                  <div>
                    <select
                      value={selectedSentiment}
                      onChange={(e) => setSelectedSentiment(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    >
                      {sentimentFilters.map(sentiment => (
                        <option key={sentiment} value={sentiment}>{sentiment}</option>
                      ))}
                    </select>
                  </div>

                  {/* Results Count */}
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">
                      {filteredNews.length} articles found
                    </span>
                  </div>
                </div>
              </div>
            </ResponsiveCard>

            {/* Market Sentiment Summary */}
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Market Sentiment Overview</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">73%</div>
                    <div className="text-sm text-muted-foreground">Average Sentiment</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{filteredNews.length}</div>
                    <div className="text-sm text-muted-foreground">Total Articles</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">{filteredNews.filter(n => n.impact === 'bullish').length}</div>
                    <div className="text-sm text-muted-foreground">Bullish News</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-warning mb-1">156K</div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                </div>
              </div>
            </ResponsiveCard>

            {/* Featured News */}
            {featuredNews.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Featured Stories</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={`/news/${item.id}`}>
                        <ResponsiveCard hover={true} className="overflow-hidden group">
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4 flex space-x-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(item.impact)}`}>
                                {item.category}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSentimentBg(item.sentiment.score)} ${getSentimentColor(item.sentiment.score)}`}>
                                {item.sentiment.score}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6 space-y-4">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-sm line-clamp-2 text-muted-foreground">
                              {item.summary}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <User size={12} />
                                  <span>{item.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock size={12} />
                                  <span>{item.time}</span>
                                </div>
                              </div>
                              <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </ResponsiveCard>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular News Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Latest News & Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/news/${item.id}`}>
                      <ResponsiveCard hover={true} className="overflow-hidden group">
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(item.impact)}`}>
                              {item.category}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentBg(item.sentiment.score)} ${getSentimentColor(item.sentiment.score)}`}>
                              {item.sentiment.score}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5 space-y-3">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm line-clamp-3 text-muted-foreground">
                            {item.summary}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Clock size={12} />
                              <span>{item.time}</span>
                            </div>
                            <ArrowRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </ResponsiveCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </DataSection>
      </div>
    </Layout>
  );
};

export default News;