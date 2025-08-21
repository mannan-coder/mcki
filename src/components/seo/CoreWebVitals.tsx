import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

const CoreWebVitals = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const sendToAnalytics = (metric: WebVitalsMetric) => {
      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
      
      // Send to custom analytics endpoint
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/analytics/web-vitals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: metric.name,
            value: metric.value,
            id: metric.id,
            delta: metric.delta,
            url: window.location.href,
            timestamp: Date.now(),
          }),
        }).catch(console.error);
      }
      
      // Console log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric);
      }
    };

    // Measure and track each Core Web Vital
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
};

// Hook for manual performance tracking
export const usePerformanceTracking = () => {
  const trackCustomMetric = (name: string, value: number, unit: string = 'ms') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'custom_metric', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(value),
        custom_parameter_1: unit,
      });
    }
  };

  const trackPageLoadTime = () => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigationTiming = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigationTiming) {
        const pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
        trackCustomMetric('page_load_time', pageLoadTime);
        
        const domContentLoaded = navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart;
        trackCustomMetric('dom_content_loaded', domContentLoaded);
        
        const firstPaint = window.performance.getEntriesByName('first-paint')[0];
        if (firstPaint) {
          trackCustomMetric('first_paint', firstPaint.startTime);
        }
      }
    }
  };

  const trackResourceTiming = () => {
    if (typeof window !== 'undefined' && window.performance) {
      const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      // Track slow resources (> 1 second)
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      slowResources.forEach(resource => {
        trackCustomMetric('slow_resource', resource.duration);
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'slow_resource', {
            event_category: 'Performance',
            event_label: resource.name,
            value: Math.round(resource.duration),
          });
        }
      });
    }
  };

  return {
    trackCustomMetric,
    trackPageLoadTime,
    trackResourceTiming,
  };
};

export default CoreWebVitals;