import { useContext, useState } from "react";
import { Mui } from "../../theme";
import "./sidebar.css";
import { userRoleContext } from "../../core/common";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const role = useContext(userRoleContext);
  const [selectedIndex , setSelectedIndex] = useState<number>(0)
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
      text: "Form Hook", 
      icon: <Mui.PhishingIcon />,
      href: "/form-hook",
      visible: true
    },
    { 
      text: "Notifications", 
      icon: <Mui.NotificationsOutlinedIcon />,
      href: "/notifications",
      visible: true
    },
  ];

  const handleNavigate = (href:string,index:number) =>{
    navigate(href)
    setSelectedIndex(index)
  }
  
  return (
    <>
    <Mui.Box
    className="sidebar"
    bgcolor="background.paper"
    >
      <Mui.List>
        {sidebarItems.map((item, index) => (
          item.visible && (
            <div key={index}>
              <Mui.ListItem disablePadding>
                <Mui.ListItemButton 
                 selected={index == selectedIndex}
                  onClick={()=>{handleNavigate(item.href, index)}}
                >
                  <Mui.ListItemIcon sx={{ minWidth: 36,color: 'text.primary'}}>
                    {item.icon}
                  </Mui.ListItemIcon>
                  <Mui.ListItemText sx={{ color: 'text.primary', bgcolor:'text.primaryChannel' }} primary={item.text} />
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
