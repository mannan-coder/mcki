import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { generateCoinPriceData } from '@/utils/arbitrageUtils';
import ExchangePriceTable from './ExchangePriceTable';
import ExchangePriceMobile from './ExchangePriceMobile';

interface LivePricesAcrossExchangesProps {
  opportunities: any[];
  isDarkMode: boolean;
}

const LivePricesAcrossExchanges = ({ opportunities, isDarkMode }: LivePricesAcrossExchangesProps) => {
  const coinData = generateCoinPriceData(opportunities);

  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🏪 Live Prices Across Exchanges
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time cryptocurrency prices and volumes across major exchanges
          </p>
        </div>
        <Link 
          to="/arbitrage"
          className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
        >
          <span>Details</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className={`rounded-lg border backdrop-blur-sm overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700/60' 
          : 'bg-white/98 border-gray-200/60'
      }`}>
        {/* Table Header */}
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/98' : 'border-gray-200/60 bg-gray-50/95'}`}>
          <div className="text-base font-bold flex items-center space-x-2">
            <span>🏪</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Live Exchange Price Comparison</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <ExchangePriceTable coinData={coinData} isDarkMode={isDarkMode} />
        </div>

        {/* Mobile View */}
        <ExchangePriceMobile coinData={coinData} isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default LivePricesAcrossExchanges;