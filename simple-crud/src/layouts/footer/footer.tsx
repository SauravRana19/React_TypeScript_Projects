import { Mui } from "../../theme";
export const Footer = () => {
   return (
    <Mui.Box sx={{ bgcolor: '#1e293b', color: '#fff', py: 1 }}>
      <Mui.Container maxWidth="lg">
        <Mui.Grid container spacing={4}>
          
          <Mui.Grid size={{ xs: 12, md: 4 }}>
            <Mui.Typography variant="h6" gutterBottom>
              🚀 DashBoard
            </Mui.Typography>
            <Mui.Typography variant="body2">
              Manage your users, settings, and data with ease.
            </Mui.Typography>
          </Mui.Grid>

          {/* Navigation Links */}
          <Mui.Grid size={{ xs: 12, md: 4 }}>
            <Mui.Typography variant="h6" gutterBottom>
              Quick Links
            </Mui.Typography>
            <Mui.Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Mui.Link href="#" color="inherit" underline="hover">Dashboard</Mui.Link>
              <Mui.Link href="#" color="inherit" underline="hover">Settings</Mui.Link>
            </Mui.Box>
          </Mui.Grid>
            <Mui.Typography variant="body2" color="gray">
            &copy; {new Date().getFullYear()} DashBoard Inc. All rights reserved.
          </Mui.Typography>
        </Mui.Grid>
      </Mui.Container>
    </Mui.Box>
  );
};
