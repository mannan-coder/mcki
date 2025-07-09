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
    // Handle both URL params and request body
    let coinId, days, interval;
    
    if (req.method === 'POST') {
      const body = await req.json();
      coinId = body.id || 'bitcoin';
      days = body.days || '7';
      interval = body.interval || 'daily';
    } else {
      const url = new URL(req.url);
      coinId = url.searchParams.get('id') || 'bitcoin';
      days = url.searchParams.get('days') || '7';
      interval = url.searchParams.get('interval') || 'daily';
    }
    
    // Fetch price history data
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const chartData = await response.json();

    // Transform chart data for better frontend consumption
    const prices = chartData.prices || [];
    const volumes = chartData.total_volumes || [];
    const marketCaps = chartData.market_caps || [];
    
    const priceHistory = {
      prices: prices.map(([timestamp, price]: [number, number]) => ({
        time: timestamp,
        price: price,
        date: new Date(timestamp).toISOString()
      })),
      volumes: volumes.map(([timestamp, volume]: [number, number]) => ({
        time: timestamp,
        volume: volume,
        date: new Date(timestamp).toISOString()
      })),
      marketCaps: marketCaps.map(([timestamp, marketCap]: [number, number]) => ({
        time: timestamp,
        marketCap: marketCap,
        date: new Date(timestamp).toISOString()
      }))
    };
    
    // Calculate price range statistics
    if (prices.length > 0) {
      const priceValues = prices.map(([_, price]: [number, number]) => price);
      const high = Math.max(...priceValues);
      const low = Math.min(...priceValues);
      const firstPrice = priceValues[0];
      const lastPrice = priceValues[priceValues.length - 1];
      const change = lastPrice - firstPrice;
      const changePercent = (change / firstPrice) * 100;
      
      priceHistory.priceRange = {
        high,
        low,
        change,
        changePercent
      };
    }

    return new Response(
      JSON.stringify(priceHistory),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching price history:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});