import { useState } from 'react';
import { ChevronDown, Search, TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Users, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface AnalyticsProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

const Analytics = ({ isDarkMode = false, setIsDarkMode = () => {} }: AnalyticsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Chains');

  const categories = ['All Chains', 'Layer 1', 'Layer 2', 'DeFi', 'Proof of Work (PoW)', 'Proof of Stake (PoS)'];

  const chainData = [
    {
      id: 1,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '🟦',
      change24h: 2.4,
      change7d: 8.7,
      change30d: 15.2,
      volume24h: 1250000000,
      tvl: 65000000000,
      dominance: 57.3,
      coins: 5012,
      category: 'Layer 1',
      sparklineData: [
        { time: '1', value: 3200 },
        { time: '2', value: 3250 },
        { time: '3', value: 3180 },
        { time: '4', value: 3300 },
        { time: '5', value: 3400 },
        { time: '6', value: 3350 },
        { time: '7', value: 3420 }
      ]
    },
    {
      id: 2,
      name: 'Solana',
      symbol: 'SOL',
      logo: '🟣',
      change24h: 5.2,
      change7d: 12.4,
      change30d: 28.6,
      volume24h: 980000000,
      tvl: 8500000000,
      dominance: 7.5,
      coins: 4340,
      category: 'Layer 1',
      sparklineData: [
        { time: '1', value: 180 },
        { time: '2', value: 175 },
        { time: '3', value: 190 },
        { time: '4', value: 195 },
        { time: '5', value: 200 },
        { time: '6', value: 188 },
        { time: '7', value: 205 }
      ]
    },
    {
      id: 3,
      name: 'BNB Smart Chain',
      symbol: 'BNB',
      logo: '🟨',
      change24h: -1.2,
      change7d: 3.8,
      change30d: 11.4,
      volume24h: 850000000,
      tvl: 6200000000,
      dominance: 5.5,
      coins: 2915,
      category: 'Layer 1',
      sparklineData: [
        { time: '1', value: 310 },
        { time: '2', value: 305 },
        { time: '3', value: 298 },
        { time: '4', value: 315 },
        { time: '5', value: 320 },
        { time: '6', value: 308 },
        { time: '7', value: 312 }
      ]
    },
    {
      id: 4,
      name: 'Polygon',
      symbol: 'MATIC',
      logo: '🟪',
      change24h: 3.7,
      change7d: 6.2,
      change30d: 18.9,
      volume24h: 420000000,
      tvl: 2800000000,
      dominance: 2.5,
      coins: 1840,
      category: 'Layer 2',
      sparklineData: [
        { time: '1', value: 0.85 },
        { time: '2', value: 0.82 },
        { time: '3', value: 0.88 },
        { time: '4', value: 0.90 },
        { time: '5', value: 0.92 },
        { time: '6', value: 0.89 },
        { time: '7', value: 0.94 }
      ]
    },
    {
      id: 5,
      name: 'Arbitrum One',
      symbol: 'ARB',
      logo: '🔵',
      change24h: 4.1,
      change7d: 9.3,
      change30d: 22.1,
      volume24h: 380000000,
      tvl: 2500000000,
      dominance: 2.2,
      coins: 818,
      category: 'Layer 2',
      sparklineData: [
        { time: '1', value: 1.2 },
        { time: '2', value: 1.15 },
        { time: '3', value: 1.25 },
        { time: '4', value: 1.3 },
        { time: '5', value: 1.28 },
        { time: '6', value: 1.32 },
        { time: '7', value: 1.35 }
      ]
    },
    {
      id: 6,
      name: 'Optimism',
      symbol: 'OP',
      logo: '🔴',
      change24h: 2.8,
      change7d: 7.5,
      change30d: 19.6,
      volume24h: 320000000,
      tvl: 1900000000,
      dominance: 1.7,
      coins: 654,
      category: 'Layer 2',
      sparklineData: [
        { time: '1', value: 2.1 },
        { time: '2', value: 2.05 },
        { time: '3', value: 2.15 },
        { time: '4', value: 2.2 },
        { time: '5', value: 2.18 },
        { time: '6', value: 2.25 },
        { time: '7', value: 2.28 }
      ]
    }
  ];

  const overviewStats = {
    totalTVL: 113415546884,
    totalVolume: 23161716447,
    tvlChange: -0.2,
    volumeChange: 7.8,
    totalChains: 250,
    activeChains: 180
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const filteredChains = chainData.filter(chain => {
    const matchesSearch = chain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chain.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Chains' || chain.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Chain Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive blockchain analytics and Total Value Locked (TVL) tracking
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(overviewStats.totalTVL)}</div>
              <p className={`text-xs ${overviewStats.tvlChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(overviewStats.tvlChange)} from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h Trading Volume</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(overviewStats.totalVolume)}</div>
              <p className={`text-xs ${overviewStats.volumeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(overviewStats.volumeChange)} from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Chains</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.activeChains}</div>
              <p className="text-xs text-muted-foreground">
                of {overviewStats.totalChains} total chains
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4T</div>
              <p className="text-xs text-green-500">+2.1% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search chains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category.replace(' (PoW)', '').replace(' (PoS)', '')}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Chains Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Blockchains by Total Value Locked (TVL)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2">#</th>
                    <th className="text-left py-3 px-2">Chain</th>
                    <th className="text-left py-3 px-2">24h</th>
                    <th className="text-left py-3 px-2">7d</th>
                    <th className="text-left py-3 px-2">30d</th>
                    <th className="text-right py-3 px-2">24h Volume</th>
                    <th className="text-right py-3 px-2">TVL</th>
                    <th className="text-right py-3 px-2">Dominance</th>
                    <th className="text-right py-3 px-2"># of Coins</th>
                    <th className="text-right py-3 px-2">Last 7 Days</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChains.map((chain, index) => (
                    <tr key={chain.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-2 text-sm">{index + 1}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{chain.logo}</span>
                          <div>
                            <div className="font-medium">{chain.name}</div>
                            <div className="text-sm text-muted-foreground">{chain.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className={`flex items-center space-x-1 ${
                          chain.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {chain.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span className="text-sm">{formatPercentage(chain.change24h)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`text-sm ${
                          chain.change7d >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {formatPercentage(chain.change7d)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`text-sm ${
                          chain.change30d >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {formatPercentage(chain.change30d)}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right text-sm">{formatNumber(chain.volume24h)}</td>
                      <td className="py-4 px-2 text-right text-sm font-medium">{formatNumber(chain.tvl)}</td>
                      <td className="py-4 px-2 text-right text-sm">{chain.dominance}%</td>
                      <td className="py-4 px-2 text-right text-sm">{chain.coins.toLocaleString()}</td>
                      <td className="py-4 px-2 text-right">
                        <div className="w-20 h-10">
                          <ChartContainer
                            config={{
                              value: {
                                label: "Price",
                                color: chain.change7d >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))",
                              },
                            }}
                            className="h-full w-full"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chain.sparklineData}>
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke={chain.change7d >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Additional Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Chain Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Block Time</span>
                  <Badge variant="secondary">12.5s</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Network Fees (24h avg)</span>
                  <Badge variant="secondary">$2.45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Validators</span>
                  <Badge variant="secondary">42,851</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cross-chain Bridges</span>
                  <Badge variant="secondary">156</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Ecosystem Growth</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">New Wallets (24h)</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">+12,485</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active DApps</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">3,247</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Transactions (24h)</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">2.8M</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Developer Activity</span>
                  <Badge variant="outline" className="text-green-500 border-green-500">High</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;