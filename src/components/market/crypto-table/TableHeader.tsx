import React, { memo } from 'react';
import { SortButton } from './SortButton';
import { TableHeaderProps } from './types';

export const TableHeader = memo(({ sortConfig, onSort, startIndex, endIndex, totalItems }: TableHeaderProps) => (
  <>
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b bg-muted/20">
      <h3 className="text-lg font-semibold">Market Data</h3>
      <div className="text-sm text-muted-foreground">
        Showing {startIndex} to {endIndex} of {totalItems} coins
      </div>
    </div>

    {/* Table Header - Desktop only */}
    <div className="hidden lg:grid lg:grid-cols-7 gap-4 p-4 border-b bg-muted/10">
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
        <span className="text-sm font-medium text-muted-foreground">Live Signals</span>
      </div>
    </div>
  </>
));