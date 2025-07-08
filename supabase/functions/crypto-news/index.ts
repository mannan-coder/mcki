import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Fetch crypto news from CryptoPanic API (free tier)
    const response = await fetch(
      'https://cryptopanic.com/api/free/v1/posts/?auth_token=free&filter=hot&public=true'
    )

    if (!response.ok) {
      throw new Error(`CryptoPanic API error: ${response.status}`)
    }

    const data = await response.json()

    // Enhanced mock news data with images
    const enhancedNews = [
      {
        id: 1,
        title: "Bitcoin ETF Approval Drives Institutional Adoption to New Heights",
        summary: "Major financial institutions are rushing to offer Bitcoin ETF products following regulatory approvals, with over $2B in inflows recorded this week alone.",
        category: "Regulation",
        time: "2 hours ago",
        impact: "bullish",
        source: "Financial Times",
        url: "https://example.com/news1",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop&auto=format"
      },
      {
        id: 2,
        title: "DeFi Protocol Launches Revolutionary Yield Farming Mechanism",
        summary: "A new decentralized finance protocol introduces an innovative approach to yield farming that could potentially double investor returns while maintaining security standards.",
        category: "DeFi",
        time: "4 hours ago",
        impact: "bullish",
        source: "CoinDesk",
        url: "https://example.com/news2",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&auto=format"
      },
      {
        id: 3,
        title: "Central Bank Digital Currency (CBDC) Pilot Program Shows Promising Results",
        summary: "Initial testing of the digital currency infrastructure demonstrates significant improvements in transaction speed and cost reduction compared to traditional banking systems.",
        category: "Government",
        time: "6 hours ago",
        impact: "neutral",
        source: "Reuters",
        url: "https://example.com/news3",
        image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop&auto=format"
      },
      {
        id: 4,
        title: "NFT Marketplace Integration Brings Utility to Digital Art Collections",
        summary: "Leading NFT platforms are integrating new features that allow digital art collectors to earn passive income through their collections via innovative staking mechanisms.",
        category: "NFT",
        time: "8 hours ago",
        impact: "bullish",
        source: "Decrypt",
        url: "https://example.com/news4",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop&auto=format"
      },
      {
        id: 5,
        title: "Layer 2 Scaling Solutions Reduce Transaction Costs by 95%",
        summary: "New layer 2 implementations on Ethereum are showing remarkable efficiency gains, with transaction costs dropping to under $0.01 while maintaining security guarantees.",
        category: "Technology",
        time: "10 hours ago",
        impact: "bullish",
        source: "The Block",
        url: "https://example.com/news5",
        image: "https://images.unsplash.com/photo-1518546305-2d1e60d30d15?w=400&h=300&fit=crop&auto=format"
      },
      {
        id: 6,
        title: "Cryptocurrency Adoption in Emerging Markets Reaches All-Time High",
        summary: "Developing countries are leading global cryptocurrency adoption, with mobile-first solutions enabling financial inclusion for millions of unbanked individuals.",
        category: "Adoption",
        time: "12 hours ago",
        impact: "bullish",
        source: "Bloomberg",
        url: "https://example.com/news6",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format"
      }
    ];

    // Transform and merge API data with enhanced news
    const apiNews = data.results?.slice(0, 4).map((article: any, index: number) => ({
      id: index + 100,
      title: article.title,
      summary: article.title.length > 100 ? article.title.substring(0, 100) + "..." : article.title,
      category: article.kind === 'news' ? 'News' : 'General',
      time: new Date(article.published_at).toLocaleString(),
      impact: article.votes?.positive > article.votes?.negative ? 'bullish' : 
              article.votes?.negative > article.votes?.positive ? 'bearish' : 'neutral',
      source: article.source?.title || 'CryptoPanic',
      url: article.url,
      image: `https://images.unsplash.com/photo-${1518546305 + Math.floor(Math.random() * 1000000)}?w=400&h=300&fit=crop&auto=format`
    })) || [];

    const newsData = [...enhancedNews, ...apiNews];

    return new Response(
      JSON.stringify({ news: newsData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error fetching news:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})