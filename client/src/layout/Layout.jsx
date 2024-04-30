import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import Header from '../components/common/header';
import PrivateRoute from '../components/helpers/PrivateRoute';
import SessionTimeout from '../components/helpers/SessionTimeout'; // Import the SessionTimeout component

function Layout() {

  const [isSideMenu, setSideMenu] = useState(true);

  const toggleSidebar = () => {
    setSideMenu((prev) => !prev);
  };

  return (
    <div className='flex flex-row w-screen h-screen'>
      <div><Sidebar isSideMenu={isSideMenu}/></div>
      <div className='flex-1'>
        <div><Header toggleSidebar={toggleSidebar}/></div>
        <div>
          <PrivateRoute /> 
          <Outlet />
        </div>
      </div>
      {/* Add the SessionTimeout component here */}
      <SessionTimeout />
    </div>
  );
}

export default Layout;
