import { useInView } from "react-intersection-observer";
import AdBanner from "./AdBanner";
import adsConfig from "@/config/ads.config";

interface LazyAdBannerProps {
  className?: string;
}

export default function LazyAdBanner({ className = "" }: LazyAdBannerProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: `${adsConfig.lazyLoadThreshold}px`,
  });

  return (
    <div ref={ref} className={`flex justify-center w-full ${className}`}>
      {inView && (
        <div className="w-full max-w-7xl">
          <div className="text-xs text-muted-foreground text-center mb-2">
            Advertisement
          </div>
          <AdBanner />
        </div>
      )}
    </div>
  );
}
