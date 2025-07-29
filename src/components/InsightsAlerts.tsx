
import { useMemo } from 'react';
import { Calendar, AlertTriangle, TrendingUp, Eye, Target, ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useUpcomingEvents } from '@/hooks/useUpcomingEvents';
import { generateChartIds } from '@/utils/idGenerator';

interface InsightsAlertsProps {
  isDarkMode: boolean;
}

const InsightsAlerts = ({ isDarkMode }: InsightsAlertsProps) => {
  const chartIds = useMemo(() => generateChartIds('insightsAlerts'), []);
  const { events: tomorrowEvents, loading: eventsLoading } = useUpcomingEvents();

  // Liquidation Alerts Data
  const liquidationData = [
    { time: '00:00', amount: 12.5, coin: 'BTC', exchange: 'Binance' },
    { time: '04:00', amount: 8.3, coin: 'ETH', exchange: 'OKX' },
    { time: '08:00', amount: 45.2, coin: 'BTC', exchange: 'Bybit' },
    { time: '12:00', amount: 23.7, coin: 'SOL', exchange: 'Binance' },
    { time: '16:00', amount: 67.8, coin: 'BTC', exchange: 'Kraken' },
    { time: '20:00', amount: 34.5, coin: 'ETH', exchange: 'Coinbase' },
  ];

  const liquidationAlerts = [
    { coin: 'BTC', exchange: 'Binance', amount: '$67.8M', type: 'Long', change: '-12.5%', time: '2 min ago' },
    { coin: 'ETH', exchange: 'OKX', amount: '$34.5M', type: 'Short', change: '+8.3%', time: '5 min ago' },
    { coin: 'SOL', exchange: 'Bybit', amount: '$23.7M', type: 'Long', change: '-15.2%', time: '8 min ago' },
    { coin: 'MATIC', exchange: 'Kraken', amount: '$12.3M', type: 'Long', change: '-9.8%', time: '12 min ago' },
  ];

  // Pump & Dump Data
  const pumpDumpData = [
    { time: '00:00', price: 100, volume: 1000 },
    { time: '00:15', price: 105, volume: 1500 },
    { time: '00:30', price: 118, volume: 8500 },
    { time: '00:45', price: 142, volume: 12000 },
    { time: '01:00', price: 95, volume: 15000 },
    { time: '01:15', price: 87, volume: 8000 },
  ];

  const pumpDumpAlerts = [
    { coin: 'PEPE', exchange: 'Binance', change: '+247%', volume: '$12.5M', time: '3 min ago', type: 'pump' },
    { coin: 'SHIB', exchange: 'KuCoin', change: '+89%', volume: '$8.7M', time: '7 min ago', type: 'pump' },
    { coin: 'DOGE', exchange: 'Coinbase', change: '-45%', volume: '$15.2M', time: '15 min ago', type: 'dump' },
    { coin: 'FLOKI', exchange: 'OKX', change: '+156%', volume: '$6.3M', time: '22 min ago', type: 'pump' },
  ];

  // Whale Hunter Data
  const whaleMovements = [
    { exchange: 'Binance', amount: 2500, coin: 'BTC', direction: 'in', time: '5 min ago' },
    { exchange: 'Coinbase', amount: 15000, coin: 'ETH', direction: 'out', time: '12 min ago' },
    { exchange: 'Kraken', amount: 500000, coin: 'SOL', direction: 'in', time: '18 min ago' },
    { exchange: 'OKX', amount: 1200, coin: 'BTC', direction: 'out', time: '25 min ago' },
  ];

  const whaleDistribution = [
    { name: 'BTC', value: 45, color: '#f59e0b' },
    { name: 'ETH', value: 30, color: '#3b82f6' },
    { name: 'SOL', value: 15, color: '#8b5cf6' },
    { name: 'Others', value: 10, color: '#10b981' },
  ];

  // Sniper Tools Data
  const sniperData = [
    { time: '00:00', listings: 2, gains: 150 },
    { time: '04:00', listings: 1, gains: 89 },
    { time: '08:00', listings: 4, gains: 340 },
    { time: '12:00', listings: 3, gains: 267 },
    { time: '16:00', listings: 1, gains: 45 },
    { time: '20:00', listings: 2, gains: 178 },
  ];

  const sniperAlerts = [
    { coin: 'NEWCOIN', exchange: 'KuCoin', gain: '+487%', volume: '$2.1M', time: '1 min ago', marketCap: '$45M' },
    { coin: 'LAUNCH', exchange: 'Binance', gain: '+234%', volume: '$5.8M', time: '8 min ago', marketCap: '$78M' },
    { coin: 'ROCKET', exchange: 'OKX', gain: '+156%', volume: '$1.2M', time: '15 min ago', marketCap: '$23M' },
    { coin: 'MOON', exchange: 'Bybit', gain: '+89%', volume: '$3.4M', time: '22 min ago', marketCap: '$56M' },
  ];

  const chartConfig = {
    amount: { label: "Amount ($M)", color: "#ef4444" },
    price: { label: "Price", color: "#3b82f6" },
    volume: { label: "Volume", color: "#8b5cf6" },
    listings: { label: "New Listings", color: "#10b981" },
    gains: { label: "Average Gain %", color: "#f59e0b" },
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💡 Insights & Alerts
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time market intelligence and opportunities
          </p>
        </div>
        <Link 
          to="/analytics"
          className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
        >
          <span>Analytics</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Tomorrow's Events */}
        <div className={`p-4 rounded-lg border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-1.5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-md">
              <Calendar className="text-white" size={16} />
            </div>
            <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              📅 Tomorrow's Events
            </h3>
          </div>

          <div className="space-y-2">
            {eventsLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700/30 border-gray-600/30' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 w-16 bg-muted rounded animate-pulse mt-1"></div>
                  </div>
                  <div className="h-6 w-12 bg-muted rounded animate-pulse"></div>
                </div>
              ))
            ) : (
              tomorrowEvents.slice(0, 3).map((event, index) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700/30 border-gray-600/30' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {event.event}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {event.time}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(event.impact)}`}>
                      {event.impact.toUpperCase()}
                    </div>
                    {event.status === 'updated' && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" title="Recently updated" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Status */}
        <div className={`p-4 rounded-lg border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🚨 Live Status
            </h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Live</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                847
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Alerts
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                15
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Exchanges
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <div className={`text-lg font-bold text-red-500`}>
                $234M
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Liquidations
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <div className={`text-lg font-bold text-green-500`}>
                23
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                New Listings
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liquidation Alerts */}
      <div className={`p-4 rounded-lg border backdrop-blur-sm mb-4 ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      }`}>
        <div className="flex items-center space-x-2 mb-3">
          <div className="p-1.5 bg-gradient-to-r from-red-500 to-rose-600 rounded-md">
            <AlertTriangle className="text-white" size={16} />
          </div>
          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🚨 Liquidation Alerts
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              24h Liquidation Volume
            </h4>
            <ChartContainer config={chartConfig} className="h-32">
              <LineChart data={liquidationData}>
                <XAxis dataKey="time" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </div>

          <div>
            <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Liquidations
            </h4>
            <div className="space-y-2">
              {liquidationAlerts.slice(0, 3).map((alert, index) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded-md border ${
                  isDarkMode ? 'bg-gray-700/30 border-gray-600/30' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {alert.coin}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      alert.type === 'Long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {alert.type}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {alert.amount}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {alert.exchange}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pump & Dump Alerts */}
      <div className={`p-4 rounded-lg border backdrop-blur-sm mb-4 ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      }`}>
        <div className="flex items-center space-x-2 mb-3">
          <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md">
            <TrendingUp className="text-white" size={16} />
          </div>
          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📈 Pump & Dump Detection
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Price & Volume Pattern
            </h4>
            <ChartContainer config={chartConfig} className="h-32">
              <LineChart data={pumpDumpData}>
                <XAxis dataKey="time" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </div>

          <div>
            <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Active Alerts
            </h4>
            <div className="space-y-2">
              {pumpDumpAlerts.slice(0, 3).map((alert, index) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded-md border ${
                  isDarkMode ? 'bg-gray-700/30 border-gray-600/30' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {alert.coin}
                    </div>
                    <div className={`flex items-center text-xs ${
                      alert.type === 'pump' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {alert.type === 'pump' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {alert.change}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {alert.volume}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {alert.exchange}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Whale Hunter */}
      <div className={`p-6 rounded-xl border backdrop-blur-sm mb-8 ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
            <Eye className="text-white" size={24} />
          </div>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🐋 Whale Hunter
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Whale Activity Distribution
            </h4>
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={whaleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {whaleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>

          <div>
            <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Whale Movements
            </h4>
            <div className="space-y-3">
              {whaleMovements.map((movement, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  isDarkMode ? 'bg-gray-700/30 border-gray-600/30' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {movement.amount.toLocaleString()} {movement.coin}
                    </div>
                    <div className={`flex items-center text-sm px-2 py-1 rounded ${
                      movement.direction === 'in' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {movement.direction === 'in' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                      {movement.direction === 'in' ? 'Inflow' : 'Outflow'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {movement.exchange}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {movement.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sniper Tools */}
      <div className={`p-6 rounded-xl border backdrop-blur-sm mb-8 ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/70 border-gray-200/50'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
            <Target className="text-white" size={24} />
          </div>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🎯 Sniper Tools
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              New Listings Performance
            </h4>
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={sniperData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId={chartIds.leftAxis} />
                <YAxis yAxisId={chartIds.rightAxis} orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId={chartIds.leftAxis} dataKey="listings" fill="#10b981" />
                <Bar yAxisId={chartIds.rightAxis} dataKey="gains" fill="#f59e0b" />
              </BarChart>
            </ChartContainer>
          </div>

          <div>
            <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Hot New Listings
            </h4>
            <div className="space-y-3">
              {sniperAlerts.map((alert, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  isDarkMode ? 'bg-gray-700/30 border-gray-600/30' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {alert.coin}
                    </div>
                    <div className="flex items-center text-sm text-green-500">
                      <ArrowUpRight size={16} />
                      {alert.gain}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {alert.marketCap}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {alert.exchange} • {alert.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsAlerts;
