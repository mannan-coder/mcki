import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import OverviewStats from '@/components/analytics/OverviewStats';
import TrafficChart from '@/components/analytics/TrafficChart';
import TopPages from '@/components/analytics/TopPages';
import TrafficSources from '@/components/analytics/TrafficSources';
import DeviceBreakdown from '@/components/analytics/DeviceBreakdown';
import GeographicData from '@/components/analytics/GeographicData';
import PerformanceInsights from '@/components/analytics/PerformanceInsights';
import { useRealTimeVisitors } from '@/hooks/useRealTimeVisitors';
import {
  timeRanges,
  overviewStats,
  trafficData,
  topPages,
  trafficSources,
  deviceData,
  geographicData
} from '@/data/analyticsData';

interface AnalyticsProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

const Analytics = ({ isDarkMode = false, setIsDarkMode = () => {} }: AnalyticsProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const realTimeVisitors = useRealTimeVisitors();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive analytics for website and blockchain data
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{realTimeVisitors} users online</span>
            </div>
            
            <Tabs value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <TabsList>
                {timeRanges.map((range) => (
                  <TabsTrigger key={range.value} value={range.value} className="text-xs">
                    {range.label.split(' ')[1]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Analytics Menu */}
        <div className="mb-8">
          <Tabs defaultValue="website" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="website">Website Analytics</TabsTrigger>
              <TabsTrigger value="chains" onClick={() => window.location.href = '/chain-analytics'}>
                Chain Analytics
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Overview Stats */}
        <OverviewStats stats={overviewStats} />

        {/* Traffic Chart */}
        <TrafficChart data={trafficData} />

        {/* Two column layout for detailed analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopPages pages={topPages} />
          <TrafficSources sources={trafficSources} />
          <DeviceBreakdown devices={deviceData} />
          <GeographicData countries={geographicData} />
        </div>

        {/* Performance Insights */}
        <PerformanceInsights />
      </div>
    </div>
  );
};

export default Analytics;