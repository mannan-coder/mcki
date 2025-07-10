interface ArbitrageStatsProps {
  stats: {
    totalOpportunities: number;
    avgSpread: number;
    estimatedDailyVolume: number;
  };
  isDarkMode: boolean;
}

const ArbitrageStats = ({ stats, isDarkMode }: ArbitrageStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* Active Opportunities Card */}
      <div className="bg-card border border-border rounded-lg p-4 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-base font-semibold mb-2 text-foreground">
          Active Opportunities
        </h3>
        <div className="text-2xl font-bold text-success mb-2">{stats.totalOpportunities || 0}</div>
        <p className="text-xs text-muted-foreground">
          Profitable trades available
        </p>
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">High Risk:</span>
            <span className="text-destructive font-medium">3</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-muted-foreground">Medium:</span>
            <span className="text-warning font-medium">8</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-muted-foreground">Low Risk:</span>
            <span className="text-success font-medium">13</span>
          </div>
        </div>
      </div>

      {/* Average Spread Card */}
      <div className="bg-card border border-border rounded-lg p-4 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-base font-semibold mb-2 text-foreground">
          Avg. Spread
        </h3>
        <div className="text-2xl font-bold text-primary mb-2">{stats.avgSpread?.toFixed(2) || 0}%</div>
        <p className="text-xs text-muted-foreground">
          Across all exchanges
        </p>
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Highest:</span>
            <span className="text-success font-medium">1.96%</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-muted-foreground">Lowest:</span>
            <span className="text-foreground font-medium">1.10%</span>
          </div>
        </div>
      </div>

      {/* Total Volume Card */}
      <div className="bg-card border border-border rounded-lg p-4 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-base font-semibold mb-2 text-foreground">
          Total Volume
        </h3>
        <div className="text-2xl font-bold text-accent mb-2">${((stats.estimatedDailyVolume || 0) / 1000).toFixed(1)}B</div>
        <p className="text-xs text-muted-foreground">
          24h arbitrage volume
        </p>
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">BTC:</span>
            <span className="text-warning font-medium">$847M</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-muted-foreground">ETH:</span>
            <span className="text-primary font-medium">$692M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitrageStats;