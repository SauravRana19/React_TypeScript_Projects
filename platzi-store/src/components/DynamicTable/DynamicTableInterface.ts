interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}
export interface TableData {
  id: number;
  name: string;
  email: string;
  status: string;
  originalData: User;
  [key: string]: any;
}

export interface Column {
  field: string;
  headerName: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  renderCell?: (value: any, row: any) => React.ReactNode;
}

export interface DynamicTableProps {
  columns: Column[];
  data: TableData[];
  title?: string;
  defaultSortField: string;
  defaultSortDirection?: "asc" | "desc";
  pagination?: boolean;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  stickyHeader?: boolean;
  elevation?: number;
  sx?: object;
}
