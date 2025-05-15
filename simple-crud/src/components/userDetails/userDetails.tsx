import type {
  UserDetailFormProps,
} from "./userdetailinterface";
import { UserDetailsDialog } from "./userDetailsDialog";

export const UserDeatils = ({
  open,
  onClose,
  data,
  btnType,
}: UserDetailFormProps) => {
  return (
    <>
      <UserDetailsDialog
        open={open}
        onClose={onClose}
        data={data}
        btnType={btnType}
      />
    </>
  );
};
