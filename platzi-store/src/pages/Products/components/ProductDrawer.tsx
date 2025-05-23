import { useDispatch, useSelector } from "react-redux";
import type { State } from "../../../common/CommonInterface";
import { setIsDrawer } from "../ProductSlice";
import Mui from "../../../theme/components/MuiComponent";
import { Card } from "../../../components/CommonCard/Card";

export const ProductDrawer = () => {
  const dispatch = useDispatch();

  const isDrawer = useSelector((state: State) => state?.products?.isDrawer);
  const drawerData = useSelector((state: State) => state?.products?.drawerData);

  const toggleDrawer = (isTrue: boolean) => {
    dispatch(setIsDrawer(isTrue));
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
        <Mui.Grid container  spacing={3} sx={{ margin: 3 ,width: '300px' }}>
          <Mui.Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={drawerData?.id}>
            <Card
              id={drawerData?.id}
              title={drawerData?.title}
              description={drawerData?.description}
              images={drawerData?.images}
              price={drawerData?.price}
              showBtn={false}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Drawer>
    </>
  );
};
