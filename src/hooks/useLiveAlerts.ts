import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LiveAlert {
  id: number;
  type: 'liquidation' | 'pump' | 'dump' | 'whale' | 'listing';
  coin: string;
  exchange: string;
  amount: string;
  direction: string;
  change: string;
  time: string;
  timestamp: string;
  status: 'new' | 'active';
  severity: 'low' | 'medium' | 'high';
}

interface AlertStats {
  totalAlerts: number;
  activeAlerts: number;
  newAlerts: number;
  highSeverity: number;
  totalVolume: number;
}

interface UseLiveAlertsReturn {
  alerts: LiveAlert[];
  stats: AlertStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useLiveAlerts = (): UseLiveAlertsReturn => {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [stats, setStats] = useState<AlertStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      // Only set loading on initial fetch
      if (alerts.length === 0) setLoading(true);
      
      const { data: result, error } = await supabase.functions.invoke('crypto-alerts');
      
      if (error) throw error;
      
      setAlerts(result.alerts || []);
      setStats(result.stats || null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    
    // Refresh alerts every 30 seconds for live updates
    const interval = setInterval(fetchAlerts, 30 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { alerts, stats, loading, error, refetch: fetchAlerts };
};