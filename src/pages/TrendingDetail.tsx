import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Hash, Users, MessageCircle, BarChart3, Clock, Star } from 'lucide-react';
import Layout from '@/components/Layout';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLiveSentiment } from '@/hooks/useLiveSentiment';
import { toast } from 'sonner';

const TrendingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: sentimentData, loading } = useLiveSentiment();
  const [selectedTab, setSelectedTab] = useState('overview');

  const topic = sentimentData?.trending?.find(t => t.rank.toString() === id);

  useEffect(() => {
    if (!loading && !topic) {
      toast.error('Trending topic not found');
      navigate('/');
    }
  }, [topic, loading, navigate]);

  if (loading) {
    return (
      <Layout showFooter={true}>
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="h-12 bg-muted rounded animate-pulse"></div>
            <div className="h-64 bg-muted rounded animate-pulse"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-48 bg-muted rounded animate-pulse"></div>
              <div className="h-48 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!topic) return null;

  const getSentimentColor = (score: number) => {
    if (score >= 7) return 'text-success';
    if (score >= 4) return 'text-warning';
    return 'text-destructive';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 7) return 'bg-success/10 border-success/20';
    if (score >= 4) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  return (
    <Layout showFooter={true}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{topic.rank}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {topic.name}
                  </h1>
                  <span className="text-lg text-muted-foreground">({topic.symbol})</span>
                </div>
                <p className="text-muted-foreground">
                  Trending Topic Analysis
                </p>
              </div>
              <Badge className={`px-3 py-1 border ${getSentimentBg(topic.score)}`}>
                <Star className="h-3 w-3 mr-1" />
                Score: {topic.score}
              </Badge>
            </div>
          </motion.div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trend Rank</span>
                  <Hash className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  #{topic.rank}
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mentions</span>
                  <MessageCircle className="h-4 w-4 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {topic.mentions.toLocaleString()}
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {topic.volume}
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">24h Change</span>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <div className="text-2xl font-bold text-success">
                  {topic.change24h}
                </div>
              </div>
            </ResponsiveCard>
          </div>

          {/* Detailed Analysis */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Trending Metrics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Current Rank</span>
                        <span className="font-bold text-primary">#{topic.rank}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Trend Score</span>
                        <span className={`font-bold ${getSentimentColor(topic.score)}`}>
                          {topic.score}/10
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Social Mentions</span>
                        <span className="font-medium text-foreground">
                          {topic.mentions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Trading Volume</span>
                        <span className="font-medium text-foreground">
                          {topic.volume}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">24h Performance</span>
                        <span className="font-medium text-success">
                          {topic.change24h}
                        </span>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>

                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Performance Analysis
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Trend Momentum</span>
                          <span className="text-sm text-success">Strong</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Social Engagement</span>
                          <span className="font-medium text-success">High</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Price Correlation</span>
                          <span className="font-medium text-primary">Positive</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Volatility</span>
                          <span className="font-medium text-warning">Medium</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              </div>
            </TabsContent>

            <TabsContent value="sentiment" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Sentiment Breakdown</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-foreground">Overall Sentiment</span>
                          <span className={`text-lg font-bold ${getSentimentColor(topic.score)}`}>
                            {topic.score >= 7 ? 'Bullish' : topic.score >= 4 ? 'Neutral' : 'Bearish'}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              topic.score >= 7 ? 'bg-success' :
                              topic.score >= 4 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${(topic.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-center">
                          <div className="text-lg font-bold text-success">65%</div>
                          <div className="text-xs text-muted-foreground">Positive</div>
                        </div>
                        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-center">
                          <div className="text-lg font-bold text-warning">25%</div>
                          <div className="text-xs text-muted-foreground">Neutral</div>
                        </div>
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                          <div className="text-lg font-bold text-destructive">10%</div>
                          <div className="text-xs text-muted-foreground">Negative</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>

                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Key Sentiment Drivers</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Price Movement</span>
                          <span className="text-sm text-success">Positive Impact</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Strong upward price action driving bullish sentiment
                        </p>
                      </div>
                      
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Social Media Buzz</span>
                          <span className="text-sm text-primary">High Activity</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Increased mentions and engagement across platforms
                        </p>
                      </div>
                      
                      <div className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">News Coverage</span>
                          <span className="text-sm text-success">Positive</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Favorable coverage from major crypto news outlets
                        </p>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-6 mt-6">
              <ResponsiveCard>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Social Media Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-foreground">Twitter</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">12.5K</div>
                      <div className="text-sm text-muted-foreground">Mentions</div>
                      <div className="text-sm text-success">+25% vs yesterday</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium text-foreground">Reddit</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">3.2K</div>
                      <div className="text-sm text-muted-foreground">Discussions</div>
                      <div className="text-sm text-success">+18% vs yesterday</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-medium text-foreground">Telegram</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">8.7K</div>
                      <div className="text-sm text-muted-foreground">Messages</div>
                      <div className="text-sm text-warning">+5% vs yesterday</div>
                    </div>
                  </div>
                </div>
              </ResponsiveCard>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6 mt-6">
              <ResponsiveCard>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">AI-Generated Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Strong Momentum Indicator</h4>
                          <p className="text-sm text-muted-foreground">
                            The combination of high social mentions and positive price action suggests 
                            continued bullish momentum in the short term.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Potential Resistance</h4>
                          <p className="text-sm text-muted-foreground">
                            Watch for profit-taking around key resistance levels as social hype 
                            may lead to temporary pullbacks.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Opportunity Signal</h4>
                          <p className="text-sm text-muted-foreground">
                            High engagement levels combined with positive sentiment create 
                            favorable conditions for continued price appreciation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ResponsiveCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TrendingDetail;