import { Calendar, Clock, TrendingUp, AlertCircle, ExternalLink, Users, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { StatsGrid } from '@/components/common/StatsGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveEvents } from '@/hooks/useLiveEvents';
import { getTimeAgo } from '@/utils/timeUtils';

interface UpcomingEventsSectionProps {
  loading?: boolean;
}

interface EventDetailModalProps {
  event: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDetailModal = ({ event, open, onOpenChange }: EventDetailModalProps) => {
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
      case 'economic': return <Target className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
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
          </div>

          {/* Date and Time */}
          <ResponsiveCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Date & Time
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

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Target className="h-4 w-4 mr-2 text-primary" />
                  Impact Assessment
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
            </div>
          </ResponsiveCard>

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

          {/* Market Analysis (Mock Data) */}
          <ResponsiveCard>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                Potential Market Effects
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
                    Minimal price movement
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
              <ExternalLink className="h-4 w-4 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const UpcomingEventsSection = ({ loading = false }: UpcomingEventsSectionProps) => {
  const { data: liveEventsData, loading: eventsLoading } = useLiveEvents();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const upcomingEvents = liveEventsData?.upcomingEvents || [];
  const liveAlerts = liveEventsData?.liveAlerts || [];

  const eventStats = [
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length.toString(),
      change: '+3 this week',
      trend: 'up' as const,
      icon: <Calendar className="h-5 w-5" />
    },
    {
      label: 'High Impact',
      value: upcomingEvents.filter(e => e.impact === 'high').length.toString(),
      change: '2 critical',
      trend: 'up' as const,
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      label: 'Active Alerts',
      value: liveAlerts.length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      label: 'This Week',
      value: upcomingEvents.filter(e => e.countdown.includes('day')).length.toString(),
      change: 'events',
      trend: 'neutral' as const,
      icon: <Clock className="h-5 w-5" />
    }
  ];

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
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  if (loading || eventsLoading) {
    return (
      <DataSection
        title="Upcoming Events"
        subtitle="Track important crypto events and their market impact"
        icon={<Calendar className="h-6 w-6 text-primary" />}
      >
        <div className="space-y-6">
          <StatsGrid stats={[]} loading={true} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-border/50 rounded-lg">
                    <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-3/4 bg-muted/60 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </ResponsiveCard>
            
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                {[1, 2].map((i) => (
                  <div key={i} className="p-3 bg-muted/20 rounded-lg">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
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
    <>
      <DataSection
        title="Upcoming Events"
        subtitle="Track important crypto events and their market impact"
        icon={<Calendar className="h-6 w-6 text-primary" />}
      >
        <div className="space-y-6">
          <StatsGrid stats={eventStats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
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
                    {upcomingEvents.slice(0, 6).map((event, index) => (
                      <motion.div
                        key={event.id}
                        className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-all duration-200 cursor-pointer group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleEventClick(event)}
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
                            
                            <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                              {event.title}
                            </h4>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {event.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {event.date} • {event.time}
                              </span>
                              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {upcomingEvents.length > 6 && (
                  <Button variant="outline" className="w-full mt-4">
                    View All Events ({upcomingEvents.length})
                  </Button>
                )}
              </div>
            </ResponsiveCard>

            {/* Live Alerts */}
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Live Alerts</h3>
                </div>

                <div className="space-y-3">
                  {liveAlerts.slice(0, 5).map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      className="p-3 border border-border/50 rounded-lg bg-muted/20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`px-2 py-1 text-xs ${
                          alert.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                          alert.severity === 'medium' ? 'bg-warning/10 text-warning' :
                          'bg-success/10 text-success'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(alert.time)}
                        </span>
                      </div>
                      
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {alert.message}
                      </p>
                      
                      {alert.symbol && (
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                          <span className="text-xs font-medium text-foreground">
                            {alert.symbol}
                          </span>
                          <div className="flex items-center space-x-2">
                            {alert.price && (
                              <span className="text-xs text-foreground">{alert.price}</span>
                            )}
                            {alert.change && (
                              <span className={`text-xs font-medium ${
                                alert.change.startsWith('+') ? 'text-success' : 'text-destructive'
                              }`}>
                                {alert.change}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </ResponsiveCard>
          </div>
        </div>
      </DataSection>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </>
  );
};