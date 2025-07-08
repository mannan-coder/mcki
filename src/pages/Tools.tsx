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

  const roiResult = calculateROI();
  const priceResult = calculatePriceChange();

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
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
                    <TabsTrigger value="price">Price Analyzer</TabsTrigger>
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
                </Tabs>
              </div>
            </div>

            {/* Additional Features */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Pro Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="text-sm font-medium mb-2 text-primary">Advanced Analytics</div>
                    <div className="text-xs text-muted-foreground">
                      Deep dive into market trends with our advanced analytical tools and real-time data processing.
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-success/5 to-success/10">
                    <div className="text-sm font-medium mb-2 text-success">Portfolio Integration</div>
                    <div className="text-xs text-muted-foreground">
                      Connect your exchange accounts for automated portfolio tracking and performance analysis.
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-accent/5 to-accent/10">
                    <div className="text-sm font-medium mb-2 text-accent">API Access</div>
                    <div className="text-xs text-muted-foreground">
                      Integrate our calculation engines into your own applications with our developer-friendly API.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tools;