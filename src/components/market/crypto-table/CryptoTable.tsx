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
    <div className="overflow-hidden rounded-xl bg-gradient-to-b from-card/90 to-card">
      <TableHeader
        sortConfig={sortConfig}
        onSort={onSort}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
      />

      {/* Professional Table Body */}
      <div className="overflow-x-auto bg-card/50 backdrop-blur-sm">
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
            <div className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-3">
                <div className="w-16 h-16 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No cryptocurrencies found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-card via-card/90 to-card border-t border-border/30">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
});