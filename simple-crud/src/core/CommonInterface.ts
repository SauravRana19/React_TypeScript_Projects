import type { UserDetailFormData } from "../components/UserDetails/userdetailinterface";

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

export interface ToastData {
  show: boolean;
  type: "error" | "warning" | "info" | "success";
  message: string;
}

export interface CommonState {
  role?: "admin" | "user" | string;
  authToken?: string;
  isLoader?: boolean;
  tableData?: TableData | [];
  userDialogData?: UserDetailFormData | {};
  btnType?: string;
  isDialog?: boolean;
  toastData?: ToastData | {};
}

export interface State {
  commonMethods: CommonState;
}

export interface LoginForm {
  email: string;
  password: string;
}