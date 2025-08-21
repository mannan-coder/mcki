import { useEffect } from 'react';

// Static generation helper component
export const StaticGenerator = () => {
  useEffect(() => {
    // Signal that the page is ready for static generation
    if (typeof window !== 'undefined') {
      // Dispatch custom event when page is fully loaded
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('render-event'));
      }, 1000); // Wait 1s for dynamic content to load
      
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};

// Hook for prerendering optimization
export const usePrerender = () => {
  useEffect(() => {
    // Optimize for static generation
    if (typeof window !== 'undefined') {
      // Add meta tag to indicate page is prerendered
      const meta = document.createElement('meta');
      meta.name = 'prerendered';
      meta.content = 'true';
      document.head.appendChild(meta);
      
      // Clean up on unmount
      return () => {
        const existingMeta = document.querySelector('meta[name="prerendered"]');
        if (existingMeta) {
          existingMeta.remove();
        }
      };
    }
  }, []);
};

export default StaticGenerator;