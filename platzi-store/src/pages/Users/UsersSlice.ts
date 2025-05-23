import { createSlice } from "@reduxjs/toolkit";
import type { UsersState } from "../../common/CommonInterface";


const initialState:UsersState = {
    usersData:[],
    userUpdateData:{},
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {

    setUsersData: (state, action) => {
      state.usersData = action.payload;
    },

    setUserUpdateData:(state,action)=>{
        state.userUpdateData =action.payload
    },

  },
});

export const { setUsersData, setUserUpdateData } = users.actions;

export default users.reducer;
