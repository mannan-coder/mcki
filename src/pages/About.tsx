import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target,
  Shield,
  Award,
  Globe,
  TrendingUp,
  Zap,
  Heart,
  Star,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security of your data and investments with enterprise-grade encryption and security protocols.'
    },
    {
      icon: Target,
      title: 'Precision & Accuracy',
      description: 'Our algorithms are tested and verified to provide the most accurate market data and arbitrage opportunities.'
    },
    {
      icon: Zap,
      title: 'Real-Time Performance',
      description: 'Lightning-fast data processing ensures you never miss a profitable opportunity in the fast-moving crypto markets.'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'We build features based on community feedback and continuously improve based on user needs.'
    }
  ];

  const achievements = [
    { metric: '500K+', label: 'Active Users', icon: Users },
    { metric: '$2.1B+', label: 'Trading Volume', icon: TrendingUp },
    { metric: '150+', label: 'Exchanges', icon: Globe },
    { metric: '99.9%', label: 'Uptime', icon: CheckCircle }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'}}>
      <div className="relative">
        <div className="absolute inset-0 bg-background" />
        
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6">About MCKI</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We're revolutionizing cryptocurrency trading with intelligent arbitrage detection, 
                advanced analytics, and professional-grade tools for traders and investors worldwide.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="outline" className="text-primary border-primary">
                  <Star className="h-3 w-3 mr-1" />
                  Established 2019
                </Badge>
                <Badge variant="outline" className="text-success border-success">
                  <Award className="h-3 w-3 mr-1" />
                  Industry Leader
                </Badge>
                <Badge variant="outline" className="text-accent border-accent">
                  <Globe className="h-3 w-3 mr-1" />
                  Global Platform
                </Badge>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Target className="h-6 w-6" />
                    <span>Our Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize access to sophisticated cryptocurrency trading tools and provide 
                    real-time arbitrage opportunities that were previously available only to institutional traders. 
                    We believe everyone should have access to professional-grade market intelligence.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-success/5 border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-success">
                    <Zap className="h-6 w-6" />
                    <span>Our Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the global standard for cryptocurrency market intelligence, 
                    enabling millions of traders to make informed decisions through cutting-edge technology, 
                    real-time data, and innovative analytical tools that drive profitable trading strategies.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                  <CardContent className="p-6">
                    <achievement.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="text-2xl font-bold text-accent mb-1">{achievement.metric}</div>
                    <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Core Values */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <value.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                    </CardHeader>
                    <CardContent className="text-center space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {member.expertise}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{member.experience}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <Card className="mb-16">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-center mx-auto">
                  <Zap className="h-6 w-6" />
                  <span>Our Technology</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border border-border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                    <h3 className="font-semibold mb-2 text-primary">Real-Time Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced algorithms process millions of data points per second across 150+ exchanges 
                      to identify arbitrage opportunities instantly.
                    </p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg bg-gradient-to-br from-success/5 to-success/10">
                    <h3 className="font-semibold mb-2 text-success">Machine Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI models continuously learn from market patterns to improve prediction accuracy 
                      and identify emerging trading opportunities.
                    </p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg bg-gradient-to-br from-accent/5 to-accent/10">
                    <h3 className="font-semibold mb-2 text-accent">Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Bank-grade encryption, multi-factor authentication, and secure API endpoints 
                      protect your data and trading activities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Ready to Start Trading Smarter?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join thousands of traders who trust MCKI for their cryptocurrency arbitrage and market analysis needs. 
                  Start your journey with professional-grade tools today.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Badge variant="outline" className="text-primary border-primary px-4 py-2">
                    <Globe className="h-4 w-4 mr-2" />
                    Global Platform
                  </Badge>
                  <Badge variant="outline" className="text-success border-success px-4 py-2">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure & Trusted
                  </Badge>
                  <Badge variant="outline" className="text-accent border-accent px-4 py-2">
                    <Award className="h-4 w-4 mr-2" />
                    Industry Leading
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;