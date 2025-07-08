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
  PieChart,
  Shield,
  TrendingDown,
  Activity,
  AlertTriangle,
  Eye,
  Database
} from 'lucide-react';

const Tools = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('roi');
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
  
  // Pump and Dump Detector
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [priceData, setPriceData] = useState('');
  const [volumeData, setVolumeData] = useState('');
  const [timeframe, setTimeframe] = useState('24');
  
  // DCA Calculator
  const [dcaAmount, setDcaAmount] = useState('100');
  const [dcaFrequency, setDcaFrequency] = useState('weekly');
  const [dcaPeriod, setDcaPeriod] = useState('52');
  
  // Staking Calculator
  const [stakingAmount, setStakingAmount] = useState('1000');
  const [stakingAPY, setStakingAPY] = useState('12');
  const [stakingPeriod, setStakingPeriod] = useState('12');

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

  // Additional calculation functions
  const calculatePumpDump = () => {
    if (!priceData || !volumeData) return { riskScore: 0, alerts: [], analysis: 'No data' };
    
    const prices = priceData.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    const volumes = volumeData.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    if (prices.length < 2 || volumes.length < 2) {
      return { riskScore: 0, alerts: ['Insufficient data'], analysis: 'Need more data points' };
    }
    
    const priceChange = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;
    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    const maxVolume = Math.max(...volumes);
    const volumeSpike = maxVolume / avgVolume;
    
    let riskScore = 0;
    const alerts = [];
    
    // High price increase with volume spike
    if (priceChange > 50 && volumeSpike > 3) {
      riskScore += 40;
      alerts.push('Significant price pump with volume spike detected');
    }
    
    // Rapid price changes
    if (Math.abs(priceChange) > 30) {
      riskScore += 30;
      alerts.push('Rapid price movement detected');
    }
    
    // Volume anomalies
    if (volumeSpike > 5) {
      riskScore += 20;
      alerts.push('Unusual volume activity detected');
    }
    
    // Time-based risk
    const hours = parseFloat(timeframe);
    if (hours < 24 && Math.abs(priceChange) > 20) {
      riskScore += 10;
      alerts.push('Rapid movement in short timeframe');
    }
    
    riskScore = Math.min(riskScore, 100);
    
    const analysis = riskScore > 70 ? 'HIGH RISK - Potential pump and dump' :
                    riskScore > 40 ? 'MEDIUM RISK - Monitor closely' :
                    'LOW RISK - Normal activity';
    
    return {
      riskScore: riskScore.toFixed(0),
      alerts: alerts.length > 0 ? alerts : ['No suspicious activity detected'],
      analysis,
      priceChange: priceChange.toFixed(2),
      volumeSpike: volumeSpike.toFixed(2)
    };
  };
  
  const calculateDCA = () => {
    const amount = parseFloat(dcaAmount) || 0;
    const periods = parseFloat(dcaPeriod) || 0;
    const frequency = dcaFrequency === 'daily' ? 365 : 
                     dcaFrequency === 'weekly' ? 52 : 
                     dcaFrequency === 'monthly' ? 12 : 1;
    
    const totalInvested = amount * periods;
    const averageCost = totalInvested / periods; // Simplified - assumes equal amounts
    const totalPeriods = periods;
    
    return {
      totalInvested: totalInvested.toFixed(2),
      averageCost: averageCost.toFixed(2),
      totalPeriods: totalPeriods.toFixed(0),
      frequency: dcaFrequency
    };
  };
  
  const calculateStaking = () => {
    const amount = parseFloat(stakingAmount) || 0;
    const apy = parseFloat(stakingAPY) / 100 || 0;
    const months = parseFloat(stakingPeriod) || 0;
    
    const monthlyRate = apy / 12;
    const finalAmount = amount * Math.pow(1 + monthlyRate, months);
    const rewards = finalAmount - amount;
    const monthlyRewards = rewards / months;
    
    return {
      finalAmount: finalAmount.toFixed(2),
      totalRewards: rewards.toFixed(2),
      monthlyRewards: monthlyRewards.toFixed(2),
      effectiveAPY: (apy * 100).toFixed(2)
    };
  };

  const pumpDumpResult = calculatePumpDump();
  const dcaResult = calculateDCA();
  const stakingResult = calculateStaking();

  const tools = [
    {
      id: 'roi',
      title: 'ROI Calculator',
      description: 'Calculate potential returns on your cryptocurrency investments',
      icon: Calculator,
      category: 'investment',
      tabValue: 'roi'
    },
    {
      id: 'price',
      title: 'Price Change Analyzer',
      description: 'Analyze price changes and percentage movements',
      icon: TrendingUp,
      category: 'analysis',
      tabValue: 'price'
    },
    {
      id: 'arbitrage',
      title: 'Arbitrage Opportunity Finder',
      description: 'Find profitable arbitrage opportunities across exchanges',
      icon: Zap,
      category: 'arbitrage',
      tabValue: 'arbitrage'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Performance Tracker',
      description: 'Track and analyze your cryptocurrency portfolio performance',
      icon: PieChart,
      category: 'portfolio',
      tabValue: 'portfolio'
    },
    {
      id: 'risk',
      title: 'Risk Assessment Calculator',
      description: 'Calculate risk-to-reward ratios for your trades',
      icon: Target,
      category: 'risk',
      tabValue: 'risk'
    },
    {
      id: 'compound',
      title: 'Compound Interest Calculator',
      description: 'Calculate compound interest on your crypto holdings',
      icon: BarChart3,
      category: 'investment',
      tabValue: 'compound'
    },
    {
      id: 'pump-dump',
      title: 'Pump & Dump Detector',
      description: 'Analyze token patterns to detect potential pump and dump schemes',
      icon: Shield,
      category: 'security',
      tabValue: 'pump-dump'
    },
    {
      id: 'dca',
      title: 'DCA Calculator',
      description: 'Calculate dollar-cost averaging strategy returns',
      icon: TrendingDown,
      category: 'investment',
      tabValue: 'dca'
    },
    {
      id: 'staking',
      title: 'Staking Calculator',
      description: 'Calculate potential staking rewards and APY',
      icon: Database,
      category: 'defi',
      tabValue: 'staking'
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
                  <div className="text-2xl font-bold text-primary">9+</div>
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
                        <div 
                          key={tool.id} 
                          onClick={() => setActiveTab(tool.tabValue)}
                          className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                            activeTab === tool.tabValue 
                              ? 'bg-primary text-primary-foreground border-primary' 
                              : 'border-border hover:bg-muted/30'
                          }`}
                        >
                          <tool.icon className={`h-5 w-5 mt-0.5 ${
                            activeTab === tool.tabValue ? 'text-primary-foreground' : 'text-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm ${
                              activeTab === tool.tabValue ? 'text-primary-foreground' : ''
                            }`}>{tool.title}</div>
                            <div className={`text-xs ${
                              activeTab === tool.tabValue ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            }`}>{tool.description}</div>
                            <Badge 
                              variant={activeTab === tool.tabValue ? "secondary" : "outline"} 
                              className="mt-1 text-xs"
                            >
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <div className="hidden">
                    <TabsList className="grid w-full grid-cols-6 gap-1">
                      <TabsTrigger value="roi" className="text-xs">ROI</TabsTrigger>
                      <TabsTrigger value="price" className="text-xs">Price</TabsTrigger>
                      <TabsTrigger value="arbitrage" className="text-xs">Arbitrage</TabsTrigger>
                      <TabsTrigger value="portfolio" className="text-xs">Portfolio</TabsTrigger>
                      <TabsTrigger value="risk" className="text-xs">Risk</TabsTrigger>
                      <TabsTrigger value="compound" className="text-xs">Compound</TabsTrigger>
                    </TabsList>
                  </div>

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

                  <TabsContent value="portfolio">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <PieChart className="h-5 w-5" />
                          <span>Portfolio Performance Tracker</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className={`border ${parseFloat(portfolioResult.totalGain) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                            <CardContent className="p-4 text-center">
                              <DollarSign className={`h-6 w-6 mx-auto mb-2 ${parseFloat(portfolioResult.totalGain) >= 0 ? 'text-success' : 'text-destructive'}`} />
                              <div className={`text-xl font-bold ${parseFloat(portfolioResult.totalGain) >= 0 ? 'text-success' : 'text-destructive'}`}>
                                ${portfolioResult.totalGain}
                              </div>
                              <div className="text-sm text-muted-foreground">Total Gain</div>
                            </CardContent>
                          </Card>
                          
                          <Card className={`border ${parseFloat(portfolioResult.gainPercent) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                            <CardContent className="p-4 text-center">
                              <Percent className={`h-6 w-6 mx-auto mb-2 ${parseFloat(portfolioResult.gainPercent) >= 0 ? 'text-success' : 'text-destructive'}`} />
                              <div className={`text-xl font-bold ${parseFloat(portfolioResult.gainPercent) >= 0 ? 'text-success' : 'text-destructive'}`}>
                                {portfolioResult.gainPercent}%
                              </div>
                              <div className="text-sm text-muted-foreground">Gain Percentage</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">${portfolioResult.avgHolding}</div>
                              <div className="text-sm text-muted-foreground">Avg Holding</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/5 border-accent/20">
                            <CardContent className="p-4 text-center">
                              <Target className="h-6 w-6 text-accent mx-auto mb-2" />
                              <div className="text-xl font-bold text-accent">{portfolioResult.diversificationScore}/100</div>
                              <div className="text-sm text-muted-foreground">Diversification</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="risk">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5" />
                          <span>Risk Assessment Calculator</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">{riskResult.riskRewardRatio}</div>
                              <div className="text-sm text-muted-foreground">Risk/Reward Ratio</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-destructive/5 border-destructive/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-destructive mx-auto mb-2" />
                              <div className="text-xl font-bold text-destructive">${riskResult.riskAmount}</div>
                              <div className="text-sm text-muted-foreground">Risk Amount</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-success/5 border-success/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-success mx-auto mb-2" />
                              <div className="text-xl font-bold text-success">${riskResult.rewardAmount}</div>
                              <div className="text-sm text-muted-foreground">Reward Amount</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-warning/5 border-warning/20">
                            <CardContent className="p-4 text-center">
                              <Percent className="h-6 w-6 text-warning mx-auto mb-2" />
                              <div className="text-xl font-bold text-warning">{riskResult.riskPercent}%</div>
                              <div className="text-sm text-muted-foreground">Risk Percentage</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="compound">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <BarChart3 className="h-5 w-5" />
                          <span>Compound Interest Calculator</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">${compoundResult.finalAmount}</div>
                              <div className="text-sm text-muted-foreground">Final Amount</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-success/5 border-success/20">
                            <CardContent className="p-4 text-center">
                              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                              <div className="text-xl font-bold text-success">${compoundResult.totalInterest}</div>
                              <div className="text-sm text-muted-foreground">Interest Earned</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/5 border-accent/20">
                            <CardContent className="p-4 text-center">
                              <Percent className="h-6 w-6 text-accent mx-auto mb-2" />
                              <div className="text-xl font-bold text-accent">{compoundResult.effectiveRate}%</div>
                              <div className="text-sm text-muted-foreground">Effective Rate</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pump-dump">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Shield className="h-5 w-5" />
                          <span>Pump & Dump Detector</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Token Symbol</label>
                            <Input
                              type="text"
                              value={tokenSymbol}
                              onChange={(e) => setTokenSymbol(e.target.value)}
                              placeholder="BTC"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Price Data (comma separated)</label>
                            <Input
                              type="text"
                              value={priceData}
                              onChange={(e) => setPriceData(e.target.value)}
                              placeholder="42000,44000,50000,48000"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Volume Data (comma separated)</label>
                            <Input
                              type="text"
                              value={volumeData}
                              onChange={(e) => setVolumeData(e.target.value)}
                              placeholder="1000,1500,5000,2000"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Timeframe (hours)</label>
                            <Input
                              type="number"
                              value={timeframe}
                              onChange={(e) => setTimeframe(e.target.value)}
                              placeholder="24"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className={`border ${parseInt(pumpDumpResult.riskScore.toString()) > 70 ? 'bg-destructive/5 border-destructive/20' : parseInt(pumpDumpResult.riskScore.toString()) > 40 ? 'bg-warning/5 border-warning/20' : 'bg-success/5 border-success/20'}`}>
                            <CardContent className="p-4 text-center">
                              <AlertTriangle className={`h-6 w-6 mx-auto mb-2 ${parseInt(pumpDumpResult.riskScore.toString()) > 70 ? 'text-destructive' : parseInt(pumpDumpResult.riskScore.toString()) > 40 ? 'text-warning' : 'text-success'}`} />
                              <div className={`text-xl font-bold ${parseInt(pumpDumpResult.riskScore.toString()) > 70 ? 'text-destructive' : parseInt(pumpDumpResult.riskScore.toString()) > 40 ? 'text-warning' : 'text-success'}`}>
                                {pumpDumpResult.riskScore}/100
                              </div>
                              <div className="text-sm text-muted-foreground">Risk Score</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">{pumpDumpResult.priceChange}%</div>
                              <div className="text-sm text-muted-foreground">Price Change</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/5 border-accent/20">
                            <CardContent className="p-4 text-center">
                              <Activity className="h-6 w-6 text-accent mx-auto mb-2" />
                              <div className="text-xl font-bold text-accent">{pumpDumpResult.volumeSpike}x</div>
                              <div className="text-sm text-muted-foreground">Volume Spike</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-muted/5 border-muted/20">
                            <CardContent className="p-4">
                              <div className="text-sm font-medium mb-2">Analysis</div>
                              <div className="text-xs text-muted-foreground">{pumpDumpResult.analysis}</div>
                              <div className="mt-2 space-y-1">
                                {pumpDumpResult.alerts.map((alert, index) => (
                                  <div key={index} className="text-xs text-muted-foreground">• {alert}</div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="dca">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingDown className="h-5 w-5" />
                          <span>DCA Calculator</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">DCA Amount ($)</label>
                            <Input
                              type="number"
                              value={dcaAmount}
                              onChange={(e) => setDcaAmount(e.target.value)}
                              placeholder="100"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Frequency</label>
                            <select 
                              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                              value={dcaFrequency}
                              onChange={(e) => setDcaFrequency(e.target.value)}
                            >
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Number of Periods</label>
                            <Input
                              type="number"
                              value={dcaPeriod}
                              onChange={(e) => setDcaPeriod(e.target.value)}
                              placeholder="52"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">${dcaResult.totalInvested}</div>
                              <div className="text-sm text-muted-foreground">Total Invested</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-success/5 border-success/20">
                            <CardContent className="p-4 text-center">
                              <Calculator className="h-6 w-6 text-success mx-auto mb-2" />
                              <div className="text-xl font-bold text-success">${dcaResult.averageCost}</div>
                              <div className="text-sm text-muted-foreground">Average Cost</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/5 border-accent/20">
                            <CardContent className="p-4 text-center">
                              <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                              <div className="text-xl font-bold text-accent">{dcaResult.totalPeriods}</div>
                              <div className="text-sm text-muted-foreground">Total Periods</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-warning/5 border-warning/20">
                            <CardContent className="p-4 text-center">
                              <Activity className="h-6 w-6 text-warning mx-auto mb-2" />
                              <div className="text-xl font-bold text-warning capitalize">{dcaResult.frequency}</div>
                              <div className="text-sm text-muted-foreground">Frequency</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="staking">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Database className="h-5 w-5" />
                          <span>Staking Calculator</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Staking Amount ($)</label>
                            <Input
                              type="number"
                              value={stakingAmount}
                              onChange={(e) => setStakingAmount(e.target.value)}
                              placeholder="1000"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">APY (%)</label>
                            <Input
                              type="number"
                              value={stakingAPY}
                              onChange={(e) => setStakingAPY(e.target.value)}
                              placeholder="12"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Staking Period (months)</label>
                            <Input
                              type="number"
                              value={stakingPeriod}
                              onChange={(e) => setStakingPeriod(e.target.value)}
                              placeholder="12"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 text-center">
                              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                              <div className="text-xl font-bold text-primary">${stakingResult.finalAmount}</div>
                              <div className="text-sm text-muted-foreground">Final Amount</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-success/5 border-success/20">
                            <CardContent className="p-4 text-center">
                              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                              <div className="text-xl font-bold text-success">${stakingResult.totalRewards}</div>
                              <div className="text-sm text-muted-foreground">Total Rewards</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/5 border-accent/20">
                            <CardContent className="p-4 text-center">
                              <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                              <div className="text-xl font-bold text-accent">${stakingResult.monthlyRewards}</div>
                              <div className="text-sm text-muted-foreground">Monthly Rewards</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-warning/5 border-warning/20">
                            <CardContent className="p-4 text-center">
                              <Percent className="h-6 w-6 text-warning mx-auto mb-2" />
                              <div className="text-xl font-bold text-warning">{stakingResult.effectiveAPY}%</div>
                              <div className="text-sm text-muted-foreground">Effective APY</div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Tools;