import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, Activity } from 'lucide-react';

interface CryptoTableProps {
  coins: Array<{
    id: string;
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    change7d: number;
    marketCap: number;
    volume: number;
    rank: number;
    image: string;
  }>;
  isDarkMode: boolean;
  onCoinClick?: (coinId: string) => void;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ coins, isDarkMode, onCoinClick }) => {
  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
  };

  return (
    <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white/70 border-gray-200/50'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Rank
              </th>
              <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </th>
              <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Price
              </th>
              <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                24h %
              </th>
              <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                7d %
              </th>
              <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Market Cap
              </th>
              <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Volume (24h)
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr 
                key={coin.id}
                className={`border-b cursor-pointer transition-colors hover:bg-opacity-50 ${
                  isDarkMode 
                    ? 'border-gray-700/30 hover:bg-gray-700/30' 
                    : 'border-gray-200/30 hover:bg-gray-100/50'
                }`}
                onClick={() => onCoinClick?.(coin.id)}
              >
                <td className="p-4">
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    #{coin.rank}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={coin.image} 
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div>
                      <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {coin.name}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatPrice(coin.price)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className={`flex items-center justify-end space-x-1 ${
                    coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {coin.change24h >= 0 ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                    <span className="font-medium">
                      {Math.abs(coin.change24h).toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className={`flex items-center justify-end space-x-1 ${
                    coin.change7d >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {coin.change7d >= 0 ? (
                      <TrendingUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                    <span className="font-medium">
                      {Math.abs(coin.change7d).toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatMarketCap(coin.marketCap)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatVolume(coin.volume)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;