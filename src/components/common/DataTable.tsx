import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Column {
  key: string;
  header: string;
  className?: string;
  render?: (value: any, row: any, index: number) => ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  skeletonRows?: number;
  className?: string;
  emptyMessage?: string;
}

export const DataTable = ({
  data,
  columns,
  loading = false,
  skeletonRows = 5,
  className = "",
  emptyMessage = "No data available"
}: DataTableProps) => {
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
                  {column.header}
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
                transition={{ delay: index * 0.05 }}
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
    </motion.div>
  );
};