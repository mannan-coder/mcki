import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  time: string;
  impact: string;
  source: string;
  author: string;
  readTime: string;
  tags: string[];
  image: string;
  url: string;
}

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        
        const { data: result, error: fetchError } = await supabase.functions.invoke('crypto-news');
        
        if (fetchError) throw fetchError;
        
        const newsData = result?.news || [];
        const foundArticle = newsData.find((news: NewsArticle) => news.id.toString() === id);
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'bullish': return 'text-success bg-success/20 border-success/30';
      case 'bearish': return 'text-destructive bg-destructive/20 border-destructive/30';
      default: return 'text-muted-foreground bg-muted/20 border-muted';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link to="/news" className="text-primary hover:text-primary/80">
              Return to News
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link 
            to="/news" 
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to News</span>
          </Link>
        </div>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border overflow-hidden"
        >
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(article.impact)}`}>
                {article.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(article.impact)}`}>
                {article.impact.charAt(0).toUpperCase() + article.impact.slice(1)} Impact
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{new Date(article.time).toLocaleDateString()}</span>
            </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Source: {article.source}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-border">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors">
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors">
                <Bookmark size={16} />
                <span>Save</span>
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-foreground">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </Layout>
  );
};

export default NewsDetail;