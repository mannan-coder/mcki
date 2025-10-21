/**
 * Centralized AdSense Configuration
 * Publisher ID: ca-pub-5532318785992990
 * All ad placements are managed here for easy updates
 */

export const adsConfig = {
  client: "ca-pub-5532318785992990",
  bannerSlot: "8636350170",
  
  // Ad placement settings
  lazyLoadThreshold: 200, // Load ads 200px before viewport
  adLoadTimeout: 3000, // Hide if not loaded within 3 seconds
  
  // Layout shift prevention
  minHeights: {
    horizontal: 90,
    rectangle: 250,
    vertical: 600
  }
} as const;

export default adsConfig;
