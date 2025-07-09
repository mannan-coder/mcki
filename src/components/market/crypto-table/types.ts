export interface CryptoTableProps {
  data: any[];
  loading?: boolean;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onSort: (key: string) => void;
  onToggleFavorite?: (coinId: string) => void;
  favorites?: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export interface SortButtonProps {
  label: string;
  sortKey: string;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onSort: (key: string) => void;
}

export interface CoinRowProps {
  coin: any;
  index: number;
  onToggleFavorite?: (coinId: string) => void;
  favorites?: string[];
  lastUpdateTime?: number;
}

export interface TableHeaderProps {
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onSort: (key: string) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}