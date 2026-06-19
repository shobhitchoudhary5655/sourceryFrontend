export interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (
    value: unknown,
    row: T
  ) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;

  currentPage?: number;
  totalPages?: number;

  onPageChange?: (
    page: number
  ) => void;
}