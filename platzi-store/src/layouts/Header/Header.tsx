import React from "react";
import { Mui } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useColorScheme } from "@mui/material/styles";
import type { State } from "../../common/CommonInterface";
import { setAuthToken, setRole } from "../../feature/auth/Login/LoginSlice";

const settings = [
  { text: "Settings", icon: <Mui.SettingsOutlinedIcon />, href: "/*" },
  { text: "Logout", icon: <Mui.LogoutOutlinedIcon />, href: "/login" },
];

export const Header = () => {
  const dispatch = useDispatch();
  const { mode, setMode } = useColorScheme();
  const role = useSelector((state: State) => state?.auth?.role);

  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const removeBrowserSavedData = () =>{
    sessionStorage.removeItem("authToken");
    dispatch(setRole(''));
    dispatch(setAuthToken(''))
  }

  const logoutUser = (href: string) => {
    removeBrowserSavedData()
    navigate(href);
  };

  const handleThemeMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <>
      <Mui.AppBar position="static">
        <Mui.Container maxWidth="xl">
          <Mui.Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Mui.Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "capitalize",
              }}
            >
              <Mui.AndroidOutlinedIcon sx={{ mr: 2, pt: 0.5 }} />
              {role}
            </Mui.Typography>
            <Mui.Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
              <Mui.Tooltip title="Change Theme">
                <Mui.IconButton onClick={handleThemeMode}>
                  {mode == "dark" ? (
                    <Mui.BedtimeIcon />
                  ) : (
                    <Mui.LightModeOutlinedIcon sx={{ color: "white" }} />
                  )}
                </Mui.IconButton>
              </Mui.Tooltip>
              <Mui.Tooltip title="Open settings">
                <Mui.IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Mui.SettingsOutlinedIcon sx={{ color: "white" }} />
                </Mui.IconButton>
              </Mui.Tooltip>
              <Mui.Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Mui.MenuItem
                    key={setting.text}
                    onClick={handleCloseUserMenu}
                  >
                    <Mui.ListItemIcon>{setting.icon}</Mui.ListItemIcon>
                    <Mui.Typography
                      onClick={() => {
                        logoutUser(setting.href);
                      }}
                      sx={{ textAlign: "center" }}
                    >
                      {setting.text}
                    </Mui.Typography>
                  </Mui.MenuItem>
                ))}
              </Mui.Menu>
            </Mui.Box>
          </Mui.Toolbar>
        </Mui.Container>
      </Mui.AppBar>
    </>
  );
};
