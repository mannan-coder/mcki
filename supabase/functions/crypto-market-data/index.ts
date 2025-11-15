import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory cache with TTL - increased to reduce API calls
const cache = new Map();
const CACHE_TTL = 60000; // 60 seconds (1 minute)
const STALE_CACHE_TTL = 300000; // 5 minutes - serve stale cache on error

// Rate limiting
const requestTracker = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15; // Reduced from 20

// Retry logic with exponential backoff and better timeout handling
async function fetchWithRetry(url: string, retries = 2, baseDelay = 2000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) return response;
      
      if (response.status === 429) {
        // Rate limited - wait exponentially longer
        const waitTime = baseDelay * Math.pow(2, i) * 2;
        console.log(`Rate limited, waiting ${waitTime}ms before retry ${i + 1}/${retries}`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      if (response.status >= 500) {
        // Server error - retry with backoff
        const waitTime = baseDelay * Math.pow(2, i);
        console.log(`Server error ${response.status}, waiting ${waitTime}ms before retry ${i + 1}/${retries}`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      const isLastRetry = i === retries - 1;
      
      if (error.name === 'AbortError') {
        console.error('Request timeout');
        if (isLastRetry) throw new Error('Request timeout after multiple retries');
      } else if (isLastRetry) {
        throw error;
      }
      
      // Exponential backoff for retries
      const waitTime = baseDelay * Math.pow(2, i);
      console.log(`Error on attempt ${i + 1}/${retries}, waiting ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  throw new Error('Max retries exceeded');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    
    if (!requestTracker.has(clientIP)) {
      requestTracker.set(clientIP, []);
    }
    
    const requests = requestTracker.get(clientIP);
    const recentRequests = requests.filter((time: number) => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    recentRequests.push(now);
    requestTracker.set(clientIP, recentRequests);

    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 250); // Cap at 250
    const category = url.searchParams.get('category') || '';
    
    // Check cache first
    const cacheKey = `${limit}-${category}`;
    const cached = cache.get(cacheKey);
    
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
      console.log('Returning fresh cached data');
      return new Response(
        JSON.stringify(cached.data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if we have stale cache that we can use as fallback
    const hasStaleCache = cached && (now - cached.timestamp) < STALE_CACHE_TTL;
    
    // Try to fetch fresh data, but use stale cache on failure
    try {
      console.log('Fetching fresh data from CoinGecko...');
      
      // Fetch comprehensive market data from CoinGecko with retry logic
      let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d`;
      
      if (category) {
        apiUrl += `&category=${category}`;
      }

      const response = await fetchWithRetry(apiUrl);

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const coinData = await response.json();

      // Fetch global market data with retry
      const globalResponse = await fetchWithRetry('https://api.coingecko.com/api/v3/global');
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

      // Cache the result
      cache.set(cacheKey, {
        data: marketData,
        timestamp: now
      });

      console.log(`Fetched fresh data for ${enrichedCoins.length} coins`);

      return new Response(
        JSON.stringify(marketData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
      
    } catch (apiError) {
      console.error('Error fetching from CoinGecko API:', apiError);
      
      // Try to serve stale cache if available
      if (hasStaleCache) {
        console.log('Serving stale cached data due to API error');
        return new Response(
          JSON.stringify({
            ...cached.data,
            _cached: true,
            _cacheAge: Math.floor((now - cached.timestamp) / 1000) + 's'
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'X-Cache-Status': 'STALE'
            } 
          }
        );
      }
      
      // No cache available, return error
      throw apiError;
    }

  } catch (error) {
    console.error('Critical error in market data function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch market data',
        message: 'Please try again in a few moments. The API may be experiencing rate limits.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});