import Layout from '@/components/Layout';
import { 
  Users, 
  Target,
  Shield,
  Globe,
  TrendingUp,
  Zap,
  CheckCircle,
  BarChart3,
  Signal,
  Calculator,
  Coins,
  Activity,
  Eye,
  Mail
} from 'lucide-react';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionVision } from '@/components/about/MissionVision';
import { TechnologySection } from '@/components/about/TechnologySection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const About = () => {
  const achievements = [
    { metric: '24/7', label: 'Exchange Scanning', icon: Activity },
    { metric: '150+', label: 'Exchanges Tracked', icon: Globe },
    { metric: 'Real-Time', label: 'Arbitrage Data', icon: TrendingUp },
    { metric: 'AI-Powered', label: 'Trading Signals', icon: Signal }
  ];

  const features = [
    {
      title: 'Real-Time Arbitrage Dashboard',
      description: 'Our platform scans top cryptocurrency exchanges 24/7 to uncover arbitrage opportunities — price differences for the same coin across platforms — allowing you to buy low and sell high instantly.',
      icon: BarChart3,
      details: [
        'Live price gaps between exchanges',
        'Buy/sell directions',
        'Estimated profit after fees',
        'Percentage return per arbitrage trade'
      ]
    },
    {
      title: 'High-Volume Coin Tracker',
      description: 'Track the coins with the highest 24-hour trading volumes across all major exchanges. Volume leads momentum — and momentum creates opportunity.',
      icon: TrendingUp,
      details: [
        'Real-time volume tracking',
        'Cross-exchange analysis',
        'Momentum indicators',
        'Market movement alerts'
      ]
    },
    {
      title: 'Actionable Crypto Signals',
      description: 'Receive AI-assisted trading signals powered by volume spikes, market momentum, and technical analysis for both swing trading and short-term setups.',
      icon: Signal,
      details: [
        'Entry and exit points',
        'Breakout patterns',
        'Trend reversals',
        'Volume-led movements'
      ]
    },
    {
      title: 'Coin Detail Pages',
      description: 'Access comprehensive coin-specific dashboards with real-time prices, market pairs, volume trends, and supported exchanges.',
      icon: Coins,
      details: [
        'Real-time prices',
        'Market pairs analysis',
        'Volume trends',
        'Exchange comparisons'
      ]
    },
    {
      title: 'Market Movers & New Listings',
      description: 'Track daily top gainers, top losers, newly listed coins, and trending assets. Filter by exchange or price movement.',
      icon: Eye,
      details: [
        'Top gainers/losers',
        'New listings tracking',
        'Trending assets',
        'Exchange filtering'
      ]
    },
    {
      title: 'Complete Crypto Calculator Suite',
      description: 'Plan your trades with precision using comprehensive calculators for arbitrage profit, trading fees, break-even analysis, and ROI.',
      icon: Calculator,
      details: [
        'Arbitrage Profit Calculator',
        'Trading Fee Estimator',
        'Break-Even Calculator',
        'ROI & Currency Conversion'
      ]
    }
  ];

  const techFeatures = [
    {
      title: 'Real-Time Processing',
      description: 'Advanced algorithms process millions of data points per second across 150+ exchanges to identify arbitrage opportunities instantly.',
      gradient: 'bg-gradient-to-br from-primary/5 to-primary/10',
      textColor: 'text-primary'
    },
    {
      title: 'Machine Learning',
      description: 'Our AI models continuously learn from market patterns to improve prediction accuracy and identify emerging trading opportunities.',
      gradient: 'bg-gradient-to-br from-success/5 to-success/10',
      textColor: 'text-success'
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, multi-factor authentication, and secure API endpoints protect your data and trading activities.',
      gradient: 'bg-gradient-to-br from-accent/5 to-accent/10',
      textColor: 'text-accent'
    }
  ];

  const mission = {
    icon: Target,
    title: 'Our Mission',
    content: 'To democratize access to advanced trading data and make arbitrage intelligence, crypto signals, and high-frequency analysis accessible to everyone, everywhere. We believe crypto markets should be transparent and accessible to all — not just insiders.'
  };

  const vision = {
    icon: Zap,
    title: 'Our Vision',
    content: 'To become the world\'s leading platform for crypto arbitrage tracking, data intelligence, and smart trading tools — simplifying complex market data and transforming it into actionable insights.'
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <AboutHero achievements={achievements} />

        {/* Mission & Vision */}
        <MissionVision mission={mission} vision={vision} />

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Shield, title: 'Transparency', desc: 'Unfiltered data from verified sources', color: 'primary' },
            { icon: Zap, title: 'Speed', desc: 'Real-time updates with millisecond precision', color: 'success' },
            { icon: Users, title: 'Empowerment', desc: 'User-first tools designed to maximize returns', color: 'accent' }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`text-center bg-gradient-to-br from-${value.color}/5 to-${value.color}/10 border-${value.color}/20 hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6">
                  <value.icon className={`h-8 w-8 text-${value.color} mx-auto mb-3`} />
                  <div className={`text-xl font-bold text-${value.color} mb-2`}>{value.title}</div>
                  <div className="text-sm text-muted-foreground">{value.desc}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* What MCKI Offers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  What MCKI Offers
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Comprehensive crypto intelligence platform with real-time market insights, arbitrage data, trading signals, and financial tools — all in one place.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50">
                      <CardContent className="p-6">
                        <feature.icon className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-3 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        <ul className="space-y-2">
                          {feature.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-muted/50 to-muted/30">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Who We Are</h2>
              </div>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  MCKI was created by a team of crypto traders, software engineers, and financial analysts who shared one common frustration: fragmented data and missed opportunities in a rapidly evolving market.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We decided to change that — by building a platform that aggregates the most relevant data, cleans it, and delivers it to users in real time with unmatched speed and usability.
                </p>
                <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
                  <CardContent className="p-6">
                    <blockquote className="text-lg font-medium text-foreground italic">
                      "We created MCKI to give crypto users what we never had — instant clarity, real-time arbitrage insights, and smart trading tools that actually work."
                    </blockquote>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Stack */}
        <TechnologySection icon={Zap} features={techFeatures} />

        {/* Join the MCKI Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Join the MCKI Ecosystem
              </h2>
              <p className="text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                Whether you're trading full-time, managing crypto investments, or just exploring arbitrage as a new strategy — MCKI gives you the edge you've been missing.
              </p>
              <p className="text-lg font-semibold mb-6 text-foreground">
                Monitor coins. Know instantly. Profit confidently.
              </p>
              
              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">mcki.online</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-medium">contact@mcki.online</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Badge variant="outline" className="text-primary border-primary px-4 py-2 hover:bg-primary/10 transition-colors">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Real-Time Arbitrage
                </Badge>
                <Badge variant="outline" className="text-success border-success px-4 py-2 hover:bg-success/10 transition-colors">
                  <Signal className="h-4 w-4 mr-2" />
                  AI Trading Signals
                </Badge>
                <Badge variant="outline" className="text-accent border-accent px-4 py-2 hover:bg-accent/10 transition-colors">
                  <Calculator className="h-4 w-4 mr-2" />
                  Advanced Tools
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;