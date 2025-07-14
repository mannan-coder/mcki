import { useEffect, useState } from 'react';

interface LastUpdatedProps {
  timestamp?: string;
  prefix?: string;
}

export const LastUpdated = ({ timestamp, prefix = "Last updated" }: LastUpdatedProps) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!timestamp) {
        setTimeAgo('Never');
        return;
      }

      const now = new Date();
      const updateTime = new Date(timestamp);
      const diffInSeconds = Math.floor((now.getTime() - updateTime.getTime()) / 1000);

      if (diffInSeconds < 30) {
        setTimeAgo('Just now');
      } else if (diffInSeconds < 60) {
        setTimeAgo(`${diffInSeconds}s ago`);
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`${hours}h ago`);
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        setTimeAgo(`${days}d ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
      <span>{prefix}: {timeAgo}</span>
    </div>
  );
};