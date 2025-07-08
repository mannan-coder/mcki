import { formatPrice, formatVolumeDisplay } from '@/utils/arbitrageUtils';

interface PriceCellProps {
  price: number;
  volume: string;
  isHighest: boolean;
  isLowest: boolean;
  isDarkMode: boolean;
}

const PriceCell = ({ price, volume, isHighest, isLowest, isDarkMode }: PriceCellProps) => {
  const getPriceColor = () => {
    if (isHighest) return 'text-green-500';
    if (isLowest) return 'text-red-500';
    return isDarkMode ? 'text-blue-400' : 'text-blue-600';
  };

  return (
    <td className="px-2 py-3 text-center">
      <div className="space-y-1">
        <div className={`text-sm font-bold transition-colors ${getPriceColor()}`}>
          {formatPrice(price)}
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {formatVolumeDisplay(volume)}
        </div>
        <div className="h-4 flex items-center justify-center">
          {isHighest && (
            <span className="text-xs text-green-500 bg-green-500/10 px-1 py-0.5 rounded-full font-bold border border-green-500/20">
              HIGH
            </span>
          )}
          {isLowest && (
            <span className="text-xs text-red-500 bg-red-500/10 px-1 py-0.5 rounded-full font-bold border border-red-500/20">
              LOW
            </span>
          )}
        </div>
      </div>
    </td>
  );
};

export default PriceCell;