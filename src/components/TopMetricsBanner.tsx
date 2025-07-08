import { TrendingUp, Activity, Globe, Zap } from 'lucide-react';
import { useCryptoData } from '@/hooks/useCryptoData';

interface TopMetricsBannerProps {
  isDarkMode: boolean;
}

const TopMetricsBanner = ({ isDarkMode }: TopMetricsBannerProps) => {
  const { data: marketData, loading } = useCryptoData();

  if (loading || !marketData) {
    return (
      <div className={`border-b backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700/50' 
          : 'bg-white/95 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
                <div>
                  <div className="h-3 w-16 bg-muted rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-12 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Coins',
      value: marketData.activeCryptocurrencies?.toLocaleString() || '17,581',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      label: 'Exchanges',
      value: marketData.markets?.toLocaleString() || '1,308',
      icon: Globe,
      color: 'text-green-500'
    },
    {
      label: 'Market Cap',
      value: `$${(marketData.totalMarketCap / 1e12).toFixed(2)}T`,
      change: '+2.9%',
      changeColor: 'text-green-500',
      icon: Activity,
      color: 'text-purple-500'
    },
    {
      label: '24h Vol',
      value: `$${(marketData.totalVolume / 1e9).toFixed(1)}B`,
      change: '-1.2%',
      changeColor: 'text-red-500',
      icon: Zap,
      color: 'text-orange-500'
    },
    {
      label: 'Dominance',
      value: `BTC ${marketData.btcDominance.toFixed(1)}%`,
      subvalue: `ETH ${(marketData.coins.find(c => c.symbol === 'ETH')?.marketCap / marketData.totalMarketCap * 100)?.toFixed(1) || '18.2'}%`,
      icon: TrendingUp,
      color: 'text-yellow-500'
    },
    {
      label: 'Gas',
      value: '1,831 GWEI',
      icon: Zap,
      color: 'text-red-500'
    }
  ];

  return (
    <div className={`border-b backdrop-blur-sm ${
      isDarkMode 
        ? 'bg-gray-800/95 border-gray-700/50' 
        : 'bg-white/95 border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <stat.icon size={16} className={stat.color} />
              <div>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}:
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </span>
                  {stat.change && (
                    <span className={`text-xs font-medium ${stat.changeColor}`}>
                      {stat.change}
                    </span>
                  )}
                </div>
                {stat.subvalue && (
                  <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {stat.subvalue}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMetricsBanner;