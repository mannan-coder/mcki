import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, Bell, Calculator, Newspaper, Activity } from 'lucide-react';

/**
 * ContentEnhancer - Adds rich, SEO-friendly content sections to pages
 * Helps meet Google AdSense requirements for substantial original content
 */
export const ContentEnhancer = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-Time Market Data',
      description: 'Track cryptocurrency prices, market cap, and trading volumes across 150+ exchanges with live updates every 30 seconds. Our platform aggregates data from major exchanges including Binance, Coinbase, Kraken, and more.',
      link: '/market',
      linkText: 'View Market Overview'
    },
    {
      icon: BarChart3,
      title: 'Arbitrage Scanner',
      description: 'Discover profitable arbitrage opportunities across multiple exchanges. Our advanced algorithms identify price discrepancies in real-time, helping traders capitalize on market inefficiencies with detailed profit calculations.',
      link: '/arbitrage',
      linkText: 'Explore Arbitrage Opportunities'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Stay informed with customizable alerts for price movements, arbitrage opportunities, and market events. Never miss a trading opportunity with our intelligent notification system that monitors markets 24/7.',
      link: '/alerts',
      linkText: 'Set Up Alerts'
    },
    {
      icon: Calculator,
      title: 'Trading Calculators',
      description: 'Professional trading tools including profit calculators, risk management tools, and portfolio analyzers. Make informed decisions with accurate calculations for fees, slippage, and potential returns.',
      link: '/tools',
      linkText: 'Access Trading Tools'
    },
    {
      icon: Newspaper,
      title: 'Crypto News & Analysis',
      description: 'Stay updated with the latest cryptocurrency news, market analysis, and expert insights. Our curated news feed brings you breaking news and in-depth analysis from trusted sources in the crypto industry.',
      link: '/news',
      linkText: 'Read Latest News'
    },
    {
      icon: Activity,
      title: 'Chain Analytics',
      description: 'Deep blockchain analytics including on-chain metrics, whale movements, and transaction analysis. Understand market dynamics through comprehensive blockchain data analysis and visualization.',
      link: '/chain-analytics',
      linkText: 'View Chain Analytics'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Crypto Intelligence Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            MCKI provides professional-grade cryptocurrency trading tools and market intelligence. 
            Our platform combines real-time data, advanced analytics, and automated monitoring to 
            help traders and investors make informed decisions in the dynamic crypto market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  to={feature.link}
                  className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center gap-2 transition-colors"
                >
                  {feature.linkText}
                  <span aria-hidden="true">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Why Choose MCKI for Crypto Trading?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Real-Time Data Accuracy</h4>
              <p className="text-sm">
                Our platform updates cryptocurrency prices and market data every 30 seconds, ensuring you always 
                have access to the most current information. We source data directly from exchange APIs, providing 
                reliable and accurate market intelligence for your trading decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Multi-Exchange Coverage</h4>
              <p className="text-sm">
                Monitor prices and trading opportunities across 150+ cryptocurrency exchanges worldwide. Our 
                comprehensive coverage includes major platforms like Binance, Coinbase Pro, Kraken, KuCoin, 
                and many more, giving you a complete view of the global crypto market.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Advanced Analytics</h4>
              <p className="text-sm">
                Access professional-grade analytics including technical indicators, market sentiment analysis, 
                on-chain metrics, and whale tracking. Our advanced tools help you identify trends, understand 
                market movements, and make data-driven trading decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">24/7 Market Monitoring</h4>
              <p className="text-sm">
                The cryptocurrency market never sleeps, and neither does MCKI. Our automated monitoring systems 
                track markets around the clock, alerting you to significant price movements, arbitrage opportunities, 
                and important market events as they happen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
