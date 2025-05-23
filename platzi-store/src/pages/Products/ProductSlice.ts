import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../../common/CommonInterface";

const initialState:ProductState = {
    productsData:[],
    isDrawer:false,
    drawerData:{}
};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {

    setProductData: (state, action) => {
      state.productsData = action.payload;
    },

    setIsDrawer:(state,action) =>{
      state.isDrawer = action.payload
    },

    setDrawerData:(state,action) =>{
      state.drawerData = action.payload
    }
  },
});

export const { setProductData, setIsDrawer, setDrawerData } = products.actions;

export default products.reducer;
