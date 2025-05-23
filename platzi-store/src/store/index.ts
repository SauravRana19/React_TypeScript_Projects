import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../common/CommonSlice";
import authReducer from "../feature/auth/Login/LoginSlice";
import productReducer from "../pages/Products/ProductSlice";
import usersReducer from "../pages/Users/UsersSlice";
import categorieReducer from "../pages/Categories/CategoriesSlice";
export default configureStore({
  reducer: {
    commonMethods: commonReducer,
    auth: authReducer,
    products: productReducer,
    users: usersReducer,
    categories: categorieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializability check
    }),
});
