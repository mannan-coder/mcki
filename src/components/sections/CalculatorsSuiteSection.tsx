import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, BarChart, ArrowRightLeft, PieChart, Target, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveCard } from '@/components/common/ResponsiveCard';
import { DataSection } from '@/components/common/DataSection';
import { motion } from 'framer-motion';

interface CalculatorsSuiteSectionProps {
  loading?: boolean;
}

export const CalculatorsSuiteSection = ({ loading = false }: CalculatorsSuiteSectionProps) => {
  const [activeCalculator, setActiveCalculator] = useState('arbitrage');
  
  // All calculator states
  const [arbitrageInputs, setArbitrageInputs] = useState({
    buyPrice: '',
    sellPrice: '',
    amount: '',
    buyFee: '0.1',
    sellFee: '0.1'
  });
  
  const [roiInputs, setRoiInputs] = useState({
    investmentAmount: '',
    roi: '',
    timePeriod: ''
  });
  
  const [riskInputs, setRiskInputs] = useState({
    entryPrice: '',
    stopLoss: '',
    takeProfit: '',
    positionSize: ''
  });
  
  const [stakingInputs, setStakingInputs] = useState({
    stakingAmount: '',
    stakingAPY: '',
    stakingPeriod: ''
  });

  const calculators = [
    { id: 'arbitrage', name: 'Arbitrage Profit', icon: TrendingUp, description: 'Calculate profit potential between exchanges' },
    { id: 'roi', name: 'ROI Calculator', icon: Percent, description: 'Return on investment analysis' },
    { id: 'risk', name: 'Risk Assessment', icon: Target, description: 'Risk-to-reward ratio calculator' },
    { id: 'staking', name: 'Staking Rewards', icon: Database, description: 'Calculate staking yields and APY' },
    { id: 'fees', name: 'Trading Fees', icon: DollarSign, description: 'Compare trading costs across platforms' },
  ];

  // Optimized calculation functions with memoization
  const arbitrageResults = useMemo(() => {
    const buyPrice = parseFloat(arbitrageInputs.buyPrice) || 0;
    const sellPrice = parseFloat(arbitrageInputs.sellPrice) || 0;
    const amount = parseFloat(arbitrageInputs.amount) || 0;
    const buyFee = parseFloat(arbitrageInputs.buyFee) / 100;
    const sellFee = parseFloat(arbitrageInputs.sellFee) / 100;

    if (buyPrice <= 0 || sellPrice <= 0 || amount <= 0) {
      return { profit: 0, profitPercentage: 0, buyTotal: 0, sellTotal: 0 };
    }

    const buyTotal = buyPrice * amount * (1 + buyFee);
    const sellTotal = sellPrice * amount * (1 - sellFee);
    const profit = sellTotal - buyTotal;
    const profitPercentage = buyTotal > 0 ? (profit / buyTotal) * 100 : 0;

    return { profit, profitPercentage, buyTotal, sellTotal };
  }, [arbitrageInputs]);

  const roiResults = useMemo(() => {
    const amount = parseFloat(roiInputs.investmentAmount) || 0;
    const roiPercent = parseFloat(roiInputs.roi) || 0;
    const months = parseFloat(roiInputs.timePeriod) || 0;
    
    if (amount <= 0 || roiPercent <= 0 || months <= 0) {
      return { futureValue: 0, profit: 0, monthlyGain: 0, annualizedReturn: 0 };
    }
    
    const annualRate = roiPercent / 100;
    const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
    const futureValue = amount * Math.pow(1 + monthlyRate, months);
    const profit = futureValue - amount;
    const monthlyGain = profit / months;
    const annualizedReturn = ((futureValue / amount) ** (12 / months) - 1) * 100;
    
    return { futureValue, profit, monthlyGain, annualizedReturn };
  }, [roiInputs]);

  const riskResults = useMemo(() => {
    const entry = parseFloat(riskInputs.entryPrice) || 0;
    const stop = parseFloat(riskInputs.stopLoss) || 0;
    const target = parseFloat(riskInputs.takeProfit) || 0;
    const size = parseFloat(riskInputs.positionSize) || 0;
    
    if (entry <= 0 || stop <= 0 || target <= 0 || size <= 0) {
      return { riskRewardRatio: 0, riskAmount: 0, rewardAmount: 0, riskPercent: 0 };
    }
    
    const risk = entry - stop;
    const reward = target - entry;
    const riskRewardRatio = reward / risk;
    const riskAmount = (size / entry) * risk;
    const rewardAmount = (size / entry) * reward;
    const riskPercent = (risk / entry) * 100;
    
    return { riskRewardRatio, riskAmount, rewardAmount, riskPercent };
  }, [riskInputs]);

  const stakingResults = useMemo(() => {
    const amount = parseFloat(stakingInputs.stakingAmount) || 0;
    const apy = parseFloat(stakingInputs.stakingAPY) / 100 || 0;
    const months = parseFloat(stakingInputs.stakingPeriod) || 0;
    
    if (amount <= 0 || apy <= 0 || months <= 0) {
      return { finalAmount: 0, totalRewards: 0, monthlyRewards: 0 };
    }
    
    const monthlyRate = apy / 12;
    const finalAmount = amount * Math.pow(1 + monthlyRate, months);
    const rewards = finalAmount - amount;
    const monthlyRewards = rewards / months;
    
    return { finalAmount, totalRewards: rewards, monthlyRewards };
  }, [stakingInputs]);

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
      subtitle="Professional trading and investment calculation tools with real-time results"
      icon={<Calculator className="h-6 w-6 text-primary" />}
      headerActions={
        <Link 
          to="/tools"
          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
        >
          All Tools & Calculators
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calculator Navigation */}
        <ResponsiveCard>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Active Tools</h3>
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

            {/* Quick Stats */}
            <div className="pt-4 border-t border-border/30">
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Available Tools:</span>
                  <span className="font-semibold text-primary">{calculators.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total on Tools page:</span>
                  <span className="font-semibold text-primary">8+</span>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Calculator Content */}
        <div className="lg:col-span-3">
          <ResponsiveCard>
            {/* Arbitrage Calculator */}
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
                      <label className="block text-sm font-medium text-foreground">Buy Price ($)</label>
                      <input
                        type="number"
                        placeholder="Enter buy price"
                        value={arbitrageInputs.buyPrice}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, buyPrice: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Sell Price ($)</label>
                      <input
                        type="number"
                        placeholder="Enter sell price"
                        value={arbitrageInputs.sellPrice}
                        onChange={(e) => setArbitrageInputs({...arbitrageInputs, sellPrice: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Amount</label>
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
                        <label className="block text-sm font-medium text-foreground">Buy Fee (%)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={arbitrageInputs.buyFee}
                          onChange={(e) => setArbitrageInputs({...arbitrageInputs, buyFee: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">Sell Fee (%)</label>
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
                    <h4 className="text-lg font-semibold text-foreground mb-4">Live Results</h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Buy Total (with fees):</span>
                          <span className="font-semibold text-foreground">${arbitrageResults.buyTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Sell Total (after fees):</span>
                          <span className="font-semibold text-foreground">${arbitrageResults.sellTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-foreground font-medium">Net Profit:</span>
                            <span className={`font-bold text-lg ${arbitrageResults.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                              ${arbitrageResults.profit.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-foreground font-medium">Profit Margin:</span>
                            <span className={`font-bold ${arbitrageResults.profitPercentage >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {arbitrageResults.profitPercentage.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg ${
                        arbitrageResults.profit >= 0 ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'
                      }`}>
                        <div className={`text-sm font-medium ${arbitrageResults.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {arbitrageResults.profit >= 0 ? '✅ Profitable Opportunity' : '❌ Not Profitable'}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {arbitrageResults.profit >= 0 
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

            {/* ROI Calculator */}
            {activeCalculator === 'roi' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Percent className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">ROI Calculator</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Investment Amount ($)</label>
                      <input
                        type="number"
                        placeholder="Enter investment amount"
                        value={roiInputs.investmentAmount}
                        onChange={(e) => setRoiInputs({...roiInputs, investmentAmount: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Expected ROI (%)</label>
                      <input
                        type="number"
                        placeholder="Enter expected ROI"
                        value={roiInputs.roi}
                        onChange={(e) => setRoiInputs({...roiInputs, roi: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Time Period (months)</label>
                      <input
                        type="number"
                        placeholder="Enter time period"
                        value={roiInputs.timePeriod}
                        onChange={(e) => setRoiInputs({...roiInputs, timePeriod: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-muted/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Projection Results</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Future Value:</span>
                        <span className="font-semibold text-success">${roiResults.futureValue.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Profit:</span>
                        <span className="font-semibold text-primary">${roiResults.profit.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monthly Gain:</span>
                        <span className="font-semibold text-foreground">${roiResults.monthlyGain.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Annualized Return:</span>
                        <span className="font-semibold text-accent">{roiResults.annualizedReturn.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Risk Assessment Calculator */}
            {activeCalculator === 'risk' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Risk Assessment Calculator</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Entry Price ($)</label>
                      <input
                        type="number"
                        placeholder="Enter entry price"
                        value={riskInputs.entryPrice}
                        onChange={(e) => setRiskInputs({...riskInputs, entryPrice: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Stop Loss ($)</label>
                      <input
                        type="number"
                        placeholder="Enter stop loss"
                        value={riskInputs.stopLoss}
                        onChange={(e) => setRiskInputs({...riskInputs, stopLoss: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Take Profit ($)</label>
                      <input
                        type="number"
                        placeholder="Enter take profit"
                        value={riskInputs.takeProfit}
                        onChange={(e) => setRiskInputs({...riskInputs, takeProfit: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Position Size ($)</label>
                      <input
                        type="number"
                        placeholder="Enter position size"
                        value={riskInputs.positionSize}
                        onChange={(e) => setRiskInputs({...riskInputs, positionSize: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-muted/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Risk Analysis</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Risk/Reward Ratio:</span>
                        <span className={`font-semibold ${riskResults.riskRewardRatio >= 2 ? 'text-success' : riskResults.riskRewardRatio >= 1 ? 'text-warning' : 'text-destructive'}`}>
                          1:{riskResults.riskRewardRatio.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Risk Amount:</span>
                        <span className="font-semibold text-destructive">${riskResults.riskAmount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Reward Amount:</span>
                        <span className="font-semibold text-success">${riskResults.rewardAmount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Risk Percentage:</span>
                        <span className="font-semibold text-foreground">{Math.abs(riskResults.riskPercent).toFixed(2)}%</span>
                      </div>

                      <div className={`mt-4 p-3 rounded-lg ${
                        riskResults.riskRewardRatio >= 2 ? 'bg-success/10 border border-success/20' : 
                        riskResults.riskRewardRatio >= 1 ? 'bg-warning/10 border border-warning/20' : 
                        'bg-destructive/10 border border-destructive/20'
                      }`}>
                        <div className={`text-sm font-medium ${
                          riskResults.riskRewardRatio >= 2 ? 'text-success' : 
                          riskResults.riskRewardRatio >= 1 ? 'text-warning' : 
                          'text-destructive'
                        }`}>
                          {riskResults.riskRewardRatio >= 2 ? '✅ Excellent Risk/Reward' : 
                           riskResults.riskRewardRatio >= 1 ? '⚠️ Acceptable Risk/Reward' : 
                           '❌ Poor Risk/Reward'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Staking Calculator */}
            {activeCalculator === 'staking' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Staking Rewards Calculator</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Staking Amount</label>
                      <input
                        type="number"
                        placeholder="Enter staking amount"
                        value={stakingInputs.stakingAmount}
                        onChange={(e) => setStakingInputs({...stakingInputs, stakingAmount: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Annual APY (%)</label>
                      <input
                        type="number"
                        placeholder="Enter APY"
                        value={stakingInputs.stakingAPY}
                        onChange={(e) => setStakingInputs({...stakingInputs, stakingAPY: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Staking Period (months)</label>
                      <input
                        type="number"
                        placeholder="Enter staking period"
                        value={stakingInputs.stakingPeriod}
                        onChange={(e) => setStakingInputs({...stakingInputs, stakingPeriod: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-muted/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Staking Projections</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Final Amount:</span>
                        <span className="font-semibold text-success">{stakingResults.finalAmount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Rewards:</span>
                        <span className="font-semibold text-primary">{stakingResults.totalRewards.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monthly Rewards:</span>
                        <span className="font-semibold text-foreground">{stakingResults.monthlyRewards.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Coming Soon for Fees Calculator */}
            {activeCalculator === 'fees' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Trading Fees Calculator</h3>
                <p className="text-muted-foreground mb-4">
                  Compare trading costs across multiple exchanges with our comprehensive fee calculator.
                </p>
                <Link 
                  to="/tools"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <span>View All Tools</span>
                  <Calculator className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </ResponsiveCard>
        </div>
      </div>
    </DataSection>
  );
};