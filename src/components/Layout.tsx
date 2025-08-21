
import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdSenseScript from '@/components/ads/AdSenseScript';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { performanceMonitor, preloadCriticalResources } from '@/utils/performanceOptimization';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  seoProps?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    structuredData?: object;
    breadcrumbs?: Array<{
      name: string;
      url: string;
    }>;
  };
}

const Layout = ({ children, showFooter = true, seoProps = {} }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    // Performance monitoring
    performanceMonitor.measurePageLoad();
    performanceMonitor.measureLCP();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Set dark mode as default on first load
    if (!document.documentElement.classList.contains('dark') && !document.documentElement.classList.contains('light')) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = (newMode: boolean) => {
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
      <ErrorBoundary>
        <SEOOptimizer {...seoProps} />
        <AdSenseScript />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={handleThemeToggle} />
        
        <main className="relative z-10">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          }>
            {children}
          </Suspense>
        </main>
        
        {showFooter && <Footer isDarkMode={isDarkMode} />}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
