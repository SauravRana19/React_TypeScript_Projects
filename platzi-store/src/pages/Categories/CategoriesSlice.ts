import { createSlice } from "@reduxjs/toolkit";
import type { CategoriesState } from "../../common/CommonInterface";

const initialState: CategoriesState = {
  categoriesData: null,
};

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategorieData: (state, action) => {
    if (typeof action.payload === 'object' && action.payload !== null) {
      // Clone the payload to ensure no hidden non-serializable properties
      const serializablePayload = JSON.parse(JSON.stringify(action.payload));
      state.categoriesData = serializablePayload;
    } else {
      console.error('Received non-serializable categories data');
      state.categoriesData = [];
    }
  },
  },
});

export const { setCategorieData } = categories.actions;

export default categories.reducer;
