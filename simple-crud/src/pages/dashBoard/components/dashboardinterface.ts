import type { JSX } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

export interface TableColumn {
     field: string;
     headerName: string;
     sortable: boolean;
     renderCell?: (_: any, row?: any) => JSX.Element 
    }[]
export interface TableData{
  id: number;
  name: string;
  email: string;
  status: string;
  originalData: User;
}