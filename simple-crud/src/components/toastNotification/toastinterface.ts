import type { ToastData } from "../../core/CommonInterface";

export interface ToastProps {
  onClose?: () => void;
  data: ToastData | {} |{
  show: boolean;
  type: "error" | "warning" | "info" | "success";
  message: string;
}
}
