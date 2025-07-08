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
  
  // State variables for all calculators
  const [investmentAmount, setInvestmentAmount] = useState('1000');
  const [roi, setRoi] = useState('15');
  const [timePeriod, setTimePeriod] = useState('12');
  const [currentPrice, setCurrentPrice] = useState('42000');
  const [targetPrice, setTargetPrice] = useState('50000');
  const [exchange1Price, setExchange1Price] = useState('42000');
  const [exchange2Price, setExchange2Price] = useState('42500');
  const [tradingAmount, setTradingAmount] = useState('10000');
  const [portfolioValue, setPortfolioValue] = useState('50000');
  const [initialValue, setInitialValue] = useState('40000');
  const [holdings, setHoldings] = useState('5');
  const [entryPrice, setEntryPrice] = useState('42000');
  const [stopLoss, setStopLoss] = useState('40000');
  const [takeProfit, setTakeProfit] = useState('46000');
  const [positionSize, setPositionSize] = useState('1000');
  const [principal, setPrincipal] = useState('10000');
  const [annualRate, setAnnualRate] = useState('8');
  const [compoundFreq, setCompoundFreq] = useState('12');
  const [years, setYears] = useState('5');
  const [dcaAmount, setDcaAmount] = useState('100');
  const [dcaFrequency, setDcaFrequency] = useState('weekly');
  const [dcaPeriod, setDcaPeriod] = useState('52');
  const [stakingAmount, setStakingAmount] = useState('1000');
  const [stakingAPY, setStakingAPY] = useState('12');
  const [stakingPeriod, setStakingPeriod] = useState('12');

  // Calculation functions
  const calculateROI = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const roiPercent = parseFloat(roi) || 0;
    const months = parseFloat(timePeriod) || 0;
    
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
    const fees = amount * 0.002;
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

  const calculateDCA = () => {
    const amount = parseFloat(dcaAmount) || 0;
    const periods = parseFloat(dcaPeriod) || 0;
    const frequency = dcaFrequency === 'daily' ? 365 : 
                     dcaFrequency === 'weekly' ? 52 : 
                     dcaFrequency === 'monthly' ? 12 : 1;
    
    const totalInvested = amount * periods;
    const averageCost = totalInvested / periods;
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

  // Get calculation results
  const roiResult = calculateROI();
  const priceResult = calculatePriceChange();
  const arbitrageResult = calculateArbitrage();
  const portfolioResult = calculatePortfolio();
  const riskResult = calculateRisk();
  const compoundResult = calculateCompound();
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Header */}
          <div className="mb-12 text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-gradient-premium text-transparent bg-clip-text mb-4">
              <Calculator className="h-8 w-8 text-primary animate-float" />
              <h1 className="text-5xl font-bold font-sans tracking-tight">Tools & Calculators</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional-grade financial calculators and analysis tools. 
              <span className="text-primary font-medium"> Powered by advanced algorithms</span> for accurate results.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-premium rounded-full animate-glow-pulse" />
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="group">
              <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-slide-up card-enhanced">
                <div className="absolute inset-0 bg-gradient-premium opacity-5" />
                <CardContent className="p-6 text-center relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:animate-glow-pulse">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary font-mono number-glow">8+</div>
                  <div className="text-sm text-muted-foreground font-medium">Professional Tools</div>
                  <div className="mt-2 text-xs text-primary/70">Always Available</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="group">
              <Card className="relative overflow-hidden border-success/20 bg-gradient-to-br from-success/5 to-success/10 hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-slide-up [animation-delay:100ms] card-enhanced">
                <div className="absolute inset-0 bg-gradient-success opacity-5" />
                <CardContent className="p-6 text-center relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-xl mb-4 group-hover:animate-glow-pulse">
                    <BarChart3 className="h-6 w-6 text-success" />
                  </div>
                  <div className="text-3xl font-bold text-success font-mono number-glow">500K+</div>
                  <div className="text-sm text-muted-foreground font-medium">Calculations Made</div>
                  <div className="mt-2 text-xs text-success/70">High Performance</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="group">
              <Card className="relative overflow-hidden border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-slide-up [animation-delay:200ms] card-enhanced">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <CardContent className="p-6 text-center relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mb-4 group-hover:animate-glow-pulse">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent font-mono number-glow">99.9%</div>
                  <div className="text-sm text-muted-foreground font-medium">Accuracy Rate</div>
                  <div className="mt-2 text-xs text-accent/70">Verified Results</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="group">
              <Card className="relative overflow-hidden border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10 hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-slide-up [animation-delay:300ms] card-enhanced">
                <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent" />
                <CardContent className="p-6 text-center relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-warning/10 rounded-xl mb-4 group-hover:animate-glow-pulse">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                  <div className="text-3xl font-bold text-warning font-mono number-glow">24/7</div>
                  <div className="text-sm text-muted-foreground font-medium">Available</div>
                  <div className="mt-2 text-xs text-warning/70">Real-time</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Main Tools Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
            {/* Enhanced Tools List */}
            <div className="lg:col-span-1">
              <Card className="h-full border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xl font-semibold animate-gradient">Available Tools</span>
                  </CardTitle>
                  <div className="h-1 w-16 bg-gradient-premium rounded-full" />
                </CardHeader>
                <CardContent className="h-full pb-6">
                  <div className="space-y-3">
                    {tools.map((tool, index) => (
                      <div 
                        key={tool.id} 
                        onClick={() => setActiveTab(tool.tabValue)}
                        className={`group relative flex items-start space-x-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] animate-slide-up pulse-border ${
                          activeTab === tool.tabValue 
                            ? 'bg-gradient-premium text-primary-foreground border-primary shadow-glow scale-[1.02]' 
                            : 'border-border/50 hover:border-primary/30 hover:bg-muted/30 hover:shadow-card-hover'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          activeTab === tool.tabValue 
                            ? 'bg-primary-foreground/20' 
                            : 'bg-primary/10 group-hover:bg-primary/20'
                        }`}>
                          <tool.icon className={`h-5 w-5 transition-all duration-300 ${
                            activeTab === tool.tabValue ? 'text-primary-foreground' : 'text-primary'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm transition-all duration-300 ${
                            activeTab === tool.tabValue ? 'text-primary-foreground' : 'text-foreground group-hover:text-primary'
                          }`}>{tool.title}</div>
                          <div className={`text-xs mt-1 leading-relaxed transition-all duration-300 ${
                            activeTab === tool.tabValue ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}>{tool.description}</div>
                          <Badge 
                            variant={activeTab === tool.tabValue ? "secondary" : "outline"} 
                            className={`mt-2 text-xs font-medium transition-all duration-300 ${
                              activeTab === tool.tabValue ? 'bg-primary-foreground/20 text-primary-foreground' : 'hover:bg-primary/10'
                            }`}
                          >
                            {tool.category}
                          </Badge>
                        </div>
                        {activeTab === tool.tabValue && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-glow-pulse" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Active Calculators */}
            <div className="lg:col-span-2 h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 h-full">
                <div className="hidden">
                  <TabsList className="grid w-full grid-cols-6 gap-1">
                    <TabsTrigger value="roi" className="text-xs">ROI</TabsTrigger>
                    <TabsTrigger value="price" className="text-xs">Price</TabsTrigger>
                    <TabsTrigger value="arbitrage" className="text-xs">Arbitrage</TabsTrigger>
                    <TabsTrigger value="portfolio" className="text-xs">Portfolio</TabsTrigger>
                    <TabsTrigger value="risk" className="text-xs">Risk</TabsTrigger>
                    <TabsTrigger value="compound" className="text-xs">Compound</TabsTrigger>
                    <TabsTrigger value="dca" className="text-xs">DCA</TabsTrigger>
                    <TabsTrigger value="staking" className="text-xs">Staking</TabsTrigger>
                  </TabsList>
                </div>

                {/* ROI Calculator */}
                <TabsContent value="roi">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calculator className="h-5 w-5" />
                        <span>ROI Calculator</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Investment Amount ($)</label>
                          <Input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Expected ROI (%)</label>
                          <Input
                            type="number"
                            value={roi}
                            onChange={(e) => setRoi(e.target.value)}
                            placeholder="Enter ROI"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Time Period (months)</label>
                          <Input
                            type="number"
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(e.target.value)}
                            placeholder="Enter months"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                            <div className="text-xl font-bold text-primary font-mono">${roiResult.futureValue}</div>
                            <div className="text-sm text-muted-foreground">Future Value</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-success/5 border-success/20">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                            <div className="text-xl font-bold text-success font-mono">${roiResult.profit}</div>
                            <div className="text-sm text-muted-foreground">Total Profit</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-accent/5 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <BarChart3 className="h-6 w-6 text-accent mx-auto mb-2" />
                            <div className="text-xl font-bold text-accent font-mono">${roiResult.monthlyGain}</div>
                            <div className="text-sm text-muted-foreground">Monthly Gain</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-warning/5 border-warning/20">
                          <CardContent className="p-4 text-center">
                            <Percent className="h-6 w-6 text-warning mx-auto mb-2" />
                            <div className="text-xl font-bold text-warning font-mono">{roiResult.annualizedReturn}%</div>
                            <div className="text-sm text-muted-foreground">Annualized Return</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Price Change Analyzer */}
                <TabsContent value="price">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
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
                            placeholder="Enter current price"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Target Price ($)</label>
                          <Input
                            type="number"
                            value={targetPrice}
                            onChange={(e) => setTargetPrice(e.target.value)}
                            placeholder="Enter target price"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className={`border ${parseFloat(priceResult.change) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                          <CardContent className="p-4 text-center">
                            {parseFloat(priceResult.change) >= 0 ? 
                              <ArrowUpIcon className="h-6 w-6 text-success mx-auto mb-2" /> :
                              <ArrowDownIcon className="h-6 w-6 text-destructive mx-auto mb-2" />
                            }
                            <div className={`text-xl font-bold font-mono ${parseFloat(priceResult.change) >= 0 ? 'text-success' : 'text-destructive'}`}>
                              ${priceResult.change}
                            </div>
                            <div className="text-sm text-muted-foreground">Price Change</div>
                          </CardContent>
                        </Card>
                        
                        <Card className={`border ${parseFloat(priceResult.changePercent) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                          <CardContent className="p-4 text-center">
                            <Percent className={`h-6 w-6 mx-auto mb-2 ${parseFloat(priceResult.changePercent) >= 0 ? 'text-success' : 'text-destructive'}`} />
                            <div className={`text-xl font-bold font-mono ${parseFloat(priceResult.changePercent) >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {priceResult.changePercent}%
                            </div>
                            <div className="text-sm text-muted-foreground">Percentage Change</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Continue with other calculator tabs... */}
                {/* Arbitrage Calculator */}
                <TabsContent value="arbitrage">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
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
                            placeholder="Enter price"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Exchange 2 Price ($)</label>
                          <Input
                            type="number"
                            value={exchange2Price}
                            onChange={(e) => setExchange2Price(e.target.value)}
                            placeholder="Enter price"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Trading Amount ($)</label>
                          <Input
                            type="number"
                            value={tradingAmount}
                            onChange={(e) => setTradingAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                            <div className="text-xl font-bold text-primary font-mono">${arbitrageResult.priceDiff}</div>
                            <div className="text-sm text-muted-foreground">Price Difference</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-success/5 border-success/20">
                          <CardContent className="p-4 text-center">
                            <Percent className="h-6 w-6 text-success mx-auto mb-2" />
                            <div className="text-xl font-bold text-success font-mono">{arbitrageResult.profitPercent}%</div>
                            <div className="text-sm text-muted-foreground">Profit %</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-accent/5 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
                            <div className="text-xl font-bold text-accent font-mono">${arbitrageResult.grossProfit}</div>
                            <div className="text-sm text-muted-foreground">Gross Profit</div>
                          </CardContent>
                        </Card>
                        
                        <Card className={`border ${parseFloat(arbitrageResult.netProfit) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                          <CardContent className="p-4 text-center">
                            <DollarSign className={`h-6 w-6 mx-auto mb-2 ${parseFloat(arbitrageResult.netProfit) >= 0 ? 'text-success' : 'text-destructive'}`} />
                            <div className={`text-xl font-bold font-mono ${parseFloat(arbitrageResult.netProfit) >= 0 ? 'text-success' : 'text-destructive'}`}>
                              ${arbitrageResult.netProfit}
                            </div>
                            <div className="text-sm text-muted-foreground">Net Profit</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Portfolio Calculator */}
                <TabsContent value="portfolio">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PieChart className="h-5 w-5" />
                        <span>Portfolio Performance Tracker</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Current Portfolio Value ($)</label>
                          <Input
                            type="number"
                            value={portfolioValue}
                            onChange={(e) => setPortfolioValue(e.target.value)}
                            placeholder="Enter current value"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Initial Investment ($)</label>
                          <Input
                            type="number"
                            value={initialValue}
                            onChange={(e) => setInitialValue(e.target.value)}
                            placeholder="Enter initial amount"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Number of Holdings</label>
                          <Input
                            type="number"
                            value={holdings}
                            onChange={(e) => setHoldings(e.target.value)}
                            placeholder="Enter holdings count"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className={`border ${parseFloat(portfolioResult.totalGain) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                          <CardContent className="p-4 text-center">
                            <DollarSign className={`h-6 w-6 mx-auto mb-2 ${parseFloat(portfolioResult.totalGain) >= 0 ? 'text-success' : 'text-destructive'}`} />
                            <div className={`text-xl font-bold font-mono ${parseFloat(portfolioResult.totalGain) >= 0 ? 'text-success' : 'text-destructive'}`}>
                              ${portfolioResult.totalGain}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Gain/Loss</div>
                          </CardContent>
                        </Card>
                        
                        <Card className={`border ${parseFloat(portfolioResult.gainPercent) >= 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                          <CardContent className="p-4 text-center">
                            <Percent className={`h-6 w-6 mx-auto mb-2 ${parseFloat(portfolioResult.gainPercent) >= 0 ? 'text-success' : 'text-destructive'}`} />
                            <div className={`text-xl font-bold font-mono ${parseFloat(portfolioResult.gainPercent) >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {portfolioResult.gainPercent}%
                            </div>
                            <div className="text-sm text-muted-foreground">Gain/Loss %</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
                            <div className="text-xl font-bold text-primary font-mono">${portfolioResult.avgHolding}</div>
                            <div className="text-sm text-muted-foreground">Avg Holding Value</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-accent/5 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <Target className="h-6 w-6 text-accent mx-auto mb-2" />
                            <div className="text-xl font-bold text-accent font-mono">{portfolioResult.diversificationScore}/100</div>
                            <div className="text-sm text-muted-foreground">Diversification</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Risk Calculator */}
                <TabsContent value="risk">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
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
                            placeholder="Enter entry price"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Stop Loss ($)</label>
                          <Input
                            type="number"
                            value={stopLoss}
                            onChange={(e) => setStopLoss(e.target.value)}
                            placeholder="Enter stop loss"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Take Profit ($)</label>
                          <Input
                            type="number"
                            value={takeProfit}
                            onChange={(e) => setTakeProfit(e.target.value)}
                            placeholder="Enter take profit"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Position Size ($)</label>
                          <Input
                            type="number"
                            value={positionSize}
                            onChange={(e) => setPositionSize(e.target.value)}
                            placeholder="Enter position size"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                            <div className="text-xl font-bold text-primary font-mono">{riskResult.riskRewardRatio}</div>
                            <div className="text-sm text-muted-foreground">Risk:Reward Ratio</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-destructive/5 border-destructive/20">
                          <CardContent className="p-4 text-center">
                            <ArrowDownIcon className="h-6 w-6 text-destructive mx-auto mb-2" />
                            <div className="text-xl font-bold text-destructive font-mono">${riskResult.riskAmount}</div>
                            <div className="text-sm text-muted-foreground">Risk Amount</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-success/5 border-success/20">
                          <CardContent className="p-4 text-center">
                            <ArrowUpIcon className="h-6 w-6 text-success mx-auto mb-2" />
                            <div className="text-xl font-bold text-success font-mono">${riskResult.rewardAmount}</div>
                            <div className="text-sm text-muted-foreground">Reward Amount</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-warning/5 border-warning/20">
                          <CardContent className="p-4 text-center">
                            <Percent className="h-6 w-6 text-warning mx-auto mb-2" />
                            <div className="text-xl font-bold text-warning font-mono">{riskResult.riskPercent}%</div>
                            <div className="text-sm text-muted-foreground">Risk Percentage</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Compound Interest Calculator */}
                <TabsContent value="compound">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Compound Interest Calculator</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Principal Amount ($)</label>
                          <Input
                            type="number"
                            value={principal}
                            onChange={(e) => setPrincipal(e.target.value)}
                            placeholder="Enter principal"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Annual Rate (%)</label>
                          <Input
                            type="number"
                            value={annualRate}
                            onChange={(e) => setAnnualRate(e.target.value)}
                            placeholder="Enter rate"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Compound Frequency</label>
                          <Input
                            type="number"
                            value={compoundFreq}
                            onChange={(e) => setCompoundFreq(e.target.value)}
                            placeholder="Times per year"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Time Period (years)</label>
                          <Input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            placeholder="Enter years"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                            <div className="text-xl font-bold text-primary font-mono">${compoundResult.finalAmount}</div>
                            <div className="text-sm text-muted-foreground">Final Amount</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-success/5 border-success/20">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                            <div className="text-xl font-bold text-success font-mono">${compoundResult.totalInterest}</div>
                            <div className="text-sm text-muted-foreground">Total Interest</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-accent/5 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <Percent className="h-6 w-6 text-accent mx-auto mb-2" />
                            <div className="text-xl font-bold text-accent font-mono">{compoundResult.effectiveRate}%</div>
                            <div className="text-sm text-muted-foreground">Effective Rate</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* DCA Calculator */}
                <TabsContent value="dca">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
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
                            placeholder="Enter amount"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Frequency</label>
                          <select
                            value={dcaFrequency}
                            onChange={(e) => setDcaFrequency(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
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
                            placeholder="Enter periods"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                            <div className="text-xl font-bold text-primary font-mono">${dcaResult.totalInvested}</div>
                            <div className="text-sm text-muted-foreground">Total Invested</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-success/5 border-success/20">
                          <CardContent className="p-4 text-center">
                            <BarChart3 className="h-6 w-6 text-success mx-auto mb-2" />
                            <div className="text-xl font-bold text-success font-mono">${dcaResult.averageCost}</div>
                            <div className="text-sm text-muted-foreground">Average Cost</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-accent/5 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                            <div className="text-xl font-bold text-accent font-mono">{dcaResult.totalPeriods}</div>
                            <div className="text-sm text-muted-foreground">Total Periods</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Staking Calculator */}
                <TabsContent value="staking">
                  <Card className="border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-glow transition-all duration-300 card-enhanced">
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
                            placeholder="Enter amount"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">APY (%)</label>
                          <Input
                            type="number"
                            value={stakingAPY}
                            onChange={(e) => setStakingAPY(e.target.value)}
                            placeholder="Enter APY"
                            className="focus-visible"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Staking Period (months)</label>
                          <Input
                            type="number"
                            value={stakingPeriod}
                            onChange={(e) => setStakingPeriod(e.target.value)}
                            placeholder="Enter months"
                            className="focus-visible"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 text-center">
                            <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                            <div className="text-xl font-bold text-primary font-mono">${stakingResult.finalAmount}</div>
                            <div className="text-sm text-muted-foreground">Final Amount</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-success/5 border-success/20">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                            <div className="text-xl font-bold text-success font-mono">${stakingResult.totalRewards}</div>
                            <div className="text-sm text-muted-foreground">Total Rewards</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-accent/5 border-accent/20">
                          <CardContent className="p-4 text-center">
                            <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                            <div className="text-xl font-bold text-accent font-mono">${stakingResult.monthlyRewards}</div>
                            <div className="text-sm text-muted-foreground">Monthly Rewards</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-warning/5 border-warning/20">
                          <CardContent className="p-4 text-center">
                            <Percent className="h-6 w-6 text-warning mx-auto mb-2" />
                            <div className="text-xl font-bold text-warning font-mono">{stakingResult.effectiveAPY}%</div>
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
  );
};

export default Tools;