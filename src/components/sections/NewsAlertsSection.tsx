import { Newspaper, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { useEnhancedCryptoNews } from '@/hooks/useEnhancedCryptoNews';
import { useLiveEvents } from '@/hooks/useLiveEvents';
import { motion } from 'framer-motion';
import { getTimeAgo } from '@/utils/timeUtils';
import { useToast } from '@/hooks/use-toast';

interface NewsAlertsSectionProps {
  loading?: boolean;
}

export const NewsAlertsSection = ({ loading = false }: NewsAlertsSectionProps) => {
  const { news: newsItems, loading: newsLoading, error, refetch: refetchNews } = useEnhancedCryptoNews();
  const { data: eventsData, loading: eventsLoading, refetch: refetchEvents } = useLiveEvents();
  const { toast } = useToast();

  const handleRefresh = () => {
    refetchNews();
    refetchEvents();
    toast({
      title: "News & Events Refreshed",
      description: "Latest news and events have been updated successfully.",
    });
  };


  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'text-success';
      case 'bearish': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'bg-success/10 border-success/30';
      case 'bearish': return 'bg-destructive/10 border-destructive/30';
      default: return 'bg-muted/10 border-border';
    }
  };

  if (loading || newsLoading || eventsLoading) {
    return (
      <DataSection
        title="News & Market Alerts"
        subtitle="Latest cryptocurrency news and market updates"
        icon={<Newspaper className="h-6 w-6 text-primary" />}
        headerActions={
          <Link 
            to="/news"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            All News
          </Link>
        }
      >
        <ResponsiveCard>
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded animate-pulse"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4 p-4 border-b border-border/50 last:border-b-0">
                <div className="w-16 h-12 bg-muted rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-3/4 bg-muted/60 rounded animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-muted/60 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </ResponsiveCard>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="News & Market Alerts"
      subtitle="Latest cryptocurrency news and market updates"
      icon={<Newspaper className="h-6 w-6 text-primary" />}
      onRefresh={handleRefresh}
      isLoading={newsLoading || eventsLoading}
      headerActions={
        <Link 
          to="/news"
          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
        >
          All News
        </Link>
      }
    >
      {/* Latest News */}
      <ResponsiveCard>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Newspaper className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Latest News</h3>
          </div>

          {error ? (
            <div className="text-center py-8">
              <p className="text-destructive">Error loading news: {error}</p>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No news available at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {newsItems.slice(0, 8).map((news) => (
                <motion.div
                  key={news.id}
                  className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {news.image && (
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactBg(news.impact)}`}>
                        {news.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(news.impact)}`}>
                        {news.impact?.toUpperCase()}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {getTimeAgo(news.time)}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-sm text-foreground mb-2 line-clamp-2">
                      {news.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {news.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Source: {news.source}
                      </span>
                      <Link 
                        to={`/news/${news.id}`}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </ResponsiveCard>

      {/* Next Events */}
      <ResponsiveCard>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Next Events</h3>
          </div>

          {eventsData?.upcomingEvents && eventsData.upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {eventsData.upcomingEvents.slice(0, 5).map((event, index) => (
                <motion.div
                  key={event.id}
                  className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${
                        event.impact === 'high' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                        event.impact === 'medium' ? 'bg-warning/10 text-warning border-warning/20' :
                        'bg-success/10 text-success border-success/20'
                      }`}>
                        {event.impact?.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{event.type}</span>
                    </div>
                    <h4 className="font-medium text-sm text-foreground line-clamp-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {event.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground ml-3">
                    {event.time}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground text-sm">No upcoming events</p>
            </div>
          )}
        </div>
      </ResponsiveCard>
    </DataSection>
  );
};