import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, BarChart3, Eye, Star, Clock } from 'lucide-react';
import { useCoinDetails } from '@/hooks/useCoinDetails';
import { usePriceHistory } from '@/hooks/usePriceHistory';
import { TradingViewChart } from '@/components/coin-detail/TradingViewChart';

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`w-full max-w-7xl h-[95vh] rounded-xl border backdrop-blur-sm flex flex-col ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700/50' 
          : 'bg-white/95 border-gray-200/50'
      }`}>
        {/* Header */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {coinDetails?.image && (
                <img 
                  src={coinDetails.image} 
                  alt={coinDetails.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
              )}
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {coinDetails?.name || 'Loading...'}
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {coinDetails?.symbol} • Rank #{coinDetails?.marketCapRank}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-opacity-50 transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {detailsLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="text-lg">Loading coin details...</span>
              </div>
            </div>
          ) : coinDetails ? (
            <div className="flex-1 overflow-auto">
              {/* Chart Section - Full Width */}
              <div className="h-[60vh] min-h-[400px] p-4 sm:p-6">
                <TradingViewChart 
                  coin={{
                    id: coinDetails.id || '',
                    name: coinDetails.name || '',
                    symbol: coinDetails.symbol || '',
                    currentPrice: coinDetails.currentPrice || 0,
                    priceChangePercentage24h: coinDetails.priceChangePercentage24h || 0,
                    ath: coinDetails.ath,
                    atl: coinDetails.atl
                  }}
                  loading={false}
                />
              </div>

              {/* Info Grid - Scrollable */}
              <div className="p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Price Information */}
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Price Information
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Price</span>
                        <span className="text-xl sm:text-2xl font-bold text-primary">
                          {formatPrice(coinDetails.currentPrice)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>24h Change</span>
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
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>7d Change</span>
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
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>All Time High</span>
                        <div className="text-right">
                          <div className="font-semibold">{formatPrice(coinDetails.ath)}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(coinDetails.athDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>All Time Low</span>
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
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market Cap</span>
                        <span className="font-semibold">
                          {formatMarketCap(coinDetails.marketCap)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>24h Volume</span>
                        <span className="font-semibold">
                          {formatMarketCap(coinDetails.totalVolume)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Circulating Supply</span>
                        <span className="font-semibold text-sm">
                          {coinDetails.circulatingSupply.toLocaleString()}
                        </span>
                      </div>

                      {coinDetails.totalSupply && (
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Supply</span>
                          <span className="font-semibold text-sm">
                            {coinDetails.totalSupply.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {coinDetails.maxSupply && (
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max Supply</span>
                          <span className="font-semibold text-sm">
                            {coinDetails.maxSupply.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {coinDetails.description && (
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      About {coinDetails.name}
                    </h3>
                    <div 
                      className={`text-sm leading-relaxed max-h-32 overflow-y-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: coinDetails.description.slice(0, 800) + '...' 
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-500 text-lg">Failed to load coin details</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 text-primary hover:underline"
                >
                  Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinDetailModal;