import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import adsConfig from "@/config/ads.config";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner() {
  const adRef = useRef<HTMLModElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !adRef.current || isInitialized.current) {
      return;
    }

    try {
      // Check if ad is already initialized
      if (!adRef.current.dataset.adsenseInit) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current.dataset.adsenseInit = "1";
        isInitialized.current = true;
      }
    } catch (err) {
      console.warn("AdSense push skipped:", err);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center items-center"
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: "block", 
          minHeight: `${adsConfig.minHeights.horizontal}px`,
          width: "100%"
        }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adsConfig.bannerSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      />
    </motion.div>
  );
}
