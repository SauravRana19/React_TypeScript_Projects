import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../core/Common";


export default configureStore({
  reducer: {
    commonMethods: commonReducer,
  },
});
