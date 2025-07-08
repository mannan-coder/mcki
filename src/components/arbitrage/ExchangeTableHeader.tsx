interface ExchangeTableHeaderProps {
  isDarkMode: boolean;
}

const ExchangeTableHeader = ({ isDarkMode }: ExchangeTableHeaderProps) => {
  const exchanges = [
    { name: 'Binance', emoji: '🟡', color: 'text-yellow-500' },
    { name: 'Coinbase', emoji: '🔵', color: 'text-blue-500' },
    { name: 'KuCoin', emoji: '🟢', color: 'text-green-500' },
    { name: 'OKX', emoji: '⚫', color: 'text-gray-500' },
    { name: 'Kraken', emoji: '🟣', color: 'text-purple-500' },
    { name: 'Bybit', emoji: '🟠', color: 'text-orange-500' },
    { name: 'Gate.io', emoji: '🔴', color: 'text-red-500' }
  ];

  return (
    <thead className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-50/90'}`}>
      <tr className={`border-b ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}>
        <th className={`px-3 py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <div className="flex items-center space-x-1">
            <span>🪙</span>
            <span>Coin</span>
          </div>
        </th>
        {exchanges.map((exchange) => (
          <th key={exchange.name} className={`px-2 py-2 text-center text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="flex flex-col items-center">
              <span className={`${exchange.color} text-sm`}>{exchange.emoji}</span>
              <span>{exchange.name}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ExchangeTableHeader;