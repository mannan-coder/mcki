import { useState, useEffect } from 'react';
import { ChevronDown, Search, TrendingUp, TrendingDown, Users, Activity, BarChart3, Globe, Monitor, Smartphone, Eye, Clock, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

const Analytics = ({ isDarkMode = false, setIsDarkMode = () => {} }: AnalyticsProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [realTimeVisitors, setRealTimeVisitors] = useState(147);

  // Simulate real-time visitor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeVisitors(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(50, Math.min(300, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const timeRanges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last year', value: '1y' }
  ];

  const overviewStats = {
    totalVisitors: 45820,
    pageViews: 128450,
    bounceRate: 42.3,
    avgSessionDuration: '2m 34s',
    conversionRate: 3.2,
    newUsers: 68.5
  };

  const trafficData = [
    { date: 'Mon', visitors: 2400, pageviews: 4200, sessions: 1800 },
    { date: 'Tue', visitors: 1398, pageviews: 2800, sessions: 1200 },
    { date: 'Wed', visitors: 9800, pageviews: 15600, sessions: 8200 },
    { date: 'Thu', visitors: 3908, pageviews: 7200, sessions: 3100 },
    { date: 'Fri', visitors: 4800, pageviews: 9600, sessions: 4200 },
    { date: 'Sat', visitors: 3800, pageviews: 6800, sessions: 3200 },
    { date: 'Sun', visitors: 4300, pageviews: 8100, sessions: 3700 }
  ];

  const topPages = [
    { page: '/', views: 15420, percentage: 23.8, avgTime: '3m 12s' },
    { page: '/market', views: 12350, percentage: 19.1, avgTime: '2m 45s' },
    { page: '/arbitrage', views: 8920, percentage: 13.8, avgTime: '4m 18s' },
    { page: '/news', views: 7650, percentage: 11.8, avgTime: '1m 52s' },
    { page: '/analytics', views: 6280, percentage: 9.7, avgTime: '5m 23s' },
    { page: '/about', views: 4180, percentage: 6.5, avgTime: '1m 38s' }
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 18200, percentage: 39.7, color: 'hsl(var(--primary))' },
    { source: 'Direct', visitors: 12800, percentage: 27.9, color: 'hsl(var(--success))' },
    { source: 'Social Media', visitors: 8900, percentage: 19.4, color: 'hsl(var(--accent))' },
    { source: 'Referral', visitors: 4200, percentage: 9.2, color: 'hsl(var(--secondary))' },
    { source: 'Email', visitors: 1720, percentage: 3.8, color: 'hsl(var(--muted))' }
  ];

  const deviceData = [
    { device: 'Desktop', users: 24500, percentage: 53.4 },
    { device: 'Mobile', users: 18200, percentage: 39.7 },
    { device: 'Tablet', users: 3120, percentage: 6.9 }
  ];

  const geographicData = [
    { country: 'United States', visitors: 12800, percentage: 27.9, flag: '🇺🇸' },
    { country: 'United Kingdom', visitors: 8200, percentage: 17.9, flag: '🇬🇧' },
    { country: 'Germany', visitors: 6400, percentage: 14.0, flag: '🇩🇪' },
    { country: 'Japan', visitors: 4100, percentage: 8.9, flag: '🇯🇵' },
    { country: 'Canada', visitors: 3800, percentage: 8.3, flag: '🇨🇦' },
    { country: 'France', visitors: 3200, percentage: 7.0, flag: '🇫🇷' },
    { country: 'Others', visitors: 7320, percentage: 16.0, flag: '🌍' }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Website Analytics</h1>
            <p className="text-lg text-muted-foreground">
              Track your website performance and user behavior
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{realTimeVisitors} users online</span>
            </div>
            
            <Tabs value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <TabsList>
                {timeRanges.map((range) => (
                  <TabsTrigger key={range.value} value={range.value} className="text-xs">
                    {range.label.split(' ')[1]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(overviewStats.totalVisitors)}</div>
              <p className="text-xs text-success">+12.5% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(overviewStats.pageViews)}</div>
              <p className="text-xs text-success">+8.2% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.bounceRate}%</div>
              <p className="text-xs text-success">-2.1% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.avgSessionDuration}</div>
              <p className="text-xs text-success">+15.3% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.conversionRate}%</div>
              <p className="text-xs text-success">+0.8% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.newUsers}%</div>
              <p className="text-xs text-muted-foreground">of total visitors</p>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Website Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                visitors: {
                  label: "Visitors",
                  color: "hsl(var(--primary))",
                },
                pageviews: {
                  label: "Page Views", 
                  color: "hsl(var(--success))",
                },
                sessions: {
                  label: "Sessions",
                  color: "hsl(var(--accent))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pageviews" 
                    stackId="2"
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Two column layout for detailed analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{page.page}</div>
                      <div className="text-xs text-muted-foreground">Avg. time: {page.avgTime}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{formatNumber(page.views)}</div>
                      <div className="text-xs text-muted-foreground">{page.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{source.source}</span>
                        <span className="text-sm">{formatNumber(source.visitors)}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${source.percentage}%`,
                            backgroundColor: source.color 
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{source.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>Device Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-muted-foreground" />}
                      {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                      {device.device === 'Tablet' && <Monitor className="h-4 w-4 text-muted-foreground" />}
                      <span className="font-medium text-sm">{device.device}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{formatNumber(device.users)}</div>
                      <div className="text-xs text-muted-foreground">{device.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Geographic Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {geographicData.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-medium text-sm">{country.country}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{formatNumber(country.visitors)}</div>
                      <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Performance Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-success">94</div>
                <div className="text-sm text-muted-foreground">Page Speed Score</div>
                <Badge variant="secondary" className="mt-2">Excellent</Badge>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg. Load Time</div>
                <Badge variant="secondary" className="mt-2">Good</Badge>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-success">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
                <Badge variant="secondary" className="mt-2">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;