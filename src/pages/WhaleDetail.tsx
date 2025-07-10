import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity, TrendingUp, ArrowUpRight, ArrowDownLeft, ExternalLink, Clock, DollarSign } from 'lucide-react';
import Layout from '@/components/Layout';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWhaleData } from '@/hooks/useWhaleData';
import { getTimeAgo } from '@/utils/timeUtils';
import { toast } from 'sonner';

const WhaleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: whaleData, loading } = useWhaleData();
  const [selectedTab, setSelectedTab] = useState('overview');

  const transaction = whaleData?.whaleTransactions?.find(t => t.id === id);

  useEffect(() => {
    if (!loading && !transaction) {
      toast.error('Whale transaction not found');
      navigate('/');
    }
  }, [transaction, loading, navigate]);

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

  if (!transaction) return null;

  const getStatusIcon = (status: string) => {
    return status === 'inflow' ? 
      <ArrowDownLeft className="h-5 w-5 text-destructive" /> : 
      <ArrowUpRight className="h-5 w-5 text-success" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
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
                <h1 className="text-3xl font-bold text-foreground">
                  Whale Transaction Details
                </h1>
                <p className="text-muted-foreground">
                  Transaction ID: {transaction.id}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(transaction.status)}
                <Badge className={`px-3 py-1 border ${getImpactColor(transaction.impact)}`}>
                  {transaction.impact.toUpperCase()} IMPACT
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ResponsiveCard>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {transaction.amount}
                  </div>
                </div>
              </ResponsiveCard>

              <ResponsiveCard>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">USD Value</span>
                    <DollarSign className="h-4 w-4 text-success" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {transaction.usdValue}
                  </div>
                </div>
              </ResponsiveCard>

              <ResponsiveCard>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time Ago</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {getTimeAgo(transaction.time)}
                  </div>
                </div>
              </ResponsiveCard>

              <ResponsiveCard>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div className="text-2xl font-bold text-foreground capitalize">
                    {transaction.status}
                  </div>
                </div>
              </ResponsiveCard>
            </div>

            {/* Detailed Information */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="market-impact">Market Impact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveCard>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Transaction Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Transaction Type</span>
                          <span className="font-medium text-foreground capitalize">
                            {transaction.status}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-medium text-foreground">
                            {transaction.amount}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">USD Value</span>
                          <span className="font-medium text-foreground">
                            {transaction.usdValue}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Market Impact</span>
                          <Badge className={`px-2 py-1 border ${getImpactColor(transaction.impact)}`}>
                            {transaction.impact.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Timestamp</span>
                          <span className="font-medium text-foreground">
                            {new Date(transaction.time).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ResponsiveCard>

                  <ResponsiveCard>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Market Analysis
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Price Impact Prediction</span>
                            <span className="text-sm text-success">+2.3%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Volume Significance</span>
                            <span className="font-medium text-foreground">High</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Market Timing</span>
                            <span className="font-medium text-foreground">Optimal</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Trend Influence</span>
                            <span className="font-medium text-success">Bullish</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ResponsiveCard>
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-6 mt-6">
                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">From Address</span>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="font-mono text-sm text-foreground bg-muted/30 p-2 rounded">
                            {transaction.from}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">To Address</span>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="font-mono text-sm text-foreground bg-muted/30 p-2 rounded">
                            {transaction.to}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/20 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Address Labels</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-muted-foreground">Known exchange wallet</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-warning rounded-full"></div>
                            <span className="text-sm text-muted-foreground">High-activity address</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              </TabsContent>

              <TabsContent value="market-impact" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveCard>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Expected Market Effects</h3>
                      <div className="space-y-3">
                        <div className="p-3 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Short-term Price Impact</span>
                            <span className="text-sm text-success">+2.3%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Large inflow typically creates buying pressure
                          </p>
                        </div>
                        
                        <div className="p-3 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Volume Impact</span>
                            <span className="text-sm text-primary">High</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Significant increase in trading volume expected
                          </p>
                        </div>
                        
                        <div className="p-3 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Sentiment Effect</span>
                            <span className="text-sm text-success">Bullish</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Large accumulation signals positive sentiment
                          </p>
                        </div>
                      </div>
                    </div>
                  </ResponsiveCard>

                  <ResponsiveCard>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Historical Correlation</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/20 rounded-lg">
                          <div className="text-center space-y-2">
                            <div className="text-2xl font-bold text-primary">85%</div>
                            <div className="text-sm text-muted-foreground">
                              Similar transactions preceded price increases
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Average Price Change (24h)</span>
                            <span className="font-medium text-success">+3.7%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Probability of Rally</span>
                            <span className="font-medium text-success">High</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Risk Level</span>
                            <span className="font-medium text-warning">Medium</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ResponsiveCard>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhaleDetail;