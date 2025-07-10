import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SEOHead = ({
  title = "MCKI - Multi-Chain Knowledge Intelligence",
  description = "Advanced cryptocurrency arbitrage intelligence powered by AI. Real-time market analysis, profitable trading opportunities, and comprehensive tools for cryptocurrency arbitrage across top exchanges.",
  keywords = [
    "crypto arbitrage",
    "cryptocurrency trading", 
    "bitcoin arbitrage",
    "blockchain analysis",
    "trading tools",
    "market intelligence",
    "crypto scanner",
    "exchange comparison",
    "trading calculator",
    "DeFi analysis"
  ],
  canonical,
  ogImage = "https://mcki.online/og-image.png",
  noIndex = false
}: SEOHeadProps) => {
  const siteTitle = "MCKI - Crypto Intelligence Platform";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="MCKI" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mcki_crypto" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="MCKI Platform" />
      <meta name="language" content="English" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "MCKI",
          "description": description,
          "url": "https://mcki.online",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "MCKI Platform"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;