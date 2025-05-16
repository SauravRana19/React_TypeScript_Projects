import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { Footer } from "./footer/footer";
import { Mui } from "../theme/index";
import { getUserRole, userRoleContext } from "../core/common";


const Layout = ({children}: { children: React.ReactNode }) => {
  const role = getUserRole();
  return (
    <>
      <userRoleContext.Provider value={role}>
        <Header />
        <Mui.Grid
          container
          direction="row"
          sx={{ minHeight: "calc(96.6vh - 100px);" }}
        >
          <Mui.Grid direction="column" size={{xs:12, sm:12, md:2, lg:2}}>
            <Sidebar />
          </Mui.Grid>
          <Mui.Grid  sx={{ backgroundColor: (theme) => theme.palette.background.paper }} size={{xs:12, sm:12, md:10, lg:10}}>
              {children}
          </Mui.Grid>
        </Mui.Grid>
        <Footer />
      </userRoleContext.Provider>
    </>
  );
};

export default Layout;
