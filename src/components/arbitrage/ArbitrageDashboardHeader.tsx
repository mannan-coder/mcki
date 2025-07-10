import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface ArbitrageDashboardHeaderProps {
  opportunitiesCount: number;
  avgSpread: number;
}

export const ArbitrageDashboardHeader = ({ 
  opportunitiesCount, 
  avgSpread 
}: ArbitrageDashboardHeaderProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-foreground font-medium">
            <span className="text-success">{opportunitiesCount}</span> Active
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <span className="text-foreground font-medium">
            Avg: <span className="text-warning">{avgSpread?.toFixed(2)}%</span>
          </span>
        </div>
      </div>
      <Link 
        to="/arbitrage"
        className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
      >
        <span>Analysis</span>
        <ExternalLink size={14} />
      </Link>
    </div>
  );
};