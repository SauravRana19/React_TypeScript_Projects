import { Mui } from "../../theme";
import type { ToastProps } from "./toastInterface";

export const Toast = ({ onClose, data }: ToastProps) => {
  return (
    <div>
      <Mui.Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={data.show}
        autoHideDuration={2000}
        onClose={onClose}
      >
        <Mui.Alert onClose={onClose} severity={data.type} variant="filled">
          <Mui.Typography
            sx={{ textAlign: "center" }}
          >
            {data.message}
          </Mui.Typography>
          
        </Mui.Alert>
      </Mui.Snackbar>
    </div>
  );
};
