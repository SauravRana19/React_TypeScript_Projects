export interface UserDetailFormProps {
  open: boolean;
  onClose: (formdata?:{}) => void;
  data?:UserDetailFormData
  btnType?: 'submit'|'update' | string
}

export interface UserDetailFormData {
  id?:any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender:string,
  status:string
  role:string,
}