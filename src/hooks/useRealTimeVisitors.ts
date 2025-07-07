import { useState, useEffect } from 'react';

export const useRealTimeVisitors = (initialValue: number = 147) => {
  const [realTimeVisitors, setRealTimeVisitors] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeVisitors(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(50, Math.min(300, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return realTimeVisitors;
};