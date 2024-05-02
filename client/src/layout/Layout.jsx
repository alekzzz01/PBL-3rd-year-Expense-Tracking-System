import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import Header from '../components/common/header';
import CheckToken from '../components/helpers/UserAuth';
import SessionTimeout from '../components/helpers/SessionTimeout'; // Import the SessionTimeout component

function Layout() {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
  
    <Box>


      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
     
        
      <SessionTimeout />

        <Sidebar
        
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
    
      />

      <Box flexGrow={1}>
        <Header
          
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
            <CheckToken /> 
            <Outlet />
      </Box>

    
      </Box>

    </Box>
  );
}

export default Layout;
