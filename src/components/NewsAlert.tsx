
import { Newspaper, TrendingUp, AlertCircle, Clock, ExternalLink, BarChart3, Users, Zap, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCryptoNews } from '@/hooks/useCryptoNews';

interface NewsAlertProps {
  isDarkMode: boolean;
}

const NewsAlert = ({ isDarkMode }: NewsAlertProps) => {
  const { news: newsItems, loading, error } = useCryptoNews();

  const trendingTopics = [
    { topic: "Bitcoin ETF", mentions: 12500, change: "+45%" },
    { topic: "DeFi Protocol", mentions: 8300, change: "+23%" },
    { topic: "NFT Marketplace", mentions: 6700, change: "-12%" },
    { topic: "Layer 2 Solutions", mentions: 5400, change: "+67%" },
    { topic: "Staking Rewards", mentions: 4200, change: "+34%" }
  ];

  const marketSentiment = {
    overall: "Cautiously Optimistic",
    score: 72,
    factors: [
      { factor: "Positive ETF News", impact: "+15%" },
      { factor: "Institutional Interest", impact: "+12%" },
      { factor: "Regulatory Uncertainty", impact: "-8%" },
      { factor: "Technical Indicators", impact: "+5%" }
    ]
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'text-green-500';
      case 'bearish': return 'text-red-500';
      default: return isDarkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'bg-green-500/20 border-green-500/30';
      case 'bearish': return 'bg-red-500/20 border-red-500/30';
      default: return isDarkMode ? 'bg-gray-700/30 border-gray-600/30' : 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📰 News & Market Alerts
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Latest crypto news, trends, and market situation updates
          </p>
        </div>
        <Link 
          to="/news"
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>All News</span>
          <ExternalLink size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News */}
        <div className={`lg:col-span-2 p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
              <Newspaper className="text-white" size={24} />
            </div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Latest News
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="animate-spin text-primary" size={24} />
              <span className={`ml-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Loading news...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading news: {error}</p>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No news available at the moment
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {newsItems.map((news) => (
              <div key={news.id} className={`p-4 rounded-lg border ${
                isDarkMode ? 'bg-gray-700/30 border-gray-600/30' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactBg(news.impact)}`}>
                      {news.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(news.impact)}`}>
                      {news.impact.toUpperCase()}
                    </span>
                  </div>
                  <div className={`flex items-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock size={12} className="mr-1" />
                    {news.time}
                  </div>
                </div>
                
                <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {news.title}
                </h4>
                
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {news.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Source: {news.source}
                  </span>
                  <Link 
                    to={`/news/${news.id}`}
                    className={`flex items-center text-xs hover:underline transition-colors ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    Read More <ExternalLink size={12} className="ml-1" />
                  </Link>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Market Sentiment & Trending Topics */}
        <div className="space-y-6">
          {/* Market Sentiment */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <BarChart3 className="text-white" size={20} />
              </div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                📊 Market Sentiment
              </h3>
            </div>

            <div className="text-center mb-6">
              <div className={`text-3xl font-bold mb-2 ${
                marketSentiment.score >= 70 ? 'text-green-500' : 
                marketSentiment.score >= 40 ? 'text-yellow-500' : 
                'text-red-500'
              }`}>
                {marketSentiment.score}
              </div>
              <div className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketSentiment.overall}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Market sentiment index
              </div>
            </div>

            <div className={`w-full rounded-full h-3 mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  marketSentiment.score >= 70 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                  marketSentiment.score >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${marketSentiment.score}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-green-500 text-xs font-medium">Bullish</div>
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  68%
                </div>
              </div>
              <div className="text-center">
                <div className="text-yellow-500 text-xs font-medium">Neutral</div>
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  19%
                </div>
              </div>
              <div className="text-center">
                <div className="text-red-500 text-xs font-medium">Bearish</div>
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  13%
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Key Factors:
              </div>
              {marketSentiment.factors.map((factor, index) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      factor.impact.startsWith('+') ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {factor.factor}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${
                    factor.impact.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>

            <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="text-blue-500" size={14} />
                <span className={`text-xs font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Real-time Analysis
                </span>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Based on social sentiment, on-chain data, and technical indicators updated every 5 minutes.
              </p>
            </div>
          </div>

          {/* Trending Topics */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
                <TrendingUp className="text-white" size={20} />
              </div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                🔥 Trending Topics
              </h3>
            </div>

            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'
                }`}>
                  <div>
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {topic.topic}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {topic.mentions.toLocaleString()} mentions
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    topic.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {topic.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsAlert;