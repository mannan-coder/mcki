
import { TrendingUp, ExternalLink, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface ArbitrageDashboardProps {
  isDarkMode: boolean;
}

const ArbitrageDashboard = ({ isDarkMode }: ArbitrageDashboardProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [executingTrades, setExecutingTrades] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const arbitrageOpportunities = [
    {
      symbol: 'BTC',
      buyExchange: 'KuCoin',
      sellExchange: 'Binance',
      buyPrice: 67150,
      sellPrice: 67890,
      spread: 1.1,
      profit: '$740',
      volume: '2.5M',
      confidence: 95,
      timeToExecute: '3-5 min',
      risk: 'Low',
      fees: '$12.50',
      netProfit: '$727.50',
      liquidityDepth: '$847K',
      lastUpdated: '2s ago'
    },
    {
      symbol: 'ETH',
      buyExchange: 'Coinbase',
      sellExchange: 'OKX',
      buyPrice: 3820,
      sellPrice: 3865,
      spread: 1.18,
      profit: '$45',
      volume: '8.2M',
      confidence: 92,
      timeToExecute: '2-4 min',
      risk: 'Low',
      fees: '$3.80',
      netProfit: '$41.20',
      liquidityDepth: '$1.2M',
      lastUpdated: '5s ago'
    },
    {
      symbol: 'SOL',
      buyExchange: 'Kraken',
      sellExchange: 'Binance',
      buyPrice: 176.2,
      sellPrice: 178.9,
      spread: 1.53,
      profit: '$2.70',
      volume: '1.8M',
      confidence: 88,
      timeToExecute: '4-6 min',
      risk: 'Medium',
      fees: '$0.45',
      netProfit: '$2.25',
      liquidityDepth: '$234K',
      lastUpdated: '8s ago'
    },
    {
      symbol: 'ADA',
      buyExchange: 'Binance',
      sellExchange: 'KuCoin',
      buyPrice: 0.648,
      sellPrice: 0.657,
      spread: 1.39,
      profit: '$0.009',
      volume: '5.1M',
      confidence: 85,
      timeToExecute: '5-8 min',
      risk: 'Medium',
      fees: '$0.002',
      netProfit: '$0.007',
      liquidityDepth: '$89K',
      lastUpdated: '12s ago'
    },
    {
      symbol: 'MATIC',
      buyExchange: 'OKX',
      sellExchange: 'Coinbase',
      buyPrice: 0.865,
      sellPrice: 0.882,
      spread: 1.96,
      profit: '$0.017',
      volume: '3.4M',
      confidence: 90,
      timeToExecute: '3-7 min',
      risk: 'Low',
      fees: '$0.003',
      netProfit: '$0.014',
      liquidityDepth: '$156K',
      lastUpdated: '6s ago'
    },
    {
      symbol: 'DOT',
      buyExchange: 'Bitget',
      sellExchange: 'Kraken',
      buyPrice: 8.42,
      sellPrice: 8.58,
      spread: 1.90,
      profit: '$0.16',
      volume: '1.2M',
      confidence: 87,
      timeToExecute: '4-6 min',
      risk: 'Medium',
      fees: '$0.025',
      netProfit: '$0.135',
      liquidityDepth: '$78K',
      lastUpdated: '15s ago'
    },
    {
      symbol: 'AVAX',
      buyExchange: 'Gate.io',
      sellExchange: 'Binance',
      buyPrice: 45.67,
      sellPrice: 46.42,
      spread: 1.64,
      profit: '$0.75',
      volume: '892K',
      confidence: 83,
      timeToExecute: '6-9 min',
      risk: 'High',
      fees: '$0.18',
      netProfit: '$0.57',
      liquidityDepth: '$45K',
      lastUpdated: '23s ago'
    },
    {
      symbol: 'LINK',
      buyExchange: 'Huobi',
      sellExchange: 'OKX',
      buyPrice: 18.34,
      sellPrice: 18.65,
      spread: 1.69,
      profit: '$0.31',
      volume: '2.1M',
      confidence: 91,
      timeToExecute: '2-5 min',
      risk: 'Low',
      fees: '$0.065',
      netProfit: '$0.245',
      liquidityDepth: '$167K',
      lastUpdated: '4s ago'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleExecuteTrade = async (index: number, opportunity: any) => {
    if (executingTrades.has(index)) return;

    const newExecutingTrades = new Set(executingTrades);
    newExecutingTrades.add(index);
    setExecutingTrades(newExecutingTrades);

    toast({
      title: "Executing Trade",
      description: `Initiating ${opportunity.symbol} arbitrage between ${opportunity.buyExchange} and ${opportunity.sellExchange}...`,
    });

    try {
      // Simulate trade execution time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate success/failure based on confidence and risk
      const successRate = opportunity.confidence * (opportunity.risk === 'Low' ? 1.1 : opportunity.risk === 'Medium' ? 0.9 : 0.7);
      const isSuccess = Math.random() * 100 < successRate;

      if (isSuccess) {
        toast({
          title: "Trade Executed Successfully! 🎉",
          description: `${opportunity.symbol} arbitrage completed. Estimated profit: ${opportunity.netProfit}`,
        });
      } else {
        toast({
          title: "Trade Execution Failed",
          description: `${opportunity.symbol} arbitrage failed due to market conditions. No funds lost.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Execution Error",
        description: "Failed to execute trade. Please try again.",
        variant: "destructive",
      });
    } finally {
      const updatedExecutingTrades = new Set(executingTrades);
      updatedExecutingTrades.delete(index);
      setExecutingTrades(updatedExecutingTrades);
    }
  };

  return (
    <section id="arbitrage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Arbitrage Opportunities
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time profit opportunities across top exchanges
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/60' 
          : 'bg-white/90 border-gray-200/60'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700/60 bg-gray-800/90' : 'border-gray-200/60 bg-gray-50/80'}`}>
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold items-center">
            <div className={`col-span-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Asset Info</div>
            <div className={`col-span-2 hidden md:block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Buy Exchange</div>
            <div className={`col-span-2 hidden md:block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sell Exchange</div>
            <div className={`col-span-2 hidden lg:block text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price Range</div>
            <div className={`col-span-1 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Spread</div>
            <div className={`col-span-2 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Profit & Action</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className={`divide-y ${isDarkMode ? 'divide-gray-700/40' : 'divide-gray-200/40'}`}>
          {arbitrageOpportunities.map((opportunity, index) => (
            <div key={index} className={`px-6 py-5 hover:bg-gray-500/5 transition-colors cursor-pointer`}>
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Asset - col-span-3 */}
                <div className="col-span-3 flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {opportunity.symbol.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {opportunity.symbol}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                      Vol: {opportunity.volume} • {opportunity.lastUpdated}
                    </div>
                    <div className={`flex items-center space-x-2 mt-1`}>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        opportunity.risk === 'Low' ? (isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700') :
                        opportunity.risk === 'Medium' ? (isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-700') :
                        (isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-700')
                      }`}>
                        {opportunity.risk}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {opportunity.confidence}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buy Exchange - col-span-2 */}
                <div className="col-span-2 hidden md:block">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {opportunity.buyExchange}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Liquidity: {opportunity.liquidityDepth}
                  </div>
                </div>

                {/* Sell Exchange - col-span-2 */}
                <div className="col-span-2 hidden md:block">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {opportunity.sellExchange}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Time: {opportunity.timeToExecute}
                  </div>
                </div>

                {/* Prices - col-span-2 */}
                <div className="col-span-2 hidden lg:block">
                  <div className="text-center space-y-1">
                    <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Buy Price
                    </div>
                    <div className={`font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      ${opportunity.buyPrice.toLocaleString()}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                      Sell Price
                    </div>
                    <div className={`font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      ${opportunity.sellPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Spread - col-span-1 */}
                <div className="col-span-1">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex items-center space-x-1 justify-center">
                        <TrendingUp size={14} className="text-green-500" />
                        <span className="text-green-500 font-semibold text-sm">
                          {opportunity.spread}%
                        </span>
                      </div>
                      <div className="lg:hidden text-xs text-gray-500 mt-1 truncate">
                        {opportunity.buyExchange} → {opportunity.sellExchange}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profit - col-span-2 */}
                <div className="col-span-2">
                  <div className="text-right">
                    <div className={`font-bold text-green-500 text-lg mb-1`}>
                      {opportunity.profit}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      Net: <span className="font-medium">{opportunity.netProfit}</span>
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mb-2`}>
                      Fees: {opportunity.fees}
                    </div>
                    <button 
                      onClick={() => handleExecuteTrade(index, opportunity)}
                      disabled={executingTrades.has(index)}
                      className={`inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded transition-all duration-200 ${
                        executingTrades.has(index)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : isDarkMode
                            ? 'text-blue-400 hover:text-blue-300 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50'
                            : 'text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      <span>{executingTrades.has(index) ? 'Executing...' : 'Execute'}</span>
                      <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Active Opportunities
          </h3>
          <div className="text-3xl font-bold text-green-500 mb-2">24</div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Profitable trades available
          </p>
          <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>High Risk:</span>
              <span className="text-red-500 font-medium">3</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Medium Risk:</span>
              <span className="text-yellow-500 font-medium">8</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Low Risk:</span>
              <span className="text-green-500 font-medium">13</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Avg. Spread
          </h3>
          <div className="text-3xl font-bold text-blue-500 mb-2">1.42%</div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Across all exchanges
          </p>
          <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Highest:</span>
              <span className="text-green-500 font-medium">1.96%</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Lowest:</span>
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>1.10%</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Last 24h Avg:</span>
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>1.38%</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/60' 
            : 'bg-white/90 border-gray-200/60'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Total Volume
          </h3>
          <div className="text-3xl font-bold text-purple-500 mb-2">$2.1B</div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            24h arbitrage volume
          </p>
          <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>BTC Volume:</span>
              <span className="text-orange-500 font-medium">$847M</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>ETH Volume:</span>
              <span className="text-blue-500 font-medium">$692M</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Others:</span>
              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>$561M</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArbitrageDashboard;
