// Define all routes for static site generation
export const ssgRoutes = [
  // Core pages
  '/',
  '/about',
  '/analytics',
  '/arbitrage', 
  '/chain-analytics',
  '/market',
  '/market-cap-details',
  '/news',
  '/tools',
  '/volume-details',
  '/events',
  '/alerts',
  
  // Additional pages
  '/contact',
  '/blog', 
  '/careers',
  '/privacy',
  '/terms',
  '/cookies',
  '/disclaimer',
]

// Route-specific data for prerendering
export const routeData: Record<string, any> = {
  '/': {
    title: 'MCKI - Professional Crypto Intelligence Platform',
    description: 'Advanced cryptocurrency arbitrage intelligence powered by AI. Real-time market analysis, profitable trading opportunities, and comprehensive tools for multi-chain operations.',
    keywords: ['crypto arbitrage', 'cryptocurrency trading', 'bitcoin arbitrage', 'blockchain analysis'],
  },
  '/market': {
    title: 'Crypto Market Overview | MCKI',
    description: 'Real-time cryptocurrency market data, live prices, and comprehensive market analysis tools.',
    keywords: ['crypto market', 'cryptocurrency prices', 'market analysis', 'live prices'],
  },
  '/arbitrage': {
    title: 'Crypto Arbitrage Opportunities | MCKI',
    description: 'Live cryptocurrency arbitrage opportunities across top exchanges. Find profitable trading gaps with AI-powered analysis.',
    keywords: ['crypto arbitrage', 'arbitrage opportunities', 'exchange comparison', 'trading gaps'],
  },
  '/news': {
    title: 'Crypto News & Analysis | MCKI',
    description: 'Latest cryptocurrency news, market analysis, and expert insights. Stay updated with real-time crypto market developments.',
    keywords: ['crypto news', 'cryptocurrency analysis', 'market news', 'crypto insights'],
  },
  '/about': {
    title: 'About MCKI | Multi-Chain Knowledge Intelligence',
    description: 'Learn about MCKI\'s mission to provide advanced cryptocurrency intelligence through AI-powered analytics and real-time market data.',
    keywords: ['about mcki', 'crypto intelligence', 'blockchain analytics', 'company information'],
  },
}