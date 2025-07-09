import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { TablePaginationProps } from './types';

export const TablePagination = memo(({ currentPage, totalPages, onPageChange }: TablePaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between p-4 border-t bg-muted/10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <div className="flex items-center space-x-2">
        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
          if (pageNum > totalPages) return null;
          
          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              className="w-8 h-8 p-0"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
});