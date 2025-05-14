export interface UserDetailFormProps {
  open: boolean;
  onClose: () => void;
  data?:UserDetailFormData
}

export interface UserDetailFormData {
  id?:any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender:string,
  status:String
}