import { Mui } from "../../theme";
import type { ToastProps } from "./toastinterface";

export const Toast = ({ onClose, data }: ToastProps) => {
  return (
    <div>
      <Mui.Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={data.show} 
      autoHideDuration={2000} 
      onClose={onClose}>
        <Mui.Alert
          onClose={onClose}
          severity={data.type}
          variant="filled"
        >
          {data.message}
        </Mui.Alert>
      </Mui.Snackbar>
    </div>
  );
};
