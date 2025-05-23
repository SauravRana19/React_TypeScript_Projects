import { useEffect, type JSX } from "react";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import { Toast } from "../../../components/ToastNotification/Toast";
import Mui from "../../../theme/components/MuiComponent";
import { useDispatch, useSelector } from "react-redux";
import type { State, ToastData } from "../../../common/CommonInterface";
import { handleLoading, setToastData } from "../../../common/CommonSlice";
import moment from "moment";
import { setIsDrawer } from "../../Products/ProductSlice";
import { categoriesDetail, deleteCategorie } from "../service/CategoriesService";
import { setCategorieData } from "../CategoriesSlice";


export interface TableColumn {
  field: string;
  headerName: string;
  sortable: boolean;
  renderCell?: (_: any, row?: any) => JSX.Element;
}
[];

export const CategoriesView = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: State) => state?.commonMethods.isLoader
  );

  const toastData = useSelector(
    (state: State) => state?.commonMethods?.toastData
  );
const categoriesData = useSelector((state: State) => state?.categories?.categoriesData ?? []);

  useEffect(() => {
    categorieData();
  }, []);

  const categorieData = async () => {
  try {
    dispatch(handleLoading(true));
    const response = await categoriesDetail();
    
    // Sanitize the data before storing
    const sanitizedData = response.map(item => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      image: item.image,  // Make sure this is a string URL, not an <img> element
      creationAt: item.creationAt
      // Only include plain data properties
    }));
    
    dispatch(setCategorieData(sanitizedData));
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch(setCategorieData([]));
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
      await deleteCategorie(id);
      categorieData();
    } catch (error) {
        console.log(error)
    }
  };

  const addUser = () => {
     dispatch(setIsDrawer(true));
    //  dispatch(setUserUpdateData({}));
    //  dispatch(setBtnType('submit'))
  };

  const editUser = async (id: number) => {
    try {

      // const response = await getUserById(id);
      // dispatch(setUserUpdateData(response));
      // dispatch(setBtnType('update'))
      // dispatch(setIsDrawer(true));
    } catch (error) {
        console.log(error);
    } finally {
    }
  };

  const columns: TableColumn[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
    },
    {
      field: "id",
      headerName: "Id",
      sortable: true,
    },
    {
      field: "slug",
      headerName: "Slug",
      sortable: true,
    },
    {
      field: "image",
      headerName: "Image",
      sortable: true,
      renderCell: (value: any) => (
        <>
          <p> {moment(value).format("YYYY-MM-DD HH:mm:ss A")}</p>
        </>
      ),
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
             data={Array.isArray(categoriesData) ? categoriesData : []}
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
        {/* <UserDetailDrawer /> */}
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
