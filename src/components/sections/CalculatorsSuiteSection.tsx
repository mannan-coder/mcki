import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, BarChart, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { motion } from 'framer-motion';

interface CalculatorsSuiteSectionProps {
  loading?: boolean;
}

export const CalculatorsSuiteSection = ({ loading = false }: CalculatorsSuiteSectionProps) => {
  const [activeCalculator, setActiveCalculator] = useState('arbitrage');
  const [arbitrageInputs, setArbitrageInputs] = useState({
    buyPrice: '',
    sellPrice: '',
    amount: '',
    buyFee: '0.1',
    sellFee: '0.1'
  });

  const calculators = [
    { id: 'arbitrage', name: 'Arbitrage Profit', icon: TrendingUp, description: 'Calculate profit potential between exchanges' },
    { id: 'roi', name: 'ROI Calculator', icon: Percent, description: 'Return on investment analysis' },
    { id: 'fees', name: 'Trading Fees', icon: DollarSign, description: 'Compare trading costs across platforms' },
    { id: 'breakeven', name: 'Break-Even', icon: BarChart, description: 'Find break-even price points' },
    { id: 'converter', name: 'Crypto Converter', icon: ArrowRightLeft, description: 'Real-time currency conversion' },
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

    return { profit, profitPercentage, buyTotal, sellTotal };
  };

  const { profit, profitPercentage, buyTotal, sellTotal } = calculateArbitrageProfit();

  if (loading) {
    return (
      <DataSection
        title="Finance Calculators Suite"
        subtitle="Professional trading and investment calculation tools"
        icon={<Calculator className="h-6 w-6 text-primary" />}
        headerActions={
          <Link 
            to="/tools"
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
          >
            More Tools
          </Link>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ResponsiveCard>
            <div className="space-y-3">
              <div className="h-6 bg-muted rounded animate-pulse"></div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-muted/60 rounded animate-pulse"></div>
              ))}
            </div>
          </ResponsiveCard>
          
          <div className="lg:col-span-3">
            <ResponsiveCard>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                        <div className="h-10 bg-muted/60 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-48 bg-muted/30 rounded animate-pulse"></div>
                </div>
              </div>
            </ResponsiveCard>
          </div>
        </div>
      </DataSection>
    );
  }

  return (
    <DataSection
      title="Finance Calculators Suite"
      subtitle="Professional trading and investment calculation tools"
      icon={<Calculator className="h-6 w-6 text-primary" />}
      headerActions={
        <Link 
          to="/tools"
          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
        >
          More Tools
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calculator Navigation */}
        <ResponsiveCard>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Calculators</h3>
            </div>
            
            <div className="space-y-2">
              {calculators.map((calc, index) => (
                <motion.button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 text-left ${
                    activeCalculator === calc.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50 text-foreground'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <calc.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{calc.name}</div>
                    <div className={`text-xs mt-1 ${
                      activeCalculator === calc.id 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {calc.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Calculator Content */}
        <div className="lg:col-span-3">
          <ResponsiveCard>
            {activeCalculator === 'arbitrage' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Arbitrage Profit Calculator</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Buy Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter buy price"
                        value={arbitrageInputs.buyPrice}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, buyPrice: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Sell Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter sell price"
                        value={arbitrageInputs.sellPrice}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, sellPrice: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={arbitrageInputs.amount}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, amount: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Buy Fee (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={arbitrageInputs.buyFee}
                          onChange={(e) => setArbitrageInputs({...arbitrageInputs, buyFee: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Sell Fee (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={arbitrageInputs.sellFee}
                          onChange={(e) => setArbitrageInputs({...arbitrageInputs, sellFee: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-muted/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Results</h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Buy Total (with fees):</span>
                          <span className="font-semibold text-foreground">${buyTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Sell Total (after fees):</span>
                          <span className="font-semibold text-foreground">${sellTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-foreground font-medium">Net Profit:</span>
                            <span className={`font-bold text-lg ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                              ${profit.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-foreground font-medium">Profit Margin:</span>
                            <span className={`font-bold ${profitPercentage >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {profitPercentage.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg ${
                        profit >= 0 ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'
                      }`}>
                        <div className={`text-sm font-medium ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {profit >= 0 ? '✅ Profitable Opportunity' : '❌ Not Profitable'}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {profit >= 0 
                            ? 'This arbitrage opportunity shows positive returns after fees' 
                            : 'Current prices and fees result in a loss'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeCalculator !== 'arbitrage' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  The {calculators.find(c => c.id === activeCalculator)?.name} is under development and will be available soon.
                </p>
              </motion.div>
            )}
          </ResponsiveCard>
        </div>
      </div>
    </DataSection>
  );
};