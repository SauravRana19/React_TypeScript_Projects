import type { CardProps } from "../components/CommonCard/Card";

export interface ToastData {
  show: boolean;
  type?: "error" | "warning" | "info" | "success";
  message?: string;
}

export interface CommonState {
  isLoader?: boolean;
  btnType?: string;
  isDialog?: boolean;
  toastData?: ToastData | {};
  showPassword?:boolean
}

export interface AuthState {
  role: string,
  authToken:string,
  refreshToken:string
}

export interface ProductState {
  productsData:[];
  isDrawer:boolean
  drawerData:CardProps
}

export interface UsersState {
  usersData:[],
  userUpdateData:{}
  btnType:string
}
export interface CategoriesState {
 categoriesData:any
}


export interface State {
  commonMethods: CommonState;
  auth:AuthState;
  products:ProductState;
  users:UsersState;
  categories:CategoriesState;
}

export interface LoginForm {
  email: string;
  password: string;
}
