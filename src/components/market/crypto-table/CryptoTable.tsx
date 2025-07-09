import React, { memo } from 'react';
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
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-card to-muted/30">
        <TableHeaderSkeleton />
        {[...Array(10)].map((_, i) => (
          <CoinRowSkeleton key={i} />
        ))}
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-card to-muted/30">
      <TableHeader
        sortConfig={sortConfig}
        onSort={onSort}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
      />

      {/* Table Body */}
      <div className="divide-y divide-border/30">
        {data.map((coin, index) => (
          <CoinRow
            key={coin.id}
            coin={coin}
            index={index}
            onToggleFavorite={onToggleFavorite}
            favorites={favorites}
          />
        ))}
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Card>
  );
});