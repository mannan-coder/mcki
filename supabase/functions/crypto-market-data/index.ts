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
    const url = new URL(req.url);
    const limit = url.searchParams.get('limit') || '250'; // Default to top 250 coins
    const category = url.searchParams.get('category') || '';
    
    // Fetch comprehensive market data from CoinGecko
    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d`;
    
    if (category) {
      apiUrl += `&category=${category}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const coinData = await response.json();

    // Fetch global market data
    const globalResponse = await fetch('https://api.coingecko.com/api/v3/global');
    const globalData = await globalResponse.json();

    // Calculate additional metrics
    const totalMarketCap = globalData.data?.total_market_cap?.usd || 0;
    const totalVolume = globalData.data?.total_volume?.usd || 0;
    const btcDominance = globalData.data?.market_cap_percentage?.btc || 0;
    const ethDominance = globalData.data?.market_cap_percentage?.eth || 0;

    // Transform and enrich coin data
    const enrichedCoins = coinData.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change1h: coin.price_change_percentage_1h_in_currency || 0,
      change24h: coin.price_change_percentage_24h || 0,
      change7d: coin.price_change_percentage_7d_in_currency || 0,
      change30d: coin.price_change_percentage_30d_in_currency || 0,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      rank: coin.market_cap_rank,
      circulatingSupply: coin.circulating_supply,
      totalSupply: coin.total_supply,
      maxSupply: coin.max_supply,
      ath: coin.ath,
      athDate: coin.ath_date,
      atl: coin.atl,
      atlDate: coin.atl_date,
      image: coin.image,
      sparkline: coin.sparkline_in_7d?.price || [],
      lastUpdated: coin.last_updated
    }));

    const marketData = {
      totalMarketCap,
      totalVolume,
      btcDominance,
      ethDominance,
      fearGreedIndex: Math.floor(Math.random() * 100), // Placeholder - would need separate API
      activeCryptocurrencies: globalData.data?.active_cryptocurrencies || 0,
      markets: globalData.data?.markets || 0,
      coins: enrichedCoins,
      lastUpdated: new Date().toISOString()
    };

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