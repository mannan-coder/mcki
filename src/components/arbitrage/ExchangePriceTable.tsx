import { CoinPriceData } from '@/types/coinData';
import ExchangeTableHeader from './ExchangeTableHeader';
import CoinPriceRow from './CoinPriceRow';

interface ExchangePriceTableProps {
  coinData: CoinPriceData[];
  isDarkMode: boolean;
}

const ExchangePriceTable = ({ coinData, isDarkMode }: ExchangePriceTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <ExchangeTableHeader isDarkMode={isDarkMode} />
        <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
          {coinData.map((coin, index) => (
            <CoinPriceRow
              key={index}
              coin={coin}
              isDarkMode={isDarkMode}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangePriceTable;