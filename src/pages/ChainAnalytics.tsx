import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, Search, TrendingUp, TrendingDown, BarChart3, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';

interface ChainAnalyticsProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

const ChainAnalytics = ({ isDarkMode = false, setIsDarkMode = () => {} }: ChainAnalyticsProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: 'All Chains', value: 'all' },
    { label: 'Layer 1', value: 'layer1' },
    { label: 'Layer 2', value: 'layer2' },
    { label: 'Layer 3', value: 'layer3' }
  ];

  const overallStats = {
    totalTVL: 113243319550,
    totalVolume: 23201154778,
    tvlChange: -0.2,
    volumeChange: 0.0
  };

  const chainData = [
    {
      rank: 1,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '⟠',
      category: 'layer1',
      tvl: 64884034780,
      volume24h: 1232325799,
      dominance: 57.3,
      coins: 5012,
      change24h: 0.2,
      change7d: 4.2,
      change30d: 7.5,
      topGainers: ['Mineable', 'INFERNO', 'PAWZONE']
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
      topGainers: ['Catvax', 'Scrap', 'BONK']
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
      topGainers: ['GMX', 'MAGIC', 'JONES']
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
      topGainers: ['QUICK', 'GHST', 'SAND']
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
      topGainers: ['SNX', 'PERP', 'LYRA']
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
      topGainers: ['DEGEN', 'HIGHER', 'BRETT']
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toLocaleString()}`;
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Top Blockchains by Total Value Locked (TVL)</h1>
          <p className="text-lg text-muted-foreground">
            With a Total Value Locked (TVL) of ${formatNumber(overallStats.totalTVL)}, Ethereum has the largest market share across all blockchains today.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(overallStats.totalTVL)}</div>
              <p className={`text-xs flex items-center ${overallStats.tvlChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {overallStats.tvlChange >= 0 ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                {formatPercentage(overallStats.tvlChange)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h Trading Volume</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(overallStats.totalVolume)}</div>
              <p className={`text-xs flex items-center ${overallStats.volumeChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {overallStats.volumeChange >= 0 ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                {formatPercentage(overallStats.volumeChange)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
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
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value} className="text-xs">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Chains Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Rankings</CardTitle>
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
                  </tr>
                </thead>
                <tbody>
                  {filteredChains.map((chain) => (
                    <tr key={chain.rank} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-2 text-sm">{chain.rank}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{chain.logo}</div>
                          <div>
                            <div className="font-medium text-sm">{chain.name}</div>
                            <div className="text-xs text-muted-foreground">{chain.symbol}</div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {chain.category}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex flex-wrap gap-1">
                          {chain.topGainers.slice(0, 2).map((gainer, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
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
                      <td className={`py-4 px-2 text-right text-sm ${chain.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {formatPercentage(chain.change24h)}
                      </td>
                      <td className={`py-4 px-2 text-right text-sm ${chain.change7d >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {formatPercentage(chain.change7d)}
                      </td>
                      <td className={`py-4 px-2 text-right text-sm ${chain.change30d >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {formatPercentage(chain.change30d)}
                      </td>
                      <td className="py-4 px-2 text-right text-sm font-medium">
                        {formatNumber(chain.volume24h)}
                      </td>
                      <td className="py-4 px-2 text-right text-sm font-medium">
                        {formatNumber(chain.tvl)}
                      </td>
                      <td className="py-4 px-2 text-right text-sm">
                        {chain.dominance}%
                      </td>
                      <td className="py-4 px-2 text-right text-sm">
                        {chain.coins.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Market Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="text-sm font-medium mb-2">Layer 2 Growth</div>
                  <div className="text-xs text-muted-foreground">
                    Layer 2 solutions continue to gain traction with Base showing 42.1% growth over 30 days
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="text-sm font-medium mb-2">Ethereum Dominance</div>
                  <div className="text-xs text-muted-foreground">
                    Ethereum maintains its leadership with 57.3% TVL dominance across all chains
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="text-sm font-medium mb-2">Solana Recovery</div>
                  <div className="text-xs text-muted-foreground">
                    Solana shows strong momentum with 28.6% growth and increasing ecosystem activity
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Ecosystem Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">Total Chains Tracked</span>
                  <span className="font-bold">150+</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">Active Projects</span>
                  <span className="font-bold">8,592</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">24h Transactions</span>
                  <span className="font-bold">12.5M</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <span className="text-sm font-medium">Market Cap</span>
                  <span className="font-bold">$2.8T</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChainAnalytics;