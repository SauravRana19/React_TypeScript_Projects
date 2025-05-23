import { Mui } from "../../theme";

export const Footer = () => {
  return (
    <Mui.Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.12)",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Mui.Container maxWidth="lg">
        <Mui.Grid container spacing={4}>
          <Mui.Grid size={{ xs: 12, md: 4 }}>
            <Mui.Typography
              sx={{ color: "text.primary" }}
              variant="h6"
              gutterBottom
            >
              🚀 DashBoard
            </Mui.Typography>
            <Mui.Typography sx={{ color: "text.primary" }} variant="body2">
              Manage your users, settings, and data with ease.
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid size={{ xs: 12, md: 4 }}>
            <Mui.Typography
              sx={{ color: "text.primary" }}
              variant="h6"
              gutterBottom
            >
              Quick Links
            </Mui.Typography>
            <Mui.Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <Mui.Link sx={{ color: "text.primary" }} underline="hover">
                Dashboard
              </Mui.Link>
              <Mui.Link sx={{ color: "text.primary" }} underline="hover">
                Settings
              </Mui.Link>
            </Mui.Box>
          </Mui.Grid>
          <Mui.Typography
            sx={{ color: "text.primary" }}
            variant="body2"
            color="gray"
          >
            &copy; {new Date().getFullYear()} DashBoard Inc. All rights
            reserved.
          </Mui.Typography>
        </Mui.Grid>
      </Mui.Container>
    </Mui.Box>
  );
};
