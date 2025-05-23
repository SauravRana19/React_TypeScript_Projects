import { useEffect } from "react";
import { products } from "../service/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { handleLoading, setToastData } from "../../../common/CommonSlice";
import type { State, ToastData } from "../../../common/CommonInterface";

import { Toast } from "../../../components/ToastNotification/Toast";
import { setProductData } from "../ProductSlice";
import { ProductCard } from "./ProductCard";
import Mui from "../../../theme/components/MuiComponent";

export const ProductsView = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: State) => state?.commonMethods?.isLoader
  );
  const toastData = useSelector(
    (state: State) => state?.commonMethods?.toastData
  );
  const productsData = useSelector(
    (state: State) => state?.products?.productsData
  );  

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    try {
      dispatch(handleLoading(true));
      const response = await products();
      dispatch(setProductData(response));
    } catch (error) {
      handleToast({
        show: true,
        type: "error",
        message: "An error occurred during login.",
      });
    } finally {
      dispatch(handleLoading(false));
    }
  };

  const handleToast = (data: ToastData) => {
    dispatch(setToastData(data));
  };
  const closeToast = (data: ToastData) => {
    handleToast({
      show: false,
      type: "error",
      message: "No registered user found.",
    });
  };

  return (
    <>
      {productsData ? (
        <ProductCard data={productsData} />
      ) : (
        <Mui.Typography variant="h6" align="center">
          No data found
        </Mui.Typography>
      )}
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
