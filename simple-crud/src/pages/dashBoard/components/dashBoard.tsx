import { useEffect } from "react";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import { Mui } from "../../../theme";
import { Toast } from "../../../components/ToastNotification/Toast";
import type { TableColumn } from "./dashboardinterface";
import { ApiService } from "../../../services/api/apiService";
import { UserDetailsDialog } from "../../../components/UserDetails/UserDetailsDialog";
import { useDispatch, useSelector } from "react-redux";
import type { State, TableData, ToastData } from "../../../core/CommonInterface";
import {
  handleLoading,
  setBtnType,
  setIsDialog,
  setTableData,
  setToastData,
  setUserDialogData,
} from "../../../core/Common";
import type { UserDetailFormData } from "../../../components/UserDetails/userdetailinterface";

const DashboardMain = () => {
  const isDialog = useSelector(
    (state: State) => state?.commonMethods?.isDialog
  );
  const isLoading = useSelector(
    (state: State) => state?.commonMethods?.isLoader
  );
  const tableData = useSelector(
    (state: State) => state?.commonMethods?.tableData
  );
  const userDialogData = useSelector(
    (state: State) => state?.commonMethods?.userDialogData
  );
  const btnType = useSelector(
    (state: State) => state?.commonMethods?.btnType
  );
  const toastData = useSelector(
    (state: State) => state?.commonMethods?.toastData
  );

  const columns: TableColumn[] = [
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
      field: "status",
      headerName: "Status",
      sortable: true,
      renderCell: (value: any) => (
        <span style={{ color: value === "active" ? "green" : "red" }}>
          {value}
        </span>
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
            onClick={() => handleDialog(row.originalData)}
            sx={{ margin: "0 5px" }}
          >
            Edit
          </Mui.Button>
          <Mui.Button
            size="medium"
            variant="contained"
            color="error"
            startIcon={<Mui.DeleteIcon />}
            onClick={() => deleteUser(row.id)}
          >
            Delete
          </Mui.Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      dispatch(handleLoading(true));
      const response = await ApiService.fetchUserDetails();
      const data: TableData[] = response.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        status: user.status,
        originalData: user,
      }));
      dispatch(setTableData(data));
      handleToast({
        show: true,
        type: "success",
        message: "success",
      });
    } catch (error) {
      handleToast({
        show: true,
        type: "error",
        message: "!Error",
      });
    } finally {
      dispatch(handleLoading(false));
    }
  };

  const handleToast = (data: ToastData) => {
    dispatch(setToastData(data));
  };

  const handleDialog = (data: UserDetailFormData | {}) => {
    dispatch(setUserDialogData(data));
    dispatch(setIsDialog(true));
    dispatch(setBtnType(Object.keys(data).length ? "update" : "submit"));
  };

  const handleCloseDialog = (isTrue?:boolean) => {
    dispatch(handleLoading(true));
    dispatch(setIsDialog(false));
    if(isTrue){
      loadData();
    }
    dispatch(handleLoading(false));
  };

  const deleteUser = async (id: number) => {
    try {
      dispatch(handleLoading(true));
      await ApiService.deleteUser(id);
      loadData();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(handleLoading(false));
    }
  };

  const closeToast = () => {
    dispatch(setToastData({ show: false }));
  };


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
                  handleDialog({});
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
        <UserDetailsDialog
          open={isDialog || false}
          onClose={()=>{handleCloseDialog()}}
          data={userDialogData || {}}
          btnType={btnType}
        />
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

export default DashboardMain;
