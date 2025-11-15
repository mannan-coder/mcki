// Sitemap generation utilities for React SPA

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const STATIC_ROUTES: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: '2025-01-15'
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: '2025-01-15'
  },
  {
    loc: '/arbitrage',
    changefreq: 'hourly',
    priority: 0.9,
    lastmod: '2025-01-15'
  },
  {
    loc: '/market',
    changefreq: 'hourly',
    priority: 0.9,
    lastmod: '2025-01-15'
  },
  {
    loc: '/analytics',
    changefreq: 'daily',
    priority: 0.8,
    lastmod: '2025-01-15'
  },
  {
    loc: '/chain-analytics',
    changefreq: 'daily',
    priority: 0.8,
    lastmod: '2025-01-15'
  },
  {
    loc: '/news',
    changefreq: 'hourly',
    priority: 0.8,
    lastmod: '2025-01-15'
  },
  {
    loc: '/events',
    changefreq: 'daily',
    priority: 0.7,
    lastmod: '2025-01-15'
  },
  {
    loc: '/tools',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: '2025-01-15'
  },
  {
    loc: '/alerts',
    changefreq: 'daily',
    priority: 0.7,
    lastmod: '2025-01-15'
  },
  {
    loc: '/blog',
    changefreq: 'daily',
    priority: 0.8,
    lastmod: '2025-01-15'
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: '2025-01-15'
  },
  {
    loc: '/careers',
    changefreq: 'weekly',
    priority: 0.6,
    lastmod: '2025-01-15'
  },
  {
    loc: '/privacy',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: '2025-01-15'
  },
  {
    loc: '/terms',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: '2025-01-15'
  },
  {
    loc: '/disclaimer',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: '2025-01-15'
  }
];

export const generateSitemapXML = (urls: SitemapUrl[], baseUrl: string = 'https://mcki.site'): string => {
  const urlEntries = urls.map(url => {
    const fullUrl = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    
    return `  <url>
    <loc>${fullUrl}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export const generateRobotsTxt = (sitemapUrl: string = 'https://mcki.site/sitemap.xml'): string => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${sitemapUrl}

# Crawl delay
Crawl-delay: 1

# Specific rules for major bots
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

# Block common unwanted bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /`;
};

// Function to generate dynamic URLs (for coins, news articles, etc.)
export const generateDynamicUrls = async (): Promise<SitemapUrl[]> => {
  const dynamicUrls: SitemapUrl[] = [];
  
  try {
    // Example: Generate URLs for top cryptocurrencies
    const topCoins = ['bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana', 'polkadot', 'chainlink', 'litecoin'];
    
    topCoins.forEach(coinId => {
      dynamicUrls.push({
        loc: `/coin/${coinId}`,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: '2025-01-15'
      });
    });
    
    // Example: Generate URLs for market cap details, volume details, etc.
    dynamicUrls.push(
      {
        loc: '/market-cap-details',
        changefreq: 'daily',
        priority: 0.6,
        lastmod: '2025-01-15'
      },
      {
        loc: '/volume-details',
        changefreq: 'daily',
        priority: 0.6,
        lastmod: '2025-01-15'
      }
    );
    
  } catch (error) {
    console.error('Error generating dynamic URLs:', error);
  }
  
  return dynamicUrls;
};

// Generate complete sitemap
export const generateCompleteSitemap = async (baseUrl: string = 'https://mcki.site'): Promise<string> => {
  const dynamicUrls = await generateDynamicUrls();
  const allUrls = [...STATIC_ROUTES, ...dynamicUrls];
  
  return generateSitemapXML(allUrls, baseUrl);
};

// Function to submit sitemap to search engines
export const submitSitemap = async (sitemapUrl: string) => {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];
  
  const results = await Promise.allSettled(
    searchEngines.map(url => 
      fetch(url, { method: 'GET' })
        .then(response => ({ success: response.ok, url }))
        .catch(error => ({ success: false, url, error }))
    )
  );
  
  return results;
};