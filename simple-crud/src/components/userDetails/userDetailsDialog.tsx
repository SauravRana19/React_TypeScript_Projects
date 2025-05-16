import { useRef } from "react";
import { Mui } from "../../theme";
import type { UserDetailFormProps } from "./userdetailinterface";
import { UserDetailsForm } from "./userDetailsForm";
import { ApiService } from "../../services/api/apiService";

export const UserDetailsDialog = ({
  open,
  onClose,
  data,
  btnType,
}: UserDetailFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.triggerValidation();
      if (isValid) {
        const formData = formRef.current.getFormValues();
        btnType === 'submit' ?  ApiService.createNewUser(formData) : ApiService.updateUser(data?.id, formData);
        onClose()
      }
    }
  };
 
  return (
    <>
      <Mui.Dialog open={open} onClose={onClose} disableEscapeKeyDown>
        <Mui.DialogTitle id="user-dialog-title">
          {"User Profile Detail's"}
        </Mui.DialogTitle>
        <Mui.IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Mui.CloseIcon />
        </Mui.IconButton>
        <Mui.DialogContent>
          <UserDetailsForm ref={formRef} formData={data} screenType="userForm" />
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button onClick={onClose}>Cancel</Mui.Button>
          <Mui.Button onClick={handleSubmit}>{btnType}</Mui.Button>
        </Mui.DialogActions>
      </Mui.Dialog>
    </>
  );
};
