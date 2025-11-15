import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG, generatePageTitle, generateCanonicalUrl } from '@/utils/seoHelpers';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

export const useSEO = (seoData: SEOData = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title
    const title = generatePageTitle(seoData.title);
    document.title = title;
    
    // Update meta description
    const description = seoData.description || SEO_CONFIG.defaultDescription;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update canonical URL
    const canonical = seoData.canonical || generateCanonicalUrl(location.pathname);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
    // Update keywords
    if (seoData.keywords && seoData.keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', [...SEO_CONFIG.keywords, ...seoData.keywords].join(', '));
    }
    
    // Update Open Graph image
    const ogImage = seoData.ogImage || SEO_CONFIG.defaultImage;
    let ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (!ogImageMeta) {
      ogImageMeta = document.createElement('meta');
      ogImageMeta.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageMeta);
    }
    ogImageMeta.setAttribute('content', ogImage);
    
    // Track page view for analytics (only in production)
    if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [seoData, location.pathname]);
  
  return {
    title: generatePageTitle(seoData.title),
    description: seoData.description || SEO_CONFIG.defaultDescription,
    canonical: seoData.canonical || generateCanonicalUrl(location.pathname),
  };
};

// Hook for dynamic SEO updates
export const useDynamicSEO = () => {
  const updateSEO = (seoData: SEOData) => {
    // Update title
    if (seoData.title) {
      document.title = generatePageTitle(seoData.title);
    }
    
    // Update description
    if (seoData.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', seoData.description);
      }
    }
    
    // Update OG tags
    if (seoData.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', seoData.ogImage);
      }
    }
    
    // Add structured data
    if (seoData.structuredData) {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.textContent = JSON.stringify(seoData.structuredData);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(seoData.structuredData);
        document.head.appendChild(script);
      }
    }
  };
  
  return { updateSEO };
};

// Hook for monitoring SEO health
export const useSEOHealth = () => {
  const checkSEOHealth = () => {
    const issues: string[] = [];
    
    // Check title
    const title = document.title;
    if (!title || title.length < 10) {
      issues.push('Title is too short or missing');
    }
    if (title && title.length > 60) {
      issues.push('Title is too long (over 60 characters)');
    }
    
    // Check description
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (!description || description.length < 120) {
      issues.push('Meta description is too short or missing');
    }
    if (description && description.length > 160) {
      issues.push('Meta description is too long (over 160 characters)');
    }
    
    // Check canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      issues.push('Canonical URL is missing');
    }
    
    // Check h1 tags
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length === 0) {
      issues.push('No H1 tag found');
    }
    if (h1Tags.length > 1) {
      issues.push('Multiple H1 tags found');
    }
    
    // Check images without alt text
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
      issues.push(`${imagesWithoutAlt.length} images missing alt text`);
    }
    
    return {
      isHealthy: issues.length === 0,
      issues,
      score: Math.max(0, 100 - (issues.length * 10))
    };
  };
  
  return { checkSEOHealth };
};