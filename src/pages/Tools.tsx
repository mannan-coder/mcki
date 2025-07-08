import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  DollarSign,
  TrendingUp,
  BarChart3,
  Zap,
  Search,
  ArrowUpIcon,
  ArrowDownIcon,
  Percent,
  Clock,
  Target,
  PieChart
} from 'lucide-react';

const Tools = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState('1000');
  const [roi, setRoi] = useState('15');
  const [timePeriod, setTimePeriod] = useState('12');
  const [currentPrice, setCurrentPrice] = useState('42000');
  const [targetPrice, setTargetPrice] = useState('50000');
  
  // Arbitrage Calculator
  const [exchange1Price, setExchange1Price] = useState('42000');
  const [exchange2Price, setExchange2Price] = useState('42500');
  const [tradingAmount, setTradingAmount] = useState('10000');
  
  // Portfolio Tracker
  const [portfolioValue, setPortfolioValue] = useState('50000');
  const [initialValue, setInitialValue] = useState('40000');
  const [holdings, setHoldings] = useState('5');
  
  // Risk Calculator
  const [entryPrice, setEntryPrice] = useState('42000');
  const [stopLoss, setStopLoss] = useState('40000');
  const [takeProfit, setTakeProfit] = useState('46000');
  const [positionSize, setPositionSize] = useState('1000');
  
  // Compound Interest
  const [principal, setPrincipal] = useState('10000');
  const [annualRate, setAnnualRate] = useState('8');
  const [compoundFreq, setCompoundFreq] = useState('12');
  const [years, setYears] = useState('5');

  const calculateROI = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const roiPercent = parseFloat(roi) || 0;
    const months = parseFloat(timePeriod) || 0;
    
    // Calculate compound growth over time period
    const annualRate = roiPercent / 100;
    const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
    const futureValue = amount * Math.pow(1 + monthlyRate, months);
    const profit = futureValue - amount;
    const monthlyGain = profit / months;
    const annualizedReturn = ((futureValue / amount) ** (12 / months) - 1) * 100;
    
    return {
      futureValue: futureValue.toFixed(2),
      profit: profit.toFixed(2),
      monthlyGain: monthlyGain.toFixed(2),
      annualizedReturn: annualizedReturn.toFixed(2)
    };
  };

  const calculatePriceChange = () => {
    const current = parseFloat(currentPrice) || 0;
    const target = parseFloat(targetPrice) || 0;
    
    const change = target - current;
    const changePercent = ((change / current) * 100);
    
    return {
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(2)
    };
  };

  const calculateArbitrage = () => {
    const price1 = parseFloat(exchange1Price) || 0;
    const price2 = parseFloat(exchange2Price) || 0;
    const amount = parseFloat(tradingAmount) || 0;
    
    const priceDiff = price2 - price1;
    const profitPercent = ((priceDiff / price1) * 100);
    const profit = (amount / price1) * priceDiff;
    const fees = amount * 0.002; // 0.2% total fees
    const netProfit = profit - fees;
    
    return {
      priceDiff: priceDiff.toFixed(2),
      profitPercent: profitPercent.toFixed(2),
      grossProfit: profit.toFixed(2),
      fees: fees.toFixed(2),
      netProfit: netProfit.toFixed(2)
    };
  };
  
  const calculatePortfolio = () => {
    const current = parseFloat(portfolioValue) || 0;
    const initial = parseFloat(initialValue) || 0;
    const numHoldings = parseFloat(holdings) || 0;
    
    const totalGain = current - initial;
    const gainPercent = ((totalGain / initial) * 100);
    const avgHolding = current / numHoldings;
    const diversificationScore = Math.min(numHoldings * 20, 100);
    
    return {
      totalGain: totalGain.toFixed(2),
      gainPercent: gainPercent.toFixed(2),
      avgHolding: avgHolding.toFixed(2),
      diversificationScore: diversificationScore.toFixed(0)
    };
  };
  
  const calculateRisk = () => {
    const entry = parseFloat(entryPrice) || 0;
    const stop = parseFloat(stopLoss) || 0;
    const target = parseFloat(takeProfit) || 0;
    const size = parseFloat(positionSize) || 0;
    
    const risk = entry - stop;
    const reward = target - entry;
    const riskRewardRatio = reward / risk;
    const riskAmount = (size / entry) * risk;
    const rewardAmount = (size / entry) * reward;
    const riskPercent = (risk / entry) * 100;
    
    return {
      riskRewardRatio: riskRewardRatio.toFixed(2),
      riskAmount: riskAmount.toFixed(2),
      rewardAmount: rewardAmount.toFixed(2),
      riskPercent: riskPercent.toFixed(2)
    };
  };
  
  const calculateCompound = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(annualRate) / 100 || 0;
    const n = parseFloat(compoundFreq) || 0;
    const t = parseFloat(years) || 0;
    
    const finalAmount = p * Math.pow((1 + r/n), n*t);
    const totalInterest = finalAmount - p;
    const effectiveRate = (Math.pow((1 + r/n), n) - 1) * 100;
    
    return {
      finalAmount: finalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2)
    };
  };

  const roiResult = calculateROI();
  const priceResult = calculatePriceChange();
  const arbitrageResult = calculateArbitrage();
  const portfolioResult = calculatePortfolio();
  const riskResult = calculateRisk();
  const compoundResult = calculateCompound();

  const tools = [
    {
      id: 'roi-calculator',
      title: 'ROI Calculator',
      description: 'Calculate potential returns on your cryptocurrency investments',
      icon: Calculator,
      category: 'investment'
    },
    {
      id: 'price-analyzer',
      title: 'Price Change Analyzer',
      description: 'Analyze price changes and percentage movements',
      icon: TrendingUp,
      category: 'analysis'
    },
    {
      id: 'arbitrage-finder',
      title: 'Arbitrage Opportunity Finder',
      description: 'Find profitable arbitrage opportunities across exchanges',
      icon: Zap,
      category: 'arbitrage'
    },
    {
      id: 'portfolio-tracker',
      title: 'Portfolio Performance Tracker',
      description: 'Track and analyze your cryptocurrency portfolio performance',
      icon: PieChart,
      category: 'portfolio'
    },
    {
      id: 'risk-calculator',
      title: 'Risk Assessment Calculator',
      description: 'Calculate risk-to-reward ratios for your trades',
      icon: Target,
      category: 'risk'
    },
    {
      id: 'compound-calculator',
      title: 'Compound Interest Calculator',
      description: 'Calculate compound interest on your crypto holdings',
      icon: BarChart3,
      category: 'investment'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <div className="relative">
        <div className="absolute inset-0 bg-background" />
        
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-foreground">Cryptocurrency Tools & Calculators</h1>
              <p className="text-lg text-muted-foreground">
                Professional-grade tools for cryptocurrency trading, investment analysis, and portfolio management. 
                Make informed decisions with our comprehensive suite of calculators and analyzers.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">12+</div>
                  <div className="text-sm text-muted-foreground">Tools Available</div>
                </CardContent>
              </Card>
              
              <Card className="bg-success/5 border-success/20">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold text-success">500K+</div>
                  <div className="text-sm text-muted-foreground">Calculations Made</div>
                </CardContent>
              </Card>
              
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-accent">98.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </CardContent>
              </Card>
              
              <Card className="bg-warning/5 border-warning/20">
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
                  <div className="text-2xl font-bold text-warning">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Tools Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tools List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>Available Tools</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tools.map((tool) => (
                        <div key={tool.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer">
                          <tool.icon className="h-5 w-5 text-primary mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{tool.title}</div>
                            <div className="text-xs text-muted-foreground">{tool.description}</div>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {tool.category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Active Calculators */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="roi" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
                    <TabsTrigger value="price">Price Analyzer</TabsTrigger>
                    <TabsTrigger value="arbitrage">Arbitrage Finder</TabsTrigger>
                  </TabsList>

                  <TabsContent value="roi">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Calculator className="h-5 w-5" />
                          <span>ROI Calculator</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Investment Amount ($)</label>
                            <Input
                              type="number"
                              value={investmentAmount}
                              onChange={(e) => setInvestmentAmount(e.target.value)}
                              placeholder="1000"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Expected ROI (%)</label>
                            <Input
                              type="number"
                              value={roi}
                              onChange={(e) => setRoi(e.target.value)}
                              placeholder="15"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Time Period (months)</label>
                            <Input
                              type="number"
                              value={timePeriod}
                              onChange={(e) => setTimePeriod(e.target.value)}
                              placeholder="12"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">${roiResult.futureValue}</div>
                              <div className="text-sm text-muted-foreground">Future Value</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-success/5 border-success/20">
                            <CardContent className="p-4 text-center">
                              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                              <div className="text-xl font-bold text-success">${roiResult.profit}</div>
                              <div className="text-sm text-muted-foreground">Total Profit</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/5 border-accent/20">
                            <CardContent className="p-4 text-center">
                              <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                              <div className="text-xl font-bold text-accent">${roiResult.monthlyGain}</div>
                              <div className="text-sm text-muted-foreground">Monthly Gain</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-warning/5 border-warning/20">
                            <CardContent className="p-4 text-center">
                              <Percent className="h-6 w-6 text-warning mx-auto mb-2" />
                              <div className="text-xl font-bold text-warning">{roiResult.annualizedReturn}%</div>
                              <div className="text-sm text-muted-foreground">Annual Return</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="price">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5" />
                          <span>Price Change Analyzer</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Current Price ($)</label>
                            <Input
                              type="number"
                              value={currentPrice}
                              onChange={(e) => setCurrentPrice(e.target.value)}
                              placeholder="42000"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Target Price ($)</label>
                            <Input
                              type="number"
                              value={targetPrice}
                              onChange={(e) => setTargetPrice(e.target.value)}
                              placeholder="50000"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">${priceResult.change}</div>
                              <div className="text-sm text-muted-foreground">Price Difference</div>
                            </CardContent>
                          </Card>
                          
                          <Card className={`border ${parseFloat(priceResult.changePercent) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                            <CardContent className="p-4 text-center">
                              <div className="flex items-center justify-center mb-2">
                                {parseFloat(priceResult.changePercent) >= 0 ? 
                                  <ArrowUpIcon className="h-6 w-6 text-success" /> : 
                                  <ArrowDownIcon className="h-6 w-6 text-destructive" />
                                }
                              </div>
                              <div className={`text-xl font-bold ${parseFloat(priceResult.changePercent) >= 0 ? 'text-success' : 'text-destructive'}`}>
                                {priceResult.changePercent}%
                              </div>
                              <div className="text-sm text-muted-foreground">Percentage Change</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="arbitrage">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className="h-5 w-5" />
                          <span>Arbitrage Opportunity Finder</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Exchange 1 Price ($)</label>
                            <Input
                              type="number"
                              value={exchange1Price}
                              onChange={(e) => setExchange1Price(e.target.value)}
                              placeholder="42000"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Exchange 2 Price ($)</label>
                            <Input
                              type="number"
                              value={exchange2Price}
                              onChange={(e) => setExchange2Price(e.target.value)}
                              placeholder="42500"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Trading Amount ($)</label>
                            <Input
                              type="number"
                              value={tradingAmount}
                              onChange={(e) => setTradingAmount(e.target.value)}
                              placeholder="10000"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">${arbitrageResult.netProfit}</div>
                              <div className="text-sm text-muted-foreground">Net Profit</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-success/5 border-success/20">
                            <CardContent className="p-4 text-center">
                              <Percent className="h-6 w-6 text-success mx-auto mb-2" />
                              <div className="text-xl font-bold text-success">{arbitrageResult.profitPercent}%</div>
                              <div className="text-sm text-muted-foreground">Profit Margin</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/5 border-accent/20">
                            <CardContent className="p-4 text-center">
                              <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
                              <div className="text-xl font-bold text-accent">${arbitrageResult.priceDiff}</div>
                              <div className="text-sm text-muted-foreground">Price Difference</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Additional Calculators Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                  {/* Portfolio Tracker */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PieChart className="h-5 w-5" />
                        <span>Portfolio Tracker</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Current Value ($)</label>
                        <Input
                          type="number"
                          value={portfolioValue}
                          onChange={(e) => setPortfolioValue(e.target.value)}
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Initial Value ($)</label>
                        <Input
                          type="number"
                          value={initialValue}
                          onChange={(e) => setInitialValue(e.target.value)}
                          placeholder="40000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Number of Holdings</label>
                        <Input
                          type="number"
                          value={holdings}
                          onChange={(e) => setHoldings(e.target.value)}
                          placeholder="5"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Gain:</span>
                          <span className={`font-bold ${parseFloat(portfolioResult.totalGain) >= 0 ? 'text-success' : 'text-destructive'}`}>
                            ${portfolioResult.totalGain}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Gain %:</span>
                          <span className={`font-bold ${parseFloat(portfolioResult.gainPercent) >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {portfolioResult.gainPercent}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Diversification:</span>
                          <span className="font-bold text-accent">{portfolioResult.diversificationScore}/100</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Calculator */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5" />
                        <span>Risk Calculator</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Entry Price ($)</label>
                        <Input
                          type="number"
                          value={entryPrice}
                          onChange={(e) => setEntryPrice(e.target.value)}
                          placeholder="42000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Stop Loss ($)</label>
                        <Input
                          type="number"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(e.target.value)}
                          placeholder="40000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Take Profit ($)</label>
                        <Input
                          type="number"
                          value={takeProfit}
                          onChange={(e) => setTakeProfit(e.target.value)}
                          placeholder="46000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Position Size ($)</label>
                        <Input
                          type="number"
                          value={positionSize}
                          onChange={(e) => setPositionSize(e.target.value)}
                          placeholder="1000"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Risk/Reward:</span>
                          <span className="font-bold text-primary">{riskResult.riskRewardRatio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Risk Amount:</span>
                          <span className="font-bold text-destructive">${riskResult.riskAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Reward Amount:</span>
                          <span className="font-bold text-success">${riskResult.rewardAmount}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Compound Interest Calculator */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Compound Interest</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Principal ($)</label>
                        <Input
                          type="number"
                          value={principal}
                          onChange={(e) => setPrincipal(e.target.value)}
                          placeholder="10000"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Annual Rate (%)</label>
                        <Input
                          type="number"
                          value={annualRate}
                          onChange={(e) => setAnnualRate(e.target.value)}
                          placeholder="8"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Compound Frequency</label>
                        <Input
                          type="number"
                          value={compoundFreq}
                          onChange={(e) => setCompoundFreq(e.target.value)}
                          placeholder="12"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Time (Years)</label>
                        <Input
                          type="number"
                          value={years}
                          onChange={(e) => setYears(e.target.value)}
                          placeholder="5"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Final Amount:</span>
                          <span className="font-bold text-primary">${compoundResult.finalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Interest Earned:</span>
                          <span className="font-bold text-success">${compoundResult.totalInterest}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Effective Rate:</span>
                          <span className="font-bold text-accent">{compoundResult.effectiveRate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Tools;