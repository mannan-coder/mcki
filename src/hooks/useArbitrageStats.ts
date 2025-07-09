import React from 'react';
import { Target, DollarSign, Building2 } from 'lucide-react';

export const useArbitrageStats = (stats: any) => {
  return [
    {
      label: 'Active Opportunities',
      value: stats.totalOpportunities.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: React.createElement(Target, { className: "h-5 w-5" })
    },
    {
      label: 'Average Spread',
      value: `${stats.avgSpread.toFixed(2)}%`,
      change: '-0.3%',
      trend: 'down' as const,
      icon: React.createElement(Target, { className: "h-5 w-5" })
    },
    {
      label: 'Est. Daily Volume',
      value: `$${(stats.estimatedDailyVolume / 1000000).toFixed(1)}M`,
      change: '+8.7%',
      trend: 'up' as const,
      icon: React.createElement(DollarSign, { className: "h-5 w-5" })
    },
    {
      label: 'Exchanges Monitored',
      value: '15',
      change: '0%',
      trend: 'neutral' as const,
      icon: React.createElement(Building2, { className: "h-5 w-5" })
    }
  ];
};