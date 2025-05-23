import { useEffect, type JSX } from "react";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import { Toast } from "../../../components/ToastNotification/Toast";
import Mui from "../../../theme/components/MuiComponent";
import { useDispatch, useSelector } from "react-redux";
import type { State, ToastData } from "../../../common/CommonInterface";
import { handleLoading, setToastData } from "../../../common/CommonSlice";
import { deleteUser, getUserById, usersDetail } from "../service/UsersService";
import { setBtnType, setUsersData, setUserUpdateData } from "../UsersSlice";
import moment from "moment";
import { UserDetailDrawer } from "./UserDetailDrawer";
import { setIsDrawer } from "../../Products/ProductSlice";

export interface TableColumn {
  field: string;
  headerName: string;
  sortable: boolean;
  renderCell?: (_: any, row?: any) => JSX.Element;
}
[];

export const UsersView = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: State) => state?.commonMethods?.isLoader
  );

  const toastData = useSelector(
    (state: State) => state?.commonMethods?.toastData
  );
  const tableData = useSelector((state: State) => state?.users.usersData);

  useEffect(() => {
    usersData();
  }, []);

  const usersData = async () => {
    try {
      dispatch(handleLoading(true));
      const response = await usersDetail();
      dispatch(setUsersData(response));
    } catch (error) {
    } finally {
      dispatch(handleLoading(false));
    }
  };

  const handleToast = (data: ToastData) => {
    dispatch(setToastData(data));
  };
  const closeToast = () => {
    handleToast({
      show: false,
      type: "error",
      message: "No registered user found.",
    });
  };

  const removeUser = async (id: number) => {
    try {
      await deleteUser(id);
      usersData();
    } catch (error) {
        console.log(error)
    }
  };

  const addUser = () => {
    dispatch(setIsDrawer(true));
     dispatch(setUserUpdateData({}));
     dispatch(setBtnType('submit'))
  };

  const editUser = async (id: number) => {
    try {

      const response = await getUserById(id);
      dispatch(setUserUpdateData(response));
      dispatch(setBtnType('update'))
      dispatch(setIsDrawer(true));
    } catch (error) {
        console.log(error);
    } finally {
    }
  };

  const columns: TableColumn[] = [
    {
      field: "avatar",
      headerName: "avatar",
      sortable: true,
      renderCell: (value: any) => <Mui.Avatar alt="avatar" src={value} />,
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
    },
    {
      field: "role",
      headerName: "Role",
      sortable: true,
    },
    {
      field: "creationAt",
      headerName: "Create Date",
      sortable: false,
      renderCell: (value: any) => (
        <>
          <p> {moment(value).format("YYYY-MM-DD HH:mm:ss A")}</p>
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (_: any, row: any) => (
        <>
          <Mui.Button
            size="medium"
            variant="contained"
            color="warning"
            startIcon={<Mui.EditIcon />}
            onClick={() => editUser(row.id)}
            sx={{ margin: "0 5px" }}
          >
            Edit
          </Mui.Button>
          <Mui.Button
            size="medium"
            variant="contained"
            color="error"
            startIcon={<Mui.DeleteIcon />}
            onClick={() => removeUser(row.id)}
          >
            Delete
          </Mui.Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Mui.Box component="main" sx={{ margin: "2%" }}>
        <Mui.Box sx={{ flexGrow: 1 }}>
          <Mui.AppBar position="static">
            <Mui.Toolbar>
              <Mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                User Management
              </Mui.Typography>
              <Mui.Button
                variant="contained"
                startIcon={<Mui.AddIcon />}
                color="success"
                onClick={() => {
                  addUser();
                }}
              >
                Add User
              </Mui.Button>
            </Mui.Toolbar>
          </Mui.AppBar>
        </Mui.Box>
        <Mui.Box>
          <DynamicTable
            columns={columns}
            data={Array.isArray(tableData) ? tableData : []}
            defaultSortField="name"
            defaultSortDirection="asc"
            pagination
            rowsPerPageOptions={[5, 10, 25]}
            defaultRowsPerPage={5}
            stickyHeader
            elevation={3}
          />
        </Mui.Box>
      </Mui.Box>
      <Mui.Box>
        <UserDetailDrawer />
      </Mui.Box>
      <Mui.Box>
        <Mui.Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading || false}
          onClick={() => dispatch(handleLoading(false))}
        >
          <Mui.CircularProgress color="inherit" />
        </Mui.Backdrop>
        <Toast onClose={closeToast} data={toastData || {}} />
      </Mui.Box>
    </>
  );
};
