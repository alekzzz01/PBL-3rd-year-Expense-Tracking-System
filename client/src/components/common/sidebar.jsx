import React from "react";
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
  Wallet, 
  CirclePlus,
  Coins,
  Bell,
  Bolt,
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
    text: "Dashboard",
    icon: <LayoutDashboard />,
  
  },

  {
    text: "Wallet",
    icon: null,
  },

  
  {
    text: "Income",
    icon: <CirclePlus />,
  
  },

  {
    text: "Expenses",
    icon: <Coins />,
  },

  {
    text: "Transactions",
    icon: <Wallet />,
  
  },
 

  {
    text: "Settings",
    icon: null,
  },

  {
    text: "Notifications",
    icon: <Bell />,
  },

  {
    text: "Settings",
    icon: <Bolt />,
  },

];

const Sidebar = ({

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
                  <Typography variant="h4" fontWeight="bold">
                      Company
                  </Typography>
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
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
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
                        backgroundColor:
                          active === lcText
                            ? "rgb(246, 245, 242)"
                            : "transparent",
                        color:
                          active === lcText
                            ? "rgb(116, 105, 182)"
                            : "rgb(116, 105, 182)",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? "rgb(116, 105, 182)"
                              : "rgb(116, 105, 182)",
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

export default Sidebar;