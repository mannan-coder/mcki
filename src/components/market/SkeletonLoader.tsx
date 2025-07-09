import React from 'react';

export const CoinRowSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b border-border/50 animate-pulse">
    <div className="flex items-center space-x-3 flex-1">
      <div className="w-8 h-8 bg-muted rounded-full" />
      <div className="space-y-1">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-3 w-12 bg-muted rounded" />
      </div>
    </div>
    <div className="flex items-center space-x-6">
      <div className="h-4 w-16 bg-muted rounded" />
      <div className="h-4 w-12 bg-muted rounded" />
      <div className="h-8 w-20 bg-muted rounded" />
      <div className="h-4 w-16 bg-muted rounded" />
      <div className="flex space-x-1">
        <div className="h-6 w-16 bg-muted rounded" />
        <div className="h-6 w-16 bg-muted rounded" />
      </div>
    </div>
  </div>
);

export const MarketStatsSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="p-4 bg-card rounded-xl border animate-pulse">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="h-6 w-20 bg-muted rounded" />
          <div className="h-3 w-12 bg-muted rounded" />
        </div>
      </div>
    ))}
  </div>
);

export const TopMoversSkeletonCard = () => (
  <div className="p-4 bg-card rounded-xl border animate-pulse">
    <div className="space-y-3">
      <div className="h-5 w-24 bg-muted rounded" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-muted rounded-full" />
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="h-4 w-12 bg-muted rounded" />
        </div>
      ))}
    </div>
  </div>
);

export const TableHeaderSkeleton = () => (
  <div className="grid grid-cols-7 gap-4 p-4 border-b bg-muted/20 animate-pulse">
    {['Coin', 'Price', '24h', '7d', 'Market Cap', 'Volume', 'Signals'].map((_, i) => (
      <div key={i} className="h-4 bg-muted rounded" />
    ))}
  </div>
);