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
    const coinId = url.searchParams.get('id') || 'bitcoin';
    const days = url.searchParams.get('days') || '7';
    const interval = url.searchParams.get('interval') || 'daily';
    
    // Fetch price history data
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const chartData = await response.json();

    // Transform chart data for better frontend consumption
    const priceHistory = {
      prices: chartData.prices?.map(([timestamp, price]: [number, number]) => ({
        time: timestamp,
        price: price,
        date: new Date(timestamp).toISOString()
      })) || [],
      volumes: chartData.total_volumes?.map(([timestamp, volume]: [number, number]) => ({
        time: timestamp,
        volume: volume,
        date: new Date(timestamp).toISOString()
      })) || [],
      marketCaps: chartData.market_caps?.map(([timestamp, marketCap]: [number, number]) => ({
        time: timestamp,
        marketCap: marketCap,
        date: new Date(timestamp).toISOString()
      })) || []
    };

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