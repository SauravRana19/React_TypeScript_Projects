import { useState, useEffect } from "react";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import { Mui } from "../../../theme";
import { Toast } from "../../../components/ToastNotification/Toast";
import type { TableColumn, TableData, ToastData } from "./dashboardinterface";
import { ApiService } from "../../../services/api/apiService";
import { UserDetailsDialog } from "../../../components/UserDetails/UserDetailsDialog";

const DashboardMain = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<TableData[]>([]);
  const [dialogData, setdialogData] = useState<any>({});
  const [btnType, setbtnType] = useState("");
  const [toastData, setToastData] = useState<ToastData>({
    show: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      handleLoading(true);
      const data = await ApiService.fetchUserDetails();
      const tableData: TableData[] = data.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        status: user.status,
        originalData: user,
      }));
      setUsers(tableData);
      setTimeout(() => {
        handleLoading(false);
        setToastData((prev) => ({
          ...prev,
          show: true,
          type: "success",
          message: "success",
        }));
      }, 700);
    } catch (error) {
      setToastData((prev) => ({
        ...prev,
        show: true,
        type: "error",
        message: "!Error",
      }));
      handleLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setbtnType("submit");
    setdialogData({});
  };

  const handleCloseDialog = () => {
    handleLoading(true);
    setIsDialogOpen(false);
    setTimeout(() => {
      loadData();
      handleLoading(false);
    }, 1500);
  };

  const handleOpenEditDialog = (data: any) => {
    setdialogData(data);
    setIsDialogOpen(true);
    setbtnType("update");
  };

  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const deleteUser = async (id: number) => {
    try {
      handleLoading(true);
      await ApiService.deleteUser(id);
      setTimeout(() => {
        handleLoading(false);
      }, 700);
      loadData();
    } catch (error) {
      handleLoading(false);
    }
  };

  const closeToast = () => {
    setToastData((prev) => ({ ...prev, show: false }));
  };

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
            onClick={() => handleOpenEditDialog(row.originalData)}
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
                onClick={handleOpenDialog}
              >
                Add User
              </Mui.Button>
            </Mui.Toolbar>
          </Mui.AppBar>
        </Mui.Box>
        <Mui.Box>
          <DynamicTable
            columns={columns}
            data={users}
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
          open={isDialogOpen}
          onClose={handleCloseDialog}
          data={dialogData}
          btnType={btnType}
        />
      </Mui.Box>
      <Mui.Box>
        <Mui.Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading}
          onClick={() => handleLoading(false)}
        >
          <Mui.CircularProgress color="inherit" />
        </Mui.Backdrop>
        <Toast onClose={closeToast} data={toastData} />
      </Mui.Box>
    </>
  );
};

export default DashboardMain;
