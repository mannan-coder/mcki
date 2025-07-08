import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { generateCoinPriceData, formatPrice, formatVolumeDisplay } from '@/utils/arbitrageUtils';

interface LivePricesAcrossExchangesProps {
  opportunities: any[];
  isDarkMode: boolean;
}

const LivePricesAcrossExchanges = ({ opportunities, isDarkMode }: LivePricesAcrossExchangesProps) => {
  const coinData = generateCoinPriceData(opportunities);

  return (
    <section className="mt-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🏪 Live Prices Across Exchanges
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time cryptocurrency prices and volumes across major exchanges
          </p>
        </div>
        <Link 
          to="/arbitrage"
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>View Details</span>
          <ExternalLink size={16} />
        </Link>
      </div>

      <div className={`rounded-xl border backdrop-blur-sm overflow-hidden shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700/60' 
          : 'bg-white/98 border-gray-200/60'
      }`}>
        {/* Table Header */}
        <div className={`px-6 py-5 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/98' : 'border-gray-200/60 bg-gray-50/95'}`}>
          <div className="text-lg font-bold flex items-center space-x-2">
            <span>🏪</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Live Exchange Price Comparison</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-50/90'}`}>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center space-x-2">
                    <span>🪙</span>
                    <span>Cryptocurrency</span>
                  </div>
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-yellow-500 text-lg mb-1">🟡</span>
                    <span>Binance</span>
                  </div>
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-blue-500 text-lg mb-1">🔵</span>
                    <span>Coinbase</span>
                  </div>
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-green-500 text-lg mb-1">🟢</span>
                    <span>KuCoin</span>
                  </div>
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-lg mb-1">⚫</span>
                    <span>OKX</span>
                  </div>
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-purple-500 text-lg mb-1">🟣</span>
                    <span>Kraken</span>
                  </div>
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-500 text-lg mb-1">🟠</span>
                    <span>Bybit</span>
                  </div>
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-red-500 text-lg mb-1">🔴</span>
                    <span>Gate.io</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
              {coinData.map((coin, index) => {
                // Find highest and lowest prices for this coin
                const allPrices = [
                  { exchange: 'Binance', key: 'binance', price: coin.prices.binance, volume: coin.volumes.binance },
                  { exchange: 'Coinbase', key: 'coinbase', price: coin.prices.coinbase, volume: coin.volumes.coinbase },
                  { exchange: 'KuCoin', key: 'kucoin', price: coin.prices.kucoin, volume: coin.volumes.kucoin },
                  { exchange: 'OKX', key: 'okx', price: coin.prices.okx, volume: coin.volumes.okx },
                  { exchange: 'Kraken', key: 'kraken', price: coin.prices.kraken, volume: coin.volumes.kraken },
                  { exchange: 'Bybit', key: 'bybit', price: coin.prices.bybit, volume: coin.volumes.bybit },
                  { exchange: 'Gate.io', key: 'gateio', price: coin.prices.gateio, volume: coin.volumes.gateio }
                ];
                
                const highestPrice = Math.max(...allPrices.map(p => p.price));
                const lowestPrice = Math.min(...allPrices.map(p => p.price));
                
                const getPriceColor = (price: number) => {
                  if (price === highestPrice) return 'text-green-500';
                  if (price === lowestPrice) return 'text-red-500';
                  return isDarkMode ? 'text-blue-400' : 'text-blue-600';
                };

                return (
                  <tr key={index} className={`border-b transition-all duration-200 hover:bg-gray-500/5 group ${
                    isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'
                  }`}>
                    {/* Cryptocurrency */}
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-transform group-hover:scale-105 ${
                          isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
                        }`}>
                          {coin.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {coin.symbol}
                          </div>
                          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                            {coin.name}
                          </div>
                          <div className={`text-sm font-medium flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                              coin.change24h >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                              {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Exchange Prices */}
                    {allPrices.map((priceData, idx) => (
                      <td key={idx} className="px-4 py-6 text-center">
                        <div className="space-y-2">
                          <div className={`text-lg font-bold transition-colors ${getPriceColor(priceData.price)}`}>
                            {formatPrice(priceData.price)}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Vol: {formatVolumeDisplay(priceData.volume)}
                          </div>
                          <div className="h-6 flex items-center justify-center">
                            {priceData.price === highestPrice && (
                              <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full font-bold border border-green-500/20">
                                🔝 HIGH
                              </span>
                            )}
                            {priceData.price === lowestPrice && (
                              <span className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-full font-bold border border-red-500/20">
                                📉 LOW
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className={`lg:hidden divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
          {coinData.map((coin, index) => {
            const allPrices = [
              { exchange: 'Binance', key: 'binance', price: coin.prices.binance, volume: coin.volumes.binance },
              { exchange: 'Coinbase', key: 'coinbase', price: coin.prices.coinbase, volume: coin.volumes.coinbase },
              { exchange: 'KuCoin', key: 'kucoin', price: coin.prices.kucoin, volume: coin.volumes.kucoin },
              { exchange: 'OKX', key: 'okx', price: coin.prices.okx, volume: coin.volumes.okx },
              { exchange: 'Kraken', key: 'kraken', price: coin.prices.kraken, volume: coin.volumes.kraken },
              { exchange: 'Bybit', key: 'bybit', price: coin.prices.bybit, volume: coin.volumes.bybit },
              { exchange: 'Gate.io', key: 'gateio', price: coin.prices.gateio, volume: coin.volumes.gateio }
            ];
            
            const highestPrice = Math.max(...allPrices.map(p => p.price));
            const lowestPrice = Math.min(...allPrices.map(p => p.price));
            
            const getPriceColor = (price: number) => {
              if (price === highestPrice) return 'text-green-500';
              if (price === lowestPrice) return 'text-red-500';
              return isDarkMode ? 'text-blue-400' : 'text-blue-600';
            };

            return (
              <div key={index} className={`px-6 py-6 hover:bg-gray-500/5 transition-colors`}>
                {/* Coin Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${
                    isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
                  }`}>
                    {coin.symbol.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {coin.symbol}
                    </div>
                    <div className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {coin.name}
                    </div>
                  </div>
                  <div className={`text-sm font-medium flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <span className={`px-4 py-2 rounded-full text-base font-bold ${
                      coin.change24h >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Price Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {allPrices.map((priceData, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border transition-all duration-200 hover:scale-105 ${
                      isDarkMode ? 'bg-gray-800/60 border-gray-700/40 hover:bg-gray-800/80' : 'bg-gray-50/60 border-gray-200/40 hover:bg-gray-50/80'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {priceData.exchange}
                        </span>
                        {priceData.price === highestPrice && (
                          <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full font-bold border border-green-500/20">
                            🔝 HIGH
                          </span>
                        )}
                        {priceData.price === lowestPrice && (
                          <span className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-full font-bold border border-red-500/20">
                            📉 LOW
                          </span>
                        )}
                      </div>
                      <div className={`text-lg font-bold mb-2 ${getPriceColor(priceData.price)}`}>
                        {formatPrice(priceData.price)}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Volume: {formatVolumeDisplay(priceData.volume)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LivePricesAcrossExchanges;