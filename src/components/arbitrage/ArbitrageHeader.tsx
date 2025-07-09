import { RefreshCw } from 'lucide-react';

interface ArbitrageHeaderProps {
  isDarkMode: boolean;
  loading: boolean;
  onRefresh: () => void;
}

const ArbitrageHeader = ({ isDarkMode, loading, onRefresh }: ArbitrageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          ⚡ Arbitrage Trading Hub
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time arbitrage opportunities and exchange rate analysis
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
      >
        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        <span>Refresh Data</span>
      </button>
    </div>
  );
};

export default ArbitrageHeader;