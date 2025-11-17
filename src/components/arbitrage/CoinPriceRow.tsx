import { getCoinLogoById } from '@/utils/coinLogos';
import { CoinPriceData, ExchangePrice } from '@/types/coinData';
import PriceCell from './PriceCell';

interface CoinPriceRowProps {
  coin: CoinPriceData;
  isDarkMode: boolean;
}

const CoinPriceRow = ({ coin, isDarkMode }: CoinPriceRowProps) => {
  const exchanges = ['binance', 'coinbase', 'kucoin', 'okx', 'kraken', 'bybit', 'gateio'];
  
  const allPrices: ExchangePrice[] = exchanges.map(exchange => ({
    exchange: exchange.charAt(0).toUpperCase() + exchange.slice(1),
    key: exchange,
    price: coin.prices[exchange] || 0,
    volume: coin.volumes[exchange] || '0'
  }));
  
  const highestPrice = Math.max(...allPrices.map(p => p.price));
  const lowestPrice = Math.min(...allPrices.map(p => p.price));

  return (
    <tr className={`border-b transition-all duration-200 hover:bg-gray-500/5 group ${
      isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'
    }`}>
      {/* Cryptocurrency */}
      <td className="px-3 py-3">
        <div className="flex items-center space-x-2">
          <img 
            src={getCoinLogoById(coin.symbol.toLowerCase())} 
            alt={coin.symbol}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const { getCoinFallbackAvatar } = require('@/utils/avatarGenerator');
              target.src = getCoinFallbackAvatar(coin.symbol, 32);
            }}
          />
          <div>
            <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {coin.symbol}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              {coin.name}
            </div>
            <div className={`text-xs font-medium flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
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
        <PriceCell
          key={idx}
          price={priceData.price}
          volume={priceData.volume}
          isHighest={priceData.price === highestPrice}
          isLowest={priceData.price === lowestPrice}
          isDarkMode={isDarkMode}
        />
      ))}
    </tr>
  );
};

export default CoinPriceRow;