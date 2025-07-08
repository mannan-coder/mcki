import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, Clock, User, BarChart3, Filter, Search, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'ETF', 'Technology', 'Regulation', 'Security', 'Adoption', 'DeFi', 'Market Analysis'];
  const sentimentFilters = ['All', 'Very Positive', 'Positive', 'Neutral', 'Negative'];

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
    // More news items would go here...
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
    const matchesSentiment = selectedSentiment === 'All' || item.sentiment.label === selectedSentiment;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSentiment && matchesSearch;
  });

  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            📰 Crypto News Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest cryptocurrency news, market analysis, and sentiment insights
          </p>
        </div>

        {/* Filters & Search */}
        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
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
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
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

        {/* Market Sentiment Summary */}
        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
              <BarChart3 className="text-primary-foreground" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              📊 Overall Market Sentiment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">73%</div>
              <div className="text-sm text-muted-foreground">Average Sentiment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{newsData.length}</div>
              <div className="text-sm text-muted-foreground">Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">{newsData.filter(n => n.impact === 'bullish').length}</div>
              <div className="text-sm text-muted-foreground">Bullish News</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">{newsData.filter(n => n.impact === 'bearish').length}</div>
              <div className="text-sm text-muted-foreground">Bearish News</div>
            </div>
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              🔥 Featured Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredNews.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`}>
                  <article className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 group">
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
                          {item.sentiment.score}% {item.sentiment.label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm mb-4 line-clamp-2 text-muted-foreground">
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
                          <span>{item.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {item.views.toLocaleString()} views
                          </span>
                          <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            📊 Latest News & Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <article className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex space-x-2">
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
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm mb-3 line-clamp-3 text-muted-foreground">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock size={12} />
                        <span>{item.time}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>
                      <ArrowRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;