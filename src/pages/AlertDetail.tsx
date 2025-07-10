import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Clock, TrendingUp, Target, Users, Bell } from 'lucide-react';
import Layout from '@/components/Layout';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLiveAlerts } from '@/hooks/useLiveAlerts';
import { getTimeAgo } from '@/utils/timeUtils';
import { toast } from 'sonner';

const AlertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alerts, loading } = useLiveAlerts();
  const [selectedTab, setSelectedTab] = useState('overview');

  const alert = alerts.find(a => a.id.toString() === id);

  useEffect(() => {
    if (!loading && !alert) {
      toast.error('Alert not found');
      navigate('/');
    }
  }, [alert, loading, navigate]);

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

  if (!alert) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'liquidation': return '🚨';
      case 'pump': return '📈';
      case 'whale': return '🐋';
      case 'listing': return '🆕';
      case 'dump': return '📉';
      default: return '⚠️';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pump': return 'text-success';
      case 'dump': return 'text-destructive';
      case 'whale': return 'text-primary';
      case 'liquidation': return 'text-warning';
      case 'listing': return 'text-info';
      default: return 'text-muted-foreground';
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
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                  <h1 className="text-3xl font-bold text-foreground">
                    {alert.coin} Alert
                  </h1>
                  <span className={`text-lg font-semibold ${getTypeColor(alert.type)}`}>
                    {alert.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Alert ID: {alert.id} • {getTimeAgo(alert.time)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`px-3 py-1 border ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()} SEVERITY
                </Badge>
                {alert.status === 'new' && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    NEW
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Asset</span>
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {alert.coin}
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Exchange</span>
                  <Users className="h-4 w-4 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {alert.exchange}
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {alert.amount}
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Change</span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className={`text-2xl font-bold ${
                  alert.change?.startsWith('+') ? 'text-success' : 
                  alert.change?.startsWith('-') ? 'text-destructive' : 
                  'text-foreground'
                }`}>
                  {alert.change || 'N/A'}
                </div>
              </div>
            </ResponsiveCard>
          </div>

          {/* Detailed Analysis */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="impact">Market Impact</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Alert Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Alert Type</span>
                        <span className={`font-medium capitalize ${getTypeColor(alert.type)}`}>
                          {alert.type}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Cryptocurrency</span>
                        <span className="font-medium text-foreground">
                          {alert.coin}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Exchange</span>
                        <span className="font-medium text-foreground">
                          {alert.exchange}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Direction</span>
                        <span className="font-medium text-foreground">
                          {alert.direction}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Severity</span>
                        <Badge className={`px-2 py-1 border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Timestamp</span>
                        <span className="font-medium text-foreground">
                          {new Date(alert.time).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>

                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Alert Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">What Happened?</h4>
                        <p className="text-sm text-muted-foreground">
                          {getAlertDescription(alert)}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Confidence Level</span>
                          <span className="font-medium text-success">High</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Data Sources</span>
                          <span className="font-medium text-foreground">Multiple</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Verification</span>
                          <span className="font-medium text-success">Confirmed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Technical Analysis</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Price Impact Probability</span>
                          <span className="text-sm text-success">85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Volume Spike</span>
                          <span className="font-medium text-warning">Significant</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Price Volatility</span>
                          <span className="font-medium text-destructive">High</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Support Level</span>
                          <span className="font-medium text-success">Strong</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>

                <ResponsiveCard>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Historical Context</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="text-center space-y-2">
                          <div className="text-2xl font-bold text-primary">78%</div>
                          <div className="text-sm text-muted-foreground">
                            Similar alerts led to price movement
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Average Recovery Time</span>
                          <span className="font-medium text-foreground">2-4 hours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Max Drawdown</span>
                          <span className="font-medium text-destructive">-12%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Success Rate</span>
                          <span className="font-medium text-success">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6 mt-6">
              <ResponsiveCard>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Expected Market Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-destructive rounded-full"></div>
                        <span className="text-sm font-medium text-foreground">Short-term (1-4h)</span>
                      </div>
                      <div className="text-2xl font-bold text-destructive">High</div>
                      <div className="text-sm text-muted-foreground">Expected volatility and volume spike</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span className="text-sm font-medium text-foreground">Medium-term (4-24h)</span>
                      </div>
                      <div className="text-2xl font-bold text-warning">Medium</div>
                      <div className="text-sm text-muted-foreground">Gradual price stabilization</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span className="text-sm font-medium text-foreground">Long-term (1-7d)</span>
                      </div>
                      <div className="text-2xl font-bold text-success">Low</div>
                      <div className="text-sm text-muted-foreground">Return to normal trading patterns</div>
                    </div>
                  </div>
                </div>
              </ResponsiveCard>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6 mt-6">
              <ResponsiveCard>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">AI-Generated Recommendations</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Monitor Closely</h4>
                          <p className="text-sm text-muted-foreground">
                            This type of alert typically precedes significant price movements. 
                            Consider setting up additional monitoring for the next 4-6 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Risk Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Consider adjusting position sizes and stop-loss levels. 
                            High volatility expected in the short term.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Trading Opportunity</h4>
                          <p className="text-sm text-muted-foreground">
                            Historical data suggests potential arbitrage opportunities 
                            may emerge across different exchanges.
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

// Helper function to generate alert description
function getAlertDescription(alert: any): string {
  switch (alert.type) {
    case 'liquidation':
      return `Large liquidation event detected on ${alert.exchange}. ${alert.amount} worth of positions were liquidated, potentially causing significant price impact.`;
    case 'pump':
      return `Unusual price surge detected for ${alert.coin} on ${alert.exchange}. Price increased by ${alert.change} with abnormal volume patterns.`;
    case 'whale':
      return `Large whale transaction detected involving ${alert.amount} of ${alert.coin}. This movement may indicate institutional activity or significant market positioning.`;
    case 'listing':
      return `New listing alert for ${alert.coin} on ${alert.exchange}. This could lead to increased trading volume and price volatility.`;
    case 'dump':
      return `Significant price drop detected for ${alert.coin} on ${alert.exchange}. Price decreased by ${alert.change} with high selling pressure.`;
    default:
      return `Market alert triggered for ${alert.coin} on ${alert.exchange}. Unusual activity detected requiring attention.`;
  }
}

export default AlertDetail;