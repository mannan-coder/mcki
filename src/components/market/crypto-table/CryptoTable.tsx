import React, { memo } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CoinRowSkeleton, TableHeaderSkeleton } from '../SkeletonLoader';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import { CoinRow } from './CoinRow';
import { CryptoTableProps } from './types';

export const CryptoTable = memo(({
  data,
  loading,
  sortConfig,
  onSort,
  onToggleFavorite,
  favorites,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex
}: CryptoTableProps) => {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl bg-gradient-to-b from-card/90 to-card border border-border/50 shadow-2xl backdrop-blur-sm">
        <TableHeaderSkeleton />
        {[...Array(10)].map((_, i) => (
          <CoinRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <TableHeader
        sortConfig={sortConfig}
        onSort={onSort}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
      />

      {/* Optimized Table Body */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {data.length > 0 ? (
            data.map((coin, index) => (
              <CoinRow
                key={coin.id}
                coin={coin}
                index={index}
                onToggleFavorite={onToggleFavorite}
                favorites={favorites}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="max-w-sm mx-auto space-y-2">
                <div className="w-12 h-12 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">No cryptocurrencies found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filter</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border/30 bg-muted/20">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
});