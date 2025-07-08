import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Globe, Activity } from 'lucide-react';

interface AnalyticsProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

const Analytics = ({ isDarkMode = false, setIsDarkMode = () => {} }: AnalyticsProps) => {
  const analyticsOptions = [
    {
      title: 'Chain Analytics',
      description: 'Comprehensive blockchain analytics and insights',
      icon: BarChart3,
      href: '/chain-analytics',
      color: 'hsl(var(--primary))'
    },
    {
      title: 'Market Analytics',
      description: 'Real-time market data and trends',
      icon: TrendingUp,
      href: '/market',
      color: 'hsl(var(--success))'
    },
    {
      title: 'Global Overview',
      description: 'Worldwide crypto market overview',
      icon: Globe,
      href: '/',
      color: 'hsl(var(--accent))'
    },
    {
      title: 'Activity Monitor',
      description: 'Live blockchain activity tracking',
      icon: Activity,
      href: '/arbitrage',
      color: 'hsl(var(--secondary))'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Analytics Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analytics platform for cryptocurrency markets, blockchain data, and trading insights
          </p>
        </div>

        {/* Analytics Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {analyticsOptions.map((option, index) => (
            <Link key={index} to={option.href} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-border hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${option.color}15`, border: `1px solid ${option.color}30` }}
                    >
                      <option.icon 
                        className="h-8 w-8" 
                        style={{ color: option.color }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {option.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">2,847</div>
                <div className="text-sm text-muted-foreground">Active Chains</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-success">$1.2T</div>
                <div className="text-sm text-muted-foreground">Total TVL</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">45,892</div>
                <div className="text-sm text-muted-foreground">Daily Transactions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-warning">156</div>
                <div className="text-sm text-muted-foreground">Active Protocols</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;