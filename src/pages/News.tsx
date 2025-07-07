import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, Clock, User, BarChart3, Filter, Search, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
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
    {
      id: 2,
      title: "Ethereum Shanghai Upgrade Completed Successfully",
      summary: "The network upgrade has been implemented without issues, enabling staking withdrawals and improving scalability across the ecosystem.",
      category: "Technology",
      time: "4 hours ago",
      impact: "bullish",
      source: "Ethereum Foundation",
      author: "Vitalik Buterin",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      sentiment: { score: 82, label: "Positive", trend: "up" },
      views: 9534,
      featured: true
    },
    {
      id: 3,
      title: "SEC Increases Crypto Regulation Enforcement",
      summary: "New regulatory guidelines may impact several altcoins and DeFi protocols operating in the US market, creating uncertainty.",
      category: "Regulation",
      time: "6 hours ago",
      impact: "bearish",
      source: "Reuters",
      author: "Michael Rodriguez",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      sentiment: { score: 35, label: "Negative", trend: "down" },
      views: 8721,
      featured: false
    },
    {
      id: 4,
      title: "DeFi Protocol TVL Reaches All-Time High",
      summary: "Decentralized finance protocols see massive growth with total value locked surpassing previous records amid institutional interest.",
      category: "DeFi",
      time: "8 hours ago",
      impact: "bullish",
      source: "DeFi Pulse",
      author: "Anna Kim",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop",
      sentiment: { score: 78, label: "Positive", trend: "up" },
      views: 6543,
      featured: false
    },
    {
      id: 5,
      title: "Major Exchange Security Breach Contained",
      summary: "Quick response from security teams prevents major losses, but highlights ongoing security challenges in the crypto space.",
      category: "Security",
      time: "10 hours ago",
      impact: "bearish",
      source: "CryptoNews",
      author: "David Park",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      sentiment: { score: 42, label: "Neutral", trend: "neutral" },
      views: 5467,
      featured: false
    },
    {
      id: 6,
      title: "Institutional Adoption Reaches New Heights",
      summary: "Fortune 500 companies are increasingly adding cryptocurrency to their treasury reserves and payment systems.",
      category: "Adoption",
      time: "12 hours ago",
      impact: "bullish",
      source: "Bloomberg",
      author: "Jennifer Wong",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      sentiment: { score: 88, label: "Very Positive", trend: "up" },
      views: 11234,
      featured: true
    },
    {
      id: 7,
      title: "Layer 2 Solutions Gain Massive Traction",
      summary: "Ethereum Layer 2 networks report 300% growth in transaction volume as gas fees decline and user adoption accelerates rapidly.",
      category: "Technology",
      time: "14 hours ago",
      impact: "bullish",
      source: "L2Beat",
      author: "Alex Thompson",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      sentiment: { score: 79, label: "Positive", trend: "up" },
      views: 7892,
      featured: false
    },
    {
      id: 8,
      title: "Central Bank Digital Currencies Show Progress",
      summary: "Multiple countries advance CBDC pilot programs, with China leading in digital yuan adoption and European nations following suit.",
      category: "Regulation",
      time: "16 hours ago",
      impact: "bullish",
      source: "Central Banking",
      author: "Maria Gonzalez",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop",
      sentiment: { score: 71, label: "Positive", trend: "up" },
      views: 6234,
      featured: false
    },
    {
      id: 9,
      title: "NFT Market Shows Signs of Recovery",
      summary: "Trading volumes increase 45% this week as utility-focused NFT projects gain momentum and institutional collectors return.",
      category: "Market Analysis",
      time: "18 hours ago",
      impact: "bullish",
      source: "OpenSea",
      author: "Ryan Miller",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      sentiment: { score: 68, label: "Positive", trend: "up" },
      views: 5891,
      featured: false
    },
    {
      id: 10,
      title: "Crypto Mining Faces Environmental Scrutiny",
      summary: "New regulations proposed in multiple jurisdictions target energy consumption, while miners transition to renewable sources.",
      category: "Regulation",
      time: "20 hours ago",
      impact: "bearish",
      source: "Environmental Times",
      author: "Lisa Green",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      sentiment: { score: 38, label: "Negative", trend: "down" },
      views: 4567,
      featured: false
    },
    {
      id: 11,
      title: "Solana Network Reaches New Performance Milestones",
      summary: "The blockchain processes record-breaking transaction volumes while maintaining low fees, attracting major DeFi protocols.",
      category: "Technology",
      time: "22 hours ago",
      impact: "bullish",
      source: "Solana Labs",
      author: "Kevin Zhang",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      sentiment: { score: 83, label: "Positive", trend: "up" },
      views: 8945,
      featured: false
    },
    {
      id: 12,
      title: "Cross-Chain Bridges Report Massive Growth",
      summary: "Interoperability solutions see 250% increase in locked value as users move assets across different blockchain ecosystems.",
      category: "DeFi",
      time: "1 day ago",
      impact: "bullish",
      source: "DeFi Llama",
      author: "Sofia Martinez",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      sentiment: { score: 76, label: "Positive", trend: "up" },
      views: 7123,
      featured: false
    },
    {
      id: 13,
      title: "Web3 Gaming Tokens Surge on Adoption News",
      summary: "Major gaming studios announce blockchain integration plans, driving significant price movements across gaming tokens.",
      category: "Adoption",
      time: "1 day ago",
      impact: "bullish",
      source: "GameFi Today",
      author: "Tom Harrison",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop",
      sentiment: { score: 81, label: "Positive", trend: "up" },
      views: 9876,
      featured: false
    },
    {
      id: 14,
      title: "Stablecoin Regulations Tighten Globally",
      summary: "International regulators coordinate new framework for stablecoin oversight, impacting major issuers and market structure.",
      category: "Regulation",
      time: "1 day ago",
      impact: "bearish",
      source: "Financial Stability Board",
      author: "Patricia Lee",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      sentiment: { score: 41, label: "Neutral", trend: "down" },
      views: 6789,
      featured: false
    },
    {
      id: 15,
      title: "Metaverse Real Estate Market Stabilizes",
      summary: "Virtual land prices find equilibrium after months of volatility, with utility-focused projects leading sustainable growth.",
      category: "Market Analysis",
      time: "1 day ago",
      impact: "bullish",
      source: "Metaverse Insider",
      author: "James Wilson",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      sentiment: { score: 65, label: "Positive", trend: "neutral" },
      views: 5432,
      featured: false
    }
  ];

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 70) return 'bg-green-500/20 border-green-500/30';
    if (score >= 40) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'bearish': return 'text-red-500 bg-red-500/20 border-red-500/30';
      default: return isDarkMode ? 'text-gray-400 bg-gray-700/30 border-gray-600/30' : 'text-gray-600 bg-gray-100 border-gray-200';
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
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📰 Crypto News Hub
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Stay updated with the latest cryptocurrency news, market analysis, and sentiment insights
          </p>
        </div>

        {/* Filters & Search */}
        <div className={`rounded-xl border backdrop-blur-sm p-6 mb-8 ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
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
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {sentimentFilters.map(sentiment => (
                  <option key={sentiment} value={sentiment}>{sentiment}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredNews.length} articles found
              </span>
            </div>
          </div>
        </div>

        {/* Market Sentiment Summary */}
        <div className={`rounded-xl border backdrop-blur-sm p-6 mb-8 ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <BarChart3 className="text-white" size={20} />
            </div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              📊 Overall Market Sentiment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">73%</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average Sentiment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">{newsData.length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{newsData.filter(n => n.impact === 'bullish').length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bullish News</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">{newsData.filter(n => n.impact === 'bearish').length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bearish News</div>
            </div>
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🔥 Featured Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredNews.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`}>
                  <article className={`rounded-xl border backdrop-blur-sm overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                    isDarkMode 
                      ? 'bg-gray-800/80 border-gray-700/60 hover:bg-gray-800/90' 
                      : 'bg-white/90 border-gray-200/60 hover:bg-white'
                  }`}>
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
                      <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center space-x-4 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
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
                          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {item.views.toLocaleString()} views
                          </span>
                          <ArrowRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
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
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📊 Latest News & Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <article className={`rounded-xl border backdrop-blur-sm overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700/60 hover:bg-gray-800/90' 
                    : 'bg-white/90 border-gray-200/60 hover:bg-white'
                }`}>
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
                    <h3 className={`text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm mb-3 line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.summary}
                    </p>
                    
                    <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <div className="flex items-center space-x-2">
                        <Clock size={12} />
                        <span>{item.time}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>
                      <ArrowRight size={12} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default News;