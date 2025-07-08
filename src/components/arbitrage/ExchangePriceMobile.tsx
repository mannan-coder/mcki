import { getCoinLogoById } from '@/utils/coinLogos';
import { formatPrice, formatVolumeDisplay } from '@/utils/arbitrageUtils';
import { CoinPriceData, ExchangePrice } from '@/types/coinData';

interface ExchangePriceMobileProps {
  coinData: CoinPriceData[];
  isDarkMode: boolean;
}

const ExchangePriceMobile = ({ coinData, isDarkMode }: ExchangePriceMobileProps) => {
  return (
    <div className={`lg:hidden divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
      {coinData.map((coin, index) => {
        const exchanges = ['binance', 'coinbase', 'kucoin', 'okx', 'kraken', 'bybit', 'gateio'];
        const exchangeNames = ['Binance', 'Coinbase', 'KuCoin', 'OKX', 'Kraken', 'Bybit', 'Gate.io'];
        
        const allPrices: ExchangePrice[] = exchanges.map((exchange, idx) => ({
          exchange: exchangeNames[idx],
          key: exchange,
          price: coin.prices[exchange] || 0,
          volume: coin.volumes[exchange] || '0'
        }));
        
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
              <img 
                src={getCoinLogoById(coin.symbol.toLowerCase())} 
                alt={coin.symbol}
                className="w-16 h-16 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/64x64/666666/ffffff?text=${coin.symbol.charAt(0)}`;
                }}
              />
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
  );
};

export default ExchangePriceMobile;