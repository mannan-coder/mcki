import Layout from '@/components/Layout';
import { 
  Users, 
  Target,
  Shield,
  Globe,
  TrendingUp,
  Zap,
  CheckCircle
} from 'lucide-react';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionVision } from '@/components/about/MissionVision';
import { TeamSection } from '@/components/about/TeamSection';
import { TechnologySection } from '@/components/about/TechnologySection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const About = () => {
  const achievements = [
    { metric: '500K+', label: 'Active Users', icon: Users },
    { metric: '$2.1B+', label: 'Trading Volume', icon: TrendingUp },
    { metric: '150+', label: 'Exchanges', icon: Globe },
    { metric: '99.9%', label: 'Uptime', icon: CheckCircle }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      expertise: 'Blockchain Architecture',
      experience: '8+ years',
      description: 'Former Goldman Sachs quant trader with deep expertise in cryptocurrency markets.'
    },
    {
      name: 'Sarah Williams',
      role: 'CTO',
      expertise: 'AI & Machine Learning',
      experience: '10+ years',
      description: 'Ex-Google engineer specializing in financial AI and real-time data processing.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Research',
      expertise: 'Market Analysis',
      experience: '6+ years',
      description: 'Published researcher in cryptocurrency markets and arbitrage strategies.'
    },
    {
      name: 'Emily Zhang',
      role: 'Lead Developer',
      expertise: 'Full-Stack Development',
      experience: '7+ years',
      description: 'Blockchain developer with expertise in DeFi protocols and smart contracts.'
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
    content: 'To democratize access to sophisticated cryptocurrency trading tools and provide real-time arbitrage opportunities that were previously available only to institutional traders. We believe everyone should have access to professional-grade market intelligence.'
  };

  const vision = {
    icon: Zap,
    title: 'Our Vision',
    content: 'To become the global standard for cryptocurrency market intelligence, enabling millions of traders to make informed decisions through cutting-edge technology, real-time data, and innovative analytical tools that drive profitable trading strategies.'
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
            { icon: Shield, title: 'Security First', desc: 'Enterprise-grade security protocols', color: 'primary' },
            { icon: Target, title: 'Precision & Accuracy', desc: 'Verified algorithms and data', color: 'success' },
            { icon: Zap, title: 'Real-Time Performance', desc: 'Lightning-fast data processing', color: 'accent' }
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

        {/* Team Section */}
        <TeamSection team={team} icon={Users} />

        {/* Technology Stack */}
        <TechnologySection icon={Zap} features={techFeatures} />

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ready to Start Trading Smarter?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Join thousands of traders who trust MCKI for their cryptocurrency arbitrage and market analysis needs. 
                Start your journey with professional-grade tools today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Badge variant="outline" className="text-primary border-primary px-4 py-2 hover:bg-primary/10 transition-colors">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Platform
                </Badge>
                <Badge variant="outline" className="text-success border-success px-4 py-2 hover:bg-success/10 transition-colors">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure & Trusted
                </Badge>
                <Badge variant="outline" className="text-accent border-accent px-4 py-2 hover:bg-accent/10 transition-colors">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Industry Leading
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