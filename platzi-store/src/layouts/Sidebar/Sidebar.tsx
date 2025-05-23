import { useState } from "react";
import { Mui } from "../../theme";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { State } from "../../common/CommonInterface";


export const Sidebar = () => {
  const navigate = useNavigate();
  const role = useSelector((state: State) => state?.auth?.role);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const sidebarItems = [
    {
      text: "Dashboard",
      icon: <Mui.SpaceDashboardOutlinedIcon />,
      href: "/dashboard",
      visible: role === "admin",
    },
    {
      text: "Home",
      icon: <Mui.HomeIcon />,
      href: "/home",
      visible: true,
    },
    {
      text: "Products",
      icon: <Mui.ShoppingBagOutlinedIcon />,
      href: "/products",
      visible: true,
    },
    {
      text: "User Management",
      icon: <Mui.PeopleOutlineOutlinedIcon />,
      href: "/users",
      visible: true,
    },
    {
      text: "Categories",
      icon: <Mui.CategoryIcon />,
      href: "/Categories",
      visible: true,
    },
  ];

  const handleNavigate = (href: string, index: number) => {
    navigate(href);
    setSelectedIndex(index);
  };

  return (
    <>
      <Mui.Box className="sidebar" bgcolor="background.paper">
        <Mui.List>
          {sidebarItems.map(
            (item, index) =>
              item.visible && (
                <Mui.Box key={index}>
                  <Mui.ListItem disablePadding>
                    <Mui.ListItemButton
                      selected={index == selectedIndex}
                      onClick={() => {
                        handleNavigate(item.href, index);
                      }}
                    >
                      <Mui.ListItemIcon
                        sx={{ minWidth: 36, color: "text.primary" }}
                      >
                        {item.icon}
                      </Mui.ListItemIcon>
                      <Mui.ListItemText
                        sx={{
                          color: "text.primary",
                          bgcolor: "text.primaryChannel",
                        }}
                        primary={item.text}
                      />
                    </Mui.ListItemButton>
                  </Mui.ListItem>
                </Mui.Box>
              )
          )}
        </Mui.List>
      </Mui.Box>
    </>
  );
};
