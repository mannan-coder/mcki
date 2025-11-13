// SEO utility functions and constants

export const SEO_CONFIG = {
  siteName: 'MCKI',
  siteUrl: 'https://mcki.site',
  defaultTitle: 'MCKI - Professional Crypto Intelligence Platform',
  defaultDescription: 'Advanced cryptocurrency arbitrage intelligence powered by AI. Real-time market analysis, profitable trading opportunities, and comprehensive tools for multi-chain operations.',
  defaultImage: 'https://mcki.site/og-image.png',
  twitterHandle: '@mcki_crypto',
  authorName: 'MCKI Platform',
  keywords: [
    'crypto arbitrage',
    'cryptocurrency trading',
    'bitcoin arbitrage',
    'blockchain analysis',
    'trading tools',
    'market intelligence',
    'crypto scanner',
    'exchange comparison',
    'trading calculator',
    'DeFi analysis',
    'real-time crypto data',
    'cryptocurrency alerts',
    'market sentiment analysis',
    'whale tracking',
    'crypto news',
    'live prices',
    'cryptocurrency dashboard',
    'crypto market data',
    'trading opportunities',
    'cryptocurrency analytics'
  ]
};

export const generatePageTitle = (pageTitle?: string): string => {
  if (!pageTitle) return SEO_CONFIG.defaultTitle;
  return `${pageTitle} | ${SEO_CONFIG.siteName}`;
};

export const generateCanonicalUrl = (path: string): string => {
  return `${SEO_CONFIG.siteUrl}${path}`;
};

export const generateOGImage = (title?: string, description?: string): string => {
  if (!title && !description) return SEO_CONFIG.defaultImage;
  
  // In a real implementation, you might generate dynamic OG images
  const params = new URLSearchParams();
  if (title) params.append('title', title);
  if (description) params.append('description', description);
  
  return `${SEO_CONFIG.siteUrl}/api/og?${params.toString()}`;
};

// Generate structured data for different page types
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SEO_CONFIG.siteName,
  "url": SEO_CONFIG.siteUrl,
  "description": SEO_CONFIG.defaultDescription,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SEO_CONFIG.siteName,
  "url": SEO_CONFIG.siteUrl,
  "logo": `${SEO_CONFIG.siteUrl}/logo.png`,
  "description": SEO_CONFIG.defaultDescription,
  "sameAs": [
    `https://twitter.com/${SEO_CONFIG.twitterHandle.replace('@', '')}`,
    `${SEO_CONFIG.siteUrl}/about`
  ]
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  image: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": [article.image],
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": SEO_CONFIG.siteName,
    "logo": {
      "@type": "ImageObject",
      "url": `${SEO_CONFIG.siteUrl}/logo.png`
    }
  },
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});

// Extract keywords from content
export const extractKeywords = (content: string, additionalKeywords: string[] = []): string[] => {
  const baseKeywords = [...SEO_CONFIG.keywords, ...additionalKeywords];
  
  // Simple keyword extraction logic
  const contentWords = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const relevantWords = contentWords.filter(word => 
    ['crypto', 'bitcoin', 'trading', 'arbitrage', 'blockchain', 'defi', 'market', 'price'].some(keyword => 
      word.includes(keyword)
    )
  );
  
  return [...new Set([...baseKeywords, ...relevantWords])].slice(0, 20);
};

// Calculate reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate meta description from content
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const cleanContent = content.replace(/[^\w\s.,!?]/g, ' ').trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  const trimmed = cleanContent.substring(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  
  return lastSpace > 0 ? `${trimmed.substring(0, lastSpace)}...` : `${trimmed}...`;
};

// Validate SEO requirements
export const validateSEO = (data: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
}): { isValid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  
  if (!data.title || data.title.length < 10) {
    warnings.push('Title should be at least 10 characters long');
  }
  
  if (data.title && data.title.length > 60) {
    warnings.push('Title should be less than 60 characters for optimal display');
  }
  
  if (!data.description || data.description.length < 120) {
    warnings.push('Description should be at least 120 characters long');
  }
  
  if (data.description && data.description.length > 160) {
    warnings.push('Description should be less than 160 characters for optimal display');
  }
  
  if (!data.keywords || data.keywords.length < 5) {
    warnings.push('Should have at least 5 keywords');
  }
  
  if (!data.canonical) {
    warnings.push('Canonical URL is missing');
  }
  
  if (!data.image) {
    warnings.push('OG image is missing');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings
  };
};