import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  ExternalLink, 
  Users, 
  Target, 
  Zap,
  ArrowLeft,
  Filter,
  ChevronDown,
  Bookmark,
  Share2,
  Eye,
  BarChart3,
  Activity,
  Globe,
  DollarSign,
  X,
  ChevronUp
} from 'lucide-react';
import Layout from '@/components/Layout';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveEvents } from '@/hooks/useLiveEvents';
import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { getTimeAgo } from '@/utils/timeUtils';
import { useToast } from '@/hooks/use-toast';

interface EventDetailModalProps {
  event: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  impactData: any;
}

const EventDetailModal = ({ event, open, onOpenChange, impactData }: EventDetailModalProps) => {
  const [liveMetrics, setLiveMetrics] = useState({
    priceMovement: 0,
    volumeSpike: 0,
    socialMentions: 0,
    lastUpdate: new Date().toISOString()
  });

  useEffect(() => {
    if (!open) return;

    const updateLiveMetrics = () => {
      setLiveMetrics({
        priceMovement: (Math.random() - 0.5) * 10,
        volumeSpike: Math.random() * 200,
        socialMentions: Math.random() * 1000,
        lastUpdate: new Date().toISOString()
      });
    };

    updateLiveMetrics();
    const interval = setInterval(updateLiveMetrics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [open]);

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
      case 'network': return <Zap className="h-5 w-5" />;
      case 'upgrade': return <TrendingUp className="h-5 w-5" />;
      case 'economic': return <DollarSign className="h-5 w-5" />;
      case 'regulatory': return <Target className="h-5 w-5" />;
      case 'conference': return <Users className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            {getTypeIcon(event.type)}
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Meta Information */}
          <div className="flex flex-wrap items-center gap-4">
            <Badge className={`px-3 py-1 border ${getImpactColor(event.impact)}`}>
              <AlertCircle className="h-3 w-3 mr-1" />
              {event.impact.toUpperCase()} IMPACT
            </Badge>
            
            <Badge variant="outline" className="px-3 py-1">
              {getTypeIcon(event.type)}
              <span className="ml-1 capitalize">{event.type}</span>
            </Badge>

            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {event.countdown}
            </div>

            <div className="flex items-center text-sm text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
              Live Data
            </div>
          </div>

          {/* Live Metrics Dashboard */}
          <ResponsiveCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-primary" />
                  Live Event Impact
                </h4>
                <span className="text-xs text-muted-foreground">
                  Updated {getTimeAgo(liveMetrics.lastUpdate)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Price Movement</span>
                    <TrendingUp className={`h-4 w-4 ${liveMetrics.priceMovement > 0 ? 'text-success' : 'text-destructive'}`} />
                  </div>
                  <div className={`text-2xl font-bold ${liveMetrics.priceMovement > 0 ? 'text-success' : 'text-destructive'}`}>
                    {liveMetrics.priceMovement > 0 ? '+' : ''}{liveMetrics.priceMovement.toFixed(2)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Pre-event movement</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg border border-warning/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Volume Spike</span>
                    <BarChart3 className="h-4 w-4 text-warning" />
                  </div>
                  <div className="text-2xl font-bold text-warning">
                    +{liveMetrics.volumeSpike.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Above average</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-success/5 to-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Social Mentions</span>
                    <Globe className="h-4 w-4 text-success" />
                  </div>
                  <div className="text-2xl font-bold text-success">
                    {(liveMetrics.socialMentions).toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Mentions/hour</div>
                </div>
              </div>
            </div>
          </ResponsiveCard>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveCard>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Event Schedule
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">{event.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium text-foreground">{event.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Countdown:</span>
                    <span className="font-medium text-primary">{event.countdown}</span>
                  </div>
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Target className="h-4 w-4 mr-2 text-primary" />
                  Impact Analysis
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Impact:</span>
                    <Badge className={`${getImpactColor(event.impact)} text-xs`}>
                      {event.impact.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Type:</span>
                    <span className="font-medium text-foreground capitalize">{event.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <span className={`font-medium ${
                      event.impact === 'high' ? 'text-destructive' : 
                      event.impact === 'medium' ? 'text-warning' : 'text-success'
                    }`}>
                      {event.impact === 'high' ? 'Critical' : event.impact === 'medium' ? 'Important' : 'Monitor'}
                    </span>
                  </div>
                </div>
              </div>
            </ResponsiveCard>
          </div>

          {/* Description */}
          <ResponsiveCard>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Event Details
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </ResponsiveCard>

          {/* Market Scenarios */}
          <ResponsiveCard>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                Potential Market Scenarios
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                  <div className="text-sm font-medium text-success mb-1">Bullish Scenario</div>
                  <div className="text-xs text-muted-foreground">
                    {event.impact === 'high' ? '+15-25% price increase' : '+5-10% price increase'}
                  </div>
                </div>
                
                <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="text-sm font-medium text-warning mb-1">Neutral Scenario</div>
                  <div className="text-xs text-muted-foreground">
                    Minimal price movement, consolidation
                  </div>
                </div>
                
                <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="text-sm font-medium text-destructive mb-1">Bearish Scenario</div>
                  <div className="text-xs text-muted-foreground">
                    {event.impact === 'high' ? '-10-20% price decline' : '-3-8% price decline'}
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveCard>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <Button variant="default" className="flex-1 min-w-32">
              <AlertCircle className="h-4 w-4 mr-2" />
              Set Alert
            </Button>
            <Button variant="outline" className="flex-1 min-w-32">
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface EventsPageProps {}

const EventsPage = ({}: EventsPageProps) => {
  const { eventId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'date');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(9); // Start with 9 events
  const [isLoading, setIsLoading] = useState(false);
  
  const { data: liveEventsData, loading: eventsLoading, refetch } = useLiveEvents();
  const { data: marketData, isLoading: marketLoading } = useOptimizedCryptoData();
  const { toast } = useToast();

  const upcomingEvents = liveEventsData?.upcomingEvents || [];
  const liveAlerts = liveEventsData?.liveAlerts || [];

  // Live Impact Analysis Data
  const [impactData, setImpactData] = useState({
    marketVolatility: 0,
    priceCorrelation: 0,
    tradingVolume: 0,
    socialSentiment: 0,
    lastUpdate: new Date().toISOString()
  });

  useEffect(() => {
    // Simulate live impact analysis updates
    const updateImpactData = () => {
      setImpactData({
        marketVolatility: Math.random() * 100,
        priceCorrelation: (Math.random() - 0.5) * 200,
        tradingVolume: Math.random() * 100,
        socialSentiment: Math.random() * 100,
        lastUpdate: new Date().toISOString()
      });
    };

    updateImpactData();
    const interval = setInterval(updateImpactData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Optimized filtering and sorting with useMemo
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = upcomingEvents.filter(event => {
      if (filter === 'all') return true;
      return event.impact === filter || event.type === filter;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'impact':
          const impactOrder = { high: 3, medium: 2, low: 1 };
          return impactOrder[b.impact] - impactOrder[a.impact];
        case 'type':
          return a.type.localeCompare(b.type);
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return sorted;
  }, [upcomingEvents, filter, sortBy]);

  // Displayed events with pagination
  const displayedEvents = useMemo(() => {
    return filteredAndSortedEvents.slice(0, displayCount);
  }, [filteredAndSortedEvents, displayCount]);

  const hasMoreEvents = displayCount < filteredAndSortedEvents.length;

  const eventStats = useMemo(() => [
    {
      label: 'Total Events',
      value: upcomingEvents.length.toString(),
      change: '+3 this week',
      trend: 'up' as const,
      icon: <Calendar className="h-5 w-5" />
    },
    {
      label: 'High Impact',
      value: upcomingEvents.filter(e => e.impact === 'high').length.toString(),
      change: 'Critical',
      trend: 'up' as const,
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      label: 'Market Volatility',
      value: `${impactData.marketVolatility.toFixed(1)}%`,
      change: 'Live',
      trend: impactData.marketVolatility > 50 ? 'up' : 'down' as const,
      icon: <Activity className="h-5 w-5" />
    },
    {
      label: 'Active Alerts',
      value: liveAlerts.length.toString(),
      change: 'Real-time',
      trend: 'up' as const,
      icon: <Eye className="h-5 w-5" />
    }
  ], [upcomingEvents, impactData, liveAlerts]);

  const impactAnalysisData = useMemo(() => [
    {
      label: 'Market Volatility',
      value: impactData.marketVolatility,
      unit: '%',
      description: 'Real-time market volatility index',
      color: impactData.marketVolatility > 70 ? 'text-destructive' : impactData.marketVolatility > 40 ? 'text-warning' : 'text-success'
    },
    {
      label: 'Price Correlation',
      value: Math.abs(impactData.priceCorrelation),
      unit: '%',
      description: 'Event-price correlation strength',
      color: Math.abs(impactData.priceCorrelation) > 70 ? 'text-destructive' : 'text-warning'
    },
    {
      label: 'Trading Volume',
      value: impactData.tradingVolume,
      unit: '%',
      description: 'Volume change indicator',
      color: 'text-primary'
    },
    {
      label: 'Social Sentiment',
      value: impactData.socialSentiment,
      unit: '%',
      description: 'Community sentiment score',
      color: impactData.socialSentiment > 60 ? 'text-success' : impactData.socialSentiment > 40 ? 'text-warning' : 'text-destructive'
    }
  ], [impactData]);

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
      case 'network': return <Zap className="h-4 w-4" />;
      case 'upgrade': return <TrendingUp className="h-4 w-4" />;
      case 'economic': return <DollarSign className="h-4 w-4" />;
      case 'regulatory': return <Target className="h-4 w-4" />;
      case 'conference': return <Users className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
    setDisplayCount(9); // Reset pagination when filter changes
    setSearchParams(prev => {
      prev.set('filter', newFilter);
      return prev;
    });
  }, [setSearchParams]);

  const handleSortChange = useCallback((newSort: string) => {
    setSortBy(newSort);
    setDisplayCount(9); // Reset pagination when sort changes
    setSearchParams(prev => {
      prev.set('sort', newSort);
      return prev;
    });
  }, [setSearchParams]);

  const handleRefresh = useCallback(() => {
    refetch();
    toast({
      title: "Events Updated",
      description: "Latest event data has been refreshed successfully.",
    });
  }, [refetch, toast]);

  const handleEventClick = useCallback((event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayCount(prev => prev + 6);
    setIsLoading(false);
  }, []);

  if (eventsLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
          <DataSection
            title="Major Events"
            subtitle="Comprehensive cryptocurrency events and market impact analysis"
            icon={<Calendar className="h-6 w-6 text-primary" />}
          >
            <div className="space-y-6">
              <StatsGrid stats={[]} loading={true} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-6 border border-border/50 rounded-lg animate-pulse">
                    <div className="h-4 bg-muted rounded mb-3"></div>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-muted/60 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </DataSection>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        {/* Header with Navigation */}
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex items-center space-x-2"
            >
              <Activity className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <DataSection
          title="Major Events & Impact Analysis"
          subtitle="Comprehensive cryptocurrency events tracking with real-time market impact analysis"
          icon={<Calendar className="h-6 w-6 text-primary" />}
          onRefresh={handleRefresh}
          isLoading={eventsLoading}
        >
          <div className="space-y-8">
            {/* Stats Overview */}
            <StatsGrid stats={eventStats} />

            {/* Live Impact Analysis */}
            <ResponsiveCard>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Live Impact Analysis</h3>
                      <p className="text-sm text-muted-foreground">Real-time market impact indicators</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
                    Updated {getTimeAgo(impactData.lastUpdate)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {impactAnalysisData.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      className="p-4 bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-border/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                          <div className={`text-lg font-bold ${metric.color}`}>
                            {metric.value.toFixed(1)}{metric.unit}
                          </div>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              metric.color.includes('destructive') ? 'bg-destructive' :
                              metric.color.includes('warning') ? 'bg-warning' :
                              metric.color.includes('success') ? 'bg-success' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min(metric.value, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ResponsiveCard>

            {/* Filters and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <Select value={filter} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="low">Low Impact</SelectItem>
                    <SelectItem value="network">Network Events</SelectItem>
                    <SelectItem value="economic">Economic Events</SelectItem>
                    <SelectItem value="upgrade">Upgrades</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                    <SelectItem value="conference">Conferences</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">By Date</SelectItem>
                    <SelectItem value="impact">By Impact</SelectItem>
                    <SelectItem value="type">By Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {displayedEvents.length} of {filteredAndSortedEvents.length} events
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {displayedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: (index % 9) * 0.05 }}
                  >
                    <ResponsiveCard className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="space-y-4">
                        {/* Event Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(event.type)}
                            <Badge className={`px-2 py-1 text-xs border ${getImpactColor(event.impact)}`}>
                              {event.impact.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Bookmark className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Event Title and Description */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {event.description}
                          </p>
                        </div>

                        {/* Countdown and Date */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {event.countdown}
                            </div>
                            <span className="font-medium text-foreground">
                              {event.date}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {event.time}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8"
                              onClick={() => handleEventClick(event)}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ResponsiveCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More or Empty State */}
            {filteredAndSortedEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more events.</p>
              </div>
            ) : hasMoreEvents ? (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="min-w-40"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Load More Events ({filteredAndSortedEvents.length - displayCount} remaining)
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex items-center justify-center text-muted-foreground">
                  <ChevronUp className="h-4 w-4 mr-2" />
                  <span>All events displayed</span>
                </div>
              </div>
            )}
          </div>
        </DataSection>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            impactData={impactData}
          />
        )}
      </div>
    </Layout>
  );
};

export default EventsPage;