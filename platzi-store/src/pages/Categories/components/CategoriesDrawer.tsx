import { useDispatch, useSelector } from "react-redux";
import Mui from "../../../theme/components/MuiComponent";
import { setIsDrawer } from "../../Products/ProductSlice";
import type { State } from "../../../common/CommonInterface";
import { useRef } from "react";
import { CategorieForm, type CategoriesFormHandle } from "./CategoriesForm";
import { categoriesDetail, createCategorie, updateCategorie } from "../service/CategoriesService";
import { setCategorieData } from "../CategoriesSlice";

export const CategoriesDrawer = () => {
  const dispatch = useDispatch();
  const formRef = useRef<CategoriesFormHandle>(null);
  const isDrawer = useSelector((state: State) => state?.products?.isDrawer);
  const btnType = useSelector((state: State) => state?.commonMethods.btnType);
  const updateCategorieData = useSelector((state: State) => state?.categories.categorieUpdateData);
  
  const toggleDrawer = (isTrue: boolean) => {
    dispatch(setIsDrawer(isTrue));
  };

   const handleSubmit = async (btnType: string) => {
    try {
      if (formRef.current) {
      const isValid = await formRef.current.triggerValidation();
      if (isValid) {
        const formValues = formRef.current.getFormValues();
        btnType !== 'submit' 
          ? await updateCategorie(updateCategorieData?.id, formValues) 
          : await createCategorie(formValues);
        const response = await categoriesDetail();
        dispatch(setCategorieData(response));
      }
    }
      
    } catch (error) {
      console.log(error);
      
      
    } finally {
      toggleDrawer(false);
    }
    
  };
  

  const handleCancel = () => {
    toggleDrawer(false);
  };

  return (
    <>
      <Mui.Drawer
        open={isDrawer}
        anchor="right"
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <Mui.Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width:'400px'
          }}
        >
          <Mui.Grow in={isDrawer}>
            <Mui.Grid container sx={{ flexGrow: 1 }}>
              <CategorieForm ref={formRef} />
            </Mui.Grid>
          </Mui.Grow>
          <Mui.Grid
            container
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 2, pt: 2, borderTop: "1px solid #eee" }}
          >
            <Mui.Grid>
              <Mui.Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ mr: 2 }}
              >
                Cancel
              </Mui.Button>
            </Mui.Grid>
            <Mui.Grid>
              <Mui.Button
                variant="contained"
                color="primary"
                onClick={()=>{handleSubmit(btnType)}}
              >
                {btnType !== 'submit' ? 'Update' : 'Submit'}
              </Mui.Button>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Box>
      </Mui.Drawer>
    </>
  );
};
