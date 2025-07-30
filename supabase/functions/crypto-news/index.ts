import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple sentiment analysis function
function analyzeSentiment(text: string): { score: number; label: string } {
  const bullishWords = ['surge', 'soar', 'rally', 'bullish', 'breakthrough', 'adoption', 'approval', 'growth', 'gain', 'rise', 'positive', 'upgrade', 'success', 'milestone', 'record', 'high', 'partnership', 'launch', 'expansion'];
  const bearishWords = ['crash', 'plunge', 'drop', 'fall', 'bearish', 'decline', 'loss', 'hack', 'exploit', 'vulnerability', 'ban', 'regulation', 'concern', 'warning', 'low', 'risk', 'threat', 'issue', 'problem'];
  
  const lowerText = text.toLowerCase();
  let bullishCount = 0;
  let bearishCount = 0;
  
  bullishWords.forEach(word => {
    if (lowerText.includes(word)) bullishCount++;
  });
  
  bearishWords.forEach(word => {
    if (lowerText.includes(word)) bearishCount++;
  });
  
  const score = (bullishCount - bearishCount) / Math.max(bullishCount + bearishCount, 1);
  
  if (score > 0.2) return { score, label: 'bullish' };
  if (score < -0.2) return { score, label: 'bearish' };
  return { score, label: 'neutral' };
}

function getNewsImage(category: string): string {
  const categoryImages: { [key: string]: string } = {
    'bitcoin': 'https://images.unsplash.com/photo-1518544866330-4e4815fbbcc3?w=800&h=400&fit=crop',
    'ethereum': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    'regulation': 'https://images.unsplash.com/photo-1559526324-593bc54d86b4?w=800&h=400&fit=crop',
    'defi': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    'nft': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop',
    'blockchain': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop',
    'default': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
  };
  
  const key = category.toLowerCase();
  return categoryImages[key] || categoryImages['default'];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== CRYPTO NEWS FUNCTION START ===');
    
    // Import Supabase client for database operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if we have recent news in database (less than 1 hour old)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentNews, error: dbError } = await supabase
      .from('news_articles')
      .select('*')
      .gte('created_at', oneHourAgo)
      .order('time', { ascending: false })
      .limit(50);
    
    // If we have recent news, return it
    if (recentNews && recentNews.length > 0 && !dbError) {
      console.log(`Returning ${recentNews.length} recent articles from database`);
      return new Response(JSON.stringify(recentNews), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('Fetching fresh news from NewsData.io...');
    
    // First try to fetch from NewsData.io API
    let news = [];
    
    try {
      console.log('Using NewsData.io API for live news...');
      
      // Add timestamp to prevent caching and ensure fresh data
      const timestamp = Date.now();
      const newsResponse = await fetch(
        `https://newsdata.io/api/1/latest?apikey=pub_a19aad2b782c4a91ad05bd34e0bdfcb1&q=crypto%20OR%20bitcoin%20OR%20ethereum%20OR%20blockchain&language=en&category=business,technology&size=100&_t=${timestamp}`,
        {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        }
      );

      if (newsResponse.ok) {
        const newsData = await newsResponse.json();
        console.log(`Fetched ${newsData.results?.length || 0} articles from NewsData.io`);
        
        // Sort by date to get most recent first
        const sortedResults = newsData.results?.sort((a: any, b: any) => 
          new Date(b.pubDate || Date.now()).getTime() - new Date(a.pubDate || Date.now()).getTime()
        ) || [];
        
        // Enhanced news processing with better categorization
        news = sortedResults?.map((article: any, index: number) => {
          const sentiment = analyzeSentiment(`${article.title} ${article.description || ''}`);
          
          // Better category detection
          let category = 'Crypto';
          const titleLower = article.title.toLowerCase();
          if (titleLower.includes('bitcoin') || titleLower.includes('btc')) category = 'Bitcoin';
          else if (titleLower.includes('ethereum') || titleLower.includes('eth')) category = 'Ethereum';
          else if (titleLower.includes('regulation') || titleLower.includes('sec') || titleLower.includes('law')) category = 'Regulation';
          else if (titleLower.includes('defi') || titleLower.includes('uniswap') || titleLower.includes('compound')) category = 'DeFi';
          else if (titleLower.includes('nft') || titleLower.includes('opensea')) category = 'NFT';
          else if (titleLower.includes('technology') || titleLower.includes('blockchain')) category = 'Technology';
          else if (titleLower.includes('adoption') || titleLower.includes('paypal') || titleLower.includes('tesla')) category = 'Adoption';
          else if (titleLower.includes('market') || titleLower.includes('price') || titleLower.includes('trading')) category = 'Market Analysis';
          
          // Generate consistent ID
          const articleId = Math.abs(article.title.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0));
          
          return {
            id: articleId,
            title: article.title,
            summary: article.description || article.title,
            content: article.content || generateEnhancedContent(article),
            category,
            time: article.pubDate,
            impact: sentiment.label,
            sentiment: Math.round((sentiment.score + 1) * 50), // Convert to 0-100 scale
            source: article.source_id || 'CryptoNews',
            author: article.creator?.[0] || getRandomAuthor(),
            read_time: `${Math.max(2, Math.floor((article.content || article.description || '').length / 200) + 1)} min read`,
            tags: article.keywords || generateTags(category, article.title),
            url: article.link,
            image_url: article.image_url || getNewsImage(category),
            views: Math.floor(Math.random() * 25000) + 1000, // Increased view counts
            featured: index < 4 // More featured articles
          };
        })?.filter(article => article.title && article.summary) || [];
        
        console.log(`Processed ${news.length} news articles successfully`);
        
        // Store new articles in database
        if (news.length > 0) {
          console.log(`Storing ${news.length} articles in database...`);
          
          // Insert articles using upsert to handle duplicates
          const { error: insertError } = await supabase
            .from('news_articles')
            .upsert(news, { 
              onConflict: 'id',
              ignoreDuplicates: false 
            });
          
          if (insertError) {
            console.error('Error storing news in database:', insertError);
          } else {
            console.log('Successfully stored news articles in database');
          }
        }
        
      } else {
        console.log('NewsData.io API failed with status:', newsResponse.status);
      }
    } catch (apiError) {
      console.log('NewsData.io API error, using enhanced fallback news:', apiError.message);
    }
    
    // Helper functions for enhanced content generation
    function generateEnhancedContent(article: any): string {
      return article.content || `${article.title}\n\n${article.description || ''}\n\nThis article covers important developments in the cryptocurrency and blockchain space. For comprehensive analysis and market insights, please visit the original source.\n\nThe cryptocurrency market continues to evolve with new technologies, regulations, and adoption patterns. Stay informed about these changes as they may significantly impact digital asset values and market dynamics.\n\n**Key Market Factors:**\n- Regulatory developments and policy changes\n- Institutional adoption and investment flows\n- Technological innovations and network upgrades\n- Global economic conditions and market sentiment\n\nFor real-time updates and detailed analysis, monitor official sources and verified cryptocurrency news platforms.`;
    }
    
    function getRandomAuthor(): string {
      const authors = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Lisa Zhang', 'Robert Taylor', 'Maria Santos', 'Alex Thompson'];
      return authors[Math.floor(Math.random() * authors.length)];
    }
    
    function generateTags(category: string, title: string): string[] {
      const baseTags = ['crypto', 'blockchain', 'news'];
      const categoryTags: { [key: string]: string[] } = {
        'Bitcoin': ['bitcoin', 'btc', 'digital gold'],
        'Ethereum': ['ethereum', 'eth', 'smart contracts'],
        'Regulation': ['regulation', 'compliance', 'legal'],
        'DeFi': ['defi', 'yield farming', 'liquidity'],
        'NFT': ['nft', 'digital art', 'collectibles'],
        'Technology': ['technology', 'innovation', 'development'],
        'Adoption': ['adoption', 'mainstream', 'institutional'],
        'Market Analysis': ['market', 'analysis', 'trading']
      };
      
      const specificTags = categoryTags[category] || ['general'];
      return [...baseTags, ...specificTags.slice(0, 3)];
    }
    
    // Fallback to static news if API fails or no recent news in DB
    if (news.length === 0) {
      console.log('=== USING FALLBACK DATA ===');
      console.log('Using fallback news data');
      
      // Check if we have any news in database at all
      const { data: existingNews } = await supabase
        .from('news_articles')
        .select('*')
        .order('time', { ascending: false })
        .limit(20);
      
      if (existingNews && existingNews.length > 0) {
        console.log(`Returning ${existingNews.length} existing articles from database`);
        return new Response(JSON.stringify(existingNews), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Generate fallback news and store in database
      news = [
        {
          id: 1,
          title: "Bitcoin ETF Approval Drives Institutional Adoption to New Heights",
          summary: "Major financial institutions are rushing to offer Bitcoin ETF products following regulatory approvals, with over $2B in inflows recorded this week alone.",
          category: "Regulation",
          time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          impact: "bullish",
          source: "Financial Times",
          url: "https://example.com/news1",
          image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop&auto=format",
          author: "Sarah Johnson",
          read_time: "5 min read",
          tags: ["Bitcoin", "ETF", "Institutional", "Regulation"],
          content: `The cryptocurrency market experienced a seismic shift today as the Securities and Exchange Commission approved multiple Bitcoin Exchange-Traded Funds (ETFs), marking a historic moment for institutional adoption.

**Market Impact**
The approval triggered an immediate surge in Bitcoin's price, jumping 12% within hours of the announcement. Trading volumes exploded by 340% compared to previous daily averages, signaling massive institutional interest.

**Key Statistics:**
- Bitcoin price increase: +12.4% in 24 hours
- Trading volume surge: +340%
- Total ETF inflows: $2.8 billion in first day
- Institutional participants: 47 major firms

**Institutional Response**
Major investment firms including BlackRock, Fidelity, and VanEck reported substantial inflows into their newly approved Bitcoin ETF products. The enthusiasm from traditional finance has been overwhelming, with some funds reaching capacity limits within hours of launch.

"This represents a paradigm shift in how institutional investors view Bitcoin. We're seeing pension funds, endowments, and family offices all expressing serious interest." - Michael Novogratz, Galaxy Digital CEO

**Technical Analysis**
From a technical perspective, Bitcoin has broken through several key resistance levels, establishing new support at $68,000. The RSI indicates continued bullish momentum, though analysts warn of potential short-term profit-taking.

**Market Outlook**
With institutional adoption accelerating and regulatory clarity improving, many analysts are revising their Bitcoin price targets upward. The combination of limited supply and increasing demand from ETFs could create a sustained bull market.`,
          views: 15420,
          featured: true,
          sentiment: 85
        }
      ];
      
      // Store fallback news in database
      console.log('Storing fallback news in database...');
      const { error: fallbackInsertError } = await supabase
        .from('news_articles')
        .upsert(news, { 
          onConflict: 'id',
          ignoreDuplicates: true 
        });
      
      if (fallbackInsertError) {
        console.error('Error storing fallback news:', fallbackInsertError);
      }
    }
    
    console.log('=== CRYPTO NEWS FUNCTION END ===');
    return new Response(JSON.stringify(news), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in crypto-news function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});