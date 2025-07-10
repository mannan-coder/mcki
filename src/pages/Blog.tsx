import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, User, ArrowRight, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';
import { useBlogData, BlogPost } from '@/hooks/useBlogData';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useState } from 'react';

const Blog = () => {
  const {
    blogData,
    loading,
    loadingMore,
    error,
    selectedCategory,
    loadMore,
    changeCategory,
    refresh,
    hasMore
  } = useBlogData();
  
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const openArticle = (post: BlogPost) => {
    setSelectedArticle(post);
  };

  // Loading skeleton component
  const BlogSkeleton = () => (
    <div className="space-y-8">
      {/* Featured post skeleton */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <div className="p-8 space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </Card>

      {/* Grid posts skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <SEOHead 
        title="Blog - Live Crypto Trading Insights & News"
        description="Latest real-time insights, analysis, and educational content about cryptocurrency arbitrage trading, market trends, and blockchain technology."
        keywords={["crypto news", "live crypto blog", "arbitrage insights", "trading analysis", "blockchain education", "cryptocurrency market"]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MCKI Live Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights, analysis, and educational content about cryptocurrency arbitrage trading and market intelligence.
          </p>
          
          {/* Refresh button */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={refresh}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-8 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error} - Showing available content.
            </AlertDescription>
          </Alert>
        )}

        {/* Categories Filter */}
        {blogData?.categories && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {blogData.categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => changeCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && !blogData && <BlogSkeleton />}

        {/* Content */}
        {selectedArticle ? (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedArticle(null)}
              className="mb-8 gap-2"
            >
              ← Back to Blog
            </Button>
            
            <article className="prose prose-lg max-w-none dark:prose-invert">
              {selectedArticle.image_url && (
                <img 
                  src={selectedArticle.image_url} 
                  alt={selectedArticle.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
                />
              )}
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <Badge variant="secondary">{selectedArticle.category}</Badge>
                <span>{formatDate(selectedArticle.published_at)}</span>
                <span>•</span>
                <span>{selectedArticle.read_time}</span>
                <span>•</span>
                <span>By {selectedArticle.source_name}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{selectedArticle.title}</h1>
              
              <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {selectedArticle.description}
              </div>
              
              <div className="prose-content" dangerouslySetInnerHTML={{ 
                __html: selectedArticle.content.replace(/\n/g, '<br>') 
              }} />
              
              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Read the full article at:</p>
                <a 
                  href={selectedArticle.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  {selectedArticle.source_name} <ExternalLink className="inline h-4 w-4" />
                </a>
              </div>
            </article>
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            {blogData.posts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="mb-12 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => openArticle(post)}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center overflow-hidden">
                    {post.image_url ? (
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="text-center relative z-10">
                      <Badge className="mb-4">Featured Article</Badge>
                      <h2 className="text-2xl font-bold mb-4 line-clamp-3">{post.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.source_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.read_time}
                      </span>
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs">{formatDate(post.published_at)}</span>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                      {truncateText(post.description)}
                    </p>
                    <Button className="gap-2 group-hover:bg-primary/90 transition-colors">
                      Read Full Article <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogData.posts.filter(post => !post.featured).map((post) => (
                <Card 
                  key={post.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col" 
                  onClick={() => openArticle(post)}
                >
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.parentElement?.remove();
                        }}
                      />
                    </div>
                  )}
                  
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(post.published_at)}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3 flex-1">
                      {truncateText(post.description)}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.source_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.read_time}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
                        Read <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {blogData && blogData.posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try selecting a different category or refreshing the page.
            </p>
            <Button onClick={refresh} variant="outline">
              Refresh Articles
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;