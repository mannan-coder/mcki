import { useOptimizedCryptoData } from '@/hooks/useOptimizedCryptoData';
import { getCoinLogoById } from '@/utils/coinLogos';

export const useLivePricesData = () => {
  const { data: cryptoData, isLoading, refetch } = useOptimizedCryptoData();

  const generateExchangePrices = () => {
    if (!cryptoData?.coins) return [];
    
    const exchanges = ['Binance', 'Coinbase', 'Kraken', 'OKX', 'Bybit', 'Gate.io'];
    
    return cryptoData.coins.slice(0, 12).map(coin => {
      const prices = exchanges.map(exchange => {
        const variation = (Math.random() - 0.5) * 0.03; // ±1.5% variation
        const price = coin.price * (1 + variation);
        return {
          exchange,
          price,
          volume: Math.random() * 10000000,
          change24h: coin.change24h + (Math.random() - 0.5) * 5,
          spread: Math.abs(variation) * 100
        };
      });
      
      const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
      const maxSpread = Math.max(...prices.map(p => p.spread));
      
      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        prices,
        avgPrice,
        maxSpread,
        marketCap: coin.marketCap,
        volume24h: coin.volume,
        change24h: coin.change24h
      };
    });
  };

  const getTopGainers = () => {
    if (!cryptoData?.coins) return [];
    return cryptoData.coins
      .filter(coin => coin.change24h > 0)
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 6);
  };

  const getTopLosers = () => {
    if (!cryptoData?.coins) return [];
    return cryptoData.coins
      .filter(coin => coin.change24h < 0)
      .sort((a, b) => a.change24h - b.change24h)
      .slice(0, 6);
  };

  const getTopVolume = () => {
    if (!cryptoData?.coins) return [];
    return cryptoData.coins
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 6);
  };

  const coinPricesData = generateExchangePrices();
  const topGainers = getTopGainers();
  const topLosers = getTopLosers();
  const topVolume = getTopVolume();

  return {
    coinPricesData,
    topGainers,
    topLosers,
    topVolume,
    isLoading,
    refetch,
    cryptoData
  };
};