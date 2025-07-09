import { useState } from 'react';
import { AlertTriangle, Clock, Filter, Search, TrendingUp, TrendingDown, Eye, Zap } from 'lucide-react';
import Layout from '@/components/Layout';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useLiveAlerts } from '@/hooks/useLiveAlerts';

const Alerts = () => {
  const { alerts, stats, loading, error } = useLiveAlerts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  // Filter alerts based on search and filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.exchange.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'liquidation': return '🚨';
      case 'pump': return '📈';
      case 'dump': return '📉';
      case 'whale': return '🐋';
      case 'listing': return '🆕';
      default: return '⚠️';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'liquidation': return 'text-destructive';
      case 'pump': return 'text-success';
      case 'dump': return 'text-destructive';
      case 'whale': return 'text-primary';
      case 'listing': return 'text-warning';
      default: return 'text-muted-foreground';
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

  const alertStats = stats ? [
    {
      label: 'Total Alerts',
      value: stats.totalAlerts.toString(),
      change: '+5%',
      trend: 'up' as const,
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      label: 'Active Alerts',
      value: stats.activeAlerts.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <Zap className="h-5 w-5" />
    },
    {
      label: 'High Severity',
      value: stats.highSeverity.toString(),
      change: '-8%',
      trend: 'down' as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      label: 'Volume (24h)',
      value: `$${stats.totalVolume.toFixed(1)}M`,
      change: '+23%',
      trend: 'up' as const,
      icon: <Eye className="h-5 w-5" />
    }
  ] : [];

  if (loading && alerts.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen">
          <DataSection
            title="Live Alerts"
            subtitle="Real-time crypto market alerts and notifications"
            icon={<AlertTriangle className="h-6 w-6 text-primary" />}
          >
            <div className="space-y-6">
              <StatsGrid stats={[]} loading={true} />
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 bg-muted/20 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </DataSection>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen">
          <DataSection
            title="Live Alerts"
            subtitle="Real-time crypto market alerts and notifications"
            icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
          >
            <div className="text-center py-8">
              <p className="text-destructive mb-4">Failed to load alerts: {error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </DataSection>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <DataSection
          title="Live Alerts"
          subtitle="Real-time crypto market alerts and notifications"
          icon={<AlertTriangle className="h-6 w-6 text-primary" />}
          headerActions={
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Statistics */}
            <StatsGrid stats={alertStats} />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by coin or exchange..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Alert Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="liquidation">Liquidation</SelectItem>
                  <SelectItem value="pump">Pump</SelectItem>
                  <SelectItem value="dump">Dump</SelectItem>
                  <SelectItem value="whale">Whale</SelectItem>
                  <SelectItem value="listing">Listing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alerts List */}
            <div className="space-y-3">
              {filteredAlerts.length === 0 ? (
                <ResponsiveCard>
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No alerts match your filters</p>
                  </div>
                </ResponsiveCard>
              ) : (
                filteredAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ResponsiveCard className="hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                          
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-foreground">
                                {alert.coin}
                              </span>
                              <Badge className={`text-xs ${
                                alert.change.startsWith('+') ? 'bg-success/20 text-success' : 
                                alert.change.startsWith('-') ? 'bg-destructive/20 text-destructive' : 
                                'bg-muted/20 text-muted-foreground'
                              }`}>
                                {alert.change}
                              </Badge>
                              {alert.status === 'new' && (
                                <Badge className="bg-primary/20 text-primary text-xs">
                                  NEW
                                </Badge>
                              )}
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              {alert.exchange} • {alert.amount} • {alert.direction}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    </ResponsiveCard>
                  </motion.div>
                ))
              )}
            </div>

            {/* Show results count */}
            {filteredAlerts.length > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                Showing {filteredAlerts.length} of {alerts.length} alerts
              </div>
            )}
          </div>
        </DataSection>
      </div>
    </Layout>
  );
};

export default Alerts;