import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UpcomingEvent {
  id: number;
  time: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  timestamp: string;
  description: string;
  status: 'scheduled' | 'updated';
}

interface UseUpcomingEventsReturn {
  events: UpcomingEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUpcomingEvents = (): UseUpcomingEventsReturn => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      // Only set loading on initial fetch
      if (events.length === 0) setLoading(true);
      
      const { data: result, error } = await supabase.functions.invoke('crypto-events');
      
      if (error) throw error;
      
      setEvents(result.events || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    
    // Refresh events every 2 minutes for live updates
    const interval = setInterval(fetchEvents, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { events, loading, error, refetch: fetchEvents };
};