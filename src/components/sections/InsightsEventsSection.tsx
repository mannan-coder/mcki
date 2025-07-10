import { AlertTriangle, TrendingUp, Eye, Calendar, Target, Clock, ExternalLink, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveEvents } from '@/hooks/useLiveEvents';
import { getTimeAgo } from '@/utils/timeUtils';

interface InsightsEventsSectionProps {
  loading?: boolean;
}

export const InsightsEventsSection = ({ loading = false }: InsightsEventsSectionProps) => {
  const { data: liveEventsData, loading: eventsLoading } = useLiveEvents();
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const upcomingEvents = liveEventsData?.upcomingEvents || [];
  const recentAlerts = liveEventsData?.liveAlerts || [];
  
  const combinedStats = [
    {
      label: 'Active Alerts',
      value: recentAlerts.length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length.toString(),
      change: '+3 this week',
      trend: 'up' as const,
      icon: <Calendar className="h-5 w-5" />
    },
    {
      label: 'High Impact Events',
      value: upcomingEvents.filter(e => e.impact === 'high').length.toString(),
      change: '2 critical',
      trend: 'up' as const,
      icon: <Target className="h-5 w-5" />
    },
    {
      label: 'Live Updates',
      value: '247',
      change: 'real-time',
      trend: 'neutral' as const,
      icon: <Eye className="h-5 w-5" />
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'liquidation': return '🚨';
      case 'pump': return '📈';
      case 'whale': return '🐋';
      case 'listing': return '🆕';
      default: return '⚠️';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/10 text-warning border-warning/30';
      case 'low': return 'bg-success/10 text-success border-success/30';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'network': return <Zap className="h-4 w-4 text-primary" />;
      case 'upgrade': return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'economic': return <Target className="h-4 w-4 text-destructive" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (loading || eventsLoading) {
    return (
      <DataSection
        title="Market Insights & Events"
        subtitle="Real-time market intelligence, alerts, and upcoming events"
        icon={<Eye className="h-6 w-6 text-primary" />}
        headerActions={
          <Link 
            to="/analytics"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            Analytics
          </Link>
        }
      >
        <div className="space-y-6">
          <StatsGrid stats={[]} loading={true} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <ResponsiveCard key={i}>
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded animate-pulse"></div>
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex justify-between p-3">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </ResponsiveCard>
            ))}
          </div>
        </div>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="Market Insights & Events"
      subtitle="Real-time market intelligence, alerts, and upcoming events"
      icon={<Eye className="h-6 w-6 text-primary" />}
      headerActions={
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <Link 
            to="/analytics"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            Analytics
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Combined Statistics */}
        <StatsGrid stats={combinedStats} />
        
        {/* Tabbed Interface */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Alerts Preview */}
              <ResponsiveCard>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Live</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {recentAlerts.slice(0, 3).map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getAlertIcon(alert.type)}</span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-foreground text-sm">{alert.symbol || alert.title}</span>
                              {alert.change && (
                                <span className={`text-xs px-2 py-1 rounded ${
                                  alert.change.startsWith('+') ? 'bg-success/20 text-success' : 
                                  alert.change.startsWith('-') ? 'bg-destructive/20 text-destructive' : 
                                  'bg-muted/20 text-muted-foreground'
                                }`}>
                                  {alert.change}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {alert.message}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{getTimeAgo(alert.time)}</div>
                      </motion.div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedTab('alerts')}
                  >
                    View All Alerts
                  </Button>
                </div>
              </ResponsiveCard>

              {/* Upcoming Events Preview */}
              <ResponsiveCard>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Next Events</h3>
                  </div>

                  <div className="space-y-3">
                    {upcomingEvents.slice(0, 3).map((event, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getTypeIcon(event.type)}
                            <div className="font-medium text-foreground text-sm truncate">{event.title}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{event.time}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`px-2 py-1 text-xs border ${getImpactColor(event.impact)}`}>
                            {event.impact.toUpperCase()}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedTab('events')}
                  >
                    View All Events
                  </Button>
                </div>
              </ResponsiveCard>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4 mt-6">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Live Market Alerts</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Live Updates</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {recentAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <span className="text-xl">{getAlertIcon(alert.type)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-foreground">{alert.symbol || alert.title}</span>
                              {alert.change && (
                                <span className={`text-sm px-2 py-1 rounded font-medium ${
                                  alert.change.startsWith('+') ? 'bg-success/20 text-success' : 
                                  alert.change.startsWith('-') ? 'bg-destructive/20 text-destructive' : 
                                  'bg-muted/20 text-muted-foreground'
                                }`}>
                                  {alert.change}
                                </span>
                              )}
                              {alert.severity === 'high' && (
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {alert.message}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground ml-4">
                          {getTimeAgo(alert.time)}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="text-center pt-4 border-t border-border">
                  <Link 
                    to="/alerts"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View All Alerts →
                  </Link>
                </div>
              </div>
            </ResponsiveCard>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Major Upcoming Events */}
              <ResponsiveCard>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Major Events</h3>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence>
                      {upcomingEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-all duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                {getTypeIcon(event.type)}
                                <Badge className={`px-2 py-1 text-xs border ${getImpactColor(event.impact)}`}>
                                  {event.impact.toUpperCase()}
                                </Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {event.countdown}
                                </div>
                              </div>
                              
                              <h4 className="font-semibold text-sm text-foreground mb-1">
                                {event.title}
                              </h4>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {event.description}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {event.date} • {event.time}
                                </span>
                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </ResponsiveCard>

              {/* Event Impact Analysis */}
              <ResponsiveCard>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Impact Analysis</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-success">High Impact Events</span>
                        <span className="text-sm font-bold text-foreground">
                          {upcomingEvents.filter(e => e.impact === 'high').length}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Events likely to cause significant market movements
                      </p>
                    </div>

                    <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-warning">This Week</span>
                        <span className="text-sm font-bold text-foreground">
                          {upcomingEvents.filter(e => e.countdown.includes('day')).length}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Events happening in the next 7 days
                      </p>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary">Monitoring</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                          <span className="text-sm font-bold text-foreground">24/7</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Real-time event tracking and analysis
                      </p>
                    </div>
                  </div>
                </div>
              </ResponsiveCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DataSection>
  );
};