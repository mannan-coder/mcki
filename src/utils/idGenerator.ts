// Utility to generate unique IDs for chart components to avoid conflicts
let idCounter = 0;

export const generateUniqueId = (prefix: string): string => {
  return `${prefix}-${++idCounter}-${Date.now()}`;
};

export const generateChartIds = (componentName: string) => {
  const baseId = generateUniqueId(componentName);
  
  return {
    priceAxis: `${baseId}-price`,
    volumeAxis: `${baseId}-volume`,
    leftAxis: `${baseId}-left`,
    rightAxis: `${baseId}-right`,
    gradient: `${baseId}-gradient`,
    stack: `${baseId}-stack`
  };
};