
import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, BarChart, ArrowRightLeft } from 'lucide-react';

interface CalculatorsSectionProps {
  isDarkMode: boolean;
}

const CalculatorsSection = ({ isDarkMode }: CalculatorsSectionProps) => {
  const [activeCalculator, setActiveCalculator] = useState('arbitrage');
  const [arbitrageInputs, setArbitrageInputs] = useState({
    buyPrice: '',
    sellPrice: '',
    amount: '',
    buyFee: '0.1',
    sellFee: '0.1'
  });

  const calculators = [
    { id: 'arbitrage', name: 'Arbitrage Profit', icon: TrendingUp },
    { id: 'roi', name: 'ROI Calculator', icon: Percent },
    { id: 'fees', name: 'Trading Fees', icon: DollarSign },
    { id: 'breakeven', name: 'Break-Even', icon: BarChart },
    { id: 'converter', name: 'Crypto Converter', icon: ArrowRightLeft },
  ];

  const calculateArbitrageProfit = () => {
    const buyPrice = parseFloat(arbitrageInputs.buyPrice) || 0;
    const sellPrice = parseFloat(arbitrageInputs.sellPrice) || 0;
    const amount = parseFloat(arbitrageInputs.amount) || 0;
    const buyFee = parseFloat(arbitrageInputs.buyFee) / 100;
    const sellFee = parseFloat(arbitrageInputs.sellFee) / 100;

    const buyTotal = buyPrice * amount * (1 + buyFee);
    const sellTotal = sellPrice * amount * (1 - sellFee);
    const profit = sellTotal - buyTotal;
    const profitPercentage = buyTotal > 0 ? (profit / buyTotal) * 100 : 0;

    return { profit, profitPercentage };
  };

  const { profit, profitPercentage } = calculateArbitrageProfit();

  return (
    <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Finance Calculators Suite
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Professional trading and investment calculation tools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calculator Navigation */}
        <div className="lg:col-span-1">
          <div className={`p-4 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} size={20} />
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Calculators
              </h3>
            </div>
            <div className="space-y-2">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    activeCalculator === calc.id
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700/50'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <calc.icon size={16} />
                  <span className="text-sm font-medium">{calc.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculator Content */}
        <div className="lg:col-span-3">
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            {activeCalculator === 'arbitrage' && (
              <div>
                <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Arbitrage Profit Calculator
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Buy Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter buy price"
                        value={arbitrageInputs.buyPrice}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, buyPrice: e.target.value})}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Sell Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter sell price"
                        value={arbitrageInputs.sellPrice}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, sellPrice: e.target.value})}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={arbitrageInputs.amount}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, amount: e.target.value})}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Buy Fee (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={arbitrageInputs.buyFee}
                          onChange={(e) => setArbitrageInputs({...arbitrageInputs, buyFee: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Sell Fee (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={arbitrageInputs.sellFee}
                          onChange={(e) => setArbitrageInputs({...arbitrageInputs, sellFee: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Results
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Gross Profit:
                        </span>
                        <span className={`font-semibold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${profit.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Profit Margin:
                        </span>
                        <span className={`font-semibold ${profitPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {profitPercentage.toFixed(2)}%
                        </span>
                      </div>

                      <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {profit >= 0 
                            ? '✅ Profitable arbitrage opportunity' 
                            : '❌ Not profitable after fees'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCalculator !== 'arbitrage' && (
              <div className="text-center py-12">
                <div className={`text-6xl mb-4`}>🚧</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Coming Soon
                </h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  This calculator is under development and will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsSection;
