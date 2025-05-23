import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../../common/CommonInterface";

const initialState:AuthState = {
  role: "",
  authToken: "",
  refreshToken:"",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },

    setrefreshToken:(state,action) =>{
       state.refreshToken = action.payload;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole, setAuthToken, setrefreshToken } = auth.actions;

export default auth.reducer;
