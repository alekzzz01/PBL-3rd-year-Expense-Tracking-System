import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import Sidebar from '../admincomponents/adminsidebar';
import Navbar from '../admincomponents/adminheader';
import PrivateRoute from '../components/helpers/PrivateRoute'; // Import your PrivateRoute component
import SessionTimeout from '../components/helpers/SessionTimeout';


function AdminLayout() {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
 


 <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
       
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
       
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
            <PrivateRoute /> 
            <Outlet />
      </Box>

      <SessionTimeout />
    </Box>
  );
}

export default AdminLayout;
