import { Outlet } from "react-router-dom";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { Footer } from "./footer/footer";
import { Mui } from "../theme/index";
import { getUserRole } from "../core/common";
import { UserContext } from "../pages/contextHookExample/userContext";
import { AuthGuard } from "../features/authGuard/authguard";

const Layout = () => {
  return (
    <>
      <UserContext.Provider value={getUserRole()}>
        <Header />
        <Mui.Grid
          container
          direction="row"
          sx={{ minHeight: "calc(95.8vh - 110px)" }}
        >
          <Mui.Grid direction="column" size={1.5}>
            <Sidebar />
          </Mui.Grid>
          <Mui.Grid size={10}>
            <AuthGuard allowedRoles={["admin", "user"]}>
              <Outlet />
            </AuthGuard>
          </Mui.Grid>
        </Mui.Grid>
        <Footer />
      </UserContext.Provider>
    </>
  );
};

export default Layout;
