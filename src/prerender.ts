// Prerender configuration for static site generation

// Define all routes that should be prerendered
export const prerenderRoutes: string[] = [
  // Core pages
  '/',
  '/market',
  '/arbitrage',
  '/analytics',
  '/alerts',
  '/news',
  '/events',
  '/about',
  '/contact',
  '/tools',
  '/blog',
  
  // Legal pages
  '/privacy',
  '/terms',
  '/cookies',
  '/disclaimer',
  '/careers',
  
  // API integration for dynamic content
  '/market-cap-details',
  '/volume-details',
  '/chain-analytics',
];

// Hook to inject data during prerender
export const prerenderHook = async (route: string) => {
  console.log(`Prerendering route: ${route}`);
  
  // Pre-fetch critical data for specific routes
  switch (route) {
    case '/':
      // Pre-fetch homepage data
      return {
        title: 'MCKI - Professional Crypto Intelligence Platform',
        description: 'Advanced cryptocurrency arbitrage intelligence powered by AI. Real-time market analysis, profitable trading opportunities, and comprehensive tools for multi-chain operations.',
        preloadData: await fetchHomepageData()
      };
      
    case '/market':
      return {
        title: 'Crypto Market Overview | MCKI',
        description: 'Real-time cryptocurrency market data, live prices, and comprehensive market analysis tools.',
        preloadData: await fetchMarketData()
      };
      
    case '/arbitrage':
      return {
        title: 'Crypto Arbitrage Opportunities | MCKI',
        description: 'Live cryptocurrency arbitrage opportunities across top exchanges. Find profitable trading gaps with AI-powered analysis.',
        preloadData: await fetchArbitrageData()
      };
      
    case '/news':
      return {
        title: 'Crypto News & Analysis | MCKI',
        description: 'Latest cryptocurrency news, market analysis, and expert insights. Stay updated with real-time crypto market developments.',
        preloadData: await fetchNewsData()
      };
      
    default:
      return {};
  }
};

// Data fetching functions for prerender
async function fetchHomepageData() {
  try {
    // Simulate API calls that would normally happen on client
    return {
      marketData: null, // Will be populated by client-side hydration
      topCoins: null,
      recentNews: null,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Failed to pre-fetch homepage data:', error);
    return null;
  }
}

async function fetchMarketData() {
  try {
    return {
      marketCap: null,
      volume24h: null,
      dominance: null,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Failed to pre-fetch market data:', error);
    return null;
  }
}

async function fetchArbitrageData() {
  try {
    return {
      opportunities: null,
      exchanges: null,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Failed to pre-fetch arbitrage data:', error);
    return null;
  }
}

async function fetchNewsData() {
  try {
    return {
      articles: null,
      trending: null,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Failed to pre-fetch news data:', error);
    return null;
  }
}