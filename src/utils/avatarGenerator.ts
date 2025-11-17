/**
 * Generate a local data URI SVG avatar with initials
 * Replaces external via.placeholder.com calls
 */

export const generateAvatarDataUri = (
  text: string,
  size: number = 32,
  bgColor: string = '666666',
  textColor: string = 'ffffff'
): string => {
  const initial = text.charAt(0).toUpperCase();
  const fontSize = Math.floor(size * 0.5);
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="#${bgColor}" rx="${size * 0.1}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="central" 
        text-anchor="middle" 
        fill="#${textColor}" 
        font-family="Inter, sans-serif" 
        font-weight="600" 
        font-size="${fontSize}px"
      >
        ${initial}
      </text>
    </svg>
  `;
  
  // Encode SVG to data URI
  const encoded = encodeURIComponent(svg.trim());
  return `data:image/svg+xml,${encoded}`;
};

/**
 * Get fallback avatar for coin images
 */
export const getCoinFallbackAvatar = (symbol: string, size: number = 32): string => {
  return generateAvatarDataUri(symbol, size, '3b82f6', 'ffffff');
};

/**
 * Get fallback avatar for exchange logos
 */
export const getExchangeFallbackAvatar = (exchange: string, size: number = 24): string => {
  return generateAvatarDataUri(exchange, size, '8b5cf6', 'ffffff');
};
