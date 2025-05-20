import type { JSX } from "react";
export interface TableColumn {
     field: string;
     headerName: string;
     sortable: boolean;
     renderCell?: (_: any, row?: any) => JSX.Element 
    }[]