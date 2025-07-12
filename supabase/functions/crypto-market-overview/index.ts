
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory cache with 2-minute expiration
const cache = new Map()
const CACHE_DURATION = 2 * 60 * 1000 // 2 minutes

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const cacheKey = 'market-overview'
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Returning cached market overview data')
      return new Response(JSON.stringify(cached.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Fetching fresh market overview data from CoinGecko')
    
    // Fetch only essential data for performance
    const [globalResponse, coinsResponse] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/global', {
        headers: { 'Accept': 'application/json' }
      }),
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d', {
        headers: { 'Accept': 'application/json' }
      })
    ])

    if (!globalResponse.ok || !coinsResponse.ok) {
      throw new Error('Failed to fetch data from CoinGecko')
    }

    const globalData = await globalResponse.json()
    const coinsData = await coinsResponse.json()

    // Process and optimize data structure
    const optimizedData = {
      // Global market stats
      totalMarketCap: globalData.data.total_market_cap.usd,
      totalVolume: globalData.data.total_volume.usd,
      btcDominance: globalData.data.market_cap_percentage.btc,
      ethDominance: globalData.data.market_cap_percentage.eth || 0,
      activeCryptocurrencies: globalData.data.active_cryptocurrencies,
      markets: globalData.data.markets,
      fearGreedIndex: Math.floor(Math.random() * 40) + 40, // Placeholder
      
      // Optimized coins data with only essential fields
      coins: coinsData.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change1h: coin.price_change_percentage_1h_in_currency || 0,
        change24h: coin.price_change_percentage_24h || 0,
        change7d: coin.price_change_percentage_7d_in_currency || 0,
        marketCap: coin.market_cap,
        volume: coin.total_volume,
        rank: coin.market_cap_rank,
        image: coin.image,
        sparkline: coin.sparkline_in_7d?.price || [],
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        ath: coin.ath,
        athChangePercentage: coin.ath_change_percentage
      })),
      
      // Pre-calculated analytics for faster frontend rendering
      topGainers: coinsData
        .filter((coin: any) => coin.price_change_percentage_24h > 0)
        .sort((a: any, b: any) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 5)
        .map((coin: any) => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: coin.current_price,
          change24h: coin.price_change_percentage_24h,
          change7d: coin.price_change_percentage_7d_in_currency || 0,
          marketCap: coin.market_cap,
          volume: coin.total_volume,
          rank: coin.market_cap_rank,
          image: coin.image
        })),
      
      topLosers: coinsData
        .filter((coin: any) => coin.price_change_percentage_24h < 0)
        .sort((a: any, b: any) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 5)
        .map((coin: any) => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: coin.current_price,
          change24h: coin.price_change_percentage_24h,
          change7d: coin.price_change_percentage_7d_in_currency || 0,
          marketCap: coin.market_cap,
          volume: coin.total_volume,
          rank: coin.market_cap_rank,
          image: coin.image
        })),
      
      lastUpdated: new Date().toISOString()
    }

    // Cache the processed data
    cache.set(cacheKey, {
      data: optimizedData,
      timestamp: Date.now()
    })

    console.log('Market overview data processed and cached successfully')
    
    return new Response(JSON.stringify(optimizedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in crypto-market-overview:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch market data',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
