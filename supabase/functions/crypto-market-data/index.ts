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
    // Fetch market data from CoinGecko (free API)
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform data to match our app structure
    const marketData = {
      totalMarketCap: data.reduce((sum: number, coin: any) => sum + (coin.market_cap || 0), 0),
      totalVolume: data.reduce((sum: number, coin: any) => sum + (coin.total_volume || 0), 0),
      btcDominance: data.find((coin: any) => coin.id === 'bitcoin')?.market_cap_rank === 1 ? 
        ((data.find((coin: any) => coin.id === 'bitcoin')?.market_cap || 0) / 
         data.reduce((sum: number, coin: any) => sum + (coin.market_cap || 0), 0)) * 100 : 0,
      fearGreedIndex: Math.floor(Math.random() * 100), // Placeholder - would need separate API
      coins: data.slice(0, 50).map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        change7d: coin.price_change_percentage_7d_in_currency,
        marketCap: coin.market_cap,
        volume: coin.total_volume,
        rank: coin.market_cap_rank
      }))
    }

    return new Response(
      JSON.stringify(marketData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error fetching market data:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})