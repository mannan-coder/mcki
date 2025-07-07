
import { Newspaper, TrendingUp, AlertCircle, Clock, ExternalLink } from 'lucide-react';

interface NewsAlertProps {
  isDarkMode: boolean;
}

const NewsAlert = ({ isDarkMode }: NewsAlertProps) => {
  const newsItems = [
    {
      id: 1,
      title: "Bitcoin ETF Approval Drives Market Rally",
      summary: "Major institutional investors are pouring billions into Bitcoin ETFs, pushing BTC to new monthly highs.",
      category: "ETF",
      time: "2 hours ago",
      impact: "bullish",
      source: "CoinDesk"
    },
    {
      id: 2,
      title: "Ethereum Shanghai Upgrade Completed Successfully",
      summary: "The network upgrade has been implemented without issues, enabling staking withdrawals and improving scalability.",
      category: "Technology",
      time: "4 hours ago",
      impact: "bullish",
      source: "Ethereum Foundation"
    },
    {
      id: 3,
      title: "SEC Increases Crypto Regulation Enforcement",
      summary: "New regulatory guidelines may impact several altcoins and DeFi protocols operating in the US market.",
      category: "Regulation",
      time: "6 hours ago",
      impact: "bearish",
      source: "Reuters"
    },
    {
      id: 4,
      title: "Major Exchange Hack Affects Market Sentiment",
      summary: "A security breach at a smaller exchange has led to temporary market volatility across major cryptocurrencies.",
      category: "Security",
      time: "8 hours ago",
      impact: "bearish",
      source: "CryptoNews"
    },
    {
      id: 5,
      title: "Institutional Adoption Reaches New Heights",
      summary: "Fortune 500 companies are increasingly adding cryptocurrency to their treasury reserves and payment systems.",
      category: "Adoption",
      time: "12 hours ago",
      impact: "bullish",
      source: "Bloomberg"
    }
  ];

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
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          📰 News & Market Alerts
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Latest crypto news, trends, and market situation updates
        </p>
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
                  <button className={`flex items-center text-xs hover:underline ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                    Read More <ExternalLink size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics & Market Sentiment */}
        <div className="space-y-6">
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

          {/* Market Sentiment */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <AlertCircle className="text-white" size={20} />
              </div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                📊 Market Sentiment
              </h3>
            </div>

            <div className="text-center mb-4">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {marketSentiment.overall}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Score: {marketSentiment.score}/100
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${marketSentiment.score}%` }}
              ></div>
            </div>

            <div className="space-y-2">
              {marketSentiment.factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {factor.factor}
                  </span>
                  <span className={`font-medium ${
                    factor.impact.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {factor.impact}
                  </span>
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
