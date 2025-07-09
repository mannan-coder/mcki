import React, { memo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SortButtonProps } from './types';

export const SortButton = memo(({ label, sortKey, sortConfig, onSort }: SortButtonProps) => (
  <button
    onClick={() => onSort(sortKey)}
    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
  >
    <span>{label}</span>
    {sortConfig.key === sortKey && (
      sortConfig.direction === 'asc' ? 
        <ChevronUp className="h-3 w-3" /> : 
        <ChevronDown className="h-3 w-3" />
    )}
  </button>
));