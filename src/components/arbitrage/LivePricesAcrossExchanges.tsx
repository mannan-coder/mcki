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
        {/* Header */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
          <div className="grid grid-cols-16 gap-2 text-sm font-semibold items-center">
            <div className={`col-span-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cryptocurrency</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Binance</div>
            <div className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vol</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Coinbase</div>
            <div className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vol</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>KuCoin</div>
            <div className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vol</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>OKX</div>
            <div className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vol</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Kraken</div>
            <div className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vol</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bybit</div>
            <div className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vol</div>
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gate.io</div>
            <div className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vol</div>
          </div>
        </div>

        {/* Price Data */}
        <div className={`divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
          {coinData.map((coin, index) => {
            // Find highest and lowest prices for this coin
            const allPrices = [
              { exchange: 'binance', price: coin.prices.binance, volume: coin.volumes.binance },
              { exchange: 'coinbase', price: coin.prices.coinbase, volume: coin.volumes.coinbase },
              { exchange: 'kucoin', price: coin.prices.kucoin, volume: coin.volumes.kucoin },
              { exchange: 'okx', price: coin.prices.okx, volume: coin.volumes.okx },
              { exchange: 'kraken', price: coin.prices.kraken, volume: coin.volumes.kraken },
              { exchange: 'bybit', price: coin.prices.bybit, volume: coin.volumes.bybit },
              { exchange: 'gateio', price: coin.prices.gateio, volume: coin.volumes.gateio }
            ];
            
            const highestPrice = Math.max(...allPrices.map(p => p.price));
            const lowestPrice = Math.min(...allPrices.map(p => p.price));
            
            const getPriceColor = (price: number) => {
              if (price === highestPrice) return 'text-green-500';
              if (price === lowestPrice) return 'text-red-500';
              return isDarkMode ? 'text-blue-400' : 'text-blue-600';
            };

            return (
              <div key={index} className={`px-6 py-5 hover:bg-gray-500/5 transition-colors`}>
                <div className="grid grid-cols-16 gap-2 items-center">
                  {/* Cryptocurrency */}
                  <div className="col-span-2 flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {coin.symbol}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {coin.name}
                      </div>
                      <div className={`text-xs font-medium flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                          coin.change24h >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {allPrices.map((priceData, idx) => (
                    <>
                      {/* Price column */}
                      <div key={`price-${idx}`} className="text-center">
                        <div className={`text-sm font-bold ${getPriceColor(priceData.price)}`}>
                          {formatPrice(priceData.price)}
                        </div>
                        {priceData.price === highestPrice && (
                          <div className="flex items-center justify-center mt-1">
                            <span className="text-xs text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full font-medium">
                              HIGH
                            </span>
                          </div>
                        )}
                        {priceData.price === lowestPrice && (
                          <div className="flex items-center justify-center mt-1">
                            <span className="text-xs text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full font-medium">
                              LOW
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Volume column */}
                      <div key={`volume-${idx}`} className="text-center">
                        <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {formatVolumeDisplay(priceData.volume)}
                        </div>
                      </div>
                    </>
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