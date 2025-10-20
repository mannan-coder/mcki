import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BarChart3, Clock, User, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { useEnhancedCryptoNews } from '@/hooks/useEnhancedCryptoNews';
import { motion } from 'framer-motion';
import AdPlacement from '@/components/ads/AdPlacement';

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
  const { news: apiNews, loading: newsLoading, error, refetch } = useEnhancedCryptoNews();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImpact, setSelectedImpact] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Regulation', 'DeFi', 'Government', 'NFT', 'Technology', 'Adoption', 'Market Analysis'];
  const impactFilters = ['All', 'bullish', 'bearish', 'neutral'];

  // Use actual API data and determine featured articles dynamically
  const newsData = apiNews.map((item, index) => ({
    ...item,
    sentiment: {
      score: item.impact === 'bullish' ? 75 : item.impact === 'bearish' ? 25 : 50,
      label: item.impact === 'bullish' ? 'Positive' : item.impact === 'bearish' ? 'Negative' : 'Neutral',
      trend: item.impact === 'bullish' ? 'up' : item.impact === 'bearish' ? 'down' : 'neutral'
    },
    author: item.source,
    readTime: item.readTime || '3 min read',
    views: Math.floor(Math.random() * 10000) + 1000,
    featured: false, // Will be set below based on criteria
    image: item.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format'
  }));

  // Mark featured articles based on criteria: most recent, high impact, or important categories
  newsData.forEach((item, index) => {
    const isRecent = index < 3; // Top 3 most recent
    const isHighImpact = item.impact === 'bullish' || item.impact === 'bearish';
    const isImportantCategory = ['Bitcoin', 'Ethereum', 'Regulation', 'DeFi'].some(cat => 
      item.category.toLowerCase().includes(cat.toLowerCase()) || 
      item.title.toLowerCase().includes(cat.toLowerCase())
    );
    
    // Mark as featured if it meets any of these criteria and we haven't exceeded 3 featured articles
    if ((isRecent || isHighImpact || isImportantCategory) && newsData.filter(n => n.featured).length < 3) {
      item.featured = true;
    }
  });

  const newsStats = [
    {
      label: 'Articles Today',
      value: newsData.length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <span>📰</span>
    },
    {
      label: 'Avg Sentiment',
      value: `${Math.round(newsData.reduce((acc, item) => acc + item.sentiment.score, 0) / newsData.length)}%`,
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
      value: `${Math.round(newsData.reduce((acc, item) => acc + item.views, 0) / 1000)}K`,
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
      default: return 'text-muted-foreground bg-muted/20 border-muted';
    }
  };

  const filteredNews = newsData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesImpact = selectedImpact === 'All' || item.impact === selectedImpact;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesImpact && matchesSearch;
  });

  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  // Handle image error with fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format';
  };

  if (newsLoading && newsData.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
          <DataSection
            title="Crypto News Hub"
            subtitle="Stay updated with the latest cryptocurrency news, market analysis, and insights"
            icon={<span className="text-2xl">📰</span>}
          >
            <div className="space-y-6">
              <StatsGrid stats={[]} loading={true} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ResponsiveCard key={i}>
                    <div className="space-y-4">
                      <div className="h-48 bg-muted rounded-lg animate-pulse"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-muted rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                      </div>
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

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
          <DataSection
            title="Crypto News Hub"
            subtitle="Something went wrong loading the news"
            icon={<span className="text-2xl">📰</span>}
          >
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
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

                  {/* Impact Filter */}
                  <div>
                    <select
                      value={selectedImpact}
                      onChange={(e) => setSelectedImpact(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    >
                      {impactFilters.map(impact => (
                        <option key={impact} value={impact}>
                          {impact === 'All' ? 'All Impact' : impact.charAt(0).toUpperCase() + impact.slice(1)}
                        </option>
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
                    <div className="text-2xl font-bold text-success mb-1">
                      {Math.round(newsData.reduce((acc, item) => acc + item.sentiment.score, 0) / newsData.length)}%
                    </div>
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
                    <div className="text-2xl font-bold text-warning mb-1">
                      {Math.round(newsData.reduce((acc, item) => acc + item.views, 0) / 1000)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                </div>
              </div>
            </ResponsiveCard>

            {/* Ad 1 - After Market Sentiment */}
            <AdPlacement position="content" />

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
                        <ResponsiveCard hover={true} className="overflow-hidden group h-full">
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={handleImageError}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getImpactColor(item.impact)}`}>
                                {item.category}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getSentimentBg(item.sentiment.score)} ${getSentimentColor(item.sentiment.score)}`}>
                                {item.sentiment.score}%
                              </span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="text-xs text-white/80 mb-2">{item.time}</div>
                            </div>
                          </div>
                          
                          <div className="p-6 space-y-4 flex-1">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed">
                              {item.summary}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-border/20">
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <User size={12} />
                                  <span>{item.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span>👁️</span>
                                  <span>{item.views.toLocaleString()}</span>
                                </div>
                              </div>
                              <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </ResponsiveCard>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Latest News & Analysis</h2>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Live updates</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Link to={`/news/${item.id}`} className="block h-full">
                      <ResponsiveCard hover={true} className="overflow-hidden group h-full flex flex-col">
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getImpactColor(item.impact)}`}>
                              {item.category}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getSentimentBg(item.sentiment.score)} ${getSentimentColor(item.sentiment.score)}`}>
                              {item.sentiment.score}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5 space-y-3 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed flex-1">
                            {item.summary}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/20">
                            <div className="flex items-center space-x-3">
                               <div className="flex items-center space-x-1">
                                 <Clock size={12} />
                                 <span>{typeof item.time === 'string' && item.time.includes('ago') ? item.time : new Date(item.time).toLocaleDateString()}</span>
                               </div>
                              <div className="flex items-center space-x-1">
                                <span>👁️</span>
                                <span>{item.views.toLocaleString()}</span>
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
          </div>
        </DataSection>
      </div>
    </Layout>
  );
};

export default News;