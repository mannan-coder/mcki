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
      {/* Hero Section with Full Width Background */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative">
          <AboutHero achievements={achievements} />
        </div>
      </section>

      {/* Main Content */}
      <div className="relative">
        {/* Mission & Vision Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MissionVision mission={mission} vision={vision} />
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                The principles that guide everything we do at MCKI
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                  <Card className="h-full text-center bg-background border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What MCKI Offers Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                What MCKI Offers
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                Comprehensive crypto intelligence platform with real-time market insights, arbitrage data, trading signals, and financial tools — all in one place.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-3">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Who We Are</h2>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <Card className="bg-background border-border">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center">
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        MCKI was created by a team of crypto traders, software engineers, and financial analysts who shared one common frustration: fragmented data and missed opportunities in a rapidly evolving market.
                      </p>
                      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                        We decided to change that — by building a platform that aggregates the most relevant data, cleans it, and delivers it to users in real time with unmatched speed and usability.
                      </p>
                      
                      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 max-w-3xl mx-auto">
                        <CardContent className="p-8">
                          <blockquote className="text-xl md:text-2xl font-medium text-foreground italic leading-relaxed">
                            "We created MCKI to give crypto users what we never had — instant clarity, real-time arbitrage insights, and smart trading tools that actually work."
                          </blockquote>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TechnologySection icon={Zap} features={techFeatures} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-background border-primary/20 shadow-2xl">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Join the MCKI Ecosystem
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                    Whether you're trading full-time, managing crypto investments, or just exploring arbitrage as a new strategy — MCKI gives you the edge you've been missing.
                  </p>
                  <p className="text-xl md:text-2xl font-bold mb-10 text-foreground">
                    Monitor coins. Know instantly. Profit confidently.
                  </p>
                  
                  {/* Contact Information */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                    <Card className="bg-muted/50 border-border/50">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">mcki.site</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50 border-border/50">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">contact@mcki.site</span>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Badge variant="outline" className="text-primary border-primary px-6 py-3 text-base hover:bg-primary/10 transition-colors">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Real-Time Arbitrage
                    </Badge>
                    <Badge variant="outline" className="text-success border-success px-6 py-3 text-base hover:bg-success/10 transition-colors">
                      <Signal className="h-5 w-5 mr-2" />
                      AI Trading Signals
                    </Badge>
                    <Badge variant="outline" className="text-accent border-accent px-6 py-3 text-base hover:bg-accent/10 transition-colors">
                      <Calculator className="h-5 w-5 mr-2" />
                      Advanced Tools
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;