import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { TablePaginationProps } from './types';

export const TablePagination = memo(({ currentPage, totalPages, onPageChange }: TablePaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/5 to-muted/10">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 px-3 text-xs font-medium"
        >
          ← Previous
        </Button>
        
        {currentPage > 3 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              className="w-8 h-8 p-0 text-xs"
            >
              1
            </Button>
            {currentPage > 4 && <span className="text-muted-foreground text-sm">...</span>}
          </>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 p-0 text-xs font-semibold ${
              currentPage === pageNum 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'hover:bg-muted/50'
            }`}
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="text-muted-foreground text-sm">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 p-0 text-xs"
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 px-3 text-xs font-medium"
        >
          Next →
        </Button>
      </div>
    </div>
  );
});