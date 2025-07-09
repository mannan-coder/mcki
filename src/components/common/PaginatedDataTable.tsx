import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Column {
  key: string;
  header: string;
  className?: string;
  sortable?: boolean;
  render?: (value: any, row: any, index: number) => ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  skeletonRows?: number;
  className?: string;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    key: string;
    direction: 'asc' | 'desc';
    onSort: (key: string) => void;
  };
}

export const DataTable = ({
  data,
  columns,
  loading = false,
  skeletonRows = 5,
  className = "",
  emptyMessage = "No data available",
  pagination,
  sorting
}: DataTableProps) => {
  const getSortIcon = (columnKey: string) => {
    if (!sorting || sorting.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />;
    }
    return sorting.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-primary" />
      : <ChevronDown className="h-4 w-4 text-primary" />;
  };

  const handleSort = (columnKey: string) => {
    if (sorting?.onSort) {
      sorting.onSort(columnKey);
    }
  };

  if (loading) {
    return (
      <div className={`overflow-hidden rounded-lg border border-border ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${column.className || ''}`}
                  >
                    <div className="h-4 bg-muted-foreground/20 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {Array.from({ length: skeletonRows }).map((_, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3">
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`overflow-hidden rounded-lg border border-border ${className}`}>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const renderPagination = () => {
    if (!pagination) return null;

    const { currentPage, totalPages, pageSize, totalItems, onPageChange } = pagination;
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    // Generate page numbers to show
    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      return pages;
    };

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border">
        <div className="flex items-center text-sm text-muted-foreground">
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <Button
                key={index}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                className="min-w-[40px]"
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
              >
                {page}
              </Button>
            ))}
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
      </div>
    );
  };

  return (
    <motion.div
      className={`overflow-hidden rounded-lg border border-border ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.sortable ? (
                    <button
                      className="flex items-center space-x-1 hover:text-foreground transition-colors group"
                      onClick={() => handleSort(column.key)}
                    >
                      <span>{column.header}</span>
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {data.map((row, index) => (
              <motion.tr
                key={index}
                className="hover:bg-muted/30 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-3 ${column.className || ''}`}>
                    {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {renderPagination()}
    </motion.div>
  );
};