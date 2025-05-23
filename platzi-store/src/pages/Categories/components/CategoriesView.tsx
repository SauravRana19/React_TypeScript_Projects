import { useEffect, type JSX } from "react";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import { Toast } from "../../../components/ToastNotification/Toast";
import Mui from "../../../theme/components/MuiComponent";
import { useDispatch, useSelector } from "react-redux";
import type { State, ToastData } from "../../../common/CommonInterface";
import {
  handleLoading,
  setBtnType,
  setToastData,
} from "../../../common/CommonSlice";
import moment from "moment";
import { setIsDrawer } from "../../Products/ProductSlice";
import {
  categoriesDetail,
  deleteCategorie,
  getCategorieById,
} from "../service/CategoriesService";
import { setCategorieData, setCategorieUpdateData } from "../CategoriesSlice";
import { CategoriesDrawer } from "./CategoriesDrawer";

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
  const categoriesData = useSelector(
    (state: State) => state?.categories?.categoriesData
  );

  useEffect(() => {
    categorieData();
  }, []);

  const categorieData = async () => {
    try {
      dispatch(handleLoading(true));
      const response = await categoriesDetail();
      dispatch(setCategorieData(response));
    } catch (error) {
      console.error("Error fetching categories:", error);
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
      message: "No registered Categorie found.",
    });
  };

  const removeCategorie = async (id: number) => {
    try {
      await deleteCategorie(id);
      categorieData();
    } catch (error) {
      console.log(error);
    }
  };

  const addCategorie = () => {
    dispatch(setIsDrawer(true));
    dispatch(setCategorieUpdateData({}));
    dispatch(setBtnType("submit"));
  };

  const editCategorie = async (id: number) => {
    try {
      const response = await getCategorieById(id);
      dispatch(setCategorieUpdateData(response));
      dispatch(setBtnType("update"));
      dispatch(setIsDrawer(true));
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
          <Mui.Card elevation={0} sx={{ width: 50, height: 50 }}>
            <Mui.CardMedia
              component="img"
              image={value}
              title="image"
              sx={{ objectFit: "cover" }}
            />
          </Mui.Card>
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
            onClick={() => editCategorie(row.id)}
            sx={{ margin: "0 5px" }}
          >
            Edit
          </Mui.Button>
          <Mui.Button
            size="medium"
            variant="contained"
            color="error"
            startIcon={<Mui.DeleteIcon />}
            onClick={() => removeCategorie(row.id)}
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
                Categorie Management
              </Mui.Typography>
              <Mui.Button
                variant="contained"
                startIcon={<Mui.AddIcon />}
                color="success"
                onClick={() => {
                  addCategorie();
                }}
              >
                Add Categorie
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
        <CategoriesDrawer />
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
