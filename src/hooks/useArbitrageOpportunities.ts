import { useState, useEffect } from 'react';
import { useArbitrageData } from '@/hooks/useArbitrageData';

export const useArbitrageOpportunities = () => {
  const { data: arbitrageData, loading, refetch } = useArbitrageData();
  const [persistentOpportunities, setPersistentOpportunities] = useState<any[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  // Manage persistent opportunities with 60-second visibility
  useEffect(() => {
    if (arbitrageData?.arbitrageOpportunities) {
      const opportunities = arbitrageData.arbitrageOpportunities;
      const now = new Date();
      const newOpportunities = opportunities.map(opp => ({
        ...opp,
        addedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 60000).toISOString() // 60 seconds from now
      }));

      setPersistentOpportunities(prev => {
        // Remove expired opportunities
        const unexpired = prev.filter(opp => new Date(opp.expiresAt) > now);
        
        // Merge with new opportunities, avoiding duplicates
        const merged = [...unexpired];
        newOpportunities.forEach(newOpp => {
          const exists = merged.find(existing => 
            existing.pair === newOpp.pair && 
            existing.buyExchange === newOpp.buyExchange && 
            existing.sellExchange === newOpp.sellExchange
          );
          if (!exists) {
            merged.push(newOpp);
          }
        });
        
        return merged.sort((a, b) => b.spread - a.spread);
      });
      
      setLastUpdateTime(now);
    }
  }, [arbitrageData?.arbitrageOpportunities]);

  // Clean up expired opportunities every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setPersistentOpportunities(prev => 
        prev.filter(opp => new Date(opp.expiresAt) > now)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    opportunities: persistentOpportunities,
    loading,
    refetch,
    arbitrageData,
    lastUpdateTime
  };
};