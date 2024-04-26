import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import Header from '../components/common/header';
import Authenticated from '../components/helpers/Authenticated';
import SessionTimeout from '../components/helpers/SessionTimeout'; // Import the SessionTimeout component

function Layout() {
  return (
    <div className='flex flex-row w-screen h-screen'>
      <div><Sidebar/></div>
      <div className='flex-1'>
        <div><Header/></div>
        <div>
          {/* Wrap the Outlet with the PrivateRoute component */}
          <Authenticated />
          <Outlet />
        </div>
      </div>
      {/* Add the SessionTimeout component here */}
      <SessionTimeout />
    </div>
  );
}

export default Layout;
