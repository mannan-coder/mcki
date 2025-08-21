import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes = '100vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string) => {
    if (!width) return '';
    
    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map(multiplier => {
        const targetWidth = Math.round(width * multiplier);
        return `${baseSrc}?w=${targetWidth}&q=${quality} ${multiplier}x`;
      })
      .join(', ');
  };

  // Generate sizes attribute for responsive images
  const generateSizes = () => {
    if (sizes !== '100vw') return sizes;
    
    if (width) {
      return `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`;
    }
    
    return '100vw';
  };

  // Lazy loading implementation
  useEffect(() => {
    if (loading === 'eager' || priority) {
      setCurrentSrc(src);
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px'
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, loading, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder component
  const Placeholder = () => (
    <div
      className={`bg-muted animate-pulse ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
      aria-label={`Loading ${alt}`}
    />
  );

  // Error fallback component
  const ErrorFallback = () => (
    <div
      className={`bg-muted border border-border flex items-center justify-center ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      <span className="text-muted-foreground text-sm">Failed to load image</span>
    </div>
  );

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className="relative">
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover filter blur-sm ${className}`}
          aria-hidden="true"
        />
      )}
      
      {!currentSrc && loading === 'lazy' && <Placeholder />}
      
      {currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          srcSet={generateSrcSet(currentSrc)}
          sizes={generateSizes()}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      )}
    </div>
  );
};

// Higher-order component for image preloading
export const withImagePreload = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function PreloadedComponent(props: P & { preloadImages?: string[] }) {
    const { preloadImages = [], ...componentProps } = props;

    useEffect(() => {
      // Preload critical images
      preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    }, [preloadImages]);

    return <WrappedComponent {...(componentProps as P)} />;
  };
};

// Hook for responsive image sizing
export const useResponsiveImage = (
  baseSrc: string,
  breakpoints: { [key: string]: number } = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  }
) => {
  const [currentSrc, setCurrentSrc] = useState(baseSrc);

  useEffect(() => {
    const updateSrc = () => {
      const width = window.innerWidth;
      let targetWidth = 640; // default

      Object.entries(breakpoints).forEach(([key, breakpoint]) => {
        if (width >= breakpoint) {
          targetWidth = breakpoint;
        }
      });

      setCurrentSrc(`${baseSrc}?w=${targetWidth}&q=75`);
    };

    updateSrc();
    window.addEventListener('resize', updateSrc);

    return () => {
      window.removeEventListener('resize', updateSrc);
    };
  }, [baseSrc, breakpoints]);

  return currentSrc;
};

export default OptimizedImage;