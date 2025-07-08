import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign,
  Activity,
  Zap,
  Globe,
  Shield,
  Search,
  BarChart3,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react';

interface AnalyticsProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

const Analytics = ({ isDarkMode = false, setIsDarkMode = () => {} }: AnalyticsProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const overallStats = {
    totalTVL: 113416942409,
    totalVolume: 23671369373,
    tvlChange: -0.7,
    volumeChange: 3.9
  };

  const chainData = [
    {
      rank: 1,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '⟠',
      category: 'layer1',
      tvl: 65120851488,
      volume24h: 928805589,
      dominance: 57.42,
      coins: 5011,
      change24h: 0.6,
      change7d: 2.8,
      change30d: 6.0,
      topGainers: ['Gud Tech', 'INFERNO', 'Titan Blaze'],
      marketCap: 420000000000,
      transactions: 1200000,
      fees: 15600000,
      validators: 520000,
      color: 'hsl(220, 95%, 55%)'
    },
    {
      rank: 2,
      name: 'Solana',
      symbol: 'SOL',
      logo: '◎',
      category: 'layer1',
      tvl: 8200000000,
      volume24h: 892000000,
      dominance: 7.2,
      coins: 1420,
      change24h: 1.8,
      change7d: 12.4,
      change30d: 28.6,
      topGainers: ['Catvax', 'Scrap', 'BONK'],
      marketCap: 85000000000,
      transactions: 3200000,
      fees: 2800000,
      validators: 1800,
      color: 'hsl(270, 95%, 60%)'
    },
    {
      rank: 3,
      name: 'Arbitrum',
      symbol: 'ARB',
      logo: '🔵',
      category: 'layer2',
      tvl: 3800000000,
      volume24h: 420000000,
      dominance: 3.4,
      coins: 890,
      change24h: -0.5,
      change7d: 2.1,
      change30d: 15.2,
      topGainers: ['GMX', 'MAGIC', 'JONES'],
      marketCap: 2100000000,
      transactions: 850000,
      fees: 120000,
      validators: 1,
      color: 'hsl(210, 95%, 60%)'
    },
    {
      rank: 4,
      name: 'Polygon',
      symbol: 'MATIC',
      logo: '🟣',
      category: 'layer2',
      tvl: 1200000000,
      volume24h: 180000000,
      dominance: 1.1,
      coins: 650,
      change24h: 0.8,
      change7d: -1.2,
      change30d: 8.9,
      topGainers: ['QUICK', 'GHST', 'SAND'],
      marketCap: 8500000000,
      transactions: 4100000,
      fees: 450000,
      validators: 100,
      color: 'hsl(270, 95%, 65%)'
    },
    {
      rank: 5,
      name: 'Optimism',
      symbol: 'OP',
      logo: '🔴',
      category: 'layer2',
      tvl: 950000000,
      volume24h: 85000000,
      dominance: 0.8,
      coins: 340,
      change24h: 2.1,
      change7d: 8.7,
      change30d: 19.3,
      topGainers: ['SNX', 'PERP', 'LYRA'],
      marketCap: 3200000000,
      transactions: 620000,
      fees: 95000,
      validators: 1,
      color: 'hsl(0, 95%, 60%)'
    },
    {
      rank: 6,
      name: 'Base',
      symbol: 'BASE',
      logo: '🔷',
      category: 'layer2',
      tvl: 850000000,
      volume24h: 120000000,
      dominance: 0.7,
      coins: 280,
      change24h: 3.2,
      change7d: 15.8,
      change30d: 42.1,
      topGainers: ['DEGEN', 'HIGHER', 'BRETT'],
      marketCap: 1800000000,
      transactions: 950000,
      fees: 180000,
      validators: 1,
      color: 'hsl(210, 85%, 55%)'
    },
    {
      rank: 7,
      name: 'Avalanche',
      symbol: 'AVAX',
      logo: '❄️',
      category: 'layer1',
      tvl: 720000000,
      volume24h: 95000000,
      dominance: 0.6,
      coins: 280,
      change24h: -1.2,
      change7d: 4.8,
      change30d: 12.4,
      topGainers: ['JOE', 'PNG', 'QI'],
      marketCap: 12000000000,
      transactions: 1100000,
      fees: 890000,
      validators: 1200,
      color: 'hsl(0, 85%, 55%)'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Chains' },
    { value: 'layer1', label: 'Layer 1' },
    { value: 'layer2', label: 'Layer 2' },
    { value: 'layer3', label: 'Layer 3' }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toLocaleString();
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const filteredChains = chainData.filter(chain => {
    const matchesCategory = selectedCategory === 'all' || chain.category === selectedCategory;
    const matchesSearch = chain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chain.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <div className="relative">
        {/* Binance-style background */}
        <div className="absolute inset-0 bg-background" />
        
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Top Blockchains by Total Value Locked (TVL)</h1>
          <p className="text-lg text-muted-foreground">
            With a Total Value Locked (TVL) of {formatCurrency(chainData[0].tvl)}, Ethereum has the largest market share across all blockchains today. 
            Collectively the TVL of all chains is worth {formatCurrency(overallStats.totalTVL)}, representing a {formatPercentage(overallStats.tvlChange)} movement in the last 24 hours.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Value Locked</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(overallStats.totalTVL)}</p>
                  <div className={`flex items-center text-sm mt-2 ${overallStats.tvlChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {overallStats.tvlChange >= 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                    {formatPercentage(Math.abs(overallStats.tvlChange))}
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-primary opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">24h Trading Volume</p>
                  <p className="text-3xl font-bold text-success">{formatCurrency(overallStats.totalVolume)}</p>
                  <div className={`flex items-center text-sm mt-2 ${overallStats.volumeChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {overallStats.volumeChange >= 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                    {formatPercentage(overallStats.volumeChange)}
                  </div>
                </div>
                <Activity className="h-12 w-12 text-success opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Chains Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Blockchain Rankings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">#</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Chain</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Top Gainers</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">24h</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">7d</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">30d</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">24h Volume</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">TVL</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Dominance</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground"># of Coins</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Last 7 Days</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChains.map((chain) => (
                    <tr key={chain.rank} className="border-b border-border hover:bg-muted/50 transition-colors group">
                      <td className="py-4 px-2 text-sm font-medium">{chain.rank}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{chain.logo}</div>
                          <div>
                            <div className="font-medium text-sm group-hover:text-primary transition-colors">{chain.name}</div>
                            <div className="text-xs text-muted-foreground">{chain.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex flex-wrap gap-1 max-w-32">
                          {chain.topGainers.slice(0, 2).map((gainer, index) => (
                            <Badge key={index} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                              {gainer}
                            </Badge>
                          ))}
                          {chain.topGainers.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{chain.topGainers.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className={`py-4 px-2 text-right text-sm font-medium ${chain.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {formatPercentage(chain.change24h)}
                      </td>
                      <td className={`py-4 px-2 text-right text-sm font-medium ${chain.change7d >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {formatPercentage(chain.change7d)}
                      </td>
                      <td className={`py-4 px-2 text-right text-sm font-medium ${chain.change30d >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {formatPercentage(chain.change30d)}
                      </td>
                      <td className="py-4 px-2 text-right text-sm font-medium">
                        {formatCurrency(chain.volume24h)}
                      </td>
                      <td className="py-4 px-2 text-right text-sm font-bold">
                        {formatCurrency(chain.tvl)}
                      </td>
                      <td className="py-4 px-2 text-right text-sm font-medium">
                        {chain.dominance}%
                      </td>
                      <td className="py-4 px-2 text-right text-sm">
                        {chain.coins.toLocaleString()}
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className="w-16 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <TrendingUp className={`h-4 w-4 ${chain.change7d >= 0 ? 'text-success' : 'text-destructive'}`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Network Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chainData.slice(0, 4).map((chain) => (
                  <div key={chain.name} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{chain.logo}</span>
                      <div>
                        <div className="font-medium text-sm">{chain.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatNumber(chain.transactions)} TPS
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{formatCurrency(chain.fees)}</div>
                      <div className="text-xs text-muted-foreground">Daily Fees</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chainData.slice(0, 4).map((chain) => (
                  <div key={chain.name} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{chain.logo}</span>
                      <div>
                        <div className="font-medium text-sm">{chain.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatNumber(chain.validators)} Validators
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-success border-success">
                        Secure
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Ecosystem Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">Total Chains Tracked</span>
                  <span className="font-bold text-primary">150+</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">Active Projects</span>
                  <span className="font-bold text-success">8,592</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">24h Transactions</span>
                  <span className="font-bold text-accent">12.5M</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">Total Market Cap</span>
                  <span className="font-bold text-warning">$2.8T</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Market Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="text-sm font-medium mb-2 text-primary">Layer 2 Expansion</div>
                <div className="text-xs text-muted-foreground">
                  Layer 2 solutions continue explosive growth with Base leading at 42.1% monthly increase, driving scalability solutions adoption.
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-success/5 to-success/10">
                <div className="text-sm font-medium mb-2 text-success">Ethereum Dominance</div>
                <div className="text-xs text-muted-foreground">
                  Ethereum maintains overwhelming leadership with 57.4% TVL dominance, showcasing its established ecosystem maturity.
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-accent/5 to-accent/10">
                <div className="text-sm font-medium mb-2 text-accent">Solana Momentum</div>
                <div className="text-xs text-muted-foreground">
                  Solana demonstrates robust recovery with 28.6% monthly growth and increasing developer activity across DeFi protocols.
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

export default Analytics;