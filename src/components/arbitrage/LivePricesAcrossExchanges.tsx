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

      <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        {/* Desktop Header */}
        <div className={`hidden lg:block px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
          <div className="grid grid-cols-8 gap-4 text-sm font-semibold items-center">
            <div className={`col-span-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Coin</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Binance</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Coinbase</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>KuCoin</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>OKX</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Kraken</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bybit</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gate.io</div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className={`lg:hidden px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
          <div className="text-sm font-semibold">
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Live Cryptocurrency Prices</span>
          </div>
        </div>

        {/* Price Data */}
        <div className={`divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
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
              <div key={index}>
                {/* Desktop Layout */}
                <div className={`hidden lg:block px-6 py-6 hover:bg-gray-500/5 transition-colors`}>
                  <div className="grid grid-cols-8 gap-4 items-center">
                    {/* Cryptocurrency */}
                    <div className="col-span-1 flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {coin.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {coin.symbol}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {coin.name}
                        </div>
                        <div className={`text-xs font-medium flex items-center mt-1 ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            coin.change24h >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {allPrices.map((priceData, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-lg font-bold mb-1 ${getPriceColor(priceData.price)}`}>
                          {formatPrice(priceData.price)}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          Vol: {formatVolumeDisplay(priceData.volume)}
                        </div>
                        {priceData.price === highestPrice && (
                          <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full font-medium">
                            HIGHEST
                          </span>
                        )}
                        {priceData.price === lowestPrice && (
                          <span className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-full font-medium">
                            LOWEST
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className={`lg:hidden px-6 py-6 hover:bg-gray-500/5 transition-colors`}>
                  {/* Coin Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {coin.symbol.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {coin.symbol}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {coin.name}
                      </div>
                    </div>
                    <div className={`text-sm font-medium flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        coin.change24h >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Price Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {allPrices.map((priceData, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border ${
                        isDarkMode ? 'bg-gray-800/50 border-gray-700/30' : 'bg-gray-50/50 border-gray-200/30'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {priceData.exchange}
                          </span>
                          {priceData.price === highestPrice && (
                            <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full font-medium">
                              HIGH
                            </span>
                          )}
                          {priceData.price === lowestPrice && (
                            <span className="text-xs text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full font-medium">
                              LOW
                            </span>
                          )}
                        </div>
                        <div className={`text-lg font-bold mb-1 ${getPriceColor(priceData.price)}`}>
                          {formatPrice(priceData.price)}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Volume: {formatVolumeDisplay(priceData.volume)}
                        </div>
                      </div>
                    ))}
                  </div>
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