import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layouts";

const Login = lazy(() => import("../feature/auth/Login"));
const NotFound = lazy(() => import("../pages/ErrorPage/404NotFound"));
const Home = lazy(() => import("../pages/Home"));;
const Product = lazy(()=> import("../pages/Products"))
const Users = lazy(()=> import ("../pages/Users"))
const Categories = lazy(()=> import ("../pages/Categories"))

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/products",
        element: <Product/>
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users/>,
      },
      {
        path: "/Categories",
        element: <Categories/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
