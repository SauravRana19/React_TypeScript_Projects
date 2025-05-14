export interface ToastProps {
  onClose: () => void;
  data: {
    show:boolean,
    type:"error" | "warning" | "info" | "success";
    message:string
  }; 
}
