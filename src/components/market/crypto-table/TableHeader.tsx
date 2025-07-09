import React, { memo } from 'react';
import { SortButton } from './SortButton';
import { TableHeaderProps } from './types';

export const TableHeader = memo(({ sortConfig, onSort, startIndex, endIndex, totalItems }: TableHeaderProps) => (
  <>
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b bg-muted/20">
      <h3 className="text-xl font-bold text-foreground">Market Data</h3>
      <div className="text-sm text-muted-foreground font-medium">
        Showing {startIndex} to {endIndex} of {totalItems} coins
      </div>
    </div>

    {/* Table Header - Desktop only */}
    <div className="hidden lg:block border-b bg-muted/10">
      <div className="grid grid-cols-12 items-center py-4 px-6 gap-4 font-medium text-sm text-muted-foreground">
        <div className="col-span-1">#</div>
        <div className="col-span-2">
          <SortButton label="Name" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="Price" sortKey="price" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="24h %" sortKey="change24h" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-2 text-center">
          <span>7d Chart</span>
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="Market Cap" sortKey="marketCap" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="Volume" sortKey="volume" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-3">
          <span>Trading Signals</span>
        </div>
      </div>
    </div>
  </>
));