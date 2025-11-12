import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory cache for coin details
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { id: coinId } = await req.json();
    
    if (!coinId) {
      throw new Error('Coin ID is required');
    }

    console.log(`Fetching coin details for: ${coinId}`);

    // Check cache first
    const cached = cache.get(coinId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log(`Returning cached data for: ${coinId}`);
      return new Response(
        JSON.stringify(cached.data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'HIT' } }
      );
    }

    // Fetch detailed coin data
    console.log(`Fetching fresh data from CoinGecko for: ${coinId}`);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const coinData = await response.json();

    // Transform detailed coin data
    const detailedCoin = {
      id: coinData.id,
      symbol: coinData.symbol.toUpperCase(),
      name: coinData.name,
      description: coinData.description?.en || '',
      image: coinData.image?.large || '',
      marketCapRank: coinData.market_cap_rank,
      currentPrice: coinData.market_data?.current_price?.usd || 0,
      marketCap: coinData.market_data?.market_cap?.usd || 0,
      totalVolume: coinData.market_data?.total_volume?.usd || 0,
      priceChange24h: coinData.market_data?.price_change_24h || 0,
      priceChangePercentage24h: coinData.market_data?.price_change_percentage_24h || 0,
      priceChangePercentage7d: coinData.market_data?.price_change_percentage_7d || 0,
      priceChangePercentage30d: coinData.market_data?.price_change_percentage_30d || 0,
      priceChangePercentage1y: coinData.market_data?.price_change_percentage_1y || 0,
      ath: coinData.market_data?.ath?.usd || 0,
      athDate: coinData.market_data?.ath_date?.usd || '',
      atl: coinData.market_data?.atl?.usd || 0,
      atlDate: coinData.market_data?.atl_date?.usd || '',
      circulatingSupply: coinData.market_data?.circulating_supply || 0,
      totalSupply: coinData.market_data?.total_supply || 0,
      maxSupply: coinData.market_data?.max_supply || 0,
      sparkline: coinData.market_data?.sparkline_7d?.price || [],
      lastUpdated: coinData.last_updated
    };

    // Cache the result
    cache.set(coinId, { data: detailedCoin, timestamp: Date.now() });
    console.log(`Cached data for: ${coinId}`);

    return new Response(
      JSON.stringify(detailedCoin),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'MISS' } }
    );

  } catch (error) {
    console.error('Error fetching coin details:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});