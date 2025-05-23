import { createSlice } from "@reduxjs/toolkit";
import type { CommonState } from "./CommonInterface";

const initialState: CommonState = {
  isLoader: false,
  btnType: "",
  isDialog: false,
  toastData: {},
  showPassword: false,
};

export const commonMethods = createSlice({
  name: "common",
  initialState,
  reducers: {
    setBtnType: (state, action) => {
      state.btnType = action.payload;
    },

    setIsDialog: (state, action) => {
      state.isDialog = action.payload;
    },

    setToastData: (state, action) => {
      state.toastData = action.payload;
    },

    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },

    handleLoading: (state, action) => {
      state.isLoader = action.payload;
    },
  },
});

export const { handleLoading, setBtnType, setIsDialog, setToastData, setShowPassword } =
  commonMethods.actions;

export default commonMethods.reducer;
