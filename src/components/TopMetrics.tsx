
import { ArrowUp, ArrowDown, TrendingUp, Sparkles } from 'lucide-react';

interface TopMetricsProps {
  isDarkMode: boolean;
}

const TopMetrics = ({ isDarkMode }: TopMetricsProps) => {
  const topGainers = [
    { symbol: 'BTC', change: '+5.2%', price: '$67,234' },
    { symbol: 'ETH', change: '+8.7%', price: '$3,845' },
    { symbol: 'SOL', change: '+12.4%', price: '$178' },
    { symbol: 'ADA', change: '+6.8%', price: '$0.65' },
    { symbol: 'DOT', change: '+9.1%', price: '$7.42' },
  ];

  const topLosers = [
    { symbol: 'AVAX', change: '-4.2%', price: '$42.15' },
    { symbol: 'LINK', change: '-2.8%', price: '$18.67' },
    { symbol: 'UNI', change: '-5.1%', price: '$12.34' },
    { symbol: 'MATIC', change: '-3.9%', price: '$0.87' },
    { symbol: 'LTC', change: '-1.7%', price: '$145.23' },
  ];

  const topVolume = [
    { symbol: 'BTC', volume: '$28.5B' },
    { symbol: 'ETH', volume: '$15.2B' },
    { symbol: 'USDT', volume: '$12.8B' },
    { symbol: 'BNB', volume: '$4.7B' },
    { symbol: 'SOL', volume: '$3.9B' },
  ];

  const newlyLaunched = [
    { symbol: 'NEWT', price: '$0.0234', launched: '2h ago' },
    { symbol: 'FLUX', price: '$1.45', launched: '4h ago' },
    { symbol: 'ZERO', price: '$0.89', launched: '6h ago' },
    { symbol: 'META', price: '$12.67', launched: '8h ago' },
    { symbol: 'NOVA', price: '$0.345', launched: '12h ago' },
  ];

  const MetricCard = ({ title, icon: Icon, children, gradient }: any) => (
    <div className={`rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600' 
        : 'bg-white/70 border-gray-200/50 hover:border-gray-300'
    }`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
            <Icon size={20} className="text-white" />
          </div>
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {children}
      </div>
    </div>
  );

  const CoinItem = ({ symbol, change, price, volume, launched }: any) => (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center space-x-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          {symbol.charAt(0)}
        </div>
        <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {symbol}
        </span>
      </div>
      <div className="text-right">
        {change && (
          <div className={`text-sm font-medium ${
            change.startsWith('+') ? 'text-green-500' : 'text-red-500'
          }`}>
            {change}
          </div>
        )}
        {price && (
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {price}
          </div>
        )}
        {volume && (
          <div className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {volume}
          </div>
        )}
        {launched && (
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {launched}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Top Gainers" 
          icon={ArrowUp} 
          gradient="from-green-500 to-emerald-600"
        >
          {topGainers.map((coin, index) => (
            <CoinItem key={index} {...coin} />
          ))}
        </MetricCard>

        <MetricCard 
          title="Top Losers" 
          icon={ArrowDown} 
          gradient="from-red-500 to-rose-600"
        >
          {topLosers.map((coin, index) => (
            <CoinItem key={index} {...coin} />
          ))}
        </MetricCard>

        <MetricCard 
          title="Top Volume" 
          icon={TrendingUp} 
          gradient="from-blue-500 to-cyan-600"
        >
          {topVolume.map((coin, index) => (
            <CoinItem key={index} symbol={coin.symbol} volume={coin.volume} />
          ))}
        </MetricCard>

        <MetricCard 
          title="Newly Launched" 
          icon={Sparkles} 
          gradient="from-purple-500 to-violet-600"
        >
          {newlyLaunched.map((coin, index) => (
            <CoinItem key={index} symbol={coin.symbol} price={coin.price} launched={coin.launched} />
          ))}
        </MetricCard>
      </div>
    </section>
  );
};

export default TopMetrics;
