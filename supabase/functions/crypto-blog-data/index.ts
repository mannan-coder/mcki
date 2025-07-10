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
    newsUrl.searchParams.set('size', Math.min(50, limit).toString()) // Increased limit
    newsUrl.searchParams.set('page', page.toString())
    newsUrl.searchParams.set('image', '1') // Request images

    const response = await fetch(newsUrl.toString())
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform news data to blog post format with enhanced content
    const blogPosts: BlogPost[] = data.results?.map((article: any, index: number) => {
      // Calculate estimated read time based on content length
      const fullContent = article.content || article.description || ''
      const wordCount = fullContent.split(' ').length
      const readTime = Math.max(2, Math.ceil(wordCount / 200)) // Average reading speed: 200 words/minute
      
      // Determine category based on keywords
      let category = 'General'
      const title = (article.title || '').toLowerCase()
      const description = (article.description || '').toLowerCase()
      const content = title + ' ' + description
      
      if (content.includes('bitcoin') || content.includes('btc')) category = 'Bitcoin'
      else if (content.includes('ethereum') || content.includes('eth') || content.includes('erc')) category = 'Ethereum'
      else if (content.includes('trading') || content.includes('arbitrage') || content.includes('exchange')) category = 'Trading'
      else if (content.includes('defi') || content.includes('decentralized') || content.includes('dex')) category = 'DeFi'
      else if (content.includes('blockchain') || content.includes('technology') || content.includes('smart contract')) category = 'Technology'
      else if (content.includes('market') || content.includes('analysis') || content.includes('price')) category = 'Analysis'
      else if (content.includes('regulation') || content.includes('legal') || content.includes('sec')) category = 'Regulation'
      else if (content.includes('nft') || content.includes('token') || content.includes('web3')) category = 'Web3'

      // Enhanced content formatting
      let enhancedContent = fullContent
      
      // Add structured content if available
      if (article.content && article.content.length > 200) {
        // Break long content into paragraphs
        enhancedContent = article.content
          .split('. ')
          .map((sentence: string) => sentence.trim())
          .filter((sentence: string) => sentence.length > 20)
          .join('. ')
          .replace(/([.!?])\s+/g, '$1\n\n') // Add paragraph breaks
      }

      // Add market context for crypto articles
      if (['Bitcoin', 'Ethereum', 'Trading', 'DeFi', 'Analysis'].includes(category)) {
        enhancedContent += `\n\n**Market Context:** This ${category.toLowerCase()} news could impact trading opportunities and arbitrage potential across major cryptocurrency exchanges.`
      }

      return {
        id: article.article_id || `${Date.now()}-${index}`,
        title: article.title || 'Crypto Market Update',
        description: article.description || 'Latest developments in the cryptocurrency and blockchain space.',
        content: enhancedContent || 'Content not available. Please visit the source for full details.',
        author: article.source_name || 'Crypto News Network',
        published_at: article.pubDate || new Date().toISOString(),
        category,
        image_url: article.image_url || `https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&crop=center`, // Crypto fallback image
        source_name: article.source_name || 'Crypto News',
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
        categories: ['All', 'Bitcoin', 'Ethereum', 'Trading', 'DeFi', 'Technology', 'Analysis', 'Regulation', 'Web3']
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error fetching blog data:', error)
    
    // Return enhanced fallback data in case of API failure
    const fallbackPosts = [
      {
        id: 'fallback-1',
        title: 'Understanding Cryptocurrency Arbitrage: A Comprehensive Guide',
        description: 'Learn the fundamentals of crypto arbitrage trading and how to identify profitable opportunities across exchanges. Discover the strategies and tools professional traders use to profit from price differences.',
        content: `Cryptocurrency arbitrage is a trading strategy that takes advantage of price differences for the same asset across different exchanges. This comprehensive guide will walk you through the fundamentals of arbitrage trading and how to identify profitable opportunities.

**What is Cryptocurrency Arbitrage?**

Arbitrage involves buying a cryptocurrency on one exchange where the price is lower and simultaneously selling it on another exchange where the price is higher. The profit is the difference between these prices, minus trading fees and transfer costs.

**Types of Arbitrage Opportunities:**

1. **Simple Arbitrage**: Direct price differences between exchanges
2. **Triangular Arbitrage**: Exploiting price differences between three different cryptocurrencies
3. **Statistical Arbitrage**: Using mathematical models to identify pricing inefficiencies

**Key Factors for Successful Arbitrage:**

- **Speed**: Markets move quickly, and opportunities can disappear in seconds
- **Capital**: Larger amounts can generate more significant profits
- **Technology**: Automated systems can execute trades faster than manual trading
- **Risk Management**: Understanding transfer times, fees, and market volatility

**Market Context:** This trading knowledge is essential for identifying arbitrage opportunities and maximizing profits across major cryptocurrency exchanges.`,
        author: 'MCKI Trading Team',
        published_at: new Date().toISOString(),
        category: 'Trading',
        image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&crop=center',
        source_name: 'MCKI Education',
        source_url: '#',
        read_time: '8 min read',
        featured: true
      },
      {
        id: 'fallback-2',
        title: 'Bitcoin Market Analysis: Latest Price Movements and Trading Signals',
        description: 'Deep dive into the latest Bitcoin price movements, technical analysis, and trading signals that could impact your investment strategy.',
        content: `Bitcoin continues to show significant volatility as institutional adoption grows and regulatory clarity improves across major markets. This analysis examines key price levels and trading opportunities.

**Current Market Overview:**

The cryptocurrency market has experienced substantial growth over the past quarter, with Bitcoin leading the charge. Major institutional investors continue to allocate portions of their portfolios to digital assets, providing strong fundamental support.

**Technical Analysis:**

Key resistance levels remain at previous all-time highs, while support has been established at major psychological price points. Volume indicators suggest continued interest from both retail and institutional traders.

**Trading Opportunities:**

Several arbitrage opportunities have emerged across major exchanges, particularly during periods of high volatility. Traders utilizing sophisticated monitoring tools have been able to capitalize on these price discrepancies.

**Market Context:** This analysis provides insights into current bitcoin trading trends and potential arbitrage opportunities across major cryptocurrency exchanges.`,
        author: 'MCKI Research',
        published_at: new Date().toISOString(),
        category: 'Bitcoin',
        image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop&crop=center',
        source_name: 'MCKI Research',
        source_url: '#',
        read_time: '6 min read',
        featured: false
      },
      {
        id: 'fallback-3',
        title: 'DeFi Revolution: How Decentralized Finance is Changing Trading',
        description: 'Explore how decentralized finance protocols are creating new opportunities for yield farming, liquidity provision, and automated trading strategies.',
        content: `Decentralized Finance (DeFi) has emerged as one of the most transformative aspects of the cryptocurrency ecosystem, offering unprecedented opportunities for traders and investors.

**The DeFi Landscape:**

DeFi protocols have revolutionized traditional financial services by providing decentralized alternatives to banking, lending, and trading. These protocols operate on blockchain networks, primarily Ethereum, and offer users complete control over their assets.

**Key DeFi Opportunities:**

- **Yield Farming**: Earning rewards by providing liquidity to DeFi protocols
- **Automated Market Makers (AMMs)**: Trading without traditional order books
- **Flash Loans**: Borrowing and repaying within a single transaction
- **Composability**: Combining multiple DeFi protocols for complex strategies

**Arbitrage in DeFi:**

The fragmented nature of DeFi creates numerous arbitrage opportunities between different protocols and exchanges. Advanced traders use complex strategies to profit from these inefficiencies.

**Market Context:** This DeFi analysis reveals trading opportunities and arbitrage potential across decentralized cryptocurrency exchanges and protocols.`,
        author: 'DeFi Research Team',
        published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        category: 'DeFi',
        image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&crop=center',
        source_name: 'MCKI DeFi Lab',
        source_url: '#',
        read_time: '7 min read',
        featured: false
      },
      {
        id: 'fallback-4',
        title: 'Ethereum 2.0 and Its Impact on Trading Strategies',
        description: 'Analyzing how Ethereum\'s transition to Proof of Stake affects trading costs, transaction speeds, and arbitrage opportunities.',
        content: `Ethereum's evolution continues to reshape the cryptocurrency trading landscape, with significant implications for arbitrage traders and DeFi participants.

**Ethereum's Transformation:**

The transition to Proof of Stake has reduced energy consumption by over 99% while maintaining network security. This change has important implications for traders and the broader ecosystem.

**Impact on Trading:**

Lower transaction fees and faster confirmation times have made smaller arbitrage opportunities more profitable. Previously unprofitable trades due to high gas fees are now viable strategies.

**New Opportunities:**

- **Liquid Staking**: Earning rewards while maintaining trading flexibility
- **MEV (Maximal Extractable Value)**: Advanced arbitrage strategies
- **Layer 2 Integration**: Cross-layer arbitrage opportunities

**Trading Implications:**

The improved efficiency of the Ethereum network has opened new arbitrage corridors and reduced the minimum viable trade size for many strategies.

**Market Context:** This ethereum analysis highlights new trading opportunities and arbitrage potential following major network upgrades.`,
        author: 'Ethereum Research',
        published_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        category: 'Ethereum',
        image_url: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&h=400&fit=crop&crop=center',
        source_name: 'MCKI Ethereum Lab',
        source_url: '#',
        read_time: '9 min read',
        featured: true
      }
    ]

    return new Response(
      JSON.stringify({
        posts: fallbackPosts,
        total: fallbackPosts.length,
        page: 1,
        hasMore: false,
        categories: ['All', 'Bitcoin', 'Ethereum', 'Trading', 'DeFi', 'Technology', 'Analysis', 'Regulation', 'Web3'],
        error: 'Using fallback data due to API error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  }
})