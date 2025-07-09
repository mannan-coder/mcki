import React from 'react';
import { useCoinDetails } from '@/hooks/useCoinDetails';
import { usePriceHistory } from '@/hooks/usePriceHistory';
import { TradingViewChart } from '@/components/coin-detail/TradingViewChart';
import { CoinDetailModalHeader } from '@/components/coin-detail/CoinDetailModalHeader';
import { CoinDetailPriceInfo } from '@/components/coin-detail/CoinDetailPriceInfo';
import { CoinDetailMarketData } from '@/components/coin-detail/CoinDetailMarketData';
import { CoinDetailDescription } from '@/components/coin-detail/CoinDetailDescription';

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-2 sm:p-4">
      <div className={`w-full max-w-5xl h-[95vh] rounded-xl border backdrop-blur-sm flex flex-col ${
        isDarkMode 
          ? 'bg-card/95 border-border/50' 
          : 'bg-card/95 border-border/50'
      }`}>
        <CoinDetailModalHeader 
          coinDetails={coinDetails} 
          onClose={onClose} 
        />

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
                  <CoinDetailPriceInfo 
                    coinDetails={coinDetails} 
                    formatPrice={formatPrice} 
                  />

                  <CoinDetailMarketData 
                    coinDetails={coinDetails} 
                    formatMarketCap={formatMarketCap} 
                  />
                </div>

                <CoinDetailDescription coinDetails={coinDetails} />
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