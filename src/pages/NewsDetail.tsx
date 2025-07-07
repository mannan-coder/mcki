import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BarChart3, ExternalLink, Share2, Bookmark } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: React.ReactNode;
  category: string;
  time: string;
  impact: string;
  source: string;
  author: string;
  readTime: string;
  tags: string[];
  sentiment: {
    score: number;
    label: string;
    breakdown: {
      positive: number;
      neutral: number;
      negative: number;
    }
  };
}

const NewsDetail = () => {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    // Simulate fetching article data based on ID
    const articleData: Record<string, NewsArticle> = {
      '1': {
        id: 1,
        title: "Bitcoin ETF Approval Drives Market Rally",
        summary: "Major institutional investors are pouring billions into Bitcoin ETFs, pushing BTC to new monthly highs.",
        content: (
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop" 
              alt="Bitcoin ETF Trading" 
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="prose prose-lg max-w-none">
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                The cryptocurrency market experienced a significant surge today following the approval of multiple Bitcoin Exchange-Traded Funds (ETFs) by the Securities and Exchange Commission. This landmark decision has opened the floodgates for institutional investment, with major financial institutions rushing to capitalize on the new opportunity.
              </p>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Market Impact</h2>
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                The approval has had an immediate and profound impact on Bitcoin's price, which surged over 12% in the hours following the announcement. Trading volumes have increased by 340% compared to the previous day, indicating massive institutional interest.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Statistics:</h3>
                <ul className="space-y-2">
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Bitcoin price increase:</strong> <span className="text-green-500">+12.4%</span> in 24 hours</li>
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Trading volume surge:</strong> <span className="text-blue-500">+340%</span></li>
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Total ETF inflows:</strong> <span className="text-purple-500">$2.8 billion</span> in first day</li>
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Institutional participants:</strong> <span className="text-orange-500">47 major firms</span></li>
                </ul>
              </div>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Institutional Response</h2>
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop" 
                alt="Financial Trading Dashboard" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Major investment firms including BlackRock, Fidelity, and VanEck have reported substantial inflows into their newly approved Bitcoin ETF products. The enthusiasm from traditional finance has been overwhelming, with some funds reaching capacity limits within hours of launch.
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                <p className={`italic text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  "This represents a paradigm shift in how institutional investors view Bitcoin. We're seeing pension funds, endowments, and family offices all expressing serious interest."
                </p>
                <footer className={`mt-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  — Michael Novogratz, Galaxy Digital CEO
                </footer>
              </blockquote>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Technical Analysis</h2>
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                From a technical perspective, Bitcoin has broken through several key resistance levels, establishing new support at $68,000. The RSI indicates continued bullish momentum, though some analysts warn of potential short-term profit-taking.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">$75,000</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Short-term Target</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">$85,000</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Medium-term Target</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">$100,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Long-term Target</div>
                </div>
              </div>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Market Outlook</h2>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop" 
                alt="Market Analysis" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                With institutional adoption accelerating and regulatory clarity improving, many analysts are revising their Bitcoin price targets upward. The combination of limited supply and increasing demand from ETFs could create a sustained bull market.
              </p>
              
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                The crypto community is celebrating this milestone as validation of Bitcoin's maturity as an asset class. However, investors are advised to remain cautious of potential volatility as the market adjusts to this new dynamic.
              </p>
            </div>
          </div>
        ),
        category: "ETF",
        time: "2 hours ago",
        impact: "bullish",
        source: "CoinDesk",
        author: "Sarah Chen",
        readTime: "5 min read",
        tags: ["Bitcoin", "ETF", "Institutional", "Regulation"],
        sentiment: {
          score: 85,
          label: "Very Positive",
          breakdown: {
            positive: 78,
            neutral: 15,
            negative: 7
          }
        }
      },
      '2': {
        id: 2,
        title: "Ethereum Shanghai Upgrade Completed Successfully",
        summary: "The network upgrade has been implemented without issues, enabling staking withdrawals and improving scalability.",
        content: (
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop" 
              alt="Ethereum Development" 
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="prose prose-lg max-w-none">
              <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ethereum Shanghai Upgrade: A Technical Triumph</h1>
              
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                The Ethereum network has successfully completed its highly anticipated Shanghai upgrade, marking another milestone in the blockchain's evolution toward greater efficiency and user accessibility.
              </p>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upgrade Highlights</h2>
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                The Shanghai upgrade introduces several critical improvements to the Ethereum network, with staking withdrawals being the most significant feature for users and validators.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Features:</h3>
                <ul className="space-y-2">
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Staking Withdrawals:</strong> <span className="text-green-500">Validators can now withdraw staked ETH</span></li>
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Gas Optimizations:</strong> <span className="text-blue-500">Reduced transaction costs for smart contracts</span></li>
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Validator Improvements:</strong> <span className="text-purple-500">Enhanced validator experience and rewards</span></li>
                  <li className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}><strong>Network Stability:</strong> <span className="text-orange-500">Improved overall network performance</span></li>
                </ul>
              </div>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Impact on Staking</h2>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=300&fit=crop" 
                alt="Staking Interface" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                The ability to withdraw staked ETH has been the most requested feature since the launch of Ethereum 2.0. This upgrade removes the final barrier for many institutional investors who were hesitant to lock up their ETH indefinitely.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h4 className={`text-lg font-semibold text-green-600 mb-2`}>Staking Benefits</h4>
                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Flexible withdrawals</li>
                    <li>• Improved liquidity</li>
                    <li>• Enhanced validator rewards</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h4 className={`text-lg font-semibold text-blue-600 mb-2`}>Network Improvements</h4>
                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Lower gas fees</li>
                    <li>• Better scalability</li>
                    <li>• Enhanced security</li>
                  </ul>
                </div>
              </div>

              <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Technical Implementation</h2>
              <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                The upgrade was executed flawlessly across all network participants, demonstrating the maturity of Ethereum's governance and development processes. The seamless transition showcases the robust testing and coordination that went into this critical update.
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                <p className={`italic text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  "The Shanghai upgrade represents a significant milestone in Ethereum's journey towards becoming a more accessible and user-friendly platform for decentralized applications."
                </p>
                <footer className={`mt-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  — Ethereum Foundation Development Team
                </footer>
              </blockquote>
            </div>
          </div>
        ),
        category: "Technology",
        time: "4 hours ago",
        impact: "bullish",
        source: "Ethereum Foundation",
        author: "Vitalik Buterin",
        readTime: "7 min read",
        tags: ["Ethereum", "Shanghai", "Staking", "Upgrade"],
        sentiment: {
          score: 82,
          label: "Positive",
          breakdown: {
            positive: 74,
            neutral: 20,
            negative: 6
          }
        }
      }
    };

    if (id && articleData[id]) {
      setArticle(articleData[id]);
    }
  }, [id]);

  if (!article) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link to="/" className="text-blue-500 hover:text-blue-400">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    );
  }

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'bearish': return 'text-red-500 bg-red-500/20 border-red-500/30';
      default: return isDarkMode ? 'text-gray-400 bg-gray-700/30 border-gray-600/30' : 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/" 
            className={`inline-flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors`}
          >
            <ArrowLeft size={18} />
            <span>Back to News</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <div className="p-8">
            {/* Category & Impact Badge */}
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(article.impact)}`}>
                {article.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(article.impact)}`}>
                {article.impact.charAt(0).toUpperCase() + article.impact.slice(1)} Impact
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {article.title}
            </h1>

            {/* Metadata */}
            <div className={`flex flex-wrap items-center gap-4 mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{article.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Source: {article.source}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <span key={index} className={`px-2 py-1 rounded text-xs ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-700/30">
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700/50 text-gray-300' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}>
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700/50 text-gray-300' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}>
                <Bookmark size={16} />
                <span>Save</span>
              </button>
            </div>

            {/* Content */}
            <div className={`${
              isDarkMode 
                ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-blockquote:text-gray-400' 
                : 'prose-headings:text-gray-900 prose-p:text-gray-700'
            }`}>
              {article.content}
            </div>
          </div>
        </article>

        {/* Sentiment Analysis */}
        <div className={`mt-8 rounded-xl border backdrop-blur-sm p-6 ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
              <BarChart3 className="text-white" size={20} />
            </div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sentiment Analysis
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold mb-2 ${getSentimentColor(article.sentiment.score)}`}>
                  {article.sentiment.score}
                </div>
                <div className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.sentiment.label}
                </div>
              </div>
              
              <div className={`w-full rounded-full h-3 mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${getSentimentColor(article.sentiment.score).replace('text-', 'bg-')}`}
                  style={{ width: `${article.sentiment.score}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sentiment Breakdown:
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-500">Positive</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.sentiment.breakdown.positive}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">Neutral</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.sentiment.breakdown.neutral}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500">Negative</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.sentiment.breakdown.negative}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sentiment analysis based on social media mentions, news coverage, and market reactions. Updated in real-time.
            </p>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default NewsDetail;