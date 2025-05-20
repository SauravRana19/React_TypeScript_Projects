import { useState, useEffect } from "react";
import DynamicTable from "../../components/dynamicTable/dynamictable";
import { Mui } from "../../theme";
import { UserDeatilForm } from "../userDetailForm/userdetailform";
import { ApiService } from "../../features/auth/apiService";

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [dialogData, setdialogData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      handleLoading(true);
      const data = await ApiService.fetchUserDetails();
      const tableData = data.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        status: user.status,
        originalData: user,
      }));

      setUsers(tableData);
      setTimeout(() => {
        handleLoading(false);
      }, 700);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setdialogData({});
    loadData();
  };

  const handleOpenEditDialog = (data: any) => {
    setdialogData(data);
    setIsDialogOpen(true);
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
      console.log(error);
    }
  };

  // Column configuration
  const columns: any = [
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
      <UserDeatilForm
        open={isDialogOpen}
        onClose={handleCloseDialog}
        data={dialogData}
      />
      <Mui.Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        onClick={() => handleLoading(false)}
      >
        <Mui.CircularProgress color="inherit" />
      </Mui.Backdrop>
    </>
  );
};

export default Dashboard;
