import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Understanding Cryptocurrency Arbitrage: A Comprehensive Guide",
      excerpt: "Learn the fundamentals of crypto arbitrage trading and how to identify profitable opportunities across exchanges.",
      author: "MCKI Team",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Education",
      featured: true
    },
    {
      id: 2,
      title: "Market Analysis: Q4 2024 Crypto Arbitrage Trends",
      excerpt: "Deep dive into the latest arbitrage trends and market opportunities in the cryptocurrency space.",
      author: "Research Team",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Analysis"
    },
    {
      id: 3,
      title: "How AI is Revolutionizing Crypto Trading",
      excerpt: "Exploring the role of artificial intelligence in modern cryptocurrency trading and arbitrage strategies.",
      author: "Tech Team",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Technology"
    },
    {
      id: 4,
      title: "Risk Management in Arbitrage Trading",
      excerpt: "Essential strategies for managing risk while maximizing profits in cryptocurrency arbitrage.",
      author: "MCKI Team",
      date: "2023-12-28",
      readTime: "10 min read",
      category: "Strategy"
    },
    {
      id: 5,
      title: "Exchange Integration Best Practices",
      excerpt: "Technical insights into integrating with multiple exchanges for optimal arbitrage performance.",
      author: "Engineering Team",
      date: "2023-12-20",
      readTime: "15 min read",
      category: "Technical"
    },
    {
      id: 6,
      title: "DeFi Arbitrage Opportunities in 2024",
      excerpt: "Exploring the growing opportunities in decentralized finance arbitrage trading.",
      author: "DeFi Team",
      date: "2023-12-15",
      readTime: "9 min read",
      category: "DeFi"
    }
  ];

  const categories = ["All", "Education", "Analysis", "Technology", "Strategy", "Technical", "DeFi"];

  return (
    <Layout>
      <SEOHead 
        title="Blog - Crypto Trading Insights"
        description="Latest insights, analysis, and educational content about cryptocurrency arbitrage trading, market trends, and blockchain technology."
        keywords={["crypto blog", "arbitrage insights", "trading analysis", "blockchain education", "cryptocurrency market"]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">MCKI Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, analysis, and educational content about cryptocurrency arbitrage trading and market intelligence.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        {posts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Badge className="mb-4">Featured Post</Badge>
                  <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                <Button>
                  Read More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;