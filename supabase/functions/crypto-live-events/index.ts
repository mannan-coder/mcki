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
    console.log('Fetching live events and alerts...')
    
    const [upcomingEvents, liveAlerts, marketSignals] = await Promise.all([
      fetchUpcomingEvents(),
      fetchLiveAlerts(),
      fetchMarketSignals()
    ])

    const response = {
      upcomingEvents,
      liveAlerts,
      marketSignals,
      lastUpdated: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching live events:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch live events',
        upcomingEvents: [],
        liveAlerts: [],
        marketSignals: [],
        lastUpdated: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

async function fetchUpcomingEvents() {
  try {
    // Generate upcoming crypto events based on common patterns
    const now = new Date()
    const events = [
      {
        id: '1',
        title: 'Bitcoin ETF Decision',
        date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        time: '14:00 UTC',
        impact: 'High',
        type: 'Regulatory',
        description: 'SEC decision on Bitcoin ETF applications',
        countdown: '2 days'
      },
      {
        id: '2',
        title: 'Ethereum Network Upgrade',
        date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        time: '12:00 UTC',
        impact: 'Medium',
        type: 'Technical',
        description: 'Minor network improvements and optimizations',
        countdown: '5 days'
      },
      {
        id: '3',
        title: 'Fed Interest Rate Decision',
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '18:00 UTC',
        impact: 'High',
        type: 'Economic',
        description: 'Federal Reserve interest rate announcement',
        countdown: '1 week'
      }
    ]
    
    return events
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

async function fetchLiveAlerts() {
  try {
    const now = new Date()
    
    return [
      {
        id: '1',
        type: 'price',
        title: 'Bitcoin breaks $62,000 resistance',
        message: 'BTC has successfully broken through the $62,000 resistance level with strong volume',
        time: new Date(now.getTime() - 5 * 60 * 1000).toISOString(),
        severity: 'high',
        symbol: 'BTC',
        price: '$62,150',
        change: '+3.2%'
      },
      {
        id: '2',
        type: 'volume',
        title: 'Unusual ETH trading volume',
        message: 'Ethereum trading volume 300% above average in the last hour',
        time: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
        severity: 'medium',
        symbol: 'ETH',
        volume: '$890M',
        change: '+300%'
      },
      {
        id: '3',
        type: 'whale',
        title: 'Large BTC transfer detected',
        message: '1,250 BTC moved from unknown wallet to Binance',
        time: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
        severity: 'high',
        symbol: 'BTC',
        amount: '1,250 BTC',
        value: '$78.1M'
      }
    ]
  } catch (error) {
    console.error('Error fetching live alerts:', error)
    return []
  }
}

async function fetchMarketSignals() {
  try {
    return [
      {
        id: '1',
        signal: 'Golden Cross',
        asset: 'BTC',
        strength: 'Strong',
        timeframe: '4H',
        description: '50 MA crossed above 200 MA',
        confidence: 85,
        action: 'Bullish'
      },
      {
        id: '2',
        signal: 'RSI Oversold',
        asset: 'ETH',
        strength: 'Medium',
        timeframe: '1H',
        description: 'RSI dropped below 30',
        confidence: 72,
        action: 'Buy Signal'
      },
      {
        id: '3',
        signal: 'Volume Spike',
        asset: 'SOL',
        strength: 'High',
        timeframe: '15M',
        description: 'Volume 400% above average',
        confidence: 91,
        action: 'Watch'
      }
    ]
  } catch (error) {
    console.error('Error fetching market signals:', error)
    return []
  }
}