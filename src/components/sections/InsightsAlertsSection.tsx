import { AlertTriangle, TrendingUp, Eye, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { motion } from 'framer-motion';
import { useUpcomingEvents } from '@/hooks/useUpcomingEvents';
import { useLiveAlerts } from '@/hooks/useLiveAlerts';

interface InsightsAlertsSectionProps {
  loading?: boolean;
}

export const InsightsAlertsSection = ({ loading = false }: InsightsAlertsSectionProps) => {
  const { events: upcomingEvents, loading: eventsLoading } = useUpcomingEvents();
  const { alerts: recentAlerts, loading: alertsLoading } = useLiveAlerts();
  
  const alertStats = [
    {
      label: 'Active Alerts',
      value: '847',
      change: '+12%',
      trend: 'up' as const,
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      label: 'Liquidations (24h)',
      value: '$234M',
      change: '-8%',
      trend: 'down' as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      label: 'New Listings',
      value: '23',
      change: '+156%',
      trend: 'up' as const,
      icon: <Eye className="h-5 w-5" />
    },
    {
      label: 'Monitored Exchanges',
      value: '15',
      change: '0%',
      trend: 'neutral' as const,
      icon: <Target className="h-5 w-5" />
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

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'liquidation': return 'text-destructive';
      case 'pump': return 'text-success';
      case 'whale': return 'text-primary';
      case 'listing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  if (loading || eventsLoading || alertsLoading) {
    return (
      <DataSection
        title="Insights & Alerts"
        subtitle="Real-time market intelligence and trading opportunities"
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
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between p-3">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </ResponsiveCard>
            
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between p-3">
                    <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
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
      title="Insights & Alerts"
      subtitle="Real-time market intelligence and trading opportunities"
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
        {/* Alert Statistics */}
        <StatsGrid stats={alertStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
              </div>

              <div className="space-y-3">
                {upcomingEvents.slice(0, 4).map((event, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{event.event}</div>
                      <div className="text-xs text-muted-foreground">{event.time}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(event.impact)}`}>
                        {event.impact.toUpperCase()}
                      </span>
                      {event.status === 'updated' && (
                        <div className="w-2 h-2 bg-warning rounded-full animate-pulse" title="Recently updated" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-foreground">Live Monitoring</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Events are tracked in real-time with impact analysis
                </p>
              </div>
            </div>
          </ResponsiveCard>

          {/* Recent Alerts */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Live Alerts</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>

              <div className="space-y-3">
                {alertsLoading ? (
                  [1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-muted rounded animate-pulse"></div>
                        <div>
                          <div className="h-4 w-24 bg-muted rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="h-3 w-16 bg-muted rounded animate-pulse"></div>
                    </div>
                  ))
                ) : (
                  recentAlerts.slice(0, 4).map((alert, index) => (
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
                            <span className="font-medium text-foreground text-sm">{alert.coin}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              alert.change.startsWith('+') ? 'bg-success/20 text-success' : 
                              alert.change.startsWith('-') ? 'bg-destructive/20 text-destructive' : 
                              'bg-muted/20 text-muted-foreground'
                            }`}>
                              {alert.change}
                            </span>
                            {alert.status === 'new' && (
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {alert.exchange} • {alert.amount}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="text-center">
                <Link 
                  to="/alerts"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All Alerts →
                </Link>
              </div>
            </div>
          </ResponsiveCard>
        </div>
      </div>
    </DataSection>
  );
};