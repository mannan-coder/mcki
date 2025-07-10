import { useState } from 'react';
import { AlertTriangle, Clock, Filter, Search, TrendingUp, TrendingDown, Eye, Zap, ArrowLeft, RefreshCw, Home, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const { alerts, stats, loading, error, refetch } = useLiveAlerts();
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
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <DataSection
              title="Live Alerts"
              subtitle="Real-time crypto market alerts and notifications"
              icon={<AlertTriangle className="h-6 w-6 text-primary" />}
              className="px-0"
            >
              <div className="space-y-6">
                <StatsGrid stats={[]} loading={true} />
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-32 bg-muted/20 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </DataSection>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <DataSection
              title="Live Alerts"
              subtitle="Real-time crypto market alerts and notifications"
              icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
              className="px-0"
            >
              <ResponsiveCard>
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load alerts</h3>
                  <p className="text-destructive mb-6">{error}</p>
                  <Button onClick={() => window.location.reload()} className="px-6">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Retry Loading
                  </Button>
                </div>
              </ResponsiveCard>
            </DataSection>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link 
                to="/#market-overview"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Market Overview</span>
              </Link>
              <Link 
                to="/#live-signals"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Live Signals</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Container with proper mobile margins */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <DataSection
            title="Live Alerts"
            subtitle="Real-time crypto market alerts and notifications powered by live API data"
            icon={<AlertTriangle className="h-6 w-6 text-primary" />}
            headerActions={
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Live Data</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetch}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </Button>
              </div>
            }
            className="px-0" // Remove internal padding since we handle it at container level
          >
            <div className="space-y-6">
              {/* Statistics */}
              <StatsGrid stats={alertStats} />

              {/* Filters - Improved mobile layout */}
              <ResponsiveCard>
                <div className="p-4 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Filter Alerts</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by coin or exchange..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Alert Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border shadow-lg z-50">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="liquidation">Liquidation</SelectItem>
                        <SelectItem value="pump">Pump</SelectItem>
                        <SelectItem value="dump">Dump</SelectItem>
                        <SelectItem value="whale">Whale</SelectItem>
                        <SelectItem value="listing">Listing</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border shadow-lg z-50">
                        <SelectItem value="all">All Severity</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ResponsiveCard>

              {/* Alerts List - Improved mobile-friendly design */}
              <div className="space-y-4">
                {filteredAlerts.length === 0 ? (
                  <ResponsiveCard>
                    <div className="text-center py-12">
                      <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No alerts found</h3>
                      <p className="text-muted-foreground">
                        {searchTerm || filterType !== 'all' || filterSeverity !== 'all' 
                          ? 'Try adjusting your filters to see more results'
                          : 'No alerts are currently available'
                        }
                      </p>
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
                      <ResponsiveCard className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
                        {/* Mobile-optimized alert card */}
                        <div className="p-4 sm:p-6">
                          {/* Header row */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl sm:text-3xl flex-shrink-0">
                                {getAlertIcon(alert.type)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center space-x-2 mb-1 flex-wrap">
                                  <span className="font-bold text-lg text-foreground">
                                    {alert.coin}
                                  </span>
                                  <Badge className={`text-xs font-semibold ${
                                    alert.change.startsWith('+') ? 'bg-success/20 text-success border-success/30' : 
                                    alert.change.startsWith('-') ? 'bg-destructive/20 text-destructive border-destructive/30' : 
                                    'bg-muted/20 text-muted-foreground border-muted/30'
                                  }`}>
                                    {alert.change}
                                  </Badge>
                                  {alert.status === 'new' && (
                                    <Badge className="bg-primary/20 text-primary text-xs border-primary/30 animate-pulse">
                                      NEW
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  <span className="font-medium">{alert.exchange}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                              <Badge className={`${getSeverityColor(alert.severity)} text-xs font-medium px-3 py-1`}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{alert.time}</span>
                              </div>
                            </div>
                          </div>

                          {/* Details row */}
                          <div className="bg-muted/20 rounded-lg p-3 border border-border/30">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">Amount:</span>
                                <span className="font-semibold text-foreground ml-2">
                                  {alert.amount}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Direction:</span>
                                <span className={`font-semibold ml-2 ${
                                  alert.direction.toLowerCase().includes('buy') || alert.direction.toLowerCase().includes('long') 
                                    ? 'text-success' 
                                    : alert.direction.toLowerCase().includes('sell') || alert.direction.toLowerCase().includes('short')
                                    ? 'text-destructive'
                                    : 'text-foreground'
                                }`}>
                                  {alert.direction}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action row for mobile */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                alert.severity === 'high' ? 'bg-destructive animate-pulse' :
                                alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                              }`}></div>
                              <span className="text-xs text-muted-foreground">
                                Alert #{alert.id}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </ResponsiveCard>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Results count - Better mobile formatting */}
              {filteredAlerts.length > 0 && (
                <ResponsiveCard>
                  <div className="text-center py-4">
                    <div className="text-sm text-muted-foreground">
                      Showing <span className="font-semibold text-foreground">{filteredAlerts.length}</span> of{' '}
                      <span className="font-semibold text-foreground">{alerts.length}</span> alerts
                    </div>
                    {filteredAlerts.length < alerts.length && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Use filters above to refine results
                      </p>
                    )}
                  </div>
                </ResponsiveCard>
              )}
            </div>
          </DataSection>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;