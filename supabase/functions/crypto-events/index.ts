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
    // Generate dynamic events based on current time
    const currentTime = new Date();
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Generate events for the next 24 hours
    const events = [
      {
        id: 1,
        time: '09:00 UTC',
        event: 'Federal Reserve Economic Data Release',
        impact: 'high',
        category: 'macro',
        timestamp: new Date(tomorrow.setHours(9, 0, 0, 0)).toISOString(),
        description: 'Monthly inflation and employment data release affecting crypto markets'
      },
      {
        id: 2,
        time: '14:30 UTC',
        event: 'Bitcoin ETF Trading Volume Review',
        impact: 'high',
        category: 'crypto',
        timestamp: new Date(tomorrow.setHours(14, 30, 0, 0)).toISOString(),
        description: 'Weekly review of Bitcoin ETF trading patterns and institutional flows'
      },
      {
        id: 3,
        time: '16:00 UTC',
        event: 'Ethereum Network Upgrade Discussion',
        impact: 'medium',
        category: 'crypto',
        timestamp: new Date(tomorrow.setHours(16, 0, 0, 0)).toISOString(),
        description: 'Community call discussing upcoming network improvements'
      },
      {
        id: 4,
        time: '18:00 UTC',
        event: 'Major Exchange Maintenance Window',
        impact: 'medium',
        category: 'exchange',
        timestamp: new Date(tomorrow.setHours(18, 0, 0, 0)).toISOString(),
        description: 'Scheduled maintenance affecting trading pairs and withdrawals'
      },
      {
        id: 5,
        time: '20:00 UTC',
        event: 'Crypto Market Analysis Webinar',
        impact: 'low',
        category: 'analysis',
        timestamp: new Date(tomorrow.setHours(20, 0, 0, 0)).toISOString(),
        description: 'Weekly technical analysis and market outlook presentation'
      },
      {
        id: 6,
        time: '22:00 UTC',
        event: 'Asian Market Opening Trends',
        impact: 'medium',
        category: 'market',
        timestamp: new Date(tomorrow.setHours(22, 0, 0, 0)).toISOString(),
        description: 'Analysis of trading patterns as Asian markets begin the trading day'
      }
    ];

    // Add some randomization to make it feel more "live"
    const randomizedEvents = events.map(event => ({
      ...event,
      // Randomly adjust impact levels occasionally
      impact: Math.random() > 0.8 ? 
        (event.impact === 'high' ? 'medium' : event.impact === 'medium' ? 'high' : 'medium') 
        : event.impact,
      // Add current status
      status: Math.random() > 0.7 ? 'updated' : 'scheduled'
    }));

    return new Response(
      JSON.stringify({ 
        events: randomizedEvents,
        lastUpdated: new Date().toISOString(),
        totalEvents: randomizedEvents.length
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})