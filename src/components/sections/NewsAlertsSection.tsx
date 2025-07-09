import { Newspaper, BarChart3, TrendingUp, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { useCryptoNews } from '@/hooks/useCryptoNews';
import { motion } from 'framer-motion';

interface NewsAlertsSectionProps {
  loading?: boolean;
}

export const NewsAlertsSection = ({ loading = false }: NewsAlertsSectionProps) => {
  const { news: newsItems, loading: newsLoading, error } = useCryptoNews();

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

  const trendingTopics = [
    { topic: "Bitcoin ETF", mentions: 12500, change: "+45%" },
    { topic: "DeFi Protocol", mentions: 8300, change: "+23%" },
    { topic: "NFT Marketplace", mentions: 6700, change: "-12%" },
    { topic: "Layer 2 Solutions", mentions: 5400, change: "+67%" },
    { topic: "Staking Rewards", mentions: 4200, change: "+34%" }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'text-success';
      case 'bearish': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'bg-success/10 border-success/30';
      case 'bearish': return 'bg-destructive/10 border-destructive/30';
      default: return 'bg-muted/10 border-border';
    }
  };

  if (loading || newsLoading) {
    return (
      <DataSection
        title="News & Market Alerts"
        subtitle="Latest crypto news, trends, and market sentiment updates"
        icon={<Newspaper className="h-6 w-6 text-primary" />}
        headerActions={
          <Link 
            to="/news"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            All News
          </Link>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex space-x-4 p-4 border-b border-border/50 last:border-b-0">
                    <div className="w-16 h-12 bg-muted rounded animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                      <div className="h-3 w-3/4 bg-muted/60 rounded animate-pulse"></div>
                      <div className="h-3 w-1/2 bg-muted/60 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </ResponsiveCard>
          </div>
          
          <div className="space-y-4">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                <div className="h-20 bg-muted/30 rounded animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </ResponsiveCard>
          </div>
        </div>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="News & Market Alerts"
      subtitle="Latest crypto news, trends, and market sentiment updates"
      icon={<Newspaper className="h-6 w-6 text-primary" />}
      headerActions={
        <Link 
          to="/news"
          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
        >
          All News
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest News */}
        <div className="lg:col-span-2">
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Newspaper className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Latest News</h3>
              </div>

              {error ? (
                <div className="text-center py-8">
                  <p className="text-destructive">Error loading news: {error}</p>
                </div>
              ) : newsItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No news available at the moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {newsItems.slice(0, 5).map((news) => (
                    <motion.div
                      key={news.id}
                      className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {news.image && (
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactBg(news.impact)}`}>
                            {news.category}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(news.impact)}`}>
                            {news.impact?.toUpperCase()}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {news.time}
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-sm text-foreground mb-2 line-clamp-2">
                          {news.title}
                        </h4>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {news.summary}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Source: {news.source}
                          </span>
                          <Link 
                            to={`/news/${news.id}`}
                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </ResponsiveCard>
        </div>

        {/* Market Sentiment & Trending */}
        <div className="space-y-6">
          {/* Market Sentiment */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Market Sentiment</h3>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  marketSentiment.score >= 70 ? 'text-success' : 
                  marketSentiment.score >= 40 ? 'text-warning' : 
                  'text-destructive'
                }`}>
                  {marketSentiment.score}
                </div>
                <div className="text-base font-medium text-foreground mb-1">
                  {marketSentiment.overall}
                </div>
                <div className="text-sm text-muted-foreground">
                  Market sentiment index
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-3">
                <motion.div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    marketSentiment.score >= 70 ? 'bg-gradient-to-r from-success/60 to-success' : 
                    marketSentiment.score >= 40 ? 'bg-gradient-to-r from-warning/60 to-warning' : 
                    'bg-gradient-to-r from-destructive/60 to-destructive'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${marketSentiment.score}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-success text-xs font-medium">Bullish</div>
                  <div className="text-lg font-bold text-foreground">68%</div>
                </div>
                <div>
                  <div className="text-warning text-xs font-medium">Neutral</div>
                  <div className="text-lg font-bold text-foreground">19%</div>
                </div>
                <div>
                  <div className="text-destructive text-xs font-medium">Bearish</div>
                  <div className="text-lg font-bold text-foreground">13%</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Key Factors:</div>
                {marketSentiment.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        factor.impact.startsWith('+') ? 'bg-success' : 'bg-destructive'
                      }`}></div>
                      <span className="text-sm text-foreground">{factor.factor}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      factor.impact.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`}>
                      {factor.impact}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Real-time Analysis</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on social sentiment, on-chain data, and technical indicators updated every 5 minutes.
                </p>
              </div>
            </div>
          </ResponsiveCard>

          {/* Trending Topics */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Trending Topics</h3>
              </div>

              <div className="space-y-3">
                {trendingTopics.slice(0, 4).map((topic, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{topic.topic}</div>
                      <div className="text-sm text-muted-foreground">
                        {topic.mentions.toLocaleString()} mentions
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${
                      topic.change.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`}>
                      {topic.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ResponsiveCard>
        </div>
      </div>
    </DataSection>
  );
};