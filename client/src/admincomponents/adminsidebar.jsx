import React from "react";
import Image from 'mui-image'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,

} from "@mui/material";

import { 
  
  LayoutDashboard,
 
  ChevronRight,
  ChevronLeft 



 } from 'lucide-react';


// // import {
  
//   ChevronLeft,
//   ChevronRightOutlined,
//    HomeOutlined,
//   CurrencyExchangeOutlined,
//   PointOfSaleOutlined,
//   Notifications,
//   AddOutlined,

//   Settings
//  } from "@mui/icons-material";


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Home",
    icon: <LayoutDashboard />,
  
  },


];

const AdminSidebar = ({

  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav" className="">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
            // color: theme.palette.secondary[200],
              backgroundColor: "white",
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              borderRight: "1px solid #e0e0e0", 
              zIndex: 10,
             
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween >
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Image src="https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/440864325_346224308474974_6359235480973778937_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHIt5B4k375UleDKn1GgV7jHQZJq3po0xwdBkmremjTHM-vPXe_pMAVPpMZ8yFe9wwAGErdZAz_Otk4fdN7M3PU&_nc_ohc=1v7qZe3lq_0Q7kNvgEbduVD&_nc_ht=scontent.fmnl30-1.fna&oh=03_Q7cD1QGhNR71L_khz38GwpxfqxW8PBBXuzeah0Nb0pgGOkEesg&oe=66658FD7" />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        padding: "1rem" ,
                       
                        backgroundColor:
                          active === lcText
                            ? "rgb(246, 245, 242)"
                            : "transparent",
                        color:
                          active === lcText
                            ? "rgba(63, 81, 181, 1)"
                            : "rgba(156, 163, 175, 1)",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? "rgba(63, 81, 181, 1)"
                              : "rgba(156, 163, 175, 1)",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRight sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

    
          
        </Drawer>
      )}
    </Box>
  );
};

export default AdminSidebar;