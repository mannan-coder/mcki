-- Create news storage table for persistent news articles
CREATE TABLE IF NOT EXISTS public.news_articles (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  category TEXT,
  time TIMESTAMPTZ NOT NULL DEFAULT now(),
  impact TEXT DEFAULT 'neutral',
  source TEXT,
  author TEXT,
  read_time TEXT,
  tags TEXT[],
  url TEXT,
  image_url TEXT,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  sentiment INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (news should be public)
CREATE POLICY "News articles are publicly readable" 
ON public.news_articles 
FOR SELECT 
USING (true);

-- Create policy for insert (for API function to store news)
CREATE POLICY "Service role can insert news articles" 
ON public.news_articles 
FOR INSERT 
WITH CHECK (true);

-- Create policy for update (for API function to update news)
CREATE POLICY "Service role can update news articles" 
ON public.news_articles 
FOR UPDATE 
USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_news_articles_time ON public.news_articles(time DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON public.news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_articles_featured ON public.news_articles(featured);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();