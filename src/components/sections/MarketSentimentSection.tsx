import { TrendingUp, Brain, Heart, BarChart3, Flame, Hash } from 'lucide-react';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { motion } from 'framer-motion';
import { useLiveSentiment } from '@/hooks/useLiveSentiment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface MarketSentimentSectionProps {
  loading?: boolean;
}

export const MarketSentimentSection = ({ loading = false }: MarketSentimentSectionProps) => {
  const { data: sentimentData, loading: sentimentLoading } = useLiveSentiment();
  const navigate = useNavigate();

  const sentimentStats = [
    {
      label: 'Market Sentiment',
      value: sentimentData?.sentiment?.status || 'Optimistic',
      change: sentimentData?.sentiment?.change24h || '+3.2%',
      trend: 'up' as const,
      icon: <Brain className="h-5 w-5" />
    },
    {
      label: 'Fear & Greed Index',
      value: sentimentData?.fearGreed?.value?.toString() || '72',
      change: `+${sentimentData?.fearGreed?.change24h || '2'}`,
      trend: 'up' as const,
      icon: <Heart className="h-5 w-5" />
    },
    {
      label: 'Social Volume',
      value: sentimentData?.sentiment?.indicators?.socialVolume || 'High',
      change: '+15%',
      trend: 'up' as const,
      icon: <Hash className="h-5 w-5" />
    },
    {
      label: 'Trending Score',
      value: '8.7',
      change: '+12%',
      trend: 'up' as const,
      icon: <Flame className="h-5 w-5" />
    }
  ];

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getFearGreedColor = (value: number) => {
    if (value >= 75) return 'bg-success/20 text-success';
    if (value >= 55) return 'bg-warning/20 text-warning';
    if (value >= 25) return 'bg-muted/20 text-muted-foreground';
    return 'bg-destructive/20 text-destructive';
  };

  const getFearGreedLabel = (value: number) => {
    if (value >= 75) return 'Extreme Greed';
    if (value >= 55) return 'Greed';
    if (value >= 45) return 'Neutral';
    if (value >= 25) return 'Fear';
    return 'Extreme Fear';
  };

  if (loading || sentimentLoading) {
    return (
      <DataSection
        title="Market Sentiment"
        subtitle="Real-time sentiment analysis and trending topics"
        icon={<Brain className="h-6 w-6 text-primary" />}
      >
        <div className="space-y-6">
          <StatsGrid stats={[]} loading={true} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                <div className="h-32 bg-muted rounded animate-pulse"></div>
              </div>
            </ResponsiveCard>
            
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between p-3">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
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
      title="Market Sentiment"
      subtitle="Real-time sentiment analysis and trending topics"
      icon={<Brain className="h-6 w-6 text-primary" />}
    >
      <div className="space-y-6">
        <StatsGrid stats={sentimentStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Overview */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Sentiment Overview</h3>
              </div>

              <div className="space-y-4">
                {/* Overall Sentiment */}
                <div className="p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Overall Sentiment</span>
                    <span className={`text-lg font-bold ${getSentimentColor(sentimentData?.sentiment?.score || 57)}`}>
                      {sentimentData?.sentiment?.score || 57}/100
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        (sentimentData?.sentiment?.score || 57) >= 70 ? 'bg-success' :
                        (sentimentData?.sentiment?.score || 57) >= 40 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${sentimentData?.sentiment?.score || 57}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Bearish</span>
                    <span>Neutral</span>
                    <span>Bullish</span>
                  </div>
                </div>

                {/* Fear & Greed Index */}
                <div className="p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Fear & Greed Index</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{sentimentData?.fearGreed?.value || 72}</div>
                      <div className={`text-xs px-2 py-1 rounded ${getFearGreedColor(sentimentData?.fearGreed?.value || 72)}`}>
                        {sentimentData?.fearGreed?.classification || getFearGreedLabel(sentimentData?.fearGreed?.value || 72)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-destructive via-warning to-success transition-all duration-500"
                      style={{ width: `${sentimentData?.fearGreed?.value || 72}%` }}
                    />
                  </div>
                </div>

                {/* Key Factors Section */}
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Key Sentiment Factors
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-foreground">Bitcoin Dominance</span>
                      </div>
                      <span className="text-xs font-medium text-success">Bullish</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span className="text-xs text-foreground">Institutional Flow</span>
                      </div>
                      <span className="text-xs font-medium text-warning">Neutral</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-foreground">DeFi TVL Growth</span>
                      </div>
                      <span className="text-xs font-medium text-success">Positive</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-xs text-foreground">Whale Activity</span>
                      </div>
                      <span className="text-xs font-medium text-primary">Active</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-foreground">Market Volatility</span>
                      </div>
                      <span className="text-xs font-medium text-success">Low</span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Indicators */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Social</div>
                    <div className="text-sm font-medium text-foreground">
                      {sentimentData?.sentiment?.indicators?.socialVolume || 'High'}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">News</div>
                    <div className="text-sm font-medium text-foreground">
                      {sentimentData?.sentiment?.indicators?.newsVolume || 'Medium'}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Market</div>
                    <div className="text-sm font-medium text-foreground">
                      {sentimentData?.sentiment?.indicators?.marketVolume || 'High'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveCard>

          {/* Trending Topics */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Flame className="h-5 w-5 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Trending Topics</h3>
              </div>

              <div className="space-y-3">
                {(sentimentData?.trending || []).slice(0, 8).map((topic, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      navigate(`/trending-detail/${topic.rank}`);
                      toast.success(`Opening ${topic.name} trend analysis`);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">#{topic.rank}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground text-sm">{topic.name}</span>
                          <span className="text-xs text-muted-foreground">({topic.symbol})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{topic.mentions} mentions</span>
                          <span>•</span>
                          <span>{topic.volume} volume</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-success">{topic.change24h}</div>
                      <div className="text-xs text-muted-foreground">Score: {topic.score}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-foreground">Live Tracking</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Topics ranked by social mentions and trading volume
                </p>
              </div>
            </div>
          </ResponsiveCard>
        </div>
      </div>
    </DataSection>
  );
};