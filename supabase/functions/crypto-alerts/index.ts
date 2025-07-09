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
    // Generate dynamic live alerts
    const currentTime = new Date();
    
    // Generate recent alerts with timestamps
    const generateAlert = (id: number, type: string, coin: string, exchange: string, amount: string, direction: string, change: string, minutesAgo: number) => {
      const alertTime = new Date(currentTime.getTime() - (minutesAgo * 60 * 1000));
      return {
        id,
        type,
        coin,
        exchange,
        amount,
        direction,
        change,
        time: `${minutesAgo} min ago`,
        timestamp: alertTime.toISOString(),
        status: minutesAgo < 5 ? 'new' : 'active',
        severity: Math.abs(parseFloat(change.replace('%', ''))) > 15 ? 'high' : 
                 Math.abs(parseFloat(change.replace('%', ''))) > 8 ? 'medium' : 'low'
      };
    };

    const liveAlerts = [
      generateAlert(1, 'liquidation', 'BTC', 'Binance', '$67.8M', 'Long', '-12.5%', 2),
      generateAlert(2, 'pump', 'PEPE', 'Binance', '$12.5M', 'Buy', '+247%', 3),
      generateAlert(3, 'whale', 'ETH', 'Coinbase', '15,000 ETH', 'Out', 'Movement', 5),
      generateAlert(4, 'listing', 'NEWCOIN', 'KuCoin', '$2.1M', 'New', '+487%', 8),
      generateAlert(5, 'liquidation', 'ETH', 'OKX', '$34.5M', 'Short', '+8.3%', 12),
      generateAlert(6, 'dump', 'DOGE', 'Binance', '$8.9M', 'Sell', '-23.4%', 15),
      generateAlert(7, 'whale', 'BTC', 'Kraken', '2,500 BTC', 'In', 'Movement', 18),
      generateAlert(8, 'pump', 'SHIB', 'KuCoin', '$6.7M', 'Buy', '+89%', 22),
      generateAlert(9, 'liquidation', 'SOL', 'Bybit', '$23.7M', 'Long', '-15.2%', 25),
      generateAlert(10, 'listing', 'ROCKET', 'OKX', '$1.8M', 'New', '+156%', 28),
      generateAlert(11, 'whale', 'USDT', 'Binance', '50M USDT', 'Out', 'Movement', 32),
      generateAlert(12, 'pump', 'FLOKI', 'Coinbase', '$4.2M', 'Buy', '+78%', 35),
      generateAlert(13, 'liquidation', 'MATIC', 'Kraken', '$12.3M', 'Long', '-9.8%', 38),
      generateAlert(14, 'dump', 'ADA', 'OKX', '$15.6M', 'Sell', '-18.7%', 42),
      generateAlert(15, 'whale', 'SOL', 'Binance', '500K SOL', 'In', 'Movement', 45),
    ];

    // Add some randomization for "live" feel
    const randomizedAlerts = liveAlerts.map(alert => ({
      ...alert,
      // Randomly update some amounts to simulate live changes
      amount: Math.random() > 0.9 ? 
        alert.amount.replace(/[\d.]+/, (match) => (parseFloat(match) * (0.95 + Math.random() * 0.1)).toFixed(1)) 
        : alert.amount,
      // Occasionally update timestamps
      time: Math.random() > 0.95 ? `${Math.floor(Math.random() * 5) + 1} min ago` : alert.time
    }));

    // Calculate statistics
    const stats = {
      totalAlerts: randomizedAlerts.length,
      activeAlerts: randomizedAlerts.filter(a => a.status === 'active').length,
      newAlerts: randomizedAlerts.filter(a => a.status === 'new').length,
      highSeverity: randomizedAlerts.filter(a => a.severity === 'high').length,
      totalVolume: randomizedAlerts
        .filter(a => a.type === 'liquidation')
        .reduce((sum, a) => sum + parseFloat(a.amount.replace(/[$M]/g, '')), 0)
    };

    return new Response(
      JSON.stringify({ 
        alerts: randomizedAlerts,
        stats,
        lastUpdated: new Date().toISOString()
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