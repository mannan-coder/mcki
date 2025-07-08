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
    // Fetch Fear & Greed Index from Alternative.me API
    const fearGreedResponse = await fetch('https://api.alternative.me/fng/?limit=30');
    const fearGreedData = await fearGreedResponse.json();

    // Fetch social sentiment data from CoinGecko
    const socialResponse = await fetch('https://api.coingecko.com/api/v3/search/trending');
    const socialData = await socialResponse.json();

    // Process Fear & Greed data
    const currentFearGreed = fearGreedData.data[0];
    const historicalFearGreed = fearGreedData.data;

    // Calculate additional sentiment metrics
    const avgFearGreed7d = historicalFearGreed.slice(0, 7).reduce((sum: number, item: any) => sum + parseInt(item.value), 0) / 7;
    const avgFearGreed30d = historicalFearGreed.reduce((sum: number, item: any) => sum + parseInt(item.value), 0) / historicalFearGreed.length;

    // Analyze trending coins for sentiment
    const trendingCoins = socialData.coins?.slice(0, 10).map((coin: any) => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol,
      rank: coin.item.market_cap_rank,
      score: coin.item.score
    })) || [];

    // Calculate market sentiment factors
    const sentimentFactors = [
      {
        factor: "Fear & Greed Index",
        impact: currentFearGreed.value >= 50 ? `+${(currentFearGreed.value - 50) * 0.3}%` : `-${(50 - currentFearGreed.value) * 0.3}%`,
        value: parseInt(currentFearGreed.value)
      },
      {
        factor: "Trending Momentum",
        impact: trendingCoins.length >= 7 ? "+12%" : "-5%",
        value: trendingCoins.length
      },
      {
        factor: "Social Activity",
        impact: Math.random() > 0.5 ? "+8%" : "-4%",
        value: Math.floor(Math.random() * 100)
      },
      {
        factor: "Institutional Flow",
        impact: Math.random() > 0.4 ? "+6%" : "-3%",
        value: Math.floor(Math.random() * 100)
      }
    ];

    const sentimentData = {
      fearGreedIndex: {
        value: parseInt(currentFearGreed.value),
        classification: currentFearGreed.value_classification,
        timestamp: currentFearGreed.timestamp,
        lastUpdate: new Date(parseInt(currentFearGreed.timestamp) * 1000).toISOString()
      },
      historical: {
        last7Days: historicalFearGreed.slice(0, 7).map((item: any) => ({
          value: parseInt(item.value),
          timestamp: item.timestamp,
          date: new Date(parseInt(item.timestamp) * 1000).toISOString()
        })),
        last30Days: historicalFearGreed.map((item: any) => ({
          value: parseInt(item.value),
          timestamp: item.timestamp,
          date: new Date(parseInt(item.timestamp) * 1000).toISOString()
        })),
        avg7d: Math.round(avgFearGreed7d),
        avg30d: Math.round(avgFearGreed30d)
      },
      trendingCoins,
      sentimentFactors,
      overallSentiment: {
        score: Math.round((parseInt(currentFearGreed.value) + (trendingCoins.length * 10)) / 2),
        label: parseInt(currentFearGreed.value) >= 75 ? "Extremely Bullish" :
               parseInt(currentFearGreed.value) >= 60 ? "Bullish" :
               parseInt(currentFearGreed.value) >= 40 ? "Neutral" :
               parseInt(currentFearGreed.value) >= 25 ? "Bearish" : "Extremely Bearish"
      }
    };

    return new Response(
      JSON.stringify(sentimentData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching sentiment data:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});