import { createSlice } from "@reduxjs/toolkit";
import type { CommonState } from "./CommonInterface";

export const validateField = (name: any, value: string, formData?: any) => {
  switch (name) {
    case "firstName":
      if (!value.trim()) return "First name is required";
      return "";

    case "lastName":
      if (!value.trim()) return "Last name is required";
      return "";

    case "email":
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email address";
      return "";

    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      // Clear confirm password error if passwords now match

      return "";

    case "confirmPassword":
      if (!value) return "Please confirm your password";
      if (value !== formData.password) return "Passwords do not match";
      return "";

    case "role":
      if (!value) return "Please select a role";
      return "";

    default:
      return "";
  }
};

const initialState: CommonState = {
  role: "",
  authToken: "",
  isLoader: false,
  tableData: [],
  userDialogData: {},
  btnType: "",
  isDialog: false,
  toastData:{}
};

export const commonMethods = createSlice({
  name: "common",
  initialState,
  reducers: {
    getUserRole: (state) => {
      const userData = sessionStorage.getItem("userData");
      state.role = userData ? JSON.parse(userData).role : " ";
    },

    getAuthToken: (state) => {
      state.authToken = sessionStorage.getItem("authToken") || "";
    },

    setAuthToken: (state, action) => {
      state.authToken = action.payload.value;
    },

    setUserRole: (state, action) => {
      state.role = action.payload.value;
    },

    setTableData: (state, action) => {
      state.tableData = action.payload;
    },

    setUserDialogData: (state, action) => {
      state.userDialogData = action.payload;
    },

    setBtnType: (state, action) => {
      state.btnType = action.payload;
    },

    setIsDialog: (state, action) => {
      state.isDialog = action.payload;
    },

    setToastData:(state,action)=>{
      state.toastData = action.payload
    },

    handleLoading: (state, action) => {
      state.isLoader = action.payload;
    },
  },
});

export const {
  getUserRole,
  getAuthToken,
  handleLoading,
  setUserDialogData,
  setUserRole,
  setAuthToken,
  setTableData,
  setBtnType,
  setIsDialog,
  setToastData,
} = commonMethods.actions;

export default commonMethods.reducer;
