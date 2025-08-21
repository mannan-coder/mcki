import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  articleData?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: Record<string, any>;
  noIndex?: boolean;
  noFollow?: boolean;
}

const SEOOptimizer = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  articleData,
  structuredData,
  noIndex = false,
  noFollow = false
}: SEOOptimizerProps) => {
  const location = useLocation();
  
  // Default SEO values
  const defaultTitle = "MCKI - Professional Crypto Intelligence Platform";
  const defaultDescription = "Advanced cryptocurrency arbitrage intelligence powered by AI. Real-time market analysis, profitable trading opportunities, and comprehensive tools for multi-chain operations.";
  const defaultKeywords = [
    "crypto arbitrage",
    "cryptocurrency trading",
    "bitcoin arbitrage",
    "blockchain analysis",
    "trading tools",
    "market intelligence",
    "crypto scanner",
    "exchange comparison",
    "trading calculator",
    "DeFi analysis",
    "real-time crypto data",
    "cryptocurrency alerts",
    "market sentiment analysis",
    "whale tracking",
    "crypto news",
    "live prices"
  ];
  
  const siteTitle = title ? `${title} | MCKI` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = [...defaultKeywords, ...keywords];
  const currentUrl = `https://mcki.online${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;
  const imageUrl = ogImage || "https://mcki.online/og-image.png";
  
  // Generate breadcrumb structured data
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'Home', url: 'https://mcki.online' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({
        name,
        url: `https://mcki.online${currentPath}`
      });
    });
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  };
  
  // Generate website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MCKI",
    "alternateName": "Multi-Chain Knowledge Intelligence",
    "url": "https://mcki.online",
    "description": defaultDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mcki.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://twitter.com/mcki_crypto",
      "https://github.com/mcki-crypto",
      "https://linkedin.com/company/mcki-crypto"
    ]
  };
  
  // Generate organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MCKI",
    "alternateName": "Multi-Chain Knowledge Intelligence",
    "url": "https://mcki.online",
    "logo": "https://mcki.online/logo.png",
    "description": defaultDescription,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-MCKI-CRYPTO",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/mcki_crypto",
      "https://github.com/mcki-crypto",
      "https://linkedin.com/company/mcki-crypto"
    ]
  };
  
  // Combine all structured data
  const allStructuredData = [
    websiteStructuredData,
    organizationStructuredData,
    generateBreadcrumbs(),
    ...(structuredData ? [structuredData] : [])
  ];
  
  const robotsContent = `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords.join(', ')} />
      <meta name="author" content="MCKI Platform" />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="coverage" content="Worldwide" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="MCKI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mcki_crypto" />
      <meta name="twitter:creator" content="@mcki_crypto" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={siteTitle} />
      
      {/* Article-specific meta tags */}
      {articleData && (
        <>
          <meta property="article:author" content={articleData.author} />
          <meta property="article:published_time" content={articleData.publishedTime} />
          <meta property="article:modified_time" content={articleData.modifiedTime} />
          <meta property="article:section" content={articleData.section} />
          {articleData.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO tags */}
      <meta name="theme-color" content="#F0B90B" />
      <meta name="msapplication-TileColor" content="#F0B90B" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.coingecko.com" />
      <link rel="preconnect" href="https://tszsmthiqnzwkytrqbtd.supabase.co" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//google-analytics.com" />
      <link rel="dns-prefetch" href="//googletagmanager.com" />
      <link rel="dns-prefetch" href="//googlesyndication.com" />
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOOptimizer;