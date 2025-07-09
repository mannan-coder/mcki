import { useState } from 'react';

interface ExchangeRate {
  exchange: string;
  price: number;
  volume24h: string;
  change24h: number;
  lastUpdate: string;
  spread: number;
  orderBookDepth: string;
}

interface ExchangeRatesTableProps {
  isDarkMode: boolean;
}

const ExchangeRatesTable = ({ isDarkMode }: ExchangeRatesTableProps) => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const exchangeRates: { [key: string]: ExchangeRate[] } = {
    BTC: [
      { exchange: 'Binance', price: 67890, volume24h: '$45.2B', change24h: 2.4, lastUpdate: '2s ago', spread: 0.05, orderBookDepth: '$2.8M' },
      { exchange: 'Coinbase', price: 67825, volume24h: '$32.1B', change24h: 2.2, lastUpdate: '3s ago', spread: 0.08, orderBookDepth: '$2.1M' },
      { exchange: 'KuCoin', price: 67150, volume24h: '$28.7B', change24h: 1.8, lastUpdate: '2s ago', spread: 0.12, orderBookDepth: '$1.9M' },
      { exchange: 'OKX', price: 67945, volume24h: '$41.3B', change24h: 2.6, lastUpdate: '4s ago', spread: 0.06, orderBookDepth: '$2.5M' },
      { exchange: 'Kraken', price: 67780, volume24h: '$19.8B', change24h: 2.1, lastUpdate: '5s ago', spread: 0.09, orderBookDepth: '$1.4M' },
      { exchange: 'Huobi', price: 67675, volume24h: '$15.2B', change24h: 1.9, lastUpdate: '6s ago', spread: 0.11, orderBookDepth: '$1.1M' },
      { exchange: 'Bitfinex', price: 67920, volume24h: '$12.8B', change24h: 2.3, lastUpdate: '4s ago', spread: 0.07, orderBookDepth: '$980K' }
    ],
    ETH: [
      { exchange: 'Binance', price: 3845, volume24h: '$28.4B', change24h: 1.8, lastUpdate: '3s ago', spread: 0.04, orderBookDepth: '$1.8M' },
      { exchange: 'Coinbase', price: 3820, volume24h: '$24.1B', change24h: 1.6, lastUpdate: '2s ago', spread: 0.07, orderBookDepth: '$1.5M' },
      { exchange: 'KuCoin', price: 3856, volume24h: '$16.2B', change24h: 1.9, lastUpdate: '4s ago', spread: 0.09, orderBookDepth: '$1.2M' },
      { exchange: 'OKX', price: 3865, volume24h: '$22.7B', change24h: 2.0, lastUpdate: '3s ago', spread: 0.05, orderBookDepth: '$1.6M' },
      { exchange: 'Kraken', price: 3838, volume24h: '$12.9B', change24h: 1.7, lastUpdate: '6s ago', spread: 0.08, orderBookDepth: '$1.1M' },
      { exchange: 'Huobi', price: 3842, volume24h: '$9.4B', change24h: 1.8, lastUpdate: '5s ago', spread: 0.06, orderBookDepth: '$890K' },
      { exchange: 'Bitfinex', price: 3851, volume24h: '$7.2B', change24h: 1.9, lastUpdate: '7s ago', spread: 0.08, orderBookDepth: '$720K' }
    ],
    SOL: [
      { exchange: 'Binance', price: 178.9, volume24h: '$8.2B', change24h: -0.7, lastUpdate: '4s ago', spread: 0.06, orderBookDepth: '$680K' },
      { exchange: 'Coinbase', price: 179.2, volume24h: '$6.1B', change24h: -0.5, lastUpdate: '5s ago', spread: 0.09, orderBookDepth: '$520K' },
      { exchange: 'KuCoin', price: 177.8, volume24h: '$4.8B', change24h: -0.9, lastUpdate: '7s ago', spread: 0.11, orderBookDepth: '$410K' },
      { exchange: 'OKX', price: 178.4, volume24h: '$5.9B', change24h: -0.6, lastUpdate: '6s ago', spread: 0.08, orderBookDepth: '$580K' },
      { exchange: 'Kraken', price: 176.2, volume24h: '$3.2B', change24h: -1.2, lastUpdate: '8s ago', spread: 0.12, orderBookDepth: '$340K' },
      { exchange: 'Huobi', price: 177.5, volume24h: '$2.8B', change24h: -0.8, lastUpdate: '9s ago', spread: 0.10, orderBookDepth: '$290K' },
      { exchange: 'Bybit', price: 176.8, volume24h: '$3.5B', change24h: -1.0, lastUpdate: '7s ago', spread: 0.11, orderBookDepth: '$310K' }
    ]
  };

  const selectedRates = exchangeRates[selectedCoin] || [];
  const maxPrice = Math.max(...selectedRates.map(r => r.price));
  const minPrice = Math.min(...selectedRates.map(r => r.price));

  return (
    <div className="xl:col-span-1">
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          📊 Exchange Rates
        </h2>
        <div className="flex flex-wrap gap-2">
          {['BTC', 'ETH', 'SOL'].map((coin) => (
            <button
              key={coin}
              onClick={() => setSelectedCoin(coin)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                selectedCoin === coin
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {coin}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedCoin} Exchange Prices
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-50/90'}`}>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
                <th className={`px-3 py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Exchange
                </th>
                <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Price
                </th>
                <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  24h Change
                </th>
                <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Volume
                </th>
                <th className={`px-3 py-2 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Spread
                </th>
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
              {selectedRates.map((rate, index) => (
                <tr key={index} className={`hover:bg-gray-500/5 transition-colors ${isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'}`}>
                  <td className="px-3 py-3">
                    <div className="flex items-center space-x-2">
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {rate.exchange}
                      </div>
                      <div className="flex items-center space-x-1">
                        {rate.price === maxPrice && (
                          <span className="text-xs text-red-500 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">HIGH</span>
                        )}
                        {rate.price === minPrice && (
                          <span className="text-xs text-green-500 font-medium bg-green-500/10 px-1.5 py-0.5 rounded">LOW</span>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-3 py-3 text-right">
                    <div className={`text-sm font-bold ${
                      rate.price === maxPrice ? 'text-red-500' : 
                      rate.price === minPrice ? 'text-green-500' : 
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${rate.price.toLocaleString()}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Depth: {rate.orderBookDepth}
                    </div>
                  </td>
                  
                  <td className="px-3 py-3 text-right">
                    <div className={`text-sm font-medium ${rate.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
                    </div>
                  </td>
                  
                  <td className="px-3 py-3 text-right">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {rate.volume24h}
                    </div>
                  </td>
                  
                  <td className="px-3 py-3 text-right">
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {rate.spread}%
                    </div>
                  </td>
                  
                  <td className="px-3 py-3 text-center">
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {rate.lastUpdate}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRatesTable;