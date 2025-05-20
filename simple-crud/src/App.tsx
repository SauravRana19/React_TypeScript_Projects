import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { routes } from "./routing/routes";
import MainLayout from "./layouts/index";
import { ThemeProvider } from "@mui/material/styles";
import { lazy } from "react";
import { theme } from "./theme";
import { AuthGuard } from "./features/auth/authGuard/Authguard";
import { PublicRoute } from "./features/auth/authGuard/PublicRoute";

const NotFound = lazy(() => import("./pages/ErrorPage/404NotFound"));
const Forbidden = lazy(() => import("./pages/ErrorPage/Forbidden"));
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
                      <PublicRoute>
                        <route.page />
                      </PublicRoute>
                    )
                  }
                />
              );
            })}
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
