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
    console.log('Generating fresh events data...');
    
    // Generate dynamic events based on current time with more variety
    const currentTime = new Date();
    const today = new Date(currentTime);
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Dynamic event templates that change based on time
    const eventTemplates = [
      {
        time: '09:00 UTC',
        event: 'Federal Reserve Economic Data Release',
        impact: 'high',
        category: 'macro',
        description: 'Monthly inflation and employment data release affecting crypto markets'
      },
      {
        time: '11:30 UTC',
        event: 'Bitcoin Mining Difficulty Adjustment',
        impact: 'medium',
        category: 'crypto',
        description: 'Bi-weekly adjustment of Bitcoin mining difficulty based on network hashrate'
      },
      {
        time: '14:30 UTC',
        event: 'Ethereum Layer 2 Network Upgrade',
        impact: 'high',
        category: 'crypto',
        description: 'Major scaling solution deployment affecting transaction costs'
      },
      {
        time: '16:00 UTC',
        event: 'Cryptocurrency Exchange Listing Announcement',
        impact: 'medium',
        category: 'exchange',
        description: 'Major exchange announcing new token listings and trading pairs'
      },
      {
        time: '18:00 UTC',
        event: 'DeFi Protocol Governance Vote',
        impact: 'medium',
        category: 'defi',
        description: 'Community voting on protocol upgrades and treasury allocation'
      },
      {
        time: '20:00 UTC',
        event: 'Institutional Bitcoin Purchase Report',
        impact: 'high',
        category: 'institutional',
        description: 'Weekly report on corporate and institutional Bitcoin acquisitions'
      },
      {
        time: '22:00 UTC',
        event: 'Asian Market Opening Analysis',
        impact: 'medium',
        category: 'market',
        description: 'Live analysis of crypto trading patterns as Asian markets open'
      }
    ];
    
    // Randomly select and modify events to make them feel fresh
    const selectedEvents = eventTemplates
      .sort(() => Math.random() - 0.5) // Shuffle
      .slice(0, 6) // Take 6 events
      .map((template, index) => {
        const hour = 9 + (index * 2); // Spread events throughout the day
        const eventDate = Math.random() > 0.3 ? tomorrow : today; // 70% tomorrow, 30% today
        
        return {
          id: index + 1,
          time: `${hour.toString().padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'} UTC`,
          event: template.event,
          impact: Math.random() > 0.8 ? 
            (template.impact === 'high' ? 'medium' : template.impact === 'medium' ? 'high' : 'medium') 
            : template.impact,
          category: template.category,
          timestamp: new Date(eventDate.setHours(hour, Math.random() > 0.5 ? 0 : 30, 0, 0)).toISOString(),
          description: template.description,
          status: Math.random() > 0.7 ? 'updated' : 'scheduled'
        };
      });
    
    console.log(`Generated ${selectedEvents.length} fresh events`);
    
    const events = selectedEvents;

    return new Response(
      JSON.stringify({ 
        events: events,
        lastUpdated: new Date().toISOString(),
        totalEvents: events.length,
        generatedAt: new Date().toISOString(),
        success: true
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