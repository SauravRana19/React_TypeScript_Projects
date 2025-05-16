// import { RouterProvider } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { routes } from "./routing/routes";
import MainLayout from "./layouts/index";
import { ThemeProvider } from '@mui/material/styles';
import { lazy } from "react";
import { AuthGuard } from "./features/auth/authGuard/authguard";
import { theme } from "./theme";
const NotFound = lazy(() => import("./pages/errorPage/404NotFound"));

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            {routes.map((route: any) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.private ? (
                      <AuthGuard allowedRoles={route.allowedRoles}>
                        <MainLayout>
                          <route.page />
                        </MainLayout>
                      </AuthGuard>
                    ) : (
                      <route.page />
                    )
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
