import { createSlice } from "@reduxjs/toolkit";
import type { CategoriesState } from "../../common/CommonInterface";

const initialState: CategoriesState = {
  categoriesData: [],
  categorieUpdateData:{}
};

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {

    setCategorieData: (state, action) => {
      state.categoriesData = action.payload;
    },

    setCategorieUpdateData:(state,action)=>{
        state.categorieUpdateData =action.payload
    },
  },
});

export const { setCategorieData, setCategorieUpdateData } = categories.actions;

export default categories.reducer;
