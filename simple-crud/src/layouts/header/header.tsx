import React, { useContext } from "react";
import { Mui } from "../../theme";
import { useNavigate } from "react-router-dom";
import { userRoleContext } from "../../core/common";
import {
  useColorScheme,
} from "@mui/material/styles";

const settings = [
  { text: "Settings", icon: <Mui.SettingsOutlinedIcon />, href: "/*" },
  { text: "Logout", icon: <Mui.LogoutOutlinedIcon />, href: "/signin" },
];

export const Header = () => {
  const { mode, setMode } = useColorScheme();
  

  const role = useContext(userRoleContext);

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

  const logoutUser = (href: string) => {
    navigate(href);
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
            <Mui.Box sx={{ flexGrow: 0 }}>
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
                                <Mui.FormControl>
                  <Mui.FormLabel id="demo-theme-toggle">Theme</Mui.FormLabel>
                  <Mui.RadioGroup
                    aria-labelledby="demo-theme-toggle"
                    name="theme-toggle"
                    row
                    value={mode}
                    onChange={(event) =>
                      setMode(event.target.value as "system" | "light" | "dark")
                    }
                  >
                    <Mui.FormControlLabel
                      value="system"
                      control={<Mui.Radio />}
                      label="System"
                    />
                    <Mui.FormControlLabel
                      value="light"
                      control={<Mui.Radio />}
                      label="Light"
                    />
                    <Mui.FormControlLabel
                      value="dark"
                      control={<Mui.Radio />}
                      label="Dark"
                    />
                  </Mui.RadioGroup>
                </Mui.FormControl>
              </Mui.Menu>
            </Mui.Box>
          </Mui.Toolbar>
        </Mui.Container>
      </Mui.AppBar>
    </>
  );
};
