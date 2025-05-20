import { Footer } from "./Footer/Footer";
import { Mui } from "../theme/index";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Mui.Grid
        container
        direction="row"
        sx={{ minHeight: "calc(96.6vh - 100px);" }}
      >
        <Mui.Grid direction="column" size={{ xs: 12, sm: 12, md: 2, lg: 2 }}>
          <Sidebar />
        </Mui.Grid>
        <Mui.Grid
          sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
          size={{ xs: 12, sm: 12, md: 10, lg: 10 }}
        >
          {children}
        </Mui.Grid>
      </Mui.Grid>
      <Footer />
    </>
  );
};

export default Layout;
