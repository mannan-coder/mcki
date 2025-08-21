import { Helmet } from 'react-helmet-async';

export interface Article {
  headline: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  image: string;
  url: string;
  wordCount?: number;
}

export interface Product {
  name: string;
  description: string;
  image: string;
  url: string;
  brand?: string;
  category?: string;
  offers?: {
    price: number;
    currency: string;
    availability: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  type: 'article' | 'product' | 'faq' | 'software' | 'financial-service';
  data: Article | Product | FAQ[] | any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const generateArticleSchema = (article: Article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": [article.image],
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "MCKI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mcki.online/logo.png"
      }
    },
    "datePublished": article.publishedDate,
    "dateModified": article.modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "wordCount": article.wordCount || 1000
  });

  const generateProductSchema = (product: Product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": [product.image],
    "brand": {
      "@type": "Brand",
      "name": product.brand || "MCKI"
    },
    "category": product.category || "Financial Software",
    "url": product.url,
    ...(product.offers && {
      "offers": {
        "@type": "Offer",
        "price": product.offers.price,
        "priceCurrency": product.offers.currency,
        "availability": `https://schema.org/${product.offers.availability}`
      }
    })
  });

  const generateFAQSchema = (faqs: FAQ[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  const generateSoftwareSchema = () => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MCKI",
    "operatingSystem": "Web Browser",
    "applicationCategory": "FinanceApplication",
    "description": "Advanced cryptocurrency arbitrage intelligence platform powered by AI",
    "url": "https://mcki.online",
    "screenshot": "https://mcki.online/screenshot.png",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "MCKI Platform"
    },
    "datePublished": "2024-01-01",
    "softwareVersion": "2.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1200"
    }
  });

  const generateFinancialServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "MCKI Crypto Intelligence",
    "description": "Professional cryptocurrency arbitrage and market intelligence services",
    "url": "https://mcki.online",
    "serviceType": "Cryptocurrency Analysis",
    "provider": {
      "@type": "Organization",
      "name": "MCKI",
      "url": "https://mcki.online"
    },
    "areaServed": "Global",
    "availableLanguage": "English"
  });

  let schema;
  switch (type) {
    case 'article':
      schema = generateArticleSchema(data as Article);
      break;
    case 'product':
      schema = generateProductSchema(data as Product);
      break;
    case 'faq':
      schema = generateFAQSchema(data as FAQ[]);
      break;
    case 'software':
      schema = generateSoftwareSchema();
      break;
    case 'financial-service':
      schema = generateFinancialServiceSchema();
      break;
    default:
      return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;