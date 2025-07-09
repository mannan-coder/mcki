import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, BarChart3, Eye, Star, Clock } from 'lucide-react';
import { useCoinDetails } from '@/hooks/useCoinDetails';
import { usePriceHistory } from '@/hooks/usePriceHistory';

interface CoinDetailModalProps {
  coinId: string;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const CoinDetailModal: React.FC<CoinDetailModalProps> = ({ 
  coinId, 
  isOpen, 
  onClose, 
  isDarkMode 
}) => {
  const { data: coinDetails, loading: detailsLoading } = useCoinDetails(coinId);
  const { data: priceHistory, loading: historyLoading } = usePriceHistory(coinId, '7d');

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700/50' 
          : 'bg-white/95 border-gray-200/50'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {coinDetails?.image && (
                <img 
                  src={coinDetails.image} 
                  alt={coinDetails.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {coinDetails?.name || 'Loading...'}
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {coinDetails?.symbol} • Rank #{coinDetails?.marketCapRank}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-opacity-50 ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {detailsLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3">Loading coin details...</span>
            </div>
          ) : coinDetails ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Information */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Price Information
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Price</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(coinDetails.currentPrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>24h Change</span>
                    <div className={`flex items-center space-x-1 ${
                      coinDetails.priceChangePercentage24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {coinDetails.priceChangePercentage24h >= 0 ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )}
                      <span className="font-semibold">
                        {Math.abs(coinDetails.priceChangePercentage24h).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>7d Change</span>
                    <div className={`flex items-center space-x-1 ${
                      coinDetails.priceChangePercentage7d >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {coinDetails.priceChangePercentage7d >= 0 ? (
                        <TrendingUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )}
                      <span className="font-semibold">
                        {Math.abs(coinDetails.priceChangePercentage7d).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>All Time High</span>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(coinDetails.ath)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(coinDetails.athDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>All Time Low</span>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(coinDetails.atl)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(coinDetails.atlDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Data */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Market Data
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market Cap</span>
                    <span className="font-semibold">
                      {formatMarketCap(coinDetails.marketCap)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>24h Volume</span>
                    <span className="font-semibold">
                      {formatMarketCap(coinDetails.totalVolume)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Circulating Supply</span>
                    <span className="font-semibold">
                      {coinDetails.circulatingSupply.toLocaleString()}
                    </span>
                  </div>

                  {coinDetails.totalSupply && (
                    <div className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Supply</span>
                      <span className="font-semibold">
                        {coinDetails.totalSupply.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {coinDetails.maxSupply && (
                    <div className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max Supply</span>
                      <span className="font-semibold">
                        {coinDetails.maxSupply.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {coinDetails.description && (
                <div className="lg:col-span-2">
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      About {coinDetails.name}
                    </h3>
                    <div 
                      className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: coinDetails.description.slice(0, 500) + '...' 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load coin details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinDetailModal;