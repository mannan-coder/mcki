import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users, Code, Briefcase, HeartHandshake } from 'lucide-react';

const Careers = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Market-leading compensation packages with equity options"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work-life balance with flexible remote work options"
    },
    {
      icon: HeartHandshake,
      title: "Health Benefits",
      description: "Comprehensive health, dental, and vision coverage"
    },
    {
      icon: Code,
      title: "Learning Budget",
      description: "Annual budget for conferences, courses, and skill development"
    }
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior Blockchain Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$140k - $180k",
      experience: "5+ years",
      description: "Join our engineering team to build cutting-edge blockchain integrations and arbitrage algorithms.",
      requirements: [
        "5+ years of blockchain development experience",
        "Proficiency in Solidity, Web3.js, and Ethereum ecosystem",
        "Experience with DeFi protocols and smart contracts",
        "Strong background in TypeScript/JavaScript"
      ]
    },
    {
      id: 2,
      title: "Data Scientist - Trading Analytics",
      department: "Research",
      location: "Remote / New York",
      type: "Full-time",
      salary: "$120k - $160k",
      experience: "3+ years",
      description: "Develop machine learning models for crypto market analysis and arbitrage opportunity detection.",
      requirements: [
        "PhD or Master's in Computer Science, Statistics, or related field",
        "Experience with Python, pandas, scikit-learn, TensorFlow",
        "Knowledge of financial markets and trading strategies",
        "Strong statistical analysis and modeling skills"
      ]
    },
    {
      id: 3,
      title: "Product Designer",
      department: "Design",
      location: "Remote / London",
      type: "Full-time",
      salary: "$90k - $120k",
      experience: "3+ years",
      description: "Design intuitive user experiences for our crypto trading platform and mobile applications.",
      requirements: [
        "3+ years of product design experience",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Experience with fintech or trading platforms",
        "Strong understanding of user-centered design principles"
      ]
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      experience: "4+ years",
      description: "Manage and scale our cloud infrastructure to handle high-frequency trading data and analytics.",
      requirements: [
        "4+ years of DevOps/SRE experience",
        "Experience with AWS, Docker, Kubernetes",
        "Knowledge of monitoring and observability tools",
        "Strong scripting skills in Python, Bash, or Go"
      ]
    }
  ];

  return (
    <Layout>
      <SEOHead 
        title="Careers - Join MCKI Team"
        description="Join MCKI and help revolutionize cryptocurrency arbitrage trading. Explore career opportunities in blockchain, AI, and fintech."
        keywords={["careers", "jobs", "blockchain jobs", "crypto careers", "fintech careers", "MCKI jobs"]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us revolutionize cryptocurrency trading with cutting-edge technology and innovative solutions.
          </p>
        </div>

        {/* Company Culture */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Why Work at MCKI?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge variant="secondary">{job.department}</Badge>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </span>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Don't see the right role?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to MCKI's mission.
            </p>
            <Button size="lg">
              Send Your Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Careers;