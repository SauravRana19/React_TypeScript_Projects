import { useContext } from "react";
import { Mui } from "../../theme";
import "./sidebar.css";
import { userRoleContext } from "../../core/common";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const role = useContext(userRoleContext);
    const sidebarItems = [
    { 
      text: "Dashboard", 
      icon: <Mui.SpaceDashboardOutlinedIcon />,
      href: "/dashboard",
      visible: role === 'admin'
    },
    { 
      text: "User Management", 
      icon: <Mui.PeopleOutlineOutlinedIcon />,
      href: "/users",
      visible: role === 'admin'
    },
    { 
      text: "Blog", 
      icon: <Mui.TextsmsOutlinedIcon />,
      href: "/blog",
      visible: true
    },
    { 
      text: "Analytics", 
      icon: <Mui.AnalyticsOutlinedIcon />,
      href: "/analytics",
      visible: role === 'admin'
    },
    { 
      text: "Notifications", 
      icon: <Mui.NotificationsOutlinedIcon />,
      href: "/notifications",
      visible: true
    },
  ];

  const handleNavigate = (href:string) =>{
    navigate(href)
  }
  
  return (
    <>
    <Mui.Box 
    className="sidebar"
      sx={{
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Mui.List>
        {sidebarItems.map((item, index) => (
          item.visible && (
            <div key={index}>
              <Mui.ListItem disablePadding>
                <Mui.ListItemButton 
                  sx={{
                    px: 3,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      borderRight: '3px solid',
                      borderColor: 'primary.main'
                    }
                  }}
                  onClick={()=>{handleNavigate(item.href)}}
                >
                  <Mui.ListItemIcon sx={{ minWidth: 36 }}>
                    {item.icon}
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary={item.text} />
                </Mui.ListItemButton>
              </Mui.ListItem>
            </div>
          )
        ))}
      </Mui.List>
    </Mui.Box>
    </>
  );
};
