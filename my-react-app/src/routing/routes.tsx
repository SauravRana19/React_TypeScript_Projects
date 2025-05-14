import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layouts";
import { AuthGuard } from "../features/authGuard/authguard";

const Dashboard = lazy(() => import("../pages/dashBoard/dashBoard"));
const SignIn = lazy(() => import("../pages/signIn/signIn"));
const SignUp = lazy(() => import("../pages/signUp/signup"));
const NotFound = lazy(() => import("../pages/errorPage/404NotFound"));
const Memo = lazy(() => import("../pages/memoHookExpamle/memo"));
const Context = lazy(() => import("../pages/contextHookExample/context"));
const Callback = lazy(() => import("../pages/callbackHookExample/callback"));
const Blog = lazy(() => import("../pages/blog/blog"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
       {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path:'/dashboard',
         element: (
          <AuthGuard allowedRoles={['admin']}>
            <Dashboard />
          </AuthGuard>
        ),
      },
      {
        path: "/memo",
        element: (
          <AuthGuard allowedRoles={['admin','user']}>
            <Memo />
          </AuthGuard>
        ),
      },
      {
        path: "/context",
        element: (
          <AuthGuard allowedRoles={['admin','user']}>
            <Context />
          </AuthGuard>
        ),
      },
      {
        path: "/callback",
        element: (
          <AuthGuard allowedRoles={['admin','user']}>
            <Callback />
          </AuthGuard>
        ),
      },
      {
        path: "/blog",
        element: (
          <AuthGuard>
            <Blog />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
