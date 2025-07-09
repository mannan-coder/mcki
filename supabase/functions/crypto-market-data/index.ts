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
    // Read limit from request body or URL params
    const body = await req.json().catch(() => ({}));
    const url = new URL(req.url);
    const limit = body.limit || url.searchParams.get('limit') || '500'; // Default to top 500 coins
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

    // Transform and enrich coin data with comprehensive CoinGecko fields
    const enrichedCoins = coinData.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price || 0,
      change1h: coin.price_change_percentage_1h_in_currency || 0,
      change24h: coin.price_change_percentage_24h || 0,
      change7d: coin.price_change_percentage_7d_in_currency || 0,
      change30d: coin.price_change_percentage_30d_in_currency || 0,
      marketCap: coin.market_cap || 0,
      volume: coin.total_volume || 0,
      rank: coin.market_cap_rank || 0,
      circulatingSupply: coin.circulating_supply || 0,
      totalSupply: coin.total_supply || 0,
      maxSupply: coin.max_supply || 0,
      ath: coin.ath || 0,
      athDate: coin.ath_date || '',
      atl: coin.atl || 0,
      atlDate: coin.atl_date || '',
      image: coin.image || '',
      sparkline: coin.sparkline_in_7d?.price || [],
      lastUpdated: coin.last_updated || new Date().toISOString(),
      // Additional CoinGecko fields
      priceChange24h: coin.price_change_24h || 0,
      priceChangePercentage1h: coin.price_change_percentage_1h_in_currency || 0,
      marketCapChange24h: coin.market_cap_change_24h || 0,
      marketCapChangePercentage24h: coin.market_cap_change_percentage_24h || 0,
      fullyDilutedValuation: coin.fully_diluted_valuation || 0,
      high24h: coin.high_24h || 0,
      low24h: coin.low_24h || 0,
      athChangePercentage: coin.ath_change_percentage || 0,
      atlChangePercentage: coin.atl_change_percentage || 0,
      roi: coin.roi || null,
      platforms: coin.platforms || {},
      detailPlatforms: coin.detail_platforms || {},
      categories: coin.categories || [],
      publicNotice: coin.public_notice || null,
      additionalNotices: coin.additional_notices || [],
      localization: coin.localization || {},
      description: coin.description || {},
      links: coin.links || {},
      countryOrigin: coin.country_origin || '',
      genesisDate: coin.genesis_date || null,
      contractAddress: coin.contract_address || '',
      sentimentVotesUpPercentage: coin.sentiment_votes_up_percentage || 0,
      sentimentVotesDownPercentage: coin.sentiment_votes_down_percentage || 0,
      marketCapRank: coin.market_cap_rank || 0,
      coingeckoRank: coin.coingecko_rank || 0,
      coingeckoScore: coin.coingecko_score || 0,
      developerScore: coin.developer_score || 0,
      communityScore: coin.community_score || 0,
      liquidityScore: coin.liquidity_score || 0,
      publicInterestScore: coin.public_interest_score || 0
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