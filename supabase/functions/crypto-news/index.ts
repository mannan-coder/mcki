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

    // Transform news data
    const newsData = data.results?.slice(0, 10).map((article: any, index: number) => ({
      id: index + 1,
      title: article.title,
      summary: article.title, // CryptoPanic doesn't provide summary in free tier
      category: article.kind === 'news' ? 'News' : 'General',
      time: new Date(article.published_at).toLocaleString(),
      impact: article.votes?.positive > article.votes?.negative ? 'bullish' : 
              article.votes?.negative > article.votes?.positive ? 'bearish' : 'neutral',
      source: article.source?.title || 'CryptoPanic',
      url: article.url
    })) || []

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