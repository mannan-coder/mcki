
import { Calendar, AlertTriangle, TrendingUp, Eye, Target } from 'lucide-react';

interface InsightsAlertsProps {
  isDarkMode: boolean;
}

const InsightsAlerts = ({ isDarkMode }: InsightsAlertsProps) => {
  const tomorrowEvents = [
    { time: '09:00 UTC', event: 'Federal Reserve Meeting', impact: 'high' },
    { time: '14:30 UTC', event: 'Bitcoin ETF Decision', impact: 'high' },
    { time: '16:00 UTC', event: 'Ethereum Shanghai Upgrade', impact: 'medium' },
    { time: '20:00 UTC', event: 'Coinbase Earnings Call', impact: 'medium' },
  ];

  const alerts = [
    {
      type: 'liquidation',
      icon: AlertTriangle,
      title: 'Large Liquidation Alert',
      description: '$45M in long positions liquidated on Binance',
      time: '5 min ago',
      severity: 'high'
    },
    {
      type: 'pump',
      icon: TrendingUp,
      title: 'Pump Alert: MATIC',
      description: '+18% price increase in 15 minutes',
      time: '12 min ago',
      severity: 'medium'
    },
    {
      type: 'whale',
      icon: Eye,
      title: 'Whale Movement',
      description: '2,500 BTC moved to unknown wallet',
      time: '25 min ago',
      severity: 'medium'
    },
    {
      type: 'sniper',
      icon: Target,
      title: 'New Token Listed',
      description: 'NEWCOIN listed on KuCoin with 500% gain',
      time: '1h ago',
      severity: 'high'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-green-500/50 bg-green-500/10';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Insights & Alerts
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time market intelligence and opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tomorrow's Events */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
              <Calendar className="text-white" size={20} />
            </div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              📅 Tomorrow's Key Events
            </h3>
          </div>

          <div className="space-y-4">
            {tomorrowEvents.map((event, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700/30 border-gray-600/30' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex-1">
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {event.event}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {event.time}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(event.impact)}`}>
                  {event.impact.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🚨 Live Alerts
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Live</span>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${
                isDarkMode ? 'border-opacity-30' : 'border-opacity-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'high' 
                      ? 'bg-red-500/20 text-red-500' 
                      : alert.severity === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-green-500/20 text-green-500'
                  }`}>
                    <alert.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {alert.title}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {alert.description}
                    </div>
                    <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {alert.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className={`p-6 rounded-xl border backdrop-blur-sm text-center ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg inline-block mb-4">
            <AlertTriangle className="text-white" size={24} />
          </div>
          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Liquidation Alerts
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track large-scale liquidations across exchanges
          </p>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm text-center ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg inline-block mb-4">
            <TrendingUp className="text-white" size={24} />
          </div>
          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Pump & Dump
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Detect sudden price movements and anomalies
          </p>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm text-center ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg inline-block mb-4">
            <Eye className="text-white" size={24} />
          </div>
          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Whale Hunter
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Monitor large wallet movements and transactions
          </p>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm text-center ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg inline-block mb-4">
            <Target className="text-white" size={24} />
          </div>
          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sniper Tools
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Early alerts for new listings and trending tokens
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsightsAlerts;
