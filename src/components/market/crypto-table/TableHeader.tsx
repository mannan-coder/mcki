import React, { memo } from 'react';
import { SortButton } from './SortButton';
import { TableHeaderProps } from './types';

export const TableHeader = memo(({ sortConfig, onSort, startIndex, endIndex, totalItems }: TableHeaderProps) => (
  <>
    {/* Optimized Header */}
    <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-muted/10 to-muted/5">
      <div>
        <h3 className="text-lg font-bold text-foreground">Market Data</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Showing {startIndex}-{endIndex} of {totalItems.toLocaleString()} cryptocurrencies
        </p>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs bg-muted/20 px-3 py-1.5 rounded-lg border">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        <span className="text-muted-foreground">Live Data</span>
      </div>
    </div>

    {/* Enhanced Table Header - Desktop */}
    <div className="hidden lg:block bg-gradient-to-r from-muted/5 to-muted/10 border-b sticky top-0 z-10">
      <div className="grid grid-cols-12 items-center py-3 px-4 gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <div className="col-span-1 flex items-center gap-1">
          <span>#</span>
        </div>
        <div className="col-span-2">
          <SortButton label="Cryptocurrency" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="Price (USD)" sortKey="price" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="24h Change" sortKey="change24h" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-2 text-center">
          <span>Price Trend (7d)</span>
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="Market Cap" sortKey="marketCap" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-1 text-right">
          <SortButton label="Volume (24h)" sortKey="volume" sortConfig={sortConfig} onSort={onSort} />
        </div>
        <div className="col-span-3 text-center">
          <span>Trading Indicators</span>
        </div>
      </div>
    </div>
  </>
));