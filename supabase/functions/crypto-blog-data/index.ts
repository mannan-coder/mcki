import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  image_url?: string;
  source_name: string;
  source_url: string;
  read_time: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { page = 1, category = '', limit = 12 } = await req.json().catch(() => ({}))
    
    const newsApiKey = Deno.env.get('NEWSDATA_API_KEY')
    if (!newsApiKey) {
      throw new Error('NEWSDATA_API_KEY not configured')
    }

    // Build query parameters for crypto/blockchain news
    const baseQuery = 'cryptocurrency OR bitcoin OR blockchain OR crypto OR "digital assets" OR arbitrage OR trading'
    const categoryQuery = category && category !== 'All' ? ` AND ${category.toLowerCase()}` : ''
    const finalQuery = baseQuery + categoryQuery

    const newsUrl = new URL('https://newsdata.io/api/1/news')
    newsUrl.searchParams.set('apikey', newsApiKey)
    newsUrl.searchParams.set('q', finalQuery)
    newsUrl.searchParams.set('language', 'en')
    newsUrl.searchParams.set('category', 'business,technology')
    newsUrl.searchParams.set('country', 'us,gb,ca,au')
    newsUrl.searchParams.set('size', limit.toString())
    newsUrl.searchParams.set('page', page.toString())

    const response = await fetch(newsUrl.toString())
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform news data to blog post format
    const blogPosts: BlogPost[] = data.results?.map((article: any, index: number) => {
      // Calculate estimated read time based on content length
      const wordCount = (article.content || article.description || '').split(' ').length
      const readTime = Math.max(1, Math.ceil(wordCount / 200)) // Average reading speed: 200 words/minute
      
      // Determine category based on keywords
      let category = 'General'
      const title = (article.title || '').toLowerCase()
      const description = (article.description || '').toLowerCase()
      const content = title + ' ' + description
      
      if (content.includes('bitcoin') || content.includes('btc')) category = 'Bitcoin'
      else if (content.includes('ethereum') || content.includes('eth')) category = 'Ethereum'
      else if (content.includes('trading') || content.includes('arbitrage')) category = 'Trading'
      else if (content.includes('defi') || content.includes('decentralized')) category = 'DeFi'
      else if (content.includes('blockchain') || content.includes('technology')) category = 'Technology'
      else if (content.includes('market') || content.includes('analysis')) category = 'Analysis'
      else if (content.includes('regulation') || content.includes('legal')) category = 'Regulation'

      return {
        id: article.article_id || `${Date.now()}-${index}`,
        title: article.title || 'Untitled Article',
        description: article.description || 'No description available',
        content: article.content || article.description || 'Content not available',
        author: article.source_id || 'Unknown Author',
        published_at: article.pubDate || new Date().toISOString(),
        category,
        image_url: article.image_url,
        source_name: article.source_name || 'News Source',
        source_url: article.link || '#',
        read_time: `${readTime} min read`
      }
    }) || []

    // Add some featured flags to first few posts
    const processedPosts = blogPosts.map((post, index) => ({
      ...post,
      featured: index < 2 && page === 1 // First 2 posts on first page are featured
    }))

    return new Response(
      JSON.stringify({
        posts: processedPosts,
        total: data.totalResults || 0,
        page: parseInt(page),
        hasMore: data.nextPage !== null,
        categories: ['All', 'Bitcoin', 'Ethereum', 'Trading', 'DeFi', 'Technology', 'Analysis', 'Regulation']
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error fetching blog data:', error)
    
    // Return fallback data in case of API failure
    const fallbackPosts = [
      {
        id: 'fallback-1',
        title: 'Understanding Cryptocurrency Arbitrage: A Comprehensive Guide',
        description: 'Learn the fundamentals of crypto arbitrage trading and how to identify profitable opportunities across exchanges.',
        content: 'Comprehensive guide to cryptocurrency arbitrage trading...',
        author: 'MCKI Team',
        published_at: new Date().toISOString(),
        category: 'Education',
        source_name: 'MCKI Blog',
        source_url: '#',
        read_time: '8 min read',
        featured: true
      },
      {
        id: 'fallback-2',
        title: 'Market Analysis: Latest Crypto Trading Trends',
        description: 'Deep dive into the latest trends and opportunities in the cryptocurrency trading space.',
        content: 'Analysis of current market trends...',
        author: 'Research Team',
        published_at: new Date().toISOString(),
        category: 'Analysis',
        source_name: 'MCKI Research',
        source_url: '#',
        read_time: '6 min read',
        featured: false
      }
    ]

    return new Response(
      JSON.stringify({
        posts: fallbackPosts,
        total: 2,
        page: 1,
        hasMore: false,
        categories: ['All', 'Education', 'Analysis', 'Technology'],
        error: 'Using fallback data due to API error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  }
})