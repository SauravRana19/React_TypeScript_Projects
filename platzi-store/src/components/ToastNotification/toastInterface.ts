import type { ToastData } from "../../common/CommonInterface";

export interface ToastProps {
  onClose?: () => void;
  data: ToastData | {}
}
