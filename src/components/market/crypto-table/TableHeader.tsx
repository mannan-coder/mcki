import React, { memo } from 'react';
import { SortButton } from './SortButton';
import { TableHeaderProps } from './types';

export const TableHeader = memo(({ sortConfig, onSort, startIndex, endIndex, totalItems }: TableHeaderProps) => (
  <>
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b bg-card">
      <h3 className="text-xl font-bold text-foreground">Market Data</h3>
      <div className="text-sm text-muted-foreground font-medium">
        Showing {startIndex} to {endIndex} of {totalItems} coins
      </div>
    </div>

    {/* Table Header - Desktop only */}
    <div className="hidden lg:grid lg:grid-cols-8 gap-4 p-4 border-b bg-muted/20 font-medium text-sm">
      <SortButton label="Coin" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
      <div className="text-right">
        <SortButton label="Price" sortKey="price" sortConfig={sortConfig} onSort={onSort} />
      </div>
      <div className="text-right">
        <SortButton label="24h" sortKey="change24h" sortConfig={sortConfig} onSort={onSort} />
      </div>
      <div className="text-center">
        <span className="text-sm font-medium text-muted-foreground">7d Chart</span>
      </div>
      <div className="text-right">
        <SortButton label="Market Cap" sortKey="marketCap" sortConfig={sortConfig} onSort={onSort} />
      </div>
      <div className="text-right">
        <SortButton label="Volume" sortKey="volume" sortConfig={sortConfig} onSort={onSort} />
      </div>
      <div>
        <span className="text-sm font-medium text-muted-foreground">Trading Signals</span>
      </div>
    </div>
  </>
));